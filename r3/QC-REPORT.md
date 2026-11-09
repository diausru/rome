# Automated QC

File: `showreel/out/r3/r3-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1476 frames = 61.50 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 61.50 s vs 61.42 s |
| PASS | loudness | -14.1 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.7 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 14.9% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 58 chunks, shortest 0.29 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 69 events |
| PASS | sound density under the voice | 0.93 per 3 s; within 1 s: [10.54, 11.23, 29.86, 35.38] |
| PASS | facts: numbers from data.json match the narration | each 300, sep 116, comb 145, low 200, total 600, high_part 400, gain 29, years 5 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
