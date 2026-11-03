"""LF-18 Refund != less tax. Ontario 2026, $70,000 salary (LF-10 th()). Withholding assumed = actual tax for Jay; Mia asks
for $150 extra per paycheque (26 pays, TD1); Ava contributes $10,000 to an RRSP herself (no T1213)."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(H, '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(H, '..', 'lf10-marginal', 'data.py')}; exec(compile(src, 'x', 'exec'), ns); th = ns['th']
r = lambda x: int(round(x))
S = 70000; tax = r(th(S)['tax']); rr = r(th(S)['tax'] - th(S, rrsp=10000)['tax'])
d = dict(salary=S, tax=tax, extra_pp=150, pays=26, extra=150 * 26, mia_withheld=tax + 3900, mia_refund=3900, jay_refund=0,
         ava_tax=tax - rr, ava_saving=rr, monthly=r(3900 / 12), keep=r(th(S)['keep']))
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
