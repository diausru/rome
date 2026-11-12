# Automated QC

File: `showreel/out/m14/m14-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1610 frames = 67.08 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 67.08 s vs 67.02 s |
| PASS | loudness | -13.9 LUFS (target −14 ± 0.6) |
| PASS | true peak | -1.5 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 19.0% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 57 chunks, shortest 0.41 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 78 events |
| PASS | sound density under the voice | 0.90 per 3 s; within 1 s: [8.28, 8.99, 37.3, 40.47, 55.96] |
| PASS | facts: numbers from data.json match the narration | count 4, age 18 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
