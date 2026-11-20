import json
L = """On January first, twenty twenty-seven, every federal tax bracket in Canada moves up. Your salary doesn't have to change at all.
Earn seventy-five thousand dollars in both years, and your federal tax goes down by about one hundred and fifty-nine dollars.
But in three provinces, the provincial tax-free basic amount doesn't move at all. And in two of them, the brackets are frozen too.
So who wins in twenty twenty-seven, who stands still, and what changes for families with kids? Let's go through it, number by number.
All numbers come from the C R A's payroll formulas for January twenty twenty-seven, and from canada dot c a. Examples, not real people. General information, not advice.
First: why the brackets move at all.
Every year, the federal tax brackets and most credits are indexed to inflation.
For twenty twenty-seven, the federal indexation rate is two point six percent.
That means every bracket line moves up by two point six percent. And so does the basic personal amount.
Here are the new federal brackets for twenty twenty-seven.
Fourteen percent on the first sixty thousand and forty-four dollars.
Twenty point five percent up to one hundred and twenty thousand and eighty-eight.
Twenty-six percent up to one hundred and eighty-six thousand, one hundred and fifty-seven.
Twenty-nine percent up to two hundred and sixty-five thousand, two hundred and three.
And thirty-three percent above that.
The rates themselves don't change. Only the lines move.
And the basic personal amount goes from sixteen thousand, four hundred and fifty-two dollars, to sixteen thousand, eight hundred and seventy-nine.
That's four hundred and twenty-seven dollars more you can earn before federal tax starts. Worth about sixty dollars.
Now, what does that mean for you?
Let's keep the salary exactly the same, and only change the year. Federal tax only, before other credits.
At fifty thousand dollars, you save about sixty dollars.
At seventy-five thousand, about one hundred and fifty-nine.
At one hundred thousand, also about one hundred and fifty-nine.
At one hundred and fifty thousand, about three hundred and twenty-six.
Not life-changing. But here's the real point.
Say your salary goes up by exactly two point six percent. From seventy-five thousand, to seventy-six thousand, nine hundred and fifty.
Your federal tax goes up too. From about nine thousand, two hundred and sixty-eight, to about nine thousand, five hundred and nine.
But it rises in step with your pay. That's what indexing does. It stops inflation from quietly pushing you into a higher bracket.
That has a name. Bracket creep. And in twenty twenty-seven, not every province protects you from it.
Here's where it gets interesting.
Provinces set their own brackets. And their own indexing.
Ontario indexes by two point one percent. The first bracket line moves from fifty-three thousand, eight hundred and ninety-one, to fifty-five thousand and twenty-three. The basic amount goes up by two hundred and seventy-two dollars.
Alberta caps its indexing at two percent. Its first line moves from sixty-one thousand, two hundred, to sixty-two thousand, four hundred and twenty-four.
Saskatchewan indexes by two point six percent. And then adds an extra five hundred dollars to its basic amount. It goes from twenty thousand, three hundred and eighty-one, to twenty-one thousand, four hundred and eleven.
Nova Scotia indexes by three point five percent. Its basic amount rises to twelve thousand, three hundred and fifty.
New Brunswick: two point six percent. Fourteen thousand and nineteen.
Now, the three that stand still.
British Columbia has paused indexing for its brackets and most credits. From twenty twenty-seven to twenty thirty, they stay at twenty twenty-six levels.
Manitoba isn't indexing its brackets or its basic amount either. The lines stay at forty-seven thousand and one hundred thousand.
And Prince Edward Island's basic amount stays at fifteen thousand dollars.
So what is the bigger basic amount worth, province by province?
In Saskatchewan, about one hundred and eight dollars.
In Nova Scotia, about thirty-seven. In Alberta, about thirty-six. In New Brunswick, about thirty-three. In Ontario, about fourteen.
In British Columbia, Manitoba, and Prince Edward Island: zero.
And in B C and Manitoba, where the brackets are frozen, a raise can push more of your income into a higher provincial bracket. That's bracket creep at work.
Now, families. Because some of the biggest numbers aren't in the brackets at all.
The Canada child benefit is recalculated every July. And it's indexed to inflation.
Right now, from July twenty twenty-six to June twenty twenty-seven, the maximum is eight thousand, one hundred and fifty-seven dollars a year for each child under six.
And six thousand, eight hundred and eighty-three dollars for each child from six to seventeen.
The full amount goes to families with adjusted family net income under thirty-eight thousand, two hundred and thirty-seven dollars. Above that, it starts to shrink.
These payments are based on your twenty twenty-five return.
And here's the key for twenty twenty-seven: the payments that start in July twenty twenty-seven will be based on your twenty twenty-six return. So file it on time.
If your child is eligible for the disability tax credit, the child disability benefit can add up to three thousand, four hundred and eighty dollars a year.
And the G S T credit has a new name. Since July twenty twenty-six, it's the Canada Groceries and Essentials Benefit.
Up to six hundred and seventy-nine dollars for a single person. Up to eight hundred and ninety for a couple. Plus up to two hundred and thirty-four for each child under nineteen.
That includes a temporary twenty-five percent increase, set for five years.
Now, your paycheque in January twenty twenty-seven.
C P P: the first earnings ceiling rises to seventy-six thousand, seven hundred dollars. The second one, to eighty-seven thousand, four hundred.
E I: the rate is one dollar and sixty-four cents per one hundred dollars. On up to seventy thousand, eight hundred dollars. A maximum of one thousand, one hundred and sixty-one dollars and twelve cents.
So if you earn above those ceilings, your January paycheque can be a little smaller than your December one.
And for savers: the R R S P dollar limit for twenty twenty-seven is thirty-five thousand, three hundred and ninety dollars.
The T F S A limit for twenty twenty-seven wasn't on canada dot c a yet when we checked. Watch for it.
So here's your twenty twenty-seven checklist.
One. Check your first paycheque in January. C P P and E I start over, with new ceilings.
Two. If you live in B C, Manitoba, or P E I, expect less inflation relief on the provincial side.
Three. Families: file your twenty twenty-six return on time. It sets your child benefit from July twenty twenty-seven.
Four. Check the new Canada Groceries and Essentials Benefit. It's based on your tax return. So again: file.
Five. Update your R R S P plan with the new limit, and your T F S A when it's announced.
So, what did we learn?
One. In twenty twenty-seven, federal brackets and the basic personal amount rise by two point six percent. The rates stay the same.
Two. Same salary means a little less federal tax. A raise that keeps up with inflation means your tax just keeps up too.
Three. Provinces don't move together. Saskatchewan adds an extra five hundred dollars. B C, Manitoba, and P E I keep their basic amounts frozen.
Four. For families, the biggest numbers are the child benefit and the new groceries benefit. And both start with filing your return.
Next on this channel: the benefits your aging parents could be missing. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.strip().split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1)
print(len(lines), sum(len(t.split()) for _, t in lines))
