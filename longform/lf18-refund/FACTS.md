# LF-18 — FACTS (a tax refund doesn't mean you paid less tax)
Date checked: 2026-11-03. Method: 1 WebSearch restricted to canada.ca + earlier verified facts. Calculations: `data.py`.

| Claim | Source | Year | Used in |
|---|---|---|---|
| Refund / balance owing = tax withheld vs tax calculated on the return; tax withheld acts as a refundable credit | canada.ca CRA "How income tax is calculated" (CVITP); CRA Taxology (see LF-17) | current | L11–L16 |
| Employees can ask for extra tax to be withheld on the TD1 | canada.ca CRA, TD1 forms (see LF-13 FACTS) | current | L20, L57 |
| Payroll formulas annualize each pay period's income | CRA T4127 Payroll Deductions Formulas (2026) | 2026 | L30–L31 |
| Form T1213 asks the CRA to let the employer reduce tax at source; prior returns filed and assessed, balances paid, request every year, ~4–6 weeks; not needed when the employer deducts RRSP contributions from pay | canada.ca CRA, Increase or reduce income tax deducted at source; T1213 | current | L40–L42, L58 |
| Daily compound interest on unpaid balances from the 91st day of the following year | canada.ca CRA, interest on amounts owing (T1213 / payroll pages) | current | L46, L59 |
| 2026 Ontario + federal rates for the $70,000 example | CRA T4127 / T4032-ON (see LF-10 FACTS) | 2026 | L5, L18–L22, L37–L38 |

## Calculated results (`data.json`)
- $70,000 salary, Ontario 2026: real income tax $11,134 (Mia and Jay).
- Mia: $150 extra × 26 = $3,900 extra withheld → $15,034 withheld → refund $3,900 (≈ $325/month).
- Ava: $10,000 RRSP on her own → real tax $8,169 → refund ≈ $2,965 (the real saving).
