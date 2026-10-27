// Gera 6 propostas de logo (SVG claro e escuro) e uma prancha de comparação (PNG).
// uso: node design/logos/gerar.mjs        (precisa do Chrome instalado para o PNG)
// Fontes: Cormorant Garamond + Manrope (as mesmas do site, Google Fonts).
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const out = "design/logos";
mkdirSync(out, { recursive: true });

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500&family=Manrope:wght@500;600;700&display=swap');`;
const light = { ink: "#372c27", accent: "#735c4c", soft: "#b1977c", fill: "#d6c2a7", bg: "#fcf8f1" };
const dark = { ink: "#fcf8f1", accent: "#d6c2a7", soft: "#b1977c", fill: "#735c4c", bg: "#372c27" };

const serif = `font-family="'Cormorant Garamond', Georgia, serif"`;
const sans = `font-family="Manrope, system-ui, sans-serif"`;
const tag = (c, x, y, size = 15, ls = 0.42, anchor = "middle", text = "FISIOTERAPIA PÉLVICA") =>
  `<text x="${x}" y="${y}" ${sans} font-size="${size}" font-weight="600" letter-spacing="${ls}em" fill="${c.accent}" text-anchor="${anchor}">${text}</text>`;

/** Cada logo devolve o conteúdo SVG (viewBox 0 0 720 420) para uma paleta. */
const logos = [
  {
    slug: "1-monograma-arco",
    nome: "Monograma em arco",
    svg: (c) => `
  <g transform="translate(360 112)" fill="none" stroke="${c.accent}" stroke-linecap="round">
    <path d="M-52 62V0a52 52 0 0 1 104 0v62" stroke-width="2.6"/>
    <path d="M-36 62V2a36 36 0 0 1 72 0v60" stroke-width="1.4" opacity=".55"/>
    <path d="M-70 62H70" stroke-width="1.4" opacity=".55"/>
  </g>
  <text x="360" y="158" ${serif} font-size="54" font-style="italic" font-weight="500" fill="${c.ink}" text-anchor="middle" letter-spacing="-0.02em">SR</text>
  <text x="360" y="268" ${serif} font-size="66" font-weight="500" fill="${c.ink}" text-anchor="middle" letter-spacing="-0.01em">Samara Rúbia</text>
  ${tag(c, 360, 310)}`,
  },
  {
    slug: "2-arco-e-sol",
    nome: "Arco e sol (horizontal)",
    svg: (c) => `
  <g transform="translate(150 210)">
    <circle cx="34" cy="-34" r="26" fill="${c.fill}"/>
    <path d="M-48 70V-8a62 62 0 0 1 124 0v78" fill="none" stroke="${c.accent}" stroke-width="3"/>
    <path d="M-24 70V-6a38 38 0 0 1 76 0v76" fill="none" stroke="${c.accent}" stroke-width="1.5" opacity=".5"/>
  </g>
  <text x="262" y="206" ${serif} font-size="72" font-weight="500" fill="${c.ink}" letter-spacing="-0.01em">Samara</text>
  <text x="262" y="270" ${serif} font-size="72" font-style="italic" font-weight="400" fill="${c.accent}" letter-spacing="-0.01em">Rúbia</text>
  <path d="M266 296H330" stroke="${c.soft}" stroke-width="1.5"/>
  ${tag(c, 266, 326, 13, 0.34, "start")}`,
  },
  {
    slug: "3-pelve-borboleta",
    nome: "Pelve em traço único",
    svg: (c) => {
      const wing = `<path d="M0 -6C-22 -42 -74 -54 -84 -18C-93 14 -56 42 -24 54C-12 59 -4 64 0 74"/>`;
      return `
  <g transform="translate(360 112)" fill="none" stroke="${c.accent}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
    ${wing}
    <g transform="scale(-1 1)">${wing}</g>
    <path d="M-15 20a15 15 0 0 1 30 0v12" stroke-width="2.4"/>
    <path d="M-50 -18C-44 6 -28 22 -10 32M50 -18C44 6 28 22 10 32" stroke-width="1.4" opacity=".5"/>
    <circle cx="0" cy="-26" r="3.4" fill="${c.accent}" stroke="none"/>
  </g>
  <text x="360" y="262" ${serif} font-size="64" font-weight="500" fill="${c.ink}" text-anchor="middle" letter-spacing="-0.01em">Samara Rúbia</text>
  ${tag(c, 360, 304)}`;
    },
  },
  {
    slug: "4-lotus",
    nome: "Lótus de linha fina",
    svg: (c) => {
      const petal = (rot, s, op) =>
        `<path transform="rotate(${rot} 0 46) scale(${s})" d="M0 46C-24 16 -24 -22 0 -48C24 -22 24 16 0 46Z" opacity="${op}"/>`;
      return `
  <g transform="translate(360 108)" fill="none" stroke="${c.accent}" stroke-width="2.4" stroke-linejoin="round">
    <circle cx="0" cy="12" r="76" stroke-width="1.2" opacity=".45"/>
    ${petal(-66, 0.82, 0.7)}${petal(66, 0.82, 0.7)}${petal(-33, 0.94, 0.85)}${petal(33, 0.94, 0.85)}${petal(0, 1, 1)}
    <path d="M-30 58H30" stroke-width="1.4" opacity=".6"/>
  </g>
  <text x="360" y="268" ${serif} font-size="64" font-weight="500" fill="${c.ink}" text-anchor="middle" letter-spacing="-0.01em">Samara Rúbia</text>
  <path d="M170 292H222M498 292H550" stroke="${c.soft}" stroke-width="1.2"/>
  ${tag(c, 360, 297, 13, 0.34)}`;
    },
  },
  {
    slug: "5-selo-circular",
    nome: "Selo circular",
    svg: (c) => `
  <defs><path id="ring-${c.bg.slice(1)}" d="M360 210m-92 0a92 92 0 1 1 184 0a92 92 0 1 1-184 0"/></defs>
  <circle cx="360" cy="210" r="140" fill="none" stroke="${c.accent}" stroke-width="2.4"/>
  <circle cx="360" cy="210" r="128" fill="none" stroke="${c.soft}" stroke-width="1" opacity=".7"/>
  <circle cx="360" cy="210" r="66" fill="none" stroke="${c.soft}" stroke-width="1" opacity=".7"/>
  <text ${sans} font-size="14" font-weight="600" fill="${c.accent}" letter-spacing="0.1em">
    <textPath href="#ring-${c.bg.slice(1)}" textLength="570" lengthAdjust="spacing">SAMARA RÚBIA · FISIOTERAPIA PÉLVICA · GOIÂNIA · </textPath>
  </text>
  <path d="M338 236V208a22 22 0 0 1 44 0v28" fill="none" stroke="${c.soft}" stroke-width="1.4" opacity=".7"/>
  <text x="360" y="232" ${serif} font-size="64" font-style="italic" font-weight="500" fill="${c.ink}" text-anchor="middle" letter-spacing="-0.02em">SR</text>`,
  },
  {
    slug: "6-editorial",
    nome: "Tipográfico editorial",
    svg: (c) => `
  <path d="M170 118V302" stroke="${c.accent}" stroke-width="2.4"/>
  <circle cx="170" cy="104" r="5" fill="${c.fill}"/>
  <text x="206" y="204" ${serif} font-size="104" font-weight="500" fill="${c.ink}" letter-spacing="-0.025em">Samara</text>
  <text x="206" y="290" ${serif} font-size="104" font-style="italic" font-weight="400" fill="${c.accent}" letter-spacing="-0.025em">Rúbia</text>
  ${tag(c, 212, 330, 13, 0.4, "start")}`,
  },
];

