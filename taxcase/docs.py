"""Printed-matter textures for TAX CASE #001.

Every document here is FICTIONAL: no government logo, no real form number,
no real legal wording. Header is the generic "CANADA TAX NOTICE".
Pages are US-letter (8.5 x 11 in) at 300 dpi = 2550 x 3300 px.
Run: python3 docs.py  -> build/tex/*.png
"""
import os
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "build", "tex")
REPO = os.path.dirname(HERE)

LIB = "/usr/share/fonts/truetype/liberation/"
SANS = LIB + "LiberationSans-Regular.ttf"
SANS_B = LIB + "LiberationSans-Bold.ttf"
MONO = REPO + "/reels/fonts/CourierPrime-400.woff2"

DPI = 300
PAGE_W, PAGE_H = int(8.5 * DPI), int(11 * DPI)
INK = (28, 27, 30)        # near-black toner
GREY = (92, 90, 92)
RED = (158, 31, 36)       # restrained Canadian red (series accent)
WHITE = (255, 255, 255)   # albedo of paper is applied in the shader, texture stays neutral

# Tri-fold creases: letter folded in thirds (11 in / 3)
FOLD1 = PAGE_H / 3
FOLD2 = 2 * PAGE_H / 3

# Layout anchors in page pixels, exported so shots can aim the camera at printed lines.
ANCHORS = {}


def pt(points):
    """Font size in pixels for a print size in points at 300 dpi."""
    return int(round(points * DPI / 72))


def font(path, points):
    return ImageFont.truetype(path, pt(points))


def text(d, xy, s, f, fill=INK, anchor="la", name=None, spacing=0):
    if spacing:
        x, y = xy
        total = sum(d.textlength(ch, font=f) + spacing for ch in s) - spacing
        if anchor[0] == "r":
            x -= total
        anchor = "l" + anchor[1]
        for ch in s:
            d.text((x, y), ch, font=f, fill=fill, anchor=anchor)
            x += d.textlength(ch, font=f) + spacing
    else:
        d.text(xy, s, font=f, fill=fill, anchor=anchor)
    if name:
        bbox = d.textbbox(xy, s, font=f, anchor=anchor) if not spacing else (
            xy[0], xy[1], xy[0] + total, xy[1] + f.size)
        ANCHORS[name] = bbox


def toner(img, seed):
    """Laser-toner look: slight edge softness and tiny density variation, never glowing."""
    rnd = random.Random(seed)
    img = img.filter(ImageFilter.GaussianBlur(0.6))
    px = img.load()
    w, h = img.size
    # sparse toner specks, as on real laser prints
    for _ in range(45):
        x, y = rnd.randrange(w), rnd.randrange(h)
        r = rnd.choice([1, 1, 1, 2])
        for dx in range(-r, r + 1):
            for dy in range(-r, r + 1):
                if 0 <= x + dx < w and 0 <= y + dy < h and dx * dx + dy * dy <= r * r:
                    c = px[x + dx, y + dy]
                    px[x + dx, y + dy] = tuple(int(v * 0.72) for v in c)
    return img


