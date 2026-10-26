import { expect, test } from "@playwright/test";

/**
 * Valida o fluxo de agendamento com WhatsApp configurado. Só roda em um build feito com
 * NEXT_PUBLIC_WHATSAPP (número FICTÍCIO, apenas local; nunca publicar esse build):
 *   NEXT_PUBLIC_WHATSAPP=5511900000000 npm run build && WA_TEST=5511900000000 npx playwright test whatsapp
 */
const number = process.env.WA_TEST;
test.skip(!number, "defina WA_TEST com o mesmo número usado no build");

const message =
  "Olá, Samara! Gostaria de saber mais sobre o atendimento de fisioterapia pélvica e agendar uma avaliação.";
const expected = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

for (const route of ["/", "/tratamentos/dor-pelvica/", "/contato/", "/sobre/", "/como-funciona/"]) {
  test(`CTAs apontam para o WhatsApp em ${route}`, async ({ page }) => {
    await page.goto(route);
    const links = await page.locator('a[href^="https://wa.me/"]').evaluateAll((els) =>
      els.map((e) => ({
        href: e.getAttribute("href"),
        target: e.getAttribute("target"),
        rel: e.getAttribute("rel"),
      })),
    );
    expect(links.length).toBeGreaterThanOrEqual(3); // header + CTA da página + botão flutuante
    for (const l of links) {
      expect(l.href).toBe(expected);
      expect(l.target).toBe("_blank");
      expect(l.rel).toContain("noopener");
    }
    // nada de rótulos de "canais em preparação" quando há canal real
    await expect(page.getByText("Canais de contato", { exact: true })).toHaveCount(0);
    await expect(page.getByText("em preparação")).toHaveCount(0);
  });
}

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
