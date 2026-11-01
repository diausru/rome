# Automated QC

File: `showreel/out/n1/n1-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1677 frames = 69.88 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 69.88 s vs 69.79 s |
| PASS | loudness | -14.0 LUFS (target −14 ± 0.6) |
| PASS | true peak | -1.9 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 31.5% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 63 chunks, shortest 0.30 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 75 events |
| PASS | sound density under the voice | 0.87 per 3 s; within 1 s: [4.35, 25.54, 42.54] |
| PASS | facts: numbers from data.json match the narration | div 80000, grossup_rate 0.38, taxable 110400, salary_fed_r 9200 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
