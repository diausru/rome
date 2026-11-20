# Automated QC

File: `showreel/out/n1/n1-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1626 frames = 67.75 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 67.75 s vs 67.67 s |
| PASS | loudness | -14.0 LUFS (target −14 ± 0.6) |
| PASS | true peak | -3.0 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 13.7% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 55 chunks, shortest 0.47 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 73 events |
| PASS | sound density under the voice | 0.80 per 3 s; within 1 s: [7.66, 8.48, 41.2] |
| PASS | facts: numbers from data.json match the narration | bpa26 16452, bpa27 16879, diff 427, mb_bpa 15780, cpp_new 0.0475, cpp_old 0.0495 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
