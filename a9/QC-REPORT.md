# Automated QC

File: `showreel/out/a9/a9-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1610 frames = 67.08 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 67.08 s vs 67.02 s |
| PASS | loudness | -13.9 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.9 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 14.4% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 7 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 54 chunks, shortest 0.43 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 79 events |
| PASS | sound density under the voice | 0.91 per 3 s; within 1 s: [5.93] |
| PASS | facts: numbers from data.json match the narration | union 1500, refund_union_round 500, t4a 3000, owe_t4a_round 1000 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
