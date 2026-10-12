"""LF-05 Disability Tax Credit — full episode. Collage hook, glass panels with running borders, ticker, pulsing numbers."""
import json
L = json.load(open('lines.json'))
CH = {'L3', 'L11', 'L19', 'L24', 'L30', 'L33', 'L36', 'L40', 'L43', 'L46', 'L49', 'L51'}
vo = [{'id': k, 'file': f'vo/{k}.mp3', 'gap': 1.0 if k in CH else 0.35, 'text': t} for k, t in L]
def W(at, word=None, off=0):
    d = {'at': at}
    if word: d['word'] = word
    if off: d['off'] = off
    return d
def P(type, x, y, w, at, word=None, **kw):
    d = {'type': type, 'x': x, 'y': y, 'w': w, 'at': at}
    if word: d['word'] = word
    d.update(kw); return d
def scene(at, *panels, **kw): return {'at': at, 'type': 'scene', 'panels': list(panels), **kw}
D = lambda path: {'ref': f'd.{path}'}
def K(at, lines, kicker=None, fxIn='glass', fxOut='vapor', y=300, **kw):
    return scene(at, P('khero', 160, y, 1600, at, glass=False, fxIn=fxIn, fxOut=fxOut, lines=lines, **({'kicker': kicker} if kicker else {}), **kw))
def ln(text, size=90, at=None, word=None, off=0, **kw): return {'text': text, 'size': size, **(W(at, word, off) if at else {}), **kw}
def mo(seq, size=110, at=None, gold=False): return {'anim': 'morph', 'size': size, 'gold': gold, 'seq': seq, **W(at)}
def dc(text, size=110, at=None, word=None, gold=True): return {'anim': 'decode', 'text': text, 'size': size, 'gold': gold, **W(at, word)}
def ST(at, title, items, x=260, y=170, w=1400, fxIn='sweep', fxOut='collapse', **kw):
    return scene(at, P('steps', x, y, w, at, fxIn=fxIn, fxOut=fxOut, title=title, items=[{**it} for it in items], **kw))
def it(n, head, at, word=None, text=None):
    d = {'n': n, 'head': head, 'at': at}
    if word: d['word'] = word
    if text: d['text'] = text
    return d
