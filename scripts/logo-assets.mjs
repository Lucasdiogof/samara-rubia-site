// Converte as variantes da logo (design/brand/out/*.png, geradas por design/brand/logo.py) em WebP leves.
// uso: node scripts/logo-assets.mjs
import sharp from "sharp";

const jobs = [
  ["mark-light", 192],
  ["mark-dark", 192],
  ["lockup-light", 560],
  ["lockup-dark", 560],
];
for (const [name, width] of jobs) {
  const info = await sharp(`design/brand/out/${name}.png`)
    .resize({ width })
    .webp({ quality: 90, alphaQuality: 95, effort: 6 })
    .toFile(`public/brand/${name}.webp`);
  console.log(name, info.width, "x", info.height, Math.round(info.size / 1024) + " KB");
}
