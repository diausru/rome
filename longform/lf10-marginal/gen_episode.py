import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L8", "L13", "L16", "L27", "L32", "L41", "L50", "L55", "L58", "L63", "L68"}
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
PL = 'lf/lf10/plates/'
H = d['hook']; Z = d['zones']; RR = d['rrsp1000']; CV = d['curve']
names = [('MAYA', 65000), ('JORDAN', 90000), ('ALEX', 120000)]
def rv(at, word, x, off=0): return {**W(at, word, off), 'x': x}
def mk(at, word, x, text, color=None, dy=-70, anchor='start'):
    o = {**W(at, word), 'x': x, 'text': text, 'dy': dy, 'anchor': anchor}
    if color: o['color'] = color
    return o
def pin(at, word, x, name): return {**W(at, word), 'x': x, 'name': name}
def CURVE(at, reveal, marks, pins, out=None, bands=None, xr=(45000, 270000), xt=(50000, 75000, 100000, 125000, 150000, 175000, 200000, 225000, 250000)):
    return scene(at, P('curve', 0, 0, 1920, at, glass=False, fxIn='fade', fxOut='fade', title='TAKEN FROM THE NEXT $1,000', sub='2026 · ONTARIO · SINGLE EMPLOYEE · FED + ON TAX + SURTAX + OHP + CPP + EI',
        data=CV, xr=list(xr), yr=[200, 650], xticks=list(xt),
        revealAt=reveal, marks=marks, pins=pins, bands=bands or [], **({'out': out} if out else {})))
