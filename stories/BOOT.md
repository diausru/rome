# STORIES BOOT — "Real Situations" weekly series (added 2026-11-03)
Source of truth for content: `stories/TAX_STORIES_PROMPT.md` (Parts A–C, 12 episodes). Read ONLY the episode section you build + Part A + Part C.
Cadence: 1 episode / week, 16:9 1920×1080 30 fps, 7–10 min, English. Separate from Shorts and LF (do not read `longform/` or Shorts docs).

## Channel rules that OVERRIDE the prompt file (repo CLAUDE.md wins)
- No AI video: every `SEEDANCE` mark → code motion in Remotion (push-in + parallax / kinetic cards). No Seedance/Kling.
- Facts: every rule/limit/number re-checked on canada.ca / CRA / laws-lois / fintrac-canafe / osb (gov) before render. Secondary sources in Part C (TaxTips, TD, Fidelity, RBC, PwC…) are NOT enough → confirm on a government page or mark `[VERIFY]` and do not ship. "Verify before publishing" list → top of `upload.txt` + `QA_NOTES.md`.
- Never change Part B numbers silently: if a number disagrees with canada.ca → stop, write `QA_NOTES.md`, ask.
- Long-standing channel rules apply in full (same as `longform/BOOT.md` "Rules (hard)"): numbers as words in VO, "C R A / R R S P / T F S A" spelled, open-loop hook, mid re-hook ~60 %, last line = bridge to next story + "Subscribe, so you don't miss it.", vidIQ ≤15 credits, 1 NexLev search, 1 batch VO, 1 batch images, 1 contact sheet, 1 fix pass, 1 render, no polling.
- VO: Grady ONLY — Higgsfield `text2speech_v2`, variant `elevenlabs`, preset `e2a2d2e6-9ed2-59cd-82af-feaa27f8a678`. Prompt file's ElevenLabs settings ignored. On-screen host = a man matching the voice (replaces the woman in A4/A6; same outfit colours, same 4 expressions).
- Images: Higgsfield `gpt_image_2_5` 16:9, illustrated style A4, prompt ends "No text, no numbers, no letters, no logos."; numbers/text only in code.
- Handle: replace every `@canadataxwizard` → `Instagram taxsecretscanada` (no "@"); cross-promo TikTok taxsecretscanada.
- Publishing / Metricool only on explicit command. Altered-content flag reminder in `upload.txt`.
- Git: branch `claude/quirky-keller-5cbtln`, commit + push per episode, no PR.

## Pipeline (`/story [N]`)
1. Episode N section → `stories/epNN/script.json` (scenes, VO, on-screen, calc). 2. Facts check → `FACTS.md`.
3. Character sheet + panels (1 batch) → contact sheet → fix once. 4. VO (1 batch) → word timestamps.
5. Remotion composition (reuse `showreel/src/lf/` engine; calc layouts L1–L4 rotate; captions; source tags; disclaimer 0:20; end card).
6. Render → stills sheet QC → `upload.txt` (title, description, chapters, 10 tags, verify list, AI-disclosure) → commit, push, send file. Stop.
