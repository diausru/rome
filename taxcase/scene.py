"""Set, props, materials and lights for TAX CASE #001 (Blender 4.5 / Cycles via the bpy module).

Units: metres. Desk top is z = 0. The viewer sits at -y looking toward +y.
Light plan (bible §Lighting):
  KEY  window daylight from camera-left (soft, slightly cool, about 5600 K)
  PRAC warm desk lamp (about 2700 K) behind and to the right; it makes the warm pool on the desk
  no rim lights, no volumetrics
"""
import math
import os

import bmesh
import bpy
from mathutils import Matrix, Vector

HERE = os.path.dirname(os.path.abspath(__file__))
TEX = os.path.join(HERE, "build", "tex")

LETTER_W, LETTER_H = 0.2159, 0.2794          # 8.5 x 11 in
ENV_W, ENV_H = 0.2413, 0.1048                # #10 envelope
PAPER_T = 0.00011                            # 20 lb bond, about 0.1 mm


# --------------------------------------------------------------------------- utils
def clear():
    for o in list(bpy.data.objects):
        bpy.data.objects.remove(o, do_unlink=True)
    for coll in (bpy.data.meshes, bpy.data.materials, bpy.data.images, bpy.data.lights,
                 bpy.data.cameras, bpy.data.node_groups, bpy.data.armatures):
        for b in list(coll):
            coll.remove(b)


def kelvin(k):
    """Approximate blackbody RGB (linear) for a colour temperature; normalised to max = 1."""
    t = k / 100.0
    r = 255 if t <= 66 else 329.698727446 * ((t - 60) ** -0.1332047592)
    g = 99.4708025861 * math.log(t) - 161.1195681661 if t <= 66 else 288.1221695283 * ((t - 60) ** -0.0755148492)
    b = 255 if t >= 66 else (0 if t <= 19 else 138.5177312231 * math.log(t - 10) - 305.0447927307)
    c = [max(0, min(255, v)) / 255 for v in (r, g, b)]
    c = [v ** 2.2 for v in c]  # sRGB-ish to linear
    m = max(c)
    return tuple(v / m for v in c)


def nodes_of(mat):
    mat.use_nodes = True
    nt = mat.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)
    return nt, nt.nodes, nt.links


def img(name, colorspace="sRGB"):
    im = bpy.data.images.load(os.path.join(TEX, name), check_existing=True)
    im.colorspace_settings.name = colorspace
    return im


def link_obj(o):
    bpy.context.scene.collection.objects.link(o)
    return o


def mesh_obj(name, verts, faces, uvs=None):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    if uvs is not None:
        uvl = me.uv_layers.new(name="UVMap")
        for poly in me.polygons:
            for li in poly.loop_indices:
                uvl.data[li].uv = uvs[me.loops[li].vertex_index]
    me.update()
    for p in me.polygons:
        p.use_smooth = True
    return link_obj(bpy.data.objects.new(name, me))


def grid(name, w, h, nx, ny, origin=(0.5, 0.5), uv_rect=(0, 0, 1, 1), zfn=None):
    """Plane w x h in local XY with nx x ny quads. origin is a fraction of the plane at the local origin.
    uv_rect = (u0, v0, u1, v1) part of the texture mapped onto this plane."""
    verts, uvs, faces = [], [], []
    u0, v0, u1, v1 = uv_rect
    for j in range(ny + 1):
        for i in range(nx + 1):
            fx, fy = i / nx, j / ny
            x, y = (fx - origin[0]) * w, (fy - origin[1]) * h
            z = zfn(fx, fy) if zfn else 0.0
            verts.append((x, y, z))
            uvs.append((u0 + (u1 - u0) * fx, v0 + (v1 - v0) * fy))
    for j in range(ny):
        for i in range(nx):
            a = j * (nx + 1) + i
            faces.append((a, a + 1, a + nx + 2, a + nx + 1))
    return mesh_obj(name, verts, faces, uvs)


def add_mod_solidify(o, t, mat_offset=0):
    m = o.modifiers.new("solid", "SOLIDIFY")
    m.thickness = t
    m.offset = 1.0
    m.material_offset = mat_offset
    m.material_offset_rim = mat_offset
    m.use_even_offset = True
    return m


