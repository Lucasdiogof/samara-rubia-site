// Verifica se todo link interno dos HTMLs exportados aponta para um arquivo existente.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const files = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (n.endsWith(".html")) files.push(p);
  }
})("out");

const bad = new Set();
for (const f of files) {
  for (const [, href] of readFileSync(f, "utf8").matchAll(/href="(\/[^"#?]*)/g)) {
    const t = join("out", href);
    if (href.startsWith("/_next/") || (existsSync(t) && statSync(t).isFile())) continue;
    if (existsSync(join(t, "index.html"))) continue;
    bad.add(`${f} -> ${href}`);
  }
}
console.log(`${files.length} páginas verificadas; ${bad.size} links quebrados`);
bad.forEach((b) => console.log(b));
process.exit(bad.size ? 1 : 0);
