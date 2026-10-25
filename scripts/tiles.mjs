// Recortes por viewport (hero e seções) para inspeção visual detalhada.
// uso: BASE_URL=https://... node scripts/tiles.mjs largura pasta [rota]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://127.0.0.1:4173";
const w = Number(process.argv[2] ?? 390);
const dir = process.argv[3] ?? "docs/audit/tiles";
const route = process.argv[4] ?? "/";
const h = Number(process.env.H ?? 900);
mkdirSync(dir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: w, height: h } });
await page.goto(base + route, { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
const total = await page.evaluate(() => document.body.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += h - 100) {
  await page.evaluate((yy) => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, yy);
  }, y);
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${dir}/${w}-${String(i++).padStart(2, "0")}.jpg`, type: "jpeg", quality: 70 });
}
await browser.close();
console.log(`${i} recortes`);
