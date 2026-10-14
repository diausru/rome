# LF-07 facts — "Two jobs, both deducted tax… and still a bill" (checked 2026-10-14)
Example person (not a CRA rule): Maya, single, Ontario, two jobs in 2026: $55,000 + $35,000, employment income only. Numbers: `data.py` → `data.json` (tools/taxcalc.py 2026 tables).
canada.ca was unreachable from the container (proxy stream reset) → rules confirmed via canada.ca pages returned by search on 2026-10-14; re-open the pages before publishing.

| Claim | Source (canada.ca) | Note |
|---|---|---|
| Two employers at the same time and personal amounts already claimed on another TD1 → cannot claim again; tick "More than one employer or payer at the same time", enter 0 on line 13 | TD1 2026 page; "Get the completed TD1 forms from the individual"; TD1ON 2026 | 2026 forms |
| More tax can be deducted: "Additional tax to be deducted" on federal TD1 (factor L in T4127) | TD1 2026; T4127 122nd ed.; TD1AB/TD1BC 2026 | |
| CPP overpayment (more than one employer) refunded via Schedule 8, line 44800; ask within 4 years | Line 44800 page | amount not shown (CPP2 interaction not verified → no CPP number on screen) |
| EI: employee premium 1.63% to $68,900 (max $1,123.07); excess from two employers refunded on the return (line 45000) | 2026 EI rates (Carleton/MUN payroll pages cross-check) | example: 896.50 + 570.50 = 1,467.00 → 343.93 over |
| Instalments: net tax owing > $3,000 in current year AND in either of the two previous years; due Mar 15, Jun 15, Sep 15, Dec 15 | "Who has to pay — required tax instalments" | Québec $1,800 (n/a) |

## Calculation (estimate — label on screen)
Each employer withholds as if its job were the only income with full personal amounts claimed (both TD1s filled with the basic amounts) ≈ annual tax on that income alone (real payroll annualises per pay, so actual figures differ slightly).
Job A 55,000 → 7,178 · Job B 35,000 → 3,332 · withheld 10,510 · tax on 90,000 → 17,034 · gap **6,523** (≈ 544/month).
Parts: personal amounts counted twice ≈ 16,452×14% + 12,989×5.05% = **2,959**; the rest ≈ **3,564** = job B's dollars taxed at 14%+5.05% (19.05%) instead of 20.5%+9.15% (29.65%) on the combined income.
After the TD1 fix (0 on line 13 at job B) the remaining gap ≈ 3,564 ≈ 137 per biweekly pay → "additional tax to be deducted".
