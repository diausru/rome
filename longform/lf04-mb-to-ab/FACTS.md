# LF-04 facts — "Manitoba → Alberta: same $100K, is the move worth it?" (checked 2026-10-12)

## The person (illustrative example, not a CRA rule)
Jordan (from LF-03): single employee, $100,000 employment income, 2026, no other income/deductions. `longform/tools/taxcalc.py`, 2026 tables (CRA T4127 122nd/123rd ed.; AB and MB 2026 rates, recorded in `salary/PRODUCTION-BIBLE.md`).
| Item | Manitoba | Alberta | Note |
|---|---|---|---|
| Taxable income | 98,873 | 98,873 | − enhanced CPP 1,127 |
| Federal tax | 13,302 | 13,302 | identical (federal) |
| Provincial tax | 9,484 | 6,470 | MB 10.8% to 47,000, 12.75% above, BPA 15,780, credits 10.8%; AB 8% to 61,200, 10% to 154,259, BPA 22,769, credits 8% |
| CPP + CPP2 / EI | 4,646 / 1,123 | same | federal programs, same rates |
| Take-home | 71,445 | 74,459 | gap **3,014/yr ≈ 251/mo** |
| Combined rate on next dollar | 33.25% | 30.5% | |
Hand check AB: 8%×61,200 + 10%×37,673 = 8,663.3 − 8%×(22,769 + 3,519.45 base CPP + 1,123.07 EI) = 6,470.4. MB: 11,689.8 − 10.8%×20,422.5 = 9,484.2.
Other incomes (same assumptions): $60K gap 1,919; $150K gap 6,661.

## Province of residence (canada.ca, "Your province or territory of residence", tax year 2025 page)
"Your province or territory of residence is the province or territory where you lived or of which you were considered to be a factual resident on December 31" — the CRA uses it to calculate taxes and credits. (Business income with permanent establishments elsewhere: n/a for Jordan.)
Consequence used in VO: a move before Dec 31 → provincial tax for the year is Alberta's. Payroll withholding before the move used Manitoba tables, so the difference is settled on the return (all else equal) — framed as "settled when you file", not a promised refund amount.

## Moving expenses (canada.ca, Line 21900, tax year 2025 page)
New home at least 40 km closer (shortest public route) to the new work location; deduct from employment income earned at the new location; move generally within Canada; employer reimbursement must be included in income or subtracted; unused amount carries forward to future years at the new location; eligible: transportation & storage, travel, up to 15 days temporary living, lease cancellation, incidental costs (address change, driver's licence), etc.
Illustration: $5,000 of eligible costs × 30.5% ≈ $1,525 lower tax (marginal-rate estimate, labelled "about").

## Sales tax
- GST 5% in both (canada.ca GST/HST calculator rates table: AB 5% / 0%, MB 5% / 7%).
- Manitoba RST 7% general rate on retail sale of most goods and certain services (gov.mb.ca Retail Sales Tax page). Alberta: no provincial sales tax.
- Dependency: how much Jordan buys that is RST-taxable is unknown → shown as "$70 per $1,000 of taxable purchases" and a break-even, not as a fixed saving.

## Rent (CMHC Rental Market Survey, October 2025, `sources/rmr-canada-2025-en.xlsx`, released Dec 11 2025)
Purpose-built 2-bedroom, privately initiated structures 3+ units:
- Table 1.0 average (new + existing): Winnipeg CMA 1,571; Calgary CMA 1,914 → +343/mo = **4,116/yr**.
- Table 6.0 turnover units (a new tenant's rent): Winnipeg 1,595; Calgary 1,836 → +241/mo = **2,892/yr**.
Not covered: condos/houses, utilities, car insurance, commute — named on screen as things to price individually.

## Net (illustration)
Tax +3,014 − rent 4,116 = −1,102 (average rent) · tax +3,014 − 2,892 = +122 (new-lease rent). RST break-even: 1,102 / 0.07 = $15,743 of RST-taxable purchases a year.

## Framing rules
Not advice; one person, one salary; rent is a city average, not Jordan's quote; jobs/salary may differ by city.

## Raise (taxcalc, 2026): $100K → $110K
MB keeps 6,262 of the $10,000 (fed 2,050 + MB 1,688 = 12.75%×1,127 + 17.4%×8,873); AB keeps 6,950 (fed 2,050 + AB 10%×10,000). Diff 688. Gap at $110K: 81,409 − 77,707 = 3,702. MB 17.4% bracket starts at $100,000 taxable (2026); AB 12% at $154,259.
## Sales tax example
$15,000 × 7% = $1,050 (arithmetic illustration, "taxable purchases").
