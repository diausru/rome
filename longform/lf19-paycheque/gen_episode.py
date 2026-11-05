import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L7", "L14", "L19", "L23", "L29", "L39", "L44", "L47", "L51", "L56"}
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
PL = 'lf/lf19/plates/'
D = d; f, la = D['first'], D['last']
c2 = lambda v: '${:,.2f}'.format(v)
events = [
 scene('L1', P('paytl', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.72}, kicker='SAME SALARY · 26 PAYCHEQUES · 2026 · ONTARIO', title='WHY DID HER PAY GO UP?',
   rows=D['rows'], gross=D['gross'], firstAt=W('L1', 'first'), lastAt=W('L2', 'last'), diffAt=W('L3', 'Two'), qAt=W('L4', 'where'), question='WHERE DOES IT COME FROM — AND WHY DOES IT VANISH IN JANUARY?', out=W('L6', None, -0.9)), off=-1.0),
 K('L6', [ln('2026 · ONTARIO · $90,000 · PAID EVERY TWO WEEKS', 46, 'L6'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L6', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L7', [dc('THE FOUR LINES', 140, 'L7', 'four')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L8', 'DANA · ONE PAYCHEQUE', '$90,000 ÷ 26 · 2026 · ONTARIO', [{'name': f"GROSS PAY · {c2(D['gross'])}", 'value': D['gross']}, {'name': f"CPP · {c2(f['cpp'])}", 'value': f['cpp']}, {'name': f"EI · {c2(f['ei'])}", 'value': f['ei']}, {'name': f"INCOME TAX · {c2(f['tax'])}", 'value': f['tax']}, {'name': f"TAKE-HOME · {c2(f['net'])}", 'value': f['net']}],
       [W('L8', 'three'), W('L9', 'C'), W('L10', 'E'), W('L11', 'income'), W('L12', 'left')], 'TWO LINES HAVE A YEARLY LIMIT · ONE DOESN\'T', fxIn='glass'),
 K('L14', [dc('CPP', 150, 'L14', 'C')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 ST('L15', 'CPP · 2026', [it('5.95%', 'OF PAY · FIRST $3,500 OF THE YEAR EXEMPT', 'L15', 'five'), it('$74,600', 'CEILING · MAX $4,230.45 FOR AN EMPLOYEE', 'L16', 'ceiling'), it('CPP2', '4% FROM $74,600 TO $85,000 · MAX $416', 'L17', 'second'), it('TAX', 'PART DEDUCTION, PART CREDIT ON YOUR RETURN', 'L18', 'deduction')], fxIn='glass', dimOthers=True, y=200),
 K('L19', [dc('EI', 150, 'L19', 'E')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 ST('L20', 'EI · 2026 · OUTSIDE QUEBEC', [it('1.63%', 'OF PAY', 'L20', 'one'), it('$68,900', 'CEILING · MAX $1,123.07 FOR AN EMPLOYEE', 'L21', 'stops'), it('EI', 'JOB LOSS · PARENTAL · SICKNESS BENEFITS · IF YOU QUALIFY', 'L22', 'insurance')], fxIn='slideR', dimOthers=True, y=240),
 K('L23', [dc('INCOME TAX', 140, 'L23', 'income')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 ST('L24', 'INCOME TAX · NO CEILING', [it('∞', 'NO YEARLY LIMIT', 'L24', 'ceiling'), it('TD1', 'YOUR FORM + YOUR PAY → AN ESTIMATE', 'L24', 'estimates'), it(f"≈{m(round(f['tax']))}", 'DANA · EVERY PAYDAY, ALL YEAR', 'L25', 'six'), it('±', 'BONUS OR PAY CHANGE → TAX LINE CHANGES', 'L26', 'bonus'), it('↩', 'YOUR RETURN SETTLES THE DIFFERENCE', 'L27', 'settles')], fxIn='glass', dimOthers=True, y=180),
 K('L28', [ln('CPP AND EI STOP', 96, 'L28', 'stop'), ln("INCOME TAX DOESN'T", 70, 'L28', 'doesn', gold=True)], kicker='THE KEY', fxIn='glass', y=330),
 K('L29', [dc("DANA'S YEAR", 140, 'L29', 'year')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L30', 'THE FALL PAYCHEQUES', [it('#20', 'EARNINGS PASS $68,900 · PARTIAL EI', 'L30', 'twenty'), it('#21', 'NO EI · ≈ +$56', 'L31', 'twenty-one'), it('#22', 'PASSES $74,600 · CPP STOPS · CPP2 STARTS', 'L32', 'twenty-two'), it('4%', 'CPP2 · UP TO $138.46 A PAYCHEQUE', 'L33', 'four'), it('$85K', 'CPP2 STOPS TOO', 'L34', 'eighty-five'), it('#26', f"ONLY INCOME TAX · {c2(la['net'])}", 'L35', 'twenty-six')], fxIn='slideL', dimOthers=True, y=160),
 K('L36', [mo([{'text': c2(f['net']), 't': 0}, {'text': c2(la['net']), **W('L36', 'raise')}], 130, 'L36', gold=True), ln(f"+{c2(D['raise_pp'])} · THE FALL RAISE", 60, 'L36', 'more'), ln("NOT A RAISE · JANUARY 1: LIMITS RESET", 50, 'L37', 'January', gold=True)], kicker='THE FALL RAISE', fxIn='glass', y=270),
 K('L38', [ln('JANUARY FEELS LIKE A PAY CUT', 84, 'L38', 'January'), ln("IT'S THE SAME YEAR STARTING AGAIN", 54, 'L38', 'pay', gold=True)], fxIn='glass', y=340),
 K('L39', [dc('THE HALF YOU NEVER SEE', 120, 'L39', 'half')], kicker='06', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L40', 'WHAT THE EMPLOYER PAYS ON TOP', "DANA'S $90,000 · 2026", [{'name': f"EMPLOYER CPP + CPP2 · {c2(D['emp_cpp'])}", 'value': D['emp_cpp']}, {'name': f"EMPLOYER EI (1.4×) · {c2(D['emp_ei'])}", 'value': D['emp_ei']}, {'name': f"TOTAL · {c2(D['emp_total'])}", 'value': D['emp_total']}],
       [W('L40', 'same'), W('L41', 'one'), W('L42', 'Together')], 'REAL COST OF THE JOB ≈ $96,200', fxIn='slideR'),
 K('L44', [dc('THE FULL YEAR', 140, 'L44', 'full')], kicker='07', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L45', 'DANA · 2026 · OFF $90,000', 'ONTARIO · ROUNDED', [{'name': 'INCOME TAX', 'value': D['tax_year']}, {'name': 'CPP + CPP2', 'value': round(D['cpp_year'] + D['cpp2_year'])}, {'name': 'EI', 'value': round(D['ei_year'])}, {'name': 'TOTAL OFF', 'value': D['total_year']}, {'name': 'DANA KEEPS', 'value': D['keep']}],
       [W('L45', 'Income'), W('L45', 'C'), W('L45', 'E'), W('L46', 'total'), W('L46', 'keeps')], 'EXAMPLE · ONTARIO 2026 · EMPLOYMENT INCOME ONLY', fxIn='glass'),
 K('L47', [dc('WHERE THIS CHANGES', 120, 'L47', 'changes')], kicker='08', fxIn='focus', fxOut='wipe', y=330),
 ST('L48', 'NOT EVERYONE GETS A FALL RAISE', [it('<$68.9K', 'UNDER THE LIMITS · CPP + EI ALL YEAR', 'L48', 'less'), it('2 JOBS', 'EACH EMPLOYER DEDUCTS · OVERPAYMENT BACK ON YOUR RETURN', 'L49', 'two'), it('SELF', 'SELF-EMPLOYED: BOTH CPP HALVES · EI OPTIONAL', 'L50', 'Self'), it('QC', 'QUEBEC: DIFFERENT RULES', 'L50', 'Quebec')], fxIn='slideR', dimOthers=True, y=200),
 ST('L51', 'YOUR PAY STUB CHECKLIST', [it('1', 'FIND YEAR-TO-DATE CPP + EI', 'L52', 'One'), it('2', 'COMPARE WITH THE YEARLY MAXIMUMS', 'L53', 'Two'), it('3', 'PLAN FOR JANUARY', 'L54', 'Three'), it('4', 'TWO JOBS? CHECK FOR AN OVERPAYMENT', 'L55', 'Four')], fxIn='stagger', dimOthers=True, y=200),
 K('L56', [dc('WHAT DID WE LEARN?', 140, 'L56', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L57', 'YOUR PAYCHEQUE · 4 RULES', [it('1', 'GROSS · CPP · EI · INCOME TAX', 'L57', 'One'), it('2', 'CPP + EI HAVE LIMITS · TAX DOESN\'T', 'L58', 'Two'), it('3', 'THE FALL RAISE IS TIMING', 'L59', 'Three'), it('4', 'EMPLOYER: SAME CPP · MORE EI', 'L60', 'Four')], fxIn='glass', dimOthers=True, y=200),
 K('L61', [mo([{'text': 'CPP · EI · INCOME TAX', 't': 0}, {'text': 'THE RRSP · REAL NUMBERS', **W('L61', 'R')}], 100, 'L61', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L61', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Same salary, bigger paycheque'), ('L7', '01 · The four lines'), ('L14', '02 · CPP'), ('L19', '03 · EI'), ('L23', '04 · Income tax'), ('L29', "05 · Dana's year"),
  ('L39', '06 · The half you never see'), ('L44', '07 · The full year'), ('L47', '08 · Where this changes'), ('L51', 'Checklist'), ('L56', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L7', 's3', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L14', 's4', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L23', 's1', cam((0, 30, 0.0), (0, -30, 0.25))),
     ('L29', 's2', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L39', 's4', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L44', 's5', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L47', 's3', cam((-30, 0, 0.0), (30, 0, 0.2))),
     ('L51', 's6', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L56', 's2', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
for k in ('firstAt', 'lastAt'): sfx.append({'name': 'tick', 'vol': 0.2, **h[k]})
sfx.append({'name': 'whoosh', 'vol': 0.22, **h['diffAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"DANA · $90,000 · FIRST PAY {c2(f['net'])} → LAST PAY {c2(la['net'])}", 'CPP 5.95% · CEILING $74,600 · MAX $4,230.45', 'CPP2 4% · $74,600–$85,000 · MAX $416', 'EI 1.63% · CEILING $68,900 · MAX $1,123.07', f"EMPLOYER PAYS {c2(D['emp_total'])} ON TOP", 'EXAMPLES · 2026 · ONTARIO']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA CPP contribution rates, maximums and exemptions; EI premium rates and maximums (2026); T4127 payroll formulas (2026) · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf19/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