# --------------------------------------------------------------------------- materials
def mat_walnut():
    """Dark oiled walnut: ring figure from distorted wave bands along X, pores, satin finish with soft wear."""
    m = bpy.data.materials.new("walnut")
    nt, N, L = nodes_of(m)
    out = N.new("ShaderNodeOutputMaterial")
    bsdf = N.new("ShaderNodeBsdfPrincipled")
    tc = N.new("ShaderNodeTexCoord")
    mp = N.new("ShaderNodeMapping")
    mp.inputs["Scale"].default_value = (0.04, 1.0, 1.0)   # rings around the X axis (log axis along the board)
    mp.inputs["Location"].default_value = (0.0, 0.0, 0.11)
    mp.inputs["Rotation"].default_value = (0.0, 0.045, 0.035)
    L.new(tc.outputs["Object"], mp.inputs["Vector"])
    warp = N.new("ShaderNodeTexNoise")
    warp.inputs["Scale"].default_value = 1.6
    warp.inputs["Detail"].default_value = 5
    warp.inputs["Roughness"].default_value = 0.6
    mix = N.new("ShaderNodeMix")
    mix.data_type = "VECTOR"
    mix.inputs["Factor"].default_value = 0.12
    L.new(mp.outputs["Vector"], warp.inputs["Vector"])
    L.new(mp.outputs["Vector"], mix.inputs["A"])
    L.new(warp.outputs["Color"], mix.inputs["B"])
    wave = N.new("ShaderNodeTexWave")
    wave.wave_type = "RINGS"
    wave.rings_direction = "SPHERICAL"
    wave.inputs["Scale"].default_value = 22.0
    wave.inputs["Distortion"].default_value = 6.0
    wave.inputs["Detail"].default_value = 4
    wave.inputs["Detail Roughness"].default_value = 0.6
    L.new(mix.outputs["Result"], wave.inputs["Vector"])
    ramp = N.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.0
    ramp.color_ramp.elements[0].color = (0.024, 0.013, 0.008, 1)
    ramp.color_ramp.elements[1].position = 1.0
    ramp.color_ramp.elements[1].color = (0.060, 0.034, 0.019, 1)
    e = ramp.color_ramp.elements.new(0.55)
    e.color = (0.045, 0.025, 0.014, 1)
    L.new(wave.outputs["Fac"], ramp.inputs["Fac"])
    # pores: fine stretched noise darkening
    mp2 = N.new("ShaderNodeMapping")
    mp2.inputs["Scale"].default_value = (40.0, 900.0, 40.0)
    L.new(tc.outputs["Object"], mp2.inputs["Vector"])
    pores = N.new("ShaderNodeTexNoise")
    pores.inputs["Scale"].default_value = 1.0
    pores.inputs["Detail"].default_value = 2
    L.new(mp2.outputs["Vector"], pores.inputs["Vector"])
    pr = N.new("ShaderNodeValToRGB")
    pr.color_ramp.elements[0].position = 0.38
    pr.color_ramp.elements[0].color = (0.55, 0.55, 0.55, 1)
    pr.color_ramp.elements[1].position = 0.52
    pr.color_ramp.elements[1].color = (1, 1, 1, 1)
    L.new(pores.outputs["Fac"], pr.inputs["Fac"])
    mul = N.new("ShaderNodeMix")
    mul.data_type = "RGBA"
    mul.blend_type = "MULTIPLY"
    mul.inputs["Factor"].default_value = 1.0
    L.new(ramp.outputs["Color"], mul.inputs["A"])
    L.new(pr.outputs["Color"], mul.inputs["B"])
    broad = N.new("ShaderNodeTexNoise")
    broad.inputs["Scale"].default_value = 1.3
    broad.inputs["Detail"].default_value = 3
    L.new(mp.outputs["Vector"], broad.inputs["Vector"])
    br = N.new("ShaderNodeMapRange")
    br.inputs["To Min"].default_value = 0.70
    br.inputs["To Max"].default_value = 1.25
    L.new(broad.outputs["Fac"], br.inputs["Value"])
    mul2 = N.new("ShaderNodeMix")
    mul2.data_type = "RGBA"
    mul2.blend_type = "MULTIPLY"
    mul2.inputs["Factor"].default_value = 1.0
    L.new(mul.outputs["Result"], mul2.inputs["A"])
    L.new(br.outputs["Result"], mul2.inputs["B"])
    L.new(mul2.outputs["Result"], bsdf.inputs["Base Color"])
    # roughness: satin oil finish, slightly worn (smoother) in broad patches, rougher in pores
    wear = N.new("ShaderNodeTexNoise")
    wear.inputs["Scale"].default_value = 3.5
    wear.inputs["Detail"].default_value = 3
    L.new(tc.outputs["Object"], wear.inputs["Vector"])
    rr = N.new("ShaderNodeMapRange")
    rr.inputs["To Min"].default_value = 0.30
    rr.inputs["To Max"].default_value = 0.52
    L.new(wear.outputs["Fac"], rr.inputs["Value"])
    L.new(rr.outputs["Result"], bsdf.inputs["Roughness"])
    # fine scratches: very stretched noise in random-ish direction -> bump
    mp3 = N.new("ShaderNodeMapping")
    mp3.inputs["Scale"].default_value = (2.0, 260.0, 1.0)
    mp3.inputs["Rotation"].default_value = (0, 0, 0.35)
    L.new(tc.outputs["Object"], mp3.inputs["Vector"])
    scr = N.new("ShaderNodeTexNoise")
    scr.inputs["Scale"].default_value = 3.0
    scr.inputs["Detail"].default_value = 1
    L.new(mp3.outputs["Vector"], scr.inputs["Vector"])
    sr = N.new("ShaderNodeValToRGB")
    sr.color_ramp.elements[0].position = 0.70
    sr.color_ramp.elements[1].position = 0.74
    L.new(scr.outputs["Fac"], sr.inputs["Fac"])
    bump = N.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.12
    bump.inputs["Distance"].default_value = 0.0004
    add = N.new("ShaderNodeMath")
    add.operation = "ADD"
    L.new(pr.outputs["Color"], add.inputs[0])
    L.new(sr.outputs["Color"], add.inputs[1])
    L.new(add.outputs["Value"], bump.inputs["Height"])
    L.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    bsdf.inputs["Coat Weight"].default_value = 0.25
    bsdf.inputs["Coat Roughness"].default_value = 0.28
    L.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    return m


