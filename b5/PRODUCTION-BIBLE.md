# Production Bible: B5 "Crossed $30,000? The GST rule isn't per year" (Handwritten Explainer)

Mode: REALISTIC HANDWRITTEN EXPLAINER (`channel/HANDWRITTEN-ENGINE.md`), series "Real Tax Math" (same desk plate, hand and engine as B4: `../b4/engine.py`). Governing rules: `/CLAUDE.md`, `short/MASTER-SYSTEM.md`.
Topic B5 in `channel/TOPICS.md` (GST/HST basics) and `channel/PUBLISHING-PLAN.md` §4 (week 5, after B4). Chosen for this mode because the answer is a sum across four quarters, an inequality and an invoice line, all written on paper.

**CURRENT VERSION:** v1

## 1. Content strategy
| Field | Value |
|---|---|
| Primary question | "I'm a freelancer near $30,000. When do I have to register for GST/HST and charge it?" |
| Search intent | do I need to charge GST as a freelancer in Canada; GST registration threshold |
| Audience | Canadian freelancers, contractors and side-hustlers approaching $30K of sales; B4 viewers (series sequel) |
| Curiosity gap | "Did you just become a tax collector?" |
| Surprise | The $30,000 test is not per calendar year but any four consecutive calendar quarters; a single quarter over $30K triggers GST on that very sale |
| Payoff | Watch your last four quarters, not your tax year; GST collected is not yours; ITCs give back GST on costs |
| vidIQ | Balance 0 credits on 2026-10-06 (renews 2026-11-04; the user is adding a subscription). Demand research fell back to web search; run one vidIQ keyword call before publishing when credits are available |

## 2. Facts
| Claim | Source | Year |
|---|---|---|
| Small supplier: you do not exceed $30,000 of taxable supplies over four consecutive calendar quarters; otherwise registration is required | canada.ca, "When to register for and start charging the GST/HST" (CRA) — via search summary 2026-10-06 | current |
| Exceeding $30,000 over four consecutive quarters (not in one quarter): you stop being a small supplier at the end of the month following the quarter in which you exceeded; then 29 days to register; effective date no later than the first supply after you stop being a small supplier | same canada.ca page (search summary) | current |
| Exceeding $30,000 in a single calendar quarter: you charge GST/HST on the supply that made you exceed; effective date of registration no later than the day of that supply | same canada.ca page (search summary) | current |
| GST 5%; HST 13% (ON), 14% (NS, since 2025-04-01), 15% (NB, NL, PE); Manitoba = 5% GST + its own RST | taxtips.ca "Sales tax rates 2026" and others (search 2026-10-06); CRA GST/HST rates page to confirm | 2026 |
| Input tax credits recover GST/HST paid on business purchases; net tax = collected − ITCs | CRA (canada.ca) ITC pages via search summaries | current |

**Worked example (not a CRA rule):** quarters Oct–Dec $5,000, Jan–Mar $8,000, Apr–Jun $9,000, Jul–Sep $9,500 → $31,500 > $30,000, exceeded in the quarter ending Sep 30 (no single quarter over $30K) → no longer a small supplier at the end of October → register within 29 days. In Manitoba a $1,000 invoice carries $50 GST (5%). Manitoba RST is not modelled: the narration says provincial sales taxes have their own rules.
**Conflict noted:** some secondary sites (accounts-os, canadianmoneyhelp) say "end of the second month" and "30 days". The video follows canada.ca wording ("end of the month following the quarter", 29 days). Open the canada.ca page once before publishing.
**Dependencies:** the threshold counts worldwide taxable supplies (including zero-rated) of you and your associates; exempt supplies and some capital sales are excluded; a corporation or partnership, Québec (QST) and special sectors (taxi, ride-sharing) differ. The footer limits the example to a sole proprietor's taxable sales in Manitoba.

## 3. Visual system
Same as `b4/PRODUCTION-BIBLE.md` v3 (desk plate, whole-hand plate with wrist-pivot motion, EMS Tech stroke font, living window light, coffee steam, handheld camera, motion blur on big hand moves). Paper content (top to bottom): "$30K tax collector?" · "per year" struck through · "4 quarters in a row" · "$5K + $8K + $9K + $9.5K" · "= $31.5K" "> $30K" (circled) · "→ register in 29 days" · "1 qtr > $30K → GST now" · "$1,000 + 5% = $1,050" · "$50 → government" ($50 circled) · "- GST on costs (ITCs)" · "HST 13–15%" · "PST: own rules"; final circle around "4 quarters in a row".
Camera push-ins: "> $30K" (25–27 s), "$50" (49.4–51.9 s), the rule "4 quarters in a row" (63.6–66.5 s); wide at the start (mug, steam) and the end.

## 4. Decisions
| # | Decision | Reason |
|---|---|---|
| B5-1 | Short notation on paper ($5K, $31.5K, "1 qtr") and pen speed 160 mm/s | At full notation (B4 style, 135 mm/s) the writing lagged the narration by 7 s |
| B5-2 | No tempo change on the VO (64 s of speech, 68.2 s video) | Duration tolerance 45 s–1:10 (CLAUDE.md) |
| B5-3 | Manitoba example, GST only | Channel home province; RST rules for services are fact-specific, so they are named as a dependency instead of modelled |

## 5. Revision log
- v1 (2026-10-06): first render. Preview fixes before render: text overlaps ($30K / "tax collector?", "= $31.5K" / "> $30K", HST / PST), a line past the right paper edge, hand covering circled sums during push-ins (retreats added), final push-in cropped the circled rule (zoom 2.05).
