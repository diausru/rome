> Superseded by the compact CLAUDE.md + .claude/commands (2026-10-27). Kept as reference.

# СТЕК И АРХИТЕКТУРА
- Репо `diausru/rome`, ветка `claude/kling-ai-skill-install-goznyv`; commit+push, без PR.
- Канал Tax Secrets Canada: Shorts 9:16 1080×1920 24fps, 45–70 с.
- Рендер: Remotion 4.0.532 (React/TSX) в `showreel/`, `--gl=angle`. Python 3.11 + ffmpeg/ffprobe: аудио, QC, доки.
- MCP: Higgsfield (VO `text2speech_v2`/variant `elevenlabs`/voice_type `preset`/voice_id `e2a2d2e6-9ed2-59cd-82af-feaa27f8a678` = Grady; фото `gpt_image_2_5` 9:16 → `upscale_image` 4k), vidIQ (≤25 кр/видео), NexLev, Metricool (blogId 6894064, tz America/Winnipeg; IG styleofcanada, TikTok taxsecretscanada, YT UCkusKITaZjDo7CSWTFDFGng @TaxSecretsCanada), Google Drive (папка `1WI5ixsyz4pQ0P6vb_Tyau2HId2VxeCF-`).
- Папки:
  - `<p>/` (r1, m30…): vo-beats.json, vo-urls.txt, data.json, reel.json, publish.json, PUBLISH.md, PRODUCTION-BIBLE.md, BLUEPRINT.md, QC-REPORT.md, cover.jpg, vo/, audio/
  - `showreel/src/<P>V3.tsx` (+регистрация в `Root.tsx`), `showreel/src/<p>-{timeline,words,cues}.json`
  - `showreel/src/motion/{Reel.tsx,brand.ts}`, `Plate.tsx` (PhotoPlate, SceneCuts), `Kit.tsx` (Typed, beatsFrom), `RaiseShort.tsx` (Flag)
  - `showreel/public/plates/<p>-s{1,2,3}-4k.jpg`; `showreel/out/<p>/<p>-{final,share}.mp4`
  - `tools/`: short.py, vo_hf.py, beat_words.py, reel_cues.py, music.py, sfx.py, mix_reel.py, reel_check.py, publish_doc.py, kit_add.py, vo_doc.py
  - `channel/`: REEL-CHECKLIST.md, FACELESS-DOC-FRAMEWORK.md, TOPICS-2.md, publishing-kit.html, metricool/, analysis/; полные правила — `/CLAUDE.md`

# ПРАВИЛА КОДИНГА
- Факты: каждая цифра — CRA/canada.ca/закон/провинция + год → data.json `sources`; непроверенное `[VERIFY]`, не выпускать; пример ≠ правило CRA.
- Числа только в коде (data.json); TSX не вычисляет; в фото нет текста/чисел.
- Без Kling/AI-видео; движение кодом.
- Одно видео за раз → STOP, ждать команду.
- Metricool только по команде; обложка `videoCoverMilliseconds` + read-back; YouTube-обложка вручную.
- Каждый ролик проходит `channel/REEL-CHECKLIST.md`: шапка+флаг, 3 сцены тех же людей, Kinetic-хук кадр 0, Typed-титры, Captions по словам, glass-панель + золотые цифры, Stamp-перехват 55–65 %, reveal, VO + ducked музыка + SFX на cue + звуковой лого, check-карта + NEXT-пилюля + «Follow so you don't miss it», футер источников, cover-cue.
- Variety: hook и главный визуал ≠ 2–3 предыдущих; записать в bible.
- VO ≈135 слов, 45–70 с с первого раза; числа словами; последняя строка — мост «Next: … Follow so you don't miss it.»
- reel_check: фразы `spoken` должны парситься (поддержано: `a thousand`, `N hundred`, `X dollars and Y cents`).
- Обложка: устойчивый кадр, не в blur перехода SceneCuts; проверить извлечённый кадр.
- Экономия: `tools/short.py` по этапам; 1 партия VO, 1 фото, 1 раскадровка, 1 рендер; Whisper только при сбое QC; отчёты коротко на русском.
- Подписи: кросс-промо без «@» для чужих платформ; без «secret/loophole»; без engagement bait.
- Git: `*/audio/music.wav` в .gitignore; ключи не печатать.

