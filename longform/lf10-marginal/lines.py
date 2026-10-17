import json
L = """Three coworkers. Same company. Same one-thousand-dollar raise.
Maya earns sixty-five thousand. She keeps six hundred and forty-three dollars of it.
Jordan earns ninety thousand. He keeps seven hundred and four.
Alex earns one hundred and twenty thousand. Alex keeps five hundred and sixty-six.
Wait. Jordan earns more than Maya, but keeps sixty-one dollars more of the same raise?
By the end of this video, you'll know the real tax rate on your next dollar, and the one decision where that rate quietly changes.
All numbers: twenty twenty-six, Ontario, single, employment income only. Examples, not real people. General information, not advice.
First, the myth that won't die.
A raise can push some of your income into a higher bracket. But only the dollars above the line pay the higher rate. Everything below stays exactly where it was.
So, for an employee like Maya, a raise doesn't shrink your take-home pay. You always keep more than you had.
But the bracket rate isn't the whole story. Because tax isn't the only thing that comes off your next dollar.
So here's the real question. Of your next one thousand dollars, how much actually leaves?
Five things can take a piece.
Federal tax. Ontario tax. The Ontario surtax, once your provincial tax gets big enough. C P P. And E I.
Add them together, and you get your real marginal rate: the share of the next dollar that you don't keep.
Let's walk up the income ladder, one thousand dollars at a time.
At fifty thousand: two hundred and fifty-two dollars of the next thousand go. That's federal tax at fourteen percent, Ontario at five point oh five, plus C P P and E I.
Just past fifty-three thousand, eight hundred and ninety-one, Ontario's rate steps up to nine point one five. At fifty-five thousand, two hundred and ninety-two dollars go.
Just past fifty-eight thousand, five hundred and twenty-three, the federal rate jumps to twenty point five. At sixty thousand, three hundred and fifty-seven dollars go.
That's Maya's zone. Higher tax brackets, and still full C P P and E I on every dollar.
Then something unexpected happens. The line starts going down.
At sixty-eight thousand, nine hundred, E I stops. You've paid the maximum for the year.
At seventy-four thousand, six hundred, regular C P P stops too. Only the smaller C P P two continues, at four percent.
And at eighty-five thousand, C P P two stops as well.
So at ninety thousand, only two hundred and ninety-six dollars of the next thousand go. Jordan's zone. Less than at sixty thousand.
That's the answer to our opening question. Jordan isn't in a lower bracket. Jordan has simply finished paying C P P and E I for the year.
You can actually see this on a pay stub.
Employers take C P P and E I off every pay until you reach the yearly maximum. Then they stop.
For someone paid evenly at ninety thousand, E I runs out roughly in the fall, regular C P P a few weeks later, and C P P two near the end of the year.
So Jordan's last paycheques of the year are bigger. Same salary, same tax bracket. Nothing changed except C P P and E I.
And then in January, the counters reset, and the deductions start again.
Now the line climbs again.
Around ninety-eight thousand, six hundred, the Ontario surtax kicks in. It's a tax on your provincial tax. At one hundred thousand, three hundred and fifteen dollars go.
Past one hundred and seven thousand, seven hundred and eighty-five, Ontario's rate rises to eleven point one six. And the surtax gets a second, bigger step.
Past one hundred and seventeen thousand and forty-five, the federal rate becomes twenty-six percent. At one hundred and twenty thousand, four hundred and thirty-four dollars go. That's Alex.
At one hundred and fifty thousand, Ontario's rate rises again. At one hundred and sixty thousand, four hundred and fifty dollars go.
Past one hundred and eighty-one thousand, four hundred and forty, the federal rate becomes twenty-nine percent. And a quiet extra: your federal basic personal amount starts to shrink. About three more dollars per thousand.
At two hundred and thirty thousand, four hundred and ninety-eight go. And past two hundred and fifty-eight thousand, four hundred and eighty-two, with the top federal rate of thirty-three percent, five hundred and thirty-five.
There are also three small bumps on this line. The Ontario Health Premium rises in short steps, around forty-eight thousand, seventy-two thousand, and two hundred thousand of taxable income. In those stretches, it can add up to one hundred and fifty dollars to that next thousand.
So your marginal rate isn't one number from a table. It's a line with steps, a valley, and a few bumps. And where you stand on it depends on your income this year.
Now, the decision where this really matters.
Say all three put one thousand dollars into an R R S P, and have the room to deduct it.
Maya saves two hundred and ninety-six dollars of tax. Jordan saves two hundred and ninety-six. Alex saves four hundred and thirty-four.
Look at Maya. Her raise lost three hundred and fifty-seven dollars. But her R R S P deduction saves only two hundred and ninety-six.
Why the difference? Because an R R S P deduction lowers your income tax. It doesn't give back C P P or E I.
So there are really two marginal rates. One for earning: everything that comes off the next dollar. And one for deducting: income tax only.
For a raise, a bonus or an extra shift, use the first one. For an R R S P deduction, use the second.
That's why Maya and Jordan save exactly the same on the deduction. Both are in the same federal and Ontario brackets. The C P P and E I difference doesn't count here.
And that's why Alex saves the most. A deduction is worth the most in the years when your income-tax rate is highest.
There's one more lever here, and many people don't know it.
You don't have to deduct an R R S P contribution in the year you make it. You can carry the deduction forward to a later year.
Say you earn fifty thousand this year, and you expect one hundred and twenty thousand next year.
Deduct one thousand dollars this year, and you save about two hundred and seven dollars. Deduct it next year, and you save about four hundred and thirty-four.
Same contribution. More than twice the tax saving, just by choosing the year. You still need the contribution room, of course.
One important limit. These are employee examples with no family benefits.
If you get the Canada Child Benefit, the G S T credit, or other income-tested benefits, a raise can also reduce those. Then your real marginal rate can be higher. And that depends on your own situation.
Same if you're self-employed, or in Quebec. Different rules apply.
So how do you find your own spot on the line?
Step one. Take your income for the year, and find your federal and provincial brackets. The C R A publishes the federal rates, and your province publishes its own.
Step two. Look at your pay stub's year-to-date C P P and E I. If they've stopped, they're no longer part of your marginal rate.
Step three. Add it up. Bracket rates, plus any surtax, plus C P P and E I if you're still paying them. That's roughly what your next dollar costs you.
And if you're close to a step, a few thousand dollars of income or deductions can move you across it. That's when planning pays.
So, what did we learn?
One. A raise only taxes the dollars above each line. You keep more, not less.
Two. Your real marginal rate includes C P P and E I. That's why it can drop when you pass their yearly maximums.
Three. A deduction like the R R S P saves income tax only. Use that rate to judge it.
Four. Check where you stand on the line before you decide on overtime, a bonus, or a contribution.
Next on this channel: what if you sell your home? When the profit is tax-free, and the cases where it isn't. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1); print(len(lines), 'lines', sum(len(t.split()) for _, t in lines), 'words')
