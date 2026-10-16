"""LF-08 same salary in AB / MB / ON — numbers (sources in FACTS.md). 2026 tables via tools/taxcalc.py."""
import json, sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tools'))
from taxcalc import take_home
r = lambda x: int(round(x)); P = ['AB', 'ON', 'MB']; G = [60000, 100000, 150000]
k = {p: {str(g): {kk: r(v) for kk, v in take_home(g, p).items() if isinstance(v, (int, float)) and kk not in ('avg_income_tax', 'top_bracket_rate')} for g in G} for p in P}
for p in P:
    for g in G: k[p][str(g)]['marg'] = round(((take_home(g, p)['take_home'] - take_home(g + 1000, p)['take_home']) + 1000) / 10, 1)
SALES = {'AB': 5, 'MB': 12, 'ON': 13}   # GST 5 / GST 5 + RST 7 / HST 13 (percent, general rates)
SPEND = 20000                          # illustration: $20,000 a year of purchases taxable at the general rate (assumption, shown on screen)
D = dict(k=k, sales=SALES, spend=SPEND, sales_tax={p: r(SPEND * SALES[p] / 100) for p in P},
         per1000={p: SALES[p] * 10 for p in P},
         gap100={'AB_ON': k['AB']['100000']['take_home'] - k['ON']['100000']['take_home'], 'AB_MB': k['AB']['100000']['take_home'] - k['MB']['100000']['take_home']},
         gap60={'AB_ON': k['AB']['60000']['take_home'] - k['ON']['60000']['take_home'], 'AB_MB': k['AB']['60000']['take_home'] - k['MB']['60000']['take_home']},
         gap150={'AB_ON': k['AB']['150000']['take_home'] - k['ON']['150000']['take_home'], 'AB_MB': k['AB']['150000']['take_home'] - k['MB']['150000']['take_home']})
D['after_spend'] = {p: k[p]['100000']['take_home'] - D['sales_tax'][p] for p in P}
# RRSP-style $10,000 deduction: reuse LF-06's th() (take-home with a deduction from taxable income)
_src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'lf06-80-100-150', 'data.py')).read().split('# cross-check')[0]
_ns = {'__file__': os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'lf06-80-100-150', 'data.py')}; exec(_src, _ns); th = _ns['th']
D['rrsp10k'] = {p: r(th(100000, p, 10000)['keep'] - th(100000, p)['keep']) for p in P}
D['rrsp10k_150'] = {p: r(th(150000, p, 10000)['keep'] - th(150000, p)['keep']) for p in P}
D['month100'] = {p: r(k[p]['100000']['take_home'] / 12) for p in P}
D['keep1000'] = {p: r(1000 - k[p]['100000']['marg'] * 10) for p in P}
json.dump(D, open('data.json', 'w'), indent=1)
for p in P: print(p, {g: (k[p][str(g)]['take_home'], k[p][str(g)]['provincial'], k[p][str(g)]['marg']) for g in G}, D['sales_tax'][p], D['after_spend'][p])
print(D['gap60'], D['gap100'], D['gap150'])
