"""Finishing for TAX CASE #001: overlays tracked to the paper, film-like finish, encode.

  python3 post.py --tag preview            -> build/taxcase001_preview.mp4
  python3 post.py --tag final --crf 16     -> build/taxcase001_final.mp4

Order per frame: rendered frame (AgX display-referred) -> red-pencil marks multiplied into the paper ->
halation -> vignette -> lateral CA -> grain -> overlay type -> 8-bit -> x264 (BT.709).
No sharpening anywhere (MASTER §26).
"""
import argparse
import json
import math
import os
import subprocess

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
FPS = 24
NF = 55 * FPS
REF_W, REF_H = 1080, 1920
RED = (158, 31, 36)
IVORY = (238, 232, 220)
F_BOLD = REPO + "/resp-video/fonts/Manrope-800-latin.woff2"
F_SEMI = REPO + "/resp-video/fonts/Manrope-700-latin.woff2"
F_REG = REPO + "/resp-video/fonts/Manrope-500-latin.woff2"

# Manrope files here are variable fonts that default to ExtraLight; set the weight axis explicitly
WEIGHT = {F_BOLD: 700, F_SEMI: 600, F_REG: 500}

# ---------------------------------------------------------------- overlay timeline (seconds)
UNDERLINES = [  # (track name, start, end)
    ("p1_amount", 11.2, 14.9),
    ("p1_tax_year", 16.0, 19.6),
    ("p1_notice_date", 16.8, 19.6),
    ("see_inside", 19.9, 22.3),
    ("row_amount_value", 26.6, 32.0),
    ("row_reason_value", 28.2, 32.0),
    ("row_deadline_value", 29.8, 32.0),
]
TICKS = [("p2_name", 43.0), ("p2_tax_year", 44.2), ("p2_amount", 45.4), ("p2_reason", 46.6), ("p2_deadline", 47.8)]
TICKS_END = 49.0
TITLES = [  # (lines, start, end, y_center as fraction of height, size px @1080, font)
    (["WAIT."], 32.7, 39.7, 0.20, 150, F_BOLD),
    (["CHECK THE DETAILS"], 41.0, 44.6, 0.115, 54, F_BOLD),
    (["UNDERSTAND THE LETTER", "BEFORE YOU ACT."], 51.5, 55.5, 0.20, 60, F_BOLD),
    (["Fictional example · General info, not advice"], 49.6, 55.5, 0.955, 26, F_REG),
]


def ease(x):
    x = min(1.0, max(0.0, x))
    return x * x * (3 - 2 * x)


def draw_marks(img, t, tr, k):
    """Red-pencil underlines and ticks drawn into the paper (multiply), drawn on over ~0.45 s."""
    if not tr:
        return img
    w, h = img.size
    mark = Image.new("RGB", (w, h), (255, 255, 255))
    d = ImageDraw.Draw(mark)
    any_mark = False
    for name, t0, t1 in UNDERLINES:
        if t0 <= t < t1 and name in tr:
            p = ease((t - t0) / 0.45)
            (x0, y0), (x1, y1) = tr[name]
            x0, y0, x1, y1 = x0 * k, y0 * k, x1 * k, y1 * k
            ln = math.hypot(x1 - x0, y1 - y0)
            th = max(2.0, min(9.0 * k * 4, 0.011 * ln))
            xe, ye = x0 + (x1 - x0) * p, y0 + (y1 - y0) * p
            # pencil pressure: slightly thicker in the middle, small wobble
            n = 24
            pts = []
            for i in range(n + 1):
                f = i / n
                xx, yy = x0 + (xe - x0) * f, y0 + (ye - y0) * f + math.sin(f * 7.0 + len(name)) * th * 0.18
                pts.append((xx, yy))
            d.line(pts, fill=RED, width=int(round(th)), joint="curve")
            any_mark = True
    if 42.0 <= t < TICKS_END:
        for name, t0 in TICKS:
            if t >= t0 and name in tr:
                p = ease((t - t0) / 0.35)
                (x0, y0), (x1, y1) = tr[name]
                x0, y0, x1, y1 = x0 * k, y0 * k, x1 * k, y1 * k
                dx, dy = (x1 - x0), (y1 - y0)
                ln = math.hypot(dx, dy) or 1
                ux, uy = dx / ln, dy / ln
                s = 34 * (w / REF_W)  # 34 px at 1080
                cx, cy = x0 - ux * s * 1.9, y0 - uy * s * 1.9
                # check mark in the local frame of the printed line
                a = (cx - ux * s * 0.45 - uy * -s * 0.05, cy - uy * s * 0.45 + ux * -s * 0.05)
                b = (cx - ux * s * 0.10 + (-uy) * -s * 0.38, cy - uy * s * 0.10 + ux * s * 0.38)
                c = (cx + ux * s * 0.55 - (-uy) * s * 0.55, cy + uy * s * 0.55 - ux * s * 0.55)
                th = max(2, int(round(5 * w / REF_W)))
                if p < 0.4:
                    q = p / 0.4
                    d.line([a, (a[0] + (b[0] - a[0]) * q, a[1] + (b[1] - a[1]) * q)], fill=RED, width=th)
                else:
                    q = (p - 0.4) / 0.6
                    d.line([a, b, (b[0] + (c[0] - b[0]) * q, b[1] + (c[1] - b[1]) * q)], fill=RED, width=th,
                           joint="curve")
                any_mark = True
    if not any_mark:
        return img
    mark = mark.filter(ImageFilter.GaussianBlur(0.6 * w / REF_W))
    a = np.asarray(img, dtype=np.float32) / 255.0
    m = np.asarray(mark, dtype=np.float32) / 255.0
    # pencil is semi-transparent: blend toward multiply at 85%
    out = a * (1 - 0.85 * (1 - m))
    return Image.fromarray(np.clip(out * 255, 0, 255).astype(np.uint8))


