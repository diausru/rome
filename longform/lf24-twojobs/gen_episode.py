import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L9", "L15", "L24", "L32", "L36", "L43", "L51", "L59", "L65"}
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
PL = 'lf/lf24/plates/'
D = d; c2 = lambda v: '${:,.2f}'.format(v)
events = [
 scene('L1', P('twin', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.74}, kicker='LENA · TWO JOBS · $75,000 · 2026 · ONTARIO', title='TAX OFF EVERY PAYCHEQUE. STILL OWES?',
   jobs=[{'name': 'JOB A', 'pay': D['jobA'], 'withheld': D['wA']}, {'name': 'JOB B', 'pay': D['jobB'], 'withheld': D['wB']}], real=D['real'], withheld=D['withheld'],
   rollAt=W('L2', 'took'), gapAt=W('L3', 'owes'), qAt=W('L7', 'exactly'), question='WHY DO TWO JOBS END IN A TAX BILL?', out=W('L8', None, -0.9)), off=-1.0),
 K('L8', [ln('2026 · ONTARIO · EMPLOYMENT INCOME · PAID EVERY TWO WEEKS', 44, 'L8'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L8', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L9', [dc('HOW PAYROLL SEES YOU', 120, 'L9', 'payroll')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L10', 'EACH EMPLOYER SEES ONE JOB', [it('1', 'NO IDEA THE OTHER JOB EXISTS', 'L10', 'idea'), it('100%', 'WITHHOLDS AS IF IT WERE YOUR ONLY INCOME', 'L11', 'only'), it('TD1', 'WHERE YOU CLAIM YOUR PERSONAL TAX CREDITS', 'L12', 'T'),
   it('2×', 'SAME TD1 TWICE → THE CREDIT GIVEN TWICE · ON YOUR RETURN: ONCE', 'L13', 'both'), it('½', "HALF OF LENA'S PROBLEM", 'L14', 'half')], fxIn='glass', dimOthers=True, y=180),
 K('L15', [dc("LENA'S YEAR", 140, 'L15', 'year')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L16', 'TWO PAYROLLS · ONE RETURN', '2026 · ONTARIO · ROUNDED', [{'name': 'JOB A $45,000 · WITHHELD', 'value': D['wA']}, {'name': 'JOB B $30,000 · WITHHELD', 'value': D['wB']}, {'name': 'TOTAL WITHHELD', 'value': D['withheld']}, {'name': 'REAL TAX ON $75,000', 'value': D['real']}, {'name': 'SHE OWES', 'value': D['short']}],
       [W('L17', 'withholds'), W('L18', 'withholds'), W('L19', 'Together'), W('L21', 'real'), W('L22', 'owes')], f"≈{m(D['extra_pp'])} SHORT ON EVERY PAYCHEQUE", fxIn='glass'),
 K('L24', [dc('WHERE THE GAP COMES FROM', 110, 'L24', 'gap')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 ST('L25', 'TWO REASONS', [it('1', 'BASIC PERSONAL AMOUNT GIVEN TWICE · REAL ONCE', 'L26', 'Both'), it('2', 'THE BRACKETS', 'L27', 'brackets'), it('B', 'JOB B TAXED AS THE FIRST $30,000 · LOWEST RATES', 'L28', 'lowest'),
   it('↑', 'ON THE RETURN IT SITS ON TOP OF JOB A · HIGHER BRACKETS', 'L29', 'top'), it('+', 'MORE COMBINED INCOME → BIGGER GAP', 'L31', 'bigger')], fxIn='slideR', dimOthers=True, y=180),
 K('L32', [ln('NO SECOND-JOB TAX', 96, 'L33', 'second'), ln('SAME BRACKETS · ONCE IT ALL ADDS UP', 60, 'L34', 'same', gold=True), ln('WITHHOLDING = AN ESTIMATE THAT GUESSED LOW', 46, 'L34', 'estimate')], kicker='WHAT THIS IS NOT', fxIn='glass', y=310),
 K('L36', [dc('FIX #1', 150, 'L36', 'one')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 ST('L37', 'TD1 FOR THE SECOND JOB', [it('☑', 'MORE THAN ONE EMPLOYER OR PAYER AT THE SAME TIME', 'L37', 'box'), it('0', 'ENTER ZERO FOR THE CLAIM AMOUNT', 'L38', 'zero'), it('✗', 'NO BASIC PERSONAL AMOUNT A SECOND TIME', 'L39', 'second')], fxIn='glass', dimOthers=True, y=240),
 SPLIT('L40', 'AFTER FIX #1', 'LENA · 2026 · ONTARIO', [{'name': 'JOB B WITHHELD · TD1 = 0', 'value': D['wB0']}, {'name': 'TOTAL WITHHELD', 'value': D['withheld0']}, {'name': 'SPRING BILL', 'value': D['short0']}],
       [W('L40', 'goes'), W('L41', 'total'), W('L41', 'drops')], 'SAME PAY · SAME TAX · A MORE HONEST ESTIMATE', fxIn='slideL'),
 K('L43', [dc('FIX #2', 150, 'L43', 'two')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L44', 'EXTRA TAX PER PAYCHEQUE', [it('TD1', 'ASK FOR EXTRA TAX ON EVERY PAYCHEQUE', 'L44', 'extra'), it(f"≈{m(D['extra_pp0'])}", 'EXTRA PER PAYCHEQUE AT JOB B', 'L45', 'seventy-nine'), it('≈$0', 'SPRING BILL CLOSE TO ZERO', 'L46', 'zero'),
   it('OR', 'KEEP IT · SET IT ASIDE', 'L47', 'aside'), it(m(D['real']), 'TOTAL TAX: THE SAME EITHER WAY', 'L48', 'twelve'), it('4×', 'BIG BILLS EVERY YEAR → INSTALMENTS MAY BE ASKED', 'L50', 'instalments')], fxIn='slideR', dimOthers=True, y=150),
 K('L51', [dc('CPP AND EI', 140, 'L51', 'C')], kicker='06', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L52', 'EI · EACH EMPLOYER DEDUCTS', '2026 · 1.63% · MAX $1,123.07', [{'name': f"JOB A · {c2(.0163*D['jobA'])}", 'value': .0163*D['jobA']}, {'name': f"JOB B · {c2(.0163*D['jobB'])}", 'value': .0163*D['jobB']}, {'name': f"TOTAL PAID · {c2(D['ei_paid'])}", 'value': D['ei_paid']}, {'name': f"YEARLY MAX · {c2(D['ei_max'])}", 'value': D['ei_max']}, {'name': f"BACK ON HER RETURN · {c2(D['ei_refund'])}", 'value': D['ei_refund']}],
       [W('L53', 'Job'), W('L53', 'thirty'), W('L54', 'Together'), W('L55', 'most'), W('L56', 'extra')], 'SAME RULE FOR CPP: OVER THE MAX → BACK WHEN YOU FILE', fxIn='glass'),
 ST('L59', 'YOUR TWO JOBS CHECKLIST', [it('1', 'PERSONAL AMOUNTS ON ONE TD1 ONLY', 'L60', 'One'), it('2', 'SECOND TD1: TICK THE BOX · ENTER ZERO', 'L61', 'Two'), it('3', 'ASK FOR EXTRA TAX PER PAYCHEQUE', 'L62', 'Three'), it('4', 'CHECK CPP / EI OVERPAYMENTS WHEN YOU FILE', 'L63', 'Four'), it('5', 'NO EXTRA TAX? SET THE MONEY ASIDE', 'L64', 'Five')], fxIn='stagger', dimOthers=True, y=180),
 K('L65', [dc('WHAT DID WE LEARN?', 140, 'L65', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L66', 'TWO JOBS · 4 RULES', [it('1', 'EACH EMPLOYER: "YOUR ONLY JOB"', 'L66', 'One'), it('2', 'BASIC PERSONAL AMOUNT TWICE → A BILL', 'L67', 'Two'), it('3', 'NO SECOND-JOB TAX · BRACKETS ADD UP', 'L68', 'Three'), it('4', 'TWO FORMS → SPRING BILL ≈ $0', 'L69', 'Four')], fxIn='glass', dimOthers=True, y=200),
 K('L70', [mo([{'text': 'TWO JOBS · ONE RETURN', 't': 0}, {'text': 'THE COMPLETE CANADIAN TAX YEAR', **W('L70', 'complete')}], 96, 'L70', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L70', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Tax off every paycheque, still owes'), ('L9', '01 · How payroll sees you'), ('L15', "02 · Lena's year"), ('L24', '03 · Where the gap comes from'), ('L32', 'No second-job tax'),
  ('L36', '04 · Fix #1: the TD1'), ('L43', '05 · Fix #2: extra tax'), ('L51', '06 · CPP and EI'), ('L59', 'Checklist'), ('L65', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L9', 's5', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L15', 's2', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L24', 's3', cam((30, 0, 0.0), (-30, 0, 0.25))),
     ('L32', 's5', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L36', 's4', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L43', 's4', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L51', 's2', cam((50, 0, 0.12), (-50, 0, 0.12))),
     ('L59', 's6', cam((-30, 0, 0.0), (30, 0, 0.2))), ('L65', 's3', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
sfx.append({'name': 'tick', 'vol': 0.2, **h['rollAt']})
sfx.append({'name': 'whoosh', 'vol': 0.22, **h['gapAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"LENA · $45,000 + $30,000 · WITHHELD {m(D['withheld'])}", f"REAL TAX {m(D['real'])} · OWES {m(D['short'])}", 'TD1: MORE THAN ONE EMPLOYER → ENTER 0', f"FIX #1 → BILL {m(D['short0'])} · FIX #2 → ≈{m(D['extra_pp0'])} EXTRA PER PAY", f"EI OVERPAYMENT {c2(D['ei_refund'])} BACK", 'EXAMPLES · 2026 · ONTARIO']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA TD1 (more than one employer or payer); filing TD1 forms; CRA T4127 (2026); EI premium rates and maximums (2026) · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf24/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
