"""B9 — "Tax on $10,000 of side income: two bills" Handwritten explainer, ≈56 s, 1080x1920, 24 fps.
Shares the B4 engine and plate (../b4/engine.py, series "Real Tax Math"). Master timeline = the measured Grady
voiceover (vo/grady/proc, placed by vo_place.json). Numbers from calc.py. Ending: handwritten curiosity-loop CTA
(channel/HANDWRITTEN-CTA.md): arrow from the circled total → next case → underlined ask → hold.
  python3 film.py --preview [t,t,...]    contact sheet → assets/contact_*.jpg
  python3 film.py                        full render → build/b9_silent.mp4
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
DUR = round(VO[-1][1] + VO[-1][4] + 3.4, 2)   # final CTA: underline, settle, then a ≈1 s still hold
NF = int(DUR * E.FPS)


def build():
    W = E.Writer(seed=11)
    tl = E.Timeline(rest=(66.0, 64.0), seed=18)
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
    t = write("hook", "$10K side income: tax?", 24, 42, 10, 0.3, speed=170)
    tl.retreat(t + 0.1, to=(186, 54), next_start=5.5)
    # case 1: the only income
    t = write("c1", "case 1: only income", 24, 62, 9, 5.5, speed=190)
    tl.retreat(t + 0.1, to=(186, 72), next_start=10.5)
    t = write("t1", "income tax $0", 24, 80, 10, 10.5, speed=190)
    t = circle("c_t1", "t1", t + 0.05, frac=(0.86, 1.0), pad=2.4)
    tl.retreat(t + 0.1, to=(186, 90), next_start=15.4)
    t = write("p1", "CPP $773.50", 24, 98, 10, 15.4, speed=190)
    tl.retreat(t + 0.1, to=(186, 110), next_start=20.6)
    # case 2: on top of a salary
    t = write("c2", "case 2: + $60K salary", 24, 120, 9, 20.6, speed=190)
    tl.retreat(t + 0.1, to=(186, 130), next_start=28.0)
    t = write("t2", "income tax $2,971", 24, 138, 9, 28.0, speed=200)
    tl.retreat(t + 0.1, to=(186, 148), next_start=33.1)
    t = write("p2", "CPP $1,190", 24, 156, 9, 33.1, speed=200)
    tl.retreat(t + 0.1, to=(186, 166), next_start=39.8)
    t = write("tot", "total $4,161", 24, 176, 10, 39.8, speed=200)
    t = circle("c_tot", "tot", t + 0.05, frac=(0.52, 1.0), pad=3.6)
    t = write("vs", "vs $774 → 5x+", 24, 194, 9, max(t + 0.15, 44.0), speed=200)
    tl.retreat(t + 0.1, to=(186, 204), next_start=47.4)
    # final CTA: arrow from the circled total to the next question, then the ask, underlined
    x0, y0, x1, y1 = boxes["tot"]
    p0 = (x1 + 5.5, (y0 + y1) / 2)
    c1, c2, p3 = (204.0, p0[1] - 2.0), (206.0, 204.0), (188.0, 208.5)
    path = []
    for i in range(49):                                    # cubic sweep out past the line ends and back to the question
        u = i / 48
        px = (1 - u) ** 3 * p0[0] + 3 * (1 - u) ** 2 * u * c1[0] + 3 * (1 - u) * u * u * c2[0] + u ** 3 * p3[0]
        py = (1 - u) ** 3 * p0[1] + 3 * (1 - u) ** 2 * u * c1[1] + 3 * (1 - u) * u * u * c2[1] + u ** 3 * p3[1]
        path.append((px + W.rnd.gauss(0, 0.07), py + W.rnd.gauss(0, 0.07)))
    ex, ey = path[-1]
    dx, dy = p3[0] - c2[0], p3[1] - c2[1]
    n = math.hypot(dx, dy)
    dx, dy = dx / n, dy / n
    def rot(a):
        return dx * math.cos(a) - dy * math.sin(a), dx * math.sin(a) + dy * math.cos(a)
    (ax, ay), (bx, by) = rot(math.radians(152)), rot(math.radians(-148))
    head = [(ex + ax * 3.6, ey + ay * 3.6), (ex, ey), (ex + bx * 3.4, ey + by * 3.4)]
    t = tl.write([path, head], 47.4, speed=150, name="arrow")
    t = write("ask", "on a $100K salary?", 24, 214, 9, t + 0.2, speed=235)
    tl.retreat(t + 0.1, to=(186, 224), next_start=51.6)
    t = write("cta", "run it next? say yes", 24, 232, 9, 51.6, speed=235)
    x0, y0, x1, y1 = boxes["cta"]
    t = tl.write(W.underline(x0 - 1, x1 + 1, y1 + 3.0), t + 0.08, speed=300, name="ul_cta")
    tl.retreat(t + 0.25, to=(232, 300))
    return tl, boxes


def camera_track(tl, boxes):
    """Follow the active line at 1.78; push in (≈3.0) on every circled sum and on the final rule; wide at both ends."""
    it = {i["name"]: i for i in tl.items}

    def c(name, fx=0.5):
        x0, y0, x1, y1 = boxes[name]
        return x0 + (x1 - x0) * fx, (y0 + y1) / 2
    K = [(0.0, 88, 50, 1.32), (2.9, 104, 50, 1.76), (5.1, 104, 66, 1.78)]
    ax_, ay_ = c("t1", 0.88)
    K += [(it["c_t1"]["t0"] - 0.3, ax_ - 8, ay_, 2.2), (it["c_t1"]["t1"] + 0.3, ax_ - 4, ay_, 2.8),
          (it["c_t1"]["t1"] + 1.4, ax_ - 4, ay_ + 1, 2.8), (it["c_t1"]["t1"] + 2.2, 104, 102, 1.80),
          (20.2, 104, 124, 1.78), (27.6, 104, 142, 1.78), (32.7, 104, 160, 1.78), (39.4, 104, 178, 1.78)]
    px, py = c("tot", 0.72)
    K += [(it["c_tot"]["t0"] - 0.3, px - 6, py, 2.2), (it["c_tot"]["t1"] + 0.3, px, py, 2.9),
          (it["c_tot"]["t1"] + 1.0, px, py + 1, 2.9), (it["c_tot"]["t1"] + 1.8, 104, 196, 1.80),
          (it["arrow"]["t0"] - 0.2, 112, 192, 1.55), (it["arrow"]["t1"] + 0.2, 110, 204, 1.62),
          (it["ask"]["t1"], 104, 218, 1.78)]
    ux, uy = c("cta", 0.5)
    K += [(it["ul_cta"]["t0"] - 0.6, ux, uy, 2.05), (it["ul_cta"]["t1"] + 0.1, ux, uy + 2, 2.15),
          (it["ul_cta"]["t1"] + 0.85, 104, 194, 1.62), (DUR, 104, 193, 1.60)]
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
FOOT = ["Example: MB · single · 2026 · $10K net self-employment · basic credits",
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
    out = os.path.join(HERE, "build", "b9_silent.mp4")
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
