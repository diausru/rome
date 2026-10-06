"""Realistic handwritten explainer engine (Tax Secrets Canada, HANDWRITTEN mode).

Plate:  a still photograph of the desk with a blank sheet (assets/plate_b.png, Higgsfield GPT Image 2.5, D2 still plate).
Hand:   a still photograph of a hand holding a marker, matted (assets/hand_a_cut.png). Never deformed: it is moved
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
HAND_TIP = np.float32([793, 1200])    # pen tip in assets/hand_a_cut.png
HAND_SCALE = 0.70                     # hand photo px/mm (≈6.5) → plate px/mm (≈4.55)


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
        hand = cv2.imread(os.path.join(HERE, "assets", "hand_a_cut.png"), cv2.IMREAD_UNCHANGED)
        # extend the sleeve below the photo's bottom edge so the arm always leaves the frame (rows repeated with
        # the arm's slant: the sleeve runs down-right at about 2 px per row near the bottom)
        ext = 1400
        last = hand[-6:].copy()
        pad = np.zeros((ext, hand.shape[1], 4), hand.dtype)
        for i in range(ext):
            shift = int(i * 0.18)
            row = last[i % 6]
            pad[i, shift:] = row[:hand.shape[1] - shift] if shift else row
        hand = np.concatenate([hand, pad], 0)
        hand = cv2.resize(hand, None, fx=HAND_SCALE, fy=HAND_SCALE, interpolation=cv2.INTER_AREA)
        self.hand_rgb = hand[..., :3].astype(np.float32) / 255.0
        self.hand_a = hand[..., 3].astype(np.float32) / 255.0
        self.tip = HAND_TIP * HAND_SCALE
        # light the hand like the plate: the plate is warmer and slightly darker than the hand photo
        self.hand_rgb = np.clip(self.hand_rgb * np.float32([0.93, 0.97, 1.03])[None, None, :] * 0.97, 0, 1)
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

    def frame(self, tl, t, cam):
        out = self.plate.copy()
        # ink
        cov = self.ink_layer(tl.ink_upto(t))
        warped = cv2.warpPerspective(cov, H_INK, (self.pw, self.ph), flags=cv2.INTER_LINEAR)
        ink = np.float32([0.10, 0.09, 0.09])                  # BGR, near-black marker
        out = out * (1 - warped[..., None] * (1 - ink[None, None, :]) * 0.94)
        # hand
        pos, lift = tl.state(t)
        tip_plate = mm_to_plate(pos)
        ang = PAPER_ANGLE + (pos[0] - 120) * 0.035 + (pos[1] - 150) * 0.012   # wrist pivot
        scale = 1.0 + 0.018 * lift
        M = cv2.getRotationMatrix2D((float(self.tip[0]), float(self.tip[1])), -ang, scale)
        M[:, 2] += tip_plate - self.tip
        lift_px = np.float32([3.0, -9.0]) * lift            # pen lifts toward the camera: slight up-left drift
        M[:, 2] += lift_px
        ha = cv2.warpAffine(self.hand_a, M, (self.pw, self.ph), flags=cv2.INTER_LINEAR)
        hrgb = cv2.warpAffine(self.hand_rgb, M, (self.pw, self.ph), flags=cv2.INTER_LINEAR)
        # contact shadow: light from the upper left → shadow falls lower-right, separates with lift
        off = np.float32([22 + 26 * lift, 30 + 30 * lift])
        Ms = M.copy()
        Ms[:, 2] += off
        sh = cv2.warpAffine(self.hand_a, Ms, (self.pw, self.ph), flags=cv2.INTER_LINEAR)
        sh = cv2.GaussianBlur(sh, (0, 0), 14 + 10 * lift)
        out = out * (1 - 0.42 * sh[..., None])
        # the hand is a few cm above the paper: it receives the same window light/shade, slightly softened
        light = (0.25 + 0.80 * self.illum)[..., None]
        out = out * (1 - ha[..., None]) + np.clip(hrgb * light, 0, 1) * ha[..., None]
        # camera
        return self.camera(out, cam, t)

    def camera(self, img, cam, t):
        cx, cy, z = cam
        # operator micro-motion
        jx = 2.2 * math.sin(2 * math.pi * 0.31 * t + 0.4) + 1.3 * math.sin(2 * math.pi * 0.77 * t + 1.9)
        jy = 1.8 * math.sin(2 * math.pi * 0.23 * t + 2.2) + 1.1 * math.sin(2 * math.pi * 0.91 * t + 0.3)
        rot = 0.12 * math.sin(2 * math.pi * 0.17 * t + 1.1)
        cw = self.pw / z
        s = OUT_W / cw
        M = cv2.getRotationMatrix2D((cx + jx, cy + jy), rot, s)
        M[0, 2] += OUT_W / 2 - (cx + jx)
        M[1, 2] += OUT_H / 2 - (cy + jy)
        return cv2.warpAffine(img, M, (OUT_W, OUT_H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
