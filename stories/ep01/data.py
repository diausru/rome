"""Story Ep01 Maya — TFSA room / excess. Limits: canada.ca (TFSA limits table, 2026-11). 2027 limit = example 7,000 (not announced)."""
import json, datetime
LIM = {2017: 5500, 2018: 5500, 2019: 6000, 2020: 6000, 2021: 6000, 2022: 6000, 2023: 6500, 2024: 7000, 2025: 7000, 2026: 7000}
room26 = sum(LIM.values()); dep = 52000; left26 = room26 - dep; ex27 = 7000; room27 = left26 + ex27
mo = dep / 12                             # prompt-file model: 52,000 / 12 ≈ 4,333 per month
cum = [round(mo * m) for m in range(1, 13)]
excess = [max(0, c - room27) for c in cum]; tax_exact = sum(max(0, mo * m - room27) for m in range(1, 13)) * 0.01
tax_monthly = round(sum(excess) * 0.01)
# check: weekly Mondays model (QA only)
d = datetime.date(2027, 1, 1); c = 0; hi = {}
while d.year == 2027:
    if d.weekday() == 0: c += 1000
    hi[d.month] = max(hi.get(d.month, 0), max(0, c - room27)); d += datetime.timedelta(1)
tax_weekly = round(sum(hi.values()) * 0.01)
first_over_week = next(m for m in range(1, 13) if hi[m] > 0)
D = dict(lim=LIM, room26=room26, dep=dep, left26=left26, ex27=ex27, room27=room27, mo=mo, cum=cum, excess=excess, ex_dec=excess[-1],
         tax=round(tax_exact), tax_weekly_check=tax_weekly, first_over_month_weekly=first_over_week, rrsp=10000, rate=0.40, back=4000, rrsp_max26=33810, fhsa=8000)
json.dump(D, open('data.json', 'w'), indent=1); print(json.dumps({k: D[k] for k in ['room26','left26','room27','mo','ex_dec','tax','tax_weekly_check','first_over_month_weekly']}))
print(excess)
