"""Story Ep01 — Maya, $9,800/month, $1,000 every Monday into a TFSA. Story-told style (no host): living illustrated plates
change with the narration; cream paper cards in the right third; part 2 = rules, numbers (L3 timeline, L1 ledger, L4 split), steps."""
import json
L = json.load(open('lines.json')); d = json.load(open('data.json'))
BIG = {'L4', 'L6', 'L17', 'L22', 'L35', 'L40', 'L49', 'L55', 'L59'}
vo = [{'id': i, 'file': f'vo/{i}.mp3', 'gap': 1.0 if i in BIG else 0.4, 'text': t} for i, t in L]
def W(at, word=None, off=0):
    x = {'at': at}
    if word: x['word'] = word
    if off: x['off'] = off
    return x
def P(type, x, y, w, at, word=None, **kw):
    p = {'type': type, 'x': x, 'y': y, 'w': w, 'at': at, 'glass': False}
    if word: p['word'] = word
    p.update(kw); return p
def scene(at, *panels, word=None, **kw):
    e = {'at': at, 'type': 'scene', 'panels': list(panels), **kw}
    if word: e['word'] = word
    return e
def chip(at, lines, kicker=None, word=None, x=1210, y=300, w=640, accent='green', **kw):
    return P('chip', x, y, w, at, word, lines=lines, accent=accent, fxIn='slideR', fxOut='fade', **({'kicker': kicker} if kicker else {}), **kw)
def ln(text, at=None, word=None, size=46, tone=None, **kw):
    x = {'text': text, 'size': size, **kw}
    if tone: x['tone'] = tone
    if at: x.update(W(at, word))
    return x
def roll(v, at=None, word=None, size=84, tone='green', **kw):
    x = {'roll': v, 'size': size, 'tone': tone, **kw}
    if at: x.update(W(at, word))
    return x
def src(at, text, word=None): return P('srctag', 56, 92, 1200, at, word, text='Source: ' + text, fxIn='fade', fxOut='fade')
m = lambda v: '${:,}'.format(round(v))
S1 = 'Source'

