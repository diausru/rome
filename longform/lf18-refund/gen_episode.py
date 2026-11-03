import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L8", "L17", "L25", "L33", "L43", "L48", "L54", "L60"}
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
PL = 'lf/lf18/plates/'
D = d
events = [
 scene('L1', P('refund', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.66}, kicker='SAME JOB · SAME SALARY · 2026 · ONTARIO', title='WHO PAID LESS TAX?', finishTitle='SAME TAX. TO THE DOLLAR.',
   rows=[{'name': 'MIA', 'withheld': D['mia_withheld'], 'real': D['tax']}, {'name': 'JAY', 'withheld': D['tax'], 'real': D['tax']}],
   gapAt=[W('L2', 'refund'), W('L2', 'nothing')], sameAt=W('L5', 'same'), qAt=W('L6', 'ahead'), question='SO WHO ACTUALLY CAME OUT AHEAD?', out=W('L7', None, -0.9)), off=-1.0),
 K('L7', [ln('2026 · ONTARIO · EMPLOYMENT INCOME', 46, 'L7'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L7', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L8', [dc('WHAT A REFUND IS', 130, 'L8', 'refund')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L9', 'A REFUND IS NOT A BONUS', [it('✗', 'NOT A REWARD FOR FILING', 'L9', 'reward'), it('↩', 'YOUR OWN MONEY COMING BACK', 'L10', 'own'), it('1', 'ALL YEAR: TAX WITHHELD = AN ESTIMATE', 'L11', 'estimate'), it('2', 'SPRING: YOUR RETURN = YOUR REAL TAX', 'L12', 'real')], fxIn='glass', dimOthers=True, y=200),
 ST('L13', 'THE COMPARISON', [it('+', 'WITHHELD > REAL TAX → REFUND', 'L13', 'refund'), it('−', 'WITHHELD < REAL TAX → BALANCE OWING', 'L14', 'owing'), it('CRA', 'WITHHELD TAX = A REFUNDABLE CREDIT', 'L15', 'refundable'), it('?', 'REFUND SIZE = HOW FAR OFF THE ESTIMATE WAS', 'L16', 'far')], fxIn='slideR', dimOthers=True, y=200),
 K('L17', [dc('MIA AND JAY', 140, 'L17', 'Mia')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L18', 'SAME $70,000 · SAME REAL TAX', '2026 · ONTARIO', [{'name': 'REAL TAX · BOTH', 'value': D['tax']}, {'name': 'JAY · WITHHELD', 'value': D['tax']}, {'name': 'MIA · WITHHELD', 'value': D['mia_withheld']}, {'name': 'MIA · REFUND', 'value': D['mia_refund']}],
       [W('L18', 'eleven'), W('L19', 'Jay'), W('L22', 'fifteen'), W('L23', 'three')], 'MIA ASKED FOR $150 EXTRA × 26 PAYCHEQUES (TD1)', fxIn='glass'),
 K('L24', [ln("SHE DIDN'T PAY LESS TAX", 84, 'L24', 'less'), ln('SHE PAID MORE, EARLIER', 64, 'L24', 'earlier', gold=True)], kicker='THE TRUTH', fxIn='glass', y=330),
 K('L25', [dc('WHO CAME OUT AHEAD?', 120, 'L25', 'ahead')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 ST('L26', 'AN INTEREST-FREE LOAN', [it('$3,900', 'LENT TO THE GOVERNMENT · NO INTEREST', 'L26', 'lent'), it(f"≈{m(D['monthly'])}", 'A MONTH JAY COULD USE ALONG THE WAY', 'L27', 'month'), it('OK', 'FORCED SAVINGS? FAIR — KNOW WHAT IT IS', 'L28', 'forced')], fxIn='glass', dimOthers=True, y=240),
 ST('L29', 'REFUNDS NOBODY ASKED FOR', [it('12×', 'PAYROLL ASSUMES EACH PAY LASTS ALL YEAR', 'L30', 'whole'), it('SEP', 'NEW JOB IN SEPTEMBER → LIKELY REFUND', 'L31', 'September'), it('+', 'TUITION · MEDICAL · DONATIONS YOUR EMPLOYER DOESN\'T SEE', 'L32', 'tuition')], fxIn='slideL', dimOthers=True, y=240),
 K('L33', [dc('A REFUND THAT IS REAL', 120, 'L33', 'really')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L34', 'AVA · $10,000 INTO HER RRSP', '$70,000 SALARY · 2026 · ONTARIO', [{'name': 'TAX WITHHELD (NO DEDUCTION)', 'value': D['tax']}, {'name': 'REAL TAX AFTER THE RRSP', 'value': D['ava_tax']}, {'name': 'REFUND = REAL SAVING', 'value': D['ava_saving']}],
       [W('L36', 'withholding'), W('L37', 'eight'), W('L38', 'two')], 'THE SAVING CAME FROM THE DEDUCTION, NOT THE REFUND', fxIn='slideR'),
 ST('L40', 'GET IT DURING THE YEAR', [it('T1213', 'ASK THE CRA TO LET YOUR EMPLOYER WITHHOLD LESS', 'L40', 'T'), it('✓', 'PAST RETURNS FILED + ASSESSED · BALANCE PAID', 'L41', 'conditions'), it('1/YR', 'REQUEST EVERY YEAR · 4–6 WEEKS', 'L41', 'weeks'), it('$0', 'RRSP THROUGH PAYROLL? NO FORM NEEDED', 'L42', 'straight')], fxIn='glass', dimOthers=True, y=200),
 K('L43', [dc('OWING MONEY', 140, 'L43', 'owing')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L44', 'A BALANCE OWING', [it('≠', 'NOT A PENALTY · NOT ENOUGH WITHHELD', 'L44', 'penalty'), it('2+', 'TWO JOBS · SIDE INCOME · INVESTMENTS · PENSIONS', 'L45', 'two'), it('91', 'DAILY COMPOUND INTEREST FROM THE 91ST DAY OF NEXT YEAR', 'L46', 'ninety-first'), it('✓', 'PAID ON TIME = NO EXTRA COST', 'L47', 'time')], fxIn='slideL', dimOthers=True, y=200),
 K('L48', [ln('REFUND OR OWING A LITTLE?', 76, 'L48', 'better'), ln('SMALL BALANCE, PAID ON TIME = YOU KEPT YOUR MONEY LONGER', 44, 'L49', 'kept', gold=True), ln('GOAL: WITHHOLDING CLOSE TO YOUR REAL TAX', 46, 'L52', 'accuracy')], kicker='06', fxIn='glass', y=290),
 ST('L54', 'YOUR REFUND CHECKLIST', [it('1', 'FIND: TOTAL WITHHELD + REAL TAX', 'L55', 'find'), it('2', 'THE GAP ≠ YOUR TAX BILL', 'L56', 'difference'), it('3', 'BIG REFUND EVERY YEAR? CHECK YOUR TD1', 'L57', 'big'),
   it('4', 'OWN RRSP CONTRIBUTIONS? FORM T1213', 'L58', 'R'), it('5', 'OWE? PAY ON TIME', 'L59', 'Owe')], fxIn='stagger', dimOthers=True, y=180),
 K('L60', [dc('WHAT DID WE LEARN?', 140, 'L60', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L61', 'REFUNDS · 3 RULES', [it('1', 'YOUR OWN MONEY, NOT A BONUS', 'L61', 'own'), it('2', 'REAL TAX IS SET ON THE RETURN', 'L62', 'set'), it('3', 'SAME TAX ≠ SAME REFUND', 'L63', 'same')], fxIn='glass', dimOthers=True, y=240),
 K('L64', [mo([{'text': 'A REFUND ≠ LESS TAX', 't': 0}, {'text': 'CPP · EI · INCOME TAX', **W('L64', 'paycheque')}], 100, 'L64', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L64', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Same tax, different refunds'), ('L8', '01 · What a refund is'), ('L17', '02 · Mia and Jay'), ('L25', '03 · Who came out ahead?'), ('L33', '04 · A refund that is real'),
  ('L43', '05 · Owing money'), ('L48', '06 · Refund or owing?'), ('L54', 'Checklist'), ('L60', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L8', 's4', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L17', 's1', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L20', 's2', cam((0, 30, 0.0), (0, -30, 0.25))),
     ('L25', 's3', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L33', 's5', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L43', 's3', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L48', 's4', cam((-30, 0, 0.0), (30, 0, 0.2))),
     ('L54', 's6', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L60', 's2', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
for r in h['gapAt']: sfx.append({'name': 'tick', 'vol': 0.2, **r})
sfx.append({'name': 'whoosh', 'vol': 0.22, **h['sameAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"MIA & JAY · $70,000 · SAME REAL TAX {m(D['tax'])}", f"MIA: {m(D['extra'])} EXTRA WITHHELD → {m(D['mia_refund'])} REFUND", 'A REFUND = WITHHELD − REAL TAX', f"AVA: $10,000 RRSP → REAL SAVING {m(D['ava_saving'])}", 'FORM T1213 · INTEREST FROM THE 91ST DAY', 'EXAMPLES · 2026 · ONTARIO']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA how income tax is calculated, increase/reduce tax deducted at source (TD1, T1213), interest on balances owing, T4127 (2026) · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf18/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
