"""QC sheets from an encoded MP4: python3 qc.py <video.mp4> <out.png> <t1,t2,...> [thumb_width]"""
import subprocess
import sys

from PIL import Image, ImageDraw

video, out, times = sys.argv[1], sys.argv[2], [float(x) for x in sys.argv[3].split(",")]
tw = int(sys.argv[4]) if len(sys.argv) > 4 else 270
ims = []
for t in times:
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-ss", f"{t:.3f}", "-i", video, "-frames:v", "1",
                          "-f", "image2pipe", "-vcodec", "png", "-"], capture_output=True).stdout
    from io import BytesIO
    ims.append(Image.open(BytesIO(raw)).convert("RGB"))
w, h = ims[0].size
th = int(h * tw / w)
cols = min(len(ims), 8)
rows = (len(ims) + cols - 1) // cols
sheet = Image.new("RGB", (cols * (tw + 4), rows * (th + 20)), (15, 15, 15))
d = ImageDraw.Draw(sheet)
for i, (t, im) in enumerate(zip(times, ims)):
    x, y = (i % cols) * (tw + 4), (i // cols) * (th + 20)
    sheet.paste(im.resize((tw, th), Image.LANCZOS), (x, y + 18))
    d.text((x + 3, y + 3), f"{t:.2f}s", fill=(230, 230, 230))
sheet.save(out)
print("wrote", out)
