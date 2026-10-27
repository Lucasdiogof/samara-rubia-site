// Gera design/brand/v3/comparacao.png. Não toca no site: serve out/ só para ler, e troca as imagens da logo no DOM.
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
const V3 = "design/brand/v3";
const b64 = (f) => "data:image/png;base64," + fs.readFileSync(f).toString("base64");
const srv = spawn("python", ["-m", "http.server", "8788", "--directory", "out"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 1500));
const browser = await chromium.launch({ channel: "chrome" });
const shots = {};
for (const th of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:8788/", { waitUntil: "networkidle" });
  await page.evaluate(({ th, mark, sig }) => {
    document.documentElement.setAttribute("data-theme", th);
    document.querySelectorAll("img.logo-light, img.logo-dark").forEach((i) => {
      const lock = i.getAttribute("src").includes("lockup");
      i.removeAttribute("srcset"); i.loading = "eager";
      i.src = lock ? sig : mark;
    });
  }, { th, mark: b64(`${V3}/small-${th}-64.png`), sig: b64(`${V3}/signature-${th}.png`) });
  await page.waitForTimeout(600);
  shots[`header-${th}`] = (await page.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 84 } })).toString("base64");
  await page.evaluate(() => document.querySelector("footer:has(img.logo-light)").scrollIntoView());
  await page.waitForTimeout(900); await page.waitForTimeout(2500);
  const f = await page.locator("footer:has(img.logo-light)").last();
  shots[`footer-${th}`] = (await f.screenshot()).toString("base64");
  await ctx.close();
}
const png = (k) => `data:image/png;base64,${shots[k]}`;
const orig = "data:image/webp;base64," + fs.readFileSync("design/brand/src-rosegold.webp").toString("base64");
const img = (f, s = "") => `<img src="${b64(`${V3}/${f}`)}" style="${s}">`;
const sheet = `<!doctype html><meta charset=utf8><style>
body{margin:0;background:#2a2a2a;color:#eee;font:14px system-ui;padding:28px;width:1900px}
h2{font:600 13px system-ui;letter-spacing:.12em;text-transform:uppercase;color:#bbb;margin:30px 0 10px}
.row{display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap}.t{padding:18px;border-radius:8px;display:flex;gap:18px;align-items:center}
.cream{background:#fcf8f1}.cocoa{background:#372c27}.mag{background:#ff00ff}.px{image-rendering:pixelated}
small{display:block;color:#999;margin-top:4px}
</style>
<h2>1 · Original (com CREFITO 338376-F, fora dos arquivos novos) · 2 · Assinatura tema claro · 3 · Assinatura tema escuro</h2>
<div class=row>
 <div><img src="${orig}" style="width:520px;border-radius:6px"></div>
 <div class="t cream" style="width:520px;height:520px;justify-content:center">${img("signature-light.png", "width:480px")}</div>
 <div class="t cocoa" style="width:520px;height:520px;justify-content:center">${img("signature-dark.png", "width:480px")}</div>
</div>
<h2>Teste de halo: mesma arte sobre magenta puro (borda suja aparece aqui) e monograma detalhado</h2>
<div class=row>
 <div class="t mag">${img("signature-dark.png", "height:260px")}${img("signature-light.png", "height:260px")}</div>
 <div class="t cream">${img("mark-light.png", "height:260px")}</div><div class="t cocoa">${img("mark-dark.png", "height:260px")}</div>
</div>
<h2>4 · Monograma pequeno (simplificado) · 16 / 32 / 46 / 64 px reais, e ampliado 6× sem suavização</h2>
<div class=row>
 ${["light", "dark"].map((th) => `<div class="t ${th === "light" ? "cream" : "cocoa"}">${[16, 32, 46, 64].map((s) => `<div>${img(`small-${th}-${s}.png`, `width:${s}px;height:${s}px`)}</div>`).join("")}<span style="width:20px"></span>${[16, 32, 46, 64].map((s) => `<div>${img(`small-${th}-${s}.png`, `width:${s * 3}px;height:${s * 3}px`).replace("<img", '<img class=px')}</div>`).join("")}</div>`).join("")}
</div>
<h2>5 · Favicon 16 / 32 / 48 px (tamanho real e 6× sem suavização)</h2>
<div class=row><div class="t" style="background:#fff;color:#000">${[16, 32, 48].map((s) => img(`favicon-${s}.png`, `width:${s}px;height:${s}px`)).join("")}</div>
<div class="t" style="background:#202124">${[16, 32, 48].map((s) => img(`favicon-${s}.png`, `width:${s}px;height:${s}px`)).join("")}</div>
<div class="t cream">${[16, 32, 48].map((s) => img(`favicon-${s}.png`, `width:${s * 6}px;height:${s * 6}px`).replace("<img", "<img class=px")).join("")}</div></div>
<h2>6 · Header e rodapé reais do site (claro e escuro), com as imagens novas trocadas só no navegador</h2>
<img src="${png("header-light")}" style="width:1440px;display:block"><div style="height:8px"></div>
<img src="${png("header-dark")}" style="width:1440px;display:block"><div style="height:14px"></div>
<img src="${png("footer-light")}" style="width:1440px;display:block"><div style="height:8px"></div>
<img src="${png("footer-dark")}" style="width:1440px;display:block">`;
fs.writeFileSync(`${V3}/comparacao.html`, sheet);
const p = await browser.newPage({ viewport: { width: 1956, height: 900 } });
await p.goto(pathToFileURL(`${process.cwd()}/${V3}/comparacao.html`).href);
await p.waitForTimeout(800);
await p.screenshot({ path: `${V3}/comparacao.png`, fullPage: true });
await browser.close(); srv.kill();
console.log("ok");
