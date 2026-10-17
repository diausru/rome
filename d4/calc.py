"""D4: spousal RRSP, Manitoba 2026 rates, example couple: Alex taxable income $120,000, Sam $30,000.
Alex contributes $10,000 to a spousal RRSP (Sam is the annuitant) and deducts it (ITA 146(5.1), Alex's own room).
A) Alex's tax saving from the deduction (marginal, 2026 federal + Manitoba brackets).
B) Sam withdraws $10,000 later, after the 3-year window, at Sam's income of $30,000 (2026 rates as an illustration).
C) Sam withdraws within the window (premiums in the year or two preceding years): taxed to Alex (ITA 146(8.3)),
   on top of $120,000. Credits are unchanged at these incomes, so bracket tax differences are exact."""
import os, importlib.util
_s = importlib.util.spec_from_file_location('c1calc', os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'c1', 'calc.py'))
_m = importlib.util.module_from_spec(_s); _s.loader.exec_module(_m)
bracket, FED, MB = _m.bracket, _m.FED, _m.MB
tax = lambda x: bracket(x, FED) + bracket(x, MB)
ALEX, SAM, C = 120_000, 30_000, 10_000
if __name__ == '__main__':
    import json
    a = tax(ALEX) - tax(ALEX - C); b = tax(SAM + C) - tax(SAM); c = tax(ALEX + C) - tax(ALEX)
    print(json.dumps({'deduction_saving': round(a, 2), 'sam_withdraw_tax': round(b, 2), 'early_withdraw_tax_alex': round(c, 2), 'net_gain_vs_saving': round(a - b, 2)}, indent=1))
