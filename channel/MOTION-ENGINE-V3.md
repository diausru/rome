# TAX SECRETS CANADA — Motion Engine v3 (card-format Reels)

User rule, 2026-10-12: upgrade the Reels with the strongest rendering, animation, sound-design and QC techniques of
`github.com/marcosmodly/marketing-skill`, **without** changing the brand (dark navy / charcoal / blue-gray scenes,
white type, restrained gold, purposeful Canadian red, transparent dark-glass panels, large mobile-readable figures,
ALL-CAPS headlines and labels, realistic financial-documentary imagery). No Kling, no video-generation model:
everything is built and rendered in code. Verified numbers live in data files, never in presentation code.
Nothing is published or scheduled without explicit approval.

## 1. What the reference actually does (inspected 2026-10-12; cloned read-only to the scratchpad, nothing executed)

| Area | Reference implementation | Decision |
|---|---|---|
| Rendering | Playwright/Chromium screenshots of HTML pages; every frame seeks all CSS/WAAPI animations; ffmpeg libx264 crf 18, 30 fps, parallel segments + concat | **Not adopted as a renderer**: Remotion already renders frame-exactly with the same Chromium; adopted 30 fps, crf 18, yuv420p, AAC 192k |
| Easing | rise `(.2,.8,.2,1)`, wipe `(.7,0,.25,1)`, pops with overshoot `(.2,.9,.3,1.25)` / `(.2,1.5,.4,1)` | **Adopted** rise and wipe; overshoot pops **rejected** (too playful for the brand); added a calm `settle (.16,1,.3,1)` |
| Hook | text on screen from frame 0 (`.now`, settle only), staggered `--in` reveals ≈0.35 s apart | **Adopted**: cover-safe headline on frame 0 + staged tags/emphasis |
| Captions | 10 ms dB envelope → speech runs (pauses ≥ 0.15 s) → DP word distribution by letter weight → chunks ≤ 4 words / 22 chars / 1.8 s, whole chunk in, spoken word highlighted; `.srt` | **Ported** to `tools/words.py` (numpy); highlight in brand gold on a dark-glass strip instead of yellow on black stroke |
| Count-up | CSS `@property` integer counter | **Re-built** as `CountUp` (lands exactly on the verified value, cents optional) |
| Sound | synthesized music (11 genres) + SFX; voice levelled, bed 7 dB under, `sidechaincompress=threshold=0.008:ratio=3:attack=40:release=450`; master −14 LUFS with a 4× oversampled true-peak limiter loop to ≤ −1 dBTP | **Ported** the mix/master chain to `tools/sfx_mix.py`; SFX re-synthesized as a restrained brand set; meme cues (air horn, rimshot, trombone) **rejected** |
| QC | lint: text outside safe zone (x 60–960, y 150–1450), overlaps, text on frame 0, reading time, static > 3 s; loudness ±0.6 LU, TP ≤ −1 | **Ported** as checks on the rendered MP4 in `tools/check_v3.py`, plus black frames, specs, full decode, data reproducibility |
| Templates | 29 TikTok/marketing templates (memes, stickers, chats, tier lists) | **Rejected** (generic look, not our identity) |
| Stock media / Kokoro voice / Whisper | Pexels/Pixabay keys, local TTS, HF models | Not needed: we keep Grady (ElevenLabs via Higgsfield) and code-animated photo plates |

## 2. What v3 adds to our system

- `showreel/src/motion/Engine.tsx` — brand tokens (`BR`, `SAFE`), easings (`EZ`, `tw`), and components:
  `FloatTag` (topic tags drifting in from different sides, blur → clear, gentle float), `MaskHeadline` (ALL-CAPS lines
  rising out of masks, `*word*` in gold, `now` = on screen from frame 0), `Sweep` (underline wipe), `GlassPanel`
  (enter: glass / slide-left / slide-right / wipe / focus; exit: fade / vapor particle dissolve / collapse; light sweep;
  `active` lights the border amber-gold and the label), `Row` (progressive table row, divider draws, active gold bar),
  `CountUp`, `Bar`, `Dust` (two parallax layers for depth), `Captions` (word-level, chunked, safe-area placed).
- `tools/words.py` — word timings + caption chunks + `.srt` from the real VO audio.
- `tools/sfx_mix.py` — brand SFX (swish, whoosh, tick climbing the D-major pentatonic, glint, boom, 3-note sonic logo
  D–F#–A→D) + voice/bed/SFX mix with ducking + −14 LUFS / ≤ −1 dBTP mastering.
- `tools/check_v3.py` — automated QC on the MP4 (specs, decode, loudness, true peak, black frames, static stretches,
  text on frame 0, safe-area heuristic, caption rules, SFX density, data reproducibility, contact sheet).
- One shared timeline per Reel (`<project>/make_timeline.py` → `timeline.json`): beats, key-word times, scene cuts and
  SFX cues. The composition and the mixer read the same file, so a number lands with its word and its sound.
- Data separation: `<project>/make_data.py` → `data.json` from the verified calculation; the composition only formats.

## 3. How to make the next Reel with v3

1. Facts + calculation (`calc.py`), then `make_data.py` → `data.json`.
2. VO as before (Grady, one line per beat) → `vo_place.json`, `lines.json`, processed line WAVs.
3. `python3 tools/words.py lines.json <proc_dir> vo_place.json words.json --srt reel.srt`
4. `make_timeline.py` (name the key words; place cues: scene changes + key reveals, ≤ 2 per 3 s).
5. Music bed (`tools/music.py <mood> <seconds>`), then `python3 tools/sfx_mix.py timeline.json vo.wav music.wav mix.wav`.
6. Composition in `showreel/src/<Id>.tsx` using Engine components; copy timeline/data into `src/`, mix into `public/audio/`.
7. Stills at key times → fix → `npx remotion render … --codec h264 --crf 18 --pixel-format yuv420p --audio-codec aac`.
8. `python3 tools/check_v3.py out.mp4 timeline.json --data-cmd "python3 make_data.py" --data data.json --src <Comp>.tsx --sheet sheet.jpg`, then a visual pass.

## 4. Limitations (honest)

- Backgrounds are AI-generated stills animated in code (camera moves, parallax dust, light breathing); this is
  simulated motion, not live-action footage.
- Word timing is estimated from pauses and word length (no speech recognition); the reference reports ≈50 ms mean error
  for the same method. Captions keep the spoken words (numbers as words), so they match the audio exactly.
- The safe-area check is a pixel heuristic on sampled frames (bright, high-contrast type outside the zone); layout
  overlaps are judged on the contact sheet and stills, not linted from the DOM.
- The procedural music bed is simple; for videos over ≈45 s a licensed track can replace it (`tools/sfx_mix.py` takes any WAV).
