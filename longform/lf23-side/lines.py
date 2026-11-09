import json
L = """Maya made fourteen thousand dollars from photography, on weekends, on top of her full-time job.
Clients paid her by e-transfer. Nobody took a single dollar of tax off.
So next spring, the C R A will want about three thousand, one hundred and fifteen dollars of income tax on it. Possibly plus C P P.
And one simple habit cut that bill by one thousand, one hundred and eighty-six dollars.
By the end of this video, you'll know exactly what gets taxed on a side hustle in Canada, how much, when you pay, and the one number that changes the rules: thirty thousand dollars.
All numbers: twenty twenty-six, Ontario, a seventy thousand dollar salary. Examples, not real people. General information, not advice.
First: what counts.
If you sell a service or a product to make money, regularly, that's business income. Photography, tutoring, deliveries, crafts, freelancing.
It doesn't matter how you're paid. Cash, e-transfer, an app, a platform. It's all income.
And it doesn't matter if you get a slip. Your employer sends you a T four. Your clients usually send you nothing.
Business income is reported on your own return, on a form called the T twenty-one twenty-five, the Statement of Business or Professional Activities.
That's where you show what you earned, and what it cost you to earn it.
If you skip it, the income doesn't disappear. It's just missing from your return.
Now, the number that's actually taxed.
You're not taxed on what you sold. You're taxed on your profit.
Maya's clients paid her fourteen thousand dollars.
To earn it, she spent four thousand: editing software, website hosting, printing, and driving to shoots.
Fourteen thousand, minus four thousand. Her profit is ten thousand dollars.
That ten thousand is added to her income, on top of her seventy thousand dollar salary.
The expenses have to be real, and they have to be for earning the business income. Keep every receipt. The C R A can ask to see them.
Now, the bill. Here's what the profit really costs.
Ten thousand dollars of profit, on top of a seventy thousand dollar salary in Ontario.
Her income tax goes up by about three thousand, one hundred and fifteen dollars. About thirty-one percent of her profit.
Because a side hustle sits on top of your job, it's taxed at your highest rate. Every dollar of it.
So the same side hustle costs different people different amounts.
If Maya's job paid forty-five thousand, the tax on the same ten thousand dollars of profit would be about two thousand and eighty-three dollars.
If her job paid one hundred and ten thousand, about three thousand, six hundred and eighty-nine.
Same photos. Same clients. Your salary decides the rate on your side hustle.
Now, the receipts.
If Maya had forgotten her expenses and reported the full fourteen thousand, the tax would be about four thousand, three hundred and one.
Tracking four thousand dollars of expenses saved her one thousand, one hundred and eighty-six dollars.
That's the habit. Not a trick. Just records.
A shoebox works. A spreadsheet works. What matters is that every expense has a receipt, and a business reason.
Now, the surprise most people get.
On a paycheque, tax comes off every two weeks. On a side hustle, nothing comes off.
So the whole bill shows up at once, when you file. For Maya, about three thousand, one hundred and fifteen dollars.
If she's already spent the money by April, that's a balance owing she can't pay. That's how a good year turns into a stressful one.
The simple fix: set money aside as you earn it. For Maya, that's about two hundred and sixty dollars a month.
Then there's C P P. This one catches a lot of people off guard.
When you work for someone, your employer pays half of your C P P, and you pay the other half.
When you work for yourself, there's no employer. So on self-employment income, you pay both halves yourself.
How much depends on how much C P P you already paid through your job. If your job already got you to the yearly maximum, there may be little or nothing left to pay.
But don't assume. Check it on your return before you spend the money.
Now, the dates.
If you or your spouse had self-employment income, you have until June fifteenth to file your return.
But here's the catch. Any balance you owe is still due on April thirtieth. Interest starts after that, even though the return isn't late.
And if you owe tax year after year, the C R A may ask you to pay in instalments. The due dates are March fifteenth, June fifteenth, September fifteenth and December fifteenth.
And now, the thirty thousand dollar line.
G S T and H S T. Sales tax.
If your sales stay at or under thirty thousand dollars, in a single calendar quarter and over the last four quarters in a row, you're what the C R A calls a small supplier. You don't have to register.
Go over thirty thousand, and you have to register, start charging G S T or H S T, and send it to the C R A. Once you're required to, you have twenty-nine days to register.
Maya, at fourteen thousand, is a small supplier.
But if her photography grows to three thousand dollars a month, she would cross the line in less than a year. That's the moment to watch.
You can also register voluntarily. Then you charge the tax, but you may be able to claim back the G S T or H S T you paid on business expenses.
Registering also means filing G S T or H S T returns. It's extra paperwork, so decide on purpose.
Here's your side hustle checklist.
One. Report all of it, slip or no slip, on form T twenty-one twenty-five.
Two. Keep every receipt. You're taxed on profit, not sales.
Three. Set aside money every month. Nobody withholds it for you.
Four. Remember April thirtieth for payment, even if you file in June.
Five. Watch the thirty thousand dollar line for G S T and H S T.
So, what did we learn?
One. Side hustle profit is taxable, however you're paid.
Two. It's taxed at your top rate, because it sits on top of your job.
Three. Expenses reduce the bill, but only with records.
Four. Nothing is withheld, so plan for the bill, and for C P P.
Next on this channel: what happens when you work two jobs in Canada. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.strip().split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1)
print(len(lines), sum(len(t.split()) for _, t in lines))