const wrap = (inner, c, withBg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 420" width="720" height="420" role="img" aria-label="Samara Rúbia, fisioterapeuta pélvica">
  <style>${FONTS}</style>
  ${withBg ? `<rect width="720" height="420" fill="${c.bg}"/>` : ""}${inner}
</svg>`;

for (const l of logos) {
  writeFileSync(`${out}/opcao-${l.slug}.svg`, wrap(l.svg(light), light, true));
  writeFileSync(`${out}/opcao-${l.slug}-escuro.svg`, wrap(l.svg(dark), dark, true));
}

const tile = (l, c) => `<figure><div class="art">${wrap(l.svg(c), c, true).replace("<style>" + FONTS + "</style>", "")}</div></figure>`;
const board = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500&family=Manrope:wght@500;600;700&display=swap">
<style>
body{margin:0;background:#eee4d5;font-family:Manrope,sans-serif;color:#372c27;padding:36px}
h1{font:500 34px 'Cormorant Garamond',serif;margin:0 0 4px} p.sub{margin:0 0 28px;font-size:14px;color:#735c4c}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px 26px}
.opt h2{font:600 13px Manrope;letter-spacing:.16em;text-transform:uppercase;margin:0 0 8px;color:#735c4c}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.art svg{display:block;width:100%;height:auto;border-radius:14px;box-shadow:0 1px 2px rgba(55,44,39,.08),0 14px 30px -18px rgba(55,44,39,.4)}
figure{margin:0}
</style><h1>Samara Rúbia — 6 propostas de logo</h1>
<p class="sub">Cada uma no tema claro e no escuro · paleta Cacau &amp; Baunilha · Cormorant Garamond + Manrope</p>
<div class="grid">${logos
  .map((l, i) => `<div class="opt"><h2>${i + 1}. ${l.nome}</h2><div class="pair">${tile(l, light)}${tile(l, dark)}</div></div>`)
  .join("")}</div></html>`;
writeFileSync(`${out}/prancha.html`, board);

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1500, height: 900 }, deviceScaleFactor: 1.5 });
await page.goto(`file:///${process.cwd().replaceAll("\\", "/")}/${out}/prancha.html`);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);
await page.screenshot({ path: `${out}/prancha.png`, fullPage: true });
await browser.close();
console.log("ok");
