# Production Bible: B11 "Write off a laptop all at once? (CCA, Class 50)" (Handwritten Explainer)

Mode: REALISTIC HANDWRITTEN EXPLAINER, series "Real Tax Math" (… → B10 → B2 → B11; engine `../b4/engine.py`). Governing rules: `/CLAUDE.md`, `channel/RULES-SHORTS.md`, `channel/HANDWRITTEN-CTA.md`, `channel/COVER-FRAME-STRATEGY.md`. Topic: B2's CTA promised a fifth expense ("comment 5"); user chose it 2026-11-15. No overlap: F4 covers rental-building CCA (Class 1, 4%), B3/B6 home office and car; no video on computer CCA.

**CURRENT VERSION:** v1

## 1. Content strategy
| Field | Value |
|---|---|
| Primary question | "Can I write off my new laptop all at once?" |
| Search intent (vidIQ CA, 2026-11-15) | "write off laptop canada" <750/mo; "tax deductions" ≈9,158/mo; "self employed taxes" ≈4,963/mo |
| Competitors | US Section 179 laptop videos; Canadian lists with a CCA chapter; one Class 50 Short (274 views) without the number or the deadline |
| Hook | "Can you write off a new laptop all at once? This year, yes. From January, no." |
| Twist | Spending $2,000 to save $711 is still spending |

## 2. Facts (primary sources)
| Claim | Source | Year |
|---|---|---|
| Laptop = Class 50 (55%): general-purpose electronic data processing equipment; Class 12 excludes EDP equipment | CRA "Classes of depreciable property" (modified 2026-08-31) | current |
| Class 50 property acquired and available for use after Apr 15, 2024 and before 2027: A = 9/11 → first-year CCA = 55% × 20/11 = 100% | Income Tax Regs 1100(2) A(c.3) and A.1(e), as amended by SC 2026 c. 3 (Budget 2025 Implementation Act No. 1, Royal Assent Mar 26, 2026); statute text read 2026-11-15 | 2024–2026 |
| Reaccelerated property (acquired after 2024, available for use before 2034): half-year rule not applied; Class 50 factor nil after 2026 → 55% in year one | Regs 1104(4.01), 1100(2) A.1, same Act | 2027 |
| AIIP background (acquired after Nov 20, 2018, available before 2028) | CRA "Accelerated investment incentive" (modified 2025-07-21) | 2018–2027 |
| B4 freelancer tax + CPP $16,105.48 | b4/calc.py (T4127 2026, CPP 2026) | 2026 |

**Calculation (not a CRA rule, `calc.py` → `data.json`):** $2,000 laptop, 100% business use. In use 2026: CCA $2,000 → tax + CPP saved $711.27 (35.6¢/$1). In use 2027: CCA $1,100 → saved $391.20 in year one (2026 rates for comparison); $900 later ($495, $222.75, $100.24, …).
**Dependencies (stated in description/footer):** business-use share (mixed use → business part only); "available for use" date; CCA is optional; province and income; the laptop must be new to the taxpayer (not previously owned non-arm's length).

## 3. Ending CTA options (rotation rule)
| # | Option | Verdict |
|---|---|---|
| 1 | "sell the old one?" → "comment: CATCH", CATCH boxed by hand | **Chosen**: points to the next logical question (recapture after a 100% write-off); one-word answer; new mark (a hand-drawn box; B2 circled a 5, B9 arrow + underline, B10 two circled options) |
| 2 | "Phone or camera next?" | Vote structure, repeats B10 |
| 3 | "What's your next work buy? $___" | Fill-in-the-blank, weaker continuation |
| 4 | "Mixed use 60%? want the math?" | Narrower |
| 5 | "Bought it Dec 30? ask" | Edge case, risky without a fact pass |

## 4. Cover
00:32.2 (32,200 ms): settled push-in on the underlined "100% = $2,000" with "2027 no" above; camera held 31.9–32.6 s, no writing. IG/TikTok via Metricool `videoCoverMilliseconds` only on /schedule; YouTube: user selects manually.

## 5. Decisions
| # | Decision | Reason |
|---|---|---|
| B11-1 | Saying "put to use before 2027" instead of "available for use" | Plain language; description keeps "in use" and the footer names the regulation |
| B11-2 | 2027 comparison computed with 2026 rates | 2027 rates not published; labelled as a comparison |
| B11-3 | Primary title by vidIQ score (92 vs 92 tie → the deadline title) | 25-credit cap: 20 used |

## 6. Revision log
- v1 (2026-11-15): preview fixes: writing speeds raised to keep pace with the voice; "tax + CPP" moved off the circled $711; camera hold added for the cover frame.
- v1 render QC (2026-11-15): 1080×1920, 24 fps, 1655 frames, 68.96 s, H.264 + AAC 48 kHz stereo, full decode clean, −14.0 LUFS, peak −2.4 dBFS; frame strip clean; cover frame 32.2 s checked (b11/cover.jpg); final CTA "comment: CATCH" with the box readable at the hold (the source tag covers the top line in the last frame, as in B9).
- Publishing Kit version 68 (73 cards, merged onto the live version with the card session's M15).
