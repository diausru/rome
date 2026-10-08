"""B10 — "Bigger salary, smaller tax on the same $10K side hustle" Handwritten explainer, ≈61 s, 1080x1920, 24 fps.
Shares the B4 engine and plate (../b4/engine.py, series "Real Tax Math"). Master timeline = the measured Grady
voiceover (vo/grady/proc, placed by vo_place.json). Numbers from calc.py. Ending: handwritten curiosity-loop CTA
(channel/HANDWRITTEN-CTA.md): arrow down the margin from the double-underlined total → "same $10K in AB or ON?" with both options circled.
  python3 film.py --preview [t,t,...]    contact sheet → assets/contact_*.jpg
  python3 film.py                        full render → build/b10_silent.mp4
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
DUR = round(VO[-1][1] + VO[-1][4] + 3.8, 2)   # final CTA: underline, settle, then a ≈1 s still hold
NF = int(DUR * E.FPS)


def build():
    W = E.Writer(seed=12)
    tl = E.Timeline(rest=(66.0, 64.0), seed=20)
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
    t = write("hook", "same $10K, bigger salary?", 24, 42, 10, 0.3, speed=180)
    tl.retreat(t + 0.1, to=(186, 54), next_start=6.8)
    t = write("sal", "salary $100K · MB 2026", 24, 62, 9, 6.8, speed=190)
    tl.retreat(t + 0.1, to=(186, 72), next_start=13.0)
    # income tax on the extra $10K
    t = write("fed", "fed 20.5% → $2,050", 24, 80, 9, 13.0, speed=190)
    tl.retreat(t + 0.1, to=(186, 90), next_start=20.2)
    t = write("mb", "MB 17.4% → $1,688", 24, 98, 9, 20.2, speed=190)
    tl.retreat(t + 0.1, to=(186, 110), next_start=29.2)
    # CPP: the twist
    t = write("cpp60", "CPP @ $60K: $1,190", 24, 118, 9, 29.2, speed=190)
    tl.retreat(t + 0.1, to=(186, 128), next_start=36.3)
    t = write("cpp100", "CPP @ $100K: $0", 24, 136, 10, 36.3, speed=190)
    t = write("maxed", "(job maxed CPP + CPP2)", 30, 151, 7, t + 0.2, speed=210)
    t = circle("c_zero", "cpp100", max(t + 0.1, 44.3), frac=(0.84, 1.0), pad=2.6)
    tl.retreat(t + 0.1, to=(186, 162), next_start=46.2)
    # total, double-underlined
    t = write("tot", "total $3,738", 24, 170, 10, 46.2, speed=200)
    x0, y0, x1, y1 = boxes["tot"]
    ux0 = x0 + (x1 - x0) * 0.44
    t = tl.write(W.underline(ux0, x1 + 1, y1 + 2.6), t + 0.06, speed=260, name="ul_tot")
    t = tl.write(W.underline(ux0 + 1, x1 + 2, y1 + 4.4), t + 0.04, speed=260, name="ul_tot2")
    t = write("vs", "vs $4,161 → -$424", 24, 191, 9, max(t + 0.15, 49.6), speed=210)
    tl.retreat(t + 0.1, to=(186, 198), next_start=52.9)
    # final CTA: arrow down the left margin from the total to the vote; both options circled
    path = [(17.0 + W.rnd.gauss(0, 0.06), 166.0 + 1.6 * i) for i in range(26)]
    path = [(17.0 + 0.9 * math.sin(i / 25 * math.pi), y) for (_, y), i in zip(path, range(26))]
    ex, ey = path[-1]
    head = [(ex - 2.2, ey - 3.0), (ex, ey), (ex + 2.4, ey - 2.8)]
    t = tl.write([path, head], 52.9, speed=150, name="arrow")
    t = write("ask", "same $10K in", 24, 214, 9, t + 0.15, speed=210)
    t = write("vote", "AB  or  ON ?", 24, 234, 11, t + 0.15, speed=210)
    x0, y0, x1, y1 = boxes["vote"]
    w = x1 - x0
    t = circle("c_ab", "vote", t + 0.1, frac=(0.0, 0.22), pad=2.2)
    t = circle("c_on", "vote", t + 0.08, frac=(0.62, 0.86), pad=2.2)
    tl.retreat(t + 0.25, to=(232, 300))
    return tl, boxes


def camera_track(tl, boxes):
    """Follow the active line at 1.78; push in (≈3.0) on every circled sum and on the final rule; wide at both ends."""
    it = {i["name"]: i for i in tl.items}

    def c(name, fx=0.5):
        x0, y0, x1, y1 = boxes[name]
        return x0 + (x1 - x0) * fx, (y0 + y1) / 2
    K = [(0.0, 88, 50, 1.32), (2.9, 104, 50, 1.76), (6.4, 104, 66, 1.78), (12.6, 104, 84, 1.78),
         (19.8, 104, 102, 1.78), (28.8, 104, 122, 1.78)]
    zx, zy = c("cpp100", 0.88)
    K += [(it["c_zero"]["t0"] - 0.3, zx - 8, zy, 2.2), (it["c_zero"]["t1"] + 0.3, zx - 4, zy, 2.9),
          (it["c_zero"]["t1"] + 1.4, zx - 4, zy + 1, 2.9), (it["c_zero"]["t1"] + 2.2, 104, 156, 1.80)]
    px, py = c("tot", 0.70)
    K += [(it["ul_tot"]["t0"] - 0.3, px - 6, py, 2.2), (it["ul_tot2"]["t1"] + 0.3, px, py + 1, 2.9),
          (it["ul_tot2"]["t1"] + 1.0, px, py + 2, 2.9), (it["ul_tot2"]["t1"] + 1.8, 104, 190, 1.80),
          (it["arrow"]["t0"] - 0.2, 96, 194, 1.60), (it["ask"]["t1"], 100, 216, 1.75)]
    vx, vy = c("vote", 0.45)
    K += [(it["c_ab"]["t0"] - 0.4, vx, vy, 2.05), (it["c_on"]["t1"] + 0.1, vx + 2, vy, 2.15),
          (it["c_on"]["t1"] + 0.85, 104, 200, 1.62), (DUR, 104, 199, 1.60)]
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
FOOT = ["Example: MB · single · 2026 · +$10K net self-employment · basic credits",
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
    out = os.path.join(HERE, "build", "b10_silent.mp4")
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
