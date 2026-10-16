"""LF-09 Side hustle: same $10K profit, different day jobs. NEW intro: StacksHook (two cash stacks, cuts peel bills off on cue). Numbers from data.json."""
import json
L = json.load(open("lines.json")); d = json.load(open("data.json")); s = d["side"]
CH = {"L7", "L11", "L18", "L25", "L31", "L35", "L40", "L46", "L50", "L55"}
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
PL = 'lf/lf09/plates/'
S = lambda g: s[str(g)]
def row(gs): return [{'name': f"DAY JOB {m(g)}", 'value': S(g)['keep']} for g in gs]
events = [
 scene('L1', P('stacks', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.6}, kicker='SAME SIDE HUSTLE · SAME $10,000 PROFIT · 2026', title='WHO KEEPS MORE?', finishTitle='THE HIGHER EARNER KEEPS MORE',
   gross=10000, people=[{'name': 'SAM', 'sub': 'DAY JOB $60,000', 'take': S(60000)['keep'], 'cuts': [{'label': 'INCOME TAX', 'value': S(60000)['tax'], 'color': RED}, {'label': 'CPP', 'value': S(60000)['cpp'], 'color': BLU}]},
                        {'name': 'PRIYA', 'sub': 'DAY JOB $90,000', 'take': S(90000)['keep'], 'cuts': [{'label': 'INCOME TAX', 'value': S(90000)['tax'], 'color': RED}, {'label': 'CPP', 'value': S(90000)['cpp'], 'color': BLU}]}],
   cutAt=[W('L3', 'less'), W('L3', 'Right')], finishAt=W('L4', 'Wrong'), delta=f"+{m(S(90000)['keep'] - S(60000)['keep'])}",
   qAt=W('L5', 'April'), question='WHY? + THE APRIL BILL + THE $30,000 LINE', out=W('L7', None, -0.9)), off=-1.0),
 K('L6', [ln('2026 FEDERAL + ONTARIO RATES · SINGLE · NO OTHER INCOME', 46, 'L6'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L6', 'examples')], kicker='THE FINE PRINT', fxIn='glass', y=360),
 # 01 what changes
 ST('L7', 'PAYCHEQUE vs SIDE HUSTLE', [it('JOB', 'TAX · CPP · EI TAKEN OFF EVERY PAY', 'L8', 'employer'), it('SIDE', 'NOTHING TAKEN OFF · 100% LANDS', 'L8', 'nobody'),
   it('→', 'THE TAX SHOWS UP LATER, ON YOUR RETURN', 'L9', 'later'), it('T2125', 'BUSINESS INCOME · TAXED ON PROFIT', 'L10', 'profit')], fxIn='glass', dimOthers=True, y=200),
 # 02 Sam
 K('L11', [dc('SAM · $60,000 + $10,000', 110, 'L11', 'Sam')], kicker='CASE 1', fxIn='focus', fxOut='wipe', y=330),
 ST('L12', 'SAM · ON THE $10,000', [it('TAX', f"INCOME TAX ≈ {m(S(60000)['tax'])} · FED + ON", 'L12', 'two'), it('CPP', 'JOB: 5.95% + EMPLOYER 5.95%', 'L14', 'five'),
   it('SELF', 'SELF-EMPLOYED: 11.9% — YOU PAY BOTH', 'L14', 'eleven'), it('=', f"CPP {m(S(60000)['cpp'])}", 'L15', 'thousand')], fxIn='slideR', dimOthers=True, y=200),
 K('L16', [ln('HALF OF CPP DEDUCTIBLE · PART EARNS A CREDIT', 50, 'L16'), ln('ALREADY IN OUR NUMBERS', 44, 'L16', 'included')], kicker='FAIR NOTE', fxIn='glass', y=360),
 K('L17', [mo([{'text': '$10,000', 't': 0}, {'text': m(S(60000)['keep']), **W('L17', 'keeps')}], 160, 'L17', gold=True), ln('SAM KEEPS ≈ 61.5%', 56, 'L17', 'sixty')], kicker='SAM KEEPS', fxOut='particles'),
 # 03 Priya
 K('L18', [dc('PRIYA · $90,000 + $10,000', 110, 'L18', 'Priya')], kicker='CASE 2', fxIn='focus', fxOut='wipe', y=330),
 ST('L19', 'PRIYA · ON THE $10,000', [it('TAX', f"INCOME TAX ≈ {m(S(90000)['tax'])} · HIGHER BRACKET", 'L19', 'two'), it('CPP', '$0', 'L20', 'Zero'),
   it('YMPE', 'CEILING 1 (2026): $74,600', 'L21', 'seventy'), it('YAMPE', 'CEILING 2 · CPP2 (2026): $85,000', 'L21', 'eighty')], fxIn='slideL', dimOthers=True, y=200),
 K('L22', [ln('THE DAY JOB ALREADY PAID THE MAXIMUM', 60, 'L22'), ln('NO ROOM LEFT FOR CPP ON THE SIDE', 50, 'L22', 'room')], kicker='WHY $0', fxIn='glass', y=350),
 SPLIT('L23', 'KEPT FROM THE SAME $10,000', '2026 · ONTARIO · EXAMPLE', [{'name': 'SAM · $60K JOB', 'value': S(60000)['keep']}, {'name': 'PRIYA · $90K JOB', 'value': S(90000)['keep']}],
       [W('L23', 'Priya'), W('L23', 'Sam')], f"+{m(S(90000)['keep'] - S(60000)['keep'])} FOR PRIYA", fxIn='glass'),
 K('L24', [ln('$60K JOB = ROOM UNDER THE CEILING', 56, 'L24'), ln('THE SIDE HUSTLE FILLS IT AT 11.9%', 56, 'L24', 'fills')], kicker='THE KEY', fxIn='glass', y=350),
 # 04 ladder
 SPLIT('L25', 'SAME $10,000 · 4 DAY-JOB SALARIES · KEPT', '2026 · ONTARIO · SINGLE', row([40000, 60000, 90000, 130000]),
       [W('L26', 'forty'), W('L27', 'sixty'), W('L28', 'ninety'), W('L29', 'hundred')], 'NOT A STRAIGHT LINE: IT DEPENDS ON THE CPP CEILING', fxIn='slideR'),
 ST('L30', 'WHAT DECIDES IT', [it('1', 'YOUR TAX BRACKET', 'L30', 'depends'), it('2', 'UNDER OR ABOVE THE CPP CEILING', 'L30', 'ceiling')], fxIn='glass', dimOthers=True, y=300),
 # 05 raise vs hustle
 K('L31', [dc('RAISE OR SIDE HUSTLE?', 130, 'L31', 'raise')], kicker='A FAIR QUESTION', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L32', 'SAM · AN EXTRA $10,000 · KEPT', '2026 · ONTARIO', [{'name': 'RAISE AT THE JOB', 'value': d['raise60']}, {'name': 'SIDE HUSTLE PROFIT', 'value': S(60000)['keep']}],
       [W('L32', 'raise'), W('L32', 'side')], 'RAISE: EMPLOYER PAYS HALF THE CPP', fxIn='glass'),
 K('L34', [ln('NOT A BAD IDEA —', 60, 'L34'), ln('JUST A DIFFERENT DOLLAR', 70, 'L34', 'same', gold=True)], fxIn='glass', y=360),
 # 06 expenses
 ST('L35', 'WHAT A RAISE DOESN’T HAVE', [it('1', 'BUSINESS EXPENSES', 'L35', 'expenses'), it('2', 'SUPPLIES · SOFTWARE · SHARE OF PHONE', 'L36', 'supplies'),
   it('=', 'TAX + CPP ON PROFIT', 'L36', 'calculated')], fxIn='stagger', dimOthers=True, y=250),
 ST('L37', 'SAM · $3,000 OF REAL EXPENSES', [it('P', 'PROFIT $10,000 → $7,000', 'L37', 'seven'), it('−', f"KEPT DROPS ONLY {m(d['exp3000_cost_diff'])}", 'L38', 'eight'),
   it('+', f"TAX + CPP SAVED ≈ {m(3000 - d['exp3000_cost_diff'])}", 'L38', 'fifty'), it('!', 'STILL COST $3,000 · KEEP RECEIPTS', 'L39', 'receipts')], fxIn='slideL', dimOthers=True, y=200),
 # 07 April bill
 K('L40', [dc('THE APRIL BILL', 140, 'L40', 'bill')], kicker='WHAT SAM DIDN’T SEE COMING', fxIn='focus', fxOut='wipe', y=330),
 ST('L42', f"SAM OWES AT TAX TIME ≈ {m(d['set_aside60'])}", [it('TAX', m(S(60000)['tax']), 'L42', 'income'), it('CPP', m(S(60000)['cpp']), 'L42', 'C P P'),
   it('JUN 15', 'FILING DEADLINE · SELF-EMPLOYED', 'L43', 'June'), it('APR 30', 'BALANCE DUE · INTEREST AFTER', 'L43', 'April')], fxIn='glass', dimOthers=True, y=200),
 ST('L44', 'THE FIX', [it('%', 'SET ASIDE ≈ 39¢ PER $1 OF PROFIT (SAM)', 'L44', 'thirty'), it('$3K', 'TAX > $3,000 NOW + 1 OF 2 PRIOR YEARS → INSTALMENTS', 'L45', 'instalments'),
   it('CPP', 'NOT COUNTED IN THE $3,000 TEST', 'L45', 'counted')], fxIn='slideR', dimOthers=True, y=230),
 # 08 $30K
 K('L46', [dc('THE $30,000 LINE', 140, 'L46', 'line')], kicker='GST / HST', fxIn='focus', fxOut='wipe', y=330),
 ST('L47', 'SMALL SUPPLIER TEST', [it('$30K', 'SALES OVER $30,000', 'L47', 'thirty'), it('WHEN', '1 CALENDAR QUARTER OR LAST 4 QUARTERS', 'L47', 'quarter'),
   it('→', 'GENERALLY REGISTER · CHARGE · REMIT GST/HST', 'L48', 'register')], fxIn='glass', dimOthers=True, y=230),
 SPLIT('L49', 'SALES, NOT PROFIT', 'EXAMPLE', [{'name': 'SALES', 'value': 40000}, {'name': 'PROFIT', 'value': 10000}], [W('L49', 'forty'), W('L49', 'profit')], 'ALREADY OVER THE $30,000 LINE', fxIn='slideL'),
 # verdict
 K('L50', [dc('WHAT DID WE LEARN?', 140, 'L50', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L51', 'SIDE HUSTLE · 4 RULES', [it('1', 'NO WITHHOLDING · SET MONEY ASIDE', 'L51', 'withholding'), it('2', 'CPP 11.9% UP TO THE CEILINGS', 'L52', 'eleven'),
   it('3', 'EXPENSES CUT THE BILL, NOT TO ZERO', 'L53', 'expenses'), it('4', '$30,000 OF SALES, NOT PROFIT', 'L54', 'sales')], fxIn='glass', dimOthers=True, y=200),
 K('L55', [mo([{'text': 'MARGINAL TAX RATES', 't': 0}, {'text': 'THE ONE NUMBER TO CHECK', **W('L55', 'number')}], 110, 'L55', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L55', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Two stacks'), ('L7', '01 · What changes'), ('L11', '02 · Sam'), ('L18', '03 · Priya'), ('L25', '04 · The ladder'),
  ('L31', '05 · Raise or hustle'), ('L35', '06 · Expenses'), ('L40', '07 · The April bill'), ('L46', '08 · The $30,000 line'), ('L50', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's4', 's5', 's6', 's7']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L7', 's2', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L11', 's1', cam((-50, 10, 0.2), (40, -10, 0.05))), ('L18', 's2', cam((40, 0, 0.0), (-40, 0, 0.2))),
     ('L25', 's7', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L31', 's2', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L35', 's4', cam((0, 0, 0.0), (0, 0, 0.3))), ('L40', 's5', cam((50, 0, 0.12), (-50, 0, 0.12))),
     ('L46', 's6', cam((-60, 10, 0.0), (40, -10, 0.15))), ('L50', 's7', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
for r in h['cutAt']: sfx.append({'name': 'tick', 'vol': 0.15, **r})
sfx.append({'name': 'whoosh', 'vol': 0.2, **h['finishAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"SAM ($60K JOB) KEEPS {m(S(60000)['keep'])}", f"PRIYA ($90K JOB) KEEPS {m(S(90000)['keep'])}", 'SELF-EMPLOYED CPP 11.9% · CPP2 8%', 'YMPE $74,600 · YAMPE $85,000 (2026)',
          'BALANCE DUE APRIL 30', 'GST/HST: $30,000 OF SALES', '2026 RATES · ONTARIO · EXAMPLE']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · 2026 federal + Ontario rates · CPP 2026 · Example calculation, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf09/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
