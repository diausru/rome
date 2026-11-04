"""TAX SECRETS CANADA — 3D mascot narrator (procedural, Blender 4.2, no AI).
White clay figure, red cap with white front panel + red maple leaf, red knitted scarf with white maple leaf.
Usage: blender -b -P mascot.py -- <out_dir> <action> <frames> [res_x res_y]
actions: run_in (runs in from the right and stops), talk (explains with both hands), point (points to screen-right), wave"""
import bpy, math, sys, os
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = argv[0] if argv else '/tmp/mascot'; ACTION = argv[1] if len(argv) > 1 else 'talk'; NF = int(argv[2]) if len(argv) > 2 else 60
RX, RY = (int(argv[3]), int(argv[4])) if len(argv) > 4 else (900, 1080)

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene

def mat(name, rgb, rough=0.5, sss=0.0, sheen=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*rgb, 1); b.inputs['Roughness'].default_value = rough
    b.inputs['Subsurface Weight'].default_value = sss; b.inputs['Subsurface Radius'].default_value = (0.3, 0.2, 0.2)
    b.inputs['Sheen Weight'].default_value = sheen
    return m
def srgb(h):
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)
WHITE = mat('clay', (0.86, 0.86, 0.85), 0.42, 0.25)
RED = mat('knit', srgb('D71920'), 0.85, 0.0, 0.15)
CAPRED = mat('cap', srgb('D71920'), 0.55)
CAPW = mat('capw', (0.92, 0.92, 0.90), 0.6)
BLACK = mat('eye', (0.01, 0.01, 0.012), 0.08)
SPEC = mat('spec', (1, 1, 1), 0.2); SPEC.node_tree.nodes['Principled BSDF'].inputs['Emission Color'].default_value = (1, 1, 1, 1); SPEC.node_tree.nodes['Principled BSDF'].inputs['Emission Strength'].default_value = 3
BROW = mat('brow', (0.03, 0.03, 0.03), 0.6)

def smooth(o, lv=2):
    m = o.modifiers.new('s', 'SUBSURF'); m.levels = lv; m.render_levels = lv
    for p in o.data.polygons: p.use_smooth = True
    return o
def add(fn, name, m, parent=None, **kw):
    fn(**kw); o = bpy.context.active_object; o.name = name; o.data.materials.append(m)
    if parent: o.parent = parent
    return o
def empty(name, loc, parent=None):
    e = bpy.data.objects.new(name, None); bpy.context.collection.objects.link(e); e.location = loc
    if parent: e.parent = parent
    return e
def capsule(name, r, length, m, parent, loc=(0, 0, 0)):
    o = add(bpy.ops.mesh.primitive_uv_sphere_add, name, m, None, radius=1, segments=24, ring_count=16)
    o.scale = (r, r, length / 2); o.location = loc; o.parent = parent; smooth(o, 1); return o

def maple(name, m, parent, size, loc, rot):
    """flat maple leaf (11-point outline + stem), extruded slightly"""
    pts = [(0, 1.0), (0.12, 0.62), (0.32, 0.76), (0.28, 0.42), (0.62, 0.56), (0.55, 0.36), (0.78, 0.28), (0.42, 0.05), (0.48, -0.12), (0.06, -0.08), (0.05, -0.45),
           (-0.05, -0.45), (-0.06, -0.08), (-0.48, -0.12), (-0.42, 0.05), (-0.78, 0.28), (-0.55, 0.36), (-0.62, 0.56), (-0.28, 0.42), (-0.32, 0.76), (-0.12, 0.62)]
    me = bpy.data.meshes.new(name); me.from_pydata([(x * size, 0, y * size) for x, y in pts], [], [list(range(len(pts)))]); me.update()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o); o.data.materials.append(m)
    o.parent = parent; o.location = loc; o.rotation_euler = rot
    s = o.modifiers.new('t', 'SOLIDIFY'); s.thickness = size * 0.06
    return o

