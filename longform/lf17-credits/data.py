"""LF-17 Tax credits vs deductions. Ontario 2026, employment income (LF-10 th()). $1,000 deduction = RRSP-type deduction;
$1,000 non-refundable credit AMOUNT = 14% federal + 5.05% Ontario (lowest rates); refundable credit paid even with no tax."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(H, '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(H, '..', 'lf10-marginal', 'data.py')}; exec(compile(src, 'x', 'exec'), ns); th = ns['th']
r = lambda x: int(round(x))
people = {'nina': 14000, 'omar': 65000, 'priya': 120000}
d = {'credit_rate': 0.1905, 'credit_value': 190.5}
for k, g in people.items():
    t = th(g); ded = t['tax'] - th(g, rrsp=1000)['tax']
    d[k] = dict(income=g, tax=r(t['tax']), ded=r(ded), credit=min(190.5, round(t['tax'], 2)))
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
