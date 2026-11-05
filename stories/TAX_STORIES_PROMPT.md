# TAX SECRETS CANADA — "Real Situations" Weekly Series
## Master prompt file for Claude Code (full build + edit, 7–10 min YouTube videos)

> **How to use:** put this file in the project root and tell Claude Code:
> "Read TAX_STORIES_PROMPT.md and build Episode N end-to-end following Parts A–C."
> Everything the video says is in this file. Claude Code must NOT add tax facts, rates, limits or numbers that are not written here.

---

# PART A — RULES CLAUDE CODE MUST FOLLOW

## A1. What this series is
- One long video per week, 7–10 minutes, 16:9, 1920×1080, 30 fps, English.
- Format: **one person's situation → how it went wrong / what they faced → what the Canadian rules actually say → the numbers, animated → the legal fix, step by step → one question to the comments.**
- Tone: calm, warm, a bit dramatic in the hook, then very clear. Like a smart friend who knows tax. Never preachy, never "financial advice".
- Audience: individuals in Canada (employees, side hustlers, newcomers, young savers, families). Not corporations.

## A2. Honesty rules (non-negotiable)
1. **Never call these "our clients."** They are composite stories based on situations Canadians shared publicly online. Names, ages, cities and amounts are changed.
2. Mandatory on-screen line in the first 10 seconds of every episode (lower-third, 4 s):
   `Based on real situations Canadians shared online. Names and numbers changed. General information, not tax advice.`
3. Mandatory end card line (3 s): `Rules checked against canada.ca and the Income Tax Act as of November 2026. Your situation may differ — confirm with the CRA or a licensed professional.`
4. Every rule shown on screen gets a small source tag in the bottom-left (e.g. `Source: canada.ca — TFSA excess amounts`). Source tags are listed per episode.
5. Story numbers are fictional. Rule numbers (limits, thresholds, percentages) are real and are only the ones written in this file.
6. Where an episode uses an assumed marginal tax rate, the screen must show `Illustrative rate — yours depends on your income and province.`
7. No product, bank, broker or fund names. No "buy X". Account types (TFSA, RRSP, FHSA) are fine.
8. YouTube upload: the host and story illustrations are AI-generated. If the host looks like a real person, set **"Altered or synthetic content" = Yes** in YouTube Studio. YouTube requires disclosure when realistic content could be mistaken for a real person, place or event; it does not require it for scripting help or clearly unrealistic or animated content.
9. Monetization safety: YouTube's "inauthentic content" policy (renamed from "repetitious content" on July 15, 2025) targets mass-produced videos with only superficial differences, such as narrated stories that are nearly identical. Every episode in this file has a different situation, different rules, different calculations and different visuals. Do NOT reuse the same B-roll or the same calculation layout twice in a row. Rotate the 4 calculation-card layouts (A5).

## A3. Fixed episode structure (all episodes)
| Block | Time (approx.) | Content |
|---|---|---|
| 1. Hook | 0:00–0:20 | The worst moment of the story in one line + the number. Host on screen. |
| 2. Disclaimer + promise | 0:20–0:35 | Disclaimer lower-third. "By the end you'll know exactly what she should do — and what you'd do." |
| 3. The story | 0:35–2:30 | Illustrated story panels, step by step, with small timeline chips (Year 1 → Year 2…). |
| 4. The turn | 2:30–3:00 | The letter / the bill / the realization. Sound hit. |
| 5. What the rules say | 3:00–5:00 | 2–4 rule cards with source tags. |
| 6. The numbers | 5:00–6:30 | Animated calculation (count-up numbers, bars, timelines). |
| 7. The legal fix | 6:30–8:30 | Numbered steps 1–5 (step cards slide in one by one). |
| 8. What you can steal from this | 8:30–9:00 | 3 bullet takeaways for every viewer. |
| 9. CTA | 9:00–end | One comment question + "Instagram @canadataxwizard to work with me" + end card. |

## A4. Visual identity
- **Host:** brunette woman, wavy shoulder-length hair, dark green blazer over a cream top, small gold earrings, office with a Canadian flag softly out of focus behind her. Appears in Hook, the start of "What the rules say", and CTA. Four expression states: explaining (neutral smile), shock (raised brows, slightly open mouth), joy (warm smile), thinking (hand to chin).
- **Story panels:** illustrated, NOT photoreal — "modern editorial illustration, soft grain, muted palette of deep green #1F4D3A, cream #F4EFE6, warm red #C8102E accents, charcoal #2B2B2B, flat shapes with subtle shading, clean negative space on the right third for text, 16:9". The same character design is used within an episode (character sheet first).
- **Typography:** headings Montserrat ExtraBold, body Inter Medium, numbers JetBrains Mono Bold. Captions: Inter Bold 54 px, white with 6 px charcoal stroke, max 2 lines, centre-bottom, the current word highlighted cream-on-green.
- **Colours:** good/legal = deep green; danger/penalty = warm red; neutral = cream; never pure black backgrounds.
- **Sound:** soft lo-fi bed at −24 LUFS under VO, a "paper slide" whoosh on panel changes, a low "thud" on the turn, a soft "cash register" tick on each count-up end. VO normalized to −14 LUFS integrated for the final mix.

## A5. Calculation-card layouts (rotate)
- **L1 Ledger:** cream paper, rows appear one by one, final row underlined twice, result counts up.
- **L2 Bars:** two or three horizontal bars growing (red = cost, green = saved).
- **L3 Timeline:** horizontal months/years, coins or red dots stacking per period.
- **L4 Split-screen:** "Without the fix" (red) vs "With the fix" (green), totals count up simultaneously.

