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
