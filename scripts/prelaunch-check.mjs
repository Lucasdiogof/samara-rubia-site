// Checklist de pré-lançamento. Só lê; nunca altera arquivos nem flags. Sempre sai com 0
// (não bloqueia o deploy de revisão); use --strict para sair com 1 se algo faltar.
//   npm run build && npm run prelaunch:check
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";
import { ogProblems } from "./og-check.mjs";

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
const site = read("src/config/site.ts");
const env = Object.fromEntries(
  read(".env.production")
    .split(/\r?\n/)
    .filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()]),
);
const nullField = (name) => new RegExp(String.raw`\b${name}:\s*null\b`).test(site);
const emptyList = (name) => new RegExp(String.raw`\b${name}:\s*\[\]`).test(site);

const rows = [];
const add = (group, label, ok, detail = "") => rows.push({ group, label, ok, detail });
const hasOut = existsSync("out/index.html");

// Domínio e indexação
const url = env.NEXT_PUBLIC_SITE_URL ?? "";
add(
  "Domínio",
  "URL oficial configurada",
  /^https:\/\/[^/]+$/.test(url) && !/workers\.dev|localhost/.test(url),
  url || "ausente",
);
add(
  "Domínio",
  "Indexação liberada (NEXT_PUBLIC_INDEXABLE)",
  env.NEXT_PUBLIC_INDEXABLE === "true",
  env.NEXT_PUBLIC_INDEXABLE === "true" ? "true" : "false (liberar só após aprovação da Samara)",
);

