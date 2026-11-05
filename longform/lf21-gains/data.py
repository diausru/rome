"""LF-21 Capital gains with a real example. Ontario 2026 (LF-10 th()), inclusion rate one-half (2026: proposed increase cancelled).
Leah, $70,000 salary: buys 400 shares at $50 + $10 commission (ACB $20,010), sells at $80 ($32,000). Tax on gain = th(g, rrsp=-taxable) - th(g)."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(H, '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(H, '..', 'lf10-marginal', 'data.py')}; exec(compile(src, 'x', 'exec'), ns); th = ns['th']
r = lambda x: int(round(x))
extra = lambda g, a: r(th(g, rrsp=-a)['tax'] - th(g)['tax'])
S = 70000; acb = 400 * 50 + 10; proc = 400 * 80; gain = proc - acb; taxable = gain / 2
d = dict(salary=S, shares=400, buy=50, sell=80, comm=10, acb=acb, proceeds=proc, gain=gain, taxable=r(taxable),
         tax_gain=extra(S, taxable), tax_salary=extra(S, gain), tax_gain_120=extra(120000, taxable), tax_gain_40=extra(40000, taxable),
         loss=4000, net_gain=gain - 4000, tax_net=extra(S, (gain - 4000) / 2))
d['keep_gain'] = gain - d['tax_gain']; d['keep_salary'] = gain - d['tax_salary']; d['diff'] = d['tax_salary'] - d['tax_gain']
d['eff'] = round(100 * d['tax_gain'] / gain, 1); d['saved_by_loss'] = d['tax_gain'] - d['tax_net']
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
