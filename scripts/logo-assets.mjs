// Converte a logo rose gold (design/brand/v3/*.png, geradas por design/brand/logo_v3.py) em WebP leves.
// mark = monograma simplificado de 92 px (exibido a 46 px, retina); lockup = assinatura detalhada, sem CREFITO.
// uso: node scripts/logo-assets.mjs
import sharp from "sharp";

const jobs = [
  ["small-light-92", "mark-light", 92],
  ["small-dark-92", "mark-dark", 92],
  ["signature-light", "lockup-light", 560],
  ["signature-dark", "lockup-dark", 560],
];
for (const [src, name, width] of jobs) {
  const info = await sharp(`design/brand/v3/${src}.png`)
    .resize({ width })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(`public/brand/${name}.webp`);
  console.log(name, info.width, "x", info.height, Math.round(info.size / 1024) + " KB");
}
