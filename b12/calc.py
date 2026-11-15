"""B12: recapture when the B11 laptop (Class 50, written off 100% in 2026, UCC $0) is sold for $700.
B4 freelancer: MB, single, $60,000 net self-employment income; tax + CPP via ../b4/calc.py run() at 2026 rates
(the sale year is an example; 2026 rates are used for comparison). CRA T4002 ch. 4 / T2125 column 7:
UCC at year end = opening UCC + additions - lesser of (proceeds - selling costs, capital cost); negative = recapture,
added to income (T2125 line 8230). Replacement bought in the same year is an addition and is counted first."""
import os, sys, io, contextlib, json
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "b4"))
with contextlib.redirect_stdout(io.StringIO()):
    import calc as b4
COST, SALE, NEW, NET = 2000, 700, 2500, 60_000
ucc_open = 0                                   # after the 100% first-year claim (B11)
ucc_sale_only = ucc_open - min(SALE, COST)     # -700 -> recapture
recapture = max(0, -ucc_sale_only)
cost_of_recapture = b4.run(NET + recapture)["total"] - b4.run(NET)["total"]
ucc_with_new = ucc_open + NEW - min(SALE, COST)   # 1,800 -> no recapture, still claimable
out = dict(cost=COST, sale=SALE, new_laptop=NEW, ucc_open=ucc_open, ucc_after_sale=ucc_sale_only, recapture=recapture,
           tax_cpp_on_recapture=round(cost_of_recapture, 2), per_dollar=round(cost_of_recapture / recapture, 4),
           ucc_with_new_same_year=ucc_with_new)
print(json.dumps(out, indent=1)); json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.json"), "w"), indent=1)
