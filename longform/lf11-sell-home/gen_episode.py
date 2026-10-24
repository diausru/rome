import json
L = json.load(open("lines.json")); d = json.load(open("data.json"))
CH = {"L6", "L18", "L31", "L40", "L46", "L52"}
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
PL = 'lf/lf10/plates/'
m = lambda v: '${:,}'.format(v)
PL = 'lf/lf11/plates/'
D = d
events = [
 scene('L1', P('sold', 0, 0, 1920, 'L1', glass=False, fxIn='fade', fxOut='fade', inDur=0.01, off=-1.0,
   bg={'src': PL + 's1.jpg', 'depth': PL + 's1_d.png', 'dim': 0.6}, kicker='SAME PROFIT · 3 SELLERS · 2026', title='SAME $150,000 PROFIT.', finishTitle='3 VERY DIFFERENT TAX BILLS', gain=150000,
   cards=[{'name': 'MIA', 'sub': 'LIVED IN IT', 'tax': 0, 'tone': 'good'}, {'name': 'DEV', 'sub': 'SOLD IN 10 MONTHS', 'tax': D['B'], 'tone': 'bad'}, {'name': 'LENA', 'sub': 'RENTED IT OUT', 'tax': D['C'], 'tone': 'mid'}],
   cardAt=[W('L1', 'Three'), W('L1', 'Same'), W('L1', 'profit')], stampAt=[W('L2', 'nothing'), W('L2', 'sixty-five'), W('L2', 'twenty-nine')], finishAt=W('L3', 'bills'),
   qAt=W('L4', 'which'), question='WHICH ONE ARE YOU?', out=W('L6', None, -0.9)), off=-1.0),
 K('L5', [ln('2026 · ONTARIO · SINGLE · $90,000 SALARY', 46, 'L5'), ln('EXAMPLES, NOT REAL PEOPLE · GENERAL INFO, NOT ADVICE', 40, 'L5', 'Examples')], kicker='THE FINE PRINT', y=360),
 K('L6', [dc('MIA’S ZERO', 130, 'L6', 'Mia')], kicker='01', fxIn='focus', fxOut='wipe', y=330),
 ST('L7', 'PRINCIPAL RESIDENCE EXEMPTION', [it('1', 'YOUR HOME FOR EVERY YEAR YOU OWNED IT', 'L7', 'every'), it('=', 'PROFIT ON THE SALE: NOT TAXED', 'L7', 'taxed'), it('≠', 'NOT "ONCE IN A LIFETIME"', 'L11', 'once')], fxIn='glass', dimOthers=True, y=220),
 SPLIT('L9', 'MIA · THE SALE', '2026 · EXAMPLE', [{'name': 'BOUGHT', 'value': 450000}, {'name': 'SOLD', 'value': 600000}, {'name': 'TAX ON THE PROFIT', 'value': 0}],
       [W('L9', 'bought'), W('L9', 'sold'), W('L10', 'zero')], 'PROFIT $150,000 · TAX $0', fxIn='slideR'),
 scene('L11', P('misconception', 360, 300, 1200, 'L11', fxIn='glass', fxOut='vapor', title='THE EXEMPTION MYTH', wrong={'label': 'ONLY ONCE IN YOUR LIFE', 'text': 'MYTH'}, fix={'label': 'ONE HOME PER FAMILY UNIT, PER YEAR', 'text': 'THE REAL LIMIT', **W('L11', 'limit')})),
 ST('L13', 'THE CATCH · REPORT THE SALE', [it('SINCE 2016', 'REPORT IT ON YOUR RETURN', 'L13', 'Since'), it('SCH. 3', 'SCHEDULE 3', 'L13', 'three'), it('T2091', 'FORM T2091(IND)', 'L13', 'zero'), it('!', 'NOT REPORTED: CRA CAN REFUSE THE EXEMPTION', 'L15', 'refuse')], fxIn='stagger', dimOthers=True, y=190),
 K('L16', [ln('TAX: ZERO', 80, 'L16', 'zero', gold=True), ln('PAPERWORK: NOT OPTIONAL', 70, 'L16', 'paperwork')], kicker='MIA', fxIn='glass', y=350),
 K('L17', [ln('A LOSS ON YOUR HOME', 70, 'L17', 'loss'), ln('CAN’T BE CLAIMED (PERSONAL-USE PROPERTY)', 52, 'L17', 'personal-use', gold=True)], kicker='THE OTHER SIDE', fxIn='glass', y=350),
 K('L18', [dc('DEV’S FLIP', 130, 'L18', 'Dev')], kicker='02', fxIn='focus', fxOut='wipe', y=330),
 scene('L20', P('timeline', 200, 230, 1520, 'L20', fxIn='wipe', fxOut='defocus', title='THE FLIPPING RULE · SALES SINCE 2023', sub='CANADA.CA', points=[
   {'date': 'DAY 1', 'label': 'DEV BUYS THE HOUSE', 'at': 'L19', 'word': 'bought'},
   {'date': '10 MONTHS', 'label': 'DEV SELLS · PROFIT $150,000', 'at': 'L19', 'word': 'ten'},
   {'date': '< 365 DAYS', 'label': 'OWNED LESS THAN 365 DAYS IN A ROW', 'at': 'L20', 'word': 'less'},
   {'date': 'RESULT', 'label': 'BUSINESS INCOME · NO EXEMPTION', 'at': 'L21', 'word': 'Not', 'red': True}])),
 ST('L22', 'BUSINESS INCOME: 100% TAXABLE', [it('+', '$150,000 ADDED TO $90,000 SALARY', 'L22', 'added'), it('=', f"TAXABLE INCOME ≈ {m(D['ti_B'])}", 'L23', 'two'), it('↑', 'THROUGH THE HIGHEST BRACKETS (SEE LF-10)', 'L24', 'line')], fxIn='glass', dimOthers=True, y=240),
 SPLIT('L25', 'DEV · EXTRA TAX ON THE FLIP', '2026 · ONTARIO', [{'name': 'EXTRA TAX', 'value': D['B']}, {'name': 'DEV KEEPS', 'value': D['B_keep']}],
       [W('L25', 'sixty-five'), W('L25', 'cents')], f"{D['B']/1500:.1f}% OF THE PROFIT", fxIn='slideL'),
 K('L27', [ln('A LOSS ON A FLIP?', 70, 'L27', 'lost'), ln('TREATED AS NIL', 110, 'L27', 'nil', gold=True)], kicker='THE RULE CUTS ONE WAY', fxIn='glass', y=340),
 ST('L28', 'EXCEPTIONS · LIFE EVENTS', [it('1', 'DEATH · NEW CHILD · RELATIVE JOINS HOUSEHOLD', 'L28', 'death'), it('2', 'SEPARATION OF 90+ DAYS', 'L28', 'ninety'), it('3', 'SERIOUS ILLNESS OR DISABILITY · THREAT TO SAFETY', 'L29', 'illness'),
   it('4', 'MOVE 40+ KM CLOSER TO WORK OR SCHOOL', 'L29', 'forty'), it('5', 'JOB LOSS · INSOLVENCY', 'L29', 'Losing')], fxIn='stagger', dimOthers=True, y=180),
 K('L31', [dc('LENA’S RENTAL', 130, 'L31', 'Lena')], kicker='03', fxIn='focus', fxOut='wipe', y=330),
 ST('L33', 'ORDINARY CAPITAL GAIN', [it('1', 'NOT A FLIP · NOT A PRINCIPAL RESIDENCE', 'L33', 'flip'), it('½', 'ONLY ONE HALF OF THE GAIN IS TAXABLE', 'L33', 'half'), it('✓', 'INCREASE TO 2/3 WAS CANCELLED', 'L34', 'cancelled')], fxIn='glass', dimOthers=True, y=240),
 SPLIT('L35', 'LENA · THE TAX', '2026 · ONTARIO', [{'name': 'ADDED TO INCOME', 'value': 75000}, {'name': 'EXTRA TAX', 'value': D['C']}, {'name': 'LENA KEEPS', 'value': D['C_keep']}],
       [W('L35', 'seventy-five'), W('L35', 'tax'), W('L38', 'Lena')], f"{D['C']/1500:.1f}% OF THE PROFIT", fxIn='slideR'),
 K('L36', [ln('RENTAL OWNERS: CCA CLAIMED?', 60, 'L36', 'capital'), ln('RECAPTURE ADDS TO INCOME', 80, 'L36', 'added', gold=True)], kicker='FORM T776', fxIn='glass', y=340),
 SPLIT('L37', 'SAME PROFIT · WHO KEEPS WHAT', '2026 · ONTARIO · $90K SALARY', [{'name': 'MIA · EXEMPT', 'value': 150000}, {'name': 'LENA · CAPITAL GAIN', 'value': D['C_keep']}, {'name': 'DEV · BUSINESS INCOME', 'value': D['B_keep']}],
       [W('L38', 'Mia'), W('L38', 'Lena'), W('L38', 'Dev')], f"DEV VS LENA: {m(D['diff_BC'])} DIFFERENCE", fxIn='glass'),
 K('L39', [ln('EXEMPT · CAPITAL GAIN · BUSINESS INCOME', 56, 'L39', 'buckets'), ln('THE BUCKET DECIDES EVERYTHING', 76, 'L39', 'decides', gold=True)], kicker='THREE BUCKETS', fxIn='glass', y=340),
 K('L40', [dc('THE GRAY ZONES', 120, 'L40', 'gray')], kicker='04', fxIn='focus', fxOut='wipe', y=330),
 ST('L41', 'WHERE PEOPLE GET CAUGHT', [it('1', 'MOVE OUT AND RENT IT: DEEMED SALE AT MARKET VALUE', 'L41', 'market'), it('45(2)', 'ELECT IN A LETTER · UP TO 4 YEARS (EXTENDABLE)', 'L42', 'election'),
   it('2', 'RENT PART OF IT: ELECTION ALLOWED SINCE MARCH 2019', 'L43', 'March'), it('3', 'HOME + COTTAGE: ONE PER YEAR · FILE T2091', 'L44', 'cottage'), it('+1', 'PLUS-ONE RULE: SELL AND BUY IN THE SAME YEAR', 'L45', 'plus')], fxIn='stagger', dimOthers=True, y=170),
 K('L46', [dc('BEFORE YOU SELL', 120, 'L46', 'before')], kicker='05', fxIn='focus', fxOut='wipe', y=330),
 ST('L47', '4 STEPS', [it('1', 'COUNT THE DAYS: UNDER 365? CHECK THE FLIP RULE', 'L47', 'Count'), it('2', 'WHAT WAS IT EACH YEAR: HOME · RENTAL · BUSINESS?', 'L48', 'bucket'),
   it('3', 'KEEP PURCHASE, SALE AND IMPROVEMENT PAPERWORK', 'L49', 'paperwork'), it('4', 'REPORT THE SALE, EVEN AT $0 TAX', 'L50', 'Report')], fxIn='glass', dimOthers=True, y=200),
 K('L51', [ln('FEDERAL RULES · ALL OF CANADA', 66, 'L51', 'federal'), ln('QUEBEC FILES ITS OWN RETURN', 76, 'L51', 'Quebec', gold=True)], kicker='YOUR PROVINCE', fxIn='glass', y=340),
 K('L52', [dc('WHAT DID WE LEARN?', 140, 'L52', 'learn')], fxIn='focus', fxOut='wipe', y=330),
 ST('L53', 'SELLING A HOME · 4 RULES', [it('1', 'LIVED IN IT: TAX-FREE, BUT REPORT IT', 'L53', 'report'), it('2', 'UNDER 365 DAYS: FULLY TAXED, LOSS IS NIL', 'L54', 'business'),
   it('3', 'RENTAL: HALF THE GAIN IS TAXABLE', 'L55', 'half'), it('4', 'MOVING OUT OR A COTTAGE? CHECK FIRST', 'L56', 'Check')], fxIn='glass', dimOthers=True, y=200),
 K('L57', [mo([{'text': 'A $20,000 BONUS', 't': 0}, {'text': 'DID THEY TAKE HALF?', **W('L57', 'half')}], 110, 'L57', gold=True), ln('NEXT ON TAX SECRETS CANADA', 50, 'L57', 'Subscribe')], fxIn='glass', fxOut='fade'),
]
chapters = [{'at': a, 'title': t} for a, t in [('L1', 'Same profit, three bills'), ('L6', '01 · Mia: the exemption'), ('L18', '02 · Dev: the flip'), ('L31', '03 · Lena: the rental'), ('L40', '04 · Gray zones'), ('L46', '05 · Before you sell'), ('L52', 'Verdict')]]
plates = {n: {'photo': {'src': f'{PL}{n}.jpg', 'depth': f'{PL}{n}_d.png', 'amt': 0.05}} for n in ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8']}
def cam(*ks): return [dict(x=a, y=b, z=c) for a, b, c in ks]
M = [('L1', 's1', cam((0, 20, 0.05), (0, -20, 0.3))), ('L6', 's2', cam((40, 0, 0.05), (-30, 0, 0.2))), ('L13', 's5', cam((-40, 10, 0.1), (30, 0, 0.18))), ('L18', 's3', cam((0, 40, 0.0), (0, -40, 0.25))),
     ('L31', 's4', cam((-40, 0, 0.05), (30, 0, 0.18))), ('L37', 's5', cam((30, 0, 0.2), (-30, 10, 0.05))), ('L40', 's6', cam((40, 10, 0.1), (-30, 0, 0.2))), ('L44', 's7', cam((-30, 0, 0.0), (30, 0, 0.2))),
     ('L46', 's5', cam((50, 0, 0.12), (-50, 0, 0.12))), ('L52', 's8', cam((-40, 10, 0.0), (40, -10, 0.15)))]
shots = [{'at': a, 'plate': p, 'cam': c} for a, p, c in M]
sfx = []
for e in events:
    for p in e['panels']:
        sfx.append({'name': 'whoosh', 'vol': 0.09, 'at': p['at'], **({'word': p['word']} if 'word' in p else {})})
        for r in (p.get('items') if isinstance(p.get('items'), list) else []) + (p.get('rowAt') or []):
            if 'at' in r: sfx.append({'name': 'tick', 'vol': 0.12, **{kk: v for kk, v in r.items() if kk in ('at', 'word')}})
h = events[0]['panels'][0]
for r in h['cardAt']: sfx.append({'name': 'tick', 'vol': 0.12, **r})
for r in h['stampAt']: sfx.append({'name': 'tick', 'vol': 0.2, **r})
sfx.append({'name': 'whoosh', 'vol': 0.2, **h['finishAt']})
for sh in shots[1:]: sfx.append({'name': 'whoosh', 'vol': 0.06, 'at': sh['at']})
ticker = [f"MIA ${0} · LENA {m(D['C'])} · DEV {m(D['B'])}", 'FLIP RULE: UNDER 365 DAYS · SALES SINCE 2023', 'CAPITAL GAINS: 1/2 TAXABLE', 'REPORT THE SALE: SCHEDULE 3 + T2091', '2026 RATES · ONTARIO · EXAMPLE']
ep = {'fps': 30, 'lead': 0.8, 'tail': 2.0, 'footer': 'Sources: canada.ca · CRA T4037, Folio S1-F3-C2 · 2026 rates · Example calculation, general info, not advice',
      'vo': vo, 'chapters': chapters, 'events': events, 'shots': shots, 'plates': plates, 'sfx': sfx, 'ticker': ticker, 'audio': 'lf/lf11/mix.wav', 'music': 'music.wav', 'musicVol': 0.05}
json.dump(ep, open('episode.src.json', 'w'), indent=1); print('events', len(events), 'sfx', len(sfx))
