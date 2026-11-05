# Automated QC

File: `showreel/out/m7/m7-final.mp4`

| Result | Check | Detail |
|---|---|---|
| PASS | video format | 1080×1920 @ 24/1, 1654 frames = 68.92 s |
| PASS | decodes cleanly |  |
| PASS | length covers narration + hold | 68.92 s vs 68.83 s |
| PASS | loudness | -14.0 LUFS (target −14 ± 0.6) |
| PASS | true peak | -2.4 dBTP (≤ −1.0) |
| PASS | first frame carries the hook text | 19.5% bright pixels in the hook line box |
| PASS | safe zone (declared layout) | 6 boxes inside |
| PASS | captions never overlap a panel | clear |
| PASS | captions (timing, chunk size) | 59 chunks, shortest 0.41 s, method: pauses + word length (port of marketing-skill captions.js) |
| PASS | pacing: nothing static over 3 s | 76 events |
| PASS | sound density under the voice | 0.92 per 3 s; within 1 s: [5.78, 43.55] |
| PASS | facts: numbers from data.json match the narration | old_inc 60000, new_inc 70000, old_max 7997, new_max 8157 |

Visual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.
