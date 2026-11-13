# Automated QC

File: `showreel/out/m15/m15-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1576 frames = 65.67 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 65.67 s vs 65.60 s |
| PASS | loudness | -14.1 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.6 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 15.4% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 56 chunks, shortest 0.37 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 70 events |
| PASS | sound density under the voice | 0.83 per 3 s; within 1 s: [9.38, 10.21, 41.2] |
| PASS | facts: numbers from data.json match the narration | extra 10000, keep_naive 86, family 50000, lo 14, cgeb 500 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
