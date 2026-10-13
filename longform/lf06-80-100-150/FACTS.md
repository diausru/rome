# LF-06 facts — "$80K vs $100K vs $150K: how much do you actually keep?" (checked 2026-10-13)
Example person (not a CRA rule): Alex, single Ontario employee, employment income only, no deductions, 2026. All numbers: `data.py` → `data.json` (uses `tools/taxcalc.py`, cross-checked with an assert).

## Rates used (2026)
- Federal: 14% to 58,523 · 20.5% to 117,045 · 26% to 181,440 · 29% to 258,482 · 33% above; BPA 16,452 (max). Cross-checked 2026-10-13 via web search (Wealthsimple, KPMG 2026 table, Harvest Portfolios). canada.ca was unreachable from the container that day (DNS) → re-check on canada.ca before publishing.
- Ontario: 5.05% to 53,891 · 9.15% to 107,785 · 11.16% to 150,000 · 12.16% to 220,000 · 13.16% above; BPA 12,989; surtax 20% of basic ON tax over 5,818 + 36% over 7,446; Ontario Health Premium (max 750 at these incomes). Cross-checked: EY Ontario Budget 2026 summary (Mar 30 2026), canadianmoneyhelp.ca.
- CPP 2026: 5.95% between 3,500 and YMPE 74,600; CPP2 4% between 74,600 and YAMPE 85,000 (max 4,646.45). EI 1.63% to 68,900 (max 1,123.07). Cross-checked: Carleton payroll page, MUN 2026 tax changes PDF.
- Other provinces: tables in `salary/calc.py` (recorded in `salary/PRODUCTION-BIBLE.md`). Québec excluded.

## Results (ON)
| | 80K | 100K | 150K |
|---|---|---|---|
| Federal | 9,243 | 13,302 | 25,302 |
| Ontario (incl. surtax, OHP) | 4,885 | 6,723 | 14,608 |
| surtax | 0 | 26 | 2,511 |
| CPP / EI | 4,446 / 1,123 | 4,646 / 1,123 | 4,646 / 1,123 |
| Take-home | 60,303 | 74,206 | 104,320 |
| Per month | 5,025 | 6,184 | 8,693 |
| Average income-tax rate | 17.7% | 20.0% | 26.6% |
| Kept from next $1,000 | 675 | 685 | 566 |
| Tax saved by $10,000 deduction (RRSP, room assumed) | 3,115 | 2,991 | 4,341 |
Steps: +20K → +13,903 (69.5%); +50K → +30,114 (60.2%); +70K → +44,017.
Provinces take-home at 80K / 150K: spread BC 61,157 − NS 56,439 = 4,718; AB 107,458 − NS 98,117 = 9,341; ON 3rd at 150K. ON vs AB gap 395 / 3,138.
Limits: taxcalc scope (header of tools/taxcalc.py); no benefits clawbacks, no other credits.
