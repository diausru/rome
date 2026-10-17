# Automated QC

File: `showreel/out/d4/d4-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1695 frames = 70.62 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 70.62 s vs 70.57 s |
| PASS | loudness | -14.3 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.6 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 14.7% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 7 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 64 chunks, shortest 0.47 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 88 events |
| ADVICE | sound density under the voice | 1.07 per 3 s; within 1 s: [9.1, 34.92] |
| PASS | facts: numbers from data.json match the narration | alex 120000, contrib 10000, saving_round 3950, sam_round 2480, less_round 1500, early_round 4340, years 3 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
