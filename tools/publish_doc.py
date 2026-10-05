#!/usr/bin/env python3
"""Build <project>/PUBLISH.md in the FINAL DELIVERY structure. usage: tools/publish_doc.py <content.json> <timeline.json> <out.md>"""
import json, sys
c, t = json.load(open(sys.argv[1])), json.load(open(sys.argv[2]))
def tc(x): m = int(x // 60); return f"{m:02d}:{x - 60 * m:05.2f}"
L = lambda xs: "\n".join(xs)
md = f"""========================================
TAX SECRETS CANADA — FINAL DELIVERY

VIDEO
Title: {c['video']['title']}
Duration: {c['video']['duration']}
Resolution: 1080×1920 (9:16)
FPS: 24
MP4: {c['video']['mp4']}

VOICEOVER
{" ".join(b['text'] for b in t['beats'])}

VOICEOVER TIMECODES
{L(f"[{tc(b['start'])}–{tc(b['end'])}] {b['text']}" for b in t['beats'])}

FACT SOURCES
{L(f"- {s}" for s in c['sources'])}

⸻
YOUTUBE SHORTS

Primary Title: {c['yt']['titles'][0]}
Alternative Title A: {c['yt']['titles'][1]}
Alternative Title B: {c['yt']['titles'][2]}

Description:
{c['yt']['description']}

Hashtags:
{c['yt']['hashtags']}

Keywords:
{c['yt']['keywords']}

Pinned Comment:
{c['yt']['pinned']}

CTA:
{c['yt']['cta']}

⸻
TIKTOK

Caption:
{c['tt']['caption']}

Search Keywords:
{c['tt']['keywords']}

Hashtags:
{c['tt']['hashtags']}

Pinned Comment:
{c['tt']['pinned']}

CTA:
{c['tt']['cta']}

⸻
INSTAGRAM REELS

Caption:
{c['ig']['caption']}

Search Keywords:
{c['ig']['keywords']}

Hashtags:
{c['ig']['hashtags']}

Pinned Comment:
{c['ig']['pinned']}

CTA:
{c['ig']['cta']}

⸻
ENGAGEMENT STRATEGY

Primary Discussion Question: {c['eng']['question']}
Save Trigger: {c['eng']['save']}
Share Trigger: {c['eng']['share']}
Follow Reason: {c['eng']['follow']}

⸻
SEO ANALYSIS

Primary Keyword: {c['seo']['primary']}
Secondary Keywords: {c['seo']['secondary']}
Search Intent: {c['seo']['intent']}
Search Questions: {c['seo'].get('questions','')}
Pain / Curiosity: {c['seo'].get('pain','')}
Target Audience: {c['seo']['audience']}
Curiosity Angle: {c['seo']['angle']}

⸻
NEXT CONTENT OPPORTUNITIES

{L(f"Next Topic #{i+1}: {n['topic']}{chr(10)}  Why it matters: {n['why']}{chr(10)}  Search intent: {n['intent']}{chr(10)}  Hook: {n['hook']}{chr(10)}  Curiosity angle: {n['angle']}{chr(10)}  Payoff: {n['payoff']}{chr(10)}" for i, n in enumerate(c['next']))}
Series: {c['series']}
========================================

## Research notes (how this package was built)
{c['research']}

## Retention analysis
{c['retention']}
"""
open(sys.argv[3], 'w').write(md); print('written', sys.argv[3], len(md))
