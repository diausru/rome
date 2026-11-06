# LF-22 — FACTS ($100K salary ≠ $100K taxable income)
Date checked: 2026-11-06. Method: 1 WebSearch restricted to canada.ca + facts verified in earlier episodes. Calculations: `data.py` → `data.json` (LF-10 `th()` and tables, Ontario 2026).

| Claim | Source | Year | Used in |
|---|---|---|---|
| Total income (line 15000) − net-income deductions = net income (line 23600) − taxable-income deductions = taxable income (line 26000); line 26000 = 23600 − 25700 | canada.ca CRA CVITP "How income tax is calculated"; CRA Line 26000 page | current | L9–L14, L63 |
| RRSP deduction on line 20800; unused RRSP room carries forward | canada.ca CRA (see LF-20 FACTS) | 2026 | L18, L44–L45 |
| Enhanced CPP contributions and CPP2 are a deduction; base CPP gives a credit | canada.ca CRA (see LF-19 FACTS) | 2026 | L19–L20, L29 |
| Federal lowest rate 14% applies to non-refundable credit amounts; BPA $16,452 (2026) | CRA T4127 (2026) (see LF-10 FACTS) | 2026 | L29–L31, L54 |
| CCB uses adjusted family net income | canada.ca CRA (see LF-16 FACTS) | 2026–27 | L49 |
| OAS recovery tax is based on net income | canada.ca (see LF-14 FACTS) | 2026 | L49 |
| Net capital losses of other years are deducted between net and taxable income | CRA capital losses (see LF-21 FACTS); CVITP taxable-income deductions | current | L59 |

## Calculated results (`data.json`) — Owen, $100,000 salary, Ontario 2026
- Deductions: RRSP $8,000 + enhanced CPP/CPP2 $1,127 → net income = taxable income $90,873 ($9,127 never reaches the brackets).
- Federal: bracket tax $14,825 − credits ($16,452 BPA + $3,519 base CPP + $1,123 EI + $1,501 Canada employment amount = $22,596 × 14% = $3,163) = $11,662.
- Ontario + surtax $5,215, OHP $750 → total income tax ≈ $17,627 (17.6% of salary, 19.4% of taxable income).
- Coworker, no RRSP: taxable $98,873, tax ≈ $20,024 (+$2,398). $8,000 of federal credit amounts = $1,120.
