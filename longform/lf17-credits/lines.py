import json
L = """Three friends each get the same one thousand dollar tax break.
Nina saves eight dollars. Omar saves two hundred and ninety-six. Priya saves four hundred and thirty-four.
Same thousand dollars. Three different results.
Change one word, from deduction to credit, and the results change completely. By the end of this video, you'll know which one is worth more to you, and why.
All numbers: twenty twenty-six, Ontario, employment income. Examples, not real people. General information, not advice.
First: where each one works on your return.
Your return runs in a fixed order. Income first. Then deductions. Then the tax. Then credits.
A deduction comes off your income, before the tax is calculated. An R R S P contribution is the classic example.
A credit comes off the tax itself, after it's calculated.
That one difference in order changes everything.
Now, deductions.
A deduction saves you whatever tax that last thousand dollars of income would have cost. That's your marginal rate.
The higher your income, the higher that rate, and the more a deduction is worth.
Nina earns fourteen thousand dollars. Her tax for the whole year is about eight dollars. So a thousand-dollar deduction saves her eight dollars. There's nothing more to save.
Omar earns sixty-five thousand. The same deduction saves him two hundred and ninety-six dollars.
Priya earns one hundred and twenty thousand. She saves four hundred and thirty-four.
The Department of Finance says it plainly: deductions give bigger savings to people with higher marginal tax rates.
Now, credits.
Most credits on your return are non-refundable. You claim an amount, and it's multiplied by the lowest tax rate.
Federally, that's fourteen percent in twenty twenty-six. In Ontario, five point zero five percent.
So a one thousand dollar credit amount is worth about one hundred and ninety dollars and fifty cents. For Omar, and for Priya. Exactly the same.
A credit doesn't care how much you earn. As long as you owe enough tax to use it.
And that's the catch.
Here's the part most people miss. A non-refundable credit can only bring your tax down to zero. Anything left over is lost.
Nina owes eight dollars. So her thousand-dollar credit amount is worth eight dollars to her. The rest disappears.
For someone with little or no tax, a non-refundable credit and a deduction can both be worth almost nothing.
But there's a third kind: refundable credits.
A refundable credit is paid to you even if you owe no tax at all. The C R A treats the income tax already taken off your paycheques the same way.
That's why low-income Canadians should always file. Refundable credits and many benefits depend on filing a return.
So which is worth more? Let's put it side by side.
For Nina: the deduction, eight dollars. The non-refundable credit, eight dollars. A refundable credit, paid in full.
For Omar: the deduction, two hundred and ninety-six. The credit, one hundred and ninety dollars and fifty cents. The deduction wins.
For Priya: four hundred and thirty-four, against the same one hundred and ninety and fifty. The deduction wins by more.
Once your income is past the first bracket, a deduction is usually worth more than a credit of the same size.
And there's a bonus. A deduction lowers your net income. That number also decides income-tested benefits, like the Canada child benefit and the O A S clawback.
A credit doesn't touch net income at all.
Now, what can you do with this?
One: if you have a choice of timing, take deductions in your higher-income years. R R S P deductions can even be carried forward to a later year.
Two: for couples, many credits can be claimed by either partner. Give them to the partner who has enough tax to use them.
Three: with little or no tax, focus on refundable credits and benefits, and file every year.
Where this changes. Your exact marginal rate depends on your province and your income, and some deductions and credits have their own limits. Your return does the final math.
Here's your checklist.
One. Know your marginal rate: that's what a deduction is worth.
Two. Know the lowest rate: that's what a non-refundable credit is worth.
Three. Check whether you owe enough tax to use your credits.
Four. File every year, even with no income.
So, what did we learn?
One. Deductions come off income. Credits come off tax.
Two. A deduction is worth more as income rises. A credit is worth the same, if you can use it.
Three. Only refundable credits pay you with zero tax.
Next on this channel: why a tax refund doesn't mean you paid less tax. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1); print(len(lines), 'lines', sum(len(t.split()) for _, t in lines), 'words')
