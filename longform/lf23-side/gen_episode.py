import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L7", "L14", "L21", "L29", "L34", "L39", "L44", "L48", "L56", "L62"}
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
PL = 'lf/lf23/plates/'
D = d
events = [
 scene('L1', P('ping', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.72}, kicker='MAYA · WEEKEND PHOTOGRAPHY · 2026 · ONTARIO', title='WHAT DOES THE CRA WANT?',
   payments=[1200, 2500, 900, 1800, 3100, 1500, 2000, 1000], total=D['sales'], withheldAt=W('L2', 'Nobody'), billAt=W('L3', 'want'), bill=D['tax_profit'], saveAt=W('L4', 'cut'), save=D['exp_saving'],
   qAt=W('L5', 'exactly'), question='WHAT GETS TAXED ON A SIDE HUSTLE?', out=W('L6', None, -0.9)), off=-1.0),
 K('L6', [ln('2026 · ONTARIO · $70,000 SALARY + A SIDE BUSINESS', 46, 'L6'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L6', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L7', [dc('WHAT COUNTS', 140, 'L7', 'counts')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L8', 'BUSINESS INCOME', [it('$', 'SELL A SERVICE OR PRODUCT, REGULARLY, TO MAKE MONEY', 'L8', 'business'), it('ANY', 'CASH · E-TRANSFER · APP · PLATFORM', 'L9', 'paid'), it('T4?', 'NO SLIP NEEDED · CLIENTS USUALLY SEND NOTHING', 'L10', 'slip'),
   it('T2125', 'STATEMENT OF BUSINESS OR PROFESSIONAL ACTIVITIES', 'L11', 'T'), it('!', 'SKIP IT → INCOME MISSING FROM YOUR RETURN', 'L13', 'missing')], fxIn='glass', dimOthers=True, y=180),
 K('L14', [dc('PROFIT, NOT SALES', 130, 'L14', 'actually')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L15', "MAYA'S SIDE BUSINESS", 'T2125 · 2026', [{'name': 'SALES', 'value': D['sales']}, {'name': 'EXPENSES', 'value': D['expenses']}, {'name': 'PROFIT · ADDED TO HER INCOME', 'value': D['profit']}],
       [W('L16', 'paid'), W('L17', 'spent'), W('L18', 'profit')], 'EXPENSES: REAL · FOR EARNING THE INCOME · KEEP RECEIPTS', fxIn='glass'),
 K('L21', [dc('THE BILL', 150, 'L21', 'bill')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L22', 'INCOME TAX ON $10,000 OF PROFIT', 'DEPENDS ON YOUR SALARY · 2026 · ONTARIO', [{'name': 'SALARY $70,000 (MAYA)', 'value': D['tax_profit']}, {'name': 'SALARY $45,000', 'value': D['tax_45']}, {'name': 'SALARY $110,000', 'value': D['tax_110']}],
       [W('L23', 'goes'), W('L26', 'forty-five'), W('L27', 'hundred')], 'IT SITS ON TOP OF YOUR JOB · TAXED AT YOUR TOP RATE', fxIn='slideL'),
 K('L29', [dc('THE RECEIPTS', 140, 'L29', 'receipts')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L30', 'SAME SALES · WITH AND WITHOUT RECORDS', 'MAYA · 2026 · ONTARIO', [{'name': 'NO EXPENSES CLAIMED · TAX', 'value': D['tax_noexp']}, {'name': 'EXPENSES CLAIMED · TAX', 'value': D['tax_profit']}, {'name': 'SAVED BY RECORDS', 'value': D['exp_saving']}],
       [W('L30', 'forgotten'), W('L31', 'Tracking'), W('L31', 'saved')], 'A SHOEBOX WORKS · A SPREADSHEET WORKS · A RECEIPT + A REASON', fxIn='glass'),
 K('L34', [dc('NOTHING WITHHELD', 130, 'L34', 'surprise')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L35', 'THE BILL ARRIVES AT ONCE', [it('2 WK', 'PAYCHEQUE: TAX OFF EVERY TWO WEEKS', 'L35', 'paycheque'), it('$0', 'SIDE HUSTLE: NOTHING COMES OFF', 'L35', 'nothing'), it(f"≈{m(D['tax_profit'])}", 'ALL AT ONCE, WHEN YOU FILE', 'L36', 'whole'),
   it(f"{m(D['monthly'])}/MO", 'SET IT ASIDE AS YOU EARN IT', 'L38', 'aside')], fxIn='slideR', dimOthers=True, y=200),
 K('L39', [dc('CPP', 150, 'L39', 'C')], kicker='06', fxIn='focus', fxOut='wipe', y=330),
 ST('L40', 'CPP ON SELF-EMPLOYMENT', [it('½ + ½', 'JOB: EMPLOYER PAYS HALF · YOU PAY HALF', 'L40', 'employer'), it('2 × ½', 'SELF-EMPLOYED: YOU PAY BOTH HALVES', 'L41', 'both'), it('MAX', 'HOW MUCH DEPENDS ON THE CPP YOUR JOB ALREADY PAID', 'L42', 'depends'), it('✓', "DON'T ASSUME · CHECK IT ON YOUR RETURN", 'L43', 'assume')], fxIn='glass', dimOthers=True, y=200),
 K('L44', [dc('THE DATES', 140, 'L44', 'dates')], kicker='07', fxIn='focus', fxOut='wipe', y=330),
 ST('L45', 'SELF-EMPLOYED · KEY DATES', [it('JUN 15', 'FILING DEADLINE · YOU OR YOUR SPOUSE SELF-EMPLOYED', 'L45', 'June'), it('APR 30', 'BALANCE OWING STILL DUE · INTEREST AFTER', 'L46', 'April'), it('4×', 'INSTALMENTS IF ASKED: MAR 15 · JUN 15 · SEP 15 · DEC 15', 'L47', 'instalments')], fxIn='slideL', dimOthers=True, y=240),
 K('L48', [dc('THE $30,000 LINE', 130, 'L48', 'thirty')], kicker='08', fxIn='focus', fxOut='wipe', y=330),
 ST('L49', 'GST / HST · SMALL SUPPLIER', [it('≤$30K', 'ONE QUARTER AND LAST FOUR QUARTERS → NO NEED TO REGISTER', 'L50', 'small'), it('>$30K', 'REGISTER · CHARGE GST/HST · REMIT IT', 'L51', 'register'), it('29', 'DAYS TO REGISTER ONCE REQUIRED', 'L51', 'twenty-nine'),
   it('$14K', 'MAYA: SMALL SUPPLIER', 'L52', 'Maya'), it('$3K/MO', 'WOULD CROSS THE LINE IN LESS THAN A YEAR', 'L53', 'grows'), it('OPT', 'VOLUNTARY: INPUT TAX CREDITS · BUT GST/HST RETURNS', 'L54', 'voluntarily')], fxIn='glass', dimOthers=True, y=150),
 ST('L56', 'YOUR SIDE HUSTLE CHECKLIST', [it('1', 'REPORT ALL OF IT · FORM T2125', 'L57', 'One'), it('2', 'KEEP EVERY RECEIPT · TAXED ON PROFIT', 'L58', 'Two'), it('3', 'SET MONEY ASIDE EVERY MONTH', 'L59', 'Three'), it('4', 'PAY BY APRIL 30 · FILE BY JUNE 15', 'L60', 'Four'), it('5', 'WATCH THE $30,000 GST/HST LINE', 'L61', 'Five')], fxIn='stagger', dimOthers=True, y=180),
 K('L62', [dc('WHAT DID WE LEARN?', 140, 'L62', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L63', 'SIDE HUSTLE · 4 RULES', [it('1', 'PROFIT IS TAXABLE · HOWEVER YOU ARE PAID', 'L63', 'One'), it('2', 'TAXED AT YOUR TOP RATE', 'L64', 'Two'), it('3', 'EXPENSES CUT THE BILL · WITH RECORDS', 'L65', 'Three'), it('4', 'NOTHING WITHHELD · PLAN FOR TAX + CPP', 'L66', 'Four')], fxIn='glass', dimOthers=True, y=200),
 K('L67', [mo([{'text': 'SIDE HUSTLE · WHAT GETS TAXED', 't': 0}, {'text': 'TWO JOBS · WHAT HAPPENS', **W('L67', 'two')}], 100, 'L67', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L67', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Fourteen thousand, nothing withheld'), ('L7', '01 · What counts'), ('L14', '02 · Profit, not sales'), ('L21', '03 · The bill'), ('L29', '04 · The receipts'),
  ('L34', '05 · Nothing withheld'), ('L39', '06 · CPP'), ('L44', '07 · The dates'), ('L48', '08 · The $30,000 line'), ('L56', 'Checklist'), ('L62', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L7', 's2', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L14', 's3', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L21', 's4', cam((30, 0, 0.0), (-30, 0, 0.25))),
     ('L29', 's3', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L34', 's2', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L39', 's4', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L44', 's6', cam((50, 0, 0.12), (-50, 0, 0.12))),
     ('L48', 's5', cam((-30, 0, 0.0), (30, 0, 0.2))), ('L56', 's6', cam((-40, 10, 0.0), (40, -10, 0.15))), ('L62', 's1', cam((40, 0, 0.0), (-40, 10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
sfx.append({'name': 'tick', 'vol': 0.2, **h['withheldAt']})
sfx.append({'name': 'whoosh', 'vol': 0.2, **h['billAt']})
sfx.append({'name': 'whoosh', 'vol': 0.22, **h['saveAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"MAYA · SALES {m(D['sales'])} − EXPENSES {m(D['expenses'])} = PROFIT {m(D['profit'])}", f"INCOME TAX ON THE PROFIT ≈{m(D['tax_profit'])}", f"RECEIPTS SAVED {m(D['exp_saving'])}", 'FILE BY JUNE 15 · PAY BY APRIL 30', 'GST/HST: SMALL SUPPLIER UP TO $30,000', 'EXAMPLES · 2026 · ONTARIO']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA T4002 and form T2125; self-employed filing and payment dates; instalment due dates; GST/HST small supplier and registration · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf23/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
