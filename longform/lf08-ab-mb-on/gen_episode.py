"""LF-08 Same $100K in Calgary / Toronto / Winnipeg. NEW intro: RaceHook (three lanes drain on cue, photo finish). Numbers from data.json."""
import json
L = json.load(open('lines.json')); d = json.load(open('data.json')); k = d['k']
CH = {'L5', 'L9', 'L14', 'L22', 'L28', 'L38', 'L45', 'L52', 'L55'}
vo = [{'id': i, 'file': f'vo/{i}.mp3', 'gap': 1.0 if i in CH else 0.35, 'text': t} for i, t in L]
RED, ORG, BLU, YEL, GRN = '#E5806E', '#E8A86A', '#8FB3E8', '#E8C27A', '#7FD3A0'
def W(at, word=None, off=0):
    x = {'at': at}
    if word: x['word'] = word
    if off: x['off'] = off
    return x
def P(type, x, y, w, at, word=None, **kw):
    p = {'type': type, 'x': x, 'y': y, 'w': w, 'at': at}
    if word: p['word'] = word
    p.update(kw); return p
def scene(at, *panels, **kw): return {'at': at, 'type': 'scene', 'panels': list(panels), **kw}
def K(at, lines, kicker=None, fxIn='glass', fxOut='vapor', y=300, **kw):
    return scene(at, P('khero', 160, y, 1600, at, glass=False, fxIn=fxIn, fxOut=fxOut, lines=lines, **({'kicker': kicker} if kicker else {}), **kw))
def ln(text, size=90, at=None, word=None, off=0, **kw): return {'text': text, 'size': size, **(W(at, word, off) if at else {}), **kw}
def mo(seq, size=110, at=None, gold=False): return {'anim': 'morph', 'size': size, 'gold': gold, 'seq': seq, **W(at)}
def dc(text, size=110, at=None, word=None, gold=True): return {'anim': 'decode', 'text': text, 'size': size, 'gold': gold, **W(at, word)}
def ST(at, title, items, x=260, y=170, w=1400, fxIn='sweep', fxOut='collapse', **kw):
    return scene(at, P('steps', x, y, w, at, fxIn=fxIn, fxOut=fxOut, title=title, items=items, **kw))
def it(n, head, at, word=None, text=None):
    x = {'n': n, 'head': head, 'at': at}
    if word: x['word'] = word
    if text: x['text'] = text
    return x
def SPLIT(at, title, sub, items, rowAt, note, x=260, y=290, w=1400, fxIn='slideR', fxOut='vapor', **kw):
    return scene(at, P('split', x, y, w, at, fxIn=fxIn, fxOut=fxOut, title=title, sub=sub, labelW=520, fs=36, vs=52, noTotal=True, items=items, rowAt=rowAt, note=note, **kw))
