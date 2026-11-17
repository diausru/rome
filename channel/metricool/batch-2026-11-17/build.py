"""Metricool batch 2026-11-17: 11 card Shorts (Feb-Mar 2027), 3 handwritten + R3 as Nov-Dec extras, 7 long-form + ST01.
Rules as batch-2027-01/build.py: TikTok 10:00, IG 11:00, YouTube 16:00 (America/Winnipeg), cross-promo without "@",
AI disclosure on, cover via videoCoverMilliseconds (IG/TikTok), YouTube thumbnail manual."""
import json, pathlib, re, subprocess
ROOT = pathlib.Path(__file__).resolve().parents[3]
TZ = "America/Winnipeg"
DRIVE = "https://drive.google.com/file/d/{}/view?usp=drivesdk"
RAW = "https://raw.githubusercontent.com/diausru/rome/{}/{}"
MAIN = "d8b59195e9a1fef3982be6ef6c4b1eb6bc8c027a"     # card Shorts: Drive copies in My Drive root are not link-shared -> same bytes from GitHub
LFB = "714b862a614c7182a4b14b02b7386d6ba8466bfc"      # origin/claude/focused-dijkstra-gkzpvy (LF19 not on Drive)
SHORTS = [  # (project, date, media url) — handwritten + R3 are extra days (B11 deadline Dec 31; donations by Dec 31)
 ("b11", "2026-11-23", DRIVE.format("1ek30Zgb38IttPNKrLIE6C2_1hHzoI9xX")),   # Drive -727155960972299082.mp4, 68.958 s
 ("b12", "2026-12-03", DRIVE.format("1sudgu6A3H29KV_7udmHH53gLraJ5rSgO")),   # Drive 6501820541344077524.mp4, 62.167 s
 ("b1",  "2026-12-10", DRIVE.format("1fAZBIN-KjcuMgx_EBGFA_kK-DYyHLG6w")),   # Drive -758086152846297389.mp4, 68.833 s
 ("r3", "2026-12-17", RAW.format(MAIN, "showreel/out/r3/r3-share.mp4")),
 ("r4", "2027-02-05", RAW.format(MAIN, "showreel/out/r4/r4-share.mp4")),
 ("m29", "2027-02-08", RAW.format(MAIN, "showreel/out/m29/m29-share.mp4")),
 ("m10", "2027-02-10", RAW.format(MAIN, "showreel/out/m10/m10-share.mp4")),
 ("m3", "2027-02-12", RAW.format(MAIN, "showreel/out/m3/m3-share.mp4")),
 ("m26", "2027-02-15", RAW.format(MAIN, "showreel/out/m26/m26-share.mp4")),
 ("m7", "2027-02-17", RAW.format(MAIN, "showreel/out/m7/m7-share.mp4")),
 ("m8", "2027-02-19", RAW.format(MAIN, "showreel/out/m8/m8-share.mp4")),
 ("m9",  "2027-02-22", RAW.format(MAIN, "showreel/out/m9/m9-share.mp4")),
 ("m2", "2027-02-24", RAW.format(MAIN, "showreel/out/m2/m2-share.mp4")),
 ("m14", "2027-02-26", RAW.format(MAIN, "showreel/out/m14/m14-share.mp4")),
 ("m15", "2027-03-01", RAW.format(MAIN, "showreel/out/m15/m15-share.mp4")),
]
LONG = [  # (code, dir, date, media)
 ("LF19", "lf19-paycheque", "2026-11-18", RAW.format(LFB, "longform/lf19-paycheque/LF19-1080p.mp4")),
 ("ST01", None, "2027-01-04", RAW.format("35b0ab53f3dab069ff5825d6bc592cc15e819712", "stories/ep01r/ST01-real-1080p.mp4")),
 ("LF20", "lf20-rrsp", "2027-01-06", RAW.format(LFB, "longform/lf20-rrsp/LF20-1080p.mp4")),
 ("LF25", "lf25-taxyear", "2027-01-08", RAW.format(LFB, "longform/lf25-taxyear/LF25-1080p.mp4")),
 ("LF22", "lf22-taxable", "2027-01-13", RAW.format(LFB, "longform/lf22-taxable/LF22-1080p.mp4")),
 ("LF21", "lf21-gains", "2027-01-15", RAW.format(LFB, "longform/lf21-gains/LF21-1080p.mp4")),
 ("LF24", "lf24-twojobs", "2027-01-20", RAW.format(LFB, "longform/lf24-twojobs/LF24-1080p.mp4")),
 ("LF23", "lf23-side", "2027-01-22", RAW.format(LFB, "longform/lf23-side/LF23-1080p.mp4")),
]
YT = ["More quick tax checks on TikTok (taxsecretscanada) and Instagram (styleofcanada).",
      "Also on TikTok: taxsecretscanada · Instagram: styleofcanada. Same facts, new examples.",
      "Watching here? We post short tax checks on TikTok (taxsecretscanada) and Instagram (styleofcanada) too."]
