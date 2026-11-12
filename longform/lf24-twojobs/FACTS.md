# LF-24 — FACTS (working two jobs in Canada)
Date checked: 2026-11-12. Method: 1 WebSearch restricted to canada.ca + facts verified in earlier episodes. Calculations: `data.py` → `data.json` (LF-10 `th()` and tables, Ontario 2026).

| Claim | Source | Year | Used in |
|---|---|---|---|
| With more than one employer at the same time, personal tax credits are claimed on one TD1 only; on the other, tick "More than one employer or payer at the same time" and enter 0 if total income will exceed the credits claimed; otherwise not enough tax is deducted | canada.ca CRA, Get the completed TD1 forms from the individual; Starting to work; TD1 forms | current | L12–L13, L37–L39, L60–L61 |
| Payroll annualizes each pay period (withholding = estimate); you can ask for extra tax to be deducted on the TD1 | CRA T4127 (2026); TD1 (see LF-18 FACTS) | 2026 | L11, L44–L45, L62 |
| EI 1.63%, max insurable $68,900, max employee premium $1,123.07; CPP/EI overpayments with two employers come back on the return | canada.ca CRA (see LF-19 FACTS) | 2026 | L53–L58 |
| CRA may require instalments; interest on balances owing | canada.ca CRA (see LF-23 / LF-18 FACTS) | current | L50 |

## Calculated results (`data.json`) — Lena, Job A $45,000 + Job B $30,000, Ontario 2026
- Withholding modelled as each payroll's annual tax on its own job: A ≈ $5,243, B ≈ $2,452 (both with the basic personal amount) → $7,695.
- Real income tax on $75,000 ≈ $12,705 → owes ≈ $5,010 (≈ $193 per paycheque over 26 pays).
- Fix #1 (Job B TD1 = 0): B ≈ $5,411 → total ≈ $10,654 → bill ≈ $2,050. Fix #2: ≈ $79 extra per Job B paycheque (26 pays).
- EI: $733.50 + $489.00 = $1,222.50 vs max $1,123.07 → $99.43 back.
- Model note: payroll withholding approximated with annual tax functions (not the exact T4127 per-period formula); labelled "about".
