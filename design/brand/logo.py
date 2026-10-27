"""Extrai a logo da Samara (fundo creme -> transparente) e gera as variantes usadas no site.
Entrada: design/brand/src-20.png (arte enviada). Saídas em design/brand/out/ (PNG com transparência):
  mark-light.png / mark-dark.png        monograma SR + volutas
  lockup-light.png / lockup-dark.png    monograma + nome + 'Fisioterapeuta pélvica' (sem a linha do CREFITO)
'light' = para fundos claros (cores originais); 'dark' = para fundos escuros (marrom vira creme)."""
import numpy as np
from PIL import Image
import os

src = np.asarray(Image.open("design/brand/src-20.png").convert("RGB")).astype(np.float32)
h, w = src.shape[:2]

# cor do fundo = mediana das bordas
edge = np.concatenate([src[:20].reshape(-1, 3), src[-20:].reshape(-1, 3), src[:, :20].reshape(-1, 3), src[:, -20:].reshape(-1, 3)])
bg = np.median(edge, axis=0)
dist = np.linalg.norm(src - bg, axis=2)
alpha = np.clip((dist - 7) / (70 - 7), 0, 1)
a = np.clip(alpha, 0.02, 1)[..., None]
fg = np.clip((src - (1 - a) * bg) / a, 0, 255)  # remove a mistura com o fundo nas bordas finas
lum = fg @ np.array([0.299, 0.587, 0.114], dtype=np.float32)


def rgba(color):
    return np.dstack([color, alpha * 255]).clip(0, 255).astype(np.uint8)


light = rgba(fg)
# versão escura: tons escuros (marrom) -> creme #fcf8f1; terracota e dourado permanecem
t = np.clip((lum - 62) / (118 - 62), 0, 1)[..., None]
cream = np.array([252, 248, 241], dtype=np.float32)
warm_up = np.clip(fg * 1.12 + 14, 0, 255)  # clareia um pouco o terracota para contraste no escuro
dark = rgba(cream * (1 - t) + warm_up * t)

# caixas de recorte (em pixels da arte 1254x1254)
ys, xs = np.where(alpha > 0.15)


def bbox(y0, y1, x0=0, x1=w, pad=18):
    m = alpha[y0:y1, x0:x1] > 0.15
    yy, xx = np.where(m)
    return (max(x0 + xx.min() - pad, 0), max(y0 + yy.min() - pad, 0), min(x0 + xx.max() + pad, w), min(y0 + yy.max() + pad, h))


mark_box = bbox(200, 760)            # monograma (acima do nome)
lockup_box = bbox(200, 985)          # até a linha 'FISIOTERAPEUTA PÉLVICA' (exclui CREFITO)
os.makedirs("design/brand/out", exist_ok=True)
for name, arr in (("light", light), ("dark", dark)):
    im = Image.fromarray(arr, "RGBA")
    im.crop(mark_box).save(f"design/brand/out/mark-{name}.png")
    im.crop(lockup_box).save(f"design/brand/out/lockup-{name}.png")
print("mark", mark_box, "lockup", lockup_box)
for n in ("mark-light", "mark-dark", "lockup-light", "lockup-dark"):
    print(n, Image.open(f"design/brand/out/{n}.png").size)
# conferência
for nm, col, files in (("claro", (252, 248, 241), ("mark-light", "lockup-light")), ("escuro", (55, 44, 39), ("mark-dark", "lockup-dark"))):
    canvas = Image.new("RGBA", (1200, 620), col + (255,))
    x = 30
    for f in files:
        im = Image.open(f"design/brand/out/{f}.png")
        im.thumbnail((520, 560))
        canvas.alpha_composite(im, (x, 30))
        x += 560
    canvas.convert("RGB").save(f"design/brand/check-logo-{nm}.png")
