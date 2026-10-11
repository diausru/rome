#!/usr/bin/env python3
"""Reusable 2026 take-home calculator for long-form episodes (machine #1).
Generalizes salary/calc.py (same 2026 tables, sources: CRA T4127 122nd ed. Jan 2026 + 123rd ed. Jul 2026;
provincial 2026 tables) from a fixed $100,000 to any employment income, provinces outside Québec.
Scope / simplifications — each episode must check them against its scenario and mark [VERIFY] otherwise:
  single employee, employment income only, no other deductions/credits;
  NOT modelled: federal BPA reduction for income above $181,440, provincial low-income tax reductions
  and BPA phase-outs (e.g. NS, MB), surtaxes other than Ontario's, Québec (see salary/calc.py).
Usage: python3 taxcalc.py 80000 100000 150000 --prov ON AB MB
"""
import argparse, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'salary'))
import io, contextlib
with contextlib.redirect_stdout(io.StringIO()):
    import calc as C  # tables + bracket_tax + ohp (its own $100K printout is suppressed)

def take_home(gross, p):
    br, bpa = C.PROV[p]
    cpp1 = .0595 * max(0, min(gross, C.YMPE) - C.EXEMPT); cpp2 = .04 * max(0, min(gross, C.YAMPE) - C.YMPE)
    ei = .0163 * min(gross, 68_900)
    enh = cpp1 / .0595 * .01 + cpp2; base = cpp1 - cpp1 / .0595 * .01
    ti = gross - enh
    fed = max(0, C.bracket_tax(ti, C.FED) - .14 * (C.FED_BPA + base + ei + min(C.CEA, gross)))
    pt = max(0, C.bracket_tax(ti, br) - br[0][1] * (bpa + base + ei))
    extra = (.20 * max(0, pt - 5_818) + .36 * max(0, pt - 7_446) + C.ohp(ti)) if p == 'ON' else 0
    tax = fed + pt + extra
    def marg(x):  # combined statutory bracket rate at taxable income x (no surtax/clawbacks)
        f = [r for a, r in C.FED if x > a][-1]; q = [r for a, r in br if x > a][-1]; return f + q
    return dict(gross=gross, prov=p, taxable=ti, federal=fed, provincial=pt + extra, cpp=cpp1 + cpp2, ei=ei,
                take_home=gross - tax - cpp1 - cpp2 - ei, avg_income_tax=tax / gross, top_bracket_rate=marg(ti))

if __name__ == '__main__':
    a = argparse.ArgumentParser(); a.add_argument('gross', type=float, nargs='+'); a.add_argument('--prov', nargs='+', default=['ON'])
    o = a.parse_args()
    for p in o.prov:
        for g in o.gross:
            r = take_home(g, p)
            print(f"{p} {g:>9,.0f}  taxable {r['taxable']:>9,.0f}  fed {r['federal']:>8,.0f}  prov {r['provincial']:>8,.0f}  cpp {r['cpp']:>6,.0f}  ei {r['ei']:>5,.0f}  keep {r['take_home']:>9,.0f}  avg {r['avg_income_tax']:.1%}  bracket {r['top_bracket_rate']:.1%}")
