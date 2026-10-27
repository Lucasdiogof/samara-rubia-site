// 6 propostas de LOGO da Samara Rúbia (marca pessoal, independente do site).
// Gera SVG (versão principal e versão invertida) e uma prancha PNG de comparação.
// uso: node design/logos/gerar.mjs   (precisa do Chrome instalado para o PNG)
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const out = "design/logos";
mkdirSync(out, { recursive: true });
for (const f of readdirSync(out)) if (/^opcao-|^prancha/.test(f)) rmSync(`${out}/${f}`);

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Montserrat:wght@400;500;600&family=Outfit:wght@300;400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
const FONTS = `@import url('${FONT_URL}');`;
const jakarta = `font-family="'Plus Jakarta Sans', system-ui, sans-serif"`;
const dm = `font-family="'DM Serif Display', Georgia, serif"`;
const fraunces = `font-family="Fraunces, Georgia, serif"`;
const outfit = `font-family="Outfit, system-ui, sans-serif"`;
const mont = `font-family="Montserrat, system-ui, sans-serif"`;

/** Cada proposta: paleta principal (fundo claro) e invertida (fundo escuro/colorido). */
const logos = [
  {
    slug: "1-fita-s",
    nome: "Fita em S",
    light: { bg: "#ffffff", ink: "#3a2330", a: "#c2456f", b: "#f08a7a", tag: "#8a6f7a" },
    dark: { bg: "#3a1f2e", ink: "#ffffff", a: "#f08a7a", b: "#ffc2b5", tag: "#d9b8c4" },
    svg: (c, id) => `
  <defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.a}"/><stop offset="1" stop-color="${c.b}"/></linearGradient></defs>
  <g transform="translate(360 108) scale(1.18)" fill="none" stroke-linecap="round">
    <path d="M-34 -46C30 -72 66 -20 8 6C-50 32 -22 76 46 50" stroke="url(#g${id})" stroke-width="17"/>
    <path d="M-20 -58C36 -78 78 -28 26 -4" stroke="${c.b}" stroke-width="4.5" opacity=".55"/>
    <circle cx="54" cy="-58" r="6" fill="${c.a}" stroke="none"/>
  </g>
  <text x="360" y="266" ${jakarta} font-size="50" font-weight="600" fill="${c.ink}" text-anchor="middle" letter-spacing="-0.025em">Samara Rúbia</text>
  <text x="360" y="304" ${jakarta} font-size="13" font-weight="500" fill="${c.tag}" text-anchor="middle" letter-spacing="0.38em">FISIOTERAPIA PÉLVICA</text>`,
  },
  {
    slug: "2-borboleta-pelvica",
    nome: "Borboleta pélvica",
    light: { bg: "#ffffff", ink: "#4a1d33", a: "#e8685a", b: "#a63a5c", tag: "#8b6a76" },
    dark: { bg: "#4a1d33", ink: "#ffffff", a: "#ff9382", b: "#ffc6ba", tag: "#e1bccb" },
    svg: (c) => {
      const up = `M-4 -4C-20 -50 -78 -52 -76 -14C-75 10 -40 18 -4 8Z`;
      const low = `M-4 16C-34 20 -62 36 -52 58C-44 72 -14 62 -4 32Z`;
      return `
  <g transform="translate(360 106)">
    <path d="${up}" fill="${c.a}"/><path d="${up}" fill="${c.b}" transform="scale(-1 1)"/>
    <path d="${low}" fill="${c.b}" opacity=".9"/><path d="${low}" fill="${c.a}" opacity=".9" transform="scale(-1 1)"/>
    <rect x="-3" y="-26" width="6" height="68" rx="3" fill="${c.ink}" opacity=".85"/>
  </g>
  <text x="360" y="266" ${dm} font-size="56" fill="${c.ink}" text-anchor="middle" letter-spacing="-0.01em">Samara Rúbia</text>
  <text x="360" y="304" ${mont} font-size="12.5" font-weight="500" fill="${c.tag}" text-anchor="middle" letter-spacing="0.46em">FISIOTERAPIA PÉLVICA</text>`;
    },
  },
  {
    slug: "3-monograma-sr",
    nome: "Monograma SR",
    light: { bg: "#ffffff", ink: "#1d2b4a", a: "#1d2b4a", b: "#c9a24f", tag: "#8a7a52" },
    dark: { bg: "#16213a", ink: "#ffffff", a: "#ffffff", b: "#d9b96a", tag: "#d9b96a" },
    svg: (c) => `
  <g transform="translate(168 210)">
    <rect x="-62" y="-62" width="124" height="124" rx="34" fill="${c.a}"/>
    <text x="0" y="22" ${dm} font-size="82" text-anchor="middle" fill="${c.bg}" letter-spacing="-0.06em">S<tspan fill="${c.b}" dx="-8">R</tspan></text>
  </g>
  <text x="258" y="212" ${dm} font-size="60" fill="${c.ink}" letter-spacing="-0.01em">Samara Rúbia</text>
  <path d="M262 240H318" stroke="${c.b}" stroke-width="2.4"/>
  <text x="262" y="276" ${mont} font-size="13" font-weight="500" fill="${c.tag}" letter-spacing="0.34em">FISIOTERAPIA PÉLVICA</text>`,
  },
  {
    slug: "4-folhas",
    nome: "Folhas que se abraçam",
    light: { bg: "#ffffff", ink: "#2f3b34", a: "#5f8a71", b: "#a9c7b3", tag: "#6f8478" },
    dark: { bg: "#24342b", ink: "#ffffff", a: "#a9c7b3", b: "#7fae92", tag: "#c9dccf" },
    svg: (c) => {
      const leaf = `M0 60C-60 34-68-22-16-56C-10-26-5 14 0 60Z`;
      return `
  <g transform="translate(360 104)">
    <path d="${leaf}" fill="${c.a}"/>
    <path d="${leaf}" fill="${c.b}" transform="scale(-1 1)"/>
    <path d="M0 60C0 30 0 4 0 -22" stroke="${c.bg}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  </g>
  <text x="360" y="268" ${fraunces} font-size="54" font-weight="600" fill="${c.ink}" text-anchor="middle" letter-spacing="-0.02em">Samara Rúbia</text>
  <text x="360" y="304" ${outfit} font-size="14" font-weight="400" fill="${c.tag}" text-anchor="middle" letter-spacing="0.4em">FISIOTERAPIA PÉLVICA</text>`;
    },
  },
  {
    slug: "5-acolhimento",
    nome: "Acolhimento (tigela e ponto)",
    light: { bg: "#ffffff", ink: "#4a3a34", a: "#c2674a", b: "#e6a98e", tag: "#9a8478" },
    dark: { bg: "#3b2a25", ink: "#ffffff", a: "#eba98d", b: "#c2674a", tag: "#dcc3b6" },
    svg: (c) => `
  <g transform="translate(168 205)" fill="none" stroke-linecap="round">
    <path d="M-62 -2A62 62 0 0 0 62 -2" stroke="${c.a}" stroke-width="11"/>
    <path d="M-38 -2A38 38 0 0 0 38 -2" stroke="${c.b}" stroke-width="9"/>
    <circle cx="0" cy="-40" r="19" fill="${c.a}" stroke="none"/>
  </g>
  <text x="262" y="214" ${jakarta} font-size="54" font-weight="600" fill="${c.ink}" letter-spacing="-0.035em">samara rúbia</text>
  <text x="264" y="256" ${jakarta} font-size="13" font-weight="500" fill="${c.tag}" letter-spacing="0.36em">FISIOTERAPIA PÉLVICA</text>`,
  },
  {
    slug: "6-editorial",
    nome: "Assinatura editorial",
    light: { bg: "#ffffff", ink: "#5b1f3a", a: "#c2456f", b: "#e8a0b4", tag: "#a8607d" },
    dark: { bg: "#2f1022", ink: "#ffffff", a: "#f08aa8", b: "#c2456f", tag: "#f3c4d2" },
    svg: (c) => `
  <text x="360" y="212" ${outfit} font-size="50" font-weight="300" fill="${c.ink}" text-anchor="middle" letter-spacing="0.22em">SAMARA RÚBIA</text>
  <path d="M190 240H334M386 240H530" stroke="${c.b}" stroke-width="1.6"/>
  <path d="M360 252C340 238 350 226 360 234C370 226 380 238 360 252Z" fill="${c.a}"/>
  <text x="360" y="296" ${dm} font-size="30" font-style="italic" fill="${c.tag}" text-anchor="middle">Fisioterapia Pélvica</text>`,
  },
];

