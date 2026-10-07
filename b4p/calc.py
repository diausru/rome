"""B4P: the same $60,000 NET self-employment income in nine provinces (2026, single, no other income or deductions).
Federal and provincial 2026 brackets / BPAs from ../salary/calc.py (CRA T4127 122nd/123rd ed., provincial budgets),
self-employed CPP as in ../b4/calc.py (11.9% of $60,000 − $3,500; line 22200 deduction / line 31000 credit split).
Québec is excluded (separate return, QPP). No EI (not opted in), no Canada employment amount (self-employed).
Ontario surtax and Health Premium included. Low-income provincial tax reductions are zero at this income
(taxable ≈ $56K is above their phase-out ranges)."""
import contextlib, io, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "salary"))
with contextlib.redirect_stdout(io.StringIO()):
    import calc as S
NET = 60_000
pens = min(NET, S.YMPE) - S.EXEMPT
cpp = .119 * pens
half, enh = cpp / 2, .01 * pens
ded, base = half + enh, half - enh
ti = NET - ded
fed = S.bracket_tax(ti, S.FED) - .14 * (S.FED_BPA + base)
res = {}
for p, (br, bpa) in S.PROV.items():
    pt = max(0, S.bracket_tax(ti, br) - br[0][1] * (bpa + base))
    if p == "ON":
        pt += .20 * max(0, pt - 5_818) + .36 * max(0, pt - 7_446) + S.ohp(ti)
    tot = cpp + fed + pt
    res[p] = dict(prov=pt, total=tot, keep=NET - tot)
print(f"CPP {cpp:,.2f}  taxable {ti:,.2f}  federal {fed:,.2f}")
for p, r in sorted(res.items(), key=lambda kv: -kv[1]["keep"]):
    print(f"{p}  provincial {r['prov']:8,.2f}  total {r['total']:9,.2f}  keep {r['keep']:9,.2f}  ({r['total']/NET:.2%})")
k = sorted(r["keep"] for r in res.values())
print(f"gap top-bottom {k[-1]-k[0]:,.2f}")
