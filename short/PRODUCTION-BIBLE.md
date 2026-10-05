# Project production bible: live-action vertical Short

Governing document: `short/MASTER-SYSTEM.md` (Master System v1.0, saved 2026-10-05). This bible is the source of truth for continuity on the current project.

Legend: ✅ verified (source given) · 📝 decided by Claude, can be revised (record the reason when it changes) · ⏳ set at production start, when the subject is known

**CURRENT VERSION:** v0. Pre-production. No subject has been given, and no frame has been rendered.

---

## 1. Project

| Field | Value |
|---|---|
| PROJECT NAME | ⏳ |
| VIDEO OBJECTIVE | 45–60 s vertical Short that reads as filmed live action (Master §1) |
| TARGET AUDIENCE | ⏳. If the Short is for the Tax Secrets Canada channel: retirees and pre-retirees (`channel/RESEARCH-2026-10.md` §3) |
| STORY | ⏳ |
| CHARACTERS / CHARACTER APPEARANCE / WARDROBE | ⏳ |
| LOCATION / ARCHITECTURE / OBJECTS / MATERIALS | ⏳ |
| LIGHTING / TIME OF DAY / WEATHER | ⏳ |
| COLOR PALETTE | ⏳ |
| CAMERA LANGUAGE / LENS LANGUAGE / CAMERA MOVEMENT | ⏳ |
| ANIMATION LANGUAGE / PHYSICS RULES | ⏳ |
| CONTINUITY RULES / VISUAL MOTIFS / TRANSITIONS / EDITING RHYTHM | ⏳ |

The earlier shoebox/records idea (topic A7) is **not** adopted. It was never confirmed, and it was designed around a video-generation pipeline that is now banned (§4).

## 2. Render settings (Master §5)

| Setting | Value |
|---|---|
| Delivery | MP4, H.264, 1080×1920, 9:16, 24 fps, 45–60 s, silent |
| Internal render | Above 1080×1920 where practical, then downsampled (Master §5). Exact scale ⏳ after a render-time test |
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

## 7. Change log

- 2026-10-05 v0: bible created (Kling-based proposal).
- 2026-10-05 v0.1: Master System v1.0 adopted. Kling/Seedance pipeline dropped (D1). Still plates allowed only as static sources (D2). Restructured to the Master §4 fields. The A7 subject proposal is withdrawn.
