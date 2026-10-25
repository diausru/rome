#!/usr/bin/env python3
"""One-command finish for a card reel (saves Claude turns): after <p>/vo-beats.json + vo-urls.txt, data.json, reel.json
and showreel/src/<P>V3.tsx exist, run:
  tools/short.py <p> vo      -> VO timeline, word timings, cues (prints the timeline)
  tools/short.py <p> stills  -> one contact sheet of 8 frames (scratch file path printed)
  tools/short.py <p> final   -> music + sfx + mix, render, mux, share copy, cover.jpg, QC, PUBLISH.md, kit card
Each step prints only a short summary."""
import json, math, os, subprocess as sp, sys
p, step = sys.argv[1], sys.argv[2]; P = p.upper(); R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(R); src = 'showreel/src'; out = f'showreel/out/{p}'; os.makedirs(out, exist_ok=True)
run = lambda *a, **k: sp.run(list(a), check=True, **k)
q = lambda *a, **k: sp.run(list(a), check=True, capture_output=True, text=True, **k).stdout
tl = lambda: json.load(open(f'{src}/{p}-timeline.json'))
if step == 'vo':
    print(q('python3', 'tools/vo_hf.py', f'{p}/vo-beats.json', f'{p}/vo-urls.txt', f'{p}/vo', f'{src}/{p}-timeline.json').strip().splitlines()[-1])
    q('python3', 'tools/beat_words.py', f'{p}/vo-beats.json', f'{p}/vo', f'{src}/{p}-timeline.json', f'{src}/{p}-words.json')
    print(q('python3', 'tools/reel_cues.py', f'{p}/reel.json', f'{src}/{p}-words.json', f'{src}/{p}-timeline.json', f'{src}/{p}-cues.json', f'{p}/sfx-cues.json').strip().splitlines()[-1])
    for b in json.load(open(f'{src}/{p}-words.json'))['beats']: print(b['id'], ' '.join(f"{w['text']}@{w['start']:.1f}" for w in b['words']))
elif step == 'stills':
    T = tl()['total']; ts = [round(T * k / 8 + 1, 1) for k in range(8)]; scr = os.environ.get('SCR', '/tmp')
    for t in ts: q('npx', 'remotion', 'still', 'src/index.ts', f'{P}V3', f'../{out}/st-{t}.png', f'--frame={int(t * 24)}', '--gl=angle', cwd='showreel')
    ins = sum([['-i', f'{out}/st-{t}.png'] for t in ts], [])
    run('ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ''.join(f'[{i}]scale=270:-1[v{i}];' for i in range(8)) + ''.join(f'[v{i}]' for i in range(8)) + 'hstack=8', f'{scr}/{p}-sheet.jpg')
    for t in ts: os.remove(f'{out}/st-{t}.png')
    print(f'{scr}/{p}-sheet.jpg', ts)
elif step == 'final':
    reel = json.load(open(f'{p}/reel.json')); cue = json.load(open(f'{src}/{p}-cues.json'))
    D = round(tl()['total'] + reel.get('hold_after_vo', 0.5), 3); A = f'{p}/audio'; os.makedirs(A, exist_ok=True)
    q('python3', 'tools/music.py', reel.get('music', 'pension'), str(cue['logo'] + 0.45), f'{A}/m.wav')
    q('ffmpeg', '-v', 'error', '-y', '-i', f'{A}/m.wav', '-af', f'loudnorm=I=-24:TP=-3,apad=whole_dur={D}', '-ac', '2', '-c:a', 'pcm_s16le', f'{A}/music.wav'); os.remove(f'{A}/m.wav')
    q('python3', 'tools/sfx.py', f'{p}/sfx-cues.json', str(D), f'{A}/sfx.wav')
    q('python3', 'tools/mix_reel.py', f'{p}/vo/vo.wav', f'{A}/music.wav', f'{A}/sfx.wav', str(D), f'{A}/mix.wav')
    q('npx', 'remotion', 'render', 'src/index.ts', f'{P}V3', f'../{out}/v.mp4', '--gl=angle', '--concurrency=4', cwd='showreel')
    q('ffmpeg', '-v', 'error', '-y', '-i', f'{out}/v.mp4', '-i', f'{A}/mix.wav', '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', f'{out}/{p}-final.mp4'); os.remove(f'{out}/v.mp4')
    q('ffmpeg', '-v', 'error', '-y', '-i', f'{out}/{p}-final.mp4', '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-c:a', 'copy', f'{out}/{p}-share.mp4')
    ct = round(cue['cover'], 2); q('ffmpeg', '-v', 'error', '-y', '-ss', str(ct), '-i', f'{out}/{p}-final.mp4', '-frames:v', '1', '-q:v', '2', f'{p}/cover.jpg')
    qc = sp.run(['python3', 'tools/reel_check.py', p, f'{out}/{p}-final.mp4'], capture_output=True, text=True).stdout.strip().splitlines()
    print('\n'.join(l for l in qc if l.startswith(('FAIL', '0 failed', '1 failed', '2 failed'))) or qc[-1])
    dur = float(q('ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{out}/{p}-final.mp4'))
    pj = f'{p}/publish.json'
    if os.path.exists(pj):
        j = json.load(open(pj)); j['video']['duration'] = f'{int(dur // 60)}:{int(dur % 60):02d} ({dur:.2f} s), 1080×1920, 24 fps'
        j.setdefault('cover', {}).update(t=ct, ms=int(round(ct * 1000)), file=f'{p}/cover.jpg (extracted at {ct} s from the final render)')
        json.dump(j, open(pj, 'w'), ensure_ascii=False, indent=1)
        q('python3', 'tools/publish_doc.py', pj, f'{src}/{p}-timeline.json', f'{p}/PUBLISH.md')
        with open(f'{p}/PUBLISH.md', 'a') as f: f.write(f"\n\n## COVER FRAME\n- **Timestamp:** {ct} s ({int(round(ct*1000))} ms), `cover` cue in `{p}/reel.json`; frame: {j['cover'].get('frame','')}\n- IG/TikTok via Metricool `videoCoverMilliseconds` only on the user's command; YouTube Shorts: set manually.\n")
        print(q('python3', 'tools/kit_add.py', 'channel/publishing-kit.html', pj, j['video']['title']).strip())
    print(f'final {dur:.2f}s cover {ct}s -> {out}/{p}-share.mp4')
