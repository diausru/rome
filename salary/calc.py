# Take-home pay on $100,000 employment income, 2026, single, no other income/deductions.
# Sources: CRA T4127 122nd ed. (Jan 2026) + 123rd ed. (Jul 2026); provincial budgets 2026; Revenu Québec 2026.
GROSS = 100_000
YMPE, YAMPE, EXEMPT = 74_600, 85_000, 3_500
def bracket_tax(x, br):           # br: [(threshold, rate), ...] ascending from 0
    t = 0.0
    for i, (a, r) in enumerate(br):
        b = br[i + 1][0] if i + 1 < len(br) else float('inf')
        if x > a: t += (min(x, b) - a) * r
    return t

FED = [(0, .14), (58_523, .205), (117_045, .26), (181_440, .29), (258_482, .33)]
FED_BPA, CEA = 16_452, 1_501
PROV = {   # brackets, BPA, credit rate (lowest rate)
 'AB': ([(0, .08), (61_200, .10), (154_259, .12), (185_111, .13), (246_813, .14), (370_220, .15)], 22_769),
 'BC': ([(0, .056), (50_363, .077), (100_728, .105), (115_648, .1229), (140_430, .147), (190_405, .168), (265_545, .205)], 13_216),
 'SK': ([(0, .105), (54_532, .125), (155_805, .145)], 20_381),
 'MB': ([(0, .108), (47_000, .1275), (100_000, .174)], 15_780),
 'ON': ([(0, .0505), (53_891, .0915), (107_785, .1116), (150_000, .1216), (220_000, .1316)], 12_989),
 'NB': ([(0, .094), (52_333, .14), (104_666, .16), (193_861, .195)], 13_664),
 'NS': ([(0, .0879), (30_995, .1495), (61_991, .1667), (97_417, .175), (157_124, .21)], 11_932),
 'PE': ([(0, .095), (33_928, .1347), (65_820, .166), (106_890, .1762), (142_250, .19)], 15_000),
 'NL': ([(0, .087), (44_678, .145), (89_354, .158), (159_528, .178), (223_340, .198), (285_319, .208), (570_638, .213), (1_141_275, .218)], 13_094),
}
def ohp(ti):   # Ontario Health Premium
    if ti <= 20_000: return 0
    if ti <= 36_000: return min(300, .06 * (ti - 20_000))
    if ti <= 48_000: return min(450, 300 + .06 * (ti - 36_000))
    if ti <= 72_000: return min(600, 450 + .25 * (ti - 48_000))
    if ti <= 200_000: return min(750, 600 + .25 * (ti - 72_000))
    return min(900, 750 + .25 * (ti - 200_000))

res = {}
for p, (br, bpa) in PROV.items():
    cpp1 = .0595 * (min(GROSS, YMPE) - EXEMPT); cpp2 = .04 * max(0, min(GROSS, YAMPE) - YMPE)
    ei = .0163 * min(GROSS, 68_900)
    enh = cpp1 / .0595 * .01 + cpp2; base = cpp1 - cpp1 / .0595 * .01
    ti = GROSS - enh
    fed = max(0, bracket_tax(ti, FED) - .14 * (FED_BPA + base + ei + CEA))
    r0 = br[0][1]
    pt = max(0, bracket_tax(ti, br) - r0 * (bpa + base + ei))
    extra = 0
    if p == 'ON':
        sur = .20 * max(0, pt - 5_818) + .36 * max(0, pt - 7_446); extra = sur + ohp(ti)
    tax = fed + pt + extra
    res[p] = dict(fed=fed, prov=pt + extra, cpp=cpp1 + cpp2, ei=ei, net=GROSS - tax - cpp1 - cpp2 - ei)

# Québec
qpp1 = .063 * (YMPE - EXEMPT); qpp2 = .04 * (YAMPE - YMPE); qenh = .01 * (YMPE - EXEMPT) + qpp2; qbase = qpp1 - .01 * (YMPE - EXEMPT)
eiq = .013 * 68_900; qpip = .0043 * min(GROSS, 103_000)
ti = GROSS - qenh
fed = max(0, bracket_tax(ti, FED) - .14 * (FED_BPA + qbase + eiq + qpip + CEA)) * (1 - .165)
tiq = GROSS - qenh - min(1_450, .06 * GROSS)
qt = max(0, bracket_tax(tiq, [(0, .14), (54_345, .19), (108_680, .24), (132_245, .2575)]) - .14 * 18_952)
res['QC'] = dict(fed=fed, prov=qt, cpp=qpp1 + qpp2, ei=eiq + qpip, net=GROSS - fed - qt - qpp1 - qpp2 - eiq - qpip)

for p, r in sorted(res.items(), key=lambda kv: -kv[1]['net']):
    print(f"{p}  net {r['net']:>10,.0f}  fed {r['fed']:>8,.0f}  prov {r['prov']:>8,.0f}  cpp/qpp {r['cpp']:>7,.0f}  ei(+qpip) {r['ei']:>6,.0f}  income tax total {r['fed']+r['prov']:>8,.0f}")
