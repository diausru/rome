"""All LF-06 numbers in one place (sources in FACTS.md). 2026 tables via tools/taxcalc.py (single employee, employment income only)."""
import json, sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tools'))
from taxcalc import take_home, C
G = (80000, 100000, 150000)
PROVS = ['ON', 'AB', 'BC', 'SK', 'MB', 'NB', 'NL', 'NS', 'PE']
def th(g, p, ded=0):
    """take_home with an optional deduction (e.g. RRSP) from taxable income; payroll CPP/EI unchanged."""
    br, bpa = C.PROV[p]
    cpp1 = .0595 * max(0, min(g, C.YMPE) - C.EXEMPT); cpp2 = .04 * max(0, min(g, C.YAMPE) - C.YMPE)
    ei = .0163 * min(g, 68_900); enh = cpp1 / .0595 * .01 + cpp2; base = cpp1 - cpp1 / .0595 * .01
    ti = g - enh - ded
    fed = max(0, C.bracket_tax(ti, C.FED) - .14 * (C.FED_BPA + base + ei + min(C.CEA, g)))
    pt = max(0, C.bracket_tax(ti, br) - br[0][1] * (bpa + base + ei))
    extra = (.20 * max(0, pt - 5_818) + .36 * max(0, pt - 7_446) + C.ohp(ti)) if p == 'ON' else 0
    return dict(fed=fed, prov=pt + extra, sur=(.20 * max(0, pt - 5_818) + .36 * max(0, pt - 7_446)) if p == 'ON' else 0,
                ohp=C.ohp(ti) if p == 'ON' else 0, cpp=cpp1 + cpp2, ei=ei, ti=ti, keep=g - fed - pt - extra - cpp1 - cpp2 - ei)
# cross-check against taxcalc
for g in G:
    for p in PROVS: assert abs(th(g, p)['keep'] - take_home(g, p)['take_home']) < 0.01
r = lambda x: int(round(x))
on = {str(g): {k: r(v) for k, v in th(g, 'ON').items()} for g in G}
for g in G:
    o = on[str(g)]; o['tax'] = o['fed'] + o['prov']; o['avg'] = round((o['tax']) / g * 100, 1); o['month'] = r(th(g, 'ON')['keep'] / 12)
    o['deduct_total'] = g - o['keep']; o['marg'] = round((th(g, 'ON')['keep'] - th(g + 1000, 'ON')['keep'] + 1000) / 10, 1)  # % of next $1,000 lost
    o['keep_per_1000'] = r(th(g + 1000, 'ON')['keep'] - th(g, 'ON')['keep'])
step1 = {'raise': 20000, 'keep': on['100000']['keep'] - on['80000']['keep']}; step1['pct'] = round(step1['keep'] / 200, 1)
step2 = {'raise': 50000, 'keep': on['150000']['keep'] - on['100000']['keep']}; step2['pct'] = round(step2['keep'] / 500, 1)
whole = {'raise': 70000, 'keep': on['150000']['keep'] - on['80000']['keep']}; whole['pct'] = round(whole['keep'] / 700, 1)
# where the extra goes per step
def diff(a, b, k): return on[b][k] - on[a][k]
split1 = {k: diff('80000', '100000', k) for k in ('fed', 'prov', 'cpp', 'ei')}
split2 = {k: diff('100000', '150000', k) for k in ('fed', 'prov', 'cpp', 'ei')}
prov = {p: {str(g): r(th(g, p)['keep']) for g in G} for p in PROVS}
rank150 = sorted(PROVS, key=lambda p: -prov[p]['150000'])
rrsp = {str(g): r(th(g, 'ON')['keep'] * 0 + (th(g, 'ON', 10000)['keep'] - th(g, 'ON')['keep'])) for g in G}  # tax saved by a $10,000 deduction
D = dict(on=on, step1=step1, step2=step2, whole=whole, split1=split1, split2=split2, prov=prov, rank150=rank150,
         gap150_on_ab=prov['AB']['150000'] - prov['ON']['150000'], gap80_on_ab=prov['AB']['80000'] - prov['ON']['80000'],
         rrsp10k=rrsp, fed_bracket2=117045, on_bracket3=107785, on_bracket4=150000)
json.dump(D, open('data.json', 'w'), indent=1); print(json.dumps(D, indent=0))
