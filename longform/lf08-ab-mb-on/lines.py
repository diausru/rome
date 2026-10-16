L = [
# HOOK — the race
"Three people. Same job. Same salary: one hundred thousand dollars. One lives in Calgary, one in Toronto, one in Winnipeg.",
"Every payday, the same race. Federal tax, provincial tax, C P P, E I.",
"By the end of the year, one of them is three thousand dollars ahead of last place. And Toronto finishes just two hundred and fifty-three dollars behind the leader.",
"But the paycheque isn't the finish line. There's a second race, at the checkout, and a third one when the salary goes up. By the end, the gap looks very different.",
"All numbers: twenty twenty-six rates, a single employee, no other income. Our example, not a real person. General information, not advice.",
# 01 THE SAME PART
"First, what's the same everywhere.",
"Federal tax on one hundred thousand dollars is identical in all three provinces: thirteen thousand, three hundred and two dollars.",
"C P P: four thousand, six hundred and forty-six. E I: one thousand, one hundred and twenty-three. Same in Calgary, Toronto and Winnipeg.",
"That's nineteen thousand dollars that doesn't care where you live. The entire race is decided by one line: provincial tax.",
# 02 PROVINCIAL TAX
"So, round one. Provincial income tax on the same hundred thousand dollars.",
"Alberta: six thousand, four hundred and seventy dollars.",
"Ontario: six thousand, seven hundred and twenty-three. That already includes the Ontario Health Premium, seven hundred and fifty dollars, and a surtax of about twenty-six.",
"Manitoba: nine thousand, four hundred and eighty-four.",
"Ontario is only two hundred and fifty-three dollars behind Alberta. Manitoba is more than three thousand behind.",
# 03 WHY ONTARIO IS CLOSE
"How can Ontario be that close? Two different strategies.",
"Alberta starts higher, at eight percent, but it has a big basic personal amount: twenty-two thousand, seven hundred and sixty-nine dollars of income that the credit covers.",
"Ontario starts low: five point oh five percent on the first fifty-three thousand, eight hundred and ninety-one dollars. Then nine point one five percent.",
"At one hundred thousand dollars, those two designs land in almost the same place. Higher up, they don't. Remember that.",
"And Manitoba? Ten point eight percent to forty-seven thousand dollars, then twelve point seven five. Higher rates, from the very first bracket.",
"Look at the next steps up. Alberta stays at ten percent until one hundred and fifty-four thousand, two hundred and fifty-nine dollars.",
"Ontario moves to eleven point one six percent above one hundred and seven thousand, seven hundred and eighty-five, and twelve point one six above one hundred and fifty thousand. Plus the surtax on top.",
"Manitoba jumps to seventeen point four percent above one hundred thousand dollars. Our example earns exactly one hundred thousand, so Manitoba's top bracket hasn't even started yet.",
# 04 PHOTO FINISH
"Photo finish. Take-home pay for the year.",
"Calgary: seventy-four thousand, four hundred and fifty-nine dollars.",
"Toronto: seventy-four thousand, two hundred and six.",
"Winnipeg: seventy-one thousand, four hundred and forty-five.",
"Per month: about six thousand, two hundred and five in Calgary, six thousand, one hundred and eighty-four in Toronto, and five thousand, nine hundred and fifty-four in Winnipeg.",
"Calgary and Toronto: twenty-one dollars a month apart. Winnipeg: about two hundred and fifty a month behind.",
# 05 THE CHECKOUT
"But the money doesn't stay in the bank account. It gets spent. And that's race number two.",
"Sales tax at the checkout. In Alberta, only the federal G S T: five percent.",
"In Manitoba, five percent G S T plus seven percent retail sales tax. Twelve percent.",
"In Ontario, the harmonized sales tax: thirteen percent.",
"On every thousand dollars of taxable purchases: fifty dollars in Calgary, a hundred and twenty in Winnipeg, a hundred and thirty in Toronto.",
"Now, not everything is taxed. Basic groceries and many other items aren't taxed, and what's taxable isn't always the same in each province. So let's use an illustration: twenty thousand dollars a year of purchases taxed at the general rate.",
"Sales tax: one thousand dollars in Calgary. Two thousand, four hundred in Winnipeg. Two thousand, six hundred in Toronto.",
"Subtract it, and the photo finish isn't close anymore. Calgary keeps seventy-three thousand, four hundred and fifty-nine. Toronto, seventy-one thousand, six hundred and six. Winnipeg, sixty-nine thousand and forty-five.",
"The Calgary-Toronto gap goes from two hundred and fifty-three dollars to about eighteen hundred and fifty. Calgary-Winnipeg: about forty-four hundred.",
"Your number depends on what you buy. The more you spend on taxable things, the more the checkout matters.",
# 06 SALARY CHANGES
"Race number three. What if the salary isn't a hundred thousand?",
"At sixty thousand dollars: Calgary keeps forty-seven thousand, six hundred and ninety-one. Toronto, forty-seven thousand, three hundred and forty. Winnipeg, forty-five thousand, seven hundred and seventy-two.",
"Calgary and Toronto still about three hundred and fifty apart. Close.",
"Now one hundred and fifty thousand. Calgary: one hundred and seven thousand, four hundred and fifty-eight. Toronto: one hundred and four thousand, three hundred and twenty. Winnipeg: one hundred thousand, seven hundred and ninety-seven.",
"The Toronto gap just jumped to more than three thousand, one hundred dollars.",
"That's the two designs splitting apart. Ontario's higher brackets and its surtax start working above about a hundred thousand. Alberta stays at ten percent all the way to one hundred and fifty-four thousand.",
"Winnipeg is behind at every salary: about nineteen hundred at sixty thousand, three thousand at one hundred, and about sixty-six hundred at one hundred and fifty.",
# 07 NEXT DOLLAR
"One more test. A raise. Give each of them one thousand dollars more, at one hundred thousand.",
"Calgary keeps six hundred and ninety-five. Toronto, six hundred and eighty-five. Winnipeg, six hundred and sixty-eight.",
"Small differences per raise. But they repeat on every dollar, every year.",
"And the same logic flips for deductions. Say each of them puts ten thousand dollars into an R R S P, assuming they have the room.",
"At one hundred thousand dollars, the tax saved is about three thousand and fifty in Calgary, two thousand, nine hundred and ninety-one in Toronto, and three thousand, three hundred and twenty-five in Winnipeg.",
"The highest-tax province gives the biggest reward for a deduction. Higher rates cut both ways.",
"At one hundred and fifty thousand, it shifts again: about three thousand, six hundred in Calgary, and about four thousand, three hundred and forty in both Toronto and Winnipeg.",
# 08 WHAT TAX DOESN'T SHOW
"Now, the part a tax calculator can't tell you.",
"Rent, home prices, car insurance, and salaries for the same job are all different in Calgary, Toronto and Winnipeg. Those can be bigger than every number in this video.",
"So the tax race tells you one thing clearly: how much of the same salary the government takes. It doesn't tell you where life costs less.",
# VERDICT
"So, who wins?",
"On the paycheque at one hundred thousand: Calgary, by a nose over Toronto. Winnipeg third.",
"At the checkout: Calgary pulls away, because there's no provincial sales tax.",
"At higher salaries: the Calgary-Toronto gap grows. At every salary, Winnipeg pays the most income tax of the three.",
"And before anyone packs a moving truck: price the housing and the job in the new city first.",
"Next on this channel: you start a side hustle. How much of every extra dollar do you actually keep? Subscribe, so you don't miss it.",
]
L = [(f'L{i+1}', t) for i, t in enumerate(L)]
import json; json.dump([list(x) for x in L], open('lines.json', 'w'), indent=0)
w = sum(len(t.split()) for _, t in L); print(len(L), 'lines', w, 'words')
