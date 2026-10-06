# Example (not a CRA rule): individual sells shares held as capital property (non-registered account), 2026.
# CRA T4037: capital gain = proceeds of disposition - (adjusted cost base + outlays and expenses); inclusion rate 1/2
# (the proposed increase to 2/3 was cancelled; Department of Finance / CRA, 2025).
proceeds, acb, fees = 16_000, 10_000, 50
gain = proceeds - acb - fees
print(f"capital gain {gain:,}; taxable capital gain (1/2) {gain/2:,.0f}")
