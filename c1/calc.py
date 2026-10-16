"""C1: same $100,000 business profit, Manitoba 2026, single, no other income. Three ways:
A) sole proprietor: income tax + self-employed CPP (11.9% base+first additional to YMPE, 8% CPP2 to YAMPE);
B) CCPC (small business rate 9% federal + 0% Manitoba), everything paid out as non-eligible dividends;
C) CCPC, owner takes only what is paid in B minus $40,000 (leaves $40,000 after-tax profit inside).
Sources: ITA 82(1)(b)(i) gross-up 15%, s.121(a) federal DTC 9/13 of gross-up (current to 2026-09-30);
Manitoba Income Tax Act C.C.S.M. c. I10 s.4.7(1)(b)(i.2) 0.7835% of the grossed-up amount (current from 2026-07-01);
CRA T4127 2026 brackets/BPAs (salary/calc.py); CPP 2026 YMPE $74,600, YAMPE $85,000, exemption $3,500.
Not modelled: Manitoba BPA phase-out (starts at $200K, not reached), corporate costs, RRSP room (dividends create none)."""
EXEMPT, YMPE, YAMPE = 3_500, 74_600, 85_000
FED = [(0, .14), (58_523, .205), (117_045, .26), (181_440, .29), (258_482, .33)]
MB = [(0, .108), (47_000, .1275), (100_000, .174)]
FED_BPA, MB_BPA = 16_452, 15_780
GROSS, FED_DTC, MB_DTC = .15, 9 / 13, .007835
CORP = .09

def bracket(x, br):
    t = 0.0
    for i, (a, r) in enumerate(br):
        b = br[i + 1][0] if i + 1 < len(br) else float('inf')
        if x > a: t += (min(x, b) - a) * r
    return t

def sole(profit):
    pens = max(0.0, min(profit, YMPE) - EXEMPT)
    cpp1 = .119 * pens; cpp2 = .08 * max(0.0, min(profit, YAMPE) - YMPE)
    ded = cpp1 / 2 + .01 * pens + cpp2            # line 22200 (employer half) + 22215 (enhanced) + CPP2 both halves
    credit_base = cpp1 / 2 - .01 * pens           # employee base portion (4.95%) → credit
    ti = profit - ded
    fed = max(0.0, bracket(ti, FED) - .14 * (FED_BPA + credit_base))
    mb = max(0.0, bracket(ti, MB) - .108 * (MB_BPA + credit_base))
    return dict(cpp=cpp1 + cpp2, tax=fed + mb, keep=profit - cpp1 - cpp2 - fed - mb)

def divs(d):
    g = d * (1 + GROSS); up = d * GROSS
    fed = max(0.0, bracket(g, FED) - .14 * FED_BPA - FED_DTC * up)
    mb = max(0.0, bracket(g, MB) - .108 * MB_BPA - MB_DTC * g)
    return fed + mb

def corp(profit, retain=0.0):
    ct = CORP * profit; avail = profit - ct; d = avail - retain
    pt = divs(d)
    return dict(corp_tax=ct, dividend=d, personal_tax=pt, keep=d - pt, inside=retain, total_tax=ct + pt)

if __name__ == '__main__':
    import json
    a, b, c = sole(100_000), corp(100_000), corp(100_000, 40_000)
    out = {'A_sole': a, 'B_corp_all_out': b, 'C_corp_keep_40k': c}
    print(json.dumps({k: {x: round(y, 2) for x, y in v.items()} for k, v in out.items()}, indent=1))
