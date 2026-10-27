# LONG-FORM BOOT (compact; read this, not old docs)
State: LF-01…LF-12 done (MP4 in repo, unpublished). Next = first row with status `queued` in "Recommended initial production order" of `channel/LONGFORM-QUEUE.md` (now: LF-13 #4 federal vs provincial, bridged from LF-12). Dates: every 10 days from LF-11 Jan 8 2027 (LF-12 Jan 19, LF-13 Jan 29…).
Template episode: `longform/lf12-bonus/` (copy data.py/lines.py/gen_episode.py, change data). Tax model: `th(g, rrsp, p)` in `longform/lf10-marginal/data.py` (exec-import as lf12 data.py).

## Rules (hard)
- Facts: canada.ca/CRA via WebSearch (allowed_domains canada.ca), 1 pass; unverified → not in video; FACTS.md = claim·source·year·lines.
- Different from Shorts and previous LF; new intro component every episode (used: collage, stubs, race, stacks, gauges, sold, bonus) in `showreel/src/lf/Motion.tsx`, register in PANELS_MOTION.
- Script ~1,100–1,300 words (8–10 min), numbers as words, "C R A / C P P / E I / R R S P"; hook with open loop; mid re-hook ~60%; last line = bridge to next queue topic + "Subscribe, so you don't miss it."
- No AI video; plates = Higgsfield `gpt_image_2_5` 16:9, prompt ends "No text, no numbers, no letters, no logos."; check once (contact sheet); no 4K upscale (local resize).
- vidIQ ≤ 5–15 credits (1 keyword research CA, ≤2 title scores); NexLev 1 `youtube_search`.
- Economy: no polling/monitors; one stills sheet before render, one contact sheet after; short outputs; one commit per milestone; report in Russian, ≤10 lines.
- Never: Metricool without command; `mv` to /dev/null; `pkill -f` matching own shell.

## Pipeline (`/lf`)
1. Facts + data.py → data.json. 2. lines.py → lines.json. 3. VO: `generate_audio_batch` ≤12 items, model `text2speech_v2`, variant `elevenlabs`, voice_type `preset`, voice_id `e2a2d2e6-9ed2-59cd-82af-feaa27f8a678`, use_unlim false (429 → resubmit); save `jobs.txt` ("n jobid"); download without polling: `xargs -P20 -n2 longform/tools/vo_find.sh < jobs.txt` (set DATE/START in script); `python3 longform/tools/vo_words.py <ep>`.
4. 6 plates → `plates/sN.png` → `longform/tools/plate_local.sh <ep> lfNN`.
5. gen_episode.py → `python3 ../tools/build.py episode.src.json` (fix WORD NOT FOUND) → props.json + mix.wav to `showreel/public/lf/lfNN/`.
6. Stills sheet (≤9 frames) → fix once.
7. `nohup bash longform/tools/finish.sh longform/<ep> lfNN LFNN-1080p.mp4 > showreel/out/lf/lfNN_finish.log 2>&1 &` + one background `until grep -qE "^OK|FAIL"` wait → read sheet.
8. FACTS/BLUEPRINT/PUBLISH.md (3 titles, description with chapters + TikTok taxsecretscanada / Instagram styleofcanada without @, hashtags, pinned comment) → bible row (`longform/LONGFORM-BIBLE.md`) + queue status → `git add -f` MP4, commit, push → SendUserFile (if >90 MB: GitHub `?raw=true` link). Stop, wait.
