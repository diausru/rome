"""B9: the tax on $10,000 of net creator (self-employment) income, 2026, Manitoba, single. Two cases:
A) the $10,000 is the only income; B) it comes on top of a $60,000 salary (the incremental cost of the $10,000).
Rates as in ../b4/calc.py (CRA T4127 Jan 2026; CPP 2026: 5.95% each side, 11.9% self-employed, exemption $3,500,
YMPE $74,600; line 22200 deduction / line 31000 credit for self-employed CPP; line 22215 for employee enhanced CPP).
Credits that are identical in both runs of case B (Canada employment amount, EI, employee CPP) cancel out of the difference."""
EXEMPT, YMPE = 3_500, 74_600
FED = [(0, .14), (58_523, .205), (117_045, .26), (181_440, .29), (258_482, .33)]
MB = [(0, .108), (47_000, .1275), (100_000, .174)]
FED_BPA, MB_BPA = 16_452, 15_780
EI_RATE, EI_MAX = .0163, 68_900


def bracket(x, br):
    t = 0.0
    for i, (a, r) in enumerate(br):
        b = br[i + 1][0] if i + 1 < len(br) else float("inf")
        if x > a:
            t += (min(x, b) - a) * r
    return t


def run(salary, se):
    emp_pens = max(0.0, min(salary, YMPE) - EXEMPT)
    emp_cpp = .0595 * emp_pens
    ei = EI_RATE * min(salary, EI_MAX)
    room = max(0.0, YMPE - EXEMPT - emp_pens)                     # pensionable room left after employment
    exempt_left = max(0.0, EXEMPT - salary)                        # basic exemption not used by the salary
    se_pens = max(0.0, min(se - exempt_left, room))
    se_cpp = .119 * se_pens
    ded = se_cpp / 2 + .01 * se_pens + .01 * emp_pens            # line 22200 + line 22215
    ti = salary + se - ded
    base = (.0495 * emp_pens) + (se_cpp / 2 - .01 * se_pens)       # CPP base-portion credits
    cea = min(1_501, salary) if salary else 0                      # Canada employment amount (2026 [VERIFY]; cancels in case B)
    fed = max(0.0, bracket(ti, FED) - .14 * (FED_BPA + base + ei + cea))
    mb = max(0.0, bracket(ti, MB) - .108 * (MB_BPA + base + ei))
    return dict(se_cpp=se_cpp, ti=ti, fed=fed, mb=mb, tax=fed + mb, total=fed + mb + se_cpp)


a = run(0, 10_000)
print("A only $10K:", {k: round(v, 2) for k, v in a.items()})
b0, b1 = run(60_000, 0), run(60_000, 10_000)
d = {k: round(b1[k] - b0[k], 2) for k in b1}
print("B base $60K salary:", {k: round(v, 2) for k, v in b0.items()})
print("B with +$10K     :", {k: round(v, 2) for k, v in b1.items()})
print("B extra from $10K:", d, "share", round(d["total"] / 10_000, 4))
