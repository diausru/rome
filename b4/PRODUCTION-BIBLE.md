# Production Bible: B4 "How much of a $1,000 invoice is yours?" (Handwritten Explainer)

Mode: REALISTIC HANDWRITTEN EXPLAINER (`channel/HANDWRITTEN-ENGINE.md`). Governing rules: `/CLAUDE.md`, `short/MASTER-SYSTEM.md`.
Topic B4 in `channel/TOPICS.md` ("How much tax to set aside from every invoice"). Chosen for this mode because the whole answer is a calculation that can be watched being written (§3, §39).

**CURRENT VERSION:** v3 (see the revision log).

## 1. Content strategy
| Field | Value |
|---|---|
| Primary question | "I'm self-employed: how much of each invoice should I set aside for tax?" |
| Search intent | self employed taxes / how much tax to set aside (vidIQ CA, 2026-10-06: "self employed taxes" ≈4,780/mo; "tax tips canada" ≈5,298/mo, competition 8.3; exact phrase <750/mo) |
| Audience | Canadian freelancers, contractors and side-hustlers in their first years of self-employment |
| Curiosity gap | The $1,000 on the invoice is not $1,000 of income |
| Surprise | You pay BOTH halves of CPP; and the next dollar costs more than the average (≈36¢ vs ≈27%) |
| Payoff | Move ≈$270 of every $1,000 into a separate tax account the day it's paid; watch the instalment rule |

## 2. Facts (worked example, 2026, Manitoba, single, $60,000 net self-employment income, no other income, deductions or credits beyond the basic ones)
Calculator: `b4/calc.py`.

| Item | Value | Source |
|---|---|---|
| CPP, self-employed | 11.9% of (pensionable earnings − $3,500), YMPE $74,600; max $8,460.90 | CRA/ESDC 2026 figures as cited by wealthnorth.ca / carleton.ca TAXCITY 2026 (search, 2026-10-06); same YMPE/exemption as `salary/` (CRA T4127) |
| Deduction / credit split | Line 22200 deducts the "employer" half plus the first additional (enhanced) part of the employee half; line 31000 credits the base part | canada.ca, line 22200 and line 31000 pages (search summaries, 2026-10-06) |
| Federal 2026 | 14% to $58,523, 20.5% to $117,045 …; BPA $16,452 (no Canada employment amount for self-employment income) | CRA T4127 122nd ed., Jan 2026 (as in `salary/PRODUCTION-BIBLE.md`) |
| Manitoba 2026 | 10.8% to $47,000, 12.75% to $100,000, 17.4% above; BPA $15,780 | MB Budget 2025 bulletin; T4127 (as in `salary/`) |
| Instalments | Required for 2026 if net tax owing is more than $3,000 in 2026 AND in 2025 or 2024 ($1,800 in Québec) | canada.ca "Who has to pay — required tax instalments for individuals" (search summary, 2026-10-06) |

**Results:** CPP $6,723.50 · taxable income $56,073.25 · federal $5,155.43 · Manitoba $4,226.55 · total $16,105.48 = 26.84% of $60,000 → $268.42 per $1,000; marginal cost of the next $1 = $0.3556.
**On paper (rounded to the dollar):** CPP $6,724 · Federal $5,155 · MB $4,227 · total $16,106 (the sum of the rounded parts; exact $16,105.48) · ≈27% · next $1 ≈ 36¢ · set aside $270 (≈ $268, rounded to a practical figure; the narration says "about two hundred and seventy").
**Dependencies stated in the footer:** province, net (not gross) income, no other income, no RRSP or other deductions, single. A different province or income changes every number.
**Verification note:** canada.ca could not be opened directly from this container (egress blocked); claims were checked through canada.ca search results. Before publishing, open the line 22200 and instalments pages once.

