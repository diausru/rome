# COVER FRAME STRATEGY — Instagram Reels, TikTok, YouTube Shorts (user, 2026-10-15, verbatim intent; applies to every video)

1. IG Reels + TikTok: design a deliberate cover-frame moment from the start; pick a timestamp; at that exact moment the frame is a strong standalone thumbnail (clear hook, strong composition, readable text, reason to stop scrolling); never blurry/transitional/obscured/incomplete; consistent with the opening hook; keep the subject visible, text off key details (user's examples mention property/real-estate; for this tax channel: the key figure/question and the person/scene). Record the timestamp and why.
2. Timing: no fixed timestamp for every video; choose per video from hook, visuals, pacing; curiosity without misleading; the moment must sit naturally in the video (no artificial pause); fully rendered and stable at the exact timestamp.
3. YouTube Shorts: same planning; document the recommended cover timestamp; DO NOT set it via Metricool — the user selects it manually.
4. Metricool: for IG Reels/TikTok use the chosen timestamp if the integration supports it; verify the controls first; never report a cover as configured unless applied and verified; if unsupported, document and give the timestamp for manual selection. Keep IG/TikTok separate from YT Shorts.
5. Checklist per video: platform cover strategy · recommended timestamp · description of visual + text at that moment · confirmation the frame was checked in the render (extract the exact frame) · Metricool status: configured / verified / manual action required / unsupported · for YT Shorts: "user selects cover manually".

## Verified capability (2026-10-15, Metricool createScheduledPost schema)
- `info.videoCoverMilliseconds` = offset in ms used as the video cover; alternative `info.videoThumbnailUrl` (custom jpg/png).
- Applies to: Instagram Reel/Trial Reel; TikTok **Business-connected accounts only** (silently ignored on personal TikTok); YouTube video/Short (not used — manual per rule 3); LinkedIn; Facebook Post/Reel.
- If conditions are not met the request is rejected (VIDEO_THUMBNAIL_NOT_APPLICABLE) → omit the field rather than sending it speculatively.
- Whether our TikTok account is Business-connected: not yet verified → check before the first TikTok post; after scheduling, read the post back (getScheduledPosts) to confirm the field was stored.
- Long-form YouTube videos: thumbnail made by the user (unchanged).

## Card series (motion engine v1) — how the rule is applied (2026-10-15)

- The cover moment is planned in `<project>/reel.json` as a cue (`"id": "cover"`) placed on a beat where the hook text, the key figure and the person in the plate are all fully settled (not inside a SceneCuts whip, not during an entrance/exit, captions not covering the figure). It must arise naturally from the edit; no extra pause is added only for the cover.
- Different per video (hook type differs per the Variety rule, so the cover moment differs too).
- QC: extract that exact frame from the final MP4 (`ffmpeg -ss <t> -frames:v 1 <p>/cover.jpg`), look at it, and record in `<project>/publish.json` → `cover`: {timestamp_s, ms, frame, why, visual_text, checked_in_render, metricool_ig, metricool_tiktok, youtube: "manual — the user selects the cover"}.
- Metricool status stays "manual action required" until a post is actually scheduled on the user's command with `info.videoCoverMilliseconds` and read back.

## Full text of the rule (user, 2026-10-15, verbatim)

COVER FRAME STRATEGY — INSTAGRAM REELS, TIKTOK AND YOUTUBE SHORTS
This rule applies to every video generation, editing, animation, and publishing workflow.
1. Instagram Reels and TikTok — automatic cover selection through Metricool

* Design every video with a deliberate cover-frame strategy from the beginning.
* Choose a specific timestamp in the video that will work best as the cover when Metricool publishes the post.
* At that exact moment, create a visually strong, attention-grabbing frame that works as a standalone thumbnail.
* The cover frame must have a clear visual hook, strong composition, readable on-screen text when appropriate, and an immediate reason to stop scrolling.
* For real estate videos, prioritize a compelling property reveal, a striking interior or exterior, a visually interesting architectural detail, or a strong property-related question.
* Do not choose a frame that is blurry, transitional, visually incomplete, obscured by animation, or missing essential text.
* Make the selected frame consistent with the video's opening hook and the overall content strategy.
* Keep the property visible and avoid placing text over important architectural features.
* When planning the animation timeline, deliberately schedule the cover-worthy moment at the timestamp that Metricool will use.
* Record the chosen cover timestamp and explain briefly why it was selected in the production metadata or timeline notes.

2. Cover timing and retention strategy

* Do not use the same fixed timestamp for every video without evaluating the content.
* Select the optimal cover timestamp for each video based on its hook, visual sequence, pacing, and the available cover-selection options in Metricool.
* The cover frame should create curiosity and communicate the video's subject immediately, without misleading viewers or promising something the video does not deliver.
* Where appropriate, combine a strong visual reveal with a short hook, question, surprising detail, or key property feature.
* The cover-worthy moment must also work naturally within the video. Do not insert an awkward pause or an artificial scene solely to create a thumbnail.
* Ensure the selected frame is fully rendered and stable at the exact timestamp, including any text, graphics, labels, and visual effects intended to appear in the cover.

3. YouTube Shorts — manual cover selection

* Apply the same cover-frame planning and visual-quality principles to YouTube Shorts.
* Identify and document the recommended cover timestamp for every Short.
* Do not attempt to select or publish the YouTube Shorts cover automatically through Metricool. I will select the cover manually.
* Make sure the recommended frame is easy to locate in the exported video and visually suitable for the platform.

4. Metricool publishing workflow

* For Instagram Reels and TikTok, configure the publishing workflow to use the selected cover timestamp, provided the current Metricool integration and platform publishing options support it.
* Verify the actual available cover-selection controls before implementation. Do not assume that Metricool supports automatic timestamp selection through its API or integration if that capability has not been confirmed.
* If automatic cover selection is unavailable, document the limitation and provide the exact recommended timestamp for manual selection.
* Never report a cover as configured unless the setting has actually been applied and verified.
* Keep Instagram/TikTok cover selection separate from YouTube Shorts, where cover selection remains manual.

5. Required production checklist
For every video, include:

* Platform-specific cover strategy.
* Recommended cover timestamp.
* Description of the visual and text displayed at that moment.
* Confirmation that the frame has been checked in the rendered video.
* Metricool cover-setting status: configured, verified, manual action required, or unsupported.
* For YouTube Shorts: a clear note that I must select the cover manually.

Treat cover selection as a required part of the video concept, animation timeline, quality control, and publishing workflow — not as an afterthought.

## Handwritten "Real Tax Math" series — how the rule is applied (2026-10-15)

- The cover moment is chosen per video, together with the hook: usually the circled or underlined key result, or the hook question once it is fully written.
  - The pen tip and hand are clear of the key figure.
  - The camera is in a held push-in or at rest, with no fast move and no motion blur.
  - The stable window is at least 0.5 s, from a natural hold while the narration lands the number. No extra pause is added for the cover.
- The mark goes in `film.py` / the timeline as `cover {t, why, visual, text}`. QC extracts the frame at `t` into `<project>/cover.jpg` and compares it with t ± 0.25 s for stability. It is recorded in `publish.json` → `cover` and in PUBLISH.md, with the same fields as the card series.
- YouTube Shorts: the user selects the cover manually. If YouTube is ever scheduled through Metricool, it is a separate post without `videoCoverMilliseconds` or `videoThumbnailUrl`, because the cover field applies to the whole post.
- Not yet verified: whether the cover offset is actually applied on a real post, and whether our TikTok account is connected as Business (on a personal account the field is silently ignored). Until both are checked, the status stays "manual action required".
