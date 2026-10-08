# Production Bible: "New to Canada: your first tax return" (topic G1)

Order: `channel/PUBLISHING-PLAN.md` §4, week 9 (Tue). Approved look (Kit + Plate), series upgrade (three scenes + bridge CTA). Newcomers group: Mont (SANS) headings, `work` music (young, upbeat).
Voiceover: `g1/VOICEOVER.md`. Timeline: `showreel/src/g1-timeline.json`. Composition: `showreel/src/G1v2.tsx`. Publish: `g1/PUBLISH.md`. Analysis page: https://claude.ai/artifact/PWg8HLQT8S654pJcxgES1e (`channel/analysis/g1-analysis.html`).

## Coordination check (handwritten session), 2026-10-08
Handwritten made B8 (creator & platform income); its NEXT 3 TOPICS: "tax on $10,000 of creator income", C4 expenses CRA often denies. No newcomer topic → no overlap.

## 0. vidIQ analysis (cap 25 credits), 2026-10-08
| Call | Result |
|---|---|
| keyword_research (research, CA) "first tax return canada newcomer" | seed <750/mo; "moving to canada" ≈15,852/mo (+125% vs baseline; CA ≈8,777); "how to file taxes in canada" ≈4,957/mo; "how to maximize tax refund canada" ≈4,854; "canadian tax guide" ≈4,746 (competition 13.3); "tax return canada" ≈4,573 (competition 10.6, overall 68.5); "how to file taxes canada" ≈3,808 |
| youtube_search (CA, by views, since 2024) "newcomer first tax return canada" | CRA-account setup videos dominate: Navreet Vlogs 259K (8:24, outlier ×67), PC Vlogs 159K + 133K + 44K; Wealthsimple tutorials (Living in Canada 132K, Michael Kim 39K, Griffin Milks 39K); Sean Pro Max 40-s Short 55K |
| outliers (shorts, 1 year) "new to canada file taxes first year" | no newcomer tax Short among outliers; nearest newcomer Shorts: CanadianSIM "New to Canada? Activate your SIM" 127K (×314), MDC Canada immigration numbers 241K |
| score_title × 2 (after the render) | see §3 |
Conclusion: big and rising newcomer audience ("moving to canada" +125%); newcomers search "how to file taxes in canada" and watch CRA-account how-tos, but nobody explains in a Short what is DIFFERENT in year one (residency date, world income, 2-year statement, prorated credits, benefits before filing). That is our angle.

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (direct fetch blocked; page text via search restricted to canada.ca), 2026-10-08.

| # | Claim used | Source |
|---|---|---|
| R1 | You become resident for tax purposes when you establish significant residential ties (home, spouse/partner, social ties), usually on the date you arrive; unsure → Form NR74 | CRA "Newcomers to Canada"; archived tip; NR74 |
| R2 | Report world income for the part of the year you were resident; foreign income may be exempt under a tax treaty (line 25600); convert at Bank of Canada rate | CRA "Completing your return for newcomers" |
| R3 | Income earned outside Canada before becoming resident is generally not taxed in Canada; report it (up to 2 years before) on a Statement of Income so CRA can calculate benefits | CRA "Completing your return for newcomers"; tax tip 2025/2026 |
| R4 | Most federal non-refundable credits are prorated by days resident (arrival date on page 1); some are not (CPP/QPP, tuition, medical, donations…); 90% rule exception | CRA "Federal non-refundable tax credits for newcomers and emigrants" |
| R5 | Apply for benefits before your first return: RC151 (GST/HST credit — current CRA title "Canada Groceries and Essentials Benefit") or RC66 (CCB, also covers the credit); SIN needed first | CRA RC151 page; "How to get the benefit"; RC66 |
| R6 | File a return every year, even with little or no income, to keep receiving benefits; first return due April 30 of the following year | CRA newcomers tax tip |
| R7 | 2026 federal basic personal amount $16,452 | CRA T4127 2026 (series parameter set, `salary/calc.py`) |

### Example (not a CRA rule) · `g1/example.py`
Arrived and resident from September 1, 2026: 122 days → $16,452 × 122 ÷ 365 = **$5,499** (rounded; "about a third"). Assumes the 90% rule does not apply.

### Notes and limits
- Provincial credits follow the province of residence on December 31 (not covered).
- Deemed acquisition of property at arrival (FMV), T1135 after arrival, CPP/EI: not covered.
- Credit name: CRA's current RC151 page titles the credit "Canada Groceries and Essentials Benefit"; the screen shows "GST/HST credit, now CGEB".

## 2. Project
| Field | Value |
|---|---|
| SCENES | Three plates of the same couple (scene 1 job a406f9ea as image reference; gpt_image_2_5 + 4K upscale each; checked: no text, passports, flags or signs): 1) `g1-s1-4k.jpg` September, arriving in their first empty apartment with suitcases (hook → residency); 2) `g1-s2-4k.jpg` late October evening at their table with blank papers, first snow (world → prorate); 3) `g1-s3-4k.jpg` an April morning in the cosy home with tulips (benefits → end). Cuts at `world` and `benefits` |
| PINS | keys "resident from the day you arrive" · envelope "statement of income: 2 years abroad" · folder "122 days ≈ $5,499" · envelope "RC151 · RC66" |
| STRIP | 1 residency date · 2 world income after · 3 2 years abroad listed · 4 credits × days · ✓ RC151 · RC66 |
| VOICE | Grady; 139 words; 60.92 s; bridge CTA "Next: the benefits newcomers can claim. Follow so you don't miss it." |
| RENDER | 1080×1920, 24 fps, 1475 frames (61.5 s) |

## 3. QC log
- Stills v1: prorate pin clipped at the right edge → removed (the card carries the number); two card notes wrapped → shortened. Final: 1475 frames, 61.46 s, h264 1080×1920 + AAC 48 kHz, decode OK, −14.2 LUFS; contact sheet checked. vidIQ title scores 88 / 88 → primary 'How to File Taxes in Canada as a Newcomer (Year One Rules)' (exact search phrase). Kit card #21. Metricool: not sent.
