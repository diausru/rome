# Production Bible: B12 "Sold the written-off laptop? Recapture" (Handwritten Explainer)

Mode: REALISTIC HANDWRITTEN EXPLAINER, series "Real Tax Math" (… → B2 → B11 → B12; engine `../b4/engine.py`). Governing rules: `/CLAUDE.md`, `channel/RULES-SHORTS.md`, `channel/HANDWRITTEN-CTA.md`, `channel/COVER-FRAME-STRATEGY.md`. Topic: B11's CTA ("sell the old one? comment CATCH"); user 2026-11-15 "делай следующий ролик". No overlap: F4 mentions the CCA trap for rental buildings (Class 1); no video on recapture of equipment.

**CURRENT VERSION:** v1

## 1. Content strategy
| Field | Value |
|---|---|
| Primary question | "I wrote off my laptop. What happens when I sell it?" |
| Search intent (vidIQ CA, 2026-11-15) | "recapture capital cost allowance", "capital cost allowance", "depreciation recapture" all <750/mo; broad "self employed taxes" ≈4,963/mo |
| Competitors | One Canadian CCA explainer (5 min, 829 views) mentions recapture in passing |
| Hook | "You wrote off the whole laptop. Two years later, you sell it for seven hundred. Here's the catch." |
| Twist | Fair: you deducted value the laptop never lost. Fix: replace it in the same year |

## 2. Facts (primary sources)
| Claim | Source | Year |
|---|---|---|
| On a sale, the class is reduced by the lesser of (proceeds − related expenses) and the capital cost | CRA Guide T4002, ch. 4 | current |
| Negative balance (column 7) at year end = recapture of CCA, added to income; no CCA claim that year | CRA T4002 ch. 4; CRA "Completing Form T2125, column 7" (line 8230) | current |
| Additions in the same period count first (column 7 = start UCC + additions − proceeds) | same | current |
| Terminal loss: positive balance and no property left in the class (line 9270) | same | current |
| B11 laptop: $2,000, 100% first-year CCA → UCC $0 | B11 bible (Regs 1100(2), SC 2026 c. 3) | 2026 |

**Calculation (not a CRA rule, `calc.py` → `data.json`):** $0 − $700 = −$700 → recapture $700 → tax + CPP $248.94 at 2026 rates (MB, $60K net). Replacement $2,500 the same year: $0 + $2,500 − $700 = $1,800, no recapture.
**Dependencies:** other Class 50 property in the class; selling costs; the year's rates; mixed use; a sale above the original cost also creates a capital gain (not covered).

## 3. Ending CTA options (rotation rule)
| # | Option | Verdict |
|---|---|---|
| 1 | "only 60% for work?" → hand-drawn 60/40 bar labelled "work" → "reply 60", underlined | **Chosen**: next logical question (mixed use); a number answer; new mark (a drawn bar; B11 box, B2 circle, B10 two circles, B9 arrow) |
| 2 | "Gave it to your kid instead?" | Needs a separate fact pass (non-arm's length / FMV) |
| 3 | "Sold it for more than $2,000?" | Rare for laptops |
| 4 | "Phone next?" | Weak continuation |
| 5 | "Want the terminal-loss case?" | Jargon |

## 4. Cover
00:20.55 (20,550 ms): settled push-in on the circled "-$700", with "tax value now = $0" and the hook above. IG/TikTok via Metricool `videoCoverMilliseconds` only on /schedule; YouTube: user selects manually.

## 5. Decisions
| # | Decision | Reason |
|---|---|---|
| B12-1 | "Tax value" on screen instead of "UCC" | Plain language; the description names UCC and T2125 |
| B12-2 | Sale year rates = 2026 | Future rates not published; labelled "2026 rates" in the footer |
| B12-3 | End hold shortened (VO end + 2.6 s) | CTA rule: 1–1.5 s hold after the last mark |
| B12-4 | Primary title by vidIQ score (89 vs 86) | 25-credit cap: 20 used |

## 6. Revision log
- v1 (2026-11-15): preview fixes: "tax + CPP" moved off the circled $249; the "fix" line shortened so it isn't auto-shrunk; camera hold for the cover.
- v1 render QC (2026-11-15): 1080×1920, 24 fps, 1492 frames, 62.17 s, H.264 + AAC 48 kHz stereo, full decode clean, −14.1 LUFS, peak −2.2 dBFS; cover frame 20.55 s checked (b12/cover.jpg); final CTA (60/40 bar, 'reply 60' underlined) readable at the hold.
- Publishing Kit version 69 (74 cards).
