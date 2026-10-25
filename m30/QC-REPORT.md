# Automated QC

File: `showreel/out/m30/m30-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1641 frames = 68.38 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 68.38 s vs 68.32 s |
| PASS | loudness | -14.1 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.5 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 12.3% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 58 chunks, shortest 0.36 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 78 events |
| PASS | sound density under the voice | 0.97 per 3 s; within 1 s: [9.78, 11.9, 44.06] |
| PASS | facts: numbers from data.json match the narration | credit_a 116, credit_s 377, alex 90000, sam 30000, expenses 3500, cap 2834, floor_a 2700, elig_a 800, floor_s 900, elig_s 2600 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
