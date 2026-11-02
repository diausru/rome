# LF-16 — FACTS (Canada child benefit: how a deduction raises it)
Date checked: 2026-11-02. Method: 1 WebSearch restricted to canada.ca + LF-10 tables. Calculations: `data.py`.

| Claim | Source | Year | Used in |
|---|---|---|---|
| CCB July 2026 – June 2027 maximum: $8,157/yr ($679.75/month) under 6; $6,883 ($573.58) aged 6–17 | canada.ca (CRA), CCB – How much you can get; ESDC news July 2026 | 2026–27 | L8–L9 |
| Based on adjusted family net income (AFNI) of the previous year (2025 for July 2026 – June 2027); recalculated every July; indexed | canada.ca (CRA), CCB – How much you can get | 2026–27 | L11–L12, L28–L29 |
| Reduction starts above AFNI $38,237; between $38,237 and $82,847: 7% (one child), 19% (three children); above $82,847 a fixed amount plus another % | canada.ca (CRA), CCB – How much you can get | 2026–27 | L14–L17, L35, L39 |
| Child disability benefit (extra, up to $3,480) | canada.ca (CRA), Child disability benefit | 2026–27 | L35 |
| Provinces/territories run their own child benefit programs | canada.ca (CRA), provincial and territorial programs | current | L35 |
| RRSP deduction lowers net income; 2026 Ontario rates for the tax saving | CRA T4127 (2026), LF-10 `th()` | 2026 | L22–L25 |
| Both partners' returns are needed to calculate the CCB | canada.ca (CRA), T4114 Canada Child Benefit | current | L32–L33 |

Not used: two-child rate (not confirmed in the search); upper-tier formula; provincial amounts.

## Calculated results (`data.json`)
- One child under 6, AFNI $70,000: 8,157 − 7% × 31,763 = $5,934. AFNI $60,000 (after a $10,000 RRSP deduction): $6,634 (+$700).
- Income tax saving on the $10,000 RRSP (Ontario 2026, $70,000 salary): $2,965. Total ≈ $3,665.
- Three children in the 7%→19% range: $10,000 deduction ≈ +$1,900 CCB.
