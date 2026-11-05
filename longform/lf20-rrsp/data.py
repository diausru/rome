"""LF-20 RRSP with real numbers. Ontario 2026 (LF-10 th()). Same $10,000 RRSP deduction at different employment incomes.
Saving = th(g) tax - th(g, rrsp=10000) tax. 'Later' examples: deduction carried forward to a higher-income year (CRA: unused contributions
can be deducted in a later year up to that year's limit); withdrawal illustrated as extra $10,000 of income at a given salary level (rrsp=-10000)."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(H, '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(H, '..', 'lf10-marginal', 'data.py')}; exec(compile(src, 'x', 'exec'), ns); th = ns['th']
r = lambda x: int(round(x))
sav = lambda g, a=10000: r(th(g)['tax'] - th(g, rrsp=a)['tax'])
wd = lambda g, a=10000: r(th(g, rrsp=-a)['tax'] - th(g)['tax'])
P = {'Ben': 22000, 'Ella': 45000, 'Ravi': 75000, 'Kate': 110000, 'Marc': 160000}
d = dict(people={k: dict(salary=g, saving=sav(g), pct=round(100 * sav(g) / 10000, 1), tax=r(th(g)['tax'])) for k, g in P.items()},
         limit2026=33810, limit2027=35390, pct=18,
         room_ravi=r(.18 * 75000), room_kate=r(min(.18 * 110000, 33810)), room_marc=r(min(.18 * 160000, 33810)),
         noor_now=sav(45000), noor_later=sav(90000), kate_wd45=wd(45000), kate_wd110=wd(110000),
         ben_tax=r(th(22000)['tax']), ben_1k=sav(22000, 1000))
d['noor_gain'] = d['noor_later'] - d['noor_now']; d['kate_net'] = d['people']['Kate']['saving'] - d['kate_wd45']
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
