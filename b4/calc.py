"""B4: how much to set aside from a self-employed invoice. Worked example, 2026, Manitoba, single,
$60,000 net self-employment income, no other income, deductions or credits beyond the basics.
Rates: CRA T4127 122nd ed. (Jan 2026) as recorded in salary/PRODUCTION-BIBLE.md; CPP self-employed 2026 (11.9%,
exemption $3,500, YMPE $74,600); CRA line 22200 / line 31000 treatment of self-employed CPP."""
NET = 60_000
EXEMPT, YMPE = 3_500, 74_600
FED = [(0, .14), (58_523, .205), (117_045, .26), (181_440, .29), (258_482, .33)]
MB = [(0, .108), (47_000, .1275), (100_000, .174)]
FED_BPA, MB_BPA = 16_452, 15_780

def bracket(x, br):
    t = 0.0
    for i, (a, r) in enumerate(br):
        b = br[i + 1][0] if i + 1 < len(br) else float("inf")
        if x > a:
            t += (min(x, b) - a) * r
    return t

def run(net):
    pens = min(net, YMPE) - EXEMPT
    cpp = .119 * pens                 # both halves
    half = cpp / 2
    enh = .01 * pens                  # first additional part of the "employee" half
    ded = half + enh                  # line 22200
    base = half - enh                 # line 31000 credit
    ti = net - ded
    fed = bracket(ti, FED) - .14 * (FED_BPA + base)
    mb = bracket(ti, MB) - .108 * (MB_BPA + base)
    return dict(cpp=cpp, ded=ded, base=base, ti=ti, fed=fed, mb=mb, total=cpp + fed + mb)

r = run(NET)
for k, v in r.items():
    print(f"{k:6s} {v:12,.2f}")
pct = r["total"] / NET
print(f"share {pct:.4f} -> per $1,000 invoice ${1000 * pct:,.2f}; per month ${r['total'] / 12:,.2f}")
m = run(NET + 1)["total"] - r["total"]
print(f"marginal cost of the next $1: {m:.4f}")
