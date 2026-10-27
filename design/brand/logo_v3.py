"""Logo rose gold, refinamento v3. NÃO altera o site: só gera arquivos em design/brand/v3/.
Entrada: design/brand/src-rosegold.webp (1254x1254, sobre cacau). A geometria vem dos pixels da arte;
nada é redesenhado/vetorizado. Só: separar o fundo, limpar resíduos e recolorir.
Saídas:
  signature-dark/light.png   assinatura completa (monograma+nome+especialidade, SEM CREFITO), versão detalhada
  mark-dark/light.png        monograma detalhado
  small-dark/light-{16,32,46,64}.png   monograma simplificado (tom chapado, sem brilho 3D) por tamanho
  favicon-{16,32,48}.png     monograma simplificado sobre o cacau do site
"""
import os
import cv2
import numpy as np
from PIL import Image, ImageFilter

SRC = "design/brand/src-rosegold.webp"
OUT = "design/brand/v3"
os.makedirs(OUT, exist_ok=True)
LUMW = np.array([0.299, 0.587, 0.114], dtype=np.float32)

im = Image.open(SRC).convert("RGB")
src = np.asarray(im).astype(np.float32)
h, w = src.shape[:2]
lum = src @ LUMW

# fundo local estimado sem o desenho (o fundo tem textura de listras e vinheta)
rough = cv2.dilate((lum > 70).astype(np.uint8), np.ones((9, 9), np.uint8)) > 0
fill = src.copy()
fill[rough] = np.median(src[~rough], axis=0)
bg = np.asarray(Image.fromarray(fill.astype(np.uint8)).filter(ImageFilter.GaussianBlur(45))).astype(np.float32)
bglum = bg @ LUMW

# alfa por diferença de luminância, com piso mais alto que a v2 (as listras do fundo não passam)
alpha = np.clip((lum - bglum - 34) / (78 - 34), 0, 1)

# a especialidade tem traço fino e mais escuro: piso próprio, senão ela quebra
tag = np.clip((lum - bglum - 10) / (42 - 10), 0, 1)
alpha[940:1016] = tag[940:1016]

# --- limpeza de resíduos: só ficam os grupos de traço que pertencem às peças da marca ---
solid = (alpha > 0.18).astype(np.uint8)
glue = cv2.dilate(solid, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (29, 29)))
n, lab, stats, cent = cv2.connectedComponentsWithStats(glue, connectivity=8)
keep_mark = np.zeros(n, bool)
keep_lock = np.zeros(n, bool)
for i in range(1, n):
    x, y, bw, bh, area = stats[i]
    if area < 2500:
        continue  # grão e pontinhos de fundo
    keep_lock[i] = True  # monograma, nome, especialidade e CREFITO; o CREFITO é cortado abaixo
    if y < 400 and y + bh < 830:  # grupo do monograma
        keep_mark[i] = True
# o grupo do monograma é o maior grupo que começa no topo
mark_ids = [i for i in range(1, n) if keep_mark[i]]
if len(mark_ids) > 1:
    mark_ids = [max(mark_ids, key=lambda i: stats[i][4])]
    keep_mark[:] = False
    keep_mark[mark_ids[0]] = True
mask_lock = keep_lock[lab]
mask_mark = keep_mark[lab]
print("grupos:", [(int(i), stats[i][:4].tolist()) for i in range(1, n) if keep_lock[i]])

# a voluta inferior do monograma desce até y~780; o nome só começa depois. Grupo do monograma já isola isso.
a_cut = np.where(mask_lock, alpha, 0.0)
a_cut[1015:] = 0  # fora o CREFITO (só volta após confirmação do número)
# bordas: tira o fiapo de fundo (alfa muito baixo) e suaviza o serrilhado
a_cut = cv2.GaussianBlur(a_cut, (0, 0), 0.6)
a_cut = np.clip((a_cut - 0.1) / 0.9, 0, 1)  # corta a névoa/sombra de baixo alfa colada nos traços
a_mark = np.where(mask_mark, a_cut, 0.0)

# remove a mistura com o fundo nas bordas (cor pura do traço)
a3 = np.clip(a_cut, 0.04, 1)[..., None]
fg = np.clip((src - (1 - a3) * bg) / a3, 0, 255)
# nas bordas de alfa baixo a cor é pouco confiável: puxa para a cor do corpo do traço vizinho
body = cv2.GaussianBlur(np.where((a_cut > 0.9)[..., None], fg, 0).astype(np.float32), (0, 0), 6)
wgt = cv2.GaussianBlur((a_cut > 0.9).astype(np.float32), (0, 0), 6)[..., None]
body = body / np.maximum(wgt, 1e-3)
mixw = np.clip((a_cut[..., None] - 0.55) / 0.35, 0, 1)  # borda usa a cor do corpo do traço (sem filete escuro)
# manchas de sombra coladas na borda: bem mais escuras que o traço vizinho e de alfa parcial -> somem
spot = ((fg @ LUMW) < 0.62 * (body @ LUMW)) & (a_cut < 0.85) & (wgt[..., 0] > 0.02)
spot[930:] = False  # nome/especialidade têm traço fino: não entram nessa limpeza
spot = cv2.dilate(spot.astype(np.uint8), np.ones((3, 3), np.uint8)) > 0
a_cut = np.where(spot, 0, a_cut)
a_mark = np.where(spot, 0, a_mark)
fg = fg * mixw + body * (1 - mixw)

