# Production Bible: B4 "How much of a $1,000 invoice is yours?" (Handwritten Explainer)

Mode: REALISTIC HANDWRITTEN EXPLAINER (`channel/HANDWRITTEN-ENGINE.md`). Governing rules: `/CLAUDE.md`, `short/MASTER-SYSTEM.md`.
Topic B4 in `channel/TOPICS.md` ("How much tax to set aside from every invoice"). Chosen for this mode because the whole answer is a calculation that can be watched being written (§3, §39).

**CURRENT VERSION:** v1 (see the revision log).

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
| Hand | `assets/hand_a_cut.png`: right hand with a black fine-liner, white cuff, navy sleeve (generated still, matted with Higgsfield background removal). Moved rigidly; never deformed |
| Pen physics | The pen tip is locked to the ink head; minimum-jerk pen-up moves with a lift (1.8% scale, the shadow separating); wrist rotation follows paper position; contact shadow toward the lower right (light from the upper left) |
| Light continuity | The hand is multiplied by an illumination map measured from the blank paper, so the blind shadows fall across the hand too |
| Ink | EMS Tech single-line font (SIL OFL, `hersheytext` 2.0.0), per-glyph jitter (offset, ±2° rotation, ±3% scale), 0.75 mm marker line, touch-down dots, fibre modulation, multiplied into the paper |
| Camera | Virtual camera on the plate: zoom 1.60 → 1.78 while writing (≈ the full writing width), follows the active line; pull back to 1.24 for the payoff; operator micro-motion |
| Typography | Handwriting only on the paper; a small sans footer (Manrope 500) with the assumptions and the source |
| Canadian identity | The paper flag in the plate, $ notation, CPP / MB / CRA terms |

## 4. Decisions
| # | Decision | Reason |
|---|---|---|
| B1 | Photographic hand plate + code-driven motion instead of a CG hand | TAX CASE #001 (D7): the reachable CG hand reads as a mannequin. Disclosed limitation: fingers do not flex while writing |
| B2 | The paper carries only key numbers and short notes; the narration explains | Real writing speed (≈110–150 mm/s pen tip at 8–12 mm letters) cannot fit long phrases into 60 s |
| B3 | Black ink only | One pen in the hand; a pen swap would need a second hand plate |
| B4 | Voice: ElevenLabs v4 "Harrison" (same as TAX CASE #001) | Channel consistency |

## 5. Revision log
- v1 (2026-10-06): writing speed 55 → 110 → 135 mm/s and pen-up overheads cut, because the writing lagged the narration by up to 4 s; text trimmed to key numbers; hand-retreats only when there is ≥0.9 s; camera widened (text was cropped on the left); the hand is in frame from frame 1 (the hook); sleeve extended past the frame edge; the hand relit by the paper's illumination map.
