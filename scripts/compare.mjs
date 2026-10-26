// Capturas comparáveis (antes/depois) de seções-chave + altura total da página.
// uso: BASE_URL=https://... node scripts/compare.mjs <antes|depois>
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://127.0.0.1:4173";
const tag = process.argv[2] ?? "antes";
const dir = "docs/audit/antes-depois";
mkdirSync(dir, { recursive: true });

const sections = { hero: "section:has(h1)", areas: "#areas-title", dif: "#dif-title", local: "#local-title" };
const browser = await chromium.launch({ channel: "chrome" });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const height = await page.evaluate(() => document.body.scrollHeight);
  console.log(`${tag} ${w}px altura total: ${height}`);
  for (const [name, sel] of Object.entries(sections)) {
    await page.evaluate((s) => {
      document.documentElement.style.scrollBehavior = "auto";
      const el = document.querySelector(s);
      const sec = el?.closest("section") ?? el;
      window.scrollTo(0, sec.getBoundingClientRect().top + window.scrollY - (s === "section:has(h1)" ? 0 : 60));
    }, sel);
    await page.waitForTimeout(2200);
    await page.screenshot({ path: `${dir}/${tag}-${w}-${name}.jpg`, type: "jpeg", quality: 72 });
  }
  await page.close();
}
await browser.close();
