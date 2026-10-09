# Production Bible: B10 "Bigger salary, smaller tax on the same $10K side hustle" (Handwritten Explainer)

Mode: REALISTIC HANDWRITTEN EXPLAINER, series "Real Tax Math" (… → B8 → B9 → B10; engine `../b4/engine.py`). Governing rules: `/CLAUDE.md`, `short/MASTER-SYSTEM.md`, `channel/HANDWRITTEN-CTA.md`. Answers the B9 CTA ("And on a hundred-thousand-dollar salary? Should we run that one next?").

**CURRENT VERSION:** v1

## 1. Content strategy
| Field | Value |
|---|---|
| Primary question | "I earn $100K and have a $10K side hustle. What does it cost in tax?" |
| Search intent (vidIQ CA, 2026-10-08) | "cpp explained" ≈4,101/mo (15.4); "canada pension plan" ≈3,478/mo; "taxes for side hustles" ≈4,621/mo (B9) |
| Competitors | Under-served: one CPP-enhancement video (8K views); US salary-reality tax shorts break out (323K) |
| Hook | "Same ten-thousand-dollar side hustle. Bigger salary. Smaller tax bill. Here's why." |
| Surprise | Higher income-tax rate, but CPP $0 because the job already maxed CPP + CPP2 → $3,738 < $4,161 |

## 2. Facts
| Claim | Source | Year |
|---|---|---|
| Federal 20.5% from $58,523 to $117,045; MB 12.75% to $100,000, 17.4% above | CRA T4127 Jan 2026 (salary/, b4/) | 2026 |
| CPP 5.95% each side to YMPE $74,600 (exemption $3,500); CPP2 4% each side on $74,600–$85,000, max $416 / $832 SE | CRA 2026 (b4/; Payworks, Wagepoint, Canada Pension Map summaries, search 2026-10-08) | 2026 |
| Employment and self-employment earnings combined on Schedule 8; contributions already made count toward the annual maximum | Schedule 8 structure (b9/) | 2026 |

**Calculation (not a CRA rule, `calc.py`):** $100K salary: base TI $98,873 (enhanced CPP + CPP2 deductions); +$10K → $108,873. Federal $2,050.00; MB $1,127 × 12.75% + $8,873 × 17.4% = $1,687.59; CPP $0. Total $3,737.59. Reproduces B9's $60K case ($4,161.15). Difference $423.56.
**Dependencies:** province, other income/credits; $10K is net of expenses.

## 3. Ending CTA options (rotation rule)
| # | Option | Verdict |
|---|---|---|
| 1 | Arrow down the left margin from the double-underlined total → "same $10K in AB or ON?", both options circled | **Chosen**: a two-option vote (B9 was a yes/no; B8 an open question), one-word answer, picks the next video |
| 2 | "$150K salary next?" | Repeats B9's structure |
| 3 | "What's CPP2? Want the one-page version?" | Weaker tie to the total |
| 4 | "RRSP at $100K: how much back?" | Needs a new fact pass |
| 5 | "What should we break down next?" | Universal fallback |

## 4. Decisions
| # | Decision | Reason |
|---|---|---|
| B10-1 | "$0 CPP" circled after the "(job maxed CPP + CPP2)" note | The circle lands with the spoken "zero" |
| B10-2 | Double underline instead of a circle on the total | Visual variety; push-in rule applies to underlined sums |
| B10-3 | Primary title by vidIQ score (93 vs 77) | 25-credit cap: two titles scored |

## 5. Revision log
- v1 (2026-10-08): preview fixes: circle timing on $0; lines under the double underline moved down 3 mm.
- v1 render QC (2026-10-09): 1080×1920, 24 fps, 1524 frames, 63.50 s, full decode clean, −14.1 LUFS, peak −2.8 dBFS; frame strip clean; vote readable at the hold.
- Publishing Kit version 29 (34 cards, merged with the card session's #22).
