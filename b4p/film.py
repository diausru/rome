"""B4P — "Same $60K freelancer, 9 provinces" Handwritten explainer, ≈65 s, 1080x1920, 24 fps.
Shares the B4 engine and plate (../b4/engine.py, series "Real Tax Math"). Master timeline = the measured Grady
voiceover (vo/grady/proc, placed by vo_place.json).
  python3 film.py --preview [t,t,...]    contact sheet → assets/contact_*.jpg
  python3 film.py                        full render → build/b4p_silent.mp4
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
    t = write("hook", "$60K × 9 provinces", 24, 42, 10, 0.3, speed=160)
    # same everywhere
    t = write("fed", "fed + CPP = $11,879", 24, 62, 8, max(t + 0.1, 7.7))
    tl.retreat(t + 0.1, to=(186, 74), next_start=14.1)
    t = write("prov", "+ provincial:", 24, 80, 8, 14.1, speed=180)
    # the provinces (amounts as they are spoken)
    t = write("bc", "BC  $2,363", 30, 98, 9, max(t + 0.1, 16.9))
    t = write("ab", "AB  $2,441", 30, 114, 9, max(t + 0.1, 19.9))
    t = write("on", "ON  $2,724", 30, 130, 9, max(t + 0.08, 22.0))
    t = write("mb", "MB  $4,227", 30, 146, 9, max(t + 0.1, 25.4))
    t = circle("c_mb", "mb", t + 0.05, frac=(0.0, 0.3), pad=2.2)
    t = write("ns", "NS  $5,179", 30, 162, 9, max(t + 0.1, 30.4))
    tl.retreat(t + 0.1, to=(186, 176), next_start=36.2)
    # the gap
    t = write("gap", "gap = $2,816/yr", 24, 186, 10, 36.2)
    t = circle("c_gap", "gap", t + 0.05, frac=(0.40, 1.0), pad=2.8)
    tl.retreat(t + 0.1, to=(186, 198), next_start=43.2)
    # the set-aside range
    t = write("pct", "set aside 23.7% → 28.4%", 24, 208, 8, 43.2)
    x0, y0, x1, y1 = boxes["pct"]
    t = tl.write(W.underline(x0 + (x1 - x0) * 0.45, x1 + 1, y1 + 3.0), t + 0.06, speed=240, name="ul_pct")
    tl.retreat(t + 0.1, to=(186, 220), next_start=51.8)
    t = write("qc", "QC: own system", 24, 228, 7, 51.8)
    tl.retreat(t + 0.1, to=(186, 240), next_start=57.6)
    # bridge to the next video
    t = write("next", "next: RRSP $5K →", 24, 250, 8, 57.6)
    tl.retreat(t + 0.2, to=(232, 300))
    return tl, boxes


def camera_track(tl, boxes):
    """Follow the active line at 1.78; push in (≈3.0) on every circled sum and on the final rule; wide at both ends."""
    it = {i["name"]: i for i in tl.items}

    def c(name, fx=0.5):
        x0, y0, x1, y1 = boxes[name]
        return x0 + (x1 - x0) * fx, (y0 + y1) / 2
    K = [(0.0, 88, 50, 1.32), (2.9, 104, 50, 1.76), (7.4, 104, 62, 1.78), (13.9, 104, 84, 1.78),
         (19.6, 104, 108, 1.78), (25.0, 104, 132, 1.78), (30.0, 104, 150, 1.78), (35.8, 104, 174, 1.78)]
    gx, gy = c("gap", 0.7)
    K += [(it["c_gap"]["t0"] - 0.3, gx - 6, gy, 2.2), (it["c_gap"]["t1"] + 0.3, gx + 2, gy, 2.9),
          (42.4, gx + 2, gy + 2, 2.9), (43.4, 104, 202, 1.80)]
    px, py = c("pct", 0.72)
    K += [(it["ul_pct"]["t0"] - 0.3, px - 10, py, 2.2), (it["ul_pct"]["t1"] + 0.3, px - 4, py + 1, 2.9),
          (50.9, px - 4, py + 2, 2.9), (51.9, 104, 224, 1.80), (57.3, 104, 238, 1.78),
          (DUR - 2.4, 104, 236, 1.74), (DUR - 0.4, 108, 150, 1.28), (DUR, 108, 148, 1.26)]
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
FOOT = ["Example: 2026 · single · $60K net self-employment · no other income",
        "Sources: CRA T4127 2026, provincial budgets · Not advice"]


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
    out = os.path.join(HERE, "build", "b4p_silent.mp4")
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
