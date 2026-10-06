# CPP at 60, 65 or 70: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, applies atempo 1.03, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them.
Voice: ElevenLabs Grady (via Higgsfield), the series voice. Post: silence trim, atempo 1.03, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood pension) at −24 LUFS, sidechain-ducked under the VO; final mix −14 LUFS, AAC 192k.

## A. Final script
Take CPP at sixty, or wait until seventy? The gap is bigger than most people think.
Three very different cheques.
Start at sixty: minus zero point six percent a month. Thirty-six percent, for life.
Wait past sixty-five: plus zero point seven a month. Up to forty-two percent at seventy.
Say it's a thousand dollars at sixty-five. At sixty: six forty. At seventy: fourteen twenty.
Waiting from sixty-five to seventy pays off, roughly, if you live past eighty-two.
The federal government says about half of today's retirees will reach ninety.
Serious health concerns? Earlier may make sense. Good health? Later may pay more.
It's a lifetime decision. Run your own numbers, and get advice.
Follow for the real math.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:07.21] | hook | “Take CPP at sixty, or wait until seventy? The gap is bigger than most people think.” | curious, a little provocative on 'bigger' |
| [00:07.49–00:09.80] | loop | “Three very different cheques.” | short, weighty |
| [00:10.16–00:17.32] | early | “Start at sixty: minus zero point six percent a month. Thirty-six percent, for life.” | clear numbers; 'for life' lands low |
| [00:17.60–00:24.81] | late | “Wait past sixty-five: plus zero point seven a month. Up to forty-two percent at seventy.” | lift, optimistic |
| [00:25.09–00:34.27] | example | “Say it's a thousand dollars at sixty-five. At sixty: six forty. At seventy: fourteen twenty.” | conversational count: sixty, sixty-five, seventy |
| [00:34.62–00:40.24] | breakeven | “Waiting from sixty-five to seventy pays off, roughly, if you live past eighty-two.” | measured; 'roughly' is honest, not hedgy |
| [00:40.52–00:45.50] | odds | “The federal government says about half of today's retirees will reach ninety.” | calm authority |
| [00:45.86–00:52.54] | health | “Serious health concerns? Earlier may make sense. Good health? Later may pay more.” | two-sided, balanced |
| [00:52.82–00:57.26] | payoff | “It's a lifetime decision. Run your own numbers, and get advice.” | warm, direct |
| [00:57.50–00:58.84] | cta | “Follow for the real math.” | friendly, short |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.25 | card '60 · 65 · 70'; camera on the couple |
| 00:07.49 | camera to the props; 'three very different cheques' |
| 00:10.16 | START AT 60 card; camera to the hourglass |
| 00:14.10 | −36% rises |
| 00:17.60 | WAIT TO 70 card; camera to the tall stack |
| 00:21.93 | +42% rises |
| 00:25.09 | card moves to the sky |
| 00:25.82 | $1,000 pinned on the middle stack |
| 00:29.68 | $640 pinned on the short stack |
| 00:32.25 | $1,420 pinned on the tall stack |
| 00:32.80 | 'more than double' |
| 00:37.71 | ≈ age 82 |
| 00:42.01 | ≈ 50% |
| 00:46.19 | Health concerns? / Good health? |
| 00:52.82 | flag + 'A lifetime decision.' |
| 00:57.50 | follow CTA |

## E. Duration check
- 118 words, 55.9 s of speech, 127 wpm.
- Narration ends at 00:58.84; VO file 59.24 s; video 59.50 s (1428 frames at 24 fps); hold on the final frame 0.66 s. ✅ Fits.
