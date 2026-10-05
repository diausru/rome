# Example (not a CRA rule): Manitoba employee, 2026, salary $58,000 -> $60,000. Reuses salary/calc.py parameters.
import pathlib
ns = {}
exec(pathlib.Path(__file__).with_name('..').joinpath('salary/calc.py').read_text().split("res = {}")[0], ns)
def net(g, p='MB'):
    br, bpa = ns['PROV'][p]; bt = ns['bracket_tax']
    cpp1 = .0595 * (min(g, 74600) - 3500); cpp2 = .04 * max(0, min(g, 85000) - 74600); ei = .0163 * min(g, 68900)
    enh = cpp1 / .0595 * .01 + cpp2; base = cpp1 - cpp1 / .0595 * .01; ti = g - enh
    fed = max(0, bt(ti, ns['FED']) - .14 * (16452 + base + ei + 1501))
    pt = max(0, bt(ti, br) - br[0][1] * (bpa + base + ei))
    return dict(ti=ti, fed=fed, prov=pt, cpp=cpp1 + cpp2, ei=ei, net=g - fed - pt - cpp1 - cpp2 - ei)
a, b = net(58000), net(60000)
for k in a: print(f"{k:5} {a[k]:>11,.2f} {b[k]:>11,.2f} {b[k]-a[k]:>+10,.2f}")
