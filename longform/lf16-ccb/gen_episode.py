import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L6", "L13", "L21", "L27", "L31", "L35", "L37", "L42"}
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
PL = 'lf/lf16/plates/'
D = d
events = [
 scene('L1', P('ccb', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.64}, kicker='ONE CHILD UNDER 6 · JULY 2026 – JUNE 2027', title='SAME FAMILY. SAME INCOME.', finishTitle='ONE CHANGE ON THE RETURN',
   before=D['ccb_before'], after=D['ccb_after'], tax=D['tax_saving'], total=D['total'], incFrom=70000, incTo=60000, lo=38237, hi=82847,
   showAt=W('L1'), moveAt=W('L2', 'change'), totalAt=W('L3', 'three'), qAt=W('L4', 'calculated'), question='HOW IS YOUR CCB REALLY CALCULATED?', out=W('L5', None, -0.9)), off=-1.0),
 K('L5', [ln('CCB JULY 2026 – JUNE 2027 · ONTARIO · 2026 RATES', 44, 'L5'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L5', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L6', [dc('HOW THE CCB IS CALCULATED', 110, 'L6', 'calculated')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L7', 'CANADA CHILD BENEFIT · 2026–27', [it('$0 TAX', 'TAX-FREE MONTHLY PAYMENT · UNDER 18', 'L7', 'tax-free'), it('<6', f"MAX {m(D['max'])} / YEAR · $679.75 / MONTH", 'L8', 'eight'), it('6–17', 'MAX $6,883 / YEAR', 'L9', 'six'), it('↓', 'SHRINKS AS INCOME RISES', 'L10', 'shrinks')], fxIn='glass', dimOthers=True, y=200),
 K('L11', [ln('NOT YOUR SALARY', 90, 'L11', 'salary'), ln('ADJUSTED FAMILY NET INCOME · LAST YEAR', 56, 'L11', 'adjusted', gold=True), ln('2026–27 BENEFIT ← 2025 INCOME', 46, 'L12', 'twenty')], kicker='THE KEY', fxIn='glass', y=300),
 K('L13', [dc('THE REDUCTION', 140, 'L13', 'reduction')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 ST('L14', 'HOW IT SHRINKS · 2026–27', [it('LINE', f"FAMILY NET INCOME ABOVE {m(D['t1'])}", 'L14', 'thirty-eight'), it('7%', f"ONE CHILD · UP TO {m(D['t2'])}", 'L15', 'seven'), it('19%', 'THREE CHILDREN', 'L16', 'nineteen')], fxIn='slideR', dimOthers=True, y=260),
 SPLIT('L17', "SARA'S CCB · ONE CHILD UNDER 6", 'FAMILY NET INCOME $70,000', [{'name': 'MAXIMUM', 'value': D['max']}, {'name': 'REDUCTION 7% × $31,763', 'value': 2223}, {'name': 'SARA RECEIVES', 'value': D['ccb_before']}],
       [W('L17', 'Sara'), W('L17', 'reduction'), W('L18', 'five')], 'EVERY $1,000 OF NET INCOME = −$70', fxIn='glass'),
 K('L19', [ln('−$1,000 OF NET INCOME', 76, 'L20', 'take'), ln('+$70 CCB · ONE CHILD', 80, 'L20', 'seventy', gold=True), ln('+$190 CCB · THREE CHILDREN', 64, 'L20', 'three')], kicker='AND THE REVERSE', fxIn='glass', y=310),
 K('L21', [dc('LEVER 1 · THE RRSP', 130, 'L21', 'R')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L23', 'SARA PUTS $10,000 IN HER RRSP', 'NET INCOME $70,000 → $60,000', [{'name': 'CCB BEFORE', 'value': D['ccb_before']}, {'name': 'CCB AFTER', 'value': D['ccb_after']}, {'name': 'INCOME TAX SAVED', 'value': D['tax_saving']}, {'name': 'TOTAL GAIN', 'value': D['total']}],
       [W('L23', 'contributes'), W('L24', 'six'), W('L25', 'two'), W('L26', 'Together')], 'THE $10,000 IS STILL HERS, IN THE RRSP', fxIn='slideL'),
 K('L27', [dc('THE CCB LOOKS BACK', 120, 'L27', 'back')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 ST('L28', 'THE TIMING', [it('2026', 'RRSP FOR 2026 → LOWER 2026 NET INCOME', 'L28', 'contribution'), it('JUL 2027', 'HIGHER CCB FROM JULY 2027', 'L28', 'July'), it('≈', 'THRESHOLDS UPDATED EVERY JULY', 'L29', 'thresholds'), it('×3', f"THREE CHILDREN: ≈ +{m(D['gain3'])} CCB + THE TAX SAVING", 'L30', 'three')], fxIn='glass', dimOthers=True, y=200),
 ST('L31', 'MORE LEVERS', [it('2', 'CHILD CARE · UNION DUES · OTHER DEDUCTIONS', 'L31', 'Child'), it('3', 'BOTH PARTNERS FILE · EVERY YEAR · EVEN AT $0', 'L32', 'file'), it('!', 'A MISSING RETURN CAN STOP PAYMENTS', 'L33', 'missing'), it('4', 'NEW CHILD · SEPARATION · MOVE · CUSTODY: TELL THE CRA', 'L34', 'current')], fxIn='slideR', dimOthers=True, y=200),
 ST('L35', 'WHERE THIS CHANGES', [it('PROV', 'PROVINCIAL CHILD BENEFITS · OWN RULES', 'L35', 'Provinces'), it(f"{m(D['t2'])}+", 'DIFFERENT REDUCTION ABOVE IT', 'L35', 'Above'), it('CDB', 'CHILD DISABILITY BENEFIT · EXTRA', 'L35', 'disability'), it('CRA', 'YOUR EXACT AMOUNT: MY ACCOUNT', 'L36', 'My')], fxIn='glass', dimOthers=True, y=200),
 ST('L37', 'YOUR CCB CHECKLIST', [it('1', "FIND LAST YEAR'S FAMILY NET INCOME", 'L38', 'Find'), it('2', f"{m(D['t1'])}–{m(D['t2'])}: DEDUCTIONS RAISE CCB", 'L39', 'deduction'),
   it('3', 'RRSP ROOM · CHILD CARE · OTHER DEDUCTIONS', 'L40', 'Use'), it('4', 'BOTH PARTNERS FILE ON TIME', 'L41', 'Both')], fxIn='stagger', dimOthers=True, y=200),
 K('L42', [dc('WHAT DID WE LEARN?', 140, 'L42', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L43', 'THE CCB · 3 RULES', [it('1', 'NET INCOME, NOT SALARY', 'L43', 'net'), it('2', 'A DEDUCTION PAYS TWICE: TAX + BENEFIT', 'L44', 'twice'), it('3', 'IT ARRIVES THE FOLLOWING JULY', 'L45', 'July')], fxIn='glass', dimOthers=True, y=240),
 K('L46', [mo([{'text': 'MORE CCB', 't': 0}, {'text': 'CREDIT vs DEDUCTION', **W('L46', 'credits')}], 100, 'L46', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L46', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Same family, one change'), ('L6', '01 · How the CCB is calculated'), ('L13', '02 · The reduction'), ('L21', '03 · Lever 1: the RRSP'), ('L27', '04 · The timing'),
  ('L31', 'More levers'), ('L35', 'Where this changes'), ('L37', 'Checklist'), ('L42', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L6', 's4', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L13', 's2', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L21', 's6', cam((0, 30, 0.0), (0, -30, 0.25))),
     ('L27', 's3', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L31', 's5', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L35', 's2', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L37', 's6', cam((-30, 0, 0.0), (30, 0, 0.2))), ('L42', 's3', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
for k in ('showAt', 'moveAt', 'totalAt'): sfx.append({'name': 'whoosh' if k == 'moveAt' else 'tick', 'vol': 0.2, **h[k]})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"CCB 2026–27 · UNDER 6: MAX {m(D['max'])} · 6–17: MAX $6,883", f"REDUCTION STARTS ABOVE {m(D['t1'])} OF FAMILY NET INCOME", f"ONE CHILD: −$70 PER $1,000 · THREE: −$190", f"SARA: RRSP $10,000 → +{m(D['ccb_gain'])} CCB + {m(D['tax_saving'])} TAX = {m(D['total'])}", 'BOTH PARTNERS FILE EVERY YEAR', 'EXAMPLES · 2026']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA Canada child benefit: how much you can get (July 2026 – June 2027), T4114 · T4127 (2026) · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf16/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
