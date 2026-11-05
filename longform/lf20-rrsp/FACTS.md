# LF-20 — FACTS (RRSP with real numbers: when does it actually reduce your tax?)
Date checked: 2026-11-05. Method: 2 WebSearch passes restricted to canada.ca (limits; unused contributions). Calculations: `data.py` → `data.json` (LF-10 `th()`, Ontario 2026).

| Claim | Source | Year | Used in |
|---|---|---|---|
| RRSP dollar limit 2026 = $33,810 (2027 = $35,390) | canada.ca CRA, MP, DB, RRSP, DPSP, ALDA, TFSA limits, YMPE and YAMPE; What's new – savings and pension plan administration | 2026 | L13 |
| Deduction limit generally 18% of prior-year earned income, up to the annual limit, less pension adjustments | canada.ca CRA, How contributions affect your RRSP deduction limit; T4040 | current | L12–L13, L15 |
| Unused deduction room carries forward; RRSP Deduction Limit Statement on the notice of assessment | canada.ca CRA, What to do with unused RRSP contributions; T4040 | current | L14, L59 |
| Contributions deducted on line 20800; unused contributions can be deducted in a later year up to that year's limit; tracked on Schedule 7 | canada.ca CRA, Line 20800; unused RRSP contributions; Schedule 7 | current | L9, L36–L37, L45 |
| Contributions over the deduction limit may be taxed on the excess | canada.ca CRA, What to do with unused RRSP contributions | current | L16 |
| Withdrawals are included in income in the year withdrawn; tax is withheld | canada.ca CRA, T4040 | current | L48 |

Not used (not confirmed in this pass): withholding rates on withdrawals, the exact contribution deadline for 2026.

## Calculated results (`data.json`) — tax saved by a $10,000 deduction, Ontario 2026, employment income
- Ben $22,000: $853 (all his income tax). Ella $45,000: $2,055 (20.6%). Ravi $75,000: $3,115 (31.1%). Kate $110,000: $3,174 (31.7%). Marc $160,000: $4,479 (44.8%).
- Room examples: 18% × $75,000 = $13,500; 18% × $160,000 = $28,800.
- Noor: deduct at $45,000 → $2,055; deduct in a $90,000 year → $2,965 (+$910) — example at 2026 rates.
- Kate withdrawal (illustration with the same model: extra $10,000 of income): at ≈$45,000 income ≈ $2,083 → ahead $1,091; at $110,000 ≈ $3,689 (> $3,174 saved). Retirement-specific credits ignored ("roughly", "as an example").
