import { expect, test } from "@playwright/test";
import { pt } from "../src/i18n/pt";
import { en } from "../src/i18n/en";
import { es } from "../src/i18n/es";
import { waMessage } from "../src/i18n/config";

const stateFor = (n: number) => (n === 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 5 ? 3 : 4);

for (const [prefix, lang, d] of [["", "pt", pt], ["/en", "en", en], ["/es", "es", es]] as const) {
  test(`questionário: todas as quantidades, marcar e desmarcar (${lang})`, async ({ page }) => {
    await page.goto(`${prefix}/`);
    const section = page.locator("#signals-title").locator("xpath=ancestor::section");
    const boxes = section.getByRole("checkbox");
    await expect(boxes).toHaveCount(8);
    const live = section.locator("[aria-live]");
    const check = async (n: number) => {
      await expect(live).toContainText(d.signals.states[stateFor(n)]!.title);
      await expect(live).toContainText(`${n} ${d.signals.of} 8`);
    };
    await check(0);
    for (let i = 0; i < 8; i++) {
      await boxes.nth(i).check({ force: true });
      await expect(boxes.nth(i)).toBeChecked();
      await check(i + 1);
    }
    for (let i = 7; i >= 0; i--) {
      await boxes.nth(i).uncheck({ force: true });
      await check(i);
    }
    // teclado: Tab até o primeiro card e Espaço marca
    await boxes.first().focus();
    await page.keyboard.press("Space");
    await expect(boxes.first()).toBeChecked();
    await check(1);
  });
}

test("questionário: privacidade (nada em storage/cookies, WhatsApp genérico)", async ({ page }) => {
  await page.goto("/");
  const snap = () =>
    page.evaluate(() => JSON.stringify([{ ...localStorage }, document.cookie]));
  const before = await snap();
  const boxes = page.getByRole("checkbox");
  for (let i = 0; i < 4; i++) await boxes.nth(i).check({ force: true });
  expect(await snap()).toBe(before); // seleções não escrevem em localStorage nem cookies
  const hrefs = await page.locator('a[href^="https://wa.me/"]').evaluateAll((a) => a.map((e) => e.getAttribute("href")));
  for (const h of hrefs) expect(decodeURIComponent(h!.split("text=")[1]!)).toBe(waMessage.pt);
});

test("home não tem mais a jornada; /como-funciona/ continua", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#jornada-title")).toHaveCount(0);
  await page.goto("/como-funciona/");
  await expect(page.locator("#jornada-title")).toHaveCount(1);
});
