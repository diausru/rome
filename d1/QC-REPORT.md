# Automated QC

File: `showreel/out/d1/d1-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1685 frames = 70.21 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 70.21 s vs 70.12 s |
| PASS | loudness | -14.1 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.8 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 17.9% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 13 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 59 chunks, shortest 0.28 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 85 events |
| PASS | sound density under the voice | 0.92 per 3 s; within 1 s: [5.81] |
| PASS | facts: numbers from data.json match the narration | tuition 8000, rate 0.14, student_income 12000, transfer_cap 5000, min_fees 100, credit 1120, transfer 700, carry 3000, carry_credit 420 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
