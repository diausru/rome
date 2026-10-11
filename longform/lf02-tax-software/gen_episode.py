"""LF-02 episode description -> episode.src.json (build.py resolves times, data refs and checks)."""
import json
L = json.load(open('lines.json'))
GAP = {f'L{i}': 1.1 for i in (4, 10, 18, 26, 32, 37, 43, 45, 50, 54, 58)}  # breath before each chapter
vo = [{'id': k, 'file': f'vo/{k}.mp3', 'gap': GAP.get(k, 0.35), 'text': t} for k, t in L]

def W(at, word=None, off=0):
    d = {'at': at}
    if word: d['word'] = word
    if off: d['off'] = off
    return d
def P(type, x, y, w, at, word=None, **kw):
    d = {'type': type, 'x': x, 'y': y, 'w': w, 'at': at}
    if word: d['word'] = word
    d.update(kw); return d
def scene(at, *panels, **kw):
    return {'at': at, 'type': 'scene', 'panels': list(panels), **kw}
SW = {'ref': 'sw'}
def prog(id_): return {'ref': f'sw.programs.{id_}'}

events = [
 # ---------- 00 HOOK ----------
 scene('L1',
   P('hero', 160, 250, 1600, 'L1', glass=False, fxIn='focus', text=['SEVEN TAX PROGRAMS.', 'FROM *$0* TO *$80*.'], lineAt=[W('L1'), W('L1', 'zero')], sub='EVERY ONE CERTIFIED BY THE CRA', subAt=W('L1', 'certified'), size=112),
 ),
 scene('L2',
   P('hero', 160, 200, 1600, 'L2', glass=False, fxIn='wipe', fxOut='vapor', text=['WHY PAY *$80*', 'WHEN YOU CAN FILE FOR *$0*?'], lineAt=[W('L2'), W('L2', 'when')], size=104),
 ),
 scene('L3',
   P('hero', 160, 230, 1600, 'L3', glass=False, fxIn='glass', fxOut='particles', text=['NOT “WHICH APP IS BEST?”', '“WHICH APP IS BEST *FOR YOU*?”'], lineAt=[W('L3'), W('L3', 'Which app is best for')], size=92),
 ),
 scene('L4',
   P('steps', 360, 200, 1200, 'L4', fxIn='sweep', fxOut='defocus', title='DISCLOSURE', sub='CHECKED 2026-10-11', items=[
     {'head': 'NOT SPONSORED', 'at': 'L4', 'word': 'Nobody'},
     {'head': 'NO AFFILIATE LINKS', 'at': 'L4', 'word': 'There are no'},
     {'head': 'EVERY PRICE FROM THE COMPANY’S OWN SITE + CANADA.CA', 'at': 'L4', 'word': 'Every price'}]),
 ),
 # ---------- 01 RULES ----------
 scene('L5',
   P('hero', 160, 150, 1600, 'L5', glass=False, fxIn='slideL', kicker='RULE 1', text=['THE CRA CERTIFIES TAX SOFTWARE', '*EVERY YEAR*'], lineAt=[W('L5', 'The CRA'), W('L5', 'every single')], size=84, until=W('L5', 'For the')),
   P('hero', 160, 330, 1600, 'L5', 'For the', glass=False, fxIn='focus', kicker='2025 TAX YEAR · FILED SPRING 2026', text=['*17* PRODUCTS MADE THE LIST'], size=120),
 ),
 scene('L6',
   P('steps', 260, 190, 1400, 'L6', fxIn='glass', fxOut='collapse', title='HOW THE CRA LIST WORKS', sub='CANADA.CA · FIND CERTIFIED TAX SOFTWARE', items=[
     {'head': 'USE SOFTWARE CERTIFIED FOR THE YEAR YOU FILE', 'at': 'L6'},
     {'head': 'THE LIST LOADS IN RANDOM ORDER', 'text': 'The CRA does not rank the products.', 'at': 'L6', 'word': 'random'}]),
 ),
 scene('L7',
   P('hero', 160, 240, 1600, 'L7', glass=False, fxIn='wipe', fxOut='fade', kicker='WHAT MOST REVIEWS SKIP', text=['SAME SLIPS + SAME TAX LAW', '= *SAME TAX OWED*'], lineAt=[W('L7', 'The tax law'), W('L7', 'Enter the same')], size=100),
 ),
 scene('L8',
   P('steps', 360, 170, 1200, 'L8', fxIn='morph', fxOut='particles', title='WHAT YOU ACTUALLY PAY FOR', items=[
     {'head': 'WHICH FORMS YOU CAN USE', 'at': 'L8', 'word': 'Which forms'},
     {'head': 'HOW MUCH HELP YOU GET', 'at': 'L8', 'word': 'How much help'},
     {'head': 'WHAT HAPPENS IF THE CRA ASKS QUESTIONS', 'at': 'L8', 'word': 'And what happens'}]),
 ),
 scene('L9',
   P('steps', 260, 190, 1400, 'L9', fxIn='slideR', fxOut='vapor', title='AUTO-FILL MY RETURN', sub='CANADA.CA', items=[
     {'n': '✓', 'head': 'PULLS YOUR SLIPS FROM THE CRA', 'at': 'L9', 'word': 'pulls'},
     {'n': '!', 'head': 'NEEDS A CRA ACCOUNT', 'at': 'L9', 'word': 'But it only'},
     {'n': '✕', 'head': 'NOT VIA ALBERTA.CA OR BC SERVICES CARD SIGN-IN', 'at': 'L9', 'word': 'If you sign'}]),
 ),
 scene('L10',
   P('timeline', 200, 230, 1520, 'L10', fxIn='wipe', fxOut='defocus', title='WHEN YOUR SLIPS ARRIVE', sub='CANADA.CA', points=[
     {'date': 'FEB 23', 'label': 'NETFILE OPENS', 'at': 'L10'},
     {'date': 'END OF FEB', 'label': 'MOST THIRD-PARTY SLIPS RECEIVED', 'at': 'L10', 'word': 'end of February'},
     {'date': 'MID-MARCH', 'label': 'PROCESSED, READY FOR AUTO-FILL', 'at': 'L10', 'word': 'processed'},
     {'date': 'APR 30', 'label': 'FILING DEADLINE', 'at': 'L10', 'word': 'File in', 'red': True}]),
 ),
 # ---------- 02 CONTENDERS ----------
 scene('L11',
   P('lineup', 110, 300, 1700, 'L11', fxIn='stagger', fxOut='collapse', title='THE CONTENDERS', sub='ALL ON THE CRA CERTIFIED LIST · 2025', value=SW,
     focus=[{'id': 'ws', 'at': 'L12'}, {'id': 'tt', 'at': 'L13'}, {'id': 'hrb', 'at': 'L14'}, {'id': 'uf', 'at': 'L15'}, {'id': 'st', 'at': 'L16'}, {'id': 'ct', 'at': 'L17'}, {'id': 'gt', 'at': 'L18'}],
     until=W('L12')),
 ),
] + [
 scene(f'L{n}', P('tiers', 260, 300, 1400, f'L{n}', fxIn=fi, fxOut=fo, value=prog(pid), rowAt=rows))
 for n, pid, fi, fo, rows in [
   (12, 'ws', 'glass', 'fade', [W('L12', 'Basic'), W('L12', 'Plus'), W('L12', 'Pro')]),
   (13, 'tt', 'slideR', 'defocus', [W('L13', 'Free'), W('L13', 'thirty'), W('L13', 'fifty'), W('L13', 'seventy')]),
   (14, 'hrb', 'wipe', 'vapor', [W('L14', 'Free'), W('L14', 'twenty-nine'), W('L14', 'forty-nine'), W('L14', 'sixty-nine')]),
   (15, 'uf', 'focus', 'particles', [W('L15', 'Online'), W('L15', 'pay only')]),
   (16, 'st', 'slideL', 'collapse', [W('L16', 'On a computer'), W('L16', 'phone')]),
   (17, 'ct', 'sweep', 'fade', [W('L17', 'Basic'), W('L17', 'Plus')]),
   (18, 'gt', 'morph', 'vapor', [W('L18', 'Completely')]),
 ]
]

