import { expect, test } from "@playwright/test";

/** O mesmo arquivo cobre os dois builds: com exemplos (NEXT_PUBLIC_CONTENT_DEMO=true) e o público. */
async function isDemoBuild(request: import("@playwright/test").APIRequestContext) {
  return (await request.get("/conteudos/exemplo-um/")).status() === 200;
}

const postUrls = [
  "https://www.instagram.com/p/DcUbBVSvcX8/",
  "https://www.instagram.com/p/DdKRgA9BfXa/",
  "https://www.instagram.com/p/C-WGsEgRqcv/?img_index=1",
];

test("build público: 3 publicações reais, sem exemplos, avaliações nem dados estruturados falsos", async ({ page, request }) => {
  test.skip(await isDemoBuild(request), "build com exemplos");
  for (const url of ["/", "/en/", "/es/", "/conteudos/"]) {
    await page.goto(url);
    // só as 3 avaliações de teste (com selo) podem ser fictícias; conteúdos e artigos, nunca
    expect(await page.locator("[data-demo]").count()).toBe(url === "/conteudos/" ? 0 : 3);
    expect(await page.locator("article[data-demo]").count()).toBe(0);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.join("")).not.toMatch(/Review|AggregateRating|"Article"/);
    // links originais preservados (inclusive ?img_index=1) e nenhum embed carregado de início
    const hrefs = await page.locator('a[href*="instagram.com/p/"]').evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    expect(hrefs).toEqual(postUrls);
    expect(await page.locator("iframe").count()).toBe(0);
  }
  // ordem na home: diferenciais < conteúdos < FAQ < localização
  await page.goto("/");
  const order = await page.evaluate(() =>
    ["dif-title", "conteudos-title", "faq-title", "avaliacoes-title", "local-title"].map(
      (id) => document.getElementById(id)?.getBoundingClientRect().top ?? -1,
    ),
  );
  expect(order.every((n) => n !== -1)).toBe(true);
  expect(order).toEqual([...order].sort((a, b) => a - b));
  expect((await request.get("/sitemap.xml").then((r) => r.text()))).not.toContain("exemplo-um");
});

test("publicação: o embed só carrega após o clique, um de cada vez", async ({ page, request }) => {
  test.skip(await isDemoBuild(request), "build com exemplos");
  const ig: string[] = [];
  page.on("request", (r) => r.url().includes("instagram.com") && ig.push(r.url()));
  await page.goto("/conteudos/");
  await page.waitForTimeout(1500);
  expect(ig).toEqual([]);
  for (let i = 0; i < 3; i++) {
    await page.getByRole("button", { name: "Ver publicação aqui" }).first().click();
    await expect(page.locator("iframe")).toHaveCount(i + 1);
  }
  const srcs = await page.locator("iframe").evaluateAll((els) => els.map((e) => e.getAttribute("src")));
  expect(srcs).toEqual([
    "https://www.instagram.com/p/DcUbBVSvcX8/embed/",
    "https://www.instagram.com/p/DdKRgA9BfXa/embed/",
    "https://www.instagram.com/p/C-WGsEgRqcv/embed/",
  ]);
});

test("endereço confirmado e botão Como chegar em PT, EN e ES", async ({ page }) => {
  const maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("La Femme Consultórios, Rua 1123, 359, Quadra 220, Setor Marista, Goiânia - GO");
  for (const [prefix, venue, label] of [["", "Atendimento na La Femme Consultórios", "Como chegar"], ["/en", "Appointments at La Femme Consultórios", "Get directions"], ["/es", "Atención en La Femme Consultórios", "Cómo llegar"]] as const) {
    for (const route of ["/", "/contato/"]) {
      await page.goto(prefix + route);
      await expect(page.getByText(venue).first()).toBeVisible();
      await expect(page.getByText("Rua 1123, nº 359, Quadra 220, Setor Marista").first()).toBeVisible();
      await expect(page.getByRole("link", { name: label }).first()).toHaveAttribute("href", maps);
    }
  }
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

test("publicações reais: capa hospedada no site, legenda original e tipo", async ({ page, request }) => {
  test.skip(await isDemoBuild(request), "build com exemplos");
  for (const [prefix, kind] of [["", "Vídeo"], ["/en", "Video"], ["/es", "Video"]] as const) {
    await page.goto(`${prefix}/conteudos/`);
    const cards = page.locator("article").filter({ has: page.locator('a[href*="instagram.com/p/"]') });
    await expect(cards).toHaveCount(3);
    // capas próprias (nenhuma imagem carregada do Instagram)
    const srcs = await cards.locator("img").evaluateAll((els) => els.map((e) => (e as HTMLImageElement).currentSrc || e.getAttribute("src")));
    expect(srcs.length).toBe(3);
    for (const s of srcs) expect(s).toMatch(/\/images\/ig-post-\d-\d+\.(avif|webp|jpg)$/);
    await expect(cards.first().getByText(kind, { exact: true })).toBeVisible();
    // legenda original em português, marcada com lang="pt" nos outros idiomas
    await expect(page.getByText("Nem todo escape de urina acontece por fraqueza do assoalho pélvico.")).toBeVisible();
    await expect(page.getByText("VOCÊ SABIA QUE…")).toBeVisible();
  }
  await page.goto("/en/conteudos/");
  expect(await page.locator('h3[lang="pt"]').count()).toBe(3);
});

test("avaliações de teste: só com a flag, sempre com selo visível e sem dados estruturados", async ({ page, request }) => {
  test.skip(await isDemoBuild(request), "build com exemplos");
  for (const [prefix, label] of [["", "AVALIAÇÃO DE TESTE"], ["/en", "TEST REVIEW"], ["/es", "OPINIÓN DE PRUEBA"]] as const) {
    await page.goto(`${prefix}/`);
    const section = page.locator("#avaliacoes-title").locator("xpath=ancestor::section[1]");
    await expect(section.locator("li")).toHaveCount(3);
    await expect(section.getByText(label)).toHaveCount(3);
    expect(await section.locator('[role="img"]').count()).toBe(0); // sem estrelas
  }
});
