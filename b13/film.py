"""B13 — "Laptop 60% for work: what can you write off?" Handwritten explainer, ≈62 s, 1080x1920, 24 fps.
Shares the B4 engine and plate (../b4/engine.py, series "Real Tax Math"). Master timeline = the measured Grady
voiceover (vo/grady/proc, placed by vo_place.json). Numbers from calc.py / data.json. Ending: handwritten curiosity-loop CTA
(channel/HANDWRITTEN-CTA.md): "how do you prove 60%?" → a tiny hand-ruled log → "comment LOG", underlined.
  python3 film.py --preview [t,t,...]    contact sheet → assets/contact_*.jpg
  python3 film.py                        full render → build/b13_silent.mp4
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
    W = E.Writer(seed=53)
    tl = E.Timeline(rest=(66.0, 64.0), seed=59)
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

    # hook: the split
    t = write("hook", "laptop: 60% work?", 24, 40, 10.5, 0.3, speed=255)
    t = write("nf", "40% Netflix", 24, 55, 9.5, max(t + 0.1, 2.6), speed=270)
    tl.retreat(t + 0.1, to=(186, 64), next_start=6.9)
    t = write("base", "$2,000 · 2026: 100% year 1", 24, 70, 9, 6.9, speed=245)
    tl.retreat(t + 0.1, to=(186, 79), next_start=13.4)
    t = write("calc", "60% x $2,000 = $1,200", 24, 85, 9.5, 13.4, speed=250)
    t = circle("c_calc", "calc", max(t + 0.1, 17.8), frac=(0.70, 1.0), pad=2.6)
    tl.retreat(t + 0.05, to=(236, 150), next_start=20.0)
    t = write("pers", "$800 personal: never", 24, 100, 9, 20.0, speed=265)
    tl.retreat(t + 0.1, to=(186, 109), next_start=25.6)
    t = write("save", "saves $427", 24, 115, 9.5, 25.6, speed=245)
    t = circle("c_save", "save", max(t + 0.1, 28.2), frac=(0.5, 1.0), pad=2.6)
    t = write("taxcpp", "tax + CPP", boxes["save"][2] + 9, 115, 8, t + 0.1, speed=260)
    tl.retreat(t + 0.1, to=(186, 124), next_start=32.4)
    t = write("full", "100% work: $711", 24, 130, 9, 32.4, speed=250)
    t = write("gap", "the 40% costs $285", 24, 145, 9, max(t + 0.1, 36.4), speed=255)
    tl.retreat(t + 0.1, to=(186, 154), next_start=40.8)
    t = write("jan", "Jan 2027: 55% x $1,200 = $660", 24, 160, 9, 40.8, speed=245)
    t = write("jsave", "saves $235", 24, 175, 9, max(t + 0.1, 47.0), speed=270)
    tl.retreat(t + 0.1, to=(186, 184), next_start=49.7)
    t = write("reas", "60% must be reasonable", 24, 190, 9, 49.7, speed=255)
    t = underline("ul_reas", "reas", t + 0.05, frac=(0.37, 1.0))
    tl.retreat(t + 0.1, to=(186, 199), next_start=54.2)
    # final CTA (channel/HANDWRITTEN-CTA.md): the next question, a tiny hand-ruled log, then the one-word ask
    t = write("q", "prove 60%?", 24, 205, 9.5, 54.2, speed=300)
    j = W.rnd.gauss
    gx0, gx1, gy0, gy1 = 25.0, 66.0, 211.5, 226.5
    grid = [[(gx0, gy0 + j(0, .12)), (gx1 + j(0, .2), gy0 - 0.2), (gx1 + 0.3, gy1 + j(0, .12)), (gx0 - 0.2, gy1 + 0.2), (gx0 + 0.2, gy0 - 0.3)],
            [(gx0 + 0.2, gy0 + 5.0), (gx1 - 0.2, gy0 + 5.2)], [(gx0 + 0.1, gy0 + 10.0), (gx1 - 0.1, gy0 + 10.1)],
            [(gx0 + 15.0, gy0 - 0.2), (gx0 + 15.2, gy1 + 0.2)]]
    t = tl.write(grid, t + 0.1, speed=320, name="grid")
    t = write("cta", "comment LOG", 74, 223, 10, max(t + 0.1, 57.3), speed=330)
    x0, y0, x1, y1 = boxes["cta"]
    t = tl.write(W.underline(x0 + (x1 - x0) * 0.66, x1 + 1.5, y1 + 3.0), t + 0.05, speed=300, name="ul_cta")
    tl.retreat(t + 0.25, to=(232, 300))
    return tl, boxes


def camera_track(tl, boxes):
    """Follow the active line at 1.78 (keys at each new line); push in (≈2.9) on the circled $1,200 and $427; wide at both ends."""
    it = {i["name"]: i for i in tl.items}

    def c(name, fx=0.5):
        x0, y0, x1, y1 = boxes[name]
        return x0 + (x1 - x0) * fx, (y0 + y1) / 2
    K = [(0.0, 88, 48, 1.32), (2.8, 104, 48, 1.76)]
    push = {}
    for name, frac in (("c_calc", ("calc", 0.84)), ("c_save", ("save", 0.76))):
        push[name] = frac
    for i in tl.items:
        n = i["name"]
        if n in boxes and n not in ("hook", "taxcpp", "barlab", "pers", "cta"):
            K.append((i["t0"] - 0.35, 104, boxes[n][3] - 4, 1.78))
        if n in push:
            tx, fx = push[n]
            px, py = c(tx, fx)
            h0, h1 = (0.3, 0.95) if n != "c_calc" else (0.45, 1.35)       # longer, hand-free hold on $1,200 (cover)
            K += [(i["t0"] - 0.3, px - 6, py, 2.2), (i["t1"] + h0, px - 4, py, 2.9), (i["t1"] + h1, px - 4, py + 1, 2.9)]
    fx, fy = c("cta", 0.5)
    K += [(it["grid"]["t0"] - 0.3, 70, 213, 1.95), (it["ul_cta"]["t1"] + 0.1, 72, 215, 2.0),
          (it["ul_cta"]["t1"] + 0.85, 104, 186, 1.56), (DUR, 104, 185, 1.55)]
    K.sort(key=lambda k: k[0])
    out = [K[0]]
    for k in K[1:]:
        if k[0] - out[-1][0] >= 0.45:
            out.append(k)
    return out


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
FOOT = ["Example: MB · single · 2026 · $60K net · $2,000 laptop, 60% work",
        "Source: CRA T4002 ch. 4 · Regs 1100(2) · not advice"]


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
    out = os.path.join(HERE, "build", "b13_silent.mp4")
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
