"""Single-line (engraving) SVG fonts → ordered pen strokes. Fonts: EMS / Hershey from npm `hersheytext` 2.0.0
(svg_fonts, SIL OFL / MIT; see assets/package/LICENSE). Only M and L commands occur in these fonts."""
import os, re
import xml.etree.ElementTree as ET
HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "assets", "package", "svg_fonts")

class StrokeFont:
    def __init__(self, name):
        root = ET.parse(os.path.join(FONTS, name + ".svg")).getroot()
        ns = "{http://www.w3.org/2000/svg}"
        font = root.find(f".//{ns}font")
        self.default_adv = float(font.get("horiz-adv-x", 500))
        face = root.find(f".//{ns}font-face")
        self.units = float(face.get("units-per-em", 1000))
        self.cap = float(face.get("cap-height", 500))
        self.glyphs = {}
        for g in root.iter(f"{ns}glyph"):
            u = g.get("unicode")
            if u is None:
                continue
            strokes, cur = [], None
            for cmd, x, y in re.findall(r"([ML])\s*(-?[\d.]+)\s+(-?[\d.]+)", g.get("d", "")):
                p = (float(x), float(y))
                if cmd == "M":
                    cur = [p]; strokes.append(cur)
                else:
                    cur.append(p)
            self.glyphs[u] = (float(g.get("horiz-adv-x", self.default_adv)), strokes)

    def layout(self, text, size, tracking=0.0):
        """Strokes of `text` in a local frame: x right, y DOWN, baseline at y=0, cap height = size."""
        s = size / self.cap
        x, out = 0.0, []
        for ch in text:
            adv, strokes = self.glyphs.get(ch, self.glyphs.get("?", (self.default_adv, [])))
            for st in strokes:
                out.append([(x + px * s, -py * s) for px, py in st])
            x += adv * s + tracking * size
        return out, x
