L = [
# HOOK — two pay stubs, both correct; the bill drops
"Maya worked two jobs last year. Both employers took tax off every single paycheque.",
"Both did exactly what they were told to do.",
"And in April, Maya's income tax bill was six thousand, five hundred and twenty-three dollars.",
"So how can two employers both get it right, and still get it wrong? The answer is one box, on one form.",
"And there's a second trap, one that can follow Maya into next year. Stay with me, we'll get to both.",
"Every number here uses twenty twenty-six federal and Ontario rates, for one example person. General information, not advice.",
# 01 MEET MAYA
"Meet Maya. Ontario. Single. A day job that pays fifty-five thousand dollars a year.",
"And an evening job that pays thirty-five thousand more. Ninety thousand in total. Our example, not a real person.",
"On the first day at each job, Maya filled out the same form. The T D one, the personal tax credits return.",
"And on both forms, Maya claimed the basic personal amount. On a new job, that feels completely normal.",
# 02 THE BLIND SPOT
"Here's the thing about payroll. Each employer only sees its own job.",
"The day job sees fifty-five thousand dollars. It has no idea the evening job exists.",
"The evening job sees thirty-five thousand. It has no idea about the day job.",
"So each one withholds tax as if its job were Maya's whole life.",
"Our estimate: the day job withholds about seven thousand, one hundred and seventy-eight dollars of income tax. The evening job, about three thousand, three hundred and thirty-two.",
"Ten thousand, five hundred and ten dollars in total. Every paycheque looked fine.",
# 03 THE TRUTH
"But the tax return doesn't look at jobs. It looks at Maya.",
"Ninety thousand dollars of income, on one return. The tax on that: seventeen thousand and thirty-four dollars.",
"Seventeen thousand and thirty-four owed, ten thousand, five hundred and ten withheld. The difference is the bill. Six thousand, five hundred and twenty-three.",
"About five hundred and forty-four dollars for every month of the year that nobody set aside.",
"So where exactly did it come from? Two places.",
# 04 LEAK 1
"Leak number one: the personal amounts were counted twice.",
"The basic personal amount is meant to be used once per person. Federally, sixteen thousand, four hundred and fifty-two dollars, at fourteen percent. In Ontario, twelve thousand, nine hundred and eighty-nine, at five point oh five percent.",
"Claimed at both jobs, those credits reduced Maya's withholding twice. Together, about two thousand, nine hundred and fifty-nine dollars of tax that was never taken off.",
# 05 LEAK 2
"Leak number two is quieter, and it's bigger.",
"The evening job thinks thirty-five thousand dollars is Maya's entire income. So it withholds at the lowest rates: fourteen percent federal, five point oh five percent Ontario.",
"But on the return, those thirty-five thousand dollars sit on top of the day job. They land in higher brackets: twenty point five percent federal, and nine point one five in Ontario.",
"About nineteen percent withheld on those dollars, up to almost thirty percent owed. That gap: about three thousand, five hundred and sixty-four dollars.",
"Two thousand, nine hundred and fifty-nine, plus three thousand, five hundred and sixty-four. That's the six thousand, five hundred and twenty-three.",
# 05b DOES SIZE MATTER
"So here's the question people always ask. Does it matter how big the second job is?",
"Let's run two more versions of Maya. Same day job, but the evening job pays only ten thousand dollars.",
"On its own, ten thousand dollars is below the basic personal amount. So the evening job withholds nothing. Zero income tax, all year.",
"But on the return, those ten thousand dollars still sit on top of fifty-five thousand. The bill: about two thousand, five hundred and forty-eight dollars. From a job that never took a cent of tax.",
"Version three: two equal jobs. Forty-five thousand dollars each. Same ninety thousand in total.",
"Each employer withholds as if forty-five thousand were everything. Together, about ten thousand, four hundred and eighty-six dollars.",
"The tax on ninety thousand is still seventeen thousand and thirty-four. The bill: about six thousand, five hundred and forty-eight. Almost exactly the same as before.",
"So it's not the size of the second job that creates the bill. It's the fact that each payroll only sees part of the picture.",
# 06 A LITTLE COMES BACK
"Now, one piece of good news on the return.",
"E I premiums stop at sixty-eight thousand, nine hundred dollars of earnings for the year. But each employer deducts E I on its own pay.",
"Maya paid one thousand, four hundred and sixty-seven dollars of E I. The yearly maximum is one thousand, one hundred and twenty-three. About three hundred and forty-four dollars comes back.",
"C P P works the same way: when more than one employer deducts it, the return checks what you actually had to contribute, and an overpayment is refunded.",
"So a little comes back. But not six thousand dollars.",
# 07 THE ONE BOX
"So, the one box on one form.",
"The T D one has a box on page two: more than one employer or payer at the same time.",
"The C R A's rule: if you've already claimed your personal amounts with one employer, you can't claim them again with another. You tick that box, and enter zero as your total claim.",
"Do that at the evening job, and leak number one is closed. That's about two thousand, nine hundred and fifty-nine dollars handled through payroll.",
"But leak number two is still open. The evening job still doesn't know it's sitting on top of fifty-five thousand dollars.",
"For that, the T D one has a second tool: additional tax to be deducted. You choose an extra amount to come off every pay.",
"In Maya's case, about three thousand, five hundred dollars a year. Spread over twenty-six pay periods, roughly a hundred and thirty-seven dollars a cheque. That's our estimate. Your own number depends on your pay.",
# 08 THE SECOND TRAP
"Now, the second trap. The one that follows you into next year.",
"The C R A asks for tax instalments when your net tax owing is more than three thousand dollars this year, and also in either of the two previous years.",
"Maya's balance was over three thousand. If the next year looks the same, instalments can be required, with payments due March fifteenth, June fifteenth, September fifteenth and December fifteenth.",
"So fixing the forms now doesn't just avoid one bill. It keeps one bad year from turning into a schedule.",
# 09 WHO ELSE
"And this isn't only about two jobs.",
"The T D one rule is for anyone with more than one employer or payer at the same time. Each payer only sees its own payments.",
"If a balance owing shows up every April, check how many payers you had, and what each one thinks your income is.",
# VERDICT
"So, what happened to Maya?",
"Both employers followed the rules they were given. The forms told each one that Maya had a single job.",
"Fix one: claim your personal amounts with one employer only. Tick the box at the other job, and enter zero.",
"Fix two: ask for additional tax to be deducted, so the second job withholds at your real rate.",
"Fix three: if you already owe, look at whether instalment reminders could follow.",
"Next on this channel: the same one hundred thousand dollar salary in Alberta, Manitoba and Ontario. One of them keeps thousands more. Subscribe, so you don't miss it.",
]
L = [(f'L{i+1}', t) for i, t in enumerate(L)]
import json; json.dump([list(x) for x in L], open('lines.json', 'w'), indent=0)
w = sum(len(t.split()) for _, t in L); print(len(L), 'lines', w, 'words ≈', round(w / 150, 1), 'min')
