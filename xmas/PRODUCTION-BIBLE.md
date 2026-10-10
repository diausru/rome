# Production Bible: "Gifts and tax in Canada" (Christmas special, project `xmas`)

Extra video added by the user (2026-10-09/10): published **Tue Dec 22, 2026** (a second extra video, the New Year one, goes on Tue Dec 29: tax-loss selling before Dec 30, project `ny`). User decision for this video only: length up to 1:30, a festive background with gifts everywhere. Approved look (Kit + Plate), series upgrade (three scenes + bridge CTA). Mont (SANS) headings, new procedural music mood `holiday` (`tools/music.py`: 84 BPM, F major, EP + celesta + soft sleigh-bell shimmer, original, no samples).
Analysis page: https://claude.ai/artifact/Lmy3V6aiuXrxZH9jATuPgm (`channel/analysis/xmas-analysis.html`).
Voiceover: `xmas/VOICEOVER.md`. Timeline: `showreel/src/xmas-timeline.json`. Composition: `showreel/src/XmasV2.tsx`. Publish: `xmas/PUBLISH.md`.

## Coordination check (handwritten session), 2026-10-10
Handwritten session: B2 delivered, B10 in progress; its NEXT 3 TOPICS are self-employed (CCA, side hustle by province, CPP2, C4). No gift / attribution topic → no overlap. Our bridge (first TFSA room on Jan 1, changed 2026-10-10 to tax-loss selling) is not in its plans.

## 0. vidIQ analysis (cap 25 credits), 2026-10-09/10
| Call | Result |
|---|---|
| keyword_research × 2 (CA) | "gift tax rules" ≈4,299/mo; "gift tax" ≈3,939 (global, US-heavy); "tax planning canada" ≈4,950; "estate planning canada" ≈3,961 |
| youtube_search (CA, by views) "gift tax canada" | US/IRS gift-tax videos dominate (Tax Savvy Advisor 613K; Jeremy Keil 230K), Indian gift-tax videos; Canadian: RealEstateTaxTips "Pass Real Estate to Your Kids" 195K (25:48), Marvin Hutchinson (AI character) 67.6K. **No Canadian Short on gifts and tax.** |
| score_title × 2 (after the render) | "Giving Money for Christmas in Canada? Know This Tax Rule First" **87** · "Canada Has No Gift Tax… But These Gifts Can Still Cost You" **82** |
My calls = 25 credits. Balance 1,515 → 1,490 (−25).
Conclusion: people search "gift tax" every December, and the results answer the US question (IRS form 709, annual exclusion). Canada has no gift tax, so the useful Canadian answer is about what can still be taxed: attribution, deemed disposition, employer gifts. Nobody gives it in a Short.

## 1. Research record (REAL TAX INFORMATION MODE)
Sources: canada.ca (direct fetch blocked by the proxy; page text via search restricted to canada.ca), 2026-10-09/10.

