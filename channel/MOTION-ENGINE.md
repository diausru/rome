# Motion engine v1 (card-format reels), 2026-10-12

An upgrade of our existing Remotion pipeline, not a redesign. Studied: marketing-skill (github.com/marcosmodly/marketing-skill, MIT, commit fed7a2a). Ported pieces are credited in `tools/THIRD_PARTY.md`.

## 1. What the reference does (inspected)
| Part | What it is | Used? |
|---|---|---|
| `scripts/video/render.js` | HTML page per video → Playwright/Chromium frame capture → FFmpeg (1080×1920, 30 fps, −14 LUFS); `--check` lints the DOM timeline (safe zone 60/960/150/1450, overflow, collisions), retention rules (text on frame 0, text on screen long enough to read at ~4 words/s, nothing static >3 s) | Rules ported to `tools/reel_check.py`; renderer **not** adopted (Remotion already renders our React compositions in Chromium; replacing it would be a redesign) |
| `scripts/video/captions.js` | word timing from the clip's own pauses (10 ms loudness, 0.15 s pauses, DP that shares words over spoken runs by letter weight, cuts preferred after punctuation); chunks ≤4 words / 22 chars / 1.8 s; current word highlighted | Ported to `tools/words.py` (Python, same algorithm). Optional Whisper path not ported (no model download) |
| `scripts/video/soundtrack.js` | 11 procedural music genres + synthesized effects (pop, swish, whoosh, tick, chime, boom, riser…) in the music's key; a sonic logo at the end | Effects ported to `tools/sfx.py`; our own music beds (`tools/music.py`) kept; the sonic-logo idea adopted with our own fixed key |
| `scripts/video/compose.js`, `templates/*.html`, `brand.js` | numbered script → narrated page; 29 HTML templates; brand colours/font applied to a page | Not used: generic templates and look. Idea kept: one script line per scene, the hook on screen from frame 0 |
| `voice.js` (Kokoro), `media.js` (Pexels/Pixabay/Openverse) | free local TTS, stock media search | Not used: our voice is Grady (ElevenLabs via Higgsfield); plates are our generated stills |
| `references/hooks.md`, `sound-guide.md`, `video-rendering.md` | hook patterns, cue density (≈1 per 3 s under a voice), loudness targets | Rules applied (see checks) |

## 2. What is now in our system
- `showreel/src/motion/brand.ts` — brand tokens (navy / charcoal / blue-gray, white, restrained gold, Canadian red, dark glass, Mont), safe area, layout zones.
- `showreel/src/motion/Engine.tsx` — reusable, deterministic components:
  - `Kinetic`: ALL-CAPS headlines, words rising out of masks with stagger, from any direction; `now` = already on screen at frame 0 (the cover) and settling; lift-and-blur exit.
  - `Tag`: floating topic labels entering from different directions, slow float, particle dissolve on exit.
  - `Glass`: dark-glass panel; entrances `glass` (blur → clear), `slideL/slideR`, `wipe` (mask), `focus`; exits `fade`, `vapor` (particle dissolve), `collapse` (to a point); one restrained light sweep; gold border glow when `lit`.
  - `Tile`: narration-driven highlight (border lights, glow, value rises from a mask, ✓/✕ stamp, dims when focus moves on).
  - `Count`: count-up from verified data; the last frames always show the exact value.
  - `Stamp`, `Vapor`, `Captions` (word-synced chunks, the word being spoken in gold), `Depth` (foreground bokeh parallax + slow light leak over the still plate: simulated motion, not live footage), `NavyGrade`.
- `tools/words.py` — word timings per beat from the real Grady clips → `<p>-words.json`.
- `ny/reel.json` — the reel spec: hook text and tags, **cue anchors** (beat + spoken word → time), panel layout boxes, hold after the VO. `tools/reel_cues.py` resolves anchors once; the same time drives the visual event (`<id>-cues.json`) and its sound (`sfx-cues.json`), so they can't drift.
- `ny/data.json` — verified figures and sources, separate from presentation; derived numbers are computed in the composition.
- `tools/sfx.py` — the Tax Secrets Canada sonic identity: swish/whoosh/tick/chime/pop/impact/riser and the sonic logo (A4 → D5 → F#5, home on D5 + A5 bells), always in D major.
- `tools/mix_reel.py` — voice on top, music ducked (−24 LUFS bed), effects at −27 LUFS lightly ducked, whole mix −14 LUFS, TP ≤ −1.5.
- `tools/reel_check.py` — automated QC (writes `<p>/QC-REPORT.md`, exits 1 on a failure): format/frames/decode, length ≥ VO + hold, loudness −14 ± 0.6, true peak ≤ −1, bright hook text in frame 0, declared boxes inside the safe area (right edge 960 below y 1100 for the Reels buttons), captions never under a live panel, caption timing and chunk sizes, pacing (>3 s static, advice), sound density, and **facts** (example numbers recomputed from data.json and found, as words, in the narration).

## 3. Per-reel pipeline (from the next card reel)
1. Research + VO as before (Grady, `vo_hf.py`).
2. `python3 tools/words.py <p>/vo-beats.json <p>/vo showreel/src/<p>-timeline.json showreel/src/<p>-words.json`
3. Write `<p>/data.json` (verified numbers + sources) and `<p>/reel.json` (hook, tags, anchors, layout).
4. `python3 tools/reel_cues.py <p>/reel.json showreel/src/<p>-words.json showreel/src/<p>-timeline.json showreel/src/<id>-cues.json <p>/sfx-cues.json`
5. Music bed to the sonic logo (`tools/music.py <mood> <logo+0.45>`, loudnorm −24), `tools/sfx.py <p>/sfx-cues.json <dur> sfx.wav`, `tools/mix_reel.py vo.wav music.wav sfx.wav <dur> mix.wav`.
6. Composition on the engine (template: `showreel/src/NyV3.tsx`), stills → fix → render → mux.
7. `python3 tools/reel_check.py <p> <final.mp4>` + visual review of the contact sheet.

## 4. Limits (honest)
- Word timing is estimated from pauses and word length, not forced alignment; the reference reports ~50 ms mean error on synthesized speech; not re-measured here.
- The safe-area check lints the **declared** layout boxes in reel.json, not the rendered DOM; text overflow inside a box is caught by visual review (it caught two in the sample).
- Backgrounds remain generated stills animated in code (camera moves, parallax bokeh, light leak, snow, steam); there is no live footage.
- Audio cannot be judged by ear here: levels are measured; the user listens.
