# Automated QC

File: `showreel/out/a2/a2-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1641 frames = 68.38 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 68.38 s vs 68.30 s |
| PASS | loudness | -13.9 LUFS (target −14 ± 0.6) |
| PASS | true peak | -3.0 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 23.7% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 7 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 58 chunks, shortest 0.38 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 84 events |
| PASS | sound density under the voice | 0.89 per 3 s; within 1 s: [5.58] |
| PASS | facts: numbers from data.json match the narration | salary 70000, rrsp 6000, refund_rrsp_round 2000, half 35000, shortfall_round 5300 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
