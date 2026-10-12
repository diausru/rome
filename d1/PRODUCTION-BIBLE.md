# D1 — Tuition credits: claim, transfer, carry forward (card series, motion engine v1)

Row 11 of `channel/PUBLISHING-PLAN.md` §4, bridged from G5 ("next: your tuition slip"). Made 2026-10-12 on the user's command ("генерируй новый ролик посмотрим эфекты. Работай над новым следующим по списку"). First card reel built on motion engine v1 (`showreel/src/motion/Reel.tsx`) end to end.
Voiceover: `d1/VOICEOVER.md`. Timeline: `showreel/src/d1-timeline.json`. Words: `showreel/src/d1-words.json`. Reel spec: `d1/reel.json` → `showreel/src/d13-cues.json`, `d1/sfx-cues.json`. Data: `d1/data.json`. Composition: `showreel/src/D1V3.tsx`. Publish: `d1/PUBLISH.md`, `d1/publish.json`. QC: `d1/QC-REPORT.md`.

## Coordination check (handwritten / long-form sessions)

Searched every project folder for "tuition" / "T2202" on 2026-10-12 after pulling the branch (latest: LF-04 Manitoba → Alberta). Only mentions: this topic's own bridge in G5 and plan entries. The handwritten B-series (self-employed) and long-form queue have no tuition topic. No overlap.

## Facts (REAL TAX INFORMATION MODE)

canada.ca refused connections from this container on 2026-10-12 (HTTP/2 stream errors and empty replies, other hosts fine), so the primary source is the Income Tax Act itself (laws-lois.justice.gc.ca, "current to 2026-09-21, last amended 2026-06-18"), saved under `d1/sources/` (`ita-*.txt`). CRA wording on the transfer and Schedule 11 was confirmed through canada.ca search results (titles + summaries of "Transferring and carrying forward amounts", "Completing Schedule 11", Folio S1-F2-C1).

| Claim | Source · tax year | Type |
|---|---|---|
| Tuition credit = appropriate percentage × eligible tuition paid to a post-secondary institution in Canada | ITA 118.5(1)(a) · current | rule |
| No credit for an institution unless the fees paid to it in the year exceed $100 | ITA 118.5(1.1) | eligibility |
| Rate 14% for 2026 | ITA 117(2)(a) (14%); 248(1) "appropriate percentage" = lowest 117(2) rate | rule (federal only) |
| Student claims first; transfer = lesser of the year's 118.5 credit and 14% × $5,000, minus the student's own tax | ITA 118.81; CRA Schedule 11 / line 32300 | rule |
| One person: parent or grandparent (118.9, line 32400) or spouse / common-law partner (118.8) | ITA 118.9, 118.8; CRA transfer page | rule |
| Unused amounts carry forward, usable only by the student; carried-forward amounts are not transferable | ITA 118.61; 118.81 uses the year's 118.5 amount | rule |
| A student with $12,000 income owes no federal tax before tuition | ITA 118(1)(c), (1.1): BPA $15,000 for 2023+ (indexed) at incomes below the 29% threshold; 14% × 12,000 < 14% × BPA | example assumption (stated) |
| Education and textbook amounts ended after 2016 (federal) | ITA 118.6(2.1) [Repealed, 2016, c. 7, s. 16]; CRA Folio S1-F2-C1 | rule |

Example (not a CRA rule): tuition $8,000 → credit $1,120; transfer up to $5,000 → $700 off a parent's tax if the parent owes tax (non-refundable); $3,000 carried forward → $420 future credit. Dependencies stated on screen and in the description: federal only (provincial tuition credits differ), the parent must have tax to reduce, the student's own tax must already be nil. Not covered in the reel (professional-advice territory): a student whose spouse claims amounts for them (CRA Schedule 11 blocks the parent transfer then), Quebec, and provincial tuition credits.

## Format

| | |
|---|---|
| ENGINE | motion engine v1: progressive hook (topic on frame 0: "YOUR TUITION SLIP"), floating tags from three sides, kinetic ALL-CAPS headings, narration-driven tile highlights and count-ups ($8,000 → $1,120; $12,000 → $0; $700; $3,000 → $420), split bar for the transfer, word-synced captions, depth layers, glass entrances (glass / wipe / slideL / slideR) and exits (vapor / fade / collapse), 22 sounds on the same anchors, sonic logo |
| SCENES | Three plates of the same student (image reference = scene 1), 4K upscaled: 1) `d1-s1-4k.jpg` winter evening in a university library with the envelope (hook → example); 2) `d1-s2-4k.jpg` kitchen table with her mother at tax time (first, transfer); 3) `d1-s3-4k.jpg` a few years later at her first job, downtown office window (carry, gone, end). Cuts at `first` and `carry`. Text check at 4K: calculator keys carry tiny glyphs and a corner mark → feathered local blur in code; library spines unreadable; office clean |
| MUSIC | `work` (young, upbeat, G major) at −24 LUFS, ducked; SFX in D major per the sonic identity |
| CTA | Spoken bridge "Next: Manitoba's tax brackets on a real paycheque. Follow so you don't miss it." + pill "NEXT: MANITOBA TAX BRACKETS →" (H4, next card row) |
| VOICE | Grady; 8 beats; 158 words; raw read 71.7 s → tempo ×1.05 → 68.47 s VO + 1.7 s hold |
| COST | Higgsfield: 8 VO lines (≈2.4 cr), 4 stills (2 variants scene 1 + scenes 2, 3), 3 × 4K upscale. vidIQ: 25 credits (1,395 → 1,370) |

## Delivery (2026-10-12)

- Final: `showreel/out/d1/d1-final.mp4` (share copy `d1-share.mp4`, 17 MB): 1685 frames, 70.21 s, h264 1080×1920 24 fps + AAC 48 kHz, −14.1 LUFS, true peak −2.8 dBTP. Render ≈30 min (CLI, concurrency 4).
- Automated QC `tools/reel_check.py`: 12/12 PASS (`d1/QC-REPORT.md`). Two checker fixes made on the way: the first-frame pixel read now runs in binary mode (it crashed decoding raw bytes as text); the facts check is driven by `data.json` "derive" + "spoken" (was hard-coded to the ny example). The hook box was declared 920 wide; measured text spans x 81–867, so the declaration was corrected to 800.
- Visual QC (`showreel/out/d1/qc.jpg`, 16 frames from the final MP4): hook on frame 0, tags clear of the face, every count-up lands on its word, both scene cuts (22.1 s, 44.8 s), end block with flag, pill and footer. Faces stay above the lower-third panels in all three scenes.
- vidIQ titles: 91 "Tuition Tax Credit Canada: Can Your Parents Claim It?" (primary) / 73. Analysis page: https://claude.ai/artifact/2m3hZPFRGYtE31rwDJNkhF (`channel/analysis/d1-analysis.html`). Kit card "#27 · Tuition Credits" (Kit v35).
- Metricool: not sent (only on command).
