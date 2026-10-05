# TAX CASE #001 — voiceover package (VOICEOVER ENGINE A–E)

**Status:** synthesized and placed. Voice: ElevenLabs v4 via Higgsfield, preset voice "Harrison" (chosen by the user's request for a realistic Higgsfield voice), one generation per line (15 jobs, ≈0.23 credits each). Speech onsets and ends were measured with ffmpeg silencedetect (−40 dB). `vo/build_vo.py` places the lines, then masters: high-pass 80 Hz, −1.5 dB at 250 Hz, +2 dB at 3.2 kHz, 2.5:1 compression, −14.0 LUFS integrated (measured), true peak ≤ −1.5 dBTP (measured −3.8 dBFS sample peak), 48 kHz stereo. The pencil marks and ticks in `post.py` were re-timed to the spoken words (picture frames unchanged).

**Fact check (REAL TAX INFORMATION MODE):** the narration makes no tax rule, threshold, deadline length or procedure claim. It only describes the fictional on-screen notice and gives general reading advice. The amount ($2,460) and the deadline are fictional demo values printed on the fictional document, and the narration calls it "this one", never a CRA rule. Footer on the final shot: "Fictional example · General info, not advice".

## A. Final script
A letter from the C-R-A just landed.
Don't toss it. Don't panic.
Open it. Read it properly.
This one says you owe money.
Two thousand, four hundred and sixty dollars.
But why?
Start with the basics. The date. The tax year. The reference.
Then find the explanation.
Here's what changed.
The amount. The reason. And the deadline.
Before you pay, or push back, make sure every detail is right.
Check the details.
Your name. The tax year. The amount. The reason. The deadline.
Then keep it with your records.
Understand the letter, before you act.

## B + C. Timecoded voiceover (measured) with delivery notes
| Time | Narration | Delivery / sync |
|---|---|---|
| [00:00.20–00:02.86] | “A letter from the C-R-A just landed.” | calm, close; hook |
| [00:03.00–00:05.30] | “Don't toss it. Don't panic.” | calm; short pause between sentences |
| [00:05.45–00:07.57] | “Open it. Read it properly.” | normal; emphasis on "properly" |
| [00:07.75–00:09.61] | “This one says you owe money.” | slower |
| [00:09.90–00:12.77] | “Two thousand, four hundred and sixty dollars.” | slower; lands on the amount focus (10.2) and the underline (11.2) |
| [00:13.10–00:14.02] | “But why?” | stronger; question |
| [00:14.48–00:19.26] | “Start with the basics. The date. The tax year. The reference.” | each item lands with its underline (16.25 / 17.25 / 18.45) |
| [00:19.60–00:21.57] | “Then find the explanation.” | normal; underline at 20.5 |
| [00:23.70–00:24.88] | “Here's what changed.” | after the panel lands (23.58) |
| [00:26.80–00:30.54] | “The amount. The reason. And the deadline.” | each word with its focus pull (26.6 / 28.2 / 29.8) |
| [00:33.50–00:38.30] | “Before you pay, or push back, make sure every detail is right.” | slower, firm; after the silent hard stop and WAIT. (32.0 / 32.7) |
| [00:41.04–00:42.15] | “Check the details.” | with the title card (41.0) |
| [00:42.70–00:48.99] | “Your name. The tax year. The amount. The reason. The deadline.” | each item with its tick (42.75 / 44.2 / 45.6 / 46.9 / 48.2) |
| [00:49.39–00:51.12] | “Then keep it with your records.” | warm, over the case file |
| [00:51.60–00:54.21] | “Understand the letter, before you act.” | final conclusion, with the title (51.5) |

## D. Audio cue points
See `MARKERS.md` (impact 0.42, cuts 2.25 / 4.50 / 7.00 / 23.00 / 49.00, hard stop 32.00, WAIT 32.70, title 41.0, final line 51.5).

## E. Duration check (measured)
- 95 words, 40.9 s of speech → 139 wpm.
- Last word ends at 00:54.21; video 00:55.00 → 0.79 s hold. No line overlaps another (asserted in `build_vo.py`). ✅ Fits without changing the picture timeline.
