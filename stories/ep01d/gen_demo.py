"""Stories v3 demo — '2.5D studio': Blender clay mascot (no AI video) on real photo plates with depth parallax,
frosted-glass windows with typed text + running highlight line, CapCut captions, ticker, light leaks."""
import json
L = json.load(open('lines.json'))
vo = [{'id': i, 'file': f'vo/{i}.mp3', 'gap': 1.2 if i == 'L20' else 0.4, 'text': t} for i, t in L]
def W(at, word=None, off=0):
    x = {'at': at}
    if word: x['word'] = word
    if off: x['off'] = off
    return x
def P(type, x, y, w, at, word=None, **kw):
    p = {'type': type, 'x': x, 'y': y, 'w': w, 'at': at, 'glass': False}
    if word: p['word'] = word
    p.update(kw); return p
def ln(text, at, word=None, size=48, **kw): return {'text': text, 'size': size, **W(at, word), **kw}
def scene(at, *panels, **kw): return {'at': at, 'type': 'scene', 'panels': list(panels), **kw}
def K(at, word=None, off=0, **kw): return {**W(at, word, off), **kw}
M = {'dir': 'lf/st01d/mascot', 'frames': {'run': 8, 'talk': 60, 'point': 30, 'wave': 30, 'shock': 30}}
def mascot(at, keys, **kw): return P('mascot', 0, 0, 1920, at, fxIn='fade', fxOut='fade', inDur=0.01, keys=keys, **M, **kw)
events = [
 scene('L1',
   mascot('L1', [K('L1', None, -0.8, x=2150, y=1050, h=560, action='talk', move=1.6), K('L1', None, 0.8, x=1610, y=1050, h=560, action='talk'),
                 K('L2', x=1610, y=1050, h=560, action='point', flip=True)], off=-0.8, bright=0.86, warm=0.3),
   P('glasswin', 930, 120, 760, 'L1', None, fxIn='fade', fxOut='fade', kicker='Real situation · Maya, 27', accent='gold',
     lines=[ln('Take-home: $9,800 / month', 'L1', 'nine thousand', 50), ln('$1,000 → TFSA every Monday', 'L1', 'every single', 50, hl=True)]), off=-0.8),
 scene('L3',
   mascot('L3', [K('L3', x=1640, y=1060, h=600, action='talk'), K('L3', 'one percent', x=1640, y=1060, h=600, action='shock')], bright=0.9, warm=0.25),
   P('glasswin', 110, 140, 760, 'L3', 'problem', fxIn='fade', fxOut='fade', kicker='The problem', accent='red',
     lines=[ln('Sometime in 2027…', 'L3', 'sometime', 50), ln('CRA charges 1% / month', 'L3', 'charging', 56, hl=True, accent='red')])),
 scene('L20',
   mascot('L20', [K('L20', None, -0.6, x=-200, y=1060, h=600, action='talk', move=1.4, moving='run', flip=True), K('L20', None, 0.8, x=330, y=1060, h=600, action='point', flip=False)], bright=1.0, warm=0.1),
   P('glasswin', 620, 130, 820, 'L20', 'go over', fxIn='fade', fxOut='fade', kicker='The rule · TFSA', accent='red',
     lines=[ln('Over your TFSA room?', 'L20', 'go over', 46, light=True), ln('1% per month', 'L20', 'one percent', 92, accent='red'),
            ln('on the HIGHEST excess', 'L21', 'highest', 52, hl=True, accent='red'), ln('— not the average', 'L21', 'average', 40, light=True)],
     src='Source: canada.ca — If you owe tax on excess TFSA amounts', srcAt=W('L21', 'highest')), off=-0.6),
]
PL = 'lf/st01d/plates/'
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.07}} for n in ('f1', 'f3', 'f4')}
plates['f3']['steam'] = {'x': 34, 'y': 70}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
shots = [{'plate': 'f1', 'cam': cam((-30, 0, 0.0), (30, -10, 0.28)), **W('L1', None, -0.8)}, {'plate': 'f3', 'cam': cam((40, 10, 0.12), (-40, 0, 0.3)), **W('L3')},
         {'plate': 'f4', 'cam': cam((0, 20, 0.05), (-20, -20, 0.3)), **W('L20', None, -0.6)}]
sfx = [{'name': 'whoosh', 'vol': 0.14, **W('L3')}, {'name': 'whoosh', 'vol': 0.14, **W('L20', None, -0.6)}, {'name': 'thump', 'vol': 0.4, **W('L3', 'one percent')},
       {'name': 'thump', 'vol': 0.35, **W('L20', 'one percent')}, {'name': 'paper', 'vol': 0.15, **W('L1')}, {'name': 'tick', 'vol': 0.18, **W('L21', 'highest')}]
ticker = ['TFSA LIMIT 2026: $7,000', 'EXCESS TFSA AMOUNTS: 1% PER MONTH', 'RRSP 2026: 18% UP TO $33,810', 'FHSA: $8,000 A YEAR', 'SOURCE: CANADA.CA']
ep = {'fps': 30, 'lead': 0.8, 'tail': 1.5, 'footer': 'Based on real situations Canadians shared online · Names and numbers changed · General information, not tax advice',
      'vo': vo, 'chapters': [{'title': 'Real situations · Maya', **W('L1')}, {'title': '02 · What the rules say', **W('L20')}], 'events': events, 'shots': shots, 'plates': plates,
      'film': True, 'captions': True, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/st01d/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('ok')
