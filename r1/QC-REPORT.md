# Automated QC

File: `showreel/out/r1/r1-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1613 frames = 67.21 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 67.21 s vs 67.15 s |
| PASS | loudness | -14.1 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.9 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 15.4% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 54 chunks, shortest 0.32 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 77 events |
| ADVICE | sound density under the voice | 1.03 per 3 s; within 1 s: [9.39, 12.59, 25.26, 38.84, 48.26] |
| PASS | facts: numbers from data.json match the narration | child_dis 3480, bond 1000, grant 3500, cdb_month 204.2, age 18 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