def mat_paper(name, tex, albedo=(0.80, 0.76, 0.66), translucency=0.12):
    """Uncoated bond paper: warm ivory albedo times the printed texture, fibre bump,
    slight translucency, and toner a little glossier than the paper."""
    m = bpy.data.materials.new(name)
    nt, N, L = nodes_of(m)
    out = N.new("ShaderNodeOutputMaterial")
    bsdf = N.new("ShaderNodeBsdfPrincipled")
    it = N.new("ShaderNodeTexImage")
    it.image = img(tex)
    it.interpolation = "Cubic"
    tint = N.new("ShaderNodeMix")
    tint.data_type = "RGBA"
    tint.blend_type = "MULTIPLY"
    tint.inputs["Factor"].default_value = 1.0
    tint.inputs["B"].default_value = (*albedo, 1)
    L.new(it.outputs["Color"], tint.inputs["A"])
    # fibre mottling (very low contrast, a real sheet is not uniform)
    tc = N.new("ShaderNodeTexCoord")
    fib = N.new("ShaderNodeTexNoise")
    fib.inputs["Scale"].default_value = 900.0
    fib.inputs["Detail"].default_value = 8
    L.new(tc.outputs["Object"], fib.inputs["Vector"])
    mott = N.new("ShaderNodeMapRange")
    mott.inputs["To Min"].default_value = 0.965
    mott.inputs["To Max"].default_value = 1.02
    L.new(fib.outputs["Fac"], mott.inputs["Value"])
    mul = N.new("ShaderNodeMix")
    mul.data_type = "RGBA"
    mul.blend_type = "MULTIPLY"
    mul.inputs["Factor"].default_value = 1.0
    L.new(tint.outputs["Result"], mul.inputs["A"])
    L.new(mott.outputs["Result"], mul.inputs["B"])
    L.new(mul.outputs["Result"], bsdf.inputs["Base Color"])
    # ink mask -> roughness (toner 0.55, paper 0.88)
    bw = N.new("ShaderNodeRGBToBW")
    L.new(it.outputs["Color"], bw.inputs["Color"])
    rr = N.new("ShaderNodeMapRange")
    rr.inputs["From Min"].default_value = 0.2
    rr.inputs["From Max"].default_value = 0.9
    rr.inputs["To Min"].default_value = 0.55
    rr.inputs["To Max"].default_value = 0.88
    L.new(bw.outputs["Val"], rr.inputs["Value"])
    L.new(rr.outputs["Result"], bsdf.inputs["Roughness"])
    bsdf.inputs["Specular IOR Level"].default_value = 0.35
    bsdf.inputs["Sheen Weight"].default_value = 0.15
    bump = N.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.08
    bump.inputs["Distance"].default_value = 0.00005
    L.new(fib.outputs["Fac"], bump.inputs["Height"])
    L.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    tr = N.new("ShaderNodeBsdfTranslucent")
    L.new(mul.outputs["Result"], tr.inputs["Color"])
    mx = N.new("ShaderNodeMixShader")
    mx.inputs["Fac"].default_value = translucency
    L.new(bsdf.outputs["BSDF"], mx.inputs[1])
    L.new(tr.outputs["BSDF"], mx.inputs[2])
    L.new(mx.outputs["Shader"], out.inputs["Surface"])
    return m


