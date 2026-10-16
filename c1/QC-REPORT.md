# Automated QC

File: `showreel/out/c1/c1-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1686 frames = 70.25 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 70.25 s vs 70.16 s |
| PASS | loudness | -14.0 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.6 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 15.4% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 61 chunks, shortest 0.33 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 77 events |
| ADVICE | sound density under the voice | 1.04 per 3 s; within 1 s: [4.53, 46.84] |
| PASS | facts: numbers from data.json match the narration | profit 100000, gap_round 6000, sole_tax_round 21700, sole_cpp_round 9300, sole_keep_round 69000, corp_rate 0.09, corp_total_round 25000, retain 40000 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
