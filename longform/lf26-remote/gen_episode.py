import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L7", "L11", "L15", "L24", "L32", "L42", "L49", "L63", "L70", "L74", "L80"}
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
PL = 'lf/lf26/plates/'
D = d
O = D['others']
events = [
 scene('L1', P('route', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.74}, kicker='SAM · $85,000 · REMOTE · THE 2026 TAX YEAR', title='SAME JOB. TWO PROVINCES.',
   a={'city': 'CALGARY', 'role': 'PAYROLL · ALBERTA', 'label': 'TAX TAKEN · AB RATES', 'value': D['ab_tax'], 'prov': 'WITHHELD ALL YEAR'},
   b={'city': 'HALIFAX', 'role': 'HE LIVES HERE · NOVA SCOTIA', 'label': 'REAL TAX · NS RATES', 'value': D['ns_tax'], 'prov': 'ON HIS RETURN'},
   arcAt=W('L1', 'company'), cardsAt=W('L2', 'paycheque'), owe=D['gap'], oweAt=W('L2', 'owed'),
   qAt=W('L4', 'box'), question='WHICH BOX? WHICH FORM?', out=W('L6', None, -0.9)), off=-1.0),
 K('L6', [ln('THE 2026 TAX YEAR · $85,000 SALARY · SINGLE · NO OTHER INCOME', 44, 'L6'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L6', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L7', [dc('TWO PROVINCES', 140, 'L7', 'provinces')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L8', "SAM'S TWO PROVINCES", [it('NS', 'WHERE HE LIVES · NOVA SCOTIA', 'L8', 'Nova'), it('AB', 'PROVINCE OF EMPLOYMENT · WHAT PAYROLL USES', 'L9', 'employment'), it('T4', 'BOX 10 · PROVINCE OF EMPLOYMENT', 'L9', 'box'), it('≠', 'THEY CAN BE DIFFERENT', 'L10', 'different')], fxIn='glass', dimOthers=True, y=220),
 K('L11', [dc('WHO DECIDES YOUR TAX', 120, 'L11', 'decides')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 K('L12', [ln('PROVINCIAL TAX =', 70, 'L12', 'provincial'), dc('WHERE YOU LIVE ON DEC 31', 100, 'L12', 'December'), ln('NOT THE EMPLOYER · NOT THE HEAD OFFICE', 48, 'L13', 'employer', gold=True), ln('SAM: NOVA SCOTIA → ALL OF 2026 AT NS RATES', 48, 'L14', 'whole')], fxIn='glass', y=260),
 K('L15', [dc('THE PAYROLL PROVINCE', 120, 'L15', 'payroll')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 ST('L16', 'PROVINCE OF EMPLOYMENT · CRA RULES', [it('1', 'YOU REPORT TO AN OFFICE IN PERSON → THAT PROVINCE', 'L17', 'report'), it('2', "NO OFFICE → GENERALLY WHERE THE BUSINESS IS AND PAYS YOU", 'L18', 'generally'),
   it('3', "REMOTE AGREEMENT · YOU'D NORMALLY GO TO AN OFFICE → THAT OFFICE", 'L19', 'exception'), it('SAM', 'HIRED REMOTE · NO OFFICE → ALBERTA', 'L20', 'Alberta'), it('⌂', 'YOUR HOME OFFICE ≠ AN EMPLOYER ESTABLISHMENT', 'L21', 'establishment')], fxIn='slideR', dimOthers=True, y=170),
 K('L22', [ln("SAM'S PROBLEM", 90, 'L22', 'problem'), ln('PAYROLL: ALBERTA RATES', 60, 'L23', 'Alberta'), ln('HIS RETURN: NOVA SCOTIA RATES', 60, 'L23', 'Nova', gold=True)], fxIn='glass', y=300),
 K('L24', [dc('THE REAL NUMBERS', 140, 'L24', 'numbers')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L25', 'INCOME TAX ON $85,000 · 2026', 'FEDERAL TAX IS THE SAME · ONLY THE PROVINCIAL PART CHANGES', [{'name': f"PROVINCIAL · AB RATES · {m(D['ab_prov'])}", 'value': D['ab_prov']}, {'name': f"PROVINCIAL · NS RATES · {m(D['ns_prov'])}", 'value': D['ns_prov']},
   {'name': f"WITHHELD · AB · {m(D['ab_tax'])}", 'value': D['ab_tax']}, {'name': f"REAL TAX · NS · {m(D['ns_tax'])}", 'value': D['ns_tax']}],
   [W('L26', 'Alberta'), W('L27', 'Nova'), W('L28', 'payroll'), W('L29', 'real')], f"GAP {m(D['gap'])} · DUE WITH HIS RETURN · ≈{m(D['gap_pp'])} PER PAYCHEQUE", fxIn='glass', labelW=620, y=240),
 K('L32', [dc('EITHER WAY', 140, 'L32', 'wrong')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L33', 'ALBERTA PAYROLL · $85,000 · LIVES IN…', [it('BC', f"GETS BACK ≈{m(-O['BC'])}", 'L34', 'British'), it('ON', f"OWES ≈{m(O['ON'])}", 'L35', 'Ontario'), it('MB', f"OWES ≈{m(O['MB'])}", 'L36', 'Manitoba'),
   it('PE', f"OWES ≈{m(O['PE'])}", 'L37', 'Prince'), it('NS', f"OWES ≈{m(O['NS'])}", 'L38', 'Nova'), it('?', 'WHICH TWO PROVINCES ARE ON YOUR PAPERWORK?', 'L39', 'paperwork')], fxIn='stagger', dimOthers=True, y=150),
 K('L40', [ln('BUT REMOTE WORK', 70, 'L40', 'remote'), ln('ALSO GIVES YOU SOMETHING', 90, 'L40', 'gives', gold=True), ln('IF YOU QUALIFY', 56, 'L41', 'qualify')], fxIn='glass', y=300),
 K('L42', [dc('THE HOME OFFICE', 140, 'L42', 'home')], kicker='06', fxIn='focus', fxOut='wipe', y=330),
 ST('L43', 'WORK SPACE IN THE HOME · DETAILED METHOD', [it('2023+', 'FLAT RATE METHOD GONE · DETAILED METHOD ONLY', 'L43', 'detailed'), it('1', 'REQUIRED TO WORK FROM HOME > 50% · 4 WEEKS IN A ROW', 'L45', 'half'),
   it('2', 'EMPLOYER SIGNS FORM T2200', 'L46', 'signs'), it('3', 'COSTS NOT PAID BACK BY YOUR EMPLOYER', 'L47', 'back'), it('✓', 'SAM CHECKS ALL THREE', 'L48', 'checks')], fxIn='glass', dimOthers=True, y=180),
 K('L48', [dc("SAM'S CLAIM", 140, 'L48', 'claim')], kicker='07', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L49', "SAM'S HOME COSTS · 2026", 'HALIFAX · RENTS', [{'name': f"RENT · $1,800 × 12 · {m(D['rent'])}", 'value': D['rent']}, {'name': f"ELECTRICITY + HEAT · {m(D['util'])}", 'value': D['util']}, {'name': f"INTERNET · MONTHLY FEES · {m(D['internet'])}", 'value': D['internet']}],
   [W('L49', 'year'), W('L50', 'Electricity'), W('L50', 'internet')], f"TOTAL {m(D['expenses'])}", fxIn='slideR', labelW=640),
 ST('L52', 'WHAT SHARE IS WORK?', [it('10%', "SEPARATE ROOM · 10% OF THE FLOOR SPACE · WORK ONLY", 'L53', 'separate'), it('⌂', "A DESIGNATED ROOM: DON'T COUNT HOURS · USE FLOOR SPACE", 'L54', 'hours'),
   it(m(D['claim']), f"10% × {m(D['expenses'])} = THE DEDUCTION", 'L55', 'deduction'), it('−' + m(D['save']), 'LESS TAX · AT HIS NOVA SCOTIA RATE', 'L56', 'cuts')], fxIn='glass', dimOthers=True, y=200),
 SPLIT('L57', 'SEPARATE ROOM vs KITCHEN TABLE', f"KITCHEN TABLE: 12% OF THE HOME × 40 ÷ 168 HOURS ≈ {D['shared_pct']}%", [{'name': f"ROOM · DEDUCTION {m(D['claim'])}", 'value': D['claim']}, {'name': f"KITCHEN · DEDUCTION {m(D['shared_claim'])}", 'value': D['shared_claim']},
   {'name': f"ROOM · TAX SAVED {m(D['save'])}", 'value': D['save']}, {'name': f"KITCHEN · TAX SAVED {m(D['shared_save'])}", 'value': D['shared_save']}],
   [W('L57', 'kitchen'), W('L60', 'deduction'), W('L60', 'tax'), W('L61', 'separate')], 'SALARIED: NO MORTGAGE INTEREST · PROPERTY TAX · HOME INSURANCE · FURNITURE', fxIn='slideL', labelW=600, y=240),
 K('L63', [dc('THE BILL', 150, 'L63', 'leave')], kicker='08', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L64', "SAM'S BALANCE OWING", '2026 · NOVA SCOTIA', [{'name': f"GAP · {m(D['gap'])}", 'value': D['gap']}, {'name': f"HOME OFFICE · −{m(D['save'])}", 'value': D['save']}, {'name': f"STILL OWES · {m(D['net_owing'])}", 'value': D['net_owing']}],
   [W('L64', 'owed'), W('L64', 'cuts'), W('L65', 'still')], 'NET TAX OWING > $3,000 · THIS YEAR + ONE OF THE TWO BEFORE → INSTALMENTS', fxIn='glass', labelW=600),
 ST('L66', 'WHY $3,000 MATTERS', [it('$3K', 'NET TAX OWING · THIS YEAR AND ONE OF THE TWO BEFORE', 'L67', 'three'), it('4×', 'INSTALMENTS · MAR 15 · JUN 15 · SEP 15 · DEC 15', 'L68', 'March'), it('!', 'DO NOTHING → NEXT YEAR MAY START WITH A QUARTERLY BILL', 'L69', 'quarterly')], fxIn='slideR', dimOthers=True, y=220),
 K('L70', [dc('THE FIX', 150, 'L70', 'fix')], kicker='09', fxIn='focus', fxOut='wipe', y=330),
 K('L71', [ln('FEDERAL TD1 · "ADDITIONAL TAX TO BE DEDUCTED"', 56, 'L71'), mo([{'text': '+$0 PER PAYCHEQUE', 't': 0}, {'text': f"+{m(D['net_pp'])} PER PAYCHEQUE", **W('L72', 'forty')}], 110, 'L72', gold=True), ln('SPREAD OVER THE YEAR · NO SURPRISE IN APRIL', 50, 'L73', 'surprise')], fxIn='glass', y=270),
 ST('L74', 'REMOTE WORKER CHECKLIST', [it('T4', 'BOX 10 = YOUR PROVINCE OF EMPLOYMENT', 'L75', 'ten'), it('DEC 31', 'COMPARE WITH WHERE YOU LIVE', 'L76', 'Compare'), it('TD1', 'DIFFERENT? ESTIMATE THE GAP · ADD EXTRA TAX', 'L77', 'gap'),
   it('T2200', 'REQUIRED TO WORK FROM HOME? ASK FOR IT', 'L78', 'ask'), it('M²', 'MEASURE THE SPACE · KEEP RENT, UTILITY, INTERNET BILLS', 'L79', 'Measure')], fxIn='stagger', dimOthers=True, y=180),
 K('L80', [dc('WHAT DID WE LEARN?', 140, 'L80', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L81', 'REMOTE WORK · 4 RULES', [it('1', 'PROVINCIAL TAX FOLLOWS WHERE YOU LIVE ON DEC 31', 'L81', 'One'), it('2', 'PAYROLL CAN USE ANOTHER PROVINCE · YOUR RETURN SETTLES IT', 'L82', 'Two'), it('3', 'IT CAN GO EITHER WAY · A BILL OR A REFUND', 'L83', 'Three'), it('4', 'HOME OFFICE: DETAILED METHOD + T2200', 'L84', 'Four')], fxIn='glass', dimOthers=True, y=200),
 K('L85', [mo([{'text': 'WORKING REMOTELY · YOUR TAXES', 't': 0}, {'text': 'SUPPORTING YOUR PARENTS', **W('L85', 'parents')}], 96, 'L85', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L85', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Same job, two provinces'), ('L7', '01 · Two provinces'), ('L11', '02 · Who decides your tax'), ('L15', '03 · The payroll province'), ('L24', '04 · The real numbers'),
  ('L32', '05 · It can go either way'), ('L42', '06 · The home office deduction'), ('L49', "07 · Sam's claim"), ('L63', '08 · The bill'), ('L70', '09 · The fix'), ('L74', 'Checklist'), ('L80', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L7', 's1', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L15', 's2', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L24', 's3', cam((30, 0, 0.0), (-30, 0, 0.25))),
     ('L32', 's2', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L42', 's4', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L49', 's5', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L63', 's3', cam((50, 0, 0.12), (-50, 0, 0.12))),
     ('L70', 's5', cam((-30, 0, 0.0), (30, 0, 0.2))), ('L74', 's4', cam((-40, 10, 0.0), (40, -10, 0.15))), ('L80', 's6', cam((40, 0, 0.0), (-40, 10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
sfx.append({'name': 'whoosh', 'vol': 0.2, **h['arcAt']})
sfx.append({'name': 'tick', 'vol': 0.2, **h['cardsAt']})
sfx.append({'name': 'whoosh', 'vol': 0.24, **h['oweAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"SAM · PAYROLL AB · LIVES NS · OWES {m(D['gap'])}", 'PROVINCIAL TAX = WHERE YOU LIVE ON DEC 31', 'T4 BOX 10 = PROVINCE OF EMPLOYMENT', f"HOME OFFICE ROOM 10% → {m(D['claim'])} DEDUCTION → −{m(D['save'])}", f"TD1 EXTRA TAX ≈{m(D['net_pp'])} PER PAY", 'EXAMPLES · 2026']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA: determine the province of employment; your province of residence; home office expenses for employees (detailed method, T2200, T777S); instalments; TD1; CRA T4127 (2026) · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf26/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
