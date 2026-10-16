# C2 — Salary or dividends? What the $5,800 buys (production bible)

Card series, PUBLISHING-PLAN §4 row 15 (C2), bridged from C1. Investigation format. `showreel/src/C2V3.tsx`, motion engine v1.

## Coordination check (2026-10-16)
Handwritten series: no salary-vs-dividend video made or promised (B-series is unincorporated self-employment). C1 compared sole prop vs corporation; C2 is the owner-pay choice inside the corporation (salary vs dividends, RRSP room, mix, EI), a different question.

## Facts (REAL TAX INFORMATION MODE)
| Claim | Source | Type |
|---|---|---|
| Dividend gross-up 15%, federal DTC 9/13, Manitoba DTC 0.7835% | ITA 82(1)(b)(i), 121; MB ITA s.4.7 (see c1) | rule |
| Salary is deductible to the corporation; employer pays CPP matching the employee | CPP 2026 rates; general | rule |
| CPP built only on salary/self-employed earnings, not dividends | CPP Act ss.12–13 | rule |
| RRSP room = lesser of the dollar limit and 18% of the previous year's earned income; dividends excluded | ITA 146(1) (current to 2026-09-30) | rule |
| Employment of a person controlling >40% of voting shares is not insurable for EI | EI Act s.5(2)(b) | rule (exception) |

Example (not a CRA rule), `c2/calc.py`: Manitoba 2026, single owner, $100,000 before owner pay. Salary $95,353.55 + employer CPP $4,646.45; employee CPP $4,646.45; income tax $21,519.35; keep $69,187.75; CPP total $9,292.90; RRSP room $17,163.64 (usable 2027). Dividends: corporate tax $9,000, dividends $91,000, tax $16,014.40, keep $74,985.60. Gap $5,797.85.
Dependencies: other income, the owner's share percentage, province, small business deduction eligibility, RRSP dollar limit for 2027, retirement plans. Not modelled: EI (excluded for >40% owners), payroll costs, Manitoba payroll levy (not applicable below its threshold, not stated).
Professional advice: choosing the mix.

## Format vs C1, H1, A9 (Variety rule)
| | A9 | H1 | C1 | **C2** |
|---|---|---|---|---|
| Hook | date flip | $0 meter | +$6,008 count-up | **two envelopes from opposite sides + "+$5,798?" tag** |
| Main visual | red-pen page | payout columns | split $100K bars | **two-column ledger filling row by row + two "what it bought" chips** |
| Reveal | fork | refundable switch | vault | **salary ↔ dividends mix slider** |
| End | turnaround bars | checklist | note card | **EI ">40%" card + next pill** |
| Music | kids (C,104) | pension (D,72) | work (G,92) | **pension2 (F,76)** |
| Scenes | porch/den/kitchen | three people | designer x3 | **cabinet-maker: workshop morning → workshop desk → home in the evening with partner** |

## Research
vidIQ 'salary vs dividends canada' 3,778/mo (competition 18.6), 'salary vs dividend' 4,201; titles 83 (primary) / 60; credits 904 → 879 = 25 (at the cap). NexLev Shorts: top 9.8K / 7.8K / 3.9K views; none combines RRSP room, the mix and the EI rule with verified numbers.

## Delivery (2026-10-16)
- VO 7 Grady lines; 73.44 s at tempo 1.05 → 1.11 locally (no regeneration): 69.59 s.
- Plates gpt_image_2_5 ×3 (same man; no text) + 4K → `showreel/public/plates/c2-s{1,2,3}-4k.jpg`.
- Stills fix: chip labels shortened, stamp moved above the table. 25 s test `out/c2/test25-av.mp4`.
- Final `showreel/out/c2/c2-final.mp4` (70.42 s, −14.0 LUFS, −2.7 dBTP); QC 0 failed; Whisper confirms all spoken numbers.
- Cover 43.45 s. Nothing scheduled. Next: D4 spousal RRSPs (🔴 fact pass).
