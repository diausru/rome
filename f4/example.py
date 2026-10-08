# Example (not a CRA rule): a Manitoba rental house, building portion $300,000 (land excluded, not depreciable),
# Class 1 (4%), half-year rule in the year bought, full claim every year (net rental income assumed large enough).
cost = 300_000; ucc = cost; total = 0
for y in range(1, 13):
    cca = round(ucc * 0.04 * (0.5 if y == 1 else 1)); ucc -= cca; total += cca
    print(f"year {y:2}: CCA {cca:>6,}  cumulative {total:>7,}  UCC {ucc:>7,}")
# Year 1 claim: 300,000 x 4% x 1/2 = 6,000. Cumulative passes ~100,000 around year 9-10.
# Sale: building part sold for $320,000 (> cost). Recapture = min(cost, proceeds) - UCC.
