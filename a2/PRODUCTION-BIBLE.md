# A2 — Why your refund got smaller (production bible)

Card series, PUBLISHING-PLAN §4 row 13 (A2), folded into list-2 #1 "Refund or owe CRA?" (TOPICS-2), bridged from A8. Investigation format. Composition `A2V3` (`showreel/src/A2V3.tsx`), motion engine v1.

## Coordination check (2026-10-13)

Handwritten series: B9/B10 calculate the tax on a $10K side hustle on top of $100K (bracket math, CPP2) and B7/INST cover the self-employed calendar and instalments. A2 is about employees and payroll withholding (TD1, two employers, RRSP refund), not side-business tax, so the angle doesn't overlap. Long-form LF-01…LF-05 don't cover withholding. G3 (first pay stub) explained deductions on one stub; A2 explains the year-end refund/owing result.

## Facts (REAL TAX INFORMATION MODE)

| Claim | Source | Type |
|---|---|---|
| Refund (line 48400) = total credits (line 48200, incl. line 43700 income tax deducted from all slips, T4 box 22) − total payable (line 43500); otherwise balance owing (line 48500) | CRA general income tax guide / CVITP material (canada.ca, via search results 2026-10-13) | rule (mechanics) |
| With more than one employer or payer at the same time, personal credits already claimed on another TD1 can't be claimed again; if total income will exceed them, tick the box and enter 0 on line 13; the TD1 also lets you ask for additional tax to be deducted | CRA "Get the completed TD1 forms" (canada.ca) and Form TD1 2026 (via search results) | rule |
| 2026 federal: 14% to $58,523, 20.5% to $117,045; BPA $16,452 | CRA indexation (news reports Dec 2025), Form TD1 2026; CRA T4127 2026 in salary/calc.py | rule |
| 2026 Manitoba: 10.8% to $47,000, 12.75% to $100,000; BPA $15,780 | Manitoba (frozen brackets, verified for H4), salary/calc.py | rule |
| RRSP contributions are deductible within the deduction limit | ITA 146(5) | rule (limit depends on the person) |

Example (not a CRA rule): Manitoba, employment income only, $70,000 salary. Year 1: $6,000 RRSP deduction × 33.25% (all inside the 20.5% + 12.75% bands: taxable $69,335 → $63,335) = $1,995 refund, assuming payroll withheld exactly the tax on $70,000 ($13,021). Year 2: same job, no RRSP, withholding assumed = tax → $0. Year 3: two jobs at $35,000; under-withholding estimated as tax on $70,000 ($13,021) − 2 × tax on $35,000 ($7,712) = $5,309; real payroll formulas (T4127) differ slightly. Dependencies identified: RRSP deduction limit, other income and credits, the TD1 claims actually made, mid-year job changes, CPP/EI overpayments (refunded separately). Professional-advice territory: several employers plus self-employment, instalment requirements, large balances.

## Format: what is new vs A8, A5, A1 (Variety rule)

| | A1 | A5 | A8 | **A2 (this)** |
|---|---|---|---|---|
| Hook | count-up + case folders | document close-up under a lens | myth stamped COSTS EXTRA | **split before/after (BEFORE: REFUND ≈ $2,000 / NOW: YOU OWE ≈ $5,300) + gold "?"** |
| Main visual | paper case files | suspect line-up + evidence | scoreboard + month strip + chips | **a balance scale WITHHELD vs TAX that tips per year + a three-year pill strip** |
| Reveal | split + stamps | timeline scrub | split + penalty gauge | **a paper receipt (TAX vs WITHHELD columns highlighted) with NOT A BONUS stamp** |
| End | checklist | vertical path | two tickets | **two side-by-side check tiles (T4 box 22 vs notice; second TD1)** |
| Entrances | — | glass / slideR / wipe | slideL / glass / wipe | **glass / slideR / wipe; exits fade / vapor / collapse; receipt rises from below** |
| Music | kids (C, 104) | pension (D, 72) | work (G, 92) | **pension2 (F, 76)** |
| Scenes | classroom… | kitchen → office → morning | hallway → night table → balcony | **a man at a kitchen counter, spring morning → in his car at dusk (second job, delivery bag) → at his table comparing two blank slips (same man; reference = scene 1)** |

## Assets

- Plates: Higgsfield `gpt_image_2_5` (prompts: no text/numbers/logos; checked: none visible), 4K upscale → `showreel/public/plates/a2-s{1,2,3}-4k.jpg`; base images in `a2/plates/`.
- VO: 7 Grady lines + 3 regenerated = 10 generations. Higgsfield was topped up by the user on 2026-10-13 (balance 0.01 → 1,000.01) before this video.
- Cuts: scene 2 at year 3 (two jobs), scene 3 at the twist.

## Delivery (2026-10-13)

- Final: `showreel/out/a2/a2-final.mp4` (1080×1920, 24 fps, 68.38 s, −13.9 LUFS, −3.0 dBTP); share copy `a2-share.mp4` (x264 crf 20).
- 25 s test render before the full render (`out/a23/test25-av.mp4`, −14.1 LUFS); fixes after stills: strip pills stacked (label over value), the "?" moved below the split cards, the BPA CLAIMED TWICE and NOT A BONUS stamps kept inside their panels.
- QC: `tools/reel_check.py` 12/12 (`a2/QC-REPORT.md`); contact sheet `showreel/out/a2/qc.jpg`; Whisper transcript confirms $70,000, $6,000, 33%, $2,000, $35,000, $5,300, box 22.
- vidIQ: 1,210 → 1,165 = 45 credits by measurement for 5 calls (over the 25 cap; cause unknown, recorded). Titles: 89 (primary) / 93 (rejected as inaccurate: "Same Job"). Analysis page https://claude.ai/artifact/CyoCdkr7VjM2R1p89SGNfe. Kit card "#32 · Smaller Refund" (Kit v40). Nothing scheduled.
- Higgsfield: 10 VO generations, 3 plates + 3 4K upscales.
- Next (bridge CTA): A9 filed wrong? fix your return.
