# Remotion integration rules (user, 2026-10-12) — for upcoming tasks; nothing built or rendered yet

The user's brief (Remotion: https://github.com/remotion-dev/remotion, docs https://www.remotion.dev/docs/) adds these requirements to every future video task. **Status: recorded only.** The test sample, the new components and the report are made only on the user's command.

## Verified current state (checked 2026-10-12)
- Remotion is already the render engine: `showreel/package.json` has remotion, @remotion/cli, @remotion/transitions, @remotion/motion-blur, @remotion/three ^4.0.532 (installed 4.0.532).
- Existing parts to RETAIN and extend (not rebuild):
  - Long-form: `showreel/src/lf/` (`LongForm.tsx`, `Panels*.tsx` glass panels/tables/waterfalls/splits, `Kinetic.tsx` morph/decode/count-up, `Motion.tsx` opening/floating tags/active icons/progressive table, `Effects.tsx` 13 entrances/exits, `DepthPhoto.tsx` 2.5D parallax, `Parallax.tsx`); `longform/tools/` (build.py timeline + SFX mix, next_chunk.sh, qc.sh, vo_words.py, taxcalc.py, depth.py).
  - Reels: `showreel/src/motion/` (Engine.tsx v3, Reel.tsx v1, brand.ts); `tools/` (words.py, beat_words.py, sfx.py, sfx_mix.py, mix_reel.py, reel_check.py, check_v3.py).
- License (LICENSE.md in remotion-dev/remotion, read 2026-10-12): free, incl. commercial, for individuals, for-profit companies with up to 3 employees, non-profits; otherwise a Company License (remotion.pro) is required. The file notes the license changes slightly in Remotion 5.0. → Before commercial scale-up, the user confirms which tier applies to the channel's owner.
- Official "Remotion Agent Skills": not installed; check the current docs for the exact install method before using them (not verified yet).

## Rules for every future task
1. Inspect before changing: current scripts, deps, render flow, audio, components, QC → decide retain / improve / replace. No full rebuild.
2. Hard constraints: NO Kling, NO external AI video generators; Remotion + React + SVG + Canvas + CSS + FFmpeg. Never claim that code camera moves turn a still into live-action footage. Legit footage/assets may be reused (licence checked).
3. Visual system (reusable components, extend the existing ones): cinematic 16:9 layered parallax backgrounds; dark-glass financial panels; animated tables, tax calculations, comparisons, charts, diagrams; kinetic typography + staggered floating labels; count-ups, highlights, masks, light sweeps, blur-to-focus, controlled dissolves; VO-synced captions + restrained SFX; source citations and data callouts. Identity: dark navy/charcoal, restrained blue + amber, documentary realism, precise legible type.
4. **Retention Blueprint before any visuals** (in `<project>/BLUEPRINT.md`): opening question + promised result; first 30 s narration + visual direction; major developments and open questions; verified calculations, evidence, sources; final answer + practical next step. Meaningful development throughout; never delay a simple answer artificially.
5. **20–30 s 16:9 test before a full episode**: realistic moving background (genuine footage if suitable and licensed), animated glass panels, ≥1 calculation and ≥1 comparison chart, synced VO + captions + sound, purposeful entrances/exits. Render a real MP4 and inspect timing, readability, clipping, missing assets, A/V sync, render errors; fix before continuing.
6. Deliverables when the work is ordered: working project + components, exact setup/render commands, the sample MP4, a report (changed / works / incomplete / licensing), and a recommendation for the 10–15 min YouTube and the short-form pipelines.
7. Never mark anything completed unless it was executed and verified.
