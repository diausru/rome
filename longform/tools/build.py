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
WORDS = json.load(open(os.path.join(d, 'words.json'))) if os.path.exists(os.path.join(d, 'words.json')) else {}
t = ep.pop('lead', 0.6); starts = {}; parts = []; lines = {}
for ln in ep.pop('vo', []):
    f = os.path.join(d, ln['file']); starts[ln['id']] = t; L = dur(f); parts.append((t, f))
    lines[ln['id']] = (t, L, ln.get('text', '')); t += L + ln.get('gap', 0.35)
total = t + ep.pop('tail', 1.0)
def at(e):
    if 'at' not in e: return e.pop('t', 0) + e.pop('off', 0)
    lid = e.pop('at'); t0 = starts[lid]
    w = e.pop('word', None)
    if w:   # place on the spoken word: whisper timestamps (words.json) when they match, else character position
        st, L, txt = lines[lid]; i = txt.lower().find(w.lower())
        if i < 0: sys.exit(f"WORD NOT FOUND: '{w}' in {lid}: {txt}")
        t0 = st + L * i / max(1, len(txt))
        ws = WORDS.get(lid)
        if ws:
            import re as _re
            nz = lambda x: _re.sub(r"[^a-z0-9]", "", x.lower())
            target = nz(w.split()[0]); before = len(txt[:i].split())
            cands = [j for j, x in enumerate(ws) if nz(x['w']).startswith(target[:4]) or target.startswith(nz(x['w'])[:4] or '#')]
            if cands:
                j = min(cands, key=lambda j: abs(j - before)); t0 = st + ws[j]['s']
            elif len(ws) == len(txt.split()):
                t0 = st + ws[before]['s']
    return t0 + e.pop('off', 0)

# --- data: every number shown in panels comes from taxcalc (one source) ---
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from taxcalc import take_home, C as TC
def portions(x, br):
    out = []
    for i, (a, r) in enumerate(br):
        b = br[i + 1][0] if i + 1 < len(br) else None
        part = max(0, min(x, b if b else x) - a) if x > a else 0
        out.append(dict(lo=a, hi=b, rate=r, part=round(part, 2), tax=round(part * r, 2)))
    return out
DATA = {}
DATA['facts'] = dict(fed_bpa=TC.FED_BPA, fed_low_rate=TC.FED[0][1], bpa_credit=round(TC.FED_BPA * TC.FED[0][1]))
for name, spec in ep.get('data', {}).items():
    if spec.get('type') == 'file': DATA[name] = json.load(open(os.path.join(d, spec['file']))); continue
    if spec.get('type') == 'steps':   # bracket table on a given income (or 0 = just the table)
        br = TC.FED if spec['table'] == 'FED' else TC.PROV[spec['table']][0]
        rows = portions(spec.get('income', 0), br)
        DATA[name] = dict(rows=rows, total=sum(round(r['tax']) for r in rows), income=spec.get('income', 0)); continue
    if spec.get('type') == 'curve':
        DATA[name] = {pv: [dict(gross=g, take_home=round(take_home(g, pv)['take_home'])) for g in range(spec['from'], spec['to'] + 1, spec['step'])] for pv in spec['provs']}
        continue
    r = take_home(spec['gross'], spec['prov'])
    r = {k: (round(v) if isinstance(v, float) and k not in ('avg_income_tax', 'top_bracket_rate') else v) for k, v in r.items()}
    r['income_tax'] = r['federal'] + r['provincial']
    r['deductions'] = r['income_tax'] + r['cpp'] + r['ei']
    r['fed_brackets'] = portions(take_home(spec['gross'], spec['prov'])['taxable'], TC.FED)
    r['prov_brackets'] = portions(take_home(spec['gross'], spec['prov'])['taxable'], TC.PROV[spec['prov']][0])
    r['fed_before_credits'] = round(sum(b['tax'] for b in r['fed_brackets']))
    r['take_home'] = r['gross'] - r['deductions']
    r['real_rate'] = r['income_tax'] / r['gross']
    u0, u1 = take_home(spec['gross'], spec['prov']), take_home(spec['gross'] + 100, spec['prov'])
    r['next_dollar_rate'] = ((u1['federal'] + u1['provincial']) - (u0['federal'] + u0['provincial'])) / 100
    r['fed_top_rate'] = [b['rate'] for b in r['fed_brackets'] if b['part'] > 0][-1]
    r['prov_top_rate'] = [b['rate'] for b in r['prov_brackets'] if b['part'] > 0][-1]
    if spec.get('raise'):
        r['raise'] = spec['raise']; r['raise_tax'] = int(spec['raise'] * r['top_bracket_rate'] + 0.5); r['raise_keep'] = spec['raise'] - r['raise_tax']
    DATA[name] = r
ep['data'] = DATA
def ref(path):
    o = DATA
    for k in path.split('.'): o = o[k]
    return o
