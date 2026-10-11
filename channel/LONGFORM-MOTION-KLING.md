# TAX SECRETS CANADA — Master motion design & Kling production rules (user, 2026-10-11)

Applies to long-form videos from **LF-02** on (not retroactive; LF-01 stays as rendered). Full text of the user's rules, condensed without losing any requirement.

## 1. Two coordinated layers in every scene
- **Layer A — realistic moving background generated with Kling AI**, topic-specific (not a permanent desk). Intentional, physically plausible motion: one primary camera move (slow dolly-in/out, lateral track, gentle pan, rack focus, subtle parallax, or locked camera + environmental motion) plus one or two secondary motions (page turn, hand on calculator, cursor, light across glass/paper, focus shift). A still photo with digital zoom is NOT the default.
- **Layer B — code-generated graphics** (Remotion/SVG/HTML): ALL-CAPS headlines, dark-glass panels, bracket tables, deduction breakdowns, big figures, formulas, charts, province cards, arrows, sources, verdicts. Kling never generates text, tables or figures.
- The two layers form one composition: negative space for panels, subject stays visible, background motion never destabilises text.

## 2. Typography
ALL CAPS for every headline, panel title, table heading, label, callout and takeaway. One premium bold condensed/editorial typeface for the channel. Mobile-readable; key figures are the largest elements; no paragraphs; split dense info into successive states. White/warm-white text, restrained gold, navy/charcoal glass, subtle Canadian red; green/red only for financial meaning. Sources and legal notes may be smaller but readable.

## 3. Motion design system (every effect has a purpose: attention, progressive reveal, relationship, anticipation, change, transition)
- **Entrances:** glass reveal · directional slide + settle · focus-to-clarity · mask wipe · light-sweep (sparingly) · staggered data reveal (title → rows → bars → total, in narration order) · count-up only for real accumulations, then hold.
- **Exits:** glass fade · soft vapor dissolve (subtle, short) · particle dissolve (major transitions only) · defocus + fade · directional wipe · morph (only between related graphics) · collapse into the key figure.
- Vary effects without chaos; subtle for routine info, stronger for hook/surprise/verdict; ease-in/out; no bouncing, spinning, glitches, lens-flare spam; nothing may obscure figures.

## 4. Kling prompt workflow — one prompt per shot, never one generic prompt
Structure: 1 subject & environment · 2 subject movement · 3 camera movement · 4 background movement · 5 lighting & materials · 6 timing & continuity · 7 realism & negative constraints. Concrete physical actions only. Master template (adapt every bracket):
"Ultra-photorealistic cinematic financial documentary footage of [SUBJECT/ENVIRONMENT]… SUBJECT MOVEMENT: […] CAMERA MOVEMENT: [one primary move], smooth, natural acceleration/deceleration, subtle parallax… BACKGROUND MOVEMENT: […] LIGHTING: premium practical lighting, realistic shadows/reflections… TIMING: continuous, no jumps or cuts, ends on a clean composition… STYLE: high-end live-action documentary… CONSTRAINTS: no CGI look, no cartoon, no morphing, no warped/duplicated objects, no deformed hands, no random people, no generated text, no logos, no watermarks, no cuts."
Reference examples (direction only, not reusable): tax-bracket desk push-in with a page turn; lateral track across three province folders; calculator key press with rack focus for a result.
Technical: Image-to-Video when an approved still must keep its composition (describe the motion explicitly); Text-to-Video for new scenes; short controllable shots; extra takes only to fix a defect; restrained camera where panels sit on top; review every clip for cuts, geometry changes, flicker, unnatural motion.

## 5. Per-shot camera spec (documented before generating)
Start framing · primary move · intensity · secondary movement · focus behaviour · end composition. No orbit, fast zoom, handheld shake or dramatic tilt unless the story justifies it.

## 6. Composition
Background = atmosphere and context; foreground = facts. Leave space for panels, translucent panels (not opaque white), never cover the whole frame, one headline at a time, primary figure dominant. Environment chosen per topic (paperwork, payroll, laptop, workplace, household budget, property…) with a consistent brand grade.

## 7. Voiceover-synchronised timing spec per segment
VO line · background shot + Kling prompt · start/end · camera move · panel content · entrance · data reveal order · exit · SFX (paper, calculator click, soft whoosh, restrained) · transition. Reveal on mention, emphasise on the spoken result, short pause before major results, enough reading time on mobile.

## 8. Data accuracy
Research (CRA / Government of Canada / provinces) → structured data separate from animation → totals checked (build.py checks) → graphics generated from the data → synced to VO → values match script and sources. Estimates labelled; key assumptions shown.

## 9. Pacing (10–15 min)
Visual question/conflict first; contenders; meaningful sequence; information change every 15–30 s; mix of footage, close-ups, panels, tables, charts, comparisons; strongest reveals at turning points and the verdict.

## 10. Production steps
1 Research · 2 Story & VO · 3 Shot design · 4 Kling prompts (I2V or T2V per shot) · 5 Foreground graphics from data · 6 Timeline · **7 Sample test: render and inspect a 20–30 s segment before full production** · 8 Full render 1920×1080 · 9 QC on the rendered MP4 · 10 Fix, re-render, deliver MP4 + script + timeline + sources + publishing package. Wait for approval before publishing/scheduling.

## 11. Quality gate (12 questions; any critical fail → fix before delivery)
Real-looking cinematography? Believable motion throughout? Camera move planned? ALL CAPS labels? Mobile-size figures? Professional entrances/exits? Varied but not distracting? Accurate tables/charts? Reveals match narration? Layers read as one composition? Any artifacts/illegible/incorrect/distracting? Rendered result actually inspected?

**Core principle:** realistic moving cinematography + large clear code-generated financial graphics + purposeful motion + verified facts.

## Notes for production (Claude)
- This explicitly overrides, for long-form from LF-02, the older channel rule "never handed to an external video-generation model": Kling generates **backgrounds only**; all text and numbers stay in code.
- Kling is reached through the Higgsfield connector (`generate_video`, Kling models); check the cost quote before each batch and record credits per video. Engine work needed before LF-02: video-plate support (per-scene background clips) and the new entrance/exit effect library in `showreel/src/lf/Panels.tsx`, ALL-CAPS typography system.