def mat_simple(name, color, rough, metallic=0.0, coat=0.0, aniso=0.0, sss=0.0):
    m = bpy.data.materials.new(name)
    nt, N, L = nodes_of(m)
    out = N.new("ShaderNodeOutputMaterial")
    b = N.new("ShaderNodeBsdfPrincipled")
    b.inputs["Base Color"].default_value = (*color, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metallic
    b.inputs["Coat Weight"].default_value = coat
    b.inputs["Anisotropic"].default_value = aniso
    b.inputs["Subsurface Weight"].default_value = sss
    # micro variation so nothing reads as perfectly manufactured
    tc = N.new("ShaderNodeTexCoord")
    nz = N.new("ShaderNodeTexNoise")
    nz.inputs["Scale"].default_value = 400.0
    nz.inputs["Detail"].default_value = 4
    L.new(tc.outputs["Object"], nz.inputs["Vector"])
    bp = N.new("ShaderNodeBump")
    bp.inputs["Strength"].default_value = 0.05
    bp.inputs["Distance"].default_value = 0.0001
    L.new(nz.outputs["Fac"], bp.inputs["Height"])
    L.new(bp.outputs["Normal"], b.inputs["Normal"])
    L.new(b.outputs["BSDF"], out.inputs["Surface"])
    return m


def mat_wall():
    m = bpy.data.materials.new("wall")
    nt, N, L = nodes_of(m)
    out = N.new("ShaderNodeOutputMaterial")
    b = N.new("ShaderNodeBsdfPrincipled")
    b.inputs["Base Color"].default_value = (0.030, 0.030, 0.031, 1)
    b.inputs["Roughness"].default_value = 0.9
    tc = N.new("ShaderNodeTexCoord")
    nz = N.new("ShaderNodeTexNoise")
    nz.inputs["Scale"].default_value = 30.0
    nz.inputs["Detail"].default_value = 8
    L.new(tc.outputs["Object"], nz.inputs["Vector"])
    bp = N.new("ShaderNodeBump")
    bp.inputs["Strength"].default_value = 0.2
    L.new(nz.outputs["Fac"], bp.inputs["Height"])
    L.new(bp.outputs["Normal"], b.inputs["Normal"])
    L.new(b.outputs["BSDF"], out.inputs["Surface"])
    return m


# --------------------------------------------------------------------------- objects
def build_desk():
    bpy.ops.mesh.primitive_cube_add(size=1)
    d = bpy.context.object
    d.name = "desk"
    d.scale = (2.4, 1.3, 0.04)
    d.location = (0.05, 0.25, -0.02)
    bpy.ops.object.transform_apply(scale=True)
    bv = d.modifiers.new("bevel", "BEVEL")
    bv.width = 0.003
    bv.segments = 3
    d.data.materials.append(mat_walnut())
    # back wall, far and dark: only reads as falloff in wider frames
    bpy.ops.mesh.primitive_plane_add(size=1)
    w = bpy.context.object
    w.name = "wall"
    w.scale = (5, 3, 1)
    w.rotation_euler = (math.radians(90), 0, 0)
    w.location = (0, 1.6, 0.8)
    w.data.materials.append(mat_wall())
    return d


def build_lights():
    sc = bpy.context.scene
    world = bpy.data.worlds.new("world") if not sc.world else sc.world
    sc.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs["Color"].default_value = (*[c * 0.004 for c in kelvin(7500)], 1)
    bg.inputs["Strength"].default_value = 1.0
    # KEY: window, camera-left, soft and slightly cool
    ld = bpy.data.lights.new("window", "AREA")
    ld.shape = "RECTANGLE"
    ld.size, ld.size_y = 0.9, 1.3
    ld.energy = 150
    ld.color = kelvin(5600)
    win = link_obj(bpy.data.objects.new("window", ld))
    win.location = (-1.35, 0.55, 0.95)
    aim(win, (0.0, 0.12, 0.0))
    # window frame: a mullion cross in front of the area light gives a soft, real shadow structure
    frame_mat = mat_simple("mullion", (0.02, 0.02, 0.02), 0.8)
    for sx, sy, sz, off in [(0.03, 0.03, 1.4, (0, 0, 0)), (0.03, 1.0, 0.03, (0, 0, 0.05))]:
        bpy.ops.mesh.primitive_cube_add(size=1)
        bar = bpy.context.object
        bar.name = "mullion"
        bar.scale = (sx, sy, sz)
        bar.location = (-1.28 + off[0], 0.55 + off[1], 0.95 + off[2])
        bar.data.materials.append(frame_mat)
        bar.visible_camera = False
    # PRACTICAL: warm desk lamp behind-right (bulb inside a shade)
    lp = bpy.data.lights.new("lamp", "SPOT")
    lp.energy = 22
    lp.color = kelvin(2700)
    lp.shadow_soft_size = 0.03
    lp.spot_size = math.radians(115)
    lp.spot_blend = 0.85
    lamp = link_obj(bpy.data.objects.new("lamp", lp))
    lamp.location = (0.40, 0.48, 0.40)
    aim(lamp, (0.10, 0.12, 0.0))
    build_lamp_body(lamp.location)
    return win, lamp


def build_lamp_body(head):
    metal = mat_simple("lamp_metal", (0.018, 0.018, 0.019), 0.38, metallic=1.0)
    inner = mat_simple("shade_inner", (0.8, 0.78, 0.72), 0.6)
    # shade: open cone, aimed down-forward
    bpy.ops.mesh.primitive_cone_add(vertices=48, radius1=0.075, radius2=0.03, depth=0.11, end_fill_type="NOTHING")
    sh = bpy.context.object
    sh.name = "shade"
    sh.location = Vector(head) + Vector((0.0, 0.01, 0.035))
    aim(sh, (0.10, 0.12, 0.0), up_axis="Z", track="-Z")
    sol = sh.modifiers.new("s", "SOLIDIFY")
    sol.thickness = 0.0012
    sh.data.materials.append(metal)
    sh.data.materials.append(inner)
    sol.material_offset = 1
    # stem and base
    bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=0.006, depth=0.45)
    st = bpy.context.object
    st.location = (head[0] + 0.05, head[1] + 0.06, 0.225)
    st.data.materials.append(metal)
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=0.07, depth=0.012)
    bs = bpy.context.object
    bs.location = (head[0] + 0.05, head[1] + 0.06, 0.006)
    bs.data.materials.append(metal)
    for o in (sh, st, bs):
        bv = o.modifiers.new("b", "BEVEL")
        bv.width = 0.001
        bv.segments = 2


