# Faceless YouTube (Documentaries) — framework (user, 2026-10-24: «имей ввиду и просто анализируй»)

Checklist the user added to our rules. Use it as a review lens for every long-form episode (and Shorts where relevant); it does not replace existing rules (no AI video generation, verified facts only, Metricool only on command).

Sections: Niche & Topic Selection (high-retention niches, evergreen vs trend, competitor breakdown, audience psychology: curiosity + emotion) · Research System (source workflow, fact-checking, story angle, research prompts) · Script Frameworks (curiosity-gap hooks, documentary arcs, tension & payoff timing, cliffhangers/retention, script prompts) · Visual Storytelling (B-roll sourcing & licensing, AI image/video, stock, archival, scene composition) · Voiceover & Narration (voice/tone match, pacing & emotion, script-to-voice alignment, cleanup & mixing) · Editing & Packaging (templates, retention pacing, overlays & motion graphics, music & sound design, color grading) · Thumbnails & Titles (CTR formulas, curiosity thumbnails, title hooks, A/B testing) · Growth Engine (SEO, titles/descriptions, cadence & series, analytics) · Monetization (AdSense, digital products, affiliates, memberships, multi-channel) · Automation & Systems (full workflow, SOPs, prompt libraries, outsourcing, scaling).

## Gap analysis vs our pipeline (2026-10-24)
| Area | Already covered | Gap |
|---|---|---|
| Niche & topics | LONGFORM-QUEUE by demand, vidIQ + NexLev per video | evergreen vs trend tag per topic not recorded |
| Research | FACTS.md (claim · source · year), canada.ca only | — |
| Script | open loops, Face-Off acts, bridge CTA | explicit tension/payoff timing map in BLUEPRINT |
| Visuals | photo plates + code motion, no AI video (our rule wins) | B-roll licensing: none used; color grade not standardised |
| Voice | Grady, word-aligned timeline, −14 LUFS | — |
| Editing | motion engine, SFX, ticker, chapters | music bed variety per episode |
| Thumbnails/titles | vidIQ title score; thumbnails made by user | YouTube "Test & compare" A/B for thumbnails/titles not used |
| Growth | 10-day cadence, cross-platform promo, playlists | analytics review after publish (CTR, AVD, retention dips) not routine |
| Monetization | — | not addressed (AdSense eligibility, products, affiliates: only with disclosure) |
| Automation | build.py / render chunks / docs per episode | one written SOP file for the whole long-form run |

## Card series (Shorts / Reels) mapping (2026-10-24)

what we already do and what changes from the next video on. Existing hard rules win where they conflict (marked ⚠).

| Branch (card series) | Already in our pipeline | Add from the next video |
|---|---|---|
| **Niche & topic selection** (retention niches, evergreen vs trend, competitor breakdown, curiosity + emotion) | vidIQ keyword research, NexLev Shorts search, TOPICS-2 arcs | Tag every topic **evergreen / seasonal / trend** in the bible; write one line on the viewer's emotion (fear of a bill, relief, "money left on the table") and the curiosity gap; competitor breakdown = what the top 3 promise, length, angle, what they miss |
| **Research system** (sources, fact-checking, story angle, prompt library) | REAL TAX INFORMATION MODE, primary law text, data.json + calc.py, facts row in the bible | A short **angle note** before the script: 2–3 candidate angles, pick one with a reason; keep reusable research prompts in `channel/prompts/` as they prove useful |
| **Script frameworks** (curiosity-gap hooks, documentary arcs, tension/payoff timing, cliffhangers) | Hook → Promise → Investigation → Reveal → Action; open loop in 1–2 s; bridge CTA | Write the **open loop and its payoff time** in the Blueprint (e.g. loop at 0 s, paid at 54 s); one mid-video re-hook ("but here's what doesn't count") around 55–65 % of the runtime; no artificial delay of a simple answer |
| **Visual storytelling** (B-roll licensing, AI image/video, stock, archival, composition) | Generated stills (Higgsfield) animated in code, 3 consistent scenes, numbers in code | ⚠ **No AI video generation** (standing rule). Stock/archival footage only if legitimately licensed, with the licence recorded in the bible; composition: subject visible, panels in the lower two thirds, safe zones |
| **Voiceover** (tone matching, pacing/emotion, script-to-voice alignment, cleanup/mixing) | Grady, word-level timings (beat_words), cue anchors, −14 LUFS mix, Whisper check | Delivery notes per beat stay mandatory; check speech rate (target 140–165 wpm) and flag lines that drag |
| **Editing & packaging** (templates, retention pacing, motion graphics, music/SFX, grading) | Motion engine v1, Variety rule, ≥1 visual event per 3 s, sonic identity, NavyGrade | Note the **music mood and grade** per topic group in the bible's Format row (already partly done) |
| **Thumbnails & titles** (CTR formulas, curiosity thumbnails, title hooks, A/B testing) | Cover frame strategy, 3 titles, vidIQ title scores | Title formula noted per video (number + outcome, question, contrast); for long-form: 3 thumbnails; **A/B test** only via YouTube's own "Test & compare" when the user enables it (done by the user, nothing automated) |
| **Growth engine** (SEO, descriptions, cadence/series, analytics) | PUBLISH.md, keywords, bridges between videos, Mon/Wed/Fri schedule, cross-platform promo | After publication, when the user asks: read real analytics (retention, CTR, views) for published videos and feed lessons into the next topic |
| **Monetization** (AdSense, digital products, affiliates, memberships, multiple channels) | — | Recorded only; nothing built or promoted without the user's decision. Affiliate/sponsor content always disclosed |
| **Automation & systems** (workflow, SOPs, prompt libraries, outsourcing, scaling) | MOTION-ENGINE.md pipeline, tools/*.py, Metricool batch generator | Keep the per-video SOP in one place (`channel/MOTION-ENGINE.md` §3) and update it when a step changes |

Per-video additions in short: **topic type + emotion line, angle note, open-loop/payoff times + mid re-hook in the Blueprint, title formula, licence record for any footage.**
