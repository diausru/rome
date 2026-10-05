import sys, time, math, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy
from mathutils import Vector
import scene as S

samples = int(sys.argv[1]) if len(sys.argv) > 1 else 32
scale = int(sys.argv[2]) if len(sys.argv) > 2 else 50
cam = S.build_all()
L1 = S.Letter("page1", "page1.png", "page1_back.png")
L1.root.location = (-0.01, 0.0, 0.0)
L1.root.rotation_euler = (0, 0, math.radians(-2.5))
L1.set(6, -172)
L2 = S.Letter("page2", "page2.png", "page2_back.png")
L2.root.location = (0.205, 0.05, 0.0)
L2.root.rotation_euler = (0, 0, math.radians(4))
L2.set(5, -5)
env, slit = S.build_envelope()
env.location = (-0.17, 0.25, 0)
env.rotation_euler = (0, 0, math.radians(9))
slit.scale = (1, 1, 1)
# camera: seated eye position, 50mm, looking at the amount
cam.location = (-0.02, -0.33, 0.36)
S.aim(cam, (-0.01, 0.1, 0.0))
cam.data.dof.focus_distance = (Vector((-0.01, 0.1, 0.0)) - cam.location).length
S.setup_render(samples=samples)
bpy.context.scene.render.resolution_percentage = scale
bpy.context.scene.render.filepath = os.path.join(S.HERE, "build/test/still.png")
t = time.time()
bpy.ops.render.render(write_still=True)
print("RENDER_SECONDS", round(time.time() - t, 1))
