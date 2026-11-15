"""B12 — "Sold the written-off laptop? Recapture" Handwritten explainer, ≈64 s, 1080x1920, 24 fps.
Shares the B4 engine and plate (../b4/engine.py, series "Real Tax Math"). Master timeline = the measured Grady
voiceover (vo/grady/proc, placed by vo_place.json). Numbers from calc.py / data.json. Ending: handwritten curiosity-loop CTA
(channel/HANDWRITTEN-CTA.md): "only 60% for work?" → a hand-drawn 60/40 bar → "reply 60", underlined.
  python3 film.py --preview [t,t,...]    contact sheet → assets/contact_*.jpg
  python3 film.py                        full render → build/b12_silent.mp4
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
DUR = round(VO[-1][1] + VO[-1][4] + 2.6, 2)   # final CTA: underline, settle, then a ≈1 s still hold
NF = int(DUR * E.FPS)


def build():
    W = E.Writer(seed=37)
    tl = E.Timeline(rest=(66.0, 64.0), seed=43)
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

    def underline(name, target, t0, frac=(0.0, 1.0)):
        x0, y0, x1, y1 = boxes[target]
        return tl.write(W.underline(x0 + (x1 - x0) * frac[0] - 0.5, x0 + (x1 - x0) * frac[1] + 1, y1 + 2.8), t0, speed=260, name=name)

    # hook: the sale and the catch
    t = write("hook", "sold it for $700?", 24, 42, 10.5, 0.3, speed=255)
    t = write("catch", "here's the catch", 24, 58, 9.5, max(t + 0.1, 5.0), speed=270)
    tl.retreat(t + 0.1, to=(186, 68), next_start=7.8)
    t = write("was", "laptop $2,000 · 100% claimed", 24, 74, 9, 7.8, speed=240)
    t = write("ucc", "tax value now = $0", 24, 90, 9.5, max(t + 0.1, 12.4), speed=260)
    tl.retreat(t + 0.1, to=(186, 100), next_start=15.3)
    t = write("neg", "$0 - $700 = -$700", 24, 106, 10, 15.3, speed=240)
    t = circle("c_neg", "neg", max(t + 0.1, 18.6), frac=(0.66, 1.0), pad=2.8)
    tl.retreat(t + 0.1, to=(186, 116), next_start=21.0)
    t = write("rec", "= recapture → income", 24, 122, 9.5, 21.0, speed=245)
    tl.retreat(t + 0.1, to=(186, 132), next_start=27.0)
    t = write("cost", "about $249", 24, 138, 9.5, 27.0, speed=245)
    t = circle("c_cost", "cost", max(t + 0.1, 29.6), frac=(0.52, 1.0), pad=2.6)
    t = write("taxcpp", "tax + CPP", boxes["cost"][2] + 9, 138, 8, t + 0.1, speed=260)
    tl.retreat(t + 0.1, to=(186, 148), next_start=33.4)
    t = write("fair", "value it never lost", 24, 154, 9, 33.4, speed=250)
    tl.retreat(t + 0.1, to=(186, 164), next_start=38.6)
    t = write("fix", "fix: replace it same year", 24, 170, 9, 38.6, speed=245)
    tl.retreat(t + 0.1, to=(186, 180), next_start=45.6)
    t = write("math", "$0 + $2,500 - $700 = $1,800", 24, 186, 9, 45.6, speed=240)
    t = underline("ul_math", "math", max(t + 0.05, 50.3), frac=(0.74, 1.0))
    x0, y0, x1, y1 = boxes["math"]
    t = tl.write(W.underline(x0 + (x1 - x0) * 0.74 - 0.3, x1 + 1.2, y1 + 4.6), t + 0.03, speed=280, name="ul2_math")
    t = write("norec", "no recapture", 24, 202, 9, max(t + 0.1, 51.4), speed=270)
    tl.retreat(t + 0.1, to=(186, 212), next_start=53.5)
    # final CTA (channel/HANDWRITTEN-CTA.md): the next question, then a hand-drawn 60/40 bar and the one-word reply
    t = write("q60", "only 60% for work?", 24, 220, 9.5, 53.5, speed=290)
    j = W.rnd.gauss
    bx0, bx1, by0, by1 = 26.0, 106.0, 228.0, 237.0
    bar = [[(bx0, by0 + j(0, .15)), (bx1 + j(0, .2), by0 - 0.2), (bx1 + 0.3, by1 + j(0, .15)), (bx0 - 0.2, by1 + 0.2), (bx0 + 0.2, by0 - 0.4)],
           [(bx0 + 0.6 * (bx1 - bx0), by0 - 0.6), (bx0 + 0.6 * (bx1 - bx0) + 0.3, by1 + 0.6)]]
    t = tl.write(bar, t + 0.1, speed=300, name="bar")
    st, box = W.text("work", bx0 + 4, by1 - 2.0, 6.0)
    t = tl.write(st, t + 0.05, speed=300, name="barlab", box=box)
    boxes["barlab"] = box
    t = write("cta", "reply 60", 24, 252, 10, max(t + 0.1, 57.5), speed=320)
    x0, y0, x1, y1 = boxes["cta"]
    t = tl.write(W.underline(x0 + (x1 - x0) * 0.62, x1 + 1.5, y1 + 3.0), t + 0.05, speed=300, name="ul_cta")
    tl.retreat(t + 0.25, to=(232, 300))
    return tl, boxes


def camera_track(tl, boxes):
    """Follow the active line at 1.78; push in (≈2.9) on the circled -$700, the circled $249 and the double-underlined $1,800."""
    it = {i["name"]: i for i in tl.items}

    def c(name, fx=0.5):
        x0, y0, x1, y1 = boxes[name]
        return x0 + (x1 - x0) * fx, (y0 + y1) / 2
    K = [(0.0, 88, 50, 1.32), (2.8, 104, 50, 1.76), (7.4, 104, 70, 1.78), (12.0, 104, 86, 1.78), (15.0, 104, 102, 1.78)]
    nx, ny = c("neg", 0.83)
    K += [(it["c_neg"]["t0"] - 0.3, nx - 6, ny, 2.2), (it["c_neg"]["t1"] + 0.3, nx - 4, ny, 2.9),
          (it["c_neg"]["t1"] + 0.9, nx - 4, ny + 1, 2.9), (21.6, 104, 118, 1.78), (26.6, 104, 134, 1.78)]
    sx, sy = c("cost", 0.76)
    K += [(it["c_cost"]["t0"] - 0.3, sx + 6, sy, 2.2), (it["c_cost"]["t1"] + 0.3, sx + 4, sy, 2.9),
          (it["c_cost"]["t1"] + 1.0, sx + 4, sy + 1, 2.9), (33.1, 104, 150, 1.78), (38.3, 104, 166, 1.78), (45.3, 104, 182, 1.78)]
    mx, my = c("math", 0.86)
    K += [(it["ul_math"]["t0"] - 0.4, mx - 8, my, 2.2), (it["ul2_math"]["t1"] + 0.2, mx - 4, my + 1, 2.85),
          (it["ul2_math"]["t1"] + 0.9, mx - 4, my + 1.2, 2.85), (53.2, 104, 214, 1.78)]
    fx, fy = c("cta", 0.7)
    K += [(it["ul_cta"]["t0"] - 0.4, fx + 10, fy - 6, 2.0), (it["ul_cta"]["t1"] + 0.1, fx + 10, fy - 6, 2.08),
          (it["ul_cta"]["t1"] + 0.85, 104, 205, 1.58), (DUR, 104, 204, 1.56)]
    assert all(a[0] < b[0] for a, b in zip(K, K[1:])), [k[0] for k in K]
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
FOOT = ["Example: MB · single · 2026 rates · $60K net · laptop sold $700",
        "Source: CRA T4002 ch. 4 · T2125 col. 7 · not advice"]


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
    out = os.path.join(HERE, "build", "b12_silent.mp4")
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
