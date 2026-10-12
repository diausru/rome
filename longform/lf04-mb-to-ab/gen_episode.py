"""LF-04 episode description -> episode.src.json. Face-off MB vs AB in 5 rounds; living-photo shots + kinetic panels (motion system v3)."""
import json
L = json.load(open('lines.json'))
CH = {'L4b', 'L16', 'L16f', 'L21', 'L26', 'L30b', 'L38b', 'L42', 'L45'}
vo = [{'id': k, 'file': f'vo/{k}.mp3', 'gap': 1.1 if k in CH else 0.35, 'text': t} for k, t in L]
def W(at, word=None, off=0):
    d = {'at': at}
    if word: d['word'] = word
    if off: d['off'] = off
    return d
def P(type, x, y, w, at, word=None, **kw):
    d = {'type': type, 'x': x, 'y': y, 'w': w, 'at': at}
    if word: d['word'] = word
    d.update(kw); return d
def scene(at, *panels, **kw): return {'at': at, 'type': 'scene', 'panels': list(panels), **kw}
D = lambda path: {'ref': f'd.{path}'}
RED, ORG, BLU, YEL, GRN = '#E5806E', '#E8A86A', '#8FB3E8', '#E8C27A', '#7FD3A0'
def K(at, lines, kicker=None, fxIn='glass', fxOut='vapor', y=300, **kw):
    return scene(at, P('khero', 160, y, 1600, at, glass=False, fxIn=fxIn, fxOut=fxOut, lines=lines, **({'kicker': kicker} if kicker else {}), **kw))
def ln(text, size=90, at=None, word=None, off=0, **kw): return {'text': text, 'size': size, **(W(at, word, off) if at else {}), **kw}
def mo(seq, size=110, at=None, gold=False): return {'anim': 'morph', 'size': size, 'gold': gold, 'seq': seq, **W(at)}
def dc(text, size=110, at=None, word=None, gold=True): return {'anim': 'decode', 'text': text, 'size': size, 'gold': gold, **W(at, word)}
def payp(x, at, prov, name, provAt, finalAt): return P('pay', x, 170, 800, at, fxIn='slideL' if x < 900 else 'slideR', fxOut='defocus', title=name, sub='2026 · $100,000 SALARY', grossLabel='SALARY', gross=D(f'{prov}.gross'), barW=740,
    rows=[{'label': 'FEDERAL TAX', 'value': D(f'{prov}.federal'), 'color': RED, **W(at)}, {'label': 'CPP + CPP2', 'value': D(f'{prov}.cpp'), 'color': BLU, **(W('L7', 'Four') if prov == 'mb' else W(at, None, 0.6))},
          {'label': 'EI', 'value': D(f'{prov}.ei'), 'color': YEL, **(W('L7', 'one thousand') if prov == 'mb' else W(at, None, 1.0))}, {'label': 'PROVINCIAL TAX', 'value': D(f'{prov}.provincial'), 'color': ORG, **provAt}],
    finalAt=finalAt, finalLabel='TAKE-HOME')

