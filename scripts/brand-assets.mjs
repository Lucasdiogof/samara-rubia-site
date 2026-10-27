// Gera og.png (compartilhamento) e os ícones a partir da marca atual. Rode após `npm run build`:
//   npm run brand   (usa as fontes do próprio site em out/; não altera nada além dos arquivos abaixo)
// Para trocar o og.png por uma versão com foto, basta substituir public/og.png (1200×630).
import sharp from "sharp";
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ogProblems } from "./og-check.mjs";

const C = {
  vanilla: "#FCF8F1",
  cream: "#EEE4D5",
  sand: "#D6C2A7",
  taupe: "#B1977C",
  cocoa: "#735C4C",
  deep: "#372C27",
};

// Ícones: monograma SR da logo (variante para fundo escuro) sobre cacau profundo.
const b64 = (f) => readFileSync(f).toString("base64");
const markDark = b64("design/brand/v3/mark-dark.png");
const markLight = b64("design/brand/v3/mark-light.png");
const cutout = b64("design/brand/hero-cutout.png");
const iconSvg = (r) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="${r}" fill="${C.deep}"/>
<image href="data:image/png;base64,${markDark}" x="10" y="10" width="44" height="44"/></svg>`;

mkdirSync("public", { recursive: true });
const png = (svg, s) =>
  sharp(Buffer.from(svg), { density: 384 }).resize(s, s).png({ compressionLevel: 9 }).toBuffer();
rmSync("src/app/icon.svg", { force: true });
writeFileSync("src/app/icon.png", await png(iconSvg(14), 512));
writeFileSync("src/app/apple-icon.png", await png(iconSvg(0), 180));
writeFileSync("public/icon-192.png", await png(iconSvg(14), 192));
writeFileSync("public/icon-512.png", await png(iconSvg(14), 512));
// favicon.ico com PNGs embutidos (16, 32, 48)
const sizes = [16, 32, 48];
// o .ico usa os favicons otimizados por tamanho (design/brand/v3), não a redução do ícone grande
const imgs = sizes.map((s) => readFileSync(`design/brand/v3/favicon-${s}.png`));
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(sizes.length, 4);
let off = head.length;
imgs.forEach((b, i) => {
  const o = 6 + 16 * i;
  head[o] = head[o + 1] = sizes[i];
  head.writeUInt16LE(1, o + 4);
  head.writeUInt16LE(32, o + 6);
  head.writeUInt32LE(b.length, o + 8);
  head.writeUInt32LE(off, o + 12);
  off += b.length;
});
writeFileSync("src/app/favicon.ico", Buffer.concat([head, ...imgs]));

// og.png: composição renderizada no Chrome com as fontes do site (out/ precisa existir).
const ogBody = (C) => `
<div style="position:relative;width:1200px;height:630px;overflow:hidden;background:${C.vanilla}">
  <svg style="position:absolute;left:-180px;top:260px" width="620" height="620" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="${C.cream}" opacity=".7"/></svg>
  <svg style="position:absolute;right:70px;top:60px" width="400" height="510" viewBox="0 0 400 510">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EFE3D2"/><stop offset=".6" stop-color="#E2CDB4"/><stop offset="1" stop-color="#CDAE91"/></linearGradient>
      <radialGradient id="g2" cx=".5" cy=".3" r=".62"><stop offset="0" stop-color="#FFF8EC" stop-opacity=".85"/><stop offset="1" stop-color="#FFF8EC" stop-opacity="0"/></radialGradient>
    </defs>
    <path d="M0 510V200a200 200 0 0 1 400 0v310z" fill="url(#g1)"/>
    <path d="M0 510V200a200 200 0 0 1 400 0v310z" fill="url(#g2)"/>
  </svg>
  <img src="data:image/png;base64,${cutout}" style="position:absolute;right:70px;top:60px;width:400px;height:510px;object-fit:contain;object-position:50% 100%;clip-path:inset(0 round 200px 200px 0 0)"/>
  <svg style="position:absolute;right:58px;top:48px" width="424" height="534" viewBox="0 0 424 534"><path d="M.75 533.25V212a211.25 211.25 0 0 1 422.5 0v321.25z" fill="none" stroke="${C.taupe}" stroke-width="1.5"/></svg>
  <img src="data:image/png;base64,${markLight}" style="position:absolute;left:76px;top:56px;width:84px;height:84px;object-fit:contain"/>
  <div style="position:absolute;left:80px;top:178px;width:600px;color:${C.deep}">
    <p style="font-family:var(--font-manrope),sans-serif;font-size:19px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:${C.cocoa}">Fisioterapia Pélvica</p>
    <p style="font-family:var(--font-cormorant),serif;font-weight:500;font-size:112px;line-height:1;letter-spacing:-.01em;margin-top:26px">Samara<br>Rúbia</p>
    <p style="font-family:var(--font-cormorant),serif;font-style:italic;font-size:36px;color:${C.cocoa};margin-top:30px">Cuidado que acolhe.</p>
  </div>
  <p style="position:absolute;left:176px;top:86px;font-family:var(--font-manrope),sans-serif;font-size:19px;letter-spacing:.06em;color:${C.cocoa}">samararubia.com</p>
