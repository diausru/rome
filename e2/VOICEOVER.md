# E2 OAS clawback: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them.
Voice: ElevenLabs Grady (via Higgsfield), the series voice. Post: silence trim, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood pension2) at −24 LUFS, sidechain-ducked under the VO; final mix −14 LUFS, AAC 192k.

## A. Final script
Retired, with income over ninety-five thousand? The government takes back part of your OAS.
But there are legal ways to keep more.
It's the recovery tax: fifteen cents for every dollar above the line.
Net income of a hundred and ten thousand? About fourteen thousand seven hundred over. Fifteen percent: twenty-two hundred dollars.
Taken from your OAS starting July twenty twenty-seven.
Lever one: at sixty-five, split up to half your RRIF income with your spouse.
Lever two: TFSA withdrawals aren't income, so they don't count.
Lever three: delay OAS. Each month, up to seventy, adds point six percent.
The right lever depends on your whole picture. Plan for the line.
Follow for the real math.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:06.89] | hook | “Retired, with income over ninety-five thousand? The government takes back part of your OAS.” | direct, a touch of alarm on 'takes back' |
| [00:07.17–00:09.30] | loop | “But there are legal ways to keep more.” | lift: reassurance and promise |
| [00:09.66–00:15.15] | rule | “It's the recovery tax: fifteen cents for every dollar above the line.” | clear and slow on 'fifteen cents' |
| [00:15.43–00:25.32] | example | “Net income of a hundred and ten thousand? About fourteen thousand seven hundred over. Fifteen percent: twenty-two hundred dollars.” | conversational math, a small beat before 'Fifteen percent' |
| [00:25.60–00:29.50] | timing | “Taken from your OAS starting July twenty twenty-seven.” | matter-of-fact |
| [00:29.86–00:36.90] | split | “Lever one: at sixty-five, split up to half your RRIF income with your spouse.” | count-off 'Lever one', warm |
| [00:37.14–00:42.01] | tfsa | “Lever two: TFSA withdrawals aren't income, so they don't count.” | light, quick |
| [00:42.25–00:49.90] | delay | “Lever three: delay OAS. Each month, up to seventy, adds point six percent.” | measured; 'point six percent' clean |
| [00:50.26–00:56.61] | payoff | “The right lever depends on your whole picture. Plan for the line.” | calm authority, land 'Plan for the line' |
| [00:56.85–00:58.35] | cta | “Follow for the real math.” | friendly, short |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.25 | $95,323 counts up on the hero card |
| 00:01.58 | income bar with the gold 2026 line enters |
| 00:07.17 | green 'legal ways to keep more' |
| 00:09.66 | 15¢ card |
| 00:15.43 | EXAMPLE card; bar fills to $110,000 |
| 00:18.89 | red excess: $14,677 over the line |
| 00:22.55 | × 15% = $2,201.55 |
| 00:25.60 | Jul 2027 → Jun 2028 |
| 00:29.86 | lever 1 card + first lever row |
| 00:37.14 | lever 2 |
| 00:42.25 | lever 3: +0.6%/month |
| 00:50.26 | flag + $95,323 + 'Plan for the line' |
| 00:56.85 | follow CTA |

## E. Duration check
- 115 words, 55.5 s of speech, 124 wpm.
- Narration ends at 00:58.35; VO file 58.75 s; video 59.50 s (1428 frames at 24 fps); hold on the final frame 1.15 s. ✅ Fits.
