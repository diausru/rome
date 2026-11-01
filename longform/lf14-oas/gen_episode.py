import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L7", "L12", "L24", "L32", "L37", "L42", "L48", "L50", "L55"}
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
PL = 'lf/lf14/plates/'
D = d
events = [
 scene('L1', P('oas', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's2.jpg', 'depth': PL + 's2_d.png', 'dim': 0.66}, kicker='RETIRED · SAME INCOME · 2026', title='SAME INCOME. SAME OAS?', finishTitle=f"ONE COUPLE LOSES {m(D['c_frank'])}",
   rows=[{'name': "FRANK'S OAS", 'sub': 'FRANK $120K · LINDA $40K', 'loss': D['c_frank']}, {'name': "RAJ'S OAS", 'sub': 'RAJ $80K · MEI $80K', 'loss': 0}],
   monthly=D['monthly'], months=['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
   cutAt=W('L4', 'shrink'), keepAt=W('L4', 'nothing'), qAt=W('L5', 'why'), question='SAME $160,000. WHY DOES ONLY ONE COUPLE LOSE OAS?', out=W('L6', None, -0.9)), off=-1.0),
 K('L6', [ln('2026 INCOME · EACH SPOUSE FILES SEPARATELY', 46, 'L6'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L6', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L7', [dc('WHAT OAS IS', 140, 'L7', 'actually')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L8', 'OLD AGE SECURITY', [it('65+', 'MONTHLY FEDERAL PENSION', 'L8', 'monthly'), it('≠', 'SEPARATE FROM THE CPP', 'L8', 'separate'), it('$762.50', 'MAX / MONTH · AGE 65–74 · OCT–DEC 2026', 'L9', 'seven'),
   it('75+', 'ABOUT 10% MORE · $838.75', 'L9', 'seventy-five'), it('TAX', '≈ $9,000 A YEAR · TAXABLE INCOME', 'L10', 'taxable')], fxIn='glass', dimOthers=True, y=180),
 K('L11', [ln('OAS PENSION RECOVERY TAX', 80, 'L11', 'recovery'), ln('A.K.A. THE CLAWBACK', 96, 'L11', 'clawback', gold=True)], kicker='THE CATCH', fxIn='glass', y=330),
 K('L12', [dc('HOW THE CLAWBACK WORKS', 120, 'L12', 'works')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 ST('L13', 'THE RULE · 2026 INCOME', [it('LINE', f"NET INCOME ABOVE {m(D['th'])}", 'L13', 'ninety-five'), it('15¢', 'OF OAS PER DOLLAR ABOVE THE LINE', 'L14', 'fifteen'), it('1', 'PER PERSON · NOT THE HOUSEHOLD', 'L15', 'separately')], fxIn='glass', dimOthers=True, y=260),
 SPLIT('L16', 'NET INCOME · 2026', 'SAME $160,000 PER COUPLE', [{'name': 'FRANK', 'value': D['frank']}, {'name': 'LINDA', 'value': D['linda']}, {'name': 'RAJ', 'value': D['raj']}, {'name': 'MEI', 'value': D['mei']}],
       [W('L16', 'one'), W('L16', 'forty'), W('L17', 'Raj'), W('L17', 'each')], f"THE LINE: {m(D['th'])}", fxIn='slideR'),
 SPLIT('L18', "FRANK'S CLAWBACK", '2026 INCOME', [{'name': 'OVER THE LINE', 'value': D['over']}, {'name': '× 15% = CLAWBACK', 'value': D['c_frank']}, {'name': 'RAJ & MEI', 'value': 0}],
       [W('L18', 'twenty-four'), W('L18', 'Fifteen'), W('L19', 'zero')], 'PER PERSON, NOT PER HOUSEHOLD', fxIn='glass'),
 ST('L20', 'THE TIMING', [it('2026', 'INCOME YEAR', 'L20', 'isn'), it('JUL→JUN', 'TAKEN FROM OAS · JULY 2027 TO JUNE 2028', 'L20', 'July'), it(f"−{m(D['per_month'])}", 'FRANK, EVERY MONTH · ≈ 5 MONTHS OF OAS', 'L21', 'three')], fxIn='slideL', dimOthers=True, y=260),
 SPLIT('L22', 'THE CEILING · 2026 INCOME', 'NET WORLD INCOME', [{'name': 'CLAWBACK STARTS', 'value': D['th']}, {'name': 'ALL OAS GONE · 65–74', 'value': D['top']}, {'name': 'ALL OAS GONE · 75+', 'value': D['top75']}],
       [W('L22', 'ceiling'), W('L22', 'whole'), W('L22', 'seventy-five')], 'LIMITS ARE PUBLISHED EVERY YEAR', fxIn='slideR'),
 K('L24', [dc('LEVER 1 · PENSION SPLITTING', 110, 'L24', 'splitting')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 ST('L25', 'PENSION INCOME SPLITTING', [it('50%', 'UP TO HALF OF ELIGIBLE PENSION INCOME', 'L25', 'half'), it('RRIF', 'COMPANY PENSION · RRIF FROM AGE 65', 'L25', 'Company'),
   it('T1032', 'JOINT ELECTION · NO MONEY MOVES', 'L26', 'joint'), it('✗', "CPP AND OAS CAN'T BE SPLIT", 'L27', 'split')], fxIn='glass', dimOthers=True, y=200),
 SPLIT('L28', 'FRANK MOVES $25,000 TO LINDA', 'ELIGIBLE PENSION INCOME $60,000', [{'name': 'FRANK BEFORE', 'value': D['frank']}, {'name': 'FRANK AFTER', 'value': D['frank_s']}, {'name': 'LINDA AFTER', 'value': D['linda_s']}, {'name': "FRANK'S CLAWBACK", 'value': D['c_split']}],
       [W('L28', 'sixty'), W('L29', 'ninety-five'), W('L29', 'sixty-five'), W('L30', 'zero')], f"CLAWBACK {m(D['c_frank'])} → $0", fxIn='slideL'),
 K('L31', [ln("IT'S FREE", 110, 'L31', 'free', gold=True), ln("IT CAN ALSO LOWER THE COUPLE'S INCOME TAX", 48, 'L31', 'lower')], kicker='LEVER 1', fxIn='glass', y=330),
 K('L32', [dc("IT'S WHERE THE MONEY SITS", 110, 'L32', 'sits')], kicker='04 · LEVER 2', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L33', 'SAME $8,000 OF INTEREST A YEAR', '$200,000 OF GICs AT 4% · EXAMPLE', [{'name': 'REGULAR ACCOUNT · CLAWBACK', 'value': D['c_interest']}, {'name': 'TFSA · CLAWBACK', 'value': 0}],
       [W('L34', 'one'), W('L35', 'Inside')], "CRA: TFSA INCOME & WITHDRAWALS DON'T AFFECT OAS", fxIn='glass'),
 K('L37', [dc('LEVER 3 · ONE-TIME SPIKES', 110, 'L37', 'spikes')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 SPLIT('L38', 'A $30,000 RRIF LUMP', 'ONE YEAR · EXAMPLE', [{'name': 'NORMAL YEAR · CLAWBACK', 'value': D['c_frank']}, {'name': 'LUMP YEAR · CLAWBACK', 'value': D['c_lump']}, {'name': 'EXTRA OAS LOST', 'value': D['c_lump_extra']}],
       [W('L38', 'renovation'), W('L39', 'eight'), W('L40', 'four')], 'TAKEN FROM THE NEXT JULY', fxIn='slideR'),
 ST('L41', 'WHAT LANDS IN NET INCOME', [it('↑', 'LARGE RRIF / RRSP WITHDRAWALS', 'L41', 'withdrawals'), it('↑', 'TAXABLE CAPITAL GAINS', 'L41', 'capital'), it('✓', 'PLAN THEM FOR UNDER-THE-LINE YEARS', 'L41', 'Plan')], fxIn='glass', dimOthers=True, y=260),
 K('L42', [dc('LEVER 4 · WHEN YOU START', 110, 'L42', 'start')], kicker='06', fxIn='focus', fxOut='wipe', y=330),
 ST('L43', 'DEFERRAL', [it('+0.6%', 'EVERY MONTH YOU WAIT AFTER 65', 'L43', 'zero'), it('+36%', 'AT 70 · FOR LIFE', 'L43', 'thirty-six')], fxIn='slideL', dimOthers=True, y=300),
 SPLIT('L44', 'MARIA · 65 · STILL WORKING', '2026 · EXAMPLE', [{'name': 'NET INCOME WITH OAS', 'value': D['maria']}, {'name': 'CLAWBACK', 'value': D['c_maria']}, {'name': 'OAS ≈ A YEAR', 'value': D['year_cap']}],
       [W('L44', 'one'), W('L45', 'five'), W('L45', 'nine')], 'WAIT TO 70 → +36% FOR LIFE', fxIn='glass'),
 K('L47', [ln('NOT RIGHT FOR EVERYONE', 80, 'L47', 'everyone', gold=True), ln('LOW INCOME? NO GIS WHILE YOU DELAY OAS', 52, 'L47', 'Guaranteed')], kicker='CAREFUL', fxIn='glass', y=330),
 ST('L48', 'WHERE THIS CHANGES', [it('OAS', 'CLAWBACK ONLY · INCOME TAX NOT SHOWN', 'L48', 'clawback'), it('PRO', 'YOUR NUMBERS: A TAX PROFESSIONAL', 'L48', 'professional'), it('NEXT', 'THE LOW-INCOME YEARS AFTER YOU RETIRE', 'L49', 'low-income')], fxIn='glass', dimOthers=True, y=260),
 ST('L50', 'YOUR OAS CHECKLIST', [it('1', f"NET INCOME vs {m(D['th'])}", 'L51', 'Find'), it('2', 'COUPLE 65+: T1032 SPLITTING, EVERY YEAR', 'L52', 'splitting'),
   it('3', 'TFSA BEFORE A REGULAR ACCOUNT', 'L53', 'Use'), it('4', 'PLAN LUMPS · CHOOSE YOUR OAS START', 'L54', 'Plan')], fxIn='stagger', dimOthers=True, y=200),
 K('L55', [dc('WHAT DID WE LEARN?', 140, 'L55', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L56', 'THE OAS CLAWBACK · 3 RULES', [it('1', f"15¢ PER $1 ABOVE {m(D['th'])} · PER PERSON", 'L56', 'fifteen'), it('2', 'TAKEN THE NEXT YEAR · JULY TO JUNE', 'L57', 'July'),
   it('3', 'SPLITTING · TFSA · TIMING · START DATE', 'L58', 'Splitting')], fxIn='glass', dimOthers=True, y=240),
 K('L59', [mo([{'text': 'KEEP MORE OAS', 't': 0}, {'text': 'THE RETIREMENT TAX WINDOW', **W('L59', 'window')}], 100, 'L59', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L59', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Same income, different OAS'), ('L7', '01 · What OAS is'), ('L12', '02 · How the clawback works'), ('L24', '03 · Lever 1: pension splitting'),
  ('L32', '04 · Lever 2: the TFSA'), ('L37', '05 · Lever 3: one-time spikes'), ('L42', '06 · Lever 4: when to start OAS'), ('L48', 'Where this changes'), ('L50', 'Checklist'), ('L55', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L7', 's3', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L16', 's2', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L24', 's6', cam((0, 30, 0.0), (0, -30, 0.25))),
     ('L32', 's4', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L37', 's1', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L42', 's5', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L48', 's3', cam((-30, 0, 0.0), (30, 0, 0.2))),
     ('L50', 's6', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L55', 's4', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
sfx.append({'name': 'whoosh', 'vol': 0.22, **h['cutAt']}); sfx.append({'name': 'tick', 'vol': 0.2, **h['keepAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"OAS CLAWBACK LINE (2026 INCOME): {m(D['th'])}", '15¢ PER $1 ABOVE THE LINE · PER PERSON', f"FRANK $120K: −{m(D['c_frank'])} · RAJ & MEI $80K EACH: $0", 'TAKEN JULY 2027 → JUNE 2028', 'TFSA INCOME DOESN\'T AFFECT OAS', 'EXAMPLES · 2026']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · OAS recovery tax & payment amounts (2026), CRA pension income splitting (T1032), TFSA, OAS deferral · Examples, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf14/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
