"""LF-05 TEST (20-30 s) -> episode.src.json: opening, calculation, comparison chart, look-back stamp."""
import json
L = json.load(open('lines.json'))
vo = [{'id': k, 'file': f'vo/{k}.mp3', 'gap': 0.4, 'text': t} for k, t in L]
def W(at, word=None, off=0):
    d = {'at': at}
    if word: d['word'] = word
    if off: d['off'] = off
    return d
def P(type, x, y, w, at, **kw): return {'type': type, 'x': x, 'y': y, 'w': w, 'at': at, **kw}
def scene(at, *panels, **kw): return {'at': at, 'type': 'scene', 'panels': list(panels), **kw}
D = lambda path: {'ref': f'd.{path}'}
GRN, RED, BLU, YEL = '#7FD3A0', '#E5806E', '#8FB3E8', '#E8C27A'
events = [
 scene('T1', P('collage', 0, 0, 1920, 'T1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': 'lf/lf05/plates/s1.jpg', 'depth': 'lf/lf05/plates/s1_d.png', 'dim': 0.7},
   tiles=[{'src': 'lf/lf05/plates/s1.jpg', 'depth': 'lf/lf05/plates/s1_d.png', 'x': 40, 'y': 70, 'w': 700, 'h': 400, 'rot': -4, 'enter': 'drop', 'delay': 0.12, 'enterDur': 1.0, 'move': 'dolly'},
          {'src': 'lf/lf05/plates/c1.jpg', 'depth': 'lf/lf05/plates/c1_d.png', 'x': 1330, 'y': 50, 'w': 520, 'h': 400, 'rot': 5, 'enter': 'drop', 'delay': 0.38, 'enterDur': 1.0, 'move': 'truck'},
          {'src': 'lf/lf05/plates/c2.jpg', 'depth': 'lf/lf05/plates/c2_d.png', 'x': 1300, 'y': 755, 'w': 540, 'h': 310, 'rot': -4, 'enter': 'slideR', 'delay': 0.7, 'move': 'orbit'},
          {'src': 'lf/lf05/plates/c3.jpg', 'depth': 'lf/lf05/plates/c3_d.png', 'x': 60, 'y': 755, 'w': 540, 'h': 310, 'rot': 4, 'enter': 'pop', 'delay': 0.95, 'move': 'rise'}],
   kicker='DISABILITY TAX CREDIT · CANADA', stat='$16,052', statLabel='2025 DISABILITY AMOUNT · CHILD UNDER 18',
   question='WHO QUALIFIES — AND WHY DO SOME CLAIMS GET DENIED?', cy=255,
   stamp={'text': 'UP TO 10 YEARS BACK', 'x': 700, 'y': 870, 'rot': -6, 'size': 52}, out=W('T2', None, -0.5), statSize=225), off=-1.0),
 scene('T2', P('steps', 330, 200, 1260, 'T2', fxIn='glass', fxOut='collapse', title='THE CALCULATION · 2025', sub='FEDERAL PART ONLY · PROVINCES ADD THEIR OWN', dimOthers=False, items=[
   {'n': '1', 'head': 'DISABILITY AMOUNT: $10,138', 'at': 'T2', 'word': 'ten'},
   {'n': '×', 'head': 'FEDERAL CREDIT RATE: 14.5%', 'text': 'Lowest rate for 2025 (14% from 2026)', 'at': 'T2', 'word': 'fourteen'},
   {'n': '=', 'head': '≈ $1,470 LESS FEDERAL TAX', 'at': 'T2', 'word': 'one thousand, four'}])),
 scene('T3', P('split', 260, 300, 1400, 'T3', fxIn='slideR', fxOut='vapor', title='DISABILITY AMOUNT · 2025', sub='CRA · CLAIMING THE CREDIT', items=D('items'), labelW=560, fs=34, vs=46, noTotal=True,
   note='AMOUNT THAT REDUCES TAX · NOT A PAYMENT', rowAt=[W('T3'), W('T3', 'Sixteen')])),
 scene('T4', P('khero', 160, 330, 1600, 'T4', glass=False, fxIn='glass', fxOut='fade', kicker='APPROVED FOR PAST YEARS?',
   lines=[{'anim': 'decode', 'text': 'UP TO 10 YEARS BACK', 'gold': True, 'size': 150, **W('T4', 'past')}, {'text': 'ASK THE CRA TO ADJUST YOUR RETURNS', 'size': 50, **W('T4', 'ten')}])),
]
PL = 'lf/lf05/plates/'
plates = {'s1': {'photo': {'src': f'{PL}s1.jpg', 'depth': f'{PL}s1_d.png', 'amt': 0.05}, 'lights': [{'x': 83, 'y': 14, 'r': 8, 'color': 'rgba(255,200,130,.9)', 'amp': 0.08}]}}
cam = lambda *k: [dict(x=a, y=b, z=c) for a, b, c in k]
shots = [{'at': 'T1', 'plate': 's1', 'cam': cam((-40, 10, 0.12), (30, -10, 0.0))}, {'at': 'T2', 'plate': 's1', 'cam': cam((40, 0, 0.05), (-30, 0, 0.2))}, {'at': 'T3', 'plate': 's1', 'cam': cam((0, 20, 0.2), (0, -10, 0.08))}]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at']})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{k: v for k, v in r.items() if k in ('at', 'word')}})
ep = {'fps': 30, 'lead': 0.8, 'tail': 1.5, 'footer': 'Sources: CRA — Disability tax credit (claiming the credit, 2025 amounts) · CRA What\'s new for 2025 · General info, not advice',
      'data': {'d': {'type': 'file', 'file': 'data.json'}}, 'vo': vo, 'chapters': [{'at': 'T1', 'title': 'Disability tax credit · test'}], 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx,
      'audio': 'lf/lf05/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('ok')
