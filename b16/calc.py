"""B16: client meals, 50% limit. Example: Manitoba, 2026, self-employed, $60,000 net income before the meals.
CRA T2125 line 8523 (page details 2026-08-31): maximum claim = 50% of the lesser of the amount incurred and a
reasonable amount; gratuities count as entertainment. Exceptions include billing the client and showing the cost on the bill.
Uses ../b4/calc.py run(net) (T4127 Jan 2026, CPP 2026). 12 dinners x $400 are an example, not CRA figures."""
import os, sys, io, contextlib, json
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "b4"))
with contextlib.redirect_stdout(io.StringIO()):
    import calc as b4
NET, N, BILL = 60_000, 12, 400
spent = N * BILL; ded = spent * 0.5
a, b = b4.run(NET), b4.run(NET - ded)
out = dict(net=NET, dinners=N, bill=BILL, spent=spent, deductible=ded, not_deductible=spent - ded,
           saving=round(a["total"] - b["total"], 2), saving_per_dinner=round((a["total"] - b["total"]) / N, 2),
           real_cost=round(spent - (a["total"] - b["total"]), 2))
print(json.dumps(out, indent=1)); json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.json"), "w"), indent=1)
