# LF-17 — FACTS (tax credits vs tax deductions)
Date checked: 2026-11-02. Method: 1 WebSearch restricted to canada.ca + LF-10 tables. Calculations: `data.py`.

| Claim | Source | Year | Used in |
|---|---|---|---|
| Order: deductions reduce net/taxable income → tax calculated → non-refundable credits reduce the tax; excess not refunded | canada.ca CRA "How income tax is calculated" (CVITP); CRA basic personal amount page | current | L7–L9, L24 |
| Deductions give greater savings at higher marginal rates; non-refundable credit rate = lowest rate (14% in 2026) | Finance Canada, Report on reducing the lowest marginal rate / tax expenditures 2026 | 2026 | L12–L13, L17, L19–L20 |
| Refundable credits benefit people even with no tax owing; tax withheld works as a refundable credit | Finance Canada tax expenditures 2026; CRA Taxology podcast | current | L28 |
| Ontario lowest rate 5.05% (2026) | CRA T4032-ON (see LF-10 FACTS) | 2026 | L20 |
| RRSP deductions can be carried forward | canada.ca (see LF-10 FACTS) | current | L38 |
| Some credits can be claimed by either spouse (medical, donations) | canada.ca lines 33099, 34900 (see M30 / R3 data) | current | L39 |

## Calculated results (`data.json`, Ontario 2026, employment income)
- $1,000 deduction saves: $14,000 → $8 (her whole year's tax), $65,000 → $296, $120,000 → $434.
- $1,000 non-refundable credit amount = 14% + 5.05% = $190.50 (Nina: $8, limited by her tax).
