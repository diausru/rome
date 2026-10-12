"""LF-03 episode description -> episode.src.json. Living-photo shots (2.5D depth) per story beat + kinetic panels."""
import json
L = json.load(open('lines.json')); ids = [k for k, _ in L]
CH = {'L4', 'L8', 'L8e', 'L12e', 'L16', 'L29', 'L35', 'L39', 'L42e', 'L46'}
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

events = [
 # ---------- HOOK ----------
scene('L1', P('opening', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-0.8,
       tags=[{'text': 'GROSS INCOME', 'color': GRN, 'x': 150, 'y': 150, 'dir': [-80, 0], 'rot': -5, **W('L1', 'One', 0.1)},
             {'text': 'FEDERAL TAX', 'color': RED, 'x': 1380, 'y': 130, 'dir': [80, -20], 'rot': 5, **W('L1', 'One', 0.3)},
             {'text': 'PROVINCIAL TAX', 'color': ORG, 'x': 1420, 'y': 820, 'dir': [60, 60], 'rot': -4, **W('L1', 'One', 0.5)},
             {'text': 'CPP CONTRIBUTIONS', 'color': BLU, 'x': 120, 'y': 840, 'dir': [-60, 50], 'rot': 4, **W('L1', 'One', 0.7)},
             {'text': 'EI PREMIUMS', 'color': YEL, 'x': 230, 'y': 470, 'dir': [-90, 0], 'rot': -3, **W('L1', 'One', 0.9)},
             {'text': 'TAKE-HOME PAY', 'color': GRN, 'x': 1450, 'y': 480, 'dir': [90, 0], 'rot': 3, **W('L1', 'One', 1.1)}],
       head=[{'text': '$100,000 A YEAR', 'size': 120, **W('L1', 'salary')}, {'text': 'WHERE DOES IT GO?', 'size': 92, 'emph': ['GO'], **W('L2', 'But Jordan')}],
       headY=300, tagsOut=W('L3'), headOut=W('L3'), bgOut=W('L3', 'So where'),
       object={'title': 'JORDAN · 2026 · MANITOBA', 'y': 470, 'rows': [{'label': 'GROSS SALARY', 'value': D('p.gross'), **W('L3')}, {'label': 'TAX + CPP + EI', 'value': {'expr': 'd.p.income_tax + d.p.cpp + d.p.ei'}, 'red': True, **W('L3', 'leaves')}], **W('L3')}), off=-0.8),
  scene('L4', P('steps', 330, 230, 1260, 'L4', fxIn='sweep', fxOut='collapse', title='THE NUMBERS', items=[
       {'n': '01', 'head': '2026 CRA PAYROLL TABLES + MANITOBA RATES', 'at': 'L4'},
       {'n': '02', 'head': 'SPENDING: AUDITED GOVERNMENT REPORTS', 'text': 'Federal Annual Financial Report 2024-25 · Manitoba Public Accounts 2025-26', 'at': 'L4', 'word': 'And the spending'}])),
 # ---------- 01 PAYCHEQUE ----------
scene('L5', P('ptable', 140, 150, 1640, 'L5', fxIn='glass', fxOut='collapse', title='ONE PAYCHEQUE', sub='26 PAYS A YEAR · AVERAGE', gross=D('gross_pay'), barMax=600,
       steps=[{'icon': 'gross', 'label': 'GROSS PAY', 'kind': 'gross', 'value': D('gross_pay'), 'color': GRN, **W('L5')},
              {'icon': 'federal', 'label': 'FEDERAL TAX', 'kind': 'ded', 'value': D('per_pay.federal'), 'color': RED, **W('L6', 'Federal')},
              {'icon': 'provincial', 'label': 'MANITOBA TAX', 'kind': 'ded', 'value': D('per_pay.provincial'), 'color': ORG, **W('L6', 'Manitoba')},
              {'icon': 'cpp', 'label': 'CPP', 'kind': 'ded', 'value': D('per_pay.cpp'), 'color': BLU, **W('L7')},
              {'icon': 'ei', 'label': 'EI', 'kind': 'ded', 'value': D('per_pay.ei'), 'color': YEL, **W('L7', 'Employment')},
              {'icon': 'take', 'label': 'IN THE BANK', 'kind': 'take', 'value': D('per_pay.take_home'), 'color': GRN, **W('L8', 'about')}], totalAt=W('L8'))),
  scene('L8b', P('pays', 160, 160, 1600, 'L8b', fxIn='wipe', fxOut='vapor', title='26 PAYS · THE MAXIMUMS', sub='CPP + EI STOP ONCE THE YEARLY MAXIMUM IS REACHED',
       stops=[{'pay': 17, 'bump': 0.05, 'label': 'EI STOPS ($68,900)', **W('L8c', 'After that')}, {'pay': 19, 'bump': 0.1, 'label': 'BASE CPP STOPS ($74,600)', **W('L8d')}, {'pay': 22, 'bump': 0.07, 'label': 'CPP2 STOPS ($85,000)', **W('L8d', 'The second')}])),
 scene('L8e', P('khero', 160, 330, 1600, 'L8e', glass=False, fxIn='morph', fxOut='particles', lines=[{'anim': 'morph', 'size': 96, 'seq': [{'text': 'SAME JOB.', 't': 0}, {'text': 'BIGGER PAYCHEQUE.', **W('L8e', 'Nothing changed')}], **W('L8e')}])),
 # ---------- 02 THE YEAR ----------
 scene('L9', P('pay', 250, 120, 1000, 'L9', fxIn='slideL', fxOut='defocus', title='THE FULL YEAR', sub='2026 · MANITOBA', grossLabel='SALARY', gross=D('p.gross'),
       rows=[{'label': 'FEDERAL INCOME TAX', 'value': D('p.federal'), 'color': RED, **W('L9', 'Federal')}, {'label': 'MANITOBA INCOME TAX', 'value': D('p.provincial'), 'color': ORG, **W('L10')},
             {'label': 'CPP + CPP2', 'value': D('p.cpp'), 'color': BLU, **W('L11')}, {'label': 'EI', 'value': D('p.ei'), 'color': YEL, **W('L11', 'EI')}],
       finalAt=W('L12'), finalLabel='TAKE-HOME', barW=940, check=True)),
 scene('L12b', P('steps', 210, 140, 1500, 'L12b', fxIn='focus', fxOut='collapse', title='HOW THE TAX IS CALCULATED', sub='2026 RATES', items=[
       {'n': 'A', 'head': 'TAXABLE INCOME $98,873', 'text': '$100,000 − $1,127 enhanced CPP deduction', 'at': 'L12b', 'word': 'So taxable'},
       {'n': 'B', 'head': 'FEDERAL: 14% + 20.5% = $16,465 − $3,163 CREDITS = $13,302', 'text': '14% to $58,523 · 20.5% above · credits: basic personal amount, CPP, EI, Canada employment amount', 'at': 'L12c'},
       {'n': 'C', 'head': 'MANITOBA: 10.8% + 12.75% = $11,690 − $2,206 = $9,484', 'text': '10.8% to $47,000 · 12.75% above', 'at': 'L12e'}], dimOthers=True)),
 scene('L13', P('khero', 160, 280, 1600, 'L13', glass=False, fxIn='glass', fxOut='vapor', kicker='THE FIRST SURPRISE',
       lines=[{'anim': 'morph', 'size': 120, 'gold': True, 'seq': [{'text': 'BRACKET 33.2%', 't': 0}, {'text': 'REAL RATE 22.8%', **W('L13', 'But Jordan')}], **W('L13')},
              {'text': 'THE BRACKET IS NOT WHAT YOU PAY ON EVERYTHING', 'size': 46, **W('L13', 'The bracket')}])),
 # ---------- 03 PER $100 ----------
 scene('L14', P('hundred', 160, 220, 1600, 'L14', fxIn='morph', fxOut='particles', title='EVERY $100 JORDAN EARNS', sub='2026 · MANITOBA', segs=[
       {'label': 'OTTAWA', 'value': D('per100.federal'), 'color': RED, **W('L14', 'thirteen')}, {'label': 'MANITOBA', 'value': D('per100.provincial'), 'color': ORG, **W('L15')},
       {'label': 'CPP', 'value': D('per100.cpp'), 'color': BLU, **W('L15', 'Four sixty')}, {'label': 'EI', 'value': D('per100.ei'), 'color': YEL, **W('L15', 'One twelve')},
       {'label': 'JORDAN KEEPS', 'value': D('per100.take_home'), 'color': GRN, **W('L16')}])),
 # ---------- 04 OTTAWA ----------
 scene('L17', P('khero', 160, 300, 1600, 'L17', glass=False, fxIn='focus', fxOut='wipe', kicker='WHERE THE FEDERAL MONEY GOES',
       lines=[{'anim': 'decode', 'text': 'TAXES ARE NOT EARMARKED', 'size': 100, **W('L18')}, {'text': 'ONE ACCOUNT · ONE BUDGET', 'size': 54, **W('L18', 'They go')}])),
 scene('L19', P('khero', 160, 300, 1600, 'L19', glass=False, fxIn='wipe', fxOut='vapor', kicker='ILLUSTRATION · FEDERAL SPENDING 2024-25',
       lines=[{'text': "JORDAN'S $13,302 × OTTAWA'S SPENDING MIX", 'size': 70, **W('L19')}, {'anim': 'decode', 'text': 'TOTAL SPENT: $547.3 BILLION', 'gold': True, 'size': 92, **W('L20')}])),
 scene('L21', P('split', 130, 120, 1660, 'L21', fxIn='stagger', fxOut='collapse', title="JORDAN'S $13,302 · SPLIT LIKE FEDERAL SPENDING", sub='ANNUAL FINANCIAL REPORT 2024-25',
       items=D('fed_split'), order=[0, 1, 2, 3, 4, 5, 6, 7, 8], labelW=620, fs=24, vs=32,
       rowAt=[W('L21', 'Jordan'), W('L22'), W('L23'), W('L24'), W('L25'), W('L26', 'about'), W('L27', 'about'), W('L28', 'Interest'), W('L28', 'Nearly')])),
 scene('L29', P('khero', 160, 300, 1600, 'L29', glass=False, fxIn='glass', fxOut='particles', kicker='ONE MORE HONEST DETAIL',
       lines=[{'anim': 'decode', 'text': 'DEFICIT: $36.3 BILLION', 'gold': True, 'size': 110, **W('L29', 'The deficit')}, {'text': 'PART OF THE SPENDING WAS BORROWED', 'size': 50, **W('L29', 'So part')}])),
 # ---------- 05 MANITOBA ----------
 scene('L30', P('split', 130, 160, 1660, 'L30', fxIn='slideR', fxOut='vapor', title="JORDAN'S $9,484 · SPLIT LIKE MANITOBA SPENDING", sub='PUBLIC ACCOUNTS 2025-26 · BY SEGMENT',
       items=D('mb_split'), labelW=560, fs=26, vs=36, note='ILLUSTRATION: TAXES ARE NOT EARMARKED · SHARES BEFORE CONSOLIDATION ADJUSTMENTS',
       rowAt=[W('L31', 'Jordan'), W('L32', 'about'), W('L33'), W('L33', 'Justice'), W('L34'), W('L34', 'Community')])),
 scene('L35', P('khero', 160, 320, 1600, 'L35', glass=False, fxIn='morph', fxOut='defocus', lines=[{'anim': 'morph', 'size': 110, 'seq': [{'text': 'MANITOBA', 't': 0}, {'text': '~4 IN 10 DOLLARS → HEALTH', **W('L35', 'almost')}], **W('L35')}])),
 # ---------- 06 CPP + EI ----------
 scene('L36', P('steps', 260, 180, 1400, 'L36', fxIn='sweep', fxOut='collapse', title='NOT TAXES IN THE USUAL SENSE', items=[
       {'n': 'CPP', 'head': '$4,646 · OUTSIDE OTTAWA’S GENERAL BUDGET', 'text': 'Excluded from the federal financial statements: changes need 2/3 of participating provinces. Employer pays the same rate. Builds Jordan’s pension.', 'at': 'L37'},
       {'n': 'EI', 'head': '$1,123 · FEDERAL REVENUE', 'text': 'Insurance: benefits if Jordan loses the job or takes parental leave.', 'at': 'L39'}], dimOthers=True)),
 # ---------- 07 FULL PICTURE ----------
 scene('L40', P('hundred', 160, 230, 1600, 'L40', fxIn='glass', fxOut='particles', title='THE WHOLE $100,000', sub='PER $100', segs=[
       {'label': 'STAYS WITH JORDAN', 'value': D('per100.take_home'), 'color': GRN, **W('L41')}, {'label': 'INCOME TAX', 'value': {'expr': 'd.per100.federal + d.per100.provincial'}, 'color': RED, **W('L41', 'Twenty-two')},
       {'label': 'CPP + EI', 'value': {'expr': 'd.per100.cpp + d.per100.ei'}, 'color': BLU, **W('L41', 'And five')}])),
 scene('L42b', P('khero', 160, 230, 1600, 'L42b', glass=False, fxIn='focus', fxOut='wipe', kicker='IF INCOME TAX CAME FIRST',
       lines=[{'text': 'JORDAN WORKS FOR GOVERNMENTS UNTIL', 'size': 54, **W('L42b')}, {'anim': 'decode', 'text': 'MARCH 25', 'gold': True, 'size': 170, **W('L42b', 'until')}, {'text': '22.8% OF THE YEAR · ~83 DAYS', 'size': 48, **W('L42c')}])),
 scene('L42d', P('clock', 260, 300, 1400, 'L42d', fxIn='wipe', fxOut='vapor', title='ONE 8-HOUR WORKDAY', sub='INCOME TAX FIRST', minutes=109, caption='OF EVERY DAY = INCOME TAX')),
 scene('L42e', P('khero', 160, 300, 1600, 'L42e', glass=False, fxIn='glass', fxOut='particles', kicker='FEDERAL REVENUE 2024-25',
       lines=[{'anim': 'decode', 'text': '45.9%', 'gold': True, 'size': 180, **W('L42e', 'Forty-five')}, {'text': 'CAME FROM PERSONAL INCOME TAX', 'size': 56, **W('L42e', 'Forty-five', 1.0)}])),
 # ---------- 08 WHAT TO DO ----------
 scene('L43', P('steps', 260, 180, 1400, 'L43', fxIn='slideUp', fxOut='collapse', title='WHAT JORDAN CAN DO', dimOthers=True, items=[
       {'head': 'STOP FEARING THE BRACKET', 'text': 'A raise is taxed at the rate on the new dollars only.', 'at': 'L44'},
       {'head': 'LOWER TAXABLE INCOME', 'text': 'Qualifying RRSP contributions come off the top, at the highest rate.', 'at': 'L45'},
       {'head': 'FILE EVERY YEAR', 'text': 'Benefits and credits are calculated from your return.', 'at': 'L46'}])),
 scene('L47', P('khero', 160, 280, 1600, 'L47', glass=False, fxIn='morph', kicker='NEXT ON TAX SECRETS CANADA',
       lines=[{'anim': 'morph', 'size': 120, 'seq': [{'text': 'MANITOBA', 't': 0}, {'text': '→ ALBERTA?', **W('L47', 'to Alberta')}], **W('L47')}, {'text': 'SAME SALARY · DIFFERENT PROVINCE', 'size': 50, **W('L47', 'Same salary')}])),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'The question'), ('L5', '01 · The paycheque'), ('L9', '02 · The year'), ('L14', '03 · Every $100'), ('L17', '04 · Where Ottawa spends'),
            ('L30', '05 · Where Manitoba spends'), ('L36', '06 · CPP + EI'), ('L40', '07 · The whole picture'), ('L43', '08 · What to do'), ('L47', 'Next')]]
