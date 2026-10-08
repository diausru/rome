"""B10: the extra tax on $10,000 of net self-employment income on top of a $100,000 salary vs a $60,000 salary,
2026, Manitoba, single. Rates as in ../b4/calc.py and salary/ (CRA T4127 Jan 2026): federal 14/20.5/26%, MB 10.8/12.75/17.4%;
CPP 2026: 5.95% each side up to YMPE $74,600 (exemption $3,500), CPP2 4% each side up to YAMPE $85,000; self-employed pays
both halves (11.9% / 8%). Employee enhanced CPP (1%) and CPP2 are deductions (line 22215); self-employed: half + enhanced part
deductible (line 22200). Credits identical in both runs of a case (employment amount, EI, employee CPP base) cancel."""
EXEMPT, YMPE, YAMPE = 3_500, 74_600, 85_000
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


def run(salary, se):
    emp1 = max(0.0, min(salary, YMPE) - EXEMPT)
    emp2 = max(0.0, min(salary, YAMPE) - YMPE)
    room1 = max(0.0, YMPE - EXEMPT - emp1)
    se1 = max(0.0, min(se - max(0.0, EXEMPT - salary), room1))
    room2 = max(0.0, YAMPE - YMPE - emp2)
    se2 = max(0.0, min(max(0.0, salary + se - YMPE) - emp2, room2))
    se_cpp = .119 * se1 + .08 * se2
    ded = (.01 * emp1 + .04 * emp2) + (.0595 * se1 + .01 * se1 + .04 * se2 + .04 * se2)
    ti = salary + se - ded
    base = .0495 * emp1 + .0495 * se1
    fed = max(0.0, bracket(ti, FED) - .14 * (FED_BPA + base))
    mb = max(0.0, bracket(ti, MB) - .108 * (MB_BPA + base))
    return dict(se_cpp=se_cpp, ti=ti, fed=fed, mb=mb, tax=fed + mb, total=fed + mb + se_cpp)


for sal in (60_000, 100_000):
    a, b = run(sal, 0), run(sal, 10_000)
    d = {k: round(b[k] - a[k], 2) for k in b}
    print(f"salary {sal}: extra from $10K -> {d}  share {d['total'] / 10_000:.4f}")
