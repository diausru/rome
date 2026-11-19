# LF-26 — FACTS (working remotely)
Date checked: 2026-11-19. Method: WebSearch (allowed_domains canada.ca), 5 searches; WebFetch to canada.ca blocked in this session (search-result summaries of the CRA pages). Calculations: `data.py` → `data.json` (2026 tables from `salary/calc.py`, CRA T4127; province-correct: Ontario surtax/OHP only for ON).

| Claim | Source | Year | Used in |
|---|---|---|---|
| Provincial/territorial tax follows the province of residence on December 31 | canada.ca CRA "Your province or territory of residence"; "Current year tax rates and income brackets (2026)"; Folio S5-F1-C1 | 2026 | L12–L14, L76, L81 |
| Province of employment (POE): report in person → that establishment's province; not required to report → generally the province where the business is located and from which salary is paid | canada.ca CRA "Determine the province of employment (POE)"; T4001 Employers' Guide | current | L16–L18 |
| Full-time remote work agreement: employee reasonably "attached" to an establishment (would go there without the agreement) → that establishment's province; home office generally not an employer establishment | canada.ca CRA "Determine the province of employment (POE)" | current | L19–L21 |
| T4 box 10 = province of employment | canada.ca CRA RC4120 Employers' Guide (T4 slip) | current | L9, L75 |
| Home office: temporary flat rate method not for 2023 and later; detailed method only | canada.ca CRA "Home office expenses for employees – What the changes are"; T4044 (2025) | 2023+ | L43 |
| Detailed method conditions: worked from home > 50% of the time for at least 4 consecutive weeks (or space used exclusively + regularly to meet people); signed T2200; reimbursed expenses not claimable | canada.ca CRA "Eligibility criteria – Detailed method"; T4044 (2025) | 2025 guide | L44–L47, L78 |
| Designated room: no hours needed, use floor-space share; shared area: hours ÷ 168 × space share; CRA example 12% × 40/168 ≈ 2.9% | canada.ca CRA "Determine your work space use" | current | L53–L54, L58–L59 |
| Salaried employees can claim electricity, heat, water, rent, maintenance, home internet monthly access fees; not mortgage interest, furniture, capital expenses; property tax and home insurance only commission employees | canada.ca CRA "Expenses you can claim"; T4044 | 2025 guide | L49–L50, L62, L79 |
| Instalments: net tax owing > $3,000 this year and in either of the two previous years; Mar 15, Jun 15, Sep 15, Dec 15 | see LF-24 FACTS | current | L67–L68 |
| TD1: "additional tax to be deducted" | see LF-24 / LF-13 FACTS | 2026 forms | L71, L77 |

Model (data.json, 2026, $85,000, single, no other income): income tax at AB rates $15,197 (prov $4,970) vs NS rates $19,776 (prov $9,549) → gap $4,579 ≈ $176/pay (26 pays). Same AB payroll, other homes: BC −$570, ON +$354, MB +$2,601, PE +$3,679, NS +$4,579.
Payroll withholding approximated as annual tax at AB rates (real payroll annualises per pay; figures are "about"). Provincial low-income reductions not modelled (not relevant at $85K).
Home office: rent $21,600 + electricity/heat $1,500 + internet $900 = $24,000; room 10% → $2,400 deduction → −$892 NS tax; kitchen 2.9% → $686 → −$255. Still owes $3,687 ≈ $142/pay via TD1.
Unverified → not in video: Quebec rules, working from abroad, employer reimbursements/allowances taxation, exact instalment-reminder timing.
