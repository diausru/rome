# Your first pay stub, explained: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them.
Voice: ElevenLabs Grady (via Higgsfield), the series voice. Post: silence trim, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood work) at −24 LUFS, sidechain-ducked; final mix −14 LUFS, AAC 192k.

## A. Final script
First paycheque smaller than you expected? Here's where the money went.
Three deductions, every single pay.
Say you earn fifty-two thousand a year in Manitoba, paid every two weeks. That's two thousand dollars a cheque.
First, CPP: about a hundred and eleven dollars. That's your future pension.
Then EI: about thirty-three. That's employment insurance.
And income tax: about three hundred, federal and Manitoba together, based on your TD1 form.
So you take home roughly fifteen hundred fifty-five.
The twist: once you hit the yearly maximum for CPP or EI, those deductions stop until January.
And at tax time, your return settles the difference: a refund, or a balance owing.
Follow for the real math.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:04.52] | hook | “First paycheque smaller than you expected? Here's where the money went.” | relatable, a little wry; open loop |
| [00:04.80–00:07.60] | loop | “Three deductions, every single pay.” | crisp, count it |
| [00:07.96–00:15.79] | setup | “Say you earn fifty-two thousand a year in Manitoba, paid every two weeks. That's two thousand dollars a cheque.” | calm, clear numbers |
| [00:16.16–00:23.82] | cpp | “First, CPP: about a hundred and eleven dollars. That's your future pension.” | informative; warm on 'future pension' |
| [00:24.10–00:28.62] | ei | “Then EI: about thirty-three. That's employment insurance.” | brisk |
| [00:28.90–00:36.12] | tax | “And income tax: about three hundred, federal and Manitoba together, based on your TD1 form.” | steady; 'TD1' clear |
| [00:36.48–00:39.83] | net | “So you take home roughly fifteen hundred fifty-five.” | land the number |
| [00:40.19–00:48.09] | twist | “The twist: once you hit the yearly maximum for CPP or EI, those deductions stop until January.” | lean in, reveal |
| [00:48.45–00:55.04] | payoff | “And at tax time, your return settles the difference: a refund, or a balance owing.” | reassuring |
| [00:55.28–00:56.76] | cta | “Follow for the real math.” | friendly, short |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:01.53 | top card 'Smaller than you expected?' (face visible before it) |
| 00:04.80 | 'Three deductions. Every pay.' + push in on the stub |
| 00:11.49 | '$2,000 gross' pinned on the envelope; strip starts |
| 00:17.07 | −$110.99 hero; strip + CPP |
| 00:24.78 | −$32.60 hero; strip + EI |
| 00:29.77 | −$301.56 hero (federal + Manitoba); strip + tax |
| 00:37.49 | $1,554.85 hero; '≈ $1,555' on the envelope |
| 00:40.98 | 2026 ceilings: CPP $85,000 (incl. CPP2), EI $68,900 |
| 00:48.45 | flag + 'CPP. EI. Income tax. Your return settles the rest.' |
| 00:55.28 | follow CTA |

## E. Duration check
- 114 words, 53.6 s of speech, 128 wpm.
- Narration ends at 00:56.76; VO file 57.16 s; video 57.67 s (1384 frames at 24 fps); hold on the final frame 0.91 s. ✅ Fits.
