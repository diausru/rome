# LF-25 — FACTS (the complete Canadian tax year)
Date checked: 2026-11-13. Method: WebSearch hit its limit, canada.ca not reachable by WebFetch; 1 Scrape Creators Google search restricted to site:canada.ca (snippets of the CRA pages) + facts verified in earlier episodes. Calculations: `data.py` → `data.json` (LF-10 `th()`, LF-19 data).

| Claim | Source | Year | Used in |
|---|---|---|---|
| Filing dates for 2025 taxes: RRSP/PRPP/SPP contribution deadline March 2, 2026; file by April 30, 2026; self-employed June 15, 2026 | canada.ca CRA "Due dates and payment dates – Personal income tax"; "Important dates for RRSPs…"; Line 20800 (Google snippets) | 2025 tax year | L20–L22, L55–L56 |
| "You and your spouse… have until April 30 each year to do your taxes"; self-employed later filing | canada.ca CRA Students / Adults 65+ pages (snippets) | current | L21–L22 |
| Balance owing still due April 30 for self-employed; instalment dates Mar 15 / Jun 15 / Sep 15 / Dec 15 | see LF-23 FACTS | current | L22, L26 |
| CPP/EI limits reset Jan 1; Dana's pay schedule $2,552.03 → $2,806.40 | see LF-19 FACTS + data | 2026 | L1–L2, L13–L14, L28–L30 |
| TD1 claims; extra tax on TD1; more than one employer | see LF-24 / LF-18 FACTS | current | L15–L17, L54 |
| CCB recalculated every July from the previous year's family net income | see LF-16 FACTS | 2026–27 | L24–L25, L57 |
| RRSP contributions in the first 60 days can be deducted for the previous year; unused contributions can be deducted later; RRSP limit on the notice of assessment | see LF-20 FACTS | current | L20, L38, L43, L50 |
| Refund/balance owing = tax withheld vs real tax | see LF-18 FACTS | current | L46–L48 |

Not used (not confirmed): the exact 2027 RRSP deadline for the 2026 tax year (stated only as "the first sixty days"), T4 issue deadline (stated as "early in the year").

## Calculated results (`data.json`)
- Dana, $90,000, Ontario 2026: withheld ≈ $17,034 (= annual tax / 26 × 26, LF-19 model) ≈ real tax → return ≈ $0.
- $5,000 RRSP contribution in February 2027 deducted on the 2026 return → refund ≈ $1,482.
