# Automated QC

File: `showreel/out/m26/m26-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1447 frames = 60.29 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 60.29 s vs 60.23 s |
| PASS | loudness | -14.0 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.4 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 10.6% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 52 chunks, shortest 0.44 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 68 events |
| PASS | sound density under the voice | 0.95 per 3 s; within 1 s: [26.0, 39.77] |
| PASS | facts: numbers from data.json match the narration | lo 40, hi 60, share 50, child_age 5 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