m = lambda v: '${:,}'.format(v)
C3 = [('CALGARY', 'AB'), ('TORONTO', 'ON'), ('WINNIPEG', 'MB')]
def row(g): return [{'name': n, 'value': k[p][str(g)]['take_home']} for n, p in C3]
PL = 'lf/lf08/plates/'
fed = k['AB']['100000']['federal']; cpp = k['AB']['100000']['cpp']; ei = k['AB']['100000']['ei']
events = [
 scene('L1', P('race', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.62}, kicker='SAME JOB · SAME $100,000 · 2026', title='3 CITIES. 1 SALARY.', finishTitle='PHOTO FINISH',
   gross=100000, lanes=[{'name': n, 'sub': {'AB': 'ALBERTA', 'ON': 'ONTARIO', 'MB': 'MANITOBA'}[p], 'prov': k[p]['100000']['provincial'], 'take': k[p]['100000']['take_home']} for n, p in C3],
   common=[{'label': 'FEDERAL TAX', 'value': fed, 'color': RED}, {'label': 'CPP', 'value': cpp, 'color': BLU}, {'label': 'EI', 'value': ei, 'color': YEL}], provColor=ORG,
   laneAt=[W('L1', 'Calgary'), W('L1', 'Toronto'), W('L1', 'Winnipeg')], drainAt=[W('L2', 'Federal'), W('L2', 'C P P'), W('L2', 'E I'), W('L2', 'provincial')], finishAt=W('L3', 'ahead'),
   gaps=[{'lane': 1, 'text': f"−{m(d['gap100']['AB_ON'])}"}, {'lane': 2, 'text': f"−{m(d['gap100']['AB_MB'])}", 'red': True}],
   qAt=W('L4', 'second'), question='AND THE PAYCHEQUE ISN’T THE FINISH LINE', out=W('L5', None, -0.9)), off=-1.0),
 ST('L5', '3 RACES IN THIS VIDEO', [it('1', 'THE PAYCHEQUE', 'L4', 'paycheque'), it('2', 'THE CHECKOUT', 'L4', 'checkout'), it('3', 'A DIFFERENT SALARY', 'L4', 'salary')], fxIn='glass', dimOthers=True, y=270),
 # 01 same part
 ST('L6', 'IDENTICAL IN ALL 3 CITIES @ $100,000', [it('FED', f"FEDERAL TAX {m(fed)}", 'L7', 'thirteen'), it('CPP', f"CPP {m(cpp)}", 'L8', 'C P P'), it('EI', f"EI {m(ei)}", 'L8', 'E I'),
   it('=', '≈ $19,000 · LOCATION-PROOF', 'L9', 'nineteen')], fxIn='stagger', dimOthers=True, y=210),
 # 02 provincial
 SPLIT('L10', 'ROUND 1 · PROVINCIAL INCOME TAX @ $100,000', '2026 · LOWER IS BETTER', [{'name': n, 'value': k[p]['100000']['provincial']} for n, p in C3],
       [W('L11', 'Alberta'), W('L12', 'Ontario'), W('L13', 'Manitoba')], 'ONTARIO INCLUDES HEALTH PREMIUM $750 + SURTAX ≈$26', fxIn='glass'),
 K('L14', [mo([{'text': 'ON −$253', 't': 0}, {'text': 'MB −$3,014', **W('L14', 'Manitoba')}], 140, 'L14', gold=True), ln('VS ALBERTA · PROVINCIAL TAX', 54, 'L14', 'behind')], kicker='AFTER ROUND 1', fxOut='particles'),
 # 03 why
 ST('L15', 'TWO DESIGNS', [it('AB', '8% FROM THE START · BIG BASIC AMOUNT $22,769', 'L16', 'Alberta'), it('ON', '5.05% TO $53,891 · THEN 9.15%', 'L17', 'Ontario'),
   it('=', '@ $100,000: ALMOST THE SAME RESULT', 'L18', 'same')], fxIn='slideL', dimOthers=True, y=230),
 ST('L19', 'THE NEXT STEPS UP', [it('MB', '10.8% → 12.75% FROM $47,000', 'L19', 'Manitoba'), it('AB', '10% UNTIL $154,259', 'L20', 'Alberta'),
   it('ON', '11.16% FROM $107,785 · 12.16% FROM $150,000 + SURTAX', 'L21', 'Ontario'), it('MB', '17.4% ABOVE $100,000', 'L22', 'seventeen')], fxIn='glass', dimOthers=True, y=180),
 # 04 photo finish (province table)
 scene('L23', P('provinces', 220, 170, 1480, 'L23', fxIn='glass', fxOut='vapor', title='PHOTO FINISH · TAKE-HOME @ $100,000', sub='2026 · SINGLE EMPLOYEE · EXAMPLE',
   cols=[{'name': n, 'value': {kk: k[p]['100000'][kk] for kk in ('federal', 'provincial', 'cpp', 'ei', 'take_home')}, **W('L' + str(24 + i))} for i, (n, p) in enumerate(C3)], lead=W('L24', 'Calgary'))),
 SPLIT('L27', 'TAKE-HOME PER MONTH', '@ $100,000 · 2026', [{'name': n, 'value': d['month100'][p]} for n, p in C3], [W('L27', 'Calgary'), W('L27', 'Toronto'), W('L27', 'Winnipeg')], 'CALGARY vs TORONTO: $21 A MONTH'),
 # 05 checkout
 K('L29', [dc('RACE 2 · THE CHECKOUT', 120, 'L29', 'race')], kicker='WHERE THE MONEY GOES NEXT', fxIn='glass', fxOut='wipe', y=330),
 ST('L30', 'SALES TAX · GENERAL RATE', [it('AB', 'GST 5%', 'L30', 'Alberta'), it('MB', 'GST 5% + RST 7% = 12%', 'L31', 'Manitoba'), it('ON', 'HST 13%', 'L32', 'Ontario')], fxIn='stagger', dimOthers=True, y=270),
 SPLIT('L33', 'TAX ON EVERY $1,000 OF TAXABLE PURCHASES', 'GENERAL RATE', [{'name': n, 'value': d['per1000'][p]} for n, p in C3], [W('L33', 'fifty'), W('L33', 'Toronto'), W('L33', 'Winnipeg')], 'GROCERIES AND MANY ITEMS AREN’T TAXED'),
 SPLIT('L35', 'ILLUSTRATION: $20,000 OF TAXABLE PURCHASES A YEAR', 'SALES TAX PAID', [{'name': n, 'value': d['sales_tax'][p]} for n, p in C3], [W('L35', 'Calgary'), W('L35', 'Toronto'), W('L35', 'Winnipeg')], 'YOUR NUMBER DEPENDS ON WHAT YOU BUY', fxIn='glass'),
 SPLIT('L36', 'AFTER THE CHECKOUT', '$100,000 TAKE-HOME − SALES TAX (ILLUSTRATION)', [{'name': n, 'value': d['after_spend'][p]} for n, p in C3], [W('L36', 'Calgary'), W('L36', 'Toronto'), W('L36', 'Winnipeg')],
       'CALGARY vs TORONTO ≈ $1,850 · CALGARY vs WINNIPEG ≈ $4,400', fxIn='slideL'),
 # 06 salary
 K('L39', [dc('RACE 3 · A DIFFERENT SALARY', 110, 'L39', 'three')], fxIn='glass', fxOut='wipe', y=330),
 SPLIT('L40', 'TAKE-HOME @ $60,000', '2026', row(60000), [W('L40', 'Calgary'), W('L40', 'Toronto'), W('L40', 'Winnipeg')], 'CALGARY vs TORONTO: $351'),
 SPLIT('L42', 'TAKE-HOME @ $150,000', '2026', row(150000), [W('L42', 'Calgary'), W('L42', 'Toronto'), W('L42', 'Winnipeg')], f"CALGARY vs TORONTO: {m(d['gap150']['AB_ON'])}", fxIn='glass'),
 ST('L44', 'WHY THE GAP OPENS', [it('ON', 'HIGHER BRACKETS + SURTAX ABOVE ≈$100K', 'L44', 'Ontario'), it('AB', '10% ALL THE WAY TO $154,259', 'L44', 'Alberta'),
   it('MB', f"BEHIND AT EVERY SALARY: {m(d['gap60']['AB_MB'])} · {m(d['gap100']['AB_MB'])} · {m(d['gap150']['AB_MB'])}", 'L45', 'behind')], fxIn='slideR', dimOthers=True, y=230),
 # 07 next dollar + rrsp
 SPLIT('L46', '+$1,000 RAISE @ $100,000 · HOW MUCH STAYS', '2026', [{'name': n, 'value': d['keep1000'][p]} for n, p in C3], [W('L47', 'Calgary'), W('L47', 'Toronto'), W('L47', 'Winnipeg')], 'REPEATS ON EVERY DOLLAR'),
 SPLIT('L49', 'TAX SAVED BY A $10,000 DEDUCTION @ $100,000', 'RRSP · ASSUMES ROOM', [{'name': n, 'value': d['rrsp10k'][p]} for n, p in C3], [W('L50', 'Calgary'), W('L50', 'Toronto'), W('L50', 'Winnipeg')],
       'HIGHER RATES CUT BOTH WAYS', fxIn='glass'),
 SPLIT('L52', 'SAME DEDUCTION @ $150,000', 'RRSP · ASSUMES ROOM', [{'name': n, 'value': d['rrsp10k_150'][p]} for n, p in C3], [W('L52', 'Calgary'), W('L52', 'Toronto'), W('L52', 'Winnipeg')], 'TORONTO ≈ WINNIPEG', fxIn='slideL'),
 # 08 what tax doesn't show
 ST('L53', 'WHAT A TAX CALCULATOR CAN’T SHOW', [it('1', 'RENT · HOME PRICES', 'L54', 'Rent'), it('2', 'CAR INSURANCE', 'L54', 'insurance'), it('3', 'SALARY FOR THE SAME JOB', 'L54', 'salaries'),
   it('!', 'CAN BE BIGGER THAN EVERY NUMBER HERE', 'L54', 'bigger')], fxIn='glass', dimOthers=True, y=210),
 # verdict
 K('L56', [dc('SO, WHO WINS?', 160, 'L56', 'wins')], fxIn='focus', fxOut='wipe', y=330),
 ST('L57', 'THE VERDICT', [it('1', 'PAYCHEQUE @ $100K: CALGARY, BY A NOSE', 'L57', 'paycheque'), it('2', 'CHECKOUT: CALGARY PULLS AWAY', 'L58', 'checkout'),
   it('3', 'HIGHER SALARY: THE GAP GROWS · WINNIPEG PAYS MOST', 'L59', 'higher'), it('!', 'PRICE HOUSING + THE JOB FIRST', 'L60', 'housing')], fxIn='glass', dimOthers=True, y=200),
 K('L61', [mo([{'text': 'A SIDE HUSTLE', 't': 0}, {'text': 'HOW MUCH DO YOU KEEP?', **W('L61', 'How')}], 120, 'L61', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L61', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'The race'), ('L6', '01 · What’s the same'), ('L10', '02 · Provincial tax'), ('L15', '03 · Two designs'), ('L23', '04 · Photo finish'),
  ('L29', '05 · The checkout'), ('L39', '06 · A different salary'), ('L46', '07 · Raises & deductions'), ('L53', '08 · What tax can’t show'), ('L56', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L6', 's6', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L11', 's2', cam((-50, 10, 0.2), (40, -10, 0.05))), ('L12', 's3', cam((40, 0, 0.0), (-40, 0, 0.2))),
     ('L13', 's4', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L15', 's6', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L23', 's8', cam((0, 0, 0.0), (0, 0, 0.3))), ('L29', 's5', cam((50, 0, 0.12), (-50, 0, 0.12))),
     ('L39', 's2', cam((-60, 10, 0.0), (40, -10, 0.15))), ('L42', 's3', cam((10, 0, 0.3), (-10, 0, 0.05))), ('L46', 's6', cam((-40, 0, 0.05), (40, 0, 0.18))), ('L53', 's7', cam((40, 0, 0.18), (-40, 0, 0.05))),
     ('L56', 's8', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []) + (p.get('cols') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
for r in h['drainAt']: sfx.append({'name': 'tick', 'vol': 0.15, **r})
sfx.append({'name': 'whoosh', 'vol': 0.2, **h['finishAt']})
for s in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': s['at']})
ticker = [f"CALGARY {m(k['AB']['100000']['take_home'])}", f"TORONTO {m(k['ON']['100000']['take_home'])}", f"WINNIPEG {m(k['MB']['100000']['take_home'])}", 'SALES TAX: AB 5% · MB 12% · ON 13%',
          f"@ $150K: AB vs ON {m(d['gap150']['AB_ON'])}", 'FEDERAL TAX IDENTICAL: $13,302', '2026 RATES · SINGLE EMPLOYEE EXAMPLE']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: 2026 federal, Alberta, Ontario, Manitoba rates · GST/HST/RST general rates · Example calculation, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf08/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