def round_scene(intro, rid, label, chips, rows, first, extra=()):
    ev = [scene(intro,
        P('persona', 110, 250, 620, intro, glass=False, fxIn='slideL', round=label, value={'ref': f'sw.rounds.{rid}'}, chips=chips),
        P('round', 760, 170, 1050, first, fxIn='glass', value={'ref': f'sw.rounds.{rid}'}, programs={'ref': 'sw.programs'}, order={'ref': 'sw.order'}, rowAt=rows),
        *extra)]
    return ev

events += [scene('L19', P('hero', 160, 280, 1600, 'L19', glass=False, fxIn='focus', fxOut='vapor', kicker='THE FACE-OFF', text=['4 CANADIANS · 4 TAX YEARS', '*SAME RULES*'], lineAt=[W('L19', 'Four'), W('L19', 'Same rules')], size=100))]
events += round_scene('L20', 'ava', 'ROUND 1', [{'text': 'AGE 22 · STUDENT', 'at': 'L20', 'word': 'twenty-two'}, {'text': 'ONE PART-TIME JOB', 'at': 'L20', 'word': 'one part-time'}, {'text': 'INCOME $14,000', 'at': 'L20', 'word': 'fourteen'}],
    [{'id': 'hrb', **W('L22')}, {'id': 'uf', **W('L23')}, {'id': 'st', **W('L24')}, {'id': 'ws', **W('L24', 'Wealthsimple')}, {'id': 'ct', **W('L24', 'CloudTax')}, {'id': 'gt', **W('L24', 'And GenuTax')}, {'id': 'tt', **W('L25')}], 'L21')