# ТЕКУЩИЙ КОД
```
tools/short.py <p> vo                    # vo_hf → beat_words → reel_cues; печать слова@время
SCR=<scratch> tools/short.py <p> stills  # 8 кадров → <scratch>/<p>-sheet.jpg
tools/short.py <p> final                 # music+sfx+mix → render → mux → share(crf20) → cover.jpg → reel_check → PUBLISH.md → kit_add
```
vo-beats.json:
```json
{"voice":"Grady","tempo":1.0,"beats":[["hook","text",0.35],["c1","…",0.3],["cta","Next: … Follow so you don't miss it.",0]]}
```
vo-urls.txt — mp3 URL на beat, тот же порядок.

data.json:
```json
{"topic":"…","tax_year":2025,"example":{"…":0,"note":"example (not a CRA rule)…"},"derive":{},"spoken":{"key":"as spoken"},"sources":{"k":"источник · год · что подтверждает"}}
```
reel.json:
```json
{"id":"p","hook":{"l1":"…","l2":"…"},"hold_after_vo":0.5,"music":"pension|pension2|kids|work|holiday",
 "layout":{"hook_text":{"box":[80,440,880,800],"from":"start","to":"c1"},"captions":{"box":[80,1296,880,120],"from":"c1","to":"action"}},
 "cues":[{"id":"x","beat":"c1","word":"thirty","sfx":"tick"},{"id":"c1","beat":"c1","at":0,"sfx":"swish"},
  {"id":"cover","beat":"c4","word":"…","offset":-0.2},{"id":"logo","end":true,"offset":0.1,"sfx":"logo"}]}
```
SFX: tick | chime | whoosh | swish | ["riser","impact"] (+dur, gain).

Скелет `<P>V3.tsx` (копировать `showreel/src/M30V3.tsx`):
```tsx
import TL from './p-timeline.json'; import WORDS from './p-words.json'; import CUE from './p-cues.json';
import DATA from '../../p/data.json'; import REEL from '../../p/reel.json';
const B=beatsFrom(TL,24); export const PDUR=Math.ceil((TL.total+REEL.hold_after_vo)*24);
const Q=/* CUE секунды ×24 → кадры */; const CUTS=[B.c2.s,B.reveal.s]; // K1/K2/K3: Focus[] камера на сцену
<AbsoluteFill>
 <SceneCuts cuts={CUTS} scene={i=>i===0?<PhotoPlate src="plates/p-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8+4*(1-ease(f,0,20))} snow={…}/>:…}/>
 <Depth seed warm={0.6}/><NavyGrade/><Header/><Typed caps={CAPS}/>
 {f<B.c1.s+20&&<Hook/>}<MainVisual/><Reveal/><End/>
 <Captions beats={WORDS.beats} from={B.c1.s} until={B.action.s} y={1296}/>
</AbsoluteFill>
```
Root.tsx: `import { PV3, PDUR, PFPS } from './PV3';` + `<Composition id="PV3" component={PV3} durationInFrames={PDUR} fps={PFPS} width={1080} height={1920}/>`.

Kit: `cp channel/publishing-kit.html <scratch>/` → Artifact publish `url=https://claude.ai/artifact/6LfkQdgNBtoZTiy2WEYSiK`.

# ТЕКУЩИЙ СТАТУС И ЗАДАЧА
- Готово (TOPICS-2): R5 pension splitting (cover 34.41 с), R1 DTC три двери (47.49 с), R2 caregiver $1,247/$0, M30 medical $116/$377 (45.4 с). Все: QC pass, PUBLISH.md, Kit-карта, в git.
- Metricool: 33 поста 11.01–03.02.2027 (D1…D4) запланированы и сверены. R5/R1/R2/M30 НЕ запланированы — ждать команду; сначала файлы в Google Drive.
- claude-mem 15.3.0 стоял только в старом контейнере; worker не запускался.
- СЛЕДУЮЩЕЕ: R3 «Donations: combining receipts on one return pays more» (мост из M30 уже обещан).
  1. Факты: двухуровневый кредит выше $200, 2025, источник CRA.
  2. Проверка пересечений с long-form и handwritten.
  3. Higgsfield batch VO → vo-beats.json + vo-urls.txt.
  4. data.json, reel.json → `short.py r3 vo`.
  5. Фото ×3 → upscale → `showreel/public/plates/r3-s*-4k.jpg`.
  6. Копия M30V3.tsx → R3V3.tsx (новые hook и главный визуал), регистрация в Root.
  7. `short.py r3 stills` → правки.
  8. publish.json → `short.py r3 final` → проверить cover.jpg.
  9. Строка прогресса в CLAUDE.md, коммит, отправить r3-share.mp4, короткий отчёт по-русски.
