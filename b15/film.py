"""B15 — "Does Etsy tell CRA? Platform reporting" Handwritten explainer, ≈69 s, 1080x1920, 24 fps.
Shares the B4 engine and plate (../b4/engine.py, series "Real Tax Math"). Master timeline = the measured Grady
voiceover (vo/grady/proc, placed by vo_place.json). Numbers from calc.py / data.json. Ending: handwritten curiosity-loop CTA
(channel/HANDWRITTEN-CTA.md): "does Etsy tell CRA?" → two hand-drawn tick boxes "yes" / "no" → "guess below".
  python3 film.py --preview [t,t,...]    contact sheet → assets/contact_*.jpg
  python3 film.py                        full render → build/b15_silent.mp4
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
DUR = round(VO[-1][1] + VO[-1][4] + 3.3, 2)   # final CTA: underline, settle, then a ≈1 s still hold
NF = int(DUR * E.FPS)


def build():
    W = E.Writer(seed=61)
    tl = E.Timeline(rest=(66.0, 64.0), seed=67)
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

    # hook: no slip, but the platform may report
    t = write("hook", "no tax slip from Etsy?", 24, 40, 10, 0.3, speed=260)
    t = write("since", "since 2024: platforms report", 24, 55, 9.5, max(t + 0.1, 4.6), speed=260)
    tl.retreat(t + 0.1, to=(186, 64), next_start=8.0)
    t = write("who", "name · address · SIN", 24, 70, 9.5, 8.0, speed=250)
    t = write("what", "sales · fees · # of sales", 24, 85, 9.5, max(t + 0.1, 13.0), speed=270)
    tl.retreat(t + 0.1, to=(186, 94), next_start=19.3)
    t = write("copy", "your copy: by Jan 31", 24, 100, 9.5, 19.3, speed=280)
    tl.retreat(t + 0.1, to=(186, 109), next_start=22.6)
    t = write("exc", "exception: < 30 sales", 24, 115, 9.5, 22.6, speed=280)
    t = write("and", "AND $2,800 or less", 24, 130, 9.5, max(t + 0.1, 26.3), speed=290)
    t = underline("ul_and", "and", max(t + 0.05, 29.7), frac=(0.0, 0.22))
    tl.retreat(t + 0.1, to=(186, 139), next_start=30.6)
    t = write("c29", "29 sales, $2,500: not reported", 24, 145, 9, 30.6, speed=300)
    tl.retreat(t + 0.1, to=(186, 154), next_start=34.6)
    t = write("c31", "31 sales, $2,500: reported", 24, 160, 9, 34.6, speed=300)
    t = write("c12", "12 sales, $3,000: reported", 24, 175, 9, max(t + 0.1, 38.8), speed=300)
    tl.retreat(t + 0.1, to=(186, 184), next_start=48.9)
    t = write("prof", "$2,500 - $900 = $1,600 profit", 24, 190, 9, 48.9, speed=280)
    t = write("tax", "tax + CPP: $666", 24, 205, 10.5, max(t + 0.1, 54.0), speed=330)
    t = circle("c_tax", "tax", t + 0.1, frac=(0.62, 1.0), pad=2.6)
    tl.retreat(t + 0.05, to=(236, 150), next_start=60.8)
    # final CTA (new mark: a hand-drawn number line with a tick at 30)
    t = write("cta", "sales this year?", 24, 220, 9.5, 60.8, speed=470)
    j = W.rnd.gauss
    t = tl.write([[(26, 233 + j(0, .15)), (150, 232.6)], [(88, 229.5), (88.2, 236.2)]], t + 0.05, speed=380, name="bar")
    st, box = W.text("under", 30.0, 250.0, 9)
    t = tl.write(st, t + 0.05, speed=440, name="under", box=box); boxes["under"] = box
    st, box = W.text("30", 83.0, 250.0, 9)
    t = tl.write(st, t + 0.05, speed=440, name="n30", box=box); boxes["n30"] = box
    st, box = W.text("over", 118.0, 250.0, 9)
    t = tl.write(st, t + 0.05, speed=440, name="over", box=box); boxes["over"] = box
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
    for name, frac in (("c_tax", ("tax", 0.68)),):
        push[name] = frac
    for i in tl.items:
        n = i["name"]
        if n in boxes and n not in ("hook", "under", "n30", "over", "cta", "tax"):
            K.append((i["t0"] - 0.35, 104, boxes[n][3] - 4, 1.78))
        if n in push:
            tx, fx = push[n]
            px, py = c(tx, fx)
            h0, h1 = (0.3, 0.95) if n != "c_tax" else (0.45, 2.2)       # long hand-free hold on $666 (cover)
            K += [(i["t0"] - 0.3, px - 6, py, 2.2), (i["t1"] + h0, px, py, 2.4), (i["t1"] + h1, px, py + 1, 2.4)]
    K += [(it["cta"]["t0"] - 0.35, 104, 216, 1.78),
          (it["bar"]["t0"] - 0.3, 86, 236, 1.9), (it["over"]["t1"] + 0.1, 86, 240, 1.95),
          (it["over"]["t1"] + 0.85, 104, 194, 1.56), (DUR, 104, 193, 1.55)]
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
FOOT = ["Example: MB · 2026 · $60K salary · shop sales and costs made up",
        "Source: CRA Reporting Rules for Digital Platform Operators · not advice"]


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
    out = os.path.join(HERE, "build", "b15_silent.mp4")
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
