#!/usr/bin/env python3
"""Long-form engine build step (machine #1).
episode.src.json -> VO track + resolved episode.json for the LongForm Remotion composition.

src format:
  {"fps":30, "footer":..., "plate":..., "music":...,
   "vo": [{"id":"L1","file":"vo/L1.mp3","gap":0.35}, ...],   # ordered narration lines (Grady mp3s)
   "chapters":[{"at":"L5","title":"01 · The rules"}],
   "events":[{"at":"L1","off":0.2,"type":"hook",...,"dur":5}, ...]}
  - "at" = VO line id (event starts when that line starts) + optional "off" seconds; or plain "t".
  - "dur" omitted -> lasts until the next event that has no "overlay": true.
Output (next to src): vo.wav (mono 48 kHz, lines placed with gaps), episode.json, timeline.txt.
"""
import json, subprocess, sys, os
src = sys.argv[1]; d = os.path.dirname(os.path.abspath(src)); ep = json.load(open(src))
def dur(f): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]).decode())
t = ep.pop('lead', 0.6); starts = {}; parts = []
for ln in ep.pop('vo', []):
    f = os.path.join(d, ln['file']); starts[ln['id']] = t; L = dur(f); parts.append((t, f)); t += L + ln.get('gap', 0.35)
total = t + ep.pop('tail', 1.0)
def at(e):
    return (starts[e.pop('at')] if 'at' in e else e.pop('t', 0)) + e.pop('off', 0)
for c in ep.get('chapters', []): c['t'] = round(at(c), 3)
evs = ep['events']
for e in evs: e['t'] = round(at(e), 3)
main = sorted([e for e in evs if not e.get('overlay')], key=lambda e: e['t'])
for i, e in enumerate(main):
    if 'dur' not in e: e['dur'] = round((main[i+1]['t'] if i+1 < len(main) else total) - e['t'], 3)
for e in evs: e.setdefault('dur', 4)
ep['duration'] = round(total, 3)
if parts:
    ins, flt = [], []
    for i, (st, f) in enumerate(parts):
        ins += ['-i', f]; flt.append(f'[{i}]aresample=48000,adelay={int(st*1000)}:all=1[a{i}]')
    flt.append(''.join(f'[a{i}]' for i in range(len(parts))) + f'amix=inputs={len(parts)}:normalize=0,apad,atrim=0:{total},loudnorm=I=-14:TP=-1.5[o]')
    subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(flt),'-map','[o]','-ac','1',os.path.join(d,'vo.wav')], check=True)
    ep['audio'] = ep.get('audio') or 'VO_PLACEHOLDER'
json.dump(ep, open(os.path.join(d, 'episode.json'), 'w'), indent=1)
with open(os.path.join(d, 'timeline.txt'), 'w') as fo:
    for k, v in starts.items(): fo.write(f'{int(v//60):02d}:{v%60:05.2f}  {k}\n')
print(f'built: {len(parts)} VO lines, {len(evs)} events, duration {int(total//60)}:{total%60:04.1f}')
