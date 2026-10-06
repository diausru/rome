# Production Bible: "Capital gains basics" (topic F1)

Order: `channel/PUBLISHING-PLAN.md` §4, week 7. Approved look (Kit + Plate). Investing group: Fraunces (SERIF) headings, `pension` music (warm, calm).
Voiceover: `f1/VOICEOVER.md`. Timeline: `showreel/src/f1-timeline.json`. Composition: `showreel/src/F1v2.tsx`. Publish: `f1/PUBLISH.md`.

## 0. Demand research (vidIQ, one call before the script)
`vidiq_keyword_research` (research, CA) "capital gains tax canada": <750/mo. Related: "capital gains" ≈13,779/mo (+164% vs baseline), "capital gains tax" ≈6,405/mo, "what is capital gains tax" ≈5,146/mo, "capital gains canada" ≈3,936/mo (competition 15.5, best opportunity 66.0), "capital gains tax explained" ≈3,477/mo. Long-tail: how to reduce / offset capital gains tax in Canada, inclusion rate, lifetime exemption (<750 each). 5 credits.
Conclusion: hook on the surprising "only half"; title with "Capital Gains Tax" + Canada; mention that the 2/3 increase was cancelled (a common question).

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (direct fetch blocked by the network proxy; facts from canada.ca search-result text), 2026-10-06.

| # | Claim used | Source |
|---|---|---|
| R1 | Capital gain = proceeds of disposition − (adjusted cost base + outlays and expenses to sell) | CRA guide T4037 Capital Gains |
| R2 | Inclusion rate one-half; the proposed increase to two-thirds (deferred to Jan 1, 2026) was cancelled | Department of Finance news (Jan 2025 deferral); CRA "Update on the administration of the proposed capital gains changes" (2025) |
| R3 | Net capital losses reduce taxable capital gains only; carried back 3 years or forward indefinitely (T1A for carry-back) | CRA "Capital losses and deductions"; T4037; Form T1A |
| R4 | Superficial loss: you or an affiliated person (e.g. spouse) acquires identical property within 30 days before or after the sale and still owns it 30 days after → loss denied; added to the ACB of the substituted property | CRA "Capital losses"; T4037 |
| R5 | Investment income and gains in a TFSA are generally not taxed | CRA TFSA guide RC4466 (general; "generally" covers the business-income exception) |

### Example (not a CRA rule) · `f1/example.py`
Shares held as capital property in a non-registered account: proceeds $16,000 − ACB $10,000 − fees $50 = **$5,950** gain; taxable capital gain (1/2) **$2,975**, taxed at the person's marginal rate.

### Dependencies, exceptions, notes
- Capital vs income: frequent trading can make gains business income, fully taxable (topic F3; not covered here) → the example says "capital property".
- Principal residence, lifetime capital gains exemption, foreign currency, mutual fund distributions and ACB averaging for identical shares: not covered.
- Tax at the "regular rate" depends on the person's other income (no rate given).

### Claims deliberately NOT made
- A dollar tax figure on the $2,975 (depends on the bracket).

## 2. Project
| Field | Value |
|---|---|
| PLATE | `public/plates/f1-4k.jpg` (Higgsfield gpt_image_2_5, 2 variants 0.5 + 4K upscale 2 credits; checked: no text, charts or visible screens): a man reads a tablet (screen turned away) by a window with autumn trees; a closed laptop, a stack of coins, a fountain pen, a plain envelope and a coffee on the table. Variant A (Toronto skyline with the CN Tower) not used, to vary the series |
| PINS | coins "gain $5,950" · coins "$2,975 taxable" · envelope "back 3 years / forward" · mug "superficial loss: loss denied" |
| STRIP | inclusion 1/2 · losses 3 yrs back · forward · ✗ rebuy within 30 days · ✓ TFSA |
| LIVE | steam from the coffee; camera between the reader, the coins and the table props |
| VOICE | Grady; 151 words; 67.40 s (inside the 45 s–1:10 tolerance); CTA reused from G3 |
| RENDER | 1080×1920, 24 fps, 1630 frames (67.9 s) |

## 3. QC log
- Stills v1: example card empty until the result → the price and cost lines come in first, then "= $5,950"; re-checked spacing (hero moved down 22 px). Pins clear of the strip.
