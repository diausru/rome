"""B4 — "How much of a $1,000 invoice is yours?" Handwritten explainer, 60 s, 1080x1920, 24 fps.
Master timeline = the measured voiceover (vo/line00..10, ElevenLabs v4 via Higgsfield, voice "Harrison").
  python3 film.py --preview      (540x960 frames every 0.5 s → assets/contact_*.jpg)
  python3 film.py                (full render → build/b4_silent.mp4, then post.py adds footer, grain, VO)
"""
import json
import math
import os
import subprocess
import sys

import cv2
import numpy as np

import engine as E

HERE = os.path.dirname(os.path.abspath(__file__))
DUR = 60.0
NF = int(DUR * E.FPS)

# ---------------------------------------------------------------- voiceover placement (file start, seconds)
VO = [  # file (vo/grady/proc), place, text, speech start/end inside the processed file
    ("line00", 0.20, "You send a client a thousand-dollar invoice. How much of it is actually yours?", 0.00, 5.06),
    ("line01", 5.52, "Self-employed? Nobody takes tax off for you.", 0.00, 2.84),
    ("line02", 8.62, "Say you net sixty thousand dollars this year, in Manitoba.", 0.00, 3.58),
    ("line03", 12.46, "First, C-P-P. You pay both halves. About six thousand, seven hundred.", 0.00, 6.47),
    ("line04", 19.19, "Federal tax: about five thousand, one hundred and fifty.", 0.00, 3.26),
    ("line05", 22.71, "Manitoba: about four thousand, two hundred.", 0.00, 2.85),
    ("line06", 25.82, "Add it up: about sixteen thousand, one hundred dollars. Roughly twenty-seven percent.", 0.00, 6.12),
    ("line07", 32.20, "But that's an average. In this example, each extra dollar costs about thirty-six cents.", 0.00, 6.48),
    ("line08", 38.94, "So from every thousand-dollar invoice, move about two hundred and seventy dollars into a separate tax account. The day it's paid.", 0.00, 8.43),
    ("line09", 47.63, "Owe more than three thousand, this year and in one of the last two? You may have to pay in instalments.", 0.00, 6.67),
    ("line10", 54.56, "The invoice isn't your income. What's left after tax is.", 0.00, 4.46),
]


def build():
    W = E.Writer(seed=5)
    tl = E.Timeline(rest=(66.0, 70.0), seed=9)   # frame 1: the hand is already over the paper, about to write
    boxes = {}

    def write(name, text, x, y, size, t0, align="left", speed=135):
        st, box = W.text(text, x, y, size, align=align)
        t1 = tl.write(st, t0, speed=speed, name=name, box=box)
        boxes[name] = box
        return t1

    # hook
    t = write("1000", "$1,000", 24, 42, 12, 0.3, speed=150)
    t = write("yours", "yours?", 112, 42, 9, max(t + 0.08, 3.3), speed=135)
    tl.retreat(t + 0.1, to=(150, 110), next_start=6.5)
    # self-employed: nothing is withheld
    t = write("withheld", "0 withheld", 24, 66, 8, 6.5)
    # setup
    t = write("net", "$60K · MB", 24, 92, 9, max(t + 0.1, 8.95))
    # CPP
    t = write("cpp", "CPP 11.9%", 24, 120, 8, max(t + 0.1, 12.95))
    t = write("cppv", "$6,724", 192, 120, 9, max(t + 0.08, 16.7), align="right")
    # federal / Manitoba
    t = write("fed", "Federal", 24, 142, 8, max(t + 0.1, 19.1))
    t = write("fedv", "$5,155", 192, 142, 9, max(t + 0.08, 20.25), align="right")
    t = write("mb", "MB", 24, 164, 8, max(t + 0.1, 22.6))
    t = write("mbv", "$4,227", 192, 164, 9, max(t + 0.08, 23.55), align="right")
    # total
    t = tl.write(W.underline(138, 194, 169), max(t + 0.08, 25.85), speed=260, name="ul")
    t = write("tot", "= $16,106", 192, 186, 10, max(t + 0.08, 26.4), align="right")
    t = write("pct", "≈27%", 24, 186, 10, max(t + 0.12, 29.55))
    t = tl.write(W.circle(boxes["pct"], pad=3.5), t + 0.05, speed=260, name="pct_circle")
    tl.retreat(t + 0.1, to=(165, 222), next_start=34.0)
    # twist: the next dollar
    t = write("next", "next $1 ≈ 36¢", 24, 212, 8, 34.0)
    tl.retreat(t + 0.1, to=(170, 245), next_start=40.7)
    # action
    t = write("aside", "set aside $270", 24, 238, 9, 40.7)
    tl.retreat(t + 0.1, to=(175, 262), next_start=47.4)
    # instalments
    t = write("inst", "> $3K → instalments", 24, 262, 7, 47.4)
    tl.retreat(t + 0.15, to=(185, 250), next_start=54.7)
    # payoff: circle the number that matters
    x0, y0, x1, y1 = boxes["aside"]
    t = tl.write(W.circle((x0 + (x1 - x0) * 0.66, y0, x1, y1), pad=3.2), 54.7, speed=240, name="final_circle")
    tl.retreat(t + 0.4, to=(232, 300))
    return tl, boxes


