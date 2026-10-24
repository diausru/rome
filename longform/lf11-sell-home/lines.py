import json
L = """Three people sell a home. Same profit: one hundred and fifty thousand dollars.
Mia owes nothing. Dev owes sixty-five thousand, six hundred and sixty-nine. Lena owes twenty-nine thousand, six hundred and five.
Same profit. Three very different bills. Why?
By the end of this video, you'll know exactly which one you are, and the one form every home seller files, even when the tax is zero.
All numbers: twenty twenty-six, Ontario, single, a ninety thousand dollar salary, no other income. Examples, not real people. To keep it clean, we ignore selling costs and renovations. General information, not advice.
First, the rule behind Mia's zero.
It's called the principal residence exemption. If a home was your principal residence for every year you owned it, the profit from selling it isn't taxed.
A house, a condo, even a cottage can qualify. It has to be a place you, or your family, ordinarily lived in.
Mia bought her house for four hundred and fifty thousand dollars, lived in it the whole time, and sold it for six hundred thousand. The profit is one hundred and fifty thousand.
And the tax on that profit is zero.
There's a common myth here: that you only get this exemption once in your life. You don't. The limit is one property per family unit, for any given year.
But there's a catch, and it's the part most people miss.
Since twenty sixteen, the sale has to be reported on your tax return. On Schedule three, and on Form T two zero nine one.
If the home was your principal residence for every year you owned it, you only fill out the first page.
If you don't report it, the C R A can refuse the exemption. You can ask to fix it afterwards, but a penalty may apply: the lesser of eight thousand dollars, or one hundred dollars for each full month late.
So the tax is zero. The paperwork isn't optional.
What if Mia had sold for less than she paid? A home is personal-use property, so a loss on it can't be claimed.
Now Dev.
Dev bought a house, fixed it up, and sold it ten months later. Profit: the same one hundred and fifty thousand dollars.
Since twenty twenty-three, there's a flipping rule. If you owned a residential property for less than three hundred and sixty-five days in a row, the profit is treated as business income.
Not a capital gain. And the principal residence exemption doesn't apply, even if Dev lived there.
Business income is fully taxable. All one hundred and fifty thousand dollars is added to Dev's ninety thousand dollar salary.
That pushes his income to about two hundred and forty thousand dollars, through the higher brackets we saw in the last video.
Remember that line? Around two hundred thousand, more than four hundred and eighty dollars of every extra thousand goes to tax.
The extra tax: sixty-five thousand, six hundred and sixty-nine dollars. More than forty-three cents of every dollar of profit.
There's no C P P on it here, because Dev's salary already took him past the ceilings.
And the rule cuts one way. If Dev had lost forty thousand dollars on the flip, that loss is treated as nil. It can't reduce his other income.
There are exceptions, for life events. A death in the family. A new child, or a relative joining your household. A separation of at least ninety days.
A serious illness or disability. A threat to your safety. A move that puts you at least forty kilometres closer to work or school. Losing your job against your will. Or insolvency.
The C R A's guide has the full list. If one of these applies, the flip rule doesn't.
Now Lena.
Lena bought a condo eight years ago and rented it out the whole time. She never lived in it. Profit: the same one hundred and fifty thousand dollars.
This isn't a flip, and it isn't a principal residence. It's an ordinary capital gain. And only one half of a capital gain is taxable.
The proposed increase to two-thirds was cancelled, so the rate is still one half.
So seventy-five thousand dollars is added to Lena's income. Her tax: twenty-nine thousand, six hundred and five dollars. About twenty cents of every dollar of profit.
One more thing for rental owners. If Lena claimed capital cost allowance on the condo over the years, selling can trigger a recapture. That amount is added to her income, and it's reported on Form T seven seven six in the year of sale.
Compare Dev and Lena. The same profit. A difference of thirty-six thousand and sixty-four dollars, just from how the profit is classified.
So here's the scoreboard. Mia keeps all one hundred and fifty thousand. Lena keeps one hundred and twenty thousand, three hundred and ninety-five. Dev keeps eighty-four thousand, three hundred and thirty-one.
Three buckets: exempt, capital gain, business income. Which bucket you're in decides everything.
Now the gray zones, where people get caught.
First: you move out and rent the house. Normally, that counts as selling it at market value on the day your use changes.
But you can file a letter with that year's return, electing to be treated as if nothing changed. It's called a subsection forty-five-two election. The property can stay your principal residence for up to four years that way, and the limit can be extended if certain conditions are met.
Second: you rent out part of your home, like a basement suite. Since March twenty nineteen, the election can apply to partial changes too. This one is worth a professional's time.
Third: you own a home and a cottage. Only one can be your principal residence in any given year. If you designate the cottage for some years and the house for others, you file the T two zero nine one, and the form works out the part of the gain that's taxable.
And one small gift: in the year you sell one home and buy another, the plus-one rule can cover both for that year. You must be a resident of Canada in the year you buy.
So what should you do before you sell?
Step one. Count the days. If you've owned the property for less than three hundred and sixty-five days, stop and check the flip rule.
Step two. Ask what the property was for each year you owned it: your home, a rental, or a business. That decides the bucket.
Step three. Keep the paperwork: the purchase, the sale, and the cost of improvements. They set the profit.
Step four. Report the sale on your return for the year you sold, even if the tax is zero.
Different province, different numbers. The buckets come from federal rules, so they apply across Canada. Quebec files its own return, so check there too.
So, what did we learn?
One. A home you lived in is tax-free, but only if you report it.
Two. Owned less than three hundred and sixty-five days, the profit is fully taxed as business income, and a loss counts as nothing.
Three. A rental or investment property is a capital gain, and half of it is taxable.
Four. Moving out, renting, or owning a cottage changes the math. Check before you sign.
Next on this channel: what happens to your paycheque when you get a twenty thousand dollar bonus, and why it feels like the government took half. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1); print(len(lines), 'lines', sum(len(t.split()) for _, t in lines), 'words')
