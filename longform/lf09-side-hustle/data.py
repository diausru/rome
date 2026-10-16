"""LF-09 side hustle — job + self-employment (net business income) in Ontario, 2026. Sources in FACTS.md.
Model (single, Ontario, no other income/credits): employee CPP/EI on the job; self-employed CPP (11.9% base+first additional,
8% CPP2) on business income only up to the room the job left (Schedule 8 logic); line 22200 deduction = employer half (5.95%)
+ enhanced employee part (1%) + all CPP2; line 31000 credit = 4.95% base employee half; no EI on business income."""
import json, sys, os, io, contextlib
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tools'))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'salary'))
from taxcalc import take_home
with contextlib.redirect_stdout(io.StringIO()):
    import calc as C
def calc(E, B, p='ON'):
    br, bpa = C.PROV[p]
    c1e = .0595 * max(0, min(E, C.YMPE) - C.EXEMPT); c2e = .04 * max(0, min(E, C.YAMPE) - C.YMPE)
    ei = .0163 * min(E, 68_900); enh_e = c1e / .0595 * .01 + c2e; base_e = c1e - c1e / .0595 * .01
    sp = max(0, min(E + B, C.YMPE) - max(E, C.EXEMPT)); c1s = .119 * sp
    c2s = .08 * max(0, min(E + B, C.YAMPE) - max(E, C.YMPE))
    ded_s = .0595 * sp + .01 * sp + c2s; base_s = .0495 * sp
    ti = E + B - enh_e - ded_s
    fed = max(0, C.bracket_tax(ti, C.FED) - .14 * (C.FED_BPA + base_e + base_s + ei + min(C.CEA, E)))
    pt = max(0, C.bracket_tax(ti, br) - br[0][1] * (bpa + base_e + base_s + ei))
    extra = (.20 * max(0, pt - 5_818) + .36 * max(0, pt - 7_446) + C.ohp(ti)) if p == 'ON' else 0
    tax = fed + pt + extra
    return dict(tax=tax, fed=fed, prov=pt + extra, cpp_e=c1e + c2e, cpp_s=c1s + c2s, ei=ei, keep=E + B - tax - c1e - c2e - c1s - c2s - ei)
for E in (40000, 60000, 90000):
    assert abs(calc(E, 0)['keep'] - take_home(E, 'ON')['take_home']) < .01
r = lambda x: int(round(x)); B = 10000
S = {}
for E in (40000, 60000, 90000, 130000):
    a, b = calc(E, 0), calc(E, B)
    S[str(E)] = dict(keep=r(b['keep'] - a['keep']), tax=r(b['tax'] - a['tax']), cpp=r(b['cpp_s']), fed=r(b['fed'] - a['fed']), prov=r(b['prov'] - a['prov']))
    S[str(E)]['pct'] = round(S[str(E)]['keep'] / B * 100, 1)
# same $10K as a raise at the job (employment) for comparison at 60K
raise60 = r(take_home(70000, 'ON')['take_home'] - take_home(60000, 'ON')['take_home'])
# $3,000 of business expenses at 60K: net 7,000 instead of 10,000
exp60 = r(calc(60000, 10000)['keep'] - calc(60000, 7000)['keep'])
D = dict(B=B, side=S, raise60=raise60, exp3000_cost_diff=exp60, set_aside60=S['60000']['tax'] + S['60000']['cpp'])
json.dump(D, open('data.json', 'w'), indent=1); print(json.dumps(D, indent=0))
