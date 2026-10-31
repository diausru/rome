# Automated QC

File: `showreel/out/r3/r3-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1648 frames = 68.67 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 68.67 s vs 68.61 s |
| PASS | loudness | -14.1 LUFS (target −14 ± 0.6) |
| PASS | true peak | -1.3 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 7.7% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 57 chunks, shortest 0.43 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 72 events |
| ADVICE | sound density under the voice | 1.01 per 3 s; within 1 s: [9.71, 10.85, 11.4, 41.13, 56.42] |
| PASS | facts: numbers from data.json match the narration | total 400, split 58, pooled 87, tier 200, high 0.29, credit_each 29, gain 29, carry_years 5 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
