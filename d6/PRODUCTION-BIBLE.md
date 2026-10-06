# Production Bible: "RRSP vs TFSA: how to decide" (topic D6, mechanics, not investment advice)

Order: `channel/PUBLISHING-PLAN.md` §4, week 3 (after RESP). Approved look (Kit + Plate). Savings group: Mont 900 headings; calm `pension2` music.
Voiceover package: `d6/VOICEOVER.md`. Timeline: `showreel/src/d6-timeline.json`. Publish package: `d6/PUBLISH.md`.
TOPICS.md marks D6 🔴 ("limits change yearly"): the 2026 limits below were re-verified at production time.

## 1. Research record (REAL TAX INFORMATION MODE)
canada.ca is egress-blocked here; claims read from canada.ca search-result text (restricted to canada.ca, 2026-10-06).

| # | Claim used | Source |
|---|---|---|
| R1 | 2026 TFSA dollar limit: $7,000, added to contribution room on Jan 1, 2026 | CRA, "Calculate your TFSA contribution room"; "MP, DB, RRSP, DPSP, ALDA, TFSA limits, YMPE and the YAMPE" |
| R2 | 2026 RRSP dollar limit: $33,810; the deduction limit is the lesser of 18% of the previous year's earned income and the annual limit (plus unused room, minus pension adjustments) | CRA limits page above; "How contributions affect your RRSP deduction limit" |
| R3 | Deductible RRSP contributions reduce your tax; withdrawals are income in the year withdrawn, with tax withheld | CRA "Registered Retirement Savings Plan (RRSP)"; "Withdrawing from your own RRSPs" |
| R4 | TFSA contributions aren't deductible; contributions and income earned are generally tax-free, even when withdrawn | CRA "What is a TFSA"; "Withdrawing from a TFSA" |
| R5 | Amounts withdrawn from a TFSA are added back as contribution room on Jan 1 of the next calendar year | CRA "Withdrawing from a TFSA"; "Calculate your TFSA contribution room" |
| R6 | TFSA income and withdrawals don't affect federal income-tested benefits (OAS, GIS) (context; not on screen) | CRA "What is a TFSA" |

### Example (an ILLUSTRATION, not a rule; labelled on screen)
$1,000 of pre-tax income; the money doubles; the same 30% marginal rate going in and coming out:
- RRSP: $1,000 deducted → $2,000 → −30% on withdrawal = $1,400.
- TFSA: −30% tax first = $700 → $1,400, tax-free.
- 20% rate later: RRSP $1,600 vs TFSA $1,400. 40% later: RRSP $1,200 vs TFSA $1,400.
All amounts are computed in code (`D6v2.tsx`: R = 0.3, G = 2).

### Dependencies (stated as "it depends on your rate later")
Future marginal rate (unknown); RRSP withdrawals can affect income-tested benefits (OAS recovery, GIS); available room (RRSP depends on earned income and pension adjustments; TFSA on age 18+, residency and past use); employer matching, the HBP / FHSA and other factors are not covered. Mechanics only, not investment advice.

### Claims deliberately NOT made
- "RRSP room is lost forever after a withdrawal" (only secondary-quality summaries were found; not shown).
- Cumulative TFSA room since 2009 (not verified on canada.ca in this pass).

## 2. Project
| Field | Value |
|---|---|
| PLATE | `public/plates/d6-4k.jpg` (Higgsfield gpt_image_2_5, 2 variants 0.5 credits + 4K upscale 2 credits; checked: no text, labels or numbers): two identical coin jars on an oak desk (left = RRSP, right = TFSA), a plant, a notebook and a pen; a woman with a mug and a phone by a window over a downtown skyline at golden hour |
| LAYOUT VARIANT | Cards at the top (y 360) for the whole video so the jars stay visible; the accounts' labels and the example amounts are pinned onto the real jars |
| CAMERA | both jars → the woman → RRSP jar → TFSA jar → both jars (example, verdict) → skyline (limits) → wide |
| MUSIC | `tools/music.py pension2`, −24 LUFS, ducked; mix −14.0 LUFS |
| VOICE | Grady; 124 words; atempo 1.03 → 59.44 s |
| RENDER | 1080×1920, 24 fps, 1428 frames (59.50 s) |

## Revision log
- VO v1 66.97 s → the hook and limits lines were shortened and regenerated (2 lines) → 60.99 s → atempo 1.03 → 59.44 s. A batch call timed out but had submitted; the five jobs were recovered from the generation history (no duplicate spend).
- Stills QC: the example label wrapped onto the first line → shortened; the TFSA lines wrapped → 40 px and a shorter room line.
