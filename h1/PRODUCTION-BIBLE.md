# H1 — Manitoba pays you even at $0 tax: MB479 credits (production bible)

Card series, PUBLISHING-PLAN §4 row 14 (H1), bridged from A9. Investigation format. Composition `H1V3` (`showreel/src/H1V3.tsx`), motion engine v1.

## Coordination check (2026-10-16)
- Handwritten series: no MB479 or Manitoba-credit video made or promised (its folders b2–b10, b9v3, inst, rrsp-se are self-employed math).
- Card series: H2 covered the Renters Affordability Tax Credit (not repeated here); H4 mentioned the HATC only as one line of the Manitoba landscape; A1 covered other (federal) credits.

## Facts (REAL TAX INFORMATION MODE)
canada.ca did not answer from this container on 2026-10-16 (empty replies / DNS); the Manitoba government pages were fetched directly, the CRA guide wording was taken from search results and matches the 2021 guide text.

| Claim | Source | Type |
|---|---|---|
| Primary Caregiver Tax Credit: flat $1,400 a year, refundable, not income-tested ("you can claim it even if you do not have taxable income") | gov.mb.ca/finance/tao/caregiver.html | rule |
| Eligibility: care recipient in Manitoba, private residence, care level 2+; caregiver resident, more than 90 days, unpaid, one designated caregiver; Registration Form to Manitoba Finance; registration valid up to 3 years | same | eligibility |
| Fertility Treatment Tax Credit: refundable, 40% of fees paid to a Manitoba licensed practitioner/clinic + related drugs, net of reimbursements; from 2024 up to $40,000 of expenses, max $16,000; one spouse claims, no splitting | gov.mb.ca/finance/personal/pcredits.html | rule |
| Homeowners Affordability Tax Credit: up to $1,600 for 2026 ($1,500 for 2025; $1,700 announced for 2027); lesser of the maximum and gross school taxes; if not on the property tax statement, claim on the return | same | rule |
| These three are listed under "Refundable Measures" | same | rule |
| Attach MB479; most of these credits must be claimed within three years of the end of the tax year | CRA Manitoba information guide (search results 2026-10-16; 2021 guide text) | rule (most, not all) |

Examples (not CRA rules): Lena (registered caregiver, dad at care level 2+); a couple with $20,000 of eligible fees → $8,000; a homeowner with $1,900 school taxes → $1,600.
Dependencies: care-level assessment and registration; reimbursements reduce fertility fees; principal residence and actual school taxes; tax year. Professional advice: caregivers who are paid or whose spouse is paid; several years of late claims.
Not covered: renters credit (H2); personal tax credit ($195 basic − 1% of family net income) and the seniors' school tax rebate (up to $235, 65+) are in the description only.

## Format: what is new vs A9, A2, A8 (Variety rule)
| | A8 | A2 | A9 | **H1 (this)** |
|---|---|---|---|---|
| Hook | myth stamped COSTS EXTRA | split before/after | date-flip ticker | **a TAX OWING meter at $0 + a green PAID TO YOU slip + three floating tags** |
| Main visual | scoreboard + month strip | balance scale + strip | red-pen return page | **one detail card per case over three payout columns that grow with count-ups** |
| Reveal | split + gauge | receipt | fork | **a two-way switch: non-refundable ($0) vs refundable (paid out)** |
| End | two tickets | two check tiles | turnaround bars | **a three-item checklist + next pill** |
| Music | work (G, 92) | pension2 (F, 76) | kids (C, 104) | **pension (D, 72): warm, family** |
| Scenes | hallway → night → balcony | kitchen → car → table | porch → den → kitchen | **caregiver's living room (Lena + dad) → clinic waiting room (couple) → homeowner at his snowy front door** |

## Research
- vidIQ: 'manitoba tax credits' <750/mo; 'manitoba' 13,111/mo (+48%). youtube_search CA by views for caregiver/fertility credits: 0 results. Titles: 83 (primary) / 80. Credits 949 → 919 = 30 (5 over the cap; listed prices add to 20).
- NexLev: Shorts search CA 'manitoba tax credits': largest results are off-angle (TD1 35K, '$1 Million after taxes in Manitoba' 13K); HATC news Shorts 5–16 views; no caregiver/fertility coverage.

## Assets
- Plates: Higgsfield gpt_image_2_5 (4 variants; checked: no text; calculator keys in scene 3 unreadable), 4K upscales (2 failed and were re-run) → `showreel/public/plates/h1-s{1,2,3}-4k.jpg`; bases in `h1/plates/`.
- VO: 7 Grady lines, none regenerated (67.52 s, inside 45 s–1:10).

## Delivery (2026-10-16)
- Final: `showreel/out/h1/h1-final.mp4` (1080×1920, 24 fps, 68.33 s, −14.0 LUFS, −2.8 dBTP); share copy `h1-share.mp4`.
- 25 s test render first (`out/h1/test25-av.mp4`); fix after stills: "Even at $0 tax" stamp moved off the refundable card heading; mux without -shortest (it dropped 3 frames).
- QC: `tools/reel_check.py` 0 failed (`h1/QC-REPORT.md`; the fact check now also accepts "N years"); Whisper transcript confirms $1,400, 90 days, $20,000, 40%, $8,000, $1,600, 2026, MB479, three years.
- Cover: 32.65 s (see PUBLISH.md). Nothing scheduled.
- Next (bridge CTA): C1 sole proprietor vs corporation (🔴 needs a fact pass).