# versão para fundo claro: cobre mais fundo para segurar contraste sobre o creme #fcf8f1
f = fg / 255.0
light_rgb = np.clip((f ** 2.1) * 0.9 * 255 + np.array([14, 0, 0]), 0, 255)


def rgba(rgb, a):
    return np.dstack([rgb, a * 255]).clip(0, 255).astype(np.uint8)


def bbox(a, pad=14):
    yy, xx = np.where(a > 0.15)
    return (max(xx.min() - pad, 0), max(yy.min() - pad, 0), min(xx.max() + pad, w), min(yy.max() + pad, h))


lock_box, mark_box = bbox(a_cut), bbox(a_mark)
print("assinatura", lock_box, "monograma", mark_box)
variants = {"dark": fg, "light": light_rgb}
for name, rgb in variants.items():
    Image.fromarray(rgba(rgb, a_cut), "RGBA").crop(lock_box).save(f"{OUT}/signature-{name}.png")
    Image.fromarray(rgba(rgb, a_mark), "RGBA").crop(mark_box).save(f"{OUT}/mark-{name}.png")

# --- monograma simplificado: mesma silhueta e mesmos cortes internos, tom quase chapado ---
mlum = (fg @ LUMW) / 255.0
lo, hi = np.percentile(mlum[a_mark > 0.9], [8, 92])
t = np.clip((mlum - lo) / (hi - lo), 0, 1)
t = cv2.GaussianBlur(t.astype(np.float32), (0, 0), 3)  # tira o brilho especular fino
# poucos degraus de tom para separar o S do R sem reflexo
t = np.round(t * 3) / 3
base = {"dark": (np.array([201, 138, 108]), np.array([236, 178, 148])),
        "light": (np.array([138, 70, 44]), np.array([176, 100, 68]))}
flat = {}
for name, (c0, c1) in base.items():
    flat[name] = c0 * (1 - t[..., None]) + c1 * t[..., None]
sx0, sy0, sx1, sy1 = mark_box
SIZES = (16, 32, 46, 64, 92)
for name in ("dark", "light"):
    big = Image.fromarray(rgba(flat[name], a_mark), "RGBA").crop(mark_box)
    # quadrado com respiro, para virar ícone
    side = max(big.size)
    sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    sq.alpha_composite(big, ((side - big.width) // 2, (side - big.height) // 2))
    for s in SIZES:
        # alfa pré-multiplicado antes de reduzir (sem halo escuro), traço fino reforçado no tamanho pequeno
        arr = np.asarray(sq).astype(np.float32)
        pre = arr[..., :3] * (arr[..., 3:] / 255)
        pr = np.dstack([pre, arr[..., 3:]])
        ch = [np.asarray(Image.fromarray(pr[..., k]).resize((s, s), Image.BOX)) for k in range(4)]
        a = ch[3] / 255.0
        boost = {16: 1.9, 32: 1.55, 46: 1.35, 64: 1.25, 92: 1.2}[s]
        a2 = np.clip(a * boost, 0, 1)
        col = np.dstack(ch[:3]) / np.maximum(a[..., None], 1e-3)
        out = np.dstack([np.clip(col, 0, 255), a2 * 255]).astype(np.uint8)
        Image.fromarray(out, "RGBA").save(f"{OUT}/small-{name}-{s}.png")

# favicons: monograma simplificado (versão escura) sobre o cacau do site, cantos arredondados
COCOA = (55, 44, 39)
for s in (16, 32, 48):
    S = s * 8
    tile = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    m = Image.open(f"{OUT}/small-dark-64.png")
    big = Image.fromarray(rgba(flat["dark"], a_mark), "RGBA").crop(mark_box)
    pad = 0.14
    inner = int(S * (1 - 2 * pad))
    big.thumbnail((inner, inner), Image.LANCZOS)
    bgt = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    mask = Image.new("L", (S, S), 0)
    cv2m = np.zeros((S, S), np.uint8)
    r = int(S * 0.22)
    cv2.rectangle(cv2m, (r, 0), (S - r, S), 255, -1)
    cv2.rectangle(cv2m, (0, r), (S, S - r), 255, -1)
    for cx, cy in ((r, r), (S - r, r), (r, S - r), (S - r, S - r)):
        cv2.circle(cv2m, (cx, cy), r, 255, -1)
    bgt = Image.new("RGBA", (S, S), COCOA + (255,))
    bgt.putalpha(Image.fromarray(cv2m))
    bgt.alpha_composite(big, ((S - big.width) // 2, (S - big.height) // 2))
    arr = np.asarray(bgt).astype(np.float32)
    pre = arr[..., :3] * (arr[..., 3:] / 255)
    pr = np.dstack([pre, arr[..., 3:]])
    ch = [np.asarray(Image.fromarray(pr[..., k]).resize((s, s), Image.BOX)) for k in range(4)]
    a = ch[3] / 255.0
    col = np.dstack(ch[:3]) / np.maximum(a[..., None], 1e-3)
    Image.fromarray(np.dstack([np.clip(col, 0, 255), ch[3]]).astype(np.uint8), "RGBA").save(f"{OUT}/favicon-{s}.png")
print("ok")
