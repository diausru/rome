# Automated QC

File: `showreel/out/r2/r2-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1691 frames = 70.46 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 70.46 s vs 70.39 s |
| PASS | loudness | -14.1 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.5 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 8.4% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 60 chunks, shortest 0.41 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 76 events |
| PASS | sound density under the voice | 0.90 per 3 s; within 1 s: [10.15, 14.27, 32.08, 48.39, 49.18] |
| PASS | facts: numbers from data.json match the narration | inc_a 18000, max 8601, credit_a 1247, inc_b 24000, threshold 20197, credit_b 696, inc_c 30000 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
