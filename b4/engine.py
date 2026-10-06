"""Realistic handwritten explainer engine (Tax Secrets Canada, HANDWRITTEN mode).

Plate:  a still photograph of the desk with a blank sheet (assets/plate_b.png, Higgsfield GPT Image 2.5, D2 still plate).
Hand:   a still photograph of a hand holding a marker, matted (assets/hand_c_cut.png). Never deformed: it is moved
        rigidly so the pen tip sits exactly on the ink head, with a small wrist rotation, pen-lift scale and a soft
        contact shadow that separates when the pen lifts.
Ink:    single-line font strokes (EMS Tech, OFL) laid out in paper millimetres, with per-glyph jitter. Ink is
        accumulated in paper space, revealed only along the path the pen tip has travelled, warped to the plate by the
        paper homography and multiplied into the paper (so window shadows stay on top of the ink).
Camera: a virtual camera (crop + scale of the composited plate) with smooth moves and operator micro-motion.
"""
import math
import os
import random

import cv2
import numpy as np

from strokefont import StrokeFont

HERE = os.path.dirname(os.path.abspath(__file__))
FPS = 24
OUT_W, OUT_H = 1080, 1920
PAPER_MM = (215.9, 279.4)
PX_PER_MM = 6.0                       # paper-space ink resolution

# ---------------------------------------------------------------- plate geometry (measured in assets/plate_b.png)
PAPER_QUAD = np.float32([[232, 865], [1167, 731], [1349, 2074], [388, 2186]])   # TL, TR, BR, BL (plate px)
HAND_TIP = np.float32([350, 953])     # pen tip in assets/hand_c_cut.png (whole hand inside the photo)
HAND_WRIST = np.float32([985, 1825])  # wrist / cuff centre in the same photo (pivot for finger-scale strokes)
# objects on the desk (plate px): excluded from the desk light estimate
MUG = (170, 350, 160)                 # coffee surface centre and radius
OBJ_CIRCLES = [(190, 370, 230)]
OBJ_POLYS = [[[0, 500], [150, 500], [150, 720], [0, 720]], [[1170, 0], [1520, 0], [1520, 600], [1170, 600]],
             [[1330, 850], [1520, 850], [1520, 1500], [1330, 1500]], [[0, 2140], [440, 2580], [400, 2688], [0, 2688]]]


def cloud(t):
    """Fraction of direct sun lost to a passing cloud at time t (two slow, soft passes and a faint shimmer)."""
    def bump(t, c, w):
        return math.exp(-((t - c) / w) ** 2)
    return float(np.clip(0.42 * bump(t, 21.0, 3.2) + 0.30 * bump(t, 45.5, 2.6) + 0.02 * math.sin(2 * math.pi * 0.7 * t), 0, 0.6))


HAND_SCALE = 0.92                     # matched by pen length: 538 px here vs 706 px in the first hand photo (×0.70)


def paper_homography():
    src = np.float32([[0, 0], [PAPER_MM[0], 0], [PAPER_MM[0], PAPER_MM[1]], [0, PAPER_MM[1]]])
    return cv2.getPerspectiveTransform(src, PAPER_QUAD)


H_MM = paper_homography()                                   # mm → plate px
S_INK = np.float64([[1 / PX_PER_MM, 0, 0], [0, 1 / PX_PER_MM, 0], [0, 0, 1]])
H_INK = H_MM @ S_INK                                         # ink px → plate px


def mm_to_plate(p):
    v = H_MM @ np.array([p[0], p[1], 1.0])
    return v[:2] / v[2]


PAPER_ANGLE = math.degrees(math.atan2(PAPER_QUAD[1][1] - PAPER_QUAD[0][1], PAPER_QUAD[1][0] - PAPER_QUAD[0][0]))


# ---------------------------------------------------------------- strokes
def _tilde(w, h):
    pts = [(w * i / 16, -h * 0.5 - math.sin(i / 16 * 2 * math.pi) * h * 0.12) for i in range(17)]
    pts2 = [(x, y + h * 0.32) for x, y in pts]
    return [pts, pts2]


def _arrow(w, h):
    y = -h * 0.45
    return [[(0, y), (w, y)], [(w - h * 0.32, y - h * 0.26), (w, y), (w - h * 0.32, y + h * 0.26)]]


CUSTOM = {"≈": (0.9, _tilde), "→": (1.35, _arrow)}


