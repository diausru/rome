Make the next card Short. Read ONLY: channel/QUEUE.md, channel/REEL-CHECKLIST.md, the last delivered `<P>V3.tsx` (template) and its `<p>/reel.json`. Do not read channel/RULES-SHORTS.md unless a rule is unclear. Arg (optional): $ARGUMENTS = topic id to override the queue.
Steps (one batch each, short outputs, no polling loops):
1. Facts: 1–2 WebSearch / law text → `<p>/data.json` (numbers, `spoken`, `sources` with year). Overlap grep in */PUBLISH.md.
2. vidIQ: balance + 1 keyword_research (CA) [+ 2 title scores after render]; NexLev: 1 youtube_search shorts CA. Skip if not connected, say so.
3. Script ≈135 words, 7–8 beats, last line = bridge "Next: <next queue topic>. Follow so you don't miss it." → ONE Higgsfield audio batch (Grady) → `<p>/vo-beats.json`, `<p>/vo-urls.txt`.
4. `<p>/reel.json` (hook, layout, cues incl. cover + logo) → `python3 tools/short.py <p> vo`.
5. ONE image batch: scene 1, then scenes 2–3 with scene 1 as image_references; upscale 4k; save `showreel/public/plates/<p>-s{1,2,3}-4k.jpg`; check no text.
6. Copy the template to `showreel/src/<P>V3.tsx`, change hook + main visual + reveal (different from the last 2–3), register in Root.tsx.
7. `SCR=<scratchpad> python3 tools/short.py <p> stills` → look once → one fix pass.
8. `<p>/publish.json` (3 titles, description, tt, ig, pinned, cta, sources, next) → `python3 tools/short.py <p> final` (background, wait once).
9. Look at `<p>/cover.jpg`; if blurred/in a transition, re-extract a settled frame and update publish.json/PUBLISH.md.
10. Republish the Kit (copy channel/publishing-kit.html to scratchpad, Artifact url https://claude.ai/artifact/6LfkQdgNBtoZTiy2WEYSiK); mark QUEUE done/next; commit + push; send `<p>-share.mp4`; 5-line Russian report. STOP.
