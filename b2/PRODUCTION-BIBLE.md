# Production Bible: B2 "4 expenses freelancers forget (and what they really save)" (Handwritten Explainer)

Mode: REALISTIC HANDWRITTEN EXPLAINER, series "Real Tax Math" (… → B9 → B10 → B2; engine `../b4/engine.py`). Governing rules: `/CLAUDE.md`, `short/MASTER-SYSTEM.md`, `channel/HANDWRITTEN-CTA.md`. Topic from PUBLISHING-PLAN §4 row 8 (B2, "overlooked self-employed expenses"; user 2026-10-09: "по списку"). Avoids overlap with B6 (vehicle) and B3 (home workspace).

**CURRENT VERSION:** v1

## 1. Content strategy
| Field | Value |
|---|---|
| Primary question | "What do freelancers forget to claim, and what does it really save?" |
| Search intent (vidIQ CA, 2026-10-09) | "tax tips canada" ≈5,298/mo (8.3); "sole proprietor taxes canada" ≈4,868/mo (12.8); "business tax deductions" ≈4,077/mo |
| Competitors | US "how write-offs actually work" shorts (1.5M) and "write-offs ain't helping that much"; no Canadian overlooked-expense math |
| Hook | "Four expenses freelancers forget to claim. Together, they're worth almost six hundred dollars." |
| Twist | A write-off isn't free money: ≈36¢ per $1 here |

## 2. Facts
| Claim | Source | Year |
|---|---|---|
| Reasonable expenses to earn business income are deductible; mixed-use items only for the business portion | CRA T4002 / T2125 (search summaries 2026-10-09) | current |
| Bank charges, card and payment-processing fees on business; accounting/legal fees; business licences, dues (not initiation fees) | same; CRA professional membership dues page | current |
| B4 freelancer tax + CPP $16,105.48 | b4/calc.py (T4127 2026, CPP 2026) | 2026 |

**Calculation (not a CRA rule, `calc.py`):** expenses $1,654 (phone $384, fees $420, accountant $600, dues $250) → tax + CPP $15,517.26; saved $588.22 (35.6¢ / $1). The video says "about thirty-six cents".
**Dependencies:** actual business-use share (keep a log), province, income. Expense amounts are made up (footer says so). "Comment five" promises a fifth expense (CCA on equipment) that still needs its own fact pass.

## 3. Ending CTA options (rotation rule)
| # | Option | Verdict |
|---|---|---|
| 1 | "+ #5 people miss" continues the list → "want it? comment 5", the 5 circled | **Chosen**: the list itself becomes the open loop; one-character answer; new structure (B10 vote with circled options, B9 yes/no with arrow) |
| 2 | "Which one did you forget? 1–4" | Engagement without a next video |
| 3 | "$588 at $60K. At $100K?" | Repeats B9/B10's salary loop |
| 4 | "Meals: why only half?" | Needs a separate fact pass first |
| 5 | "What should we break down next?" | Universal fallback |

## 4. Decisions
| # | Decision | Reason |
|---|---|---|
| B2-1 | No T2125 line numbers on screen | Line mappings were only partly confirmed by search; categories are certain |
| B2-2 | Primary title by vidIQ score (84 vs 54) | 25-credit cap: two titles scored |

## 5. Revision log
- v1 (2026-10-09): preview fixes: CTA writing sped up so the circle lands before the hold; circle padding on $588 and the 5.
- v1 render QC (2026-10-09): 1080×1920, 24 fps, 1624 frames, 67.67 s, full decode clean, −14.1 LUFS, peak −2.3 dBFS; frame strip clean; CTA readable at the hold.
- Publishing Kit version 32 (37 cards, merged with the card session's #23–#24).
