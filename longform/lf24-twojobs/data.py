"""LF-24 Two jobs. Ontario 2026 (LF-10 th() and tables). Lena: Job A $45,000 + Job B $30,000 = $75,000 employment income.
Payroll withholding approximated as each employer computing tax as if its job were her only income (annualized, T4127 idea):
both TD1s claiming the basic personal amount vs Job B TD1 = 0 (no personal amounts). Real tax = th(75,000).
EI: each employer deducts 1.63% on its own pay; combined above the yearly max -> overpayment refunded on the return."""
import json, os, io, contextlib
H = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(H, '..', 'lf10-marginal', 'data.py')).read().split('for g in (60000')[0]
ns = {'__file__': os.path.join(H, '..', 'lf10-marginal', 'data.py')}
with contextlib.redirect_stdout(io.StringIO()): exec(compile(src, 'x', 'exec'), ns)
th, C, bpa_fed = ns['th'], ns['C'], ns['bpa_fed']
r = lambda x: int(round(x))
def th_nobpa(g, p='ON'):
    br, bpa = C.PROV[p]
    cpp1 = .0595 * max(0, min(g, C.YMPE) - C.EXEMPT); cpp2 = .04 * max(0, min(g, C.YAMPE) - C.YMPE)
    ei = .0163 * min(g, 68_900); enh = cpp1 / .0595 * .01 + cpp2; base = cpp1 - cpp1 / .0595 * .01
    ti = g - enh
    fed = max(0, C.bracket_tax(ti, C.FED) - .14 * (base + ei + min(C.CEA, g)))
    pt = max(0, C.bracket_tax(ti, br) - br[0][1] * (base + ei))
    sur = .20 * max(0, pt - 5_818) + .36 * max(0, pt - 7_446); oh = C.ohp(ti)
    return fed + pt + sur + oh
A, B = 45000, 30000
wa, wb, wb0 = th(A)['tax'], th(B)['tax'], th_nobpa(B)
real = th(A + B)['tax']
ei_paid = .0163 * A + .0163 * B; ei_max = 1123.07
d = dict(jobA=A, jobB=B, total=A + B, wA=r(wa), wB=r(wb), withheld=r(wa + wb), real=r(real), short=r(real - wa - wb),
         wB0=r(wb0), withheld0=r(wa + wb0), short0=r(real - wa - wb0), extra_pp=r((real - wa - wb) / 26), extra_pp0=r((real - wa - wb0) / 26),
         ei_paid=round(ei_paid, 2), ei_max=ei_max, ei_refund=round(ei_paid - ei_max, 2))
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
