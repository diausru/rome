"""LF-13 Federal vs provincial income tax. 2026, single employee, employment income only.
ON uses th() from LF-10 (BPA reduction, surtax, OHP); AB/BC use tools/taxcalc.take_home (same 2026 tables; no ON surtax/OHP).
Quebec: not computed (own return, Revenu Québec; 16.5% abatement named only)."""
import json, os, sys
H = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(H, '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(H, '..', 'lf10-marginal', 'data.py')}
exec(compile(src, 'lf10data', 'exec'), ns); th = ns['th']
sys.path.insert(0, os.path.join(H, '..', 'tools')); from taxcalc import take_home
r = lambda x: int(round(x))
def on(g, rrsp=0):
    t = th(g, rrsp); prov = t['onb'] + t['sur'] + t['ohp']
    return dict(salary=g, fed=r(t['fed']), prov=r(prov), onb=r(t['onb']), sur=r(t['sur']), ohp=r(t['ohp']), tax=r(t['tax']), cppei=r(t['cpp'] + t['ei']), keep=r(t['keep']), fedpct=round(t['fed'] / t['tax'] * 100))
d = {'G': 75000, 'ON75': on(75000)}
for p in ('AB', 'BC'):
    t = take_home(75000, p); d[p + '75'] = dict(fed=r(t['federal']), prov=r(t['provincial']), tax=r(t['federal'] + t['provincial']))
d['ladder'] = {str(g): on(g) for g in (40000, 75000, 150000, 250000)}
a, b = on(75000), on(75000, 1000)
d['rrsp1000'] = dict(fed=a['fed'] - b['fed'], prov=a['prov'] - b['prov']); d['rrsp1000']['total'] = d['rrsp1000']['fed'] + d['rrsp1000']['prov']
d['per_month_fed'] = r(a['fed'] / 12); d['per_month_prov'] = r(a['prov'] / 12)
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
