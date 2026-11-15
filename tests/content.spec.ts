import { expect, test } from "@playwright/test";

/** O mesmo arquivo cobre os dois builds: com exemplos (NEXT_PUBLIC_CONTENT_DEMO=true) e o público. */
async function isDemoBuild(request: import("@playwright/test").APIRequestContext) {
  return (await request.get("/conteudos/exemplo-um/")).status() === 200;
}

const postUrls = [
  "https://www.instagram.com/p/C-WGsEgRqcv/?img_index=1",
  "https://www.instagram.com/p/DcUbBVSvcX8/",
  "https://www.instagram.com/p/DdKRgA9BfXa/",
];

test("build público: 3 publicações reais, sem exemplos, avaliações nem dados estruturados falsos", async ({ page, request }) => {
  test.skip(await isDemoBuild(request), "build com exemplos");
  for (const url of ["/", "/en/", "/es/", "/conteudos/"]) {
    await page.goto(url);
    // nada fictício na página (as avaliações de teste estão ocultas)
    expect(await page.locator("[data-demo]").count()).toBe(0);
    expect(await page.locator("article[data-demo]").count()).toBe(0);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.join("")).not.toMatch(/Review|AggregateRating|"Article"/);
    // links originais preservados (inclusive ?img_index=1) e embeds preguiçosos
    const embeds = await page.locator('iframe[src*="instagram.com/p/"]').evaluateAll((els) => els.map((e) => e.getAttribute("src")));
    expect(embeds).toEqual(postUrls.map((u) => u.replace(/\/(\?.*)?$/, "/embed/")));
    // os players do Instagram são todos preguiçosos (carregam só ao rolar até perto)
    const eager = await page.locator("iframe:not([loading=lazy])").count();
    expect(eager).toBe(0);
  }
  // ordem na home: localização < conteúdos < FAQ
  await page.goto("/");
  const order = await page.evaluate(() =>
    ["local-title", "conteudos-title", "faq-title"].map(
      (id) => document.getElementById(id)?.getBoundingClientRect().top ?? -1,
    ),
  );
  expect(order.every((n) => n !== -1)).toBe(true);
  expect(order).toEqual([...order].sort((a, b) => a - b));
  expect((await request.get("/sitemap.xml").then((r) => r.text()))).not.toContain("exemplo-um");
});

test("publicações: embeds preguiçosos (só ao rolar), na ordem pedida e sem botões ou rótulos de tipo", async ({ page, request }) => {
  test.skip(await isDemoBuild(request), "build com exemplos");
  const ig: string[] = [];
  page.on("request", (r) => r.url().includes("instagram.com") && ig.push(r.url()));
  await page.goto("/");
  await page.waitForTimeout(1500);
  expect(ig).toEqual([]); // nada do Instagram na abertura da home
  const frames = page.locator('iframe[src*="instagram.com"]');
  await expect(frames).toHaveCount(3);
  expect(await frames.evaluateAll((els) => els.map((e) => e.getAttribute("loading")))).toEqual(["lazy", "lazy", "lazy"]);
  expect(await frames.evaluateAll((els) => els.map((e) => e.getAttribute("src")))).toEqual([
    "https://www.instagram.com/p/C-WGsEgRqcv/embed/", // carrossel primeiro
    "https://www.instagram.com/p/DcUbBVSvcX8/embed/",
    "https://www.instagram.com/p/DdKRgA9BfXa/embed/",
  ]);
  await expect(page.getByText("Ver publicação aqui")).toHaveCount(0);
  await expect(page.getByText(/^(Vídeo|Carrossel)$/)).toHaveCount(0);
  await frames.first().scrollIntoViewIfNeeded();
  await expect.poll(() => ig.length).toBeGreaterThan(0); // carrega ao chegar perto
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
  // ordem: localização < conteúdos < FAQ
  const order = await page.evaluate(() =>
    ["local-title", "conteudos-title", "faq-title"].map(
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

test("publicações reais: legenda original, link do post e datas", async ({ page, request }) => {
  test.skip(await isDemoBuild(request), "build com exemplos");
  for (const prefix of ["", "/en", "/es"]) {
    await page.goto(`${prefix}/conteudos/`);
    const cards = page.locator("article").filter({ has: page.locator('iframe[src*="instagram.com/p/"]') });
    await expect(cards).toHaveCount(3);
    await expect(cards.first().getByText("VOCÊ SABIA QUE…")).toBeVisible();
    await expect(page.getByText("Nem todo escape de urina acontece por fraqueza do assoalho pélvico.")).toBeVisible();
  }
  await page.goto("/en/conteudos/");
  expect(await page.locator('h3[lang="pt"]').count()).toBe(3); // legenda original marcada como pt
});

// Sem avaliações cadastradas: só nota/contagem manuais e o botão para o Google; nada de dados estruturados de avaliação.
test("avaliações: nota real, botão do Google, sem cards nem dados estruturados de avaliação", async ({ page }) => {
  for (const [prefix, summary, button] of [
    ["", "Nota 5,0 de 5 · 6 avaliações no Google", "Ver todas as avaliações no Google"],
    ["/en", "Rated 5.0 out of 5 · 6 reviews on Google", "See all reviews on Google"],
    ["/es", "Nota 5,0 de 5 · 6 opiniones en Google", "Ver todas las opiniones en Google"],
  ] as const) {
    await page.goto(`${prefix}/`);
    const sec = page.locator("#avaliacoes-title").locator("xpath=ancestor::section[1]");
    await expect(sec.getByText(summary)).toBeVisible();
    await expect(sec.getByRole("link", { name: button })).toHaveAttribute("href", "https://www.google.com/maps?cid=2387843673426098565");
    await expect(sec.locator("blockquote")).toHaveCount(0);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents().then((t) => t.join(""));
    expect(ld).not.toMatch(/Review|AggregateRating/);
    expect(ld).toContain("share.google/0U02eVQQcknDOJqB7");
  }
});

test("home: ordem das seções e horário 09h–18h", async ({ page }) => {
  await page.goto("/");
  const ids = ["pelvic-title", "signals-title", "avaliacoes-title", "local-title", "conteudos-title", "faq-title"];
  const tops = await page.evaluate((l) => l.map((id) => document.getElementById(id)?.getBoundingClientRect().top ?? -1), ids);
  expect(tops.every((n) => n !== -1)).toBe(true);
  expect(tops).toEqual([...tops].sort((a, b) => a - b));
  await expect(page.getByText("Das 09h às 18h").first()).toBeVisible();
  await expect(page.getByText("Segunda a sexta-feira").first()).toBeVisible();
});
