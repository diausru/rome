"""Stories v2 pilot (Ep01 L1–L8): mascot narrator in photoreal AI clips + code cards, light, ticker."""
import json
L = json.load(open('lines.json'))
vo = [{'id': i, 'file': f'vo/{i}.mp3', 'gap': 1.0 if i in ('L4', 'L6') else 0.4, 'text': t} for i, t in L]
def W(at, word=None, off=0):
    x = {'at': at}
    if word: x['word'] = word
    if off: x['off'] = off
    return x
def P(type, x, y, w, at, word=None, **kw):
    p = {'type': type, 'x': x, 'y': y, 'w': w, 'at': at, 'glass': False}
    if word: p['word'] = word
    p.update(kw); return p
def chip(at, lines, kicker=None, word=None, x=1240, y=250, w=600, **kw):
    return P('chip', x, y, w, at, word, lines=lines, fxIn='slideR', fxOut='fade', **({'kicker': kicker} if kicker else {}), **kw)
def ln(text, at=None, word=None, size=46, tone=None):
    x = {'text': text, 'size': size}
    if tone: x['tone'] = tone
    if at: x.update(W(at, word))
    return x
def scene(at, *panels, **kw): return {'at': at, 'type': 'scene', 'panels': list(panels), **kw}
events = [
 scene('L1', chip('L1', [ln('$1,000', 'L1', None, 96, 'green'), ln('every Monday → TFSA', 'L1', 'every single', 44), ln('= a penalty waiting', 'L3', 'one percent', 50, 'red')], kicker='Take-home $9,800 / month', rot=-1.2), off=-0.8),
 scene('L4', P('lower', 56, 840, 1500, 'L4', text='Based on real situations Canadians shared online. Names and numbers changed. General information, not tax advice.', fxIn='fade', fxOut='fade')),
 scene('L6', chip('L6', [ln('Maya, 27', 'L6', 'Maya', 64), ln('Mississauga', 'L6', 'Mississauga', 40), ln('Job #1 + Job #2', 'L6', 'two good', 50, 'green')], kicker='Year 1 · 2026', y=230)),
 scene('L7', chip('L7', [ln('No kids · single · no car', 'L7', 'No kids', 40)], y=700)),
 scene('L8', P('phone', 1400, 120, 380, 'L8', 'both', title='CHEQUING', balance=9800, balanceSub='take-home this month', rot=5, fxIn='slideUp', fxOut='fade',
               rows=[{'label': 'Job #1 · payroll', 'value': 'deposit', **W('L8', 'both')}, {'label': 'Job #2 · payroll', 'value': 'deposit', **W('L8', 'jobs')}])),
]
CL = 'lf/st01v2/clips/'
clips = [{'src': CL + 'c1.mp4', **W('L1', None, -0.8), 'rate': 0.6}, {'src': CL + 'c4.mp4', **W('L3'), 'rate': 0.75}, {'src': CL + 'c3.mp4', **W('L4'), 'rate': 0.55},
         {'src': CL + 'c2.mp4', **W('L6'), 'rate': 0.8}, {'src': CL + 'c1.mp4', **W('L7'), 'from': 4}, {'src': CL + 'c4.mp4', **W('L8'), 'from': 2, 'rate': 0.7}]
sfx = [{'name': 'whoosh', 'vol': 0.1, **{k: v for k, v in c.items() if k in ('at', 'word', 'off')}} for c in clips[1:]]
sfx += [{'name': 'paper', 'vol': 0.16, 'at': e['at']} for e in events[1:]]
ticker = ['TFSA LIMIT 2026: $7,000', 'EXCESS TFSA AMOUNTS: 1% PER MONTH', 'RRSP 2026: 18% UP TO $33,810', 'FHSA: $8,000 A YEAR', 'SOURCE: CANADA.CA']
ep = {'fps': 30, 'lead': 0.8, 'tail': 1.5, 'footer': 'Real situations · Tax Secrets Canada · General information, not tax advice',
      'vo': vo, 'chapters': [{'at': 'L1', 'title': 'Real situations · Maya'}, {'at': 'L6', 'title': '01 · The story'}], 'events': events, 'clips': clips, 'sfx': sfx, 'ticker': ticker,
      'audio': 'lf/st01v2/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('ok')