# ---------- rig (empties) ----------
root = empty('root', (0, 0, 0))
hips = empty('hips', (0, 0, 0.62), root)
torso = capsule('torso', 0.20, 0.62, WHITE, hips, (0, 0, 0.26)); torso.scale = (0.25, 0.21, 0.36)
neck = empty('neck', (0, 0, 0.62), hips)
head = add(bpy.ops.mesh.primitive_uv_sphere_add, 'head', WHITE, None, radius=0.31, segments=32, ring_count=24); head.parent = neck; head.location = (0, 0, 0.3); head.scale = (1, 0.95, 1.02); smooth(head)
for sx in (-1, 1):
    e = add(bpy.ops.mesh.primitive_uv_sphere_add, f'eye{sx}', BLACK, None, radius=0.055, segments=24, ring_count=16); e.parent = head; e.location = (0.1 * sx, -0.27, -0.01); e.scale = (0.95, 0.45, 1.3); smooth(e, 1)
    h = add(bpy.ops.mesh.primitive_uv_sphere_add, f'hl{sx}', SPEC, None, radius=0.014); h.parent = head; h.location = (0.1 * sx + 0.02, -0.3, 0.025)
    b = add(bpy.ops.mesh.primitive_torus_add, f'brow{sx}', BROW, None, major_radius=0.06, minor_radius=0.008); b.parent = head; b.location = (0.105 * sx, -0.265, 0.085); b.rotation_euler = (math.radians(80), 0, 0); b.scale = (1, 1, 0.5)
mouth = add(bpy.ops.mesh.primitive_torus_add, 'mouth', BROW, None, major_radius=0.07, minor_radius=0.006); mouth.parent = head; mouth.location = (0, -0.285, -0.12); mouth.rotation_euler = (math.radians(75), 0, 0); mouth.scale = (1, 1, 0.35)
# keep only the lower half of the mouth torus = smile
bpy.context.view_layer.objects.active = mouth; bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='DESELECT'); bpy.ops.object.mode_set(mode='OBJECT')
for v in mouth.data.vertices: v.select = v.co.y > -0.01
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.delete(type='VERT'); bpy.ops.object.mode_set(mode='OBJECT')
# cap: crown (half sphere red), white front panel, brim, maple leaf
crown = add(bpy.ops.mesh.primitive_uv_sphere_add, 'crown', CAPRED, None, radius=0.33, segments=32, ring_count=16); crown.parent = head; crown.location = (0, 0.02, 0.04); crown.scale = (1.0, 1.0, 0.9)
bpy.context.view_layer.objects.active = crown; bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='DESELECT'); bpy.ops.object.mode_set(mode='OBJECT')
for v in crown.data.vertices: v.select = v.co.z < 0.06
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.delete(type='VERT'); bpy.ops.object.mode_set(mode='OBJECT'); smooth(crown, 1)
sol = crown.modifiers.new('t', 'SOLIDIFY'); sol.thickness = 0.01
front = add(bpy.ops.mesh.primitive_uv_sphere_add, 'front', CAPW, None, radius=0.336, segments=32, ring_count=16); front.parent = head; front.location = (0, 0.02, 0.04); front.scale = (1.0, 1.0, 0.9)
bpy.context.view_layer.objects.active = front; bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='DESELECT'); bpy.ops.object.mode_set(mode='OBJECT')
for v in front.data.vertices: v.select = not (v.co.z > 0.07 and v.co.y < -0.12 and abs(v.co.x) < 0.2)
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.delete(type='VERT'); bpy.ops.object.mode_set(mode='OBJECT'); smooth(front, 1)
brim = add(bpy.ops.mesh.primitive_cylinder_add, 'brim', CAPRED, None, radius=0.24, depth=0.025, vertices=48); brim.parent = head; brim.location = (0, -0.3, 0.07); brim.scale = (1.0, 0.85, 1); brim.rotation_euler = (math.radians(8), 0, 0); smooth(brim, 1)
maple('capleaf', CAPRED, head, 0.075, (0, -0.315, 0.2), (math.radians(-35), 0, 0))
# scarf: ring + two tails, white maple leaf on the front tail
ring = add(bpy.ops.mesh.primitive_torus_add, 'scarf', RED, None, major_radius=0.17, minor_radius=0.075, major_segments=40, minor_segments=16); ring.parent = neck; ring.location = (0, 0, 0.0); ring.scale = (1.05, 1, 0.9); smooth(ring, 1)
tail = add(bpy.ops.mesh.primitive_cube_add, 'tail', RED, None, size=1); tail.parent = neck; tail.location = (0.08, -0.2, -0.25); tail.scale = (0.12, 0.04, 0.42); tail.rotation_euler = (math.radians(6), 0, math.radians(-4)); smooth(tail, 2)
tail2 = add(bpy.ops.mesh.primitive_cube_add, 'tail2', RED, None, size=1); tail2.parent = neck; tail2.location = (-0.06, -0.17, -0.16); tail2.scale = (0.11, 0.04, 0.26); smooth(tail2, 2)
maple('scarfleaf', CAPW, neck, 0.065, (0.082, -0.245, -0.33), (0, 0, 0))
# limbs: shoulder/hip pivots, upper arm + forearm + mitten hand; legs + feet
def arm(sx):
    sh = empty(f'sh{sx}', (0.24 * sx, 0, 0.5), hips)
    up = capsule(f'upA{sx}', 0.07, 0.26, WHITE, sh, (0, 0, -0.12))
    el = empty(f'el{sx}', (0, 0, -0.24), sh)
    lo = capsule(f'loA{sx}', 0.065, 0.3, WHITE, el, (0, 0, -0.08))
    hand = add(bpy.ops.mesh.primitive_uv_sphere_add, f'hand{sx}', WHITE, None, radius=0.085); hand.parent = el; hand.location = (0, 0, -0.26); hand.scale = (0.9, 0.7, 1.05); smooth(hand, 1)
    th = capsule(f'thumb{sx}', 0.022, 0.07, WHITE, el, (0.055 * sx * -1, -0.03, -0.235))
    return sh, el
