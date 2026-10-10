# Production Bible: "Down on a stock? Sell by December 30" (New Year extra, project `ny`)

Extra video added by the user, published **Tue Dec 29, 2026**. Topic history: the first proposal (TFSA room on Jan 1) was declined by the user ("Нет другую тему хочу"); the user then picked "before December 31", which overlaps C5 ("Year-end moves before December 31", scheduled Dec 9: donations, TFSA timing, FHSA, RESP, RRSP myth), so the user chose the non-overlapping angle: tax-loss selling and the superficial loss rule. Approved look (Kit + Plate), three scenes + bridge CTA. Mont (SANS), music `work` (upbeat).
Analysis page: https://claude.ai/artifact/6PxwqnffmAUWwvcP4LBG9q (`channel/analysis/ny-analysis.html`).
Voiceover: `ny/VOICEOVER.md`. Timeline: `showreel/src/ny-timeline.json`. Composition: `showreel/src/NyV2.tsx`. Publish: `ny/PUBLISH.md`.

## Coordination check, 2026-10-10
- Handwritten session: latest B2 / B10, NEXT 3 = self-employed topics; no investment-loss topic → no overlap.
- Card series: C5 covers other Dec 31 moves (not losses); F1 mentions loss carryback/forward in one line → this video does not repeat carryback, it covers the year-end timing, the settlement date, the superficial loss and registered plans.
- Bridge in: the Christmas extra (`xmas`) CTA was changed from "TFSA room" to this topic and re-rendered. Bridge out: the next post in the feed is #23 T1135 (Dec 30) → "Next: the CRA form for investments outside Canada."

## 0. vidIQ analysis (cap 25 credits), 2026-10-10
| Call | Result |
|---|---|
| keyword_research (research, CA) "tax loss harvesting canada" | seed <750/mo (competition 16.5); "tax loss harvesting" ≈11,326 (54); "tax loss harvesting explained" ≈10,196 (46); "what is tax loss harvesting" ≈4,829 (33.8); "capital gains canada" ≈3,936 (15.5); "superficial loss rule", "capital loss canada", "year end tax tips canada" <750 |
| youtube_search (CA, by views) "tax loss selling canada superficial loss" | Hudson Bay Finance "Adjusted Cost Base Mistakes…" 35K (13:25); Justin Bender "Tax-Loss Selling with ETFs" 9.6K (16:41); The Independent Dollar "Why CRA Will Deny Your Capital Loss" 7.5K (11:07); Financial Nirvana Mama 5.6K (9:02); all long-form, small |
| outliers (shorts, 1 year) "tax loss harvesting" | no relevant Short (results were farm-harvest clips) |
| score_title × 2 | "Down on a Stock? Sell Before December 30 (Canada Tax-Loss Selling)" **92** · "Tax Loss Harvesting in Canada: The December 30 Deadline" **80** |
My calls = 25 credits. Balance 1,490 → 1,465.
Conclusion: strong global demand for the term (≈11K/mo), Canadian phrasings tiny, Canadian competitors long and small; no Short gives the Canadian year-end mechanics (T+1, settlement date, superficial loss).

