#!/usr/bin/env python3
"""Assemble a Higgsfield/ElevenLabs voiceover into the master timeline.
usage: tools/vo_hf.py <beats.json> <urls.txt (one per beat, same order)> <out_dir> <timeline.json>
Downloads each line, trims leading/trailing silence, places beats with their pauses, normalizes to −14 LUFS."""
import json, subprocess, sys, pathlib, urllib.request
cfg = json.load(open(sys.argv[1])); urls = [u.strip() for u in open(sys.argv[2]) if u.strip()]
out, tlp = pathlib.Path(sys.argv[3]), pathlib.Path(sys.argv[4]); out.mkdir(parents=True, exist_ok=True)
assert len(urls) == len(cfg['beats'])
LEAD, RATE = cfg.get('lead', 0.25), 48000
parts, t, tl = [], LEAD, []
for (bid, text, pause), url in zip(cfg['beats'], urls):
    mp3, wav = out / f'seg-{bid}.mp3', out / f'seg-{bid}.wav'
    if not mp3.exists(): urllib.request.urlretrieve(url, mp3)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(mp3), '-af',
        'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse' + (f",atempo={cfg['tempo']}" if cfg.get('tempo') else ''),
        '-ar', str(RATE), '-ac', '1', str(wav)], check=True)
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(wav)], capture_output=True, text=True).stdout)
    tl.append(dict(id=bid, text=text, start=round(t, 3), end=round(t + dur, 3)))
    parts.append((wav, t)); t += dur + pause
total = t
inputs, filt = [], []
for i, (w, st) in enumerate(parts):
    inputs += ['-i', str(w)]; filt.append(f'[{i}]adelay={int(st*1000)}|{int(st*1000)}[a{i}]')
filt.append(''.join(f'[a{i}]' for i in range(len(parts))) + f'amix=inputs={len(parts)}:normalize=0,apad=whole_dur={total},atrim=0:{total},loudnorm=I=-14:TP=-1.5:LRA=7,aresample={RATE}[o]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inputs, '-filter_complex', ';'.join(filt), '-map', '[o]', '-ac', '2', str(out / 'vo.wav')], check=True)
tlp.write_text(json.dumps(dict(total=round(total, 3), beats=tl), indent=1))
sp = sum(b['end'] - b['start'] for b in tl); w = sum(len(b['text'].split()) for b in tl)
for b in tl: print(f"[{b['start']:6.2f}–{b['end']:6.2f}] {b['id']:8} {b['text']}")
print(f'TOTAL {total:.2f}s · speech {sp:.1f}s · {w} words · {w/sp*60:.0f} wpm')
