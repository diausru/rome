"""B11: CCA on a laptop (Class 50, 55%) for the B4 freelancer (2026, Manitoba, single, $60,000 net self-employment income).
Uses ../b4/calc.py run() (CRA T4127 Jan 2026 rates, CPP 2026). The $2,000 laptop (100% business use) is an example.
First-year CCA rules (Income Tax Regulations 1100(2), as amended by SC 2026 c. 3, Budget 2025 Implementation Act No. 1):
  - Class 50 property acquired and available for use after April 15, 2024 and before 2027 that is AIIP/RIIP:
    addition grossed up by A = 9/11, half-year rule not applied -> first-year CCA = cost x (1 + 9/11) x 55% = 100% of cost.
  - Class 50 RIIP available for use after 2026 (acquired after 2024, before 2034): factor nil, no half-year rule
    -> first-year CCA = 55% of cost.
  - Old normal rule (half-year rule, for comparison only): 55% x 50% = 27.5% of cost."""
import os, sys, io, contextlib, json
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "b4"))
with contextlib.redirect_stdout(io.StringIO()):
    import calc as b4
from fractions import Fraction as F
COST, RATE, NET = 2000, F(55, 100), 60_000
cca_2026 = float(COST * (1 + F(9, 11)) * RATE)          # = 2000.0
cca_2027 = float(COST * RATE)                            # = 1100.0
ucc_2027 = COST - cca_2027                               # 900 left for later years
base = b4.run(NET)["total"]
save = lambda d: base - b4.run(NET - d)["total"]
s26, s27 = save(cca_2026), save(cca_2027)
# 2027 purchase: the rest of the cost over later years (declining balance, 55%)
ucc, later = ucc_2027, []
for y in range(2028, 2033):
    c = ucc * float(RATE); later.append((y, round(c, 2))); ucc -= c
out = dict(cost=COST, rate=0.55, net=NET, cca_2026=cca_2026, cca_2027=cca_2027, ucc_after_2027=ucc_2027,
           tax_cpp_base=round(base, 2), saved_2026=round(s26, 2), saved_2027_first_year=round(s27, 2),
           per_dollar=round(s26 / COST, 4), later_cca_2027_purchase=later, ucc_left_2032=round(ucc, 2))
print(json.dumps(out, indent=1))
json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.json"), "w"), indent=1)
