# Project production bible: live-action vertical Short

Status: **pre-production, nothing generated.** Last updated 2026-10-05.

Legend: ✅ verified (source given) · 📝 proposed, not yet approved · ❓ open question

---

## 1. Standing directives from the user (apply to every phase)

1. **Realism brief.** 45–60 s, 9:16, ≥1080×1920, 24 fps, photoreal live action. Story first (hook → curiosity → escalation → discovery → transformation → payoff). No final music or SFX; leave timing points for them.
2. **Post-production review.** Review every scene against the 20 criteria (skin, movement, anatomy, physics, faces, clothing, environments, reflections, shadows, camera, DoF, bokeh, sharpness, HDR, repetition, hook, attention drops, unnecessary shots, transitions, ending). For each defect: identify → explain → fix. Re-render only what failed.
3. **Resource research.** Before technical work, check for newer or better methods in primary sources. Record decisions here. Never break continuity without checking first.
4. **Do not create until told.** The user stopped generation on 2026-10-05. No credits are spent without a go-ahead.

## 2. Verified environment facts

| Item | Value | Source |
|---|---|---|
| Higgsfield balance | 560.16 credits, plan "ultra" | `balance` tool, 2026-10-05 |
| Kling 3.0 pro, 15 s, 9:16, sound off | 22.5 credits | `generate_video get_cost`, 2026-10-05 |
| Seedance 2.5, 15 s, 720p, no audio | 105 credits | same |
| Seedance 2.5, 15 s, 1080p, no audio | 180 credits | same |
| Seedance 2.5 draft (480p), 15 s | 45 credits | same |
| GPT Image 2.5 still, 9:16 | 0.25 credits (default quality "low") | same |
| Kling 3.0 inputs | start_image, end_image; 3–15 s; modes std/pro/4k; 16:9, 9:16, 1:1 | `models_explore get kling3_0` |
| Seedance 2.5 inputs | start/end image, image/video/audio references; 4–30 s; 480p–1080p; draft→finalize | `models_explore get seedance_2_5` |
| GPT Image 2.5 | image_references; quality low→max; resolution 1k/2k/4k; 9:16 supported | `models_explore get gpt_image_2_5` |
| FFmpeg | 6.1.1, includes zscale, colorspace, lut3d, noise, deband, cas, unsharp, minterpolate, tblend, vignette, lenscorrection | `ffmpeg -version`, `ffmpeg -filters` in this container |
| Remotion | ^4.0.532 with @remotion/motion-blur, /three, /transitions (in `showreel/`) | `showreel/package.json` |
| Node | v22.22.0 | `node -v` |

Not yet verified: Kling 3.0 pro output resolution in pixels. ❓ Check it on the first test clip with `ffprobe` before deciding whether an upscale (`upscale_video`, Topaz or ByteDance) is needed to reach 1080×1920.

## 3. Creative decisions

| Decision | State |
|---|---|
| Subject: wordless story about records and a shoebox of receipts, tied to channel topic A7 (`channel/TOPICS.md`) | 📝 the user has not confirmed it |
| No tax figures or rules on screen, so there is nothing to fact-check | 📝 |
| No readable text inside generated frames (letters, receipts, screens), because generators render text unreliably | 📝 |
| Time of day changes from night (pendant lamp, about 2700K, plus cool window spill) to dawn window light as the visual "transformation" | 📝 |

## 4. Technical pipeline (proposed)

1. Generate the character and location reference stills first (GPT Image 2.5). Build every keyframe from those references so faces, wardrobe and set stay the same.
2. Turn each keyframe into a 3–6 s clip with image-to-video, one shot per generation.
3. Edit, grade and finish in FFmpeg (or in Remotion if a composited element is needed). Rules for the finish:
   - no added sharpening;
   - grain matched across all shots;
   - one grade for the whole piece;
   - deliver 1080×1920, 24 fps.
4. Run the post-production review (directive 2). Regenerate only the shots that fail.

Rough cost estimate: about 12 shots × 5 s × 1.5 credits/s ≈ 90 credits, plus re-takes. This is arithmetic from the Kling 3.0 pro preflight (22.5 / 15 s = 1.5 credits/s), not a quote.

## 5. Research to do before production (directive 3)

These are not researched yet. No conclusions are drawn until each has a primary source.

- [ ] Current image-to-video model comparison for photoreal humans: Kling 3.0 vs Seedance 2.5 vs others on Higgsfield. Use a small paid test only with approval.
- [ ] Character consistency across separate generations (reference images, end_image chaining).
- [ ] Grain and halation workflow in FFmpeg 6.1 vs a Remotion/WebGL pass.
- [ ] Whether the upscaler adds artificial sharpness (review criterion 13).
- [ ] Colour management: keep the whole chain BT.709, check what the generators output.

## 6. Change log

- 2026-10-05: bible created. Pre-production only; no assets generated.
