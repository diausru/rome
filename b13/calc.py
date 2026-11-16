"""B13: the B11 laptop ($2,000, Class 50, in use in 2026) used 60% for business, 40% personal.
CRA T4002 ch. 4 'Personal use of property': CCA only on the business part (regular method: business part of the cost
goes in the table; administrative method: CCA x business-use share). B4 freelancer (MB, single, $60,000 net), 2026 rates
via ../b4/calc.py. First-year rules as in B11 (Regs 1100(2), SC 2026 c. 3): 100% in 2026, 55% in 2027."""
import os, sys, io, contextlib, json
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "b4"))
with contextlib.redirect_stdout(io.StringIO()):
    import calc as b4
COST, BIZ, NET = 2000, 0.60, 60_000
cca_full, cca_biz = COST * 1.00, COST * 1.00 * BIZ          # 2026: 100% first-year, business part
cca_biz_2027 = COST * 0.55 * BIZ                             # 2027: 55% first-year, business part
base = b4.run(NET)["total"]; save = lambda d: round(base - b4.run(NET - d)["total"], 2)
out = dict(cost=COST, business_share=BIZ, cca_2026_if_100pct=cca_full, cca_2026_business=cca_biz,
           personal_part=COST * (1 - BIZ), saved_2026_100pct=save(cca_full), saved_2026_60pct=save(cca_biz),
           cca_2027_business=round(cca_biz_2027, 2), saved_2027_60pct=save(cca_biz_2027))
print(json.dumps(out, indent=1)); json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.json"), "w"), indent=1)
