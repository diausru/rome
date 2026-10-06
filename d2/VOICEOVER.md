# Canada Child Benefit and your income: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them.
Voice: ElevenLabs Grady (via Higgsfield), the series voice. Post: silence trim, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood kids) at −24 LUFS, sidechain-ducked; final mix −14 LUFS, AAC 192k.

## A. Final script
Got a raise? Your Canada Child Benefit could shrink, but not right away.
It runs a year behind.
Payments from July twenty twenty-six to June twenty twenty-seven use your family's net income from twenty twenty-five.
The maximum: about eight thousand one hundred sixty a year for a child under six.
Once family net income passes about thirty-eight thousand, it starts to shrink.
One child under six, family income seventy thousand: about four ninety-four a month.
A ten-thousand-dollar raise cuts it by seven hundred a year, starting the July after you file.
One lever: RRSP contributions lower your net income.
And the big rule: you and your spouse both file every year, even with no income, or the payments stop.
So take the raise. Just plan for that July.
Follow for the real math.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:05.41] | hook | “Got a raise? Your Canada Child Benefit could shrink, but not right away.” | warm, a small twist on 'not right away' |
| [00:05.69–00:07.28] | loop | “It runs a year behind.” | short, knowing |
| [00:07.63–00:16.12] | base | “Payments from July twenty twenty-six to June twenty twenty-seven use your family's net income from twenty twenty-five.” | clear dates |
| [00:16.44–00:22.12] | max | “The maximum: about eight thousand one hundred sixty a year for a child under six.” | good news |
| [00:22.44–00:27.30] | threshold | “Once family net income passes about thirty-eight thousand, it starts to shrink.” | steady |
| [00:27.62–00:34.64] | example | “One child under six, family income seventy thousand: about four ninety-four a month.” | concrete, friendly |
| [00:34.96–00:40.75] | raise | “A ten-thousand-dollar raise cuts it by seven hundred a year, starting the July after you file.” | matter-of-fact |
| [00:41.07–00:45.94] | lever | “One lever: RRSP contributions lower your net income.” | helpful |
| [00:46.26–00:55.32] | file | “And the big rule: you and your spouse both file every year, even with no income, or the payments stop.” | firm, the key rule |
| [00:55.64–00:59.57] | payoff | “So take the raise. Just plan for that July.” | reassuring |
| [00:59.81–01:01.30] | cta | “Follow for the real math.” | friendly, short |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.25 | family in frame, no card; caption 'Got a raise?' |
| 00:12.72 | 'use your 2025' family net income |
| 00:17.86 | $8,157 hero; pinned on the sneakers |
| 00:23.90 | $38,237 hero |
| 00:30.78 | ≈ $494 / month on the coin jar; formula line |
| 00:36.69 | −$700 hero; pinned on the envelope |
| 00:42.53 | RRSP lowers net income |
| 00:47.61 | the big rule: both spouses file every year |
| 00:55.64 | flag + 'Take the raise. Plan for the July after.' |
| 00:59.81 | follow CTA |

## E. Duration check
- 133 words, 57.9 s of speech, 138 wpm.
- Narration ends at 01:01.30; VO file 61.70 s; video 62.21 s (1493 frames at 24 fps); hold on the final frame 0.91 s. ✅ Fits.
