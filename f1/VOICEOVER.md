# Capital gains basics: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them.
Voice: ElevenLabs Grady (via Higgsfield), the series voice. Post: silence trim, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood pension) at −24 LUFS, sidechain-ducked; final mix −14 LUFS, AAC 192k.

## A. Final script
Sold a stock for a profit? You're not taxed on all of it. Only half.
Here's how the math works.
Your capital gain is the selling price, minus your cost, the adjusted cost base, minus selling costs.
Bought shares for ten thousand, sold them for sixteen thousand, paid fifty dollars in fees. The gain: five thousand nine hundred fifty.
Only half of it, two thousand nine hundred seventy-five, is added to your income, at your regular tax rate.
And the planned jump to two-thirds was cancelled. It's still one-half.
Capital losses only offset capital gains. Unused ones can go back three years, or forward with no time limit.
One trap: sell at a loss and buy it back within thirty days, and the loss is denied.
And inside a TFSA, gains generally aren't taxed at all.
Track your cost base. Every sale goes on your return.
Follow for the real math.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:05.74] | hook | “Sold a stock for a profit? You're not taxed on all of it. Only half.” | a pleasant surprise on 'only half' |
| [00:06.02–00:07.22] | loop | “Here's how the math works.” | inviting |
| [00:07.58–00:15.33] | formula | “Your capital gain is the selling price, minus your cost, the adjusted cost base, minus selling costs.” | clear, step by step |
| [00:15.65–00:25.65] | example | “Bought shares for ten thousand, sold them for sixteen thousand, paid fifty dollars in fees. The gain: five thousand nine hundred fifty.” | concrete numbers |
| [00:26.01–00:33.15] | half | “Only half of it, two thousand nine hundred seventy-five, is added to your income, at your regular tax rate.” | land $2,975 |
| [00:33.47–00:39.02] | rate | “And the planned jump to two-thirds was cancelled. It's still one-half.” | news, reassuring |
| [00:39.38–00:49.28] | losses | “Capital losses only offset capital gains. Unused ones can go back three years, or forward with no time limit.” | steady |
| [00:49.60–00:56.05] | trap | “One trap: sell at a loss and buy it back within thirty days, and the loss is denied.” | warning |
| [00:56.37–01:00.70] | tfsa | “And inside a TFSA, gains generally aren't taxed at all.” | light |
| [01:01.02–01:05.24] | payoff | “Track your cost base. Every sale goes on your return.” | practical |
| [01:05.52–01:07.00] | cta | “Follow for the real math.” | friendly, short |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.25 | reader in frame, no card; caption 'only half is taxed' |
| 00:07.97 | price − cost − selling costs |
| 00:23.65 | = $5,950; pinned on the coins |
| 00:28.15 | $2,975 hero + pin |
| 00:34.03 | 'The proposed jump to 2/3 was cancelled.' |
| 00:44.33 | back 3 years / forward indefinitely |
| 00:53.47 | loss denied; pinned on the coffee |
| 00:56.80 | TFSA: generally not taxed |
| 01:01.02 | flag + 'Half is taxed. Track your cost base.' |
| 01:05.52 | follow CTA |

## E. Duration check
- 151 words, 63.5 s of speech, 143 wpm.
- Narration ends at 01:07.00; VO file 67.40 s; video 67.92 s (1630 frames at 24 fps); hold on the final frame 0.92 s. ✅ Fits.
