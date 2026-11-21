# MASTER RESEARCH BRIEF — Canadian tax system 2026–2027 (user, 2026-11-20)
Focus: Winnipeg / Manitoba residents, family tax planning, CRA benefits. A reference standard for long-form research and for the future deliverables (on command only).

## Source rules (user)
- Open the actual documents, not search-result summaries. Record the publication/effective date, the table/section and the direct URL. Mark each claim enacted / announced / proposed / estimated.
- Priority: CRA → Finance Canada → Government of Manitoba → legislation → StatCan → other official → reputable tax orgs → news (only to find originals). Immigration News Canada, blogs, Reddit and AI summaries are NOT authoritative.
- When official sources conflict: investigate and explain, never silently pick one. Never invent 2027 figures. Never confuse payroll withholding with final annual tax. Show formulas and intermediate results. Flag anything that still needs CRA / Manitoba Finance confirmation.

## Key primary sources (URLs from the user)
- CRA rates and brackets: canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets.html (+ /current-year.html).
- T4127 124th ed. (Jan 2027): …/payroll/t4127-payroll-deductions-formulas/t4127-jan.html (+ computer-programs page).
- Payroll Deductions Online Calculator; TD1; TD1MB.
- Manitoba Finance gov.mb.ca/finance/; Budget 2026 PDF gov.mb.ca/asset_library/en/budget2026/budget2026.pdf; Manitoba taxation; web2.gov.mb.ca/laws/.
- Finance Canada; ESDC; StatCan CPI; CPP; OAS; EI; CPP rates page; EI rates page; RRSP; TFSA; CCB; GIS; business taxes; GST/HST; corporations; individuals (deadlines).

## Topics (parts 2–13)
2. Federal 2027 (T4127): brackets, rates, BPA, NRTCs, indexation; statutory brackets vs payroll formulas.
3. Manitoba: 2026/2027 brackets and BPA, indexing status, NRTCs, Education Property Tax Credit, renters, fertility, political contribution, CEDTC, other relief (refundable / non-refundable / income-tested).
4. CPP / CPP2 / EI 2027: rates, ceilings, exemption, maximums, self-employed; reconcile the T4127 base / first-additional / total.
5. RRSP (limits 2026/27, room, carry-forward, spousal, deadlines, withdrawals, RRIF, OAS impact, couples; MB savings examples by marginal rate).
6. TFSA (limits, room, withdrawals/recontributions, overcontribution, estate, successor holder).
7. CCB (AFNI, benefit year, thresholds, maximums, shared custody, CDB, RRSP effect on AFNI, self-employment; MB family examples; benefits ≠ tax savings).
8. OAS / GIS / recovery tax (+$1,000 income examples, year-specific thresholds).
9. Credits and deductions (who qualifies, refundable?, transfer, carry-forward, documentation, MB value).
10. Self-employed and small business (sole prop vs corp, CCA, GST $30K, ITCs, SBD, MB corp rates, salary vs dividends, instalments, losses; a Winnipeg service-business example).
11. Family models ($40K+$80K, $60K+$60K, $100K+$30K, self-employed, no income, pension, kids, DTC dependant).
12. Filing calendar 2026/2027 income (filing vs payment deadlines, instalments, NOA, objections, My Account).
13. Tables at $30K–$300K: federal and MB gross tax, credits, net tax, marginal and average rate, CPP, EI, take-home; 2026 vs 2027.

## Deliverables (only when the user commands)
1. Canada Tax Changes 2026–2027 report. 2. Manitoba Family Tax Calculator (Excel). 3. Tax Planning Guide. 4. Source Library. 5. Tax Calendar.

## Open discrepancies found so far (2026-11-21)
- **Manitoba thresholds — RESOLVED 2026-11-21 (pages opened in a headless browser):**
  - The CRA "Current year tax rates (2026)" page does show $47,564 / $101,200.
  - CRA T4127 124th ed. (Jan 2027) shows MB 0 / 47,000 / 100,000, BPAMB $15,780, and states "No indexing applies to British Columbia, Manitoba and Prince Edward Island".
  - Manitoba Finance Information Bulletin (Budget 2025, gov.mb.ca/finance/taxation/pubs/bulletins/2025budget.pdf, per search) says indexation of the BPA and thresholds is frozen from the 2025 tax year at 2024 levels ($47,000 / $100,000). Hansard of May 14, 2026 refers to the cancelled indexation.
  - Conclusion: $47,000 / $100,000 is supported by the province's own bulletin plus CRA payroll. The CRA rates page looks inconsistent (= ×1.012).
  - LF-28 L39 stays correct. Before a T1-specific claim, re-check the T1 MB428 form.
  - gov.mb.ca does not resolve from this container, so the bulletin itself was not opened.
- **CPP 2027 rate — RESOLVED 2026-11-21 (T4127 124th ed. opened):**
  - "On April 28, 2026, the Government of Canada announced the reduction of the base CPP contribution rate from 9.90% to 9.50%, effective January 1, 2027."
  - The employee/employer base rate goes 4.95% → 4.75%. The first and second additional rates are unchanged.
  - Employee total 5.75% (4.75 + 1.00) on earnings $3,500–$76,700; max $4,209.00; QPP max $4,611.60.
  - CPP2: 4% on $76,700–$87,400, max $428.
  - Not yet in LF-28 (it mentions only the ceilings). Candidate fix for LF-28.
- **NL 2027 BPA:** $15,495 (T4127 summary) vs the 2026 value in salary/calc.py ($13,094 × 1.033 ≠ 15,495). Not used.
- Environment: WebFetch to www.canada.ca and gov.mb.ca is blocked in this cloud session (only WebSearch summaries are available). The user's rule requires opening the documents → the hosts need to be allowed.
