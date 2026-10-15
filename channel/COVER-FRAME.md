# Cover frame strategy (user, 2026-10-15)

Applies to every video: Shorts and Reels, card format and handwritten "Real Tax Math". This file adds to the existing rules and does not replace any of them. The user's text is kept verbatim below. After it come Claude's implementation notes.

## User's text (verbatim)

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

## Implementation notes (Claude, 2026-10-15)

### What the Metricool integration offers

Checked on 2026-10-15 from the schema of the connected Metricool MCP tools `createScheduledPost` and `updateScheduledPost`. No post was created or changed during this check.

- **`videoCoverMilliseconds`**: "offset in milliseconds into the video to use as the cover frame". It is the alternative to `videoThumbnailUrl`, which takes a custom jpg or png. Both require a video in `media`.
- The field applies to:
  - Instagram Reel and Trial Reel;
  - TikTok, but only for accounts connected as Business. On personal TikTok accounts it is silently ignored;
  - YouTube video and Short;
  - LinkedIn;
  - Facebook Post and Reel.
- If the conditions are not met, the whole request is rejected with `VIDEO_THUMBNAIL_NOT_APPLICABLE`.
- **Not yet verified on a real post.** We have not checked whether the value is returned by `getScheduledPosts` and is actually applied by the platforms. Status until then: "supported per tool schema, not verified".
- **Whether our TikTok account is Business has not been checked.** If it is personal, the TikTok cover must be selected manually.

### Consequence for YouTube

The cover field applies to the whole post, and the user selects YouTube Shorts covers manually. So:

- a YouTube Short is either a **separate Metricool post without `videoCoverMilliseconds` or `videoThumbnailUrl`**, or it is not sent through Metricool at all;
- a combined Instagram + TikTok + YouTube post with a cover offset is not allowed.

### Production (applies from the next video; finished videos stay as they are unless the user asks)

1. **Concept.** Choose the cover moment together with the hook. It must state the topic and give a reason to stop scrolling, with no false promise.
   - For this channel, "property" in the user's text means the **topic's key visual**:
     - the hero number or the question;
     - the circled result (handwritten series);
     - the main glass card on the photo plate (card series).
   - Text must not cover the plate's main subject.
2. **Timeline.** Put a `cover` mark in the timeline (`timeline.json` or `film.py`): `{t, why, visual, text}`.
   - At that moment, every planned element has finished its entry and stands still. No transition, no motion blur, no element only half drawn by the pen.
   - The stable window lasts at least 0.5 s, and `t` is placed in its middle.
   - Do not add an artificial pause; use a natural hold, such as when the narration lands a number.
   - The timestamp is chosen for each video separately, never as a fixed value.
3. **QC.** Extract the frame at exactly `t` from the finished MP4 (`ffmpeg -ss t -frames:v 1`) and save it as `<project>/cover.jpg`. Then check it visually:
   - sharp;
   - text complete and readable at phone size;
   - in the safe zone.

   Compare it with the frames at `t ± 0.25 s` to confirm the frame is stable.
4. **PUBLISH.md / publish.json**: a "COVER" section containing:
   - the strategy per platform;
   - the timestamp in seconds and milliseconds;
   - a description of the visual and text;
   - "checked in the render: yes", with the path to `cover.jpg`;
   - the Metricool status for IG and TikTok, one of: configured, verified, manual action required, or unsupported;
   - for YouTube Shorts: "the cover is selected manually by the user, timestamp X".
5. **Metricool.** Nothing is sent without the user's explicit command (the 2026-10-07 rule stays in force).
   - When the user orders publishing:
     - send `videoCoverMilliseconds` for IG and TikTok only;
     - read the post back with `getScheduledPosts`;
     - report "configured" only if the value came back, and "verified" only after it was seen on the platform.
