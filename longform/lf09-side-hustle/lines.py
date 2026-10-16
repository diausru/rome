L = [
# HOOK
"Two people. The same side hustle. The same ten thousand dollars of profit.",
"Sam earns sixty thousand dollars at a day job. Priya earns ninety thousand.",
"Priya earns more, so Priya should keep less of the side money. Right?",
"Wrong. Priya keeps eight hundred and sixty-four dollars more. Same work, same ten thousand.",
"By the end of this video you'll know exactly why, plus the April bill Sam didn't see coming, and the thirty thousand dollar line every side hustle should watch.",
"All numbers: twenty twenty-six federal and Ontario rates, single, no other income. Our examples, not real people. General information, not advice.",
# 01 WHAT CHANGES
"First, what makes side income different from a paycheque.",
"At a job, the employer takes tax, C P P and E I off every pay. With a side hustle, nobody takes anything off. The full amount lands in your account.",
"But the tax is still there. It just shows up later, on your return.",
"And on that return, the side hustle is business income. You report it on form T twenty-one twenty-five, and you pay tax on the profit: what you earned, minus your business expenses.",
# 02 SAM
"Let's start with Sam. Day job, sixty thousand. Side hustle, ten thousand of profit.",
"Income tax on those extra ten thousand dollars: about two thousand, six hundred and sixty-five. Federal and Ontario together.",
"Then C P P. And this is the part people don't expect.",
"At a job, you pay five point nine five percent, and your employer pays the other five point nine five. On self-employment income, you're both. You pay eleven point nine percent.",
"For Sam, that's one thousand, one hundred and ninety dollars of C P P on the side income.",
"Half of that is deductible, and part of it earns a tax credit, so the true cost is a little lower. That's already included in our numbers.",
"Sam keeps six thousand, one hundred and forty-five dollars of the ten thousand. About sixty-one and a half percent.",
# 03 PRIYA
"Now Priya. Day job, ninety thousand. The same ten thousand on the side.",
"Income tax on the extra: about two thousand, nine hundred and ninety-one. More than Sam, because Priya is in a higher bracket.",
"But C P P on the side income? Zero.",
"Here's why. C P P only applies up to a ceiling. In twenty twenty-six, the first ceiling is seventy-four thousand, six hundred dollars, and the second one, for C P P two, is eighty-five thousand.",
"Priya's day job already went past both. The job has already paid the maximum. So there's no room left for C P P on the side income.",
"Priya keeps seven thousand and nine dollars. Seventy percent. Eight hundred and sixty-four more than Sam.",
"Sam's sixty thousand dollar job leaves room under the ceiling. And the side hustle fills that room, at eleven point nine percent.",
# 04 THE LADDER
"So let's run the same ten thousand dollars at four different day-job salaries.",
"At forty thousand: you keep about six thousand, nine hundred and eighty-two. Lower tax bracket, but C P P still applies.",
"At sixty thousand: six thousand, one hundred and forty-five. The worst spot: a higher bracket, and still full C P P.",
"At ninety thousand: seven thousand and nine. The C P P is gone.",
"And at one hundred and thirty thousand: five thousand, six hundred and fifty-nine. No C P P, but now the Ontario rate on the next dollar is much higher.",
"So the side hustle isn't worth less just because you earn more. It depends on where your job leaves you: under the C P P ceiling, or above it.",
# 05 HUSTLE VS RAISE
"Now a fair question. Would Sam be better off with a ten thousand dollar raise at the day job instead?",
"With a raise, Sam keeps about six thousand, four hundred and forty-seven. That's three hundred more than the side hustle.",
"Why? On a raise, Sam pays only the employee half of C P P. The employer pays the other half. On the side hustle, Sam pays both.",
"That doesn't make the side hustle a bad idea. It just means the side dollar and the paycheque dollar aren't the same dollar.",
# 06 EXPENSES
"There is one thing the side hustle has that a raise doesn't: business expenses.",
"Reasonable costs to earn that income, like supplies, software, or a share of your phone, can reduce your profit. And tax and C P P are calculated on the profit.",
"Say Sam has three thousand dollars of real business expenses. Profit drops from ten thousand to seven thousand.",
"What Sam keeps drops by only about one thousand, eight hundred and forty-four. Because about one thousand, one hundred and fifty-six of the tax and C P P disappears with it.",
"But notice: the expense still cost three thousand dollars. An expense saves you part of its cost. It's not free money. Only spend on what the business really needs, and keep the receipts.",
# 07 THE APRIL BILL
"Now, the bill Sam didn't see coming.",
"Remember, nobody took anything off the side income. So on the return, Sam owes all of it at once.",
"About two thousand, six hundred and sixty-five of income tax, plus one thousand, one hundred and ninety of C P P. Roughly three thousand, eight hundred and fifty-five dollars.",
"Self-employed people have until June fifteenth to file. But any balance owing is still due by April thirtieth. Interest can start after that.",
"The simple fix: every time side money comes in, move a share of it to a separate account. For Sam, about thirty-nine cents of every dollar of profit.",
"And if the tax part alone grows past three thousand dollars, this year and in one of the two years before, the C R A can ask for quarterly instalments. The C P P part isn't counted in that three thousand dollar test.",
# 08 THE 30K LINE
"And finally, the thirty thousand dollar line.",
"Once your business sales go over thirty thousand dollars, in a single calendar quarter or over the last four quarters together, you're no longer a small supplier.",
"That means you generally have to register for G S T or H S T, charge it to your customers, and send it to the C R A.",
"Notice: that's sales, before expenses. Not profit. A side hustle with forty thousand of sales and ten thousand of profit has already crossed the line.",
# VERDICT
"So, what did we learn?",
"One. Side income has no withholding. Set money aside every time you get paid.",
"Two. Self-employed C P P is eleven point nine percent, until your total earnings reach the ceilings. Where your day job leaves you decides how much of the side dollar you keep.",
"Three. Real business expenses reduce the bill, but they still cost you more than they save.",
"Four. Watch the thirty thousand dollar line on sales, not profit.",
"Next on this channel: marginal tax rates. Why a raise never taxes your whole salary, and the one number to check before every decision. Subscribe, so you don't miss it.",
]
L = [(f'L{i+1}', t) for i, t in enumerate(L)]
import json; json.dump([list(x) for x in L], open('lines.json', 'w'), indent=0)
w = sum(len(t.split()) for _, t in L); print(len(L), 'lines', w, 'words')
