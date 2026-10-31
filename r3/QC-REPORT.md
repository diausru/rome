# Automated QC

File: `showreel/out/r3/r3-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1645 frames = 68.54 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 68.54 s vs 68.47 s |
| PASS | loudness | -14.2 LUFS (target −14 ± 0.6) |
| PASS | true peak | -3.1 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 12.5% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 60 chunks, shortest 0.31 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 76 events |
| PASS | sound density under the voice | 0.93 per 3 s; within 1 s: [9.04, 25.55, 44.34] |
| PASS | facts: numbers from data.json match the narration | total 400, sep_total 58, comb 87, each 200, low 0.145, high 0.29, sep_each 29, carry_years 5 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
