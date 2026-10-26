import { expect, test } from "@playwright/test";

/** O mesmo arquivo cobre os dois builds: com exemplos (NEXT_PUBLIC_CONTENT_DEMO=true) e o público. */
async function isDemoBuild(request: import("@playwright/test").APIRequestContext) {
  return (await request.get("/conteudos/exemplo-um/")).status() === 200;
}

test("build público: nenhum exemplo, nenhuma avaliação e nenhum dado estruturado falso", async ({ page, request }) => {
  test.skip(await isDemoBuild(request), "build com exemplos");
  for (const url of ["/", "/en/", "/es/", "/conteudos/"]) {
    await page.goto(url);
    expect(await page.locator("[data-demo]").count()).toBe(0);
    expect(await page.getByText(/exemplo|example|ejemplo/i).count()).toBe(0);
    expect(await page.locator("#avaliacoes-title").count()).toBe(0);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.join("")).not.toMatch(/Review|AggregateRating|"Article"/);
  }
  await page.goto("/");
  expect(await page.locator("#conteudos-title").count()).toBe(0);
  // a página /conteudos/ existe, com estado honesto, mas não aparece no menu
  await page.goto("/conteudos/");
  await expect(page.getByText("serão publicados aqui após a revisão")).toBeVisible();
  expect(await page.getByRole("link", { name: "Conteúdos" }).count()).toBe(0);
  expect((await request.get("/sitemap.xml").then((r) => r.text()))).not.toContain("exemplo-um");
});

test("build com exemplos: seções, avisos visíveis e embed só após o clique", async ({ page, request }) => {
  test.skip(!(await isDemoBuild(request)), "build público");
  await page.goto("/");
  const section = page.locator("#conteudos-title").locator("xpath=ancestor::section[1]");
  await expect(section.locator("article[data-demo]")).toHaveCount(6);
  await expect(page.locator("#avaliacoes-title")).toBeVisible();
  await expect(page.getByText("EXEMPLO FICTÍCIO — não é uma avaliação real")).toHaveCount(3);
  // ordem: diferenciais < conteúdos < FAQ < avaliações < localização
  const order = await page.evaluate(() =>
    ["dif-title", "conteudos-title", "faq-title", "avaliacoes-title", "local-title"].map(
      (id) => document.getElementById(id)?.getBoundingClientRect().top ?? -1,
    ),
  );
  expect(order).toEqual([...order].sort((a, b) => a - b));
  expect(order.every((n) => n !== -1)).toBe(true);
  // nenhuma requisição ao Instagram antes do clique; depois dele, o player aparece
  const ig: string[] = [];
  page.on("request", (r) => r.url().includes("instagram.com") && ig.push(r.url()));
  await page.waitForTimeout(1500);
  expect(await page.locator("iframe").count()).toBe(0);
  expect(ig).toEqual([]);
  await section.getByRole("button", { name: "Assistir aqui" }).first().click();
  await expect(section.locator("iframe")).toHaveAttribute("src", /instagram\.com\/reel\/DEMO0000001\/embed\//);
});

test("artigo de exemplo: página estática com SEO nos 3 idiomas", async ({ page, request }) => {
  test.skip(!(await isDemoBuild(request)), "build público");
  for (const [prefix, lang] of [["", "pt-BR"], ["/en", "en"], ["/es", "es"]]) {
    await page.goto(`${prefix}/conteudos/exemplo-um/`);
    expect(await page.locator("html").getAttribute("lang")).toBe(lang);
    expect(await page.locator("h1").count()).toBe(1);
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toContain(`${prefix}/conteudos/exemplo-um/`);
    expect(await page.locator('link[rel="alternate"][hreflang]').count()).toBe(4);
  }
});

test("build com exemplos: axe em conteúdos e artigo (3 idiomas, claro e escuro)", async ({ page, request }) => {
  test.skip(!(await isDemoBuild(request)), "build público");
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  for (const prefix of ["", "/en", "/es"]) {
    for (const theme of ["light", "dark"]) {
      await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
      for (const p of ["/conteudos/", "/conteudos/exemplo-dois/"]) {
        await page.goto(prefix + p);
        await page.waitForTimeout(2200);
        const r = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
          .analyze();
        expect(r.violations.map((v) => `${prefix}${p} ${theme} ${v.id}`)).toEqual([]);
      }
    }
  }
});
