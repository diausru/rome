# Example (not a CRA rule): Manitoba CCPC, 2026, $120,000 of active business income, no associated corporations,
# no passive income above $50,000, taxable capital under $10M. Rates: CRA "Corporation tax rates" (federal net 9% SBD /
# 15% general) and CRA/Manitoba (0% lower rate up to the $500,000 Manitoba business limit; 12% higher rate).
profit = 120_000
sbd, general = 0.09 + 0.00, 0.15 + 0.12
print(f"small business rate {sbd:.0%}: tax {profit*sbd:,.0f}; general rate {general:.0%}: tax {profit*general:,.0f}; difference {profit*(general-sbd):,.0f}")
# passive income grind: business limit reduced by $5 for each $1 of AAII over $50,000 → 0 at $150,000
for aaii in (50_000, 100_000, 150_000):
    print(f"AAII {aaii:,}: business limit {max(0, 500_000 - 5*max(0, aaii-50_000)):,}")
