import json
L = """Ten thousand dollars from the same R R S P. Taken out at sixty-two, the tax is about two thousand and fifty-five dollars.
Taken out at seventy-two, it can cost four thousand, seven hundred and one.
Same person. Same money. More than double the cost.
The difference is a window that opens when you retire, and closes for good a few years later. Most people walk right past it.
By the end of this video, you'll know when your window is open, how much to take out, and the one mistake that wipes out the benefit.
All numbers: twenty twenty-six rates, Ontario, a single person. Examples, not real people. General information, not advice.
First: what the window is.
Meet Ellen. She retired at sixty-one. She has R R S P savings and no workplace pension. She plans to start O A S later.
So for a few years, Ellen has almost no taxable income. No salary. No pension yet. Only what she chooses to take out.
That's the window. Low income, low tax brackets, and nobody forcing her to take anything.
Now, why waiting can cost more.
An R R S P can't stay an R R S P forever. It has to be closed by the end of the year you turn seventy-one. Most people move it into a R R I F.
And a R R I F comes with a rule: a minimum amount has to come out every year, set by your age.
Now picture Ellen at seventy-two. Her R R I F minimum, plus her C P P, plus her O A S, all arrive in the same years.
Say her net income is one hundred thousand dollars. What does the next ten thousand cost her?
Income tax: about three thousand, two hundred and one dollars. That's her federal and Ontario brackets.
And because she's above ninety-five thousand, three hundred and twenty-three, the O A S clawback takes fifteen percent more. One thousand, five hundred dollars.
Total: four thousand, seven hundred and one dollars. Almost half of that ten thousand.
Now the window.
Ellen at sixty-two takes forty thousand dollars out of her R R S P. That's her whole income for the year.
The tax on all forty thousand: about five thousand, one hundred and eleven dollars. Twelve point eight percent on average.
And the next ten thousand at that level? About two thousand and fifty-five. Mostly the lowest federal and Ontario brackets.
So the same ten thousand dollars costs two thousand and fifty-five in the window, and four thousand, seven hundred and one later. A difference of two thousand, six hundred and forty-six.
If Ellen does this for ten years, she moves four hundred thousand dollars out of her R R S P at those low rates, before the minimums and pensions stack up.
But here's the trap. If the window is good, why not take everything at once?
Because the brackets work per year. Say Ellen takes one hundred thousand dollars in a single year.
The tax: about twenty-one thousand, five hundred and twenty-one.
Spread over two years, fifty thousand each, the same hundred thousand costs about fourteen thousand, three hundred and thirty-two.
Taking it in one shot costs more than seven thousand dollars extra. The window rewards steady amounts, not one big withdrawal.
So how much each year? A simple target: fill the lowest brackets, and stop.
In Ontario, the first provincial bracket ends at fifty-three thousand, eight hundred and ninety-one. The first federal bracket ends at fifty-eight thousand, five hundred and twenty-three.
Taking out up to about there keeps each dollar in the lowest rates. Above that, every extra dollar is taxed more.
And the money doesn't have to be spent. If Ellen doesn't need it, she can move it into her T F S A, if she has the room.
Inside the T F S A, it grows tax-free, and later withdrawals don't count as income, so they don't touch her O A S.
There's one more payoff. A smaller R R I F at seventy-two means smaller minimums, and a better chance of staying under the O A S line.
And if Ellen had a spouse, from sixty-five, R R I F payments can be split on paper too. That spreads the income across two sets of brackets.
Where this changes. These numbers leave out credits like the age amount and the pension income amount, so real bills can be a bit lower.
With a very low income, withdrawals can reduce income-tested benefits like the Guaranteed Income Supplement. That changes the math.
And returns, health, and how long you'll need the money all matter. A tax professional can run your own numbers.
Here's your checklist.
One. Find your window: the years between your last paycheque and your pensions and R R I F minimums.
Two. Each year, take out enough to fill the low brackets. Not much more.
Three. Don't take it all in one year.
Four. Move what you don't need into your T F S A, if you have room.
Five. Plan the window together with your C P P and O A S start dates.
So, what did we learn?
One. The same R R S P dollar can cost twice as much tax later.
Two. The years right after you retire are the cheapest years to take it out.
Three. Steady amounts beat one big withdrawal.
Four. The T F S A keeps the money growing without touching your O A S.
Next on this channel: the Canada child benefit, and how the way you file can change what your family receives. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1); print(len(lines), 'lines', sum(len(t.split()) for _, t in lines), 'words')
