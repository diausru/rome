# Example (not a CRA rule): Manitoba employee, 2026, salary $52,000 paid biweekly (26 pays), no other income/claims.
# Reuses raise/example.py's net() (salary/calc.py 2026 parameters). Per-pay = annual / 26 (approximation of T4127 withholding).
import pathlib, runpy
src = pathlib.Path(__file__).resolve().parent.parent / 'raise' / 'example.py'
code = src.read_text().split("a, b = net(")[0]
ns = {'__file__': str(src)}; exec(code, ns)
r = ns['net'](52000)
for k in ('fed', 'prov', 'cpp', 'ei', 'net'): print(f"{k:5} annual {r[k]:>10,.2f}  per pay {r[k]/26:>8,.2f}")
print(f"gross per pay {52000/26:,.2f}; income tax per pay {(r['fed']+r['prov'])/26:,.2f}")
