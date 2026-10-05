"""Timeline, animation and camera for TAX CASE #001 (55 s @ 24 fps = 1320 frames).

Every animated value is computed procedurally here and baked as a keyframe on every frame,
so Cycles gets true motion blur (object, deformation and camera).

Hands are kept just outside frame (insert-shot grammar); see PRODUCTION-BIBLE D7.
Shot list (times in seconds):
  1  0.00- 2.25  DROP     envelope dropped onto the desk, 35 mm, low angle
  2  2.25- 4.50  SLIT     85 mm slider tracks the opener tip cutting the top edge
  3  4.50- 7.00  EXTRACT  folded letter pulled out past the top of frame, 50 mm
  4  7.00-23.00  NOTICE   long take: top panel falls open -> push to $2,460 -> travel over the notice
  5 23.00-32.00  UNFOLD   inner panel falls open -> WHAT CHANGED rows
  6 32.00-40.00  WAIT     wide, locked off, everything still
  7 40.00-49.00  DETAILS  same set-up starts moving: slide to page 2, check five fields
  8 49.00-55.00  CASE     the closed case file, pull back, end frame
"""
import json
import math
import os
import random

import bpy
from mathutils import Euler, Matrix, Vector

import scene as S

FPS = 24
DUR = 55.0
NF = int(DUR * FPS)

SHOTS = [
    # id, start, end, lens, fstop
    ("drop", 0.00, 2.25, 35, 5.6),
    ("slit", 2.25, 4.50, 85, 11.0),
    ("extract", 4.50, 7.00, 50, 5.6),
    ("notice", 7.00, 23.00, 50, 4.0),
    ("unfold", 23.00, 32.00, 35, 4.0),
    ("wait", 32.00, 40.00, 35, 5.6),
    ("details", 40.00, 49.00, 35, 5.6),
    ("case", 49.00, 55.00, 35, 4.0),
]


def shot_at(t):
    for s in SHOTS:
        if s[1] <= t < s[2]:
            return s
    return SHOTS[-1]


# --------------------------------------------------------------------------- easing / physics helpers
def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))


def smooth(x):
    """Smootherstep: zero velocity and acceleration at both ends (dolly start/stop)."""
    x = clamp(x)
    return x * x * x * (x * (6 * x - 15) + 10)


def ramp(t, t0, t1):
    return smooth((t - t0) / (t1 - t0)) if t1 > t0 else float(t >= t1)


def lerp(a, b, x):
    return a + (b - a) * x


def vlerp(a, b, x):
    return Vector(a).lerp(Vector(b), x)


def keys_interp(keys, t):
    """keys: [(time, value_tuple)], eased segments between consecutive keys."""
    if t <= keys[0][0]:
        return Vector(keys[0][1])
    for (t0, a), (t1, b) in zip(keys, keys[1:]):
        if t <= t1:
            return vlerp(a, b, ramp(t, t0, t1))
    return Vector(keys[-1][1])


def hinge_fall(theta0, omega0, length, rest, t_total, drag=28.0, restitution=0.18, dt=1 / 2400):
    """Paper panel hinged on the desk, falling flat under gravity with air drag.
    theta (rad) measured from the desk plane; lands at `rest` (crease memory) with a small bounce.
    Rigid plate about an edge: theta'' = -(3 g / 2 L) cos(theta) - drag * w|w|."""
    g = 9.81
    th, w = theta0, omega0
    out = []
    t = 0.0
    while t <= t_total + dt:
        out.append((t, th))
        a = -(3 * g / (2 * length)) * math.cos(th) - drag * w * abs(w)
        w += a * dt
        th += w * dt
        if th < rest:
            th = rest
            w = -w * restitution
            if abs(w) < 0.05:
                w = 0.0
        t += dt
    return out


def sample(series, t):
    if t <= series[0][0]:
        return series[0][1]
    if t >= series[-1][0]:
        return series[-1][1]
    dt = series[1][0] - series[0][0]
    i = int(t / dt)
    i = min(i, len(series) - 2)
    a, b = series[i], series[i + 1]
    return lerp(a[1], b[1], (t - a[0]) / dt)


