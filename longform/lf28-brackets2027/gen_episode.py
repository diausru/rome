import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L6", "L10", "L19", "L30", "L37", "L46", "L57", "L63", "L69"}
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
PL = 'lf/lf28/plates/'
D = d; Cm = D['cmp']; Pv = D['prov']
events = [
 scene('L1', P('shift', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.78}, kicker='JANUARY 1, 2027 · FEDERAL INDEXATION +2.6%', title='YOUR TAX BRACKETS MOVE',
   b26=D['fed26'][:2], b27=D['fed27'][:2], rates=['14%', '20.5%', '26%'], max=140000, salary=75000, shiftAt=W('L1', 'moves'), t26=Cm['75000']['t26'], t27=Cm['75000']['t27'],
   saveAt=W('L2', 'down'), frozen=['BC', 'MB', 'PE'], frozenAt=W('L3', 'three'), frozenLabel='PROVINCIAL BASIC AMOUNT FROZEN:',
   qAt=W('L4', 'wins'), question='WHO WINS IN 2027?', out=W('L5', None, -0.9)), off=-1.0),
 K('L5', [ln("SOURCES: CRA PAYROLL FORMULAS (JAN 2027) · CANADA.CA", 44, 'L5'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L5', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L6', [dc('WHY BRACKETS MOVE', 130, 'L6', 'move')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 K('L7', [ln('INDEXED TO INFLATION · EVERY YEAR', 60, 'L7'), mo([{'text': '2026', 't': 0}, {'text': '2027 · +2.6%', **W('L8', 'two')}], 150, 'L8', gold=True), ln('EVERY BRACKET LINE + THE BASIC PERSONAL AMOUNT', 48, 'L9', 'basic')], fxIn='glass', y=270),
 K('L10', [dc('THE NEW FEDERAL BRACKETS', 110, 'L10', 'brackets')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 ST('L11', 'FEDERAL BRACKETS · 2027', [it('14%', 'UP TO $60,044', 'L11', 'Fourteen'), it('20.5%', '$60,044 – $120,088', 'L12', 'Twenty'), it('26%', '$120,088 – $186,157', 'L13', 'Twenty'),
   it('29%', '$186,157 – $265,203', 'L14', 'Twenty'), it('33%', 'ABOVE $265,203', 'L15', 'thirty'), it('=', 'SAME RATES · ONLY THE LINES MOVE', 'L16', 'lines')], fxIn='glass', dimOthers=True, y=150),
 K('L17', [ln('BASIC PERSONAL AMOUNT', 64, 'L17'), mo([{'text': m(D['bpa26']), 't': 0}, {'text': m(D['bpa27']), **W('L17', 'eight')}], 150, 'L17', gold=True), ln(f"+{m(D['bpa_gain'])} TAX-FREE · WORTH ≈{m(D['bpa_value'])}", 52, 'L18', 'Worth')], fxIn='glass', y=280),
 K('L19', [dc('WHAT IT MEANS FOR YOU', 120, 'L19', 'mean')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L20', 'SAME SALARY · FEDERAL TAX SAVED IN 2027', 'FEDERAL ONLY · BEFORE OTHER CREDITS', [{'name': '$50,000', 'value': Cm['50000']['save']}, {'name': '$75,000', 'value': Cm['75000']['save']}, {'name': '$100,000', 'value': Cm['100000']['save']}, {'name': '$150,000', 'value': Cm['150000']['save']}],
   [W('L21', 'fifty'), W('L22', 'seventy'), W('L23', 'hundred'), W('L24', 'fifty')], '2026 vs 2027 TABLES · CRA T4127', fxIn='glass', labelW=520),
 ST('L25', 'THE REAL POINT: A 2.6% RAISE', [it('$', f"$75,000 → {m(D['keep']['g'])}", 'L26', 'seventy'), it('TAX', f"{m(D['keep']['t26_at75'])} → {m(D['keep']['t27'])} · RISES IN STEP", 'L27', 'nine'),
   it('=', 'INDEXING STOPS INFLATION PUSHING YOU UP A BRACKET', 'L28', 'stops'), it('!', 'BRACKET CREEP · NOT EVERY PROVINCE PROTECTS YOU', 'L29', 'creep')], fxIn='slideR', dimOthers=True, y=220),
 K('L30', [dc('THE PROVINCES', 140, 'L30', 'interesting')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 ST('L31', 'PROVINCIAL INDEXING · 2027', [it('ON', f"+2.1% · FIRST LINE $53,891 → $55,023 · BASIC +$272", 'L32', 'Ontario'), it('AB', '+2% CAP · FIRST LINE $61,200 → $62,424', 'L33', 'Alberta'),
   it('SK', f"+2.6% + $500 · BASIC {m(Pv['SK']['b26'])} → {m(Pv['SK']['b27'])}", 'L34', 'Saskatchewan'), it('NS', f"+3.5% · BASIC {m(Pv['NS']['b27'])}", 'L35', 'Nova'), it('NB', f"+2.6% · BASIC {m(Pv['NB']['b27'])}", 'L36', 'Brunswick')], fxIn='stagger', dimOthers=True, y=180),
 K('L37', [dc('THE THREE THAT STAND STILL', 110, 'L37', 'still')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L38', 'FROZEN IN 2027', [it('BC', 'INDEXING PAUSED · 2027–2030 AT 2026 LEVELS', 'L38', 'paused'), it('MB', 'NOT INDEXED · LINES STAY $47,000 / $100,000', 'L39', 'Manitoba'), it('PE', 'BASIC AMOUNT STAYS $15,000', 'L40', 'Prince')], fxIn='glass', dimOthers=True, y=240),
 SPLIT('L41', 'WHAT THE BIGGER BASIC AMOUNT IS WORTH · 2027', 'INCREASE × LOWEST PROVINCIAL RATE', [{'name': 'SASKATCHEWAN', 'value': Pv['SK']['value']}, {'name': 'NOVA SCOTIA', 'value': Pv['NS']['value']}, {'name': 'ALBERTA', 'value': Pv['AB']['value']},
   {'name': 'NEW BRUNSWICK', 'value': Pv['NB']['value']}, {'name': 'ONTARIO', 'value': Pv['ON']['value']}, {'name': 'BC · MB · PE', 'value': 0}],
   [W('L42', 'Saskatchewan'), W('L43', 'Nova'), W('L43', 'Alberta'), W('L43', 'Brunswick'), W('L43', 'Ontario'), W('L44', 'zero')], 'BC + MB: FROZEN BRACKETS → BRACKET CREEP ON A RAISE', fxIn='slideR', labelW=520, y=200),
 K('L46', [dc('FAMILIES', 150, 'L46', 'families')], kicker='06', fxIn='focus', fxOut='wipe', y=330),
 ST('L47', 'CANADA CHILD BENEFIT · JULY 2026 – JUNE 2027', [it(m(D['ccb_u6']), 'PER CHILD UNDER 6 · PER YEAR', 'L48', 'eight'), it(m(D['ccb_617']), 'PER CHILD 6 TO 17 · PER YEAR', 'L49', 'six'),
   it(m(D['ccb_lo']), 'FULL AMOUNT BELOW THIS FAMILY NET INCOME', 'L50', 'thirty'), it('2025', 'BASED ON YOUR 2025 RETURN', 'L51', 'based'), it('JUL 27', 'NEXT YEAR: BASED ON YOUR 2026 RETURN · FILE ON TIME', 'L52', 'key'),
   it(m(D['cdb']), 'CHILD DISABILITY BENEFIT · UP TO, PER YEAR', 'L53', 'three')], fxIn='glass', dimOthers=True, y=140),
 ST('L54', 'GST CREDIT → CANADA GROCERIES AND ESSENTIALS BENEFIT', [it(m(D['cgeb_single']), 'SINGLE · UP TO', 'L55', 'six'), it(m(D['cgeb_couple']), 'COUPLE · UP TO', 'L55', 'eight'), it(m(D['cgeb_child']), 'PER CHILD UNDER 19 · UP TO', 'L55', 'two'),
   it('+25%', 'TEMPORARY INCREASE · FIVE YEARS', 'L56', 'twenty')], fxIn='slideL', dimOthers=True, y=220),
 K('L57', [dc('YOUR PAYCHEQUE', 140, 'L57', 'paycheque')], kicker='07', fxIn='focus', fxOut='wipe', y=330),
 ST('L58', 'JANUARY 2027 · CPP · EI · SAVINGS', [it('CPP', f"FIRST CEILING {m(D['ympe27'])} · SECOND {m(D['yampe27'])}", 'L58', 'ceiling'), it('EI', f"$1.64 PER $100 · UP TO {m(D['mie27'])} · MAX $1,161.12", 'L59', 'sixty'),
   it('JAN', 'ABOVE THE CEILINGS? JANUARY PAY CAN BE SMALLER THAN DECEMBER', 'L60', 'smaller'), it('RRSP', f"2027 DOLLAR LIMIT {m(D['rrsp27'])}", 'L61', 'limit'), it('TFSA', '2027 LIMIT NOT YET ON CANADA.CA WHEN CHECKED', 'L62', 'yet')], fxIn='glass', dimOthers=True, y=170),
 ST('L63', 'YOUR 2027 CHECKLIST', [it('1', 'JANUARY PAYCHEQUE · CPP + EI START OVER', 'L64', 'One'), it('2', 'BC · MB · PE: LESS PROVINCIAL INFLATION RELIEF', 'L65', 'Two'), it('3', 'FAMILIES: FILE 2026 ON TIME → CCB FROM JULY 2027', 'L66', 'Three'),
   it('4', 'NEW GROCERIES BENEFIT · BASED ON YOUR RETURN', 'L67', 'Four'), it('5', 'NEW RRSP LIMIT · TFSA WHEN ANNOUNCED', 'L68', 'Five')], fxIn='stagger', dimOthers=True, y=180),
 K('L69', [dc('WHAT DID WE LEARN?', 140, 'L69', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L70', '2027 · 4 RULES', [it('1', 'FEDERAL LINES + BASIC AMOUNT +2.6% · SAME RATES', 'L70', 'One'), it('2', 'SAME SALARY → A LITTLE LESS FEDERAL TAX', 'L71', 'Two'), it('3', 'PROVINCES DIFFER · SK +$500 · BC/MB/PE FROZEN', 'L72', 'Three'),
   it('4', 'FAMILIES: CCB + GROCERIES BENEFIT START WITH FILING', 'L73', 'Four')], fxIn='glass', dimOthers=True, y=200),
 K('L74', [mo([{'text': 'TAX BRACKETS 2027', 't': 0}, {'text': 'BENEFITS AGING PARENTS MISS', **W('L74', 'benefits')}], 96, 'L74', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L74', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Your tax brackets move in 2027'), ('L6', '01 · Why brackets move'), ('L10', '02 · The new federal brackets'), ('L19', '03 · What it means for you'), ('L30', '04 · The provinces'),
  ('L37', '05 · The three that stand still'), ('L46', '06 · Families: CCB and the new groceries benefit'), ('L57', '07 · Your paycheque and savings'), ('L63', 'Checklist'), ('L69', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L6', 's1', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L10', 's2', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L19', 's5', cam((30, 0, 0.0), (-30, 0, 0.25))),
     ('L30', 's4', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L37', 's4', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L46', 's3', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L54', 's6', cam((50, 0, 0.12), (-50, 0, 0.12))),
     ('L57', 's5', cam((-30, 0, 0.0), (30, 0, 0.2))), ('L63', 's3', cam((-40, 10, 0.0), (40, -10, 0.15))), ('L69', 's2', cam((40, 0, 0.0), (-40, 10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
sfx.append({'name': 'whoosh', 'vol': 0.22, **h['shiftAt']})
sfx.append({'name': 'chime', 'vol': 0.18, **h['saveAt']})
sfx.append({'name': 'thump', 'vol': 0.22, **h['frozenAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = ['FEDERAL INDEXATION 2027: +2.6%', 'FEDERAL BRACKETS 2027: $60,044 · $120,088 · $186,157 · $265,203', f"BASIC PERSONAL AMOUNT {m(D['bpa26'])} → {m(D['bpa27'])}", 'BC · MB · PE: PROVINCIAL BASIC AMOUNT FROZEN', f"CCB UNDER 6: {m(D['ccb_u6'])}/YR · 6–17: {m(D['ccb_617'])}/YR", f"RRSP 2027 LIMIT {m(D['rrsp27'])}"]
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA T4127 Payroll Deductions Formulas 124th ed. (Jan 1 2027) and 122nd ed. (Jan 2026); CCB how much; Canada Groceries and Essentials Benefit; ESDC EI 2027 rate; CRA CPP rates; MP/RRSP limits · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf28/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
