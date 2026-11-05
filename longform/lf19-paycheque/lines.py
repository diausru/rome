import json
L = """Dana's first paycheque of the year: two thousand, five hundred and fifty-two dollars.
Her last paycheque of the year: two thousand, eight hundred and six.
Same salary. Same job. No raise. Two hundred and fifty-four dollars more, every two weeks, at the end of the year.
It isn't a mistake. So where does it come from? And why does it disappear again in January?
By the end of this video, you'll be able to read every line on your pay stub, and you'll know exactly when your paycheque gets bigger.
All numbers: twenty twenty-six, Ontario, a ninety thousand dollar salary, paid every two weeks. Examples, not real people. General information, not advice.
First: the four lines.
Dana earns ninety thousand dollars a year. Twenty-six paydays. Each one starts at three thousand, four hundred and sixty-one dollars and fifty-four cents.
Then three things come off. C P P, the Canada Pension Plan: one hundred and ninety-seven dollars and ninety-five cents.
E I, Employment Insurance: fifty-six dollars and forty-two cents.
And income tax, federal and Ontario together: about six hundred and fifty-five dollars.
What's left, two thousand, five hundred and fifty-two dollars, lands in her account.
Two of those lines have a limit. One doesn't. That one difference explains the fall paycheque.
Now, C P P.
In twenty twenty-six, C P P is five point nine five percent of your pay, after a small exemption: the first three thousand, five hundred dollars of the year aren't charged.
It stops at a ceiling: seventy-four thousand, six hundred dollars of earnings. The most an employee pays is four thousand, two hundred and thirty dollars and forty-five cents.
Then there's a second layer, called C P P two. Four percent on earnings between seventy-four thousand, six hundred and eighty-five thousand dollars. At most, four hundred and sixteen dollars.
And here's a detail most people never see: part of your C P P is a deduction on your tax return, and part of it gives you a tax credit. So C P P also lowers your income tax a little.
Now, E I.
In twenty twenty-six, E I is one point six three percent of your pay, outside Quebec.
It stops at sixty-eight thousand, nine hundred dollars of earnings. The most an employee pays is one thousand, one hundred and twenty-three dollars and seven cents.
E I is insurance. It's what pays benefits if you lose your job, have a baby, or get sick, if you qualify.
Now, income tax.
Income tax has no ceiling. Your employer estimates your yearly tax from your pay and your T D one form, and spreads it across every paycheque.
For Dana, that's about six hundred and fifty-five dollars every payday, all year long.
Payroll treats each paycheque as if you'd earn the same amount all year. So if your pay changes mid-year, or a bonus lands, the tax line changes with it.
And if the estimate is off, your tax return settles the difference: a refund, or a balance owing. That was our last video.
So C P P and E I stop. Income tax doesn't. Now watch what happens to Dana's paycheque in the fall.
Here's Dana's year, paycheque by paycheque.
By paycheque number twenty, her earnings pass sixty-eight thousand, nine hundred dollars. E I takes only a partial amount, and then stops for the year.
Paycheque twenty-one: no E I. Her pay goes up by about fifty-six dollars.
Paycheque twenty-two: she passes seventy-four thousand, six hundred. Regular C P P stops. But C P P two starts.
For the next few paycheques, C P P two takes four percent: up to one hundred and thirty-eight dollars and forty-six cents each time.
Then, around eighty-five thousand dollars, C P P two stops too.
Paycheque twenty-six: no C P P. No E I. Only income tax. Two thousand, eight hundred and six dollars and forty cents.
That's the fall raise. Two hundred and fifty-four dollars more than in January.
But it isn't a raise. Dana already paid the full year of C P P and E I earlier. And on January first, the limits reset.
Dana's first paycheque of the new year drops back to about where it started. If you didn't know that was coming, January feels like a pay cut.
Now, the half you never see.
Your employer pays too. For every dollar of C P P Dana pays, her employer pays the same amount. That's another four thousand, six hundred and forty-six dollars and forty-five cents.
For E I, the employer pays one point four times what Dana pays. One thousand, five hundred and seventy-two dollars and thirty cents.
Together, that's about six thousand, two hundred and nineteen dollars a year, on top of her salary, that never shows on her stub.
So a ninety thousand dollar job really costs the employer about ninety-six thousand, two hundred dollars. Worth knowing the next time you compare an employee offer with a contract.
Now, the full year.
Income tax: about seventeen thousand and thirty-four dollars. C P P and C P P two: four thousand, six hundred and forty-six dollars. E I: one thousand, one hundred and twenty-three.
In total, about twenty-two thousand, eight hundred dollars come off ninety thousand. Dana keeps about sixty-seven thousand, one hundred and ninety-seven.
Where this changes.
Earn less than sixty-eight thousand, nine hundred, and you never hit the limits: C P P and E I come off every paycheque, all year.
Work two jobs, and each employer takes C P P and E I separately. If you pay more than the yearly maximum, the extra comes back on your tax return.
Self-employed? You pay both halves of C P P yourself, and E I is optional. And in Quebec, the rules are different.
Here's your checklist.
One. On your stub, find the year-to-date totals for C P P and E I.
Two. Compare them with the yearly maximums. That tells you when your fall raise starts.
Three. Plan for January, when the deductions come back.
Four. Two jobs? Check your tax return for a C P P or E I overpayment.
So, what did we learn?
One. Your pay stub has four lines: gross pay, C P P, E I and income tax.
Two. C P P and E I have yearly limits. Income tax doesn't.
Three. The fall raise is real money, but it's only timing. January takes it back.
Four. Your employer pays as much C P P as you do, and more E I.
Next on this channel: the R R S P with real numbers, and when it actually reduces your tax. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1); print(len(lines), 'lines', sum(len(t.split()) for _, t in lines), 'words')
