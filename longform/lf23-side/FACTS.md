# LF-23 — FACTS (side hustle: what actually gets taxed)
Date checked: 2026-11-09. Method: 1 WebSearch restricted to canada.ca + facts verified in earlier episodes. Calculations: `data.py` → `data.json` (LF-10 `th()`, Ontario 2026).

| Claim | Source | Year | Used in |
|---|---|---|---|
| Business income and expenses are reported on Form T2125, Statement of Business or Professional Activities | canada.ca CRA, T4002; T2125 Part 3C | current | L11–L12, L57 |
| Self-employed (or spouse) file by June 15; any balance owing still due April 30 | canada.ca CRA, "Self-employed? Get ready for tax season" | 2025 (same rule for 2026 return) | L45–L46, L60 |
| Instalment due dates March 15, June 15, September 15, December 15 | canada.ca CRA (tax-season tips for self-employed) | current | L47 |
| Interest on a balance owing after the due date | canada.ca CRA (see LF-18 FACTS) | current | L46 |
| GST/HST small supplier: $30,000 or less in a single calendar quarter and over the last four consecutive quarters; must register once over; 29 days to register; voluntary registration possible, input tax credits | canada.ca CRA, When to register for and start charging the GST/HST; RC4022; Register voluntarily | current | L50–L55, L61 |
| Self-employed pay both halves of CPP | canada.ca CRA (see LF-19 FACTS) | 2026 | L40–L43 |

Not used (not confirmed in this pass): instalment threshold amount, CPP amount on Maya's side income, capital cost allowance rules.

## Calculated results (`data.json`) — income tax only
- Maya, $70,000 salary: sales $14,000 − expenses $4,000 = profit $10,000 → income tax ≈ $3,115 (31.1%); ≈ $260/month to set aside.
- Without expenses (tax on $14,000): ≈ $4,301 → records saved $1,186.
- Same $10,000 profit on a $45,000 salary ≈ $2,083; on $110,000 ≈ $3,689.
- $3,000/month sales → over $30,000 in less than a year (illustration).
