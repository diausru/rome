"""All LF-04 numbers in one place (sources in FACTS.md). Taxes from taxcalc (2026), rent from CMHC RMS Oct 2025."""
import json, sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'tools'))
from taxcalc import take_home
R = lambda g, p: {k: round(v, 4) if isinstance(v, float) and v < 1 else (round(v) if isinstance(v, (int, float)) else v) for k, v in take_home(g, p).items()}
mb, ab = R(100000, 'MB'), R(100000, 'AB')
for r in (mb, ab): r['take_home'] = 100000 - r['federal'] - r['provincial'] - r['cpp'] - r['ei']
gap = ab['take_home'] - mb['take_home']
inc = {g: R(g, 'AB')['take_home'] - R(g, 'MB')['take_home'] for g in (60000, 100000, 150000)}
# CMHC Rental Market Survey Oct 2025, purpose-built 2-bedroom: Table 1.0 average (new+existing), Table 6.0 turnover units
rent = {'mb_avg': 1571, 'ab_avg': 1914, 'mb_new': 1595, 'ab_new': 1836}
ra = (rent['ab_avg'] - rent['mb_avg']) * 12; rn = (rent['ab_new'] - rent['mb_new']) * 12
D = {'mb': mb, 'ab': ab, 'gap': gap, 'gap_month': round(gap / 12), 'inc_gap': {str(k): v for k, v in inc.items()},
     'rent': rent, 'rent_gap_avg_m': rent['ab_avg'] - rent['mb_avg'], 'rent_gap_new_m': rent['ab_new'] - rent['mb_new'],
     'rent_gap_avg': ra, 'rent_gap_new': rn, 'net_avg': gap - ra, 'net_new': gap - rn,
     'rst_breakeven': round((ra - gap) / 0.07), 'raise_mb': 6262, 'raise_ab': 6950, 'raise_diff': 688, 'gap_110k': 3702, 'move_5000_saves': round(5000 * ab['top_bracket_rate'])}
json.dump(D, open('data.json', 'w'), indent=1); print(json.dumps(D, indent=0))
