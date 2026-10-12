# Automated QC

File: `showreel/out/a1/a1-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1676 frames = 69.83 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 69.83 s vs 69.74 s |
| PASS | loudness | -14.1 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.5 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 18.0% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 10 boxes inside |
| PASS | captions never overlap a panel | clear |
| FAIL | captions (timing, chunk size) | a chunk is on screen only 0.11 s |
| PASS | pacing: nothing static over 3 s | 78 events |
| PASS | sound density under the voice | 0.84 per 3 s; within 1 s: [3.03] |
| PASS | facts: numbers from data.json match the narration | supplies 1000, edu_rate 0.25, edu_credit 250, her_age 40, course 3000, ctc_per_year 250, ctc_claim 1500, mom_age 70, reno 20000, rate 0.14, hatc_credit 2800, total 4550 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
