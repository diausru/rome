# Production Bible: B4P "Same $60K freelancer, 9 provinces" (Handwritten Explainer)

Mode: REALISTIC HANDWRITTEN EXPLAINER, series "Real Tax Math" (B4 → B5 → B6 → B3 → B4P; same plate, hand and engine `../b4/engine.py`). Governing rules: `/CLAUDE.md`, `short/MASTER-SYSTEM.md`.
Topic: the province follow-up promised in B4 / B5 / B6 / B3 "next topics" (the channel's strongest format, H3 "$100K by province", applied to the self-employed). Uses the series upgrade's bridge CTA (last line names the next video: RRSP for the self-employed). The three-photo-scene upgrade is a card-format rule; the handwritten mode keeps one desk plate.

**CURRENT VERSION:** v1

## 1. Content strategy
| Field | Value |
|---|---|
| Primary question | "Does my province change how much tax I pay as a freelancer?" |
| Search intent (vidIQ CA, 2026-10-07) | "sole proprietor taxes canada" ≈4,868/mo (competition 12.8, overall 67.9); "self employed tax return canada" ≈4,489/mo (18); "self employed taxes explained" ≈3,736/mo; "taxes in canada" ≈3,485/mo; the exact phrase "self employed tax by province canada" is below 750/mo |
| Hook | "Same sixty thousand dollars of freelance profit. Nine provinces. The tax bill isn't the same." |
| Surprise | Federal tax + CPP are identical everywhere; the whole $2,816 gap is provincial; Alberta is not #1 at this income |
| Payoff | The set-aside rate from B4 (27%) is a Manitoba number; elsewhere it runs from 23.7% to 28.4% |

## 2. Facts and calculation (`b4p/calc.py`)
| Item | Source | Year |
|---|---|---|
| Federal brackets, BPA $16,452; provincial brackets and BPAs (BC, AB, SK, MB, ON, NB, NS, PE, NL); Ontario surtax and Health Premium | `salary/calc.py` + `salary/PRODUCTION-BIBLE.md` (CRA T4127 122nd/123rd ed., 2026 provincial budgets; cross-checked to the dollar at $100K against catax.tools for BC, AB, ON, SK, MB, NS) | 2026 |
| Self-employed CPP 11.9% × ($60,000 − $3,500) = $6,723.50; line 22200 deduction / line 31000 credit split | `b4/PRODUCTION-BIBLE.md` | 2026 |
| BC tax reduction: max $690, reduced 3.56% above $25,570 net income, zero at $44,952 → zero here (net income ≈ $56,073) | BC Budget 2026 summaries (Andersen, Crowe, EY, Baker Tilly; gov.bc.ca credits page) via search 2026-10-07 | 2026 |

**Results (single, $60,000 net self-employment income, no other income, no EI):** CPP $6,723.50 and federal $5,155.43 everywhere (= $11,878.93 → "$11,879"). Provincial tax: BC $2,363.30 · AB $2,440.60 · ON $2,723.99 (incl. $600 Health Premium) · SK $3,484.85 · NB $3,895.63 · NL $4,156.80 · MB $4,226.55 · PE $4,515.43 · NS $5,179.00. Total share of $60K: BC 23.74% … NS 28.43%. Gap top–bottom $2,815.70 → "$2,816/yr".
**On paper:** BC, AB, ON, MB, NS only (the narration names them); SK, NB, NL, PE are in the description only as the ranking order, without amounts (they were not cross-checked at $100K).
**Dependencies:** single; no RRSP or other deductions; no other income; other low-income provincial reductions phase out well below this income (checked for BC; ON reduction is below its tax at this level); Québec excluded (separate return, QPP).

## 3. Visual system
As B4 v3. Paper: "$60K × 9 provinces" · "fed + CPP = $11,879" · "+ provincial:" · "BC $2,363" · "AB $2,441" · "ON $2,724" · "MB $4,227" (MB circled, "our home") · "NS $5,179" · "gap = $2,816/yr" (circled, push-in) · "set aside 23.7% → 28.4%" (underlined, push-in) · "QC: own system" · "next: RRSP $5K →" (bridge to the next video), then pull back.

## 4. Decisions
| # | Decision | Reason |
|---|---|---|
| B4P-1 | Five provinces on paper | Writing nine amounts would lag the narration; the five cover top, bottom, home and the "Alberta isn't #1" surprise |
| B4P-2 | Bridge CTA to the RRSP video | Series upgrade rule (2026-10-06): the last line names the next topic |
| B4P-3 | 65.1 s, no tempo change | Duration tolerance 45 s–1:10 |

## 5. Revision log
- v1 (2026-10-07): preview fixes: the MB underline read like a table rule above NS (replaced by a circle around "MB"); the gap push-in cropped "/yr" (recentred, zoom 2.9).
