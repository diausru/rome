# Automated QC

File: `showreel/out/a5/a5-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1656 frames = 69.00 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 69.00 s vs 68.91 s |
| PASS | loudness | -14.4 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.4 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 18.7% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 9 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 55 chunks, shortest 0.41 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 75 events |
| PASS | sound density under the voice | 0.80 per 3 s; within 1 s: [2.09, 21.08] |
| PASS | facts: numbers from data.json match the narration | balance 5000, t5 15000, instal_threshold 3000, collection_days 90 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
