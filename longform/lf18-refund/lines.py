import json
L = """Mia and Jay work at the same company. Same job. Same seventy thousand dollar salary. Same province.
In the spring, Mia gets a tax refund of three thousand, nine hundred dollars. Jay gets nothing.
Mia celebrates. Jay feels like he did something wrong.
Most Canadians would rather be Mia. Should they?
But here's the truth. They paid exactly the same income tax. To the dollar. Eleven thousand, one hundred and thirty-four dollars each.
So where did Mia's refund come from? And who actually came out ahead? By the end of this video, you'll know, and you'll know how to read your own refund.
All numbers: twenty twenty-six, Ontario, employment income. Examples, not real people. General information, not advice.
First: what a refund actually is.
Most people think a refund is a reward. A bonus from the government for filing.
It isn't. A refund is your own money coming back.
All year, your employer takes income tax off every paycheque and sends it to the C R A. That's tax withheld. It's an estimate.
In the spring, your return calculates your real tax for the year. That's the number that matters.
Then the two are compared. If more was withheld than your real tax, you get the difference back. That's a refund.
If less was withheld, you pay the difference. That's a balance owing.
The C R A even treats the tax already withheld like a refundable credit on your return. It's simply money you've already paid in.
So the size of your refund tells you almost nothing about how much tax you paid. It tells you how far off the estimate was.
Now, back to Mia and Jay.
Both earn seventy thousand dollars in Ontario. Their real tax for twenty twenty-six is the same: eleven thousand, one hundred and thirty-four dollars.
Jay's employer withheld almost exactly that amount. So in the spring, the two numbers match. Refund: zero.
Mia did something different. On her T D one form, she asked her employer to take an extra one hundred and fifty dollars off every paycheque.
Twenty-six paycheques. That's three thousand, nine hundred dollars of extra tax withheld during the year.
Her total withheld: fifteen thousand and thirty-four dollars. Her real tax: still eleven thousand, one hundred and thirty-four.
The difference comes back as a refund. Three thousand, nine hundred dollars. Exactly the money she sent in early.
She didn't pay less tax. She paid more, earlier, and got it back later.
So who came out ahead? On tax, nobody. They paid the same.
But here's the uncomfortable part. Mia lent the government three thousand, nine hundred dollars for up to a year, and got no interest for it.
That's about three hundred and twenty-five dollars a month that Jay could use, save, or invest along the way.
Some people choose a refund on purpose, as a forced savings plan. That can be a fair choice. Just know what it is.
And refunds often happen without anyone asking for them.
Payroll estimates your tax as if each paycheque continued for the whole year.
Start a new job in September, and each paycheque is taxed as if you earned that much for twelve months. The estimate is too high, so a refund is likely.
Deductions and credits your employer doesn't know about, like tuition, medical expenses or donations, push the same way.
Now, a refund that really does mean less tax.
Meet Ava. Same company, same seventy thousand dollar salary.
In twenty twenty-six, she puts ten thousand dollars into her R R S P on her own, from her savings.
Her employer doesn't know. It keeps withholding tax as if she earned seventy thousand with no deduction.
But on her return, the ten thousand comes off her income. Her real tax drops to eight thousand, one hundred and sixty-nine dollars.
So her refund is about two thousand, nine hundred and sixty-five dollars.
This time, the refund does reflect a real saving. But look closely: the saving came from the R R S P deduction, not from the refund itself.
And Ava could get that money during the year instead. With form T twelve thirteen, she can ask the C R A to let her employer withhold less tax.
There are conditions. Past returns must be filed and assessed, any balance must be paid, and the request is made every year. It takes about four to six weeks to process.
And if her employer takes R R S P contributions straight from her pay, she doesn't need the form at all.
Now the other side: owing money.
A balance owing isn't a penalty. It just means not enough was withheld during the year.
It happens with two jobs, a side income, investment income, or pension income with little tax taken off.
But don't ignore it. The C R A charges daily compound interest on unpaid amounts, starting on the ninety-first day of the following year.
So a balance owing costs nothing extra if you pay it on time. Leaving it unpaid is what costs money.
So which is better: a refund, or owing a little?
Mathematically, a small balance owing, paid on time, means you kept your money longer. A big refund means you lent it out for free.
But only if you actually use that money well. If a refund is the only way you save, it's not a bad habit. It's just an expensive one.
Ask yourself one question: if this money had arrived every month instead of all at once, would I have used it better?
The goal is accuracy: withholding that's close to your real tax.
Where this changes. Income-tested benefits, credits, and your province all affect the real tax on your return. Your notice of assessment shows the final numbers.
Here's your checklist.
One. On your return, find two numbers: your total tax withheld, and your real tax.
Two. The difference is your refund or balance owing. That's not the same as your tax bill.
Three. Getting a big refund every year? Check your T D one and any extra tax you asked for.
Four. Big R R S P contributions you make on your own? Look at form T twelve thirteen.
Five. Owe money? Pay it on time to avoid daily interest.
So, what did we learn?
One. A refund is your own money coming back, not a bonus.
Two. Your real tax is set on the return. The refund only measures the gap.
Three. Two people with the same refund can pay different tax. And two people with the same tax can get very different refunds.
Next on this channel: C P P, E I and income tax. What actually comes off your paycheque, line by line. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1); print(len(lines), 'lines', sum(len(t.split()) for _, t in lines), 'words')
