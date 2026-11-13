import json
L = """Dana's tax year started on January first. Her first paycheque: two thousand, five hundred and fifty-two dollars.
It ended on December thirty-first. Her last paycheque: two thousand, eight hundred and six.
But the smartest tax move of her whole year didn't happen in that year at all.
It happened in February of the next year. And it was worth about one thousand, four hundred and eighty-two dollars.
A move a lot of people don't realize they're allowed to make.
Today we follow one Canadian tax year, month by month, from the first paycheque to the tax return. And you'll see exactly where the money moves.
All numbers: the twenty twenty-six tax year, Ontario, a ninety thousand dollar salary, paid every two weeks. Examples, not real people. General information, not advice.
First: what a tax year is.
For individuals in Canada, the tax year is the calendar year. January first to December thirty-first.
Everything you earn in those twelve months goes on one return. And you file that return in the spring of the next year.
So every tax year really runs about sixteen months. Twelve months of earning, and then a few months of settling up.
Now, January.
On January first, C P P and E I start over. The yearly limits reset.
That's why Dana's January paycheques are her smallest of the year. Two thousand, five hundred and fifty-two dollars.
January is also a good time to check your T D one form. That's where you claim your personal tax credits with your employer.
New job, second job, or a big change in your life? Update it. Remember Lena, with two jobs and a five thousand dollar bill. That started with a T D one.
And if you know you'll owe, the same form lets you ask for extra tax on every paycheque.
Now, the spring. But not this year's taxes.
In the first months of the year, you're still finishing last year.
R R S P contributions made in the first sixty days of the year can count for the year before. For the twenty twenty-five tax year, that deadline was March second, twenty twenty-six.
Then, April thirtieth. That's the deadline for most people to file last year's return, and to pay any balance owing.
If you or your spouse are self-employed, you have until June fifteenth to file. But a balance owing is still due on April thirtieth.
Now, the summer.
In July, the Canada Child Benefit is recalculated. It's based on your family net income from the year before.
That's why filing on time matters even if you owe nothing. Your return is what your benefits are built on.
And if you pay tax by instalments, June fifteenth and September fifteenth are two of the four due dates. The others are March fifteenth and December fifteenth.
Now, the fall. This is the part most people notice without understanding it.
Dana's paycheques start to grow. By paycheque twenty, she reaches the yearly E I maximum. Then regular C P P stops, and a few paycheques later, C P P two.
Her last paycheque of the year: two thousand, eight hundred and six dollars. Two hundred and fifty-four dollars more than in January.
It isn't a raise. She simply finished paying the year's C P P and E I. On January first, it all starts again.
With two jobs, each employer takes C P P and E I separately. If the total goes over the yearly maximum, the extra comes back on your return.
Now, December.
December thirty-first closes the tax year. Your income for the year is now fixed.
Most tax moves for the year have to happen by then. The R R S P is the big exception.
For Dana, her employer withheld about seventeen thousand and thirty-four dollars of income tax over the year. And that's about what her real tax comes to.
So if she did nothing else, her return would land close to zero. No refund, no bill.
But Dana does one more thing.
In February twenty twenty-seven, she contributes five thousand dollars to her R R S P. Inside the first sixty days, so it counts for twenty twenty-six.
Her payroll never saw it. Her employer withheld tax as if her income were ninety thousand dollars.
But on her twenty twenty-six return, that five thousand dollars comes off her income.
So the tax she already paid is now more than her real tax. The difference comes back as a refund. About one thousand, four hundred and eighty-two dollars.
That's the move from the start of this video. Made in one year, for the year before.
And remember from our R R S P video: you don't have to deduct it right away. If next year's income will be higher, you can save the deduction for later.
Now, the return itself.
Early in the year, your employer gives you a T four slip. It shows your income, and the tax, C P P and E I that were taken off.
Your return adds up every slip, every deduction and every credit. It compares the tax you really owe with the tax already withheld.
More withheld than you owe? A refund. Less? A balance owing.
A refund doesn't mean you paid less tax. It means you paid too much during the year, and you're getting your own money back.
After the C R A processes your return, you get a notice of assessment.
Keep it. It shows your R R S P deduction limit for the next year, among other things.
If the C R A changed anything on your return, the notice shows that too.
And then the cycle starts again. A new January. New limits. A new first paycheque.
Here's your tax year checklist.
One. January: check your T D one, especially if you have more than one job.
Two. Before the R R S P deadline: decide if a contribution makes sense for last year.
Three. By April thirtieth: file, and pay anything you owe.
Four. July: check your benefits. They depend on the return you filed.
Five. After you file: keep your notice of assessment.
So, what did we learn?
One. The tax year is the calendar year, but settling it takes until spring.
Two. Your paycheque grows in the fall, then resets in January.
Three. Some of the best moves for a tax year happen after it ends.
Four. Your return compares what you paid with what you owe. That's your refund or your bill.
Next on this channel: what happens to your taxes when you work remotely. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.strip().split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1)
print(len(lines), sum(len(t.split()) for _, t in lines))
