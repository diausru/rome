# Production Bible: E2 "OAS clawback: the line, the 15%, and 3 legal levers" (Short)

Topic E2 in `channel/TOPICS.md`; next after E3 in `channel/PUBLISHING-PLAN.md` §4.
Governing documents: `short/MASTER-SYSTEM.md`, `/CLAUDE.md` (series format, flag, REAL TAX INFORMATION MODE, VOICEOVER ENGINE, next-phase rules, Grady voice, PUBLISHING ENGINE).
Voiceover package: `e2/VOICEOVER.md`. Master timeline: `showreel/src/e2-timeline.json` (`tools/vo_hf.py`). Publish package: `e2/PUBLISH.md`.

## 1. Research record (REAL TAX INFORMATION MODE)
canada.ca is egress-blocked here (WebFetch and curl refused). Each claim was read from canada.ca search-result text of the named page (searches restricted to canada.ca, 2026-10-06).

### General information (rules)
| # | Claim used in the video | Source (canada.ca) |
|---|---|---|
| R1 | OAS recovery tax ("clawback"): if net world income exceeds the threshold, you repay 15% of the amount above it | Service Canada, "Old Age Security pension recovery tax" (…/publicpensions/old-age-security/recovery-tax.html); "Repayment of Old Age Security pension" (…/old-age-security/repayment.html) |
| R2 | Threshold for 2026 income: $95,323; the recovery applies to OAS paid July 2027 – June 2028 | same pages (search text: "For the 2026 income year … $95,323 … July 2027 to June 2028") |
| R3 | For context (not on screen): 2025 income threshold $93,454 → July 2026 – June 2027; worked example on canada.ca: $100,000 − $93,454 = $6,546 × 15% = $981.90 | same pages |
| R4 | The recovery is withheld from the monthly OAS payments | Service Canada recovery-tax page ("reduced as a monthly recovery tax") |
| R5 | Pension income splitting: up to 50% of eligible pension income to a spouse or common-law partner; if the transferring spouse is 65+, eligible pension income includes RRIF and annuity payments; joint election on Form T1032; both resident in Canada on Dec 31 and not living apart because of a breakdown for 90+ days including Dec 31 | CRA, "Pension income splitting" (…/revenue-agency/services/tax/individuals/topics/pension-income-splitting.html) |
| R6 | TFSA withdrawals and income earned in a TFSA don't affect federal income-tested benefits and credits such as OAS and GIS | CRA, "What is a TFSA" (…/tax-free-savings-account/what.html); RC4466 |
| R7 | Delaying OAS after 65: +0.6% per month, up to +36% at 70; you cannot receive GIS while you delay OAS | Service Canada, "Old Age Security – When to start your pension" (…/old-age-security/when-start.html) |

### Example (NOT a CRA rule; labelled EXAMPLE on screen)
A single senior with 2026 net income $110,000: $110,000 − $95,323 = $14,677 over; × 15% = $2,201.55, recovered from OAS paid July 2027 – June 2028 (R1–R4). VO rounds to "about fourteen thousand seven hundred" and "twenty-two hundred dollars"; the screen shows exact figures.

### Exceptions and dependencies
- The full OAS is recovered at a maximum income that differs for 65–74 and 75+. 2026 values seen: $154,753 / $160,696 (canada.ca search text) versus $154,708 / $160,647 (secondary sources). They conflict, so they are `[VERIFY]` and are NOT shown.
- Pension splitting moves income to the spouse: whether it reduces the household's total tax or recovery depends on both incomes. The on-screen footnote says it "moves income to your spouse".
- Delaying OAS only helps in this context if income is high in the years delayed; it also removes GIS eligibility (on screen). Whether delay pays off depends on life expectancy and income.
- Thresholds are indexed every year (footer: "line = 2026 income, indexed yearly").
- Non-residents file an OAS Return of Income: out of scope.

### Situations requiring professional advice
Choosing between levers, couples' income planning, RRIF withdrawal timing: "The right lever depends on your whole picture."

### Claims deliberately NOT made
- "Avoid the clawback" or any guarantee; the framing is "keep more".
- Upper (full-recovery) thresholds (see above).
- Any statement about the OAS amount after recovery for the example (it depends on residency years and the quarter's rates).

## 2. Project
| Field | Value |
|---|---|
| OBJECTIVE | Replace the fear ("they take my OAS") with the mechanism (15¢ per $1 above a line) and show 3 verified levers |
| AUDIENCE | Retirees aged 64–75 with RRIF / pension income near $95K; their adult children |
| STORY | The line → open loop (legal ways) → 15¢ rule → example bar ($110K vs the line, $2,201.55) → when it's taken → levers: splitting, TFSA, delay → payoff "Plan for the line, not the panic" → CTA |
| BACKGROUND (next-phase rule) | New plate `showreel/src/Kitchen.tsx`: retirees' kitchen on a winter morning; a window onto a snowy residential street (houses, bare trees, parked car); he reads a letter at the table beside a laptop, she stands with a mug; pendant lamp, sage cabinets, fridge. Lateral slider truck with micro-motion, defocused 8 px, cool-to-warm grade |
| TYPOGRAPHY | Pensions group: Fraunces headings + Mont data (as E3) |
| DATA BOARD | Phase A: income bar against the gold "$95,323" line, the excess turns red. Phase B: 3 lever rows, active row highlighted |
| FLAG | Code-drawn Canadian flag (1:2:1) in the header and payoff |
| MUSIC | `tools/music.py pension2` (76 BPM, F major), −24 LUFS, sidechain-ducked under the VO; overt mood only |
| VOICE | ElevenLabs Grady via Higgsfield |
| RENDER | 1080×1920, 24 fps, 1428 frames (59.50 s), H.264 CRF 16; audio e2/vo/mix.wav → AAC 192k 48 kHz |

## Revision log
- VO v1: 70.7 s, too long → 8 lines shortened and regenerated → 58.75 s (115 words).
- Plate v1: washed out, kitchen not readable → darker floor and sage cabinets, cabinets and fridge moved to the back wall, less window glare; standing figure moved into frame.
- Stills QC: empty lower half during the hook → the income bar now enters at 1.5 s.
