import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L8", "L12", "L18", "L23", "L27", "L32", "L37", "L44", "L53", "L59"}
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
    return scene(at, P('split', x, y, w, at, fxIn=fxIn, fxOut=fxOut, title=title, sub=sub, labelW=kw.pop('labelW', 520), fs=kw.pop('fs', 36), vs=kw.pop('vs', 52), noTotal=True, items=items, rowAt=rowAt, note=note, **kw))
m = lambda v: '${:,}'.format(v)
PL = 'lf/lf25/plates/'
D = d; c2 = lambda v: '${:,.2f}'.format(v)
MS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
months = [{'m': x, 'y': '2026'} for x in MS] + [{'m': x, 'y': '2027'} for x in MS[:4]]
months[0].update(tag=m(round(D['first_net'])), tagAt=W('L1', 'first'))
months[11].update(tag=m(round(D['last_net'])), tagAt=W('L2', 'last'))
months[15].update(tag='FILE', tagAt=W('L6', 'return'), color='#8FB3E8')
events = [
 scene('L1', P('year', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.74}, kicker='DANA · $90,000 · THE 2026 TAX YEAR · ONTARIO', title='ONE TAX YEAR. SIXTEEN MONTHS.',
   months=months, sweepAt=W('L1', None, 0.2), dimAt=W('L3', 'smartest'), hiIdx=13, hiAt=W('L4', 'February'), hiText=f"+{m(D['refund'])}", hiSub='REFUND · FOR 2026',
   qAt=W('L6', 'month'), question='WHERE DOES THE MONEY MOVE?', out=W('L7', None, -0.9)), off=-1.0),
 K('L7', [ln('THE 2026 TAX YEAR · ONTARIO · $90,000 · PAID EVERY TWO WEEKS', 44, 'L7'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L7', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L8', [dc('WHAT A TAX YEAR IS', 120, 'L8', 'tax')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L9', 'THE TAX YEAR', [it('JAN 1', 'TO DEC 31 · THE CALENDAR YEAR', 'L9', 'calendar'), it('1', 'ONE RETURN · FILED THE NEXT SPRING', 'L10', 'one'), it('≈16', 'MONTHS · 12 OF EARNING + A FEW OF SETTLING UP', 'L11', 'sixteen')], fxIn='glass', dimOthers=True, y=240),
 K('L12', [dc('JANUARY', 150, 'L12', 'January')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 ST('L13', 'A NEW YEAR STARTS', [it('↺', 'CPP AND EI LIMITS RESET', 'L13', 'reset'), it(m(round(D['first_net'])), "DANA'S JANUARY PAYCHEQUES · HER SMALLEST", 'L14', 'smallest'), it('TD1', 'WHERE YOU CLAIM YOUR PERSONAL TAX CREDITS', 'L15', 'T'),
   it('!', 'NEW JOB · SECOND JOB · LIFE CHANGE → UPDATE IT', 'L16', 'Update'), it('+', 'OWE EVERY YEAR? ASK FOR EXTRA TAX', 'L17', 'extra')], fxIn='slideR', dimOthers=True, y=180),
 K('L18', [dc('SPRING · LAST YEAR', 130, 'L18', 'spring')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 ST('L19', 'FINISHING LAST YEAR', [it('60', 'DAYS · RRSP CONTRIBUTIONS CAN COUNT FOR LAST YEAR', 'L20', 'sixty'), it('MAR 2', '2026 · RRSP DEADLINE FOR THE 2025 TAX YEAR', 'L20', 'March'), it('APR 30', 'FILE LAST YEAR · PAY ANY BALANCE OWING', 'L21', 'April'), it('JUN 15', 'SELF-EMPLOYED FILING · BALANCE STILL DUE APR 30', 'L22', 'June')], fxIn='glass', dimOthers=True, y=200),
 K('L23', [dc('SUMMER', 150, 'L23', 'summer')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 ST('L24', 'BENEFITS FOLLOW YOUR RETURN', [it('JUL', 'CANADA CHILD BENEFIT RECALCULATED', 'L24', 'July'), it('NET', "BASED ON LAST YEAR'S FAMILY NET INCOME", 'L24', 'family'), it('✓', 'FILE ON TIME · EVEN IF YOU OWE NOTHING', 'L25', 'filing'), it('4×', 'INSTALMENTS: MAR 15 · JUN 15 · SEP 15 · DEC 15', 'L26', 'instalments')], fxIn='slideL', dimOthers=True, y=200),
 K('L27', [dc('FALL', 150, 'L27', 'fall')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L28', "DANA'S PAYCHEQUE GROWS", '2026 · ONTARIO', [{'name': f"JANUARY · {c2(D['first_net'])}", 'value': D['first_net']}, {'name': f"LAST PAYCHEQUE · {c2(D['last_net'])}", 'value': D['last_net']}, {'name': f"DIFFERENCE · {c2(D['raise_pp'])}", 'value': D['raise_pp']}],
       [W('L28', 'grow'), W('L29', 'last'), W('L29', 'more')], 'NOT A RAISE · CPP + EI DONE FOR THE YEAR · RESETS JAN 1', fxIn='glass'),
 K('L32', [dc('DECEMBER 31', 140, 'L32', 'December')], kicker='06', fxIn='focus', fxOut='wipe', y=330),
 K('L33', [ln('THE TAX YEAR CLOSES', 90, 'L33', 'closes'), ln('MOST MOVES HAVE TO HAPPEN BY THEN · NOT THE RRSP', 48, 'L34', 'exception', gold=True), ln(f"WITHHELD ≈{m(D['withheld'])} ≈ HER REAL TAX → RETURN ≈ $0", 48, 'L36', 'zero')], fxIn='glass', y=290),
 K('L37', [dc('THE FEBRUARY MOVE', 130, 'L37', 'one')], kicker='07', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L38', '$5,000 RRSP · FEBRUARY 2027 · FOR 2026', 'DANA · ONTARIO', [{'name': 'TAX WITHHELD IN 2026', 'value': D['withheld']}, {'name': 'REAL TAX AFTER THE RRSP', 'value': D['withheld'] - D['refund']}, {'name': 'REFUND', 'value': D['refund']}],
       [W('L39', 'withheld'), W('L41', 'real'), W('L41', 'refund')], "MADE IN ONE YEAR · FOR THE YEAR BEFORE · YOU CAN ALSO DEDUCT IT LATER", fxIn='slideR'),
 K('L44', [dc('THE RETURN', 150, 'L44', 'return')], kicker='08', fxIn='focus', fxOut='wipe', y=330),
 ST('L45', 'SETTLING UP', [it('T4', 'INCOME + TAX, CPP AND EI TAKEN OFF', 'L45', 'T'), it('=', 'REAL TAX vs TAX WITHHELD', 'L46', 'compares'), it('±', 'MORE WITHHELD → REFUND · LESS → BALANCE OWING', 'L47', 'refund'), it('≠', 'A REFUND ≠ LESS TAX · YOUR OWN MONEY BACK', 'L48', 'less'),
   it('NOA', 'NOTICE OF ASSESSMENT · RRSP LIMIT · ANY CHANGES', 'L50', 'Keep'), it('↺', 'A NEW JANUARY · THE CYCLE STARTS AGAIN', 'L52', 'cycle')], fxIn='glass', dimOthers=True, y=150),
 ST('L53', 'YOUR TAX YEAR CHECKLIST', [it('JAN', 'CHECK YOUR TD1 · MORE THAN ONE JOB?', 'L54', 'One'), it('RRSP', 'BEFORE THE DEADLINE: A CONTRIBUTION FOR LAST YEAR?', 'L55', 'Two'), it('APR 30', 'FILE · PAY ANYTHING YOU OWE', 'L56', 'Three'), it('JUL', 'CHECK YOUR BENEFITS', 'L57', 'Four'), it('NOA', 'KEEP YOUR NOTICE OF ASSESSMENT', 'L58', 'Five')], fxIn='stagger', dimOthers=True, y=180),
 K('L59', [dc('WHAT DID WE LEARN?', 140, 'L59', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L60', 'THE TAX YEAR · 4 RULES', [it('1', 'CALENDAR YEAR · SETTLED BY SPRING', 'L60', 'One'), it('2', 'PAYCHEQUE GROWS IN THE FALL · RESETS IN JANUARY', 'L61', 'Two'), it('3', 'SOME BEST MOVES COME AFTER THE YEAR ENDS', 'L62', 'Three'), it('4', 'RETURN = WHAT YOU PAID vs WHAT YOU OWE', 'L63', 'Four')], fxIn='glass', dimOthers=True, y=200),
 K('L64', [mo([{'text': 'ONE TAX YEAR · 16 MONTHS', 't': 0}, {'text': 'WORKING REMOTELY · YOUR TAXES', **W('L64', 'remotely')}], 96, 'L64', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L64', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'One tax year, sixteen months'), ('L8', '01 · What a tax year is'), ('L12', '02 · January'), ('L18', '03 · Spring: finishing last year'), ('L23', '04 · Summer'),
  ('L27', '05 · Fall'), ('L32', '06 · December 31'), ('L37', '07 · The February move'), ('L44', '08 · The return'), ('L53', 'Checklist'), ('L59', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L8', 's6', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L12', 's1', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L18', 's5', cam((30, 0, 0.0), (-30, 0, 0.25))),
     ('L23', 's2', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L27', 's3', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L32', 's4', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L37', 's5', cam((50, 0, 0.12), (-50, 0, 0.12))),
     ('L44', 's6', cam((-30, 0, 0.0), (30, 0, 0.2))), ('L53', 's5', cam((-40, 10, 0.0), (40, -10, 0.15))), ('L59', 's2', cam((40, 0, 0.0), (-40, 10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
sfx.append({'name': 'tick', 'vol': 0.2, **h['dimAt']})
sfx.append({'name': 'whoosh', 'vol': 0.22, **h['hiAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"DANA · FIRST PAY {c2(D['first_net'])} → LAST PAY {c2(D['last_net'])}", 'TAX YEAR = JAN 1 – DEC 31', 'RRSP: FIRST 60 DAYS CAN COUNT FOR LAST YEAR', 'FILE BY APRIL 30 · SELF-EMPLOYED JUNE 15', f"$5,000 RRSP IN FEBRUARY → ≈{m(D['refund'])} REFUND", 'EXAMPLES · 2026 · ONTARIO']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA due dates and payment dates (individuals); important dates for RRSPs; line 20800; CCB; CRA T4127 (2026) · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf25/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