## 1. Research record (REAL TAX INFORMATION MODE), 2026-10-10
| # | Claim used | Source |
|---|---|---|
| R1 | Allowable capital losses are deducted only against taxable capital gains (not other income) | CRA "Capital losses" (line 12700 pages); T4037 2025 |
| R2 | Capital gains inclusion rate one-half | Finance Canada 2026 backgrounder; CRA "What's new" |
| R3 | For shares sold on an exchange, CRA considers the settlement date the date of disposition | CRA technical interpretation 2012-0468931C6 (TEI roundtable, May 2012), continuing cancelled IT-133; reported by taxinterpretations.com and Thor Law |
| R4 | Canadian equity and ETF trades settle T+1 since May 27, 2024 | Canadian Securities Administrators news release, 2024-05-27 (BCSC / ASC / AMF copies) |
| R5 | 2026: last trade date for a 2026 sale = Wed Dec 30 (settles Thu Dec 31); a Dec 31 trade settles in 2027 | follows from R3 + R4; corroborated by CIBC "2026 Year-End Tax Roadmap" and TMX "A Primer on Tax-Loss Selling"; on screen "confirm with your broker" |
| R6 | Superficial loss: you or an affiliated person (e.g. your spouse or common-law partner, a corporation you control) acquire the same or identical property in the 30 days before or after the disposition and still own it 30 days after → the loss is denied | CRA "What is a superficial loss" / Capital losses; T4037 |
| R7 | The denied superficial loss can usually be added to the ACB of the substituted property (if you acquired it) | same CRA pages |
| R8 | Losses inside a TFSA or RRSP cannot be claimed as capital losses | CRA "Before you contribute to a TFSA"; T4040 (RRSPs) |

### Example (not a CRA rule)
Gain $12,000 on one stock + loss $8,000 sold on another in the same year → net capital gain $4,000 → taxable half $2,000 (instead of $12,000 × ½ = $6,000 without the sale). Tax owed depends on the province and other income (not computed).

### Dependencies and limits
- Not covered: repurchase inside your TFSA/RRSP (CRA treats the plan as affiliated in some interpretations; not verified on canada.ca → not said), "identical property" questions (similar ETFs), US-listed securities settlement, holiday calendars other than 2026, crypto timing, corporations/trusts (different rule), loss carryback/forward (covered in F1).
- "Usually" added to cost: applies when you (not a different affiliated person) acquire the substituted property; the screen says "usually".

## 2. Project
| Field | Value |
|---|---|
| SCENES | Three plates of the same woman (early 40s) in a Toronto apartment with the CN Tower outside (variant 029f chosen over 8031, which showed the Empire State Building, i.e. New York), image reference for 2–3, each upscaled to 4K: 1) `ny-s1-4k.jpg` late-December evening at the laptop (lid only, no screen), snow (hook, rule); 2) `ny-s2-4k.jpg` the morning of Dec 30, blank paper, a calculator with a blank display (example, date); 3) `ny-s3-4k.jpg` New Year's Eve with her husband, champagne, fireworks over the skyline (trap → end). Cuts at `example` and `trap`. Text check: the champagne bottle carried pseudo-lettering and an emblem on the neck → covered in code by a feathered local blur (reads as foreground defocus); everything else clean |
| PINS | calculator "taxable: $2,000 instead of $6,000" |
| STRIP | 1 losses offset gains only · 2 ½ of the net gain taxed · 3 sell by Dec 30 (T+1) · ✕ buy back within 30 days · ✕ losses in a TFSA / RRSP (moves under the low cards in scene 3) |
| VOICE | Grady; 9 beats; 147 words; 65.79 s (draft 198 words ≈87 s → cut; the carryback beat dropped as F1 covers it) |
| RENDER | 1080×1920, 24 fps, 1591 frames (66.29 s) |

## 3. QC log
- Stills v1: in scene 3 the top card covered the couple's faces → scene-3 cards moved to the lower third (top 1150), strip moved under them, camera keys adjusted; bottle blur patch first misplaced (below the neck) → moved onto the neck and re-checked at full resolution (frames 1300, 1400): no legible lettering.
- Final: 1591 frames, 66.29 s, h264 1080×1920 24 fps + AAC 48 kHz, decode OK, −14.0 LUFS; contact sheet checked (cards, pin, strip in both positions, both scene cuts, end block, flag, footer). vidIQ titles 92 / 80 → primary "Down on a Stock? Sell Before December 30 (Canada Tax-Loss Selling)". Kit card #26 (Kit v34). Metricool: not sent; needs `ny-share.mp4` in the Drive folder, then TT 10:00 / IG 11:00 / YT 16:00 on Tue Dec 29 (America/Winnipeg).
