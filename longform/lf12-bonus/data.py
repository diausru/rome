"""LF-12 $20,000 bonus. Ontario 2026, single employee. Bonus method (CRA T4127): tax(regular + bonus) - tax(regular).
CPP/EI on the stub depend on year-to-date: March (YTD below maxima) vs December (maxima reached). Same 2026 tables as LF-10."""
import json, os
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'lf10-marginal', 'data.py')}
exec(compile(src, 'lf10data', 'exec'), ns); th = ns['th']
B = 20000
def case(S):
    a, b = th(S), th(S + B)
    tax = round(b['tax'] - a['tax']); cppei_year = round(b['cpp'] + b['ei'] - a['cpp'] - a['ei'])
    return dict(salary=S, tax=tax, cppei_year=cppei_year, keep=B - tax - cppei_year, taken=tax + cppei_year, pct=round((tax + cppei_year) / B * 100, 1))
d = {'bonus': B, 'S60': case(60000), 'S90': case(90000), 'S150': case(150000)}
# stub in March for $90K: CPP 5.95% + CPP... YTD far below maxima -> full CPP + EI on the bonus
d['mar_cpp'] = round(B * 0.0595); d['mar_ei'] = round(B * 0.0163)
d['mar_net'] = B - d['S90']['tax'] - d['mar_cpp'] - d['mar_ei']; d['dec_net'] = B - d['S90']['tax']
d['rrsp10'] = round(th(110000)['tax'] - th(110000, rrsp=10000)['tax'])
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
