"""LF-07 two jobs — numbers (sources in FACTS.md). 2026 tables via tools/taxcalc.py. Single Ontario employee, two employers.
Withholding estimate: each employer withholds as if its job were the only income and the full basic personal amounts were claimed
(TD1 filled out on both jobs, which CRA says you should NOT do) -> approximated by the annual tax on that income alone.
Real payroll uses per-pay annualisation, so actual withholding can differ slightly: shown on screen as an estimate."""
import json, sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tools'))
from taxcalc import take_home
r = lambda x: int(round(x))
A, B = 55000, 35000
ja, jb, tot = take_home(A, 'ON'), take_home(B, 'ON'), take_home(A + B, 'ON')
tax = lambda x: x['federal'] + x['provincial']
withheld = tax(ja) + tax(jb); owed = tax(tot)
ei_ded = .0163 * min(A, 68900) + .0163 * min(B, 68900); ei_max = .0163 * 68900
# "zero on line 13" fix: second employer withholds with no personal amounts -> estimate = tax on B at bracket rates without BPA credits.
# not modelled precisely (payroll formula); only the direction is stated in VO.
D = dict(A=A, B=B, total=A + B, tax_A=r(tax(ja)), tax_B=r(tax(jb)), withheld=r(withheld), owed=r(owed), gap=r(owed - withheld),
         fed_A=r(ja['federal']), fed_B=r(jb['federal']), fed_tot=r(tot['federal']), prov_A=r(ja['provincial']), prov_B=r(jb['provincial']), prov_tot=r(tot['provincial']),
         ei_deducted=round(ei_ded, 2), ei_max=round(ei_max, 2), ei_over=round(ei_ded - ei_max, 2),
         marg_B_alone=round(take_home(B, 'ON')['top_bracket_rate'] * 100, 2), marg_tot=round(tot['top_bracket_rate'] * 100, 2),
         gap_month=r((owed - withheld) / 12), per_pay26=r((owed - withheld) / 26))
bpa = 16452 * .14 + 12989 * .0505
D.update(bpa_double=r(bpa), bracket_part=D['gap'] - r(bpa), after_td1_gap=D['gap'] - r(bpa), after_td1_per_pay26=r((owed - withheld - bpa) / 26))
D['scen'] = {f'{a}_{b}': dict(A=a, B=b, withheld=r(tax(take_home(a, 'ON')) + tax(take_home(b, 'ON'))), owed=r(tax(take_home(a + b, 'ON'))),
             gap=r(tax(take_home(a + b, 'ON')) - tax(take_home(a, 'ON')) - tax(take_home(b, 'ON'))), tax_B_alone=r(tax(take_home(b, 'ON')))) for a, b in [(55000, 10000), (45000, 45000)]}
json.dump(D, open('data.json', 'w'), indent=1); print(json.dumps(D, indent=0))
