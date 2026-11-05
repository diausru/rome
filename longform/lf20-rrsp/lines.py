import json
L = """Five people put the same ten thousand dollars into an R R S P.
Ben gets back eight hundred and fifty-three dollars. Marc gets back four thousand, four hundred and seventy-nine.
Same deposit. More than five times the tax saving.
And here's the strange part: Kate earns thirty-five thousand dollars more than Ravi, but saves only fifty-nine dollars more.
One of them would have saved more by waiting. And one could lose the whole saving when the money comes out.
By the end of this video, you'll know exactly when an R R S P cuts your tax, by how much, and when it doesn't.
All numbers: twenty twenty-six, Ontario, employment income, a ten thousand dollar R R S P deduction. Examples, not real people. General information, not advice.
First: what an R R S P deduction actually does.
An R R S P contribution doesn't give you a fixed refund. You deduct it from your income, on line two oh eight hundred of your return.
So it removes your top dollars of income. And your top dollars are taxed at your highest rate.
That's why the same deposit saves different people very different amounts. The saving is your tax on the last ten thousand dollars you earned.
How much can you put in? Your deduction limit is generally eighteen percent of last year's earned income, up to a yearly maximum.
For twenty twenty-six, that maximum is thirty-three thousand, eight hundred and ten dollars. A pension plan at work lowers your room.
And room you don't use carries forward to future years. You'll find your number on your notice of assessment.
For example, if Ravi earned seventy-five thousand dollars last year, eighteen percent gives him thirteen thousand, five hundred dollars of new room. Marc, at one hundred and sixty thousand, gets twenty-eight thousand, eight hundred.
Go over your limit, and you may have to pay tax on the excess. So check your number before you contribute.
Now, the five people.
Ben works part-time and earns twenty-two thousand dollars. Ella earns forty-five thousand. Ravi, seventy-five thousand. Kate, one hundred and ten thousand. Marc, one hundred and sixty thousand.
Each one deducts ten thousand dollars.
Ella saves two thousand and fifty-five dollars. About twenty-one cents on every dollar she put in.
Ravi saves three thousand, one hundred and fifteen. About thirty-one cents.
Kate saves three thousand, one hundred and seventy-four. Almost exactly the same as Ravi.
Marc saves four thousand, four hundred and seventy-nine. Almost forty-five cents on the dollar.
And Ben saves eight hundred and fifty-three dollars. That's every dollar of income tax he paid all year.
Let's start with the surprise.
Why do Ravi and Kate save almost the same, when Kate earns thirty-five thousand dollars more?
Because tax rates don't rise smoothly. They rise in steps called brackets.
Ravi's last ten thousand dollars and Kate's last ten thousand dollars happen to sit in steps with nearly the same combined federal and Ontario rate.
So for both of them, the deduction is worth about thirty-one cents on the dollar.
Marc's top dollars sit in much higher steps. That's why the same deposit is worth almost forty-five cents to him.
The lesson: your salary doesn't tell you what an R R S P is worth. Your top rate does.
Now, Ben.
Ben's whole income tax for the year was eight hundred and fifty-three dollars. A ten thousand dollar deduction wipes it out.
But most of that deduction is wasted. He can't get back tax he never paid.
Here's the part most people miss.
You don't have to deduct your contribution in the year you make it.
Unused contributions carry forward. You can deduct them in a later year, up to that year's limit.
So let's meet one more person: Noor.
Noor earns forty-five thousand dollars today, and she expects to earn about ninety thousand in a couple of years.
If she deducts ten thousand dollars now, she saves two thousand and fifty-five.
If she contributes now, but saves the deduction for the year she earns ninety thousand, she saves two thousand, nine hundred and sixty-five.
Same contribution. Same money already invested in the plan. Nine hundred and ten dollars more, just by choosing when to deduct.
For Ben, the same idea works: keep the deduction for a year when he pays real tax.
And contributing doesn't hurt him. The money still goes into the plan and gets invested. He just shouldn't rush the deduction.
On your return, this is tracked on Schedule seven. Whatever you don't deduct shows up next year as unused contributions available to deduct.
Now, the other half of the deal.
An R R S P doesn't make tax disappear. It moves it.
When you take money out, the full amount is added to your income for that year. Tax is withheld when you withdraw, and your return settles the rest.
Take Kate. Her ten thousand dollar deduction saved three thousand, one hundred and seventy-four dollars.
Say she withdraws that ten thousand later, in a year when her income is about forty-five thousand. As an example, tax on it would be roughly two thousand and eighty-three.
She comes out about one thousand and ninety-one dollars ahead on tax.
But if she pulls it out in a year she still earns one hundred and ten thousand, tax on it would be about three thousand, six hundred and eighty-nine.
That's more than she saved in the first place.
Same ten thousand dollars. The only thing that changed is the year it came out.
So when does an R R S P actually reduce your tax?
When your rate on the day you deduct is higher than your rate on the day you withdraw.
High income now, lower income later: it works. Low income now, higher later: deduct later, or think twice.
Here's your R R S P checklist.
One. Find your deduction limit on your notice of assessment.
Two. Know your top rate this year, not just your salary.
Three. Low income this year? Contribute if you like, but you can save the deduction for later.
Four. Plan withdrawals for low-income years.
So, what did we learn?
One. An R R S P saves tax at your top rate, not a fixed amount.
Two. You choose when to deduct, and that choice can be worth hundreds of dollars.
Three. It's a deferral. The tax comes back when the money comes out.
Four. It pays off when your rate today is higher than your rate later.
Next on this channel: capital gains tax in Canada, with a real example. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.strip().split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1)
print(len(lines), sum(len(t.split()) for _, t in lines))
