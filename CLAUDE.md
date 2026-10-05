# Repository instructions

## Video production (standing rule from the user, 2026-10-05)

For every video / Short request, follow `short/MASTER-SYSTEM.md` (Claude Live-Action Video Director, Master System v1.0) in full:
- The video is built by code (rendering, compositing, simulation), never handed to an external video-generation model.
- Keep the project bible in `short/PRODUCTION-BIBLE.md` and update it explicitly when a decision changes.
- Render, verify (ffprobe and visual QC), self-correct, and report in the format of Master §33.

## Channel content

Tax content for the Tax Secrets Canada channel: see `channel/TOPICS.md` and `channel/RESEARCH-2026-10.md`. Fact-check every tax figure. Do not use "secret / loophole" framing.

## Shorts format reference (user, 2026-10-05)

Reference the user liked: a CPA reel "$100,000 salary after tax by province". Moving background matched to the story; in front, the topic's data enters row by row while text runs like film titles. Improve on it, don't copy it: the background must follow Master §1/§12 realism, data enters with motivated motion, clear hierarchy, readable on a phone, one idea per beat.

## Facts and safety

- Taxes = CRA (not IRCC). Every figure: canada.ca / CRA / provincial source with the tax year, recorded in the bible. Unverified figures are marked `[VERIFY]` and not shipped. Numbers are rendered by code, never baked into generated images.
- On-screen footer: "Source: canada.ca · General info, not advice" (or the specific source).
- Never print API keys (keys live in `~/.config/reels-montage/keys.env`, filled by the user). No subliminal / "25th frame" tricks. Don't work around refused downloads of external code.
- Branch `claude/kling-ai-skill-install-goznyv`; commit and push; no PR unless asked.
