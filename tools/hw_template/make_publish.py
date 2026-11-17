"""Build PUBLISH.md (FINAL DELIVERY structure) from publish.json + extra notes. Usage: python3 make_publish.py"""
import json
d = json.load(open('publish.json')); y, t, i, e, s = d['yt'], d['tt'], d['ig'], d['eng'], d['seo']
X = json.load(open('publish_extra.json'))
src = "\n\n".join("Source: " + x.split(" · ")[0] + "\nClaim supported: " + " · ".join(x.split(" · ")[2:]) + "\nTax year: " + x.split(" · ")[1] for x in d['sources'][:-1])
nxt = "\n\n".join(f"{k+1}. {n['topic']}\n   Why it has potential: {n['why']}\n   Primary search intent: {n['intent']}\n   Hook: {n['hook']}\n   Curiosity angle: {n['angle']}\n   Payoff: {n['payoff']}" for k, n in enumerate(d['next']))
md = f"""========================================
TAX SECRETS CANADA
REALISTIC HANDWRITTEN EXPLAINER

VIDEO
Title: {y['titles'][0]}
Duration: {d['video']['duration']}
Resolution: 1080×1920 (9:16)
FPS: 24
Render method: Code-built composite (Python / OpenCV), the B4 engine: still desk plate + matted whole-hand photo (no video generator), wrist-pivot hand motion with the pen tip on the ink head, single-line font ink revealed only along the pen path, living window light, code-made coffee steam, handheld camera with push-ins on circled figures, 180° motion blur on big hand moves, grain. Ending: handwritten curiosity-loop CTA. Narration: ElevenLabs via Higgsfield text2speech_v2 (series voice "Grady"), long pauses shortened to 0.38 s, no tempo change, −14 LUFS, limiter.
Final MP4: {d['video']['mp4']} (build outputs, not in git).
Publishing Kit: https://claude.ai/artifact/6LfkQdgNBtoZTiy2WEYSiK (card "{d['_label']}")

⸻

VOICEOVER

{d['_vo']}

({X['vo_stats']})

⸻

VOICEOVER TIMECODES

{d['_votc']}

Audio cue points: {X['cues']}

⸻

DRAWING TIMELINE

{X['drawing']}

⸻

FACT SOURCES

{src}

{d['sources'][-1]}

⸻

YOUTUBE SHORTS

Primary Title: {y['titles'][0]}
Alternative A: {y['titles'][1]}
Alternative B: {y['titles'][2]}

Description:
{y['description']}

Hashtags:
{y['hashtags']}

Keywords:
{y['keywords']}

Pinned Comment:
{y['pinned']}

CTA:
{y['cta']}

⸻

TIKTOK

Caption:
{t['caption']}

Search Keywords:
{t['keywords']}

Hashtags:
{t['hashtags']}

Pinned Comment:
{t['pinned']}

CTA:
{t['cta']}

⸻

INSTAGRAM REELS

Caption:
{i['caption']}

Search Keywords:
{i['keywords']}

Hashtags:
{i['hashtags']}

Pinned Comment:
{i['pinned']}

CTA:
{i['cta']}

⸻

ENGAGEMENT

Primary Question: {e['question']}
Save Trigger: {e['save']}
Share Trigger: {e['share']}
Follow Reason: {e['follow']}

⸻

SEO ANALYSIS

Primary keyword: {s['primary']}
Secondary: {s['secondary']}
Intent: {s['intent']}
Audience: {s['audience']}
Angle: {s['angle']}
Viewer questions: {s['questions']}
Pain point: {s['pain']}

⸻

NEXT 3 TOPICS

{nxt}

Series fit: {d['series']}
========================================

## Research notes
{d['research']}

## Retention analysis
{d['retention']}
"""
open('PUBLISH.md', 'w').write(md)
