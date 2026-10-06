# RESP: the 20% grant + the Canada Learning Bond: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them.
Voice: ElevenLabs Grady (via Higgsfield), the series voice. Post: silence trim, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood kids) at −24 LUFS, sidechain-ducked under the VO; final mix −14 LUFS, AAC 192k.

## A. Final script
Put twenty-five hundred a year into your kid's RESP, and the government adds five hundred.
Most parents know that part. Not the rest.
It's the Canada Education Savings Grant: twenty percent on the first twenty-five hundred, every year, up to seventy-two hundred per child.
Start at birth with twenty-five hundred a year, and you reach the full seventy-two hundred in about fifteen years.
Missed a few years? Unused room carries forward. You can catch up, up to a thousand dollars of grant a year.
Lower-income family? The Canada Learning Bond adds up to two thousand dollars, and you don't have to contribute a cent.
The catch: if your child doesn't go on to post-secondary, the grant money goes back.
Start early, contribute steadily, and let the grant do the heavy lifting.
Follow for the real math.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:06.22] | hook | “Put twenty-five hundred a year into your kid's RESP, and the government adds five hundred.” | bright, a small smile on 'adds five hundred' |
| [00:06.50–00:09.63] | loop | “Most parents know that part. Not the rest.” | conspiratorial, a beat before 'Not the rest' |
| [00:09.99–00:18.84] | rule | “It's the Canada Education Savings Grant: twenty percent on the first twenty-five hundred, every year, up to seventy-two hundred per child.” | clear; full program name, numbers crisp |
| [00:19.12–00:27.11] | example | “Start at birth with twenty-five hundred a year, and you reach the full seventy-two hundred in about fifteen years.” | warm, building |
| [00:27.47–00:35.57] | catchup | “Missed a few years? Unused room carries forward. You can catch up, up to a thousand dollars of grant a year.” | reassuring |
| [00:35.85–00:43.77] | bond | “Lower-income family? The Canada Learning Bond adds up to two thousand dollars, and you don't have to contribute a cent.” | lift on 'don't have to contribute a cent' |
| [00:44.13–00:49.85] | catch | “The catch: if your child doesn't go on to post-secondary, the grant money goes back.” | lower, honest |
| [00:50.21–00:55.24] | payoff | “Start early, contribute steadily, and let the grant do the heavy lifting.” | encouraging |
| [00:55.48–00:56.84] | cta | “Follow for the real math.” | friendly, short |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.97 | $2,500 /year; 'YOU $2,500' pinned on the tall stack |
| 00:04.67 | +$500; 'GRANT +$500' pinned on the short stack |
| 00:13.09 | 20% |
| 00:17.25 | $7,200 (lifetime max) |
| 00:20.08 | grant counter runs year by year |
| 00:25.99 | 'full grant reached in year 15' |
| 00:27.96 | 'Unused grant room carries forward.' |
| 00:32.49 | $1,000 |
| 00:38.86 | $2,000 |
| 00:44.98 | 'No post-secondary?' (camera on the graduation cap) |
| 00:47.56 | 'The grant and bond go back…' |
| 00:50.21 | flag + 'Start early. Contribute steadily.' |
| 00:55.48 | follow CTA |

## E. Duration check
- 136 words, 54.1 s of speech, 151 wpm.
- Narration ends at 00:56.84; VO file 57.24 s; video 58.00 s (1392 frames at 24 fps); hold on the final frame 1.16 s. ✅ Fits.