| # | Claim used | Source |
|---|---|---|
| R1 | Gifts and inheritances are generally not reported as income; income earned on them afterwards is taxable | CRA "Amounts that are not reported or taxed"; Income Tax Folio S3-F9-C1 |
| R2 | Money or property given (or lent) to a spouse or common-law partner: income (interest, dividends) and capital gains from it are attributed back to the giver | CRA IT-511R (archived, attribution rules ss. 74.1(1), 74.2); CRA T4037 (2025) |
| R3 | Exception: amounts a spouse/partner contributes to their own TFSA with money you gave are not attributed while in the TFSA | CRA "How to contribute to a TFSA"; ITA s. 74.5(12)(c) |
| R4 | Gifts to related minors under 18 (children, grandchildren, nieces/nephews, other non-arm's-length minors): interest and dividends attributed to the giver; capital gains not attributed (TOSI may apply) → video says "interest and dividends" only | CRA IT-510 (archived, s. 74.1(2)) |
| R5 | Gift of capital property to anyone other than a spouse/partner: deemed disposition at fair market value; recipient's cost = FMV. Gift to a spouse/partner: generally rolls over at cost unless elected otherwise | CRA "Transfers of capital property"; T4037 (2025) |
| R6 | Capital gains inclusion rate one-half (the proposed increase was cancelled) | Finance Canada 2026 backgrounder; CRA "What's new" |
| R7 | Employer gifts and awards: non-cash gifts and awards up to a total of $500 a year are not taxable; the amount above $500 is taxable; cash and near-cash gifts are always a taxable benefit (gift cards count as non-cash only if they meet CRA's conditions) | CRA "Gifts, awards, and long-service awards" (T4130) |

### Example (not a CRA rule)
Shares bought for $10,000, worth $30,000, given to an adult son → deemed sold at $30,000 → $20,000 capital gain reported by the giver; × ½ = $10,000 taxable capital gain added to the giver's income; the son's cost becomes $30,000. Tax owed depends on the province and other income (not computed).

### Dependencies and limits
- Attribution has exceptions not covered (loans at the prescribed rate with interest paid, fair-market-value transfers, separation, death, business income, the "second-generation" income rule).
- Capital gains on gifts to minors: not attributed under s. 74.1(2) but TOSI can apply → deliberately not mentioned.
- Gifts of a principal residence/cottage: the principal residence exemption may reduce the gain; not covered (the cottage is named only as an example of non-cash property).
- Crypto: treated as property by CRA; gift = deemed disposition like other capital property.
- U.S. persons and foreign gifts (T1135 if foreign property is over $100,000) not covered.

## 2. Project
| Field | Value |
|---|---|
| SCENES | Three plates of the same family (parents in their 50s, adult son), gpt_image_2_5 9:16, scene 1 job d3e94581 (chosen from 2 variants) as image reference for 2–3, each upscaled to 4K (2294×4096); checked: no text, no numbers, envelope and gift tags blank: 1) `xmas-s1-4k.jpg` Christmas Eve by the tree, gifts everywhere, red-ribbon envelope, cocoa (hook → kids); 2) `xmas-s2-4k.jpg` dinner table full of presents, the father hands his son a small cottage-shaped gift (property → example); 3) `xmas-s3-4k.jpg` Christmas morning, unwrapped boxes and paper everywhere, coffee (boss → end). Cuts at `property` and `boss`. Live elements in code: snow behind every window, steam over the cocoa and the coffee |
| PINS | envelope "a gift: not income" · cottage "treated as sold: at market value" → "you report: $20,000 gain, not your son" · open gift box "non-cash gift: up to $500 a year, tax-free" |
| STRIP | ✓ a gift: not income · 1 spouse invests it: taxed to you · ✓ their TFSA: exception · 2 kids under 18: taxed to you · 3 property: treated as sold · ✓ boss: non-cash ≤ $500 |
| VOICE | Grady; 10 beats; 196 words; 89.37 s (first take 92.37 s > 1:30 → hook and CTA shortened and regenerated, two pauses trimmed); bridge CTA first "Next: your TFSA room resets on January first…"; the user then chose another Dec 29 topic, so the CTA was regenerated as "Next: down on a stock? Why December thirtieth matters. Follow so you don't miss it." (89.41 s after trimming every pause by 0.12 s) and the video re-rendered (2158 frames) |
| MUSIC | `holiday` −24 LUFS, sidechain-ducked; mix −14.1 LUFS |
| RENDER | 1080×1920, 24 fps, 2157 frames (89.9 s) |

## 3. QC log
- Stills v1: spouse card label wrapped → shortened to "CATCH #1 · A GIFT TO YOUR SPOUSE OR PARTNER"; in scene 2 the cottage pins sat on the strip / under the card → new `below` pin anchored at the cottage's base; in scene 3 the box pin touched the strip → camera lowered (v 0.56 → 0.5). Re-checked: clean.
- Final: 2157 frames, 89.88 s, h264 1080×1920 24 fps + AAC 48 kHz, decode OK, −14.1 LUFS; contact sheet checked (cards, pins, strip, both scene cuts, end block, flag, sources footer). vidIQ title scores 87 / 82 → primary "Giving Money for Christmas in Canada? Know This Tax Rule First". Kit card #25 (Kit v33). Metricool: not sent yet; needs `xmas-share.mp4` in the Drive folder, then TT 10:00 / IG 11:00 / YT 16:00 on Tue Dec 22 (America/Winnipeg).

- 2026-10-10 (v2): CTA line and pill changed to the Dec 29 topic (tax-loss selling); re-render 2158 frames. Kit card #25 updated.
