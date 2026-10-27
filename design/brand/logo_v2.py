"""Extrai a logo rose gold (design/brand/src-rosegold.webp, 1254x1254, sobre cacau) para PNG transparente.
Só separa o fundo e recolore para o tema claro; o desenho não é alterado nem vetorizado.
Saídas em design/brand/v2/: mark-dark/light, lockup-dark/light (sem a linha do CREFITO) e og-base."""
import os
import numpy as np
from PIL import Image, ImageFilter

SRC = "design/brand/src-rosegold.webp"
OUT = "design/brand/v2"
os.makedirs(OUT, exist_ok=True)

im = Image.open(SRC).convert("RGB")
src = np.asarray(im).astype(np.float32)
h, w = src.shape[:2]
lum = src @ np.array([0.299, 0.587, 0.114], dtype=np.float32)

# fundo local: borrão grande da imagem sem os pixels claros do desenho
rough = lum > 75
fill = src.copy()
bgmean = np.median(src[~rough], axis=0)
fill[rough] = bgmean
bg = np.asarray(Image.fromarray(fill.astype(np.uint8)).filter(ImageFilter.GaussianBlur(60))).astype(np.float32)
bglum = bg @ np.array([0.299, 0.587, 0.114], dtype=np.float32)

alpha = np.clip((lum - bglum - 14) / (60 - 14), 0, 1)
a = np.clip(alpha, 0.03, 1)[..., None]
fg = np.clip((src - (1 - a) * bg) / a, 0, 255)


def rgba(color):
    return np.dstack([color, alpha * 255]).clip(0, 255).astype(np.uint8)


dark = rgba(fg)  # fundo escuro: cores originais
# fundo claro: mesmo desenho, tons mais fundos (cobre) para ter contraste sobre creme
f = fg / 255.0
light_rgb = np.clip((f ** 1.9) * 0.92 * 255 + np.array([10, 0, 0]), 0, 255)
light = rgba(light_rgb)


def bbox(y0, y1, pad=14):
    yy, xx = np.where(alpha[y0:y1] > 0.2)
    return (max(xx.min() - pad, 0), max(y0 + yy.min() - pad, 0), min(xx.max() + pad, w), min(y0 + yy.max() + pad, h))


mark_box = bbox(140, 792)
lock_box = bbox(140, 1000)  # até "FISIOTERAPEUTA PÉLVICA"; exclui a linha do CREFITO
for name, arr in (("light", light), ("dark", dark)):
    img = Image.fromarray(arr, "RGBA")
    m = arr.copy()
    m[762:, :500, 3] = 0  # o topo do nome (S, R) entra no recorte do monograma; a voluta desce só por x~500-540
    m[762:, 545:, 3] = 0
    m[788:, :, 3] = 0
    Image.fromarray(m, "RGBA").crop(mark_box).save(f"{OUT}/mark-{name}.png")
    img.crop(lock_box).save(f"{OUT}/lockup-{name}.png")
print("mark", mark_box, "lockup", lock_box)

# comparação: original | claro (creme) | escuro (cacau do site)
sheet = Image.new("RGB", (1800, 640), (60, 60, 60))
orig = im.copy(); orig.thumbnail((600, 600)); sheet.paste(orig, (10, 20))
for i, (nm, col) in enumerate((("light", (252, 248, 241)), ("dark", (55, 44, 39)))):
    cv = Image.new("RGBA", (580, 600), col + (255,))
    for j, f_ in enumerate(("mark", "lockup")):
        t = Image.open(f"{OUT}/{f_}-{nm}.png"); t.thumbnail((270, 560))
        cv.alpha_composite(t, (10 + j * 290, 20))
    sheet.paste(cv.convert("RGB"), (620 + i * 590, 20))
sheet.save(f"{OUT}/comparacao.png")
