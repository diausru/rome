"""All LF-03 numbers in one place: take-home from taxcalc, spending shares from official reports (FACTS.md).
Illustrative allocation uses largest-remainder rounding so each split reconciles exactly to the tax amount."""
import json, sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'tools'))
from taxcalc import take_home
r = take_home(100000, 'MB'); R = {k: round(v) for k, v in r.items() if isinstance(v, (int, float))}
R['income_tax'] = R['federal'] + R['provincial']; R['take_home'] = 100000 - R['income_tax'] - R['cpp'] - R['ei']
def split(total, parts):
    s = sum(v for _, v in parts); raw = [(n, total * v / s) for n, v in parts]
    out = [[n, int(x)] for n, x in raw]; rem = total - sum(v for _, v in out)
    for i in sorted(range(len(raw)), key=lambda i: -(raw[i][1] - int(raw[i][1])))[:rem]: out[i][1] += 1
    return [{'name': n, 'value': v, 'share': round(dict(parts)[n] / s, 4)} for n, v in out]
# federal 2024-25, $ millions (AFR 2025 Table 5); small lines grouped as OTHER (pollution proceeds returned 15,595 + actuarial 4,020 - COVID recoveries 2,169)
FED = [('SENIORS (OAS, GIS)', 80294), ('TRANSFERS TO PROVINCES: HEALTH + SOCIAL', 68979), ('EQUALIZATION + FISCAL ARRANGEMENTS', 36122), ('CHILDREN (CANADA CHILD BENEFIT)', 28574),
       ('EI BENEFITS', 24880), ('OTHER TRANSFERS (INDIGENOUS, STUDENTS, R&D, AID…)', 107140), ('RUNNING 137 DEPARTMENTS + AGENCIES', 130454), ('INTEREST ON FEDERAL DEBT', 53410), ('OTHER', 15595 + 4020 - 2169)]
MB = [('HEALTH', 10285), ('EDUCATION + ECONOMIC DEVELOPMENT', 6544), ('SOCIAL SERVICES', 2823), ('JUSTICE + OTHER', 2503), ('GENERAL GOVERNMENT', 2312), ('COMMUNITY + RESOURCES', 2214)]
D = {'p': R, 'fed_split': split(R['federal'], FED), 'mb_split': split(R['provincial'], MB),
     'per_pay': {k: round(R[k] / 26) for k in ('federal', 'provincial', 'cpp', 'ei')}, 'gross_pay': round(100000 / 26),
     'per100': {k: round(R[k] / 1000, 2) for k in ('federal', 'provincial', 'cpp', 'ei', 'take_home')},
     'fed_total_b': 547.3, 'fed_pit_share': 0.459, 'fed_deficit_b': 36.3, 'mb_total_m': 25915}
D['per_pay']['take_home'] = D['gross_pay'] - sum(D['per_pay'].values())
assert sum(x['value'] for x in D['fed_split']) == R['federal'] and sum(x['value'] for x in D['mb_split']) == R['provincial']
json.dump(D, open('data.json', 'w'), indent=1)
print(json.dumps({k: D[k] for k in ('p', 'per_pay', 'per100')}, indent=0)); [print(x) for x in D['fed_split'] + D['mb_split']]
