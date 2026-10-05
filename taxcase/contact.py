"""Contact sheet: python3 contact.py <glob> <out> [cols]"""
import glob, sys
from PIL import Image, ImageDraw
files = sorted(glob.glob(sys.argv[1])); cols = int(sys.argv[3]) if len(sys.argv) > 3 else 10
ims = [Image.open(f).convert("RGB") for f in files]
w, h = ims[0].size; tw = 216; th = int(h * tw / w)
rows = (len(ims) + cols - 1) // cols
sheet = Image.new("RGB", (cols * (tw + 4), rows * (th + 22)), (20, 20, 20))
d = ImageDraw.Draw(sheet)
for i, (f, im) in enumerate(zip(files, ims)):
    x, y = (i % cols) * (tw + 4), (i // cols) * (th + 22)
    sheet.paste(im.resize((tw, th)), (x, y + 20)); d.text((x + 3, y + 4), f.split("/")[-1][-12:-4], fill=(220, 220, 220))
sheet.save(sys.argv[2])
