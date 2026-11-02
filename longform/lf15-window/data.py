"""LF-15 Retirement tax window. Ontario 2026, single, income = RRSP/RRIF + pensions (no employment: no CPP/EI credits).
Federal + Ontario brackets, BPA, ON surtax, OHP (2026 tables, salary/calc.py, LF-10 FACTS). NOT modelled: age amount, pension
income credit, other credits (named on screen). OAS recovery tax 15% above $95,323 (LF-14 FACTS)."""
import json, os, sys, io, contextlib
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'salary'))
with contextlib.redirect_stdout(io.StringIO()):
    import calc as C
br, bpa = C.PROV['ON']
def tax(ti):
    fed = max(0, C.bracket_tax(ti, C.FED) - .14 * C.FED_BPA)
    on = max(0, C.bracket_tax(ti, br) - br[0][1] * bpa)
    sur = .20 * max(0, on - 5818) + .36 * max(0, on - 7446)
    return fed + on + sur + C.ohp(ti)
claw = lambda ni: min(max(0, ni - 95323) * .15, 9000)
r = lambda x: int(round(x))
X = 10000
win = dict(base=40000, tax=r(tax(50000) - tax(40000)))
late = dict(base=100000, tax=r(tax(110000) - tax(100000)), claw=r(claw(110000) - claw(100000)))
late['total'] = late['tax'] + late['claw']
d = dict(x=X, win=win, late=late, gap=late['total'] - win['tax'], tax40=r(tax(40000)), avg40=round(tax(40000) / 40000 * 100, 1))
# a 10-year example: drawing $40K/yr for 10 years from 61 to 70 = $400K withdrawn at window rates
d['ten'] = dict(years=10, per=40000, total=400000, tax_each=r(tax(40000)), tax_total=r(tax(40000) * 10))
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
d['lump'] = dict(amount=100000, tax=r(tax(100000)), avg=round(tax(100000) / 1000, 1), spread_tax=r(tax(50000) * 2))
d['top1'] = 53891
json.dump(d, open('data.json', 'w'), indent=1); print(d['lump'])