## 3. Visual system
| Field | Value |
|---|---|
| Plate | `assets/plate_b.png`: overhead ~75°, walnut desk, blank sheet, late-afternoon window light with blind shadows, paper Canadian flag on a stand, black coffee mug, calculator edge, reading glasses (Higgsfield GPT Image 2.5, still plate, bible D2) |
| Hand | `assets/hand_c_cut.png` (v2): right hand with a black fine-liner, the WHOLE hand, wrist and cuff inside the photo, the sleeve leaving through the bottom edge (generated still, matted with Higgsfield background removal); the sleeve is extended past both photo edges so no photo border can enter the frame. Never deformed |
| Pen physics | Wrist-pivot model (v2): the wrist follows the pen path low-passed over 0.7 s; small strokes are made by rotating the hand about the wrist (≈2.5° per 8 mm letter), so the hand no longer translates with every letter. The pen tip is locked to the ink head; minimum-jerk pen-up moves with a lift (1.8% scale, the shadow separating); wrist rotation follows paper position; contact shadow toward the lower right (light from the upper left) |
| Light continuity | The hand is multiplied by an illumination map measured from the blank paper, so the blind shadows fall across the hand too |
| Ink | EMS Tech single-line font (SIL OFL, `hersheytext` 2.0.0), per-glyph jitter (offset, ±2° rotation, ±3% scale), 0.75 mm marker line, touch-down dots, fibre modulation, multiplied into the paper |
| Camera | Virtual camera on the plate (v3): opens wide (1.32) on the mug, steam and blank sheet, pushes in to 1.78 for writing and follows the active line; pushes in to ≈3.1 on every circled/underlined sum (≈27%, 36¢, $270) and holds while the narration lands it; final pull back to 1.24 over the whole page. Handheld operator motion from smoothed random noise (non-periodic), small roll and focus-breathing zoom |
| Living background | (v3) Window light breathes: a sun map of the blind stripes (paper illumination + desk luminance ratio, objects masked) is dimmed by two slow cloud passes (≈21 s, ≈45.5 s) and swayed a few px by a breeze; the hand and its shadow follow the same light. Code-made coffee steam (advected, domain-warped noise) curls over the mug, brighter in sun stripes |
| Motion blur | (v3) 180° shutter: line changes and retreats (pen-up moves > 15 mm) are rendered with 4–11 sub-frame samples; writing itself stays sharp |
| Typography | Handwriting only on the paper; a compact source tag (Manrope 600, 26 px) on a dark rounded plate at the top-left, outside the Shorts bottom UI zone (v2) |
| Canadian identity | The paper flag in the plate, $ notation, CPP / MB / CRA terms |

## 4. Decisions
| # | Decision | Reason |
|---|---|---|
| B1 | Photographic hand plate + code-driven motion instead of a CG hand | TAX CASE #001 (D7): the reachable CG hand reads as a mannequin. Disclosed limitation: fingers do not flex while writing |
| B2 | The paper carries only key numbers and short notes; the narration explains | Real writing speed (≈110–150 mm/s pen tip at 8–12 mm letters) cannot fit long phrases into 60 s |
| B3 | Black ink only | One pen in the hand; a pen swap would need a second hand plate |
| B4 | Voice (v2): ElevenLabs via Higgsfield text2speech_v2, preset "Grady" (repo rule from 2026-10-06). Long inner pauses shortened to 0.38 s and tempo ×1.07 (`vo/prep_grady.py`) so the narration fits 60 s | Series voice rule; Grady reads ≈6% slower than Harrison |

## 5. Revision log
- v1 (2026-10-06): writing speed 55 → 110 → 135 mm/s and pen-up overheads cut, because the writing lagged the narration by up to 4 s; text trimmed to key numbers; hand-retreats only when there is ≥0.9 s; camera widened (text was cropped on the left); the hand is in frame from frame 1 (the hook); sleeve extended past the frame edge; the hand relit by the paper's illumination map.
- v2 (2026-10-06, user feedback): "the hand is always cut off, it looks like a robot" → the first hand photo had the back of the hand touching the photo's right edge, so a straight cut appeared inside our frame; replaced by a photo with the whole hand inside (hand_c), sleeve extended past both edges, and a wrist-pivot motion model instead of rigid translation. "The text at the bottom is barely visible" → the footer line was wider than the frame and sat in the Shorts UI zone; now a two-line tag on a near-opaque dark plate (alpha 228/255) at the top-left; a first v2 render used alpha 150 and the handwriting scrolling underneath showed through, so it was raised and re-rendered. Voice switched to Grady (series rule), timeline re-cut to the new measured narration.
- v3 (2026-10-06, user direction: "natural camera, push in when we mark a sum, the background must move, maximum realism"): living window light and coffee steam, non-periodic handheld camera, push-ins on ≈27% / 36¢ (new underline) / $270, establishing wide at the start, 180° motion blur on big hand moves. A first try blurred the hand on every inter-letter move (wrist rotation read as speed), so the blur is limited to moves over 15 mm.
