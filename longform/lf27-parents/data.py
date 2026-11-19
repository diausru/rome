"""LF-27 Supporting your parents. 2025 tax year (amounts verified on canada.ca for 2025; 2026 amounts not verified).
Maya sends her mother $500/month. Federal non-refundable credit rate 2025 = 14.5% (lowest rate 15% -> 14% from Jul 1 2025, prorated)."""
import json
CCA = 8601; LIMIT = 28798; RATE = .145; ED = 16129
d = dict(monthly=500, year_sent=500 * 12, cca_max=CCA, dep_limit=LIMIT, rate_pct=14.5, cca_credit=round(CCA * RATE),
         split_each=round(CCA / 2 * RATE), ed_max=ED, ed_credit_max=round(ED * RATE), tax_year=2025)
json.dump(d, open('data.json', 'w'), indent=1); print(json.dumps(d))
