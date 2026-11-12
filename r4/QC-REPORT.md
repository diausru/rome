# Automated QC

File: `showreel/out/r4/r4-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1392 frames = 58.00 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 58.00 s vs 57.92 s |
| PASS | loudness | -14.4 LUFS (target −14 ± 0.6) |
| PASS | true peak | -3.3 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 17.1% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 54 chunks, shortest 0.30 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 72 events |
| ADVICE | sound density under the voice | 1.10 per 3 s; within 1 s: [10.29, 11.08, 26.16, 26.9, 30.41] |
| PASS | facts: numbers from data.json match the narration | cost 6000, km 40, income_new 4000, carry 2000 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
