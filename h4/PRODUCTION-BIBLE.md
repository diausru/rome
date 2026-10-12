# H4 — Manitoba tax landscape: the frozen lines (card series, motion engine v1)

Row 11 of `channel/PUBLISHING-PLAN.md` §4, bridged from D1 ("Next: Manitoba's tax brackets on a real paycheque"). Made 2026-10-12 on the user's command ("следующий создавай но не забывай что они должны быть разные и графика меняется и не всегда начало быть одинаково. Мы используем инструкцию для максимального внедрения"), which also became the "Variety" rule in CLAUDE.md.
Voiceover: `h4/VOICEOVER.md`. Timeline: `showreel/src/h4-timeline.json`. Words: `showreel/src/h4-words.json`. Reel spec: `h4/reel.json` → `showreel/src/h43-cues.json`, `h4/sfx-cues.json`. Data: `h4/data.json`. Composition: `showreel/src/H4V3.tsx`. Publish: `h4/PUBLISH.md`, `h4/publish.json`. QC: `h4/QC-REPORT.md`.

## Coordination check

Pulled the branch on 2026-10-12. The long-form session has LF-04 "Manitoba → Alberta on $100K" (move comparison, take-home, rent, RST) and LF-01 (federal brackets explained). H4 takes the Manitoba-only angle neither covers: indexation frozen from 2025, shown on a raise across the $100,000 line, plus the BPA phase-out and the 2026 renters/homeowners credits. No handwritten project touches Manitoba brackets. The bridge target A1 ("credits most Canadians never claim") is not claimed by the handwritten series (Kit labels and publish.json files checked).

## Facts (REAL TAX INFORMATION MODE)

Primary sources saved in `h4/sources/` (`budget2025.txt` from the Budget 2025 PDF, `pcredits.txt` from gov.mb.ca Personal Tax Credits; fetched 2026-10-12).

| Claim | Source · tax year | Type |
|---|---|---|
| Rates 10.8% $0–47,000; 12.75% $47,001–100,000; 17.4% over $100,000 | Manitoba Budget 2025, Tax Measures p.140 (2024 values) | rule |
| "Beginning with the 2025 tax year, indexation of the BPA and tax bracket thresholds to inflation will be frozen" | Budget 2025 p.140 (verbatim) | rule |
| Same values apply for 2026: $47,000 / $100,000 / BPA $15,780 | CRA T4127 Jan 2026 Manitoba table (recorded in `salary/PRODUCTION-BIBLE.md`); gov.mb.ca BPA $15,780 for 2024 and 2025 | rule |
| BPA phased out over net income $200,000–$400,000 from 2025 | gov.mb.ca Personal Tax Credits | rule (shape of the phase-out not shown; only the endpoints) |
| Renters Affordability Tax Credit up to $625 for 2026 | gov.mb.ca; Budget 2025 p.140 | rule (maximum) |
| Homeowners Affordability Tax Credit up to $1,600 for 2026, principal residence | gov.mb.ca | rule (maximum) |

Example (not a CRA rule): taxable income $98,000 → $102,000: $2,000 × 12.75% + $2,000 × 17.4% = $255 + $348 = $603 of Manitoba tax on the raise. Federal tax on the raise is not shown (stated on screen and in the description). "A raise that only matches prices can push more of your pay into a higher rate" is the general consequence of unindexed thresholds; no hypothetical indexed threshold is computed (Manitoba's own indexation factor for 2025–26 was never published, so it would be invented). Eligibility details of the two credits (rent receipts, school tax, seniors' top-up) are left to gov.mb.ca.

## Format: what is new vs D1 and NY (Variety rule)

| | D1 (tuition) | NY v3 | **H4 (this)** |
|---|---|---|---|
| Hook | kinetic lines + three floating tags + gold question "WHOSE?" | kinetic lines + tags + gold "DEC 30" | **three-row ticker: PRICES ▲ / YOUR PAY ▲ sparklines draw on, MB BRACKETS flat line frosts over + ice stamp "FROZEN SINCE 2024"** |
| Main visual | tiles + count-ups, split transfer bar | ledger rows, date track | **rate ladder (three steps rise on each spoken rate), threshold lines frost with locks, FROZEN stamp** |
| Example | tuition → credit count-up | net gain ledger | **income slider $98K → $102K across the frozen $100K line, segments fill gold / red, $603 count-up** |
| Statement | — | — | **full-frame kinetic "A RAISE THAT ONLY MATCHES PRICES → ▲ HIGHER RATE", no panel** |
| Extra visual | stamp "ENDED" tiles | red window bar | **melting basic-amount bar between $200K and $400K + "GONE" stamp; two paper receipts sliding in from opposite sides** |
| End | left-aligned block | left-aligned block | **centred card: flag, MANITOBA 2026, three frosted rate chips, pill** |
| Light / music | night library, `work` G major | NYE, `work` | **bright winter morning → evening apartment → blue-hour bridge; `pension2` F major 76 BPM; ice-blue accent (#bfe6ff) added for the freeze only** |
| Entrances / exits | glass, wipe, slideL/R; vapor, fade, collapse | similar | **focus (ladder), slideR (slider), wipe (gauge), custom receipts; vapor, collapse, fade** |

| | |
|---|---|
| SCENES | Same man (late 30s, navy parka, grey toque; image reference = scene 1) in Winnipeg, 4K: 1) `h4-s1-4k.jpg` Exchange District, sunny winter morning, walking with coffee (hook → freeze); 2) `h4-s2-4k.jpg` rented apartment in the evening with his partner at a laptop (example, creep); 3) `h4-s3-4k.jpg` blue hour on a cable-stayed footbridge with a lit museum behind (high, credits, end). Cuts at `example` and `high`. Text check at 4K: clean (no signage, the laptop is lid-only) |
| VOICE | Grady; 8 beats; 155 words; 68.84 s VO + 1.7 s hold |
| COST | Higgsfield: 8 VO lines, 4 stills (2 variants scene 1 + scenes 2, 3), 3 × 4K upscale. vidIQ: 25 credits (1,370 → 1,345) |

## Delivery (2026-10-12)

- Final: `showreel/out/h4/h4-final.mp4` (share copy `h4-share.mp4`): 1694 frames, 70.58 s, h264 1080×1920 24 fps + AAC 48 kHz, −14.1 LUFS, true peak −2.0 dBTP.
- Automated QC `tools/reel_check.py`: 12/12 PASS (`h4/QC-REPORT.md`). Checker extended for this reel: decimal rates ("twelve point seven five"), "sixteen hundred", "a hundred and two" (thousands), and hyphens normalised on both sides; D1 re-checked: still 12/12.
- Visual QC (`showreel/out/h4/qc.jpg`, 16 frames from the final): fixes made before the full render: the freeze moved from "frozen" (25.6 s, only 0.7 s on screen before the cut) to "lines" (20.3 s); locks lowered under the BPA chip; FROZEN stamp moved off "17.4%"; the receipts now leave before the end card arrives.
- vidIQ titles: 94 "Got a Raise in Manitoba? Here's the Tax on It (2026)" (primary) / 82. Analysis page: https://claude.ai/artifact/EZdyr8ZK8ynqpzkyZJehuM (`channel/analysis/h4-analysis.html`). Kit card "#28 · Manitoba Frozen Brackets" (Kit v36).
- Metricool: not sent (only on command).
