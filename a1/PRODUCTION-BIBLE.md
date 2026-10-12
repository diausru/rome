# A1 — Credits people miss: one family, three cases (investigation format, motion engine v1)

Row 12 of `channel/PUBLISHING-PLAN.md` §4 (= list-2 #23, merged), bridged from H4 ("Next: the tax credits most Canadians never claim"). Made 2026-10-12 on the user's command ("Запускай следующее видео создавай"). First reel in the investigation format (Hook → Promise → Investigation → Reveal → Action) and the first with a Retention Blueprint (`a1/BLUEPRINT.md`) and a 25 s test render before the full render (Remotion brief rules).
Files: `a1/VOICEOVER.md`, `a1/data.json`, `a1/reel.json`, `showreel/src/A1V3.tsx`, `showreel/src/a1-timeline.json`, `a1-words.json`, `a13-cues.json`, `a1/PUBLISH.md`, `a1/publish.json`, `a1/QC-REPORT.md`.

## Coordination check

A1 is not made or promised by the handwritten series (Kit labels and publish.json files checked 2026-10-12); the long-form queue has no credits episode. The three credits chosen do not overlap list-2 topics (medical #30, DTC R1, caregiver R2, donations R3, moving R4, home buyer #29) or delivered Shorts (D1 tuition mentions the training credit only as the reduction rule).

## Facts (REAL TAX INFORMATION MODE)

canada.ca refused connections from the container again (HTTP/2 errors); primary source = Income Tax Act (laws-lois.justice.gc.ca, current to 2026-09-21), saved in `a1/sources/`; CRA line 45350 wording confirmed through canada.ca search results.

| Claim | Source · year | Type |
|---|---|---|
| Eligible educator: deemed payment (refundable) of 25% of the lesser of $1,000 and eligible supplies expenses | ITA 122.9(2) | rule |
| Eligible educator = teacher or ECE employed at an elementary/secondary school or regulated child care facility, with a recognized certificate; supplies not reimbursed; employer certificate on request | ITA 122.9(1), (3) | eligibility |
| Canada training credit (refundable) = lesser of the training amount limit and 50% of eligible tuition | ITA 122.91(1) | rule |
| Limit grows $250 a year after 2019 if: age 26–65 at year end, return filed and resident in the prior year, working income threshold, income ≤ the 117(2)(c) amount; lifetime $5,000 | ITA 122.91(2) | eligibility (stated on screen) |
| Tuition credit reduced by 14% × the CTC claimed | ITA 118.5(1.2) | rule (stated on screen) |
| The limit is shown on the latest notice of (re)assessment and in My Account | canada.ca line 45350 (search result) | general info |
| Home accessibility tax credit = 14% × lesser of $20,000 and qualifying expenditures (non-refundable); qualifying individual 65+ or DTC-eligible; enduring renovation for access, mobility or safety | ITA 118.041(1), (3), (5) | rule + eligibility |
| 14% = appropriate percentage for 2026 | ITA 117(2)(a), 248(1) | rule |

Example (not a CRA rule): one family. Teacher, $1,000 of supplies → $250. Same person, 40, $3,000 course, room $1,750 (7 × $250 for 2020–2026, assuming she met every condition each year) → claims $1,500. Her mother, 70, $20,000 bathroom renovation → $2,800 if she owes at least that much federal tax. Total $4,550. Dependencies named on screen: eligibility conditions, refundable vs non-refundable. Professional-advice territory not covered: whether a specific renovation qualifies, the family-member claim split (118.041(5)).

## Format: what is new vs H4 and D1 (Variety rule)

| | D1 | H4 | **A1 (this)** |
|---|---|---|---|
| Hook | kinetic question + floating tags | three-row ticker + ice stamp | **big-number count-up $4,550 + three paper case folders dropping in** |
| Main visual | glass tiles, count-ups | frosting rate ladder | **paper case files (manila, not glass) with typed ledger lines + a growing stack of found money on the right** |
| Special | transfer split bar | slider over the frozen line | **year-by-year room scrub 2020–2026 (CTC)** |
| Reveal | — | full-frame statement | **split screen: REFUNDABLE (green) vs NON-REFUNDABLE (amber) with stamps** |
| End | left block | centred card | **ticking checklist + pill** |
| Music | work (G) | pension2 (F, 76) | **kids (C, 104, curious)** |
| Scenes | library / kitchen / office | street / apartment / bridge | **classroom at golden hour → evening college class → mom's new accessible bathroom (same woman; image reference = scene 1)** |

## Delivery (2026-10-12)

- Retention Blueprint `a1/BLUEPRINT.md` written before visuals; 25 s test (`out/a13/test25-av.mp4`, frames 0–599 + mix) rendered and inspected: 25.00 s, decodes, −14.3 LUFS, A/V in sync, no clipping (the suspected subtitle overlap was a downscale artefact, checked at full resolution).
- Final: `showreel/out/a1/a1-final.mp4` (share copy `a1-share.mp4`): 1676 frames, 69.83 s, h264 1080×1920 24 fps + AAC 48 kHz, −14.1 LUFS, TP −2.5 dBTP.
- Automated QC: first pass failed one check (a one-word caption chunk "a" on screen 0.11 s in case 2). Fixed in `tools/beat_words.py` (chunks under 0.3 s join a neighbour), frames 528–887 re-rendered and spliced; second pass 12/12 PASS (`a1/QC-REPORT.md`).
- Visual QC `showreel/out/a1/qc.jpg` (16 frames incl. both splice points): clean.
- vidIQ titles: 82 "3 Tax Credits Canadians Miss (One Family Almost Lost $4,550)" (primary) / 76. Analysis: https://claude.ai/artifact/SDFrXgUrD11YE5HqXXPJd3. Kit card "#29 · Credits People Miss" (Kit v37). Metricool: not sent.
