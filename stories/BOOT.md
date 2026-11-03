# STORIES BOOT — "Real Situations" weekly series (added 2026-11-03)
Source of truth for content: `stories/TAX_STORIES_PROMPT.md` (Parts A–C, 12 episodes). Read ONLY the episode section you build + Part A + Part C.
Cadence: 1 episode / week, 16:9 1920×1080 30 fps, 7–10 min, English. Separate from Shorts and LF (do not read `longform/` or Shorts docs).

## Channel rules that OVERRIDE the prompt file (repo CLAUDE.md wins)
- No AI video: every `SEEDANCE` mark → code motion in Remotion (push-in + parallax / kinetic cards). No Seedance/Kling.
- Facts: every rule/limit/number re-checked on canada.ca / CRA / laws-lois / fintrac-canafe / osb (gov) before render. Secondary sources in Part C (TaxTips, TD, Fidelity, RBC, PwC…) are NOT enough → confirm on a government page or mark `[VERIFY]` and do not ship. "Verify before publishing" list → top of `upload.txt` + `QA_NOTES.md`.
- Never change Part B numbers silently: if a number disagrees with canada.ca → stop, write `QA_NOTES.md`, ask.
- VO: Higgsfield `text2speech_v2` / `elevenlabs` (voice to be confirmed by owner — host in file is a woman). Images: Higgsfield `gpt_image_2_5` 16:9, illustrated style A4; numbers/text only in code.
- Publishing / Metricool only on explicit command. Altered-content flag reminder in `upload.txt`.
- Git: commit + push per episode, no PR.

## Pipeline (`/story [N]`)
1. Episode N section → `stories/epNN/script.json` (scenes, VO, on-screen, calc). 2. Facts check → `FACTS.md`.
3. Character sheet + panels (1 batch) → contact sheet → fix once. 4. VO (1 batch) → word timestamps.
5. Remotion composition (reuse `showreel/src/lf/` engine; calc layouts L1–L4 rotate; captions; source tags; disclaimer 0:20; end card).
6. Render → stills sheet QC → `upload.txt` (title, description, chapters, 10 tags, verify list, AI-disclosure) → commit, push, send file. Stop.
