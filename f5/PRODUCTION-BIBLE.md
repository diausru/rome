# Production Bible: "Selling your home: when the principal residence exemption doesn't cover you" (topic F5)

Order: `channel/PUBLISHING-PLAN.md` §4, week 7. Approved look (Kit + Plate). Investing/property group: Fraunces (SERIF) headings, `pension2` music.
Voiceover: `f5/VOICEOVER.md`. Timeline: `showreel/src/f5-timeline.json`. Composition: `showreel/src/F5v2.tsx`. Publish: `f5/PUBLISH.md`.

## 0. Demand research (vidIQ, one call before the script)
`vidiq_keyword_research` (research, CA) "principal residence exemption canada": <750/mo. Related: "principal residence exemption" ≈3,516/mo (competition 22.4), "tax tips canada" ≈5,298/mo (competition 8.3, best opportunity 70.0), "canadian accountant" ≈4,563/mo (competition 9.9), "capital gains tax" ≈6,405/mo, "canadian taxes" ≈3,954/mo. 5 credits.
Conclusion: "usually tax-free… usually" hook; "Principal Residence Exemption" spelled out in the title; "tax tips canada" in keywords.

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (direct fetch blocked by the network proxy; facts from canada.ca search-result text), 2026-10-06.

| # | Claim used | Source |
|---|---|---|
| R1 | The sale of a principal residence must be reported and designated on Schedule 3; since 2017, also Form T2091(IND) | CRA "Reporting the sale of your principal residence for individuals"; "Principal residence" (line 12700) |
| R2 | Late designation penalty: the lesser of $8,000 or $100 for each complete month from the original due date | CRA "Reporting the sale of your principal residence" |
| R3 | Only one property can be designated per tax year per family unit | CRA "Principal residence"; Folio S1-F3-C2 |
| R4 | Flipped property rule (dispositions on or after Jan 1, 2023): a housing unit owned less than 365 consecutive days → profit is business income, fully included; the principal residence exemption is not available; life-event exceptions (e.g. death of the taxpayer or a related person, a related person joining the household such as the birth of a child, destruction or expropriation) | CRA "Principal residence" / Folio S1-F3-C2 / tax tips 2024 |
| R5 | Exemption formula: gain × (1 + years designated) ÷ years owned | CRA T4037 (used in the example) |

### Example (not a CRA rule) · `f5/example.py`
Bought $300,000, sold $450,000, lived there all 5 years and designated every year: gain $150,000 × (1 + 5) ÷ 5 → capped at the gain → **fully exempt**.

### Dependencies, exceptions, notes
- Renting out part or all of the home (change in use, elections), land over half a hectare, non-residents, and trusts: not covered.
- The life-event list is longer than the two examples (the card says "and other events CRA lists").
- Selling expenses would reduce the gain; omitted from the example for simplicity (stated as the example's assumption).

### Claims deliberately NOT made
- Change-in-use rules and the 45(2) election (not verified in this pass).

## 2. Project
| Field | Value |
|---|---|
| PLATE | `public/plates/f5-4k.jpg` (Higgsfield gpt_image_2_5, 2 variants 0.5 + 4K upscale 2 credits; checked: no text, signs, house numbers or plates): moving day at a red-brick house on a prairie street in autumn; a family loads plain boxes into a car; house keys, a pumpkin, a coffee and a plain envelope on the porch rail |
| PINS | envelope "$150,000 gain" · envelope "late: up to $8,000" · keys "one per year" · envelope "under 365 days: fully taxed" |
| STRIP | ✓ report + designate · 1 home · per family · per year · ✗ under 365 days → fully taxed |
| LIVE | steam from the coffee; camera between the family at the car and the porch props |
| VOICE | Grady; 145 words; 62.81 s (inside the tolerance); CTA reused from G3 |
| RENDER | 1080×1920, 24 fps, 1520 frames (63.3 s) |

## 3. QC log
- Stills v1: all beats clean; two small lines wrapped (family, flip) → shortened.
