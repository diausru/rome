# RRSP vs TFSA: how to decide: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, applies atempo 1.03, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them.
Voice: ElevenLabs Grady (via Higgsfield), the series voice. Post: silence trim, atempo 1.03, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood pension2) at −24 LUFS, sidechain-ducked under the VO; final mix −14 LUFS, AAC 192k.

## A. Final script
RRSP or TFSA? One question decides it.
It's your tax rate. Now, and later.
RRSP: your contribution is deducted now, so you save tax today. But every dollar you take out is taxed as income.
TFSA: no deduction going in. But growth and withdrawals are tax-free, and the room comes back the next year.
Say you earn a thousand dollars and it doubles. Same tax rate going in and coming out? Both leave you fourteen hundred.
Lower rate in retirement? The RRSP comes out ahead. Higher later? The TFSA.
Twenty twenty-six limits: seven thousand for the TFSA, up to thirty-three thousand eight hundred ten for the RRSP.
So don't ask which is better. Ask which fits your tax rate.
Follow for the real math.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:04.69] | hook | “RRSP or TFSA? One question decides it.” | direct, intriguing |
| [00:04.97–00:08.46] | loop | “It's your tax rate. Now, and later.” | slow, two beats: 'Now… and later.' |
| [00:08.82–00:18.46] | rrsp | “RRSP: your contribution is deducted now, so you save tax today. But every dollar you take out is taxed as income.” | clear contrast: 'save tax today' up, 'taxed as income' down |
| [00:18.75–00:26.74] | tfsa | “TFSA: no deduction going in. But growth and withdrawals are tax-free, and the room comes back the next year.” | mirror of the RRSP line |
| [00:27.10–00:35.63] | example | “Say you earn a thousand dollars and it doubles. Same tax rate going in and coming out? Both leave you fourteen hundred.” | conversational math; a beat before 'Both' |
| [00:35.91–00:42.98] | verdict | “Lower rate in retirement? The RRSP comes out ahead. Higher later? The TFSA.” | crisp either/or |
| [00:43.34–00:52.54] | limits | “Twenty twenty-six limits: seven thousand for the TFSA, up to thirty-three thousand eight hundred ten for the RRSP.” | numbers clean, no rush |
| [00:52.90–00:57.18] | payoff | “So don't ask which is better. Ask which fits your tax rate.” | reframe, confident |
| [00:57.42–00:59.04] | cta | “Follow for the real math.” | friendly, short |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:02.25 | RRSP / TFSA labels pinned on the two jars |
| 00:04.97 | camera to the woman; 'Your tax rate: now vs later.' |
| 00:08.82 | camera to the RRSP jar; 'Deducted now.' |
| 00:14.61 | 'Taxed when it comes out.' |
| 00:18.75 | camera to the TFSA jar |
| 00:24.50 | room comes back Jan 1 |
| 00:27.79 | jar amounts start: $1,000 each |
| 00:28.64 | TFSA −30% going in → $700 |
| 00:30.43 | doubled: $2,000 / $1,400 |
| 00:32.05 | RRSP −30% coming out → $1,400 |
| 00:33.92 | 'Same: $1,400' |
| 00:36.26 | Lower rate later → RRSP ahead (e.g. $1,600) |
| 00:40.15 | Higher rate later → TFSA ahead (e.g. $1,200 vs $1,400) |
| 00:45.18 | $7,000 TFSA |
| 00:48.49 | $33,810 RRSP max |
| 00:52.90 | flag + 'Which fits your tax rate.' |
| 00:57.42 | follow CTA |

## E. Duration check
- 124 words, 56.3 s of speech, 132 wpm.
- Narration ends at 00:59.04; VO file 59.44 s; video 59.50 s (1428 frames at 24 fps); hold on the final frame 0.46 s. ✅ Fits.
