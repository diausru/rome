# Gifts and tax in Canada (Christmas special): voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. Each beat was generated with Higgsfield ElevenLabs (text2speech_v2, preset voice Grady), then `tools/vo_hf.py` trims the silence, places the beats with their pauses and writes the measured times to the timeline JSON; every reveal in the composition is computed from them.
Voice: ElevenLabs Grady (via Higgsfield), the series voice. Post: silence trim, loudnorm −14 LUFS, 48 kHz. Music bed (tools/music.py, mood holiday) at −24 LUFS, sidechain-ducked; final mix −14 LUFS, AAC 192k.

## A. Final script
Cash under the tree? Canada has no gift tax. But some gifts can still cost the giver.
Got a gift? It's not income. You don't report it. But what the money earns later is taxed.
First catch: give money to your spouse to invest, and the interest, dividends and capital gains are taxed to you, not them.
The exception: money your spouse puts into their own TFSA. That isn't attributed back to you.
Same idea for kids under eighteen. Interest and dividends on money you give them are taxed to you.
Second catch: gifts that aren't cash. Give shares, a cottage or crypto to anyone but your spouse, and CRA treats it as sold at market value.
Bought shares for ten thousand dollars, now worth thirty? Give them to your son, and you report a twenty-thousand-dollar gain. Half of it is taxable.
And the gift from your boss: non-cash gifts up to five hundred dollars a year are tax-free. Cash is always taxable.
So the gift itself is free. What it earns, and what grew before you gave it, may not be.
Next: down on a stock? Why December thirtieth matters. Follow so you don't miss it.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:07.58] | hook | “Cash under the tree? Canada has no gift tax. But some gifts can still cost the giver.” | warm, a smile on 'cash under the tree', then the turn on 'cost the giver' |
| [00:07.76–00:14.21] | receive | “Got a gift? It's not income. You don't report it. But what the money earns later is taxed.” | reassuring, then the small pivot on 'what the money earns' |
| [00:14.37–00:25.40] | spouse | “First catch: give money to your spouse to invest, and the interest, dividends and capital gains are taxed to you, not them.” | clear; land 'taxed to you, not them' |
| [00:25.55–00:32.59] | tfsa | “The exception: money your spouse puts into their own TFSA. That isn't attributed back to you.” | relief |
| [00:32.74–00:40.02] | kids | “Same idea for kids under eighteen. Interest and dividends on money you give them are taxed to you.” | same idea, brisk |
| [00:40.20–00:54.09] | property | “Second catch: gifts that aren't cash. Give shares, a cottage or crypto to anyone but your spouse, and CRA treats it as sold at market value.” | the second turn; stress 'treated as sold' |
| [00:54.24–01:04.92] | example | “Bought shares for ten thousand dollars, now worth thirty? Give them to your son, and you report a twenty-thousand-dollar gain. Half of it is taxable.” | numbers unhurried; stress 'you report' and 'half of it' |
| [01:05.10–01:14.31] | boss | “And the gift from your boss: non-cash gifts up to five hundred dollars a year are tax-free. Cash is always taxable.” | lighter, practical; firm on 'cash is always taxable' |
| [01:14.49–01:21.80] | payoff | “So the gift itself is free. What it earns, and what grew before you gave it, may not be.” | warm summary, a beat before 'may not be' |
| [01:21.95–01:29.26] | cta | “Next: down on a stock? Why December thirtieth matters. Follow so you don't miss it.” | warm bridge: name the next topic, then the follow |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.25 | family by the tree, gifts everywhere; caption 'Cash under the tree?' |
| 00:09.37 | 'not income' hero (green) |
| 00:09.70 | pin 'a gift: not income' on the red-ribbon envelope |
| 00:23.41 | 'taxed to you' hero |
| 00:29.42 | 'not attributed' hero (green) |
| 00:38.42 | 'taxed to you' hero |
| 00:40.20 | scene cut 1: Christmas Eve → dinner, the cottage gift |
| 00:47.84 | pin 'treated as sold: at market value' under the cottage |
| 01:00.11 | '$20,000 gain' hero; pin 'you report' |
| 01:05.10 | scene cut 2: → Christmas morning |
| 01:10.16 | '$500 tax-free' hero; pin on the open gift box |
| 01:14.49 | flag + 'The gift is tax-free. What it earns may not be.' |
| 01:21.95 | pill 'Next: the Dec 30 stock deadline →' + 'Follow so you don't miss it' |

## E. Duration check
- 197 words, 87.5 s of speech, 135 wpm.
- Narration ends at 01:29.26; VO file 89.41 s; video 89.92 s (2158 frames at 24 fps); hold on the final frame 0.65 s. ✅ Fits.
