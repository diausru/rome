# Automated QC

File: `showreel/out/a8/a8-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1683 frames = 70.12 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 70.12 s vs 70.04 s |
| PASS | loudness | -14.0 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.6 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 18.5% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 10 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 57 chunks, shortest 0.44 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 79 events |
| ADVICE | sound density under the voice | 1.04 per 3 s; within 1 s: [4.04] |
| PASS | facts: numbers from data.json match the narration | balance 4000, base_rate 0.05, monthly_rate 0.01, penalty 360, max_rate 0.17 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
