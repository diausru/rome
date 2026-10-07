"""RRSP-SE: a $5,000 RRSP contribution in the B4 example (2026, Manitoba, single, $60,000 net self-employment income).
The RRSP deduction (line 20800) lowers taxable income; it does NOT lower self-employed CPP, which is based on
self-employment earnings. Rates from ../b4/calc.py (CRA T4127 2026, Manitoba)."""
import contextlib, io, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "b4"))
with contextlib.redirect_stdout(io.StringIO()):
    import calc as B4
RRSP = 5_000
r = B4.run(60_000)
ti2 = r["ti"] - RRSP
fed2 = B4.bracket(ti2, B4.FED) - .14 * (B4.FED_BPA + r["base"])
mb2 = B4.bracket(ti2, B4.MB) - .108 * (B4.MB_BPA + r["base"])
tot2 = r["cpp"] + fed2 + mb2
print(f"before: CPP {r['cpp']:,.2f} fed {r['fed']:,.2f} MB {r['mb']:,.2f} total {r['total']:,.2f} taxable {r['ti']:,.2f}")
print(f"after:  CPP {r['cpp']:,.2f} fed {fed2:,.2f} MB {mb2:,.2f} total {tot2:,.2f} taxable {ti2:,.2f}")
print(f"saving {r['total'] - tot2:,.2f} = {(r['total'] - tot2) / RRSP:.4%} of the contribution")
print(f"fed saving {r['fed'] - fed2:,.2f}  MB saving {r['mb'] - mb2:,.2f}")
