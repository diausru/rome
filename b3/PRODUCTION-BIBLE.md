# Production Bible: B3 "Work from home? Your office square feet" (Handwritten Explainer)

Mode: REALISTIC HANDWRITTEN EXPLAINER, series "Real Tax Math" (B4 → B5 → B6 → B3; same plate, hand and engine `../b4/engine.py`). Governing rules: `/CLAUDE.md`, `short/MASTER-SYSTEM.md`.
Topic B3 in `channel/TOPICS.md` ("Workspace in the home — employee vs self-employed", risk 🔴 "rules differ by audience"). Risk handling: the video covers the SELF-EMPLOYED rules only (T2125 business-use-of-home) and says so in the second line; employees (T2200 / T777) are explicitly out of scope.

**CURRENT VERSION:** v1

## 1. Content strategy
| Field | Value |
|---|---|
| Primary question | "I'm self-employed and work from home. What can I deduct?" |
| Search intent (vidIQ CA, 2026-10-07) | "work from home tax deduction" ≈4,996/mo (competition 39); Canadian phrases ("home office deduction canada", "home office expenses canada", "cra home office", "t2200 form") are below 750/mo |
| Hook | "Work from home? Your rent isn't a write-off. Your office square feet might be." |
| Surprise | Shared space is cut again by hours; the claim can't create a loss; CCA on an owned home can cost you at sale |
| Payoff | "Your home isn't the write-off. Your workspace is." |

## 2. Facts
| Claim | Source | Year |
|---|---|---|
| Self-employed may deduct business-use-of-home expenses if the workspace is the principal place of business, OR is used only to earn business income and used regularly and continuously to meet clients, customers or patients | canada.ca, "Business-use-of-home expenses" (CRA) via search 2026-10-07; corroborated by IG Wealth, TurboTax Canada | current |
| Eligible expenses include heat, electricity, water, insurance, maintenance, mortgage interest, property taxes, rent; calculation = business area ÷ total area × expenses | same canada.ca page (search summary) | current |
| If the space is also used personally, the claim is further reduced (e.g. by business hours) | same (search summary) | current |
| Cannot create or increase a business loss; the unused part carries forward to future business income | canada.ca page and secondary sources (search summaries) | current |
| Claiming CCA on the home office can affect the principal residence exemption / trigger recapture when the home is sold | secondary sources (IG Wealth, wealthnorth, TD tax planning) via search; stated in the video only as "can cost you when you sell. Get advice first" | current |

**Worked example (not a CRA rule, `b3/calc.py`):** rented 1,000 sq ft apartment, 120 sq ft room used only for the business → 12%; rent $18,000 + utilities $1,800 + tenant insurance $400 = $20,200 → deduction $2,424. In the B4 example (2026, Manitoba, single, $60,000 net self-employment income) tax + CPP falls by $862.05 (35.56¢ per $1) → "≈ $862 saved".
**Dependencies:** renter vs owner (owners add mortgage interest and property tax; CCA caution); exclusive vs shared space; business income must be at least the claim (no loss); employees have different rules (T2200 / T777), not covered.

## 3. Visual system
As B4 v3 / B5 / B6. Paper, top to bottom: "rent = write-off?" ("rent" struck through) · "office sq ft?" · "self-employed" · "main place of business" · "1,000 sq ft" · "120 office" "= 12%" (circled) · "costs $20,200" · "12% × $20,200" · "= $2,424" (circled) · "≈ $862 saved" (underlined) · "shared space? × business hours" · "no loss → carry forward" · "own? CCA → get advice"; final circle around "120 office".
Push-ins: 12% (21.7–23.3 s), $2,424 (33.2–35.2 s), $862 (38.8–41.6 s), "120 office" (62.5–64.6 s).

## 4. Decisions
| # | Decision | Reason |
|---|---|---|
| B3-1 | Self-employed only; the narration says so | The 🔴 risk in TOPICS.md: rules differ between employees and the self-employed |
| B3-2 | Renter example | Avoids mortgage-interest and CCA calculations; the owner caveat is spoken as a warning to get advice |
| B3-3 | 65.9 s, no tempo change | Duration tolerance 45 s–1:10 |

## 5. Revision log
- v1 (2026-10-07): preview: writing lagged at "main place of business" by ~3 s → shorter labels and faster pen (175–180 mm/s) for that beat; remaining lag ≈2 s, still inside the same narration line.
