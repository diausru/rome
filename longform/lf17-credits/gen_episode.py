import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L6", "L11", "L18", "L27", "L30", "L37", "L42", "L47"}
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
PL = 'lf/lf17/plates/'
D = d; N, O, Q = D['nina'], D['omar'], D['priya']
events = [
 scene('L1', P('breaks', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.66}, kicker='SAME TAX BREAK · 2026 · ONTARIO', title='SAME $1,000. WHAT DOES IT SAVE?', finishTitle='CHANGE ONE WORD',
   people=[{'name': 'NINA', 'sub': 'EARNS $14,000', 'ded': N['ded'], 'cred': N['credit']}, {'name': 'OMAR', 'sub': 'EARNS $65,000', 'ded': O['ded'], 'cred': O['credit']}, {'name': 'PRIYA', 'sub': 'EARNS $120,000', 'ded': Q['ded'], 'cred': Q['credit']}],
   valAt=[W('L2', 'Nina'), W('L2', 'Omar'), W('L2', 'Priya')], flipAt=W('L4', 'credit'), qAt=W('L4', 'which'), question='DEDUCTION OR CREDIT: WHICH IS WORTH MORE TO YOU?', out=W('L5', None, -0.9)), off=-1.0),
 K('L5', [ln('2026 · ONTARIO · EMPLOYMENT INCOME', 46, 'L5'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L5', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L6', [dc('WHERE EACH ONE WORKS', 120, 'L6', 'works')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L7', 'THE ORDER OF YOUR RETURN', [it('1', 'INCOME', 'L7', 'Income'), it('2', 'MINUS DEDUCTIONS (E.G. RRSP)', 'L8', 'deduction'), it('3', 'TAX IS CALCULATED', 'L8', 'calculated'), it('4', 'MINUS CREDITS · OFF THE TAX ITSELF', 'L9', 'credit')], fxIn='glass', dimOthers=True, y=200),
 K('L11', [dc('DEDUCTIONS', 150, 'L11', 'deductions')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L12', 'A $1,000 DEDUCTION SAVES…', 'YOUR MARGINAL RATE · 2026 · ONTARIO', [{'name': 'NINA · $14,000', 'value': N['ded']}, {'name': 'OMAR · $65,000', 'value': O['ded']}, {'name': 'PRIYA · $120,000', 'value': Q['ded']}],
       [W('L14', 'Nina'), W('L15', 'Omar'), W('L16', 'Priya')], 'FINANCE CANADA: BIGGER SAVINGS AT HIGHER MARGINAL RATES', fxIn='glass'),
 K('L18', [dc('CREDITS', 150, 'L18', 'credits')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 ST('L19', 'NON-REFUNDABLE CREDITS', [it('×', 'CREDIT AMOUNT × THE LOWEST RATE', 'L19', 'multiplied'), it('14%', 'FEDERAL · 2026', 'L20', 'fourteen'), it('5.05%', 'ONTARIO', 'L20', 'five'), it('=', '$1,000 AMOUNT ≈ $190.50 · SAME FOR OMAR AND PRIYA', 'L21', 'worth')], fxIn='slideR', dimOthers=True, y=200),
 K('L23', [ln("THE CATCH", 110, 'L23', 'catch', gold=True), ln('A NON-REFUNDABLE CREDIT STOPS AT $0 TAX', 54, 'L24', 'zero'), ln('NINA OWES $8 → HER CREDIT IS WORTH $8', 50, 'L25', 'eight')], kicker='MOST PEOPLE MISS THIS', fxIn='glass', y=300),
 K('L27', [ln('REFUNDABLE CREDITS', 96, 'L27', 'refundable', gold=True), ln('PAID EVEN WITH $0 TAX', 60, 'L28', 'paid'), ln('FILE EVERY YEAR', 56, 'L29', 'file')], kicker='THE THIRD KIND', fxIn='glass', y=300),
 SPLIT('L30', 'THE SAME $1,000 · SIDE BY SIDE', 'DEDUCTION vs NON-REFUNDABLE CREDIT AMOUNT', [{'name': 'NINA · DEDUCTION', 'value': N['ded']}, {'name': 'NINA · CREDIT', 'value': 8}, {'name': 'OMAR · DEDUCTION', 'value': O['ded']}, {'name': 'OMAR · CREDIT', 'value': 190}, {'name': 'PRIYA · DEDUCTION', 'value': Q['ded']}, {'name': 'PRIYA · CREDIT', 'value': 190}],
       [W('L31', 'deduction'), W('L31', 'non-refundable'), W('L32', 'deduction'), W('L32', 'credit'), W('L33', 'four'), W('L33', 'same')], 'PAST THE FIRST BRACKET, THE DEDUCTION USUALLY WINS', fxIn='slideL'),
 K('L35', [ln('BONUS: A DEDUCTION LOWERS NET INCOME', 64, 'L35', 'lowers', gold=True), ln('CCB ↑ · OAS CLAWBACK ↓', 60, 'L35', 'Canada'), ln("A CREDIT DOESN'T TOUCH NET INCOME", 48, 'L36', 'touch')], kicker='04', fxIn='glass', y=300),
 ST('L37', 'WHAT YOU CAN DO', [it('1', 'DEDUCTIONS IN HIGHER-INCOME YEARS · RRSP CAN WAIT', 'L38', 'timing'), it('2', 'COUPLES: GIVE CREDITS TO THE PARTNER WHO OWES TAX', 'L39', 'couples'), it('3', 'LITTLE OR NO TAX: REFUNDABLE CREDITS · FILE', 'L40', 'little'), it('≠', 'PROVINCE · INCOME · LIMITS CHANGE THE MATH', 'L41', 'changes')], fxIn='glass', dimOthers=True, y=200),
 ST('L42', 'YOUR CHECKLIST', [it('1', 'MARGINAL RATE = A DEDUCTION\'S VALUE', 'L43', 'marginal'), it('2', 'LOWEST RATE = A CREDIT\'S VALUE', 'L44', 'lowest'), it('3', 'ENOUGH TAX TO USE YOUR CREDITS?', 'L45', 'enough'), it('4', 'FILE EVERY YEAR', 'L46', 'File')], fxIn='stagger', dimOthers=True, y=200),
 K('L47', [dc('WHAT DID WE LEARN?', 140, 'L47', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L48', 'CREDITS vs DEDUCTIONS · 3 RULES', [it('1', 'DEDUCTIONS OFF INCOME · CREDITS OFF TAX', 'L48', 'Deductions'), it('2', 'DEDUCTION GROWS WITH INCOME · CREDIT IS FLAT', 'L49', 'rises'), it('3', 'ONLY REFUNDABLE CREDITS PAY AT $0 TAX', 'L50', 'refundable')], fxIn='glass', dimOthers=True, y=240),
 K('L51', [mo([{'text': 'CREDIT vs DEDUCTION', 't': 0}, {'text': 'A REFUND ≠ LESS TAX', **W('L51', 'refund')}], 100, 'L51', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L51', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Same $1,000, three results'), ('L6', '01 · Where each one works'), ('L11', '02 · Deductions'), ('L18', '03 · Credits'), ('L27', 'Refundable credits'),
  ('L30', 'Side by side'), ('L37', 'What you can do'), ('L42', 'Checklist'), ('L47', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L6', 's5', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L14', 's2', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L15', 's3', cam((0, 30, 0.0), (0, -30, 0.25))), ('L16', 's4', cam((-40, 0, 0.05), (30, 0, 0.18))),
     ('L18', 's5', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L27', 's2', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L30', 's1', cam((-30, 0, 0.0), (30, 0, 0.2))), ('L37', 's3', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L47', 's6', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
for r in h['valAt']: sfx.append({'name': 'tick', 'vol': 0.2, **r})
sfx.append({'name': 'whoosh', 'vol': 0.22, **h['flipAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"$1,000 DEDUCTION SAVES: $14K {m(N['ded'])} · $65K {m(O['ded'])} · $120K {m(Q['ded'])}", '$1,000 NON-REFUNDABLE CREDIT AMOUNT ≈ $190.50 (14% + 5.05%)', 'NON-REFUNDABLE CREDITS STOP AT $0 TAX', 'REFUNDABLE CREDITS PAY EVEN WITH $0 TAX', 'EXAMPLES · 2026 · ONTARIO']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA basic personal amount & how tax is calculated, Finance Canada (tax expenditures, lowest-rate report), T4127 (2026) · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf17/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
