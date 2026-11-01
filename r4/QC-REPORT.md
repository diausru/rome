# Automated QC

File: `showreel/out/r4/r4-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1649 frames = 68.71 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 68.71 s vs 68.62 s |
| PASS | loudness | -14.3 LUFS (target −14 ± 0.6) |
| PASS | true peak | -3.0 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 14.0% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 60 chunks, shortest 0.32 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 75 events |
| PASS | sound density under the voice | 0.97 per 3 s; within 1 s: [6.72, 32.58, 34.43] |
| PASS | facts: numbers from data.json match the narration | gap_near 34, gap_nearer 43, old 52, rule 40, near 18, nearer 9, cost 4200, days 15, earned 2500, carry 1700 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
