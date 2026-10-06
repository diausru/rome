# Example (not a CRA rule): child care expenses deduction (line 21400, Form T778), one child aged 3, two parents.
# CRA: generally the lower-net-income spouse claims; per-child annual limit $8,000 (under 7 at year-end),
# $5,000 (7-16), $11,000 (DTC-eligible); total claim also capped at 2/3 of the claimant's earned income.
paid, limit_u7 = 9000, 8000
for name, earned in (('lower-income parent', 30000), ('if that parent earned only 9,000', 9000)):
    cap = earned * 2 / 3
    print(f"{name}: earned {earned:,} -> 2/3 cap {cap:,.0f} -> deduction {min(paid, limit_u7, cap):,.0f}")
