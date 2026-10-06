# GIS: the benefit low-income seniors miss: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them. The video length follows the VO (62.0 s, inside the user's 45 s–1:10 tolerance).
Voice: ElevenLabs Grady (via Higgsfield), the series voice. Post: silence trim, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood pension) at −24 LUFS, sidechain-ducked under the VO, faded out at the end; final mix −14 LUFS, AAC 192k.

## A. Final script
Sixty-five or older, on a low income? There's a monthly, tax-free payment you might be missing.
The government's own estimate: in twenty fifteen, about two hundred forty thousand eligible seniors didn't get it.
It's the Guaranteed Income Supplement. Up to eleven hundred thirty-eight dollars a month for a single senior, on top of OAS.
You need to receive OAS, live in Canada, and, if you're single, have income under twenty-three thousand one hundred twelve dollars, not counting OAS.
TFSA withdrawals don't count. And the first five thousand dollars you earn from work won't reduce it.
The key: file your taxes every year. That's how your eligibility is reviewed.
And if you qualify, don't delay OAS. You can't get GIS while you wait.
Know a senior on a low income? Make sure they've checked.
Follow for the real math.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:06.72] | hook | “Sixty-five or older, on a low income? There's a monthly, tax-free payment you might be missing.” | warm, concerned |
| [00:07.00–00:14.85] | loop | “The government's own estimate: in twenty fifteen, about two hundred forty thousand eligible seniors didn't get it.” | factual, a little surprised at the number |
| [00:15.21–00:23.24] | what | “It's the Guaranteed Income Supplement. Up to eleven hundred thirty-eight dollars a month for a single senior, on top of OAS.” | clear; the amount lands slowly |
| [00:23.52–00:35.04] | who | “You need to receive OAS, live in Canada, and, if you're single, have income under twenty-three thousand one hundred twelve dollars, not counting OAS.” | a checklist rhythm, three items |
| [00:35.32–00:42.26] | exempt | “TFSA withdrawals don't count. And the first five thousand dollars you earn from work won't reduce it.” | reassuring |
| [00:42.62–00:49.08] | file | “The key: file your taxes every year. That's how your eligibility is reviewed.” | firm: 'the key' |
| [00:49.36–00:55.41] | delay | “And if you qualify, don't delay OAS. You can't get GIS while you wait.” | gentle warning |
| [00:55.77–01:00.00] | payoff | “Know a senior on a low income? Make sure they've checked.” | a call to care for someone |
| [01:00.24–01:01.60] | cta | “Follow for the real math.” | friendly, short |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:02.19 | 'Monthly. Tax-free.' |
| 00:10.53 | 240,000 (ESDC estimate, 2015) |
| 00:15.21 | card moves to the sky; camera on the envelope |
| 00:18.02 | 'up to $1,138.90' pinned on the envelope |
| 00:24.10 | ✓ receive OAS ✓ live in Canada |
| 00:29.86 | < $23,112 |
| 00:35.67 | TFSA withdrawals (camera on the coin purse) |
| 00:38.79 | $5,000 of work earnings exempt |
| 00:43.26 | 'File every year.' (camera on the pen) |
| 00:49.97 | 'Don't delay OAS' |
| 00:55.77 | flag + 'Know a senior on a low income?' |
| 01:00.24 | follow CTA |

## E. Duration check
- 138 words, 58.9 s of speech, 141 wpm.
- Narration ends at 01:01.60; VO file 62.00 s; video 62.50 s (1500 frames at 24 fps); hold on the final frame 0.90 s. ✅ Fits.
