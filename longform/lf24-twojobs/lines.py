import json
L = """Lena works two jobs. Together, they pay her seventy-five thousand dollars a year.
Both employers took tax off every single paycheque. All year.
And in the spring, her tax return says she still owes about five thousand and ten dollars.
Nobody made a mistake. Not her employers, and not the C R A.
And two small forms would have fixed almost all of it.
Let's take her year apart, one paycheque at a time.
By the end of this video, you'll know exactly why two jobs so often end in a tax bill, and how to set up your paycheques so it doesn't happen to you.
All numbers: twenty twenty-six, Ontario, employment income, paid every two weeks. Examples, not real people. General information, not advice.
First: how payroll sees you.
Each employer only sees its own job. It has no idea the other one exists.
So each payroll system works out your tax as if that job were your only income for the whole year.
And when you start a job, you fill out a T D one form. That's where you claim your personal tax credits, starting with the basic personal amount.
If you fill out both T D one forms the same way, both employers give you that credit. But you only get it once on your tax return.
Hold on to that. It's half of Lena's problem.
Now, Lena's year.
Job A pays forty-five thousand dollars. Job B pays thirty thousand.
Job A's payroll treats forty-five thousand as her whole income. It withholds about five thousand, two hundred and forty-three dollars over the year.
Job B's payroll treats thirty thousand as her whole income. It withholds about two thousand, four hundred and fifty-two.
Together, about seven thousand, six hundred and ninety-five dollars withheld.
But on her tax return, the C R A adds the two jobs together. Seventy-five thousand dollars of income.
The real income tax on seventy-five thousand: about twelve thousand, seven hundred and five.
Twelve thousand, seven hundred and five, minus seven thousand, six hundred and ninety-five. She owes about five thousand and ten dollars.
That's about one hundred and ninety-three dollars that should have come off every paycheque, and didn't.
So where did the gap come from? Two places.
The first one is the basic personal amount.
Both employers gave her the credit. On her return, she only gets it once. So one of those credits was never real.
The second one is quieter. It's the brackets.
Job B's payroll taxed her thirty thousand dollars as if it were the first thirty thousand she earned. At the lowest rates.
But on her return, that thirty thousand sits on top of the forty-five thousand from Job A. In higher brackets.
Neither payroll could see that. Only the tax return can.
The more your two jobs add up to, the bigger this second gap gets.
Here's what this is not.
It's not that a second job is taxed at a special higher rate. There's no second job tax.
Every dollar is taxed by the same brackets, once your income is added up. The withholding was simply an estimate, and it guessed low.
That's the same idea as a refund or a balance owing. We covered that a few videos ago.
Now, fix number one.
On the T D one for your second job, there's a box: more than one employer or payer at the same time.
If your total income will be more than the credits you already claimed on your other T D one, you tick that box and enter zero for the claim amount.
Then that employer doesn't give you the basic personal amount a second time.
For Lena, Job B's withholding goes up to about five thousand, four hundred and eleven dollars a year.
Her total withheld becomes about ten thousand, six hundred and fifty-four. The bill in the spring drops from five thousand and ten, to about two thousand and fifty.
That's fix number one. Same pay. Same tax. Just a more honest estimate.
Now, fix number two, for the bracket gap.
The same T D one form lets you ask for extra tax to be deducted from every paycheque.
For Lena, about seventy-nine dollars extra per paycheque at Job B would cover the rest.
Then her return in the spring lands close to zero. No surprise bill.
And if she'd rather keep the money during the year, that's her choice. She just needs to set it aside for spring.
Does any of this change how much tax she pays in total? No. It's about twelve thousand, seven hundred and five dollars either way.
The forms only change when she pays it. A little every two weeks, or all at once in the spring.
And if you owe a large amount year after year, the C R A may ask you to pay in instalments. Fixing your T D one is usually the simpler route.
Now, C P P and E I.
Each employer deducts C P P and E I separately, as if it were your only job.
For Lena, Job A takes one point six three percent for E I on forty-five thousand. Job B takes it on thirty thousand.
Together, that's one thousand, two hundred and twenty-two dollars and fifty cents of E I.
But the most an employee pays in twenty twenty-six is one thousand, one hundred and twenty-three dollars and seven cents.
The extra, ninety-nine dollars and forty-three cents, comes back on her tax return.
She doesn't have to apply for it separately. It's worked out when she files.
The same rule applies to C P P. If two employers together take more than the yearly maximum, the overpayment comes back when you file.
Here's your two jobs checklist.
One. Claim your personal amounts on one T D one only.
Two. On the second job's T D one, tick more than one employer, and enter zero.
Three. Ask for extra tax per paycheque if your jobs add up to a higher bracket.
Four. When you file, check for C P P or E I overpayments.
Five. If you skip the extra tax, set the money aside yourself.
So, what did we learn?
One. Each employer withholds as if it's your only job.
Two. Claiming the basic personal amount twice creates a bill.
Three. There's no special tax on a second job. The brackets just add up.
Four. Two forms, set up right, can make your spring bill close to zero.
Next on this channel: the complete Canadian tax year, from your first paycheque to your tax return. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.strip().split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1)
print(len(lines), sum(len(t.split()) for _, t in lines))
