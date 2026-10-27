import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/", "/sobre/", "/tratamentos/dor-pelvica/", "/perguntas-frequentes/", "/contato/"];
const langs = [
  { prefix: "", html: "pt-BR" },
  { prefix: "/en", html: "en" },
  { prefix: "/es", html: "es" },
];

test.describe("idiomas e tema: acessibilidade em claro e escuro", () => {
  for (const { prefix } of langs) {
    for (const theme of ["light", "dark"] as const) {
      for (const p of pages) {
        const url = prefix + (p === "/" && prefix ? "/" : p);
        test(`axe ${url} (${theme})`, async ({ page }) => {
          await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
          await page.goto(url);
          await page.waitForTimeout(2500);
          expect(await page.locator("html").getAttribute("data-theme")).toBe(theme);
          const r = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
            .analyze();
          expect(
            r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`),
          ).toEqual([]);
        });
      }
    }
  }
});

test("html lang, hreflang e seletor de idioma mantêm a página", async ({ page }) => {
  for (const { prefix, html } of langs) {
    await page.goto(`${prefix}/sobre/`);
    expect(await page.locator("html").getAttribute("lang")).toBe(html);
    const alt = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) =>
      els.map((e) => e.getAttribute("hreflang")),
    );
    expect(alt).toEqual(["pt-BR", "en", "es", "x-default"]);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/sobre/");
  await page.getByRole("navigation", { name: "Idioma" }).getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en\/sobre\/$/);
  await page.getByRole("navigation", { name: "Language" }).getByRole("link", { name: "ES" }).click();
  await expect(page).toHaveURL(/\/es\/sobre\/$/);
});

test("alternador de tema salva a escolha", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/en/");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "dark");
});

test("404.html estilizado em português", async ({ page }) => {
  const r = await page.goto("/rota-que-nao-existe/");
  expect(r?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("não existe");
  // o seletor de idioma não pode levar a páginas inexistentes: vai para a home de cada idioma
  for (const l of ["en", "es"]) {
    const hrefs = await page.locator(`a[hreflang="${l}"]`).evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const h of hrefs) expect(h).toBe(`/${l}/`);
  }
});

test("sitemap lista os 3 idiomas e não expõe a rota interna do 404", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).toContain("/en/sobre/");
  expect(xml).toContain("/es/tratamentos/dor-pelvica/");
  expect(xml).not.toContain("nao-encontrada");
});
