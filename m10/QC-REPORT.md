# Automated QC

File: `showreel/out/m10/m10-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1597 frames = 66.54 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 66.54 s vs 66.45 s |
| PASS | loudness | -13.8 LUFS (target −14 ± 0.6) |
| PASS | true peak | -1.8 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 10.3% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 58 chunks, shortest 0.40 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 76 events |
| PASS | sound density under the voice | 0.91 per 3 s; within 1 s: [4.76, 34.74, 38.68] |
| PASS | facts: numbers from data.json match the narration | credit 725, tuition 8000, income 12000, cap 5000, carry 3000 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