class Writer:
    def __init__(self, font="EMSTech", seed=7):
        self.f = StrokeFont(font)
        self.rnd = random.Random(seed)

    def text(self, s, x, y, size, align="left", tracking=0.06):
        """Strokes (in paper mm) for string s; (x, y) = baseline start (or end if align='right')."""
        strokes, cx = [], 0.0
        sc = size / self.f.cap
        glyph_runs = []
        for ch in s:
            if ch in CUSTOM:
                wf, fn = CUSTOM[ch]
                w = wf * size
                gl = [[(cx + px, py) for px, py in st] for st in fn(w * 0.85, size)]
                adv = w
            else:
                adv_u, gstrokes = self.f.glyphs.get(ch, self.f.glyphs.get("?"))
                gl = [[(cx + px * sc, -py * sc) for px, py in st] for st in gstrokes]
                adv = adv_u * sc
            glyph_runs.append(gl)
            cx += adv + tracking * size
        width = cx - tracking * size
        x0 = x - width if align == "right" else x
        for gl in glyph_runs:
            # per-glyph human variation: small offset, rotation, scale
            dx, dy = self.rnd.gauss(0, 0.06) * size, self.rnd.gauss(0, 0.05) * size
            rot = math.radians(self.rnd.gauss(0, 2.2))
            scl = 1 + self.rnd.gauss(0, 0.03)
            if not gl:
                continue
            gx = sum(p[0] for st in gl for p in st) / sum(len(st) for st in gl)
            for st in gl:
                out = []
                for px, py in st:
                    u, v = (px - gx) * scl, py * scl
                    u, v = u * math.cos(rot) - v * math.sin(rot), u * math.sin(rot) + v * math.cos(rot)
                    out.append((x0 + gx + u + dx, y + v + dy))
                strokes.append(out)
        return strokes, (x0, y - size, x0 + width, y)

    def underline(self, x0, x1, y):
        mid = (x0 + x1) / 2
        return [[(x0, y + 0.3), (mid, y - 0.4 + self.rnd.gauss(0, .3)), (x1, y + 0.5)]]

    def circle(self, box, pad=3.0, turns=1.12):
        x0, y0, x1, y1 = box
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        rx, ry = (x1 - x0) / 2 + pad, (y1 - y0) / 2 + pad * 0.9
        a0 = math.radians(200 + self.rnd.gauss(0, 10))
        n = 60
        pts = []
        for i in range(n + 1):
            a = a0 - 2 * math.pi * turns * i / n          # drawn counter-clockwise on paper (y down)
            wob = 1 + 0.05 * math.sin(3 * a + 0.7) + 0.015 * i / n
            pts.append((cx + rx * wob * math.cos(a), cy + ry * wob * math.sin(a)))
        return [pts]


# ---------------------------------------------------------------- pen kinematics
def min_jerk(u):
    u = min(1.0, max(0.0, u))
    return u * u * u * (10 - 15 * u + 6 * u * u)


def resample(st, step=0.25):
    out = [st[0]]
    for a, b in zip(st, st[1:]):
        d = math.dist(a, b)
        n = max(1, int(d / step))
        for i in range(1, n + 1):
            out.append((a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n))
    return out