events = [
 # ---------- HOOK ----------
 scene('L1', P('opening', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-0.8,
       tags=[{'text': 'PROVINCIAL TAX', 'color': ORG, 'x': 150, 'y': 150, 'dir': [-80, 0], 'rot': -5, **W('L1', None, 0.1)},
             {'text': 'MOVING COSTS', 'color': BLU, 'x': 1400, 'y': 130, 'dir': [80, -20], 'rot': 5, **W('L1', None, 0.3)},
             {'text': 'SALES TAX', 'color': YEL, 'x': 1450, 'y': 820, 'dir': [60, 60], 'rot': -4, **W('L1', None, 0.5)},
             {'text': 'RENT', 'color': RED, 'x': 140, 'y': 840, 'dir': [-60, 50], 'rot': 4, **W('L1', None, 0.7)},
             {'text': 'DEC 31 RULE', 'color': GRN, 'x': 220, 'y': 480, 'dir': [-90, 0], 'rot': -3, **W('L1', None, 0.9)},
             {'text': 'TAKE-HOME PAY', 'color': GRN, 'x': 1440, 'y': 480, 'dir': [90, 0], 'rot': 3, **W('L1', None, 1.1)}],
       head=[{'text': 'MANITOBA → ALBERTA', 'size': 116, **W('L1', 'Calgary')}, {'text': 'IS THE MOVE WORTH IT?', 'size': 88, 'emph': ['WORTH'], **W('L2', 'But')}],
       headY=300, tagsOut=W('L3'), headOut=W('L3'), bgOut=W('L3', 'Round'),
       object={'title': 'JORDAN · $100,000 · 2026', 'y': 470, 'rows': [{'label': 'KEEPS IN MANITOBA', 'value': D('mb.take_home'), **W('L2', 'pay')}, {'label': 'KEEPS IN ALBERTA', 'value': D('ab.take_home'), **W('L2', 'true')}], **W('L2', 'pay')}), off=-0.8),
 scene('L3', P('steps', 330, 200, 1260, 'L3', word='Round', fxIn='sweep', fxOut='collapse', title='5 ROUNDS', dimOthers=False, items=[
       {'n': '01', 'head': 'INCOME TAX', 'at': 'L3', 'word': 'Taxes'}, {'n': '02', 'head': 'TIMING', 'at': 'L3', 'word': 'the move'},
       {'n': '03', 'head': 'THE MOVE ITSELF', 'at': 'L3', 'word': 'itself'}, {'n': '04', 'head': 'SALES TAX', 'at': 'L3', 'word': 'sales'}, {'n': '05', 'head': 'RENT', 'at': 'L3', 'word': 'rent'}])),
 scene('L4', P('steps', 330, 260, 1260, 'L4', fxIn='sweep', fxOut='collapse', title='THE NUMBERS', items=[
       {'n': 'A', 'head': '2026 CRA PAYROLL TABLES + MB / AB RATES', 'at': 'L4'},
       {'n': 'B', 'head': 'RENT: CMHC RENTAL MARKET SURVEY, OCT 2025', 'at': 'L4', 'word': 'Rents'},
       {'n': 'C', 'head': 'JORDAN: 34 · SINGLE · IT · NO OTHER INCOME', 'text': 'One illustrative person, not a CRA rule', 'at': 'L4b'}])),
 # ---------- ROUND 1 ----------
 K('L5', [ln('ROUND 1', 80, 'L5', gold=True), dc('INCOME TAX', 150, 'L5', 'Income'), ln('MOST DEDUCTIONS DON\'T CHANGE', 54, 'L5', 'most')], fxIn='morph', fxOut='wipe'),
 scene('L6', payp(120, 'L6', 'mb', 'MANITOBA', W('L8', 'Manitoba'), W('L10', 'Manitoba')),
             payp(1000, 'L9', 'ab', 'ALBERTA', W('L9', 'six'), W('L10', 'seventy-four'))),
 K('L11', [mo([{'text': '+$3,014 / YEAR', 't': 0}, {'text': '≈ $251 / MONTH', **W('L11', 'About')}], 140, 'L11', gold=True), ln('MORE IN ALBERTA · SAME $100,000', 50, 'L11', None, 0.6)], kicker='THE TAX GAP', fxOut='particles'),
 scene('L12', P('steps', 210, 170, 1500, 'L12', fxIn='focus', fxOut='collapse', title='WHY THE GAP IS SO BIG', sub='2026 PROVINCIAL RATES', dimOthers=True, items=[
       {'n': '1', 'head': 'FIRST RATE: ALBERTA 8% · MANITOBA 10.8%', 'text': 'Alberta 8% up to $61,200 · Manitoba 10.8% up to $47,000', 'at': 'L12', 'word': 'Alberta'},
       {'n': '2', 'head': 'NEXT RATE: ALBERTA 10% · MANITOBA 12.75%', 'at': 'L13'},
       {'n': '3', 'head': 'BASIC PERSONAL AMOUNT: $22,769 VS $15,780', 'text': 'Roughly the income you can earn before provincial tax applies', 'at': 'L14'}])),
 scene('L15', P('steps', 330, 220, 1260, 'L15', fxIn='slideUp', fxOut='collapse', title='THE GAP GROWS WITH INCOME', sub='ALBERTA TAKE-HOME MINUS MANITOBA · 2026', items=[
       {'n': '$60K', 'head': '+$1,919 A YEAR', 'at': 'L15', 'word': 'sixty'}, {'n': '$100K', 'head': '+$3,014 A YEAR', 'at': 'L15', 'word': 'saves'},
       {'n': '$150K', 'head': '+$6,661 A YEAR', 'at': 'L15', 'word': 'hundred and fifty'}])),
 K('L16', [ln('ROUND 1', 70, 'L16'), dc('ALBERTA', 170, 'L16', 'Alberta')], kicker='SCORE · ALBERTA 1 · MANITOBA 0', fxOut='particles'),
 K('L16b', [ln('THE HIDDEN ROUND', 64, 'L16b'), dc('A $10,000 RAISE', 140, 'L16b', 'ten')], fxIn='wipe', fxOut='wipe'),
 K('L16c', [ln('MANITOBA\'S THIRD RATE', 60, 'L16c', 'third'), dc('17.4% FROM $100,000', 130, 'L16c', 'seventeen'), ln('JORDAN\'S RAISE LANDS ON TOP OF IT', 50, 'L16c', 'raise')], kicker='THE MANITOBA TRAP', fxIn='glass', fxOut='vapor'),
 scene('L16d', P('steps', 330, 200, 1260, 'L16d', fxIn='focus', fxOut='collapse', title='JORDAN KEEPS FROM A $10,000 RAISE', sub='2026 · FEDERAL + PROVINCIAL', items=[
       {'n': 'MB', 'head': '$6,262', 'text': 'Federal 20.5% + Manitoba 12.75% then 17.4%', 'at': 'L16d', 'word': 'keeps'},
       {'n': 'AB', 'head': '$6,950', 'text': 'Federal 20.5% + Alberta 10% (12% only from $154,259)', 'at': 'L16e', 'word': 'keeps'},
       {'n': '+', 'head': '+$688 · GAP AT $110K: $3,702', 'at': 'L16f'}])),
 # ---------- ROUND 2 ----------
 K('L17', [ln('ROUND 2', 80, 'L17', gold=True), dc('TIMING', 160, 'L17', 'Timing')], fxIn='morph', fxOut='wipe'),
 K('L18', [ln('YOUR PROVINCE FOR THE TAX RETURN =', 54, 'L18', 'For'), dc('DECEMBER 31', 170, 'L18', 'December'), ln('WHERE YOU LIVED THAT DAY', 54, 'L18', 'December', 0.8)], kicker='CRA RULE', fxOut='particles'),
 scene('L19', P('steps', 260, 200, 1400, 'L19', fxIn='sweep', fxOut='collapse', title='MOVE IN NOVEMBER', dimOthers=True, items=[
       {'n': '1', 'head': 'ALBERTA RATES FOR THE WHOLE YEAR', 'text': 'Even the months worked in Winnipeg', 'at': 'L19', 'word': 'Alberta'},
       {'n': '2', 'head': 'THE FULL $3,014 DIFFERENCE', 'text': 'All else equal', 'at': 'L19b'},
       {'n': '3', 'head': 'SETTLED WHEN JORDAN FILES', 'text': 'Pay before the move had Manitoba tax withheld', 'at': 'L20'}])),
 K('L21', [mo([{'text': 'MOVE DEC 30 → ALBERTA YEAR', 't': 0}, {'text': 'MOVE JAN 2 → MANITOBA YEAR', **W('L21', 'January')}], 96, 'L21'), ln('SAME MOVE · DIFFERENT CALENDAR', 52, 'L21', 'Same')], fxIn='glass', fxOut='vapor'),
 # ---------- ROUND 3 ----------
 K('L22', [ln('ROUND 3', 80, 'L22', gold=True), dc('THE MOVE', 160, 'L22', 'move')], fxIn='morph', fxOut='wipe'),
 K('L23', [ln('MOVING EXPENSES · LINE 21900', 56, 'L23'), dc('40 KM CLOSER', 160, 'L23', 'forty'), ln('TO THE NEW WORK LOCATION', 54, 'L23', 'closer')], kicker='THE RULE', fxOut='particles'),
 scene('L24', P('steps', 210, 140, 1500, 'L24', fxIn='stagger', fxOut='collapse', title='WHAT COUNTS', sub='CRA · LINE 21900', items=[
       {'n': '1', 'head': 'MOVERS · PACKING · STORAGE', 'at': 'L24', 'word': 'Movers'}, {'n': '2', 'head': 'TRAVEL: MEALS + LODGING', 'at': 'L24', 'word': 'Travel'},
       {'n': '3', 'head': 'UP TO 15 DAYS TEMPORARY LIVING', 'at': 'L24', 'word': 'fifteen'}, {'n': '4', 'head': 'BREAKING THE OLD LEASE · NEW LICENCE', 'at': 'L24', 'word': 'breaking'}])),
 scene('L25', P('steps', 260, 220, 1400, 'L25', fxIn='wipe', fxOut='collapse', title='TWO CATCHES', dimOthers=True, items=[
       {'n': '1', 'head': 'ONLY FROM INCOME AT THE NEW JOB', 'text': 'Unused amounts carry forward', 'at': 'L25', 'word': 'only'},
       {'n': '2', 'head': 'EMPLOYER PAID? NO DOUBLE CLAIM', 'text': 'Include the reimbursement in income, or reduce the expenses', 'at': 'L25', 'word': 'employer'}])),
 K('L26', [ln('$5,000 OF MOVING COSTS × 30.5%', 64, 'L26'), dc('≈ $1,525 LESS TAX', 140, 'L26', 'about'), ln('KEEP EVERY RECEIPT', 52, 'L26', 'Keep')], kicker='ROUGH ESTIMATE AT JORDAN\'S ALBERTA RATE', fxOut='particles'),
 # ---------- ROUND 4 ----------
 K('L27', [ln('ROUND 4', 80, 'L27', gold=True), dc('SALES TAX', 160, 'L27', 'Sales'), ln('GST 5% IN BOTH', 54, 'L27', 'Both')], fxIn='morph', fxOut='wipe'),
 scene('L28', P('steps', 330, 230, 1260, 'L28', fxIn='slideR', fxOut='collapse', title='PROVINCIAL SALES TAX', dimOthers=False, items=[
       {'n': 'MB', 'head': 'RETAIL SALES TAX 7%', 'text': 'Most goods and some services', 'at': 'L28', 'word': 'seven'},
       {'n': 'AB', 'head': 'NO PROVINCIAL SALES TAX', 'at': 'L28', 'word': 'Alberta'}])),
 K('L29', [ln('EVERY $1,000 OF TAXABLE SHOPPING', 60, 'L29', 'every'), dc('$70 MORE IN MANITOBA', 130, 'L29', 'seventy')], kicker='DEPENDS ON WHAT YOU BUY', fxOut='vapor'),
 K('L30b', [ln('$15,000 OF TAXABLE PURCHASES', 64, 'L30b'), dc('$1,050', 190, 'L30b', 'one thousand'), ln('MANITOBA SALES TAX ALBERTA DOESN\'T CHARGE', 46, 'L30b', 'Alberta')], kicker='ROUND 4 · ALBERTA', fxOut='particles'),
 K('L31', [mo([{'text': 'ALBERTA 3 · MANITOBA 0', 't': 0}, {'text': 'BUT JORDAN NEEDS A HOME', **W('L31', 'But')}], 120, 'L31', gold=True)], kicker='SCORE', fxIn='glass', fxOut='wipe'),
 # ---------- ROUND 5 ----------
 K('L32', [ln('ROUND 5', 80, 'L32', gold=True), dc('RENT', 180, 'L32', 'Rent'), ln('CMHC SURVEY · EVERY OCTOBER', 50, 'L32', 'surveys')], fxIn='morph', fxOut='wipe'),
 scene('L33', P('steps', 330, 200, 1260, 'L33', fxIn='focus', fxOut='collapse', title='AVERAGE 2-BEDROOM RENT', sub='CMHC · OCT 2025 · PURPOSE-BUILT', dimOthers=False, items=[
       {'n': 'WPG', 'head': 'WINNIPEG $1,571 / MONTH', 'at': 'L33', 'word': 'one'}, {'n': 'YYC', 'head': 'CALGARY $1,914 / MONTH', 'at': 'L34', 'word': 'one'},
       {'n': 'Δ', 'head': '+$343 A MONTH = $4,116 A YEAR', 'at': 'L35'}])),
 K('L36', [mo([{'text': 'TAX SAVING $3,014', 't': 0}, {'text': 'RENT GAP $4,116', **W('L36', 'bigger')}], 130, 'L36', gold=True)], kicker='WAIT', fxIn='glass', fxOut='particles'),
 scene('L37', P('steps', 330, 200, 1260, 'L37', fxIn='sweep', fxOut='collapse', title='NEW-TENANT RENT · 2 BEDROOMS', sub='CMHC · OCT 2025 · UNITS THAT TURNED OVER', dimOthers=False, items=[
       {'n': 'WPG', 'head': 'WINNIPEG $1,595', 'at': 'L37', 'word': 'Winnipeg'}, {'n': 'YYC', 'head': 'CALGARY $1,836', 'at': 'L37', 'word': 'Calgary'},
       {'n': 'Δ', 'head': '+$241 A MONTH = $2,892 A YEAR', 'text': 'Round 5 → Manitoba', 'at': 'L38'}])),
 K('L38b', [ln('CITY-WIDE AVERAGES · PURPOSE-BUILT APARTMENTS', 54, 'L38b'), ln('NOT INCLUDED: CONDOS · HOUSES · UTILITIES · CAR INSURANCE · COMMUTE', 42, 'L38b', 'Condos')], kicker='ONE HONEST NOTE', fxIn='wipe', fxOut='vapor'),
 # ---------- SCORE ----------
 scene('L39', P('steps', 260, 160, 1400, 'L39', fxIn='glass', fxOut='collapse', title='THE FINAL SCORE', sub='ONE YEAR · $100,000 · 2026', dimOthers=False, items=[
       {'n': '+', 'head': 'TAX SAVING +$3,014', 'at': 'L39', 'word': 'plus'},
       {'n': 'A', 'head': '− AVERAGE RENT GAP $4,116 = −$1,102', 'at': 'L40'},
       {'n': 'B', 'head': '− NEW-TENANT RENT GAP $2,892 = +$122', 'text': 'Basically a tie', 'at': 'L41'}])),
 K('L42', [ln('TO WIN BACK $1,102 AT 7%', 64, 'L42', 'To'), dc('$15,743', 190, 'L42', 'fifteen'), ln('OF TAXABLE PURCHASES A YEAR', 52, 'L42', 'taxable')], kicker='THE SALES-TAX BREAK-EVEN', fxOut='particles'),
 # ---------- VERDICT ----------
 K('L43', [ln('ALBERTA\'S LOWER TAX IS REAL', 70, 'L43', 'Alberta'), dc('BUT IT\'S NOT THE WHOLE STORY', 104, 'L43', 'But')], kicker='THE VERDICT', fxIn='glass', fxOut='wipe'),
 scene('L44', P('steps', 260, 200, 1400, 'L44', fxIn='slideUp', fxOut='collapse', title='BEFORE YOU MOVE, RUN 3 NUMBERS', dimOthers=True, items=[
       {'n': '1', 'head': 'PROVINCIAL TAX IN BOTH PLACES', 'at': 'L45', 'word': 'Your'}, {'n': '2', 'head': 'A REAL RENT QUOTE', 'at': 'L45', 'word': 'real'},
       {'n': '3', 'head': 'YOUR YEARLY TAXABLE SHOPPING', 'text': 'Then time the move · keep the receipts', 'at': 'L45', 'word': 'yearly'}])),
 K('L46', [mo([{'text': '$80K · $100K · $150K', 't': 0}, {'text': 'HOW MUCH DO YOU KEEP?', **W('L46', 'How')}], 120, 'L46', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L46', 'Subscribe')], fxIn='morph', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'The offer'), ('L5', 'Round 1 · Income tax'), ('L16b', 'The $10,000 raise'), ('L17', 'Round 2 · Timing (Dec 31)'),
            ('L22', 'Round 3 · Moving expenses'), ('L27', 'Round 4 · Sales tax'), ('L32', 'Round 5 · Rent'), ('L39', 'Final score'), ('L43', 'Verdict'), ('L46', 'Next')]]
PL = 'lf/lf04/plates/'
plates = {f's{i}': {'photo': {'src': f'{PL}s{i}.jpg', 'depth': f'{PL}s{i}_d.png', 'amt': 0.05}} for i in range(1, 11)}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((-50, 10, 0.15), (40, -10, 0.0))), ('L3', 's10', cam((0, 0, 0.0), (0, -10, 0.2))), ('L4b', 's1', cam((40, 0, 0.2), (-30, 0, 0.05))),
 ('L5', 's3', cam((0, 30, 0.2), (-30, 0, 0.05))), ('L11', 's2', cam((-60, 0, 0.05), (50, -10, 0.15))), ('L15', 's3', cam((40, 20, 0.0), (-40, 0, 0.18))),
 ('L16b', 's9', cam((-30, -10, 0.1), (30, 10, 0.2))), ('L17', 's4', cam((50, 10, 0.25), (-40, -10, 0.05))), ('L21', 's4', cam((0, 20, 0.0), (0, -20, 0.22))),
 ('L22', 's5', cam((-40, 0, 0.05), (30, 0, 0.15))), ('L24', 's6', cam((0, 0, 0.0), (0, 0, 0.3))), ('L26', 's5', cam((40, 10, 0.1), (-30, 0, 0.2))),
 ('L27', 's7', cam((-30, 0, 0.15), (40, -10, 0.05))), ('L30b', 's7', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L31', 's10', cam((0, 0, 0.3), (0, 10, 0.05))),
 ('L32', 's8', cam((-50, 10, 0.0), (40, -10, 0.15))), ('L35', 's2', cam((10, 0, 0.3), (-10, 0, 0.05))), ('L37', 's8', cam((-40, 0, 0.05), (40, 0, 0.18))),
 ('L39', 's10', cam((-40, 10, 0.0), (40, -10, 0.15))), ('L42', 's7', cam((30, 0, 0.05), (-30, 0, 0.2))), ('L43', 's9', cam((-60, 10, 0.2), (60, -10, 0.0))),
 ('L44', 's6', cam((0, 10, 0.0), (0, -10, 0.3))), ('L46', 's2', cam((0, 0, 0.0), (0, -10, 0.25)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('rows') or []) + (p.get('items') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{k: v for k, v in r.items() if k in ('at', 'word')}})
for s in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': s['at']})
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: CRA T4127 (2026) · MB + AB 2026 rates · CRA line 21900 · Manitoba RST · CMHC Rental Market Survey Oct 2025 · General info, not advice',
      'data': {'d': {'type': 'file', 'file': 'data.json'}}, 'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx,
      'audio': 'lf/lf04/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1)
print('events', len(events), 'shots', len(shots), 'sfx', len(sfx))
