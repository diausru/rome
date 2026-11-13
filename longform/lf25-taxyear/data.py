"""LF-25 The complete Canadian tax year. Dana from LF-19 ($90,000, Ontario 2026, 26 pays). Withholding = annual tax / 26 (LF-19).
February 2027: $5,000 RRSP contribution deducted on the 2026 return -> refund = th(90000) - th(90000, rrsp=5000)."""
import json, os, io, contextlib
H = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(H, '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(H, '..', 'lf10-marginal', 'data.py')}
with contextlib.redirect_stdout(io.StringIO()): exec(compile(src, 'x', 'exec'), ns)
th = ns['th']; r = lambda x: int(round(x))
p = json.load(open(os.path.join(H, '..', 'lf19-paycheque', 'data.json')))
d = dict(salary=90000, first_net=p['first']['net'], last_net=p['last']['net'], raise_pp=p['raise_pp'], tax_year=p['tax_year'], withheld=p['tax_year'],
         rrsp=5000, refund=r(th(90000)['tax'] - th(90000, rrsp=5000)['tax']))
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