events += [scene('L25', P('hero', 160, 260, 1600, 'L25', glass=False, fxIn='morph', fxOut='particles', kicker='AVA’S REAL COST', text=['*$0*', 'SIX DIFFERENT WAYS'], lineAt=[W('L25'), W('L25', 'six')], size=150)),
           scene('L26', P('steps', 260, 220, 1400, 'L26', fxIn='glass', fxOut='defocus', title='FREE OPTIONS FROM THE CRA', sub='CANADA.CA · IF ELIGIBLE', items=[
              {'head': 'FREE TAX CLINICS (CVITP)', 'text': 'Volunteers file for people with a modest income and a simple tax situation.', 'at': 'L26', 'word': 'a free tax clinic'},
              {'head': 'SIMPLEFILE BY THE CRA', 'text': 'Free for eligible people with a lower income and a simple return.', 'at': 'L26', 'word': 'SimpleFile'}]))]
events += round_scene('L27', 'liam', 'ROUND 2', [{'text': 'ONE T4 · $68,000', 'at': 'L27', 'word': 'One job'}, {'text': 'CHARITY DONATIONS', 'at': 'L27', 'word': 'charity'}, {'text': 'MEDICAL RECEIPTS', 'at': 'L27', 'word': 'medical'}],
    [{'id': 'tt', **W('L29')}, {'id': 'hrb', **W('L29', 'twenty-nine')}, {'id': 'uf', **W('L30')}, {'id': 'st', **W('L31')}, {'id': 'ws', **W('L31', 'Wealthsimple')}, {'id': 'gt', **W('L31', 'Same with')}, {'id': 'ct', **W('L32')}], 'L28')
events += [scene('L32', P('hero', 160, 260, 1600, 'L32', glass=False, fxIn='wipe', fxOut='vapor', kicker='SAME RETURN · SAME TAX LAW', text=['*$0* → *$30*', 'YOU PAY FOR THE INTERFACE + HELP'], lineAt=[W('L32', 'A price'), W('L32', 'The difference')], size=110))]
events += round_scene('L33', 'priya', 'ROUND 3', [{'text': 'SALARY', 'at': 'L33', 'word': 'Salary'}, {'text': 'CAPITAL GAINS (SOLD SHARES)', 'at': 'L33', 'word': 'capital gains'}, {'text': 'FOREIGN DIVIDENDS', 'at': 'L33', 'word': 'foreign'}],
    [{'id': 'tt', **W('L34')}, {'id': 'hrb', **W('L34', 'At H and R')}, {'id': 'ws', **W('L35')}, {'id': 'gt', **W('L36')}, {'id': 'st', **W('L36', 'StudioTax')}, {'id': 'uf', **W('L36', 'UFile')}, {'id': 'ct', **W('L37')}], 'L34')
