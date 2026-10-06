# Production Bible: "Canada Child Benefit and your income" (topic D2)

Order: `channel/PUBLISHING-PLAN.md` §4, week 5 (B4 and B5 were produced by the parallel handwritten-mode session). Approved look (Kit + Plate). Family group: Nunito 900 headings, `kids` music (light and curious).
Voiceover: `d2/VOICEOVER.md`. Timeline: `showreel/src/d2-timeline.json`. Composition: `showreel/src/D2v2.tsx`. Publish: `d2/PUBLISH.md`.

## 0. Demand research (vidIQ, one call before the script)
`vidiq_keyword_research` (research, CA) "canada child benefit": ≈4,855/mo (competition 20.2); "canada child benefits" ≈4,498/mo; "child benefits in canada" ≈3,387/mo (competition 9.4, best opportunity 67.9). Long-tail questions (<750/mo each): how much, eligibility, payment dates, increase, how to apply. 5 credits.
Conclusion: answer "how much" and "what changes it" in the first seconds; the hook ties the benefit to a raise (a common worry), and "Canada Child Benefit" stays spelled out in titles.

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (direct fetch blocked by the network proxy; facts from canada.ca search-result text), 2026-10-06.

| # | Claim used | Source · period |
|---|---|---|
| R1 | Maximum CCB: $8,157 a year per child under 6 ($679.75/month); $6,883 per child aged 6–17 | CRA "How much you can get" (canada.ca); Government of Canada news releases, July 2026 · July 2026 – June 2027 |
| R2 | Payments July 2026 – June 2027 are based on adjusted family net income (AFNI) for 2025 | CRA "How much you can get" · 2026–27 |
| R3 | AFNI up to $38,237: maximum; from $38,237 to $82,847 the benefit is reduced by 7% (1 child), 13.5% (2), 19% (3), 23% (4+) of AFNI above $38,237; above $82,847 a second phase applies | CRA "How much you can get" · 2026–27 |
| R4 | To keep receiving the CCB, you and your spouse or common-law partner must each file a return every year, even with no income; file by April 30 to avoid a disruption | CRA "Keep getting your payments" (canada.ca) |
| R5 | RRSP contributions are deducted in computing net income (line 23600), which is the base for AFNI | CRA (RRSP deduction line 20800 → net income line 23600) · general |

Cross-check: the 2026–27 maximums equal 2025–26 ($7,997 / $6,748) indexed by 2.0% → $8,157 / $6,883 ✓. Phase-1 width 82,847 − 38,237 = 44,610.

### Example (not a CRA rule) · `d2/example.py`
One child under 6, AFNI $70,000 (2025): 8,157 − 7% × (70,000 − 38,237) = **$5,933.59 a year ≈ $494.47 a month**.
AFNI $80,000: 8,157 − 7% × 41,763 = $5,233.59 → a $10,000 raise = **−$700 a year** (1 child; 13.5% → −$1,350 for 2 children, while both incomes stay in phase 1).
Timing: a raise in 2026 enters the 2026 return (filed in 2027) and changes the payments from July 2027.

### Dependencies, exceptions, notes
- AFNI = combined net income of both spouses (adjusted for UCCB/RDSP items): the example states "family net income".
- Phase 2 (AFNI over $82,847), shared custody (50%), Child Disability Benefit, provincial/territorial child benefits: not covered.
- The RRSP line is a general mechanism, not advice to contribute; the effect depends on the family's bracket and phase.

### Claims deliberately NOT made
- The phase-2 base amounts (only seen on secondary sites; canada.ca text not confirmed in this pass).
- Payment dates.

## 2. Project
| Field | Value |
|---|---|
| PLATE | `public/plates/d2-4k.jpg` (Higgsfield gpt_image_2_5, 2 variants 0.5 + 4K upscale 2 credits; checked: no text, numbers or letters; blocks are plain): a prairie family kitchen on an autumn morning; a mother lifts a laughing toddler by the window, fields outside; coin jar, toddler sneakers, mug, unmarked envelope and toy blocks on the table |
| PINS | sneakers "up to $8,157" · coin jar "≈ $494 / month" · envelope "− $700 a year" · coin jar "RRSP lowers net income" |
| STRIP | max $8,157 · shrinks above $38,237 · 1 child 7% · ✓ both spouses file |
| LIVE | steam over the mug; camera between the family and the table props |
| VOICE | Grady; 133 words; 61.70 s (inside the tolerance); CTA line reused from G3 (same text and voice, no new credits) |
| RENDER | 1080×1920, 24 fps, 1493 frames (62.2 s) |

## 3. QC log
- Stills v1: first 7.6 s keep the top clear (no card) so the family is seen; jar pins collided with the strip at example/lever → camera keys lowered (v 0.5 / 0.48), checked again: clear.
- Final: 1491 frames (mux trims the hold to the audio length), 62.20 s, h264 1080×1920 + AAC 48 kHz, decode OK, −14.4 LUFS; contact sheet checked; sent to the user; vidIQ title score 83; kit card #13.
