# Automated QC

File: `showreel/out/h10/h10-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1619 frames = 67.46 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 67.46 s vs 67.37 s |
| PASS | loudness | -14.3 LUFS (target −14 ± 0.6) |
| PASS | true peak | -3.0 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 12.6% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 55 chunks, shortest 0.33 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 68 events |
| PASS | sound density under the voice | 0.81 per 3 s; within 1 s: [7.31, 24.04, 39.45] |
| PASS | facts: numbers from data.json match the narration | tuition 8000, transfer 5000, credit 725 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
