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

## REALISTIC HANDWRITTEN EXPLAINER — production mode (user, 2026-10-06; full text in `channel/HANDWRITTEN-ENGINE.md`)

An additional Tax Secrets Canada mode: a realistic hand physically writes the explanation (numbers, arrows, circles, calculations) on paper, 9:16, 45–60 s. Style reference: `channel/refs/handwritten-reference.png` (reference only, never copied). Use it only when handwriting is the clearest way to explain the topic (§39); otherwise use the card format or a hybrid. Key rules: research and fact-check first; the VO is the master timeline; a drawing timeline with stroke order; ink is revealed only under the moving pen tip (no fades or typewriter effects); one continuous hand and pen; final delivery in the §37 structure plus the publishing package.

### Handwritten mode: realism and delivery rules (user, 2026-10-06)

- **Publishing artifact for every video:** besides `<project>/PUBLISH.md`, publish an Artifact page with the full publishing package (titles, description, hashtags, keywords, pinned comments, CTAs for YouTube / TikTok / Instagram, with copy buttons) and give the user the link.
- **Natural camera:** handheld-style, non-periodic operator motion; motivated moves. **Push in on every sum that is circled or underlined** (hold while the narration lands it), then return to the line; establishing wide at the start, pull back to the whole page at the end.
- **Living background:** the plate must never look frozen: window light that breathes (passing cloud, blind sway), steam from a hot drink, etc. All made in code, subtle and physically plausible.
- **Maximum realism and quality:** 180° shutter motion blur on fast hand moves, light continuity between the hand, paper and desk, nothing that reads as CG or as a still photo.

## PUBLISHING & GROWTH ENGINE — MANDATORY final step (user, 2026-10-05; full text in `channel/PUBLISHING-ENGINE.md`)

An MP4 is never "done". After visual, technical, factual and VO QC, research the current landscape for the topic (search intent, platform discovery, current Canadian tax news and questions), run a retention analysis (fix and re-render if weak), and write `<project>/PUBLISH.md` in the exact FINAL DELIVERY structure: video specs, VO + timecodes, fact sources (source · tax year · what it supports), YouTube (3 titles, description, hashtags, keywords, pinned comment, CTA), TikTok (caption, search keywords, hashtags, pinned comment, CTA), Instagram (caption, keywords, hashtags, pinned comment, one CTA), engagement strategy, SEO analysis, next 3 topics, series fit. Same facts everywhere; no engagement bait; no copied creator material.

## Voice for upcoming topics (user, 2026-10-05; not retroactive: Shorts #1, #2 and CASE #002 stay as they are)

- From the next topic on, the narration uses an ElevenLabs voice through Higgsfield (`generate_audio`, model `text2speech_v2`, variant `elevenlabs`, a preset voice), ≈0.3 credits per line. Choose a natural, human-sounding, warm and confident male or female narrator; the user wants it livelier and less "AI" than the Piper voice. The voice is chosen together with the user (sample candidates first) and then kept consistent across the series.
- **Chosen voice: Grady** (user, 2026-10-06; the user has used it before). Higgsfield `generate_audio` with model `text2speech_v2`, variant `elevenlabs`, voice_type `preset`, voice_id `e2a2d2e6-9ed2-59cd-82af-feaa27f8a678`. Keep it for the whole series. Test: 21 words in 7.97 s (≈158 wpm), mp3 44.1 kHz mono.
- Network access to Higgsfield results now works (cloudfront `d8j0ntlcm91z4` / `d1xarpci4ikg0w`, `cdn.higgsfield.ai`): generate per beat, download, measure → master timeline → mux.
- Publishing Kit artifact (https://claude.ai/artifact/6LfkQdgNBtoZTiy2WEYSiK, source `channel/publishing-kit.html` (copy it to the scratchpad and publish with `url`); its data is built from the `<project>/publish.json` files): after every new video, add its card (titles, description, hashtags, keywords, pinned comment, TikTok and Instagram captions) and republish to the same URL (user, 2026-10-06).
- Topic order: follow `channel/PUBLISHING-PLAN.md` §4 (user, 2026-10-06: "go by the list"). Next: E3, E2, E1, D3, D6, E4, A6, …

## Paid tools budget (user, 2026-10-06)

- vidIQ: the user is on the minimum plan; use it sparingly, a little at a time. Check `vidiq_balance` (free) before any paid call. At most one paid vidIQ call per video (for example a single title score), only when free methods (WebSearch, keyword data already recorded in earlier PUBLISH.md files) can't answer. Never batch several paid calls. Report the credits spent in the reply.
- Higgsfield: generate only the VO lines needed; re-generate only lines that changed.
- **Duration tolerance (user, 2026-10-06):** a finished VO anywhere from 45 s to 1:10 is acceptable. Inside that range do NOT spend credits or regenerate/trim/speed up audio to hit 60 s; just set the video length to the VO (+≈0.5 s hold) and move on. Only outside 45 s–1:10 shorten or extend.

## Design direction (user, 2026-10-06; applies to the next videos, finished ones stay as they are)

- Less background blur: the plate must read as a real scene with visible movement and detail (people and objects moving), not a wash.
- More design and beauty in the foreground, but minimalist: one idea per card, clear hierarchy, clean and precise. Keep the layout (glass cards, typed captions, gold numbers, flag, sources footer).
- The improved look (E2 v2: photo plate + motivated camera moves + minimal cards) was APPROVED by the user on 2026-10-06 ("камера движется… фон классный… бомба"). It is the series standard from now on.
- **Background = photo plate (user chose option 1, 2026-10-06; references: editorial photos with topic props sharp in the foreground — calculator, coins, folders, a graduation cap, a coin jar — and the topic's people/place softly defocused behind).** Generate one photoreal still per topic with Higgsfield `gpt_image_2_5` (9:16, ≈0.25 credits), prompt says "no text, no numbers, no letters, no logos"; check the result for any writing; upscale to 4K (`upscale_image`, 2 credits). All motion is code (`showreel/src/Plate.tsx`: motivated camera moves between per-beat focus points, slow push, snow/steam/light). Only a light blur (≈0.8 px). No video-generation model is used; numbers stay in code.
- Minimal foreground (`showreel/src/E2v2.tsx` is the reference): one smoked-glass card per beat in the lower third, overline label with a short gold rule, one gold-gradient hero number that rises out of a mask, a gold hairline under it, one supporting line; a light sweep on entry; a slim persistent strip of pills (key figure + levers ticking on) instead of a big board; captions top-left; the photo's subject stays visible in the middle.
