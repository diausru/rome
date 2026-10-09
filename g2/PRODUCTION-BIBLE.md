# Production Bible: "Foreign property: who files T1135" (topic G2)

Order: `channel/PUBLISHING-PLAN.md` §4, week 9 (Sat), bridged from G4's CTA. Approved look (Kit + Plate), series upgrade (three scenes + bridge CTA). Newcomers group: Mont (SANS) headings, `work` music.
Voiceover: `g2/VOICEOVER.md`. Timeline: `showreel/src/g2-timeline.json`. Composition: `showreel/src/G2v2.tsx`. Publish: `g2/PUBLISH.md`. Analysis page: https://claude.ai/artifact/2PNKS24pwF6xN68pPhsQiD (`channel/analysis/g2-analysis.html`).

## Coordination check (handwritten session), 2026-10-09
Handwritten delivered B10 ($100K salary + $10K side hustle, commit f5a411f); its NEXT 3 TOPICS: "the same $10K in Alberta or Ontario", "CPP2 explained in one page". No foreign-property or newcomer topic → no overlap.

## 0. vidIQ analysis (cap 25 credits), 2026-10-09
| Call | Result |
|---|---|
| keyword_research (research, CA) "t1135 foreign property canada" | every T1135 term <750/mo ("t1135" competition 23, "t1135 reporting" 5.3, "cra t1135" 8.3, "t1135 penalties" 27.5, "foreign property reporting" 7.3); broad "cra" ≈26,538/mo (CA ≈2,852, −8.9%) |
| youtube_search (CA, by views, since 2024) "T1135 foreign property reporting canada" | Stefano Francescut "The 5 CRA Audit Triggers Catching Canadians Off Guard" 251.5K (12:28, outlier ×37.7; T1135 one of five); FIRE Financial "What is Foreign Income Reporting T1135?" 3.8K (27:41); Sunny's Tax Tips "Real Estate Outside Canada" 3.5K (6:38); CanadianTaxGuide "Own US Stocks Over $100K? CRA T1135 Rule" 1.1K (9:31); Ivan Dorie Arizona condo Short 1.2K (0:37) |
| outliers (shorts, 1 year) "foreign property canada tax report" | no Canadian T1135 Short among outliers; nearest: Dilendorf "Foreign Buyers' Biggest NYC Real Estate Tax Mistake" 39.8K (×50), Indian property-tax Shorts 100–173K |
| score_title × 2 (after the render) | "Own Property Back Home? The CRA Form T1135 Explained" **83** · "Foreign Assets Over $100K? You May Need to File T1135" **82** |
My calls = 25 credits. Balance 1,625 → 1,575 (−50; the other 25 most likely the parallel handwritten session, shared account).
Conclusion: search demand for "T1135" is small but competition is very low; the biggest view-getter frames T1135 as a CRA audit risk inside a long video. No Short explains it for newcomers with property back home: who files, what counts, cost on arrival, the first-year exemption, the late penalty. That is our angle (and it continues the New to Canada playlist).

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (direct fetch blocked by the proxy; page text via search restricted to canada.ca), 2026-10-09.

| # | Claim used | Source |
|---|---|---|
| R1 | Canadian residents file T1135 if the total cost of specified foreign property was more than $100,000 at any time in the year; filing is required even with no tax payable | CRA "Foreign Income Verification Statement"; "Questions and answers about Form T1135" |
| R2 | Part A simplified method: total cost more than $100,000 but less than $250,000 throughout the year; Part B detailed: $250,000 or more at any time | CRA T1135 Q&A; T1135 form |
| R3 | Specified foreign property includes funds in foreign bank accounts, real property outside Canada (other than personal-use / active business), shares of non-resident corporations even if held through a (Canadian) broker | CRA T1135 Q&A; "Form T1135" page |
| R4 | Excluded: personal-use property (used primarily, i.e. >50 %, for personal use, e.g. a vacation home used mainly as a personal residence; rented most of the time → reportable); property used exclusively in an active business; property held in an RRSP or TFSA | CRA T1135 Q&A |
| R5 | The test uses cost amount, not market value; for a new resident, cost = fair market value at the time of becoming resident | CRA T1135 Q&A |
| R6 | An individual (other than a trust) does not file T1135 for the tax year in which they first became resident | CRA T1135 Q&A |
| R7 | Late filing penalty: the greater of $100 or $25 a day, up to 100 days (max $2,500); higher penalties for knowing / grossly negligent failures; reassessment period +3 years when foreign income is unreported and T1135 is late or wrong | CRA "Questions and answers about penalties" (foreign reporting); "Foreign Income Verification Statement" |
| R8 | Due with the return: April 30 (June 15 if the person or spouse carried on a business) | CRA "Foreign Income Verification Statement" |
| R9 | Income from foreign property is always reported, regardless of the $100,000 threshold | CRA "Foreign Income Verification Statement" |

### Dependencies and limits (shown or said)
- Whether a vacation home is personal-use is a question of fact (rental vs personal use); stated as "used mainly by you".
- Cost for property bought after arrival = what was paid (converted to CAD); currency conversion rules not covered.
- Higher penalties (knowingly / gross negligence, 5 % after 24 months) only hinted ("more if knowingly"). Voluntary Disclosures Program not covered.

## 2. Project
| Field | Value |
|---|---|
| SCENES | Three plates of the same couple (scene 1 job 80409e26 as image reference; gpt_image_2_5 + 4K upscale each; checked: no text, labels, logos; the calculator display is blank): 1) `g2-s1-4k.jpg` winter evening, a framed photo of their apartment building back home on the table, key, tea, folder; the couple on the sofa with a phone (hook → form); 2) `g2-s2-4k.jpg` same evening, blank papers, glasses, calculator; the couple reading a sheet (counts → cost); 3) `g2-s3-4k.jpg` spring morning by the window with coffee, the framed photo and key on the sill (first year → end). Cuts at `counts` and `first` |
| PINS | framed photo "apartment back home: foreign property" · calculator "cost amount: not today's price" |
| STRIP | 1 cost > $100K · 2 banks · rentals · stocks · ✓ RRSP · TFSA out · 3 cost on arrival · ✓ year 1: not required |
| VOICE | Grady; 8 beats; 146 words; 63.51 s; bridge CTA "Next: leaving Canada? The departure tax. Follow so you don't miss it." (G5) |
| RENDER | 1080×1920, 24 fps, 1537 frames (64.0 s) |

## 3. QC log
- Stills v1: scene-1 photo frame clipped at the left → wider start (k 1.12); "not today's price" pin clipped at the right → moved left; scene-3 key pin fell off-frame → removed (the card and strip carry "year 1: not required").
- Final: 1537 frames, 64.04 s, h264 1080×1920 24 fps + AAC 48 kHz, decode OK, −14.1 LUFS; contact sheet checked (cards, pins, strip, scene cuts, end block, flag). vidIQ title scores 83 / 82 → primary "Own Property Back Home? The CRA Form T1135 Explained". Kit card #23 (Kit v30). Metricool: not sent.
