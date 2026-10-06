# Production Bible: "Child care expenses: who claims" (topic D5)

Order: `channel/PUBLISHING-PLAN.md` §4, week 6. Approved look (Kit + Plate). Family group: Nunito 900 headings, `kids` music.
Voiceover: `d5/VOICEOVER.md`. Timeline: `showreel/src/d5-timeline.json`. Composition: `showreel/src/D5v2.tsx`. Publish: `d5/PUBLISH.md`.

## 0. Demand research (vidIQ, one call before the script)
`vidiq_keyword_research` (research, CA) "child care expenses deduction canada": <750/mo; "child care expenses", "childcare tax refund" <750/mo. Broad related terms with volume: "taxtips" ≈4,835/mo, "canadian tax guide" ≈4,746/mo (competition 13.3), "canada tax" ≈4,177/mo. 5 credits.
Conclusion: low direct search → the hook is the felt situation ("Paying for daycare?"), and broad terms (Canada tax, tax tips) go in the title/keywords; the video is discovery-driven (feed), not search-driven.

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (direct fetch blocked by the network proxy; facts from canada.ca search-result text), 2026-10-06.

| # | Claim used | Source |
|---|---|---|
| R1 | Claimed on line 21400 using Form T778 | CRA "Line 21400 – Child care expenses"; Form T778 page |
| R2 | Eligible expenses include caregivers providing child care, day nursery schools and daycare centres, day camps and day sports schools (primary goal: caring for children), educational institutions for the child-care part of fees | CRA "Expenses you can claim" |
| R3 | Yearly limit per child: $8,000 (under 7 at the end of the year), $5,000 (7 to 16), $11,000 (child eligible for the disability tax credit) | CRA line 21400 pages; Folio S1-F3-C1 |
| R4 | The claim cannot exceed 2/3 of the claimant's earned income | Folio S1-F3-C1 |
| R5 | Generally the person with the lower net income (including zero) must claim; the higher-income spouse can claim only in listed situations: the other was in a qualifying educational program, was incapable of caring for children (confined 2+ weeks to bed, wheelchair or hospital, or indefinitely with a doctor's statement), was in prison 2+ weeks, or the couple was separated (90+ days, reconciled within 60 days of the next year) | CRA "Determine who can claim the deduction" |
| R6 | Receipts must show the services; for an individual caregiver, their SIN; receipts are not sent with the return but kept | CRA "Expenses you can claim" / how to claim |
| R7 | Line 21400 is a deduction in computing net income (line 23600), which is the base for the CCB's adjusted family net income | CRA return structure; D2 research |

### Example (not a CRA rule) · `d5/example.py`
Two parents earning $90,000 and $30,000; one child aged 3; daycare $9,000. The $30,000 parent claims: min($9,000 paid, $8,000 limit, 2/3 × $30,000 = $20,000) = **$8,000**.

### Dependencies, exceptions, notes
- Higher-earner claims are limited to weekly amounts (per child per week) and need Part C of T778: stated as "weekly limits apply · Form T778", amounts not given.
- Boarding schools and overnight camps have weekly limits; not covered.
- Medical expenses, tuition, transportation and clothing are not child care expenses (not mentioned).
- Provincial programs (e.g. $10-a-day child care fees) still produce receipts; the deduction applies to the amount actually paid: not stated, not needed.

### Claims deliberately NOT made
- That a zero-income parent's claim is useful (with no earned income the 2/3 cap is $0; covered only by "cap").
- Weekly amounts for higher-earner claims (not verified in this pass).

## 2. Project
| Field | Value |
|---|---|
| PLATE | `public/plates/d5-4k.jpg` (Higgsfield gpt_image_2_5, 2 variants 0.5 + 4K upscale 2 credits; checked: no text, signs or letters; the educator's badge is blank): a daycare entrance on an autumn morning; a parent hugs a preschooler goodbye, an educator waves; a dinosaur backpack, lunch box, blank slip, car keys and a coffee on the cubby shelf |
| PINS | backpack "up to $8,000" · slip "lower earner claims $8,000" · lunch box "2/3 × $30,000 = up to $20,000" · slip "SIN on the receipt" |
| STRIP | under 7 $8,000 · 7–16 $5,000 · lower earner claims · cap 2/3 earned income · ✓ receipts |
| LIVE | steam from the coffee; camera between the goodbye hug, the room and the shelf props |
| VOICE | Grady; 147 words; 65.02 s (inside the tolerance); bridge CTA (new line): "Next: why a small corporation pays just nine percent. Follow so you don't miss it." |
| SCENES | Series upgrade (user, 2026-10-06): three plates of the same mother and daughter, generated with the daycare plate as image reference (gpt_image_2_5 + 4K upscale each): 1) `d5-s1-4k.jpg` morning hallway, zipping the pink jacket (hook → limits); 2) `d5-4k.jpg` daycare door (who → cap); 3) `d5-s3-4k.jpg` evening kitchen, sorting receipts while the girl colours (exceptions → end). Cuts at `who` and `exceptions` with `SceneCuts` (Plate.tsx): an 18-frame whip push, both plates travelling edge to edge, ghost-trail motion blur, warm light sweep. Checked: no text in any plate, same people |
| RENDER | 1080×1920, 24 fps, 1573 frames (65.5 s) |

## 3. QC log
- Stills v1: the example hero overflowed the card; the exceptions label wrapped into the first line; the backpack pin sat under the card → hero is "$8,000" with a line under it; label "EXCEPTIONS" plus a lead-in line; pin moved down onto the backpack. Re-checked: clear.
- v2 (2026-10-06): three scenes + transitions + bridge CTA. Transition v1 showed a black edge at the peak (incoming plate offset) → reworked to an edge-to-edge push; re-checked frame by frame: seamless.
