# Production Bible: "Rental property: deductions and the CCA trap" (topic F4)

Order: `channel/PUBLISHING-PLAN.md` §4, week 7 (Sat). Approved look (Kit + Plate), series upgrade (three scenes + bridge CTA). Property group: Fraunces (SERIF) headings, `pension2` music.
Voiceover: `f4/VOICEOVER.md`. Timeline: `showreel/src/f4-timeline.json`. Composition: `showreel/src/F4v2.tsx`. Publish: `f4/PUBLISH.md`.

## 0. Demand research (vidIQ, one call before the script)
`vidiq_keyword_research` (research, CA) "rental property tax canada": <750/mo. Related: "rental income tax canada" ≈3,605/mo (competition 11.3, overall 67.3: best opportunity), "rental property" ≈30,713/mo (+190% vs baseline), "real estate tax strategies" ≈5,399/mo, "tax deductions" ≈3,508/mo; long-tail (<750 each): "tax deductions for rental property", "cra rules rental property", "capital gains tax canada rental property". 5 credits.
Conclusion: hook on the landlord's felt risk ("one deduction can bite you when you sell"); title with "Rental Income Tax Canada" / "Rental Property"; description covers deductible expenses + CCA + recapture.

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (direct fetch blocked by the network proxy; facts from canada.ca page text returned by search restricted to canada.ca), 2026-10-08.

| # | Claim used | Source · year |
|---|---|---|
| R1 | Deductible rental expenses include mortgage interest (on money borrowed to buy or improve the rental), property taxes, insurance, maintenance and repairs, utilities, management and administration fees | CRA "Rental expenses you can deduct" (T776) · current |
| R2 | You cannot deduct the value of your own labour; the principal part of a mortgage payment is not deductible (only interest) | CRA "Rental expenses you can deduct"; T4036 · current |
| R3 | Current vs capital: restoring a property to its original condition is usually current (repairing wooden steps); improving beyond original condition is capital (replacing wooden steps with concrete steps) | CRA T4036 "Current expenses or capital expenses" · current |
| R4 | Capital costs of the building are recovered through CCA; most rental buildings acquired after 1987 are Class 1 at 4% (declining balance); in the acquisition year generally only half the net addition (half-year rule); land is not depreciable | CRA "Classes of depreciable property" / "Amount of CCA you can claim" / CCA example (rental) · current |
| R5 | You cannot use CCA to create or increase a rental loss; you can claim any amount up to the maximum, including none | CRA "Amount of capital cost allowance you can claim" · current |
| R6 | A rental property costing $50,000 or more is its own separate class; recapture / terminal loss is computed on that property alone | CRA T4036 / IT-274R (archived) · current guide |
| R7 | In the year of sale, if the class's UCC goes negative (proceeds, limited to capital cost, exceed UCC), the negative amount is recaptured CCA added to income (T776 line 9947); fully included, unlike a capital gain (½ inclusion) | CRA T776 line 9947; T4037 · current |

### Example (not a CRA rule) · `f4/example.py`
Building portion $300,000 (land excluded), Class 1, full CCA every year (net rental income assumed large enough each year), separate class. Year 1: 300,000 × 4% × ½ = **$6,000**. Ten years cumulative **$96,395**, UCC $203,605. Building part sold for more than $300,000 → recapture = min(cost, proceeds) − UCC = 300,000 − 203,605 = **$96,395** added to income in the year of sale (any excess over cost is a capital gain, not shown).

### Dependencies, exceptions, notes
- Whether claiming CCA pays off depends on the owner's tax rate now vs in the year of sale, the expected sale price of the building portion, and whether the property is ever sold: "plan before you claim" (professional advice situation).
- Not covered: Class 3 (pre-1988 buildings), terminal loss, replacement-property deferral, the land/building allocation, change in use, principal residence + rental mix, short-term rentals, GST/HST on new residential rentals, the land interest/tax restriction.
- Personal-use portion of a property (renting part of your home) changes the rules: not covered.

### Claims deliberately NOT made
- A dollar tax figure on the recapture (depends on the bracket).
- "CCA is always bad" — the VO says "often a deferral, not a gift".

## 2. Project
| Field | Value |
|---|---|
| SCENES | Three plates of the same landlord (scene 1 job 5917e264 as image reference; gpt_image_2_5 + 4K upscale each; checked: no text, signs, house numbers or tape-measure marks): 1) `f4-s1-4k.jpg` repairing a wooden step at his rental duplex (hook → capital); 2) `f4-s2-4k.jpg` evening at his kitchen table with blank statements (cca → limit); 3) `f4-s3-4k.jpg` handing the keys to a young couple who bought it (trap → end). Cuts at `cca` and `trap` with SceneCuts |
| PINS | envelope "interest only / principal not deductible" · new boards "wood → concrete: capital" · keys "year 1 $6,000" · tea "net rental income $0? CCA $0" · keys on the rail "+$96,395 income" |
| STRIP | ✓ current: deduct now · capital → CCA · 4% class 1 · ½ in year one · ✗ no CCA rental loss · recapture fully taxed |
| LIVE | steam over the coffee / tea; camera between the landlord and the props |
| VOICE | Grady; 146 words; three lines re-generated shorter (first take 76.2 s) → 68.76 s; bridge CTA "Next: money moves to make before December thirty-first. Follow so you don't miss it." |
| RENDER | 1080×1920, 24 fps, 1663 frames (69.3 s) |

## 3. QC log
- Stills v1: 'CCA $0' pin on the tea collided with the strip → limit camera key v 0.4; repair card note wrapped → shortened. Final render: 1663 frames, 69.29 s, h264 1080×1920 + AAC 48 kHz, decode OK, −14.0 LUFS (the background job hit its time limit during the share encode; render complete, share copy rebuilt and re-verified). Contact sheet checked. vidIQ title score 81 ('Rental Income Tax in Canada: The Deduction That Bites Back'); kit card #18. Metricool: not sent (user rule 2026-10-07).
