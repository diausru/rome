"""B3 — "Work from home? Your office square feet" Self-employed business-use-of-home, handwritten explainer, ≈66 s, 1080x1920, 24 fps.
Shares the B4 engine and plate (../b4/engine.py, series "Real Tax Math"). Master timeline = the measured Grady
voiceover (vo/grady/proc, placed by vo_place.json).
  python3 film.py --preview [t,t,...]    contact sheet → assets/contact_*.jpg
  python3 film.py                        full render → build/b3_silent.mp4
"""
import json
import math
import os
import subprocess
import sys

import cv2
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(HERE), "b4"))
import engine as E  # noqa: E402

VO = [tuple(v) for v in json.load(open(os.path.join(HERE, "vo_place.json")))]
DUR = round(VO[-1][1] + VO[-1][4] + 0.6, 2)
NF = int(DUR * E.FPS)


def build():
    W = E.Writer(seed=8)
    tl = E.Timeline(rest=(66.0, 64.0), seed=12)
    boxes = {}

    def write(name, text, x, y, size, t0, align="left", speed=160):
        st, box = W.text(text, x, y, size, align=align)
        while align == "left" and box[2] > 190 and size > 5:     # keep every line inside the paper margin
            size -= 0.25
            st, box = W.text(text, x, y, size, align=align)
        t1 = tl.write(st, t0, speed=speed, name=name, box=box)
        boxes[name] = box
        return t1

    def circle(name, target, t0, frac=(0.0, 1.0), pad=3.2):
        x0, y0, x1, y1 = boxes[target]
        b = (x0 + (x1 - x0) * frac[0], y0, x0 + (x1 - x0) * frac[1], y1)
        return tl.write(W.circle(b, pad=pad), t0, speed=240, name=name)

    # hook: the rent is not the write-off, the office area might be
    t = write("hook", "rent = write-off?", 24, 42, 10, 0.3, speed=150)
    x0, y0, x1, y1 = boxes["hook"]
    t = tl.write(W.underline(x0 - 1, x0 + (x1 - x0) * 0.26, (y0 + y1) / 2 + 0.5), t + 0.05, speed=260, name="strike")
    t = write("sqft", "office sq ft?", 24, 60, 8, max(t + 0.1, 3.9), speed=175)
    # who: self-employed, main place of business
    t = write("who", "self-employed", 24, 80, 8, max(t + 0.1, 6.6), speed=175)
    t = write("main", "main place of business", 24, 96, 7, max(t + 0.1, 9.4), speed=180)
    tl.retreat(t + 0.1, to=(186, 110), next_start=15.4)
    # the ratio
    t = write("area", "1,000 sq ft", 24, 118, 8, 15.4)
    t = write("off", "120 office", 24, 136, 8, max(t + 0.1, 18.3))
    t = write("pct", "= 12%", boxes["off"][2] + 9, 136, 10, max(t + 0.1, 20.8))
    t = circle("c_pct", "pct", t + 0.05, frac=(0.32, 1.0), pad=2.8)
    tl.retreat(t + 0.1, to=(186, 150), next_start=23.3)
    # the costs and the deduction
    t = write("cost", "costs $20,200", 24, 156, 9, 23.3)
    tl.retreat(t + 0.1, to=(186, 170), next_start=27.8)
    t = write("mul", "12% × $20,200", 24, 176, 9, 27.8)
    t = write("ded", "= $2,424", 24, 196, 10, t + 0.08)
    t = circle("c_ded", "ded", t + 0.05, frac=(0.22, 1.0), pad=2.8)
    tl.retreat(t + 0.1, to=(186, 210), next_start=35.8)
    # the tax effect (B4 example)
    t = write("save", "≈ $862 saved", 24, 214, 9, 35.8)
    x0, y0, x1, y1 = boxes["save"]
    t = tl.write(W.underline(x0 + (x1 - x0) * 0.14, x0 + (x1 - x0) * 0.52, y1 + 3.0), t + 0.06, speed=240, name="ul_save")
    tl.retreat(t + 0.1, to=(186, 224), next_start=42.4)
    # the limits
    t = write("shared", "shared space? × business hours", 24, 232, 7, 42.4)
    tl.retreat(t + 0.1, to=(186, 240), next_start=50.0)
    t = write("loss", "no loss → carry forward", 24, 248, 7, 50.0)
    tl.retreat(t + 0.1, to=(186, 256), next_start=55.8)
    t = write("cca", "own? CCA → get advice", 24, 264, 7, 55.8)
    tl.retreat(t + 0.1, to=(170, 150), next_start=62.6)
    # payoff: circle the workspace
    t = circle("c_off", "off", 62.6, pad=3.2)
    tl.retreat(t + 0.15, to=(232, 300))
    return tl, boxes


def camera_track(tl, boxes):
    """Follow the active line at 1.78; push in (≈3.0) on every circled sum and on the final rule; wide at both ends."""
    it = {i["name"]: i for i in tl.items}

    def c(name, fx=0.5):
        x0, y0, x1, y1 = boxes[name]
        return x0 + (x1 - x0) * fx, (y0 + y1) / 2
    K = [(0.0, 88, 50, 1.32), (2.9, 104, 50, 1.76), (6.6, 104, 74, 1.78), (14.8, 104, 112, 1.78)]
    px, py = c("pct")
    K += [(it["c_pct"]["t0"] - 0.3, px - 10, py, 2.2), (it["c_pct"]["t1"] + 0.3, px - 4, py, 3.0),
          (it["cost"]["t0"] - 0.1, px - 6, py + 2, 3.0), (it["cost"]["t0"] + 1.0, 104, 152, 1.80), (27.4, 104, 170, 1.78)]
    dx, dy = c("ded", 0.6)
    K += [(it["c_ded"]["t0"] - 0.3, dx + 10, dy, 2.2), (it["c_ded"]["t1"] + 0.3, dx + 4, dy, 3.0),
          (35.2, dx + 4, dy + 2, 3.0), (36.2, 104, 210, 1.80)]
    sx, sy = c("save", 0.33)
    K += [(it["ul_save"]["t0"] - 0.3, sx + 10, sy, 2.2), (it["ul_save"]["t1"] + 0.3, sx + 6, sy + 1, 2.9),
          (41.6, sx + 6, sy + 2, 2.9), (42.6, 104, 228, 1.80), (49.8, 104, 242, 1.78), (55.6, 104, 252, 1.78),
          (61.6, 104, 170, 1.62)]
    ox, oy = c("off")
    K += [(it["c_off"]["t0"] - 0.1, ox + 12, oy + 6, 2.3), (it["c_off"]["t1"] + 0.2, ox + 10, oy + 4, 2.3),
          (64.6, ox + 10, oy + 5, 2.3), (DUR - 0.5, 108, 150, 1.28), (DUR, 108, 148, 1.26)]
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
FOOT = ["Example: 2026 · MB · $60K net self-employed · rented home · 12% office",
        "Source: canada.ca (CRA) · General info, not advice"]


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
    out = os.path.join(HERE, "build", "b3_silent.mp4")
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