// Dados profissionais
add("Dados profissionais", "Nome profissional completo", !nullField("professionalName"));
add("Dados profissionais", "CREFITO", !nullField("crefito"));
add("Dados profissionais", "Biografia (src/i18n/pt.ts: bio)", /\bbio: \[\s*"/.test(read("src/i18n/pt.ts")));
add("Dados profissionais", "Formação", !emptyList("education"));
add("Dados profissionais", "Cidade e endereço", !nullField("city") && !nullField("address"));
add("Dados profissionais", "Modalidades de atendimento", !emptyList("modalities"));
add("Dados profissionais", "Horários", !nullField("hours"));

// Contatos
const wa = env.NEXT_PUBLIC_WHATSAPP ?? "";
add(
  "Contatos",
  "WhatsApp válido (55 + DDD + número, só dígitos)",
  /^55\d{10,11}$/.test(wa),
  wa ? "" : "ausente (NEXT_PUBLIC_WHATSAPP)",
);
const ig =
  env.NEXT_PUBLIC_INSTAGRAM ||
  /\binstagram:\s*(?:\(.*\?\?\s*null\)|"[^"]+"|null)/.exec(site)?.[0].match(/"([^"]+)"/)?.[1];
add("Contatos", "Instagram", Boolean(ig), ig ? "" : "ausente");
const fake = ["5511900000000", "teste.ig"].filter((f) => Object.values(env).includes(f));
add("Contatos", "Sem contato fictício no ambiente de produção", fake.length === 0, fake.join(", "));

// Fotografias
for (const k of ["hero", "portrait"]) add("Fotografias", `Foto ${k}`, !nullField(k));
add("Fotografias", "Fotos do consultório", !emptyList("office"));

// Aprovações
const approved = /approved:\s*\{([^}]*)\}/.exec(site)?.[1] ?? "";
for (const m of approved.matchAll(/(\w+):\s*(true|false)/g))
  add("Aprovações clínicas", `approved.${m[1]}`, m[2] === "true");

// Marca e compartilhamento
for (const f of [
  "src/app/favicon.ico",
  "src/app/icon.svg",
  "src/app/apple-icon.png",
  "public/icon-192.png",
  "public/icon-512.png",
])
  add("Marca", `Arquivo ${f}`, existsSync(f));
let og = "ausente";
if (existsSync("public/og.png")) {
  const m = await sharp("public/og.png").metadata();
  og = `${m.width}×${m.height}`;
}
add("Marca", "public/og.png em 1200×630", og === "1200×630", og);
const ogBad = existsSync("public/og.png") ? await ogProblems() : ["ausente"];
add(
  "Marca",
  "public/og.png tem a arte esperada (não é um print do site)",
  ogBad.length === 0,
  ogBad.join("; "),
);

// Build: canonical × sitemap × assets × links
if (!hasOut) {
  add("Build", "Pasta out/ gerada (rode npm run build)", false);
} else {
  const html = read("out/index.html");
  const canon = /rel="canonical" href="([^"]+)"/.exec(html)?.[1] ?? "";
  const ogImg = /property="og:image" content="([^"]+)"/.exec(html)?.[1] ?? "";
  add("Build", "Canonical da home usa a URL oficial", canon === `${url}/`, canon);
  add(
    "Build",
    "og:image presente e com arquivo em out/",
    Boolean(ogImg) && ogImg.startsWith(url) && existsSync(join("out", new URL(ogImg).pathname)),
    ogImg || "ausente",
  );
  const locs = [...read("out/sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const badLoc = locs.filter(
    (l) =>
      !l.startsWith(url) ||
      (!existsSync(join("out", new URL(l).pathname, "index.html")) && new URL(l).pathname !== "/"),
  );
  add(
    "Build",
    `Sitemap: ${locs.length} URLs na origem oficial e com página`,
    locs.length > 0 && badLoc.length === 0,
    badLoc.join(", "),
  );
  const badCanon = locs.filter((l) => {
    const f = join("out", new URL(l).pathname, "index.html");
    return !read(f).includes(`rel="canonical" href="${l}"`);
  });
  add(
    "Build",
    "Canonical de cada página igual à URL do sitemap",
    badCanon.length === 0,
    badCanon.join(", "),
  );
  const robots = read("out/robots.txt");
  const indexable = env.NEXT_PUBLIC_INDEXABLE === "true";
  add(
    "Build",
    "robots.txt coerente com a indexação",
    indexable
      ? robots.includes("Sitemap:") && !/Disallow: \/\s*$/m.test(robots)
      : /Disallow: \//.test(robots),
  );
  const links = spawnSync("node", ["scripts/check-links.mjs"], { encoding: "utf8" });
  add("Build", "Links internos sem quebra", links.status === 0, links.stdout.trim().split("\n")[0]);
  const missing = new Set();
  (function walk(d) {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) walk(p);
      else if (n.endsWith(".html")) {
        for (const [, a] of read(p).matchAll(
          /(?:src|href)="(\/(?:_next|images)\/[^"?#]+|\/(?:favicon\.ico|icon\.svg|apple-icon\.png|og\.png))/g,
        ))
          if (!existsSync(join("out", a))) missing.add(a);
      }
    }
  })("out");
  add(
    "Build",
    "Assets referenciados existem em out/",
    missing.size === 0,
    [...missing].slice(0, 3).join(", "),
  );
}

// workers.dev
const wrangler = read("wrangler.jsonc");
const wdev = /"workers_dev":\s*true/.test(wrangler);
let live = "não verificado";
try {
  const r = await fetch("https://samara-rubia-site.lucasdiogo1234.workers.dev/", {
    redirect: "manual",
    signal: AbortSignal.timeout(8000),
  });
  live = `HTTP ${r.status}`;
} catch {
  live = "inacessível";
}
add(
  "workers.dev",
  "Desativado ou redirecionado antes de indexar",
  !wdev && !live.includes("200"),
  `workers_dev=${wdev}, resposta ${live}`,
);

// Relatório
const groups = [...new Set(rows.map((r) => r.group))];
for (const g of groups) {
  console.log(`\n${g}`);
  for (const r of rows.filter((x) => x.group === g))
    console.log(
      `  ${r.ok ? "✔ pronto  " : "✖ falta   "} ${r.label}${r.detail ? `  — ${r.detail}` : ""}`,
    );
}
const pending = rows.filter((r) => !r.ok);
console.log(
  `\n${rows.length - pending.length}/${rows.length} itens prontos; ${pending.length} pendentes para o lançamento definitivo.`,
);
console.log("Versão de revisão: pendências não bloqueiam o deploy. Nada foi alterado.");
if (process.argv.includes("--strict") && pending.length) process.exit(1);
