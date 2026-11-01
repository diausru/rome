"""LF-14 OAS recovery tax (clawback), 2026 income -> repaid from OAS July 2027 - June 2028. Per person, net world income.
Sources in FACTS.md (canada.ca). Income tax effects of splitting are NOT modelled (named on screen as a dependency)."""
import json
TH, TOP, TOP75, RATE, MONTHLY = 95323, 155320, 161320, 0.15, 762.50
claw = lambda ni, cap=(TOP - TH) * RATE: round(min(max(0, ni - TH) * RATE, cap))
d = dict(th=TH, top=TOP, top75=TOP75, rate=RATE, monthly=MONTHLY, year_cap=round((TOP - TH) * RATE), monthly75=838.75)
d['frank'] = 120000; d['linda'] = 40000; d['raj'] = d['mei'] = 80000
d['c_frank'] = claw(120000); d['per_month'] = round(d['c_frank'] / 12, 2); d['months'] = round(d['c_frank'] / MONTHLY, 1)
d['over'] = 120000 - TH
d['elig'] = 60000; d['split'] = 25000; d['frank_s'] = 95000; d['linda_s'] = 65000; d['c_split'] = claw(95000)
d['gic'] = 200000; d['gic_rate'] = 0.04; d['interest'] = 8000; d['c_interest'] = round(8000 * RATE)
d['lump'] = 30000; d['c_lump'] = claw(150000); d['c_lump_extra'] = d['c_lump'] - d['c_frank']
d['maria'] = 130000; d['c_maria'] = claw(130000); d['defer'] = 0.36; d['defer_month'] = 0.006
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
