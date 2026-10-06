# Production Bible: "CPP at 60, 65 or 70?" (topic E1)

Order: `channel/PUBLISHING-PLAN.md` §4, week 2 (after the OAS clawback). First topic produced directly in the approved look (photo plate + motivated camera + minimal cards: `showreel/src/Kit.tsx`, `Plate.tsx`).
Voiceover package: `e1/VOICEOVER.md`. Master timeline: `showreel/src/e1-timeline.json`. Publish package: `e1/PUBLISH.md`. Earlier notes: `e1/RESEARCH-NOTES.md`.

## 1. Research record (REAL TAX INFORMATION MODE)
canada.ca is egress-blocked here; claims were read from canada.ca search-result text (searches restricted to canada.ca, 2026-10-06).

### General information (rules)
| # | Claim used | Source |
|---|---|---|
| R1 | The CPP retirement pension can start from 60 to 70; standard age 65 | Service Canada, "CPP retirement pension: When to start your pension" (…/publicpensions/cpp/when-start.html) |
| R2 | Before 65: −0.6% per month (7.2%/yr), up to −36% at 60; a permanent reduction | same page; Retirement Hub "Deciding when to start your public pensions" |
| R3 | After 65: +0.7% per month (8.4%/yr), up to +42% at 70; no advantage to waiting past 70 | same page |
| R4 | From 60 to 70 the monthly amount can more than double | Retirement Hub (retraite-retirement.service.canada.ca/en/learn/deciding-when-to-start-your-public-pensions); arithmetic: 1.42 / 0.64 = 2.22 |
| R5 | About a 50% chance that people retiring today live to 90; 65-year-olds can expect at least another 20 years | Retirement Hub, same page |
| R6 | Consider starting earlier with major health risks or a serious illness (without CPP disability) or reason to expect a shorter life; consider later with good health and an expected long retirement | Retirement Hub, same page |
| R7 | CPP is taxable income and is indexed to inflation every January (context; not on screen) | canada.ca CPP pages / CPP annual reports |
| R8 | 2026 maximum at 65: $1,507.65/month; average for new beneficiaries (July 2026): $858.34 (context; not on screen) | Service Canada, "CPP payment amounts" |

### Example (NOT a rule; labelled EXAMPLE on screen)
$1,000 a month at 65 → $640 at 60 (×0.64), $1,420 at 70 (×1.42).
Break-even, simplified (labelled "simplified… ignoring inflation, tax and returns"): 65 vs 70: 1,420(X−70) = 1,000(X−65) → X = 81.9 ("≈ age 82"). (60 vs 65 ≈ 73.9; computed, not shown.)

### Dependencies and exceptions
- Health and life expectancy (stated: R6).
- Other income: CPP is taxable and can affect income-tested benefits (OAS recovery, GIS). Not detailed; "Run your own numbers, and get advice."
- Survivor benefits, still working (post-retirement benefit), the CPP disability pension: not covered; "get advice".
- The real amount depends on the contribution history; $1,000 is an example, not an average.

### Claims deliberately NOT made
- "Always wait to 70" or "always take it at 60".
- A secondary source's "$917 vs $2,035" (it doesn't match 64% / 142% of the $1,507.65 maximum).

## 2. Project
| Field | Value |
|---|---|
| STORY | Hook 60 / 65 / 70 → three cheques → early −36% → late +42% → example pinned onto three real coin stacks → break-even ≈ 82 → about half reach 90 → it depends on health → a lifetime decision → CTA |
| PLATE | `public/plates/e1-4k.jpg` (Higgsfield gpt_image_2_5, 2 variants 0.5 credits + 4K upscale 2 credits; checked: no text or numbers): a brass hourglass and three coin stacks growing left → right on a lakeside rail, a couple in their sixties walking a golden retriever on an autumn boardwalk, golden hour |
| CAMERA | Motivated: couple → props → hourglass (early) → tall stack (late) → all stacks (example) → hourglass (break-even) → couple (odds, health) → wide; glide 40 frames, slow push, 0.8 px blur |
| SIGNATURE MOMENT | In the example the card moves to the sky and the amounts ($640 / $1,000 / $1,420) are pinned onto the real coin stacks, in VO order |
| STRIP | 60 −36% → 70 +42% → break-even ≈ 82 |
| MUSIC | `tools/music.py pension` (72 BPM, D major), −24 LUFS, ducked; final mix −13.9 LUFS |
| VOICE | Grady; 118 words; atempo 1.03 → 59.24 s |
| RENDER | 1080×1920, 24 fps, 1428 frames (59.50 s) |

## Revision log
- VO: 60.79 s → atempo 1.03 → 59.24 s (no regeneration).
- Stills QC: the "IT DEPENDS" card wrapped and overlapped → split into two short rows (question + outcome).
- Render 1 verified (1428 frames, 59.50 s, clean decode, −14.0 LUFS). QC: the START AT 60 / WAIT TO 70 cards stood empty about 3.5 s before the total appeared → the monthly rate (−0.6%/month, +0.7%/month) now shows first and swaps to −36% / +42% on the VO word (Kit Hero `out`); lines shortened. Final render in progress.
- Final: re-rendered and verified. 1080×1920, 24 fps, 1428 frames, 59.50 s, clean decode, AAC 48 kHz, −14.0 LUFS; rate→total swap checked on frames 300/360/480/560. Share copy e1-share.mp4 (CRF 20, 14.5 MB).
