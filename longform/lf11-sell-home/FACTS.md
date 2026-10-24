# LF-11 — FACTS (what if you sell your home?)
Date checked: 2026-10-24. Method: WebSearch restricted to canada.ca (direct canada.ca fetch fails). Calculations: `data.py` (reuses the LF-10 2026 tax model `th()`).

| Claim | Source | Tax year | Used in |
|---|---|---|---|
| Principal residence sale must be reported on Schedule 3 and Form T2091(IND); only page 1 if the home was the principal residence for every year owned | canada.ca, Form T2091(IND) / reporting the sale of your principal residence | current (since 2016) | L13–L14 |
| Late designation penalty: lesser of $8,000 and $100 per complete month | CRA, penalty for accepting a late-filed principal residence election | current | L15 |
| One principal residence per family unit per year (not "once in a lifetime") | canada.ca, principal residence and other real estate / T4037 | current | L11 |
| Flipping rule: residential property owned < 365 consecutive days, sold on/after Jan 1 2023 → deemed business income, no PRE, losses deemed nil | canada.ca, "Property flipping" / T4037 | 2023+ | L20–L27 |
| Life-event exceptions: death, birth/adoption/household change (incl. care of elderly relative), separation ≥ 90 days, serious illness/disability, threat to personal safety, eligible relocation (≥ 40 km closer), involuntary job termination, insolvency | canada.ca, flipped property page; T4037 | 2023+ | L28–L30 |
| Capital gains inclusion rate stays 1/2 (proposed increase to 2/3 cancelled) | Finance Canada Sept 2026 backgrounder; CRA | 2026 | L33–L34 |
| Home is personal-use property: losses not deductible | canada.ca, T4037 | current | L17 |
| CCA claimed on a rental → recapture added to income (Form T776, line 9947) | canada.ca, rental income pages | current | L36 |
| Change in use: deemed sale at market value unless s.45(2) election by signed letter with the return; up to 4 years, extendable under conditions | canada.ca, Folio S1-F3-C2 / T4037 | current | L41–L42 |
| Partial change-in-use election allowed since March 19, 2019 | Folio S1-F3-C2 ¶2.57 | current | L43 |
| Home + cottage: only one designated per year; T2091 required; plus-one rule requires Canadian residence in year of purchase | canada.ca, T4037 | current | L44–L45 |
| Tax rates: 2026 federal + Ontario brackets, surtax, OHP | CRA T4127 (122nd ed.), see LF-10 FACTS | 2026 | L22–L35 |

Not used (unverified): the "(1 + years designated) ÷ years owned" cottage formula — no numeric cottage example.

## Calculated results (`data.json`)
Single, Ontario, salary $90,000, gain $150,000, selling costs/renovations ignored.
- Mia (exempt): tax $0, keeps $150,000.
- Dev (flip, 100% business income): extra tax $65,669 (43.8%), keeps $84,331. Taxable income ≈ $240,000.
- Lena (capital gain, 50% = $75,000): extra tax $29,605 (19.7%), keeps $120,395. Taxable income ≈ $165,000.
- Dev vs Lena difference: $36,064.