def page1():
    im = Image.new("RGB", (PAGE_W, PAGE_H), WHITE)
    d = ImageDraw.Draw(im)
    m = 210  # 0.7 in margin
    # ---- top panel: header, reference, recipient, amount
    d.rectangle([m, 190, m + 26, 300], fill=RED)
    text(d, (m + 60, 192), "CANADA TAX NOTICE", font(SANS_B, 17), spacing=6, name="header")
    text(d, (m + 62, 270), "Notice of changes to your return", font(SANS, 9.5), fill=GREY)
    right = PAGE_W - m
    f9 = font(SANS, 9)
    for i, (k, v) in enumerate([("Notice date", "October 2, 2026"),
                                ("Tax year", "2025"),
                                ("Reference", "TC-001-58219")]):
        y = 196 + i * 50
        text(d, (right - 560, y), k, f9, fill=GREY)
        text(d, (right, y), v, font(SANS_B, 9), anchor="ra", name=f"p1_{k.lower().replace(' ', '_')}")
    d.line([m, 400, right, 400], fill=(150, 148, 150), width=3)
    f10 = font(SANS, 10.5)
    for i, s in enumerate(["JORDAN MARTIN", "87 MAPLE CRESCENT", "ANYTOWN  MB  A1A 1A1"]):
        text(d, (m, 470 + i * 52), s, f10, name="p1_name" if i == 0 else None)
    # amount block
    d.rectangle([m, 700, right, 1010], outline=(120, 118, 120), width=3)
    d.rectangle([m, 700, m + 14, 1010], fill=RED)
    text(d, (m + 70, 740), "Balance owing", font(SANS, 12), fill=GREY, name="p1_amount_label")
    text(d, (m + 70, 820), "$2,460.00", font(SANS_B, 34), name="p1_amount")
    text(d, (right - 60, 760), "See the explanation", font(SANS, 9), fill=GREY, anchor="ra")
    text(d, (right - 60, 812), "inside this notice.", font(SANS, 9), fill=GREY, anchor="ra")
    # ---- middle panel (below FOLD1 = 1100): summary lines, emphasized one at a time in the film
    f11 = font(SANS, 11.5)
    y0 = 1190
    lines = [("We reviewed your 2025 return.", "line_reviewed"),
             ("One amount on your return was changed.", "line_changed"),
             ("This change created the balance above.", "line_balance"),
             ("The details are explained below.", "line_details")]
    for i, (s, nm) in enumerate(lines):
        text(d, (m, y0 + i * 92), s, f11, name=nm)
    # "what changed" box (still middle panel)
    by = 1640
    text(d, (m, by), "WHAT CHANGED", font(SANS_B, 13), spacing=5, name="what_changed")
    d.line([m, by + 90, right, by + 90], fill=INK, width=4)
    rows = [("AMOUNT", "$2,460.00", "Balance owing after the change"),
            ("REASON", "Income adjusted", "An income slip did not match your return"),
            ("DEADLINE", "November 16, 2026", "Pay or respond by this date")]
    for i, (k, v, sub) in enumerate(rows):
        y = by + 140 + i * 150
        d.rectangle([m, y + 8, m + 12, y + 92], fill=RED)
        text(d, (m + 50, y), k, font(SANS_B, 11), spacing=3, name=f"row_{k.lower()}")
        text(d, (m + 760, y - 6), v, font(SANS_B, 14), name=f"row_{k.lower()}_value")
        text(d, (m + 760, y + 66), sub, font(SANS, 9), fill=GREY)
        d.line([m, y + 122, right, y + 122], fill=(185, 183, 185), width=2)
    # ---- bottom panel (below FOLD2 = 2200)
    text(d, (m, 2330), "Before you act", font(SANS_B, 12), name="before_you_act")
    f10b = font(SANS, 10)
    for i, s in enumerate(["Read every page of this notice.",
                           "Compare it with the return you filed.",
                           "Keep this notice with your tax records."]):
        text(d, (m + 40, 2420 + i * 70), "—  " + s, f10b)
    d.line([m, 3010, right, 3010], fill=(170, 168, 170), width=2)
    text(d, (m, 3050), "SAMPLE DOCUMENT — FICTIONAL. Created for illustration only. "
                       "Not an official notice.", font(SANS, 7.5), fill=GREY)
    text(d, (right, 3050), "Page 1 of 2", font(SANS, 7.5), fill=GREY, anchor="ra")
    text(d, (m, 3100), "TC-001-58219", font(MONO, 7.5), fill=GREY)
    return toner(im, 1)


