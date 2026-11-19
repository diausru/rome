"""B17 — "Day trading in a TFSA: when it is taxed" Handwritten explainer, ≈62 s, 1080x1920, 24 fps.
Shares the B4 engine and plate (../b4/engine.py, series "Real Tax Math"). Master timeline = the measured Grady
voiceover (vo/grady/proc, placed by vo_place.json). Numbers from calc.py / data.json. Ending: handwritten curiosity-loop CTA
(channel/HANDWRITTEN-CTA.md): "does Etsy tell CRA?" → two hand-drawn tick boxes "yes" / "no" → "guess below".
  python3 film.py --preview [t,t,...]    contact sheet → assets/contact_*.jpg
  python3 film.py                        full render → build/b17_silent.mp4
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

    # HOOK (silent action + pattern break): frame 0 already shows "$20,000 TFSA gain / tax-free" in ink,
    # the pen is on the paper and strikes "tax-free" out at 0.3 s, then writes "taxable?"
    tl.t, tl.pen = -4.6, (30.0, 46.0)
    t = write("hook", "$20,000 TFSA gain:", 24, 40, 10.5, -4.6, speed=420)
    t = write("free", "tax-free", 24, 55, 10.5, t + 0.05, speed=420)
    x0, y0, x1, y1 = boxes["free"]
    ym = y0 + (y1 - y0) * 0.55
    t = tl.write([[(x0 - 1.5, ym + 0.4), ((x0 + x1) / 2, ym - 0.3), (x1 + 2.0, ym - 0.6)]], 0.3, speed=150, name="strike")
    t = write("txb", "taxable?", x1 + 7, 55, 10.5, t + 0.1, speed=300)
    t = write("pro", "if you trade like a pro", 24, 70, 9.5, max(t + 0.1, 4.3), speed=300)
    tl.retreat(t + 0.1, to=(186, 79), next_start=6.4)
    t = write("rule", "TFSA business = taxable", 24, 85, 9.5, 6.4, speed=280)
    t = write("cg", "incl. capital gains: all", 24, 100, 9.5, max(t + 0.1, 12.4), speed=290)
    tl.retreat(t + 0.1, to=(186, 109), next_start=16.0)
    t = write("fact", "business? a question of fact", 24, 115, 9, 16.0, speed=290)
    t = write("fac", "how often · how long · know-how", 24, 130, 9, max(t + 0.1, 18.8), speed=300)
    tl.retreat(t + 0.1, to=(186, 139), next_start=22.9)
    t = write("warn", "pro frequency + experience", 24, 145, 9, 22.9, speed=290)
    tl.retreat(t + 0.1, to=(186, 154), next_start=31.3)
    t = write("ex", "300 trades · held 1-2 days", 24, 160, 9.5, 31.3, speed=290)
    t = write("gain", "gains: $20,000", 24, 175, 10, max(t + 0.1, 35.6), speed=300)
    tl.retreat(t + 0.1, to=(186, 184), next_start=39.3)
    t = write("tax", "taxable on a T3: $20,000", 24, 190, 10, 39.3, speed=330)
    t = circle("c_tax", "tax", t + 0.1, frac=(0.66, 1.0), pad=2.6)
    tl.retreat(t + 0.05, to=(236, 150), next_start=45.6)
    t = write("liab", "+ you're jointly liable", 24, 205, 9.5, 45.6, speed=330)
    t = write("bh", "buy & hold: usually $0", 24, 220, 9.5, max(t + 0.1, 48.3), speed=320)
    t = underline("ul_bh", "bh", max(t + 0.05, 51.6), frac=(0.78, 1.0))
    tl.retreat(t + 0.1, to=(186, 229), next_start=53.0)
    # final CTA (new mark: two hand-drawn answer bubbles)
    t = write("cta", "TFSA trades this year?", 24, 235, 9.5, 53.0, speed=470)
    j = W.rnd.gauss
    st, box = W.text("< 10", 36.0, 251.0, 9.5)
    t = tl.write(st, t + 0.05, speed=420, name="lt", box=box); boxes["lt"] = box
    t = tl.write(W.circle(box, pad=3.0), t + 0.05, speed=380, name="b1")
    st, box = W.text("10+", 92.0, 251.0, 9.5)
    t = tl.write(st, t + 0.05, speed=420, name="gt", box=box); boxes["gt"] = box
    t = tl.write(W.circle(box, pad=3.0), t + 0.05, speed=380, name="b2")
    tl.retreat(t + 0.25, to=(232, 300))
    return tl, boxes


def camera_track(tl, boxes):
    """Follow the active line at 1.78 (keys at each new line); push in (≈2.9) on the circled $1,200 and $427; wide at both ends."""
    it = {i["name"]: i for i in tl.items}

    def c(name, fx=0.5):
        x0, y0, x1, y1 = boxes[name]
        return x0 + (x1 - x0) * fx, (y0 + y1) / 2
    K = [(0.0, 62, 50, 2.05), (2.6, 80, 54, 2.0), (4.0, 104, 62, 1.78)]       # hook: tight on the struck-out "tax-free" at frame 0
    push = {}
    for name, frac in (("c_tax", ("tax", 0.80)),):
        push[name] = frac
    for i in tl.items:
        n = i["name"]
        if n in boxes and n not in ("hook", "free", "txb", "lt", "gt", "cta", "tax"):
            K.append((i["t0"] - 0.35, 104, boxes[n][3] - 4, 1.78))
        if n in push:
            tx, fx = push[n]
            px, py = c(tx, fx)
            h0, h1 = (0.3, 0.95) if n != "c_tax" else (0.45, 2.2)       # long hand-free hold on the $20,000 taxable line (cover)
            K += [(i["t0"] - 0.3, px - 6, py, 2.2), (i["t1"] + h0, px, py, 2.4), (i["t1"] + h1, px, py + 1, 2.4)]
    K += [(it["cta"]["t0"] - 0.35, 104, 231, 1.78),
          (it["lt"]["t0"] - 0.3, 80, 248, 1.9), (it["b2"]["t1"] + 0.1, 80, 250, 1.95),
          (it["b2"]["t1"] + 0.85, 104, 200, 1.5), (DUR, 104, 199, 1.49)]
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
FOOT = ["Example: 300 trades, $20,000 gains made up · business = question of fact",
        "Source: CRA Folio S3-F10-C1 · CRA TFSA pages · not advice"]


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
    out = os.path.join(HERE, "build", "b17_silent.mp4")
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
