import json
L = """Frank and Linda are retired. Together, their income this year is one hundred and sixty thousand dollars.
Their neighbours, Raj and Mei, have exactly the same. One hundred and sixty thousand.
Same income. Same age. Same Old Age Security.
But starting next July, Frank's O A S cheques will shrink. Three thousand, seven hundred and two dollars, gone over twelve months. Raj and Mei lose nothing.
By the end of this video, you'll know why, and four legal ways to keep more of yours. One of them doesn't cost a single dollar.
All numbers: twenty twenty-six income, each spouse files a separate return. Examples, not real people. General information, not advice.
First: what O A S actually is.
Old Age Security is a monthly federal pension for people sixty-five and older. It's separate from the C P P.
From October to December twenty twenty-six, the maximum is seven hundred and sixty-two dollars and fifty cents a month between sixty-five and seventy-four. From seventy-five, it's about ten percent more.
That's roughly nine thousand dollars a year. And it counts as taxable income.
But there's a catch with a long official name: the O A S pension recovery tax. Most people call it the clawback.
Now, how the clawback works.
For twenty twenty-six income, the line is ninety-five thousand, three hundred and twenty-three dollars of net income.
Every dollar above that line costs you fifteen cents of O A S.
And it's your own net world income. Each spouse is measured separately. Not the household.
That's the whole story of Frank and Linda. Frank's net income is one hundred and twenty thousand. Linda's is forty thousand.
Raj and Mei have eighty thousand each. Same total, split evenly.
Frank is twenty-four thousand, six hundred and seventy-seven dollars over the line. Fifteen percent of that is three thousand, seven hundred and two dollars.
Raj and Mei are both under the line. Their clawback is zero.
And here's the timing most people miss. The clawback on twenty twenty-six income isn't taken this year. It comes out of your O A S payments from July twenty twenty-seven to June twenty twenty-eight.
For Frank, that's about three hundred and eight dollars less every month. Almost five months of O A S, spread over a year.
And there's a ceiling. At a net income of about one hundred and fifty-five thousand, three hundred and twenty dollars, the whole O A S is gone. From seventy-five, the ceiling is about one hundred and sixty-one thousand, three hundred and twenty.
The government publishes these limits every year, so check the current ones.
So, how do you keep more? Lever one: pension income splitting.
From sixty-five, you can move up to half of your eligible pension income to your spouse, on paper. Company pension payments qualify, and from sixty-five, so do R R I F payments.
You both sign a joint election, form T ten thirty-two, with your returns. No money moves between accounts. Only the tax return changes.
C P P and O A S themselves can't be split this way.
Say Frank has sixty thousand dollars of company pension and R R I F income. He can move up to thirty thousand to Linda.
If he moves twenty-five thousand, his net income drops to ninety-five thousand. Linda's rises to sixty-five thousand.
Frank is now under the line. His clawback goes from three thousand, seven hundred and two dollars to zero.
Splitting can lower the couple's income tax as well, depending on both incomes. And it's free. That's the move that doesn't cost a single dollar.
But here's what surprises people. It's not only how much you have. It's where the money sits.
Lever two: the T F S A. Say Frank also has two hundred thousand dollars in G I Cs in a regular account, earning four percent. That's eight thousand dollars of interest a year.
That interest is income. At fifteen percent, it adds one thousand, two hundred dollars of clawback, on top of the income tax.
Inside a T F S A, the same interest doesn't go on your return at all. The C R A says T F S A income and withdrawals don't affect O A S.
So if you have T F S A room, savings there can protect your O A S, year after year.
Lever three: watch the one-time spikes.
Say Frank takes an extra thirty thousand dollars from his R R I F in one year, for a renovation.
His net income jumps to one hundred and fifty thousand. The clawback jumps to eight thousand, two hundred and two dollars.
That's four thousand, five hundred more O A S gone, starting the following July.
Large withdrawals and taxable capital gains all land in net income for that year. Plan them for years when you're under the line, or use splitting when the income qualifies.
Lever four: when you start O A S.
You don't have to start at sixty-five. For every month you wait, it goes up by zero point six percent. At seventy, that's thirty-six percent more, for life.
Maria is sixty-five and still working. With O A S, her net income would be one hundred and thirty thousand dollars.
The clawback would take five thousand, two hundred and two dollars of her roughly nine thousand a year.
If she waits until seventy, she skips those mostly clawed-back years, and gets thirty-six percent more for life, when her income is lower.
It's not right for everyone. With a low income, delaying can cost you the Guaranteed Income Supplement, which you can't receive while you delay O A S.
Where this changes. Every number here is the O A S clawback only. Splitting and withdrawals also change your income tax and some credits. For your own numbers, ask a tax professional.
And there's one more lever, before any of this starts: using the low-income years right after you retire. That's our next video.
Here's your checklist.
One. Find your net income for the year, and compare it with ninety-five thousand, three hundred and twenty-three.
Two. If you're a couple over sixty-five, check pension splitting on form T ten thirty-two, every year.
Three. Use your T F S A before a regular account.
Four. Plan big withdrawals and sales. And choose when to start O A S on purpose, not by default.
So, what did we learn?
One. The clawback is fifteen cents for every dollar above ninety-five thousand, three hundred and twenty-three, per person.
Two. It's taken the following year, from July to June.
Three. Splitting, the T F S A, timing and the start date can keep more of it, legally.
Next on this channel: the retirement tax window most Canadians miss. The low-income years right after you retire. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1); print(len(lines), 'lines', sum(len(t.split()) for _, t in lines), 'words')
