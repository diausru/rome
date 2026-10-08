# Production Bible: "Year-end moves before December 31" (topic C5)

Order: `channel/PUBLISHING-PLAN.md` §4, week 8 (Tue, late November). Approved look (Kit + Plate), series upgrade (three scenes + bridge CTA). Planning group: Mont (SANS) headings, `pension` music. First video with the FULL vidIQ analysis (user, 2026-10-08).
Voiceover: `c5/VOICEOVER.md`. Timeline: `showreel/src/c5-timeline.json`. Composition: `showreel/src/C5v2.tsx`. Publish: `c5/PUBLISH.md`. Analysis page: https://claude.ai/artifact/RRkmrErYvZhuHxYG6GpXbQ (`channel/analysis/c5-analysis.html`).

## 0. vidIQ analysis (before the script), 2026-10-08
| Call | Result |
|---|---|
| keyword_research (research, CA) "year end tax planning canada" | seed <750/mo; "year end tax planning" ≈3,940/mo (competition 30.5, overall 60.0); "tax planning" ≈17,072/mo (+21.8% vs baseline); "tax tips" ≈9,624/mo; "tfsa" ≈20,925/mo; "rrsp" ≈5,076/mo; "canadian taxes" ≈3,954/mo; "cra" ≈29,128/mo (+9.8%) |
| keyword_research (questions) "tax before december 31", "tfsa withdrawal" | no indexed question keywords (both) |
| outliers (shorts, 1 year) "year end tax tips canada before december 31" | no Canadian year-end tax Short among the outliers; closest: Aviva UK "make the most of my money before the tax year ends" (52K views, breakout ×89.6), Hidden Money Podcast "Smart Year-End Tax Planning FAQ" (18.5K, ×15) |
| youtube_search (CA, by views, since Sep 2024) "year end tax planning canada" | Michael Kim CPA "DO THIS to PAY LESS TAXES in Canada in 2026" 322K (11:54, outlier ×209); Canadian in a T-Shirt "Do This BEFORE Dec 31 – Canadian Tax Tips (2025)" 120K (6:33, 403 comments: FHSA, RESP, TFSA, RRSP); Canada Tried and Tested 12.3K (14:19); BNN Bloomberg / Golombek TFSA timing 8.3K + 7.4K (55-s clip); adviice 3.3K; RealEstateTaxTips 6.7K (27:52) |
| comment_insights (validate) "60-second Dec 31 checklist" | 94 channels, 95 threads: insufficient direct evidence (one adjacent thread about TFSA/RRSP limits) |
Conclusion: demand is seasonal and real ("year end tax planning" ≈3.9K/mo, "tax planning" rising), long videos dominate, no Canadian Short does a verified Dec-31 checklist → our gap. Title must carry "Before Dec 31" + "Canada". The TFSA-timing point is the one big media (BNN/Golombek) leads with → keep it.
Credits: whole analysis incl. three title scores = 75 by balance (1,850 → 1,775).

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (direct fetch blocked by the network proxy; facts from canada.ca page text via search restricted to canada.ca), 2026-10-08.

| # | Claim used | Source · year |
|---|---|---|
| R1 | Donations made by December 31 of the year (plus unclaimed gifts of the previous 5 years) can be claimed for that year; an official receipt from a qualified donee is required | CRA P113 Gifts and Income Tax; "How to claim" line 34900 · current |
| R2 | A TFSA withdrawal is added back to contribution room on January 1 of the following calendar year; re-contributing in the same year without room is an excess taxed 1% per month | CRA "Withdrawing from a TFSA" · current |
| R3 | FHSA participation room is $8,000 in the year you open your first FHSA; unused room carries forward, max $8,000; lifetime limit $40,000 | CRA "Participating in your FHSAs" · current |
| R4 | Basic CESG: 20% of the first $2,500 contributed per year (max $500); unused grant room carries forward, up to $1,000 of CESG per year; lifetime $7,200 | canada.ca CESG / "How much money can be added to RESPs" · current |
| R5 | RRSP contributions made in the first 60 days of the next year can be deducted for the year; you can contribute until December 31 of the year you turn 71 | CRA "Important dates for RRSPs…"; "RRSP options when you turn 71" · current |

### Dependencies, exceptions, notes
- FHSA: only first-time home buyers aged 18+ resident in Canada can open one (card label "first-time home buyers"); not every viewer qualifies.
- RESP: the $500 is the basic CESG; Additional CESG and the Canada Learning Bond are income-tested (not covered). The "$2,500 → $500" is per beneficiary.
- RRSP: the exact 2026 deadline (March 1, 2027) is our calculation from the 60-day rule; CRA's 2026 date page was not found, so the screen says "+60 days", not a date.
- Tax-loss selling at year end was dropped: canada.ca text found does not settle trade vs settlement date for the year of the loss. Not claimed.
- Medical expenses (12-month period), RRIF minimums, instalments: not covered.

### Claims deliberately NOT made
- A deadline date for tax-loss selling; a dollar tax saving for any move.

## 2. Project
| Field | Value |
|---|---|
| SCENES | Three plates of the same woman (scene 1 job b2131011 as image reference; gpt_image_2_5 + 4K upscale each; checked: no text, calendars, clocks or logos): 1) `c5-s1-4k.jpg` early December, hanging string lights, envelope and phone on the counter (hook → tfsa); 2) `c5-s2-4k.jpg` with her son by the tree, a toy house and a piggy bank (fhsa → resp); 3) `c5-s3-4k.jpg` New Year's Eve toast with her partner, the son asleep (rrsp → end). Cuts at `fhsa` and `rrsp` with SceneCuts |
| PINS | envelope "by Dec 31" · phone "room back Jan 1" · toy house "$8,000 room" · piggy bank "+$500 grant" · envelope "60 days into 2027" |
| STRIP | ✓ donations · ✓ TFSA timing · ✓ FHSA opened · ✓ RESP $2,500 · RRSP +60 days |
| LIVE | code snow behind both windows; steam over the cocoa |
| VOICE | Grady; 146 words; first assembly 71.78 s → `tempo` 1.04 in vo_hf (no new credits) → 69.16 s; bridge CTA "Next: what actually makes CRA review your return. Follow so you don't miss it." |
| RENDER | 1080×1920, 24 fps |

## 3. QC log
