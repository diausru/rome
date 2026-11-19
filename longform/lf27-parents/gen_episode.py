import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L8", "L14", "L23", "L35", "L42", "L51", "L58", "L61", "L63", "L69"}
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
PL = 'lf/lf27/plates/'
D = d
MS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
rows = [{'d': f'{x} 01', 'label': 'E-TRANSFER TO MOM', 'amt': '−$500.00'} for x in MS]
events = [
 scene('L1', P('ledger', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.78}, kicker='MAYA · SUPPORTS HER MOTHER · THE 2025 TAX YEAR', title='$6,000 SENT. TAX CREDIT?',
   rows=rows, rowsAt=W('L1', None, -0.6), step=0.42, total=D['year_sent'], totalLabel='SENT TO MOM · 2025',
   stampAt=W('L2', 'zero'), stampText='TAX CREDIT: $0', wordAt=W('L3', 'word'), chip='ONE WORD ?', flipAt=W('L3', 'thousand'), flipText=f"≈{m(D['cca_credit'])}", flipSub='FEDERAL CREDIT · 2025',
   qAt=W('L5', 'support'), question="WHAT'S THE WORD?", out=W('L7', None, -0.9)), off=-1.0),
 K('L7', [ln('THE 2025 TAX YEAR · FEDERAL AMOUNTS · ONTARIO', 46, 'L7'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L7', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L8', [dc('THE MISTAKE', 150, 'L8', 'mistake')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L9', 'SUPPORTING A PARENT', [it('$', 'RENT · GROCERIES · BILLS → MONEY ALONE DOESN\'T DO IT', 'L9', 'alone'), it('WHO', 'CREDITS DEPEND ON WHO THEY ARE AND THEIR SITUATION', 'L10', 'situation'),
   it('≠', 'NOT ON HOW MUCH YOU SENT', 'L10', 'sent'), it('?', 'AN IMPAIRMENT THAT MAKES THEM DEPEND ON YOU?', 'L12', 'impairment')], fxIn='glass', dimOthers=True, y=220),
 K('L13', [ln("THAT'S THE WORD", 60, 'L13'), dc('IMPAIRMENT', 160, 'L13', 'Impairment')], fxIn='glass', y=330),
 K('L14', [dc('THE CAREGIVER CREDIT', 120, 'L14', 'credit')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 ST('L15', 'CANADA CAREGIVER AMOUNT · LINE 30450', [it('18+', 'AGE 18 OR OLDER', 'L17', 'eighteen'), it('✚', 'MENTAL OR PHYSICAL INFIRMITY', 'L17', 'infirmity'), it('→', 'DEPENDS ON YOU FOR SUPPORT · A CONSIDERABLE PERIOD', 'L17', 'considerable'),
   it('✕', 'A TEMPORARY ILLNESS OR INJURY DOESN\'T COUNT', 'L18', 'temporary'), it('FAMILY', 'PARENT · GRANDPARENT · CHILD · SIBLING · AUNT · UNCLE · NIECE · NEPHEW', 'L19', 'family'), it('!', 'PARENTS: NO IMPAIRMENT → NO CLAIM ON THIS LINE', 'L20', 'clear')], fxIn='slideR', dimOthers=True, y=150),
 K('L21', [ln("MAYA'S MOTHER · 74", 70, 'L21'), ln('ARTHRITIS · DEPENDS ON MAYA EVERY DAY', 52, 'L21', 'depends', gold=True)], fxIn='glass', y=330),
 K('L23', [dc('HOW MUCH?', 150, 'L23', 'worth')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 ST('L24', 'THE CAREGIVER AMOUNT · 2025', [it(m(D['cca_max']), 'MAXIMUM PER DEPENDANT', 'L24', 'maximum'), it('CREDIT', 'NOT A DEDUCTION · NON-REFUNDABLE', 'L25', 'non'), it('↓', 'A CREDIT LOWERS YOUR TAX · DOWN TO ZERO, NOT BELOW', 'L26', 'directly'),
   it('14.5%', '2025 FEDERAL CREDIT RATE · 15% → 14% FROM JULY 1', 'L27', 'fourteen')], fxIn='glass', dimOthers=True, y=200),
 K('L28', [ln(f"{m(D['cca_max'])} × 14.5%", 90, 'L28'), mo([{'text': '= ?', 't': 0}, {'text': f"≈{m(D['cca_credit'])} OFF FEDERAL TAX", **W('L29', 'thousand')}], 100, 'L28', gold=True)], fxIn='glass', y=320),
 ST('L30', "THE PARENT'S INCOME", [it('↓', 'THE AMOUNT SHRINKS AS THEIR NET INCOME RISES', 'L31', 'smaller'), it('23600', 'NET INCOME = LINE 23600 · OR WHAT IT WOULD BE', 'L32', 'line'),
   it(m(D['dep_limit']), 'OR MORE → NOTHING (2025)', 'L33', 'gone'), it('✓', 'EXAMPLE: SMALL PENSION · ASSUME THE FULL AMOUNT', 'L34', 'assume')], fxIn='slideL', dimOthers=True, y=220),
 K('L35', [dc('BROTHER + SISTER', 130, 'L35', 'brother')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L36', 'SPLITTING THE CLAIM · 2025', 'TOGETHER: NEVER MORE THAN THE MAXIMUM', [{'name': f"MAXIMUM · {m(D['cca_max'])}", 'value': D['cca_max']}, {'name': 'MAYA · HALF', 'value': D['cca_max'] / 2}, {'name': 'BROTHER · HALF', 'value': D['cca_max'] / 2}],
   [W('L36', 'maximum'), W('L37', 'half'), W('L37', 'each')], f"EACH SAVES ≈{m(D['split_each'])} · NOT DOUBLE · THE SAME AMOUNT, SHARED", fxIn='glass', labelW=600),
 K('L39', [ln('ALREADY CLAIMED ON LINE 30300 OR 30400?', 56, 'L39'), ln('→ NO CAREGIVER LINE FOR THEM', 64, 'L39', 'nobody', gold=True)], fxIn='glass', y=340),
 K('L40', [ln('MONEY ALONE → $0', 64, 'L40'), ln('IMPAIRMENT + DEPENDENCE → ≈$1,247', 64, 'L40', 'impairment', gold=True), ln('A BIGGER AMOUNT · AND A TRAP', 80, 'L41', 'bigger')], fxIn='glass', y=280),
 K('L42', [dc('THE BIGGER LINE', 140, 'L42', 'single')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L43', 'ELIGIBLE DEPENDANT · LINE 30400', [it('1', 'NO SPOUSE OR PARTNER (OR SEPARATED, NO SUPPORT)', 'L43', 'spouse'), it('⌂', 'YOU LIVED WITH YOUR PARENT · IN A HOME YOU MAINTAINED', 'L44', 'maintained'),
   it('✕', 'ONLY VISITING DOESN\'T COUNT', 'L44', 'visiting'), it(m(D['ed_max']), '2025 MAXIMUM · ALMOST 2× THE CAREGIVER AMOUNT', 'L45', 'sixteen')], fxIn='glass', dimOthers=True, y=220),
 ST('L46', 'THE TRAP', [it('↓', "REDUCED BY YOUR PARENT'S NET INCOME", 'L47', 'reduced'), it('1', 'ONE CLAIM ON THIS LINE PER HOUSEHOLD', 'L48', 'household'), it('OR', 'THIS LINE OR THE CAREGIVER LINE · NOT BOTH', 'L49', 'both'),
   it('MAYA', 'LIVES ALONE · MOTHER ACROSS TOWN → CAREGIVER LINE', 'L50', 'caregiver')], fxIn='slideR', dimOthers=True, y=220),
 K('L51', [dc('YOUR PROVINCE', 140, 'L51', 'province')], kicker='06', fxIn='focus', fxOut='wipe', y=330),
 ST('L52', 'PROVINCES DIFFER · 2025', [it('ON', 'RELATIVE WITH AN IMPAIRMENT · LIVING WITH YOU OR NOT', 'L53', 'whether'), it('AB', 'YOU HAD TO KEEP A HOME WHERE YOU BOTH ORDINARILY LIVED', 'L54', 'ordinarily'),
   it('ON', 'NET INCOME LIMIT $26,562', 'L56', 'twenty'), it('✓', 'CHECK YOUR OWN PROVINCE', 'L57', 'check')], fxIn='glass', dimOthers=True, y=220),
 K('L58', [dc('MEDICAL BILLS', 140, 'L58', 'spent')], kicker='07', fxIn='focus', fxOut='wipe', y=330),
 K('L59', [ln('MEDICAL EXPENSES FOR A DEPENDANT', 70, 'L59'), ln('LINE 33199', 90, 'L59', 'line', gold=True), ln('ONLY WHAT NOBODY PAID YOU BACK', 50, 'L60', 'nobody')], fxIn='glass', y=310),
 K('L61', [dc('MISSED PAST YEARS?', 120, 'L61', 'missed'), ln('ASK THE CRA TO CHANGE A PAST RETURN', 56, 'L62', 'change'), ln('ReFILE ONLINE · 2022–2025 RETURNS', 56, 'L62', 'ReFILE', gold=True)], fxIn='glass', y=300),
 ST('L63', "MAYA'S CHECKLIST · AND YOURS", [it('1', 'AN IMPAIRMENT THAT MAKES THEM DEPEND ON YOU?', 'L64', 'One'), it('2', f"THEIR NET INCOME UNDER {m(D['dep_limit'])} (2025)", 'L65', 'Two'), it('3', 'SINGLE + LIVING TOGETHER? COMPARE LINE 30400', 'L66', 'Three'),
   it('4', 'SIBLINGS: SPLIT · NEVER PAST THE MAXIMUM', 'L67', 'Four'), it('5', 'CHECK YOUR PROVINCE · KEEP MEDICAL RECEIPTS', 'L68', 'Five')], fxIn='stagger', dimOthers=True, y=180),
 K('L69', [dc('WHAT DID WE LEARN?', 140, 'L69', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L70', 'SUPPORTING PARENTS · 4 RULES', [it('1', 'MONEY ALONE IS NOT A CREDIT', 'L70', 'One'), it('2', f"IMPAIRMENT + DEPENDENCE · UP TO {m(D['cca_max'])}", 'L71', 'Two'), it('3', f"× 14.5% ≈ {m(D['cca_credit'])} (2025)", 'L72', 'Three'),
   it('4', 'SINGLE + LIVING TOGETHER → A BIGGER LINE · ONE PER HOUSEHOLD', 'L73', 'Four')], fxIn='glass', dimOthers=True, y=200),
 K('L74', [mo([{'text': 'SUPPORTING YOUR PARENTS', 't': 0}, {'text': 'BENEFITS AGING PARENTS MISS', **W('L74', 'benefits')}], 96, 'L74', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L74', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', '$6,000 sent, $0 credit'), ('L8', '01 · The mistake'), ('L14', '02 · The caregiver credit'), ('L23', '03 · How much it is worth'), ('L35', '04 · Splitting with siblings'),
  ('L42', '05 · The bigger line (and the trap)'), ('L51', '06 · Your province'), ('L58', '07 · Medical bills'), ('L61', '08 · Missed past years'), ('L63', 'Checklist'), ('L69', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L8', 's1', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L14', 's2', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L23', 's3', cam((30, 0, 0.0), (-30, 0, 0.25))),
     ('L35', 's4', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L42', 's5', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L51', 's5', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L58', 's3', cam((50, 0, 0.12), (-50, 0, 0.12))),
     ('L63', 's2', cam((-30, 0, 0.0), (30, 0, 0.2))), ('L69', 's6', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
for k in range(12): sfx.append({'name': 'tick', 'vol': 0.07, 'at': 'L1', 'off': -0.6 + 0.42 * k})
sfx.append({'name': 'thump', 'vol': 0.3, **h['stampAt']})
sfx.append({'name': 'whoosh', 'vol': 0.22, **h['flipAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"MAYA · $6,000 SENT IN 2025 · MONEY ALONE = $0 CREDIT", f"CAREGIVER AMOUNT 2025: UP TO {m(D['cca_max'])} · ≈{m(D['cca_credit'])} FEDERAL", f"PARENT'S NET INCOME UNDER {m(D['dep_limit'])}", f"LINE 30400 · 2025 MAX {m(D['ed_max'])} · ONE PER HOUSEHOLD", 'CHECK YOUR PROVINCE', 'EXAMPLES · 2025']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA: line 30450 Canada caregiver amount; line 30400 eligible dependant; Schedule 5 (2025); lines 33099/33199; Ontario and Alberta tax information 2025; Finance Canada (14.5% for 2025); NETFILE/ReFILE · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf27/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
