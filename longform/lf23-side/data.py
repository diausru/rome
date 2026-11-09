"""LF-23 Side hustle. Ontario 2026 (LF-10 th()). Maya: $70,000 job + side business (T2125): sales $14,000, expenses $4,000 -> profit $10,000.
Income tax on the profit = th(70000, rrsp=-profit) - th(70000) (CPP on self-employment not modelled; mentioned qualitatively)."""
import json, os, io, contextlib
H = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(H, '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(H, '..', 'lf10-marginal', 'data.py')}
with contextlib.redirect_stdout(io.StringIO()): exec(compile(src, 'x', 'exec'), ns)
th = ns['th']; r = lambda x: int(round(x))
extra = lambda g, a: r(th(g, rrsp=-a)['tax'] - th(g)['tax'])
S, sales, exp = 70000, 14000, 4000; profit = sales - exp
d = dict(salary=S, sales=sales, expenses=exp, profit=profit, tax_profit=extra(S, profit), tax_noexp=extra(S, sales))
d['exp_saving'] = d['tax_noexp'] - d['tax_profit']; d['rate'] = round(100 * d['tax_profit'] / profit, 1); d['monthly'] = r(d['tax_profit'] / 12)
d['keep'] = profit - d['tax_profit']; d['tax_45'] = extra(45000, profit); d['tax_110'] = extra(110000, profit)
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
