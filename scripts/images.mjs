// Gera as variações responsivas (AVIF, WebP, JPG) de uma foto e imprime o trecho de configuração.
// uso: npm run images -- <arquivo> <nome> [--focal=50,30] [--alt="descrição"] [--alpha]
// --warm: esquenta levemente (fundo azulado -> neutro/creme), para combinar com a paleta
// --alpha: foto recortada com transparência (o fallback vira PNG em vez de JPG)
// ex.:  npm run images -- C:\fotos\samara.jpg hero --focal=50,30 --alt="Samara sorrindo no consultório"
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const [file, name, ...flags] = process.argv.slice(2);
if (!file || !name || !/^[a-z0-9-]+$/.test(name)) {
  console.error(
    'uso: npm run images -- <arquivo> <nome-em-minusculas> [--focal=50,30] [--alt="texto"]',
  );
  process.exit(1);
}
const flag = (k) => flags.find((f) => f.startsWith(`--${k}=`))?.slice(k.length + 3);
const alpha = flags.includes("--alpha");
const warm = flags.includes("--warm");
const [fx, fy] = (flag("focal") ?? "50,50").split(",").map(Number);
const out = process.env.IMAGES_OUT ?? "public/images";
const WIDTHS = [480, 768, 1080, 1600, 2200];

mkdirSync(out, { recursive: true });
// rotate() aplica a orientação EXIF; os metadados (incluindo GPS) são descartados na saída.
const { info } = await sharp(file).rotate().toBuffer({ resolveWithObject: true });
const widths = WIDTHS.filter((w) => w <= info.width);
// inclui a largura original quando ela passa de 100 px da maior da lista (não amplia, só aproveita a foto inteira)
if (widths.length === 0 || info.width - Math.max(...widths) > 100) widths.push(info.width);

for (const w of widths) {
  const base = () => {
    const s = sharp(file).rotate().resize({ width: w, withoutEnlargement: true });
    return warm ? s.linear([1.035, 1, 0.93], [0, 0, 0]) : s;
  };
  await base().avif({ quality: 60, effort: 4 }).toFile(`${out}/${name}-${w}.avif`);
  await base().webp({ quality: 80 }).toFile(`${out}/${name}-${w}.webp`);
  if (alpha) await base().png({ compressionLevel: 9, palette: true, quality: 85 }).toFile(`${out}/${name}-${w}.png`);
  else await base().jpeg({ quality: 82, mozjpeg: true }).toFile(`${out}/${name}-${w}.jpg`);
}

console.log(`\n${widths.length * 3} arquivos em ${out}/. Cole em src/config/site.ts (images):\n`);
console.log(`{
  name: "${name}",
  alt: "${flag("alt") ?? "DESCREVA A IMAGEM"}",
  width: ${info.width},
  height: ${info.height},
  widths: [${widths.join(", ")}],
  focal: { x: ${fx}, y: ${fy} },${alpha ? "\n  alpha: true," : ""}
}`);
if (info.width < 1400)
  console.warn(
    "\nAviso: a largura original é menor que 1400 px; prefira o arquivo original da câmera.",
  );
