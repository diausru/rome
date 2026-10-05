# Production Bible: "$100K, 10 Provinces" (Short)

Governing document: `short/MASTER-SYSTEM.md` (Master System v1.0). Channel rules: `/CLAUDE.md`.
Format reference from the user: a CPA reel "$100,000 salary after tax by province". Its look is improved on, not copied.

**CURRENT VERSION:** v1 (see the revision log at the bottom)

## 1. Project

| Field | Value |
|---|---|
| PROJECT NAME | $100K, 10 Provinces. Topic H3 in `channel/TOPICS.md` (same salary, different province) |
| VIDEO OBJECTIVE | Show exactly how much of a $100,000 salary a single employee keeps in each province in 2026, and why the province matters |
| TARGET AUDIENCE | Canadian employees aged 25–55, people thinking about moving between provinces, and Manitobans (the channel's home) |
| STORY | $100,000 → "how much do you keep?" → one province leaves you $6,506 more than another → countdown #9 → #1 (Québec shown separately, since it has its own tax return) → twist: B.C. beats Alberta → the gap is $542 a month → about 1 in 6 workers earn $100K+ → payoff: where you live is a tax decision |
| CHARACTERS | No hero on screen. Background extras: office workers in the defocused office (the brand plate shared with the carousel) |
| LOCATION / ARCHITECTURE | Open-plan office with a wall of windows, columns, rows of desks (`showreel/src/Office.tsx`) |
| OBJECTS | Glass data cards, leaderboard rows, gold numbers |
| MATERIALS | Frosted glass (backdrop blur, inner highlight, layered shadows); gold numerals with an extruded edge |
| LIGHTING | Overcast daylight from the window wall, plus ceiling strip lights. Constant. Grade goes from cool to warm over the film (the "clarity" motif) |
| TIME OF DAY / WEATHER | Afternoon, overcast. Constant |
| COLOR PALETTE | Deep green #06170F to #0A2C1D, cream #F6F1E7, gold #F2C14E / #FFD65E, green #27AE60, muted grey for estimates |
| CAMERA LANGUAGE | One tripod pan across the office: yaw −0.42 to +0.42 rad over 56 s, smootherstep, with operator micro-motion of ±0.0025 rad (sum of low-frequency sines). No cuts in the background: one continuous take |
| LENS LANGUAGE | Vertical FOV 50° (about 26 mm full-frame equivalent on a vertical frame). Shallow focus on the foreground glass: the office is defocused by a constant 9 px blur at half resolution |
| ANIMATION LANGUAGE | Cards enter with a damped spring (mass, overshoot under 4%), numbers count down from $100,000 to take-home while the deductions subtract, rows fly into the leaderboard on an arc and settle |
| PHYSICS RULES | Nothing teleports: every card travels from the hero position to its slot. Easing has acceleration and deceleration. No floating particles |
| CONTINUITY RULES | The leaderboard is persistent and grows from the bottom (#9) to the top (#1). The Québec row sits apart, in grey, marked ≈. Federal tax is the same $13,302 for every CRA-administered province |
| VISUAL MOTIFS | Gold = #1 and money kept; red-orange = money removed; the "≈" mark = estimate |
| TRANSITIONS | Card → slot flight; card dissolve through the glass blur; no hard cuts |
| EDITING RHYTHM | Hook 2.5 s; setup 3.5 s; 10 cards × 3 s; twist 6 s; gap 5 s; statistic 4 s; payoff 5 s |
| RENDER SETTINGS | Remotion 4, 1080×1920, 24 fps, 1344 frames (56 s), H.264 CRF 16, yuv420p, silent. Office plate rendered at 540×960 and scaled ×2 (it is defocused) |
| KNOWN TECHNICAL LIMITATIONS | The office extras are procedural figures. They only hold up while defocused, so the blur must not drop below about 7 px at half resolution. SwiftShader WebGL is slow: render with `--concurrency≤3 --timeout=300000` |

## 2. Facts (all 2026, single person, $100,000 employment income, no other income or deductions)

Take-home = salary − federal tax − provincial tax − CPP (CPP1 + CPP2) − EI (Québec: QPP, EI at the Québec rate, QPIP). Calculator: `salary/calc.py`.

| Parameter | Value | Source |
|---|---|---|
| Federal brackets | 14% up to $58,523; 20.5% up to $117,045; 26% up to $181,440; 29% up to $258,482; 33% above | CRA T4127, 122nd ed. (Jan 1, 2026) |
| Federal BPA / Canada employment amount | $16,452 / $1,501 | T4127; KPMG and TaxTips 2026 credit tables |
| CPP | YMPE $74,600, YAMPE $85,000, exemption $3,500, 5.95% (max $4,230.45), CPP2 4% (max $416) | CRA, via Investment Executive and C-B-A |
| EI | MIE $68,900, 1.63% (max $1,123.07); Québec 1.30% (max $895.70) | CRA / ESDC 2026 |
| Enhanced CPP | First additional 1% ($711) + CPP2 ($416) deducted from income; base part credited | Income Tax Act treatment, as in T4127 |
| AB | 8% to $61,200; 10% to $154,259 …; BPA $22,769; credits at 8% | T4127 Jan 2026; Alberta Budget 2025 |
| BC | 5.60% to $50,363 (full-year 2026 rate, Budget 2026); 7.70% to $100,728 …; BPA $13,216; credits at 5.60% | BC Budget 2026 (MNP, PwC); T4127 Jul 2026 |
| SK | 10.5% to $54,532; 12.5% to $155,805; BPA $20,381 | T4127 Jan 2026; saskatchewan.ca |
| MB | 10.8% to $47,000; 12.75% to $100,000; 17.4% above; BPA $15,780; indexing frozen since 2025 | MB Budget 2025 bulletin; CBC Manitoba |
| ON | 5.05% to $53,891; 9.15% to $107,785 …; BPA $12,989; surtax 20% over $5,818 / 36% over $7,446; health premium $750 | T4127 / T4032-ON Jan 2026 |
| NB | 9.4% to $52,333; 14% to $104,666 …; BPA $13,664 | T4127 Jan 2026 |
| NS | 8.79% to $30,995; 14.95% to $61,991; 16.67% to $97,417; 17.5% to $157,124 …; BPA $11,932 | T4127 Jan 2026 |
| PE | 9.5% to $33,928; 13.47% to $65,820; 16.6% to $106,890 …; BPA $15,000 | PEI Budget 2026 summaries; T4127 Jul 2026 |
| NL | 8.7% to $44,678; 14.5% to $89,354; 15.8% to $159,528 …; BPA $13,094 for the 2026 year | T4127 Jan/Jul 2026; NL announcement of Apr 29, 2026 |
| QC (estimate) | 14% to $54,345; 19% to $108,680; BPA $18,952; worker deduction max $1,450; QPP 6.30% (max $4,479.30) + QPP2 $416; QPIP 0.430% (MIE $103,000); federal abatement 16.5% | Revenu Québec 2026; QC calculators |

**Results (take-home):** BC $75,373 · AB $74,459 · ON $74,206 · SK $72,288 · MB $71,445 · NB $71,215 · NL $70,603 · PE $69,789 · NS $68,867 · QC ≈ $69,585.

**Cross-check:** catax.tools (2026) matches to the dollar for BC, AB, ON, SK, MB and NS (it also shows federal tax $13,302). For Québec, its provincial tax is $438 lower and it leaves out QPIP. Québec is therefore shown as ≈, unranked.

**Derived figures:** gap #1 − #9 = $75,373 − $68,867 = $6,506 a year; ÷ 12 = $542.17 a month.

**Statistic:** 17.1% of people with employment income earned $100,000 or more in 2024 (StatCan, Canadian Income Survey, Table 11-10-0240-01, released 2026-04-29). This was confirmed only through a secondary citation (wealthnorth.ca) plus the release date on statcan.gc.ca. The user is told to check the table directly. On screen it reads "about 1 in 6".

## 3. Shot architecture (one continuous background take; foreground beats)

| ID | Time | Story purpose | Foreground | Background |
|---|---|---|---|---|
| S1 | 0.0–2.5 | HOOK | "$100,000" slams in at scale 1.25 → 1 (spring); caption types "How much do you keep?"; money starts dropping off (a red tick) | pan starts, cold grade |
| S2 | 2.5–6.0 | QUESTION + open loop | "Same job. Same pay. 10 provinces." / "One leaves you $6,506 more. Guess which." | pan |
| S3 | 6.0–36.0 | ESCALATION | QC (aside, ≈) then #9 NS → #1 BC; each card: enter 0.4 s, count $100,000 → take-home with 4 deductions subtracting 1.3 s, hold 0.8 s, fly to the slot 0.5 s | pan; extras walking |
| S4 | 36.0–42.0 | DISCOVERY (twist) | "Wait — B.C. beats Alberta?" rate comparison 5.6% vs 8%, 7.7% vs 10%; provincial tax $5,556 vs $6,470; the BC and AB rows glow | grade warming |
| S5 | 42.0–47.0 | TRANSFORMATION | bracket between the #1 and #9 rows: $6,506 a year → $542 a month | |
| S6 | 47.0–51.0 | CONTEXT | "About 1 in 6 workers earn $100K+" (17.1%, StatCan 2024) | |
| S7 | 51.0–56.0 | PAYOFF | "Where you live is a tax decision." + Tax Secrets Canada + sources / assumptions | warm, clear grade |

## 4. Decisions already made

1. Québec is not ranked: it has a separate tax return and an estimate gap of about $440 against an independent calculator.
2. Order: worst to best, so the open loop ("which province?") is answered last.
3. Background is the brand office plate, defocused. The user may supply real phone footage of Winnipeg later; it would replace the plate.
4. No music, VO or SFX; markers are in `salary/MARKERS.md`.

## Revision log
- v1: rendered and verified (1080×1920, 24 fps, 1344 frames, 56.0 s). QC found an empty hero frame plus caption gap at every card change (attention drop every 3 s), cards and bars clipped, rows in the Shorts UI zone.
- v2: card overlap (the next card enters 8 frames before the previous one leaves), captions overlap, layout raised. Verified: 1080×1920, 24 fps, 1344 frames, 56.0 s, clean decode, continuous seam frames 206–222.
