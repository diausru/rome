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
Next: when selling your home isn't tax-free. Follow so you don't miss it.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:05.74] | hook | “Sold a stock for a profit? You're not taxed on all of it. Only half.” | a pleasant surprise on 'only half' |
| [00:05.92–00:07.12] | loop | “Here's how the math works.” | inviting |
| [00:07.30–00:15.05] | formula | “Your capital gain is the selling price, minus your cost, the adjusted cost base, minus selling costs.” | clear, step by step |
| [00:15.23–00:25.23] | example | “Bought shares for ten thousand, sold them for sixteen thousand, paid fifty dollars in fees. The gain: five thousand nine hundred fifty.” | concrete numbers |
| [00:25.41–00:32.55] | half | “Only half of it, two thousand nine hundred seventy-five, is added to your income, at your regular tax rate.” | land $2,975 |
| [00:32.73–00:38.28] | rate | “And the planned jump to two-thirds was cancelled. It's still one-half.” | news, reassuring |
| [00:38.47–00:48.36] | losses | “Capital losses only offset capital gains. Unused ones can go back three years, or forward with no time limit.” | steady |
| [00:48.54–00:54.99] | trap | “One trap: sell at a loss and buy it back within thirty days, and the loss is denied.” | warning |
| [00:55.17–00:59.50] | tfsa | “And inside a TFSA, gains generally aren't taxed at all.” | light |
| [00:59.68–01:03.90] | payoff | “Track your cost base. Every sale goes on your return.” | practical |
| [01:04.08–01:09.41] | cta | “Next: when selling your home isn't tax-free. Follow so you don't miss it.” | warm bridge: name the next topic, then the follow |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.25 | reader in frame, no card; caption 'only half is taxed' |
| 00:07.69 | price − cost − selling costs |
| 00:15.23 | scene cut 1: café → kitchen table (whip push) |
| 00:23.23 | = $5,950; pinned on the coins |
| 00:27.55 | $2,975 hero + pin |
| 00:33.29 | 'The proposed jump to 2/3 was cancelled.' |
| 00:38.47 | scene cut 2: kitchen → evening desk (whip push) |
| 00:43.41 | back 3 years / forward indefinitely |
| 00:52.41 | loss denied; pinned on the coffee |
| 00:55.60 | TFSA: generally not taxed |
| 00:59.68 | flag + 'Half is taxed. Track your cost base.' |
| 01:04.08 | pill 'Next: selling your home, when it's taxed →' + 'Follow so you don't miss it' |

## E. Duration check
- 159 words, 67.4 s of speech, 142 wpm.
- Narration ends at 01:09.41; VO file 69.61 s; video 70.12 s (1683 frames at 24 fps); hold on the final frame 0.71 s. ✅ Fits.
