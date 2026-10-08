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

- vidIQ (user, updated 2026-10-06: the user is buying a subscription and WANTS demand/interest research with it, minimal requests): check `vidiq_balance` (free) first. Per video, BEFORE writing the script: one `vidiq_keyword_research` call (mode `questions` or `research`, country CA) to see what people actually search and ask, and use it to pick the hook and the first-frame wording; after the render, at most one `vidiq_score_title` for the chosen title. Never batch extra calls. Report the credits spent. If the balance is 0, fall back to WebSearch and recorded data and say so.
- **[SUPERSEDED by the 25-credit cap below] vidIQ full research per video (user, 2026-10-08; supersedes the minimal rule above, balance ≈1,850, renews Nov 6):** for every new video run, before the script: keyword research (CA), viewer questions (`questions` mode), competitor analysis (top / outlier videos on the topic: what they promise, length, angle, what they miss) and a trend check (demand growth vs baseline, rising terms); after the render, score ALL THREE title variants (`vidiq_score_title`, 5 credits each) and pick the primary from the scores. Record everything in PUBLISH.md / publish.json and report the credits spent.
- Higgsfield: generate only the VO lines needed; re-generate only lines that changed.
- **vidIQ analysis per video (user, 2026-10-08; from the video after C5 on): HARD CAP 25 credits per video, measured by `vidiq_balance` before and after; applies to long-form videos too (user, 2026-10-08).** For long-form the default plan swaps "Shorts outliers" for long-form competitor/outlier videos on the topic. Claude picks the most useful calls within the cap. Default plan (25): keyword research `research` CA (5) + top competitor videos `vidiq_youtube_search` CA by views (5) + Shorts outliers for the topic (5) + score the two strongest titles (2 × 5). Skip `questions` and `comment_insights` unless a call is dropped to make room. Still publish the designed analysis Artifact page per video and report the credits spent.
- **Duration tolerance (user, 2026-10-06):** a finished VO anywhere from 45 s to 1:10 is acceptable. Inside that range do NOT spend credits or regenerate/trim/speed up audio to hit 60 s; just set the video length to the VO (+≈0.5 s hold) and move on. Only outside 45 s–1:10 shorten or extend.

## Design direction (user, 2026-10-06; applies to the next videos, finished ones stay as they are)

- Less background blur: the plate must read as a real scene with visible movement and detail (people and objects moving), not a wash.
- More design and beauty in the foreground, but minimalist: one idea per card, clear hierarchy, clean and precise. Keep the layout (glass cards, typed captions, gold numbers, flag, sources footer).
- The improved look (E2 v2: photo plate + motivated camera moves + minimal cards) was APPROVED by the user on 2026-10-06 ("камера движется… фон классный… бомба"). It is the series standard from now on.
- **Background = photo plate (user chose option 1, 2026-10-06; references: editorial photos with topic props sharp in the foreground — calculator, coins, folders, a graduation cap, a coin jar — and the topic's people/place softly defocused behind).** Generate one photoreal still per topic with Higgsfield `gpt_image_2_5` (9:16, ≈0.25 credits), prompt says "no text, no numbers, no letters, no logos"; check the result for any writing; upscale to 4K (`upscale_image`, 2 credits). All motion is code (`showreel/src/Plate.tsx`: motivated camera moves between per-beat focus points, slow push, snow/steam/light). Only a light blur (≈0.8 px). No video-generation model is used; numbers stay in code.
- Minimal foreground (`showreel/src/E2v2.tsx` is the reference): one smoked-glass card per beat in the lower third, overline label with a short gold rule, one gold-gradient hero number that rises out of a mask, a gold hairline under it, one supporting line; a light sweep on entry; a slim persistent strip of pills (key figure + levers ticking on) instead of a big board; captions top-left; the photo's subject stays visible in the middle.

## Pace: one video at a time (user, 2026-10-06)

- Work strictly one topic at a time: research → VO → plate → render → deliver, then STOP and wait for the user's command before starting the next topic or the next render. Do not prepare several topics ahead or queue several renders (the user has a time-based usage limit).
- Already prepared and waiting for the user's go (assets, compositions and docs committed; only render + delivery + kit card + vidIQ title score remain; from C3 on also the series upgrade: three scenes + bridge CTA): none left (D2, D5 delivered 2026-10-06; C3, F1, F5 delivered 2026-10-07; F4, C5 delivered 2026-10-08); next new topic per PUBLISHING-PLAN §4 (A4).

## Metricool: only on command (user, 2026-10-07)

- Never create, update or schedule anything in Metricool unless the user explicitly says so for that video. Per video: make the video, run the analysis and the publishing package, then STOP and wait. Prepared payloads may sit in `channel/metricool/schedule.json`, but nothing is sent.

## Series upgrade (user, 2026-10-06; from D5 on)

- **CTA = a bridge to the next video**, different every time: the last VO line names the next topic and asks to follow, e.g. "Next: why a small corporation pays nine percent. Follow so you don't miss it." The on-screen pill shows the next topic. One new Grady line per video (≈0.3 credits). No engagement bait.
- **Three photo scenes per video (option B)**: three plates of the same people/place in story order (e.g. morning at home → daycare door → evening receipts), each shown once, changed at a beat boundary where the meaning changes, with a designed code transition (directional motion blur + push, light sweep). Keep the people consistent (use the first plate as the image reference); check every plate for text. Cost ≈ 3 × (variants + 4K upscale).

## LONG-FORM YOUTUBE MODE (user, 2026-10-07; full text in `channel/LONGFORM-ENGINE.md`, queue in `channel/LONGFORM-QUEUE.md`)

- A separate product for YouTube only: 10–15 min (set by the story, never padded), 16:9 1920×1080, 24/30 fps. Pipeline: market research (vidIQ / NexLev / Metricool / web, whatever is connected) → concept doc → verified facts (claim · source · tax year · date checked · method) → full VO first (Grady) → one master timeline → code-rendered video → QC and re-render → thumbnails (3) + titles (5) → YouTube package, chapters, Shorts candidates (3–7), next ideas → report in the §43 format → update `longform/LONGFORM-BIBLE.md`.
- Topics go one at a time ONLY on the user's command, in the "Recommended initial production order" of `channel/LONGFORM-QUEUE.md` (first: "The Canadian Tax Brackets Explained With Real Numbers"). Every long-form topic must be completely different from the Shorts (new question, story, examples and visuals; see the queue file). Tax-software reviews are independent comparisons, sponsorship always disclosed. No TikTok/Instagram packages; never publish or schedule without explicit approval.
- **Face-off system (user, 2026-10-08; full text in `channel/LONGFORM-FACEOFF.md`):** core rule for every long-form video with a comparison/choice. One consistent desk world (no permanent talking head; at most one consistent human), story QUESTION → CONTENDERS → RULES → ROUNDS → SCORE → SURPRISE → FINAL FACE-OFF → VERDICT (~12 acts, 2–6 states each), conflict on screen in the first 5 s matching the thumbnail, one icon family, evolving evidence-based scoreboard (no fake or sponsor-favoured winner), information change every 15–30 s, reusable asset library (`longform/assets/`) built once and reused, ≈60–80 % code graphics / 20–40 % generated stills, every spoken number shown when spoken. Claude delivers the finished MP4, not a script or storyboard.
