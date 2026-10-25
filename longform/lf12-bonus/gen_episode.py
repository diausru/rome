import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L6", "L15", "L24", "L27", "L34", "L43", "L45", "L50"}
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
m = lambda v: '${:,}'.format(v)
PL = 'lf/lf12/plates/'
D = d; S6, S9, S15 = D['S60'], D['S90'], D['S150']
events = [
 scene('L1', P('bonus', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.62}, kicker='SAME BONUS · SAME PERSON · 2026', title='A $20,000 BONUS', finishTitle='SAME BONUS. DIFFERENT STUB.', total=20000,
   parts=[{'label': 'INCOME TAX', 'amount': S9['tax'], 'tone': 'tax'}, {'label': 'CPP', 'amount': D['mar_cpp'], 'tone': 'cpp', 'back': True}, {'label': 'EI', 'amount': D['mar_ei'], 'tone': 'cpp', 'back': True}],
   cutAt=[W('L1', 'stub'), W('L1', 'twelve'), W('L1', 'nineteen')], month='MARCH', month2='DECEMBER', flipAt=W('L3', 'December'),
   qAt=W('L4', 'real'), question='WHICH NUMBER IS REAL?', out=W('L6', None, -0.9)), off=-1.0),
 K('L5', [ln('2026 · ONTARIO · SINGLE · $90,000 SALARY', 46, 'L5'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L5', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L6', [dc('THE MYTH', 140, 'L6', 'myth')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 scene('L7', P('misconception', 360, 300, 1200, 'L7', fxIn='glass', fxOut='vapor', title='HOW A BONUS IS TAXED', wrong={'label': 'A SPECIAL, HIGHER BONUS RATE', 'text': 'MYTH'}, fix={'label': 'EMPLOYMENT INCOME · SAME BRACKETS', 'text': 'REALITY', **W('L8', 'employment')})),
 ST('L10', 'THE BONUS METHOD · CRA T4127', [it('1', 'TAX ON SALARY + BONUS', 'L11', 'plus'), it('2', 'MINUS TAX ON SALARY ALONE', 'L11', 'alone'), it('=', 'WITHHELD FROM THE BONUS', 'L11', 'difference'), it('↑', 'TAXED AT THE TOP OF YOUR INCOME', 'L12', 'top')], fxIn='glass', dimOthers=True, y=220),
 K('L14', [ln('$90,000 + $20,000', 70, 'L14', 'plus'), dc(f"TAX {m(S9['tax'])}", 120, 'L14', 'six')], kicker='SAM', fxIn='glass', y=330),
 K('L15', [dc('THE REST OF THE STUB', 120, 'L15', 'rest')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L16', 'SAM’S MARCH STUB · $20,000 BONUS', '2026 · ONTARIO', [{'name': 'CPP', 'value': D['mar_cpp']}, {'name': 'EI', 'value': D['mar_ei']}, {'name': 'INCOME TAX', 'value': S9['tax']}, {'name': 'ON THE STUB', 'value': D['mar_net']}],
       [W('L17', 'one'), W('L17', 'three'), W('L18', 'Six'), W('L18', "That's")], 'TAKEN: $7,681 (≈38%)', fxIn='slideR'),
 ST('L19', 'THE TWIST', [it('MAX', 'AT $90K, CPP + EI MAXIMUMS ARE REACHED ANYWAY', 'L19', 'maximums'), it('=', 'THE BONUS ADDS $0 OF CPP + EI FOR THE YEAR', 'L20', 'single'), it('↑', 'LATER PAYCHEQUES GET BIGGER', 'L21', 'bigger')], fxIn='glass', dimOthers=True, y=240),
 SPLIT('L22', 'SAME BONUS · TWO STUBS', '2026 · ONTARIO · $90K SALARY', [{'name': 'MARCH STUB', 'value': D['mar_net']}, {'name': 'DECEMBER STUB', 'value': D['dec_net']}, {'name': 'REALLY KEPT (YEAR)', 'value': S9['keep']}],
       [W('L22', 'December'), W('L22', 'stub'), W('L23', 'real')], 'SAM KEEPS ≈69%', fxIn='slideL'),
 K('L24', [ln('REFUND AT TAX TIME?', 70, 'L24', 'money'), ln('USUALLY NOT MUCH', 96, 'L24', 'Usually', gold=True)], kicker='03', fxIn='glass', y=330),
 ST('L25', 'WITHHELD vs REAL TAX', [it('≈', 'BONUS METHOD ≈ THE TAX THE BONUS ADDS', 'L25', 'aims'), it('?', 'OTHER INCOME · DEDUCTIONS · CREDITS · TD1', 'L26', 'other')], fxIn='glass', dimOthers=True, y=290),
 K('L27', [dc('THREE COWORKERS', 120, 'L27', 'Three')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L28', 'SAME $20,000 BONUS · WHAT EACH KEEPS', '2026 · ONTARIO', [{'name': 'MAYA · $60,000', 'value': S6['keep']}, {'name': 'SAM · $90,000', 'value': S9['keep']}, {'name': 'ALEX · $150,000', 'value': S15['keep']}],
       [W('L29', 'Maya'), W('L30', 'Sam'), W('L31', 'Alex')], 'THE MIDDLE EARNER KEEPS THE MOST', fxIn='glass'),
 ST('L32', 'WHY THE MIDDLE WINS', [it('MAYA', f"{m(S6['cppei_year'])} OF REAL EXTRA CPP + EI", 'L32', 'lowest'), it('SAM', 'PAST CPP + EI MAXIMUMS · BELOW HIGH BRACKETS', 'L32', 'middle'), it('ALEX', f"HIGHER BRACKETS + SURTAX · {S15['pct']}% GONE", 'L32', 'higher')], fxIn='slideR', dimOthers=True, y=240),
 K('L34', [dc('WHAT YOU CAN DO', 120, 'L34', 'actually')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L35', 'THE RRSP LEVER', [it('1', 'DEDUCTION COMES OFF THE TOP OF YOUR INCOME', 'L35', 'top'), it('$10K', f"INTO THE RRSP → ≈{m(D['rrsp10'])} LESS INCOME TAX", 'L36', 'drops'),
   it('A', 'CONTRIBUTE YOURSELF · TAX BACK WHEN YOU FILE', 'L37', 'yourself'), it('B', 'THROUGH PAYROLL · LESS WITHHELD (REASONABLE GROUNDS)', 'L38', 'reasonable')], fxIn='glass', dimOthers=True, y=200),
 K('L39', [ln('YOU NEED RRSP ROOM', 76, 'L39', 'room', gold=True), ln('NOTICE OF ASSESSMENT · MY ACCOUNT', 52, 'L39', 'notice'), ln('RRSP ≠ CPP / EI REFUND', 52, 'L40', 'refund')], kicker='CHECK FIRST', fxIn='glass', y=320),
 ST('L41', 'TIMING', [it('MAR', 'MORE CPP + EI ON THE STUB · EVENS OUT BY DEC', 'L41', 'early'), it('JAN', 'NEXT TAX YEAR · MATTERS IF INCOME CHANGES', 'L42', 'January')], fxIn='slideL', dimOthers=True, y=300),
 ST('L43', 'WHERE THIS CHANGES', [it('CCB', 'INCOME-TESTED BENEFITS CAN RAISE THE COST', 'L43', 'benefit'), it('QC', 'OWN PAYROLL RULES + PENSION PLAN', 'L44', 'Quebec'), it('≠', 'OTHER PROVINCES: DIFFERENT RATES', 'L44', 'provinces')], fxIn='glass', dimOthers=True, y=260),
 ST('L45', 'YOUR BONUS CHECKLIST', [it('1', 'SPLIT TAX FROM CPP + EI ON THE STUB', 'L46', 'split'), it('2', 'YEAR-TO-DATE CPP + EI: JUST TIMING?', 'L47', 'year-to-date'),
   it('3', 'KNOW YOUR RRSP ROOM FIRST', 'L48', 'room'), it('4', 'AT FILING: WITHHELD vs ACTUAL TAX', 'L49', 'compare')], fxIn='stagger', dimOthers=True, y=200),
 K('L50', [dc('WHAT DID WE LEARN?', 140, 'L50', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L51', 'A $20,000 BONUS · 4 RULES', [it('1', 'NO SPECIAL RATE · TOP OF YOUR INCOME', 'L51', 'special'), it('2', 'THE STUB CAN LOOK WORSE THAN THE YEAR', 'L52', 'worse'),
   it('3', 'WHERE YOUR SALARY SITS DECIDES THE COST', 'L53', 'depends'), it('4', 'RRSP ROOM = THE MAIN LEVER', 'L54', 'R R S P')], fxIn='glass', dimOthers=True, y=200),
 K('L55', [mo([{'text': 'SAME SALARY', 't': 0}, {'text': 'DIFFERENT PROVINCE, DIFFERENT TAX', **W('L55', 'provinces')}], 100, 'L55', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L55', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Same bonus, two stubs'), ('L6', '01 · The bonus-rate myth'), ('L15', '02 · The rest of the stub'), ('L24', '03 · Refund at tax time?'), ('L27', '04 · Three coworkers'),
  ('L34', '05 · What you can do'), ('L43', '06 · Where this changes'), ('L45', '07 · Checklist'), ('L50', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L6', 's1', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L15', 's5', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L22', 's2', cam((0, 30, 0.0), (0, -30, 0.25))),
     ('L27', 's3', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L34', 's4', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L41', 's5', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L43', 's2', cam((-30, 0, 0.0), (30, 0, 0.2))),
     ('L45', 's6', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L50', 's4', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
for r in h['cutAt']: sfx.append({'name': 'tick', 'vol': 0.2, **r})
sfx.append({'name': 'whoosh', 'vol': 0.2, **h['flipAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"MARCH STUB {m(D['mar_net'])} · DECEMBER STUB {m(D['dec_net'])}", f"BONUS TAX @ $90K: {m(S9['tax'])}", f"KEEPS: $60K {m(S6['keep'])} · $90K {m(S9['keep'])} · $150K {m(S15['keep'])}", 'NO SPECIAL BONUS RATE', '2026 RATES · ONTARIO · EXAMPLE']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA T4127 (2026), T4001 · 2026 rates · Example calculation, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf12/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
