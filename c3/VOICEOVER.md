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
Follow for the real math.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:05.76] | hook | “How does a small corporation in Manitoba pay just nine percent tax on its profit?” | curious, a little surprised |
| [00:06.04–00:08.63] | loop | “It's called the small business deduction.” | naming it |
| [00:08.99–00:18.02] | rate | “On the first five hundred thousand of active business income, federal tax is nine percent, and Manitoba adds zero.” | clear numbers |
| [00:18.34–00:22.81] | general | “Above that, the general rate: twenty-seven percent combined.” | contrast |
| [00:23.13–00:32.65] | example | “Say your company earns a hundred and twenty thousand in profit. That's about ten thousand eight hundred in tax, instead of thirty-two thousand four hundred.” | concrete |
| [00:33.01–00:38.17] | who | “It's for Canadian-controlled private corporations earning active business income.” | precise |
| [00:38.49–00:49.88] | traps | “Two traps: large investment income inside the company shrinks the limit, and an incorporated employee, a personal services business, doesn't get it at all.” | careful, warning |
| [00:50.23–00:57.02] | catch | “And it's a deferral, not a gift. When you pay yourself dividends, you pay personal tax on them.” | honest, measured |
| [00:57.34–01:02.61] | payoff | “Low rate inside the company, tax again on the way out. Plan both.” | practical |
| [01:02.89–01:04.38] | cta | “Follow for the real math.” | friendly, short |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.25 | owner in frame, no card; caption '9% tax on profit?' |
| 00:13.06 | 9% hero; pinned on the folders |
| 00:20.13 | 27% hero |
| 00:27.89 | $10,800 hero; pinned on the laptop |
| 00:33.27 | CCPC checklist |
| 00:39.40 | passive income / personal services business |
| 00:50.78 | 'A deferral, not a gift.' |
| 00:57.34 | flag + '9% inside the company. Tax again on the way out.' |
| 01:02.89 | follow CTA |

## E. Duration check
- 142 words, 61.2 s of speech, 139 wpm.
- Narration ends at 01:04.38; VO file 64.78 s; video 65.29 s (1567 frames at 24 fps); hold on the final frame 0.92 s. ✅ Fits.
