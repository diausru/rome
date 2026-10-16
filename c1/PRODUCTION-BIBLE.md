# C1 — Sole proprietor vs corporation: the real trade-off (production bible)

Card series, PUBLISHING-PLAN §4 row 14 (C1), bridged from H1. Investigation format. Composition `C1V3` (`showreel/src/C1V3.tsx`), motion engine v1.

## Coordination check (2026-10-16)
- Handwritten series (owner of the self-employed B-series): incorporation appears only in passing in b4p / inst / rrsp-se / b3 packages; no sole-prop-vs-corporation comparison made or promised.
- Card series: C3 covered the 9% small business rate and "dividends are taxed personally"; C1 is the full pay-out comparison (integration, CPP, RRSP room, deferral), not repeated elsewhere.
- TOPICS.md note "avoid 'incorporate to save tax'": the video shows the corporation pays MORE income tax when everything is paid out.

## Facts (REAL TAX INFORMATION MODE)
| Claim | Source | Type |
|---|---|---|
| Non-eligible dividends grossed up 15% | ITA 82(1)(b)(i) (current to 2026-09-30) | rule |
| Federal dividend tax credit 9/13 of the gross-up | ITA 121(a)(ii) | rule |
| Manitoba dividend tax credit 0.7835% of the grossed-up non-eligible dividend | Manitoba Income Tax Act s.4.7(1)(b)(i.2) (current from 2026-07-01) | rule |
| Small business income of a CCPC: 9% federal + 0% Manitoba | CRA corporation tax rates; Manitoba (sourced in c3 R1) | rule (eligibility: CCPC, active business, business limit) |
| Self-employed CPP 11.9% to YMPE $74,600 (exemption $3,500) + 8% CPP2 to $85,000 | CPP 2026 rates | rule |
| CPP contributions only on salary/wages and self-employed earnings (dividends are neither) | CPP Act ss.12–13 | rule |
| Dividends are not RRSP "earned income" | ITA 146(1) | rule |
| A corporation files its own return | general (T2) | general information |

Example (not a CRA rule), `c1/calc.py`: single, Manitoba, $100,000 profit, 2026. Sole prop: tax $21,729.49, CPP $9,292.90, keep $68,977.61. Corporation, all paid out: corporate tax $9,000, dividends $91,000, personal tax $16,014.40, total $25,014.40, keep $74,985.60. Gap $6,007.99; income tax +$3,284.91. Leave $40,000 inside: taxed 9% so far.
Cross-check: the credits imply a 46.67% Manitoba top rate on non-eligible dividends, as in KPMG / EY 2026 tables.
Dependencies: other income, province, whether the company qualifies for the small business deduction, the owner's need for cash, CPP/RRSP plans, incorporation and accounting costs (not included). Professional advice: the decision itself, salary/dividend mix, passive income inside the company.

## Format: what is new vs H1, A9, A2 (Variety rule)
| | A2 | A9 | H1 | **C1 (this)** |
|---|---|---|---|---|
| Hook | split before/after | date-flip ticker | $0 meter + payout slip | **big-number count-up to +$6,008, then "LOWER TAX?" struck** |
| Main visual | balance scale | red-pen return page | payout columns | **one $100,000 bar per option split into tax / CPP / take-home + comparison tiles** |
| Reveal | receipt | fork | refundable switch | **a company vault filling to $40,000, "taxed 9% so far"** |
| End | two check tiles | turnaround bars | checklist | **a note card + next pill** |
| Music | pension2 (F, 76) | kids (C, 104) | pension (D, 72) | **work (G, 92)** |
| Scenes | kitchen → car → table | porch → den → kitchen | three different people | **one designer: home studio morning → accountant's office → evening at the desk** |

## Research
vidIQ: 'should i incorporate canada' <750; 'incorporation in canada' 5,317; 'start a business canada' 5,399; 'corporate tax canada' 3,695; titles 79 (primary) / 72. Balance 914 → 904 = 10 credits. NexLev Shorts search: top results list pros/cons (40K, 16K, 11K views); none runs the same profit both ways with CPP.

## Assets / delivery (2026-10-16)
- Plates: Higgsfield gpt_image_2_5 ×3 (same woman; checked: no text), 4K upscales → `showreel/public/plates/c1-s{1,2,3}-4k.jpg`.
- VO: 7 Grady lines (151 words); first assembly 71.95 s (over 1:10) → tempo 1.05 → 1.09 locally, no regeneration: 69.41 s.
- Final `showreel/out/c1/c1-final.mp4` (1080×1920, 24 fps, 70.25 s, −14.0 LUFS, −2.6 dBTP); share copy `c1-share.mp4`.
- Stills fixes: hook counter starts at frame 0 (was "+$0"); segment labels smaller (the $16,014 label was cut); stamp moved off the tiles. 25 s test `out/c1/test25-av.mp4`.
- QC: `tools/reel_check.py` 0 failed (fact check now accepts "hundred thousand dollars"); Whisper confirms $100,000, ~6,000, 21,700, 9,300, 69,000, 9%, 25,000, 40,000.
- Cover 34.59 s. Nothing scheduled. Next: C2 salary vs dividends (🔴 fact pass).