def aim(obj, target, up_axis="Y", track="-Z"):
    d = Vector(target) - obj.location
    obj.rotation_euler = d.to_track_quat(track, up_axis).to_euler()


def build_props():
    # ceramic mug, matte charcoal glaze, far right background
    prof = [(0.0, 0.0), (0.040, 0.0), (0.042, 0.004), (0.043, 0.09), (0.040, 0.095), (0.037, 0.093),
            (0.037, 0.008), (0.0, 0.008)]
    bm = bmesh.new()
    seg = 64
    rings = []
    for k in range(seg):
        a = 2 * math.pi * k / seg
        rings.append([bm.verts.new((r * math.cos(a), r * math.sin(a), z)) for r, z in prof])
    for k in range(seg):
        r0, r1 = rings[k], rings[(k + 1) % seg]
        for i in range(len(prof) - 1):
            try:
                bm.faces.new((r0[i], r1[i], r1[i + 1], r0[i + 1]))
            except ValueError:
                pass
    me = bpy.data.meshes.new("mug")
    bm.to_mesh(me)
    bm.free()
    mug = link_obj(bpy.data.objects.new("mug", me))
    mug.location = (0.30, 0.36, 0.0)
    for p in me.polygons:
        p.use_smooth = True
    mug.modifiers.new("sub", "SUBSURF").levels = 1
    mug.data.materials.append(mat_simple("glaze", (0.05, 0.05, 0.052), 0.32, coat=0.4))
    # ballpoint pen, lower right, angled
    pen_mat = mat_simple("pen_body", (0.012, 0.012, 0.013), 0.25, coat=0.5)
    clip_mat = mat_simple("pen_clip", (0.7, 0.68, 0.64), 0.22, metallic=1.0, aniso=0.5)
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=0.0045, depth=0.14)
    pen = bpy.context.object
    pen.name = "pen"
    pen.rotation_euler = (0, math.radians(90), math.radians(-18))
    pen.location = (0.215, -0.095, 0.0045)
    pen.data.materials.append(pen_mat)
    bv = pen.modifiers.new("b", "BEVEL")
    bv.width = 0.0015
    bv.segments = 3
    bpy.ops.mesh.primitive_cube_add(size=1)
    clip = bpy.context.object
    clip.scale = (0.045, 0.0018, 0.0012)
    clip.parent = pen
    clip.location = (0.0042, 0.0, 0.035)
    clip.rotation_euler = (0, math.radians(90), 0)
    clip.data.materials.append(clip_mat)
    return mug, pen


