// Auditoria: overflow horizontal em 8 páginas × 3 idiomas × 5 larguras × 2 temas + capturas de header/rodapé/contato.
import { chromium } from "playwright";
import fs from "node:fs";
const paths = ["/", "/sobre/", "/tratamentos/", "/tratamentos/dor-pelvica/", "/conteudos/", "/perguntas-frequentes/", "/contato/", "/como-funciona/"];
const b = await chromium.launch({ channel: "chrome" });
const bad = [];
for (const w of [320, 390, 768, 1440, 1920]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  for (const th of ["light", "dark"])
    for (const lang of ["", "/en", "/es"])
      for (const p of paths) {
        await page.goto("http://127.0.0.1:4180" + lang + p, { waitUntil: "load" });
        await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), th);
        const sw = await page.evaluate(() => document.documentElement.scrollWidth);
        if (sw > w) bad.push(`${lang}${p} ${w} ${th} sw=${sw}`);
      }
  await ctx.close();
}
console.log(bad.length ? bad.join("\n") : "sem overflow");
fs.mkdirSync("design/brand/v3/shots", { recursive: true });
for (const [name, w, h, th, url] of [
  ["mobile-home-claro", 390, 844, "light", "/"],
  ["mobile-contato-escuro-en", 390, 844, "dark", "/en/contato/"],
  ["desktop-contato-claro-es", 1440, 900, "light", "/es/contato/"],
  ["desktop-sobre-escuro", 1440, 900, "dark", "/sobre/"],
]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:4180" + url, { waitUntil: "networkidle" });
  await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), th);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `design/brand/v3/shots/${name}.png`, fullPage: true });
  await ctx.close();
}
await b.close();
