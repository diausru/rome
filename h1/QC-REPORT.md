# Automated QC

File: `showreel/out/h1/h1-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1640 frames = 68.33 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 68.33 s vs 68.27 s |
| PASS | loudness | -14.0 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.8 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 13.2% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 59 chunks, shortest 0.36 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 78 events |
| ADVICE | sound density under the voice | 1.11 per 3 s; within 1 s: [4.53, 44.08] |
| PASS | facts: numbers from data.json match the narration | caregiver 1400, fert_paid 20000, fert_rate 0.4, fert_credit 8000, hatc_credit 1600, care_days 90, years_back 3 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
