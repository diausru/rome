# Automated QC

File: `showreel/out/m2/m2-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1607 frames = 66.96 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 66.96 s vs 66.90 s |
| PASS | loudness | -13.9 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.5 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 17.5% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 56 chunks, shortest 0.39 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 70 events |
| PASS | sound density under the voice | 0.86 per 3 s; within 1 s: [37.77, 57.07] |
| PASS | facts: numbers from data.json match the narration | salary 45000, thr 46432, single 679, partner 35000, family 80000, over 33568, pct 5 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
