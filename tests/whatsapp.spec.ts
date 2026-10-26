import { expect, test } from "@playwright/test";
import { waMessage } from "../src/i18n/config";

/**
 * Valida o fluxo de agendamento com o WhatsApp profissional confirmado (NEXT_PUBLIC_WHATSAPP em
 * .env.production). Para testar outro número, use WA_TEST com o mesmo valor usado no build.
 */
const number = process.env.WA_TEST ?? "5562982388209";
const expectedFor = (lang: "pt" | "en" | "es") =>
  `https://wa.me/${number}?text=${encodeURIComponent(waMessage[lang])}`;
const expected = expectedFor("pt");

const pages = ["/", "/tratamentos/dor-pelvica/", "/contato/", "/sobre/", "/como-funciona/"];
for (const [prefix, lang] of [["", "pt"], ["/en", "en"], ["/es", "es"]] as const) {
  for (const route of pages) {
    const url = prefix + route;
    test(`CTAs apontam para o WhatsApp em ${url}`, async ({ page }) => {
      await page.goto(url);
      const links = await page.locator('a[href^="https://wa.me/"]').evaluateAll((els) =>
        els.map((e) => ({
          href: e.getAttribute("href"),
          target: e.getAttribute("target"),
          rel: e.getAttribute("rel"),
        })),
      );
      expect(links.length).toBeGreaterThanOrEqual(3); // header + CTA da página + botão flutuante
      for (const l of links) {
        expect(l.href).toBe(expectedFor(lang));
        expect(l.target).toBe("_blank");
        expect(l.rel).toContain("noopener");
      }
      // nada de rótulos de "canais em preparação" quando há canal real
      await expect(page.getByText("Canais de contato", { exact: true })).toHaveCount(0);
      await expect(page.getByText("em preparação")).toHaveCount(0);
    });
  }
}

test("CTA final da home leva ao WhatsApp", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#cta-title").locator("xpath=ancestor::section[1]").locator("a")).toHaveAttribute(
    "href",
    expected,
  );
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });
  test("botão flutuante visível, tocável e sem cobrir o conteúdo principal", async ({ page }) => {
    await page.goto("/");
    const fab = page.getByLabel("Agendar pelo WhatsApp");
    await expect(fab).toBeVisible();
    const box = (await fab.boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
    expect(box.x + box.width).toBeLessThanOrEqual(390);
    await expect(page.getByRole("link", { name: "Agendar avaliação" }).first()).toHaveAttribute(
      "href",
      expected,
    );
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(page.locator('#menu-mobile a[href^="https://wa.me/"]')).toHaveAttribute(
      "href",
      expected,
    );
  });
});
