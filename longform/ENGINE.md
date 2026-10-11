# Long-form engine — "machine #1" (built 2026-10-11)

Purpose: every 10–15 min episode is made by writing DATA, not new code. One Remotion composition (`showreel/src/lf/LongForm.tsx`, id `LongForm`, 1920×1080) renders any episode JSON in the Face-off visual language (`channel/LONGFORM-FACEOFF.md`).

## Per-episode workflow (cheap path)
1. Research + facts → `longform/lfNN-slug/BIBLE.md`; numbers from `longform/tools/taxcalc.py` (never by hand).
2. Script → Grady lines → `lfNN-slug/vo/L1.mp3 …` (Higgsfield, one file per line).
3. Write `lfNN-slug/episode.src.json` (VO line list + events keyed to lines with `"at":"L12"`).
4. `python3 longform/tools/build.py longform/lfNN-slug/episode.src.json` → `vo.wav` (placed, −14 LUFS), `episode.json`, `timeline.txt`.
5. `longform/tools/render.sh longform/lfNN-slug` → `showreel/out/lf/lfNN-slug.mp4` + automatic QC (specs, black frames, loudness, 12-frame contact sheet). Test a part with `FRAMES=0-899 render.sh …`.
6. Look at one contact sheet; fix data, not code; re-render.

Speed: `--gl=angle` is ~4.5× faster than the default here; measured 49 s demo (1,470 frames) in ≈100 s on 4 cores → a 15 min episode ≈ 30–35 min of render (estimate from that rate).

## Event types (src/lf/LongForm.tsx)
| type | fields | use |
|---|---|---|
| hook | items[{name,value}], question | first 5 s: contenders VS + question |
| statement | text, label?, sub?, gold?, size? | one big line / reveal |
| chapter | num, title | chapter card (also set `chapters` for the top-left label + progress bar) |
| card | label, value (number→counter or text), prefix?, suffix?, dec?, line?, side left/right/center | hero number card |
| caption | text, cps? (`overlay:true`) | typed film-title caption top-left |
| contenders | title?, items[{name,tag?,value?,badge?}], focus? (index to highlight) | the players / rounds |
| score | criteria[], rows[{name,scores[0–5 or null]}], reveal (last revealed criterion), lead? | evolving face-off scoreboard |
| bars | title, items[{label,value,hl?,text?}], prefix? | comparisons |
| flow | title, steps[{label,value,sign:'-'?}], gap? | gross → deductions → take-home |
| verdict | title?, awards[{label,name,why?}], gap? | final awards |
Common: `t`/`at`+`off`, `dur` (auto until next main event), `push` (camera push amount), `overlay`.
Persistent: desk world (code light + dust + breathing window light, or `plate` image with slow drift), brand marker + Canadian flag (1:2:1), chapter label, sources footer, progress bar, VO + optional music (`musicVol` ≈0.08).

## Tools
- `tools/build.py` — VO placement + event timing. `tools/render.sh` — render + QC. `tools/qc.sh` — QC only. `tools/taxcalc.py` — 2026 take-home for any income/province (scope limits listed in its header; cross-checked: reproduces `salary/calc.py` exactly at $100K for ON/AB/MB).
- Test episode: `longform/lf00-enginetest/` (tone placeholders, not tax data).

## To add when an episode needs it (not built yet, on purpose)
Icon family (SVG), province card, document/laptop props, generated desk plate (Higgsfield still), music bed choice.
