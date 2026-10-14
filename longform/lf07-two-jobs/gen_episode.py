"""LF-07 Two jobs — full episode. NEW hook type: two 'correct' pay stubs collide, a bill drops (StubsHook). Numbers from data.json."""
import json
L = json.load(open('lines.json')); d = json.load(open('data.json')); sc = d['scen']
CH = {'L6', 'L10', 'L16', 'L21', 'L29', 'L37', 'L42', 'L49', 'L53', 'L56', 'L61'}
vo = [{'id': k, 'file': f'vo/{k}.mp3', 'gap': 1.0 if k in CH else 0.35, 'text': t} for k, t in L]
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
m = lambda v: '${:,}'.format(v)
def SPLIT(at, title, sub, items, rowAt, note, x=260, y=290, w=1400, fxIn='slideR', fxOut='vapor', **kw):
    return scene(at, P('split', x, y, w, at, fxIn=fxIn, fxOut=fxOut, title=title, sub=sub, labelW=560, fs=34, vs=50, noTotal=True, items=items, rowAt=rowAt, note=note, **kw))
PL = 'lf/lf07/plates/'
events = [
 # HOOK — StubsHook (new): frame 0 shows both stubs; ✓ ✓ → collide → bill drops with $6,523 → question
 scene('L1', P('stubs', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.55}, kicker='TWO JOBS · ONE PERSON · ONTARIO 2026',
   stubs=[{'head': 'EMPLOYER A', 'tag': 'DAY JOB', 'title': 'MAYA · $55,000', 'rows': [{'label': 'INCOME TAX WITHHELD', 'value': m(d['tax_A'])}, {'label': 'CPP · EI', 'value': '✓'}, {'label': 'TD1 · PERSONAL AMOUNTS', 'value': 'CLAIMED'}]},
          {'head': 'EMPLOYER B', 'tag': 'EVENINGS', 'title': 'MAYA · $35,000', 'rows': [{'label': 'INCOME TAX WITHHELD', 'value': m(d['tax_B'])}, {'label': 'CPP · EI', 'value': '✓'}, {'label': 'TD1 · PERSONAL AMOUNTS', 'value': 'CLAIMED'}]}],
   checkAt=[W('L1', 'Both'), W('L1', 'single')], mergeAt=W('L2', 'exactly'), billAt=W('L3', 'six'),
   bill={'head': 'TAX RETURN · APRIL', 'label': 'INCOME TAX STILL OWING', 'value': d['gap'], 'note': 'EXAMPLE CALCULATION · 2026 RATES'},
   qAt=W('L4', 'how'), question='BOTH EMPLOYERS GOT IT RIGHT. SO WHY THE BILL?', out=W('L5', None, -0.9)), off=-1.0),
 ST('L5', 'TWO OPEN QUESTIONS', [it('?', 'THE ONE BOX ON ONE FORM', 'L4', 'answer'), it('?', 'THE TRAP THAT FOLLOWS INTO NEXT YEAR', 'L5', 'second')], fxIn='glass', dimOthers=True, y=300),
 K('L6', [ln('2026 FEDERAL + ONTARIO RATES', 74, 'L6'), dc('ONE EXAMPLE PERSON', 110, 'L6', 'example'), ln('GENERAL INFO · NOT ADVICE', 50, 'L6', 'General')], kicker='THE SETUP', fxIn='wipe'),
 # 01
 SPLIT('L7', 'MEET MAYA · ONTARIO · SINGLE', 'EXAMPLE PERSON · NOT A REAL CASE', [{'name': 'DAY JOB', 'value': d['A']}, {'name': 'EVENING JOB', 'value': d['B']}, {'name': 'TOTAL INCOME', 'value': d['total']}],
       [W('L7', 'fifty-five'), W('L8', 'thirty-five'), W('L8', 'Ninety')], 'TWO EMPLOYERS AT THE SAME TIME', fxIn='glass'),
 K('L9', [mo([{'text': 'DAY 1 · JOB A', 't': 0}, {'text': 'FORM TD1', **W('L9', 'T D')}], 140, 'L9', gold=True), ln('PERSONAL TAX CREDITS RETURN', 54, 'L9', 'personal')], kicker='THE FORM', fxIn='morph', fxOut='wipe'),
 ST('L10', 'WHAT MAYA CLAIMED', [it('A', 'JOB A: BASIC PERSONAL AMOUNT ✓', 'L10', 'both'), it('B', 'JOB B: BASIC PERSONAL AMOUNT ✓', 'L10', 'basic'), it('!', 'FEELS NORMAL ON A NEW JOB', 'L10', 'normal')], fxIn='slideL', dimOthers=True, y=250),
 # 02 blind spot
 K('L11', [dc('EACH PAYROLL SEES ONE JOB', 110, 'L11', 'Each')], kicker='THE BLIND SPOT', fxIn='focus', fxOut='wipe', y=340),
 ST('L12', 'WHAT EACH EMPLOYER KNOWS', [it('A', 'SEES $55,000 · NOTHING ELSE', 'L12', 'sees'), it('B', 'SEES $35,000 · NOTHING ELSE', 'L13', 'sees'), it('=', 'EACH JOB TREATED AS THE WHOLE INCOME', 'L14', 'whole')], fxIn='stagger', dimOthers=True, y=240),
 SPLIT('L15', 'INCOME TAX WITHHELD IN 2026 (ESTIMATE)', 'EACH JOB ALONE · BOTH TD1s CLAIM PERSONAL AMOUNTS', [{'name': 'DAY JOB', 'value': d['tax_A']}, {'name': 'EVENING JOB', 'value': d['tax_B']}, {'name': 'TOTAL WITHHELD', 'value': d['withheld']}],
       [W('L15', 'seven'), W('L15', 'evening'), W('L16', 'Ten')], 'EVERY PAYCHEQUE LOOKED FINE'),
 # 03 truth
 K('L17', [mo([{'text': 'THE RETURN ≠ THE JOBS', 't': 0}, {'text': 'THE RETURN = MAYA', **W('L17', 'Maya')}], 130, 'L17', gold=True)], kicker='APRIL', fxIn='glass', fxOut='particles'),
 scene('L18', P('formula', 300, 330, 1320, 'L18', fxIn='slideR', fxOut='defocus', title='ONE RETURN · $90,000', sub='2026 · ONTARIO',
   steps=[{'text': 'OWED', **W('L18', 'tax')}, {'value': d['owed'], **W('L18', 'seventeen')}, {'text': '−', 'op': True, **W('L19', 'ten')}, {'value': d['withheld'], **W('L19', 'withheld')}, {'text': '=', 'op': True, **W('L19', 'difference')}, {'result': True, 'value': d['gap'], **W('L19', 'Six')}],
   takeaway={'text': f"≈ {m(d['gap_month'])} A MONTH THAT NOBODY SET ASIDE", **W('L20')})),
 K('L21', [dc('2 LEAKS', 200, 'L21', 'Two')], kicker='WHERE DID IT COME FROM?', fxIn='glass', fxOut='wipe', y=330),
 # 04 leak 1
 ST('L22', 'LEAK #1 · PERSONAL AMOUNTS COUNTED TWICE', [it('FED', '$16,452 × 14% = $2,303', 'L23', 'Federally'), it('ON', '$12,989 × 5.05% = $656', 'L23', 'Ontario'),
   it('2×', 'CLAIMED AT BOTH JOBS', 'L24', 'both'), it('=', f"≈ {m(d['bpa_double'])} NEVER WITHHELD", 'L24', 'Together')], fxIn='glass', dimOthers=True),
 # 05 leak 2
 K('L25', [mo([{'text': 'LEAK #2', 't': 0}, {'text': 'QUIETER · BIGGER', **W('L25', 'quieter')}], 140, 'L25', gold=True)], fxIn='focus', fxOut='wipe'),
 ST('L26', 'THE EVENING JOB’S $35,000 · RATE ON THOSE DOLLARS', [it('19%', 'WITHHELD AT: 14% FED + 5.05% ON (JOB ALONE)', 'L26', 'fourteen'),
   it('30%', 'OWED AT: UP TO 20.5% FED + 9.15% ON (ON TOP OF $55K)', 'L27', 'twenty'), it('=', f"≈ {m(d['bracket_part'])} GAP", 'L28', 'gap')], fxIn='slideL', dimOthers=True, y=240),
 scene('L28', P('formula', 300, 330, 1320, 'L28', fxIn='glass', fxOut='collapse', title='THE BILL, TAKEN APART', sub='ESTIMATE',
   steps=[{'value': d['bpa_double'], **W('L29', 'Two')}, {'text': '+', 'op': True, **W('L29', 'plus')}, {'value': d['bracket_part'], **W('L28', 'gap')}, {'text': '=', 'op': True, **W('L29', 'That')}, {'result': True, 'value': d['gap'], **W('L29', 'six')}])),
 # 05b size
 K('L30', [mo([{'text': 'DOES SIZE MATTER?', 't': 0}, {'text': '3 VERSIONS OF MAYA', **W('L31', 'two more')}], 130, 'L30', gold=True)], kicker='THE TEST', fxIn='morph', fxOut='wipe'),
 SPLIT('L31', 'EVENING JOB ONLY $10,000', 'DAY JOB $55,000 · ESTIMATE', [{'name': 'WITHHELD BY THE $10K JOB', 'value': sc['55000_10000']['tax_B_alone']}, {'name': 'BILL ON THE RETURN', 'value': sc['55000_10000']['gap']}],
       [W('L32', 'nothing'), W('L33', 'bill')], 'BELOW THE BASIC PERSONAL AMOUNT ON ITS OWN → NO TAX WITHHELD', fxIn='slideR'),
 SPLIT('L34', 'THREE VERSIONS · SAME $90,000?', 'BILL ON THE RETURN · ESTIMATE', [{'name': '$55K + $10K', 'value': sc['55000_10000']['gap']}, {'name': '$55K + $35K', 'value': d['gap']}, {'name': '$45K + $45K', 'value': sc['45000_45000']['gap']}],
       [W('L34', 'Version'), W('L35', 'Each'), W('L36', 'bill')], 'IT’S NOT THE SIZE · IT’S THAT EACH PAYROLL SEES PART', fxIn='glass'),
 K('L37', [ln('NOT THE SIZE OF THE SECOND JOB', 74, 'L37'), dc('EACH PAYROLL SEES PART', 110, 'L37', 'payroll')], kicker='THE PATTERN', fxIn='wipe', fxOut='particles'),
 # 06 some back
 ST('L38', 'A LITTLE COMES BACK', [it('EI', 'PAID $1,467 · MAX $1,123.07', 'L40', 'paid', '1.63% up to $68,900 of earnings per year, deducted by each employer'), it('+', f"≈ ${d['ei_over']:,.2f} REFUNDED ON THE RETURN", 'L40', 'comes back'),
   it('CPP', 'OVERPAYMENT CHECKED ON THE RETURN', 'L41', 'C P P', 'Schedule 8 · line 44800'), it('≠', 'NOT $6,000', 'L42', 'not')], fxIn='slideR', dimOthers=True),
 # 07 the box
 K('L43', [dc('THE ONE BOX', 170, 'L43', 'box')], kicker='OPEN QUESTION #1', fxIn='glass', fxOut='wipe', y=330),
 ST('L44', 'FORM TD1 · PAGE 2', [it('☑', 'MORE THAN ONE EMPLOYER OR PAYER AT THE SAME TIME', 'L44', 'more'), it('0', 'TOTAL CLAIM AMOUNT = 0 AT THE SECOND JOB', 'L45', 'zero', 'Personal amounts already claimed with another employer'),
   it('✓', f"LEAK #1 CLOSED · ≈ {m(d['bpa_double'])}", 'L46', 'closed')], fxIn='glass', dimOthers=True, y=220),
 ST('L47', 'LEAK #2 · STILL OPEN', [it('!', 'THE EVENING JOB STILL SEES ONLY $35,000', 'L47', 'still'), it('+', 'TD1: ADDITIONAL TAX TO BE DEDUCTED', 'L48', 'additional'),
   it('≈', f"≈ ${d['after_td1_per_pay26']} PER BIWEEKLY PAY (ESTIMATE)", 'L49', 'twenty-six')], fxIn='slideL', dimOthers=True, y=240),
 # 08 second trap
 K('L50', [dc('THE SECOND TRAP', 150, 'L50', 'second')], kicker='OPEN QUESTION #2', fxIn='glass', fxOut='wipe', y=330),
 ST('L51', 'TAX INSTALMENTS · THE TEST', [it('1', 'NET TAX OWING > $3,000 THIS YEAR', 'L51', 'three'), it('2', 'AND > $3,000 IN EITHER OF THE 2 PREVIOUS YEARS', 'L51', 'either')], fxIn='stagger', dimOthers=True, y=290),
 scene('L52', P('timeline', 200, 330, 1520, 'L52', fxIn='slideR', fxOut='vapor', title='IF REQUIRED · INSTALMENT DUE DATES', sub='CRA',
   points=[{'date': 'MAR 15', 'label': 'PAYMENT 1', **W('L52', 'March')}, {'date': 'JUN 15', 'label': 'PAYMENT 2', **W('L52', 'June')}, {'date': 'SEP 15', 'label': 'PAYMENT 3', **W('L52', 'September')}, {'date': 'DEC 15', 'label': 'PAYMENT 4', **W('L52', 'December')}])),
 K('L53', [ln('ONE BAD YEAR', 90, 'L53'), dc('≠ A SCHEDULE', 130, 'L53', 'schedule')], kicker='WHY FIX IT NOW', fxIn='morph', fxOut='particles'),
 # 09 who else
 ST('L54', 'NOT ONLY TWO JOBS', [it('1', 'ANY 2+ EMPLOYERS OR PAYERS AT THE SAME TIME', 'L55', 'anyone'), it('2', 'EACH PAYER SEES ONLY ITS OWN PAYMENTS', 'L55', 'Each'),
   it('?', 'BALANCE OWING EVERY APRIL? COUNT YOUR PAYERS', 'L56', 'check')], fxIn='glass', dimOthers=True, y=240),
 # verdict
 K('L57', [mo([{'text': 'SO WHAT HAPPENED?', 't': 0}, {'text': 'THE FORMS SAID: ONE JOB', **W('L58', 'forms')}], 120, 'L57', gold=True)], fxIn='focus', fxOut='wipe'),
 ST('L59', "MAYA'S 3 FIXES", [it('1', 'PERSONAL AMOUNTS AT ONE EMPLOYER ONLY', 'L59', 'one'), it('2', 'ADDITIONAL TAX AT THE SECOND JOB', 'L60', 'additional'),
   it('3', 'OWED > $3,000? WATCH FOR INSTALMENT REMINDERS', 'L61', 'instalment')], fxIn='glass', dimOthers=True, y=230),
 K('L62', [mo([{'text': 'SAME $100,000', 't': 0}, {'text': 'AB · MB · ON', **W('L62', 'Alberta')}], 130, 'L62', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L62', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'The bill'), ('L7', '01 · Meet Maya'), ('L11', '02 · The blind spot'), ('L17', '03 · The return'), ('L22', '04 · Leak #1'), ('L25', '05 · Leak #2'),
  ('L30', '06 · Does size matter?'), ('L38', '07 · What comes back'), ('L43', '08 · The one box'), ('L50', '09 · The second trap'), ('L54', '10 · Who else'), ('L57', 'The fixes')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((-30, 0, 0.1), (30, 0, 0.0))), ('L7', 's2', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L8', 's3', cam((-50, 10, 0.2), (40, -10, 0.05))), ('L11', 's4', cam((0, 20, 0.0), (0, -20, 0.22))),
     ('L17', 's5', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L22', 's1', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L25', 's3', cam((-30, 0, 0.15), (40, -10, 0.05))), ('L30', 's4', cam((0, 0, 0.0), (0, 0, 0.3))),
     ('L38', 's6', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L43', 's6', cam((-60, 10, 0.0), (40, -10, 0.15))), ('L50', 's7', cam((10, 0, 0.3), (-10, 0, 0.05))), ('L54', 's2', cam((-40, 0, 0.05), (40, 0, 0.18))),
     ('L57', 's8', cam((40, 0, 0.18), (-40, 0, 0.05)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []) + (p.get('steps') or []) + (p.get('points') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{k: v for k, v in r.items() if k in ('at', 'word')}})
h = events[0]['panels'][0]
for k in ('checkAt',):
    for r in h[k]: sfx.append({'name': 'tick', 'vol': 0.16, **r})
sfx.append({'name': 'whoosh', 'vol': 0.14, **h['mergeAt']}); sfx.append({'name': 'whoosh', 'vol': 0.2, **h['billAt']})
for s in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': s['at']})
ticker = [f"JOB A $55,000 → WITHHELD ≈ {m(d['tax_A'])}", f"JOB B $35,000 → WITHHELD ≈ {m(d['tax_B'])}", f"TAX ON $90,000: {m(d['owed'])}", f"BILL ≈ {m(d['gap'])}",
          'TD1: ONE SET OF PERSONAL AMOUNTS', 'TD1: ADDITIONAL TAX TO BE DEDUCTED', 'INSTALMENTS: > $3,000 TEST', 'EI MAX 2026: $1,123.07', '2026 RATES · ONTARIO EXAMPLE']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: CRA — TD1 2026 · Line 44800 · Required tax instalments · 2026 federal & Ontario rates · Example estimate, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker,
      'audio': 'lf/lf07/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1)
print('events', len(events), 'shots', len(shots), 'sfx', len(sfx))
