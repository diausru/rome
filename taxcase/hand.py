"""Hands for TAX CASE #001: WebXR generic-hand mesh (25-joint rig, from npm @webxr-input-profiles/assets 1.0.20),
re-rigged with our own forward kinematics, subdivided, with nails, a subsurface skin shader and a knit sleeve cuff.

The imported glTF bones are unparented, so posing is done here: each finger is a chain of joints;
flexion angles are applied cumulatively and written to every pose bone as an armature-space matrix.
"""
import math
import os

import bpy
from mathutils import Matrix, Quaternion, Vector

HERE = os.path.dirname(os.path.abspath(__file__))
GLB = os.path.join(HERE, "assets", "generic-hand", "{}.glb")
FINGERS = ["thumb", "index-finger", "middle-finger", "ring-finger", "pinky-finger"]


def chain(f):
    if f == "thumb":
        return ["thumb-metacarpal", "thumb-phalanx-proximal", "thumb-phalanx-distal", "thumb-tip"]
    return [f"{f}-metacarpal", f"{f}-phalanx-proximal", f"{f}-phalanx-intermediate", f"{f}-phalanx-distal", f"{f}-tip"]


def mat_skin(name, tone=(0.46, 0.30, 0.22)):
    """Skin: subsurface scattering with red-dominant radius, pore-scale bump, low-frequency blotch,
    redder fingertips/knuckles approximated by object-space noise, sheen-free, roughness 0.45-0.6."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    N, L = nt.nodes, nt.links
    for n in list(N):
        N.remove(n)
    out = N.new("ShaderNodeOutputMaterial")
    b = N.new("ShaderNodeBsdfPrincipled")
    b.subsurface_method = "RANDOM_WALK_SKIN"
    tc = N.new("ShaderNodeTexCoord")
    blot = N.new("ShaderNodeTexNoise")
    blot.inputs["Scale"].default_value = 60.0
    blot.inputs["Detail"].default_value = 3
    L.new(tc.outputs["Object"], blot.inputs["Vector"])
    cr = N.new("ShaderNodeValToRGB")
    cr.color_ramp.elements[0].color = (tone[0] * 0.92, tone[1] * 0.82, tone[2] * 0.80, 1)
    cr.color_ramp.elements[1].color = (tone[0] * 1.04, tone[1] * 1.03, tone[2] * 1.02, 1)
    L.new(blot.outputs["Fac"], cr.inputs["Fac"])
    L.new(cr.outputs["Color"], b.inputs["Base Color"])
    b.inputs["Subsurface Weight"].default_value = 1.0
    b.inputs["Subsurface Radius"].default_value = (1.0, 0.35, 0.18)
    b.inputs["Subsurface Scale"].default_value = 0.004
    b.inputs["Subsurface IOR"].default_value = 1.4
    pores = N.new("ShaderNodeTexVoronoi")
    pores.inputs["Scale"].default_value = 2600.0
    L.new(tc.outputs["Object"], pores.inputs["Vector"])
    fine = N.new("ShaderNodeTexNoise")
    fine.inputs["Scale"].default_value = 700.0
    fine.inputs["Detail"].default_value = 6
    L.new(tc.outputs["Object"], fine.inputs["Vector"])
    addh = N.new("ShaderNodeMath")
    addh.operation = "ADD"
    L.new(pores.outputs["Distance"], addh.inputs[0])
    L.new(fine.outputs["Fac"], addh.inputs[1])
    bp = N.new("ShaderNodeBump")
    bp.inputs["Strength"].default_value = 0.22
    bp.inputs["Distance"].default_value = 0.00008
    L.new(addh.outputs["Value"], bp.inputs["Height"])
    L.new(bp.outputs["Normal"], b.inputs["Normal"])
    rr = N.new("ShaderNodeMapRange")
    rr.inputs["To Min"].default_value = 0.42
    rr.inputs["To Max"].default_value = 0.62
    L.new(fine.outputs["Fac"], rr.inputs["Value"])
    L.new(rr.outputs["Result"], b.inputs["Roughness"])
    b.inputs["Specular IOR Level"].default_value = 0.45
    L.new(b.outputs["BSDF"], out.inputs["Surface"])
    return m


def mat_nail():
    m = bpy.data.materials.new("nail")
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (0.62, 0.45, 0.40, 1)
    b.inputs["Roughness"].default_value = 0.28
    b.inputs["Subsurface Weight"].default_value = 0.5
    b.inputs["Subsurface Radius"].default_value = (1.0, 0.4, 0.3)
    b.inputs["Subsurface Scale"].default_value = 0.001
    b.inputs["Coat Weight"].default_value = 0.3
    return m


def mat_knit():
    """Charcoal merino knit: ribbed bump and fuzz-like sheen."""
    m = bpy.data.materials.new("knit")
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (0.022, 0.022, 0.024, 1)
    b.inputs["Roughness"].default_value = 0.85
    b.inputs["Sheen Weight"].default_value = 0.6
    b.inputs["Sheen Roughness"].default_value = 0.5
    tc = nt.nodes.new("ShaderNodeTexCoord")
    wave = nt.nodes.new("ShaderNodeTexWave")
    wave.wave_type = "RINGS"
    wave.inputs["Scale"].default_value = 0.0
    w2 = nt.nodes.new("ShaderNodeTexWave")
    w2.inputs["Scale"].default_value = 180.0
    w2.inputs["Distortion"].default_value = 1.5
    w2.bands_direction = "Z"
    nt.links.new(tc.outputs["Object"], w2.inputs["Vector"])
    nz = nt.nodes.new("ShaderNodeTexNoise")
    nz.inputs["Scale"].default_value = 900.0
    nt.links.new(tc.outputs["Object"], nz.inputs["Vector"])
    add = nt.nodes.new("ShaderNodeMath")
    nt.links.new(w2.outputs["Fac"], add.inputs[0])
    nt.links.new(nz.outputs["Fac"], add.inputs[1])
    bp = nt.nodes.new("ShaderNodeBump")
    bp.inputs["Strength"].default_value = 0.6
    nt.links.new(add.outputs["Value"], bp.inputs["Height"])
    nt.links.new(bp.outputs["Normal"], b.inputs["Normal"])
    return m


class Hand:
    def __init__(self, side="right", tone=(0.46, 0.30, 0.22)):
        before = set(bpy.data.objects)
        bpy.ops.import_scene.gltf(filepath=GLB.format(side))
        new = [o for o in bpy.data.objects if o not in before]
        self.arm = [o for o in new if o.type == "ARMATURE"][0]
        self.mesh = [o for o in new if o.type == "MESH" and "hand" in o.name.lower()][0]
        for o in new:
            if o not in (self.arm, self.mesh):
                bpy.data.objects.remove(o, do_unlink=True)
        self.arm.name = f"hand_{side}"
        self.side = side
        self.mesh.data.materials.clear()
        self.mesh.data.materials.append(mat_skin(f"skin_{side}", tone))
        for p in self.mesh.data.polygons:
            p.use_smooth = True
        sub = self.mesh.modifiers.new("sub", "SUBSURF")
        sub.levels = 2
        sub.render_levels = 2
        # keep armature first, subsurf after it
        self.root = bpy.data.objects.new(f"hand_{side}_root", None)
        bpy.context.scene.collection.objects.link(self.root)
        self.arm.parent = self.root
        # rest joint positions (armature space)
        self.rest = {b.name: b.head_local.copy() for b in self.arm.data.bones}
        self.rest_mat = {b.name: b.matrix_local.copy() for b in self.arm.data.bones}
        self._nails()
        self._cuff()

    # --- geometry details
    def _nails(self):
        """Nail plates on the dorsal side of each distal phalanx, parented to that bone."""
        nm = mat_nail()
        self.nails = {}
        for f in FINGERS:
            c = chain(f)
            dist, tip = c[-2], c[-1]
            a, b = self.rest[dist], self.rest[tip]
            length = (b - a).length
            w = 0.0105 if f != "pinky-finger" else 0.0085
            if f == "thumb":
                w = 0.0125
            bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=12, radius=1)
            n = bpy.context.object
            n.name = f"nail_{self.side}_{f}"
            n.scale = (w / 2, length * 0.62, 0.0011)
            n.data.materials.append(nm)
            for p in n.data.polygons:
                p.use_smooth = True
            self.nails[f] = n
            n.parent = self.arm
            n.parent_type = "BONE"
            n.parent_bone = dist

    def _cuff(self):
        bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=0.034, depth=0.16)
        c = bpy.context.object
        c.name = f"cuff_{self.side}"
        c.scale = (1.0, 0.78, 1.0)
        c.data.materials.append(mat_knit())
        sub = c.modifiers.new("sub", "SUBSURF")
        sub.levels = 1
        self.cuff = c
        c.parent = self.arm
        c.parent_type = "BONE"
        c.parent_bone = "wrist"

    # --- posing
    def pose(self, curls, spread=None):
        """curls: {finger: [a0, a1, a2, a3] degrees of flexion per joint from the metacarpal outward}.
        Joint positions are rotated about each finger's flexion axis (palm normal x finger direction)."""
        spread = spread or {}
        pb = self.arm.pose.bones
        palm_n = self.palm_normal()
        for f in FINGERS:
            names = chain(f)
            pts = [self.rest[n].copy() for n in names]
            angles = curls.get(f, [0] * (len(names) - 1))
            axis_base = (pts[-1] - pts[0]).cross(palm_n).normalized()
            if f == "thumb":
                axis_base = (pts[-1] - pts[0]).cross(palm_n).normalized()
            rots = []
            acc = Matrix.Identity(3)
            new_pts = [pts[0]]
            for i in range(1, len(pts)):
                ang = angles[i - 1] if i - 1 < len(angles) else 0.0
                q = Quaternion(axis_base, math.radians(ang)).to_matrix()
                acc = acc @ q
                rots.append(acc.copy())
            # rebuild positions joint by joint
            cur = [p.copy() for p in pts]
            for i in range(1, len(pts)):
                R = rots[i - 1]
                pivot = cur[i - 1]
                for j in range(i, len(pts)):
                    pass
            # cumulative: segment k direction rotated by product of angles up to k
            new = [pts[0].copy()]
            for k in range(1, len(pts)):
                seg = pts[k] - pts[k - 1]
                new.append(new[-1] + rots[k - 1] @ seg)
            sp = math.radians(spread.get(f, 0.0))
            Rs = Quaternion(palm_n, sp).to_matrix()
            new = [pts[0] + Rs @ (p - pts[0]) for p in new]
            for k, n in enumerate(names):
                R = (Rs @ (rots[k - 1] if k > 0 else Matrix.Identity(3))).to_4x4()
                rest = self.rest_mat[n]
                M = Matrix.Translation(new[k]) @ R @ Matrix.Translation(-pts[k]) @ rest
                pb[n].matrix = M
        bpy.context.view_layer.update()

    def palm_normal(self):
        a = self.rest["index-finger-phalanx-proximal"]
        b = self.rest["pinky-finger-phalanx-proximal"]
        w = self.rest["wrist"]
        n = (b - a).cross(w - a).normalized()
        return n if self.side == "right" else -n

    def key(self, frame):
        for pbn in self.arm.pose.bones:
            pbn.keyframe_insert("location", frame=frame)
            pbn.keyframe_insert("rotation_quaternion", frame=frame)
            pbn.keyframe_insert("scale", frame=frame)
        self.root.keyframe_insert("location", frame=frame)
        self.root.keyframe_insert("rotation_euler", frame=frame)
