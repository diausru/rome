"""C2: a CCPC in Manitoba earns $100,000 before paying its owner (2026, single, no other income). Two ways to pay:
A) all salary: the company pays salary S plus employer CPP so that S + employer CPP = $100,000 (salary is deductible,
   so no corporate tax is left); the owner pays employee CPP and income tax. EI not included (see bible).
B) all dividends: 9% corporate tax, then $91,000 of non-eligible dividends (same as C1 option 2).
Rates: as c1/calc.py (ITA 82/121, MB ITA s.4.7, T4127 2026, CPP 2026). Canada employment amount $1,501 (2026)."""
import os, importlib.util
_s = importlib.util.spec_from_file_location('c1calc', os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'c1', 'calc.py'))
_m = importlib.util.module_from_spec(_s); _s.loader.exec_module(_m)
bracket, FED, MB, FED_BPA, MB_BPA, corp, EXEMPT, YMPE, YAMPE = _m.bracket, _m.FED, _m.MB, _m.FED_BPA, _m.MB_BPA, _m.corp, _m.EXEMPT, _m.YMPE, _m.YAMPE
CEA = 1_501

def cpp_side(s):
    pens = max(0.0, min(s, YMPE) - EXEMPT)
    return .0595 * pens + .04 * max(0.0, min(s, YAMPE) - YMPE), pens

def salary_for(total):
    lo, hi = 0.0, total
    for _ in range(80):
        mid = (lo + hi) / 2
        if mid + cpp_side(mid)[0] > total: hi = mid
        else: lo = mid
    return lo

def salary_case(total):
    s = salary_for(total); emp, pens = cpp_side(s)
    enh = .01 * pens + .04 * max(0.0, min(s, YAMPE) - YMPE)   # line 22215: enhanced CPP + CPP2 deductible
    base = emp - enh                                           # base 4.95% → credit
    ti = s - enh
    fed = max(0.0, bracket(ti, FED) - .14 * (FED_BPA + base + CEA))
    mb = max(0.0, bracket(ti, MB) - .108 * (MB_BPA + base))
    return dict(salary=s, employer_cpp=emp, employee_cpp=emp, tax=fed + mb, keep=s - emp - fed - mb,
                cpp_total=2 * emp, rrsp_room=.18 * s)

if __name__ == '__main__':
    import json
    a, b = salary_case(100_000), corp(100_000)
    print(json.dumps({'A_salary': {k: round(v, 2) for k, v in a.items()}, 'B_dividends': {k: round(v, 2) for k, v in b.items()}}, indent=1))