def walk(o, base=None):
    if isinstance(o, dict):
        if 'ref' in o: o['value'] = ref(o['ref'])
        if 'refs' in o: o['value'] = sum(ref(x) for x in o['refs'])
        if 'expr' in o:   # e.g. "priya.take_home - daniel.take_home" ; only names.fields, numbers and + - * / ( )
            import re
            ex = re.sub(r'[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)+', lambda m: repr(ref(m.group(0))), o['expr'])
            if re.search(r'[^0-9.+\-*/() eE]', ex): sys.exit(f"BAD EXPR: {o['expr']}")
            o['value'] = eval(ex)
        if 'at' in o or 'word' in o:
            if 'at' not in o and base: o['at'] = base
            o['t'] = round(at(o), 3)
        for k, v in list(o.items()): walk(v, base=o.get('at', base) if isinstance(o.get('at'), str) else base)
    elif isinstance(o, list):
        for v in o: walk(v, base)
for c in ep.get('chapters', []): c['t'] = round(at(c), 3)
for sh in ep.get('shots', []): sh['t'] = round(at(sh), 3)
for fx in ep.get('sfx', []): fx['t'] = round(at(fx), 3)
evs = ep['events']
for e in evs:
    base = e.get('at'); e['t'] = round(at(e), 3)
    for k in ('panels',):
        for pnl in e.get(k, []):
            if 'at' not in pnl and 'word' in pnl: pnl['at'] = base
            if 'at' not in pnl and 'word' not in pnl and 't' not in pnl: pnl['t'] = e['t']
            pb = pnl.get('at') if isinstance(pnl.get('at'), str) else base
            if 'at' in pnl or 'word' in pnl: pnl['t'] = round(at(pnl), 3)
            for row in pnl.get('rows', []) + pnl.get('steps', []):
                if 'word' in row and 'at' not in row: row['at'] = pb
                if 'at' in row: row['t'] = round(at(row), 3)
            walk(pnl)
# consistency: a table that ends in 'take_home' must reconcile with its rows
for e in evs:
    for pnl in e.get('panels', []):
        if pnl.get('type') == 'table' and pnl.get('check'):
            vals = {r.get('key'): r.get('value') for r in pnl['rows']}
            g, th = vals.get('gross'), vals.get('take_home')
            ded = sum(r['value'] for r in pnl['rows'] if r.get('sign') == '-')
            if g is not None and th is not None and abs(g - ded - th) > 1:
                sys.exit(f"CHECK FAILED: table '{pnl.get('title')}' {g} - {ded} != {th}")
            print(f"check ok: table '{pnl.get('title')}' {g:,} - {ded:,} = {th:,}")
main = sorted([e for e in evs if not e.get('overlay')], key=lambda e: e['t'])
for i, e in enumerate(main):
    if 'dur' not in e: e['dur'] = round((main[i+1]['t'] if i+1 < len(main) else total) - e['t'], 3)
for e in evs: e.setdefault('dur', 4)
# calculation check: every waterfall must reconcile before anything renders
for e in evs:
    if e.get('type') == 'waterfall':
        bal = e['start'] - sum(r['value'] for r in e['rows'])
        if 'final' in e and abs(bal - e['final']) > 0.5:
            sys.exit(f"CHECK FAILED: '{e['title']}' ends at {bal} but final says {e['final']}")
        print(f"check ok: {e['title']} -> {bal:,.0f}")
ep['duration'] = round(total, 3)
if parts:
    ins, flt = [], []
    for i, (st, f) in enumerate(parts):
        ins += ['-i', f]; flt.append(f'[{i}]aresample=48000,adelay={int(st*1000)}:all=1[a{i}]')
    flt.append(''.join(f'[a{i}]' for i in range(len(parts))) + f'amix=inputs={len(parts)}:normalize=0,apad,atrim=0:{total},loudnorm=I=-14:TP=-1.5[o]')
    subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(flt),'-map','[o]','-ac','1',os.path.join(d,'vo.wav')], check=True)
    if ep.get('sfx'):   # SFX bed under the VO (paper, clicks, whooshes), placed on the same timeline
        sd = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sfx')
        ins, flt = ['-i', os.path.join(d, 'vo.wav')], []
        for i, fx in enumerate(ep['sfx'], 1):
            ins += ['-i', os.path.join(sd, fx['name'] + '.wav')]
            flt.append(f"[{i}]aresample=48000,volume={fx.get('vol', 0.18)},adelay={int(fx['t']*1000)}:all=1[s{i}]")
        flt.append('[0]' + ''.join(f'[s{i}]' for i in range(1, len(ep['sfx']) + 1)) + f"amix=inputs={len(ep['sfx'])+1}:normalize=0,atrim=0:{total},alimiter=limit=0.89[o]")
        subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(flt),'-map','[o]','-ac','1',os.path.join(d,'mix.wav')], check=True)
        print(f"sfx: {len(ep['sfx'])} cues mixed -> mix.wav")
    ep['audio'] = ep.get('audio') or 'VO_PLACEHOLDER'
json.dump(ep, open(os.path.join(d, 'episode.json'), 'w'), indent=1)
with open(os.path.join(d, 'timeline.txt'), 'w') as fo:
    for k, v in starts.items(): fo.write(f'{int(v//60):02d}:{v%60:05.2f}  {k}\n')
print(f'built: {len(parts)} VO lines, {len(evs)} events, duration {int(total//60)}:{total%60:04.1f}')
