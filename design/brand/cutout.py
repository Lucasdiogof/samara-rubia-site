"""Recorta a Samara do fundo liso da foto (GrabCut + refino de borda) -> samara-cutout.png (RGBA).
uso: python design/brand/cutout.py   (precisa de opencv-python, numpy, pillow)"""
import cv2, numpy as np
from PIL import Image

src = cv2.imread("design/brand/src-19.png")
h, w = src.shape[:2]

# cor do fundo estimada nas bordas (mediana) e variação suave do fundo
border = np.concatenate([src[:40].reshape(-1, 3), src[:, :25].reshape(-1, 3), src[:, -25:].reshape(-1, 3)])
bg = np.median(border, axis=0)
dist = np.linalg.norm(src.astype(np.float32) - bg.astype(np.float32), axis=2)

mask = np.full((h, w), cv2.GC_PR_BGD, np.uint8)
mask[dist > 38] = cv2.GC_PR_FGD
mask[dist > 85] = cv2.GC_FGD
mask[:4, :] = cv2.GC_BGD  # só a linha de borda: o topo do cabelo fica quase colado ao topo da foto
mask[:, :12] = cv2.GC_BGD
mask[:, -12:] = cv2.GC_BGD
bgd, fgd = np.zeros((1, 65)), np.zeros((1, 65))
cv2.grabCut(src, mask, None, bgd, fgd, 8, cv2.GC_INIT_WITH_MASK)
hard = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 1, 0).astype(np.uint8)

# mantém só o maior componente (a pessoa) e fecha buracos
n, lab, stats, _ = cv2.connectedComponentsWithStats(hard)
big = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
hard = (lab == big).astype(np.uint8)
inv = 1 - hard
n2, lab2, st2, _ = cv2.connectedComponentsWithStats(inv)
for i in range(1, n2):
    if st2[i, cv2.CC_STAT_AREA] < 4000:  # buracos pequenos dentro do corpo (entre braços etc. ficam)
        hard[lab2 == i] = 1

# remove o banquinho branco embaixo (neutro/claro, grande); unhas e mãos (pele) ficam
hsv = cv2.cvtColor(src, cv2.COLOR_BGR2HSV)
neutral = ((hsv[..., 1] < 40) & (hsv[..., 2] > 170)).astype(np.uint8)
neutral[: int(h * 0.86)] = 0
neutral &= hard
nn, nl, nst, _ = cv2.connectedComponentsWithStats(neutral)
for i in range(1, nn):
    if nst[i, cv2.CC_STAT_AREA] > 1500:
        hard[nl == i] = 0
hard = cv2.morphologyEx(hard, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))

# faixa de transição estreita; fora dela alfa 0/1
k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11, 11))
core = cv2.erode(hard, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))  # encolhe 2 px: tira o halo claro
sure_fg = cv2.erode(core, k)
maybe = cv2.dilate(core, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)))
band = (maybe == 1) & (sure_fg == 0)
alpha = sure_fg.astype(np.float32)
soft = np.clip((dist - 30) / (95 - 30), 0, 1)
alpha[band] = np.minimum(soft[band], 1.0) * (core[band] * 0.6 + 0.4)
alpha = cv2.GaussianBlur(alpha, (0, 0), 0.8)

# cor das bordas: copia a cor do interior (convolução normalizada), sem resto do fundo
rgb = src.astype(np.float32)
wgt = cv2.erode(core, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (13, 13))).astype(np.float32)
num = cv2.GaussianBlur(rgb * wgt[..., None], (0, 0), 6)
den = cv2.GaussianBlur(wgt, (0, 0), 6)[..., None] + 1e-4
inner = num / den
edge = (alpha < 0.98)[..., None]
fg = np.where(edge, inner, rgb)
rgba = np.dstack([fg[..., ::-1], alpha * 255]).clip(0, 255).astype(np.uint8)
Image.fromarray(rgba, "RGBA").save("design/brand/samara-cutout.png")

# conferência sobre fundos escuro e claro
for name, col in (("escuro", (55, 44, 39)), ("claro", (252, 248, 241)), ("terracota", (214, 194, 167))):
    base = Image.new("RGBA", (w, h), col + (255,))
    base.alpha_composite(Image.fromarray(rgba, "RGBA"))
    base.convert("RGB").save(f"design/brand/check-{name}.png")
print("ok", float(alpha.mean()))
