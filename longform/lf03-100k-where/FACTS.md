# LF-03 facts — "$100,000 in Canada: where does every dollar go?" (checked 2026-10-11)

## The person (illustrative example, not a CRA rule)
Single employee, Manitoba, $100,000 employment income, 2026, no other income/deductions. Computed by `longform/tools/taxcalc.py` (2026 tables from CRA T4127 122nd/123rd ed. + MB 2026 tables; see salary/ bible).
| Item | $ | Note |
|---|---|---|
| Federal income tax | 13,302 | 2026 federal brackets, lowest rate 14% |
| Manitoba income tax | 9,484 | MB 10.8 / 12.75 / 17.4 %, BPA 15,780 |
| CPP + CPP2 | 4,646 | 5.95% to YMPE 74,600 (exempt 3,500) + 4% to YAMPE 85,000 |
| EI | 1,123 | 1.63% on max insurable 68,900 |
| Take-home | 71,445 | |
| Average income-tax rate | 22.8% | (13,302+9,484)/100,000 |
| Combined bracket rate on next dollar | 33.2% | 20.5% fed + 12.75% MB at taxable 98,873 |
Comparison only: ON take-home 74,206; AB 74,459 (same assumptions) — not the angle of the video (Shorts `salary/` covers provinces).
Limitations: taxcalc does not model MB BPA phase-out (starts above $200K — n/a at $100K) or other credits.

## Federal spending, 2024-25 (Annual Financial Report 2025, canada.ca, Table 5; total $547.3B)
Elderly benefits 80,294 (14.7%) · EI & support 24,880 (4.5%) · Children's benefits 28,574 (5.2%) · COVID income support (2,169) ·
Health & social transfers to provinces 68,979 (12.6%) · Fiscal arrangements (Equalization etc.) 36,122 (6.6%) · Pollution pricing proceeds returned 15,595 (2.8%) ·
Other transfer payments 107,140 (19.6%) · Operating expenses of 137 departments/agencies 130,454 (23.8%) · Public debt charges 53,410 (9.8%) · Net actuarial losses 4,020 (0.7%).
Revenue: total $511.0B; personal income tax $234.3B = 45.9%; deficit $36.3B.

## Manitoba spending, 2025/26 actual (Public Accounts 2025/26, gov.mb.ca, "Expense by Segment"; total $25,915M)
Health 10,285 (39.7%) · Education & economic development 6,544 (25.3%) · Social services 2,823 (10.9%) · Community & resource development 2,214 (8.5%) · Justice & other 2,503 (9.7%) · General government 2,312 (8.9%) · Adjustments (766). Debt servicing 2,313 (included in segments).

## Payroll contributions
- CPP is excluded from the federal government's reporting entity (AFR 2025, note on reporting entity): it is not general federal revenue; assets administered by the CPP Investment Board.
- EI premiums are federal revenue: $31.5B, 6.2% of revenues 2024-25 (AFR).

## Framing rules
- Taxes are not earmarked: "your $13,302 split like federal spending" is an ILLUSTRATION using spending shares, labelled as such on screen.
- Spending ≠ revenue (federal deficit 36.3B); say so.
