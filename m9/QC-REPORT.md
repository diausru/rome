# Automated QC

File: `showreel/out/m9/m9-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1679 frames = 69.96 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 69.96 s vs 69.90 s |
| PASS | loudness | -14.0 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.9 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 10.8% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 67 chunks, shortest 0.41 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 85 events |
| PASS | sound density under the voice | 0.95 per 3 s; within 1 s: [5.8, 38.17, 46.17] |
| PASS | facts: numbers from data.json match the narration | min 3000, thr 26855, pct 15, income 30000, over 3145, cut 471.75 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
