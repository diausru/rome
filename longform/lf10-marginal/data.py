"""LF-10 Marginal rates: what is taken from the NEXT $1,000 of employment income, Ontario, 2026, single, no other income.
Same 2026 tables as salary/calc.py + longform/tools/taxcalc.py, PLUS the federal BPA reduction between $181,440 and $258,482
(BPA $16,452 -> $14,829, CRA T4127 Jan 2026). Range shown: $45,000+ (below that, LIFT / Ontario tax reduction / benefits
add their own phase-outs: not modelled, named as a dependency in the script). Sources in FACTS.md."""
import json, sys, os, io, contextlib
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tools'))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'salary'))
from taxcalc import take_home
with contextlib.redirect_stdout(io.StringIO()):
    import calc as C
def bpa_fed(ni):
    if ni <= 181_440: return 16_452
    if ni >= 258_482: return 14_829
    return 16_452 - (ni - 181_440) * 1_623 / 77_042
def th(g, rrsp=0, p='ON'):
    br, bpa = C.PROV[p]
    cpp1 = .0595 * max(0, min(g, C.YMPE) - C.EXEMPT); cpp2 = .04 * max(0, min(g, C.YAMPE) - C.YMPE)
    ei = .0163 * min(g, 68_900); enh = cpp1 / .0595 * .01 + cpp2; base = cpp1 - cpp1 / .0595 * .01
    ti = g - enh - rrsp
    fed = max(0, C.bracket_tax(ti, C.FED) - .14 * (bpa_fed(ti) + base + ei + min(C.CEA, g)))
    pt = max(0, C.bracket_tax(ti, br) - br[0][1] * (bpa + base + ei))
    sur = .20 * max(0, pt - 5_818) + .36 * max(0, pt - 7_446); oh = C.ohp(ti)
    return dict(fed=fed, onb=pt, sur=sur, ohp=oh, cpp=cpp1 + cpp2, ei=ei, tax=fed + pt + sur + oh, keep=g - fed - pt - sur - oh - cpp1 - cpp2 - ei)
for g in (60000, 100000, 150000):
    assert abs(th(g)['keep'] - take_home(g, 'ON')['take_home']) < .01
def nxt(g, d=1000):
    a, b = th(g), th(g + d); r = {k: round(b[k] - a[k]) for k in a}; r['taken'] = d - r['keep']; return r
r = lambda x: int(round(x))
curve = [[g, nxt(g)['taken']] for g in range(45_000, 270_001, 500)]
g = 85_000
while th(g)['sur'] == 0: g += 50
sur_start = g
hook = {str(g): nxt(g) for g in (65_000, 90_000, 120_000)}
rrsp = {str(g): r(th(g)['tax'] - th(g, 1000)['tax']) for g in (65_000, 90_000, 120_000)}
zones = {str(g): nxt(g)['taken'] for g in (50_000, 55_000, 60_000, 70_000, 80_000, 90_000, 100_000, 112_000, 120_000, 160_000, 190_000, 230_000, 265_000)}
ohp_spike = r(th(200_600)['tax'] - th(200_000)['tax'])
bpa_extra = r(th(191_000)['fed'] - th(190_000)['fed'] - 290)
d = dict(rrsp50=r(th(50000)['tax'] - th(50000, 1000)['tax']), curve=curve, hook=hook, rrsp1000=rrsp, zones=zones, ohp_spike600=ohp_spike, bpa_extra_per1000=bpa_extra, sur_start=sur_start)
json.dump(d, open('data.json', 'w'), indent=1)
print(json.dumps({k: v for k, v in d.items() if k != 'curve'}, indent=0))