class Operator:
    """Camera-operator micro motion: sum of incommensurate low-frequency sines (breathing, sway),
    scaled per support (handheld > slider > tripod). Deterministic."""

    def __init__(self, seed):
        r = random.Random(seed)
        self.terms = [(r.uniform(0.17, 1.6), r.uniform(0, 2 * math.pi), r.uniform(0.5, 1.0)) for _ in range(12)]

    def __call__(self, t, k):
        v = 0.0
        for i, (f, ph, a) in enumerate(self.terms[k * 4:(k + 1) * 4]):
            v += a * math.sin(2 * math.pi * f * t + ph)
        return v / 2.0


OP = [Operator(11), Operator(23), Operator(37)]


# --------------------------------------------------------------------------- layout (world, desk z = 0)
ENV_LAND = Vector((-0.020, 0.060, 0.0))
ENV_LAND_ROT = math.radians(-6.0)
P1_POS = Vector((-0.015, 0.020, 0.0))
P1_ROT = math.radians(-2.5)
P2_POS = Vector((0.215, 0.050, 0.0))
P2_ROT = math.radians(4.0)
ENV_LATER = Vector((-0.205, 0.255, 0.0))
ENV_LATER_ROT = math.radians(11.0)
FOLDER_POS = Vector((0.0, 0.035, 0.0))
FOLDER_ROT = math.radians(3.0)


