# Automated QC

File: `showreel/out/c2/c2-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1690 frames = 70.42 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 70.42 s vs 70.34 s |
| PASS | loudness | -14.0 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.7 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 17.4% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 65 chunks, shortest 0.32 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 84 events |
| ADVICE | sound density under the voice | 1.16 per 3 s; within 1 s: [4.19, 6.32, 44.64, 62.7] |
| PASS | facts: numbers from data.json match the narration | profit 100000, gap_round 5800, salary_round 95400, sal_keep_round 69200, corp_rate 0.09, div_round 91000, div_tax_round 16000, div_keep_round 75000, cpp_round 9300, rrsp_round 17000, ei_share 0.4 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