PL = 'lf/lf05/plates/'
events = [
 # HOOK
 scene('L1', P('collage', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.7},
   tiles=[{'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'x': 40, 'y': 70, 'w': 700, 'h': 400, 'rot': -4, 'enter': 'drop', 'delay': 0.12, 'enterDur': 1.0, 'move': 'dolly'},
          {'src': PL + 'c1.jpg', 'depth': PL + 'c1_d.png', 'x': 1330, 'y': 50, 'w': 520, 'h': 400, 'rot': 5, 'enter': 'drop', 'delay': 0.38, 'enterDur': 1.0, 'move': 'truck'},
          {'src': PL + 'c2.jpg', 'depth': PL + 'c2_d.png', 'x': 1300, 'y': 755, 'w': 540, 'h': 310, 'rot': -4, 'enter': 'slideR', 'delay': 0.7, 'move': 'orbit'},
          {'src': PL + 'c3.jpg', 'depth': PL + 'c3_d.png', 'x': 60, 'y': 755, 'w': 540, 'h': 310, 'rot': 4, 'enter': 'pop', 'delay': 0.95, 'move': 'rise'}],
   kicker='DISABILITY TAX CREDIT · CANADA', stat='$16,052', statLabel='2025 DISABILITY AMOUNT · CHILD UNDER 18', statSize=225,
   question='WHO QUALIFIES — AND WHY DO SOME CLAIMS GET DENIED?', cy=255,
   stamp={'text': 'UP TO 10 YEARS BACK', 'x': 700, 'y': 870, 'rot': -6, 'size': 52}, out=W('L2', None, -0.5)), off=-1.0),
 ST('L2', 'IN THIS VIDEO', [it('1', 'WHO ACTUALLY QUALIFIES', 'L2', 'qualifies'), it('2', 'WHO CAN SIGN THE FORM', 'L2', 'sign'), it('3', 'HOW THE APPLICATION WORKS', 'L2', 'application'), it('4', 'WHAT TO DO IF THE ANSWER IS NO', 'L2', 'answer')], fxIn='glass', dimOthers=True, y=220),
 K('L3', [ln('EVERY RULE: CRA PAGES', 74, 'L3'), dc('CHECKED OCTOBER 2026', 110, 'L3', 'checked'), ln('GENERAL INFO · NOT ADVICE', 50, 'L3', 'general')], kicker='THE SOURCES', fxIn='wipe'),
 # 01
 K('L4', [mo([{'text': 'MEET MARIA', 't': 0}, {'text': '+ LIAM, 15', **W('L4', 'Liam')}], 140, 'L4', gold=True), ln('AN EXAMPLE FAMILY · NOT A REAL CASE', 50, 'L4', 'example')], kicker='CHAPTER 1 · WHAT THE CREDIT IS', fxIn='morph', fxOut='wipe'),
 K('L5', [mo([{'text': 'NOT A CHEQUE', 't': 0}, {'text': 'A TAX CUT', **W('L5', 'non-refundable')}], 150, 'L5', gold=True), ln('NON-REFUNDABLE · REDUCES INCOME TAX OWED', 50, 'L5', 'reduces')], kicker='MYTH #1', fxOut='particles'),
 scene('L6', P('split', 260, 300, 1400, 'L6', fxIn='slideR', fxOut='vapor', title='DISABILITY AMOUNT · 2025', sub='CRA · CLAIMING THE CREDIT', items=D('items'), labelW=560, fs=34, vs=46, noTotal=True,
   note='AN AMOUNT THAT REDUCES TAX · NOT A PAYMENT', rowAt=[W('L6', 'ten'), W('L7', 'Sixteen')])),
 ST('L8', 'THE CALCULATION · 2025', [it('1', 'DISABILITY AMOUNT: $10,138', 'L8', 'adult'), it('×', 'FEDERAL CREDIT RATE: 14.5%', 'L8', 'fourteen', 'Lowest federal rate for 2025 (14% from 2026)'),
   it('=', '≈ $1,470 LESS FEDERAL TAX', 'L8', 'one thousand'), it('+', 'PROVINCIAL CREDIT ON TOP', 'L8', 'province', 'Amount depends on your province')], fxIn='glass', dimOthers=False),
 K('L9', [mo([{'text': 'LIAM: NO INCOME', 't': 0}, {'text': 'NO TAX TO CUT?', **W('L9', 'So')}], 130, 'L9')], kicker='THE PROBLEM', fxIn='focus', fxOut='wipe'),
 ST('L10', 'TRANSFER TO A SUPPORTING FAMILY MEMBER', [it('1', 'UNUSED PART CAN BE TRANSFERRED', 'L10', 'transferred'), it('2', 'PARENT · SPOUSE · CHILD · GRANDPARENT · SIBLING …', 'L10', 'parent'),
   it('3', 'TEST: FOOD, SHELTER OR CLOTHING', 'L11', 'Food', 'The person depends on them for at least one basic necessity'), it('✓', 'MARIA CLAIMS IT ON HER RETURN', 'L11', "That's")], fxIn='wipe', dimOthers=True),
 # 02
 K('L12', [ln('CHAPTER 2', 60, 'L12'), dc('3 ROUTES TO QUALIFY', 130, 'L12', 'three'), ln('EACH CERTIFIED BY A MEDICAL PRACTITIONER', 48, 'L12', 'medical')], fxIn='morph', fxOut='particles'),
 ST('L13', 'ROUTE 1 · MARKED RESTRICTION', [it('8', 'WALKING · MENTAL · DRESSING · FEEDING · ELIMINATING · HEARING · SPEAKING · VISION', 'L13', 'Walking'),
   it('3×', 'UNABLE, OR 3× LONGER', 'L14', 'three', 'Than someone of similar age, even with therapy, medication and devices'), it('90%', 'ALL OR ALMOST ALL OF THE TIME', 'L15', 'ninety')], fxIn='glass', dimOthers=True),
 ST('L16', 'ROUTES 2 + 3', [it('2', 'CUMULATIVE EFFECT', 'L16', 'cumulative', '2+ significant limitations = as severe as 1 marked restriction'),
   it('3', 'LIFE-SUSTAINING THERAPY', 'L17', 'Therapy', 'At least 2 times a week · average 14 hours a week')], fxIn='slideL', dimOthers=True),
 K('L18', [dc('12 MONTHS', 190, 'L18', 'twelve'), ln('LASTED OR EXPECTED TO LAST · IN A ROW', 52, 'L18', 'months')], kicker='EVERY ROUTE', fxOut='wipe'),
 K('L19', [mo([{'text': 'NOT THE DIAGNOSIS', 't': 0}, {'text': 'THE EFFECTS ON DAILY LIFE', **W('L19', 'effects')}], 110, 'L19', gold=True)], kicker='WHAT CRA LOOKS AT', fxIn='glass', fxOut='particles'),
 # 03
 K('L20', [ln('CHAPTER 3', 60, 'L20'), dc('WHO SIGNS PART B?', 140, 'L20', 'fills')], fxIn='morph', fxOut='wipe'),
 ST('L21', 'MEDICAL PRACTITIONERS WHO CAN CERTIFY', [it('ALL', 'MEDICAL DOCTOR · NURSE PRACTITIONER', 'L21'),
   it('1', 'OPTOMETRIST → VISION · AUDIOLOGIST → HEARING', 'L22', 'optometrist'), it('2', 'SPEECH-LANGUAGE PATHOLOGIST → SPEAKING · PSYCHOLOGIST → MENTAL', 'L22', 'speech'),
   it('3', 'PHYSIOTHERAPIST → WALKING', 'L23'), it('4', 'OCCUPATIONAL THERAPIST → WALKING · FEEDING · DRESSING', 'L23', 'occupational')], x=200, w=1520, y=150, fxIn='stagger', dimOthers=True),
 K('L24', [ln('PICK THE ONE WHO KNOWS THE DAILY EFFECTS', 64, 'L24'), dc('FORM FEE → MEDICAL EXPENSE?', 104, 'L24', 'fee'), ln('MAY BE CLAIMABLE · LINES 33099 / 33199', 46, 'L24', 'medical')], fxOut='vapor'),
 # 04
 ST('L25', 'THE 2-PART APPLICATION', [it('A', 'PART A: YOU · CRA ACCOUNT OR PHONE', 'L26', 'Part', 'Both parts the same way: digital + digital, or paper + paper'),
   it('#', 'REFERENCE NUMBER · 12 MONTHS · USED ONCE', 'L27', 'twelve'), it('B', 'PART B: PRACTITIONER ONLY', 'L28', 'Part', "If the applicant fills it out, it won't be processed"),
   it('→', 'SUBMITTED TO CRA AUTOMATICALLY', 'L28', 'automatically')], fxIn='glass', dimOthers=True),
 ST('L29', '2 DETAILS THAT SAVE TIME', [it('1', 'NAME THE FAMILY MEMBER WHO CLAIMS', 'L29', 'name'), it('2', 'TICK: ADJUST PREVIOUS YEARS', 'L29', 'tick')], fxIn='slideR', dimOthers=True, y=260),
 K('L30', [mo([{'text': 'APPLY ANY TIME', 't': 0}, {'text': 'APPLY BEFORE YOU FILE', **W('L30', 'So')}], 130, 'L30', gold=True), ln('SENT WITH THE RETURN? THE RETURN WAITS', 50, 'L30', 'reviews')], kicker='TIMING', fxOut='particles'),
 # 05
 ST('L31', 'WHAT CHANGED IN 2026', [it('JUL 14', 'NO DTC VIA "SUBMIT DOCUMENTS"', 'L32', 'July', 'Digital form, or mail'),
   it('SEP 8', 'PRE-2023 T2201 NOT ACCEPTED', 'L33', 'September', 'Old form → new application')], fxIn='wipe', dimOthers=True, y=240),
 # 06-07
 ST('L34', 'CRA REVIEW', [it('1', "BASED ON THE PRACTITIONER'S INFORMATION", 'L34', 'based'), it('60', 'BUSINESS DAYS TO ANSWER A CRA LETTER', 'L35', 'sixty', 'You are told in writing'),
   it('4', 'TRACKER: RECEIVED · IN PROGRESS · INFO REQUESTED · COMPLETED', 'L36', 'received')], fxIn='focus', dimOthers=True),
 ST('L37', 'NOTICE OF DETERMINATION', [it('✓', 'APPROVED · PERMANENT', 'L37', 'permanently'), it('⏳', 'APPROVED · LIMITED PERIOD', 'L37', 'limited', 'Reminder 1 year ahead · re-apply any time'),
   it('✕', 'DENIED · REASONS EXPLAINED', 'L37', 'denied'), it('!', 'CONDITION IMPROVES? TELL CRA IN WRITING', 'L39', 'improve')], fxIn='stagger', dimOthers=True),
 # 08
 K('L40', [dc('UP TO 10 YEARS BACK', 150, 'L41', 'ten'), ln('IF ELIGIBLE IN EARLIER YEARS BUT NOT CLAIMED', 50, 'L41', 'earlier')], kicker='THE PAST', fxIn='glass', fxOut='wipe'),
 ST('L42', 'CLAIMING PAST YEARS', [it('☑', 'BOX TICKED → CRA REASSESSES', 'L42', 'ticked'), it('✉', 'OR ASK IN WRITING / CHANGE RETURNS ONLINE', 'L42', 'ask'),
   it('$', 'MAY RESULT IN A REFUND', 'L42', 'refund')], fxIn='slideL', dimOthers=True, y=240),
 # 09
 K('L43', [dc('DENIED?', 200, 'L43', 'no')], kicker='CHAPTER 9', fxIn='glass', fxOut='particles', y=330),
 ST('L44', 'IF THE ANSWER IS NO', [it('1', 'READ THE REASONS IN THE NOTICE', 'L44', 'notice'), it('2', 'COMPARE WITH YOUR T2201 + THE CRITERIA', 'L44', 'Compare'),
   it('3', 'REVIEW / NEW INFORMATION', 'L45', 'review'), it('4', 'FORMAL OBJECTION · OR CALL CRA', 'L45', 'objection')], fxIn='wipe', dimOthers=True),
 # 10
 ST('L46', 'DOORS THE CREDIT CAN OPEN', [it('1', 'REGISTERED DISABILITY SAVINGS PLAN', 'L47', 'registered'), it('2', 'CHILD DISABILITY BENEFIT', 'L47', 'child'),
   it('3', 'CWB DISABILITY SUPPLEMENT', 'L47', 'workers'), it('4', 'CANADA DISABILITY BENEFIT', 'L47', 'And the')], fxIn='stagger', dimOthers=True),
 K('L48', [mo([{'text': 'OTHER PROGRAM APPROVED', 't': 0}, {'text': '≠ DTC APPROVED', **W('L48', "doesn't")}], 120, 'L48', gold=True), ln('SEPARATE APPLICATION', 54, 'L48', 'separate')], kicker='IT DOES NOT WORK BACKWARDS', fxOut='vapor'),
 # VERDICT
 ST('L49', "MARIA'S CHECKLIST", [it('1', 'RIGHT PRACTITIONER FOR THE IMPAIRMENT', 'L49', 'right'), it('2', 'DIGITAL FORM · BEFORE TAX TIME', 'L49', 'digital'),
   it('3', 'FAMILY MEMBER NAMED', 'L49', 'family'), it('4', 'PAST-YEARS BOX TICKED', 'L49', 'past'), it('5', 'REFERENCE NUMBER KEPT SAFE', 'L49', 'reference')], fxIn='glass', dimOthers=True, y=150),
 K('L50', [ln('THE CREDIT IS REAL MONEY', 84, 'L50'), dc('ONLY IF SOMEONE APPLIES', 120, 'L50', 'only')], fxIn='morph', fxOut='wipe'),
 K('L51', [mo([{'text': 'CARING FOR A PARENT?', 't': 0}, {'text': 'CAN YOU CLAIM THEM?', **W('L51', 'Can')}], 120, 'L51', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L51', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'The question'), ('L4', '01 · What the credit is'), ('L12', '02 · Who qualifies'), ('L20', '03 · Who signs part B'), ('L25', '04 · The application'),
  ('L31', '05 · What changed in 2026'), ('L34', '06 · Review + decision'), ('L40', '07 · Up to 10 years back'), ('L43', '08 · If denied'), ('L46', '09 · Doors it opens'), ('L49', 'Checklist')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 'c1', 'c2', 'c3']}
plates['s1']['lights'] = [{'x': 83, 'y': 14, 'r': 8, 'color': 'rgba(255,200,130,.9)', 'amp': 0.08}]
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((-40, 10, 0.12), (30, -10, 0.0))), ('L4', 's1', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L6', 's7', cam((-50, 10, 0.2), (40, -10, 0.05))), ('L9', 's6', cam((0, 20, 0.0), (0, -20, 0.22))),
     ('L12', 'c3', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L16', 's4', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L19', 'c2', cam((-30, 0, 0.15), (40, -10, 0.05))), ('L20', 's3', cam((0, 0, 0.0), (0, 0, 0.3))),
     ('L21', 'c1', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L25', 's2', cam((-60, 10, 0.0), (40, -10, 0.15))), ('L29', 's7', cam((10, 0, 0.3), (-10, 0, 0.05))), ('L31', 's8', cam((-40, 0, 0.05), (40, 0, 0.18))),
     ('L34', 's2', cam((40, 0, 0.18), (-40, 0, 0.05))), ('L37', 's5', cam((-40, 10, 0.0), (40, -10, 0.15))), ('L40', 's5', cam((30, 0, 0.05), (-30, 0, 0.2))), ('L43', 's8', cam((-60, 10, 0.2), (60, -10, 0.0))),
     ('L46', 'c3', cam((0, 10, 0.0), (0, -10, 0.3))), ('L49', 's1', cam((40, 10, 0.05), (-40, -10, 0.18))), ('L51', 's6', cam((0, 0, 0.0), (0, -10, 0.25)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{k: v for k, v in r.items() if k in ('at', 'word')}})
for s in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': s['at']})
ticker = ['DISABILITY AMOUNT 2025: $10,138', 'CHILD UNDER 18: $16,052', 'FEDERAL RATE 2025: 14.5%', 'UP TO 10 YEARS BACK', 'MARKED RESTRICTION: 90% OF THE TIME',
          'LIFE-SUSTAINING THERAPY: 14 HOURS A WEEK', 'REFERENCE NUMBER VALID 12 MONTHS', 'PRACTITIONER REPLY: 60 BUSINESS DAYS', 'SOURCE: CANADA REVENUE AGENCY']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: CRA — Disability tax credit pages (eligibility, how to apply, review, decision, claiming) · CRA tax tip June 16 2026 · General info, not advice',
      'data': {'d': {'type': 'file', 'file': 'data.json'}}, 'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker,
      'audio': 'lf/lf05/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1)
print('events', len(events), 'shots', len(shots), 'sfx', len(sfx))
