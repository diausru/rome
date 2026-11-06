# Automated QC

File: `showreel/out/m8/m8-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1561 frames = 65.04 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 65.04 s vs 64.97 s |
| PASS | loudness | -14.2 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.8 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 14.5% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 57 chunks, shortest 0.51 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 75 events |
| PASS | sound density under the voice | 0.93 per 3 s; within 1 s: [9.18, 9.88, 32.88, 40.39] |
| PASS | facts: numbers from data.json match the narration | pct 25, years 5, single 679, couple 890, child 234, thr 46432, rate 5, over 10000, cut 500 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
