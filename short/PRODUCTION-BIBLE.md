# Project production bible: live-action vertical Short

Governing document: `short/MASTER-SYSTEM.md` (Master System v1.0, saved 2026-10-05). This bible is the source of truth for continuity on the current project.

Legend: ✅ verified (source given) · 📝 decided by Claude, can be revised (record the reason when it changes) · ⏳ set at production start, when the subject is known

**CURRENT VERSION:** TAX CASE #001 v1 delivered: `taxcase/build/taxcase001_final_vo.mp4` (1080×1920, 24 fps, 55.000 s, 1320 frames, H.264 + AAC 48 kHz stereo, VO −14.1 LUFS). Code in `taxcase/`. Series bible below; it applies to every TAX CASE episode.

---

## 1. Project

| Field | Value |
|---|---|
| PROJECT NAME | TAX CASE series. Episode #001 "CRA Sent You a Letter. Don't Ignore It." |
| VIDEO OBJECTIVE | A 55 s cinematic miniature investigation of one fictional tax notice. Message: UNDERSTAND THE LETTER BEFORE YOU ACT. |
| TARGET AUDIENCE | Canadian taxpayers; the channel skews to retirees and pre-retirees (`channel/RESEARCH-2026-10.md` §3) |
| STORY | Envelope lands → opened → notice revealed → $2,460 → why? → the notice explains (amount, reason, deadline) → WAIT → page 2: check the details → the case file is closed |
| CHARACTERS | No on-screen person. The viewer is the investigator, with a seated point of view at the desk. The protagonist is the document. |
| CHARACTER APPEARANCE / WARDROBE | None on screen (D7) |
| LOCATION / ARCHITECTURE | One dark home-office desk; the room falls into charcoal darkness beyond the desk; a window off frame to the left |
| OBJECTS | #10 envelope; 2-page tri-folded notice (fictional "CANADA TAX NOTICE", Jordan Martin, Anytown MB, TC-001-58219, $2,460.00, due November 16, 2026); steel letter opener with a walnut handle; black ballpoint pen; charcoal ceramic mug; black metal desk lamp; charcoal paperboard case folder with the printed label "TAX CASE #001" |
| MATERIALS | Oiled walnut (procedural, flat-sawn rings, satin coat); 20 lb bond paper (0.11 mm, ivory albedo, fibre mottling, toner slightly glossier than the paper, translucency, show-through on the back); brushed steel; matte glaze; matte paperboard |
| LIGHTING | KEY: window daylight, camera-left, ~5600 K, soft (0.9 × 1.3 m source with a mullion cross). PRACTICAL: desk lamp behind-right, ~2700 K, warm pool. No rim lights, no volumetrics, no flares. |
| TIME OF DAY / WEATHER | Late afternoon, overcast daylight. Constant through the film. |
| COLOR PALETTE | Charcoal environment, warm ivory paper, walnut browns, a single restrained Canadian red accent (#9E1F24) used only for print and pencil marks |
| CAMERA LANGUAGE | Seated point of view and tabletop inserts. Real Super 35 sensor turned vertical (14 × 24.9 mm). Moves are slow dolly, slider tracking, push-in and rack focus, with operator micro-motion (sum of low-frequency sines; 0 on the locked-off WAIT). |
| LENS LANGUAGE | 35 mm (orientation and wides), 50 mm (inserts and reading), 85 mm at f/11 (macro cut). f/4–5.6 for reading, so the paper stays readable around the focus line. 9-blade iris. |
| ANIMATION LANGUAGE / PHYSICS RULES | Nothing moves without a cause. Paper panels fall by a hinged-plate ODE (gravity, quadratic air drag, restitution 0.18, 4° crease memory). The envelope is dropped from 11 cm, lands, bounces 1.4 mm, slides about 9 mm with friction, and its flex rings down. Pulling the letter drags the envelope 4 mm. Smootherstep easing on every camera move. |
| CONTINUITY RULES | Page 1 at (−0.015, 0.020) −2.5°, page 2 at (0.215, 0.050) +4°; the envelope after 7 s at (−0.205, 0.255) +11°; the pen at (0.165, −0.125) −28°. The red accent never changes. The light rig never changes. |
| VISUAL MOTIFS | The red print bar → the red pencil underline → the red label stripe on the case file |
| TRANSITIONS | Cuts on action (drop → blade → pull → panel fall); one locked-off stillness (WAIT) that starts moving into the next beat; the final cut to the case file |
| EDITING RHYTHM | 2.25 / 2.25 / 2.5 s inserts → 16 s long take with reveals every 2–4 s → 9 s unfold → 8 s stillness → 9 s checklist → 6 s payoff |

The earlier shoebox/records idea (topic A7) is **not** adopted. It was never confirmed, and it was designed around a video-generation pipeline that is now banned (§4).

## 2. Render settings (Master §5)

| Setting | Value |
|---|---|
| Delivery | MP4, H.264, 1080×1920, 9:16, 24 fps, 45–60 s, silent |
| Internal render | Cycles path tracing (CPU, 4 cores), 1080×1920 native, adaptive sampling + OpenImageDenoise, motion blur with a 180° shutter, AgX Medium High Contrast. Supersampling above 1080p was measured as too slow here (55 s per frame at 16 spp): known limitation. |
| Verification | `ffprobe`: resolution, duration, fps, stream integrity. Contact sheet for visual QC (Master §28) |
| Audio | None. Deliver a timing-marker sheet for VO / music / SFX / impacts (Master §27) |

## 3. Verified environment facts

| Item | Value | Source |
|---|---|---|
| FFmpeg | 6.1.1, includes zscale, colorspace, lut3d, noise, deband, cas, unsharp, minterpolate, tblend, dblur, gblur, vignette, lenscorrection | `ffmpeg -version`, `ffmpeg -filters` in this container |
| Remotion | ^4.0.532 with @remotion/motion-blur, /three, /transitions (in `showreel/`) | `showreel/package.json` |
| Node | v22.22.0 | `node -v` |
| Browser render path | Playwright + Chromium, frame-by-frame screenshots piped to FFmpeg | `reels/render.mjs` (earlier work in this repo) |
| Chromium | pre-installed at /opt/pw-browsers | environment notes |
| Higgsfield balance | 560.16 credits | `balance` tool, 2026-10-05. Not used for video under Master v1.0 |

## 4. Decisions already made

| # | Decision | Reason |
|---|---|---|
| D1 | **No external video-generation models** (Kling, Seedance, Higgsfield video, Veo, Runway, Sora…). The video is built with code: rendering, compositing, simulation. | Master v1.0 preamble. **This replaces** the earlier proposal (bible v0, 2026-10-05) to animate keyframes with Kling 3.0. |
| D2 | Still images (photographs, or generated stills such as GPT Image 2.5) may be used **only as static source plates or textures** inside the code pipeline. All motion, camera, light and compositing come from code. | 📝 The Master says "any other technically appropriate methods" and bans only handing the work to video models. This repo already used still plates this way (`reels/plates/*.png` → `reels/render.mjs`). Revise if the user objects. |
| D3 | Architecture is separated into scene data / animation logic / camera logic / visual components / timeline / render config | Master §24 |
| D4 | No music, VO or sound design in deliverables; markers only | Master §27 |
| D6 | Pipeline: Blender 4.5.14 LTS as a Python module (bpy from PyPI) → Cycles. Every animated value is computed in Python and keyed on every frame (true motion blur). Post in numpy/Pillow: red-pencil marks multiplied into the paper, halation, vignette, lateral CA, luminance grain, no sharpening → x264 BT.709. | Path tracing gives physically correct light, shadow, DoF and materials. Measured cost: ≈1.3 s/frame preview, ≈25 s/frame final. |
| D7 | **Hands stay just outside frame** (insert-shot grammar): the envelope is dropped from above frame, the opener handle stays off frame, the letter is pulled past the top edge, and panels are released off frame and fall by physics. | The brief asked for visible hands. The only rigged hand available here (WebXR generic-hand, 1360 verts) was tested with subdivision, an SSS skin shader and nails, and it read as a mannequin (`taxcase/build/test/hands_cmp.png`). Master §35 puts physical believability and human realism above following the brief literally. Revisit when a photoreal hand asset is available. |
| D5 | Tax content: no "secret / loophole / they don't want you to know" hooks, and every tax figure must be fact-checked first | `channel/RESEARCH-2026-10.md` §4, `channel/TOPICS.md` header |

## 5. Known technical limitations

These are honest constraints of a code-only pipeline in this container, not research conclusions:

1. **Photoreal moving humans.** I have no verified method here for rendering a realistic human face or body in motion from code. Per Master §35 (physical believability and human realism come first), stories should keep humans to forms that code can render believably: partial figures, hands at a distance, silhouettes, out-of-focus presence. A full-face actor is avoided unless research finds a reliable technique. ⏳ To research before the first project.
2. **Real 3D lighting** in WebGL / Three.js is real-time rasterisation, not path tracing. ⏳ Research whether path-traced options (for example, three-gpu-pathtracer) run headless in this container, and how long they take per frame.
3. Rendering is CPU/GPU-limited in the container. Render time per frame has to be measured before choosing the internal resolution.

## 6. Research queue (Master §3)

No conclusions are recorded until each item has a primary source:

- [ ] Remotion v4 docs: `@remotion/motion-blur` (CameraMotionBlur / Trail), `@remotion/three`, render flags (scale, codec, colour space).
- [ ] Three.js: physically based lights and cameras, depth of field (BokehPass vs physical), path tracing headless.
- [ ] FFmpeg 6.1: film grain (`noise` vs a grain plate), halation via `gblur` + blend, `zscale` and the BT.709 chain, downsampling filter choice.
- [ ] Camera-shake models (operator motion with inertia, not random noise).
- [ ] 2.5D plate parallax (depth map + displacement) as a realism method for still plates (D2).

## 6b. TAX CASE #001 QC log (identify → explain → fix)

| Pass | Problem found | Cause | Fix |
|---|---|---|---|
| Stills a | Opening frame empty (no hook) | Envelope started above frame | Envelope in frame, falling, from frame 1 |
| Stills a | Notice shots were white blur | Hinge ODE started at 100°, past vertical on the closed side, so the panel fell shut | Start at 70° on the open side with ω₀ = −1.4 rad/s (cut on action) |
| Stills a | Letter invisible during extraction | Tilt sign drove the leading edge into the desk | Leading edge lifts +7° |
| Stills a–d | Wood read as corduroy, then "melted" | Band texture with too much distortion | Flat-sawn ring model (rings around a dipping log axis) |
| Stills b | Macro cut showed no action | Blade hidden inside the envelope; f/5.6 at 85 mm gave ≈2 mm DoF | Blade rides the edge; f/11 |
| Stills c | Rows skewed ~20° | Camera offset sideways (keystone) | Camera in line with the rows |
| Stills c | Case folder looked like a plastic tablet | Glossy coat material | Matte fibre board, papers peeking out at an offset |
| Preview 1 | Whole film green | Pillow dropped 16-bit RGB channels / I;16 affine returned zeros | OpenCV 16-bit read and float warpAffine |
| Preview 2 | Ghost blur on the first frame after cuts | 180° shutter interpolated across the cut; subframe keys 0.001 apart were merged | State keys at cf−0.70 (old) and cf−0.30 (new) |
| Preview 2 | Black first frame of the case shot | Camera read the folder's stale `matrix_world` | `view_layer.update()` before the camera solve |
| Preview 2 | Hole in the envelope at landing | SIMPLE_DEFORM bend broke the pillow shape key | Flex as a quadratic shape key |
| Preview 2 | Attention drop at 15.9 s (blank paper) | Slow pan over an empty area | Faster, direct move |
| Preview 2 | Stray red lines | Underlines outlived their text | Each mark ends when its line leaves frame |
| Preview 3 | Titles hairline-thin | Manrope woff2 is a variable font defaulting to ExtraLight | Weight axis set to 700 |
| Preview 3 | 1 s of nothing at the start of the extraction | Smootherstep start from rest | Cut on action, letter already 12 % out |
| Final 1 | Extraction 4.5–7.0 s soft | Focus on the envelope edge while the letter lifted toward the lens | Focus follows the letter's leading edge, f/5.6, reframed (edge in the lower third) |
| Final 1 | Show-through on the letter's outside read non-mirrored | Packet UVs not flipped | u flipped |
| Final 1 | Fifth tick off frame at 48.2 s | Camera aimed at the centres of long lines | Aim at the left-anchored fields |
| VO | Marks not on the spoken words | Marks timed before the narration existed | Underlines and ticks re-timed to the measured VO (picture frames unchanged) |

## 7. Change log

- 2026-10-05 v1 delivered: TAX CASE #001 final with an ElevenLabs v4 voiceover (Higgsfield, voice "Harrison"), footer "Fictional example · General info, not advice". 8 major revision passes (stills a–d, previews 1–3, final 1).

- 2026-10-05 v1: TAX CASE #001 in production. Series visual language set (§1). D6 pipeline, D7 hands off frame.

- 2026-10-05 v0: bible created (Kling-based proposal).
- 2026-10-05 v0.1: Master System v1.0 adopted. Kling/Seedance pipeline dropped (D1). Still plates allowed only as static sources (D2). Restructured to the Master §4 fields. The A7 subject proposal is withdrawn.