const wrap = (inner, c, withFonts = true) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 420" width="720" height="420" role="img" aria-label="Samara Rúbia, fisioterapeuta pélvica">
  ${withFonts ? `<style>${FONTS}</style>` : ""}
  <rect width="720" height="420" fill="${c.bg}"/>${inner}
</svg>`;

logos.forEach((l, i) => {
  writeFileSync(`${out}/opcao-${l.slug}.svg`, wrap(l.svg(l.light, `${i}L`), l.light));
  writeFileSync(`${out}/opcao-${l.slug}-invertida.svg`, wrap(l.svg(l.dark, `${i}D`), l.dark));
});

const tile = (l, key, i) => `<figure>${wrap(l.svg(l[key], `${i}${key[0]}b`), l[key], false)}</figure>`;
writeFileSync(
  `${out}/prancha.html`,
  `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><link rel="stylesheet" href="${FONT_URL}">
<style>
body{margin:0;background:#f3f1f2;font-family:'Plus Jakarta Sans',sans-serif;color:#2a2327;padding:36px}
h1{font:400 38px 'DM Serif Display',serif;margin:0 0 4px} p.sub{margin:0 0 28px;font-size:14px;color:#6c6066}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:26px 30px}
.opt h2{font:600 12.5px 'Plus Jakarta Sans';letter-spacing:.16em;text-transform:uppercase;margin:0 0 9px;color:#6c6066}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:10px}
svg{display:block;width:100%;height:auto;border-radius:16px;box-shadow:0 1px 2px rgba(40,20,30,.08),0 16px 32px -20px rgba(40,20,30,.45)}
figure{margin:0}
</style><h1>Samara Rúbia — 6 propostas de logo</h1>
<p class="sub">Marca pessoal, independente do site · versão principal e invertida</p>
<div class="grid">${logos
    .map((l, i) => `<div class="opt"><h2>${i + 1}. ${l.nome}</h2><div class="pair">${tile(l, "light", i)}${tile(l, "dark", i)}</div></div>`)
    .join("")}</div></html>`,
);

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1500, height: 900 }, deviceScaleFactor: 1.5 });
await page.goto(`file:///${process.cwd().replaceAll("\\", "/")}/${out}/prancha.html`);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}/prancha.png`, fullPage: true });
await browser.close();
console.log("ok");
