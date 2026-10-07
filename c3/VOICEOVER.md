# The small business deduction: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them.
Voice: ElevenLabs Grady (via Higgsfield), the series voice. Post: silence trim, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood pension2) at −24 LUFS, sidechain-ducked; final mix −14 LUFS, AAC 192k.

## A. Final script
How does a small corporation in Manitoba pay just nine percent tax on its profit?
It's called the small business deduction.
On the first five hundred thousand of active business income, federal tax is nine percent, and Manitoba adds zero.
Above that, the general rate: twenty-seven percent combined.
Say your company earns a hundred and twenty thousand in profit. That's about ten thousand eight hundred in tax, instead of thirty-two thousand four hundred.
It's for Canadian-controlled private corporations earning active business income.
Two traps: large investment income inside the company shrinks the limit, and an incorporated employee, a personal services business, doesn't get it at all.
And it's a deferral, not a gift. When you pay yourself dividends, you pay personal tax on them.
Low rate inside the company, tax again on the way out. Plan both.
Next: sold a stock for a profit? Why only half of it is taxed. Follow so you don't miss it.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:05.76] | hook | “How does a small corporation in Manitoba pay just nine percent tax on its profit?” | curious, a little surprised |
| [00:06.00–00:08.60] | loop | “It's called the small business deduction.” | naming it |
| [00:08.84–00:17.86] | rate | “On the first five hundred thousand of active business income, federal tax is nine percent, and Manitoba adds zero.” | clear numbers |
| [00:18.10–00:22.57] | general | “Above that, the general rate: twenty-seven percent combined.” | contrast |
| [00:22.81–00:32.33] | example | “Say your company earns a hundred and twenty thousand in profit. That's about ten thousand eight hundred in tax, instead of thirty-two thousand four hundred.” | concrete |
| [00:32.57–00:37.73] | who | “It's for Canadian-controlled private corporations earning active business income.” | precise |
| [00:37.97–00:49.35] | traps | “Two traps: large investment income inside the company shrinks the limit, and an incorporated employee, a personal services business, doesn't get it at all.” | careful, warning |
| [00:49.59–00:56.38] | catch | “And it's a deferral, not a gift. When you pay yourself dividends, you pay personal tax on them.” | honest, measured |
| [00:56.62–01:01.89] | payoff | “Low rate inside the company, tax again on the way out. Plan both.” | practical |
| [01:02.13–01:09.49] | cta | “Next: sold a stock for a profit? Why only half of it is taxed. Follow so you don't miss it.” | a teaser, inviting |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.25 | owner in frame, no card; caption '9% tax on profit?' |
| 00:12.90 | 9% hero; pinned on the folders |
| 00:19.89 | 27% hero |
| 00:27.57 | $10,800 hero; pinned on the laptop |
| 00:32.83 | CCPC checklist |
| 00:38.88 | passive income / personal services business |
| 00:50.14 | 'A deferral, not a gift.' |
| 00:56.62 | flag + '9% inside the company. Tax again on the way out.' |
| 00:22.81 | scene change 1: whip push from morning to the working day |
| 00:37.97 | scene change 2: whip push to the evening desk |
| 01:02.13 | bridge pill 'Next: why only half of a gain is taxed →' + 'Follow so you don't miss it' |

## E. Duration check
- 157 words, 67.1 s of speech, 140 wpm.
- Narration ends at 01:09.49; VO file 69.73 s; video 70.25 s (1686 frames at 24 fps); hold on the final frame 0.76 s. ✅ Fits.
