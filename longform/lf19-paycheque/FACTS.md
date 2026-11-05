# LF-19 — FACTS (CPP, EI and income tax: what comes off your paycheque)
Date checked: 2026-11-05. Method: 1 WebSearch restricted to canada.ca (2026 CPP/CPP2/EI rates and maximums) + CRA rules already used on the channel. Calculations: `data.py` → `data.json`.

| Claim | Source | Year | Used in |
|---|---|---|---|
| CPP employee rate 5.95%, basic exemption $3,500, YMPE $74,600, max employee contribution $4,230.45 | canada.ca CRA, CPP contribution rates, maximums and exemptions | 2026 | L15–L16, L30–L35 |
| CPP2 4% on earnings $74,600–$85,000 (YAMPE), max $416 | canada.ca CRA, CPP contribution rates, maximums and exemptions | 2026 | L17, L32–L34 |
| Employer pays the same CPP/CPP2 as the employee | canada.ca CRA, CPP contribution rates (employer and employee) | 2026 | L40 |
| EI employee rate 1.63% (outside Quebec), max insurable earnings $68,900, max employee premium $1,123.07; employer pays 1.4× ($1,572.30) | canada.ca CRA, EI premium rates and maximums | 2026 | L20–L21, L30–L31, L41 |
| Enhanced CPP contributions (and CPP2) are a deduction; base CPP gives a non-refundable credit | canada.ca CRA, CPP enhancement / line 22215 and 30800 | current | L18 |
| Payroll annualizes each pay period; TD1 sets credits; return settles the difference | CRA T4127 Payroll Deductions Formulas (2026); LF-18 FACTS | 2026 | L24–L27 |
| CPP/EI overpayments with two employers are refunded on the return; self-employed pay both CPP halves; EI for self-employed is opt-in; Quebec uses QPP/QPIP | canada.ca CRA, CPP/EI overpayments; EI special benefits for self-employed | current | L49–L50, L55 |

## Calculated results (`data.json`) — Ontario 2026, $90,000, 26 pays
- Gross per pay $3,461.54. First pay: CPP $197.95, EI $56.42, income tax ≈ $655.14 → net $2,552.03.
- EI partial at pay 20 ($51.03), none from pay 21. CPP partial at pay 22 ($73.46), CPP2 $62.15 (22), $138.46 (23–24), $76.92 (25).
- Last pay net $2,806.40 → +$254.37.
- Year: income tax ≈ $17,034; CPP+CPP2 $4,646.45; EI $1,123.07; total ≈ $22,803; keeps ≈ $67,197.
- Employer: CPP $4,646.45 + EI $1,572.30 = $6,218.75 → cost ≈ $96,219 (said "about $96,200").
- Income tax per pay = annual tax ÷ 26 (approximation of payroll's annualized formula; labelled "about").
