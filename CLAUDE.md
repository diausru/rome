# Tax Secrets Canada — Shorts (card series). Compact rules (2026-10-27)

Full history/rules: `channel/RULES-FULL.md` (read only if unclear). Long-form lives in another chat: `longform/CLAUDE.md` — do not read it here.

## Commands
- `/next-video [id]` — make the next Short from `channel/QUEUE.md`, deliver, STOP.
- `/schedule <p1 p2 …>` — schedule those Shorts in Metricool (only on this command).
- `/status` — last done, next, not yet scheduled.

## Rules
- Reply in Russian, short. One video at a time, then STOP and wait.
- Facts: every figure from CRA / canada.ca / law / province with tax year → `<p>/data.json` sources. Unverified = `[VERIFY]`, not shipped. Example ≠ CRA rule. No "secret/loophole".
- Numbers only in code; generated photos have no text/numbers. No Kling / AI video. Motion = code (Remotion).
- Every Short passes `channel/REEL-CHECKLIST.md` (flag header, 3 scenes same people + camera moves + snow/steam, frame-0 kinetic hook, typed titles, word captions, glass panel + gold numbers, stamp re-hook 55–65 %, reveal, Grady VO + ducked music + cue SFX + sonic logo, check card + NEXT pill + "Follow so you don't miss it", sources footer, settled cover frame, QC pass).
- Variety: hook + main visual differ from the last 2–3 reels.
- VO: Higgsfield `text2speech_v2`, variant `elevenlabs`, preset `e2a2d2e6-9ed2-59cd-82af-feaa27f8a678` (Grady); ≈135 words, 45–70 s; numbers as words; last line bridges to the next queue topic.
- Photos: `gpt_image_2_5` 9:16 "no text, no numbers, no letters, no logos" → `upscale_image` 4k.
- Pipeline: `tools/short.py <p> vo | stills | final` (template = last `showreel/src/<P>V3.tsx`).
- Budget: vidIQ ≤25 credits/video (balance before/after); 1 NexLev search; 1 batch VO, 1 batch photos, 1 contact sheet, 1 fix pass, 1 render; no Whisper unless QC facts fail.
- Metricool only on `/schedule`; covers via `videoCoverMilliseconds` + read-back; YouTube cover manual. Captions cross-promo other networks without "@".
- Never print API keys. No subliminal tricks.
- Git: branch `claude/kling-ai-skill-install-goznyv`, commit + push per video, no PR. `*/audio/music.wav` ignored.
