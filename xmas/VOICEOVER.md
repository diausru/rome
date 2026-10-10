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
Next: your TFSA room resets on January first. Follow so you don't miss it.

## B + C. Timecoded voiceover and delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
| [00:00.25–00:07.58] | hook | “Cash under the tree? Canada has no gift tax. But some gifts can still cost the giver.” | warm, a smile on 'cash under the tree', then the turn on 'cost the giver' |
| [00:07.88–00:14.33] | receive | “Got a gift? It's not income. You don't report it. But what the money earns later is taxed.” | reassuring, then the small pivot on 'what the money earns' |
| [00:14.61–00:25.64] | spouse | “First catch: give money to your spouse to invest, and the interest, dividends and capital gains are taxed to you, not them.” | clear; land 'taxed to you, not them' |
| [00:25.90–00:32.94] | tfsa | “The exception: money your spouse puts into their own TFSA. That isn't attributed back to you.” | relief |
| [00:33.20–00:40.48] | kids | “Same idea for kids under eighteen. Interest and dividends on money you give them are taxed to you.” | same idea, brisk |
| [00:40.78–00:54.67] | property | “Second catch: gifts that aren't cash. Give shares, a cottage or crypto to anyone but your spouse, and CRA treats it as sold at market value.” | the second turn; stress 'treated as sold' |
| [00:54.93–01:05.61] | example | “Bought shares for ten thousand dollars, now worth thirty? Give them to your son, and you report a twenty-thousand-dollar gain. Half of it is taxable.” | numbers unhurried; stress 'you report' and 'half of it' |
| [01:05.91–01:15.12] | boss | “And the gift from your boss: non-cash gifts up to five hundred dollars a year are tax-free. Cash is always taxable.” | lighter, practical; firm on 'cash is always taxable' |
| [01:15.42–01:22.73] | payoff | “So the gift itself is free. What it earns, and what grew before you gave it, may not be.” | warm summary, a beat before 'may not be' |
| [01:22.98–01:29.12] | cta | “Next: your TFSA room resets on January first. Follow so you don't miss it.” | warm bridge: name the next topic, then the follow |

## D. Audio cue points
| Time | Visual event |
|---|---|
| 00:00.25 | family by the tree, gifts everywhere; caption 'Cash under the tree?' |
| 00:09.49 | 'not income' hero (green) |
| 00:09.82 | pin 'a gift: not income' on the red-ribbon envelope |
| 00:23.65 | 'taxed to you' hero |
| 00:29.77 | 'not attributed' hero (green) |
| 00:38.88 | 'taxed to you' hero |
| 00:40.78 | scene cut 1: Christmas Eve → dinner, the cottage gift |
| 00:48.42 | pin 'treated as sold: at market value' under the cottage |
| 01:00.80 | '$20,000 gain' hero; pin 'you report' |
| 01:05.91 | scene cut 2: → Christmas morning |
| 01:10.97 | '$500 tax-free' hero; pin on the open gift box |
| 01:15.42 | flag + 'The gift is tax-free. What it earns may not be.' |
| 01:22.98 | pill 'Next: TFSA room resets Jan 1 →' + 'Follow so you don't miss it' |

## E. Duration check
- 196 words, 86.4 s of speech, 136 wpm.
- Narration ends at 01:29.12; VO file 89.37 s; video 89.88 s (2157 frames at 24 fps); hold on the final frame 0.75 s. ✅ Fits.
