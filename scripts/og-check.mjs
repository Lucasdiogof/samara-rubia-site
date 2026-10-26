// Detecta og.png claramente inválida (ex.: captura da página 404): confere o conteúdo, não só o tamanho.
// A arte tem um grande arco areia + taupe + círculo cacau; um print do site não tem essas cores.
import sharp from "sharp";

const target = {
  sand: [0xd6, 0xc2, 0xa7, 0.1],
  taupe: [0xb1, 0x97, 0x7c, 0.02],
  cocoa: [0x73, 0x5c, 0x4c, 0.008],
  deep: [0x37, 0x2c, 0x27, 0.005],
};

export async function ogProblems(file = "public/og.png") {
  const { data, info } = await sharp(file)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  if (info.width !== 1200 || info.height !== 630)
    return [`dimensões ${info.width}×${info.height} (esperado 1200×630)`];
  const n = info.width * info.height;
  const out = [];
  for (const [name, [r, g, b, min]] of Object.entries(target)) {
    let c = 0;
    for (let i = 0; i < data.length; i += 3)
      if (Math.abs(data[i] - r) + Math.abs(data[i + 1] - g) + Math.abs(data[i + 2] - b) < 24) c++;
    if (c / n < min)
      out.push(
        `cor ${name} em ${((c / n) * 100).toFixed(1)}% (mín. ${min * 100}%): não parece a arte do OG`,
      );
  }
  return out;
}