events = [
 # ---- HOOK (frame 0 kinetic): night, phone glow
 scene('L1', chip('L1', [ln('$1,000', 'L1', None, 96, 'green'), ln('every Monday → TFSA', 'L1', 'every single', 44), ln('= a penalty waiting', 'L3', 'one percent', 50, 'red')],
                  kicker='Take-home $9,800 / month', y=280, rot=-1.2), off=-0.8),
 scene('L4', P('lower', 56, 860, 1500, 'L4', text='Based on real situations Canadians shared online. Names and numbers changed. General information, not tax advice.', fxIn='fade', fxOut='fade', until=W('L5', 'exactly')),
       chip('L5', [ln('By the end:', 'L5', 'end', 40), ln('what she should do', 'L5', 'should', 50, 'green'), ln('— and what you’d do', 'L5', "you'd", 44)], y=300, word='end')),
 # ---- THE STORY
 scene('L6', chip('L6', [ln('Maya, 27', 'L6', 'Maya', 64), ln('Mississauga', 'L6', 'Mississauga', 40), ln('Job #1 + Job #2', 'L6', 'two good', 50, 'green')], kicker='Year 1 · 2026', y=290)),
 scene('L7', chip('L7', [ln('No kids · single · no car', 'L7', 'No kids', 40)], y=760, x=1210, w=640)),
 scene('L8', P('phone', 1380, 150, 380, 'L8', 'both', title='CHEQUING', balance=9800, balanceSub='take-home this month', rot=5, fxIn='slideUp', fxOut='fade',
               rows=[{'label': 'Job #1 · payroll', 'value': 'deposit', **W('L8', 'both')}, {'label': 'Job #2 · payroll', 'value': 'deposit', **W('L8', 'jobs')}])),
 scene('L9', chip('L9', [ln('Goal: $4,500 / month', 'L9', 'four thousand', 50, 'green'), ln('Rent: $1,500', 'L10', 'Rent', 44), ln('Reality: more', 'L10', 'goes over', 54, 'red')], kicker='The budget', y=280)),
 scene('L11', chip('L11', [ln('Eating out', 'L11', 'Eating', 44, 'red'), ln('Shopping', 'L11', 'Shopping', 44, 'red'), ln('The little things', 'L11', 'little', 44, 'red')], y=330, rot=1)),
 scene('L12', P('phone', 1380, 150, 380, 'L12', 'automatic', title='AUTO-TRANSFER', big='$1,000', balanceSub='every Monday → TFSA', rot=4, fxIn='slideUp', fxOut='fade',
               rows=[{'label': 'Mon · to TFSA', 'value': '$1,000', **W('L12', 'One thousand')}, {'label': 'Mon · to TFSA', 'value': '$1,000', **W('L12', 'every Monday')}, {'label': 'Mon · to TFSA', 'value': '$1,000', **W('L13', 'great')}, {'label': 'Mon · to TFSA', 'value': '$1,000', **W('L13', 'single best')}])),
 scene('L14', chip('L14', [ln('“Not using my income', 'L14', 'not using', 44), ln('to its full potential”', 'L14', 'potential', 44)], kicker='What she wrote', y=320, rot=-0.8)),
 scene('L15', chip('L15', [ln('$1,000 × 52 weeks', 'L15', 'thousand a week', 46), ln('= $52,000 a year', 'L15', 'fifty-two', 56, 'green'), ln('A TFSA has a ceiling', 'L15', 'ceiling', 46, 'red')], y=290),
       P('stamp', 1150, 760, 700, 'L16', 'when does', text='WHEN DOES THE ROOM RUN OUT?', size=40, fxIn='fade', fxOut='fade')),
 # ---- WHAT THE RULES SAY
 scene('L17', chip('L17', [ln('TFSA limit 2026', 'L17', 'twenty twenty-six', 40), roll(7000, 'L17', 'seven thousand', 96), ln('Unused room carries forward', 'L18', 'carries', 40, 'green')], kicker='The rule', y=260),
       src('L17', 'canada.ca — TFSA dollar limits', 'limit')),
 scene('L19', chip('L19', [ln('This year’s limit', 'L19', "this year", 40), ln('+ unused room from past years', 'L19', 'unused', 36), ln('+ last year’s withdrawals', 'L19', 'withdrew', 36), ln('= your room', 'L19', 'withdrew', 50, 'green')], kicker='Your room', y=270),
       src('L19', 'canada.ca — Calculate your TFSA contribution room')),
 scene('L20', chip('L20', [ln('Over the limit =', 'L20', 'go over', 44), ln('1% per month', 'L20', 'one percent', 80, 'red'), ln('on the HIGHEST excess', 'L21', 'highest', 44, 'red'), ln('not the average', 'L21', 'average', 36, strike=W('L21', 'The highest'))], kicker='The penalty', accent='red', y=260),
       src('L20', 'canada.ca — If you owe tax on excess TFSA amounts')),
 # ---- THE NUMBERS (L3 timeline)
 scene('L22', P('roomyears', 260, 170, 1400, 'L22', 'math', title='MAYA’S TFSA ROOM · 2017 → 2026', years=[{'y': y, 'v': v} for y, v in d['lim'].items()],
                startAt=W('L24', 'Add up'), span=7.5, total=d['room26'], totalLabel='Total room (never contributed)', totalAt=W('L25', 'Total'), fxIn='slideUp', fxOut='fade'),
       src('L22', 'canada.ca — TFSA dollar limits; room starts at 18 (resident)', 'resident')),
 scene('L26', chip('L26', [ln('2026 deposits: $52,000', 'L26', 'puts in', 44), ln('Room left', 'L26', 'leaves', 36), roll(d['left26'], 'L26', 'leaves', 88), ln('+ 2027 limit (example): $7,000', 'L27', 'example', 32), ln('2027 room', 'L28', 'seventeen', 36), roll(d['room27'], 'L28', 'seventeen', 88)], kicker='Year 2 · 2027', y=180)),
 scene('L29', P('months', 260, 170, 1400, 'L29', title='2027 · DEPOSITS vs ROOM', sub='≈ $4,333 / month · 2027 limit = example', cum=d['cum'], room=d['room27'], roomLabel='ROOM $17,500',
                startAt=W('L29', 'four thousand'), span=6, ex=d['ex_dec'], exLabel='EXCESS BY DECEMBER', exAt=W('L30', 'thirty-four'), tax=d['tax'], taxLabel='1% / MONTH, MAY → DEC', taxAt=W('L31', 'adds up'), fxIn='slideUp', fxOut='fade'),
       src('L29', 'canada.ca — excess TFSA amounts (1%/month, highest excess)')),
 scene('L32', P('stamp', 1150, 380, 700, 'L32', text='ON “TAX-FREE” MONEY', size=56, fxIn='fade', fxOut='fade')),
 scene('L33', P('phone', 1380, 150, 380, 'L33', 'sneaky', title='MY ACCOUNT · TFSA', big='Room', balanceSub='updated once a year, in the spring', rot=4, fxIn='slideUp', fxOut='fade',
                rows=[{'label': 'Deposits since then', 'value': '?', 'tone': 'red', **W('L33', 'last month')}, {'label': 'Other banks', 'value': '?', 'tone': 'red', **W('L34', 'more than one')}],
                alertAt=W('L34', 'Only you'), alertTitle='ONLY YOU', alertText='Keep your own deposit log'),
       src('L33', 'canada.ca — Calculate your TFSA contribution room')),
 # ---- RE-HOOK (~60 %) : the second trap
 scene('L35', chip('L35', [ln('Trap #2', 'L35', 'second trap', 76, 'red'), ln('on her paycheques', 'L35', 'paycheques', 44)], accent='red', y=330)),
 scene('L36', chip('L36', [ln('2 employers', 'L36', 'Each employer', 54), ln('each one thinks it’s', 'L36', 'withholds', 38), ln('your only job', 'L36', 'only income', 50, 'red')], kicker='Form TD1', y=270),
       chip('L37', [ln('Credits on more than one TD1?', 'L37', 'more than one', 34), ln('Only if you earn less than', 'L37', 'earn more', 30), ln('the credits you claim', 'L37', 'claim', 30)], kicker='The rule', y=640, w=640, word='plainly', rot=0.6),
       src('L36', 'canada.ca — TD1 form video (more than one employer)')),
 scene('L39', P('stamp', 1150, 420, 700, 'L39', text='SURPRISE BILL · APRIL', size=60, fxIn='fade', fxOut='fade')),
 # ---- THE LEGAL FIX
 scene('L40', P('stepcards', 960, 150, 900, 'L40', title='THE FIX · STEP BY STEP', fxIn='fade', fxOut='fade', until=W('L43'),
                items=[{'n': 1, 'head': 'Fix the TD1 at job #2', 'text': 'Don’t claim credits twice · ask for extra tax each pay', **W('L41', 'Step one')},
                       {'n': 2, 'head': 'Keep your own TFSA log', 'text': 'Room first · every deposit · every bank', **W('L42', 'Step two')}]),
       src('L41', 'canada.ca — TD1 form video', 'Step one')),
 scene('L43', P('stepcards', 960, 150, 900, 'L43', fxIn='fade', fxOut='fade',
                items=[{'n': 3, 'head': 'Open an FHSA (if buying a first home)', 'text': '$8,000 / year · deductible · qualifying withdrawal tax-free', **W('L43', 'Step three')}]),
       chip('L45', [ln('Room starts the year', 'L45', 'only starts', 40), ln('you open it', 'L45', 'opens', 50, 'green'), ln('Waiting costs room', 'L45', 'Waiting', 40, 'red')], y=640, w=640, x=1210, word='only starts'),
       src('L43', 'canada.ca — First Home Savings Account (FHSA)')),
 scene('L46', P('stepcards', 960, 150, 900, 'L46', fxIn='fade', fxOut='fade',
                items=[{'n': 4, 'head': 'Look hard at the RRSP', 'text': '18% of last year’s earned income · max $33,810 (2026)', **W('L46', 'Step four')},
                       {'n': 5, 'head': 'Then a regular account', 'text': 'After TFSA, FHSA, RRSP · growth there is taxable', **W('L48', 'Step five')}]),
       src('L47', 'canada.ca — RRSP dollar limits (2026: $33,810)', 'eighteen')),
 # ---- THE NUMBERS (L1 ledger)
 scene('L49', P('ledger', 1100, 200, 760, 'L49', 'step four', title='WHY STEP 4 MATTERS', fxIn='slideR', fxOut='fade',
                rows=[{'label': 'Into the RRSP', 'roll': 10000, **W('L50', 'ten thousand')}, {'label': '× illustrative marginal rate', 'value': '40%', **W('L51', 'forty percent')}, {'label': '≈ tax back', 'roll': 4000, **W('L51', 'roughly')}],
                note='Illustrative rate — yours depends on your income and province.', noteAt=W('L52', 'real rate'))),
 # ---- L4 split
 scene('L53', P('versus', 160, 230, 1600, 'L53', fxIn='glass', fxOut='fade',
                left={'title': 'WITHOUT THE FIX', 'items': ['Excess TFSA tax', 'Surprise bill in April'], 'value': d['tax'], 'prefix': '≈ −$', 'valueSub': 'excess tax, 2027 example', **W('L53', 'Without')},
                right={'title': 'WITH THE FIX', 'items': ['No excess tax', 'No surprise', 'RRSP refund (illustrative)'], 'value': 4000, 'prefix': '≈ +$', 'valueSub': 'back at an illustrative 40% rate', **W('L54', 'With the fix')})),
 # ---- WHAT YOU CAN STEAL
 scene('L55', P('stepcards', 960, 170, 900, 'L55', title='WHAT YOU CAN STEAL FROM THIS', fxIn='fade', fxOut='fade',
                items=[{'n': 1, 'head': 'Automatic saving is a superpower', 'text': 'Keep it', **W('L56', 'One')},
                       {'n': 2, 'head': 'The TFSA has a ceiling', 'text': 'Only you track how close you are', **W('L57', 'Two')},
                       {'n': 3, 'head': 'Two jobs = two TD1 forms', 'text': 'Fix the second one before April', **W('L58', 'Three'), 'tone': 'red'}])),
 # ---- CTA / END CARD
 scene('L59', P('endcard', 160, 200, 1600, 'L59', fxIn='fade', fxOut='fade', question='$5,000 left every month — where does the first dollar go: FHSA, RRSP or TFSA?',
                handles=['YouTube @TaxSecretsCanada', 'Instagram @taxsecretscanada'], handlesAt=W('L59', 'Tell me'), next='Her tax preparer made one mistake — a $20,000 bill', nextAt=W('L60', 'Next week'), subAt=W('L60', 'Subscribe'),
                checked='Rules checked against canada.ca and the Income Tax Act as of November 2026. Your situation may differ — confirm with the CRA or a licensed professional.')),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Real situations · Maya'), ('L6', '01 · The story'), ('L17', '02 · What the rules say'), ('L22', '03 · The numbers'), ('L35', '04 · The second trap'), ('L40', '05 · The legal fix'), ('L49', '06 · Why it matters'), ('L55', '07 · What you can steal')]]
PL = 'lf/st01r/plates/'
plates = {f's{n}': {'photo': {'src': f'{PL}s{n}.jpg', 'depth': f'{PL}s{n}_d.png', 'amt': 0.06}} for n in range(1, 15)}
for k, st in {'s3': {'x': 64, 'y': 78}, 's6': {'x': 50, 'y': 82}, 's12': {'x': 93, 'y': 66}, 's14': {'x': 44, 'y': 86}}.items(): plates[k]['steam'] = st
for k in ('s8',): plates[k]['dust'] = True
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
IN, OUT, PANL, PANR, UP = cam((0, 0, 0.0), (0, -10, 0.32)), cam((0, -10, 0.3), (0, 0, 0.0)), cam((-50, 0, 0.12), (50, 0, 0.14)), cam((50, 0, 0.12), (-50, 0, 0.14)), cam((0, 40, 0.1), (0, -40, 0.2))
M = [(W('L1', None, -0.8), 's1', IN), ('L4', 's1', PANR), ('L6', 's2', PANL), (W('L6', 'One during'), 's3', IN), ('L7', 's3', PANR), ('L8', 's4', IN), ('L9', 's5', PANL), ('L11', 's5', IN),
     ('L12', 's6', IN), ('L14', 's1', OUT), ('L15', 's7', IN), ('L17', 's7', PANR), ('L20', 's9', IN), ('L22', 's6', PANL), ('L26', 's7', OUT), (W('L27', 'January'), 's8', IN), ('L29', 's8', PANR),
     ('L32', 's9', IN), ('L33', 's1', PANL), ('L35', 's10', IN), ('L37', 's10', PANR), ('L39', 's11', IN), ('L40', 's12', PANL), ('L42', 's12', IN), ('L43', 's13', IN), ('L46', 's12', PANR), ('L49', 's12', OUT),
     ('L53', 's9', PANL), ('L54', 's14', IN), ('L55', 's14', PANR), ('L59', 's14', OUT)]
shots = [{'plate': p, 'cam': c, **(a if isinstance(a, dict) else {'at': a})} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        if p['type'] in ('chip', 'phone', 'ledger', 'roomyears', 'months', 'versus', 'stepcards', 'endcard'):
            sfx.append({'name': 'paper', 'vol': 0.16, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        if p['type'] == 'stamp': sfx.append({'name': 'thump', 'vol': 0.5, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') or []) + (p.get('rows') or []) + (p.get('lines') or []):
            if 'at' in r and ('roll' in r or p['type'] in ('stepcards', 'ledger')): sfx.append({'name': 'tick', 'vol': 0.14, **{k: v for k, v in r.items() if k in ('at', 'word')}, 'off': 1.1 if 'roll' in r else 0})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.08, **{k: v for k, v in sh.items() if k in ('at', 'word', 'off')}})
sfx.append({'name': 'tick', 'vol': 0.2, **W('L25', 'Total'), 'off': 1.2}); sfx.append({'name': 'tick', 'vol': 0.2, **W('L31', 'adds up'), 'off': 1.2})
sfx.append({'name': 'chime', 'vol': 0.18, **W('L60', 'Subscribe')})
ep = {'fps': 30, 'lead': 0.8, 'tail': 3.0, 'footer': 'Real situations · Tax Secrets Canada · General information, not tax advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'audio': 'lf/st01t/mix.wav', 'music': 'music.wav', 'musicVol': 0.05, 'film': True}
ICON = [('job', 'work'), ('maya', 'user'), ('kids', 'user'), ('budget', 'receipt'), ('eating', 'receipt'), ('wrote', 'quote'), ('weeks', 'calendar'), ('rule', 'check'), ('room', 'chart'),
        ('penalty', 'percent'), ('2027', 'calendar'), ('trap', 'alert'), ('td1', 'mail'), ('employers', 'mail'), ('open it', 'home'), ('take-home', 'coin'), ('by the end', 'check')]
for e in events:
    e['cam3d'] = True
    for p in e['panels']:
        if p['type'] == 'chip':
            txt = (p.get('kicker', '') + ' ' + ' '.join(l.get('text', '') for l in p['lines'])).lower()
            p['icon'] = next((ic for k, ic in ICON if k in txt), 'coin')
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'shots', len(shots), 'sfx', len(sfx))
