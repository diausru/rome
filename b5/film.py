"""B5 — "Crossed $30,000? GST/HST registration" Handwritten explainer, ≈68 s, 1080x1920, 24 fps.
Shares the B4 engine and plate (../b4/engine.py, series "Real Tax Math"). Master timeline = the measured Grady
voiceover (vo/grady/proc, placed by vo_place.json).
  python3 film.py --preview [t,t,...]    contact sheet → assets/contact_*.jpg
  python3 film.py                        full render → build/b5_silent.mp4
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
        t1 = tl.write(st, t0, speed=speed, name=name, box=box)
        boxes[name] = box
        return t1

    def circle(name, target, t0, frac=(0.0, 1.0), pad=3.2):
        x0, y0, x1, y1 = boxes[target]
        b = (x0 + (x1 - x0) * frac[0], y0, x0 + (x1 - x0) * frac[1], y1)
        return tl.write(W.circle(b, pad=pad), t0, speed=240, name=name)

    # hook: the threshold, then the question
    t = write("30k", "$30K", 24, 42, 12, 0.3, speed=150)
    t = write("collector", "tax collector?", 94, 42, 8, max(t + 0.1, 3.0))
    # not per calendar year…
    t = write("peryear", "per year", 24, 62, 8, max(t + 0.1, 6.3))
    x0, y0, x1, y1 = boxes["peryear"]
    t = tl.write(W.underline(x0 - 1, x1 + 1, (y0 + y1) / 2 + 0.5), t + 0.05, speed=260, name="strike")
    # …any four calendar quarters in a row
    t = write("4q", "4 quarters in a row", 24, 82, 8, max(t + 0.1, 9.6))
    t = write("sum", "$5K + $8K + $9K + $9.5K", 24, 102, 7, max(t + 0.1, 14.2))
    # total and the line
    t = write("tot", "= $31.5K", 24, 124, 10, max(t + 0.08, 20.7))
    t = write("over", "> $30K", 116, 124, 10, t + 0.1)
    t = circle("c_over", "over", t + 0.05)
    tl.retreat(t + 0.1, to=(186, 150), next_start=27.4)
    # registration timing
    t = write("reg", "→ register in 29 days", 24, 144, 8, max(t + 0.1, 27.4))
    tl.retreat(t + 0.1, to=(178, 160), next_start=32.4)
    # single-quarter exception
    t = write("oneq", "1 qtr > $30K → GST now", 24, 163, 7, 32.4)
    tl.retreat(t + 0.1, to=(180, 182), next_start=39.6)
    # the invoice
    t = write("inv", "$1,000 + 5% = $1,050", 24, 184, 9, 39.6)
    tl.retreat(t + 0.1, to=(182, 200), next_start=45.7)
    t = write("fifty", "$50 → government", 24, 203, 8, 45.7)
    t = circle("c_fifty", "fifty", t + 0.05, frac=(0.0, 0.27), pad=2.8)
    tl.retreat(t + 0.1, to=(186, 214), next_start=51.6)
    # input tax credits
    t = write("itc", "- GST on costs (ITCs)", 24, 222, 8, max(t + 0.2, 51.6))
    tl.retreat(t + 0.1, to=(182, 236), next_start=56.4)
    # other provinces
    t = write("hst", "HST 13–15%", 24, 241, 8, 56.4)
    t = write("pst", "PST: own rules", 24, 258, 8, max(t + 0.1, 59.8))
    tl.retreat(t + 0.1, to=(160, 150), next_start=63.75)
    # payoff: circle the rule
    t = circle("c_rule", "4q", 63.75, pad=3.4)
    tl.retreat(t + 0.15, to=(232, 300))
    return tl, boxes


def camera_track(tl, boxes):
    """Follow the active line at 1.78; push in (≈3.0) on every circled sum and on the final rule; wide at both ends."""
    it = {i["name"]: i for i in tl.items}

    def c(name, fx=0.5):
        x0, y0, x1, y1 = boxes[name]
        return x0 + (x1 - x0) * fx, (y0 + y1) / 2
    K = [(0.0, 88, 50, 1.32), (2.9, 104, 52, 1.76), (8.6, 104, 70, 1.78), (13.6, 104, 92, 1.78),
         (20.4, 104, 114, 1.78)]
    ox, oy = c("over")
    K += [(it["c_over"]["t0"] - 0.2, ox + 20, oy, 2.2), (it["c_over"]["t1"] + 0.3, ox + 2, oy, 3.0),
          (it["reg"]["t0"] - 0.2, ox, oy + 2, 3.0), (it["reg"]["t0"] + 0.9, 104, 142, 1.80),
          (32.0, 104, 156, 1.78), (39.2, 104, 176, 1.78)]
    fx, fy = c("fifty", 0.14)
    K += [(it["c_fifty"]["t0"] - 0.4, fx + 25, fy, 2.2), (it["c_fifty"]["t1"] + 0.3, fx + 4, fy, 3.1),
          (it["itc"]["t0"] + 0.3, fx + 6, fy + 2, 3.1), (it["itc"]["t0"] + 1.3, 104, 216, 1.80),
          (56.0, 104, 236, 1.78), (63.0, 104, 200, 1.62)]
    rx, ry = c("4q")
    K += [(it["c_rule"]["t0"] - 0.1, rx + 10, ry + 8, 2.4), (it["c_rule"]["t1"] + 0.2, rx + 8, ry + 6, 2.05),
          (66.5, rx + 8, ry + 7, 2.05), (DUR - 0.5, 108, 150, 1.28), (DUR, 108, 148, 1.26)]
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
FOOT = ["Example: Manitoba · GST 5% · a sole proprietor's taxable sales",
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
    out = os.path.join(HERE, "build", "b5_silent.mp4")
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
