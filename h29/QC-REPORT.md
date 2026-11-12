# Automated QC

File: `showreel/out/h29/h29-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1590 frames = 66.25 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 66.25 s vs 66.17 s |
| PASS | loudness | -14.1 LUFS (target −14 ± 0.6) |
| PASS | true peak | -3.1 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 10.1% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 59 chunks, shortest 0.35 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 71 events |
| PASS | sound density under the voice | 0.87 per 3 s; within 1 s: [9.03, 30.22, 33.69] |
| PASS | facts: numbers from data.json match the narration | couple 200000, fhsa_year 8000, fhsa_life 40000, hbp 60000, years 15, per 100000, hbta 10000 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
