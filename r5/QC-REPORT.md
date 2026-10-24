# Automated QC

File: `showreel/out/r5/r5-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1691 frames = 70.46 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 70.46 s vs 70.38 s |
| PASS | loudness | -14.1 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.7 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 21.0% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 7 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 58 chunks, shortest 0.32 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 80 events |
| ADVICE | sound density under the voice | 1.24 per 3 s; within 1 s: [6.08, 42.18, 42.99, 53.77] |
| PASS | facts: numbers from data.json match the narration | split 40000, pat 100000, pat_rpp 80000, jo 20000, each_after 60000, saving_round 3400, bracket_round 3030, pension_credit 388 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
