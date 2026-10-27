# HANDOFF — Tax Secrets Canada · LONG-FORM session (2026-10-27)
Ответы пользователю: RU, кратко. Всё прочее (CLAUDE.md) — обязательно, читать первым.

# 1. СТЕК И АРХИТЕКТУРА
- Repo `diausru/rome`, branch `claude/kling-ai-skill-install-goznyv` (commit+push, no PR).
- Render: Remotion 4.0.532 (React/TS), comp `LongForm` 1920×1080/30fps, `--gl=angle`. Python 3 (data/build), ffmpeg/ffprobe.
- MCP: Higgsfield (VO `text2speech_v2` elevenlabs Grady `e2a2d2e6-9ed2-59cd-82af-feaa27f8a678`; images `gpt_image_2_5` 16:9), vidIQ (cap 25 cr/video), NexLev (`youtube_search`), Metricool (ТОЛЬКО по команде), WebSearch (canada.ca).
- Папки:
  - `longform/lfNN-<slug>/`: data.py→data.json, lines.py→lines.json, vo/L*.mp3, words.json, plates/, gen_episode.py→episode.src.json→(build)→episode.json, timeline.txt, mix.wav, props.json, FACTS.md, BLUEPRINT.md, PUBLISH.md, LFNN-1080p.mp4 (git add -f).
  - `longform/tools/`: build.py, vo_words.py, depth.py, prep_plate.sh, next_chunk.sh, finish.sh, taxcalc.py.
  - `longform/lf10-marginal/data.py`: `th(g, rrsp=0, p='ON')` → {fed,onb,sur,ohp,cpp,ei,tax,keep} (2026 ON, BPA phase-out, surtax, OHP, CPP/CPP2/EI). Reuse via exec (see lf12 data.py).
  - `showreel/src/lf/Motion.tsx`: `PANELS_MOTION` {opening, ptable, collage, stubs, race, stacks, gauges, curve, sold, bonus}; Panels.tsx: steps, khero, split, formula, timeline, misconception, brackets, provinces, pay.
  - `showreel/public/lf/lfNN/{mix.wav, plates/sN.jpg, sN_d.png}`.
  - Docs: `longform/LONGFORM-BIBLE.md` (row per LF), `channel/LONGFORM-QUEUE.md` (order + status), `channel/FACELESS-DOC-FRAMEWORK.md`, `channel/metricool/SCHEDULE.md`.

# 2. ПРАВИЛА
- Факты: только canada.ca/CRA, FACTS.md (claim·source·year·lines). Непроверенное — не в видео. Числа только из data.json, в код.
- Нет AI-видео/Kling. Stills без текста ("no text, no numbers, no letters, no logos"), проверка глазами.
- Каждое интро новое (компонент в Motion.tsx, регистрировать в PANELS_MOTION); не повторять прошлые: collage, stubs, race, stacks, gauges, curve-, sold, bonus.
- VO: числа словами, C R A / C P P / E I / R R S P / T D one; последняя строка — мост к следующей теме + "Subscribe, so you don't miss it."
- Экономия: 1 fact pass; vidIQ keyword(5)+≤2 score; 1 NexLev search; VO батчи ≤12 (429 → переотправить); plates без 4K upscale (local Lanczos 2880×1613 + depth.py); 1 stills-лист до рендера; рендер ТОЛЬКО `finish.sh` в фоне + одно until-уведомление; 1 contact sheet; короткие отчёты.
- Анкеры W('Lx','word') должны существовать в строке (build.py пишет WORD NOT FOUND). В SPLIT rowAt — по порядку речи. Не ставить новый scene внутри интервала rowAt предыдущего.
- Metricool/публикация — только по явной команде. Описание YT: промо TikTok taxsecretscanada / Instagram styleofcanada без "@".
- ЗАПРЕТ: `mv` на /dev/null, pkill -f по шаблону с собственной командой (убивает shell) — kill по PID.

# 3. КЛЮЧЕВОЙ КОД
```bash
# VO URLs без поллинга: перебор времени (jobs.txt: "<n> <jobid>")
# find.sh n jobid: for t in 0..1020 → ts=HHMMSS от старта; curl -sf -o vo/L$n.mp3 \
#  https://d8j0ntlcm91z4.cloudfront.net/user_34B6c4N28uYxNknSTjhsvdQ5biA/hf_<YYYYMMDD>_<ts>_<jobid>.mp3
cat jobs.txt | xargs -P 20 -n 2 find.sh
python3 longform/tools/vo_words.py lfNN-slug            # words.json
cd longform/lfNN-slug && python3 gen_episode.py && python3 ../tools/build.py episode.src.json
echo '{"ep": '"$(cat episode.json)"'}' > props.json; cp mix.wav ../../showreel/public/lf/lfNN/
# stills: npx remotion still src/index.ts LongForm out.png --props=../longform/<ep>/props.json --frame=F --gl=angle
nohup bash longform/tools/finish.sh longform/lfNN-slug lfNN LFNN-1080p.mp4 > showreel/out/lf/lfNN_finish.log &
# → "OK dur=… lufs=… black=… sheet=showreel/out/lf/chunks/lfNN/sheet.png"
```
gen_episode.py (копировать lf12-bonus/gen_episode.py): helpers `W, P, scene, K, ln, mo, dc, ST, it, SPLIT`; `CH` = id строк-глав (gap 1.0, иначе 0.35); `events` (1-й — интро-панель full-frame с bg plate, off=-1.0, out=W(next,None,-0.9)); `chapters`; `plates`; `shots` (cam keyframes); `sfx`; `ticker`; `ep={fps:30, lead:.8, tail:2, footer, vo, chapters, events, shots, plates, sfx, ticker, audio:'lf/lfNN/mix.wav', music:'music.wav', musicVol:.05}`.
Интро-компонент (шаблон BonusHook/SoldHook): `const X: React.FC<{p:Pn;c:Ctx}>`; время `c.now`, `prog(now,t,dur,EASE)`, фон `<DepthPhoto src depth t amt cam/>` + dim; kicker/title/finishTitle; вопрос `qAt/question` (top≈880–900, не наезжать на тикер y≈970); выход `out`.

# 4. СТАТУС И ЗАДАЧА
Готово (MP4 в репо, не опубликовано): LF-01…LF-12. LF-11 #22 «Sell your home» (9:15, SoldHook). LF-12 #12 «$20,000 bonus» (8:53, BonusHook; vidIQ 5 cr, титулы не оценены).
План дат (10 дней, Metricool только по команде): LF-11 Jan 8, LF-12 Jan 19, #4 Jan 29, #5 Feb 8, #8 Feb 18, далее #6, #7, #9.
Открыто: LF-02 «checked 2026-10-11» (VO L4 + карточка) — решение пользователя; проверить OAS/GIS/RRSP/TFSA/MB renters цифры перед датами постов; заменить заглушки LF-06…10 после ссылки Google Drive; Metricool-черновики LF-11/12 — только по команде.
СЛЕДУЮЩЕЕ (по команде «делай следующий»): LF-13 = queue #4 «federal vs provincial tax» (мост из LF-12: «same salary, different tax in different provinces, which part is federal»). Шаги: факты 2026 (федеральные/провинциальные ставки и пороги, T4127) → data.py (th() с p≠'ON' если поддерживается, иначе taxcalc.py) → lines.py (~1,200 слов) → VO → 6 plates → новое интро (не bonus/sold) → gen_episode → stills-лист → finish.sh → docs/bible/queue → commit → SendUserFile.
