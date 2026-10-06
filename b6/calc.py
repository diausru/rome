"""B6: motor vehicle expenses for the self-employed. Worked example (not a CRA rule): 20,000 km driven, 12,000 km
for business, operating costs $6,200 (fuel $3,000, insurance $2,000, maintenance and repairs $1,000, licence and
registration $200). Deduction = business km / total km x expenses (CRA, motor vehicle expenses). Tax effect uses the
B4 example (2026, Manitoba, single, $60,000 net self-employment income) from ../b4/calc.py."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "b4"))
import contextlib, io
with contextlib.redirect_stdout(io.StringIO()):
    import calc as B4
TOTAL_KM, BIZ_KM = 20_000, 12_000
COSTS = dict(fuel=3_000, insurance=2_000, maintenance=1_000, licence=200)
share = BIZ_KM / TOTAL_KM
exp = sum(COSTS.values())
ded = share * exp
before = B4.run(60_000)["total"]
after = B4.run(60_000 - ded)["total"]
print(f"business use {share:.0%}; expenses ${exp:,}; deduction ${ded:,.2f}")
print(f"tax + CPP before ${before:,.2f}, after ${after:,.2f}, saving ${before - after:,.2f} ({(before - after) / ded:.4f} per $1)")
