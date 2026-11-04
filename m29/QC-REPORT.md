# Automated QC

File: `showreel/out/m29/m29-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1655 frames = 68.96 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 68.96 s vs 68.90 s |
| PASS | loudness | -14.0 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.7 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 10.8% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 58 chunks, shortest 0.50 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 71 events |
| PASS | sound density under the voice | 0.92 per 3 s; within 1 s: [2.65, 38.67, 43.24] |
| PASS | facts: numbers from data.json match the narration | total 59000, fhsa_year 8000, fhsa_life 40000, fhsa 24000, hbp_max 60000, hbp 35000, hbtc 10000 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
