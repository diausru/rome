# Automated QC

File: `showreel/out/h4/h4-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1694 frames = 70.58 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 70.58 s vs 70.49 s |
| PASS | loudness | -14.1 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.0 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 19.6% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 9 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 61 chunks, shortest 0.31 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 80 events |
| PASS | sound density under the voice | 0.96 per 3 s; within 1 s: [5.29, 21.04, 26.35] |
| PASS | facts: numbers from data.json match the narration | r1 0.108, t1 47000, r2 0.1275, t2 100000, r3 0.174, bpa 15780, from_income 98000, to_k 102, mb_on_raise 603, phase_start 200000, phase_end 400000, renters 625, homeowners 1600 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
