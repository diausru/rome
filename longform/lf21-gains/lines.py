import json
L = """Leah sold her shares and made eleven thousand, nine hundred and ninety dollars of profit.
Her income tax on that profit: about one thousand, nine hundred and twenty-eight dollars.
If the same eleven thousand, nine hundred and ninety dollars had been fully taxed, like salary or interest, the income tax would be about three thousand, seven hundred and five.
Same money. About half the tax.
And one simple move cut her bill by another five hundred and ninety-three dollars.
By the end of this video, you'll know exactly how a capital gain is taxed in Canada, step by step, with real numbers.
All numbers: twenty twenty-six, Ontario, a seventy thousand dollar salary. Examples, not real people. General information, not advice.
First: what a capital gain actually is.
A capital gain is the profit when you sell something for more than it cost you. Shares, funds, a cottage, a rental property.
The key word is sell. If your shares go up but you keep them, there's nothing to report yet.
For most people, that means shares or funds held in a regular investment account, outside an R R S P.
The gain is taxed in the year you sell. Not the year you bought, and not while the price goes up and down.
And if you sell for less than it cost you, that's a capital loss. We'll come back to that, because it matters.
Now, Leah's numbers.
Leah earns seventy thousand dollars a year in Ontario.
A few years ago, she bought four hundred shares at fifty dollars each. Twenty thousand dollars. Plus a ten dollar commission.
That commission counts. Her cost isn't twenty thousand. It's twenty thousand and ten dollars.
The C R A calls this your adjusted cost base. It's what you paid, plus the costs of buying.
This year, she sells all four hundred shares at eighty dollars each. Thirty-two thousand dollars.
Thirty-two thousand, minus twenty thousand and ten. Her capital gain is eleven thousand, nine hundred and ninety dollars.
Now comes the part that makes capital gains different.
Only half of a capital gain is taxable.
The government calls this the inclusion rate. For twenty twenty-six, it's one half.
You may remember a plan to raise it to two thirds. That increase was cancelled in March twenty twenty-five. The rate stayed at one half.
So of Leah's eleven thousand, nine hundred and ninety dollars, only five thousand, nine hundred and ninety-five dollars is added to her income.
The other half isn't taxed at all.
She reports the sale on Schedule three of her return, and the taxable half goes on line one two seven hundred.
From there, it's taxed like any other income, at her own federal and Ontario rates.
In other words, a capital gain is taxed at about half of your usual rate on extra income.
So let's see the real bill.
Five thousand, nine hundred and ninety-five dollars of extra taxable income, on top of a seventy thousand dollar salary.
Her income tax goes up by about one thousand, nine hundred and twenty-eight dollars.
That's about sixteen percent of her total profit. She keeps about ten thousand and sixty-two dollars.
Now compare. If the same eleven thousand, nine hundred and ninety dollars were fully taxed, the income tax would be about three thousand, seven hundred and five.
She'd keep about eight thousand, two hundred and eighty-five.
Same amount of money. One thousand, seven hundred and seventy-seven dollars less tax, just because it's a capital gain.
At seventy thousand dollars, Leah's rate on extra income is about thirty-one percent. On a capital gain, it works out to about sixteen.
And one more thing: her employer's payroll knows nothing about this sale. So the tax on it usually shows up when she files her return, not on her paycheque.
But here's what most people miss.
There's no single capital gains tax rate. The half that's taxable lands on top of everything else you earned that year.
So the same gain costs different people different amounts.
If Leah's income that year were forty thousand dollars, the tax on the same gain would be about one thousand, one hundred and forty-two.
At one hundred and twenty thousand dollars, about two thousand, six hundred and two.
Same shares. Same profit. The bill more than doubles, depending on the rest of her income.
And because the gain is taxed in the year you sell, the year you choose can matter.
A year with lower income, like a year back at school, on leave, or in early retirement, means a lower rate on the taxable half.
Now, the move that saved Leah another five hundred and ninety-three dollars.
Remember capital losses?
The same year, Leah also owned a stock that had dropped. She'd paid more for it than it was worth now. On paper, a four thousand dollar loss.
She sold it too. Now the loss is real, and it's reported in the same year as her gain.
One warning: if you sell at a loss and buy the same shares right back, the loss can be denied. The C R A calls that a superficial loss, so check the rules first.
Capital losses reduce capital gains. Eleven thousand, nine hundred and ninety, minus four thousand. Her net gain is seven thousand, nine hundred and ninety.
Only half of that is taxable. Her tax drops to about one thousand, three hundred and thirty-five dollars.
Five hundred and ninety-three dollars less, because she reported a loss she'd already had.
One rule: capital losses only reduce capital gains. They can't reduce your salary.
And losses you can't use this year don't disappear. They can be applied against capital gains in other years.
Here's your capital gains checklist.
One. Keep your purchase records, including commissions. That's your adjusted cost base.
Two. Report every sale on Schedule three, gains and losses.
Three. Remember that only half of the gain is taxed, at your own rate.
Four. Before you sell, think about which year the gain will land in, and whether you have losses to use.
And one exception to know about: selling the home you live in is usually different. That's the principal residence exemption, and we covered it in an earlier video.
So, what did we learn?
One. A capital gain is taxed only when you sell.
Two. Only half of it is taxable in twenty twenty-six.
Three. There's no flat rate. Your other income decides what the gain really costs.
Four. Losses reduce gains, this year or in other years.
Next on this channel: why a one hundred thousand dollar salary does not mean one hundred thousand dollars of taxable income. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.strip().split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1)
print(len(lines), sum(len(t.split()) for _, t in lines))