events += [scene('L37', P('steps', 300, 230, 1320, 'L37', fxIn='slideR', fxOut='collapse', title='PRIYA’S CATCH', sub='CRA · GENUTAX DETAILS, 2025', items=[
              {'n': '!', 'head': 'FORM T1135 · FOREIGN PROPERTY', 'text': 'GenuTax cannot send it electronically (a CRA-listed limitation).', 'at': 'L37', 'word': 'T eleven'},
              {'n': '→', 'head': 'FREE ISN’T ALWAYS THE RIGHT ONE', 'at': 'L37', 'word': 'So the free'}]))]
events += [scene('L38', P('persona', 110, 250, 620, 'L38', glass=False, fxIn='slideL', round='ROUND 4', value={'ref': 'sw.rounds.marc'}, chips=[{'text': 'SELF-EMPLOYED DESIGNER', 'at': 'L38', 'word': 'self-employed'}, {'text': 'RENTS A BASEMENT SUITE', 'at': 'L38', 'word': 'rents'}], until=W('L40')),
                   P('timeline', 760, 250, 1050, 'L39', 'June', fxIn='wipe', fxOut='defocus', title='MARC’S DATES · 2025 RETURN', sub='CANADA.CA', points=[
                     {'date': 'APR 30', 'label': 'TAX OWING DUE', 'at': 'L39', 'word': 'But any tax', 'red': True},
                     {'date': 'JUN 15', 'label': 'SELF-EMPLOYED FILING DEADLINE', 'at': 'L39', 'word': 'June'}], until=W('L40')))]
events += [scene('L40', P('persona', 110, 250, 620, 'L40', glass=False, fxIn='fade', round='ROUND 4', value={'ref': 'sw.rounds.marc'}, chips=[{'text': 'SELF-EMPLOYED', 'at': 'L40'}, {'text': 'RENTAL INCOME', 'at': 'L40'}]),
                   P('round', 760, 170, 1050, 'L40', fxIn='glass', value={'ref': 'sw.rounds.marc'}, programs={'ref': 'sw.programs'}, order={'ref': 'sw.order'},
                     rowAt=[{'id': 'tt', **W('L40')}, {'id': 'hrb', **W('L40', 'H and R')}, {'id': 'st', **W('L41')}, {'id': 'gt', **W('L41', 'GenuTax')}, {'id': 'ws', **W('L42')}, {'id': 'uf', **W('L43')}, {'id': 'ct', **W('L43', 'seventy')}]))]
# ---------- SCOREBOARD ----------
events += [scene('L44', P('matrix', 210, 170, 1500, 'L44', fxIn='stagger', fxOut='collapse', title='THE SCOREBOARD', sub='WHAT EACH PERSON PAYS · PUBLISHED PRICES', value=SW, people=['ava', 'liam', 'priya', 'marc'],
                   colAt=[W('L44', 'Four'), W('L44', 'Seven'), W('L44', 'What each'), W('L44', 'published')], zeroAt=W('L45')))]
