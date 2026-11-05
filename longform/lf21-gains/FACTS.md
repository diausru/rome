# LF-21 — FACTS (capital gains tax with a real example)
Date checked: 2026-11-05. Method: 2 WebSearch passes restricted to canada.ca (capital gains basics; status of the inclusion-rate increase). Calculations: `data.py` → `data.json` (LF-10 `th()`, Ontario 2026).

| Claim | Source | Year | Used in |
|---|---|---|---|
| Inclusion rate one-half; proposed increase to two-thirds cancelled March 21, 2025 | canada.ca CRA "Update on the CRA's administration of the proposed capital gains taxation changes"; Finance Canada releases (2025 deferral; 2026 release listing the cancellation); CRA form notes | 2025–2026 | L22–L25, L65 |
| Capital gains/losses reported on Schedule 3; taxable capital gains on line 12700 | canada.ca CRA, Line 12700 – Calculating and reporting your capital gains and losses | current | L27, L59 |
| Gain = proceeds − adjusted cost base; ACB = cost + acquisition expenses (e.g. commissions) | canada.ca CRA, T4037 Capital gains; deemed-disposition capital gains page | current | L16–L20, L58 |
| Capital losses reduce capital gains; net capital losses can be applied against taxable capital gains of other years | canada.ca CRA, Capital losses and deductions | current | L52–L56, L67 |
| Superficial loss can be denied when identical property is bought back | CRA term (T4037); no time window stated in the video | current | L51 |
| Principal residence exemption (covered in LF-11) | see LF-11 FACTS | current | L62 |

## Calculated results (`data.json`) — Ontario 2026, income tax only
- Leah, $70,000 salary: 400 × $50 + $10 = ACB $20,010; sold 400 × $80 = $32,000 → gain $11,990, taxable $5,995.
- Tax on the gain ≈ $1,928 (16.1% of the gain); keeps $10,062. Same $11,990 fully taxed ≈ $3,705; keeps $8,285; difference $1,777.
- Same gain at $40,000 income ≈ $1,142; at $120,000 ≈ $2,602.
- $4,000 loss → net gain $7,990 → tax ≈ $1,335 (−$593).
