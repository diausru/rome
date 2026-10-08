# Benefits newcomers can claim: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them.
Voice: ElevenLabs Grady (via Higgsfield), the series voice. Post: silence trim, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood kids) at −24 LUFS, sidechain-ducked; final mix −14 LUFS, AAC 192k.

## A. Final script
New to Canada? Some government payments can start almost right away. But only if you ask.
One: the Canada Groceries and Essentials Benefit, the old GST/HST credit. Tax-free, paid every three months.
Two: the Canada child benefit. Up to eight thousand one hundred fifty-seven dollars a year for each child under six.
On a work or study permit? You generally need eighteen months in Canada first.
Apply as soon as you arrive: form RC151, or RC66 if you have kids. You'll need a social insurance number.
Three: the Canadian Dental Care Plan, for families with no dental insurance and income under ninety thousand.
The catch: all of them run on your tax return. File every year, even with zero income.
Next: own property back home? When CRA wants form T1135. Follow so you don't miss it.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:06.65] | hook | “New to Canada? Some government payments can start almost right away. But only if you ask.” | welcoming, open loop on 'only if you ask' |
| [00:06.93–00:15.97] | cgeb | “One: the Canada Groceries and Essentials Benefit, the old GST/HST credit. Tax-free, paid every three months.” | clear; land 'tax-free' |
| [00:16.23–00:25.48] | ccb | “Two: the Canada child benefit. Up to eight thousand one hundred fifty-seven dollars a year for each child under six.” | the big number, unhurried |
| [00:25.73–00:31.86] | temp | “On a work or study permit? You generally need eighteen months in Canada first.” | a caution, calm |
| [00:32.12–00:42.48] | apply | “Apply as soon as you arrive: form RC151, or RC66 if you have kids. You'll need a social insurance number.” | practical, two form names clearly |
| [00:42.76–00:50.58] | dental | “Three: the Canadian Dental Care Plan, for families with no dental insurance and income under ninety thousand.” | warm |
| [00:50.84–00:57.87] | file | “The catch: all of them run on your tax return. File every year, even with zero income.” | firm: 'the catch' |
| [00:58.17–01:06.79] | cta | “Next: own property back home? When CRA wants form T1135. Follow so you don't miss it.” | warm bridge: name the next topic, then the follow |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.25 | family unpacking groceries; caption 'New to Canada?' |
| 00:07.83 | CGEB card; pin 'paid in Jan · Apr · Jul · Oct' on the envelope |
| 00:16.23 | scene cut 1: kitchen → living room |
| 00:21.31 | '$8,157' hero |
| 00:29.41 | '18 months' hero |
| 00:34.19 | RC151 · RC66 card; pin 'you need a SIN' |
| 00:42.76 | scene cut 2: → the baby's first toothbrush |
| 00:47.84 | 'income < $90,000' |
| 00:50.84 | flag + 'It all runs on your return. File every year, even at $0.' |
| 00:58.17 | pill 'Next: own property abroad? T1135 →' + 'Follow so you don't miss it' |

## E. Duration check
- 136 words, 64.6 s of speech, 126 wpm.
- Narration ends at 01:06.79; VO file 67.19 s; video 67.71 s (1625 frames at 24 fps); hold on the final frame 0.92 s. ✅ Fits.
