# LF-10 — FACTS (marginal rates: the tax on your next $1,000)
Date checked: 2026-10-17. Method: WebSearch restricted to canada.ca / ontario.ca (direct canada.ca fetch fails). Calculations: `data.py` (2026 tables from `salary/calc.py`, plus the federal BPA reduction).

| Claim | Source | Tax year | Used in |
|---|---|---|---|
| Federal rates 14% / 20.5% / 26% / 29% / 33%; thresholds $58,523 / $117,045 / $181,440 / $258,482 | CRA T4127 Payroll Deductions Formulas, 122nd ed. (Jan 2026) | 2026 | L17–L38 |
| Federal BPA $16,452, reduced in a straight line to $14,829 between $181,440 and $258,482 | CRA T4127 (BPAF formula); Finance Canada report on the lowest-rate cut | 2026 | L37 |
| Ontario rates 5.05% / 9.15% / 11.16% / 12.16% / 13.16%; thresholds $53,891 / $107,785 / $150,000 / $220,000 | CRA T4032-ON / T4127 | 2026 | L17–L38 |
| Ontario surtax: 20% of ON tax over $5,818, plus 36% of ON tax over $7,446 | CRA T4032-ON; Ontario Public Accounts 2025-26 | 2026 | L33–L34 |
| Ontario Health Premium bands (25% phase-ins around $48K, $72K and $200K of taxable income, caps $600 / $750 / $900) | CRA T4032-ON; ontario.ca health premium (ontario.ca lists $200,600 as the top threshold, CRA $200,000; we follow CRA) | 2026 | L39 |
| EI: 1.63%, maximum insurable earnings $68,900 | canada.ca, EI premium rates and maximums; CEIC 2026 rate announcement | 2026 | L22 |
| CPP: 5.95% to the YMPE of $74,600; CPP2 4% to the YAMPE of $85,000 | canada.ca, CPP enhancement page | 2026 | L23–L24 |
| An RRSP deduction can be claimed in a later year (unused contributions are carried forward, Schedule 7, line 20800) | canada.ca, "What to do with unused RRSP contributions"; Guide T4040 | current | L51–L54 |

## Calculated results (`data.json`)
Single filer, Ontario, employment income only.

| Salary | Taken from the next $1,000 | Kept |
|---|---|---|
| $65K (Maya) | $357 | $643 |
| $90K (Jordan) | $296 | $704 |
| $120K (Alex) | $434 | $566 |

- **Zones** (taken from the next $1,000): $50K → $252, $55K → $292, $60K → $357, $70K → $344, $80K → $325, $90K → $296, $100K → $315, $112K → $339, $120K → $434, $160K → $450, $190K → $483, $230K → $498, $265K → $535.
- **Ontario surtax** starts at a salary of about $98,600 (computed).
- **BPA reduction:** adds about $3 per $1,000.
- **$1,000 RRSP deduction** saves $296 at $65K, $296 at $90K and $434 at $120K. At $50K it saves $207 (this includes a part of an OHP band).

## Dependencies
- **Brackets apply to taxable income.** The chart's x-axis is salary, and taxable income is salary minus the enhanced-CPP deduction (≈ $550 to $1,000).
- **Range starts at $45K.** Below that, Ontario LIFT, the Ontario tax reduction and income-tested benefits add their own phase-outs. These are not modelled, and the script says so.
- **Benefits.** Benefits such as the CCB and the GST credit (named in L56) depend on the person's situation and are not modelled.
- **Pay-stub timing (L29)** is approximate for even pay: EI around September/October, CPP about 2–3 weeks later, CPP2 around December.