TT = ["Full-length breakdowns on YouTube: search Tax Secrets Canada · Instagram: styleofcanada",
      "Want the long version? YouTube: Tax Secrets Canada. Checklists on Instagram: styleofcanada",
      "Deeper dives on YouTube (Tax Secrets Canada) · also on Instagram: styleofcanada"]
IG = ["🎥 Full-length breakdowns on YouTube: search Tax Secrets Canada\n🎵 TikTok: taxsecretscanada",
      "Long version on YouTube → Tax Secrets Canada · TikTok → taxsecretscanada",
      "▶️ YouTube: Tax Secrets Canada for deeper dives · TikTok: taxsecretscanada"]
def dt(d, h): return {"dateTime": f"{d}T{h:02d}:00:00", "timezone": TZ}
def tag_text(caption, promo, tags):
    t = (tags or "").strip()
    if not t or t in caption: return f"{caption}\n\n{promo}"
    return f"{caption}\n\n{promo}\n\n{t}"
BASE = {"autoPublish": True, "draft": False, "descendants": [], "shortener": False,
        "smartLinkData": {"ids": []}, "mediaAltText": [], "hasNotReadNotes": False}
out = []
for i, (p, day, url) in enumerate(SHORTS):
    j = json.load(open(ROOT / p / "publish.json"))
    ms = int(j["cover"]["ms"])
    yt, tt, ig = j["yt"], j["tt"], j["ig"]
    title = yt["titles"][0]
    desc = yt["description"]; k = desc.rfind("\n\nSources:")
    promo = "\n\n" + YT[i % 3]
    desc = desc[:k] + promo + desc[k:] if k > 0 else desc + promo
    tags = [t.strip() for t in yt["keywords"].split(",") if t.strip()][:12]
    b = {**BASE, "media": [url]}
    out.append(dict(p=p, net="tiktok", info={**b, "publicationDate": dt(day, 10), "providers": [{"network": "tiktok"}],
        "text": tag_text(tt["caption"], TT[i % 3], tt["hashtags"]), "firstCommentText": tt["pinned"], "videoCoverMilliseconds": ms,
        "tiktokData": {"privacyOption": "PUBLIC_TO_EVERYONE", "title": title, "photoCoverIndex": 0, "isAigc": True}}))
    out.append(dict(p=p, net="instagram", info={**b, "publicationDate": dt(day, 11), "providers": [{"network": "instagram"}],
        "text": tag_text(ig["caption"], IG[i % 3], ig["hashtags"]), "firstCommentText": ig["pinned"], "videoCoverMilliseconds": ms,
        "instagramData": {"type": "REEL", "showReelOnFeed": True, "isAiGenerated": True}}))
    out.append(dict(p=p, net="youtube", info={**b, "publicationDate": dt(day, 16), "providers": [{"network": "youtube"}],
        "text": desc, "firstCommentText": yt["pinned"],
        "youtubeData": {"title": title, "type": "short", "privacy": "public", "tags": tags,
                        "category": "EDUCATION", "madeForKids": False, "isAiGeneratedContent": True}}))

