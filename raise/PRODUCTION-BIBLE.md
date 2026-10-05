# Production Bible: "Will a raise push you into a higher bracket?" (Short #2)

Topic A3 in `channel/TOPICS.md` (the user did not name a topic; A3 was chosen as the safest next one, see "Decisions").
Governing documents: `short/MASTER-SYSTEM.md`, `/CLAUDE.md` (series format, Canadian flag, REAL TAX INFORMATION MODE).
Visual language: identical to Short #1 (`salary/PRODUCTION-BIBLE.md`): same office plate, glass cards, typed captions, gold numbers, data board. New: a code-drawn Canadian flag in the header.

## 1. Research record (REAL TAX INFORMATION MODE)

### General information (rule)
| Claim | Status | Source |
|---|---|---|
| Canada uses marginal rates: each rate applies only to the income inside its bracket, not to all income | ✅ | CRA, "Current year tax rates and income brackets (2026)", canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html (via search snippet; canada.ca is egress-blocked here) |
| 2026 federal brackets: 14% to $58,523 · 20.5% to $117,045 · 26% to $181,440 · 29% to $258,482 · 33% above | ✅ | same page; CRA T4127, 122nd ed. (Jan 1, 2026) |
| Brackets apply to **taxable income**, not to gross salary (for example, enhanced CPP contributions are deducted first) | ✅ | T4127 method; reproduced in `salary/calc.py` |
| Provincial tax is charged in addition, at the province's own brackets | ✅ | CRA, same page |
| Manitoba 2026: 10.8% to $47,000 · 12.75% to $100,000 · 17.4% above; BPA $15,780 | ✅ | `salary/PRODUCTION-BIBLE.md` §2 |
| CPP 5.95% (YMPE $74,600); EI 1.63% (MIE $68,900) | ✅ | same |

### Example (an illustration, NOT a CRA rule; labelled "Example" on screen)
Single employee in Manitoba, 2026, salary $58,000 → $60,000 (+$2,000), no other income or deductions. Calculator: `raise/example.py`, which reuses `salary/calc.py`.

| | $58,000 | $60,000 | Change |
|---|---|---|---|
| Taxable income | $57,455 | $59,435 | +$1,980 |
| Federal tax | $5,020.24 | $5,338.30 | +$318.06 |
| Manitoba tax | $4,311.31 | $4,549.55 | +$238.24 |
| CPP | $3,242.75 | $3,361.75 | +$119.00 |
| EI | $945.40 | $978.00 | +$32.60 |
| Take-home | $44,480.30 | $45,772.41 | **+$1,292.11** |

Hand check: Manitoba 1,980 × 12.75% − (Δ CPP base 99.0 + Δ EI 32.6) × 10.8% = 238.2 ✓. Federal: 1,068 × 14% + 912 × 20.5% − 131.6 × 14% = 318.1 ✓.
Bracket illustration on screen uses **$60,000 of taxable income** (a different, simpler example, also labelled): $58,523 at 14% plus $1,477 at 20.5%.

### Exceptions and dependencies
| Item | Status | Source |
|---|---|---|
| Income-tested benefits shrink as income rises. The Canada Child Benefit (July 2026 – June 2027) starts to be reduced when adjusted family net income exceeds $38,237 (1 child: 7% of AFNI between $38,237 and $82,847) | ✅ | CRA, "How much you can get — CCB", canada.ca (search snippet) |
| The GST/HST credit was renamed the Canada Groceries and Essentials Benefit in July 2026 | ✅ (noted; **not used on screen** to avoid confusion) | CRA, canada.ca CGEB page |
| Dependency: whether a raise reduces benefits depends on family net income, number of children, the benefits received and the base-year timing. This cannot be established from the topic, so the video says it depends and points to professional advice | — | — |

### Situations requiring professional advice (stated on screen)
Families receiving income-tested benefits; anyone near a benefit threshold.

### Claims deliberately NOT made
- "You can never lose money from a raise." Not true in every benefit situation, so it is not said.
- Any number for OAS, GIS or the CGEB thresholds.

## 2. Project

| Field | Value |
|---|---|
| VIDEO OBJECTIVE | Bust the myth "a higher bracket taxes my whole salary"; show the real arithmetic; flag the benefits exception honestly |
| TARGET AUDIENCE | Employees aged 22–50 negotiating raises; the bracket myth is common |
| STORY | Raise → myth voiced → MYTH tag → the bracket ladder fills: only the top slice is orange → real example: +$2,000 → keep $1,292 → the exception: benefits like CCB shrink → payoff: a higher bracket never taxes your whole income |
| Location, light, camera, palette, motion | as in Short #1. The pan runs the other way (right → left) for variety within the series |
| Persistent data board | 2026 federal bracket ladder (5 rows); the fill shows income reaching into each row |
| Flag | Canadian flag, 1:2:1 proportions, red #D52B1E, code-drawn, with a soft cloth wave. Placed in the header; it reappears on the payoff |
| Render | 1080×1920, 24 fps, 1296 frames (54 s), H.264 CRF 16, silent |

## 3. Shot architecture (54 s)
| ID | Time | Purpose | Foreground |
|---|---|---|---|
| S1 | 0–2.5 | HOOK | "+$2,000 RAISE" slams in; caption types "Got a raise?" / "“Now I'm in a higher bracket…”" |
| S2 | 2.5–7 | QUESTION | Red tag MYTH: "Your whole salary gets taxed at the higher rate." |
| S3 | 7–22 | DISCOVERY | Ladder fills to $60,000 of taxable income: 14% on $58,523; only $1,477 at 20.5%. Caption: "Only the slice above the line pays the higher rate." |
| S4 | 22–36 | ESCALATION | Real example card: +$2,000 → −$318 federal, −$238 Manitoba, −$119 CPP, −$33 EI → keep $1,292 |
| S5 | 36–46 | EXCEPTION | "But: some benefits shrink as income rises." CCB reduction above $38,237 (2026–27). "On benefits? Get advice." |
| S6 | 46–54 | PAYOFF | "A higher bracket never taxes your whole income." + flag + follow + sources |

## Decisions
1. Topic A3 was chosen because the user's message gave no topic. A3 is the 🟢 topic with the lowest error risk and reuses the verified 2026 rates.
2. The Manitoba example matches the channel's home province.

## Revision log
- v1: rendered and verified (1080×1920, 24 fps, 1296 frames, 54.0 s, clean decode). QC fixes before the final render: myth-card gap, ladder overlap with the hero, ladder over the payoff. Silent: made before the VOICEOVER ENGINE rule.