def page2():
    im = Image.new("RGB", (PAGE_W, PAGE_H), WHITE)
    d = ImageDraw.Draw(im)
    m = 210
    right = PAGE_W - m
    d.rectangle([m, 190, m + 26, 300], fill=RED)
    text(d, (m + 60, 192), "CANADA TAX NOTICE", font(SANS_B, 17), spacing=6)
    text(d, (m + 62, 270), "Details of the change", font(SANS, 9.5), fill=GREY)
    text(d, (right, 200), "TC-001-58219", font(MONO, 9), fill=GREY, anchor="ra")
    d.line([m, 400, right, 400], fill=(150, 148, 150), width=3)
    fields = [("NAME", "Jordan Martin"),
              ("TAX YEAR", "2025"),
              ("AMOUNT", "$2,460.00"),
              ("REASON", "Income adjusted to match an income slip"),
              ("DEADLINE", "November 16, 2026")]
    for i, (k, v) in enumerate(fields):
        y = 560 + i * 300
        text(d, (m, y), k, font(SANS_B, 10.5), fill=GREY, spacing=4, name=f"p2_{k.lower().replace(' ', '_')}_label")
        text(d, (m, y + 70), v, font(SANS_B, 16), name=f"p2_{k.lower().replace(' ', '_')}")
        d.line([m, y + 210, right, y + 210], fill=(185, 183, 185), width=2)
    text(d, (m, 2200), "If any detail is wrong, contact the sender before paying.", font(SANS, 10))
    d.line([m, 3010, right, 3010], fill=(170, 168, 170), width=2)
    text(d, (m, 3050), "SAMPLE DOCUMENT — FICTIONAL. Created for illustration only. "
                       "Not an official notice.", font(SANS, 7.5), fill=GREY)
    text(d, (right, 3050), "Page 2 of 2", font(SANS, 7.5), fill=GREY, anchor="ra")
    return toner(im, 2)


def show_through(front):
    """Back side of a sheet: blank paper with faint show-through of the print.
    Not flipped here: it is mapped with the front UVs on the underside shell, so it reads mirrored when seen from the back."""
    g = front.convert("L").filter(ImageFilter.GaussianBlur(3))
    return Image.eval(g, lambda v: 255 - int((255 - v) * 0.06)).convert("RGB")


ENV_W, ENV_H = int(9.5 * DPI), int(4.125 * DPI)  # #10 envelope


def envelope_front():
    im = Image.new("RGB", (ENV_W, ENV_H), WHITE)
    d = ImageDraw.Draw(im)
    d.rectangle([110, 110, 136, 210], fill=RED)
    text(d, (170, 112), "CANADA TAX NOTICE", font(SANS_B, 12), spacing=5)
    text(d, (172, 170), "Return address  •  Anytown", font(SANS, 7.5), fill=GREY)
    # address window area (window itself is geometry; print sits behind it on the letter)
    text(d, (ENV_W - 140, 112), "IMPORTANT", font(SANS_B, 11), fill=RED, anchor="ra", spacing=4)
    text(d, (ENV_W - 140, 170), "Tax information enclosed", font(SANS, 8), fill=GREY, anchor="ra")
    # recipient block printed directly (no window: simpler, fully stable text)
    for i, s in enumerate(["JORDAN MARTIN", "87 MAPLE CRESCENT", "ANYTOWN  MB  A1A 1A1"]):
        text(d, (900, 560 + i * 62), s, font(SANS, 11))
    # postal barcode-like bars (generic)
    rnd = random.Random(7)
    x = 900
    for _ in range(52):
        h = rnd.choice([28, 46])
        d.rectangle([x, 820 + (46 - h), x + 7, 866], fill=INK)
        x += 19
    return toner(im, 3)


def envelope_back():
    return Image.new("RGB", (ENV_W, ENV_H), WHITE)


def folder_label():
    w, h = int(3.5 * DPI), int(0.75 * DPI)
    im = Image.new("RGB", (w, h), (246, 243, 236))
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, 18, h], fill=RED)
    text(d, (70, h // 2), "TAX CASE  #001", font(SANS_B, 18), anchor="lm", spacing=6)
    return toner(im, 4)


def main():
    os.makedirs(OUT, exist_ok=True)
    p1 = page1()
    p1.save(os.path.join(OUT, "page1.png"))
    show_through(p1).save(os.path.join(OUT, "page1_back.png"))
    p2 = page2()
    p2.save(os.path.join(OUT, "page2.png"))
    show_through(p2).save(os.path.join(OUT, "page2_back.png"))
    envelope_front().save(os.path.join(OUT, "envelope_front.png"))
    envelope_back().save(os.path.join(OUT, "envelope_back.png"))
    folder_label().save(os.path.join(OUT, "folder_label.png"))
    import json
    with open(os.path.join(OUT, "anchors.json"), "w") as f:
        json.dump({k: list(v) for k, v in ANCHORS.items()}, f, indent=1)
    print("wrote", OUT, len(ANCHORS), "anchors")


if __name__ == "__main__":
    main()
