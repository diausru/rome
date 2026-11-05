"""LF-19 Paycheque line by line. Ontario 2026, $90,000 salary, 26 biweekly pays. CPP 5.95% (exemption $3,500/yr = $134.62/pay) to $74,600;
CPP2 4% $74,600–$85,000; EI 1.63% to $68,900. Income tax per pay = annual tax / 26 (approximation of payroll's annualized formula)."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(H, '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(H, '..', 'lf10-marginal', 'data.py')}; exec(compile(src, 'x', 'exec'), ns); th = ns['th']
S, N = 90000, 26; G = S / N; EX = 3500 / N
t = th(S); tax_pp = t['tax'] / N
ytd = cpp_ytd = cpp2_ytd = ei_ytd = 0; rows = []
for i in range(1, N + 1):
    ytd0, ytd = ytd, ytd + G
    cpp = min(.0595 * (G - EX), 4230.45 - cpp_ytd); cpp_ytd += cpp
    cpp2 = .04 * max(0, min(ytd, 85000) - max(ytd0, 74600)); cpp2 = min(cpp2, 416 - cpp2_ytd); cpp2_ytd += cpp2
    ei = min(.0163 * G, 1123.07 - ei_ytd); ei_ytd += ei
    rows.append(dict(n=i, cpp=round(cpp, 2), cpp2=round(cpp2, 2), ei=round(ei, 2), tax=round(tax_pp, 2), net=round(G - cpp - cpp2 - ei - tax_pp, 2)))
r2 = lambda x: round(x, 2)
first, last = rows[0], rows[-1]
ei_stop = next(r['n'] for r in rows if r['ei'] < 50); cpp_stop = next(r['n'] for r in rows if r['cpp'] < 190)
cpp2_pays = [r['n'] for r in rows if r['cpp2'] > 0]
d = dict(salary=S, gross=r2(G), first=first, last=last, raise_pp=r2(last['net'] - first['net']), ei_stop=ei_stop, cpp_stop=cpp_stop, cpp2_pays=cpp2_pays,
         tax_year=round(t['tax']), cpp_year=4230.45, cpp2_year=416, ei_year=1123.07, total_year=round(t['tax'] + 4230.45 + 416 + 1123.07),
         keep=round(t['keep']), emp_cpp=4230.45 + 416, emp_ei=1572.30, emp_total=r2(4230.45 + 416 + 1572.30))
d['rows'] = rows
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps({k: v for k, v in d.items() if k != 'rows'}))
for r in rows[18:26]: print(r)
