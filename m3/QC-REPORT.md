# Automated QC

File: `showreel/out/m3/m3-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1536 frames = 64.00 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 64.00 s vs 63.92 s |
| PASS | loudness | -13.8 LUFS (target −14 ± 0.6) |
| PASS | true peak | -1.6 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 10.9% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 58 chunks, shortest 0.45 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 75 events |
| PASS | sound density under the voice | 0.90 per 3 s; within 1 s: [15.21, 33.32] |
| PASS | facts: numbers from data.json match the narration | under6 8157, child_age 4 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
