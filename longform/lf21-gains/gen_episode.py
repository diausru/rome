import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L8", "L14", "L21", "L30", "L39", "L47", "L57", "L63"}
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
PL = 'lf/lf21/plates/'
D = d
events = [
 scene('L1', P('half', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.74}, kicker='LEAH SOLD HER SHARES · 2026 · ONTARIO', title='HOW MUCH TAX ON THE PROFIT?',
   gain=D['gain'], taxable=D['taxable'], taxGain=D['tax_gain'], taxFull=D['tax_salary'], splitAt=W('L2', 'income'), fullAt=W('L3', 'fully'),
   stampAt=W('L5', 'cut'), stamp=f"−{m(D['saved_by_loss'])}", stampSub='ONE MORE MOVE', qAt=W('L6', 'exactly'), question='HOW IS A CAPITAL GAIN REALLY TAXED?', out=W('L7', None, -0.9)), off=-1.0),
 K('L7', [ln('2026 · ONTARIO · $70,000 SALARY', 50, 'L7'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L7', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L8', [dc('WHAT A CAPITAL GAIN IS', 120, 'L8', 'capital')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L9', 'A CAPITAL GAIN', [it('+', 'SELL FOR MORE THAN IT COST YOU', 'L9', 'profit'), it('↑', 'PRICE UP, NOT SOLD → NOTHING TO REPORT YET', 'L10', 'keep'), it('ACCT', 'REGULAR ACCOUNT · OUTSIDE AN RRSP', 'L11', 'regular'), it('YEAR', 'TAXED IN THE YEAR YOU SELL', 'L12', 'year'), it('−', 'SELL FOR LESS → CAPITAL LOSS', 'L13', 'loss')], fxIn='glass', dimOthers=True, y=180),
 K('L14', [dc("LEAH'S NUMBERS", 140, 'L14', 'numbers')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L15', 'LEAH · 400 SHARES', '$70,000 SALARY · ONTARIO', [{'name': 'BOUGHT · 400 × $50', 'value': 20000}, {'name': 'COMMISSION', 'value': 10}, {'name': 'ADJUSTED COST BASE', 'value': D['acb']}, {'name': 'SOLD · 400 × $80', 'value': D['proceeds']}, {'name': 'CAPITAL GAIN', 'value': D['gain']}],
       [W('L16', 'bought'), W('L16', 'commission'), W('L18', 'adjusted'), W('L19', 'sells'), W('L20', 'capital')], 'ACB = WHAT YOU PAID + THE COSTS OF BUYING', fxIn='glass'),
 K('L21', [dc('ONLY HALF', 150, 'L21', 'different')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 ST('L22', 'THE INCLUSION RATE', [it('½', 'ONLY HALF OF A CAPITAL GAIN IS TAXABLE', 'L22', 'half'), it('2026', 'INCLUSION RATE: ONE HALF', 'L23', 'inclusion'), it('✗', 'TWO-THIRDS INCREASE CANCELLED · MARCH 2025', 'L24', 'cancelled'), it(m(D['taxable']), "ADDED TO LEAH'S INCOME · THE OTHER HALF: NOT TAXED", 'L25', 'added'),
   it('S3', 'SCHEDULE 3 → LINE 12700', 'L27', 'Schedule'), it('≈½', 'ABOUT HALF YOUR USUAL RATE', 'L29', 'half')], fxIn='slideR', dimOthers=True, y=150),
 K('L30', [dc('THE REAL BILL', 140, 'L30', 'bill')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L31', 'SAME $11,990 · TWO WAYS', '2026 · ONTARIO · ON TOP OF $70,000', [{'name': 'CAPITAL GAIN · TAX', 'value': D['tax_gain']}, {'name': 'CAPITAL GAIN · SHE KEEPS', 'value': D['keep_gain']}, {'name': 'FULLY TAXED · TAX', 'value': D['tax_salary']}, {'name': 'FULLY TAXED · KEEPS', 'value': D['keep_salary']}, {'name': 'LESS TAX AS A GAIN', 'value': D['diff']}],
       [W('L32', 'goes'), W('L33', 'keeps'), W('L34', 'compare'), W('L35', 'keep'), W('L36', 'less')], f"≈{D['eff']}% OF THE PROFIT · INCOME TAX ONLY", fxIn='glass'),
 K('L37', [ln('RATE ON EXTRA INCOME ≈ 31%', 84, 'L37', 'thirty-one'), ln('ON A CAPITAL GAIN ≈ 16%', 72, 'L37', 'sixteen', gold=True), ln('NOT ON YOUR PAYCHEQUE · IT SHOWS UP WHEN YOU FILE', 44, 'L38', 'files')], fxIn='glass', y=300),
 K('L39', [dc('NO FLAT RATE', 140, 'L39', 'miss')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L40', 'SAME $11,990 GAIN · TAX DEPENDS ON YOUR OTHER INCOME', 'EXAMPLE · 2026 · ONTARIO', [{'name': 'INCOME $40,000', 'value': D['tax_gain_40']}, {'name': 'INCOME $70,000', 'value': D['tax_gain']}, {'name': 'INCOME $120,000', 'value': D['tax_gain_120']}],
       [W('L42', 'forty'), W('L42', 'same'), W('L43', 'hundred')], 'THE TAXABLE HALF LANDS ON TOP OF EVERYTHING ELSE', fxIn='slideL'),
 K('L45', [ln('TAXED IN THE YEAR YOU SELL', 84, 'L45', 'year'), ln('LOWER-INCOME YEAR → LOWER RATE ON THE TAXABLE HALF', 48, 'L46', 'lower', gold=True), ln('SCHOOL · LEAVE · EARLY RETIREMENT', 44, 'L46', 'school')], fxIn='glass', y=310),
 K('L47', [dc('THE LOSS MOVE', 140, 'L47', 'move')], kicker='06', fxIn='focus', fxOut='wipe', y=330),
 ST('L48', 'A LOSS ON PAPER', [it('−$4K', 'ANOTHER STOCK HAD DROPPED', 'L49', 'dropped'), it('SOLD', 'THE LOSS IS NOW REAL · SAME YEAR', 'L50', 'real'), it('!', 'BUY IT RIGHT BACK → LOSS CAN BE DENIED · SUPERFICIAL LOSS', 'L51', 'denied')], fxIn='slideR', dimOthers=True, y=240),
 SPLIT('L52', 'LOSSES REDUCE GAINS', 'EXAMPLE · 2026 · ONTARIO', [{'name': 'CAPITAL GAIN', 'value': D['gain']}, {'name': 'CAPITAL LOSS', 'value': D['loss']}, {'name': 'NET GAIN', 'value': D['net_gain']}, {'name': 'TAX NOW', 'value': D['tax_net']}, {'name': 'TAX SAVED', 'value': D['saved_by_loss']}],
       [W('L52', 'Eleven'), W('L52', 'minus'), W('L52', 'net'), W('L53', 'drops'), W('L54', 'Five')], 'ONLY HALF OF THE NET GAIN IS TAXABLE', fxIn='glass'),
 K('L55', [ln('LOSSES ONLY REDUCE GAINS', 84, 'L55', 'only'), ln("NOT YOUR SALARY", 64, 'L55', 'salary', gold=True), ln('UNUSED LOSSES → OTHER YEARS', 50, 'L56', 'disappear')], fxIn='glass', y=310),
 ST('L57', 'YOUR CAPITAL GAINS CHECKLIST', [it('1', 'KEEP PURCHASE RECORDS + COMMISSIONS · YOUR ACB', 'L58', 'One'), it('2', 'REPORT EVERY SALE · SCHEDULE 3', 'L59', 'Two'), it('3', 'ONLY HALF IS TAXED · AT YOUR RATE', 'L60', 'Three'), it('4', 'WHICH YEAR? ANY LOSSES TO USE?', 'L61', 'Four'), it('HOME', 'YOUR HOME: PRINCIPAL RESIDENCE EXEMPTION', 'L62', 'home')], fxIn='stagger', dimOthers=True, y=180),
 K('L63', [dc('WHAT DID WE LEARN?', 140, 'L63', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L64', 'CAPITAL GAINS · 4 RULES', [it('1', 'TAXED ONLY WHEN YOU SELL', 'L64', 'One'), it('2', 'ONLY HALF IS TAXABLE IN 2026', 'L65', 'Two'), it('3', 'NO FLAT RATE · YOUR INCOME DECIDES', 'L66', 'Three'), it('4', 'LOSSES REDUCE GAINS', 'L67', 'Four')], fxIn='glass', dimOthers=True, y=200),
 K('L68', [mo([{'text': 'CAPITAL GAINS · REAL EXAMPLE', 't': 0}, {'text': '$100K SALARY ≠ $100K TAXABLE', **W('L68', 'salary')}], 100, 'L68', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L68', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Same money, half the tax'), ('L8', '01 · What a capital gain is'), ('L14', "02 · Leah's numbers"), ('L21', '03 · Only half'), ('L30', '04 · The real bill'),
  ('L39', '05 · No flat rate'), ('L47', '06 · The loss move'), ('L57', 'Checklist'), ('L63', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L8', 's3', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L14', 's2', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L21', 's6', cam((30, 0, 0.0), (-30, 0, 0.25))),
     ('L30', 's2', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L39', 's3', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L47', 's5', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L57', 's6', cam((50, 0, 0.12), (-50, 0, 0.12))),
     ('L62', 's4', cam((-30, 0, 0.0), (30, 0, 0.2))), ('L63', 's5', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
sfx.append({'name': 'tick', 'vol': 0.2, **h['splitAt']})
sfx.append({'name': 'tick', 'vol': 0.2, **h['fullAt']})
sfx.append({'name': 'whoosh', 'vol': 0.22, **h['stampAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"LEAH · GAIN {m(D['gain'])} · TAX ≈{m(D['tax_gain'])}", 'INCLUSION RATE 2026: ONE HALF', 'ACB = COST + COSTS OF BUYING', f"SAME GAIN FULLY TAXED: ≈{m(D['tax_salary'])}", f"A $4,000 LOSS → {m(D['saved_by_loss'])} LESS TAX", 'EXAMPLES · 2026 · ONTARIO']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA T4037 Capital gains; line 12700 and Schedule 3; capital losses; Finance Canada / CRA updates on the cancelled inclusion-rate increase · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf21/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