## A6. Production pipeline for Claude Code
**Recommended stack:** Node 20 + Remotion (React video) for layout, animation and render; ffmpeg for audio and final encode; Python for helper scripts. (Check Remotion's licence terms for your situation before commercial use; if you prefer, the same plan works with Python + MoviePy + ffmpeg.)

```
/tax-stories
  /assets/host/             host_explaining.png, host_shock.png, host_joy.png, host_thinking.png (+ Seedance clips)
  /assets/music/            lofi_bed.mp3, whoosh.wav, thud.wav, tick.wav
  /episodes/epNN/
      script.json           scenes, VO text, on-screen text, calc data (built from Part B)
      /img/                 generated panels  sNN.png
      /vo/                  vo.mp3 + vo_timestamps.json
      /video/               seedance clips (optional)
      out_epNN.mp4
  /src/                     Remotion compositions: Hook, StoryPanel, RuleCard, CalcL1..L4, StepCard, CTA, Captions
```

**Step-by-step build for each episode**
1. Parse the episode section in Part B into `script.json` with: `scenes[] {id, block, vo, onscreen, image_prompt, motion, sourceTag, calc}`.
2. **Character sheet:** generate one GPT Image 2 sheet for the episode's character using the CHARACTER line + the global illustration style (A4). Use it as the reference image for every panel of that episode.
3. **Panels:** for each scene with `image_prompt`, generate a 1920×1080 image = global illustration style + character reference + the scene's prompt. Leave the right third clean for text.
4. **Voiceover:** send the full VO text (without the `[S##]` markers) to ElevenLabs (the channel's chosen voice, stability ~0.45, similarity ~0.8, style ~0.2, speed 0.90–0.95). Request character/word timestamps if your ElevenLabs plan/endpoint supports it; otherwise run Whisper locally on vo.mp3 to get word timestamps.
5. **Timing:** each scene starts at the timestamp of its first VO word. Add a 1.2 s visual hold after every calculation result and a 0.8 s hold after each step card. Target final duration 7:00–9:30; if under 7:00, lengthen holds on calc and step cards (never pad with new claims).
6. **Motion on panels:** default = slow push-in 100%→108% over the scene + 3-layer parallax (background / character / foreground props separated with a background-removal step). Use Seedance only for the 2–3 "hero" moments marked `SEEDANCE` in each episode.
7. **Seedance prompt format (7 blocks, `::` separated).** Subject, Environment and Lighting stay identical for all shots of the episode; only Kinetics and Camera change:
   `[Subject] :: [Kinetics] :: [Environment] :: [Lighting Rig] :: [Camera Optics] :: [Camera Support] :: [Seedance Parameters]`
   Host shots use:
   `Brunette woman with wavy shoulder-length hair, dark green blazer, cream top, small gold earrings, seated at a light oak desk :: {KINETICS} :: modern home office, Canadian flag softly out of focus behind her left shoulder, bookshelf, green plant :: soft key light camera-left through a large softbox, gentle warm fill, subtle hair light :: 50mm lens, f/2.0, shallow depth of field :: {CAMERA} :: --ar 16:9 --duration 15s --motion-blur natural --shutter-angle 180`
   Story hero shots: use the episode's illustrated panel as the first frame (image-to-video) and replace Subject/Environment with the panel description; keep "illustrated, editorial, not photoreal".
8. **Captions:** burn in from word timestamps, 2 lines max, 32 characters per line max.
9. **On-screen text, rule cards and source tags** exactly as written in Part B.
10. **Mix and render:** VO −14 LUFS, music bed ducked −8 dB under VO, render H.264 High, CRF 18, preset veryfast for drafts and slow only for the final export, AAC 320 kbps.
11. **Thumbnail:** GPT Image 2, 1280×720: the host (expression given per episode) on the left 40%, a big English text (3–4 words, given per episode) on the right, one red or green number badge. "Pain/before" concept.
12. **Upload pack:** write `upload.txt` with title, description (with disclaimer + sources), chapters (from block start times), 10 tags, and the altered-content flag reminder.
13. **QA before export:** re-read every on-screen number against Part B; check that the disclaimer and end card are present; check that no brand names appear; play the first 30 s and the calc section.

---

# PART B — THE 12 EPISODES

> VO length (words): Ep01 1,140 · Ep02 810 · Ep03 809 · Ep04 677 · Ep05 863 · Ep06 590 · Ep07 665 · Ep08 646 · Ep09 749 · Ep10 683 · Ep11 713 · Ep12 1,013.
> Pace: ElevenLabs speed 0.90–0.95 (≈130 words/min, calm storytelling). Speech alone = 4:30–8:45.
> To reach 7:00+: add a 2–3 s music "breath" between story panels, hold every calculation result 4 s, hold every step card 4 s, and give the takeaway bullets 3 s each. Ep06, Ep07, Ep08 and Ep10 may still land around 6:30–7:00 — that is acceptable; never pad with new claims.
> `[S##]` marks where each scene starts in the VO. CHARACTER = the episode's illustrated person.

---

## EPISODE 01 — "$9,800 a Month and Still Not Getting Ahead"
- **Title:** She Makes $9,800 a Month… Here's the Tax Trap Coming in 2027
- **Thumbnail:** host = shock; text `$1,000 A WEEK… TRAP?`; red badge `1% / MONTH`
- **CHARACTER:** Maya, 27, woman with dark straight hair in a low ponytail, oversized beige cardigan, phone in hand; city apartment in Mississauga shared with roommates.
- **Comment question:** "If you had $5,000 left every month, where would the first dollar go — FHSA, RRSP or TFSA?"
- **Calc layouts:** L3 Timeline (TFSA room), L1 Ledger (RRSP refund)

**Scenes**
| ID | Block | Image prompt (append to global style + character ref) | Motion | On-screen text | Source tag |
|---|---|---|---|---|---|
| S01 | Hook | Host at desk, shock expression | SEEDANCE host: kinetics "leans slightly toward camera, eyebrows raise, then a small exhale"; camera "slow push-in on locked-off tripod head" | `$1,000 every week` → `= a penalty waiting` | — |
| S02 | Disclaimer | Host explaining | push-in | disclaimer lower-third (A2) | — |
| S03 | Story | Maya walking out of an office tower at dusk, then a second shot of her at a café counter with a laptop — "two jobs" | parallax | `Job #1 + Job #2` | — |
| S04 | Story | Maya looking at a banking app showing a big green deposit | push-in | `Take-home: $9,800 / month` | — |
| S05 | Story | Kitchen table, receipts from restaurants and shopping bags piling up | parallax | `Goal: $4,500 / month` `Reality: more` | — |
| S06 | Story | Maya setting an automatic transfer on her phone, calendar with Mondays circled | push-in | `$1,000 → TFSA every Monday` | — |
| S07 | Turn | Calendar flipping to 2027, a red warning icon on the phone | SEEDANCE story hero: kinetics "calendar pages flip, red alert pulses once" ; camera "slow dolly-in" | `When does the room run out?` | — |
| S08 | Rules | Rule card | card slide | `TFSA limit 2026: $7,000` `Unused room carries forward` | Source: canada.ca — TFSA contribution room |
| S09 | Rules | Rule card | card slide | `Over the limit = 1% per month on the highest excess` | Source: canada.ca — If you owe tax on excess TFSA amounts |
| S10 | Numbers | L3 Timeline 2017→2026, coins per year | timeline build | room per year → `$62,500` | Source: canada.ca — TFSA dollar limits |
| S11 | Numbers | L3 Timeline 2026→2027, room bar emptying, red dots after May | timeline build | `Excess by Dec 2027: $34,500` `Tax: ≈ $1,547` | Source: canada.ca — excess TFSA amounts |
| S12 | Rules | Two paycheques, one with a red question mark | push-in | `2 employers = each one thinks it's your only job` | Source: canada.ca — TD1 Personal Tax Credits Return |
| S13 | Fix | Step cards 1–5 | slide in | see steps | — |
| S14 | Numbers | L1 Ledger: RRSP $10,000 × 40% | ledger | `≈ $4,000 back` + illustrative-rate line | Source: canada.ca — RRSP deduction limit |
| S15 | Takeaways | Host thinking | push-in | 3 bullets | — |
| S16 | CTA | Host joy | SEEDANCE host: kinetics "smiles, small nod, gestures toward lower-right" ; camera "static, slight handheld breathing" | question + `@canadataxwizard` | — |

**VO**
[S01] She takes home nine thousand eight hundred dollars a month. She puts one thousand dollars into her TFSA every single week. Sounds like the most responsible person you know, right? Here's the problem: if she keeps doing exactly that, sometime in 2027 the CRA starts charging her one percent. Every month.
[S02] This story is based on a real situation a Canadian shared online. We changed the name and some numbers. This is general information, not tax advice. But by the end of this video, you'll know exactly what she should do — and what you'd do in her place.
[S03] Let's call her Maya. Maya is twenty-seven, she lives in Mississauga, and she works two good jobs. One during the day, one on the side. No kids, single, no car.
[S04] After tax, both jobs together put about nine thousand eight hundred dollars a month into her account. That's a great income at twenty-seven.
[S05] Her goal is simple: keep all her spending around four thousand five hundred a month. Rent is fifteen hundred because she has roommates. But every month she goes over. Eating out. Shopping. The little things that never feel big on the day you buy them.
[S06] So she did what a lot of smart people do. She opened a TFSA and set up an automatic transfer. One thousand dollars, every Monday. And honestly? That part is great. Paying yourself first is the single best habit in this whole story. But she told us she still feels like she's not using her income to its full potential. And she's right — just not for the reason she thinks.
[S07] Because a thousand a week is fifty-two thousand dollars a year. And a TFSA has a ceiling. So the real question isn't "how do I invest." It's: when does the room run out — and what happens the week after?
[S08] Here's what the rules say. For 2026, the TFSA dollar limit is seven thousand dollars. But room you never used doesn't disappear — it carries forward. Your total room is this year's limit, plus unused room from past years, plus anything you withdrew last year.
[S09] And if you go over? Any excess amount in your TFSA is taxed at one percent per month, calculated on the highest excess in your account that month. Not the average. The highest. Even if you take it out a few days later, that month still counts.
[S10] So let's do Maya's math. You start building TFSA room the year you turn eighteen, if you're a resident of Canada. Maya turned eighteen in 2017. Add up every limit from 2017 to 2026: five thousand five hundred, five thousand five hundred, then six thousand for four years, six thousand five hundred, and seven thousand for three years. Total: sixty-two thousand five hundred dollars of room — if she never contributed before this year.
[S11] In 2026 she puts in fifty-two thousand. That leaves ten thousand five hundred. On January first, 2027 she gets a new year of room. The 2027 limit is announced by the CRA, so for this example we'll use seven thousand. That's seventeen thousand five hundred of room for all of 2027. At four thousand three hundred and thirty-three a month — that's her thousand a week — she fills it by the end of April. In May she's over. If nobody notices until December, the excess climbs to thirty-four thousand five hundred dollars. One percent of the highest excess, each month from May to December, adds up to about one thousand five hundred and forty-seven dollars. Paid on money that was supposed to be tax-free. And here's the sneaky part: the TFSA room you see in CRA My Account is calculated as of January first. It doesn't know what you've put in since. Your bank doesn't track your total room across institutions either. Only you can.
[S12] There's a second trap, and it's sitting on her paycheques. When you start a job, you fill out a TD1 form. Each employer withholds tax as if that job is your only income. If you claim your personal tax credits with both employers, both of them under-withhold. The CRA says it plainly: you can't claim tax credits on more than one TD1 if your total income is more than the credits you're claiming — or you can end up with a large, unexpected amount owing. Two good jobs, two employers, one surprise bill in April.
[S13] So here's the fix, step by step. Step one: check the TD1 at the second job. Tick the box that says you have more than one employer, claim zero there, or ask that employer to deduct extra tax each pay. Step two: before the next Monday transfer, log in to CRA My Account, write down your room as of January first, and keep your own log of every deposit this year. Step three: if Maya wants to buy a home one day, open a First Home Savings Account. It has an eight-thousand-dollar annual limit and the contribution is deductible — like an RRSP — and the withdrawal for a qualifying first home is tax-free. Room only starts once the account is open. Step four: at her income, look hard at the RRSP. Your new RRSP room each year is eighteen percent of last year's earned income, up to thirty-three thousand eight hundred and ten dollars for 2026. Step five: once the TFSA, FHSA and RRSP are handled, anything left goes to a regular investment account — just know that growth there is taxable, and you'll get tax slips for it.
[S14] Let's see why step four matters. Say Maya moves ten thousand dollars of her savings from the TFSA plan into her RRSP instead. An RRSP contribution reduces her taxable income. At an illustrative forty percent marginal rate, that's roughly four thousand dollars back. Same ten thousand saved — but four thousand of it came from the CRA. Your real rate depends on your income and your province, so check yours before you decide.
[S15] So what can you steal from Maya's story? One: automatic saving is a superpower — keep it. Two: the TFSA has a ceiling, and only you are tracking how close you are. Three: two jobs means two TD1 forms — fix the second one before April fixes it for you. And about the spending — the cleanest trick is the one she already uses: move the money on payday, and live on what's left.
[S16] Now I want to hear from you. If you had five thousand dollars left over every month, where would the first dollar go — FHSA, RRSP or TFSA? Tell me in the comments. And if you want help with your own situation, find me on Instagram at canadataxwizard. See you next week.

**Upload description (first lines):** Based on a real situation a Canadian shared online — names and numbers changed. General information, not tax advice. Rules: TFSA limit 2026 $7,000; excess taxed 1%/month on the highest excess; TD1 with more than one employer; RRSP limit 2026 18% up to $33,810; FHSA $8,000/year.

---

## EPISODE 02 — "The Tax Preparer Made the Mistake. She Got the Bill."
- **Title:** Her Tax Preparer Made One Mistake — Now She Owes $20,000
- **Thumbnail:** host = shock; text `NOT MY MISTAKE!`; red badge `$20,000`
- **CHARACTER:** Dr. Lena, 31, postdoctoral researcher, curly auburn hair, glasses, navy sweater; university lab and small apartment in Montreal-style brick building (city not named on screen).
- **Comment question:** "Has a tax preparer ever made a mistake on your return? What did you do?"
- **Calc layouts:** L2 Bars, L4 Split-screen

**Scenes**
| ID | Block | Image prompt | Motion | On-screen text | Source tag |
|---|---|---|---|---|---|
| S01 | Hook | Host shock | SEEDANCE host: kinetics "reads a letter, looks up at camera in disbelief"; camera "slow push-in" | `$20,000` `Not her mistake` | — |
| S02 | Disclaimer | Host explaining | push-in | disclaimer | — |
| S03 | Story | Lena in a lab coat at a microscope, proud | parallax | `Postdoc fellowship` | — |
| S04 | Story | A T4A slip on a desk, box highlighted | push-in | `T4A slip` | — |
| S05 | Story | Lena handing a folder to a tax preparer at a storefront office desk (no logos) | parallax | `"We'll take care of it."` | — |
| S06 | Story | Two refund notifications on a phone, Lena smiling | push-in | `2 years of refunds` | — |
| S07 | Turn | Envelope with "Notice of Reassessment" on a doormat | SEEDANCE story hero: kinetics "envelope slides under the door, settles"; camera "low angle, slow tilt down" | `Notice of Reassessment` | — |
| S08 | Rules | Rule card | slide | `Postdoctoral fellowships: taxable, no scholarship exemption` | Source: canada.ca — Line 13010 Scholarships, fellowships, bursaries |
| S09 | Rules | Rule card | slide | `Interest compounds daily at the CRA prescribed rate` | Source: canada.ca — Interest rates for the calendar quarter |
| S10 | Numbers | L2 Bars: Year 1 tax, Year 2 tax, interest | bars grow | `$9,100 + $8,600 + interest ≈ $20,000` | — |
| S11 | Rules | Rule card | slide | `Your return = your responsibility` | Source: canada.ca — Choosing a tax preparer |
| S12 | Fix | Step cards 1–5 | slide | steps | Source: canada.ca — Taxpayer relief (RC4288); Notice of objection |
| S13 | Numbers | L4 Split: ignore vs act | count-up | `Ignore: interest keeps compounding` vs `Act: stop the clock` | — |
| S14 | Takeaways | Host thinking | push-in | 3 bullets | — |
| S15 | CTA | Host joy | SEEDANCE host CTA (as Ep01) | question + `@canadataxwizard` | — |

**VO**
[S01] She did everything right. She hired a professional, she signed where she was told, she got her refund. Two years later, a letter from the CRA said she owed almost twenty thousand dollars. And the mistake wasn't even hers.
[S02] This is based on a real situation a Canadian shared online. Names and numbers are changed, and this is general information, not tax advice. Stay to the end, because the order you do things in after a letter like this matters more than anything else.
[S03] Let's call her Lena. Lena is thirty-one, she has a PhD, and she landed a postdoctoral fellowship at a university. Good research, a modest income, finally some stability.
[S04] Her fellowship was paid on a T4A slip — not a T4 like a regular salary. The T4A is the slip used for things like scholarships, fellowships, bursaries and research grants.
[S05] Lena didn't want to mess anything up, so she paid a tax preparer. She handed over her slips, and the preparer said: we'll take care of it.
[S06] And the first year, she got a refund. The second year, a refund again. Everything looked perfect.
[S07] Then the envelope. Notice of Reassessment. For both years. The CRA said her fellowship income should have been taxed, and it wasn't. The preparer had treated it as if it were an exempt scholarship.
[S08] Here's the rule. In Canada, scholarships and fellowships for students in a qualifying program can be exempt. But a postdoctoral fellowship is not a student award for this purpose. The CRA treats postdoctoral fellowship income as taxable, and it doesn't qualify for the scholarship exemption. So the amount was always taxable. The question was only when someone would notice.
[S09] And when the CRA reassesses, it doesn't just send the tax. Interest on unpaid tax is compounded daily, at a prescribed rate the CRA sets every quarter. Interest runs from the original due date of each return. So a mistake from two years ago comes with two years of interest attached.
[S10] In our version of the story: the extra tax for year one is nine thousand one hundred dollars. For year two, eight thousand six hundred. Together that's seventeen thousand seven hundred — and with daily compounding interest, the balance is now close to twenty thousand. The bigger the gap between the mistake and the letter, the bigger that last bar gets.
[S11] Now the painful part. The CRA is very clear that even when you use a preparer, you are responsible for the information on your return. The preparer's error doesn't move the tax onto the preparer. The tax itself was always Lena's. What she can fight for is everything around it.
[S12] So here's the plan, in order. Step one: don't ignore it, and don't panic-pay with a credit card. Read the reassessment line by line and compare it to your T4A slips. Make sure the numbers match — sometimes the CRA is right, sometimes it isn't. Step two: check your deadline to object. If you disagree, you can file a notice of objection. For individuals, the deadline is generally the later of ninety days after the date on the notice, or one year after the filing due date for that return. Step three: call your preparer and ask for their accuracy guarantee in writing. Many preparers cover interest and penalties caused by their own error — not the tax itself. Read exactly what yours promises. Step four: ask the CRA for taxpayer relief on the interest. It's form RC4288. Relief is discretionary — the CRA looks at things like financial hardship, extraordinary circumstances, or delays caused by the CRA. You can ask for years within the last ten calendar years. Write a clear, honest letter with documents. Step five: set up a payment arrangement for the tax. Paying something now stops interest from growing on that part.
[S13] Look at the difference. If Lena waits, interest keeps compounding every single day while she "thinks about it." If she acts this month — pays what she can, files for relief, gets the preparer's guarantee — she freezes most of the damage. Same mistake. Very different ending.
[S14] What can you steal from Lena's story? One: a refund doesn't mean your return is right. It just means the CRA hasn't looked yet. Two: if you get a T4A, ask your preparer one question — "is this taxable, and why?" — and ask them to point to the rule. Three: when the letter comes, deadlines start immediately. Open it the day it arrives.
[S15] Has a tax preparer ever made a mistake on your return? What did you do about it? Tell me in the comments — someone reading needs your answer. And if you want help with your own situation, I'm on Instagram at canadataxwizard. See you next week.

**Verify before publishing:** exact CRA wording that postdoctoral fellowships don't qualify for the scholarship exemption (canada.ca line 13010 page); current objection deadline wording; RC4288 grounds.

---

## EPISODE 03 — "$83,000 of Debt and a Family of Four"
- **Title:** $83,000 in Debt With Two Kids — The Legal Way Out Most People Never Hear About
- **Thumbnail:** host = thinking; text `$83K DEBT. NOW WHAT?`; red badge `$921/mo interest`
- **CHARACTER:** Dave, 41, stocky build, short beard, flannel shirt, tired eyes; suburban townhouse, two kids' drawings on the fridge.
- **Comment question:** "What's the one money mistake you'd warn your younger self about?"
- **Calc layouts:** L1 Ledger (budget), L2 Bars (interest), L4 Split (proposal)

**Scenes**
| ID | Block | Image prompt | Motion | On-screen text | Source tag |
|---|---|---|---|---|---|
| S01 | Hook | Host thinking | SEEDANCE host: kinetics "looks down at notes, then up, serious"; camera "slow push-in" | `$921 a month. Just interest.` | — |
| S02 | Disclaimer | Host explaining | push-in | disclaimer | — |
| S03 | Story | Dave at a kitchen table at night, bills spread, kids' backpacks by the door | parallax | `Dave, 41, 2 kids` | — |
| S04 | Story | Three cards floating: credit card, line of credit, car key | push-in | `Cards $31,000 · LOC $27,000 · Car $25,000` | — |
| S05 | Story | Dave transferring money between apps, sweating | parallax | `Pay one card with another` | — |
| S06 | Turn | Dave looking at a calculator showing a negative number | SEEDANCE story hero: kinetics "calculator display flickers to a red minus"; camera "slow dolly-in to the calculator" | `−$250 every month` | — |
| S07 | Numbers | L1 Ledger budget | ledger | rows below | — |
| S08 | Numbers | L2 Bars interest per debt | bars | `$542 + $214 + $165 = $921` | — |
| S09 | Rules | Rule card | slide | `Only a Licensed Insolvency Trustee can file a consumer proposal` | Source: ised-isde.canada.ca — Office of the Superintendent of Bankruptcy |
| S10 | Rules | Rule card | slide | `Consumer proposal: debts up to $250,000 (not counting your home mortgage)` | Source: OSB — Consumer proposals |
| S11 | Rules | Rule card | slide | `Cashing out an RRSP = taxed + withholding + room lost` | Source: canada.ca — Withdrawing from RRSPs |
| S12 | Numbers | L4 Split: now vs proposal | count-up | `$1,450/mo minimums` vs `$338 + car` | — |
| S13 | Fix | Step cards 1–5 | slide | steps | — |
| S14 | Takeaways | Host thinking | push-in | 3 bullets | — |
| S15 | CTA | Host joy | SEEDANCE host CTA | question + handle | — |

**Ledger (S07):** Take-home $5,400 · Rent, food, kids, utilities, insurance $4,200 · Minimum debt payments $1,450 · **Result −$250/month**
**Interest (S08):** Credit cards $31,000 × 20.99% ÷ 12 = $542 · Line of credit $27,000 × 9.5% ÷ 12 = $214 · Car loan $25,000 × 7.9% ÷ 12 = $165 · **≈ $921/month** (story rates; show "example rates").
**Split (S12):** Unsecured debt in proposal = cards + LOC = $58,000. Example offer accepted by creditors: 35% = $20,300 over 60 months = **$338/month** (trustee fees are paid from this amount). Car loan is secured and normally keeps being paid as usual. Show "Example only — the % is negotiated by the trustee."

**VO**
[S01] Nine hundred and twenty-one dollars a month. That's how much Dave pays just in interest. Not to lower his debt — just to stand still. And every month, he's still two hundred and fifty dollars short.
[S02] This is based on a real situation a Canadian shared online. We changed names and numbers. It's general information, not financial or legal advice. But there's a legal way out here that a lot of families never hear about, and I'll show you exactly how it works.
[S03] Meet Dave. He's forty-one, two kids, a steady job. Nobody would look at Dave and think he's drowning.
[S04] But he owes eighty-three thousand dollars. Thirty-one thousand on credit cards. Twenty-seven thousand on a line of credit. And twenty-five thousand left on the car.
[S05] It didn't happen in one day. A job gap, then a renovation, then a year where groceries cost more than anyone planned. For a while he paid one card with another. Then minimum payments became the whole plan.
[S06] One night he finally wrote it all down. And the calculator showed a minus.
[S07] Here's Dave's month. Fifty-four hundred comes in after tax. Rent, food, kids, utilities and insurance take forty-two hundred. Minimum payments on all his debts: fourteen hundred and fifty. That's two hundred and fifty dollars short. Every month. Which goes… on a credit card.
[S08] Now the interest. The cards at about twenty-one percent cost five hundred and forty-two dollars a month. The line of credit at nine and a half percent, two hundred and fourteen. The car at seven point nine, one sixty-five. That's around nine hundred and twenty-one dollars a month that buys him absolutely nothing.
[S09] So what are the real options? Not the ads on the radio — the legal ones. In Canada, only a Licensed Insolvency Trustee can administer a consumer proposal or a bankruptcy. They're licensed and supervised by the federal Office of the Superintendent of Bankruptcy. The first meeting is typically free, and they have to explain all your options — including ones that aren't a proposal.
[S10] A consumer proposal is a legal offer to your creditors to repay a part of what you owe, over up to five years. It's available if your total debts, not counting the mortgage on your home, are two hundred and fifty thousand dollars or less. Once it's filed, most collection actions stop, and interest on the debts included stops growing. You keep your stuff. You make one payment.
[S11] And before anyone says "just cash out the RRSP" — careful. An RRSP withdrawal is added to your income and taxed. The bank also withholds tax up front. And the contribution room you used is gone for good. For a lot of families, that's paying a twenty-one percent debt with a forty percent tax bill.
[S12] Let's run Dave's example. His unsecured debt — cards and line of credit — is fifty-eight thousand. Say the trustee negotiates an offer creditors accept at thirty-five percent. That's twenty thousand three hundred dollars over sixty months: about three hundred and thirty-eight a month, with the trustee's fees paid out of that. The car loan is secured, so he usually keeps paying it as normal. Instead of fourteen hundred and fifty in minimums, he's at three thirty-eight plus the car. The minus becomes a plus. This is an example only — the real percentage depends on Dave's income, assets, and what creditors accept.
[S13] Here's the plan. Step one: write the full list — every debt, balance, rate, minimum. No guessing. Step two: book a free consultation with a Licensed Insolvency Trustee. Check the licence on the Office of the Superintendent of Bankruptcy's website. Ignore anyone who isn't licensed and charges upfront fees to "fix your debt." Step three: ask the trustee to compare all options side by side: a budget with a consolidation loan, a consumer proposal, and bankruptcy. Step four: ask exactly how it affects your credit report and for how long in your province. A proposal is a serious step. It's still often better than years of minimums. Step five: before you touch your RRSP or TFSA, ask the trustee how those accounts are treated in your situation. Don't withdraw first and ask later.
[S14] What can you steal from Dave's story? One: write down your interest per month, not just the balance. That number is the real enemy. Two: if minimum payments are bigger than your monthly gap, it's not a budgeting problem anymore — it's a structure problem. Three: the free consultation with a licensed trustee is the most underrated meeting in personal finance.
[S15] What's the one money mistake you'd warn your younger self about? Drop it in the comments. And if you want help looking at your own numbers, I'm on Instagram at canadataxwizard. See you next week.

**Verify before publishing:** OSB pages for the $250,000 limit (excluding principal-residence mortgage), 5-year maximum, stay of proceedings; RRSP withholding rates on canada.ca.

---

## EPISODE 04 — "She Waited Until She Had Money. That Cost Her $8,000 of Room."
- **Title:** Why She Should Have Opened an Empty FHSA a Year Ago
- **Thumbnail:** host = explaining; text `OPEN IT WITH $0?`; green badge `$8,000/yr`
- **CHARACTER:** Priya, 29, long black hair in a braid, mustard sweater, renting a small Calgary apartment, house listings on her laptop.
- **Comment question:** "Did you open an FHSA yet — and if not, what's stopping you?"
- **Calc layouts:** L3 Timeline (room), L1 Ledger (deductions)

**Scenes**
| ID | Block | Image prompt | Motion | On-screen text | Source tag |
|---|---|---|---|---|---|
| S01 | Hook | Host explaining | SEEDANCE host: kinetics "holds up an empty envelope, shrugs, smiles"; camera "slow push-in" | `An empty account worth $8,000` | — |
| S02 | Disclaimer | Host | push-in | disclaimer | — |
| S03 | Story | Priya scrolling house listings, sticky note "3 years" | parallax | `Goal: first home in 3 years` | — |
| S04 | Story | Priya saying "later" to a phone notification | push-in | `"I'll open it when I have money"` | — |
| S05 | Turn | Calendar 2025 page torn away, coins falling off the edge | SEEDANCE story hero: kinetics "page tears off, coins drift down and fade"; camera "static, slight tilt" | `2025 room: never created` | — |
| S06 | Rules | Rule card | slide | `FHSA: $8,000 per year · $40,000 lifetime` | Source: canada.ca — First Home Savings Account |
| S07 | Rules | Rule card | slide | `Room starts the year you OPEN the account` `Carry forward max $8,000` | Source: canada.ca — FHSA participation room |
| S08 | Rules | Rule card | slide | `Contributions deductible · qualifying withdrawal tax-free` | Source: canada.ca — FHSA |
| S09 | Numbers | L3 Timeline: open 2025 vs open 2026 | timeline | `$32,000 vs $24,000 by 2028` | — |
| S10 | Numbers | L1 Ledger: deduction value | ledger | `$24,000 × 30% = $7,200` + illustrative-rate line | — |
| S11 | Rules | Rule card | slide | `Can also use RRSP Home Buyers' Plan: up to $60,000` | Source: canada.ca — Home Buyers' Plan |
| S12 | Fix | Steps 1–5 | slide | steps | — |
| S13 | Takeaways | Host thinking | push-in | bullets | — |
| S14 | CTA | Host joy | SEEDANCE host CTA | question + handle | — |

**Timeline (S09):** Opened Jan 2025: room 2025 $8,000 + 2026 $8,000 + 2027 $8,000 + 2028 $8,000 = **$32,000 by 2028**. Opened 2026: 2026–2028 = **$24,000**. Difference **$8,000**.
**Ledger (S10):** $8,000 × 3 years = $24,000 contributed · illustrative 30% marginal rate · ≈ **$7,200** of tax savings (spread over the years she deducts).

**VO**
[S01] Opening an account with zero dollars in it can be worth eight thousand dollars. Sounds backwards, right? Priya waited a year because she "didn't have the money yet." And that wait quietly cost her eight thousand dollars of tax-free room she can never get back.
[S02] This is based on a real situation a Canadian shared online. Names and numbers are changed. General information, not tax advice. Stay with me, because this is the easiest fix in the whole series.
[S03] Priya is twenty-nine. She rents in Calgary. And she has one big goal: buy her first home in about three years.
[S04] She'd heard about the First Home Savings Account — the FHSA. But her thinking was: "I'll open it when I actually have money to put in." Totally reasonable. And totally wrong for this account.
[S05] Because with an FHSA, the year you don't open it is a year that simply doesn't exist.
[S06] Here's how it works. The FHSA lets you contribute up to eight thousand dollars a year, with a lifetime limit of forty thousand.
[S07] But the key rule is this: you only start building FHSA room in the year you open the account. Not the year you turn eighteen like a TFSA. The year you open it. And if you don't use your room, you can carry forward a maximum of eight thousand dollars to the next year. So the most you could ever put in, in a single year, is sixteen thousand.
[S08] And it's a double win. What you contribute is deductible, like an RRSP — it lowers your taxable income. And when you take it out to buy a qualifying first home, the withdrawal is tax-free, like a TFSA. Deductible going in, tax-free coming out.
[S09] So let's compare two Priyas. Priya A opened an FHSA in January 2025 with nothing in it. By 2028, she has thirty-two thousand dollars of room. Priya B waited and opened it in 2026. By 2028 she has twenty-four thousand. Same person, same savings, same house. The only difference is one form filled out a year earlier: eight thousand dollars.
[S10] And it's not only about room. Say Priya puts in eight thousand a year for three years — twenty-four thousand. At an illustrative thirty percent marginal rate, those deductions are worth around seven thousand two hundred dollars in tax savings. One more smart detail: you don't have to claim the deduction in the same year you contribute. You can carry it forward to a year when your income — and your tax rate — is higher.
[S11] And if she wants even more for the down payment, the FHSA can be combined with the RRSP Home Buyers' Plan. That lets you withdraw up to sixty thousand dollars from your RRSP for a first home, as long as you repay it over time.
[S12] Here's the plan. Step one: open the FHSA now, even with zero dollars. That starts the clock. Step two: if you're a first-time home buyer, double-check you qualify — the CRA has a definition, and it's about whether you or your spouse lived in a home you owned recently. Step three: automate a monthly amount — eight thousand a year is about six hundred and sixty-seven a month. Step four: decide when to claim the deduction. Low income this year, higher next year? Consider carrying it forward. Step five: if plans change and you never buy, the money can be transferred to your RRSP without using your RRSP room — so it's rarely wasted.
[S13] What can you steal from Priya's story? One: some accounts reward you for opening early, even empty. The FHSA is one of them. Two: deductible today, tax-free at purchase — that combination is rare. Three: you choose when to use the deduction. Use it in your highest-income year.
[S14] Did you open an FHSA yet? And if not — what's stopping you? Tell me in the comments. For help with your own plan, I'm on Instagram at canadataxwizard. See you next week.

**Verify before publishing:** canada.ca FHSA pages for: room starts in year opened; $8,000 carry-forward cap; deduction carry-forward; transfer to RRSP without affecting RRSP room; definition of first-time home buyer; account maximum participation period (15 years).

---

## EPISODE 05 — "$90K Job + $55K Side Business = One Very Bad April"
- **Title:** He Earned $145K… Then the CRA Sent a Bill He Didn't See Coming
- **Thumbnail:** host = shock; text `SIDE HUSTLE SHOCK`; red badge `+GST he never charged`
- **CHARACTER:** Marcus, 38, tall, short fade haircut, work jacket over a hoodie, toolbox; wife Jen, 36, curly hair, ring light and camera at home. Alberta.
- **Comment question:** "Do you have a side hustle? Did anyone ever tell you about instalments?"
- **Calc layouts:** L2 Bars, L1 Ledger

**Scenes**
| ID | Block | Image prompt | Motion | On-screen text | Source tag |
|---|---|---|---|---|---|
| S01 | Hook | Host shock | SEEDANCE host: kinetics "glances at a tablet, winces, looks to camera"; camera "slow push-in" | `Two bills he didn't know existed` | — |
| S02 | Disclaimer | Host | push-in | disclaimer | — |
| S03 | Story | Marcus at a day job site in a safety vest | parallax | `Job: $90,000` | — |
| S04 | Story | Marcus doing weekend bathroom renovations | parallax | `Side business: $72,000 revenue · $55,000 profit` | — |
| S05 | Story | Jen filming content in their living room | push-in | `Jen: $12,000 from content` | — |
| S06 | Turn | Two envelopes on a table, one for tax, one for GST | SEEDANCE story hero: kinetics "second envelope slides in next to the first"; camera "slow dolly-in" | `Tax owing + GST` | — |
| S07 | Rules | Rule card | slide | `Instalments if net tax owing > $3,000 this year AND in either of the 2 previous years` | Source: canada.ca — Paying your income tax by instalments |
| S08 | Rules | Rule card | slide | `Self-employed: you pay both halves of CPP` | Source: canada.ca — CPP contributions for self-employed |
| S09 | Rules | Rule card | slide | `Over $30,000 of taxable sales in 4 quarters → must register for GST/HST` | Source: canada.ca — When to register for and start charging the GST/HST |
| S10 | Numbers | L1 Ledger GST | ledger | `$72,000 × 5% = $3,600` | — |
| S11 | Rules | Rule card | slide | `Paying your spouse: real work, reasonable pay, payroll` | Source: Income Tax Act s.67 (reasonableness) |
| S12 | Rules | Rule card | slide | `Borrowing isn't income — but interest is only deductible if you borrow to earn income` | Source: Income Tax Act s.20(1)(c) |
| S13 | Fix | Steps 1–5 | slide | steps | — |
| S14 | Numbers | L2 Bars: set-aside per month | bars | `30% of profit → $1,375/mo` (illustrative) | — |
| S15 | Takeaways + CTA | Host thinking → joy | push-in, SEEDANCE CTA | bullets, question, handle | — |

**VO**
[S01] Marcus made a hundred and forty-five thousand dollars last year. He was proud of it. Then he found out about two bills nobody had told him about. One for income tax he should have been paying all year. And one for a sales tax he never even charged his customers.
[S02] This story is based on a real situation a Canadian shared online. Names and numbers are changed. General information, not tax advice. If you have any income outside your paycheque, this one is for you.
[S03] Marcus is thirty-eight and lives in Alberta. His day job pays ninety thousand dollars. Tax comes off every paycheque, so he never thinks about it.
[S04] On weekends, he renovates bathrooms. Word of mouth exploded. Last year, his side business brought in seventy-two thousand dollars, and after materials and costs, fifty-five thousand dollars of profit.
[S05] His wife Jen stayed home with their kids and started making content. Last year that brought in about twelve thousand.
[S06] Then tax season. His job had withheld tax on the ninety thousand — but nobody withheld anything on the fifty-five. And then a second question from his accountant: "Did you register for GST?"
[S07] Let's start with income tax. When you're an employee, your employer pays your tax for you all year. When you're self-employed, nobody does. The CRA can require you to pay in instalments — quarterly payments during the year — if your net tax owing is more than three thousand dollars this year and in either of the two previous years. In Quebec, the threshold is eighteen hundred. If you were supposed to pay instalments and didn't, the CRA can charge instalment interest.
[S08] Second: CPP. As an employee, you pay half and your employer pays half. As a self-employed person, you pay both halves on your self-employment earnings — up to the yearly maximums. Because Marcus already contributes through his job, how much more he owes depends on how much room is left under those maximums. Tax software works it out.
[S09] Now the one that really hurts: GST. If your taxable sales go over thirty thousand dollars in a single calendar quarter, or over four consecutive calendar quarters, you're no longer a small supplier — you must register and start charging GST or HST. Marcus passed thirty thousand months ago. Revenue counts here — not profit.
[S10] In Alberta that's five percent GST. On seventy-two thousand dollars of revenue, that's three thousand six hundred dollars he should have collected from customers. He didn't. So now the question is whether that money comes out of his own pocket. Plus the income tax. Plus CPP.
[S11] And then the internet ideas start. "Pay your wife a salary to split income." Here's the rule: you can pay a family member, but the work has to be real, and the pay has to be reasonable for that work — the same as you'd pay a stranger. And it goes through payroll, with slips. Jen editing videos for the business for real, at a fair rate? Possible. Jen "on paper" doing nothing? That's the kind of thing the CRA disallows.
[S12] And "billionaires borrow against their assets instead of paying tax"? Borrowing money isn't income, true. But a loan doesn't make tax disappear — you still pay it back, with interest. And interest is generally deductible only when you borrow to earn income from a business or property. Borrowing to live on is just debt.
[S13] So here's the fix. Step one: register for a GST number now and talk to a professional about the period you should have been registered — fixing it voluntarily is far better than waiting. From now on, charge GST on every invoice. Step two: once you're registered, claim input tax credits — the GST you pay on materials and tools for the business comes back to you. Step three: open a separate business bank account and move a fixed percentage of every payment into a "tax" account the day it arrives. Step four: pay instalments. The CRA sends reminders based on your history, and paying them stops instalment interest. Step five: track real business expenses — tools, vehicle use with a log, phone, part of your home if you qualify — because every legitimate expense lowers the profit you're taxed on.
[S14] How much to set aside? Here's a simple illustration. Fifty-five thousand of profit a year is about forty-five hundred a month. Setting aside thirty percent of that — an illustrative rate — is about thirteen hundred and seventy-five a month into the tax account. Your real percentage depends on your income and province. But having a number is the difference between a plan and a panic.
[S15] What can you steal from Marcus? One: side income means you're the payroll department now. Two: GST is triggered by revenue, not profit — watch the thirty-thousand line every quarter. Three: income splitting is legal only when it's real. Do you have a side hustle? Did anyone ever tell you about instalments? Tell me in the comments. And for help with your own setup, I'm on Instagram at canadataxwizard. See you next week.

**Verify before publishing:** instalment thresholds ($3,000 / $1,800 Quebec) on canada.ca; s.67 and s.20(1)(c) wording; voluntary correction route for late GST registration.

---

## EPISODE 06 — "She Put Her Own Money Back. The CRA Charged Her For It."
- **Title:** She Withdrew From Her TFSA and Put It Back — Big Mistake
- **Thumbnail:** host = shock; text `PUT IT BACK = PENALTY?`; red badge `1%/month`
- **CHARACTER:** Olivia, 34, blonde bob, denim jacket, nurse badge on a lanyard; Halifax-style row house (city not named).
- **Comment question:** "Did you know about the January 1 rule before this video?"
- **Calc layouts:** L3 Timeline, L4 Split

**Scenes**
| ID | Block | Image prompt | Motion | On-screen text | Source tag |
|---|---|---|---|---|---|
| S01 | Hook | Host shock | SEEDANCE host: kinetics "shakes head slowly, half-smile of disbelief"; camera "slow push-in" | `Her own money. Penalty anyway.` | — |
| S02 | Disclaimer | Host | push-in | disclaimer | — |
| S03 | Story | Olivia, TFSA maxed, proud screenshot | parallax | `TFSA: maxed out` | — |
| S04 | Story | Olivia buying a used car in March | push-in | `March: withdraws $20,000` | — |
| S05 | Story | Olivia getting a bonus in September, happy | parallax | `September: puts $20,000 back` | — |
| S06 | Turn | Next spring, letter with "Excess TFSA amount" | SEEDANCE story hero: kinetics "letter unfolds, red figure circles itself"; camera "top-down, slow push" | `Excess amount` | — |
| S07 | Rules | Rule card | slide | `Withdrawals come back as room on January 1 of NEXT year` | Source: canada.ca — Withdrawing from a TFSA |
| S08 | Rules | Rule card | slide | `Excess: 1% per month on the highest excess in that month` | Source: canada.ca — Excess TFSA amounts |
| S09 | Numbers | L3 Timeline Sep–Dec, $200 red dot per month | timeline | `4 × $200 = $800` | — |
| S10 | Numbers | L4 Split: noticed in Oct vs Dec | count-up | `$400` vs `$800` | — |
| S11 | Rules | Rule card | slide | `File RC243 TFSA Return by June 30 of the next year` | Source: canada.ca — RC243 |
| S12 | Fix | Steps 1–5 | slide | steps | — |
| S13 | Takeaways + CTA | Host thinking → joy | push-in, SEEDANCE CTA | bullets, question, handle | — |

**VO**
[S01] She took her own money out of her own account. Six months later she put the same money back. And the CRA charged her for it. Not a scam, not a bank error. A rule most Canadians don't know.
[S02] This is based on a real situation a Canadian shared online. Names and numbers changed. General information, not tax advice. This is a short rule, but it costs people hundreds — sometimes thousands.
[S03] Olivia is thirty-four, a nurse, and she's disciplined. She'd maxed out her TFSA. Every dollar of room used.
[S04] In March, her car died. She withdrew twenty thousand dollars from her TFSA to buy a used one. Withdrawals from a TFSA are tax-free — no problem there.
[S05] In September she got a bonus. She thought: perfect, I'll put the twenty thousand back where it belongs. Responsible, right?
[S06] The next spring, a letter: excess TFSA amount.
[S07] Here's the rule. When you withdraw from a TFSA, that amount is added back to your contribution room — but not right away. It comes back on January first of the next calendar year. So if you have no other room, putting it back in the same year counts as an over-contribution. The CRA literally says: unless you have unused room, don't re-contribute in the same year you take it out.
[S08] And the cost: any excess amount is taxed at one percent per month, based on the highest excess in your account during that month. Even one day over counts as a full month.
[S09] Olivia's excess was twenty thousand dollars, from September to December. One percent of twenty thousand is two hundred dollars a month. Four months: eight hundred dollars. Then on January first, her withdrawal room came back and absorbed the excess.
[S10] If she'd noticed in October and pulled the excess out right away, she'd have paid for September and October only — four hundred dollars. Same mistake. Half the cost. Speed matters.
[S11] And there's paperwork. When you owe this tax, you have to file a TFSA return — form RC243 — and pay by June thirtieth of the following year. Missing that adds more penalties on top.
[S12] Here's the plan if this is you. Step one: the moment you realize it, withdraw the excess amount. That stops next month's charge. Step two: calculate it month by month — one percent of the highest excess in each month. Step three: file the RC243 and pay by June thirtieth. Step four: if it was an honest mistake and you fixed it quickly, you can write to the CRA and ask them to waive or cancel the tax. They consider whether it was a reasonable error and whether you removed it without delay. No guarantee — but it costs nothing to ask. Step five: from now on, keep your own TFSA log — deposits and withdrawals by date. Your bank only sees its own account, and CRA My Account shows room as of January first.
[S13] What can you steal from Olivia's story? One: TFSA withdrawals come back on January first, not the same day. Two: the penalty counts the highest balance in a month, so fix it fast. Three: if you need the money back in your TFSA soon, wait until January — or check that you truly have unused room. Did you know about the January first rule before this video? Tell me in the comments. For help with your own accounts, I'm on Instagram at canadataxwizard. See you next week.

**Verify before publishing:** RC243 due date (June 30) and the waiver request process on canada.ca.

---

## EPISODE 07 — "Grandma Gave Him $15,000 in Cash. His Plan Was the Worst Part."
- **Title:** He Tried to Hide a $15,000 Cash Gift From the Bank — Here's Why That Backfires
- **Thumbnail:** host = thinking; text `SPLIT THE DEPOSIT?`; red badge `$10,000 RULE`
- **CHARACTER:** Tomas, 26, lean, wavy dark hair, green bomber jacket; his grandmother, 80s, silver bun, knitted cardigan. Wedding invitation on a fridge.
- **Comment question:** "Has anyone ever given you a 'deposit it in pieces' tip? What did they say?"
- **Calc layouts:** L3 Timeline (24-hour window), L2 Bars (illustrative growth)

**Scenes**
| ID | Block | Image prompt | Motion | On-screen text | Source tag |
|---|---|---|---|---|---|
| S01 | Hook | Host thinking | SEEDANCE host: kinetics "taps two fingers on the desk, raises an eyebrow"; camera "slow push-in" | `$9,000 + $6,000 ≠ invisible` | — |
| S02 | Disclaimer | Host | push-in | disclaimer | — |
| S03 | Story | Grandmother handing Tomas a thick envelope at her kitchen table, warm light | parallax | `Wedding gift: $15,000 cash` | — |
| S04 | Story | Friend at a bar whispering advice | push-in | `"Keep it under $10K"` | — |
| S05 | Story | Tomas writing a plan: Monday $9,000, Monday afternoon $6,000 | parallax | `The plan` | — |
| S06 | Turn | Bank teller looking up from a screen, polite but serious | SEEDANCE story hero: kinetics "teller glances at screen, then at Tomas"; camera "over-the-shoulder, slow push" | `Flagged` | — |
| S07 | Rules | Rule card | slide | `Banks report cash of $10,000+ in one transaction` | Source: fintrac-canafe.canada.ca — Large Cash Transaction Reports |
| S08 | Rules | Rule card | slide | `24-hour rule: 2+ cash amounts totalling $10,000+ within 24 hours = one report` | Source: FINTRAC — The 24-hour rule |
| S09 | Numbers | L3 Timeline: Mon 10:00 $9,000 + Mon 16:00 $6,000 | timeline | `= $15,000 in 24h → reported anyway` | — |
| S10 | Rules | Rule card | slide | `Suspicious transaction reports have no minimum amount` | Source: FINTRAC — Reporting suspicious transactions |
| S11 | Rules | Rule card | slide | `A genuine gift to you is generally not taxable income in Canada` | Source: canada.ca (see verify list) |
| S12 | Fix | Steps 1–5 | slide | steps | — |
| S13 | Numbers | L2 Bars: $15,000 at illustrative 5%/yr for 30 years | bars | `≈ $64,800` + "illustrative return, not a promise" | — |
| S14 | Takeaways + CTA | Host → joy | push-in, SEEDANCE CTA | bullets, question, handle | — |

**Calc (S13):** 15,000 × 1.05^30 = 15,000 × 4.3219 = **$64,829** → show "≈ $64,800". Label: "Illustrative 5% yearly growth. Investments can lose value."

**VO**
[S01] Nine thousand on Monday morning. Six thousand on Monday afternoon. Tomas thought he'd found a way to deposit fifteen thousand dollars without "the government" noticing. Actually, he'd found the fastest way to get noticed.
[S02] This is based on a real situation a Canadian shared online. Names and numbers changed. General information, not legal or tax advice. And spoiler: there was never anything to hide.
[S03] Tomas is twenty-six and getting married. His grandmother, who never trusted banks, saved cash for years. At dinner she handed him an envelope: fifteen thousand dollars. For the wedding, for the future.
[S04] Then a friend gave him "advice." "Don't deposit more than ten thousand at once. The bank reports it to the government. Split it up."
[S05] So Tomas made a plan. Nine thousand at one branch in the morning. Six thousand at another branch in the afternoon. Clean, quiet, invisible. Or so he thought.
[S06] Let's see what actually happens.
[S07] In Canada, banks and other reporting entities must send a Large Cash Transaction Report to FINTRAC — Canada's financial intelligence agency — when they receive ten thousand dollars or more in cash in a single transaction.
[S08] But there's also the twenty-four-hour rule. If they receive two or more cash amounts that add up to ten thousand dollars or more within a twenty-four-hour window, from the same person, they treat it as one and report it. And this applies even when the deposits happen at different locations of the same bank.
[S09] So Tomas's plan: nine thousand at ten a.m., six thousand at four p.m. That's fifteen thousand within twenty-four hours. Reported anyway. The split did nothing.
[S10] And here's what makes it worse. Banks also file suspicious transaction reports — and those have no minimum amount. Breaking cash into smaller pieces to avoid the ten-thousand-dollar report is a classic pattern banks are trained to look for. So "nine thousand Monday, sixty-five hundred Wednesday" doesn't solve it either. It can turn a completely normal gift into a file that looks like someone hiding something.
[S11] And the irony? Tomas had nothing to hide. In Canada, a genuine gift you receive is generally not taxable income for you. There's no gift tax on the person receiving it. A report to FINTRAC isn't a tax bill, and it isn't an accusation. It's paperwork.
[S12] So here's the right way. Step one: deposit the whole amount at once, at one branch. Step two: when the teller asks where the cash came from, tell the truth: "A wedding gift from my grandmother." Step three: bring a short signed note from your grandmother saying it's a gift, with the amount and the date. Simple, and it answers questions before they're asked. Step four: once it's in, think about where it lives. If Tomas has TFSA room, the growth there is tax-free. Step five: if the gift is part of a bigger family situation — like a parent giving property, shares or crypto instead of cash — that's different. Gifting property can create tax for the person giving it. We'll cover that in another episode.
[S13] And look what fifteen thousand can become if it's put to work instead of hidden. At an illustrative five percent a year for thirty years, it grows to about sixty-four thousand eight hundred dollars. That's not a promise — investments go up and down — but it shows the cost of leaving it in an envelope or making it look suspicious.
[S14] What can you steal from Tomas's story? One: ten thousand dollars or more in cash gets reported — in one go or in pieces within twenty-four hours. Two: splitting deposits to avoid a report is exactly what looks suspicious. Three: honest paperwork makes a normal gift look normal. Has anyone ever given you a "deposit it in pieces" tip? What did they say? Tell me in the comments. For help with your own situation, I'm on Instagram at canadataxwizard. See you next week.

**Verify before publishing:** canada.ca or CRA source stating gifts received by an individual are generally not taxable (and no gift tax); FINTRAC suspicious transaction reporting page ("no threshold").

---

## EPISODE 08 — "One Brand Deal Pushed Her Over the Line"
- **Title:** One $34,000 Brand Deal… and Now She Owes HST She Never Charged
- **Thumbnail:** host = shock; text `CREATORS: READ THIS`; red badge `$30,000 LINE`
- **CHARACTER:** Zoe, 24, pink-tinted hair in space buns, oversized hoodie, ring light, phone on tripod; Toronto apartment.
- **Comment question:** "Creators: do you charge HST on brand deals? Be honest."
- **Calc layouts:** L1 Ledger, L4 Split

**Scenes**
| ID | Block | Image prompt | Motion | On-screen text | Source tag |
|---|---|---|---|---|---|
| S01 | Hook | Host shock | SEEDANCE host: kinetics "scrolls phone, stops, eyes widen"; camera "slow push-in" | `$34,000 deal` `−$4,420?` | — |
| S02 | Disclaimer | Host | push-in | disclaimer | — |
| S03 | Story | Zoe filming in her apartment, small views counter | parallax | `Side gig → career` | — |
| S04 | Story | Email "Campaign approved" glowing on laptop | push-in | `Q2: $34,000 campaign` | — |
| S05 | Turn | Zoe on a call with the brand's finance team, confused | SEEDANCE story hero: kinetics "she pauses mid-sentence, slowly lowers phone"; camera "slow dolly-in" | `"What's your HST number?"` | — |
| S06 | Rules | Rule card | slide | `Over $30,000 in ONE quarter → charge HST on that sale, register within 29 days` | Source: canada.ca — When to register for and start charging the GST/HST |
| S07 | Rules | Rule card | slide | `Or over $30,000 across 4 consecutive quarters` | same |
| S08 | Numbers | L1 Ledger | ledger | `$34,000 × 13% = $4,420` | — |
| S09 | Rules | Rule card | slide | `Once registered: claim back HST paid on business costs (ITCs)` | Source: canada.ca — Input tax credits |
| S10 | Numbers | L4 Split: gear HST recovered | count-up | `$6,000 gear × 13% = $780 back` | — |
| S11 | Rules | Rule card | slide | `Free products in exchange for content can be income` | Source: canada.ca (see verify list) |
| S12 | Fix | Steps 1–5 | slide | steps | — |
| S13 | Takeaways + CTA | Host → joy | SEEDANCE CTA | bullets, question, handle | — |

**VO**
[S01] Thirty-four thousand dollars. One brand deal. Zoe's biggest win ever. And then the brand's finance team asked one question: "What's your HST number?" She didn't have one. And that one question was worth four thousand four hundred and twenty dollars.
[S02] This is based on a real situation a Canadian shared online. Names and numbers changed. General information, not tax advice. If you earn any money from content — this is the episode to send to your friends.
[S03] Zoe is twenty-four, lives in Toronto, and started posting videos for fun. A few hundred dollars here, a gifted product there. Then the audience grew.
[S04] In the spring, a brand approved a campaign: thirty-four thousand dollars, paid within the same quarter. Her biggest deal by far.
[S05] She sent her invoice: thirty-four thousand, nothing else. Then the call. "What's your HST number? We need it to process the payment."
[S06] Here's the rule. In Canada you're a "small supplier" — not required to register for GST or HST — as long as your taxable sales stay at or under thirty thousand dollars. But if you go over thirty thousand in a single calendar quarter, you stop being a small supplier with that sale. You have to charge HST on the sale that pushed you over, and register within twenty-nine days.
[S07] And there's a second test: if you go over thirty thousand across four consecutive calendar quarters — even without one big quarter — you also have to register. It's a rolling window, not a January-to-December number. Revenue counts, not profit.
[S08] Zoe lives in Ontario, where HST is thirteen percent. On a thirty-four thousand dollar deal with a Canadian brand, that's four thousand four hundred and twenty dollars of HST she should have added on top. If she'd invoiced correctly, the brand pays it and usually claims it back as a business. If she doesn't fix it, that money can end up coming out of her own pocket.
[S09] Now the good news nobody tells creators. Once you're registered, you can claim input tax credits — the HST you paid on things you use for your business.
[S10] Say Zoe buys six thousand dollars of camera gear, lights and editing software for the business after she registers. Thirteen percent of that is seven hundred and eighty dollars she can claim back. Registration isn't only a cost — it also opens a door.
[S11] And one more thing about all those "gifted" products. When you get products or trips in exchange for posting content, that can be income, valued at what the product is worth. "It was free" doesn't automatically mean "it's not taxable."
[S12] Here's the plan. Step one: register for a GST/HST number now — online, through the CRA — and invoice the brand again correctly, with HST shown separately and your number on it. Step two: from now on, track your taxable sales every calendar quarter, and keep a running total of the last four quarters. Step three: keep receipts for every business expense — gear, software, part of your phone and internet — for income tax and for input tax credits. Step four: ask a professional how payments from brands or platforms outside Canada are treated. Some can be zero-rated, but zero-rated sales still count toward the thirty-thousand-dollar threshold. Step five: set aside money for income tax too. Brand money isn't taxed at source. Your business profit is taxed when you file.
[S13] What can you steal from Zoe's story? One: the thirty-thousand-dollar line is checked every quarter, and one big deal can cross it. Two: registering lets you claim back the HST you pay. Three: gifted products can be income. Creators — do you charge HST on brand deals? Be honest in the comments. For help with your own creator setup, I'm on Instagram at canadataxwizard. See you next week.

**Verify before publishing:** CRA position on products received for content (barter / benefit in kind); zero-rated exported services counting toward the threshold; Ontario HST 13% (current).

---

## EPISODE 09 — "Dad Gave Her Bitcoin. Nobody Knew What It Cost."
- **Title:** Her Dad Gifted Her Bitcoin Years Ago — Now She Sold It. What's the Tax?
- **Thumbnail:** host = thinking; text `GIFTED CRYPTO TAX?`; green badge `Cost = value on gift day`
- **CHARACTER:** Ana, 35, short brown pixie cut, black turtleneck, graphic designer; her father, 60s, grey mustache, reading glasses.
- **Comment question:** "Has anyone in your family ever gifted you crypto or shares? Did you know what your cost was?"
- **Calc layouts:** L4 Split (right vs wrong cost), L1 Ledger (dad's side)

**Scenes**
| ID | Block | Image prompt | Motion | On-screen text | Source tag |
|---|---|---|---|---|---|
| S01 | Hook | Host thinking | SEEDANCE host: kinetics "holds up a single gold coin prop, turns it slowly"; camera "slow push-in" | `Sold for $130,000` `Cost = ???` | — |
| S02 | Disclaimer | Host | push-in | disclaimer | — |
| S03 | Story | Dad at a computer years ago, early crypto website, excited | parallax | `Years ago: Dad buys for $150` | — |
| S04 | Story | Dad transferring to Ana's wallet, both smiling | push-in | `Gift day value: $14,000` | — |
| S05 | Story | Ana in 2026 selling on her phone | parallax | `2026: sells for $130,000` | — |
| S06 | Turn | Ana staring at a tax form with "Adjusted cost base" highlighted | SEEDANCE story hero: kinetics "cursor blinks in an empty field"; camera "slow push-in to screen" | `What's my cost?` | — |
| S07 | Rules | Rule card | slide | `Receiving a gift: your cost = fair market value on the day you got it` | Source: Income Tax Act 69(1)(c) |
| S08 | Rules | Rule card | slide | `Giving a gift: the giver is treated as selling at fair market value` | Source: Income Tax Act 69(1)(b) |
| S09 | Rules | Rule card | slide | `Capital gains inclusion rate: 1/2 (increase cancelled March 21, 2025)` | Source: Prime Minister's statement, March 21, 2025 |
| S10 | Numbers | L4 Split | count-up | wrong vs right below | — |
| S11 | Numbers | L1 Ledger dad | ledger | `$14,000 − $150 = $13,850 gain` | — |
| S12 | Fix | Steps 1–5 | slide | steps | Source: canada.ca — Voluntary Disclosures Program |
| S13 | Takeaways + CTA | Host → joy | SEEDANCE CTA | bullets, question, handle | — |

**Split (S10):** Wrong (using Dad's $150): gain $129,850 → taxable half **$64,925**. Right (cost = $14,000 on gift day): gain $116,000 → taxable half **$58,000**. Difference in taxable income **$6,925** → at an illustrative 40% rate ≈ **$2,770** of tax she'd overpay.
**Ledger (S11):** Dad's deemed proceeds $14,000 − his cost $150 = gain $13,850 → taxable half **$6,925**, reportable in the year of the gift.
Screen note on S04: "Story number. Use the real market value on the actual gift date."

**VO**
[S01] Ana sold her bitcoin for a hundred and thirty thousand dollars. Her dad gave it to her years ago. He bought it for a hundred and fifty. So which number is her cost? Get this wrong and she either overpays the CRA by thousands — or her dad has a problem he doesn't know about yet.
[S02] This is based on a real situation a Canadian shared online. Names and numbers changed. General information, not tax advice. The rule here applies to crypto, shares, art — almost anything someone gives you.
[S03] Way back, Ana's dad got curious about this new internet money and bought some for about a hundred and fifty dollars. He forgot about it for a while.
[S04] Years later, he decided to give it to his daughter. On the day he transferred it to her wallet, it was worth fourteen thousand dollars — in our story. Ana was an adult, he was her dad, it was a gift. Nobody thought about tax.
[S05] Then in 2026, Ana sold it for a hundred and thirty thousand dollars.
[S06] And now she's filling in her return, looking at a box called "adjusted cost base." And she has no idea what to put.
[S07] Here's the rule. When you receive property as a gift, the Income Tax Act says you're treated as having acquired it at its fair market value at that time. Not what the giver paid. What it was worth on the day you received it. So Ana's cost is fourteen thousand dollars.
[S08] But there's a second half people miss. The person who gives the gift is treated as if they sold it at fair market value. So on the day Dad gave it away, he had a capital gain — even though no money changed hands.
[S09] And for capital gains, only half is taxable. The government had proposed raising that to two-thirds above a threshold, but that increase was cancelled on March twenty-first, 2025. So the inclusion rate is one-half.
[S10] Watch the difference. If Ana uses her dad's hundred and fifty dollars as her cost, her gain is a hundred and twenty-nine thousand eight hundred and fifty. Half of that is sixty-four thousand nine hundred and twenty-five dollars of taxable income. If she uses the correct cost — fourteen thousand on the gift day — her gain is a hundred and sixteen thousand. Taxable half: fifty-eight thousand. That's six thousand nine hundred and twenty-five dollars less taxable income. At an illustrative forty percent rate, about two thousand seven hundred and seventy dollars she would have paid for nothing.
[S11] Now Dad's side. He was deemed to sell at fourteen thousand. His cost was a hundred and fifty. That's a gain of thirteen thousand eight hundred and fifty, and half of it — six thousand nine hundred and twenty-five — should have been reported on his return for the year of the gift. If he didn't, that's something to fix.
[S12] So here's the plan. Step one: find the exact date of the transfer — the transaction record in the wallet — and the market value in Canadian dollars on that date from a reliable source. Save screenshots and the record. That's Ana's proof of cost. Step two: report Ana's sale as a capital gain using that cost. Step three: Dad talks to a professional about his gift year. If it wasn't reported, he can correct his return. If he wants protection from penalties, the CRA has a Voluntary Disclosures Program, which has conditions — get advice before applying. Step four: keep records for everything crypto — dates, amounts, values in Canadian dollars — because the CRA can ask. Step five: if a parent wants to gift assets that have grown, plan it before the transfer. Sometimes gifting in a low-income year, or gifting cash instead, changes the tax completely. Gifts to a spouse or to a child under eighteen have extra rules, so check those first.
[S13] What can you steal from Ana's story? One: gifted property comes with a new cost — its value on the gift day. Two: the person giving can owe tax on the gift. Three: no records, no proof — and the CRA won't guess in your favour. Has anyone in your family ever gifted you crypto or shares? Did you know what your cost was? Tell me in the comments. For help with your own situation, I'm on Instagram at canadataxwizard. See you next week.

**Verify before publishing:** current Voluntary Disclosures Program conditions (canada.ca); attribution rules for gifts to spouse/minor; CRA crypto record-keeping guidance.

---

## EPISODE 10 — "They Didn't File Because They Had No Income"
- **Title:** New to Canada With No Income? Not Filing Taxes Is Costing You
- **Thumbnail:** host = explaining; text `NO INCOME? FILE ANYWAY`; green badge `Benefits waiting`
- **CHARACTER:** Amir, 38, short black hair, neat beard, grey quilted jacket; Leila, 35, headscarf in soft blue, warm smile; two kids, 6 and 9. Winnipeg winter, small rented apartment.
- **Comment question:** "Newcomers: what's one thing about Canadian taxes nobody told you when you arrived?"
- **Calc layouts:** L3 Timeline (payment months), L1 Ledger (checklist)

**Scenes**
| ID | Block | Image prompt | Motion | On-screen text | Source tag |
|---|---|---|---|---|---|
| S01 | Hook | Host explaining | SEEDANCE host: kinetics "opens both hands, gentle smile, slight lean in"; camera "slow push-in" | `No income ≠ no tax return` | — |
| S02 | Disclaimer | Host | push-in | disclaimer | — |
| S03 | Story | Family arriving at a snowy airport with suitcases | parallax | `Arrived: August 2025` | — |
| S04 | Story | Amir starting a warehouse job; Leila at home with kids, studying English | parallax | `Amir: new job · Leila: no income` | — |
| S05 | Story | Leila telling a neighbour "we don't need to file, I earned nothing" | push-in | `"Why file? I earned $0."` | — |
| S06 | Turn | Neighbour holding up a phone showing a benefit deposit | SEEDANCE story hero: kinetics "neighbour turns phone screen toward Leila"; camera "over-the-shoulder slow push" | `"Then how do you get this?"` | — |
| S07 | Rules | Rule card | slide | `File every year, even with little or no income, to get benefits` | Source: canada.ca — Newcomers to Canada |
| S08 | Rules | Rule card | slide | `With children (CCB-eligible): RC66 + RC66SCH` `Without: RC151` | Source: canada.ca — Benefits for newcomers |
| S09 | Rules | Rule card | slide | `First return: report income from the date you became a resident` | Source: canada.ca — newcomers tax tip |
| S10 | Numbers | L3 Timeline: GST/HST credit months Jul · Oct · Jan · Apr; CCB monthly | timeline | `Quarterly vs monthly` | — |
| S11 | Rules | Rule card | slide | `BOTH spouses must file — every year` | Source: canada.ca — CCB |
| S12 | Fix | Steps 1–5 | slide | steps | — |
| S13 | Numbers | L1 Ledger checklist | ledger | documents list | — |
| S14 | Takeaways + CTA | Host → joy | SEEDANCE CTA | bullets, question, handle | — |

**Checklist (S13):** SIN for each adult · proof of arrival date · income from abroad before arrival (needed for benefit applications) · T4 slips · rent receipts if your province gives credits for it · children's proof of birth · direct deposit info.

**VO**
[S01] "We don't need to file. I didn't earn anything." That one sentence can keep a newcomer family from money they're entitled to — for months, sometimes years. In Canada, filing isn't only about paying tax. It's how you get paid.
[S02] This is based on a real situation Canadians shared online. Names and details changed. General information, not tax advice. If you're new to Canada — or you know someone who is — please share this one.
[S03] Amir and Leila moved to Winnipeg in August 2025 with their two kids. New country, new language, first winter.
[S04] Amir found a job fast. Leila stayed home with the kids and started English classes. She had no income at all.
[S05] When tax season came, Amir filed his return. Leila didn't. "Why would I? I earned zero dollars."
[S06] Then a neighbour showed her a payment on her phone and said, "If you don't file, how do you get this?"
[S07] Here's the rule. The CRA says it directly: even if you have little or no income, you need to file a tax return every year — to get a refund if you're owed one, and to keep receiving benefit and credit payments you're entitled to. Benefits like the GST/HST credit and the Canada child benefit are calculated from your tax returns.
[S08] But newcomers don't have to wait for their first tax return to apply. If you have children and meet the Canada child benefit rules, you apply with form RC66, plus the schedule RC66SCH about your status and income. That information is also used for the GST/HST credit. If you don't have children, you use form RC151 to apply for the GST/HST credit. Since June 2025, the CRA has offered an online version so newcomers don't have to mail paper forms.
[S09] And the first return is simpler than people think. For the year you arrive, you report the income you received after you became a resident of Canada. The CRA will still ask about your world income before arrival for the benefit applications.
[S10] And here's how the payments come. The GST/HST credit is paid every three months — in July, October, January and April. The Canada child benefit is paid every month. Every month you're not in the system is a month the payment isn't coming.
[S11] And this is the detail that caught Leila. For the Canada child benefit, both spouses or common-law partners need to file their returns on time every year — even the one with no income. If Leila doesn't file, the family's payments can be delayed or stopped, even though Amir did everything right.
[S12] So here's the plan. Step one: if you arrived recently and haven't applied, send the right form now — RC66 with RC66SCH if you have eligible children, or RC151 if you don't. Step two: both spouses file a return for the year you arrived, by the deadline — even with zero income. Step three: register for direct deposit and CRA My Account after your first assessment, so you see every payment and letter. Step four: use free help if your situation is simple — the CRA lists free community tax clinics for people with modest incomes. Step five: if you already missed time, call the CRA benefits line and ask whether payments can be reviewed back to when you became eligible.
[S13] Here's the checklist to have ready: a SIN for each adult. Proof of your arrival date. Your income from abroad before you arrived. Any T4 slips. Proof of birth for your children. And your bank details for direct deposit.
[S14] What can you steal from this story? One: in Canada, filing is how you receive benefits — not just how you pay tax. Two: both spouses file, every year, even with zero income. Three: newcomers can apply for benefits before their first return. Newcomers — what's one thing about Canadian taxes nobody told you when you arrived? Tell me in the comments. For help with your own situation, I'm on Instagram at canadataxwizard. See you next week.

**Verify before publishing:** current names of forms (RC151 title changed after the Canada Carbon Rebate ended — check the current form title); CCB requirement that both spouses file; free tax clinic program page.

---

## EPISODE 11 — "Canada, the US, Then Europe: Where Does Her Pension Come From?"
- **Title:** She Worked in Canada, the US and Now Europe — Does She Lose Her Pensions?
- **Thumbnail:** host = thinking; text `3 COUNTRIES. 0 PENSION?`; green badge `Agreements count`
- **CHARACTER:** Sophie, 30, light brown hair in a messy bun, beige trench coat, carry-on suitcase; airports and a sunny Lisbon-style street (city not named on screen).
- **Comment question:** "Have you lived or worked in more than one country? Which pension are you worried about?"
- **Calc layouts:** L2 Bars (OAS fraction), L3 Timeline (years by country)

**Scenes**
| ID | Block | Image prompt | Motion | On-screen text | Source tag |
|---|---|---|---|---|---|
| S01 | Hook | Host thinking | SEEDANCE host: kinetics "spins a small desk globe, stops it with one finger"; camera "slow push-in" | `6 years Canada · 4 years US · now Europe` | — |
| S02 | Disclaimer | Host | push-in | disclaimer | — |
| S03 | Story | Sophie as a teen in a Canadian small town, then university | parallax | `Canada until 24` | — |
| S04 | Story | Sophie working in a US office | push-in | `US: 4 years` | — |
| S05 | Story | Sophie with a moving box, flight board showing Europe | parallax | `Next: Europe` | — |
| S06 | Turn | Sophie on her laptop at midnight, pension forum tabs open | SEEDANCE story hero: kinetics "tabs multiply across screen"; camera "slow dolly-in" | `"Did I just lose everything?"` | — |
| S07 | Rules | Rule card | slide | `CPP: based on what you paid in — can be paid abroad` | Source: canada.ca — CPP retirement pension |
| S08 | Rules | Rule card | slide | `OAS: earned by years in Canada after age 18 — 1/40 per year` | Source: canada.ca — OAS eligibility |
| S09 | Rules | Rule card | slide | `Social security agreements can help you QUALIFY` | Source: canada.ca — International social security agreements |
| S10 | Numbers | L3 Timeline 18→24 Canada, 24→28 US, 28→ Europe | timeline | years per country | — |
| S11 | Numbers | L2 Bars: 6/40 of full OAS | bars | `6 ÷ 40 = 15% of a full OAS` | — |
| S12 | Rules | Rule card | slide | `Pensions paid to non-residents: non-resident tax, often reduced by treaty` | Source: canada.ca — NR4 / non-resident tax |
| S13 | Fix | Steps 1–5 | slide | steps | — |
| S14 | Takeaways + CTA | Host → joy | SEEDANCE CTA | bullets, question, handle | — |

**Calc (S11):** Years in Canada after 18 = 24 − 18 = 6 → 6/40 = 0.15 = **15% of a full OAS** (only if she meets the eligibility conditions, with agreement periods possibly helping her qualify).

**VO**
[S01] Six years in Canada. Four in the United States. Now she's moving to Europe. And at midnight she's typing into a forum: "Did I just lose all my pensions?" Short answer — no. But there are rules she has to know, and steps she has to take before she leaves.
[S02] This is based on a real situation a Canadian shared online. Names and details changed. General information, not tax or legal advice. Pension rules depend on your exact dates — so take this as a map, not the final answer.
[S03] Sophie grew up in Canada. She lived here until she was twenty-four and worked a few years after school.
[S04] Then a job offer took her to the United States, where she worked for four years and paid into the US system.
[S05] Now she's moving to Europe. And she's wondering: what happens to the Canadian pension, the American one, and does any of it follow her?
[S06] Let's take them one at a time.
[S07] First, the Canada Pension Plan — CPP. CPP is based on what you contributed while you worked in Canada. It doesn't disappear when you leave. You can apply for it from abroad when you're eligible, and it can be paid to you outside Canada. Your CPP contribution history is in your My Service Canada Account.
[S08] Second, Old Age Security — OAS. OAS isn't based on contributions. It's based on how many years you lived in Canada after age eighteen. A full pension generally needs forty years. A partial pension is calculated in fortieths — one-fortieth for each full year. There's also a minimum: generally ten years in Canada after eighteen to qualify, and twenty years if you want OAS paid while you live outside Canada.
[S09] So does Sophie's US time help? This is where social security agreements come in. Canada has agreements with many countries, including the United States. They can let periods in the other country count toward meeting the minimum requirements to qualify. They usually don't increase the amount — the amount is still based on your Canadian years.
[S10] Let's map Sophie's life. Age eighteen to twenty-four in Canada: six years. Twenty-four to twenty-eight in the US: four years. And then Europe.
[S11] If she ends up qualifying for a partial OAS, six years in Canada after eighteen means six-fortieths of a full pension. Six divided by forty is fifteen percent. Not huge — but not zero. And her CPP depends on what she paid in during her working years in Canada. The US side works similarly: her US earnings record stays with the US system, and the agreement can help her meet their requirements too.
[S12] Last piece: tax. When Canadian pensions are paid to someone who isn't a resident of Canada, they're generally subject to non-resident tax withheld at the source. The rate can often be reduced by the tax treaty between Canada and her new country. Which means her paperwork with the new country matters.
[S13] So here's the plan before she leaves. Step one: download her CPP statement of contributions from My Service Canada Account and save it. Step two: write down her exact dates of residence in each country — arrival and departure — with proof: leases, job letters, tax returns. Pension offices ask for exact dates, sometimes decades later. Step three: check Canada's list of social security agreements and confirm whether her new country has one. Step four: tell the CRA the date she stops being a resident, and get advice on her departure year — leaving Canada has its own tax rules. Step five: when she gets close to retirement age, apply in each country. Benefits don't start automatically everywhere, and late applications can mean lost months.
[S14] What can you steal from Sophie's story? One: CPP follows you — it's based on what you paid. Two: OAS is counted in years — every year in Canada after eighteen is one-fortieth. Three: social security agreements can help you qualify, so keep proof of every year, everywhere. Have you lived or worked in more than one country? Which pension are you worried about? Tell me in the comments. For help with your own situation, I'm on Instagram at canadataxwizard. See you next week.

**Verify before publishing:** OAS 10-year / 20-year rules; whether Canada has a social security agreement with her specific destination country; current non-resident withholding rules and treaty rate for that country.

---

## EPISODE 12 — "Two Pensions at 62. They Don't Need the Money. Take It Anyway?"
- **Title:** He Qualified for TWO Pensions at 62 — Why Taking Them Early Could Cost This Couple
- **Thumbnail:** host = thinking; text `TAKE IT AT 62?`; green badge `2 pensions + CPP + OAS`
- **CHARACTER:** Richard, 62, silver hair, trimmed grey beard, navy quarter-zip sweater, reading glasses on his head; his wife Carol, 62, short white bob, cardigan, gardening gloves. Bright kitchen in a bungalow, two pension statements on the table.
- **Comment question:** "Retirees: did you take your pension early or wait? Would you choose the same again?"
- **Calc layouts:** L4 Split (62 vs 65), L2 Bars (break-even), L1 Ledger (income stacking)
- **Adaptation note (on screen, S02):** `Original situation was outside Canada — we rebuilt it with Canadian rules and Canadian-dollar story numbers.`

**Story numbers (fictional, CAD):**
- Pension A (first employer): $2,700/month at 62 or $3,200/month at 65.
- Pension B (second employer): $4,600/month at 62 or $5,400/month at 65. The plan lets him earn a second, smaller benefit if he keeps working under it (plan-specific).
- Richard still works part-time, 4–6 months a year: $40,000/year.
- Carol: small part-time income, $15,000/year.

**Scenes**
| ID | Block | Image prompt | Motion | On-screen text | Source tag |
|---|---|---|---|---|---|
| S01 | Hook | Host thinking | SEEDANCE host: kinetics "holds two envelopes, weighs them in her hands, looks at camera"; camera "slow push-in" | `$7,300 a month at 62 — or wait?` | — |
| S02 | Disclaimer | Host | push-in | disclaimer + adaptation note | — |
| S03 | Story | Richard and Carol at the kitchen table with two pension statements and coffee | parallax | `Both 62 · two pensions` | — |
| S04 | Story | Richard at a part-time job, relaxed | push-in | `Still working 4–6 months a year` | — |
| S05 | Story | Colleagues at a retirement party, cake, "Congrats!" banner | parallax | `"Everyone's taking it early"` | — |
| S06 | Turn | Richard looking at his tax return on a laptop, eyebrows up | SEEDANCE story hero: kinetics "a bar on a chart climbs past a red line"; camera "slow dolly-in" | `Income stacking` | — |
| S07 | Numbers | L4 Split: at 62 vs at 65 for each pension | count-up | A: `$2,700` vs `$3,200` · B: `$4,600` vs `$5,400` | — |
| S08 | Numbers | L2 Bars break-even | bars | A ≈ age 81 · B ≈ age 82 | — |
| S09 | Numbers | L1 Ledger income stacking | ledger | `$40,000 + $87,600 = $127,600` | — |
| S10 | Rules | Rule card | slide | `Registered pension plan life annuity: can be split with spouse — up to 50%, at any age` | Source: canada.ca — Pension income splitting (Form T1032) |
| S11 | Rules | Rule card | slide | `CPP: −0.6%/month before 65 · +0.7%/month after 65 (max +42% at 70)` | Source: canada.ca — CPP: When to start your pension |
| S12 | Rules | Rule card | slide | `Take CPP before 65 and keep working → you must keep contributing (Post-Retirement Benefit)` | Source: canada.ca — CPP Post-Retirement Benefit |
| S13 | Rules | Rule card | slide | `OAS: from 65, +0.6%/month deferred, max +36% at 70 · recovery tax 15% above the threshold` | Source: canada.ca — OAS / OAS recovery tax |
| S14 | Fix | Steps 1–5 | slide | steps | — |
| S15 | Takeaways + CTA | Host → joy | SEEDANCE CTA | bullets, question, handle | — |

**Calcs**
- **S07 Split:** Pension A at 62 = $2,700 vs at 65 = $3,200 (+$500/month). Pension B at 62 = $4,600 vs at 65 = $5,400 (+$800/month).
- **S08 Break-even (simple, before tax, no indexing or investment growth):**
  - A: 36 months × $2,700 = $97,200 received early ÷ $500 extra per month = 194.4 months ≈ 16.2 years after 65 → **≈ age 81**.
  - B: 36 × $4,600 = $165,600 ÷ $800 = 207 months = 17.25 years after 65 → **≈ age 82**.
  - Screen note: `Simple break-even. Real answer depends on indexing, survivor options, tax and health.`
- **S09 Ledger:** Work $40,000 + Pension A $32,400 ($2,700 × 12) + Pension B $55,200 ($4,600 × 12) = **$127,600** for Richard in a year he takes both at 62. Carol: $15,000.
- **S10 split illustration:** eligible pension = $87,600 → up to 50% = **$43,800** can be moved to Carol on the tax return. Richard $127,600 → $83,800; Carol $15,000 → $58,800.
- **S13 OAS check at 65 (if he waits for the larger pensions):** Work $40,000 + A $38,400 ($3,200 × 12) + B $64,800 ($5,400 × 12) = $143,200 before splitting. Recovery-tax threshold for the 2026 income year: $95,323 (verify). Over by $47,877 × 15% = **≈ $7,182/year** of OAS repaid — that is most of a year's OAS. After splitting 50% of $103,200 pensions ($51,600) → Richard $91,600 → under the threshold before CPP and OAS are added (both count as income; OAS deferral while working keeps him lower). Show: `Splitting can protect OAS.` + small note `CPP and OAS also count toward net income.`

**VO**
[S01] Seventy-three hundred dollars a month, starting next month. That's what Richard can get if he takes both of his pensions at sixty-two. All his colleagues are doing it. But he and his wife don't need the money right now. So — take it, or wait?
[S02] This is based on a real situation someone shared online. The original story was outside Canada, so we rebuilt it with Canadian rules and changed the names and numbers. General information, not financial or tax advice. And the answer isn't the same for everyone — that's exactly the point.
[S03] Richard and Carol are both sixty-two. Richard was lucky: two different employers over his career, two defined benefit pensions.
[S04] He's still working part-time, four to six months a year, about forty thousand dollars. He likes it, and it isn't demanding. Carol earns about fifteen thousand from part-time work.
[S05] At work, everyone's taking their pension the day they can. But as Richard says, most of them need the money more than he does.
[S06] So here's the question nobody at the retirement party asked: what happens to his taxes if he stacks two pensions on top of a paycheque?
[S07] First, the pensions themselves. Pension A pays twenty-seven hundred a month at sixty-two, or thirty-two hundred at sixty-five. Pension B pays forty-six hundred at sixty-two, or fifty-four hundred at sixty-five. Every plan sets its own early-retirement reduction, so these are story numbers — your plan booklet has yours.
[S08] Now the simplest test: break-even. If Richard takes Pension A three years early, he collects ninety-seven thousand two hundred dollars before sixty-five. Waiting gives him five hundred more each month after sixty-five. Ninety-seven thousand two hundred divided by five hundred is about a hundred and ninety-four months — around sixteen years. So waiting only wins if he lives past about eighty-one. For Pension B, it's about eighty-two. That's a real coin-flip zone. And it's why "everyone takes it early" isn't a strategy — it's just a habit.
[S09] But here's what the break-even ignores: tax. If Richard takes both pensions at sixty-two and keeps working, his income that year is forty thousand from work plus eighty-seven thousand six hundred from pensions — a hundred and twenty-seven thousand six hundred. All taxed at his top rate. For money he says he doesn't need.
[S10] Now the rule that changes everything for couples. Payments from a registered pension plan — a life annuity like Richard's — count as eligible pension income at any age. That means he can split up to fifty percent of it with Carol on their tax returns, using form T1032. Up to forty-three thousand eight hundred dollars could be reported by Carol instead. Richard drops to about eighty-three thousand eight hundred. Carol goes up to fifty-eight thousand eight hundred. Same household money — but more of it taxed in the lower bracket.
[S11] Then there are the government pensions. CPP can start anywhere from sixty to seventy. Start before sixty-five, and your payment is reduced by zero point six percent for every month early. Start after sixty-five, and it grows by zero point seven percent a month — up to forty-two percent more at seventy.
[S12] And if you start CPP before sixty-five while you're still working, you must keep contributing. Those contributions build a small extra lifetime amount called the Post-Retirement Benefit. From sixty-five to seventy, contributing becomes your choice.
[S13] And then OAS. It starts at sixty-five, and you can defer it to seventy for zero point six percent more each month — up to thirty-six percent. But OAS has a recovery tax: fifteen percent of your net income above a threshold — ninety-five thousand three hundred and twenty-three dollars for the 2026 income year. Look at Richard at sixty-five if he waits for the bigger pensions and keeps working: forty thousand from work plus a hundred and three thousand two hundred from pensions — a hundred and forty-three thousand two hundred. That's almost forty-eight thousand over the line. Fifteen percent of that is about seven thousand one hundred and eighty dollars a year of OAS paid back. But if he splits half his pension income with Carol, his income drops to about ninety-one thousand six hundred — under the threshold, before CPP and OAS themselves are added. And remember, OAS and CPP count as income too. So the plan that fits Richard is splitting the pension and deferring OAS while he's still working. Splitting doesn't just save tax. It can save his OAS.
[S14] So what's the smart order for a couple like this? Step one: get the real numbers. Ask each plan for a written estimate at sixty-two, sixty-three, sixty-four and sixty-five — and ask whether the pension is indexed to inflation. Step two: choose the survivor option together. Defined benefit plans usually offer a joint-and-survivor pension, and in most provinces the spouse has to sign a waiver to give it up. For a couple, that choice can matter more than the start date. Step three: while Richard is still working, consider waiting on the pensions he doesn't need — or starting one and splitting it with Carol so the household uses her lower bracket. Step four: if Pension B lets him earn a second benefit by keeping working, read exactly what qualifies, and in writing. Step five: map CPP and OAS for both of them. With strong pension income, deferring OAS can make sense, and pension splitting every year can keep each of them under the recovery-tax line.
[S15] What can you steal from Richard and Carol? One: "everyone takes it early" is a habit, not a plan — do the break-even. Two: pension income stacked on top of a paycheque is taxed at your highest rate. Three: for couples, pension splitting can lower tax and protect OAS at the same time. Retirees — did you take your pension early or wait? Would you choose the same again? Tell me in the comments. For help with your own retirement numbers, I'm on Instagram at canadataxwizard. See you next week.

**Verify before publishing:** OAS recovery-tax threshold for the 2026 income year ($95,323) on the canada.ca OAS recovery tax page; that registered pension plan life annuity payments qualify for splitting under 65 (canada.ca pension splitting page); provincial joint-and-survivor / spousal waiver rules for the plan's jurisdiction; that the pension income amount (federal credit) applies to these payments under 65.

---

# PART C — SOURCES CHECKED (November 2026) AND RULES OF USE

## C1. Verified for this file
| Topic | Rule used | Source |
|---|---|---|
| YouTube AI disclosure | Disclose realistic altered/synthetic content; not required for scripting help or clearly unrealistic/animated content | YouTube Creator Studio policy (reported by TechCrunch, Social Samosa, Net Influencer, 2024); YouTube Help "Disclosing use of altered or synthetic content" |
| YouTube monetization | "Repetitious" renamed "inauthentic content" July 15, 2025; mass-produced, near-identical narrated stories ineligible | PPC Land (TeamYouTube clarification), Social Media Today, Gulf News (July 2025) |
| TFSA excess | 1%/month on highest excess in the month; withdrawals restored Jan 1 next year | https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/owing-tax/excess.html · https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/withdraw.html |
| TFSA limits | 2016–2018 $5,500; 2019–2022 $6,000; 2023 $6,500; 2024–2026 $7,000 | Investment Executive (Oct 2025), TaxTips.ca, Fidelity Canada |
| RRSP limit 2026 | 18% of prior-year earned income, max $33,810 | TD, Questrade, Fidelity 2026 tax facts |
| TD1, two employers | Don't claim credits on more than one TD1 if total income exceeds them; risk of large balance owing | https://www.canada.ca/en/revenue-agency/services/tax/individuals/educational-programs/videos/one-about-td1-form-part-1.html |
| FINTRAC | Cash $10,000+ single transaction or 2+ amounts totalling $10,000+ within 24 hours → Large Cash Transaction Report; multiple locations included | https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/lctr-doie/lctr-doie-eng · https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/24hour/1-eng |
| GST/HST small supplier | $30,000 in one quarter or over 4 consecutive quarters; register within 29 days | https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/when-register-charge |
| Gifted property | Recipient acquires at FMV (69(1)(c)); giver deemed to dispose at FMV (69(1)(b)) | https://laws-lois.justice.gc.ca/eng/acts/i-3.3/section-69.html · CRA interpretation 2018-0773301E5 |
| Capital gains inclusion | Increase cancelled March 21, 2025; rate remains ½ | PwC Tax Insights (Mar 27, 2025), Wolters Kluwer (updated May 2026) |
| Newcomers | File even with no income; RC66 + RC66SCH with CCB-eligible children, RC151 otherwise; online form since June 3, 2025; report income from date of residency | https://www.canada.ca/en/revenue-agency/news/newsroom/tax-tips/tax-filing-season-media-kit/new-canada-filing-taxes-here-are-tips-help-you.html · https://www.canada.ca/en/revenue-agency/news/newsroom/tax-tips/tax-tips-2025/apply-benefit-credit-payments-using-new-online-form.html |
| CPP timing (Ep12) | −0.6%/month before 65; +0.7%/month after 65, up to 42% at 70; start 60–70 | https://www.canada.ca/en/services/benefits/publicpensions/cpp/when-start.html |
| CPP Post-Retirement Benefit (Ep12) | Contributions mandatory for working CPP recipients under 65; optional 65–70 | https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-post-retirement/eligibility.html |
| OAS deferral and recovery tax (Ep12) | +0.6%/month to 36% at 70; 15% of net income above threshold; $95,323 for 2026 income year (secondary sources — verify on canada.ca) | canadianmoneyhelp.ca, richify.ai (2026), Service Canada recovery tax page |
| Pension income splitting (Ep12) | Up to 50% of eligible pension income via T1032; RPP life annuity eligible at any age; CPP/OAS not eligible | RBC Wealth Management, BMO, EY Tax Matters guides |
| Episodes 2–5, 11 (from the earlier research doc) | Taxpayer relief RC4288, daily compound interest, consumer proposal/LIT, FHSA, CPP/OAS abroad, instalments | See Doc "Tax Secrets Canada — реальные истории с Reddit" sources section |

## C2. Rules for Claude Code
1. Do not change any number, limit or rule in Part B. If something looks wrong, stop and list it in `QA_NOTES.md` instead of fixing it yourself.
2. Each episode's **"Verify before publishing"** list must be printed at the top of `upload.txt` so the channel owner checks it before going public.
3. For any episode published after December 2026, re-check: TFSA 2027 limit, RRSP 2027 limit, CRA prescribed interest rate, form titles.
4. Never add phrases like "our client," "a client of ours," or "guaranteed."

<!-- END OF FILE -->

