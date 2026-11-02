import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L7", "L11", "L19", "L25", "L30", "L37", "L40", "L46"}
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
PL = 'lf/lf15/plates/'
D = d; WN, LT, LP = D['win'], D['late'], D['lump']
events = [
 scene('L1', P('window', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's3.jpg', 'depth': PL + 's3_d.png', 'dim': 0.62}, kicker='SAME RRSP · SAME PERSON · 2026 RATES', title='SAME $10,000. WHAT DOES IT COST?', finishTitle='SAME $10,000. TWO PRICES.',
   ages=[60, 75], win=[61, 71], stops=[{'age': 62, 'tax': WN['tax'], 'tone': 'good', 'label': 'TAKEN AT 62'}, {'age': 72, 'tax': LT['total'], 'tone': 'bad', 'label': 'TAKEN AT 72'}],
   stopAt=[W('L1', 'sixty-two'), W('L2', 'seventy-two')], closeAt=W('L4', 'closes'), qAt=W('L5', 'window'), question='WHEN IS YOUR WINDOW OPEN?', out=W('L6', None, -0.9)), off=-1.0),
 K('L6', [ln('2026 RATES · ONTARIO · SINGLE', 46, 'L6'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L6', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L7', [dc('WHAT THE WINDOW IS', 130, 'L7', 'window')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L8', 'MEET ELLEN', [it('61', 'RETIRED · RRSP SAVINGS · NO WORKPLACE PENSION', 'L8', 'retired'), it('OAS', 'STARTS LATER', 'L8', 'later'), it('$0', 'NO SALARY · NO PENSION YET', 'L9', 'salary'), it('✓', 'LOW INCOME · LOW BRACKETS · NOTHING FORCED', 'L10', 'Low')], fxIn='glass', dimOthers=True, y=220),
 K('L11', [dc('WHY WAITING COSTS MORE', 120, 'L11', 'waiting')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 ST('L12', 'THE CLOCK', [it('71', 'RRSP MUST CLOSE BY THE END OF THE YEAR YOU TURN 71', 'L12', 'seventy-one'), it('RRIF', 'A MINIMUM MUST COME OUT EVERY YEAR', 'L13', 'minimum'), it('+', 'RRIF MINIMUM + CPP + OAS · SAME YEARS', 'L14', 'plus')], fxIn='slideR', dimOthers=True, y=260),
 SPLIT('L15', 'ELLEN AT 72 · THE NEXT $10,000', 'NET INCOME $100,000 · 2026 RATES', [{'name': 'INCOME TAX (FED + ON)', 'value': LT['tax']}, {'name': 'OAS CLAWBACK 15%', 'value': LT['claw']}, {'name': 'TOTAL COST', 'value': LT['total']}],
       [W('L16', 'three'), W('L17', 'One'), W('L18', 'Total')], 'ALMOST HALF OF THE $10,000', fxIn='glass'),
 K('L19', [dc('NOW THE WINDOW', 130, 'L19', 'window')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L20', 'ELLEN AT 62 · $40,000 FROM HER RRSP', 'HER ONLY INCOME · 2026 RATES', [{'name': 'TAX ON ALL $40,000', 'value': D['tax40']}, {'name': 'THE NEXT $10,000', 'value': WN['tax']}],
       [W('L21', 'five'), W('L22', 'two')], f"AVERAGE {D['avg40']}%", fxIn='slideL'),
 SPLIT('L23', 'THE SAME $10,000', 'TWO PRICES', [{'name': 'IN THE WINDOW · AGE 62', 'value': WN['tax']}, {'name': 'LATER · AGE 72', 'value': LT['total']}, {'name': 'DIFFERENCE', 'value': D['gap']}],
       [W('L23', 'two'), W('L23', 'four'), W('L23', 'difference')], '10 YEARS × $40,000 = $400,000 AT LOW RATES', fxIn='glass'),
 K('L25', [dc('THE TRAP', 150, 'L25', 'trap')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L26', 'THE SAME $100,000 FROM THE RRSP', 'BRACKETS RESET EVERY YEAR', [{'name': 'ONE YEAR · $100,000', 'value': LP['tax']}, {'name': 'TWO YEARS · $50,000 EACH', 'value': LP['spread_tax']}, {'name': 'EXTRA COST OF ONE SHOT', 'value': LP['tax'] - LP['spread_tax']}],
       [W('L27', 'twenty-one'), W('L28', 'fourteen'), W('L29', 'seven')], 'STEADY AMOUNTS WIN', fxIn='slideR'),
 K('L30', [dc('HOW MUCH EACH YEAR?', 120, 'L30', 'much')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L31', 'FILL THE LOW BRACKETS', [it('ON', 'FIRST BRACKET ENDS AT $53,891', 'L31', 'fifty-three'), it('FED', 'FIRST BRACKET ENDS AT $58,523', 'L31', 'fifty-eight'), it('↑', 'ABOVE THAT, EVERY DOLLAR COSTS MORE', 'L32', 'Above')], fxIn='glass', dimOthers=True, y=260),
 ST('L33', 'WHERE THE MONEY GOES', [it('TFSA', "DON'T NEED IT? MOVE IT TO YOUR TFSA (ROOM)", 'L33', 'need'), it('0', "TFSA WITHDRAWALS DON'T COUNT · OAS SAFE", 'L34', 'withdrawals'),
   it('↓', 'SMALLER RRIF AT 72 · SMALLER MINIMUMS', 'L35', 'smaller'), it('×2', 'COUPLE: RRIF SPLITTING FROM 65', 'L36', 'split')], fxIn='slideL', dimOthers=True, y=200),
 ST('L37', 'WHERE THIS CHANGES', [it('CR', 'AGE + PENSION AMOUNTS NOT SHOWN · BILLS A BIT LOWER', 'L37', 'credits'), it('GIS', 'LOW INCOME: WITHDRAWALS CAN REDUCE GIS', 'L38', 'Guaranteed'), it('PRO', 'RETURNS · HEALTH · TIME · YOUR OWN NUMBERS', 'L39', 'returns')], fxIn='glass', dimOthers=True, y=260),
 ST('L40', 'YOUR WINDOW CHECKLIST', [it('1', 'FIND YOUR WINDOW YEARS', 'L41', 'Find'), it('2', 'FILL THE LOW BRACKETS · NOT MUCH MORE', 'L42', 'fill'), it('3', "DON'T TAKE IT ALL IN ONE YEAR", 'L43', 'all'),
   it('4', "WHAT YOU DON'T NEED → TFSA", 'L44', 'Move'), it('5', 'PLAN WITH YOUR CPP + OAS START', 'L45', 'Plan')], fxIn='stagger', dimOthers=True, y=180),
 K('L46', [dc('WHAT DID WE LEARN?', 140, 'L46', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L47', 'THE RETIREMENT TAX WINDOW · 4 RULES', [it('1', 'SAME DOLLAR, UP TO 2× THE TAX LATER', 'L47', 'twice'), it('2', 'RIGHT AFTER RETIRING = CHEAPEST YEARS', 'L48', 'cheapest'),
   it('3', 'STEADY BEATS ONE BIG WITHDRAWAL', 'L49', 'Steady'), it('4', 'TFSA: GROWTH WITHOUT TOUCHING OAS', 'L50', 'growing')], fxIn='glass', dimOthers=True, y=200),
 K('L51', [mo([{'text': 'THE RETIREMENT WINDOW', 't': 0}, {'text': 'THE CANADA CHILD BENEFIT', **W('L51', 'child')}], 100, 'L51', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L51', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Same $10,000, two prices'), ('L7', '01 · What the window is'), ('L11', '02 · Why waiting costs more'), ('L19', '03 · The window math'),
  ('L25', '04 · The one-big-withdrawal trap'), ('L30', '05 · How much each year'), ('L37', 'Where this changes'), ('L40', 'Checklist'), ('L46', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L7', 's2', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L11', 's4', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L19', 's1', cam((0, 30, 0.0), (0, -30, 0.25))),
     ('L25', 's3', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L30', 's5', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L37', 's4', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L40', 's6', cam((-30, 0, 0.0), (30, 0, 0.2))),
     ('L46', 's2', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
for r in h['stopAt']: sfx.append({'name': 'whoosh', 'vol': 0.2, **r})
sfx.append({'name': 'tick', 'vol': 0.2, **h['closeAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"$10,000 FROM AN RRSP · AT 62: {m(WN['tax'])} · AT 72: {m(LT['total'])}", 'RRSP → RRIF BY THE END OF THE YEAR YOU TURN 71', f"ONE $100,000 YEAR: {m(LP['tax'])} · TWO $50,000 YEARS: {m(LP['spread_tax'])}", 'ONTARIO FIRST BRACKET $53,891 · FEDERAL $58,523', 'EXAMPLES · 2026 RATES']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA RRSP options at 71, RRIF minimums, T4127 (2026), OAS recovery tax, TFSA · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf15/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
