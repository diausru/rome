"""B3: business-use-of-home for the self-employed (T2125). Worked example (not a CRA rule): a 1,000 sq ft rented
apartment, a 120 sq ft room used only for the business (principal place of business) -> 12%. Annual rent $18,000,
utilities (heat, electricity, water) $1,800, tenant insurance $400. Deduction = business area / total area x expenses
(CRA, business-use-of-home expenses). Tax effect uses the B4 example (2026, MB, single, $60,000 net SE income)."""
import contextlib, io, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "b4"))
with contextlib.redirect_stdout(io.StringIO()):
    import calc as B4
AREA, OFFICE = 1_000, 120
COSTS = dict(rent=18_000, utilities=1_800, insurance=400)
share = OFFICE / AREA
exp = sum(COSTS.values())
ded = share * exp
before, after = B4.run(60_000)["total"], B4.run(60_000 - ded)["total"]
print(f"business use {share:.0%}; expenses ${exp:,}; deduction ${ded:,.2f}")
print(f"tax + CPP saving ${before - after:,.2f} ({(before - after) / ded:.4f} per $1)")
