"""LF-28 2027 tax brackets. Sources: CRA T4127 124th ed. (Jan 1 2027) via canada.ca search; 2026 = T4127 122nd ed. (salary/calc.py).
Federal 'basic' tax = bracket tax - 14% x BPA (other credits ignored: shown as 'before other credits')."""
import json
def bt(x, br):
    t = 0
    for i, (a, r) in enumerate(br):
        b = br[i+1][0] if i+1 < len(br) else 1e12
        if x > a: t += (min(x, b) - a) * r
    return t
F26 = [(0,.14),(58523,.205),(117045,.26),(181440,.29),(258482,.33)]; B26 = 16452
F27 = [(0,.14),(60044,.205),(120088,.26),(186157,.29),(265203,.33)]; B27 = 16879
fed = lambda x, br, b: max(0, bt(x, br) - .14 * b)
inc = [50000, 75000, 100000, 150000]
cmp_ = {str(g): dict(t26=round(fed(g, F26, B26)), t27=round(fed(g, F27, B27))) for g in inc}
for g in cmp_: cmp_[g]['save'] = cmp_[g]['t26'] - cmp_[g]['t27']
# raise that keeps pace: 75,000 * 1.026
g2 = round(75000 * 1.026)
keep = dict(g=g2, t27=round(fed(g2, F27, B27)), t26_at75=cmp_['75000']['t26'])
# provincial BPA (2026 -> 2027) x lowest rate
P = {'AB': (22769, 23225, .08, '2% cap (Alberta)'), 'SK': (20381, 21411, .105, '2.6% + $500'), 'NS': (11932, 12350, .0879, '3.5%'),
     'NB': (13664, 14019, .094, '2.6%'), 'ON': (12989, 13261, .0505, '2.1%'), 'BC': (13216, 13216, .0506, 'paused 2027-2030'),
     'MB': (15780, 15780, .108, 'not indexed'), 'PE': (15000, 15000, .095, 'not indexed')}
prov = {k: dict(b26=a, b27=b, gain=b - a, value=round((b - a) * r), note=n) for k, (a, b, r, n) in P.items()}
d = dict(index=2.6, fed26=[58523,117045,181440,258482], fed27=[60044,120088,186157,265203], bpa26=B26, bpa27=B27, bpa_gain=B27-B26, bpa_value=round((B27-B26)*.14),
         cmp=cmp_, keep=keep, prov=prov, on27=[55023,110049], on26=[53891,107785], ab27=62424, ab26=61200,
         ccb_u6=8157, ccb_617=6883, ccb_lo=38237, ccb_hi=82847, cdb=3480, cgeb_single=679, cgeb_couple=890, cgeb_child=234,
         ympe27=76700, yampe27=87400, ei_rate=1.64, mie27=70800, ei_max=1161.12, rrsp27=35390)
json.dump(d, open('data.json','w'), indent=1); print(json.dumps({k:v for k,v in d.items() if k in ('cmp','keep','prov','bpa_value')}, indent=0))
