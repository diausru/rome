# R5 — Pension income splitting: move it on paper (production bible)

Card series, TOPICS-2 R5 (last of the retirement arc), bridged from D4 ("Next: pension income splitting") and promised by the OAS Short. Investigation format. `showreel/src/R5V3.tsx`, motion engine v1.

## Coordination check (2026-10-24)
Handwritten series and long-form: no pension-splitting video made or promised. The `oas` Short names pension splitting as one of three levers (one line) and bridges to "pension income splitting, step by step": this video is that follow-up, not a duplicate.

## Facts (REAL TAX INFORMATION MODE)
| Claim | Source | Type |
|---|---|---|
| Split-pension amount ≤ 0.5 × eligible pension income × months married / months in year | ITA 60.03(1) (full text fetched 2026-10-24) | rule |
| Joint election in prescribed form, filed with both returns by their filing-due dates | ITA 60.03(1) "joint election"; canada.ca: Form T1032, one joint election per year | rule |
| Both resident in Canada at year end; married/common-law, not separated ≥ 90 days by breakdown | ITA 60.03(1) "pensioner", "pension transferee" | eligibility |
| Transferee is deemed to receive the amount as pension income for the s. 118(3) credit | ITA 60.03(2) | rule |
| 65+: pension income incl. RRIF and RRSP annuity; under 65: only a life annuity from a pension plan (others only on a spouse's death) | ITA 118(7) | eligibility / exception |
| OAS and CPP/QPP are not pension income | ITA 118(8)(a)-(b) | exception |
| Pension credit: federal lesser of $2,000 and eligible pension income × 14% (2026); Manitoba $1,000 × 10.8% | ITA 118(3); gov.mb.ca Personal Tax Credits | rule |
| 2026 rates: federal 14 / 20.5 (from $58,523) / 26 %; MB 10.8 / 12.75 (from $47,000) / 17.4 % | CRA T4127 2026 | rule |

Example (not a CRA rule), `r5/calc.py`: both 66; Pat $80,000 RPP life pension + $20,000 CPP/OAS; Jo $20,000 CPP/OAS. Split $40,000 (the 50% maximum) → $60,000 each. Bracket tax $33,490 → $30,459: −$3,030 (rounded). Jo's pension credit $280 + $108 = $388. Total ≈ $3,418.
Dependencies (said on screen as "example"; not modelled): age amount (changes with net income for both), OAS recovery tax (lower net income can reduce it), withholding (recalculated on T1032 step 5), other income, other provinces. Professional advice: mixed RRIF/RPP income under 65, year of death or separation, non-residents.

## Format vs D4, C2, C1 (Variety rule)
| | C1 | C2 | D4 | **R5** |
|---|---|---|---|---|
| Hook | count-up | two envelopes | coin into a jar | **two tax returns, a $40,000 pension strip slides across** |
| Main visual | split bars | ledger table | rate staircase | **two income tubes that level out at $60K** |
| Exceptions / reveal | vault | mix slider | calendar tiles | **✕/✓ sorting tray; cheque stays with Pat + T1032 card ticks both returns, EVERY YEAR stamp** |
| End | note card | EI card | rule card | **"check yours" card + next pill** |
| Music | work (G,92) | pension2 (F,76) | pension (D,72) | **pension2 (F,76)** |
| Scenes | designer x3 | cabinet-maker x3 | couple, 3 ages | **retired couple: winter kitchen → evening laptop → mailbox with the cheque** |

## Research
vidIQ: 'pension income splitting canada' <750/mo (competition 15); 'canadian retirement' 11,497/mo (+27.7%); titles 83 (primary) / 78; balance 679 → 669 = 10 credits measured (keyword research + 2 title scores were called; the balance shows 10). NexLev Shorts CA (views): general income-splitting Shorts 1.7K–2.8K; none with a worked example or the under-65 RRIF rule.

## Decisions
- VO first pass ran 94.5 s (over 1:10): script cut from 199 to 136 words and all lines regenerated (7 × Grady); final 69.93 s, tempo 1.0.
- Cover: 34.41 s ('THE RULE', tubes level, −$3,030).
- Next: R1 Disability Tax Credit (credits arc).
