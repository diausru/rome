# Production Bible: "Your first pay stub, explained" (topic G3)

Order: `channel/PUBLISHING-PLAN.md` §4, week 4. Approved look (Kit + Plate). Employment group: Mont 900 headings (SANS), new `work` music mood (young and upbeat: 92 BPM, G major, G–Em–C–D, light plucks).
Voiceover: `g3/VOICEOVER.md`. Timeline: `showreel/src/g3-timeline.json`. Composition: `showreel/src/G3v2.tsx`. Publish: `g3/PUBLISH.md`.

## 0. Demand research (vidIQ, one call before the script)
`vidiq_keyword_research` (CA) "pay stub deductions canada": <750/mo. Related volume: "income tax canada" ≈4,728/mo, "canadian tax guide" ≈4,746/mo (competition 13), "tax return canada" ≈4,573/mo (competition 10.6), "taxes in canada" ≈3,485/mo, "canada pension plan" ≈3,478/mo. 5 credits.
Conclusion: hook on the felt moment ("First paycheque smaller than you expected?"), with the broad terms (income tax, CPP, tax return) in the title, description and keywords.

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (CRA payroll pages; direct fetch is blocked by the network proxy, so the rates come from canada.ca search-result text and the series' 2026 parameter set in `salary/calc.py`, sourced from CRA T4127 122nd/123rd editions), 2026-10-06.

| # | Claim used | Source · tax year |
|---|---|---|
| R1 | CPP 2026: employee rate 5.95%, basic exemption $3,500, YMPE $74,600 | CRA "CPP contribution rates, maximums and exemptions" · 2026 |
| R2 | CPP2 2026: 4% on earnings from YMPE $74,600 to YAMPE $85,000 (max $416 employee) | CRA "Second additional CPP (CPP2) contribution rates and maximums" · 2026 |
| R3 | EI 2026 (outside Quebec): employee rate 1.63%, maximum insurable earnings $68,900 | CRA "EI premium rates and maximums" · 2026 |
| R4 | The employer stops deducting CPP / EI once the employee's yearly maximum contribution / premium is reached; deductions start again in January | CRA payroll guidance (calculating deductions) · 2026 |
| R5 | Income tax withheld depends on the employee's federal and provincial TD1 claim amounts | CRA TD1 forms / payroll guidance · 2026 |
| R6 | 2026 federal and Manitoba brackets, basic personal amounts, Canada employment amount | `salary/calc.py` (CRA T4127 2026) · 2026 |
| R7 | The return reconciles: over-withholding → refund; under-withholding → balance owing; CPP/EI overpaid (e.g. two employers) is refunded through the return | CRA (line 44800 / 45000 overpayments; general) · general |

### Example (not a CRA rule) · `g3/example.py`
Manitoba employee, 2026, $52,000 salary, 26 biweekly pays, basic TD1 claims, no other income. Per pay = yearly amount ÷ 26 (an approximation of T4127 withholding, which can differ by cents to a few dollars).
- Gross $2,000.00
- CPP 5.95% × (52,000 − 3,500) ÷ 26 = **$110.99**
- EI 1.63% × 2,000 = **$32.60**
- Income tax: federal $163.23 + Manitoba $138.33 = **$301.56**
- Net 2,000 − 110.99 − 32.60 − 301.56 = **$1,554.85**

### Dependencies, exceptions, notes
- At $52,000 neither the CPP ($85,000 incl. CPP2) nor the EI ($68,900) maximum is reached; the card says so explicitly.
- VO line "once you hit the yearly maximum for CPP … those deductions stop" = the yearly maximum contribution (base + CPP2). Screen spells out the two CPP ceilings so the line isn't read as "stops at $74,600".
- Quebec: QPP / QPIP / different EI rate: not covered (EI card says "outside Quebec").
- Other stub lines (benefits, union dues, RRSP through payroll, vacation pay) depend on the employer: not covered.
- Changing jobs mid-year: a new employer starts CPP/EI over; overpayment comes back through the return (R7), covered only as "your return settles the difference".

### Claims deliberately NOT made
- Exact T4127 per-pay tax (we show an annual ÷ 26 example and say "about").

## 2. Project
| Field | Value |
|---|---|
| PLATE | `public/plates/g3-4k.jpg` (Higgsfield gpt_image_2_5, 2 variants 0.5 + 4K upscale 2 credits; checked: no text or signs): a young worker in a black polo reads his first pay stub by a city window at dusk; on the counter, a takeaway coffee, phone, earbuds, an unmarked envelope and a folded work apron |
| SKYLINE | Both variants show a Toronto-like skyline with a tower; the example is Manitoba, so every camera key keeps k ≥ 1.15 and u ≤ 0.45 to keep the tower out of frame (checked in QC stills) |
| PINS | envelope "$2,000 gross" · envelope "take-home ≈ $1,555" · coffee "CPP & EI stop until January" |
| STRIP | pay stub builds: gross · CPP · EI · tax · net |
| LIVE | steam over the coffee; motivated camera between worker, stub, envelope, phone, coffee |
| VOICE | Grady; 114 words; 57.16 s (inside the tolerance) |
| RENDER | 1080×1920, 24 fps, 1384 frames (57.7 s) |

## 3. QC log
- Stills v1: hook face hidden behind the top card; $2,000 pin over the phone instead of the envelope → hook card delayed to 30% of the beat (first ~1.3 s shows the face clearly), envelope pin moved to the envelope.
- Stills v2: CPP key at u 0.55 revealed the skyline tower → u 0.45. CPP card empty for ~1 s and its note wrapped → hero earlier, note shortened.
- Footer: T4127 reference replaced by the example's actual method ("yearly tax ÷ 26").
- Final: 1383 frames (mux trims the last hold frame to the audio length), 57.66 s, h264 1080×1920 + AAC 48 kHz, decode OK, −14.3 LUFS; contact sheet checked (no skyline tower in frame); sent to the user; kit card #12.