# --------------------------------------------------------------------------- paper
class Letter:
    """Tri-fold sheet: middle panel M (root) with top panel T and bottom panel B hinged at the creases.
    Angles (degrees) are hinge rotations about local X: T 0 = flat, +180 = folded over M;
    B 0 = flat, -180 = folded over M. A static bend gives each panel the slight curl of a real crease."""

    def __init__(self, name, front_tex, back_tex):
        self.name = name
        front = mat_paper(name + "_front", front_tex)
        back = mat_paper(name + "_back", back_tex)
        H3 = LETTER_H / 3
        self.root = link_obj(bpy.data.objects.new(name, None))
        self.root.empty_display_size = 0.05

        def panel(pname, v0, v1, origin_y):
            o = grid(pname, LETTER_W, H3, 24, 10, origin=(0.5, origin_y), uv_rect=(0, v0, 1, v1),
                     zfn=lambda fx, fy: 0.0)
            o.data.materials.append(front)
            o.data.materials.append(back)
            add_mod_solidify(o, PAPER_T, mat_offset=1)
            return o

        # UV v runs bottom (0) to top (1) of the page image
        self.M = panel(name + "_M", 1 / 3, 2 / 3, 0.5)
        self.M.parent = self.root
        self.T_hinge = link_obj(bpy.data.objects.new(name + "_Th", None))
        self.T_hinge.parent = self.M
        self.T_hinge.location = (0, H3 / 2, 0)
        self.T = panel(name + "_T", 2 / 3, 1.0, 0.0)
        self.T.parent = self.T_hinge
        self.B_hinge = link_obj(bpy.data.objects.new(name + "_Bh", None))
        self.B_hinge.parent = self.M
        self.B_hinge.location = (0, -H3 / 2, 0)
        self.B = panel(name + "_B", 0.0, 1 / 3, 1.0)
        self.B.parent = self.B_hinge
        # gentle panel curl
        for o, ax in ((self.T, "X"), (self.B, "X"), (self.M, "X")):
            m = o.modifiers.new("curl", "SIMPLE_DEFORM")
            m.deform_method = "BEND"
            m.deform_axis = ax
            m.angle = math.radians(0)
            o["curl"] = m.name
        self.set(0, 0)

    def set(self, t_deg, b_deg, lift_t=0.0, lift_b=0.0):
        # when folded, stack thickness so panels never intersect
        self.T_hinge.location.z = PAPER_T * (2.2 if abs(t_deg) > 90 else 0.0)
        self.B_hinge.location.z = PAPER_T * (1.1 if abs(b_deg) > 90 else 0.0)
        self.T_hinge.rotation_euler = (math.radians(t_deg), 0, 0)
        self.B_hinge.rotation_euler = (math.radians(b_deg), 0, 0)

    def key(self, frame):
        for o in (self.root, self.T_hinge, self.B_hinge):
            o.keyframe_insert("location", frame=frame)
            o.keyframe_insert("rotation_euler", frame=frame)


