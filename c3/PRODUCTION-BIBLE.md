# Production Bible: "The small business deduction" (topic C3)

Order: `channel/PUBLISHING-PLAN.md` §4, week 6. Approved look (Kit + Plate). Business group: Mont 900 headings (SANS), `pension2` music.
Voiceover: `c3/VOICEOVER.md`. Timeline: `showreel/src/c3-timeline.json`. Composition: `showreel/src/C3v2.tsx`. Publish: `c3/PUBLISH.md`.

## 0. Demand research (vidIQ, one call before the script)
`vidiq_keyword_research` (research, CA) "small business tax rate canada": <750/mo (competition 8.5). Related: "small business canada" ≈7,288/mo, "small business tax" ≈5,211/mo (competition 25.3, best opportunity 63.2), "business taxes" ≈4,682/mo, "small business taxes" ≈4,372/mo, "how to reduce taxes in canada" ≈3,872/mo, "business owners in canada" ≈3,949/mo. 5 credits.
Conclusion: the hook leads with the striking number (9%), and the title uses "small business tax" + Canada/Manitoba.

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca and gov.mb.ca (direct fetch blocked by the network proxy; facts from search-result text of those pages), 2026-10-06.

| # | Claim used | Source |
|---|---|---|
| R1 | Federal net rate for CCPC income eligible for the small business deduction: 9%; general net rate after the general tax reduction: 15%; federal business limit $500,000 | CRA "Corporation tax rates" (canada.ca) |
| R2 | Manitoba lower rate 0% on income up to the Manitoba business limit of $500,000; higher rate 12% | CRA "Manitoba – provincial corporation tax" (canada.ca); Manitoba Finance corporation taxes (gov.mb.ca) |
| R3 | Business limit reduced (straight line) when adjusted aggregate investment income of the CCPC and associated corporations is between $50,000 and $150,000: BL/500,000 × 5 × (AAII − 50,000) | CRA "Small business deduction rules" (Budget 2018 passive income page) |
| R4 | Taxable capital grind: reduced between $10 million and $50 million of taxable capital employed in Canada (previous year); none at $50 million+ | CRA "Small business deduction rules" |
| R5 | Associated corporations share (allocate) one business limit | CRA "Small business deduction rules" |
| R6 | The SBD applies to active business income of a CCPC; income from a personal services business does not qualify | CRA T2 guide (T4012) / ITA s.125 (general) |
| R7 | Dividends paid to the shareholder are taxed personally (non-eligible dividends from SBD income) | CRA (dividends; general integration) |

### Example (not a CRA rule) · `c3/example.py`
Manitoba CCPC, $120,000 of active business income, no associated corporations, AAII ≤ $50,000, taxable capital < $10M:
- at 9% (9% federal + 0% Manitoba) = **$10,800**
- at 27% (15% + 12%) = **$32,400**
- AAII grind: $100,000 → limit $250,000; $150,000 → $0.

### Dependencies, exceptions, notes
- Combined 9% / 27% assume a full taxation year, no other provincial allocation (permanent establishment only in Manitoba).
- Specified partnership/corporate income, farming/fishing cooperatives, and the Manitoba-specific allocation rules are not covered.
- "Deferral, not a gift" = integration concept, stated in general terms; actual personal tax on dividends depends on the shareholder's other income and the dividend tax credit (no figures given).

### Claims deliberately NOT made
- Personal-tax figures on dividends; any recommendation to incorporate.

## 2. Project
| Field | Value |
|---|---|
| PLATE | `public/plates/c3-4k.jpg` (Higgsfield gpt_image_2_5, 2 variants 0.5 + 4K upscale 2 credits; checked: no text, signs or logos): a small family cabinetmaking workshop; owner reading a sheet, an employee sanding a cabinet door; folders, a closed laptop, a mug, keys, a model chair and shavings on the bench |
| PINS | folders "9%" · laptop "≈ $10,800 tax vs $32,400" · mug "passive income over $50,000: limit shrinks" · keys "dividends: taxed personally" |
| STRIP | limit $500,000 · small business 9% · general 27% · ✓ CCPC · active income · ✗ passive over $50K shrinks it |
| LIVE | steam from the mug; camera between owner, employee and bench |
| VOICE | Grady; 157 words; 69.73 s (inside the tolerance after trimming pauses to ≤0.24 s, no new credits); bridge CTA (new line): "Next: sold a stock for a profit? Why only half of it is taxed. Follow so you don't miss it." |
| SCENES | Series upgrade: three plates of the same cabinetmaker (workshop plate as image reference; gpt_image_2_5 + 4K upscale each): 1) `c3-s1-4k.jpg` morning, sliding the workshop door open (hook → general); 2) `c3-4k.jpg` the working day (example → who); 3) `c3-s3-4k.jpg` evening at the corner desk under a lamp (traps → end). Cuts at `example` and `traps` with SceneCuts. Checked: no text, same person |
| RENDER | 1080×1920, 24 fps, 1686 frames (70.2 s) |

## 3. QC log
- Stills v1: first 9 s keep the top clear (owner visible); pins placed below the strip by lowering the camera key at example/traps; all cards fit. No changes needed.
- v2 (2026-10-07): three scenes + bridge CTA; VO 70.65 s with the longer CTA → pauses trimmed to ≤0.24 s → 69.73 s. Stills re-checked (scenes, both transitions, CTA).
