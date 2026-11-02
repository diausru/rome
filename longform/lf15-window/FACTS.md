# LF-15 — FACTS (the retirement tax window)
Date checked: 2026-11-02. Method: WebSearch restricted to canada.ca (1 search) + facts verified for LF-10 / LF-14. Calculations: `data.py`.

| Claim | Source | Year | Used in |
|---|---|---|---|
| An RRSP must be closed by the end of the year you turn 71 (withdraw, annuity or transfer to a RRIF) | canada.ca (CRA), RRSP options when you turn 71 | current | L12 |
| A RRIF minimum amount must be paid each year: age-based factor × value at the start of the year | canada.ca (CRA), RRIF minimum / prescribed factors chart | current | L13, L35 |
| Federal 14% / 20.5% (threshold $58,523), BPA $16,452; Ontario 5.05% / 9.15% (threshold $53,891), BPA $12,989; Ontario surtax; Ontario Health Premium | CRA T4127 / T4032-ON 2026 (see LF-10 FACTS) | 2026 | L16–L31 |
| OAS recovery tax 15% above $95,323 (2026 income) | canada.ca (see LF-14 FACTS) | 2026 | L17 |
| RRIF payments are eligible pension income for splitting from 65 | canada.ca (CRA), pension income splitting (see LF-14) | current | L36 |
| TFSA withdrawals not income; don't affect OAS / GIS | canada.ca (CRA), What is a TFSA (see LF-14) | current | L34 |
| GIS is income-tested | canada.ca (see LF-14) | current | L38 |

Not modelled (said on screen): age amount, pension income amount, other credits; RRIF factor values; investment returns.

## Calculated results (`data.json`, Ontario, single, no employment income)
- Next $10,000 at $40,000 of income (age 62): $2,055. All $40,000: $5,111 (12.8%).
- Next $10,000 at $100,000 (age 72): income tax $3,201 + OAS clawback $1,500 = $4,701. Difference $2,646.
- $100,000 in one year: $21,521 vs two years of $50,000: $14,332 (+$7,189 for one shot).
