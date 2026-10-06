# Production Bible: "RESP: the 20% grant + the Canada Learning Bond" (topic D3)

Order: `channel/PUBLISHING-PLAN.md` §4, week 2 (after CPP). Approved look (Kit + Plate). Family/kids group: Nunito headings, "kids" music mood.
Voiceover package: `d3/VOICEOVER.md`. Master timeline: `showreel/src/d3-timeline.json`. Publish package: `d3/PUBLISH.md`.

## 1. Research record (REAL TAX INFORMATION MODE)
canada.ca is egress-blocked here; claims read from canada.ca search-result text (restricted to canada.ca, 2026-10-06).

### General information (rules)
| # | Claim used | Source |
|---|---|---|
| R1 | CESG: 20% of the first $2,500 contributed each year = up to $500 a year per beneficiary | ESDC, "How much money can be added to RESPs" (…/education-savings/estimating-amounts.html); CRA, CESG page (…/canada-education-savings-programs-cesp/canada-education-savings-grant-cesg.html) |
| R2 | Lifetime CESG maximum $7,200 per beneficiary; available until the end of the calendar year the beneficiary turns 17 | same |
| R3 | Unused grant room carries forward; up to $1,000 of CESG in one year (a $5,000 contribution) if room is available | ESDC estimating-amounts page; CESP InfoCapsule 12 "Grant room and carry forward" |
| R4 | Lifetime contribution limit $50,000 per beneficiary (context; not on screen) | same |
| R5 | Additional CESG for middle/low-income families: up to another $100 a year (10% or 20% of the first $500) (context; not on screen) | ESDC estimating-amounts page |
| R6 | Canada Learning Bond: lower-income families, children born 2004 or later; $500 first year + $100 for each further eligible year up to age 15; max $2,000; no personal contribution required; resident, SIN, named beneficiary of an RESP | CRA "Canada Learning Bond"; ESDC CLB brochure |
| R7 | From April 2028, automatic RESP opening for the CLB for eligible children born 2024 or later (context; not on screen) | canada.ca "Canada Learning Bond – Automatic enrolment" |
| R8 | If the beneficiary doesn't pursue post-secondary education, the CESG (basic and additional), the CLB and ESDC-administered provincial incentives must be repaid; earnings may come out as an AIP taxed at the subscriber's rate + 20% (12% in Québec) | CRA CESG page; ESDC "Managing the RESP"; RC4092 |

### Exceptions and conditions
- Ages 16 and 17: the CESG has extra contribution conditions (R3 source). Not detailed; the on-screen rule says "until the year they turn 17".
- Unused room is usable only within the $7,200 lifetime maximum.
- The CLB depends on family income (thresholds vary with the number of children). On screen: "lower-income families".

### Example (NOT a rule; labelled EXAMPLE)
$2,500 a year from the birth year: $500 of CESG a year → $7,000 after 14 years, $200 in year 15 → the $7,200 maximum is reached in year 15 (the child is about 14, within the "until 17" window).

### Dependencies and advice
Whether the grant must be repaid depends on the child's future education; transfers to a sibling or RRSP rollover options exist but are not covered: "general info, not advice".

### Claims deliberately NOT made
- "Free money" without the catch (R8 is shown on screen).
- Any investment-return figure.

## 2. Project
| Field | Value |
|---|---|
| PLATE | `public/plates/d3-4k.jpg` (Higgsfield gpt_image_2_5, 2 variants 0.5 credits + 4K upscale 2 credits; checked: no text, signs or numbers): a pink piggy bank, a tall and a short coin stack, a graduation cap and a notebook with pencils on a table; behind, a red-brick school in autumn, a parent walking a child with a backpack to the door |
| CAMERA | stacks → parent and child → stacks → all props → piggy bank (catch-up) → parent and child (bond) → graduation cap (the catch) → wide |
| SIGNATURE | the tall stack is "YOU $2,500", the short one "GRANT +$500", with labels pinned onto the real objects; the example counts the grant year by year to $7,200 (year 15) |
| TYPE | Nunito 900 headings (family group, OFL, Google Fonts), Mont for data |
| MUSIC | `tools/music.py kids` (104 BPM, C major, high voicings + eighth-note plucks: light and curious), −24 LUFS, ducked; mix −14.0 LUFS |
| VOICE | Grady; 136 words; 57.24 s |
| RENDER | 1080×1920, 24 fps, 1392 frames (58.0 s) |

## Revision log
- VO v1 48.9 s; an example beat was added (one new line) → 57.24 s.
- Stills QC: the hook card was empty for 4 s → "$2,500 /year" first, then "+$500"; the catch-up card was empty → "Unused grant room carries forward." first, then $1,000.
