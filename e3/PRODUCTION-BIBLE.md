# Production Bible: E3 "RRSP at 71: the December 31 deadline" (Short)

Topic E3 in `channel/TOPICS.md`; week 1 of `channel/PUBLISHING-PLAN.md` §4.
Governing documents: `short/MASTER-SYSTEM.md`, `/CLAUDE.md` (series format, flag, REAL TAX INFORMATION MODE, VOICEOVER ENGINE, next-phase rules, Grady voice, PUBLISHING ENGINE).
This is the first Short under the next-phase rules: topic-matched background, music bed, per-group typography, ElevenLabs voice.
Voiceover package: `e3/VOICEOVER.md`. Master timeline: `showreel/src/e3-timeline.json`, built by `tools/vo_hf.py`. Publish package: `e3/PUBLISH.md`.

## 1. Research record (REAL TAX INFORMATION MODE)
canada.ca is egress-blocked in this environment (WebFetch and curl both refused). Every claim below was read from canada.ca search-result text of the named page. The URLs are recorded for the reviewer. Base: canada.ca/en/revenue-agency/services/…

### General information (rules)
| # | Claim used in the video | Source (CRA, canada.ca) |
|---|---|---|
| R1 | By the end of the year you turn 71 you must close the RRSP: withdraw it, transfer it to a RRIF, or use it to buy an annuity (or a combination). Deadline: December 31 of that year | …/rrsps-related-plans/rrsp-options-when-you-turn-71.html and …/options-your-rrsps.html; …/important-dates-rrsp-rrif-rdsp.html |
| R2 | Withdrawal: the issuer withholds tax, and the amount is income for the year it is withdrawn | …/options-your-rrsps.html |
| R3 | Withholding on RRSP lump-sum withdrawals: 10% up to $5,000, 20% over $5,000 to $15,000, 30% over $15,000 (Québec: 5% / 10% / 15%, plus Québec's own withholding) | …/making-withdrawals/tax-rates-on-withdrawals.html |
| R4 | No tax withheld on amounts transferred directly to a RRIF; you may pay tax when you receive RRIF payments | …/options-your-rrsps.html |
| R5 | No tax withheld on amounts used to buy an annuity; annuity payments are income when received | …/options-your-rrsps.html; …/receiving-income-rrsp.html |
| R6 | RRIF minimum: zero in the year the RRIF is set up; from the next year, prescribed factor × FMV at Jan 1. Age-72 factor 0.0540 (5.40%) | …/t4rsp-t4rif-information-returns/payments/minimum-amount-a-rrif.html; …/receiving-income-a-rrif.html |
| R7 | No withholding on the RRIF minimum; amounts above it use the lump-sum rates (R3). RRIF payments are income | same page as R6 |
| R8 | If you don't collapse the RRSP by the end of the year you turn 71 and it no longer meets the rules, it is no longer an RRSP; you are considered to have received the FMV of all its property (T4RSP box 26, line 12900) | T4040 "RRSPs and other registered plans for retirement" (…/publications/t4040/rrsps-other-registered-plans-retirement.html) |

### Example (NOT a CRA rule; labelled EXAMPLE on screen)
$300,000 RRSP. Cash-out withholding: 30% × $300,000 = $90,000 (outside Québec; withholding is not the final tax, which depends on total income and province). RRIF at age 72, value $300,000 on Jan 1: 0.0540 × $300,000 = $16,200.

### Exceptions and dependencies
- Québec withholding differs (R3); the footnote says "outside Québec".
- Withholding ≠ final tax: the final tax depends on total income, credits and province. Stated in the footnote "It isn't the final tax."
- The RRIF minimum can be based on a younger spouse's or common-law partner's age (R6). Not shown, so the example only says "at 72".
- Real values change with markets; $300,000 is held constant for simplicity.

### Situations requiring professional advice (said in the VO)
Choosing between the options, mixing them, annuity terms, and estate and spouse planning: "Talk to your issuer and a pro."

### Claims deliberately NOT made
- Any statement that one option is "best".
- The pension income amount and pension splitting for RRIF income at 65+ (verified: line 31400 and pension-income-splitting pages). Left out for time; a candidate for a follow-up.
- Annuity rates or returns.

## 2. Project
| Field | Value |
|---|---|
| VIDEO OBJECTIVE | Make the 71 deadline concrete: 3 options, how each is taxed, and the danger of doing nothing |
| AUDIENCE | Canadians aged 60–71 and their adult children |
| STORY | Deadline → open loop (one tax return) → 1 cash ($90K withheld) → 2 annuity → 3 RRIF → RRIF minimum 5.40% = $16,200 → the real danger: doing nothing → payoff: choose before Dec 31 → CTA |
| BACKGROUND (next-phase rule) | Retirement living room (`showreel/src/Home.tsx`): window on a lake with an autumn tree line, older couple on the sofa (breathing sway), coffee table with papers and a mug, warm floor lamp, bookshelf, plant. Slow push-in with drift, defocused 8 px, ACES grade |
| TYPOGRAPHY (pensions group) | Fraunces 600/800 (serif) for caption line 1 and headings; Mont for line 2 and data. Same layout as the series |
| CARDS | Deadline card (Dec 31), cash counter → −$90,000, annuity, RRIF, 5.40% → $16,200, the "stops being an RRSP" catch |
| BOARD | 3 option rows plus a red "Do nothing" row |
| FLAG | Code-drawn Canadian flag in 1:2:1 proportions (`Flag` from RaiseShort), in the header and payoff |
| MUSIC | `tools/music.py pension`: 72 BPM, D major, electric piano + pad + bass, −24 LUFS, sidechain-ducked under the VO. Overt mood only, no subliminal content |
| VOICE | ElevenLabs "Grady" through Higgsfield (`text2speech_v2`), chosen by the user; kept for the series |
| RENDER | 1080×1920, 24 fps, 1428 frames (59.50 s), H.264 CRF 16; audio = e3/vo/mix.wav, AAC 192k 48 kHz |

## Revision log
- VO v1 (Grady): 64.3 s, too long → 4 lines trimmed and regenerated → 62.7 s → the "three options" beat removed, atempo 1.03 → 59.21 s. The timeline was regenerated and the visuals re-keyed automatically.
- Plate v1: camera too low and close → raised to y 1.5 with a gentler push.
