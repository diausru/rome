# E3 RRSP at 71: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, applies atempo 1.03, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them.
Voice: ElevenLabs Grady (via Higgsfield), the series voice from E3 on. Post: silence trim, atempo 1.03, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood pension) at −24 LUFS, sidechain-ducked under the VO; final mix −14 LUFS, AAC 192k.

## A. Final script
Turning seventy-one? Your RRSP has a deadline: December thirty-first.
Miss it, and the whole account can hit one tax return.
One: cash out. On three hundred thousand dollars, it's all income that year, and thirty percent is withheld up front.
Two: an annuity. No tax withheld on the transfer; you're taxed as payments come in.
Three: move it to a RRIF. No tax withheld on a direct transfer either.
Withdrawals start the next year. At seventy-two, the minimum is five point four percent: sixteen thousand two hundred. No tax withheld, but it's still income.
The real danger is doing nothing. Miss the deadline, and the full value can be taxed as income.
Pick your path before December thirty-first. Talk to your issuer and a pro.
Follow for the real math.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:06.16] | hook | “Turning seventy-one? Your RRSP has a deadline: December thirty-first.” | calm authority; slight stress on 'deadline', land 'December thirty-first' slowly |
| [00:06.44–00:09.91] | loop | “Miss it, and the whole account can hit one tax return.” | lower, ominous; pause after 'Miss it' |
| [00:10.27–00:18.36] | cash | “One: cash out. On three hundred thousand dollars, it's all income that year, and thirty percent is withheld up front.” | count-off 'One'; weight on 'thirty percent' |
| [00:18.64–00:25.45] | annuity | “Two: an annuity. No tax withheld on the transfer; you're taxed as payments come in.” | reassuring, lighter |
| [00:25.69–00:31.75] | rrif | “Three: move it to a RRIF. No tax withheld on a direct transfer either.” | reassuring; 'either' rises a touch |
| [00:31.99–00:44.27] | minimum | “Withdrawals start the next year. At seventy-two, the minimum is five point four percent: sixteen thousand two hundred. No tax withheld, but it's still income.” | measured, numbers clear; 'still income' as a gentle warning |
| [00:44.63–00:52.01] | catch | “The real danger is doing nothing. Miss the deadline, and the full value can be taxed as income.” | drop the pitch; 'doing nothing' is the turn |
| [00:52.37–00:57.19] | payoff | “Pick your path before December thirty-first. Talk to your issuer and a pro.” | warm, direct |
| [00:57.43–00:58.81] | cta | “Follow for the real math.” | friendly, short |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.25 | Dec 31 deadline card |
| 00:06.44 | open loop: one tax return |
| 00:10.27 | card 1 Cash out; $300,000 counts up |
| 00:16.09 | −$90,000 withheld (30%) slides in |
| 00:18.64 | card 2 Annuity |
| 00:22.38 | 'Taxed as the payments come in' |
| 00:25.69 | card 3 RRIF |
| 00:35.67 | 5.40% reveals |
| 00:38.13 | × $300,000 = $16,200 counts |
| 00:41.56 | 'No tax withheld on the minimum · still taxable income' |
| 00:45.73 | red 'Do nothing' row on the board |
| 00:52.37 | flag + Dec 31 payoff |
| 00:57.43 | follow CTA |

## E. Duration check
- 130 words, 56.2 s of speech, 139 wpm.
- Narration ends at 00:58.81; VO file 59.22 s; video 59.50 s (1428 frames at 24 fps); hold on the final frame 0.69 s. ✅ Fits.
