"""B6 — "Can you write off your car?" Self-employed vehicle expenses, handwritten explainer, ≈64 s, 1080x1920, 24 fps.
Shares the B4 engine and plate (../b4/engine.py, series "Real Tax Math"). Master timeline = the measured Grady
voiceover (vo/grady/proc, placed by vo_place.json).
  python3 film.py --preview [t,t,...]    contact sheet → assets/contact_*.jpg
  python3 film.py                        full render → build/b6_silent.mp4
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

    # hook
    t = write("hook", "car = write-off?", 24, 42, 10, 0.3, speed=150)
    # the kilometres
    t = write("tot", "20,000 km", 24, 64, 8, max(t + 0.1, 4.3))
    t = write("biz", "12,000 biz", 24, 82, 8, max(t + 0.1, 7.2))
    t = write("pct", "= 60%", boxes["biz"][2] + 9, 82, 10, max(t + 0.1, 9.9))
    t = circle("c_pct", "pct", t + 0.05, frac=(0.32, 1.0), pad=2.8)
    tl.retreat(t + 0.1, to=(186, 96), next_start=12.9)
    # the costs
    t = write("cost", "costs $6,200", 24, 104, 9, max(t + 0.1, 12.9))
    tl.retreat(t + 0.1, to=(186, 118), next_start=18.0)
    t = write("mul", "60% × $6,200", 24, 126, 9, 18.0)
    t = write("ded", "= $3,720", 24, 146, 10, t + 0.08)
    t = circle("c_ded", "ded", t + 0.05, frac=(0.22, 1.0), pad=2.8)
    tl.retreat(t + 0.1, to=(186, 160), next_start=26.0)
    # the tax effect (B4 example)
    t = write("save", "≈ $1,323 saved", 24, 166, 9, 26.0)
    x0, y0, x1, y1 = boxes["save"]
    t = tl.write(W.underline(x0 + (x1 - x0) * 0.12, x0 + (x1 - x0) * 0.56, y1 + 3.0), t + 0.06, speed=240, name="ul_save")
    tl.retreat(t + 0.1, to=(186, 178), next_start=32.9)
    # the traps
    t = write("home", "home → work = personal", 24, 186, 7, 32.9)
    tl.retreat(t + 0.1, to=(186, 196), next_start=38.0)
    t = write("rate", "73¢/km = employer allowance", 24, 204, 7, 38.0)
    tl.retreat(t + 0.1, to=(186, 214), next_start=46.4)
    # the logbook
    t = write("log", "logbook: date, place, why, km", 24, 222, 7, 46.4)
    tl.retreat(t + 0.1, to=(186, 232), next_start=53.3)
    t = write("sample", "1 full year → 3-month sample", 24, 240, 7, 53.3)
    tl.retreat(t + 0.1, to=(170, 120), next_start=60.6)
    # payoff: circle the business kilometres
    t = circle("c_biz", "biz", 60.6, pad=3.2)
    tl.retreat(t + 0.15, to=(232, 300))
    return tl, boxes


def camera_track(tl, boxes):
    """Follow the active line at 1.78; push in (≈3.0) on every circled sum and on the final rule; wide at both ends."""
    it = {i["name"]: i for i in tl.items}

    def c(name, fx=0.5):
        x0, y0, x1, y1 = boxes[name]
        return x0 + (x1 - x0) * fx, (y0 + y1) / 2
    K = [(0.0, 88, 50, 1.32), (2.9, 104, 50, 1.76), (5.0, 104, 62, 1.78)]
    px, py = c("pct")
    K += [(it["c_pct"]["t0"] - 0.3, px - 10, py, 2.2), (it["c_pct"]["t1"] + 0.3, px - 4, py, 3.0),
          (12.6, px - 6, py + 2, 3.0), (13.6, 104, 100, 1.80), (17.6, 104, 118, 1.78)]
    dx, dy = c("ded", 0.6)
    K += [(it["c_ded"]["t0"] - 0.3, dx + 10, dy, 2.2), (it["c_ded"]["t1"] + 0.3, dx + 4, dy, 3.0),
          (25.2, dx + 4, dy + 2, 3.0), (26.3, 104, 162, 1.80)]
    sx, sy = c("save", 0.34)
    K += [(it["ul_save"]["t0"] - 0.3, sx + 10, sy, 2.2), (it["ul_save"]["t1"] + 0.3, sx + 6, sy + 1, 2.9),
          (31.6, sx + 6, sy + 2, 2.9), (32.7, 104, 182, 1.80), (37.8, 104, 200, 1.78), (46.2, 104, 218, 1.78),
          (53.2, 104, 232, 1.78), (59.6, 104, 150, 1.62)]
    bx, by = c("biz")
    K += [(it["c_biz"]["t0"] - 0.1, bx + 10, by + 8, 2.3), (it["c_biz"]["t1"] + 0.2, bx + 8, by + 6, 2.3),
          (62.6, bx + 8, by + 7, 2.3), (DUR - 0.5, 108, 150, 1.28), (DUR, 108, 148, 1.26)]
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
FOOT = ["Example: 2026 · Manitoba · $60K net self-employed · 60% business use",
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
    out = os.path.join(HERE, "build", "b6_silent.mp4")
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
