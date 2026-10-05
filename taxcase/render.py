"""Render driver for TAX CASE #001.
  python3 render.py --stills 0.5,3,8 [--scale 50 --samples 8]      -> build/stills/<tag>_t<sec>.png
  python3 render.py --frames 1-1320 [--step 1] --tag preview        -> build/frames_<tag>/f0001.png ...
Frames inside the locked-off WAIT shot are identical, so only its first frame is rendered and reused.
"""
import argparse, os, shutil, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy
import scene as S
import shots as SH

ap = argparse.ArgumentParser()
ap.add_argument("--stills", default="")
ap.add_argument("--frames", default="")
ap.add_argument("--step", type=int, default=1)
ap.add_argument("--scale", type=int, default=100)
ap.add_argument("--samples", type=int, default=6)
ap.add_argument("--tag", default="final")
a = ap.parse_args(sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:])

film = SH.Film()
S.setup_render(samples=a.samples)
sc = bpy.context.scene
sc.render.resolution_percentage = a.scale
sc.render.use_persistent_data = True
sc.frame_start, sc.frame_end = 1, SH.NF
t0 = time.time()
film.bake(range(1, SH.NF + 1))
film.save_tracks(os.path.join(S.HERE, "build", "tracks.json"))
print("BAKED", round(time.time() - t0, 1), "s", flush=True)

def render_frame(f, path):
    sc.frame_set(f)
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)

if a.stills:
    out = os.path.join(S.HERE, "build", "stills"); os.makedirs(out, exist_ok=True)
    for s in a.stills.split(","):
        f = int(round(float(s) * SH.FPS)) + 1
        t = time.time(); render_frame(f, os.path.join(out, f"{a.tag}_t{float(s):05.2f}.png"))
        print("STILL", s, round(time.time() - t, 1), flush=True)
if a.frames:
    lo, hi = map(int, a.frames.split("-"))
    out = os.path.join(S.HERE, "build", f"frames_{a.tag}"); os.makedirs(out, exist_ok=True)
    wait_first = int(32.0 * SH.FPS) + 1
    wait_last = int(40.0 * SH.FPS)
    for f in range(lo, hi + 1, a.step):
        p = os.path.join(out, f"f{f:04d}.png")
        if os.path.exists(p):
            continue
        if wait_first < f <= wait_last:
            src = os.path.join(out, f"f{wait_first:04d}.png")
            if not os.path.exists(src):
                render_frame(wait_first, src)
            shutil.copy(src, p); continue
        t = time.time(); render_frame(f, p)
        print("FRAME", f, round(time.time() - t, 1), flush=True)
