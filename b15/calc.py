"""B15: Do platforms report sellers to CRA? Example: Manitoba, 2026, $60,000 salary + an online shop.
CRA Reporting Rules for Digital Platform Operators (Part XX ITA): from calendar year 2024; reported: name, address,
TIN (SIN or BN), consideration paid/credited per quarter, number of relevant activities, fees; copy to seller by Jan 31.
Excluded seller (sale of goods): fewer than 30 relevant activities AND total consideration not over $2,800 (both).
Uses ../b9/calc.py run(salary, se) for tax + CPP (CRA T4127 2026, CPP 2026). Amounts are an example."""
import os, sys, io, contextlib, json
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "b9"))
with contextlib.redirect_stdout(io.StringIO()):
    import calc as b9
def reported(n, amt): return not (n < 30 and amt <= 2_800)
cases = {"29 sales $2,500": reported(29, 2_500), "31 sales $2,500": reported(31, 2_500), "12 sales $3,000": reported(12, 3_000)}
SAL, SALES, COSTS = 60_000, 2_500, 900
b0, b1 = b9.run(SAL, 0), b9.run(SAL, SALES - COSTS)
out = dict(cases=cases, salary=SAL, sales=SALES, costs=COSTS, profit=SALES - COSTS,
           extra_tax=round(b1["tax"] - b0["tax"], 2), extra_cpp=round(b1["se_cpp"], 2), extra_total=round(b1["total"] - b0["total"], 2))
print(json.dumps(out, indent=1)); json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.json"), "w"), indent=1)