class Timeline:
    """Builds the pen path: a list of segments (t0, t1, kind, data). kind = 'draw' (ink), 'move' (pen up), 'hold'."""

    def __init__(self, rest=(205.0, 262.0), seed=3):
        self.segs = []
        self.rest = rest
        self.pen = rest
        self.t = 0.0
        self.rnd = random.Random(seed)
        self.items = []

    def _move(self, to, t0, speed=520.0, lift=1.0):
        t0 = max(t0, self.t)
        d = math.dist(self.pen, to)
        dur = 0.03 + d / speed
        self.segs.append((t0, t0 + dur, "move", (self.pen, to, lift)))
        self.pen = to
        self.t = t0 + dur
        return t0 + dur

    def write(self, strokes, t0, speed=110.0, name=None, box=None):
        """Write strokes starting at t0 (pen moves there first, from wherever it is). Never overlaps earlier work."""
        t = max(t0, self.t)
        start = t
        for st in strokes:
            pts = resample(st)
            t = self._move(pts[0], t, lift=0.6 if self.segs and self.segs[-1][2] == "draw" else 1.0)
            L = sum(math.dist(a, b) for a, b in zip(pts, pts[1:]))
            v = speed * (1 + self.rnd.gauss(0, 0.12))
            dur = max(0.05, L / v) + 0.02
            self.segs.append((t, t + dur, "draw", pts))
            self.pen = pts[-1]
            t += dur + max(0.0, self.rnd.gauss(0.012, 0.008))
            self.t = t
        self.items.append(dict(name=name, t0=start, t1=t, box=box))
        return t

    def retreat(self, t0, to=None, next_start=None):
        """Pull the hand back so the writing is visible, only if there is time before the next item."""
        if next_start is not None and next_start - max(t0, self.t) < 0.9:
            return self.t
        return self._move(to or self.rest, t0, speed=260.0, lift=1.6)

    def state(self, t):
        """(pen position mm, lift 0..1+, ink cut list) at time t."""
        pos, lift = self.rest, 1.2
        for t0, t1, kind, data in self.segs:
            if t < t0:
                break
            u = (t - t0) / (t1 - t0) if t1 > t0 else 1.0
            if kind == "move":
                a, b, lh = data
                k = min_jerk(u)
                pos = (a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k)
                lift = lh * math.sin(math.pi * min(1.0, u)) if u < 1 else 0.0
            elif kind == "draw":
                pts = data
                k = min_jerk(u) * 0.85 + u * 0.15
                i = min(len(pts) - 1, int(k * (len(pts) - 1)))
                pos = pts[i]
                lift = 0.0 if u < 1 else 0.0
        return pos, lift

    def moving(self, t):
        """True while the pen is up and travelling (a 'move' segment): only then is the hand fast enough to blur."""
        for t0, t1, kind, data in self.segs:
            if t0 <= t < t1:
                return kind == "move" and math.dist(data[0], data[1]) > 15.0   # line changes and retreats only
        return False

    def ink_upto(self, t):
        """All draw segments (fully or partially) completed by time t: list of point lists."""
        out = []
        for t0, t1, kind, data in self.segs:
            if kind != "draw" or t < t0:
                continue
            u = min(1.0, (t - t0) / (t1 - t0))
            k = min_jerk(u) * 0.85 + u * 0.15
            n = max(2, int(k * (len(data) - 1)) + 1)
            out.append(data[:n])
        return out


