# LF-09 — FACTS (side hustle: same $10K profit, different day jobs)
Date checked: 2026-10-16. Method: canada.ca direct fetch fails (HTTP/2 reset), so WebSearch restricted to canada.ca; the calculations come from `data.py` (federal and Ontario 2026 tables in `salary/calc.py`, via `longform/tools/taxcalc.py`).

| Claim | Source | Tax year | Used in |
|---|---|---|---|
| Self-employed CPP is 11.9% (employee 5.95% + employer 5.95%), up to YMPE | canada.ca, CPP contribution rates, maximums and exemptions | 2026 | L14, L52 |
| YMPE $74,600 · YAMPE $85,000 · CPP2 4% + 4% = 8% self-employed | canada.ca, same page | 2026 | L21 |
| Basic exemption $3,500 (model) | canada.ca, same page | 2026 | data.py |
| Self-employed: deduct the employer half (line 22200) and the enhanced part (line 22215); claim a credit on the base part (line 31000/31010) | canada.ca, lines 22200 / 31000 | 2026 | L16 |
| Business income is reported on form T2125 and taxed on net profit | canada.ca, T2125 / Guide T4002 | current | L10 |
| Self-employed filing deadline June 15; balance owing due April 30 | canada.ca, important dates | current | L43 |
| Instalments if net tax owing > $3,000 in the current year and either of the two previous years (outside Quebec); CPP is not part of net tax owing | canada.ca, paying your income tax by instalments | current | L45 |
| Small supplier: $30,000 of taxable supplies in one calendar quarter or over the last four quarters; above that, generally register for GST/HST | canada.ca, GST/HST registration | current | L47–L49 |

## Calculated results (`data.json`)
Single filer, Ontario, $10,000 of side profit, no other income.

| Day job | Kept | Tax | CPP | % kept |
|---|---|---|---|---|
| $40K | $6,982 | $1,828 | $1,190 | 69.8% |
| $60K | $6,145 | $2,665 | $1,190 | 61.5% |
| $90K | $7,009 | $2,991 | $0 | 70.1% |
| $130K | $5,659 | $4,341 | $0 | 56.6% |

- Priya − Sam: $7,009 − $6,145 = $864.
- A $10K raise at $60K: $6,447 kept (employee CPP + EI). That is $302 more than the side hustle; the script says "three hundred".
- $3,000 of expenses at $60K: amount kept falls by $1,844, so $1,156 of tax and CPP is saved.
- Owed at tax time: $2,665 + $1,190 = $3,855, which is about 39% of $10,000.

**Note:** "Tax" here is net of the CPP deduction and credit. EI on self-employment is not modelled (it is opt-in).