def camera_track(tl, boxes):
    """Camera keys (time, paper-mm centre x, y, zoom). Zoom 1.9 while writing keeps ~176 mm of paper width."""
    K = [(0.0, 104, 66, 1.60), (2.6, 104, 58, 1.76), (6.3, 104, 70, 1.78), (8.9, 104, 88, 1.78),
         (12.9, 104, 116, 1.78), (19.0, 104, 136, 1.78), (22.5, 104, 156, 1.78), (26.2, 104, 176, 1.78),
         (32.2, 104, 196, 1.74), (34.0, 104, 208, 1.78), (40.6, 104, 230, 1.78), (47.3, 104, 246, 1.78),
         (54.2, 106, 230, 1.62), (57.0, 108, 160, 1.26), (60.0, 108, 158, 1.24)]
    return K


def cam_at(K, t):
    for (t0, x0, y0, z0), (t1, x1, y1, z1) in zip(K, K[1:]):
        if t <= t1:
            u = E.min_jerk((t - t0) / (t1 - t0))
            x, y, z = x0 + (x1 - x0) * u, y0 + (y1 - y0) * u, z0 + (z1 - z0) * u
            break
    else:
        _, x, y, z = K[-1]
    p = E.mm_to_plate((x, y))
    return float(p[0]), float(p[1]), z


REPO = os.path.dirname(HERE)
FOOT = ["Example: 2026 · Manitoba · single · $60K net self-employment income",
        "No other income · Source: canada.ca · Not advice"]


def footer_layer():
    """Small, persistent footer over a soft bottom scrim (repo rule: on-screen source + not-advice line)."""
    from PIL import Image, ImageDraw, ImageFont
    im = Image.new("RGBA", (E.OUT_W, E.OUT_H), (0, 0, 0, 0))
    # compact source tag on a dark rounded plate, top-left (the Shorts UI covers the bottom of the screen)
    scrim = np.zeros((E.OUT_H, E.OUT_W), np.float32)
    d = ImageDraw.Draw(im)
    f = ImageFont.truetype(REPO + "/resp-video/fonts/Manrope-500-latin.woff2", 26)
    try:
        f.set_variation_by_axes([600])
    except OSError:
        pass
    x0, y0, lh, pad = 40, 128, 36, 16
    w = max(d.textlength(l, font=f) for l in FOOT)
    d.rounded_rectangle([x0, y0, x0 + w + 2 * pad, y0 + lh * len(FOOT) + 2 * pad - 6], radius=14, fill=(18, 16, 14, 228))
    for i, line in enumerate(FOOT):
        d.text((x0 + pad, y0 + pad + i * lh), line, font=f, fill=(246, 242, 234, 245))
    a = np.asarray(im).astype(np.float32) / 255.0
    return scrim, a[..., :3][..., ::-1].copy(), a[..., 3]


def finish(f, scrim, frgb, fa, rng):
    f = f * (1 - scrim[..., None])
    # luminance-weighted grain, slightly soft
    lum = f[..., 0] * 0.114 + f[..., 1] * 0.587 + f[..., 2] * 0.299
    n = cv2.GaussianBlur(rng.standard_normal(lum.shape).astype(np.float32), (0, 0), 0.7)
    f = f + (n * 0.020 * (0.35 + 2.6 * lum * (1 - lum)))[..., None]
    return f * (1 - fa[..., None]) + frgb * fa[..., None]


def main():
    preview = "--preview" in sys.argv
    tl, boxes = build()
    K = camera_track(tl, boxes)
    R = E.Renderer()
    os.makedirs(os.path.join(HERE, "build"), exist_ok=True)
    json.dump(dict(items=tl.items, vo=VO), open(os.path.join(HERE, "build", "timeline.json"), "w"), indent=1, default=float)
    for it in tl.items:
        print(f"{it['name']:13s} {it['t0']:6.2f} – {it['t1']:6.2f}")
    if preview:
        times = [float(x) for x in sys.argv[sys.argv.index("--preview") + 1].split(",")] if len(sys.argv) > 2 else \
            [i * 0.5 for i in range(int(DUR * 2))]
        tiles = []
        for t in times:
            f = R.frame(tl, t, cam_at(K, t))
            im = cv2.resize((np.clip(f, 0, 1) * 255).astype(np.uint8), (270, 480), interpolation=cv2.INTER_AREA)
            cv2.putText(im, f"{t:.1f}", (6, 22), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)
            tiles.append(im)
        rows = [np.concatenate(tiles[i:i + 8] + [np.zeros_like(tiles[0])] * (8 - len(tiles[i:i + 8])), 1)
                for i in range(0, len(tiles), 8)]
        for k in range(0, len(rows), 3):
            cv2.imwrite(os.path.join(HERE, "assets", f"contact_{k // 3:02d}.jpg"), np.concatenate(rows[k:k + 3], 0))
        return
    out = os.path.join(HERE, "build", "b4_silent.mp4")
    enc = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{E.OUT_W}x{E.OUT_H}",
                            "-r", str(E.FPS), "-i", "-", "-c:v", "libx264", "-preset", "slow", "-crf", "14",
                            "-pix_fmt", "yuv420p", out], stdin=subprocess.PIPE)
    scrim, frgb, fa = footer_layer()
    rng = np.random.default_rng(2026)
    for i in range(NF):
        t = i / E.FPS
        f = finish(R.frame(tl, t, cam_at(K, t)), scrim, frgb, fa, rng)
        enc.stdin.write((np.clip(f, 0, 1) * 255 + 0.5).astype(np.uint8).tobytes())
        if i % 120 == 0:
            print("frame", i, flush=True)
    enc.stdin.close()
    enc.wait()
    print("wrote", out)


if __name__ == "__main__":
    main()