def sec(md, name):
    m = re.search(rf"^## {re.escape(name)}\s*\n(.*?)(?=^## |\Z)", md, re.S | re.M)
    return m.group(1).strip() if m else ""
ST01 = {
 "title": "She Makes $9,800 a Month… Here's the Tax Trap Coming in 2027",
 "desc": """Maya takes home about $9,800 a month and puts $1,000 into her TFSA every Monday. That's $52,000 a year, and a TFSA has a ceiling. We do her math with the CRA rules:

• TFSA room = this year's limit ($7,000 for 2026) + unused room from past years + last year's withdrawals
• Room builds from the year a resident of Canada turns 18: $62,500 for someone who turned 18 in 2017 and never contributed
• Excess amounts are taxed at 1% per month, on the highest excess in the month: about $1,547 in this example
• The TFSA room in your CRA account is updated once a year, and each bank sees only its own deposits
• Two jobs, two TD1 forms: don't claim the credits twice, and ask the second employer to deduct extra tax
• The fix in 5 steps: TD1, a deposit log, the FHSA ($8,000 a year; room starts when you open it), the RRSP (18% of last year's earned income, up to $33,810 for 2026), then a non-registered account

Based on a real situation a Canadian shared online; name and numbers changed. The 2027 limit ($7,000) and the 40% marginal rate are illustrations. General information, not tax advice.
Sources: canada.ca (CRA): TFSA contribution room; tax on excess TFSA amounts; TD1 forms; First Home Savings Account; RRSP deduction limit.
Shorter breakdowns on TikTok (taxsecretscanada) and Instagram (styleofcanada).

#TFSA #CanadaTax #PersonalFinanceCanada""",
 "tags": ["tfsa over contribution", "tfsa contribution room 2026", "tfsa penalty 1% per month", "tfsa limit 2026",
          "td1 two jobs", "fhsa canada", "rrsp vs tfsa", "canadian taxes", "personal finance canada"],
 "pinned": "If you had $5,000 left over every month, where would the first dollar go: FHSA, RRSP or TFSA?"}
for code, d, day, url in LONG:
    if code == "ST01":
        title, desc, tags, pinned = ST01["title"], ST01["desc"], ST01["tags"], ST01["pinned"]
    else:
        md = subprocess.check_output(["git", "-C", str(ROOT), "show", f"{LFB}:longform/{d}/PUBLISH.md"]).decode()
        title = re.search(r"^1\. \*\*(.+?)\*\*", sec(md, "Titles"), re.M).group(1)
        desc = sec(md, "Description")
        hk = sec(md, "Hashtags / keywords")
        hashtags = hk.splitlines()[0].strip()
        tags = [t.strip() for t in re.search(r"Keywords:\s*(.+)", hk).group(1).split(",")][:12]
        pinned = sec(md, "Pinned comment")
        if hashtags.startswith("#") and hashtags not in desc: desc += "\n\n" + hashtags
        if "taxsecretscanada" not in desc: desc += "\n\n" + YT[0]
    out.append(dict(p=code, net="youtube", info={**BASE, "media": [url], "publicationDate": dt(day, 16),
        "providers": [{"network": "youtube"}], "text": desc, "firstCommentText": pinned,
        "youtubeData": {"title": title, "type": "video", "privacy": "public", "tags": tags,
                        "category": "EDUCATION", "madeForKids": False, "isAiGeneratedContent": True}}))
for o in out:
    assert len(o["info"]["text"]) <= (5000 if o["net"] == "youtube" else 2200), (o["p"], o["net"], len(o["info"]["text"]))
    if o["net"] == "youtube": assert len(o["info"]["youtubeData"]["title"]) <= 100, o["p"]
json.dump(out, open(pathlib.Path(__file__).with_name("payloads.json"), "w"), ensure_ascii=False, indent=1)
print(len(out), "posts")