PL = 'lf/lf03/plates/'
plates = {f's{i}': {'photo': {'src': f'{PL}s{i}.jpg', 'depth': f'{PL}s{i}_d.png', 'amt': 0.05}} for i in range(1, 15)}
plates['s1']['lights'] = [{'x': 13, 'y': 4, 'r': 8, 'color': 'rgba(255,200,130,.9)', 'amp': 0.08}]
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [  # (line, plate, camera path) — every shot gets its own move
 ('L1', 's1', cam((-50, 10, 0.15), (40, -10, 0.0))), ('L4', 's13', cam((60, 0, 0.0), (-40, -10, 0.12))),
 ('L5', 's2', cam((0, 30, 0.2), (-30, 0, 0.05))), ('L8b', 's3', cam((-60, 0, 0.05), (50, -10, 0.15))), ('L9', 's1', cam((40, 20, 0.0), (-40, 0, 0.18))),
 ('L12b', 's14', cam((-30, -10, 0.1), (30, 10, 0.2))), ('L14', 's11', cam((50, 10, 0.25), (-40, -10, 0.05))), ('L17', 's9', cam((0, 20, 0.0), (0, -20, 0.22))),
 ('L21', 's4', cam((-40, 0, 0.05), (30, 0, 0.15))), ('L22', 's5', cam((0, 0, 0.0), (0, 0, 0.3))), ('L24', 's6', cam((40, 10, 0.1), (-30, 0, 0.2))),
 ('L25', 's7', cam((-30, 0, 0.15), (40, -10, 0.05))), ('L26', 's9', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L28', 's11', cam((0, 0, 0.3), (0, 10, 0.05))),
 ('L30', 's10', cam((-50, 10, 0.0), (40, -10, 0.15))), ('L31', 's5', cam((10, 0, 0.3), (-10, 0, 0.05))), ('L32', 's8', cam((-40, 0, 0.05), (40, 0, 0.18))), ('L33', 's10', cam((40, 0, 0.18), (-40, 0, 0.05))),
 ('L36', 's12', cam((-40, 10, 0.0), (40, -10, 0.15))), ('L39', 's7', cam((30, 0, 0.05), (-30, 0, 0.2))), ('L40', 's13', cam((-60, 10, 0.2), (60, -10, 0.0))),
 ('L42b', 's14', cam((0, 10, 0.0), (0, -10, 0.3))), ('L42e', 's9', cam((40, 10, 0.05), (-40, -10, 0.18))), ('L43', 's1', cam((-40, 0, 0.2), (40, 0, 0.05))), ('L47', 's13', cam((0, 0, 0.0), (0, -10, 0.25))),
]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('rows') or []) + (p.get('rowAt') or []) + (p.get('segs') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{k: v for k, v in r.items() if k in ('at', 'word')}})
for s in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': s['at']})
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: CRA T4127 (2026) · Manitoba 2026 rates · Federal Annual Financial Report 2024-25 · Manitoba Public Accounts 2025-26 · General info, not advice',
      'data': {'d': {'type': 'file', 'file': 'data.json'}}, 'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx,
      'audio': 'lf/lf03/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1)
print('events', len(events), 'shots', len(shots), 'sfx', len(sfx))
