# Example (not a CRA rule): arrived and became resident on September 1, 2026; days resident Sep 1–Dec 31 = 122.
# Federal basic personal amount 2026: $16,452 (CRA T4127, 2026; series parameter set in salary/calc.py).
# Proration per CRA "Federal non-refundable tax credits for newcomers": BPA x days resident / 365 (unless the 90% rule applies).
days = 30 + 31 + 30 + 31  # Sep..Dec
print(days, round(16452 * days / 365, 2))  # 122 -> 5,498.97
