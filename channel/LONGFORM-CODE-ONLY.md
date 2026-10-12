# TAX SECRETS CANADA — Code-only video production system (user, 2026-10-11; replaces the Kling rules)

Applies to long-form videos from LF-02 on. LF-01 stays as rendered.

1. **No Kling, no external AI video generators** (no image-to-video / text-to-video). The whole video is built with code and tools in this environment. Build, render, inspect and fix the real video; never stop at prompts or storyboards.
2. **Toolkit (Claude chooses):** Remotion + React, HTML/CSS/SVG, Canvas, FFmpeg, Python, JS/TS; available image tools for realistic still backgrounds/assets (Higgsfield stills allowed), then animated in code. Never claim a tool that was not used. Procedural effects are not presented as live-action footage.
3. **Background always moving:** multi-layer parallax (foreground / middle / background layers), simulated push-in, pull-back and lateral moves, perspective and depth movement, animated light, reflections, shadows, screen glow, focus-like transitions, atmospheric depth, procedural environmental motion, animated documents/charts/desk objects, seamless transitions. No static photo as the finished background; no repeated zoom on the same image; camera behaviour and composition change with the narration. Every shot has a start, a progression and an end composition.
4. **Foreground fully in code:** ALL-CAPS headlines, large figures, dark-glass panels, bracket tables, deduction breakdowns, formulas, bar/line charts, province comparisons, timelines/diagrams, sources/footnotes, verdicts. Structured data separate from presentation; no generated image ever carries a figure or table.
5. **Typography:** ALL CAPS for every headline, panel title, table heading, category label; large bold high-contrast, mobile-readable; navy/charcoal, translucent glass, white text, restrained gold, purposeful Canadian red; primary numbers dominate; dense tables split into sequential states.
6. **Motion system (real code, reusable, controllable duration/easing/opacity/position/blur/scale/masks/particles):** glass reveal · directional slide · mask wipe · focus reveal · light sweep · staggered data reveal · count-up (only real calculations) · glass fade · vapor dissolve · particle dissolve · defocus exit · morph transition · collapse to result. Vary entrances/exits, consistent brand style, never at the cost of readability.
7. **Timeline per segment:** narration · start/end · background composition · camera simulation · foreground graphics · entrance/exit · data reveal order · SFX (interface, paper, calculator clicks, subtle transitions; VO stays dominant) · transition.
8. **Accuracy:** CRA / Government of Canada / provinces / StatCan; tax year, thresholds, assumptions; structured data; arithmetic checked independently (build.py checks); no invented figures; estimates not presented as guarantees; screen = data = narration.
9. **Production steps:** research → script → scene-by-scene plan → background assets and procedural environments → animations and graphics in code → VO sync → **20–30 s test render → inspect and fix** → full render 1920×1080 → inspect the exported MP4 → fix → deliver MP4 + project files. Never claim a render/test/inspection that did not happen. No publishing or scheduling without approval.
10. **Standard:** cinematic movement + code-generated glass graphics + large typography + purposeful effects + verified financial information. Claude decides the technical implementation.

## Engine work needed before LF-02 (Claude's notes)
- Layered parallax plates: split a still into depth layers (foreground objects / desk / window) and move them at different speeds; animated lamp light, screen glow, reflections, dust; several camera paths per scene.
- Effect library in `showreel/src/lf/Panels.tsx`: the 13 effects above as reusable entrance/exit options per panel.
- ALL-CAPS typography system with a bold condensed face.
- SFX bed (paper, calculator click, soft whoosh) mixed under the VO.
