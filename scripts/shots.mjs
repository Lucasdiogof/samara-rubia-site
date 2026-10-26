// Captura screenshots de página inteira em várias larguras (Chrome real).
// uso: BASE_URL=https://... node scripts/shots.mjs [pasta]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://127.0.0.1:4173";
const dir = process.argv[2] ?? "docs/audit";
mkdirSync(dir, { recursive: true });

const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const inner = {
  sobre: "/sobre/",
  tratamentos: "/tratamentos/",
  contato: "/contato/",
  faq: "/perguntas-frequentes/",
};

const browser = await chromium.launch({ channel: "chrome" });

async function shot(path, name, w) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 400) {
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(2200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${dir}/${name}-${w}.jpg`,
    fullPage: true,
    type: "jpeg",
    quality: 55,
  });
  await page.close();
}

for (const w of widths) await shot("/", "home", w);
for (const [n, p] of Object.entries(inner)) for (const w of [390, 1440]) await shot(p, n, w);
await browser.close();
console.log("ok");
