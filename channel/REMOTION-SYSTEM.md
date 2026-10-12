# Remotion integration task (user, 2026-10-12) — recorded, NOT yet executed

Status: the user said "Нечего не создавай пока а просто включи дополнения к нашим инструкциям" — record the rules only. Nothing below is built, installed or rendered until the user gives the command. When executed, nothing is marked done unless it was actually run and verified.

## Full task text (verbatim)

Study and integrate Remotion into the existing TAX SECRETS CANADA video production pipeline.

Repository: https://github.com/remotion-dev/remotion
Official documentation: https://www.remotion.dev/docs/

1. Inspect before changing anything
* Inspect the current project, its scripts, installed dependencies, rendering workflow, audio pipeline, existing visual components, and quality checks.
* Determine which parts should be retained, improved, or replaced.
* Read the current official Remotion documentation and install the official Remotion Agent Skills if appropriate.
* Do not rebuild the entire project unnecessarily.

2. Hard constraints
* NO Kling.
* NO external AI video generators.
* Use code-driven production with Remotion, React, SVG, Canvas, CSS, and FFmpeg where appropriate.
* Do not claim that code-generated camera movement turns a still image into real live-action footage.
* Reuse available legitimate footage and visual assets when needed.
* Check Remotion licensing requirements before production or commercial deployment.

3. Build our visual system
Create reusable components for:
* Cinematic 16:9 backgrounds and layered parallax scenes.
* Transparent dark-glass financial panels.
* Animated tables, tax calculations, comparisons, charts, and diagrams.
* Kinetic typography and staggered floating labels.
* Progressive number reveals, count-up animations, highlights, masks, light sweeps, blur-to-focus, and controlled dissolves.
* Voiceover-synchronized captions and restrained sound effects.
* Source citations and financial-data callouts.
Preserve the TAX SECRETS CANADA visual identity: dark navy and charcoal, restrained blue and amber highlights, realistic financial-documentary atmosphere, precise typography, and legible information.

4. Build a retention-first production workflow
Before creating visuals, produce a Retention Blueprint:
* Specific opening question and promised result.
* First 30 seconds of narration and visual direction.
* Major story developments and open questions.
* Verified calculations, evidence, and sources.
* Final answer and practical next step.
The viewer must receive meaningful developments throughout the video. Do not delay a simple answer artificially.

5. Produce a test before a full episode
Create a 20–30 second 16:9 sample containing:
* A realistic background with genuine movement if suitable footage is available.
* Animated transparent financial panels.
* At least one calculation and one comparison chart.
* Synchronized narration, captions, and sound.
* Purposeful entrances and exits, not a slideshow of static cards.
Render an actual MP4. Inspect the rendered result for timing, readability, clipping, missing assets, audio synchronization, and rendering errors. Correct defects before proceeding.

6. Deliverables
* The working Remotion project and reusable components.
* Exact setup and rendering commands.
* The rendered sample MP4.
* A report describing what was changed, what works, what remains incomplete, and any licensing costs or restrictions.
* A recommendation for integrating the system into our existing 10–15 minute YouTube workflow and short-form content pipeline.

Do not mark any task as completed unless it has actually been executed and verified.

## Starting point already in the repo (inventory for step 1, checked 2026-10-12; to re-inspect when executed)

- Remotion is already the renderer: `showreel/` (`remotion` / `@remotion/cli`, `@remotion/transitions`, `@remotion/motion-blur`, `@remotion/three` ^4.0.532); config `showreel/remotion.config.ts` (local headless Chromium, `swangle` GL, JPEG frames).
- Existing components to retain/extend rather than rebuild: `showreel/src/Kit.tsx` (typed captions), `Plate.tsx` (photo plate + camera moves + scene cuts), `motion/Reel.tsx` (engine v1: kinetic type, tags, glass, tiles, count-ups, captions, depth) and `motion/Engine.tsx` (engine v3), long-form `src/lf/*` (LongForm, DepthPhoto 2.5D, Panels, Kinetic, Parallax, Effects) with `longform/tools/build.py` / `render.sh` / `taxcalc.py`.
- Audio and QC: `tools/vo_hf.py`, `beat_words.py` / `words.py`, `reel_cues.py`, `sfx.py` / `sfx_mix.py`, `music.py`, `mix_reel.py`, `reel_check.py` / `check_v3.py`.
- Footage: the pipeline uses generated stills animated in code; "genuine movement" needs licensed real footage (none in the repo yet); otherwise describe motion honestly as code-animated stills.

## Licensing (read from the installed package's `node_modules/remotion/LICENSE.md`, 2026-10-12)

Free License: individuals; for-profit organizations with up to 3 employees; non-profits; evaluation. It allows commercial video creation. Larger for-profit organizations need a paid Company License. The file notes that the license changes slightly in Remotion 5.0. Before any commercial deployment, confirm which tier applies to the channel's owner and re-read the current terms (remotion.dev "License and terms").
