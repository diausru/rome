# LF-12 — FACTS ($20,000 bonus)
Date checked: 2026-10-25. Method: WebSearch restricted to canada.ca. Calculations: `data.py` (2026 tables from LF-10 `th()`).

| Claim | Source | Tax year | Used in |
|---|---|---|---|
| A bonus is employment income; payroll deducts CPP, EI and income tax from bonuses | canada.ca, CRA special payments chart | current | L8, L16–L18 |
| Bonus method: tax on (annual regular income + bonus) minus tax on annual regular income = tax withheld on the bonus; result cannot be negative; optional year-to-date method | CRA T4127 Payroll Deductions Formulas, 122nd ed. (Jan 1, 2026) | 2026 | L10–L14, L25 |
| RRSP contributions withheld from pay: employer may reduce income-tax withholding when it has reasonable grounds (employee confirmation or RRSP deduction limit statement from the notice of assessment) | CRA T4001 Employers' Guide | current | L37–L38 |
| RRSP deduction limit shown on the notice of assessment / My Account | canada.ca, T4040 | current | L39 |
| 2026 rates: federal + Ontario brackets, surtax, OHP; CPP 5.95% to $74,600, CPP2 4% to $85,000; EI 1.63% to $68,900 | CRA T4127 (2026); canada.ca CPP/EI pages (see LF-10 FACTS) | 2026 | all numbers |

Not used (not verified for the full combined amount): the T4127 "15% (10% in Quebec)" shortcut for bonuses of $5,000 or less.

## Calculated results (`data.json`)
Ontario, single, employment income only, bonus $20,000.
- $90K (Sam): income tax on the bonus $6,165; CPP/EI added for the year $0 (maximums reached anyway); keeps $13,835 (69.2%).
- March stub (YTD below maxima): CPP $1,190 (5.95%), EI $326 (1.63%) → stub net $12,319 (taken $7,681, 38.4%). December stub: $13,835.
- $60K (Maya): tax $5,807 + real extra CPP/EI $1,230 → keeps $12,963.
- $150K (Alex): tax $8,976 → keeps $11,024 (44.9% taken).
- $10,000 RRSP deduction at $110,000 income: ≈$3,174 less income tax.
Dependencies named on screen: other income, deductions, credits, TD1 claims, income-tested benefits (CCB), Quebec/other provinces.
