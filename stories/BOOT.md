# STORIES BOOT — "Real Situations" weekly series (added 2026-11-03)
Source of truth for content: `stories/TAX_STORIES_PROMPT.md` (Parts A–C, 12 episodes). Read ONLY the episode section you build + Part A + Part C.
Cadence: 1 episode / week, 16:9 1920×1080 30 fps, 7–10 min, English. Separate from Shorts and LF (do not read `longform/` or Shorts docs).

## Channel rules that OVERRIDE the prompt file (repo CLAUDE.md wins)
- AI video ALLOWED for Stories only (owner 2026-11-04, style v2): mascot clips via Higgsfield `seedance_2_5` (start_image = photoreal frame). Shorts/LF rules unchanged (no AI video there).
- Facts: every rule/limit/number re-checked on canada.ca / CRA / laws-lois / fintrac-canafe / osb (gov) before render. Secondary sources in Part C (TaxTips, TD, Fidelity, RBC, PwC…) are NOT enough → confirm on a government page or mark `[VERIFY]` and do not ship. "Verify before publishing" list → top of `upload.txt` + `QA_NOTES.md`.
- Never change Part B numbers silently: if a number disagrees with canada.ca → stop, write `QA_NOTES.md`, ask.
- Long-standing channel rules apply in full (same as `longform/BOOT.md` "Rules (hard)"): numbers as words in VO, "C R A / R R S P / T F S A" spelled, open-loop hook, mid re-hook ~60 %, last line = bridge to next story + "Subscribe, so you don't miss it.", vidIQ ≤15 credits, 1 NexLev search, 1 batch VO, 1 batch images, 1 contact sheet, 1 fix pass, 1 render, no polling.
- VO: Grady ONLY — Higgsfield `text2speech_v2`, variant `elevenlabs`, preset `e2a2d2e6-9ed2-59cd-82af-feaa27f8a678`. Prompt file's ElevenLabs settings ignored. Grady = off-screen narrator.
- Images: Higgsfield `gpt_image_2_5` 16:9, illustrated style A4, prompt ends "No text, no numbers, no letters, no logos."; numbers/text only in code.
- Handles: every `@canadataxwizard` → Instagram `@taxsecretscanada`; YouTube `@TaxSecretsCanada` (search "Tax Secrets Canada"); TikTok `taxsecretscanada`. CTA + description show Instagram + YouTube.

## Style (NEW, owner 2026-11-04) — story-told, NO host
- No host anywhere: drop all "Host …" scenes/expressions/host thumbnails from the prompt file. Hook/Rules/Takeaways/CTA open on story panels or kinetic type instead.
- Part 1 = the STORY: illustrated panels change with the narration (one panel per VO beat, ~6–12 s each); each panel "comes alive" in code — push-in/pan, 3-layer parallax (bg-removed character/props), light flicker, steam/snow/paper particles, phone screens & documents animated as code overlays, timeline chips (Year 1 → Year 2).
- Turn = hard cut + thud + the letter/bill built in code.
- Part 2 = the SOLUTION, exact and step by step: rule cards with source tags, animated calc (L1–L4 rotate), numbered step cards, "without fix vs with fix" split, 3 takeaways.
- Thumbnail: story character panel (left) + 3–4 word text + red/green number badge, all text in code.
- Publishing / Metricool only on explicit command. Altered-content flag reminder in `upload.txt`.
- Git: branch `claude/quirky-keller-5cbtln`, commit + push per episode, no PR.

## Pipeline (`/story [N]`)
1. Episode N section → `stories/epNN/script.json` (scenes, VO, on-screen, calc). 2. Facts check → `FACTS.md`.
3. Character sheet + panels (1 batch) → contact sheet → fix once. 4. VO (1 batch) → word timestamps.
5. Remotion composition (reuse `showreel/src/lf/` engine; calc layouts L1–L4 rotate; captions; source tags; disclaimer 0:20; end card).
6. Render → stills sheet QC → `upload.txt` (title, description, chapters, 10 tags, verify list, AI-disclosure) → commit, push, send file. Stop.

## Engine notes (from Ep01, 2026-11-04)
- Template episode: `stories/ep01/` (lines.py → data.py → gen_episode.py). Story panels: `showreel/src/lf/Story.tsx` (chip, phone, roomyears, months, ledger, versus, stepcards, srctag, lower, stamp, endcard) on the LongForm composition (shots + depth plates).
- Plates: character sheet first (1 image), then panels with `medias:[{role:'image_references', value:<sheet job id>}]`; `longform/tools/plate_local.sh stories/epNN stNN` (depth maps) → then plates/*.png → jpg for git.
- VO download: `DATE=YYYYMMDD START=HHMM xargs -P30 -n2 longform/tools/vo_find.sh < jobs.txt` in the foreground (backgrounded `&` gets killed). Whisper: `python3 longform/tools/vo_words.py stories/epNN`.
- Render: this container needs `GL=swangle` (angle renders black plates): `GL=swangle nohup bash longform/tools/finish.sh stories/epNN stNN STNN-1080p.mp4 > showreel/out/lf/stNN_finish.log 2>&1 &` (~5 min per 1,500 frames).
- Thumbnail: PIL on a story plate, text in code (Nunito-900), red badge.

## STYLE v2 (owner 2026-11-04, replaces the illustrated v1 look of Ep01)
- Narrator on screen = MASCOT only: smooth white 3D figure (~60 cm), red cap with white front + red maple leaf, red knitted scarf with white maple leaf (`stories/assets/mascot_main.png`, Higgsfield media 345cbc5d-bfd1-4622-994b-bd24f453af4a). He runs, points, gestures, reacts; voice = Grady.
- Everything else = photoreal, 4K-looking real life: real people, real Canadian places, natural light. No illustration/cartoon backgrounds.
- Pipeline per beat: `gpt_image_2_5` 16:9 high 2k photoreal frame with mascot reference → `seedance_2_5` image-to-video (start_image, 1080p, no audio, camera move in prompt) → clip under VO in Remotion.
- Code on top: light leaks / lens flares / film grain, running ticker (бегущая строка), paper cards + numbers, source tags, end card.
- Pilot first (hook ~45 s) → owner OK → full episode.

## STYLE v4 (owner 2026-11-05) — current
- No mascot, no AI video. Higgsfield = still images only (`gpt_image_2_5` photoreal 16:9, Maya reference media 47db7874-1bb5-41ed-901f-a45c6b690a82).
- Background: photoreal plates with depth parallax (2.5D) + FilmFX (light leaks on cuts, flare, grain); `film: true`.
- All cards = frosted glass windows (Story.tsx v4 theme) with running edge light; text appears with rotating effects (type / rise / decode / mask / glow); numbers roll.
- Captions: `captions: true` → word-level morph-assemble (letters fly in and lock, no haze), spoken word on red pill. No bottom ticker.
- Template: `stories/ep01r/`. Render: `CH=900 GL=swangle bash longform/tools/finish.sh stories/epNN stNN OUT.mp4`.
