"""LF-11 What if you sell your home? Three sellers, same $150,000 profit, Ontario 2026, single, $90,000 salary, no other income.
A) lived there every year: principal residence exemption -> $0 tax (sale must still be reported).
B) flipped property (owned < 365 days): profit is business income, 100% taxed (self-employed CPP is $0 because the salary is already above the 2026 ceilings).
C) investment property (never a principal residence): capital gain, 50% inclusion rate (proposed increase cancelled).
Ignores selling costs, renovation costs, GST/HST on new homes, land transfer tax, provincial specifics. Same 2026 tables as LF-10."""
import json, sys, os, io, contextlib
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'lf10-marginal'))
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'lf10-marginal', 'data.py')}
exec(compile(src, 'lf10data', 'exec'), ns)
th = ns['th']
S = 90000; GAIN = 150000
base = th(S)
def extra_tax(x): return round(th(S, rrsp=-x)['tax'] - base['tax'])
A = 0
B = extra_tax(GAIN)            # 100% taxable (business income); CPP 0 because salary > YAMPE
C = extra_tax(GAIN * 0.5)      # 50% taxable
half = extra_tax(GAIN * 0.5)
d = dict(salary=S, gain=GAIN, A=A, B=B, C=C,
         B_keep=GAIN - B, C_keep=GAIN - C, B_rate=round(B / GAIN * 100, 1), C_rate=round(C / GAIN * 100, 1),
         diff_BC=B - C, loss_example=40000, salary_tax=round(base['tax']),
         ti_B=round(S + GAIN), ti_C=round(S + GAIN * 0.5))
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d, indent=1))
