import json
L = """Owen earns one hundred thousand dollars a year.
But when the C R A works out his tax, it doesn't use one hundred thousand. It uses ninety thousand, eight hundred and seventy-three.
And his income tax for the whole year comes to about seventeen thousand, six hundred and twenty-seven dollars. About seventeen and a half percent of his salary.
His coworker earns exactly the same salary, and pays about two thousand, four hundred dollars more.
Same job. Same pay. Different taxable income.
By the end of this video, you'll know the three income numbers on every Canadian tax return, which one the C R A actually taxes, and how to move it.
All numbers: twenty twenty-six, Ontario, employment income. Examples, not real people. General information, not advice. We'll walk through Owen's return, line by line.
First: the three numbers.
Your tax return doesn't have one income. It has three, and each one has a different job.
Line fifteen thousand is your total income. Everything you earned, from every source.
Then some deductions come off. What's left is your net income, on line twenty-three six hundred.
Then a few more deductions can come off. What's left is your taxable income, on line twenty-six thousand.
And that last number is the one the tax brackets apply to.
Think of it as a ladder with three steps. Every step down is money the brackets never see.
So a one hundred thousand dollar salary is where the story starts. Not where the tax starts.
Now, Owen's numbers.
Owen's total income is his salary: one hundred thousand dollars.
First deduction: his R R S P. He contributed eight thousand dollars this year, and he deducts all of it.
Second deduction is one most people never notice. Part of his C P P contributions.
Since the C P P was enhanced, the extra part you pay, and all of C P P two, is a deduction from income. For Owen, that's about one thousand, one hundred and twenty-seven dollars.
So his net income is one hundred thousand, minus eight thousand, minus one thousand, one hundred and twenty-seven. Ninety thousand, eight hundred and seventy-three.
Owen has no other deductions at the next step, so his taxable income is the same: ninety thousand, eight hundred and seventy-three dollars.
Nine thousand, one hundred and twenty-seven dollars of his salary never reaches the tax brackets.
Now, the brackets.
Federal tax is calculated on Owen's taxable income, bracket by bracket. Before credits, that's about fourteen thousand, eight hundred and twenty-five dollars.
But that isn't his federal tax yet.
Then come the credits.
Credits don't reduce your income. They reduce your tax.
Owen's main federal credits: the basic personal amount, sixteen thousand, four hundred and fifty-two dollars. The base part of his C P P. His E I premiums. And the Canada employment amount.
Together, about twenty-two thousand, six hundred dollars of credit amounts. Each one is worth fourteen percent federally.
That takes about three thousand, one hundred and sixty-three dollars off his federal tax.
His federal tax ends at about eleven thousand, six hundred and sixty-two dollars.
Ontario does the same thing with its own brackets and credits. Ontario tax, including the surtax, is about five thousand, two hundred and fifteen. Plus the Ontario Health Premium, seven hundred and fifty.
Total: about seventeen thousand, six hundred and twenty-seven dollars.
Notice what happened. The brackets never saw one hundred thousand dollars. They saw ninety thousand, eight hundred and seventy-three.
His total is seventeen point six percent of his salary.
Measured against his taxable income, it's nineteen point four percent. Either way, far below the roughly thirty cents his last dollars cost him.
Now, his coworker.
Same one hundred thousand dollar salary. Same C P P deduction. But no R R S P.
Her taxable income is ninety-eight thousand, eight hundred and seventy-three dollars.
Eight thousand dollars more of her income reaches the brackets than Owen's, and those are her most expensive dollars.
Her income tax: about twenty thousand and twenty-four dollars.
Two thousand, three hundred and ninety-eight dollars more than Owen, on exactly the same salary.
The only difference is one line on Owen's return: line twenty thousand, eight hundred, his R R S P deduction.
And it isn't too late for her. Unused R R S P room carries forward, so she can still use it in a future year.
Here's why this matters beyond your tax bill.
Each of the three numbers has its own job.
Total income tells the story of what you earned.
Net income is the one many benefits look at. The Canada Child Benefit uses family net income. The O A S clawback is based on net income.
Taxable income is the one the brackets apply to.
Three numbers, three jobs. Mix them up, and you'll get your own tax wrong.
So a deduction that lowers your net income can lower your tax and, in some cases, raise a benefit at the same time.
That's why a deduction and a credit are not the same thing.
A deduction removes income at your top rate. A credit is worth a fixed rate, the lowest one, fourteen percent federally.
For Owen, eight thousand dollars of R R S P deduction saved two thousand, three hundred and ninety-eight dollars. That's about thirty cents a dollar.
Eight thousand dollars of credit amounts would have saved him about one thousand, one hundred and twenty dollars federally.
Where does this number change for you?
More deductions: R R S P contributions, the enhanced C P P, and others that apply only in certain situations.
Deductions between net and taxable income, like net capital losses from other years, the ones we met in the capital gains video.
And credits that don't touch your income at all, but cut the tax at the end.
Every dollar of deduction is worth your top rate. Every dollar of a federal credit amount is worth the lowest rate.
Here's your checklist.
One. On last year's tax return, find lines fifteen thousand, twenty-three six hundred and twenty-six thousand.
Two. Look at the gap between your salary and your taxable income. That's your deductions working.
Three. Check which benefits use your net income.
Four. Before you look at a tax bracket, use your taxable income, not your salary.
So, what did we learn?
One. Your return has three incomes: total, net and taxable.
Two. The brackets apply only to taxable income.
Three. Deductions shrink your income. Credits shrink your tax.
Four. Same salary does not mean same tax.
Next on this channel: you have a side hustle in Canada. What actually gets taxed? Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.strip().split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1)
print(len(lines), sum(len(t.split()) for _, t in lines))