# ---------- SURPRISE ----------
events += [scene('L46', P('hero', 160, 260, 1600, 'L46', glass=False, fxIn='focus', fxOut='particles', kicker='THE SURPRISE', text=['IF $0 WORKS FOR EVERYONE…', 'WHY DO *PAID TIERS* EXIST?'], lineAt=[W('L46', 'If the'), W('L46', 'why')], size=100)),
           scene('L47', P('buys', 210, 160, 1500, 'L47', fxIn='sweep', fxOut='vapor', title='WHAT THE MONEY BUYS', sub='VENDOR SITES · 2025 TAX YEAR', rows=[
              {'name': 'WEALTHSIMPLE PLUS', 'price': '$40', 'gets': 'AUDIT PROTECTION · PRIORITY SUPPORT', 'at': 'L48'},
              {'name': 'CLOUDTAX PLUS', 'price': '$39', 'gets': 'AUDIT PROTECTION (MAIN ACCOUNT HOLDER)', 'at': 'L48', 'word': 'CloudTax'},
              {'name': 'H&R BLOCK', 'price': 'PAID', 'gets': 'EXPERT HELP SOLD SEPARATELY', 'at': 'L48', 'word': 'H and R'},
              {'name': 'GENUTAX', 'price': '$0', 'gets': 'NO EXPERT · YOU’RE ON YOUR OWN', 'neg': True, 'at': 'L49'},
              {'name': 'STUDIOTAX', 'price': '$17.50', 'gets': 'FILES STAY ON YOUR DEVICE', 'at': 'L49', 'word': 'StudioTax'}])),
           scene('L50', P('hero', 160, 260, 1600, 'L50', glass=False, fxIn='wipe', fxOut='defocus', kicker='THE REAL TRADE', text=['NOT CHEAP VS EXPENSIVE', '*MONEY VS HELP*'], lineAt=[W('L50'), W('L50', 'money versus')], size=112))]
# ---------- FINAL FACE-OFF ----------
events += [scene('L51', P('steps', 260, 150, 1400, 'L51', fxIn='glass', fxOut='collapse', title='FINAL FACE-OFF · 3 QUESTIONS', dimOthers=True, items=[
              {'head': 'HOW COMPLEX IS YOUR YEAR?', 'text': 'One T4 + standard credits: free works. Investments, rental, self-employment: check which tier unlocks those forms.', 'at': 'L52'},
              {'head': 'HOW MUCH HELP DO YOU WANT?', 'text': 'None: free. Reassurance: audit protection. A person reviewing it: expert tiers, which cost more.', 'at': 'L53'},
              {'head': 'WHAT DEVICE · WHERE DO YOU LIVE?', 'text': 'GenuTax: Windows only. StudioTax: Windows, Mac, iPhone, Android. Quebec: check each program’s limits.', 'at': 'L54'}]))]
# ---------- VERDICT ----------
events += [scene('L55', P('hero', 160, 120, 1600, 'L55', glass=False, fxIn='focus', kicker='THE VERDICT', text=['NO SINGLE WINNER'], size=96, until=W('L56')),
              P('steps', 260, 330, 1400, 'L56', fxIn='slideUp', fxOut='particles', items=[
                {'n': 'A', 'head': 'STUDENT OR LOW INCOME → FILE FREE', 'text': 'H&R Block (25 or under) · UFile or StudioTax (under $20K) · a free tax clinic', 'at': 'L56'},
                {'n': 'B', 'head': 'SIMPLE T4 + A FEW CREDITS → FREE TIER', 'text': 'Wealthsimple Basic or GenuTax do the job of a $30 tier', 'at': 'L57'},
                {'n': 'C', 'head': 'INVESTORS · SELF-EMPLOYED → READ THE LIMITS', 'text': 'Pay only if you want the safety net', 'at': 'L58'}])),
           scene('L59', P('hero', 160, 240, 1600, 'L59', glass=False, fxIn='wipe', fxOut='vapor', kicker='BEFORE YOU FILE IN 2027', text=['THIS IS THE *2025* TAX YEAR', 'CHECK THE NEW CRA LIST'], lineAt=[W('L59', 'Everything'), W('L59', 'The CRA')], sub='PRICES CAN CHANGE', subAt=W('L59', 'prices'), size=96)),
           scene('L60', P('hero', 160, 260, 1600, 'L60', glass=False, fxIn='morph', kicker='NEXT ON TAX SECRETS CANADA', text=['YOU MAKE *$100,000*', 'WHERE DOES EVERY DOLLAR GO?'], lineAt=[W('L60', 'you make'), W('L60', 'Where')], size=104))]

