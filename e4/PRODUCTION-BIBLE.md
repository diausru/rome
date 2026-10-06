# Production Bible: "GIS: the benefit low-income seniors miss" (topic E4)

Order: `channel/PUBLISHING-PLAN.md` §4, week 3 (after RRSP vs TFSA). Approved look (Kit + Plate); pensions group (Fraunces headings, `pension` music).
Voiceover package: `e4/VOICEOVER.md`. Timeline: `showreel/src/e4-timeline.json`. Publish package: `e4/PUBLISH.md`.

## 1. Research record (REAL TAX INFORMATION MODE)
canada.ca is egress-blocked here; claims read from canada.ca search-result text (restricted to canada.ca, 2026-10-06).

| # | Claim used | Source |
|---|---|---|
| R1 | The GIS is a monthly, tax-free payment for people 65+ who receive the OAS pension, live in Canada, aren't under a sponsorship agreement, and have income below the threshold | Service Canada, "Guaranteed Income Supplement – Overview"; "– Do you qualify" (…/old-age-security/guaranteed-income-supplement/eligibility.html) |
| R2 | Single, divorced or widowed: annual income under $23,112; maximum up to $1,138.90 a month (Oct–Dec 2026); amounts adjusted every January, April, July and October | Service Canada, "GIS: How much you could receive" (…/benefit-amount.html) |
| R3 | Couples: combined income thresholds of $30,528 (both receive full OAS) up to $42,768–$55,392 in other situations (context; on screen only as "couples have other thresholds") | same pages |
| R4 | Income used for the GIS doesn't include the OAS pension | CRA / Service Canada GIS pages; OAS program toolkit |
| R5 | Eligibility is reviewed each year when you file your taxes; some people are enrolled automatically at 65 | Service Canada GIS overview / receiving pages |
| R6 | TFSA income and withdrawals don't reduce federal income-tested benefits, including the GIS | CRA "What is a TFSA" |
| R7 | Employment and self-employment income: the first $5,000 doesn't reduce the GIS; 50% of the next $10,000 (from $5,000 to $15,000) is exempt | canada.ca (Service Canada / budget implementation pages, search text) |
| R8 | You can't receive the GIS while you're delaying your OAS pension | Service Canada, "OAS – When to start your pension" |
| R9 | ESDC estimate: in 2015, about 240,000 eligible seniors didn't receive the GIS; the take-up rate averaged ~89% over 2006–2015 | ESDC, "Take-up rate of the Guaranteed Income Supplement: findings from tax and program administrative data" |
| R10 | GIS is reported on line 14600 and deducted on line 25000 (not taxed) (context) | CRA lines 14600 / 25000 |

### Exceptions, dependencies, advice
- Couples and allowance recipients: different thresholds and amounts (not detailed).
- Income is generally the previous year's income from the tax return; a change in circumstances can change the amount. Not detailed: "general info, not advice".
- The 2015 statistic is dated; it is labelled "ESDC estimate · 2015" on screen and in the VO.

### Claims deliberately NOT made
- That the viewer "will" get the maximum (it's "up to").
- Any current (post-2015) count of missed recipients.

## 2. Project
| Field | Value |
|---|---|
| PLATE | `public/plates/e4-4k.jpg` (Higgsfield gpt_image_2_5, 2 variants 0.5 credits + 4K upscale 2 credits; checked: no text or numbers): a senior in a cardigan watering plants at a snowy window in a modest apartment; on the table, tea, reading glasses, an unmarked envelope, a coin purse with coins, a pen |
| CAMERA | senior → table → envelope ("up to $1,138.90" pinned on it) → senior (who qualifies) → coin purse (what doesn't count) → pen (file every year) → senior (delay trap) → wide |
| LIVE ELEMENTS | snow in the window; steam over the tea |
| MUSIC | `tools/music.py pension`, −24 LUFS, ducked |
| VOICE | Grady (no regeneration or speed-up if the VO lands between 45 s and 1:10, per the user rule) |
| RENDER | 1080×1920, 24 fps, 1500 frames (62.50 s; the VO is 62.0 s, inside the 45 s–1:10 tolerance, so no audio rework) |

## Revision log
- VO: two lines were stuck in the provider queue for over 15 minutes (already charged) → those two were regenerated once (0.9 credits); all other lines are first takes. 62.0 s, inside the tolerance, so no speed-up.
- Stills QC: the amount pinned on the envelope sat under the bottom grade → the bottom grade lifts while the pin is shown; the 240,000 card was empty at first → its line enters first; the strip duplicated the pinned amount → the strip starts at "who qualifies".