def build_envelope():
    """#10 envelope lying face up, pillowed by the folded letter inside (~1.2 mm),
    with a printed front, plain back, and the dark slit that the letter opener cuts along the top edge."""
    front = mat_paper("env_front", "envelope_front.png", albedo=(0.82, 0.79, 0.71))
    back = mat_paper("env_back", "envelope_back.png", albedo=(0.82, 0.79, 0.71))
    bulge = 0.0012

    def z(fx, fy):
        ex = 1 - (2 * fx - 1) ** 6
        ey = 1 - (2 * fy - 1) ** 6
        return PAPER_T * 2 + bulge * ex * ey

    env = grid("envelope", ENV_W, ENV_H, 48, 22, zfn=z)
    env.data.materials.append(front)
    env.data.materials.append(back)
    s = env.modifiers.new("solid", "SOLIDIFY")
    s.thickness = 0.00025
    s.offset = -1
    s.material_offset = 1
    s.material_offset_rim = 1
    # slit: thin dark opening along the top edge, scaled in X while the opener travels
    slit_mat = mat_simple("slit", (0.004, 0.004, 0.004), 0.9)
    sl = grid("slit", ENV_W * 0.985, 0.0009, 40, 1, origin=(0.0, 0.5))
    sl.data.materials.append(slit_mat)
    sl.parent = env
    sl.location = (-ENV_W * 0.4925, ENV_H / 2 - 0.0012, PAPER_T * 2 + 0.00002)
    sl.scale = (0.0, 1, 1)
    return env, sl


def build_packet():
    """Folded letter packet (2 sheets, tri-folded = 6 layers) that slides out of the envelope."""
    back = mat_paper("packet", "page1_back.png", albedo=(0.80, 0.76, 0.66))
    o = grid("packet", LETTER_W, LETTER_H / 3, 20, 8, uv_rect=(1, 2 / 3, 0, 1))  # u flipped: show-through reads mirrored
    o.data.materials.append(back)
    add_mod_solidify(o, PAPER_T * 6)
    return o


def build_opener():
    """Steel letter opener: thin tapered blade, walnut handle."""
    steel = mat_simple("steel", (0.72, 0.71, 0.69), 0.30, metallic=1.0, aniso=0.6)
    wood = mat_simple("opener_wood", (0.06, 0.035, 0.02), 0.45, coat=0.3)
    root = link_obj(bpy.data.objects.new("opener", None))
    bl = 0.12
    verts = []
    faces = []
    n = 12
    for i in range(n + 1):
        f = i / n
        w = 0.009 * (1 - f) ** 0.6 + 0.0006
        th = 0.0012 * (1 - 0.7 * f)
        x = f * bl
        verts += [(x, -w, 0), (x, 0, th / 2), (x, w, 0), (x, 0, -th / 2)]
    for i in range(n):
        a = i * 4
        for k in range(4):
            faces.append((a + k, a + (k + 1) % 4, a + 4 + (k + 1) % 4, a + 4 + k))
    faces.append((0, 3, 2, 1))
    blade = mesh_obj("opener_blade", verts, faces)
    blade.data.materials.append(steel)
    blade.parent = root
    bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=0.0065, depth=0.085)
    h = bpy.context.object
    h.name = "opener_handle"
    h.rotation_euler = (0, math.radians(90), 0)
    h.location = (-0.0425, 0, 0)
    h.scale = (1, 1.45, 1)
    h.data.materials.append(wood)
    bv = h.modifiers.new("b", "BEVEL")
    bv.width = 0.002
    bv.segments = 3
    h.parent = root
    return root


