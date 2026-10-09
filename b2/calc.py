"""B2: what four commonly overlooked expenses save the B4 freelancer (2026, Manitoba, single, $60,000 net
self-employment income before these expenses). Uses ../b4/calc.py run() (CRA T4127 Jan 2026 rates, CPP 2026 11.9%).
Expense amounts are an example, not CRA figures."""
import os, sys, io, contextlib
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "b4"))
with contextlib.redirect_stdout(io.StringIO()):
    import calc as b4
EXP = {"phone 40% of $960": 0.40 * 960, "bank + payment fees": 420, "accounting": 600, "dues / licences": 250}
tot = sum(EXP.values())
before, after = b4.run(60_000), b4.run(60_000 - tot)
for k, v in EXP.items():
    print(f"{k:22s} {v:8,.2f}")
print(f"total expenses {tot:,.2f}")
print(f"tax+CPP before {before['total']:,.2f} after {after['total']:,.2f} saved {before['total'] - after['total']:,.2f} "
      f"({(before['total'] - after['total']) / tot:.4f} per $1)")
