import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L8", "L16", "L24", "L38", "L46", "L53", "L57", "L62", "L67"}
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
PL = 'lf/lf22/plates/'
D = d
events = [
 scene('L1', P('column', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.74}, kicker='OWEN · $100,000 SALARY · 2026 · ONTARIO', title='WHAT DOES THE CRA ACTUALLY TAX?', name='OWEN',
   salary=D['salary'], cuts=[{'label': 'RRSP', 'value': D['rrsp']}, {'label': 'ENHANCED CPP', 'value': D['enh']}], taxable=D['taxable'], tax=D['tax'],
   other={'label': 'COWORKER', 'taxable': D['taxable_norrsp'], 'tax': D['tax_norrsp']}, cutAt=W('L2', 'uses'), taxAt=W('L3', 'income'), otherAt=W('L4', 'coworker'),
   diffAt=W('L5', 'Different'), diffText=f"+{m(D['rrsp_saving'])} TAX", qAt=W('L6', 'three'), question='WHICH INCOME DOES THE CRA TAX?', out=W('L7', None, -0.9)), off=-1.0),
 K('L7', [ln('2026 · ONTARIO · EMPLOYMENT INCOME', 50, 'L7'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L7', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L8', [dc('THREE INCOMES', 140, 'L8', 'three')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L9', 'ONE RETURN · THREE INCOMES', [it('15000', 'TOTAL INCOME · EVERYTHING YOU EARNED', 'L10', 'total'), it('23600', 'NET INCOME · AFTER SOME DEDUCTIONS', 'L11', 'net'), it('26000', 'TAXABLE INCOME · AFTER A FEW MORE', 'L12', 'taxable'),
   it('▤', 'THE BRACKETS APPLY TO TAXABLE INCOME', 'L13', 'brackets'), it('↓', 'EVERY STEP DOWN: MONEY THE BRACKETS NEVER SEE', 'L14', 'ladder')], fxIn='glass', dimOthers=True, y=180),
 K('L16', [dc("OWEN'S NUMBERS", 140, 'L16', 'numbers')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L17', "OWEN · FROM SALARY TO TAXABLE", '2026 · ONTARIO', [{'name': 'TOTAL INCOME · 15000', 'value': D['salary']}, {'name': 'RRSP DEDUCTION · 20800', 'value': D['rrsp']}, {'name': 'ENHANCED CPP + CPP2', 'value': D['enh']}, {'name': 'NET INCOME · 23600', 'value': D['net_income']}, {'name': 'TAXABLE INCOME · 26000', 'value': D['taxable']}],
       [W('L17', 'total'), W('L18', 'contributed'), W('L20', 'enhanced'), W('L21', 'net'), W('L22', 'taxable')], f"{m(D['off_total'])} NEVER REACHES THE BRACKETS", fxIn='glass', vs=40),
 K('L24', [dc('BRACKETS, THEN CREDITS', 120, 'L24', 'brackets')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 K('L25', [ln('FEDERAL TAX BEFORE CREDITS', 64, 'L25', 'Federal'), mo([{'text': f"≈{m(D['fed_gross'])}", 't': 0}], 130, 'L25', gold=True), ln('NOT HIS FEDERAL TAX YET', 50, 'L26', 'yet')], fxIn='glass', y=300),
 ST('L27', 'CREDITS CUT THE TAX · NOT THE INCOME', [it(m(D['bpa']), 'BASIC PERSONAL AMOUNT', 'L29', 'basic'), it(m(D['cpp_base']), 'BASE CPP', 'L29', 'base'), it(m(D['ei']), 'EI PREMIUMS', 'L29', 'E'), it(m(D['cea']), 'CANADA EMPLOYMENT AMOUNT', 'L29', 'employment'),
   it('× 14%', f"≈{m(D['fed_cred_amt'])} OF CREDIT AMOUNTS → −{m(D['fed_cred'])}", 'L30', 'fourteen')], fxIn='slideR', dimOthers=True, y=170),
 SPLIT('L32', "OWEN'S INCOME TAX", '2026 · ONTARIO · ROUNDED', [{'name': 'FEDERAL', 'value': D['fed']}, {'name': 'ONTARIO + SURTAX', 'value': D['prov']}, {'name': 'ONTARIO HEALTH PREMIUM', 'value': D['ohp']}, {'name': 'TOTAL', 'value': D['tax']}],
       [W('L32', 'federal'), W('L33', 'surtax'), W('L33', 'Health'), W('L34', 'Total')], f"THE BRACKETS SAW {m(D['taxable'])}, NOT $100,000", fxIn='glass'),
 K('L36', [ln(f"{D['avg']}% OF HIS SALARY", 90, 'L36', 'seventeen'), ln(f"{D['avg_ti']}% OF HIS TAXABLE INCOME", 64, 'L37', 'nineteen', gold=True), ln('HIS LAST DOLLARS: ≈30¢ EACH', 48, 'L37', 'thirty')], fxIn='glass', y=310),
 K('L38', [dc('THE COWORKER', 140, 'L38', 'coworker')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L39', 'SAME $100,000 · NO RRSP', '2026 · ONTARIO', [{'name': 'HER TAXABLE INCOME', 'value': D['taxable_norrsp']}, {'name': "OWEN'S TAXABLE INCOME", 'value': D['taxable']}, {'name': 'HER INCOME TAX', 'value': D['tax_norrsp']}, {'name': "OWEN'S INCOME TAX", 'value': D['tax']}, {'name': 'SHE PAYS MORE', 'value': D['rrsp_saving']}],
       [W('L40', 'taxable'), W('L41', 'Owen'), W('L42', 'tax'), W('L43', 'Owen'), W('L43', 'Two')], 'ONE LINE: 20800 · UNUSED RRSP ROOM CARRIES FORWARD', fxIn='slideL', vs=44),
 K('L46', [dc('THREE JOBS', 140, 'L46', 'matters')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L47', 'EACH NUMBER HAS A JOB', [it('15000', 'TOTAL · WHAT YOU EARNED', 'L48', 'Total'), it('23600', 'NET · MANY BENEFITS', 'L49', 'Net'), it('CCB', 'CANADA CHILD BENEFIT · FAMILY NET INCOME', 'L49', 'Child'), it('OAS', 'OAS CLAWBACK · NET INCOME', 'L49', 'clawback'),
   it('26000', 'TAXABLE · THE BRACKETS', 'L50', 'Taxable'), it('↓↑', 'LOWER NET INCOME → LOWER TAX + SOMETIMES A HIGHER BENEFIT', 'L52', 'raise')], fxIn='glass', dimOthers=True, y=150),
 SPLIT('L53', 'DEDUCTION VS CREDIT · SAME $8,000', 'OWEN · 2026 · ONTARIO', [{'name': '$8,000 RRSP DEDUCTION', 'value': D['rrsp_saving']}, {'name': '$8,000 OF CREDIT AMOUNTS (FED)', 'value': 1120}],
       [W('L55', 'saved'), W('L56', 'credit')], 'DEDUCTION: YOUR TOP RATE · CREDIT: THE LOWEST RATE (14% FEDERAL)', fxIn='glass'),
 ST('L57', 'WHERE YOUR NUMBER CHANGES', [it('−', 'DEDUCTIONS: RRSP · ENHANCED CPP · OTHERS IN CERTAIN SITUATIONS', 'L58', 'More'), it('−', 'NET → TAXABLE: NET CAPITAL LOSSES OF OTHER YEARS', 'L59', 'capital'), it('✓', 'CREDITS: CUT THE TAX AT THE END', 'L60', 'credits'), it('$', 'DEDUCTION = TOP RATE · CREDIT = LOWEST RATE', 'L61', 'Every')], fxIn='slideR', dimOthers=True, y=200),
 ST('L62', 'YOUR CHECKLIST', [it('1', 'FIND LINES 15000 · 23600 · 26000', 'L63', 'One'), it('2', 'SALARY − TAXABLE = YOUR DEDUCTIONS WORKING', 'L64', 'Two'), it('3', 'WHICH BENEFITS USE NET INCOME?', 'L65', 'Three'), it('4', 'BRACKETS? USE TAXABLE INCOME', 'L66', 'Four')], fxIn='stagger', dimOthers=True, y=200),
 K('L67', [dc('WHAT DID WE LEARN?', 140, 'L67', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L68', 'TAXABLE INCOME · 4 RULES', [it('1', 'THREE INCOMES: TOTAL · NET · TAXABLE', 'L68', 'One'), it('2', 'BRACKETS APPLY ONLY TO TAXABLE', 'L69', 'Two'), it('3', 'DEDUCTIONS SHRINK INCOME · CREDITS SHRINK TAX', 'L70', 'Three'), it('4', 'SAME SALARY ≠ SAME TAX', 'L71', 'Four')], fxIn='glass', dimOthers=True, y=200),
 K('L72', [mo([{'text': '$100K ≠ $100K TAXABLE', 't': 0}, {'text': 'SIDE HUSTLE · WHAT GETS TAXED', **W('L72', 'side')}], 100, 'L72', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L72', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Same salary, different tax'), ('L8', '01 · Three incomes'), ('L16', "02 · Owen's numbers"), ('L24', '03 · Brackets, then credits'), ('L38', '04 · The coworker'),
  ('L46', '05 · Three jobs'), ('L53', '06 · Deduction vs credit'), ('L57', 'Where it changes'), ('L62', 'Checklist'), ('L67', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L8', 's3', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L16', 's4', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L24', 's6', cam((30, 0, 0.0), (-30, 0, 0.25))),
     ('L38', 's2', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L46', 's5', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L53', 's1', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L57', 's3', cam((50, 0, 0.12), (-50, 0, 0.12))),
     ('L62', 's6', cam((-30, 0, 0.0), (30, 0, 0.2))), ('L67', 's5', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
sfx.append({'name': 'whoosh', 'vol': 0.2, **h['cutAt']})
sfx.append({'name': 'tick', 'vol': 0.2, **h['taxAt']})
sfx.append({'name': 'tick', 'vol': 0.2, **h['otherAt']})
sfx.append({'name': 'whoosh', 'vol': 0.22, **h['diffAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"OWEN · $100,000 SALARY → TAXABLE {m(D['taxable'])}", 'LINE 15000 TOTAL · 23600 NET · 26000 TAXABLE', f"INCOME TAX ≈{m(D['tax'])} · {D['avg']}% OF SALARY", f"SAME SALARY, NO RRSP → +{m(D['rrsp_saving'])}", 'CREDITS: 14% FEDERAL', 'EXAMPLES · 2026 · ONTARIO']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA CVITP How income tax is calculated (lines 15000, 23600, 26000); line 26000; line 20800; CRA T4127 (2026) · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf22/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
