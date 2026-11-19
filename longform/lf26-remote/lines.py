import json
L = """Sam works from his kitchen in Halifax. His company is in Calgary. He has never once set foot in that office.
Every paycheque looked fine. Then he filed his tax return. And he owed four thousand, five hundred and seventy-nine dollars.
Same salary. Same job. No mistake on his part. Just one box on his T four that nobody explained to him.
And by the end of this video, you'll know which box that is. And the one form that can cut the bill.
Today: what actually happens to your taxes when you work remotely in Canada.
All numbers: the twenty twenty-six tax year, an eighty-five thousand dollar salary, single, no other income. Examples, not real people. General information, not advice.
First, the two provinces in Sam's life.
There's the province where he lives. Nova Scotia.
And there's the province his payroll uses. That's called the province of employment. It's in box ten of his T four.
These two can be different. And when they are, that's where the trouble starts.
Let's start with the one that decides your tax.
For the C R A, your provincial tax depends on the province where you lived on December thirty-first.
Not where your employer is. Not where the head office is. Where you live.
Sam lived in Nova Scotia on December thirty-first. So his whole year is taxed at Nova Scotia rates.
Now, the payroll side.
Your employer has to pick a province for your pay deductions. The C R A has rules for that.
If you report to an office in person, it's the province of that office.
If you don't report to any office, it's generally the province where your employer's business is, and where your pay comes from.
There's one exception for remote workers. If you'd normally go to a specific office, without your remote work agreement, that office's province can count.
But Sam was hired remote. There's no office he'd go to. So his employer used Alberta.
And one more detail from the C R A: your home office is generally not your employer's establishment.
So now we have Sam's whole problem.
His payroll took tax at Alberta rates. But he owes tax at Nova Scotia rates.
Here's what that looks like in real numbers.
Federal tax is the same everywhere. Only the provincial part changes.
At Alberta rates, Sam's provincial tax on eighty-five thousand dollars is about four thousand, nine hundred and seventy dollars.
At Nova Scotia rates, it's about nine thousand, five hundred and forty-nine.
His payroll took about fifteen thousand, one hundred and ninety-seven dollars in income tax.
His real income tax is about nineteen thousand, seven hundred and seventy-six.
The gap: four thousand, five hundred and seventy-nine dollars. Due with his return.
That's about one hundred and seventy-six dollars he didn't pay on each paycheque, all year.
Now, this doesn't always go the wrong way.
Same employer in Alberta, same salary, but a different home.
Live in British Columbia, and Sam would get about five hundred and seventy dollars back.
Live in Ontario, and he'd owe about three hundred and fifty-four.
Manitoba: about two thousand, six hundred and one.
Prince Edward Island: about three thousand, six hundred and seventy-nine.
And Nova Scotia: the four thousand, five hundred and seventy-nine we already saw.
So the question is never just "do I work remotely". It's "which two provinces are on my paperwork".
But before you blame the payroll department, there's a second half to this story. Because remote work also gives you something.
And this part is worth real money. If you qualify.
It's the home office deduction. Officially: work space in the home expenses.
Since twenty twenty-three, the temporary flat rate method is gone. There's only one way now: the detailed method.
To use it, the C R A sets a few conditions.
One. You were required to work from home more than half the time, for at least four weeks in a row.
Two. Your employer signs Form T twenty-two hundred.
Three. Your employer didn't pay you back for those costs.
Sam checks all three. So let's build his claim.
Sam rents. His rent is one thousand, eight hundred dollars a month. Twenty-one thousand, six hundred a year.
Electricity and heat: one thousand, five hundred. His monthly internet fees: nine hundred.
Twenty-four thousand dollars of home costs in total.
Now, what share of that is work?
Sam's office is a separate room. Ten percent of his apartment's floor space. And he uses it only for work.
For a room like that, the C R A says you don't count hours. You use the floor space.
Ten percent of twenty-four thousand dollars. A two thousand, four hundred dollar deduction.
At Sam's tax rate in Nova Scotia, that cuts his tax by about eight hundred and ninety-two dollars.
But what if Sam worked at the kitchen table instead?
Then hours count. The C R A's own example: a space that's twelve percent of the home, used forty hours out of one hundred and sixty-eight in a week.
That's about two point nine percent.
On the same twenty-four thousand dollars, that's a six hundred and eighty-six dollar deduction. About two hundred and fifty-five dollars of tax.
Same person. Same job. A separate room is worth more than three times as much.
And some things you can't claim as a salaried employee. Mortgage interest. Property tax. Home insurance. Furniture.
So where does that leave Sam?
He owed four thousand, five hundred and seventy-nine dollars. The home office cuts about eight hundred and ninety-two.
He still owes about three thousand, six hundred and eighty-seven.
And that number matters for one more reason.
If your net tax owing is more than three thousand dollars this year, and in either of the two years before, the C R A can ask you to pay by instalments.
Four times a year. March, June, September, and December.
So if Sam does nothing, next year could start with a quarterly bill.
Here's the fix. And it takes five minutes.
On the federal T D one form, there's a line: additional tax to be deducted.
Sam asks his employer to take about one hundred and forty-two dollars more from each paycheque.
That spreads the bill across the whole year. No surprise in April.
Now, the checklist for anyone working remotely.
One. Look at box ten on your T four. That's your province of employment.
Two. Compare it with the province you'll live in on December thirty-first.
Three. If they're different, estimate the gap. Then use the T D one to cover it.
Four. If you were required to work from home, ask your employer for a T twenty-two hundred.
Five. Measure your work space. And keep your rent, utility, and internet bills.
So, what did we learn?
One. Your provincial tax follows where you live on December thirty-first.
Two. Your payroll can use a different province. And the difference shows up on your return.
Three. It can go either way: a bill or a refund.
Four. A home office can cut the bill, but only with the detailed method and a T twenty-two hundred.
Next on this channel: what happens to your taxes when you support your parents. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.strip().split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1)
print(len(lines), sum(len(t.split()) for _, t in lines))
