"""B16 — "Client meals: why only 50%" Handwritten explainer, ≈59 s, 1080x1920, 24 fps.
Shares the B4 engine and plate (../b4/engine.py, series "Real Tax Math"). Master timeline = the measured Grady
voiceover (vo/grady/proc, placed by vo_place.json). Numbers from calc.py / data.json. Ending: handwritten curiosity-loop CTA
(channel/HANDWRITTEN-CTA.md): "does Etsy tell CRA?" → two hand-drawn tick boxes "yes" / "no" → "guess below".
  python3 film.py --preview [t,t,...]    contact sheet → assets/contact_*.jpg
  python3 film.py                        full render → build/b16_silent.mp4
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

    # hook: a $400 client dinner, $200 deduction
    t = write("hook", "$400 client dinner", 24, 40, 10.5, 0.3, speed=260)
    t = write("ded", "deduct: $200", 24, 55, 10.5, max(t + 0.1, 2.8), speed=280)
    tl.retreat(t + 0.1, to=(186, 64), next_start=6.2)
    t = write("rule", "line 8523: 50% of the lesser:", 24, 70, 9, 6.2, speed=270)
    t = write("less", "spent or reasonable", 24, 85, 9.5, max(t + 0.1, 10.2), speed=290)
    tl.retreat(t + 0.1, to=(186, 94), next_start=14.1)
    t = write("tips", "tips: same 50%", 24, 100, 9.5, 14.1, speed=290)
    tl.retreat(t + 0.1, to=(186, 109), next_start=17.8)
    t = write("who", "MB · self-employed · $60K", 24, 115, 9.5, 17.8, speed=280)
    t = write("din", "12 dinners x $400 = $4,800", 24, 130, 9.5, max(t + 0.1, 21.4), speed=290)
    tl.retreat(t + 0.1, to=(186, 139), next_start=26.2)
    t = write("half", "x 50% = $2,400 off income", 24, 145, 9.5, 26.2, speed=300)
    t = underline("ul_half", "half", max(t + 0.05, 29.8), frac=(0.30, 0.56))
    tl.retreat(t + 0.1, to=(186, 154), next_start=31.2)
    t = write("tax", "tax + CPP saved: $854", 24, 160, 10, 31.2, speed=330)
    t = circle("c_tax", "tax", t + 0.1, frac=(0.74, 1.0), pad=2.6)
    tl.retreat(t + 0.05, to=(236, 150), next_start=38.7)
    t = write("real", "real cost: about $3,950", 24, 175, 9.5, 38.7, speed=300)
    tl.retreat(t + 0.1, to=(186, 184), next_start=42.4)
    t = write("exc", "exception: billed to client", 24, 190, 9.5, 42.4, speed=380)
    t = write("inv", "on the bill: no 50% limit", 24, 205, 9.5, max(t + 0.1, 45.4), speed=400)
    tl.retreat(t + 0.1, to=(186, 214), next_start=49.5)
    # final CTA (new mark: a hand-drawn two-cell grid "you | client")
    t = write("cta", "who paid?", 24, 220, 10, 49.5, speed=470)
    j = W.rnd.gauss
    grid = [[(26, 228 + j(0, .1)), (142, 227.6), (142.2, 244.2), (25.8, 244.4), (26.1, 227.7)], [(76, 227.9), (76.3, 244.1)]]
    t = tl.write(grid, t + 0.1, speed=380, name="grid")
    st, box = W.text("you", 40.0, 240.0, 9.5)
    t = tl.write(st, t + 0.05, speed=420, name="you", box=box); boxes["you"] = box
    st, box = W.text("client", 84.0, 240.0, 9.5)
    t = tl.write(st, t + 0.05, speed=420, name="client", box=box); boxes["client"] = box
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
    for name, frac in (("c_tax", ("tax", 0.86)),):
        push[name] = frac
    for i in tl.items:
        n = i["name"]
        if n in boxes and n not in ("hook", "you", "client", "cta", "tax"):
            K.append((i["t0"] - 0.35, 104, boxes[n][3] - 4, 1.78))
        if n in push:
            tx, fx = push[n]
            px, py = c(tx, fx)
            h0, h1 = (0.3, 0.95) if n != "c_tax" else (0.45, 2.2)       # long hand-free hold on $854 (cover)
            K += [(i["t0"] - 0.3, px - 6, py, 2.2), (i["t1"] + h0, px, py, 2.4), (i["t1"] + h1, px, py + 1, 2.4)]
    K += [(it["cta"]["t0"] - 0.35, 104, 216, 1.78),
          (it["grid"]["t0"] - 0.3, 80, 234, 1.9), (it["client"]["t1"] + 0.1, 80, 236, 1.95),
          (it["client"]["t1"] + 0.85, 104, 194, 1.56), (DUR, 104, 193, 1.55)]
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
FOOT = ["Example: MB · 2026 · self-employed $60K · 12 dinners x $400 made up",
        "Source: CRA T2125 line 8523 (meals & entertainment) · not advice"]


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
    out = os.path.join(HERE, "build", "b16_silent.mp4")
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
