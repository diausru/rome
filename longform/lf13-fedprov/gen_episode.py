import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L7", "L15", "L26", "L36", "L43", "L50", "L55"}
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
PL = 'lf/lf13/plates/'
D = d; O = D['ON75']; LD = D['ladder']; R1 = D['rrsp1000']
events = [
 scene('L1', P('fedprov', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.62}, kicker='ONE SALARY · ONE RETURN · 2026', title='ONE TAX BILL', finishTitle='TWO TAXES. TWO GOVERNMENTS.',
   total=O['tax'], fed=O['fed'], provs=[{'code': 'ONTARIO', 'amount': O['prov']}, {'code': 'ALBERTA', 'amount': D['AB75']['prov']}, {'code': 'BRITISH COLUMBIA', 'amount': D['BC75']['prov']}],
   splitAt=W('L2', 'two'), provAt=[W('L5', 'Calgary'), W('L5', 'Vancouver')], lockAt=W('L5', 'single'), qAt=W('L5', 'which'), question='WHICH PART MOVES WITH YOU?', out=W('L6', None, -0.9)), off=-1.0),
 K('L6', [ln('2026 · SINGLE · EMPLOYMENT INCOME ONLY', 46, 'L6'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L6', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L7', [dc('WHO COLLECTS YOUR TAX', 120, 'L7', 'collects')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L8', 'TWO LEVELS OF GOVERNMENT', [it('FED', 'THE FEDERAL GOVERNMENT', 'L8', 'federal'), it('PROV', 'YOUR PROVINCE OR TERRITORY', 'L8', 'province'), it('=', 'EACH SETS ITS OWN BRACKETS · RATES · CREDITS', 'L9', 'brackets')], fxIn='glass', dimOthers=True, y=260),
 ST('L10', 'ONE RETURN · TWO TAXES', [it('CRA', 'COLLECTS BOTH · OUTSIDE QUEBEC', 'L10', 'collects'), it('T1', 'FEDERAL TAX: ON THE RETURN ITSELF', 'L11', 'itself'), it('428', 'PROVINCIAL TAX: FORM 428 (ONTARIO: ON428)', 'L11', 'separate'), it('TCA', 'TAX COLLECTION AGREEMENTS', 'L12', 'agreements')], fxIn='slideR', dimOthers=True, y=200),
 K('L13', [ln('QUEBEC = TWO RETURNS', 90, 'L13', 'exception', gold=True), ln('FEDERAL RETURN + REVENU QUÉBEC RETURN', 52, 'L13', 'second')], kicker='THE EXCEPTION', fxIn='glass', y=330),
 ST('L14', 'YOUR PAYCHEQUE', [it('1', 'FEDERAL + PROVINCIAL TAX WITHHELD TOGETHER', 'L14', 'together'), it('2', 'TABLES OF THE PROVINCE WHERE YOU WORK', 'L14', 'work'), it('TD1', 'FEDERAL TD1 · SOMETIMES A PROVINCIAL ONE', 'L14', 'sometimes')], fxIn='glass', dimOthers=True, y=260),
 K('L15', [dc('THE SPLIT', 140, 'L15', 'split')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 ST('L16', 'ONE STARTING POINT', [it('$', 'TAXABLE INCOME', 'L16', 'taxable'), it('−', 'SALARY MINUS PART OF CPP (ENHANCED)', 'L16', 'minus'), it('×2', 'EACH GOVERNMENT: ITS OWN BRACKETS', 'L17', 'brackets')], fxIn='glass', dimOthers=True, y=260),
 ST('L18', 'SAME INCOME · TWO RATE SCHEDULES', [it('FED', '14% → 20.5% ABOVE $58,523', 'L18', 'fourteen'), it('ON', '5.05% → 9.15% ABOVE $53,891', 'L19', 'five'), it('CR', 'EACH SIDE: OWN CREDITS AT ITS LOWEST RATE', 'L20', 'credits')], fxIn='slideL', dimOthers=True, y=260),
 SPLIT('L21', 'PRIYA · $75,000 · ONTARIO · INCOME TAX', '2026 · SINGLE', [{'name': 'FEDERAL', 'value': O['fed']}, {'name': 'ONTARIO', 'value': O['prov']}, {'name': 'TOTAL INCOME TAX', 'value': O['tax']}],
       [W('L21', 'Federal'), W('L21', 'Ontario'), W('L22', 'thirds')], '≈ 2/3 FEDERAL · 1/3 ONTARIO', fxIn='glass'),
 K('L23', [ln('PER MONTH', 60, 'L23', 'month'), dc(f"{m(D['per_month_fed'])} FEDERAL · {m(D['per_month_prov'])} ONTARIO", 96, 'L23', 'six')], kicker='PRIYA', fxIn='glass', y=330),
 SPLIT('L24', 'INSIDE THE ONTARIO PART', '$75,000 · 2026', [{'name': 'ONTARIO TAX', 'value': O['onb']}, {'name': 'ONTARIO HEALTH PREMIUM', 'value': O['ohp']}, {'name': 'ONTARIO TOTAL', 'value': O['prov']}],
       [W('L24', 'inside'), W('L24', 'Premium'), W('L24', 'four')], 'CHARGED THROUGH THE RETURN · NOT A SEPARATE BILL', fxIn='slideR'),
 K('L26', [dc('THE SECOND SURPRISE', 120, 'L26', 'surprise')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 K('L27', [ln('SAME JOB · SAME $75,000', 80, 'L27', 'Same'), ln('YOUR PROVINCE ON DECEMBER 31 DECIDES', 56, 'L28', 'December', gold=True)], kicker='WHAT IF PRIYA MOVES?', fxIn='glass', y=330),
 SPLIT('L29', 'PROVINCIAL TAX · $75,000', '2026 · SINGLE', [{'name': 'ONTARIO', 'value': O['prov']}, {'name': 'ALBERTA', 'value': D['AB75']['prov']}, {'name': 'BRITISH COLUMBIA', 'value': D['BC75']['prov']}],
       [W('L29'), W('L29', 'Alberta'), W('L29', 'British')], 'THIS LINE MOVES', fxIn='slideL'),
 SPLIT('L30', 'FEDERAL TAX · $75,000', '2026 · SINGLE', [{'name': 'ONTARIO', 'value': O['fed']}, {'name': 'ALBERTA', 'value': D['AB75']['fed']}, {'name': 'BRITISH COLUMBIA', 'value': D['BC75']['fed']}],
       [W('L30', 'Ontario'), W('L30', 'Alberta'), W('L30', 'British')], 'EXACTLY THE SAME', fxIn='slideR'),
 ST('L31', 'THE ANSWER', [it('=', 'SAME FEDERAL BRACKETS + CREDITS · OUTSIDE QUEBEC', 'L31', 'Same'), it('↔', 'ONLY THE PROVINCIAL LINE MOVES', 'L32', 'provincial'), it('<$800', 'GAP ON · AB · BC ON A ≈$12,000 BILL', 'L33', 'gap')], fxIn='glass', dimOthers=True, y=260),
 K('L34', [ln('THE QUEBEC ABATEMENT', 80, 'L34', 'abatement', gold=True), ln('−16.5% OF BASIC FEDERAL TAX', 64, 'L34', 'sixteen'), ln('COMPENSATION FOR OPTING OUT OF FEDERAL PROGRAMS', 44, 'L35', 'compensation')], kicker='QUEBEC', fxIn='glass', y=300),
 K('L36', [dc("THE SPLIT ISN'T FIXED", 120, 'L36', 'fixed')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 ST('L37', 'FEDERAL vs ONTARIO · BY INCOME', [it('$40K', f"FED {m(LD['40000']['fed'])} · ON {m(LD['40000']['prov'])} · {LD['40000']['fedpct']}% FEDERAL", 'L37', 'forty'),
   it('$150K', f"FED {m(LD['150000']['fed'])} · ON {m(LD['150000']['prov'])} · {LD['150000']['fedpct']}% FEDERAL", 'L38', 'one'),
   it('$250K', f"FED {m(LD['250000']['fed'])} · ON {m(LD['250000']['prov'])} · {LD['250000']['fedpct']}% FEDERAL", 'L39', 'two'),
   it('↑', "FEDERAL ≈ 60–65% · ONTARIO'S SHARE CLIMBS AT THE TOP", 'L40', 'climbs')], fxIn='stagger', dimOthers=True, y=200),
 SPLIT('L41', 'THE ONTARIO PART · $150,000', '2026 · SINGLE', [{'name': 'ONTARIO TAX', 'value': LD['150000']['onb']}, {'name': 'ONTARIO SURTAX', 'value': LD['150000']['sur']}, {'name': 'HEALTH PREMIUM', 'value': LD['150000']['ohp']}, {'name': 'ONTARIO TOTAL', 'value': LD['150000']['prov']}],
       [W('L41', 'reason'), W('L41', 'adds'), W('L41', 'eleven'), W('L42', 'bigger')], 'SURTAX = EXTRA TAX ON THE ONTARIO TAX', fxIn='glass'),
 K('L43', [dc('WHAT YOU CAN DO', 120, 'L43', 'actually')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L44', 'DEDUCTION vs CREDIT', [it('↓↓', 'A DEDUCTION LOWERS BOTH TAXES', 'L44', 'deduction'), it('RRSP', f"$1,000 → FED −{m(R1['fed'])} · ON −{m(R1['prov'])} ≈ {m(R1['total'])}", 'L45', 'drops'),
   it('↓', 'A CREDIT LOWERS ONLY ITS OWN SIDE', 'L47', 'Credits'), it('428', 'CHECK THE PROVINCIAL FORM FOR CREDITS', 'L48', 'provincial')], fxIn='glass', dimOthers=True, y=200),
 K('L49', [ln('MOVED THIS YEAR?', 80, 'L49', 'move', gold=True), ln('PAYROLL MAY USE YOUR OLD PROVINCE', 54, 'L49', 'payroll'), ln('SETTLED WHEN YOU FILE', 54, 'L49', 'settled')], kicker='DECEMBER 31 RULE', fxIn='glass', y=310),
 ST('L50', 'YOUR CHECKLIST', [it('1', 'FIND NET FEDERAL TAX + PROVINCIAL TAX', 'L51', 'find'), it('2', 'RIGHT PROVINCE ON PAYROLL · AFTER A MOVE', 'L52', 'right'),
   it('3', 'PROVINCIAL FORM: CHECK THE CREDITS', 'L53', 'check'), it('4', 'QUEBEC: TWO RETURNS + ABATEMENT', 'L54', 'Quebec')], fxIn='stagger', dimOthers=True, y=200),
 K('L55', [dc('WHAT DID WE LEARN?', 140, 'L55', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L56', 'FEDERAL vs PROVINCIAL · 4 RULES', [it('1', 'TWO TAXES · ONE RETURN · CRA (EXCEPT QC)', 'L56', 'two'), it('2', 'PRIYA: ≈2/3 FEDERAL · ≈1/3 ONTARIO', 'L57', 'thirds'),
   it('3', 'MOVE → ONLY THE PROVINCIAL PART CHANGES', 'L58', 'move'), it('4', 'DEDUCTION CUTS BOTH · CREDIT CUTS ITS SIDE', 'L59', 'deduction')], fxIn='glass', dimOthers=True, y=200),
 K('L60', [mo([{'text': 'FEDERAL vs PROVINCIAL', 't': 0}, {'text': 'CREDIT vs DEDUCTION', **W('L60', 'credits')}], 100, 'L60', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L60', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'One tax bill, two governments'), ('L7', '01 · Who collects your tax'), ('L15', '02 · The split'), ('L26', '03 · What if you move?'),
  ('L36', "04 · The split isn't fixed"), ('L43', '05 · What you can do'), ('L50', '06 · Checklist'), ('L55', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L7', 's2', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L15', 's1', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L21', 's2', cam((0, 30, 0.0), (0, -30, 0.25))),
     ('L26', 's4', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L29', 's5', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L36', 's3', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L43', 's6', cam((-30, 0, 0.0), (30, 0, 0.2))),
     ('L50', 's6', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L55', 's3', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
sfx.append({'name': 'whoosh', 'vol': 0.2, **h['splitAt']})
for r in h['provAt']: sfx.append({'name': 'tick', 'vol': 0.2, **r})
sfx.append({'name': 'tick', 'vol': 0.2, **h['lockAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"$75,000 · FEDERAL {m(O['fed'])} · ONTARIO {m(O['prov'])}", f"PROVINCIAL @ $75K: ON {m(O['prov'])} · AB {m(D['AB75']['prov'])} · BC {m(D['BC75']['prov'])}", f"FEDERAL @ $75K: {m(O['fed'])} IN ALL THREE", 'CRA COLLECTS BOTH · EXCEPT QUEBEC', '2026 RATES · EXAMPLE']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA T4127 / T4032 (2026), Form 428, Dept. of Finance (Quebec abatement) · Example calculation, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf13/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
