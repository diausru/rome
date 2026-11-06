"""Tesseract Scene3D helpers for Stories (v5, owner 2026-11-06): one Scene3D per scene — photo backdrop plane, perspective camera
with dolly/orbit keys, key/rim lights, 3D framed panels (box + glowing edges) with extruded Text3D, 3D icons (coin, calendar
page, envelope, house). Every number on screen comes from the scene spec (data.json). Raster renderer."""
import json, math

def srgb(h):
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]

GOLD, RED, GREEN, WHITE, NAVY, INK = srgb('F2C76B'), srgb('E8473C'), srgb('3FD08A'), [0.92, 0.92, 0.9], srgb('101820'), srgb('1A1F26')

class Scene:
    def __init__(self, dur_ms, W=1920, H=1080, font=('Nunito', 'Black')):
        self.A = []; self.dur = int(dur_ms); self.W, self.H = W, H; self.nid = 1000; self.font = font
        self.A.append({"type": "createFxScene3DLayer", "compositionId": "main", "layerId": 1, "name": "Scene", "pixelsPerMeter": 100, "view": {"id": 9, "exposure": 0},
                       "activeRange": {"start": 0, "duration": self.dur}, "transform": {"anchorPoint": [0, 0], "position": [0, 0], "scale": [100, 100], "rotation": 0, "opacity": 100},
                       "world": {"id": 2}, "renderSettings": {"id": 97, "filmGate": None, "overscan": None, "lightGroups": [], "lightCollections": [], "lightLinks": [], "outputs": [], "previewOutput": None}})
    def id(self):
        self.nid += 1; return self.nid
    # ---------- animation ----------
    def keys(self, item, prop, kf, kind='float', ease='inout'):
        """kf: [(ms, value)]; kind float|vector3"""
        E = {'linear': {"type": "linear"}, 'inout': {"type": "cubicBezier", "x1": 0.45, "y1": 0, "x2": 0.2, "y2": 1}, 'out': {"type": "cubicBezier", "x1": 0.16, "y1": 1, "x2": 0.3, "y2": 1},
             'back': {"type": "cubicBezier", "x1": 0.34, "y1": 1.56, "x2": 0.64, "y2": 1}}
        self.A.append({"type": "setFxAnimator", "compositionId": "main", "target": {"type": "styleProperty", "layerId": 1, "itemId": item, "propertyName": prop},
                       "animator": {"type": "keyframes", "enabled": True, "keyframes": [{"id": f"k{item}{prop}{i}", "layerTime": int(max(0, min(self.dur, t))), "value": {"type": kind, "value": v}, "easing": E[ease]} for i, (t, v) in enumerate(kf)]},
                       "dependencies": [], "layerRefBindings": []})
    # ---------- camera / lights / world ----------
    def camera(self, kf_pos, target=(960, 540, 0), fov=50):
        cid = 3
        self.A.append({"type": "addFxScene3DLayer", "compositionId": "main", "layerId": 1, "item": {"type": "Camera3D", "id": cid, "parentId": None, "name": "Camera",
                       "transform": {"position": list(kf_pos[0][1]), "relationships": {"constraints": [{"type": "aim", "id": 80, "target": {"id": 81, "target": {"type": "world"}, "offset": list(target), "offsetSpace": "local"}, "up": [0, 1, 0], "upSpace": "world", "forwardAxis": "positiveZ", "influence": 1}]}},
                       "lens": {"type": "angle", "projection": {"type": "perspective", "angleOfView": fov}}}})
        self.A.append({"type": "setFxScene3DActiveCamera", "compositionId": "main", "layerId": 1, "cameraItemId": cid})
        if len(kf_pos) > 1: self.keys(cid, 'position', [(t, list(p)) for t, p in kf_pos], 'vector3', 'inout')
    def lights(self, warm=1.0):
        self.A.append({"type": "addFxScene3DLayer", "compositionId": "main", "layerId": 1, "item": {"type": "Light3D", "id": 4, "parentId": None, "name": "Key",
                       "transform": {"rotation": {"type": "euler", "order": "XYZ", "orientation": [0, 0, 0], "rotationX": -35, "rotationY": 25, "rotationZ": 0}}, "emitter": {"type": "parallel", "irradiance": 2.6 * warm}}})
        self.A.append({"type": "addFxScene3DLayer", "compositionId": "main", "layerId": 1, "item": {"type": "Light3D", "id": 5, "parentId": None, "name": "Rim",
                       "transform": {"rotation": {"type": "euler", "order": "XYZ", "orientation": [0, 0, 0], "rotationX": -20, "rotationY": -140, "rotationZ": 0}}, "emitter": {"type": "parallel", "irradiance": 1.6}}})
        self.A.append({"type": "setFxScene3DWorld", "compositionId": "main", "layerId": 1, "world": {"id": 2, "light": {"source": {"type": "color", "color": [1, 0.95, 0.9, 1]}, "intensity": 0.55, "integration": "sampled"}}})
    # ---------- geometry ----------
    def _mesh(self, name, geom, pos, mat, rot=(0, 0, 0), scale=(100, 100, 100), parent=None):
        did, oid, sid, bid = self.id(), self.id(), self.id(), self.id()
        self.A.append({"type": "addFxScene3DFragment", "compositionId": "main", "layerId": 1,
                       "data": [{"type": "mesh", "id": did, "name": name + " geo", "geometry": geom, "regions": [{"key": "primary", "name": "Primary"}, {"key": "side", "name": "Side"}]}],
                       "items": [{"type": "Mesh3D", "id": oid, "parentId": parent, "name": name, "dataId": did, "packing": "whole",
                                  "transform": {"position": list(pos), "scale": list(scale), "rotation": {"type": "euler", "order": "XYZ", "orientation": [0, 0, 0], "rotationX": rot[0], "rotationY": rot[1], "rotationZ": rot[2]}},
                                  "materialSlots": [{"id": sid, "name": name, "binding": {"id": bid, **mat}}], "regionSlots": [{"region": "primary", "slotId": sid}, {"region": "side", "slotId": sid}]}]})
        return oid
    def group(self, name, pos, rot=(0, 0, 0), scale=(100, 100, 100), parent=None):
        gid = self.id()
        self.A.append({"type": "addFxScene3DLayer", "compositionId": "main", "layerId": 1, "item": {"type": "Group3D", "id": gid, "parentId": parent, "name": name,
                       "transform": {"position": list(pos), "scale": list(scale), "rotation": {"type": "euler", "order": "XYZ", "orientation": [0, 0, 0], "rotationX": rot[0], "rotationY": rot[1], "rotationZ": rot[2]}}}})
        return gid
    @staticmethod
    def pbr(rgb, rough=0.4, metal=0.0, emis=None, es=0.0, unlit=False):
        m = {"inputs": {"baseColor": {"type": "constant", "value": list(rgb)}, "roughness": {"type": "constant", "value": rough}, "metallic": {"type": "constant", "value": metal}}}
        if emis: m["inputs"]["emissiveColor"] = {"type": "constant", "value": list(emis)}; m["inputs"]["emissiveStrength"] = {"type": "constant", "value": es}
        if unlit: m["unlit"] = True; m["doubleSided"] = True
        return m
    def backdrop(self, asset, w=2600, h=1463, z=400, pos=(960, 540)):
        mat = {"unlit": True, "doubleSided": True, "inputs": {"baseColor": {"type": "texture", "factor": [1, 1, 1], "sample": {"texture": {"source": {"type": "image", "assetId": asset}}, "interpretation": {"type": "color"}, "selection": {"type": "rgb"}}}, "roughness": {"type": "constant", "value": 1}}}
        return self._mesh('Backdrop', {"type": "plane", "size": [w, h]}, (pos[0], pos[1], z), mat)
    def text(self, txt, pos, size, color, parent=None, depth=14, side=None, name='Text'):
        did, oid = self.id(), self.id(); s1, b1, s2, b2, s3, b3 = [self.id() for _ in range(6)]
        side = side or [c * 0.35 for c in color]
        self.A.append({"type": "addFxScene3DFragment", "compositionId": "main", "layerId": 1,
                       "data": [{"type": "text", "id": did, "name": name + " geo", "text": txt, "fontFamily": self.font[0], "fontStyle": self.font[1], "fontSize": size, "depth": depth, "bevelSize": min(3, depth / 3), "bevelSegments": 2,
                                 "regions": [{"key": "front", "name": "Front"}, {"key": "back", "name": "Back"}, {"key": "side", "name": "Side"}]}],
                       "items": [{"type": "Text3D", "id": oid, "parentId": parent, "name": name, "dataId": did, "transform": {"position": list(pos)},
                                  "materialSlots": [{"id": s1, "name": "front", "binding": {"id": b1, **self.pbr(color, 0.35, 0.0, color, 0.25)}}, {"id": s2, "name": "back", "binding": {"id": b2, **self.pbr(side, 0.5)}},
                                                    {"id": s3, "name": "side", "binding": {"id": b3, **self.pbr(side, 0.45, 0.3)}}],
                                  "regionSlots": [{"region": "front", "slotId": s1}, {"region": "back", "slotId": s2}, {"region": "side", "slotId": s3}]}]})
        return oid
    def panel(self, pos, size, accent, rot=(0, 0, 0), parent=None, name='Panel'):
        """dark glass slab + 4 glowing edge bars; returns group id (children positioned around 0,0)"""
        g = self.group(name, pos, rot, parent=parent); w, h = size
        self._mesh(name + ' slab', {"type": "box", "size": [w, h, 18]}, (0, 0, 12), self.pbr(NAVY, 0.25, 0.1), parent=g)
        for (x, y, bw, bh) in [(0, -h / 2, w + 8, 6), (0, h / 2, w + 8, 6), (-w / 2, 0, 6, h + 8), (w / 2, 0, 6, h + 8)]:
            self._mesh(name + ' edge', {"type": "box", "size": [bw, bh, 22]}, (x, y, 10), self.pbr(accent, 0.3, 0.0, accent, 4.0), parent=g)
        return g
    def coin(self, pos, r=70, parent=None):
        return self._mesh('Coin', {"type": "cylinder", "radius": r, "height": 16}, pos, self.pbr(GOLD, 0.22, 1.0, GOLD, 0.15), rot=(90, 0, 0), parent=parent)
    def glow(self):
        self.A.append({"type": "addFxLayerEffect", "compositionId": "main", "layerId": 1, "effectId": 50, "effect": {"type": "glow", "glowThreshold": 55, "glowRadius": 24, "glowIntensity": 1.2}})
    def dump(self, path): json.dump(self.A, open(path, 'w'))
