"""LF-16 CCB July 2026-June 2027 (based on 2025 AFNI). One child under 6: max $8,157, reduced 7% of AFNI above $38,237 (up to $82,847).
Three children: 19% in the same range (rate only). RRSP tax saving: LF-10 th() (Ontario 2026, employment income). Sources: FACTS.md."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(H, '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(H, '..', 'lf10-marginal', 'data.py')}; exec(compile(src, 'x', 'exec'), ns); th = ns['th']
MAX, T1, T2, R1, R3 = 8157, 38237, 82847, 0.07, 0.19
ccb = lambda afni: round(MAX - R1 * max(0, min(afni, T2) - T1))
r = lambda x: int(round(x))
d = dict(max=MAX, t1=T1, t2=T2, r1=R1, r3=R3, monthly=679.75, afni=70000, rrsp=10000)
d['ccb_before'] = ccb(70000); d['ccb_after'] = ccb(60000); d['ccb_gain'] = d['ccb_after'] - d['ccb_before']
d['tax_saving'] = r(th(70000)['tax'] - th(70000, rrsp=10000)['tax'])
d['total'] = d['ccb_gain'] + d['tax_saving']
d['per1000_1'] = r(1000 * R1); d['per1000_3'] = r(1000 * R3); d['gain3'] = r(10000 * R3)
d['lost_full'] = r(MAX * 1)  # not filing: no CCB at all
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
