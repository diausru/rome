# Production Bible: "Leaving Canada: the departure tax" (topic G5)

Order: `channel/PUBLISHING-PLAN.md` §4, week 10 (Tue), bridged from G2's CTA. Approved look (Kit + Plate), series upgrade (three scenes + bridge CTA). Newcomers / international group: Mont (SANS) headings, `pension2` music (warm, calm: a retired couple).
Voiceover: `g5/VOICEOVER.md`. Timeline: `showreel/src/g5-timeline.json`. Composition: `showreel/src/G5v2.tsx`. Publish: `g5/PUBLISH.md`. Analysis page: https://claude.ai/artifact/QQCueMJYLThs5qKarVE6v4 (`channel/analysis/g5-analysis.html`).

## Coordination check (handwritten session), 2026-10-09
Handwritten delivered B2 (overlooked self-employed expenses); its NEXT 3 TOPICS: "CCA on your laptop / gear", "same $10K side hustle in Alberta or Ontario", earlier "CPP2" and "C4 expenses CRA often denies". No emigration topic → no overlap. Our next bridge (D1 tuition) is not in its plans; C4 is left to it.

## 0. vidIQ analysis (cap 25 credits), 2026-10-09
| Call | Result |
|---|---|
| keyword_research (research, CA) "departure tax canada" | seed ≈5,150/mo (competition 20.4, overall 65.1); "canada departure tax" ≈4,858 (17.0, overall 66.2); "canada exit tax" ≈4,620 (21.5); "exit tax canada" ≈4,087; "leaving canada" ≈4,772 (45.4); "canada tax" ≈4,177 |
| youtube_search (CA, by views, since 2024) "departure tax leaving canada" | Blueprint Financial "How the CRA Knows if You Left Canada" 541K (8:25); Tap the Maple "Canada's Exit Tax Is Leaving People Speechless" 316K (14:56); Toronto Sun "500K to leave Canada?" 305K (opinion); RealEstateTaxTips "Tax Implications of Leaving Canada Permanently" 239K (27:15, outlier ×120.6); Blueprint "7 CRA Tax Traps" 214K; The Plain Bagel "Canada's Exit Tax Explained" 189K (20:42) |
| outliers (shorts, 1 year) "leaving canada tax" | no departure-tax Short among outliers (results: emigration vlogs, politics, "Wealthy People Are Leaving Norway" 228K) |
| score_title × 2 (after the render) | "Leaving Canada? The Departure Tax Explained in 60 Seconds" **82** · "Canada's Exit Tax: Taxed on Investments You Never Sold" **76** |
My calls = 25 credits. Balance 1,575 → 1,550 (−25, all mine).
Conclusion: strong, low-competition demand (≈5K/mo on several phrasings) and a hot debate (exit-tax videos 190–540K in 2026), all long-form and often opinion. No Short gives the verified mechanics: what's treated as sold, a worked example, what's excluded, the 5-year rule, T1161, deferral. That is our angle; tone stays factual (no "trap").

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (direct fetch blocked by the proxy; page text via search restricted to canada.ca), 2026-10-09.

| # | Claim used | Source |
|---|---|---|
| R1 | On becoming a non-resident you are considered to have sold most property at fair market value and reacquired it at the same amount (departure tax); computed on Form T1243, gains to Schedule 3 | CRA "Dispositions of property for emigrants of Canada"; T1243 |
| R2 | Excluded: pension plans, annuities, RRSPs, RRIFs, TFSAs (and other listed plans); personal-use property worth less than $10,000 | same page |
| R3 | If resident 60 months or less in the 10 years before leaving: property owned when you last became resident, or inherited after, is excluded (not taxable Canadian property) | same page |
| R4 | FMV of all property owned when leaving over $25,000 → Form T1161 listing property inside and outside Canada, attached to the return | same page; T1161 |
| R5 | Election (T1244) to defer payment of departure tax, regardless of amount, without interest, until disposal; by April 30 of the year after emigrating; security required if the federal tax is over $16,500 ($13,777.50 former Québec residents) | same page; T1244 |
| R6 | Becoming non-resident is a question of fact (severing residential ties); NR73 optional | CRA "Determining your residency status" |
| R7 | Capital gains inclusion rate one-half (the proposed increase was cancelled) | Finance Canada 2026 backgrounder; CRA corporations "What's new" |

### Example (not a CRA rule)
Shares outside an RRSP/TFSA bought for $40,000, FMV $100,000 on leaving → gain $60,000 × ½ = $30,000 taxable capital gain added to income that year. Tax depends on the province and other income (not computed).

### Dependencies and limits
- Canadian real property: two search summaries of the current CRA page contradicted each other (excluded vs listed as subject to the deemed disposition); not checked against s. 128.1(4)(b) of the Income Tax Act → NOT mentioned in the video. [VERIFY before any future use]
- Business property, U.S. tax, treaty rules, non-resident withholding on later income, returning to Canada (unwinding) not covered.
- Whether and when someone becomes non-resident depends on their ties (not stated as a rule in the video beyond "when you become a non-resident").

## 2. Project
| Field | Value |
|---|---|
| SCENES | Three plates of the same couple in their sixties (scene 1 job beaa3884 as image reference; gpt_image_2_5 + 4K upscale each; checked: no text, the maps have no labels, box labels blank): 1) `g5-s1-4k.jpg` packing the house in autumn, boxes, tape, world map (hook → rule); 2) `g5-s2-4k.jpg` the emptied living room at night, blank papers, calculator, key, tea (example → short); 3) `g5-s3-4k.jpg` a sunny terrace abroad, map, glasses, folder, suitcase (forms → end). Cuts at `example` and `forms` |
| PINS | box "treated as sold: at market value" · calculator "example: $60,000 gain, never sold" |
| STRIP | 1 sold at market value · 2 ½ of the gain taxed · ✓ RRSP · TFSA · pensions out · ✓ ≤ 5 years: brought-in out · 3 T1161 over $25K |
| VOICE | Grady; 8 beats; 149 words; 69.66 s (first take 74.73 s > 1:10 → three lines shortened and regenerated); bridge CTA "Next: your tuition slip, and what it's worth at tax time. Follow so you don't miss it." (D1) |
| RENDER | 1080×1920, 24 fps, 1684 frames (70.2 s) |

## 3. QC log
- Stills v1: short-stay label and note wrapped → shortened; T1161 note wrapped → shortened; end headline left "tax" alone → "Plan the departure tax / before you leave."; scene 3 camera raised. Known trade-off: in scene 3 the couple stands at the very top of the plate, so the faces sit behind the header/card; the table, sea and suitcase carry the scene.
- Final: 1684 frames, 70.17 s, h264 1080×1920 24 fps + AAC 48 kHz, decode OK, −14.1 LUFS; contact sheet checked (cards, pins, strip, both scene cuts mid-transition, end block, flag). vidIQ title scores 82 / 76 → primary "Leaving Canada? The Departure Tax Explained in 60 Seconds". Kit card #24 (Kit v31). Metricool: not sent.
