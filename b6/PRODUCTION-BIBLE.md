# Production Bible: B6 "Can you write off your car?" (Handwritten Explainer)

Mode: REALISTIC HANDWRITTEN EXPLAINER, series "Real Tax Math" (B4 → B5 → B6; same desk plate, hand and engine: `../b4/engine.py`). Governing rules: `/CLAUDE.md`, `short/MASTER-SYSTEM.md`.
Topic B6 in `channel/TOPICS.md` (vehicle expenses + logbook), `channel/PUBLISHING-PLAN.md` §4 week 6. Chosen for this mode because the answer is a ratio and a multiplication written on paper.

**CURRENT VERSION:** v1

## 1. Content strategy
| Field | Value |
|---|---|
| Primary question | "I'm self-employed. Can I write off my car, and how much?" |
| Search intent (vidIQ CA, 2026-10-06) | "how to write off your car" ≈4,226/mo (competition 45.5); "vehicle tax deductions" ≈3,651/mo (28.8); "self employed tax deductions" ≈3,850/mo; "tax tips canada" ≈5,298/mo (8.3). Exact Canadian phrases ("vehicle expenses canada", "how to deduct vehicle expenses") are below 750/mo |
| Hook | "Can you write off your car? Only the part you can prove." (the searched question, answered with a twist in the first line) |
| Surprise | The 73¢/km rate people quote is the employer-allowance limit, not the self-employed method; driving from home to your regular place of business is personal |
| Payoff | "Your car isn't the write-off. Your business kilometres are." + logbook rules |

## 2. Facts
| Claim | Source | Year |
|---|---|---|
| Deductible part = business km ÷ total km × vehicle expenses (fuel, insurance, maintenance and repairs, licence and registration; interest, leasing and CCA have limits) | canada.ca, "Motor vehicle expenses" (CRA business expense pages) via search 2026-10-06 | current |
| Logbook entries: date, destination, purpose, kilometres; odometer readings | CRA guidance as summarised by search results (canada.ca motor vehicle pages; secondary: sparkreceipt, taxtips.ca) | current |
| Simplified logbook: after a full 12-month base-year logbook, a 3-month sample period can be used if usage stays within 10% of the base year | canada.ca, "Documenting the use of a vehicle" (CRA) via search | current |
| Driving between home and your regular place of business is personal (a home-based business has a different starting point) | CRA position via search summaries (canada.ca allowance/benefit pages; secondary sources) | current |
| 73¢/km (first 5,000 km) and 67¢ after, 2026, provinces = limit on the deduction of tax-exempt allowances paid by employers | Department of Finance Canada, "Government Announces the 2026 Automobile Deduction Limits and Expense Benefit Rates" (Jan 2026) | 2026 |

**Worked example (not a CRA rule, `b6/calc.py`):** 20,000 km total, 12,000 km business → 60%; expenses $6,200 (fuel $3,000, insurance $2,000, maintenance $1,000, licence $200) → deduction $3,720. In the B4 example (2026, Manitoba, single, $60,000 net self-employment income) tax + CPP falls from $16,105.48 to $14,782.53: saving $1,322.95 (35.56¢ per $1) → "≈ $1,323 saved" on paper, "about thirteen hundred dollars" in the narration.
**Dependencies:** CCA, interest and lease costs are left out (they have their own limits); the saving depends on income and province; a home-based business changes which trips are personal. CRA "can deny the claim" without records: an unsupported expense can be disallowed.

## 3. Visual system
As B4 v3 / B5 (living light, steam, handheld camera with push-ins, motion blur). Paper, top to bottom: "car = write-off?" · "20,000 km" · "12,000 biz" "= 60%" (60% circled) · "costs $6,200" · "60% × $6,200" · "= $3,720" (circled) · "≈ $1,323 saved" (underlined) · "home → work = personal" · "73¢/km = employer allowance" · "logbook: date, place, why, km" · "1 full year → 3-month sample"; final circle around "12,000 biz". Long lines are auto-fitted to the paper width (v1 engine change in `film.py`).
Push-ins: 60% (11.1–12.6 s), $3,720 (23.6–25.2 s), $1,323 (29.3–31.6 s), "12,000 biz" (60.5–62.6 s).

## 4. Decisions
| # | Decision | Reason |
|---|---|---|
| B6-1 | Operating costs only in the example | CCA / interest / lease limits would need extra facts and time; named as a dependency |
| B6-2 | Tax effect reuses the B4 example | Series continuity; the 36¢ marginal rate is already explained in B4 |
| B6-3 | 64 s, no tempo change | Duration tolerance 45 s–1:10 |

## 5. Revision log
- v1 (2026-10-06): preview fixes before render: "= 60%" overlapped "12,000 biz"; "60% × $6,200 = $3,720" and the logbook lines ran past the paper edge (split into two lines; auto-fit); writing lagged the narration by 1.5 s at "60%" (labels shortened).