</div>`;
const srv = spawn("node", ["scripts/serve-out.mjs"], {
  env: { ...process.env, PORT: "4179" },
  stdio: "ignore",
});
await new Promise((r) => setTimeout(r, 1500));
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  // Página isolada (sem React/hidratação), servida na mesma origem para carregar as fontes do site.
  const css = readdirSync("out/_next/static/chunks")
    .filter((f) => f.endsWith(".css"))
    .map((f) => readFileSync(join("out/_next/static/chunks", f), "utf8"))
    .join(" ");
  const fontFaces = [...css.matchAll(/@font-face\{[^}]*\}/g)]
    .map((m) => m[0].replaceAll("../media/", "/_next/static/media/"))
    .join(" ");
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${fontFaces}
:root{--font-cormorant:"Cormorant Garamond";--font-manrope:Manrope}p{margin:0}html,body{margin:0;padding:0;background:${C.vanilla}}</style></head><body>${ogBody(C)}</body></html>`;
  await page.route("http://127.0.0.1:4179/__og.html", (r) =>
    r.fulfill({ contentType: "text/html; charset=utf-8", body: html }),
  );
  await page.goto("http://127.0.0.1:4179/__og.html");
  await page.evaluate(() =>
    Promise.all(
      [
        "500 112px 'Cormorant Garamond'",
        "italic 400 36px 'Cormorant Garamond'",
        "600 19px Manrope",
      ].map((f) => document.fonts.load(f, "Samara Rúbia")),
    ),
  );
  await page.evaluate(() => document.fonts.ready);
  // Falha cedo se a página não for a arte esperada (ex.: 404 do site) ou se a fonte não carregou.
  const text = await page.evaluate(() => document.body.textContent);
  if (
    !text.includes("Samara") ||
    !text.includes("Fisioterapia Pélvica") ||
    /não existe/i.test(text)
  )
    throw new Error("composição OG inválida: " + text.slice(0, 80));
  if (
    !(await page.evaluate(() => document.fonts.check("500 112px 'Cormorant Garamond'", "Samara")))
  )
    throw new Error("fonte Cormorant não carregou");
  const shot = await page.screenshot({ type: "png" });
  writeFileSync(
    "public/og.png",
    await sharp(shot).png({ palette: true, quality: 90, compressionLevel: 9 }).toBuffer(),
  );
} finally {
  await browser.close();
  srv.kill();
}
console.log(
  "gerados: public/og.png, public/icon-192.png, public/icon-512.png, src/app/{icon.svg,apple-icon.png,favicon.ico}",
);