def film_finish(a, f, rng):
    """a: float32 HxWx3 in 0..1 (display-referred)."""
    h, w, _ = a.shape
    s = w / REF_W
    # halation: bright areas bleed a faint warm-red glow (film base reflection), very restrained
    lum = a @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    hi = np.clip((lum - 0.80) / 0.2, 0, 1)
    if hi.max() > 0:
        hi_img = Image.fromarray((hi * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(14 * s))
        g = np.asarray(hi_img, dtype=np.float32)[..., None] / 255.0
        a = a + g * np.array([0.050, 0.016, 0.006], dtype=np.float32)
    # natural vignetting (cos^4-like), ~10 % at the corners
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    r2 = ((xx - w / 2) / (w / 2)) ** 2 * 0.56 + ((yy - h / 2) / (h / 2)) ** 2
    a = a * (1 - 0.10 * np.clip(r2 / 1.56, 0, 1) ** 1.3)[..., None]
    # lateral chromatic aberration: red slightly larger, blue slightly smaller (sub-pixel at 1080)
    for ch, sc in ((0, 1.0007), (2, 0.9993)):
        cx, cy = w / 2, h / 2
        M = np.float32([[sc, 0, cx - cx * sc], [0, sc, cy - cy * sc]])
        a[..., ch] = cv2.warpAffine(np.ascontiguousarray(a[..., ch]), M, (w, h), flags=cv2.INTER_CUBIC,
                                    borderMode=cv2.BORDER_REFLECT)
    # grain: luminance-weighted (strongest in mid-tones), slightly soft, almost no chroma
    lum = a @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    amp = 0.022 * (0.35 + 1.3 * lum * (1 - lum) * 2)
    n = rng.standard_normal((h, w)).astype(np.float32)
    n_img = Image.fromarray(np.clip(n * 40 + 128, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.55 * max(s, 0.5)))
    n = (np.asarray(n_img, dtype=np.float32) - 128) / 40
    c = rng.standard_normal((h, w, 3)).astype(np.float32) * 0.18
    a = a + (n[..., None] + c) * amp[..., None]
    return np.clip(a, 0, 1)


def titles(img, t):
    w, h = img.size
    s = w / REF_W
    over = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(over)
    drew = False
    for lines, t0, t1, yc, size, fpath in TITLES:
        if not (t0 <= t < t1):
            continue
        a = ease((t - t0) / 0.30) * (1 - ease((t - (t1 - 0.30)) / 0.30))
        f = ImageFont.truetype(fpath, int(size * s))
        try:
            f.set_variation_by_axes([WEIGHT.get(fpath, 700)])
        except OSError:
            pass
        lh = int(size * s * 1.12)
        y = int(h * yc - lh * len(lines) / 2)
        for i, line in enumerate(lines):
            track = int(size * s * 0.06)
            widths = [d.textlength(ch, font=f) + track for ch in line]
            x = int((w - (sum(widths) - track)) / 2)
            # soft contact shadow so type separates from bright paper without a box
            sh = Image.new("RGBA", (w, h), (0, 0, 0, 0))
            sd = ImageDraw.Draw(sh)
            xx = x
            for ch, cw in zip(line, widths):
                sd.text((xx, y + i * lh), ch, font=f, fill=(0, 0, 0, int(110 * a)))
                xx += cw
            sh = sh.filter(ImageFilter.GaussianBlur(6 * s))
            over = Image.alpha_composite(over, sh)
            d = ImageDraw.Draw(over)
            xx = x
            for ch, cw in zip(line, widths):
                d.text((xx, y + i * lh), ch, font=f, fill=(*IVORY, int(255 * a)))
                xx += cw
        drew = True
    if not drew:
        return img
    base = img.convert("RGBA")
    return Image.alpha_composite(base, over).convert("RGB")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tag", default="preview")
    ap.add_argument("--crf", type=int, default=18)
    ap.add_argument("--out", default="")
    a = ap.parse_args()
    src = os.path.join(HERE, "build", f"frames_{a.tag}")
    with open(os.path.join(HERE, "build", "tracks.json")) as fh:
        tracks = json.load(fh)
    h, w = cv2.imread(os.path.join(src, "f0001.png"), cv2.IMREAD_UNCHANGED).shape[:2]
    k = w / REF_W
    out = a.out or os.path.join(HERE, "build", f"taxcase001_{a.tag}.mp4")
    enc = subprocess.Popen(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{w}x{h}",
         "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "slow", "-crf", str(a.crf),
         "-pix_fmt", "yuv420p", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
         "-color_range", "tv", "-movflags", "+faststart", out], stdin=subprocess.PIPE)
    rng = np.random.default_rng(2026)
    for f in range(1, NF + 1):
        t = (f - 1) / FPS
        raw = cv2.imread(os.path.join(src, f"f{f:04d}.png"), cv2.IMREAD_UNCHANGED)
        arr = raw[..., ::-1].astype(np.float32) / (65535.0 if raw.dtype == np.uint16 else 255.0)
        im8 = Image.fromarray(np.clip(arr[..., :3] * 255, 0, 255).astype(np.uint8))
        im8 = draw_marks(im8, t, tracks.get(str(f), {}), k)
        a_ = np.asarray(im8, dtype=np.float32) / 255.0
        a_ = film_finish(a_, f, rng)
        im8 = Image.fromarray((a_ * 255 + 0.5).astype(np.uint8))
        im8 = titles(im8, t)
        enc.stdin.write(im8.tobytes())
    enc.stdin.close()
    enc.wait()
    print("wrote", out)


if __name__ == "__main__":
    main()
