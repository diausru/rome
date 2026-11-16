"""B1: hobby or business? Example: Manitoba employee, $60,000 salary, sells cakes on weekends (2026 rates).
Uses ../b9/calc.py run(salary, se) (CRA T4127 Jan 2026, CPP 2026 for self-employment).
Case P (profit): sales $8,000 - costs $3,000 = $5,000 net business income -> extra tax + CPP.
Case L (first-year loss): sales $2,000 - costs $3,500 = -$1,500 -> a business loss lowers income (tax refund);
as a hobby (personal endeavour, no source of income) there is no income to report and no loss to deduct.
Amounts are an example, not CRA figures."""
import os, sys, io, contextlib, json
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "b9"))
with contextlib.redirect_stdout(io.StringIO()):
    import calc as b9
SAL = 60_000
base = b9.run(SAL, 0)
p = b9.run(SAL, 8_000 - 3_000); l = b9.run(SAL, 2_000 - 3_500)
out = dict(salary=SAL, profit=5_000, extra_tax=round(p["tax"] - base["tax"], 2), extra_cpp=round(p["se_cpp"], 2),
           extra_total=round(p["total"] - base["total"], 2), loss=-1_500, refund_from_loss=round(base["total"] - l["total"], 2))
print(json.dumps(out, indent=1)); json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.json"), "w"), indent=1)
