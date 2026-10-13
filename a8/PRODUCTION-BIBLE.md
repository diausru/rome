# A8 — Filing late vs paying late (production bible)

Card series, PUBLISHING-PLAN §4 row 13 (A8 filing deadlines), bridged from A5. Investigation format (Hook → Promise → Investigation → Reveal → Action). Composition `A8V3` (`showreel/src/A8V3.tsx`), motion engine v1.

## Coordination check (2026-10-13)

The handwritten series made B7 "first freelance year, month by month" (a self-employed calendar with April 30 / June 15) and INST (instalments). A8 does not repeat that angle: it is about the late-filing penalty and why filing on time matters even when you can't pay, for employees and everyone else; the June 15 date appears only as one ticket. Long-form LF-01…LF-05 (brackets, tax software, $100K, MB→AB, DTC) don't cover it. Nothing in the handwritten "NEXT 3 TOPICS" promises late filing.

## Facts (REAL TAX INFORMATION MODE)

Primary source: Income Tax Act (laws-lois.justice.gc.ca, current to 2026-09-21), saved in `a8/sources/`. canada.ca refused direct connections from the container; its pages were checked through search results.

| Claim | Source | Type |
|---|---|---|
| Late-filing penalty = 5% of the tax unpaid at the filing due date + 1% of it per complete month late, max 12 months | ITA 162(1); canada.ca late-filing penalty page | rule |
| Repeat penalty = 10% + 2% per complete month, max 20 months, only if a demand to file was sent under 150(2) AND a 162(1)/(2) penalty was payable for any of the 3 preceding years | ITA 162(2) | rule (conditions) |
| No balance owing at the due date → the penalty (a % of unpaid tax) is $0 | ITA 162(1) arithmetic | rule |
| Filing due date: April 30 of the following year; June 15 for an individual who carried on a business in the year (unless mainly tax-shelter expenditures) and their cohabiting spouse/common-law partner | ITA 150(1)(d)(i), (ii)(A)–(B) | rule + exception |
| Balance-due day for an individual (other than certain deaths): April 30 of the following year; interest at the prescribed rate after it | ITA 248(1) "balance-due day" (c); 161(1) | rule |
| The GST/HST credit is deemed paid to an eligible individual who files a return for the year | ITA 122.5(3) | rule |
| File on time even if you can't pay; payment arrangements may be available; late filing can interrupt benefit and credit payments (CCB, GST/HST credit) | CRA tax tips (canada.ca, via search results 2026-10-13) | general information |
| For 2026 returns: April 30, 2027 is a Friday; June 15, 2027 is a Tuesday | calendar | date |

Example (not a CRA rule): $4,000 unpaid at April 30, 2027; return 1 filed 4 complete months late → 5% + 4 × 1% = 9% = $360; maximum after 12 months 17% = $680; return 2 filed on time and not paid → $0 penalty, interest only; return 3 has a $1,200 refund and is filed late → $0 penalty. The prescribed interest rate is not stated (it changes quarterly and the canada.ca page could not be opened). Dependencies identified: whether you carried on a business (June 15), whether a demand to file was sent and a penalty applied in the prior 3 years (repeat penalty), and which benefits you receive. Professional-advice territory: several unfiled years, a demand to file already received, taxpayer relief requests, voluntary disclosures.

## Format: what is new vs A5, A1, H4 (Variety rule)

| | A1 | H4 | A5 | **A8 (this)** |
|---|---|---|---|---|
| Hook | count-up $4,550 + case folders | ticker + ice stamp | document close-up under a lens | **kinetic myth question "CAN'T PAY? DON'T FILE?" stamped COSTS EXTRA, floating tags, three paper returns** |
| Main visual | paper case files + money stack | frosting ladder | suspect line-up + evidence panels | **three-return scoreboard + a 12-month calendar strip with stacking % chips, an on-time check with a running interest line, a credit "on hold"** |
| Reveal | split screen + stamps | full-frame statement | timeline scrub + day counter | **split NOT FILING vs NOT PAYING with a semicircle penalty gauge (9% → 17%) and a × 2 repeat stamp** |
| End | checklist | centred card | vertical three-step path | **two deadline tickets (APR 30 / JUN 15) with a perforation line** |
| Entrances | — | — | glass / slideR / wipe | **slideL / glass / wipe; exits fade / vapor / collapse to the top** |
| Music | kids (C, 104) | pension2 (F, 76) | pension (D, 72) | **work (G, 92): steady, practical** |
| Scenes | classroom / college / bathroom | street / apartment / bridge | kitchen → home office → morning | **a woman in a hallway with unopened mail (summer evening) → filing at the table at night → relieved on a balcony on a spring morning (same woman; reference = scene 1)** |

## Assets

- Plates: Higgsfield `gpt_image_2_5` (9:16, prompts say no text/numbers/logos; checked: none visible), 4K upscale (bytedance) → `showreel/public/plates/a8-s{1,2,3}-4k.jpg` (2294×4096); base images in `a8/plates/`.
- VO: 7 Grady lines + 5 regenerated (shortened) = 12 generations.
- Cuts: scene 2 at RETURN 2 ("files on time"), scene 3 at the action beat.

## Delivery (2026-10-13)

- Final: `showreel/out/a8/a8-final.mp4` (1080×1920, 24 fps, 70.12 s, −14.0 LUFS, −2.6 dBTP); share copy `a8-share.mp4` (x264 crf 20).
- 25 s test render before the full render (`out/a83/test25-av.mp4`, −13.8 LUFS, decodes); fixes after stills: split panels without backdrop blur (it blurred the whole plate), the ON HOLD stamp kept inside the panel, the repeat note wrapped clear of the × 2 stamp.
- QC: `tools/reel_check.py` 0 failed, 1 advice (sound density 1.04 per 3 s; the only sub-1 s pair is the riser + impact of one stamp) → `a8/QC-REPORT.md`; contact sheet `showreel/out/a8/qc.jpg`; Whisper transcript confirms $4,000, 5%, 1%, $360, May 1, 17%, April 30, June 15.
- vidIQ: 25 credits (1,235 → 1,210). Titles: 88 (primary) / 81. Analysis page https://claude.ai/artifact/1xWE8LC74KTJbEnRKtCcjW. Kit card "#31 · File Anyway" (Kit v39). Nothing scheduled (Metricool only on command).
- Higgsfield: 12 VO generations, 3 plates + 3 4K upscales.
- Next (bridge CTA): A2 why your refund got smaller.
