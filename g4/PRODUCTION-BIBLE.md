# Production Bible: "Benefits newcomers can claim" (topic G4)

Order: `channel/PUBLISHING-PLAN.md` §4, week 9 (after G1; bridge from G1's CTA). Approved look (Kit + Plate), series upgrade (three scenes + bridge CTA). Newcomers group: Mont (SANS) headings, `kids` music (light, curious: a young family).
Voiceover: `g4/VOICEOVER.md`. Timeline: `showreel/src/g4-timeline.json`. Composition: `showreel/src/G4v2.tsx`. Publish: `g4/PUBLISH.md`. Analysis page: https://claude.ai/artifact/3RWVD9kBombugYpN7RLfL2 (`channel/analysis/g4-analysis.html`).

## Coordination check (handwritten session), 2026-10-08
Handwritten made B9 ($10K side income, two tax bills) and B10 ($100K salary + $10K side hustle, commit 10c723c); its NEXT 3 TOPICS are side-income calculations. No newcomer or benefits topic → no overlap. G2 (T1135) is not in its plans.

## 0. vidIQ analysis (cap 25 credits), 2026-10-08
| Call | Result |
|---|---|
| keyword_research (research, CA) "benefits for newcomers in canada" | seed <750/mo; "canada child benefit" ≈4,855/mo (competition 20.2, overall 64.9); "newcomers to canada" ≈4,375/mo (competition 16.8, overall 65.9); "canada immigration" ≈113,206/mo (competition 43.6) |
| youtube_search (CA, by views, since 2024) "benefits for newcomers canada child benefit gst credit" | Narcity × CRA sponsored "Tax Benefits and Credits for Newcomers" 130K (2:15, outlier 8.3); long Ukrainian-language interview 17K (35 min); RC151 how-to tutorials |
| outliers (shorts, 1 year) "canada child benefit newcomers money" | ESDC "The new Canada Grocery and Essentials Benefit" 15.1M (16 s, breakout ×38,506); Jassi Dhandian "Canada Groceries & Essentials Benefit — how much could you get?" 70K (27 s); the rest off-topic (insurance ads) |
| score_title × 2 (after the render) | "New to Canada? 3 Benefits You Can Claim Right Away" **83** · "Newcomers to Canada: Child Benefit, CGEB and Dental (How to Apply)" **82** |
My calls = 25 credits. Balance 1,665 → 1,625 (−40; the other 15 most likely the parallel handwritten session, shared account).
Conclusion: "canada child benefit" and "newcomers to canada" are real, low-competition searches; the new CGEB name already has a viral government Short (15M), so the audience knows the word but not that newcomers must APPLY (RC151 / RC66) instead of waiting for a return, nor the 18-month rule for permit holders. That is our angle.

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (direct fetch blocked by the proxy; page text via search restricted to canada.ca), 2026-10-08.

| # | Claim used | Source |
|---|---|---|
| R1 | CGEB is a tax-free quarterly payment for low- and modest-income individuals and families; it replaced the GST/HST credit on July 3, 2026; paid on the 5th of July, October, January and April | CRA "Canada Groceries and Essentials Benefit" (RC4210), "Payment dates"; Finance backgrounder 2026-01 |
| R2 | CCB maximum July 2026–June 2027: $8,157 a year per child under 6 ($679.75/month), $6,883 for 6–17; reduced above adjusted family net income $38,237 | CRA "How much you can get — CCB"; 2026-07 government news releases |
| R3 | Temporary residents qualify for CCB only after living in Canada throughout the previous 18 months AND holding a valid permit in the 19th month (permit must not say "does not confer status") | CRA "Who can apply — CCB"; RC66SCH |
| R4 | Newcomers apply: RC151 (CGEB, no children) or RC66 + RC66SCH (children; also registers for CGEB); a SIN is needed | CRA RC151, RC66, "Newcomers to Canada and the CRA"; CRA newcomer factsheet |
| R5 | CDCP: no access to dental insurance; tax return filed in Canada (you and spouse/partner); adjusted family net income under $90,000; resident for tax purposes; co-pay from $70,000 | canada.ca "Do you qualify — Canadian Dental Care Plan" (updated Sept 2026) |
| R6 | All three are calculated from the tax return; file every year, even with no income, or payments stop | CRA CGEB "who is eligible"; CCB; CDCP qualify page |

### Dependencies and limits (shown or said)
- Amounts depend on family income and size; the $8,157 is a maximum, not a typical payment.
- CDCP for a newcomer depends on having filed the reference-year return (canada.ca names the year); not stated as immediate.
- Provincial benefits paid through CGEB/CCB, and provincial health coverage, are not covered.
- "Some payments can start almost right away" = CGEB/CCB once the RC151/RC66 application is processed; temporary residents wait for the 18-month condition for CCB.

## 2. Project
| Field | Value |
|---|---|
| SCENES | Three plates of the same young family (scene 1 job affb7229 as image reference; gpt_image_2_5 + 4K upscale each; checked: no text, labels or logos): 1) `g4-s1-4k.jpg` unpacking groceries in their first winter kitchen, baby in a high chair (hook → CGEB); 2) `g4-s2-4k.jpg` living room, mother with baby on the sofa, father with blank mail, bottle and envelope on the table (CCB → apply); 3) `g4-s3-4k.jpg` bathroom, the baby's first toothbrush (dental → end). Cuts at `ccb` and `dental` |
| PINS | envelope "paid in Jan · Apr · Jul · Oct" · envelope "you need a SIN" |
| STRIP | 1 CGEB · quarterly · 2 CCB · monthly · ✓ RC151 · RC66 · 3 CDCP · dental |
| VOICE | Grady; 8 beats; 67.19 s; bridge CTA "Next: own property back home? When CRA wants form T1135. Follow so you don't miss it." |
| RENDER | 1080×1920, 24 fps, 1625 frames (67.7 s) |

## 3. QC log
- Stills v1: CGEB pin collided with the strip → moved to the envelope; CCB note wrapped → shortened; dental caption clipped → "3 · Dental Care Plan"; dental pin covered the baby → removed (the card carries the number); end line → "It all runs on your return."
