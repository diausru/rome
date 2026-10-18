"""Build Metricool payloads for the Jan-Feb 2027 batch (11 card reels) with cross-platform promo."""
import json, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[3]
TZ = "America/Winnipeg"
# order follows the "Next:" bridge chain; Mon/Wed/Fri after the last scheduled day (2027-01-08)
PLAN = [("d1","2027-01-11","1lmuQReSnE3ZgwIOrUx93AmUqTNt0oPi-",42000),
        ("h4","2027-01-13","1kNaf7XJjoatquC8-jRKNBBlLjKzLTAyA",39000),
        ("a1","2027-01-15","1wghHRqhk6FkA2rYEhBqpYiPmYolN3L9o",49000),
        ("a5","2027-01-18","1tBxDO6hzLrej1RUEad42D9CiHZlmJVJx",39000),
        ("a8","2027-01-20","1a_Q_KUuLtSMUwtIc1fCHlSyPETCKOlav",47600),
        ("a2","2027-01-22","1k4K6pF0xgFWd4EhPI7Ns_wN7Lw8enY0j",38300),
        ("a9","2027-01-25","1rJS9GqHzhpDf-EgAqbSK0xv8IBHzdwAc",48600),
        ("h1","2027-01-27","1qJw7hW9loT3LyEwSUgRPHd-30X1YkcpE",32650),
        ("c1","2027-01-29","1L4pLy9iUgWW3BMewJB2HSHh-2W3icf5C",34590),
        ("c2","2027-02-01","1qCD0VwCTWzt2aUmicSlFBqJGcx2aZOAQ",43450),
        ("d4","2027-02-03","1eFr-Y8sL9ZOo1UElIfqF_1E9E4kTwgWM",34580)]
# Handles: YouTube @TaxSecretsCanada (channel UCkusKITaZjDo7CSWTFDFGng), TikTok @taxsecretscanada, Instagram @styleofcanada.
# Caption links are not clickable on Shorts/IG/TikTok, and an "@" tags an account on the SAME platform,
# so other platforms' handles are written without "@" (search-friendly names). Wording rotates per post.
YT = ["More quick tax checks on TikTok (taxsecretscanada) and Instagram (styleofcanada).",
      "Also on TikTok: taxsecretscanada · Instagram: styleofcanada. Same facts, new examples.",
      "Watching here? We post short tax checks on TikTok (taxsecretscanada) and Instagram (styleofcanada) too."]
TT = ["Full-length breakdowns on YouTube: search Tax Secrets Canada · Instagram: styleofcanada",
      "Want the long version? YouTube: Tax Secrets Canada. Checklists on Instagram: styleofcanada",
      "Deeper dives on YouTube (Tax Secrets Canada) · also on Instagram: styleofcanada"]
IG = ["🎥 Full-length breakdowns on YouTube: search Tax Secrets Canada\n🎵 TikTok: taxsecretscanada",
      "Long version on YouTube → Tax Secrets Canada · TikTok → taxsecretscanada",
      "▶️ YouTube: Tax Secrets Canada for deeper dives · TikTok: taxsecretscanada"]
def dt(d, h): return {"dateTime": f"{d}T{h}:00:00", "timezone": TZ}
out = []
for i, (p, day, fid, ms) in enumerate(PLAN):
    j = json.load(open(ROOT / p / "publish.json"))
    media = [f"https://drive.google.com/file/d/{fid}/view?usp=drivesdk"]
    yt, tt, ig = j["yt"], j["tt"], j["ig"]
    title = yt["titles"][0]
    desc = yt["description"]
    k = desc.rfind("\n\nSources:")
    promo = "\n\n" + YT[i % 3]
    desc = desc[:k] + promo + desc[k:] if k > 0 else desc + promo
    tags = [t.strip() for t in yt["keywords"].split(",") if t.strip()][:12]
    base = {"autoPublish": True, "draft": False, "descendants": [], "shortener": False,
            "smartLinkData": {"ids": []}, "media": media, "mediaAltText": [], "hasNotReadNotes": False}
    out.append(dict(p=p, net="tiktok", date=dt(day, 10), info={**base,
        "publicationDate": dt(day, 10), "providers": [{"network": "tiktok"}],
        "text": f"{tt['caption']}\n\n{TT[i % 3]}\n\n{tt['hashtags']}",
        "firstCommentText": tt["pinned"], "videoCoverMilliseconds": ms,
        "tiktokData": {"privacyOption": "PUBLIC_TO_EVERYONE", "title": title, "photoCoverIndex": 0, "isAigc": True}}))
    out.append(dict(p=p, net="instagram", date=dt(day, 11), info={**base,
        "publicationDate": dt(day, 11), "providers": [{"network": "instagram"}],
        "text": f"{ig['caption']}\n\n{IG[i % 3]}\n\n{ig['hashtags']}",
        "firstCommentText": ig["pinned"], "videoCoverMilliseconds": ms,
        "instagramData": {"type": "REEL", "showReelOnFeed": True, "isAiGenerated": True}}))
    out.append(dict(p=p, net="youtube", date=dt(day, 16), info={**base,
        "publicationDate": dt(day, 16), "providers": [{"network": "youtube"}],
        "text": desc, "firstCommentText": yt["pinned"],
        "youtubeData": {"title": title, "type": "short", "privacy": "public", "tags": tags,
                        "category": "EDUCATION", "madeForKids": False, "isAiGeneratedContent": True}}))
for o in out:
    assert len(o["info"]["text"]) <= (5000 if o["net"] == "youtube" else 2200), (o["p"], o["net"])
json.dump(out, open(pathlib.Path(__file__).with_name("payloads.json"), "w"), ensure_ascii=False, indent=1)
print(len(out), "posts")
