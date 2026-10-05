# CASE #002: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. It is synthesized beat by beat by `case002/vo.py`; the measured times go to `showreel/src/case002-timeline.json`, and every visual reveal in `showreel/src/Case002.tsx` is computed from them, so changing the script re-times the video.
Voice: Piper TTS (`piper-tts` 1.8.0), voice en_US-joe-medium (CC0 dataset), rendered locally. Post: high-pass 80 Hz, +2 dB at 3.2 kHz, −1.5 dB at 250 Hz, 2.5:1 compression, loudnorm −14 LUFS / −1.5 dBTP, 48 kHz stereo, AAC 192k.
**Limitation:** a local neural voice, not a human narrator. It works as a timing-locked track; a professional re-record can follow this script and timecode exactly.

## A. Final script
You send your parents five hundred dollars a month.
That's six thousand a year. Can you claim it?
In most cases? No.
Deductible support goes to a spouse, an ex, or your child's other parent, under a court order or written agreement.
Parents aren't on that list.
But three tax credits can include a parent.
The caregiver amount, if they have an impairment.
Medical expenses you pay for them.
And the eligible dependant amount, if you're single and they live with you.
Now the catch.
For a parent, the first two require residence in Canada at some point in the year.
Abroad all year, and never lived with you? These generally don't apply.
Bringing them here? Residency depends on the facts. Get advice, and keep proof of support.
Sending money home is generous. It just isn't a write-off.
Follow for the real math.

## B + C. Timecoded voiceover with delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:03.28] | hook | “You send your parents five hundred dollars a month.” | normal, confident; land "five hundred dollars" |
| [00:03.58–00:06.64] | year | “That's six thousand a year. Can you claim it?” | normal; question rises on "claim it" |
| [00:07.19–00:09.40] | answer | “In most cases? No.” | slower; dramatic pause before "No" |
| [00:09.95–00:17.14] | support | “Deductible support goes to a spouse, an ex, or your child's other parent, under a court order or written agreement.” | normal, clear, informative |
| [00:17.39–00:19.02] | notlist | “Parents aren't on that list.” | emphasis on "aren't"; short pause after |
| [00:19.57–00:22.29] | credits | “But three tax credits can include a parent.” | stronger delivery; lift on "can" |
| [00:22.54–00:25.44] | care | “The caregiver amount, if they have an impairment.” | normal |
| [00:25.59–00:27.84] | medical | “Medical expenses you pay for them.” | normal |
| [00:27.98–00:32.36] | eligible | “And the eligible dependant amount, if you're single and they live with you.” | normal; light emphasis "single", "live with you" |
| [00:32.86–00:34.02] | catch | “Now the catch.” | slower; dramatic pause after |
| [00:34.42–00:39.65] | resident | “For a parent, the first two require residence in Canada at some point in the year.” | emphasis "residence in Canada" |
| [00:39.95–00:44.61] | abroad | “Abroad all year, and never lived with you? These generally don't apply.” | slower, calm, firm |
| [00:45.11–00:51.80] | advice | “Bringing them here? Residency depends on the facts. Get advice, and keep proof of support.” | normal; short pause after "facts" |
| [00:52.30–00:56.42] | payoff | “Sending money home is generous. It just isn't a write-off.” | slower, warm; emphasis "write-off" |
| [00:56.82–00:58.47] | cta | “Follow for the real math.” | normal, friendly |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.25 | "$500 /month" card lands with the first words (EXAMPLE tag) |
| 00:03.73 | "× 12 = $6,000 a year" (number reveal) |
| 00:05.48 | "Deductible?" pops on "claim it" |
| 00:09.09 | **NO** stamp lands on the word "No" (impact) |
| 00:11.75 | Spouse or ex-partner |
| 00:13.54 | Your child's other parent |
| 00:15.56 | Court order or written agreement |
| 00:17.55 | ✗ "Your parents" (comparison) |
| 00:19.57 | "3 tax credits" card (major transition) |
| 00:22.54 | Row 1: Caregiver amount (line 30450) |
| 00:25.59 | Row 2: Medical expenses (line 33199) |
| 00:27.98 | Row 3: Eligible dependant (line 30400) |
| 00:32.86 | THE CATCH (major transition) |
| 00:37.30 | RESIDENT IN CANADA stamps hit rows 1–2 |
| 00:41.35 | Rows turn grey: "abroad all year: no" / "never lived with you: no" |
| 00:45.11 | Situation for a professional |
| 00:52.30 | Payoff: flag + "Generous. Not a write-off." (final conclusion) |
| 00:56.82 | CTA button |

## E. Duration check
- 143 words, 52.9 s of speech → **162 wpm** (calm explainer pace). Revision: v1 ran at 188 wpm, too fast for the brief; the script was cut and the voice slowed.
- The narration ends at 00:58.47; the VO file is 58.97 s; the video is 59.50 s (1428 frames at 24 fps). Hold on the final frame: 1.03 s. ✅ Fits.
