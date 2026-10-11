# LF-01 — The Canadian Tax Brackets Explained With Real Numbers · Production bible

## Market research (2026-10-11) — vidIQ 10 credits (balance 1,465 → 1,455; cap 25)
- `vidiq_keyword_research` "canadian tax brackets explained" (CA): seed ≈5,366 searches/mo, competition 6.2/100, overall 70.9 (best opportunity in the set). Related: "tax brackets explained" ≈5,032 (−62 % vs 30-day baseline: seasonal, peaks at filing season), "how tax brackets work" ≈4,988, "canadian tax guide" ≈4,746, "tax return canada" ≈4,573, "canadian taxes" ≈4,256, "tax brackets canada" ≈3,458.
- `vidiq_youtube_search` "tax brackets canada explained" (CA, by views): top results are US or generic (Vox "How tax brackets actually work" 2.3 M, Gohar Khan Short 24 M, US 2026 bracket videos) and Canadian news/CPA overviews (CBC 2025 changes 565 K; Gabrielle Talks Money "tax changes 2024" 806 K, 13:52). Gap: no Canadian long-form that walks real people through federal + provincial stairs, bracket rate vs average rate, with 2026 numbers.
- Seasonality: demand is lower in October than in filing season → evergreen asset, re-promote Feb–Apr 2027.

## Distinct from the Shorts
`raise/` (A3) answered one myth ("a raise pushes all your income into a higher bracket") in 60 s. `salary/` ranked provinces at $100K. LF-01 is the full mechanism: two staircases stacked (federal + provincial), the credit "zero step", bracket rate vs real rate for three people, and what the bracket rate is actually useful for. Different examples ($45K / $90K / $150K), different visuals (desk world, staircase, face-off scoreboard).

## Facts (claim · source · tax year · checked · method)
| Claim | Source | Year | Checked | Method |
|---|---|---|---|---|
| Federal 14 % ≤ $58,523; 20.5 % to $117,045; 26 % to $181,440; 29 % to $258,482; 33 % above | CRA T4127 122nd/123rd ed. (recorded in `salary/PRODUCTION-BIBLE.md`); re-confirmed by secondary reports of the CRA indexation (Harvest Portfolios, CP24, Daily Hive, Dec 2025). canada.ca could not be fetched from this container (DNS) on 2026-10-11 | 2026 | 2026-10-11 | as published |
| Lowest federal rate 14 % for 2026 (15 % → 14 % from 1 Jul 2025; 14.5 % blended for 2025) | same | 2026 | 2026-10-11 | as published |
| Federal basic personal amount $16,452 (max) | same | 2026 | 2026-10-11 | as published |
| Indexation 2.0 % for 2026 | secondary reports of CRA indexation | 2026 | 2026-10-11 | as published |
| ON brackets 5.05 % ≤ $53,891, 9.15 % to $107,785, 11.16 % to $150,000, 12.16 % to $220,000, 13.16 % above; ON surtax + Ontario Health Premium | `salary/calc.py` tables (T4127, 2026) | 2026 | from salary bible | as published |
| AB 8 % ≤ $61,200, 10 % to $154,259 …; MB 10.8 % ≤ $47,000, 12.75 % to $100,000, 17.4 % above | same | 2026 | from salary bible | as published |
| Take-home, taxes, CPP, EI for $45K/$90K/$150K in ON/AB/MB | `longform/tools/taxcalc.py` (single employee, employment income only, no other deductions/credits; incomes chosen below $181,440 so the unmodelled federal BPA reduction does not apply) | 2026 | 2026-10-11 | code |
| Illustration "$90,000 through the federal stairs before credits": 58,523×14 % = $8,193; 31,477×20.5 % = $6,453; total $14,646 | arithmetic on the federal brackets; labelled on screen as illustration, before credits and CPP/EI deductions | 2026 | 2026-10-11 | arithmetic |
| BPA credit worth up to 14 % × $16,452 ≈ $2,303 federally | arithmetic | 2026 | 2026-10-11 | arithmetic |

Numbers from taxcalc (ON): $45K → fed $3,338, prov $1,905, CPP $2,469, EI $733, keep $36,554, income tax 11.7 % of gross, combined bracket rate 19.1 %. $90K → fed $11,252, prov $5,782, CPP $4,646, EI $1,123, keep $67,197, 18.9 %, bracket 29.65 %. $150K → fed $25,302, prov $14,608, CPP $4,646, EI $1,123, keep $104,320, 26.6 %, bracket 37.16 %.
Province swap at $150K: AB keep $107,458 (bracket 36.0 %), MB keep $100,797 (bracket 43.4 %).
Dependencies stated on screen/VO: single, employment income only, no RRSP or other deductions; actual results vary with credits, deductions, other income and province. "Bracket rate" = statutory combined federal + provincial rate on the last dollar; true marginal can differ where surtaxes, premiums or benefit clawbacks apply (said in VO once).
| Priya (ON, $150K) next-dollar rate incl. Ontario surtax: 26 % + 11.16 % × (1 + 20 % + 36 %) = 43.41 % | arithmetic on ON surtax (20 % over $5,818, 36 % over $7,446 of basic ON tax; her basic ON tax ≈ $13,858) | 2026 | 2026-10-11 | arithmetic |
| Daniel (ON, $90K) +$1,000 raise: OHP already at its $750 cap, no surtax (basic ON tax ≈ $5,032 < $5,818) → 29.65 % → keeps ≈ $703 before CPP/EI | arithmetic | 2026 | 2026-10-11 | arithmetic |
