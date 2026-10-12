L = [
# HOOK
("L1", "A form your doctor fills out could be worth thousands of dollars. Sometimes going back ten years. And still, applications stall, or get turned down."),
("L2", "Today: who actually qualifies for the disability tax credit, who can sign the form, how the application really works, and what to do if the answer is no."),
("L3", "Every rule in this video comes from the Canada Revenue Agency's own pages, checked this month. This is general information, not advice for your situation."),
# 01 WHAT IT IS
("L4", "Meet Maria. Her son Liam is fifteen. Our example family, not a real case."),
("L5", "First, the most common misunderstanding. The disability tax credit is not a cheque. It's a non-refundable credit: an amount that reduces the income tax someone owes."),
("L6", "For twenty twenty-five, the disability amount is ten thousand, one hundred and thirty-eight dollars for an adult."),
("L7", "For a child under eighteen, there's a supplement of five thousand, nine hundred and fourteen. Sixteen thousand and fifty-two dollars in total."),
("L8", "At the federal rate for twenty twenty-five, fourteen and a half percent, the adult amount is worth about one thousand, four hundred and seventy dollars off federal tax. Each province adds its own credit on top, and that part depends on where you live."),
("L9", "But Liam is fifteen, with no income. He pays no income tax. So what happens to a credit he can't use?"),
("L10", "It can be transferred. If the person with the impairment doesn't need the whole amount, the unused part can go to a supporting family member: a parent, spouse, child, grandparent, sibling, and a few other relatives."),
("L11", "The test: the person depends on that family member for at least one of the basics of life. Food, shelter, or clothing. That's how Maria could claim Liam's amount on her own return."),
# 02 WHO QUALIFIES
("L12", "So who qualifies? There are three routes, and each one needs a medical practitioner to certify it."),
("L13", "Route one: a marked restriction in one category. Walking, mental functions, dressing, feeding, eliminating, hearing, speaking, or vision."),
("L14", "Marked has a specific meaning. You're unable to do the activity, or it takes you three times longer than someone of similar age, even with therapy, medication and devices."),
("L15", "And it has to be present all or almost all of the time. The CRA says: generally ninety percent or more."),
("L16", "Route two: the cumulative effect. Two or more significant limitations that, together, are as severe as one marked restriction. For example, someone who always takes a long time to walk and to dress."),
("L17", "Route three: life-sustaining therapy. Therapy needed at least twice a week, for an average of at least fourteen hours a week."),
("L18", "And for every route, the impairment must have lasted, or be expected to last, at least twelve months in a row."),
("L19", "Notice what's not on the list: a diagnosis. The CRA looks at the effects of the impairment on daily life, as described by the practitioner. Not just the name of the condition."),
# 03 WHO SIGNS
("L20", "Which brings us to the most important person in this process. The one who fills out part B."),
("L21", "A medical doctor or a nurse practitioner can certify any category."),
("L22", "An optometrist, vision. An audiologist, hearing. A speech-language pathologist, speaking. A psychologist, mental functions."),
("L23", "A physiotherapist, walking. An occupational therapist, walking, feeding, and dressing."),
("L24", "So choose the practitioner who actually knows how the impairment affects daily life. And if they charge a fee for the form, that fee may count as a medical expense."),
# 04 THE APPLICATION
("L25", "Now, the application itself. It has two parts, and both must arrive the same way, both digital or both on paper."),
("L26", "Part A is yours. Maria fills it out in her CRA account, or by phone. At the end she gets a reference number."),
("L27", "She gives that number to Liam's practitioner. It's valid for up to twelve months, and it can be used only once."),
("L28", "Part B can only be completed by the practitioner. If the applicant fills it out, it won't be processed. Once part B is done online, the application goes to the CRA automatically."),
("L29", "Two details save time. On part A, name the supporting family member who will claim the credit. And tick the box asking the CRA to adjust previous years."),
("L30", "When should you apply? Any time of the year. But if you send it with your tax return, the CRA reviews the application first, and your return waits. So apply before you file."),
# 05 WHAT CHANGED IN 2026
("L31", "And two things changed this year."),
("L32", "Since July fourteenth, twenty twenty-six, you can't send a disability tax credit application through the submit documents section of your CRA account. Digital form, or mail."),
("L33", "And from September eighth, older paper versions of form T twenty-two oh one, from before twenty twenty-three, are no longer accepted. Old form, new application."),
# 06 THE REVIEW
("L34", "Then the CRA reviews. Its decision is based on how the practitioner's information meets the criteria."),
("L35", "Sometimes the CRA needs more. It can write to the practitioner, who has sixty business days to respond. You'll be told in writing if that happens."),
("L36", "You can follow the status in the progress tracker in your CRA account: received, in progress, information requested, completed."),
# 07 THE DECISION
("L37", "The answer comes as a notice of determination. Three possible outcomes: approved permanently, approved for a limited period, or denied."),
("L38", "If there's an expiry date, the CRA reminds you a year ahead, and you can re-apply any time to avoid a gap."),
("L39", "And if things improve to the point you no longer meet the criteria, you have to tell the CRA in writing."),
# 08 PAST YEARS
("L40", "Now the part worth checking twice: the past."),
("L41", "If Liam was eligible in earlier years but nobody claimed it, Maria may be able to claim it going back up to ten years."),
("L42", "If she ticked the box on the form, the CRA reassesses those years itself. If not, she can ask in writing, or change the returns online. And a credit for past years may result in a refund."),
# 09 DENIED
("L43", "But what if the answer is no?"),
("L44", "The notice explains why. Compare it with your copy of the form, and with the criteria. Check whether the effects on daily life were fully described."),
("L45", "Then you have options: ask for a review or send new information, file a formal objection, or call the CRA to discuss it."),
# 10 DOORS
("L46", "And one more reason the credit matters. Being eligible may open the door to other federal programs."),
("L47", "The registered disability savings plan. The child disability benefit. The Canada workers benefit disability supplement. And the Canada disability benefit."),
("L48", "It also works the other way: being approved for another federal or provincial disability program doesn't make you eligible for this credit. It's a separate application."),
# VERDICT + CTA
("L49", "So, Maria's checklist. The right practitioner for the impairment. The digital form, before tax time. The family member named, the past-years box ticked, and the reference number kept safe."),
("L50", "The credit is real money. But it only works if someone applies."),
("L51", "Next on this channel: you care for an elderly parent. Can you claim them on your taxes? Subscribe, so you don't miss it."),
]
import json; json.dump([list(x) for x in L], open('lines.json', 'w'), indent=0)
w = sum(len(t.split()) for _, t in L); print(len(L), 'lines', w, 'words')
