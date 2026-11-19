"""LF-26 Remote work. Sam, $85,000 salary, 2026, single, no other income. Employer based in Calgary (AB) pays from Alberta;
Sam was hired remote and never reports to an office -> province of employment (payroll) = Alberta (CRA POE page, general rule).
Sam lives in Halifax (NS) on Dec 31 -> provincial tax = Nova Scotia. Withholding approximated as annual tax at AB rates.
Home office (detailed method, T2200, salaried): designated room 10% of apartment; rent+utilities+internet monthly fees.
Shared-space contrast uses the CRA example ratio: 12% of home x 40/168 hours."""
import json, os, sys, io, contextlib
H = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(H, '..', '..', 'salary'))
with contextlib.redirect_stdout(io.StringIO()):
    import calc as C
def bpa_fed(ni):
    if ni <= 181_440: return 16_452
    if ni >= 258_482: return 14_829
    return 16_452 - (ni - 181_440) * 1_623 / 77_042
def tx(g, p, ded=0):
    br, bpa = C.PROV[p]
    cpp1 = .0595 * max(0, min(g, C.YMPE) - C.EXEMPT); cpp2 = .04 * max(0, min(g, C.YAMPE) - C.YMPE)
    ei = .0163 * min(g, 68_900); enh = cpp1 / .0595 * .01 + cpp2; base = cpp1 - cpp1 / .0595 * .01
    ti = g - enh - ded
    fed = max(0, C.bracket_tax(ti, C.FED) - .14 * (bpa_fed(ti) + base + ei + min(C.CEA, g)))
    pt = max(0, C.bracket_tax(ti, br) - br[0][1] * (bpa + base + ei))
    if p == 'ON': pt += .20 * max(0, pt - 5_818) + .36 * max(0, pt - 7_446) + C.ohp(ti)
    return dict(fed=fed, prov=pt, tax=fed + pt)
r = lambda x: int(round(x))
G = 85000
ab, ns = tx(G, 'AB'), tx(G, 'NS')
others = {p: r(tx(G, p)['tax'] - ab['tax']) for p in ('BC', 'ON', 'MB', 'NS', 'PE')}
rent, util, net = 1800 * 12, 1500, 900
exp = rent + util + net
room = .10; claim = r(exp * room)
shared_pct = .12 * 40 / 168; shared = r(exp * shared_pct)
save = r(ns['tax'] - tx(G, 'NS', claim)['tax']); save_sh = r(ns['tax'] - tx(G, 'NS', shared)['tax'])
gap = r(ns['tax'] - ab['tax'])
d = dict(salary=G, ab_prov=r(ab['prov']), ns_prov=r(ns['prov']), ab_tax=r(ab['tax']), ns_tax=r(ns['tax']), gap=gap, gap_pp=r(gap / 26),
         others=others, rent=rent, util=util, internet=net, expenses=exp, room_pct=10, claim=claim, save=save,
         shared_pct=round(shared_pct * 100, 1), shared_claim=shared, shared_save=save_sh, net_owing=gap - save, net_pp=r((gap - save) / 26))
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
