# Repository instructions

## Video production (standing rule from the user, 2026-10-05)

For every video / Short request, follow `short/MASTER-SYSTEM.md` (Claude Live-Action Video Director, Master System v1.0) in full:
- The video is built by code (rendering, compositing, simulation), never handed to an external video-generation model.
- Keep the project bible in `short/PRODUCTION-BIBLE.md` and update it explicitly when a decision changes.
- Render, verify (ffprobe and visual QC), self-correct, and report in the format of Master §33.

## Channel content

Tax content for the Tax Secrets Canada channel: see `channel/TOPICS.md` and `channel/RESEARCH-2026-10.md`. Fact-check every tax figure. Do not use "secret / loophole" framing.

## Shorts format reference (user, 2026-10-05)

Reference the user liked: a CPA reel "$100,000 salary after tax by province". Moving background matched to the story; in front, the topic's data enters row by row while text runs like film titles. Improve on it, don't copy it: the background must follow Master §1/§12 realism, data enters with motivated motion, clear hierarchy, readable on a phone, one idea per beat.

## Facts and safety

- Taxes = CRA (not IRCC). Every figure: canada.ca / CRA / provincial source with the tax year, recorded in the bible. Unverified figures are marked `[VERIFY]` and not shipped. Numbers are rendered by code, never baked into generated images.
- On-screen footer: "Source: canada.ca · General info, not advice" (or the specific source).
- Never print API keys (keys live in `~/.config/reels-montage/keys.env`, filled by the user). No subliminal / "25th frame" tricks. Don't work around refused downloads of external code.
- Branch `claude/kling-ai-skill-install-goznyv`; commit and push; no PR unless asked.

## Shorts series standing rules (user, 2026-10-05)

- The approved format is `showreel/src/SalaryShort.tsx` ("$100K, 10 provinces"): defocused office plate with a slow pan; glass hero card; typed film-title captions; persistent data board; gold numbers; sources footer. Every Short in the series reuses this language.
- Always include a Canadian flag somewhere in the frame (placement at Claude's discretion; code-drawn, correct 1:2:1 proportions).
- All 48 topics in `channel/TOPICS.md` become Shorts, published to YouTube on an optimized schedule (titles, hooks, descriptions, hashtags, playlists, posting times).

## REAL TAX INFORMATION MODE (user, verbatim, applies to every tax video)

Before creating the educational content:
1. Research the current Canadian tax rules relevant to this topic.
2. Use authoritative primary sources whenever possible.
3. Prefer current CRA / Government of Canada sources.
4. Verify every tax-related factual claim.
5. Do not invent thresholds, dates, eligibility rules, credits, deductions or exceptions.
6. Distinguish clearly between: general information; eligibility requirements; exceptions; situations requiring professional advice.
7. Do not present an example as an actual CRA rule.
8. If the tax treatment depends on facts that cannot be established from the topic, explicitly identify the dependency.
9. Keep a record of the sources used for the factual claims.
10. Only after the factual research is complete, design the 45–60 second story.

FACTUAL ACCURACY HAS PRIORITY OVER DRAMATIC STORYTELLING.
Never modify a tax rule to make the story more interesting.

## VOICEOVER ENGINE — MANDATORY (user, 2026-10-05; full text in `channel/VOICEOVER-ENGINE.md`)

Every video ships with a complete, professional voiceover designed on the SAME master timeline as the visuals:
- Written for speech (Canadian English, confident, calm, slightly dramatic, conversational). No "hello everyone" / "in today's video" / filler. Hook in the first 1–2 s with an open loop.
- Every important on-screen number, ranking, comparison or conclusion is explained or reinforced by the narration (complement, don't read the screen word for word).
- Build from the actual timeline: beats → narration per beat → realistic speaking duration → pauses → key words land at or just before their visual reveal.
- Numbers written as spoken words. Every tax claim verified (CRA / Government of Canada / provinces / StatCan).
- Deliver: A. final script; B. timecoded VO [mm:ss.ss–mm:ss.ss]; C. delivery notes; D. audio cue points; E. total spoken duration vs. video duration.
- If the narration does not fit, MODIFY THE VIDEO TIMELINE AND RE-RENDER. Do not just report the mismatch.
- The audio track is produced and muxed onto the video in sync.

## Next-phase production rules (user, 2026-10-05; apply from the next new topic, not retroactively)

- **Topic-matched background:** the plate behind the cards changes per topic and approximates the story: different offices, a school or classroom (kids / RESP / students), a Main Street storefront, a field or rural road, a retirement setting, an airport or train for travel. Keep it moving, defocused and real-looking (Master §1/§12).
- **Topic props in the scene** when they serve the story: money, a vacation, a plane or train with a family or business traveller (e.g. "are trips tax-deductible?"). Realistic, not cartoon.
- **Background music**, quiet and well under the VO (duck under speech), mood per theme: light and curious for school and kids, warm and calm for pensions, energetic for students, etc. Overt mood only: NO subliminal / "25th frame" content.
- **Typography per topic group** (e.g. pensions vs students vs business) while keeping the layout: glass cards, typed captions, gold numbers, flag, sources footer.
- Claude may improve realism and details on its own initiative, as long as the established layout is kept.

## PUBLISHING & GROWTH ENGINE — MANDATORY final step (user, 2026-10-05; full text in `channel/PUBLISHING-ENGINE.md`)

An MP4 is never "done". After visual, technical, factual and VO QC, research the current landscape for the topic (search intent, platform discovery, current Canadian tax news and questions), run a retention analysis (fix and re-render if weak), and write `<project>/PUBLISH.md` in the exact FINAL DELIVERY structure: video specs, VO + timecodes, fact sources (source · tax year · what it supports), YouTube (3 titles, description, hashtags, keywords, pinned comment, CTA), TikTok (caption, search keywords, hashtags, pinned comment, CTA), Instagram (caption, keywords, hashtags, pinned comment, one CTA), engagement strategy, SEO analysis, next 3 topics, series fit. Same facts everywhere; no engagement bait; no copied creator material.