def leg(sx):
    hp = empty(f'hp{sx}', (0.09 * sx, 0, 0.02), hips)
    up = capsule(f'upL{sx}', 0.115, 0.44, WHITE, hp, (0, 0, -0.15))
    kn = empty(f'kn{sx}', (0, 0, -0.3), hp)
    lo = capsule(f'loL{sx}', 0.1, 0.4, WHITE, kn, (0, 0, -0.1))
    ft = add(bpy.ops.mesh.primitive_uv_sphere_add, f'foot{sx}', WHITE, None, radius=0.11); ft.parent = kn; ft.location = (0, -0.05, -0.3); ft.scale = (0.85, 1.4, 0.55); smooth(ft, 1)
    return hp, kn
SH = {s: arm(s) for s in (-1, 1)}; LG = {s: leg(s) for s in (-1, 1)}

# ---------- animation ----------
sc.render.fps = 30; sc.frame_start = 1; sc.frame_end = NF; sc.frame_step = 2
def key(o, f, rot=None, loc=None):
    if rot is not None: o.rotation_euler = [math.radians(a) for a in rot]; o.keyframe_insert('rotation_euler', frame=f)
    if loc is not None: o.location = loc; o.keyframe_insert('location', frame=f)
# rest pose: arms slightly out
for s in (-1, 1): key(SH[s][0], 1, (0, 12 * s, 0)); key(SH[s][1], 1, (-10, 0, 0))
if ACTION == 'run':   # in-place run cycle, loops every NF frames (NF=16 @30fps), faces screen-left 3/4
    key(root, 1, (0, 0, -55))
    for f in range(1, NF + 2):
        a = math.sin((f - 1) / NF * 2 * math.pi); c = math.cos((f - 1) / NF * 2 * math.pi)
        key(hips, f, (12, 0, 0), (0, 0, 0.62 + 0.05 * abs(c)))
        key(neck, f, (-6, 0, 0))
        for s in (-1, 1):
            key(SH[s][0], f, (55 * a * s, 14 * s, 0)); key(SH[s][1], f, (-75, 0, 0))
            key(LG[s][0], f, (-45 * a * s, 0, 0)); key(LG[s][1], f, (50 * max(0, a * s) + 8, 0, 0))
