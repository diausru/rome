# Production Bible: B9 "$10K of side income: two tax bills" (Handwritten Explainer)

Mode: REALISTIC HANDWRITTEN EXPLAINER, series "Real Tax Math" (… → B7 → B8 → B9; same plate, hand and engine `../b4/engine.py`). Governing rules: `/CLAUDE.md`, `short/MASTER-SYSTEM.md`, `channel/HANDWRITTEN-CTA.md`. Answers the B8 CTA ("$10,000 of income. How much tax is actually on it?").

**CURRENT VERSION:** v1

## 1. Content strategy
| Field | Value |
|---|---|
| Primary question | "How much tax do I pay on $10,000 of side / creator income?" |
| Search intent (vidIQ CA, 2026-10-08, 25 credits) | "taxes for side hustles" ≈4,621/mo (24.9); "self employed taxes" ≈4,780/mo; exact Canadian phrase below 750/mo |
| Competitors | Side-hustle idea/income videos dominate (millions of views); none shows the Canadian tax on the money |
| Hook | "Ten thousand dollars from your channel. How much tax? It depends on one thing." |
| Surprise | $0 income tax but $773.50 CPP; on top of a salary $4,161 (5×+) |

## 2. Facts
| Claim | Source | Year |
|---|---|---|
| Federal 14% to $58,523 then 20.5%; BPA $16,452; MB 10.8% to $47,000 then 12.75%; MB BPA $15,780 | CRA T4127 Jan 2026 (salary/, b4/) | 2026 |
| CPP 5.95% each side / 11.9% self-employed; exemption $3,500; YMPE $74,600 | CRA 2026 announcement (b4/, search 2026-10-08) | 2026 |
| Employment and self-employment earnings combined on Schedule 8, one $3,500 exemption | Schedule 8 structure (search summary) | 2026 |

**Calculation (not a CRA rule, `calc.py`):** case 1: TI $9,548.25 < BPAs → $0 tax; CPP $773.50. Case 2 (+ $60,000 salary): extra federal $1,838.23 + MB $1,132.93 = $2,971.15; CPP $1,190; total $4,161.15 (41.6%); 4,161 / 774 = 5.4 → "5x+". Credits identical in both runs (employment amount, EI, employee CPP) cancel.
**Dependencies:** province, other income, deductions/credits, expenses (the $10K is net). Screen footer states the assumptions.

## 3. Visual system
As B4 v3. Paper: see PUBLISH.md drawing timeline.

## 4. Ending CTA options (rotation rule)
| # | Option | Verdict |
|---|---|---|
| 1 | Arrow from "$4,161" → "on a $100K salary?" → underlined "run it next? say yes" | **Chosen**: continues the math, one-word answer, produces the next video; differs from B8's "how much tax on it? / ask below" structure (a yes/no vote on a named next case) |
| 2 | "What's YOUR salary? → we'll run it" | Invites personal data in comments; rejected |
| 3 | "Ontario or Alberta next?" | Good vote, weaker tie to the circled total |
| 4 | "Over $3,000 → instalments?" | Needs a separate fact pass |
| 5 | "What should we break down next?" | Universal fallback |

## 5. Decisions
| # | Decision | Reason |
|---|---|---|
| B9-1 | Two cases, same $10K | The answer genuinely depends on other income; shows the dependency instead of one number |
| B9-2 | Limiter at −3 dB in the VO master and the mux | B8's first mux peaked at −0.7 dBFS |
| B9-3 | Primary title by vidIQ score (92 vs 84) | 25-credit cap: two titles scored |

## 6. Revision log
- v1 (2026-10-08): preview fixes: circle padding on "$0" and "$4,161"; CTA question shortened so the arrow head clears the "?".
- v1 render QC (2026-10-08): 1080×1920, 24 fps, 1385 frames, 57.71 s, full decode clean, −14.0 LUFS, peak −2.6 dBFS; frame strip clean; final CTA readable at the hold (the source tag covers the top line in the last frame, by design of the top-left tag).
- Publishing Kit version 27 (32 cards, merged onto the live v26 with the card session's #21).
