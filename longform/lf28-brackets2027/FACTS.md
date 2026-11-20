# LF-28 — FACTS (2027 tax brackets, provinces, families)
Date checked: 2026-11-20. Method: WebSearch (canada.ca), 7 searches (search-result summaries; WebFetch to canada.ca and to the user's article blocked in this session). The user's article (immigrationnewscanada.ca) could not be read — not used as a source.
Caveat: the search tool flagged the T4127 Jan-2027 page metadata as inconsistent; every figure below was cross-checked by arithmetic against 2026 values × the stated index rate (all match).

| Claim | Source | Year | Used in |
|---|---|---|---|
| Federal index rate 2027 = 2.6% | CRA T4127 124th ed. (Jan 1 2027), Table 8.x | 2027 | L8–L9 |
| Federal brackets 2027: 14% ≤ $60,044; 20.5% ≤ $120,088; 26% ≤ $186,157; 29% ≤ $265,203; 33% above (2026: 58,523 / 117,045 / 181,440 / 258,482 × 1.026 ✓) | T4127 124th ed. | 2027 | L11–L16 |
| Federal BPA max $16,879 (2026 $16,452; ×1.026 ✓); min $15,214 | T4127 124th ed.; Finance Canada report | 2027 | L17–L18 |
| Ontario index 2.1%; thresholds $55,023 / $110,049 / $150,000 / $220,000; basic $13,261 (2026 $53,891 / $107,785 / $12,989) | T4127 124th ed. | 2027 | L32 |
| Alberta: index = lower of CPI and 2%; first threshold $62,424 (2026 $61,200); basic $23,225 | T4127 124th ed. | 2027 | L33 |
| Saskatchewan: index 2.6% + extra $500 (Affordability Act 2025); basic $21,411 | T4127 124th ed. | 2027 | L34 |
| Nova Scotia: index 3.5%; basic $12,350 | T4127 124th ed. | 2027 | L35 |
| New Brunswick: index 2.6%; basic $14,019 | T4127 124th ed. | 2027 | L36 |
| BC: indexation of brackets and NRTCs paused at 2026 levels for 2027–2030 (except renter's credit); thresholds unchanged; basic $13,216 | T4127 124th ed. (BC announcement Feb 17 2026) | 2027–2030 | L38 |
| Manitoba: no index rate; thresholds $47,000 / $100,000 | T4127 124th ed. | 2027 | L39 |
| PEI: basic $15,000, not indexed | T4127 124th ed. | 2027 | L40 |
| CCB July 2026–June 2027: max $8,157 under 6, $6,883 for 6–17; full amount below AFNI $38,237; reduction to $82,847 tier; based on 2025 income; recalculated every July, indexed | canada.ca CCB "How much you can get"; T4114; Jul 2026 news releases | 2026–27 | L47–L52 |
| Child disability benefit up to $3,480/yr | canada.ca CDB | 2026–27 | L53 |
| GST/HST credit renamed Canada Groceries and Essentials Benefit (July 2026); 2026–27 max $679 single, $890 couple, $234 per child under 19; temporary 25% increase for five years (ITA 122.5(3.005)); based on the 2025 return | canada.ca CGEB "How much"; payments chart; Finance explanatory notes (Bill C-19) | 2026–27 | L54–L56, L67 |
| CPP 2027: YMPE $76,700; YAMPE $87,400 | CRA CPP rates page; CPP2 page | 2027 | L58 |
| EI 2027: $1.64 per $100; MIE $70,800; max employee premium $1,161.12 | ESDC news release (Sep 2026); 2027 actuarial report | 2027 | L59 |
| RRSP dollar limit 2027 $35,390 | CRA MP/RRSP/DPSP/TFSA limits page | 2027 | L61 |
| TFSA 2027 limit not found on canada.ca at check time | CRA TFSA pages | — | L62 |

Model (data.py): federal "basic" tax = bracket tax − 14% × BPA (other credits ignored, stated on screen): $50K −$60, $75K −$159, $100K −$159, $150K −$326. $75,000 → $76,950 (+2.6%): $9,268 → $9,509 (= ×1.026). Provincial basic-amount value = increase × lowest provincial rate (2026 tables): SK $108, NS $37, AB $36, NB $33, ON $14, BC/MB/PE $0.
Not in video (unverified): CPP contribution rate/maximum for 2027 (search summary inconsistent), Quebec, NL/territories, provincial surtaxes, OAS 2027, TFSA 2027, CCB July 2027 amounts.
