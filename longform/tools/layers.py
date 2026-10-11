"""Split a plate into parallax layers: clean background (objects smeared out) + foreground cut-out.
usage: layers.py plate4k.png cutout.png out_prefix [width]"""
import sys
from PIL import Image, ImageFilter
src, cut, out = sys.argv[1:4]; W = int(sys.argv[4]) if len(sys.argv) > 4 else 2880
p = Image.open(src).convert('RGB'); H = round(W * p.height / p.width); p = p.resize((W, H), Image.LANCZOS)
a = Image.open(cut).convert('RGBA').split()[3].resize((W, H), Image.LANCZOS)
a = a.point(lambda v: 255 if v > 140 else (0 if v < 40 else v))           # firm up soft halo
fg = p.copy(); fg.putalpha(a.filter(ImageFilter.GaussianBlur(1.2)))
grow = a.filter(ImageFilter.MaxFilter(31)).filter(ImageFilter.GaussianBlur(18))
bg = Image.composite(p.filter(ImageFilter.GaussianBlur(28)), p, grow)
bg.save(out + '_bg.jpg', quality=92); fg.save(out + '_fg.png', optimize=True)
print('ok', W, H)