else:
    for f in range(1, NF + 2, 2):
        u = (f - 1) / 30; T = NF / 30; w = lambda k: math.sin(u / T * 2 * math.pi * k)   # k whole cycles per loop -> seamless
        key(hips, f, (0, 0, 2 * w(1)), (0, 0, 0.62 + 0.008 * w(2)))
        key(neck, f, (4 * w(2), 0, 8 * w(1)))
        if ACTION == 'talk':
            for s in (-1, 1):
                g = math.sin(u / T * 2 * math.pi * 3 + (0 if s > 0 else 1.7))
                key(SH[s][0], f, (-35 - 15 * g, 25 * s + 8 * g * s, 0)); key(SH[s][1], f, (-70 - 20 * g, 0, -20 * s))
            key(root, f, (0, 0, 8 * w(1)))
        elif ACTION == 'point':   # points to screen-right (where the info window is), loops gently
            key(SH[-1][0], f, (-5, -95 + 4 * w(2), -10)); key(SH[-1][1], f, (-5, 0, 0))
            key(SH[1][0], f, (-20, 30, 0)); key(SH[1][1], f, (-110, 0, 30))
            key(root, f, (0, 0, -25))
        elif ACTION == 'wave':
            key(SH[1][0], f, (0, 150, 0)); key(SH[1][1], f, (0, 25 * w(8), 0))
            key(SH[-1][0], f, (0, -12, 0))
        elif ACTION == 'shock':   # hands to cheeks, small jump
            for s in (-1, 1): key(SH[s][0], f, (-40, 20 * s, 0)); key(SH[s][1], f, (-130, 0, -35 * s))
            key(hips, f, (0, 0, 0), (0, 0, 0.62 + 0.06 * max(0, w(2))))
for o in bpy.data.objects:
    if o.animation_data and o.animation_data.action:
        for fc in o.animation_data.action.fcurves:
            for kp in fc.keyframe_points: kp.interpolation = 'BEZIER'

# ---------- camera + lights (soft studio key matching warm interiors) ----------
cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); bpy.context.collection.objects.link(cam); sc.camera = cam
cam.location = (0, -3.6, 1.0); cam.rotation_euler = (math.radians(89), 0, 0); cam.data.lens = 50
def light(name, kind, loc, energy, color, size=1.0):
    l = bpy.data.objects.new(name, bpy.data.lights.new(name, kind)); bpy.context.collection.objects.link(l)
    l.location = loc; l.data.energy = energy; l.data.color = color
    if kind == 'AREA': l.data.size = size
    d = Vector((0, 0, 0.9)) - Vector(loc); l.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler(); return l
light('key', 'AREA', (-2.5, -3.0, 3.0), 650, (1.0, 0.9, 0.8), 2.5)
light('fill', 'AREA', (3.0, -2.5, 1.5), 180, (0.8, 0.88, 1.0), 3)
light('rim', 'AREA', (1.5, 2.5, 2.8), 420, (1.0, 0.85, 0.7), 1.5)
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True; w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.35
# contact shadow catcher
if os.environ.get('ENGINE', 'CYCLES') == 'CYCLES':
    bpy.ops.mesh.primitive_plane_add(size=6, location=(0, 0, -0.06)); pl = bpy.context.active_object; pl.is_shadow_catcher = True

ENG = os.environ.get('ENGINE', 'CYCLES'); sc.render.engine = ENG
if ENG == 'CYCLES': sc.cycles.device = 'CPU'; sc.cycles.samples = int(os.environ.get('SAMPLES', 16)); sc.cycles.use_denoising = True
else: sc.eevee.taa_render_samples = 16
sc.render.film_transparent = True; sc.render.resolution_x = RX; sc.render.resolution_y = RY; sc.render.resolution_percentage = 100
sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGBA'
sc.view_settings.view_transform = 'Standard'; sc.render.filepath = os.path.join(OUT, 'f_')
sc.render.threads_mode = 'FIXED'; sc.render.threads = 4
if os.environ.get('ONE'): sc.frame_start = sc.frame_end = int(os.environ['ONE'])
if os.environ.get('UPTO'): sc.frame_end = int(os.environ['UPTO'])
bpy.ops.render.render(animation=True)