# ---------------------------------------------------------------- renderer
class Renderer:
    def __init__(self):
        plate = cv2.imread(os.path.join(HERE, "assets", "plate_b.png"), cv2.IMREAD_COLOR)
        self.plate = plate.astype(np.float32) / 255.0
        self.ph, self.pw = plate.shape[:2]
        hand = cv2.imread(os.path.join(HERE, "assets", "hand_c_cut.png"), cv2.IMREAD_UNCHANGED)
        # the hand, wrist and cuff are fully inside the photo; only the sleeve touches the right and bottom edges.
        # Continue the sleeve past both edges so no photo border can ever appear inside our frame.
        h0, w0 = hand.shape[:2]
        right = np.zeros((h0, 900, 4), hand.dtype)
        rows = np.where(hand[:, -1, 3] > 0)[0]
        for r in rows:
            src = hand[r, -10:]
            right[r] = np.tile(src, (90, 1))[:900]
        hand = np.concatenate([hand, right], 1)
        ext = 1500
        last = hand[-8:].copy()
        pad = np.zeros((ext, hand.shape[1], 4), hand.dtype)
        for i in range(ext):
            shift = int(i * 0.31)                      # the forearm runs down-right ≈0.31 px per row near the edge
            row = last[i % 8]
            pad[i, shift:] = row[:hand.shape[1] - shift] if shift else row
        hand = np.concatenate([hand, pad], 0)
        hand = cv2.resize(hand, None, fx=HAND_SCALE, fy=HAND_SCALE, interpolation=cv2.INTER_AREA)
        self.hand_rgb = hand[..., :3].astype(np.float32) / 255.0
        # the hand photo is lit neutral/cool; the desk is late-afternoon warm
        self.hand_rgb = np.clip(self.hand_rgb * np.float32([0.90, 0.98, 1.06])[None, None, :], 0, 1)
        self.hand_a = hand[..., 3].astype(np.float32) / 255.0
        self.wrist = HAND_WRIST * HAND_SCALE
        self.tip = HAND_TIP * HAND_SCALE
        # illumination map from the blank paper (uniform albedo): window-blind light and shade, extended over the desk
        lum = cv2.cvtColor(plate, cv2.COLOR_BGR2GRAY).astype(np.float32)
        mask = np.zeros(lum.shape, np.uint8)
        cv2.fillConvexPoly(mask, PAPER_QUAD.astype(np.int32), 255)
        mask = cv2.erode(mask, np.ones((31, 31), np.uint8))
        small = cv2.resize(lum, None, fx=0.125, fy=0.125)
        msmall = cv2.resize(mask, (small.shape[1], small.shape[0]), interpolation=cv2.INTER_NEAREST)
        ref = np.percentile(small[msmall > 0], 97)
        illum = np.where(msmall > 0, small / ref, 0).astype(np.float32)
        illum = cv2.inpaint((np.clip(illum, 0, 1.2) * 200).astype(np.uint8), (msmall == 0).astype(np.uint8), 25, cv2.INPAINT_TELEA)
        illum = cv2.GaussianBlur(illum.astype(np.float32) / 200, (0, 0), 3)
        self.illum = cv2.resize(illum, (self.pw, self.ph), interpolation=cv2.INTER_CUBIC)
        self.ink_w = int(PAPER_MM[0] * PX_PER_MM)
        self.ink_h = int(PAPER_MM[1] * PX_PER_MM)
        self.rng = np.random.default_rng(11)
        # paper-fibre modulation of ink density (marker ink is never perfectly flat)
        n = self.rng.standard_normal((self.ink_h // 4, self.ink_w // 4)).astype(np.float32)
        n = cv2.resize(cv2.GaussianBlur(n, (0, 0), 1.2), (self.ink_w, self.ink_h))
        self.fibre = np.clip(0.93 + 0.05 * n, 0.82, 1.0)
        self._init_light(plate)
        self._init_steam()
        self._init_camera_noise()

    # ------------------------------------------------------------ living light (window blinds, passing cloud)
    def _init_light(self, plate):
        """Sun map s∈[0,1] over the whole plate: 1 inside a blind stripe of direct sun, 0 in the slat shade.
        Paper: the illumination map of the blank sheet. Desk: local / regional luminance (normalised blur over wood
        only), so the wood grain and the objects are not mistaken for light. Objects get an inpainted, smooth value."""
        lum = cv2.cvtColor(plate, cv2.COLOR_BGR2GRAY).astype(np.float32)
        h, w = lum.shape
        paper = np.zeros((h, w), np.uint8)
        cv2.fillConvexPoly(paper, PAPER_QUAD.astype(np.int32), 255)
        obj = np.zeros((h, w), np.uint8)
        for (cx, cy, r) in OBJ_CIRCLES:
            cv2.circle(obj, (cx, cy), r, 255, -1)
        for poly in OBJ_POLYS:
            cv2.fillPoly(obj, [np.int32(poly)], 255)
        desk = ((paper == 0) & (obj == 0)).astype(np.float32)
        desk = cv2.erode(desk, np.ones((15, 15), np.uint8))

        def nblur(x, m, sg):
            return cv2.GaussianBlur(x * m, (0, 0), sg) / np.maximum(cv2.GaussianBlur(m, (0, 0), sg), 1e-4)
        ratio = nblur(lum, desk, 10) / np.maximum(nblur(lum, desk, 90), 1.0)
        lo, hi = np.percentile(ratio[desk > 0], [8, 92])
        s_desk = np.clip((ratio - lo) / (hi - lo), 0, 1)
        pm = paper > 0
        plo, phi = np.percentile(self.illum[pm], [5, 97])
        s_pap = np.clip((self.illum - plo) / (phi - plo), 0, 1)
        sm = np.where(pm, s_pap, np.where(desk > 0, s_desk, 0)).astype(np.float32)
        hole = ((~pm) & (desk == 0)).astype(np.uint8)
        q = 4
        small = cv2.resize(sm, (w // q, h // q), interpolation=cv2.INTER_AREA)
        hs = cv2.resize(hole, (w // q, h // q), interpolation=cv2.INTER_NEAREST)
        small = cv2.inpaint((small * 255).astype(np.uint8), hs, 9, cv2.INPAINT_TELEA).astype(np.float32) / 255
        self.sun_small = cv2.GaussianBlur(small, (0, 0), 1.0)
        # strength of the direct-sun component (lit / shade − 1): wood shows the stripes harder than the paper
        g = np.where(pm, 0.20, 0.40).astype(np.float32)
        self.gain = cv2.GaussianBlur(cv2.resize(g, (w // q, h // q), interpolation=cv2.INTER_AREA), (0, 0), 2)
        self.sun_now = cv2.resize(self.sun_small, (w, h), interpolation=cv2.INTER_LINEAR)
        d = np.float32([1.0, 1.06])
        self.stripe_n = np.float32([d[1], -d[0]]) / np.linalg.norm(d)     # perpendicular to the blind stripes

    def light_ratio(self, t):
        """Per-pixel exposure ratio vs the photographed light at time t: a passing cloud dims the sun component,
        a breeze sways the blind (the stripes drift a few pixels and back)."""
        c = cloud(t)
        sway = 5.0 * math.sin(2 * math.pi * 0.11 * t + 0.6) + 2.0 * math.sin(2 * math.pi * 0.29 * t + 2.1) \
            + 1.2 * self._noise1d(t, 3)
        q = 4
        M = np.float32([[1, 0, self.stripe_n[0] * sway / q], [0, 1, self.stripe_n[1] * sway / q]])
        s1 = cv2.warpAffine(self.sun_small, M, self.sun_small.shape[::-1], borderMode=cv2.BORDER_REFLECT)
        s0 = self.sun_small
        r = (1 + self.gain * (1 - c) * s1) / (1 + self.gain * s0)
        return cv2.resize(r, (self.pw, self.ph), interpolation=cv2.INTER_LINEAR)[..., None]

    # ------------------------------------------------------------ coffee steam (code-made wisps over the mug)
    def _init_steam(self):
        rng = np.random.default_rng(5)
        self.st_q = 4
        self.st_box = (0, 0, 760, 860)                                   # plate px window around the mug
        bw, bh = (self.st_box[2] - self.st_box[0]) // self.st_q, (self.st_box[3] - self.st_box[1]) // self.st_q
        self.st_shape = (bh, bw)
        T = 256

        def tile_noise(sg):                                              # periodic (tileable) Gaussian-filtered noise
            f = np.fft.fft2(rng.standard_normal((T, T)))
            k = np.fft.fftfreq(T)
            g = np.exp(-2 * (math.pi * sg) ** 2 * (k[:, None] ** 2 + k[None, :] ** 2))
            return np.real(np.fft.ifft2(f * g)).astype(np.float32)
        self.st_n1 = tile_noise(4)
        self.st_n2 = tile_noise(9)
        for n in (self.st_n1, self.st_n2):
            n /= n.std()
        yy, xx = np.mgrid[0:bh, 0:bw].astype(np.float32)
        self.st_xx, self.st_yy = xx, yy

    def _wrap_sample(self, img, x, y):
        T = img.shape[0]
        return cv2.remap(img, np.mod(x, T).astype(np.float32), np.mod(y, T).astype(np.float32),
                         cv2.INTER_LINEAR, borderMode=cv2.BORDER_WRAP)

    def steam(self, t):
        """Alpha of the steam layer in its window (low res). Seen from above, steam lifts toward the lens and is
        carried by the room air toward the upper left; it curls and breaks up."""
        q = self.st_q
        cx, cy, r = MUG[0] / q, MUG[1] / q, MUG[2] / q
        dv = np.float32([-0.55, -0.83])
        x, y = self.st_xx, self.st_yy
        px, py = x - cx, y - cy
        a = px * dv[0] + py * dv[1]                                      # along the drift
        b = -px * dv[1] + py * dv[0]                                     # across it
        env = np.exp(-np.maximum(a, 0) / (2.2 * r)) * np.clip((a + 0.9 * r) / (0.9 * r), 0, 1)
        env *= np.exp(-(b ** 2) / (2 * (0.55 * r + 0.25 * np.maximum(a, 0)) ** 2))
        v = 7.0                                                          # low-res px / s
        wx = 7 * self._wrap_sample(self.st_n2, x * 0.7 + 3.1 * t, y * 0.7 - 1.7 * t)
        wy = 7 * self._wrap_sample(self.st_n2, x * 0.7 + 90 - 1.3 * t, y * 0.7 + 40 + 2.2 * t)
        sx = x - dv[0] * v * t + wx
        sy = y - dv[1] * v * t + wy
        f = 0.65 * self._wrap_sample(self.st_n1, sx, sy) + 0.35 * self._wrap_sample(self.st_n1, sx * 2.1 + 50, sy * 2.1 + 9)
        dens = np.clip(f * 0.9 - 0.15, 0, 1.6) * env
        return np.clip(dens * 0.40, 0, 0.48)

    # ------------------------------------------------------------ handheld operator noise (non-periodic)
    def _init_camera_noise(self):
        rng = np.random.default_rng(77)
        self.nz_rate = 96
        n = int(80 * self.nz_rate)
        tracks = []
        for k in range(6):
            slow = cv2.GaussianBlur(rng.standard_normal((n, 1)).astype(np.float32), (0, 0), 0.9 * self.nz_rate)[:, 0]
            fast = cv2.GaussianBlur(rng.standard_normal((n, 1)).astype(np.float32), (0, 0), 0.16 * self.nz_rate)[:, 0]
            slow /= slow.std()
            fast /= fast.std()
            tracks.append(0.8 * slow + 0.35 * fast)
        self.nz = np.stack(tracks)

    def _noise1d(self, t, k):
        i = t * self.nz_rate
        i0 = int(i)
        u = i - i0
        i0 = min(max(i0, 0), self.nz.shape[1] - 2)
        return float(self.nz[k, i0] * (1 - u) + self.nz[k, i0 + 1] * u)

    def ink_layer(self, strokes):
        cov = np.zeros((self.ink_h, self.ink_w), np.float32)
        for pts in strokes:
            if len(pts) < 2:
                continue
            arr = np.int32([[p[0] * PX_PER_MM * 8, p[1] * PX_PER_MM * 8] for p in pts])
            cv2.polylines(cov, [arr], False, 1.0, thickness=int(0.75 * PX_PER_MM), lineType=cv2.LINE_AA, shift=3)
            # slightly heavier ink where the stroke starts (marker touch-down)
            s = arr[0]
            cv2.circle(cov, (int(s[0]), int(s[1])), int(0.45 * PX_PER_MM * 8), 1.0, -1, cv2.LINE_AA, shift=3)
        cov = cv2.GaussianBlur(cov, (0, 0), 0.6)
        return np.clip(cov, 0, 1) * self.fibre

    def hand_matrix(self, tl, t):
        """Affine plate transform of the hand photo at time t, and the pen lift."""
        # the wrist glides along the line (low-passed pen path); small strokes are made by rotating the hand
        # about the wrist, so the tip lands exactly on the ink head while the hand itself barely moves.
        pos, lift = tl.state(t)
        P = mm_to_plate(pos)
        lag = [tl.state(max(0.0, t - d))[0] for d in (0.0, 0.12, 0.25, 0.4, 0.55, 0.7)]
        ws = (sum(p[0] for p in lag) / len(lag), sum(p[1] for p in lag) / len(lag))
        base = math.radians(PAPER_ANGLE + (ws[0] - 110) * 0.05 + (ws[1] - 150) * 0.015
                            + 0.4 * math.sin(2 * math.pi * 0.21 * t) + 0.25 * self._noise1d(t, 4))   # drift + breathing
        sc = 1.0 + 0.018 * lift
        v0 = self.tip - self.wrist                                               # wrist → tip in the photo

        def rot(v, a):
            return np.float32([v[0] * math.cos(a) - v[1] * math.sin(a), v[0] * math.sin(a) + v[1] * math.cos(a)])
        W = mm_to_plate(ws) - rot(v0, base) * sc                                 # wrist if the tip sat on the smoothed path
        d = P - W
        phi = math.atan2(d[1], d[0]) - math.atan2(v0[1], v0[0])
        k = float(np.clip(np.linalg.norm(d) / (np.linalg.norm(v0) * sc), 0.965, 1.035)) * sc
        R = np.float32([[math.cos(phi), -math.sin(phi)], [math.sin(phi), math.cos(phi)]]) * k
        M = np.zeros((2, 3), np.float32)
        M[:, :2] = R
        M[:, 2] = W - R @ self.wrist
        M[:, 2] += P - (R @ self.tip + M[:, 2])                                  # exact tip contact
        M[:, 2] += np.float32([3.0, -9.0]) * lift          # pen lifts toward the camera: slight up-left drift
        return M, lift

    def frame(self, tl, t, cam):
        ratio = self.light_ratio(t)                          # living window light
        out = self.plate * ratio
        # ink
        cov = self.ink_layer(tl.ink_upto(t))
        warped = cv2.warpPerspective(cov, H_INK, (self.pw, self.ph), flags=cv2.INTER_LINEAR)
        ink = np.float32([0.10, 0.09, 0.09])                  # BGR, near-black marker
        out = out * (1 - warped[..., None] * (1 - ink[None, None, :]) * 0.94)
        # coffee steam over the mug, brighter where it crosses a sun stripe
        x0, y0, x1, y1 = self.st_box
        a = cv2.resize(self.steam(t), (x1 - x0, y1 - y0), interpolation=cv2.INTER_CUBIC)[..., None]
        lit = (0.45 + 0.75 * self.sun_now[y0:y1, x0:x1])[..., None] * ratio[y0:y1, x0:x1]
        col = np.float32([0.90, 0.92, 0.95])[None, None, :] * lit
        out[y0:y1, x0:x1] = out[y0:y1, x0:x1] * (1 - a) + np.clip(col, 0, 1) * a
        # hand, with a 180° shutter: fast pen-up moves are motion-blurred like real 24 fps footage
        M0, lift0 = self.hand_matrix(tl, t)
        Ma, _ = self.hand_matrix(tl, max(0.0, t - 1 / 96))
        Mb, _ = self.hand_matrix(tl, t + 1 / 96)
        travel = float(np.abs(Mb[:, 2] - Ma[:, 2]).max())
        if travel > 4.0 and (tl.moving(t - 1 / 96) or tl.moving(t + 1 / 96)):
            n = int(min(11, 4 + travel // 5))
            samples = [self.hand_matrix(tl, max(0.0, t + (i / (n - 1) - 0.5) / 48)) for i in range(n)]
        else:
            samples = [(M0, lift0)]
        ha = np.zeros((self.ph, self.pw), np.float32)
        hpre = np.zeros((self.ph, self.pw, 3), np.float32)
        sh = np.zeros((self.ph, self.pw), np.float32)
        for M, lift in samples:
            a_ = cv2.warpAffine(self.hand_a, M, (self.pw, self.ph), flags=cv2.INTER_LINEAR)
            rgb = cv2.warpAffine(self.hand_rgb, M, (self.pw, self.ph), flags=cv2.INTER_LINEAR)
            ha += a_
            hpre += rgb * a_[..., None]
            # contact shadow: light from the upper left → shadow falls lower-right, separates with lift
            Ms = M.copy()
            Ms[:, 2] += np.float32([22 + 26 * lift, 30 + 30 * lift])
            sh += cv2.GaussianBlur(cv2.warpAffine(self.hand_a, Ms, (self.pw, self.ph), flags=cv2.INTER_LINEAR),
                                   (0, 0), 14 + 10 * lift)
        ns = len(samples)
        ha /= ns
        sh /= ns
        hrgb = hpre / ns / np.maximum(ha, 1e-4)[..., None]
        out = out * (1 - (0.42 * sh)[..., None] * (0.55 + 0.45 * (1 - cloud(t))))
        # the hand is a few cm above the paper: it receives the same window light/shade, slightly softened
        light = (0.25 + 0.80 * self.illum)[..., None] * ratio
        out = out * (1 - ha[..., None]) + np.clip(hrgb * light, 0, 1) * ha[..., None]
        return self.camera(out, cam, t)

    def camera(self, img, cam, t):
        cx, cy, z = cam
        # handheld operator: smoothed random drift (non-periodic), a little roll and focus-breathing zoom
        amp = (1.78 / z) ** 0.5                              # keep the shake similar on screen in a close-up
        jx = 3.2 * amp * self._noise1d(t, 0)
        jy = 2.8 * amp * self._noise1d(t, 1)
        rot = 0.16 * self._noise1d(t, 2)
        z = z * (1 + 0.004 * self._noise1d(t, 5))
        cw = self.pw / z
        s = OUT_W / cw
        M = cv2.getRotationMatrix2D((cx + jx, cy + jy), rot, s)
        M[0, 2] += OUT_W / 2 - (cx + jx)
        M[1, 2] += OUT_H / 2 - (cy + jy)
        return cv2.warpAffine(img, M, (OUT_W, OUT_H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
