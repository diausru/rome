# Production Bible: RRSP-SE "$5,000 RRSP for a freelancer: what it really saves" (Handwritten Explainer)

Mode: REALISTIC HANDWRITTEN EXPLAINER, series "Real Tax Math" (… → B4P → RRSP-SE; same plate, hand and engine `../b4/engine.py`). Governing rules: `/CLAUDE.md`, `short/MASTER-SYSTEM.md`. Promised by the B4P bridge CTA; its own bridge CTA points to tax instalments.

**CURRENT VERSION:** v1

## 1. Content strategy
| Field | Value |
|---|---|
| Primary question | "I'm self-employed. How much tax does a $5,000 RRSP contribution save?" |
| Search intent (vidIQ CA, 2026-10-07) | "rrsp canada" ≈4,423/mo (competition 8.3, overall 69.3); "rrsp explained" ≈4,494/mo (15.4); "rrsp vs tfsa" ≈5,056/mo (14); "rrsp" ≈5,076/mo; "rrsp self employed canada", "rrsp tax refund", "rrsp tax deduction explained" below 750/mo |
| Hook | "Put five thousand dollars into an RRSP. How much of your tax bill goes away?" |
| Surprise | It saves ≈27¢ per dollar here, not the 36¢ "next dollar" rate from B4, because self-employed CPP does not go down |
| Payoff | Room (18% of last year's earned income, max $33,810), deadline (March 1, 2027), deferral; bridge to tax instalments |

## 2. Facts
| Claim | Source | Year |
|---|---|---|
| RRSP dollar limit 2026 $33,810; deduction limit = 18% of the previous year's earned income up to the limit, minus pension adjustments, plus unused room | CRA (canada.ca, MP/DB/RRSP limits) as reported by Questrade, TD, Fidelity, Wealthsimple (search 2026-10-07) | 2026 |
| Contribution deadline for the 2026 tax year: March 1, 2027 | same (search) | 2026 |
| RRSP deduction (line 20800) reduces taxable income; it does not reduce CPP contributions on self-employment earnings (CPP is based on net self-employment income, Schedule 8) | taxtips.ca ("RRSP contributions do not affect CPP premiums"); CRA Schedule 8 / line 22200 pages via search | current |
| Withdrawals are taxable income (deferral) | CRA RRSP pages (general rule; also used in `e3/`) | current |

**Worked example (not a CRA rule, `rrsp-se/calc.py`):** the B4 case (2026, Manitoba, single, $60,000 net self-employment income). Taxable income $56,073.25 → $51,073.25. Federal tax $5,155.43 → $4,455.43 (−$700.00, 14% bracket); Manitoba $4,226.55 → $3,589.05 (−$637.50, 12.75% bracket); CPP $6,723.50 unchanged. Total $16,105.48 → $14,767.98: saving $1,337.50 = 26.75% of the contribution → "≈ 27¢ per $1, not 36¢" (36¢ = B4's marginal cost of the next dollar of business income, which includes CPP).
**Dependencies:** enough RRSP room is assumed (footer: "room assumed"); the saving depends on the brackets the deduction falls in; other provinces differ; withdrawal later is taxed at that year's rate.

## 3. Visual system
As B4 v3. Paper: "$5K RRSP → ?" · "bill $16,106" · "taxable - $5,000" · "fed - $700" · "MB - $638" · "= $14,768" · "saved $1,338" (circled, push-in) · "≈ 27¢ per $1, not 36¢" ("27¢" underlined, push-in) · "CPP: no change" · "room 18% · max $33,810" · "by Mar 1, 2027" · "tax on withdrawal" · "next: instalments →".

## 4. Decisions
| # | Decision | Reason |
|---|---|---|
| R-1 | Tempo ×1.04 and shorter pauses | First assembly ran 72.1 s, over the 1:10 limit; now 69.35 s |
| R-2 | ASCII "-" instead of "−" on paper | The stroke font has no U+2212 glyph (rendered "?" in the first preview) |
| R-3 | Camera key order asserted in code | The first preview had push-in keys out of time order (hold keys hard-coded before the circle finished) |

## 5. Revision log
- v1 (2026-10-07): preview fixes listed above; circle around "$1,338" moved off the "d" of "saved".
