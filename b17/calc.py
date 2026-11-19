"""B17: day trading in a TFSA. CRA Folio S3-F10-C1 (effective 2024-05-28) ¶1.86/1.94.1: a TFSA is generally taxable
under Part I on income from carrying on a business; the TFSA holder is jointly and severally liable with the TFSA trust.
CRA TFSA issuers page: the trust is taxable on any income and any capital gains derived from the business (T3 return).
Whether trading is a business is a question of fact (factors from the courts, IT-479R archived).
Example (not CRA figures): 300 trades a year, gains $20,000. The tax RATE on a TFSA trust is NOT stated in the sources
checked, so no tax amount is shown."""
import json, os
TRADES, GAINS = 300, 20_000
out = dict(trades=TRADES, gains=GAINS, taxable_if_business=GAINS, taxable_if_not_business=0, rate_shown=False)
print(json.dumps(out, indent=1)); json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.json"), "w"), indent=1)
