import json
L = """Priya earns seventy-five thousand dollars a year in Toronto. This year, her income tax is twelve thousand, seven hundred and five dollars.
One number on her return. But it isn't one tax. It's two taxes, set by two different governments.
So here's the question. Out of every dollar of income tax Priya pays, how much goes to Ottawa, and how much goes to Ontario?
If you guessed half and half, you're not even close.
And there's a second surprise. If Priya moved to Calgary or Vancouver tomorrow, one of those two taxes wouldn't change by a single dollar. By the end of this video, you'll know which one, and why.
All numbers: twenty twenty-six, single, employment income only, no other deductions. Examples, not real people. General information, not advice.
First: who actually collects your tax.
Canada has two levels of government that tax your income. The federal government, and your province or territory.
Each one sets its own rules. Its own brackets, its own rates, its own credits.
But you don't file two returns. Outside Quebec, the C R A collects both taxes, on one return.
Your federal tax is worked out on the return itself. Your provincial tax goes on a separate form, called Form four twenty-eight. In Ontario, it's the O N four twenty-eight.
The C R A collects the money for the provinces and territories, under tax collection agreements between the two levels of government.
Quebec is the exception. If you live in Quebec, you file a second return, with Revenu Québec, for your provincial tax.
Your paycheque works the same way. Your employer takes off federal and provincial tax together, using the province where you work. That's why you fill out a federal T D one, and sometimes a provincial one too.
Now, the split.
Both taxes start from the same number: your taxable income. For Priya, that's her salary, minus a small deduction for part of her C P P contributions.
Then each government applies its own brackets.
On the federal side: fourteen percent in the first bracket, then twenty point five percent above fifty-eight thousand, five hundred and twenty-three dollars.
On the Ontario side: five point zero five percent in the first bracket, then nine point one five percent above fifty-three thousand, eight hundred and ninety-one.
Then each side subtracts its own credits, like the basic personal amount, at its own lowest rate.
Here's the result. Federal tax: eight thousand, two hundred and fifty-nine dollars. Ontario: four thousand, four hundred and forty-six.
So about two thirds of Priya's income tax is federal. About one third is Ontario's.
Per month, that's about six hundred and eighty-eight dollars federal, and three hundred and seventy for the province.
And inside the Ontario part, there's a line many people never notice: the Ontario Health Premium. Seven hundred and fifty dollars of her four thousand, four hundred and forty-six.
It isn't a separate bill. It's charged through the tax return, based on taxable income, on the provincial side.
Now, the second surprise.
What if Priya moves? Same job, same seventy-five thousand dollar salary.
Your provincial tax for the year depends on where you lived on December thirty-first.
In Alberta, her provincial tax would be four thousand and ten dollars. In British Columbia, three thousand, six hundred and sixty-one.
And her federal tax? Eight thousand, two hundred and fifty-nine. In Ontario, in Alberta, in British Columbia. Exactly the same.
That's the answer to the opening question. Outside Quebec, your federal tax doesn't depend on your province. Same income, same federal brackets, same federal credits.
The part that moves is the provincial part. It's the only line a move can change.
And here, it's the smaller line. The gap between these three provinces is less than eight hundred dollars, on a tax bill of about twelve thousand.
Quebec works differently again. Quebec residents get a federal reduction called the Quebec abatement: sixteen point five percent of basic federal tax.
It is compensation to Quebec for opting out of certain federal programs, set up back in the nineteen sixties.
But here's what most explanations skip. The split isn't fixed. It changes as your income grows.
At forty thousand dollars in Ontario: federal two thousand, six hundred and ninety-one. Ontario one thousand, six hundred and seventy-one.
At one hundred and fifty thousand: federal twenty-five thousand, three hundred and two. Ontario fourteen thousand, six hundred and eight.
At two hundred and fifty thousand: federal fifty-three thousand, five hundred and twenty-four. Ontario thirty-four thousand, one hundred and sixty-one.
Federal stays the bigger share, around sixty to sixty-five percent. But at higher incomes, Ontario's share climbs.
The reason is the Ontario surtax. It's an extra tax on the Ontario tax itself, once that tax passes set amounts. At one hundred and fifty thousand dollars, it adds two thousand, five hundred and eleven.
So the higher your income in Ontario, the bigger the province's slice of your bill.
Now, what can you actually do?
You can't choose which government taxes you. But a deduction lowers both taxes at once, because both start from taxable income.
If Priya puts one thousand dollars into her R R S P, and she has the room, her federal tax drops by about two hundred and five dollars, and her Ontario tax by about ninety-one.
That's about two hundred and ninety-six dollars in total. The federal side does most of the work.
Credits are different. A federal credit lowers your federal tax. A provincial credit lowers your provincial tax. Each side has its own list, on its own form.
So when you file, don't stop at the federal side. Check the provincial form for credits that apply to you.
And if you move during the year, remember the December thirty-first rule. Your payroll may have used your old province's tables. The difference is settled when you file.
Here's your checklist.
One. On your return, find two numbers: your net federal tax and your provincial tax. Now you know who gets what.
Two. Make sure your employer uses the right province, especially after a move.
Three. Before you file, check the provincial form for credits, not just the federal ones.
Four. If you live in Quebec, expect two returns, and the abatement on your federal one.
So, what did we learn?
One. Your income tax is two taxes on one return, collected by the C R A, except in Quebec.
Two. For Priya, about two thirds is federal, and one third is Ontario's, health premium included.
Three. Outside Quebec, the federal part doesn't change when you move. Only the provincial part does.
Four. A deduction cuts both taxes. A credit cuts only its own side.
Next on this channel: tax credits versus tax deductions, and why a one thousand dollar deduction and a one thousand dollar credit are worth very different amounts. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1); print(len(lines), 'lines', sum(len(t.split()) for _, t in lines), 'words')
