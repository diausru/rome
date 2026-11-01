# LF-14 — FACTS (OAS clawback: keep more of it)
Date checked: 2026-11-01. Method: WebSearch restricted to canada.ca. Calculations: `data.py` (OAS recovery tax only; income tax not modelled).

| Claim | Source | Year | Used in |
|---|---|---|---|
| OAS maximum Oct–Dec 2026: $762.50/month (65–74), $838.75 (75+); +1.4% indexation that quarter | canada.ca, OAS payment amounts; ESDC "Maximum Benefit Amounts… (October to December 2026)" | 2026 | L9, L10 |
| Recovery tax: 15% of net world income above the threshold; 2026 income: minimum threshold $95,323, maximum $155,320 (65–74) / $161,320 (75+); repaid from payments July 2027 – June 2028 | canada.ca, OAS pension recovery tax | 2026 income | L11–L23, L51, L56–L57 |
| Measured on each person's own net world income | canada.ca, OAS pension recovery tax / OASRI | current | L15 |
| OAS is taxable income | canada.ca, Old Age Security overview | current | L10 |
| Pension income splitting: up to 50% of eligible pension income; RRIF payments qualify from 65; joint election T1032; CPP/QPP/OAS cannot be split | canada.ca (CRA), Pension income splitting; line 11600 | current | L25–L28, L52 |
| Deferral: +0.6% per month after 65, up to 36% at 70; no GIS while OAS is deferred | canada.ca, OAS – When to start; Retirement Hub | current | L43, L46–L47 |
| TFSA income and withdrawals are not reported and do not affect OAS / GIS / federal income-tested benefits | canada.ca (CRA), What is a TFSA | current | L35 |

Not used: income-tax effect of splitting in dollars (depends on both incomes, province, age amount); GIS amounts; residence-based partial OAS.

## Calculated results (`data.json`)
- Frank net income $120,000 → over the line $24,677 → clawback $3,702 (≈ $308.50/month, ≈ 4.9 months of OAS at $762.50). Raj/Mei $80,000 each → $0.
- Splitting $25,000 of Frank's $60,000 eligible pension income → Frank $95,000 / Linda $65,000 → clawback $0.
- $200,000 GICs at 4% (example) = $8,000 interest → +$1,200 clawback; inside a TFSA → $0.
- $30,000 extra RRIF lump → net $150,000 → clawback $8,202 (+$4,500).
- Maria, net $130,000 with OAS → clawback $5,202 of ≈ $9,000 a year (≈ $9,000 = (155,320 − 95,323) × 15%).
