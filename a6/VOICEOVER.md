# What makes an expense deductible: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them.
Voice: ElevenLabs Grady (via Higgsfield), the series voice. Post: silence trim, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood pension2) at −24 LUFS, sidechain-ducked; final mix −14 LUFS, AAC 192k.

## A. Final script
Can you write it off? Before anything else, CRA asks one question.
Did you spend it to earn income?
As a rule, a reasonable expense you pay to earn business income is deductible. Personal costs are not.
Phone used sixty percent for the business? Twelve hundred a year becomes seven hundred twenty deductible.
Something that lasts for years, like a laptop or a car, isn't deducted all at once. It's claimed over time.
Business meals and entertainment? Generally, only half.
On a salary? You can deduct expenses only if your contract requires you to pay them.
And keep the receipts. Records generally have to be kept for six years.
Earn income, keep it reasonable, claim only the business part, and keep the proof.
Follow for the real math.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:06.30] | hook | “Can you write it off? Before anything else, CRA asks one question.” | curious, a little playful |
| [00:06.58–00:08.53] | loop | “Did you spend it to earn income?” | slow and clear: the one question |
| [00:08.89–00:16.33] | rule | “As a rule, a reasonable expense you pay to earn business income is deductible. Personal costs are not.” | plain-spoken rule; contrast on 'Personal costs are not' |
| [00:16.61–00:24.81] | split | “Phone used sixty percent for the business? Twelve hundred a year becomes seven hundred twenty deductible.” | quick math |
| [00:25.17–00:33.88] | capital | “Something that lasts for years, like a laptop or a car, isn't deducted all at once. It's claimed over time.” | explanatory |
| [00:34.16–00:38.32] | meals | “Business meals and entertainment? Generally, only half.” | short, a wink |
| [00:38.68–00:44.47] | employee | “On a salary? You can deduct expenses only if your contract requires you to pay them.” | careful, precise |
| [00:44.83–00:49.47] | proof | “And keep the receipts. Records generally have to be kept for six years.” | firm |
| [00:49.75–00:57.20] | payoff | “Earn income, keep it reasonable, claim only the business part, and keep the proof.” | a four-beat checklist rhythm |
| [00:57.44–00:58.88] | cta | “Follow for the real math.” | friendly, short |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:02.97 | 'One question first:' |
| 00:06.58 | 'Did it earn income?' |
| 00:09.63 | 'Deductible: reasonable costs to earn business income' |
| 00:14.47 | 'Not deductible: personal costs' |
| 00:19.07 | PHONE $720 pinned (camera on the phone) |
| 00:21.53 | $720 hero |
| 00:27.35 | LAPTOP 'over time' pinned |
| 00:28.65 | CAR 'over time' pinned |
| 00:35.83 | MEALS 50% pinned on the coffee |
| 00:39.26 | 'Only if your contract requires you to pay' |
| 00:46.22 | RECEIPTS '6 years' pinned on the folders |
| 00:49.75 | flag + the four-part checklist |
| 00:57.44 | follow CTA |

## E. Duration check
- 128 words, 55.8 s of speech, 138 wpm.
- Narration ends at 00:58.88; VO file 59.28 s; video 59.79 s (1435 frames at 24 fps); hold on the final frame 0.91 s. ✅ Fits.
