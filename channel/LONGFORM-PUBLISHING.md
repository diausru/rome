# How long-form videos are published (assessment, 2026-10-11)

**Channel:** YouTube only (Metricool brand "Tax Tips Canada" 6894064, YouTube UCkusKITaZjDo7CSWTFDFGng). No TikTok/Instagram for long-form.

## What Metricool can and cannot do for a long video
- CAN: upload from Google Drive, title, description (with chapters → YouTube builds chapters from the 0:00 list), tags, category EDUCATION, made-for-kids = no, AI-content disclosure (Grady voice is synthetic → declared), privacy public, scheduled time, first comment.
- CAN (conditional): custom thumbnail via `videoThumbnailUrl` — only if the channel is verified on YouTube; otherwise the request is rejected and the thumbnail must be set in YouTube Studio.
- CANNOT: end screens, cards, playlists, "related video" link on Shorts, pinning the first comment. These are done in YouTube Studio after the video is live (5 minutes, manual).

## Required inputs per long video
1. **Master file in Google Drive: the 1080p `LFxx-final.mp4`** (≈150 MB for 11 min). The 720p chat preview (≈27 MB, ≈260 kbit/s) is NOT for publishing: data tables and small numbers turn soft on a TV/laptop, which hurts trust and retention.
2. Thumbnail 1280×720 (code-made, real numbers rendered by code), in the same Drive folder.
3. PUBLISH.md: title (vidIQ-scored), description with sources + disclaimer + chapters, ≤15 tags, 3 hashtags, first comment.

## Timing
- One long video ≈ every 10 days, Wed or Thu, 16:00 America/Winnipeg (the brand's YouTube peak from Metricool best-time data; weekdays stronger than weekends).
- Never on the same day as a Short; the related Short goes 1–2 days later and points to the long video.
- Notify subscribers: on (default).

## After it goes live (manual, YouTube Studio)
End screen → next long video / subscribe; card at the moment a related Short topic comes up; add to playlist "Canadian Tax Explained"; pin the first comment; link the related Short to the long video. Check retention at 48 h and 7 days and record it in `longform/LONGFORM-BIBLE.md`.
