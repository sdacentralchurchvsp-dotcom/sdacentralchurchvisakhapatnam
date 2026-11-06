"""Compress large hero images to web-friendly JPGs (under ~300 KB)."""
from PIL import Image
import os

IMG_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "img")

# (source, output, max_width)
targets = [
    ("hero.png", "hero.jpg", 1000),
    ("three-angels.png", "three-angels.jpg", 1000),
    ("28-doctrines.png", "28-doctrines.jpg", 1000),
]

for src, out, max_w in targets:
    sp = os.path.join(IMG_DIR, src)
    op = os.path.join(IMG_DIR, out)
    if not os.path.exists(sp):
        print(f"SKIP (missing): {src}")
        continue
    im = Image.open(sp)
    # Flatten transparency onto white
    if im.mode in ("RGBA", "P", "LA"):
        bg = Image.new("RGB", im.size, (255, 255, 255))
        im = im.convert("RGBA")
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    # Resize down if wider than max_w
    if im.width > max_w:
        h = int(im.height * max_w / im.width)
        im = im.resize((max_w, h), Image.LANCZOS)
    im.save(op, "JPEG", quality=82, optimize=True, progressive=True)
    before = os.path.getsize(sp) // 1024
    after = os.path.getsize(op) // 1024
    print(f"{src} ({before} KB) -> {out} ({after} KB)")
