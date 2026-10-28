import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/sobre/",
  "/tratamentos/",
  "/tratamentos/dor-pelvica/",
  "/como-funciona/",
  "/perguntas-frequentes/",
  "/contato/",
  "/privacidade/",
];
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];

test.describe("acessibilidade (axe, WCAG 2.2 AA)", () => {
  for (const route of routes) {
    test(`axe ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.waitForTimeout(2500); // deixa as animações assentarem
      const r = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      expect(
        r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`),
      ).toEqual([]);
    });
  }
});

test.describe("layout", () => {
  for (const w of widths) {
    test(`sem overflow horizontal em ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 900 });
      for (const route of routes) {
        await page.goto(route);
        const over = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(over, `${route} @${w}`).toBeLessThanOrEqual(0);
      }
    });
  }
});

test.describe("menu mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });
  test("abre, prende o foco, fecha com Esc e devolve o foco", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(page.locator("#menu-mobile")).toBeVisible();
    // o painel ocupa a tela abaixo do cabeçalho (já chegou a ter 2 px de altura)
    expect((await page.locator("#menu-mobile").boundingBox())!.height).toBeGreaterThan(300);
    await expect(page.locator("#menu-mobile a").first()).toBeFocused();
    await expect(page.locator("#conteudo")).toHaveAttribute("inert", "");
    // Tab percorre apenas cabeçalho/menu, nunca o conteúdo atrás
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() => !!document.activeElement?.closest("header"));
      expect(inside).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(page.locator("#menu-mobile")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
    await expect(page.locator("#conteudo")).not.toHaveAttribute("inert", "");
  });
});

test("acordeão: teclado, aria-expanded e conteúdo revelado", async ({ page }) => {
  await page.goto("/perguntas-frequentes/");
  await page.waitForLoadState("networkidle");
  const btn = page.locator("h3 button").first();
  await btn.focus();
  await page.keyboard.press("Enter");
  await expect(btn).toHaveAttribute("aria-expanded", "true");
  const panel = page.locator(`#${await btn.getAttribute("aria-controls")}`);
  await expect(panel).toBeVisible();
  await page.keyboard.press("Space");
  await expect(btn).toHaveAttribute("aria-expanded", "false");
});

test("navegação entre páginas mantém animações funcionando", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("link", { name: "Sobre", exact: true }).first().click();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await expect(page.locator("h1")).toContainText("Minha história");
  await page.waitForTimeout(2500);
  expect(await page.evaluate(() => (window as unknown as { __animOk?: boolean }).__animOk)).toBe(
    true,
  );
  // Rola a página inteira: nada pode ficar oculto depois do ScrollTrigger
  await page.goto("/");
  await page.waitForTimeout(1500);
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(2500);
  const stuck = await page.evaluate(
    () =>
      [
        ...document.querySelectorAll('[data-reveal="fade"], [data-reveal="stagger"] > [data-item]'),
      ].filter((el) => Number(getComputedStyle(el).opacity) < 0.95).length,
  );
  expect(stuck).toBe(0);
  expect(errors).toEqual([]);
});

test("movimento reduzido: nada fica oculto", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.waitForTimeout(800);
  const hidden = await page.evaluate(
    () =>
      [...document.querySelectorAll("[data-reveal], .sw, [data-step], [data-item]")].filter(
        (el) => Number(getComputedStyle(el).opacity) < 0.5,
      ).length +
      [...document.querySelectorAll(".rwi")].filter(
        (el) => getComputedStyle(el).transform !== "none",
      ).length,
  );
  expect(hidden).toBe(0);
  await ctx.close();
});

test("sem JavaScript: todo o conteúdo essencial está visível", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.waitForTimeout(2500);
  const hidden = await page.evaluate(
    () =>
      [...document.querySelectorAll("[data-reveal], .sw, [data-step], [data-item]")].filter(
        (el) => Number(getComputedStyle(el).opacity) < 0.5,
      ).length,
  );
  expect(hidden).toBe(0);
  await expect(page.locator("h1")).toBeVisible();
  await page.goto("/perguntas-frequentes/");
  await expect(page.getByText("É a área da fisioterapia dedicada").first()).toBeVisible();
  await ctx.close();
});

test("revisão: noindex, canonical, robots e sitemap", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/$/);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/tratamentos/dor-pelvica/");
  expect((await request.get("/rota-inexistente/")).status()).toBe(404);
});

test("headings: um h1 por página e sem saltos de nível", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const levels = await page.evaluate(() =>
      [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => Number(h.tagName[1])),
    );
    expect(
      levels.filter((l) => l === 1),
      route,
    ).toHaveLength(1);
    levels.forEach((l, i) => {
      if (i > 0)
        expect(l - levels[i - 1]!, `${route} h${levels[i - 1]}→h${l}`).toBeLessThanOrEqual(1);
    });
  }
});

test("trocar de página sempre abre no topo (link do fim da home -> Como funciona)", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1200);
  const link = page.getByRole("link", { name: "Ver detalhes do atendimento" });
  await link.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(1500);
  await link.click();
  await expect(page).toHaveURL(/\/como-funciona\/$/);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(5);
});