chapters = [{'at': a, 'title': t} for a, t in [('L1', 'The question'), ('L5', '01 · The rules'), ('L11', '02 · The contenders'), ('L19', '03 · Round 1 · Ava'), ('L27', '04 · Round 2 · Liam'),
            ('L33', '05 · Round 3 · Priya'), ('L38', '06 · Round 4 · Marc'), ('L44', '07 · Scoreboard'), ('L46', '08 · The surprise'), ('L51', '09 · Final face-off'), ('L55', '10 · Verdict'), ('L59', 'Next')]]

PL = 'lf/lf02/plates/'
plates = {
 'desk':  {'layers': [{'src': PL + 'p1_bg.jpg', 'depth': 1.0}, {'src': PL + 'p1_fg.png', 'depth': 1.45}], 'lights': [{'x': 16, 'y': 40, 'r': 9, 'color': 'rgba(255,190,110,.9)', 'amp': 0.09}, {'x': 60, 'y': 30, 'r': 26, 'color': 'rgba(120,160,230,.6)', 'amp': 0.05, 'speed': 0.3}]},
 'close': {'layers': [{'src': PL + 'p2_bg.jpg', 'depth': 1.0}, {'src': PL + 'p2_fg.png', 'depth': 1.5}], 'lights': [{'x': 6, 'y': 20, 'r': 10, 'color': 'rgba(255,190,110,.9)', 'amp': 0.1}], 'steam': {'x': 13.5, 'y': 44}},
 'dawn':  {'layers': [{'src': PL + 'p3_bg.jpg', 'depth': 1.0}, {'src': PL + 'p3_fg.png', 'depth': 1.4}], 'lights': [{'x': 80, 'y': 29, 'r': 14, 'color': 'rgba(255,210,150,.9)', 'amp': 0.12, 'speed': 0.5}]},
}
def cam(*ks): return [dict(x=a * 1.8, y=b * 1.8, z=c * 1.5) for a, b, c in ks]
shots = [
 {'at': 'L1', 'plate': 'desk', 'cam': cam((0, -10, 0.10), (0, 0, 0.0))},                      # pull-back reveal
 {'at': 'L5', 'plate': 'desk', 'cam': cam((-40, 0, 0.02), (40, -6, 0.06))},                     # lateral truck
 {'at': 'L11', 'plate': 'desk', 'cam': cam((30, 10, 0.08), (-30, 0, 0.03))},
 {'at': 'L19', 'plate': 'close', 'cam': cam((-30, 0, 0.0), (10, -8, 0.08))},                    # new shot: close desk, push in
 {'at': 'L27', 'plate': 'close', 'cam': cam((40, -10, 0.08), (-20, 0, 0.02))},
 {'at': 'L33', 'plate': 'close', 'cam': cam((-20, 12, 0.03), (30, 0, 0.09))},
 {'at': 'L38', 'plate': 'close', 'cam': cam((20, 0, 0.1), (-30, -8, 0.04))},
 {'at': 'L44', 'plate': 'desk', 'cam': cam((0, 0, 0.12), (0, 6, 0.02))},                         # back to wide: pull back for scoreboard
 {'at': 'L46', 'plate': 'desk', 'cam': cam((-40, -12, 0.04), (30, 0, 0.1))},
 {'at': 'L51', 'plate': 'dawn', 'cam': cam((-30, 6, 0.0), (20, 0, 0.07))},                       # morning: decision
 {'at': 'L55', 'plate': 'dawn', 'cam': cam((20, 0, 0.08), (-10, -6, 0.0))},
]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.10, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in p.get('rowAt', []) or []:
            sfx.append({'name': 'tick', 'vol': 0.12, **{k: v for k, v in r.items() if k in ('at', 'word')}})
for s in shots[1:]:
    sfx.append({'name': 'paper' if s['plate'] == 'close' else 'whoosh', 'vol': 0.08, 'at': s['at']})
sfx.append({'name': 'chime', 'vol': 0.10, 'at': 'L45'})

ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · vendor sites, checked 2026-10-11 · 2025 tax year · General info, not advice · Not sponsored',
      'data': {'sw': {'type': 'file', 'file': 'software.json'}}, 'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx,
      'audio': 'lf/lf02/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1)
print('events', len(events), 'panels', sum(len(e['panels']) for e in events), 'sfx', len(sfx))
