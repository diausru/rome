# LF-13 — FACTS (federal vs provincial tax)
Date checked: 2026-10-31. Method: WebSearch restricted to canada.ca (1 pass). Calculations: `data.py` (2026 tables: ON via LF-10 `th()`, AB/BC via `tools/taxcalc.py`).

| Claim | Source | Tax year | Used in |
|---|---|---|---|
| Provinces/territories set their own tax laws; the CRA collects and administers personal income tax for them, except Quebec; governed by Tax Collection Agreements | canada.ca, "Provincial and territorial tax and credits for individuals"; CRA overview | current | L8–L12, L56 |
| Residents outside Quebec complete the provincial/territorial Form 428 (ON428 in Ontario); Quebec residents deal with Revenu Québec | same canada.ca page | current | L11, L13 |
| Quebec abatement = 16.5% of basic federal tax; compensation to Quebec for opting out of certain federal programs (1960s) | canada.ca, Dept. of Finance "Quebec Abatement"; CRA T4032-QC (2026: rate remains 16.5%) | 2026 | L34–L35, L54 |
| Employers deduct federal + provincial tax using the province of employment; federal TD1 for all, provincial TD1 when more than the basic amount is claimed | CRA T4001 Employers' Guide; canada.ca "Get the completed TD1 forms" | current | L14, L52 |
| Province of residence on December 31 decides provincial tax for the year | canada.ca (see LF-04 FACTS) | current | L28, L49 |
| Federal 14% / 20.5% (threshold $58,523); Ontario 5.05% / 9.15% (threshold $53,891); Ontario surtax; Ontario Health Premium bands; CPP/EI 2026 | CRA T4127 (Jan 2026), T4032-ON (see LF-10 FACTS) | 2026 | L18–L19, L24, L41 |
| Alberta and BC 2026 brackets and basic personal amounts | `salary/calc.py` tables (CRA T4127 2026, provincial tables) | 2026 | L29 |

Not used: provincial BPA dollar values on screen; Quebec dollar figures (not modelled); line numbers of the return.

## Calculated results (`data.json`)
Single, employment income only, no other deductions.
- $75,000 ON: federal $8,259, Ontario $4,446 (ON tax $3,696 + OHP $750), total $12,705; ≈65% federal. Per month ≈ $688 / $370.
- $75,000: provincial AB $4,010, BC $3,661; federal $8,259 in all three (gap ON–BC $785).
- ON ladder: $40K fed $2,691 / ON $1,671 (62% fed); $150K $25,302 / $14,608 incl. surtax $2,511 (63%); $250K $53,524 / $34,161 (61%).
- $1,000 RRSP deduction at $75K ON: federal −$205, Ontario −$91 (≈$296).
Dependencies named on screen: Quebec, credits on the provincial form, moves during the year.
