import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L8", "L17", "L25", "L32", "L35", "L46", "L55", "L58", "L63"}
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
PL = 'lf/lf20/plates/'
D = d; Pp = D['people']; NM = ['Ben', 'Ella', 'Ravi', 'Kate', 'Marc']
events = [
 scene('L1', P('deposit', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.72}, kicker='SAME $10,000 RRSP · 2026 · ONTARIO', title='WHO SAVES THE MOST TAX?',
   people=[{'name': k, **Pp[k]} for k in NM], riseAt=W('L2', 'Ben'), pair=[2, 3], pairAt=W('L4', 'Kate'), pairText=f"+{m(Pp['Kate']['saving'] - Pp['Ravi']['saving'])} FOR $35,000 MORE PAY",
   qAt=W('L5', 'waiting'), question='WHEN DOES AN RRSP ACTUALLY CUT YOUR TAX?', out=W('L7', None, -0.9)), off=-1.0),
 K('L7', [ln('2026 · ONTARIO · EMPLOYMENT INCOME · $10,000 DEDUCTION', 44, 'L7'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L7', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L8', [dc('WHAT A DEDUCTION DOES', 120, 'L8', 'deduction')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L9', 'AN RRSP DEDUCTION', [it('✗', 'NOT A FIXED REFUND', 'L9', 'fixed'), it('20800', 'DEDUCTED FROM YOUR INCOME · LINE 20800', 'L9', 'line'), it('TOP $', 'REMOVES YOUR TOP DOLLARS · TAXED AT YOUR HIGHEST RATE', 'L10', 'top'), it('=', 'SAVING = TAX ON YOUR LAST $10,000', 'L11', 'last')], fxIn='glass', dimOthers=True, y=200),
 ST('L12', 'HOW MUCH ROOM?', [it('18%', "OF LAST YEAR'S EARNED INCOME", 'L12', 'eighteen'), it('$33,810', '2026 MAXIMUM · LESS PENSION ADJUSTMENTS', 'L13', 'thirty-three'), it('↪', 'UNUSED ROOM CARRIES FORWARD · SEE YOUR NOTICE OF ASSESSMENT', 'L14', 'carries'),
   it(m(D['room_ravi']), 'RAVI · 18% × $75,000', 'L15', 'Ravi'), it(m(D['room_marc']), 'MARC · 18% × $160,000', 'L15', 'Marc'), it('!', 'OVER THE LIMIT → TAX ON THE EXCESS', 'L16', 'excess')], fxIn='slideR', dimOthers=True, y=160),
 K('L17', [dc('FIVE PEOPLE', 140, 'L17', 'five')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L18', 'SAME $10,000 DEDUCTION · TAX SAVED', '2026 · ONTARIO · ROUNDED', [{'name': f"{k.upper()} · {m(Pp[k]['salary'])}", 'value': Pp[k]['saving']} for k in ['Ella', 'Ravi', 'Kate', 'Marc', 'Ben']],
       [W('L20', 'Ella'), W('L21', 'Ravi'), W('L22', 'Kate'), W('L23', 'Marc'), W('L24', 'Ben')], "BEN'S $853 = ALL THE INCOME TAX HE PAID", fxIn='glass'),
 K('L25', [dc('THE SURPRISE', 140, 'L25', 'surprise')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 ST('L26', f"KATE EARNS $35,000 MORE · SAVES {m(Pp['Kate']['saving'] - Pp['Ravi']['saving'])} MORE", [it('▤', 'TAX RATES RISE IN STEPS · BRACKETS', 'L27', 'steps'), it('≈', 'RAVI + KATE: TOP DOLLARS AT A SIMILAR COMBINED RATE', 'L28', 'nearly'), it('≈31¢', 'PER $1 FOR BOTH', 'L29', 'thirty-one'), it('≈45¢', 'MARC · MUCH HIGHER STEPS', 'L30', 'forty-five'), it('→', 'YOUR TOP RATE DECIDES · NOT YOUR SALARY', 'L31', 'rate')], fxIn='glass', dimOthers=True, y=170),
 K('L32', [dc('BEN', 150, 'L32', 'Ben')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 K('L33', [ln(f"BEN'S TAX FOR THE YEAR: {m(D['ben_tax'])}", 80, 'L33', 'whole'), ln('A $10,000 DEDUCTION WIPES IT OUT', 60, 'L33', 'wipes', gold=True), ln("MOST OF IT IS WASTED · NO TAX TO GET BACK", 50, 'L34', 'wasted')], fxIn='glass', y=300),
 K('L35', [dc('DEDUCT LATER', 140, 'L35', 'miss')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L36', 'CONTRIBUTE NOW · DEDUCT LATER', [it('≠', "YOU DON'T HAVE TO DEDUCT IN THE YEAR YOU CONTRIBUTE", 'L36', 'deduct'), it('↪', 'UNUSED CONTRIBUTIONS CARRY FORWARD', 'L37', 'carry'), it('≤', "DEDUCT LATER · UP TO THAT YEAR'S LIMIT", 'L37', 'limit')], fxIn='slideL', dimOthers=True, y=240),
 SPLIT('L38', 'NOOR · SAME $10,000 CONTRIBUTION', 'EXAMPLE AT 2026 ONTARIO RATES', [{'name': 'DEDUCT NOW · AT $45,000', 'value': D['noor_now']}, {'name': 'DEDUCT LATER · AT $90,000', 'value': D['noor_later']}, {'name': 'EXTRA SAVING', 'value': D['noor_gain']}],
       [W('L40', 'now'), W('L41', 'saves'), W('L42', 'Nine')], 'SAME MONEY ALREADY INVESTED IN THE PLAN', fxIn='glass'),
 ST('L43', 'BEN · AND YOU', [it('BEN', 'KEEP THE DEDUCTION FOR A YEAR WITH REAL TAX', 'L43', 'keep'), it('✓', 'CONTRIBUTING STILL WORKS · MONEY STILL INVESTED', 'L44', 'invested'), it('S7', 'SCHEDULE 7 TRACKS UNUSED CONTRIBUTIONS', 'L45', 'Schedule')], fxIn='slideR', dimOthers=True, y=240),
 K('L46', [dc('THE OTHER HALF', 140, 'L46', 'other')], kicker='06', fxIn='focus', fxOut='wipe', y=330),
 ST('L47', 'TAX MOVES · IT DOESN\'T DISAPPEAR', [it('+', 'WITHDRAWAL = INCOME IN THAT YEAR', 'L48', 'added'), it('%', 'TAX WITHHELD WHEN YOU WITHDRAW', 'L48', 'withheld'), it('↩', 'YOUR RETURN SETTLES THE REST', 'L48', 'settles')], fxIn='glass', dimOthers=True, y=240),
 SPLIT('L49', 'KATE · $10,000 IN, $10,000 OUT', 'EXAMPLE · 2026 ONTARIO RATES · ROUGH', [{'name': 'SAVED AT $110,000', 'value': Pp['Kate']['saving']}, {'name': 'TAX OUT · INCOME ≈$45,000', 'value': D['kate_wd45']}, {'name': 'AHEAD ON TAX', 'value': D['kate_net']}, {'name': 'TAX OUT · STILL $110,000', 'value': D['kate_wd110']}],
       [W('L49', 'saved'), W('L50', 'roughly'), W('L51', 'ahead'), W('L52', 'pulls')], 'WITHDRAWN IN A HIGH-INCOME YEAR: MORE THAN SHE SAVED', fxIn='slideL'),
 K('L55', [ln('WHEN DOES IT REDUCE YOUR TAX?', 72, 'L55', 'when'), ln('RATE WHEN YOU DEDUCT > RATE WHEN YOU WITHDRAW', 54, 'L56', 'higher', gold=True), ln('LOW NOW, HIGHER LATER → DEDUCT LATER', 46, 'L57', 'Low')], kicker='07', fxIn='glass', y=300),
 ST('L58', 'YOUR RRSP CHECKLIST', [it('1', 'FIND YOUR LIMIT · NOTICE OF ASSESSMENT', 'L59', 'One'), it('2', 'KNOW YOUR TOP RATE · NOT JUST YOUR SALARY', 'L60', 'Two'), it('3', 'LOW INCOME? SAVE THE DEDUCTION FOR LATER', 'L61', 'Three'), it('4', 'PLAN WITHDRAWALS FOR LOW-INCOME YEARS', 'L62', 'Four')], fxIn='stagger', dimOthers=True, y=200),
 K('L63', [dc('WHAT DID WE LEARN?', 140, 'L63', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L64', 'THE RRSP · 4 RULES', [it('1', 'SAVES TAX AT YOUR TOP RATE', 'L64', 'One'), it('2', 'YOU CHOOSE WHEN TO DEDUCT', 'L65', 'Two'), it('3', "IT'S A DEFERRAL", 'L66', 'Three'), it('4', 'RATE TODAY > RATE LATER = IT PAYS', 'L67', 'Four')], fxIn='glass', dimOthers=True, y=200),
 K('L68', [mo([{'text': 'THE RRSP · REAL NUMBERS', 't': 0}, {'text': 'CAPITAL GAINS · A REAL EXAMPLE', **W('L68', 'capital')}], 100, 'L68', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L68', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Same RRSP, five different refunds'), ('L8', '01 · What a deduction does'), ('L17', '02 · Five people'), ('L25', '03 · The surprise'), ('L32', '04 · Ben'),
  ('L35', '05 · Deduct later'), ('L46', '06 · The other half'), ('L55', '07 · When it works'), ('L58', 'Checklist'), ('L63', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L8', 's6', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L17', 's3', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L25', 's3', cam((30, 0, 0.0), (-30, 0, 0.25))),
     ('L32', 's5', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L35', 's2', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L46', 's4', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L55', 's4', cam((-30, 0, 0.0), (30, 0, 0.2))),
     ('L58', 's6', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L63', 's1', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
sfx.append({'name': 'tick', 'vol': 0.2, **h['riseAt']})
sfx.append({'name': 'whoosh', 'vol': 0.22, **h['pairAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = ['SAME $10,000 RRSP · SAVINGS FROM $853 TO $4,479', 'RRSP LIMIT 2026: 18% OF EARNED INCOME, MAX $33,810', 'UNUSED CONTRIBUTIONS CAN BE DEDUCTED LATER', f"NOOR: DEDUCT LATER → +{m(D['noor_gain'])}", 'WITHDRAWALS ARE TAXED AS INCOME', 'EXAMPLES · 2026 · ONTARIO']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA RRSP deduction limit and 2026 dollar limit; unused RRSP contributions (Schedule 7, line 20800); T4040 RRSPs and other registered plans · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf20/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