def build_folder():
    """Closed case folder (charcoal board) with the label and paper edges peeking out."""
    board = mat_paper("folder_board", "envelope_back.png", albedo=(0.030, 0.031, 0.033), translucency=0.0)
    root = link_obj(bpy.data.objects.new("folder", None))
    fw, fh = 0.235, 0.300
    for i, (z, sc) in enumerate([(0.0, 1.0), (0.0042, 0.995)]):
        o = grid(f"folder_leaf{i}", fw * sc, fh, 10, 12, zfn=lambda fx, fy: 0.0)
        o.data.materials.append(board)
        add_mod_solidify(o, 0.0006)
        o.parent = root
        o.location = (0, 0, z)
    # tab on the top leaf, holds the label
    tab = grid("folder_tab", 0.10, 0.018, 8, 2, origin=(0.5, 0.0))
    tab.data.materials.append(board)
    add_mod_solidify(tab, 0.0006)
    tab.parent = root
    tab.location = (-0.045, fh / 2, 0.0042)
    lab = grid("folder_label", 0.089, 0.019, 8, 2, uv_rect=(0, 0, 1, 1))
    lab.data.materials.append(mat_paper("label", "folder_label.png", albedo=(0.86, 0.84, 0.78), translucency=0.0))
    add_mod_solidify(lab, 0.00012)
    lab.parent = root
    lab.location = (-0.045, fh / 2 - 0.004, 0.0049)
    # paper stack inside (edges visible on the right side)
    pages = mat_paper("stack", "envelope_back.png", albedo=(0.80, 0.76, 0.66))
    st = grid("folder_pages", LETTER_W, LETTER_H, 6, 6)
    st.data.materials.append(pages)
    add_mod_solidify(st, 0.0034)
    st.parent = root
    st.location = (0.016, -0.006, 0.0006)
    st.rotation_euler = (0, 0, math.radians(-2.0))
    return root


# --------------------------------------------------------------------------- render setup
def setup_render(width=1080, height=1920, samples=64, fps=24, motion_blur=True):
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.cycles.samples = samples
    sc.cycles.use_adaptive_sampling = True
    sc.cycles.adaptive_threshold = 0.02
    sc.cycles.use_denoising = True
    sc.cycles.denoiser = "OPENIMAGEDENOISE"
    sc.cycles.max_bounces = 6
    sc.cycles.diffuse_bounces = 3
    sc.cycles.glossy_bounces = 3
    sc.cycles.transmission_bounces = 4
    sc.cycles.caustics_reflective = False
    sc.cycles.caustics_refractive = False
    sc.cycles.blur_glossy = 1.0
    sc.render.resolution_x = width
    sc.render.resolution_y = height
    sc.render.resolution_percentage = 100
    sc.render.fps = fps
    sc.render.use_motion_blur = motion_blur
    sc.render.motion_blur_shutter = 0.5          # 180-degree shutter
    sc.render.film_transparent = False
    sc.view_settings.view_transform = "AgX"
    sc.view_settings.look = "AgX - Medium High Contrast"
    sc.view_settings.exposure = 0.0
    sc.render.image_settings.file_format = "PNG"
    sc.render.image_settings.color_depth = "16"
    sc.render.image_settings.color_mode = "RGB"
    sc.render.threads_mode = "AUTO"


def build_camera():
    cd = bpy.data.cameras.new("cam")
    # Super 35 sensor turned vertical (14.0 x 24.9 mm), as a cinema camera rigged for 9:16
    cd.sensor_fit = "VERTICAL"
    cd.sensor_height = 24.89
    cd.sensor_width = 14.0
    cd.lens = 50
    cd.dof.use_dof = True
    cd.dof.aperture_fstop = 4.0
    cd.dof.aperture_blades = 9
    cd.dof.aperture_ratio = 1.0
    cam = link_obj(bpy.data.objects.new("cam", cd))
    bpy.context.scene.camera = cam
    return cam


def build_all():
    clear()
    build_desk()
    build_lights()
    build_props()
    cam = build_camera()
    return cam