class Film:
    def __init__(self):
        self.cam = S.build_all()
        self.env, self.slit = S.build_envelope()
        self.packet = S.build_packet()
        self.opener = S.build_opener()
        self.p1 = S.Letter("page1", "page1.png", "page1_back.png")
        self.p2 = S.Letter("page2", "page2.png", "page2_back.png")
        self.folder = S.build_folder()
        self.pen = bpy.data.objects["pen"]
        self.pen.location = (0.165, -0.125, 0.0045)
        self.pen.rotation_euler = (0, math.radians(90), math.radians(-28))
        # physics pre-computation
        H3 = S.LETTER_H / 3
        self.fall_T = hinge_fall(math.radians(70), -1.4, H3, math.radians(4), 2.0)
        self.fall_B = hinge_fall(math.radians(70), -1.4, H3, math.radians(4), 2.0)
        with open(os.path.join(S.TEX, "anchors.json")) as f:
            self.anchors = json.load(f)
        self.track = {}

    # ----------------------------------------------------------------- object states
    def env_state(self, t):
        """Envelope: dropped from ~11 cm with a little forward toss, lands leading edge first,
        slaps flat, slides ~9 mm, settles; small flex ring-down."""
        if t >= 7.0:
            return ENV_LATER, ENV_LATER_ROT, 0.0, 0.0, 0.25
        t_land = 0.42
        h0 = 0.11
        g = 9.81
        flex = 0.0
        tilt = 0.0
        if t < t_land:
            # free fall with mild drag (paper): z(t) from h0, fitted to land at t_land; in frame from frame 1
            u = (t + 0.10) / (t_land + 0.10)
            z = h0 * (1 - u * u)
            pos = ENV_LAND + Vector((0.0, -0.009 - 0.05 * (1 - u), z))
            rot = ENV_LAND_ROT + math.radians(4) * (1 - u)
            tilt = math.radians(7) * (1 - u) ** 1.5
        else:
            s = t - t_land
            # slide: v0 = 0.12 m/s, friction decel 1.6 m/s^2 -> 9 mm over ~0.075 s... with paper on wood, longer cushion
            v0, dec = 0.12, 1.6
            ts = v0 / dec
            d = v0 * min(s, ts) - 0.5 * dec * min(s, ts) ** 2
            pos = ENV_LAND + Vector((0.0, -0.009 + d, 0.0))
            # bounce: 1.4 mm, then rest
            if s < 0.11:
                pos.z = 0.0014 * math.sin(math.pi * s / 0.11)
            rot = ENV_LAND_ROT
            flex = math.radians(5.0) * math.exp(-s * 14) * math.cos(2 * math.pi * 11 * s)
        # extraction drag: friction from the letter pulls the envelope 4 mm and 0.6 deg
        drag = ramp(t, 5.0, 6.4)
        pos = pos + Vector((0.0, 0.004 * drag, 0.0))
        rot = rot + math.radians(0.6) * drag
        bulge = 1.0 - 0.75 * ramp(t, 5.0, 6.6)
        slit = ramp(t, 2.6, 4.25) if t < 7.0 else 1.0
        return pos, rot, tilt, flex, slit

    def apply(self, t):
        sc = bpy.context.scene
        sid = shot_at(t)[0]
        # --- envelope
        pos, rot, tilt, flex, slit = self.env_state(t)
        self.env.location = pos
        self.env.rotation_euler = (tilt, 0.0, rot)
        self.slit.scale = (max(slit, 1e-4), 1, 1)
        # --- packet (inside the envelope, then pulled out past the top of frame)
        if 4.5 <= t < 7.0:
            x_ = clamp((t - 4.50) / 2.2)
            u = 0.12 + 0.88 * (1 - (1 - x_) ** 2.2)  # already being pulled at the cut, decelerates as it clears
            local = Vector((0.0, -0.002 + 0.16 * u, S.PAPER_T * 3 + 0.0009 + 0.014 * u * u))
            self.packet.location = pos + Matrix.Rotation(rot, 3, "Z") @ local
            self.packet.rotation_euler = (math.radians(7) * min(1, u * 3), 0.0, rot)
            self.packet.hide_render = False
            bpy.context.view_layer.update()
            self.packet_edge = self.packet.matrix_world @ Vector((-0.03, S.LETTER_H / 6, 0.0))
        else:
            self.packet_edge = None
            self.packet.location = (0, 0, -1)
            self.packet.hide_render = True
        # --- opener: only in the slit shot; blade tip travels along the top edge inside the envelope
        if 2.25 <= t < 4.5:
            u = slit
            ins = ramp(t, 2.25, 2.62)
            edge_l = Vector((-S.ENV_W / 2 + 0.004, S.ENV_H / 2 + 0.0009, 0.0011))
            edge_r = Vector((S.ENV_W / 2 - 0.004, S.ENV_H / 2 + 0.0009, 0.0011))
            tip_local = edge_l.lerp(edge_r, u) + Vector((-0.03 * (1 - ins), 0.004 * (1 - ins), 0.006 * (1 - ins)))
            R = Matrix.Rotation(rot, 3, "Z")
            tip = pos + R @ tip_local
            # blade points along +x (tip at x = 0.12 in opener space), handle trails to the left, raised 9 deg
            yaw = rot + math.radians(-3)
            M = Matrix.Translation(tip) @ Matrix.Rotation(yaw, 4, "Z") @ Matrix.Rotation(math.radians(-6), 4, "Y") \
                @ Matrix.Rotation(math.radians(80), 4, "X") \
                @ Matrix.Translation((-0.12, 0, 0))
            self.opener.matrix_world = M
            self.opener_tip = tip
        else:
            self.opener.matrix_world = Matrix.Translation((0, 0, -2))
            self.opener_tip = None
        for c in self.opener.children:
            c.hide_render = not (2.25 <= t < 4.5)
        # --- page 1
        show_pages = 7.0 <= t < 49.0
        self.p1.root.location = P1_POS if show_pages else Vector((0, 0, -3))
        self.p1.root.rotation_euler = (0, 0, P1_ROT)
        tT = math.degrees(sample(self.fall_T, t - 7.0)) if t >= 7.0 else 70.0
        if t < 23.0:
            tB = -176.0
        else:
            tB = -math.degrees(sample(self.fall_B, t - 23.0))
        self.p1.set(tT, tB)
        # --- page 2 lies to the right (separated off-screen during the cut at 7 s), creases remembered
        self.p2.root.location = P2_POS if show_pages else Vector((0, 0, -3))
        self.p2.root.rotation_euler = (0, 0, P2_ROT)
        self.p2.set(4.0, -4.0)
        # --- envelope after the cut (moved aside) is hidden in the case shot (it is inside the folder)
        if t >= 49.0:
            self.env.location = (0, 0, -3)
        # --- folder
        self.folder.location = FOLDER_POS if t >= 49.0 else Vector((0, 0, -3))
        self.folder.rotation_euler = (0, 0, FOLDER_ROT)
        for o in [self.folder] + list(self.folder.children_recursive):
            o.hide_render = t < 49.0
        for o in [self.p1.root, self.p2.root]:
            for c in o.children_recursive:
                c.hide_render = not show_pages
        # envelope flex (bend modifier) and bulge
        self.set_env_shape(flex, bulge=1.0 - 0.75 * ramp(t, 5.0, 6.6) if t < 7.0 else 0.25)
        bpy.context.view_layer.update()
        self.camera(t)

    def set_env_shape(self, flex, bulge):
        self.env["bulge"] = bulge
        # bulge: scale the pillow in Z through a shape key
        me = self.env.data
        if me.shape_keys is None:
            self.env.shape_key_add(name="Basis")
            flat = self.env.shape_key_add(name="flat")
            for v in flat.data:
                v.co.z = S.PAPER_T * 2
            fx = self.env.shape_key_add(name="flex")
            fx.slider_min = -1.0
            for v in fx.data:
                v.co.z += 0.006 * (v.co.x / (S.ENV_W / 2)) ** 2   # ends lift 6 mm at value 1
        me.shape_keys.key_blocks["flat"].value = 1.0 - bulge
        me.shape_keys.key_blocks["flex"].value = max(-1.0, min(1.0, flex / math.radians(5.0) * 0.5))

    # ----------------------------------------------------------------- page-space helpers
    def page_point(self, letter, px, py, lift=0.00015):
        """World position of a pixel (px, py) of a page texture (2550 x 3300, origin top-left)."""
        fx, fy = px / 2550.0, py / 3300.0
        W, H = S.LETTER_W, S.LETTER_H
        x = (fx - 0.5) * W
        if fy < 1 / 3:
            ob, y = letter.T, (1 / 3 - fy) * H
        elif fy < 2 / 3:
            ob, y = letter.M, (0.5 - fy) * H
        else:
            ob, y = letter.B, (2 / 3 - fy) * H
        bpy.context.view_layer.update()
        return ob.matrix_world @ Vector((x, y, lift))

    def anchor(self, letter, name, where="center"):
        x0, y0, x1, y1 = self.anchors[name]
        px = {"center": (x0 + x1) / 2, "left": x0, "right": x1}[where]
        return self.page_point(letter, px, (y0 + y1) / 2)

    # ----------------------------------------------------------------- camera
    def camera(self, t):
        sid, t0, t1, lens, fstop = shot_at(t)
        cam = self.cam
        cam.data.lens = lens
        cam.data.dof.aperture_fstop = fstop
        A = lambda n, w="center": self.anchor(self.p1, n, w)
        B = lambda n, w="center": self.anchor(self.p2, n, w)
        shake = 1.0     # handheld scale (1 = gentle handheld)
        if sid == "drop":
            eye = keys_interp([(0.0, (-0.060, -0.140, 0.215)), (2.25, (-0.058, -0.122, 0.200))], t)
            look = Vector((-0.072, 0.072, 0.0))
            focus = ENV_LAND + Vector((-0.06, 0.03, 0.001))
            shake = 0.8
        elif sid == "slit":
            tip = self.opener_tip or (self.env.location + Vector((0, S.ENV_H / 2, 0)))
            # slider rides parallel to the envelope edge, lags the tip slightly (operator follows)
            follow = tip + Vector((0.009, -0.004, 0.0))
            eye = follow + Vector((0.006, -0.150, 0.125))
            look = follow + Vector((0.0, -0.004, 0.0))
            focus = tip
            shake = 0.35
        elif sid == "extract":
            eye = keys_interp([(4.5, (-0.035, -0.055, 0.235)), (7.0, (-0.035, -0.040, 0.245))], t)
            look = keys_interp([(4.5, (-0.035, 0.150, 0.0)), (7.0, (-0.035, 0.175, 0.0))], t)
            focus = self.packet_edge if self.packet_edge is not None else ENV_LAND + Vector((-0.015, S.ENV_H / 2 + 0.01, 0.004))
            shake = 0.7
        elif sid == "notice":
            hdr, amt = A("header"), A("p1_amount")
            yr, ref, see = A("p1_tax_year", "right"), A("p1_notice_date", "right"), self.page_point(self.p1, 2000, 790)
            fold = self.page_point(self.p1, 1275, 1150)
            # camera moves: settle after the fall, push to the amount, then travel over the notice
            k_look = [(7.0, hdr + Vector((0.0, -0.035, 0))), (8.6, hdr + Vector((0.0, -0.03, 0))),
                      (11.0, amt), (14.4, amt + Vector((0.004, 0.0, 0))),
                      (15.7, ref + Vector((-0.02, 0.0, 0))), (18.4, ref + Vector((-0.02, -0.004, 0))),
                      (20.6, see), (22.0, see), (23.0, fold)]
            k_dist = [(7.0, 0.36), (8.6, 0.355), (11.0, 0.235), (14.4, 0.225), (15.7, 0.215), (20.6, 0.22),
                      (23.0, 0.25)]
            look = keys_interp(k_look, t)
            dist = keys_interp([(a, (b, 0, 0)) for a, b in k_dist], t).x
            view_dir = Vector((0.03, 0.62, -0.78)).normalized()
            eye = look - view_dir * dist
            k_focus = [(7.0, hdr), (9.4, hdr), (10.2, amt), (14.4, amt), (15.5, yr), (18.6, yr), (19.6, see),
                       (22.2, see), (23.0, fold)]
            focus = keys_interp(k_focus, t)
            shake = 0.6
        elif sid == "unfold":
            mid = self.page_point(self.p1, 1275, 2200)
            wc, ra, rr, rd = A("what_changed", "left"), A("row_amount_value"), A("row_reason_value"), A("row_deadline_value")
            k_look = [(23.0, mid + Vector((0.0, 0.015, 0))), (24.6, mid + Vector((0.0, 0.03, 0))),
                      (26.0, wc + Vector((0.058, -0.014, 0))), (32.0, wc + Vector((0.060, -0.028, 0)))]
            look = keys_interp(k_look, t)
            k_off = [(23.0, (0.0, -0.17, 0.25)), (24.6, (0.0, -0.165, 0.245)), (26.0, (0.0, -0.125, 0.26)),
                     (32.0, (0.0, -0.118, 0.245))]
            eye = look + keys_interp(k_off, t)
            k_focus = [(23.0, mid), (24.8, mid), (25.8, A("what_changed")), (26.6, ra), (27.6, ra), (28.2, rr),
                       (29.4, rr), (30.0, rd)]
            focus = keys_interp(k_focus, t)
            shake = 0.6
        elif sid == "wait":
            look = Vector((0.070, 0.050, 0.0))
            eye = look + Vector((0.0, -0.22, 0.60))
            focus = look
            shake = 0.0
        elif sid == "details":
            look0 = Vector((0.070, 0.050, 0.0))
            eye0 = look0 + Vector((0.0, -0.22, 0.60))
            n_, ty, am, re, de = (B("p2_name"), B("p2_tax_year"), B("p2_amount"), B("p2_reason"), B("p2_deadline"))
            am_l, de_l = B("p2_amount", "left"), B("p2_deadline", "left")
            k_look = [(40.0, look0), (42.6, ty + Vector((0.035, 0.0, 0))), (44.0, ty + Vector((0.035, -0.004, 0))),
                      (46.0, am_l + Vector((0.045, -0.012, 0))), (49.0, de_l + Vector((0.045, 0.012, 0)))]
            look = keys_interp(k_look, t)
            k_eye = [(40.0, eye0), (42.6, ty + Vector((0.02, -0.17, 0.25))), (44.0, ty + Vector((0.02, -0.17, 0.245))),
                     (46.0, am_l + Vector((0.035, -0.17, 0.25))), (49.0, de_l + Vector((0.035, -0.15, 0.25)))]
            eye = keys_interp(k_eye, t)
            k_focus = [(40.0, look0), (42.0, n_), (43.6, n_), (44.4, ty), (45.2, am), (46.6, am), (47.2, re),
                       (48.2, de)]
            focus = keys_interp(k_focus, t)
            shake = 0.3 * ramp(t, 40.0, 41.5)
        else:  # case
            lab = self.folder.matrix_world @ Vector((-0.045, 0.300 / 2 - 0.004 + 0.0095, 0.005))
            u = ramp(t, 49.0, 54.2)
            look = lab.lerp(self.folder.location + Vector((0.0, 0.06, 0.0)), u)
            eye = look + Vector((0.0, -lerp(0.07, 0.30, u), lerp(0.10, 0.72, u)))
            focus = lab.lerp(self.folder.location, u * 0.6)
            shake = 0.5 * (1 - u) + 0.15
        # operator micro motion (rotation in degrees, translation in metres)
        rx = math.radians(0.10 * shake * OP[0](t, 0))
        rz = math.radians(0.12 * shake * OP[1](t, 1))
        ry = math.radians(0.05 * shake * OP[2](t, 2))
        cam.location = eye + Vector((OP[2](t, 0), 0.0, OP[0](t, 2))) * 0.0006 * shake
        d = look - cam.location
        base = d.to_track_quat("-Z", "Y").to_matrix()
        cam.matrix_world = Matrix.Translation(cam.location) @ (base @ Euler((rx, ry, rz)).to_matrix()).to_4x4()
        cam.data.dof.focus_distance = (focus - cam.location).dot(-cam.matrix_world.col[2].xyz.normalized())

    # ----------------------------------------------------------------- baking and tracking
    def bake(self, frames):
        """Evaluate every frame, insert keys on all animated data, record overlay tracks."""
        sc = bpy.context.scene
        animated = [self.env, self.slit, self.packet, self.opener, self.cam, self.p1.root, self.p1.T_hinge,
                    self.p1.B_hinge, self.p2.root, self.folder]
        for f in frames:
            t = (f - 1) / FPS
            self.apply(t)
            for o in animated:
                o.keyframe_insert("location", frame=f)
                o.keyframe_insert("rotation_euler", frame=f)
            self.slit.keyframe_insert("scale", frame=f)
            self.cam.data.keyframe_insert("lens", frame=f)
            self.cam.data.dof.keyframe_insert("focus_distance", frame=f)
            self.cam.data.dof.keyframe_insert("aperture_fstop", frame=f)
            self.env.data.shape_keys.key_blocks["flex"].keyframe_insert("value", frame=f)
            self.env.data.shape_keys.key_blocks["flat"].keyframe_insert("value", frame=f)
            for o in bpy.data.objects:
                if o.type == "MESH":
                    o.keyframe_insert("hide_render", frame=f)
            self.record(f, t)
        cut_frames = [int(round(sh[1] * FPS)) + 1 for sh in SHOTS[1:]]
        for cf in cut_frames:
            for f_eval, f_key in ((cf, cf - 0.30), (cf - 1, cf - 0.70)):
                self.apply((f_eval - 1) / FPS)
                for o in animated:
                    o.keyframe_insert("location", frame=f_key)
                    o.keyframe_insert("rotation_euler", frame=f_key)
                self.slit.keyframe_insert("scale", frame=f_key)
                self.cam.data.keyframe_insert("lens", frame=f_key)
                self.cam.data.dof.keyframe_insert("focus_distance", frame=f_key)
                self.cam.data.dof.keyframe_insert("aperture_fstop", frame=f_key)
                self.env.data.shape_keys.key_blocks["flex"].keyframe_insert("value", frame=f_key)
                self.env.data.shape_keys.key_blocks["flat"].keyframe_insert("value", frame=f_key)
        # constant interpolation for visibility; linear for everything else (every frame is keyed)
        for o in bpy.data.objects:
            ad = o.animation_data
            if ad and ad.action:
                for fc in ad.action.fcurves:
                    for kp in fc.keyframe_points:
                        kp.interpolation = "CONSTANT" if fc.data_path == "hide_render" else "LINEAR"

    def project(self, p):
        from bpy_extras.object_utils import world_to_camera_view
        sc = bpy.context.scene
        co = world_to_camera_view(sc, self.cam, p)
        return [co.x * sc.render.resolution_x, (1 - co.y) * sc.render.resolution_y]

    def record(self, f, t):
        """Screen positions (1080x1920) of printed lines, for overlays that sit on the paper."""
        bpy.context.view_layer.update()
        names = ["p1_notice_date", "p1_tax_year", "p1_reference", "p1_amount", "row_amount", "row_reason",
                 "row_deadline", "row_amount_value", "row_reason_value", "row_deadline_value", "what_changed"]
        tr = {}
        if 7.0 <= t < 49.0:
            for n in names:
                x0, y0, x1, y1 = self.anchors[n]
                tr[n] = [self.project(self.page_point(self.p1, x0, y1 + 14)),
                         self.project(self.page_point(self.p1, x1, y1 + 14))]
            see = [self.project(self.page_point(self.p1, 1795, 872)), self.project(self.page_point(self.p1, 2285, 872))]
            tr["see_inside"] = see
            for n in ["p2_name", "p2_tax_year", "p2_amount", "p2_reason", "p2_deadline"]:
                x0, y0, x1, y1 = self.anchors[n]
                tr[n] = [self.project(self.page_point(self.p2, x0, (y0 + y1) / 2)),
                         self.project(self.page_point(self.p2, x1, (y0 + y1) / 2))]
        self.track[f] = tr

    def save_tracks(self, path):
        with open(path, "w") as f:
            json.dump(self.track, f)
