# Example (not a CRA rule): a home bought for $300,000 and sold for $450,000 after 5 years, lived in the whole time,
# designated as principal residence for every year owned (CRA T4037 formula: exempt = gain x (1 + years designated) / years owned).
buy, sell, years = 300_000, 450_000, 5
gain = sell - buy
exempt = min(gain, gain * (1 + years) / years)
print(f"gain {gain:,}; exempt {exempt:,.0f}; taxable {gain-exempt:,.0f}")
# late designation penalty: lesser of $8,000 or $100 per complete month late (CRA)
for months in (12, 80, 100):
    print(f"{months} months late -> penalty {min(8000, 100*months):,}")
