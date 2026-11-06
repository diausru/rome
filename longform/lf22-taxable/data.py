"""LF-22 $100K salary vs taxable income. Ontario 2026 (LF-10 th() and its tables). Owen: $100,000 salary, $8,000 RRSP.
Ladder: total income (line 15000) -> net-income deductions (RRSP line 20800, enhanced CPP/CPP2 line 22215) -> net income (23600)
-> taxable income (26000; Owen has no taxable-income deductions) -> bracket tax -> minus non-refundable credits (x lowest rate)."""
import json, os, io, contextlib
H = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(H, '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(H, '..', 'lf10-marginal', 'data.py')}
with contextlib.redirect_stdout(io.StringIO()): exec(compile(src, 'x', 'exec'), ns)
th, C, bpa_fed = ns['th'], ns['C'], ns['bpa_fed']
r = lambda x: int(round(x))
g, rr = 100000, 8000
cpp1 = .0595 * (min(g, C.YMPE) - C.EXEMPT); cpp2 = .04 * max(0, min(g, C.YAMPE) - C.YMPE); ei = .0163 * min(g, 68900)
enh = cpp1 / .0595 * .01 + cpp2; base = cpp1 - cpp1 / .0595 * .01
ti = g - enh - rr
fed_gross = C.bracket_tax(ti, C.FED); fed_cred_amt = bpa_fed(ti) + base + ei + min(C.CEA, g); fed_cred = .14 * fed_cred_amt
t_rr, t_no = th(g, rr), th(g)
d = dict(salary=g, rrsp=rr, enh=r(enh), net_income=r(ti), taxable=r(ti), off_total=r(g - ti),
         fed_gross=r(fed_gross), fed_cred_amt=r(fed_cred_amt), fed_cred=r(fed_cred), fed=r(t_rr['fed']), prov=r(t_rr['onb'] + t_rr['sur']), ohp=r(t_rr['ohp']),
         tax=r(t_rr['tax']), tax_norrsp=r(t_no['tax']), taxable_norrsp=r(g - enh), rrsp_saving=r(t_no['tax'] - t_rr['tax']),
         bpa=r(bpa_fed(ti)), cpp_base=r(base), ei=r(ei), cea=r(min(C.CEA, g)), avg=round(100 * t_rr['tax'] / g, 1), avg_ti=round(100 * t_rr['tax'] / ti, 1))
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
