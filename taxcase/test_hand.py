import sys, os, math, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy
from mathutils import Matrix, Vector
import scene as S, hand as H

S.build_all()
L1 = S.Letter("page1", "page1.png", "page1_back.png")
L1.set(6, -172)
h = H.Hand("right")
# relaxed hand resting on paper, fingers slightly curled
h.pose({"index-finger": [0, 12, 18, 10], "middle-finger": [0, 16, 22, 12], "ring-finger": [0, 20, 26, 14],
        "pinky-finger": [0, 24, 28, 14], "thumb": [0, 8, 10]}, spread={"index-finger": -3, "pinky-finger": 5})
# orient: local finger dir -> world +y (away), palm normal -> world -z (palm down)
fdir = (h.rest["middle-finger-tip"] - h.rest["wrist"]).normalized()
pn = h.palm_normal()
side = fdir.cross(pn).normalized(); pn2 = side.cross(fdir).normalized()
Mloc = Matrix((side, fdir, pn2)).transposed()           # columns: local basis
Mw = Matrix((Vector((1,0,0)), Vector((0,1,0)), Vector((0,0,-1)))).transposed()
flip = os.environ.get("FLIP") == "1"
if flip: Mw = Matrix((Vector((-1,0,0)), Vector((0,1,0)), Vector((0,0,1)))).transposed()
R = (Mw @ Mloc.inverted()).to_4x4()
h.root.matrix_world = Matrix.Translation((0.03, -0.12, 0.022)) @ R @ Matrix.Translation(-h.rest["wrist"])
cam = S.bpy.context.scene.camera
cam.location = (0.02, -0.36, 0.30)
S.aim(cam, (0.03, -0.06, 0.0))
cam.data.dof.focus_distance = (Vector((0.03, -0.07, 0.01)) - cam.location).length
S.setup_render(samples=8)
bpy.context.scene.render.resolution_percentage = 50
bpy.context.scene.render.filepath = os.path.join(S.HERE, f"build/test/hand{'_flip' if flip else ''}.png")
t = time.time(); bpy.ops.render.render(write_still=True); print("RENDER_SECONDS", round(time.time()-t,1))
