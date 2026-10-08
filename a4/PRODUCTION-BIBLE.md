# Production Bible: "Why CRA reviews a return" (topic A4)

Order: `channel/PUBLISHING-PLAN.md` §4, week 8 (Thu). Approved look (Kit + Plate), series upgrade (three scenes + bridge CTA). CRA-basics group: Mont (SANS) headings, `pension2` music.
Voiceover: `a4/VOICEOVER.md`. Timeline: `showreel/src/a4-timeline.json`. Composition: `showreel/src/A4v2.tsx`. Publish: `a4/PUBLISH.md`. Analysis page: https://claude.ai/artifact/NASHmRdLqhtcHtq4skv6Er (`channel/analysis/a4-analysis.html`).

## Coordination check (handwritten session), 2026-10-08
Handwritten "Real Tax Math" made B3, B4, B5, B6, B7, B4P, RRSP-SE, INST and promised B8 (creator / platform income) next. A4 (CRA reviews) is not in their list or promises → no overlap. B2 (next in the plan after A4) belongs to their self-employed series → the card series skips it; A4's bridge goes to G1 (newcomer's first return).

## 0. vidIQ analysis (cap 25 credits), 2026-10-08
| Call | Result |
|---|---|
| keyword_research (research, CA) "cra audit" | "cra audit" ≈5,116/mo (competition 26.6); "cra audit triggers" ≈5,403/mo (competition 16.5, overall 66.8); "cra red flags" ≈9,559/mo (competition 24.5); "how to respond to cra audit" ≈4,723/mo (competition 9.3, best opportunity 69.2); "canada revenue agency" ≈5,190/mo; long-tail "what triggers a cra audit", "cra audit letter", "avoid cra audit" <750 each |
| youtube_search (CA, by views, since 2024) "CRA audit red flags canada" | Blueprint Financial "The CRA is Watching TFSA Holders: 3 Red Flags" 341K (9:28); Next Step Wealth "5 CRA Audit Triggers…" 251K (12:28); Blueprint "7 CRA Red Flags That Trigger an Audit in 2026" 237K (11:30); RealEstateTaxTips 74K (16:32); several 10–17 min "AI is watching" style videos |
| outliers (shorts, 1 year) "CRA audit triggers canada" | Faris CPA (50 subs) "CRA Net Worth Audit: income doesn't match lifestyle" 193K, ×11,341; Faris CPA "CRA Audits, Collections, Tax Debt" 167K; GS CPA audit checklist 14K |
| score_title × 2 (after the render) | see §3 |
Conclusion: strong demand ("cra red flags" ≈9.6K, "cra audit triggers" ≈5.4K at low competition); competitors are 9–17 min lists of speculative "red flags" (AI, crypto, TFSA); short CRA-audit Shorts can explode even on tiny channels. Our angle: the four reasons CRA itself publishes, plus "a review is not an audit" (reassuring, verifiable). Title: "CRA red flags" / "audit" + "the 4 reasons".

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (direct fetch blocked by the proxy; page text via search restricted to canada.ca), 2026-10-08.

| # | Claim used | Source |
|---|---|---|
| R1 | A return may be selected for review for reasons such as: information doesn't match third-party sources (e.g. T4 slips); the types of deductions or credits claimed; compliance history; random selection | CRA "How tax returns are selected for review" |
| R2 | Matching Program: after the notice of assessment, the return is compared with information from third parties such as employers and financial institutions | CRA "Types of reviews" |
| R3 | Employers file T4 slips and payers of investment income file T5 slips directly with CRA | CRA tax-gap study; T4 / T5 guides |
| R4 | A review is not an audit; it confirms income, deductions and credits are reported correctly and can be supported; CRA reviews approximately 3 million returns a year | CRA "Income tax review? You've got this!" / "Review of your tax return by the CRA" |
| R5 | Respond to the request by the date in the letter (time limit); keep records/documents for six years | CRA review pages; CRA "Keeping records" |

### Notes and limits
- "Approximately 3 million" is CRA's own figure on its review-campaign page (no year stated); shown as "≈3 million … a year".
- Audits (RC4188) are a separate, more in-depth process; not covered beyond "a review is not an audit".
- No claim about AI, net-worth audits, crypto or lifestyle audits (not on the pages above).

## 2. Project
| Field | Value |
|---|---|
| SCENES | Three plates of the same man (scene 1 job 65eee41d as image reference; gpt_image_2_5 + 4K upscale each; checked: no text, emblems or writing): 1) `a4-s1-4k.jpg` morning, reading a letter at the kitchen table (hook → claims); 2) `a4-s2-4k.jpg` evening, sorting receipts from a shoebox into folders (history → review); 3) `a4-s3-4k.jpg` next morning, relieved, sealing his reply, his wife brings coffee (letter → end). Cuts at `history` and `letter` |
| PINS | face-down papers "T4 · T5 copies already at CRA" · envelope "keep receipts" · shoebox "picked at random" · receipts "a review asks for receipts, documents" · sealed envelope "reply before the deadline" |
| STRIP | 1 slips vs return · 2 claims · 3 history · 4 random · review ≠ audit |
| VOICE | Grady; 132 words; 64.66 s; bridge CTA "Next: your first Canadian tax return as a newcomer. Follow so you don't miss it." |
| RENDER | 1080×1920, 24 fps, 1564 frames (65.2 s) |

## 3. QC log
- Stills v1: two pins clipped at the right edge (T4/T5 copies, review receipts) → moved left; reply pin collided with the end text → removed; review note wrapped → shortened. Final: 1564 frames, 65.17 s, h264 1080×1920 + AAC 48 kHz, decode OK, −14.2 LUFS; contact sheet checked. vidIQ title scores 95 ('Why Did CRA Pick YOUR Return? The 4 Official Reasons', chosen) · 84; 25 credits total by balance. Kit card #20. Metricool: not sent.
