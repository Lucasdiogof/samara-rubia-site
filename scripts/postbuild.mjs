// O export estático do Next grava os segmentos RSC em pastas (__next.sobre/__PAGE__.txt),
// mas o cliente os pede com pontos (__next.sobre.__PAGE__.txt). Em hospedagem de arquivos
// estáticos isso gera 404 no prefetch; copiamos cada arquivo para o nome com pontos.
import { cpSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

let copied = 0;
function flatten(dir, base, prefix) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) flatten(p, base, `${prefix}.${name}`);
    else if (name.endsWith(".txt")) {
      cpSync(p, join(base, `${prefix}.${name}`));
      copied++;
    }
  }
}
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(p, dir, name);
    else if (name !== "_next") walk(p);
  }
}
walk("out");
console.log(`postbuild: ${copied} arquivos RSC duplicados com nome pontuado`);