events = [
 scene('L1', P('gauges', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.62}, kicker='SAME COMPANY · SAME $1,000 RAISE · 2026', title='WHO KEEPS THE MOST?', finishTitle='THE MIDDLE EARNER KEEPS THE MOST',
   people=[{'name': n, 'sub': f"SALARY {m(g)}", 'taken': H[str(g)]['taken'], 'keep': H[str(g)]['keep']} for n, g in names],
   swingAt=[W('L2', 'keeps'), W('L3', 'keeps'), W('L4', 'keeps')], finishAt=W('L5', 'Wait'), winner=1,
   delta=f"+${H['90000']['keep'] - H['65000']['keep']} vs MAYA", qAt=W('L6', 'real'), question='THE REAL TAX RATE ON YOUR NEXT DOLLAR', out=W('L8', None, -0.9)), off=-1.0),
 K('L7', [ln('2026 · ONTARIO · SINGLE · EMPLOYMENT INCOME ONLY', 46, 'L7'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L7', 'Examples')], kicker='THE FINE PRINT', fxIn='glass', y=360),
 # 01 myth
 K('L8', [dc('THE MYTH THAT WON’T DIE', 120, 'L8', 'myth')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L9', 'HOW BRACKETS REALLY WORK', [it('1', 'ONLY DOLLARS ABOVE THE LINE PAY THE HIGHER RATE', 'L9', 'above'), it('2', 'EVERYTHING BELOW STAYS THE SAME', 'L9', 'below'),
   it('=', 'A RAISE NEVER SHRINKS TAKE-HOME (EMPLOYEE)', 'L10', 'shrink'), it('?', 'BUT TAX ISN’T THE ONLY THING TAKEN', 'L11', 'only')], fxIn='glass', dimOthers=True, y=210),
 K('L12', [mo([{'text': 'YOUR NEXT $1,000', 't': 0}, {'text': 'HOW MUCH LEAVES?', **W('L12', 'leaves')}], 130, 'L12', gold=True)], kicker='THE REAL QUESTION', fxOut='particles'),
 # 02 five pieces
 ST('L13', '5 THINGS TAKE A PIECE', [it('FED', 'FEDERAL TAX', 'L14', 'Federal'), it('ON', 'ONTARIO TAX', 'L14', 'Ontario'), it('SUR', 'ONTARIO SURTAX', 'L14', 'surtax'),
   it('CPP', 'CANADA PENSION PLAN', 'L14', 'C P P'), it('EI', 'EMPLOYMENT INSURANCE', 'L14', 'E I')], fxIn='stagger', dimOthers=True, y=180),
 K('L15', [ln('ADD THEM UP =', 60, 'L15'), ln('YOUR REAL MARGINAL RATE', 80, 'L15', 'real', gold=True)], fxIn='glass', y=350),
 # 03 the line (part 1)
 CURVE('L16', [rv('L16', None, 45000), rv('L17', 'fifty', 50500), rv('L18', 'fifty-three', 54400), rv('L18', 'fifty-five', 55500), rv('L19', 'fifty-eight', 59100), rv('L19', 'sixty', 60500), rv('L21', 'down', 68500),
   rv('L22', 'stops', 70000), rv('L23', 'stops', 75500), rv('L24', 'stops', 86000), rv('L25', 'ninety', 91000)],
   [mk('L18', 'fifty-three', 54400, 'ON 9.15%', dy=-60), mk('L19', 'fifty-eight', 59100, 'FED 20.5%', dy=-120), mk('L22', 'stops', 68900, 'EI MAX $68,900', '#7FD3A0', dy=-150, anchor='end'),
    mk('L23', 'C P P', 74600, 'CPP MAX $74,600', '#7FD3A0', dy=-100), mk('L24', 'eighty-five', 85000, 'CPP2 MAX $85,000', '#7FD3A0', dy=-50)],
   [pin('L20', 'Maya', 65000, 'MAYA'), pin('L25', 'Jordan', 90000, 'JORDAN')], bands=[{**W('L21', 'down'), 'x0': 68900, 'x1': 85000, 'text': 'THE VALLEY', 'color': 'rgba(127,211,160,.08)'},
   {**W('L17', 'fifty'), 'x0': 47500, 'x1': 49000, 'text': 'OHP*', 'color': 'rgba(229,128,110,.14)'}, {**W('L22', 'stops'), 'x0': 71500, 'x1': 73000, 'text': 'OHP*', 'color': 'rgba(229,128,110,.14)'}],
   xr=(45000, 100000), xt=(50000, 60000, 70000, 80000, 90000, 100000)),
 K('L26', [ln('JORDAN ISN’T IN A LOWER BRACKET', 60, 'L26', 'lower'), ln('CPP + EI ARE DONE FOR THE YEAR', 70, 'L26', 'finished', gold=True)], kicker='THE ANSWER', fxIn='glass', y=340),
 # 04 pay stub
 ST('L27', 'ON A PAY STUB · $90,000 PAID EVENLY', [it('1', 'CPP + EI OFF EVERY PAY UNTIL THE YEARLY MAX', 'L28', 'maximum'), it('EI', 'RUNS OUT ROUGHLY IN THE FALL', 'L29', 'fall'),
   it('CPP', 'A FEW WEEKS LATER · CPP2 NEAR YEAR-END', 'L29', 'weeks'), it('↑', 'LAST PAYCHEQUES OF THE YEAR ARE BIGGER', 'L30', 'bigger'), it('JAN', 'COUNTERS RESET', 'L31', 'reset')], fxIn='slideR', dimOthers=True, y=180),
 # 05 the line (part 2)
 CURVE('L32', [rv('L32', None, 91000), rv('L33', 'surtax', 100500), rv('L34', 'seven', 108300), rv('L34', 'eleven', 112000), rv('L35', 'seventeen', 117600), rv('L35', 'twenty-six', 121000), rv('L36', 'fifty', 151000), rv('L36', 'sixty', 161000),
   rv('L37', 'twenty-nine', 191000), rv('L38', 'thirty', 231000), rv('L38', 'thirty-three', 268000)],
   [mk('L33', 'surtax', 98600, 'ON SURTAX', dy=-90, anchor='end'), mk('L34', 'seven', 108300, 'ON 11.16%', dy=-150), mk('L35', 'seventeen', 117600, 'FED 26%', dy=-100),
    mk('L36', 'fifty', 150500, 'ON 12.16%', dy=-80), mk('L37', 'twenty-nine', 181500, 'FED 29% + BPA SHRINKS', dy=-90), mk('L38', 'thirty', 220500, 'ON 13.16%', dy=-120),
    mk('L38', 'thirty-three', 258500, 'FED 33%', dy=-80, anchor='end')],
   [pin('L32', None, 65000, 'MAYA'), pin('L32', None, 90000, 'JORDAN'), pin('L35', 'Alex', 120000, 'ALEX')],
   bands=[{**W('L39', 'forty-eight'), 'x0': 47500, 'x1': 49000, 'text': 'OHP', 'color': 'rgba(229,128,110,.18)'}, {**W('L39', 'seventy-two'), 'x0': 71500, 'x1': 73000, 'text': 'OHP', 'color': 'rgba(229,128,110,.18)'},
          {**W('L39', 'two'), 'x0': 200000, 'x1': 201500, 'text': 'OHP', 'color': 'rgba(229,128,110,.18)'}]),
 K('L40', [ln('NOT ONE NUMBER FROM A TABLE', 60, 'L40'), ln('STEPS · A VALLEY · A FEW BUMPS', 76, 'L40', 'steps', gold=True)], kicker='YOUR MARGINAL RATE', fxIn='glass', y=350),
 # 06 RRSP
 K('L41', [dc('THE DECISION THAT CHANGES IT', 110, 'L41', 'decision')], kicker='06', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L42', 'TAX SAVED BY A $1,000 RRSP DEDUCTION', '2026 · ONTARIO · ASSUMES ROOM', [{'name': f"{n} · {m(g)}", 'value': RR[str(g)]} for n, g in names],
       [W('L43', 'Maya'), W('L43', 'Jordan'), W('L43', 'Alex')], 'SAME FOR MAYA AND JORDAN', fxIn='glass'),
 SPLIT('L44', 'MAYA · SAME $1,000, TWO DIRECTIONS', '2026 · ONTARIO', [{'name': 'TAKEN FROM A $1,000 RAISE', 'value': H['65000']['taken']}, {'name': 'SAVED BY A $1,000 RRSP', 'value': RR['65000']}],
       [W('L44', 'raise'), W('L44', 'saves')], 'RRSP DOESN’T GIVE BACK CPP OR EI', fxIn='slideL'),
 ST('L46', 'TWO MARGINAL RATES', [it('EARN', 'EVERYTHING OFF THE NEXT DOLLAR', 'L46', 'earning'), it('DEDUCT', 'INCOME TAX ONLY', 'L46', 'deducting'),
   it('→', 'RAISE · BONUS · EXTRA SHIFT: THE FIRST', 'L47', 'raise'), it('→', 'RRSP DEDUCTION: THE SECOND', 'L47', 'second')], fxIn='glass', dimOthers=True, y=200),
 ST('L48', 'WHY THE SAVINGS DIFFER', [it('=', 'MAYA + JORDAN: SAME FED + ON BRACKETS', 'L48', 'same'), it('↑', 'ALEX: HIGHEST INCOME-TAX RATE SAVES MOST', 'L49', 'most')], fxIn='slideR', dimOthers=True, y=300),
 # 07 carry forward
 K('L50', [dc('ONE MORE LEVER', 130, 'L50', 'lever')], kicker='07', fxIn='focus', fxOut='wipe', y=330),
 ST('L51', 'DEDUCT LATER (CARRY FORWARD)', [it('1', 'CONTRIBUTE NOW · DEDUCT IN A LATER YEAR', 'L51', 'carry'), it('NOW', '$50,000 THIS YEAR', 'L52', 'fifty'), it('NEXT', '$120,000 NEXT YEAR', 'L52', 'next')], fxIn='glass', dimOthers=True, y=260),
 SPLIT('L53', 'TAX SAVED BY THE SAME $1,000 DEDUCTION', '2026 RATES · ASSUMES ROOM', [{'name': 'DEDUCT THIS YEAR ($50K)', 'value': d['rrsp50']}, {'name': 'DEDUCT NEXT YEAR ($120K)', 'value': RR['120000']}],
       [W('L53', 'this'), W('L53', 'next')], 'MORE THAN TWICE · STILL NEED ROOM', fxIn='slideL'),
 # 08 limits
 ST('L55', 'WHERE THIS CHANGES', [it('!', 'EMPLOYEE EXAMPLES · NO FAMILY BENEFITS', 'L55', 'employee'), it('CCB', 'INCOME-TESTED BENEFITS CAN SHRINK TOO', 'L56', 'benefits'),
   it('↑', 'REAL MARGINAL RATE CAN BE HIGHER', 'L56', 'higher'), it('≠', 'SELF-EMPLOYED · QUEBEC: DIFFERENT RULES', 'L57', 'self-employed')], fxIn='glass', dimOthers=True, y=200),
 # 09 find yours
 ST('L58', 'FIND YOUR SPOT ON THE LINE', [it('1', 'YOUR FEDERAL + PROVINCIAL BRACKETS', 'L59', 'brackets'), it('2', 'PAY STUB: YTD CPP + EI STILL RUNNING?', 'L60', 'stub'),
   it('3', 'ADD: BRACKETS + SURTAX + CPP + EI', 'L61', 'Add'), it('!', 'NEAR A STEP? PLANNING PAYS', 'L62', 'planning')], fxIn='stagger', dimOthers=True, y=200),
 # verdict
 K('L63', [dc('WHAT DID WE LEARN?', 140, 'L63', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L64', 'YOUR NEXT DOLLAR · 4 RULES', [it('1', 'A RAISE ONLY TAXES DOLLARS ABOVE EACH LINE', 'L64', 'above'), it('2', 'CPP + EI ARE PART OF THE REAL RATE', 'L65', 'includes'),
   it('3', 'RRSP SAVES INCOME TAX ONLY', 'L66', 'income'), it('4', 'CHECK YOUR SPOT BEFORE YOU DECIDE', 'L67', 'Check')], fxIn='glass', dimOthers=True, y=200),
 K('L68', [mo([{'text': 'WHAT IF YOU SELL YOUR HOME?', 't': 0}, {'text': 'TAX-FREE… OR NOT?', **W('L68', 'tax-free')}], 110, 'L68', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L68', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Three raises'), ('L8', '01 · The bracket myth'), ('L13', '02 · Five pieces'), ('L16', '03 · The line: $45K–$90K'), ('L27', '04 · On your pay stub'),
  ('L32', '05 · The line: $90K–$270K'), ('L41', '06 · The RRSP twist'), ('L50', '07 · Deduct later'), ('L55', '08 · Where this changes'), ('L58', '09 · Find your rate'), ('L63', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L8', 's2', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L13', 's1', cam((-50, 10, 0.2), (40, -10, 0.05))), ('L16', 's3', cam((0, 40, 0.0), (0, -40, 0.25))),
     ('L27', 's4', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L32', 's3', cam((0, 30, 0.2), (0, -30, 0.05))), ('L41', 's5', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L50', 's5', cam((-30, 0, 0.0), (30, 0, 0.2))),
     ('L55', 's2', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L58', 's4', cam((-60, 10, 0.0), (40, -10, 0.15))), ('L63', 's6', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []) + (p.get('marks') or []) + (p.get('pins') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
for r in h['swingAt']: sfx.append({'name': 'tick', 'vol': 0.15, **r})
sfx.append({'name': 'whoosh', 'vol': 0.2, **h['finishAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"NEXT $1,000 @ $65K: −${H['65000']['taken']}", f"@ $90K: −${H['90000']['taken']}", f"@ $120K: −${H['120000']['taken']}", 'EI MAX $68,900 · CPP $74,600 · CPP2 $85,000 (2026)',
          'FED 14% · 20.5% · 26% · 29% · 33%', 'RRSP SAVES INCOME TAX ONLY', '2026 RATES · ONTARIO · EXAMPLE']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA T4127 (2026) · Ontario 2026 rates · Example calculation, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf10/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
