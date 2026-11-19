import json
L = """Every month, Maya sends her mother five hundred dollars. By December, that's six thousand dollars.
And the tax credit for all of it: zero.
Same daughter. Same six thousand dollars. One word changes zero into about one thousand, two hundred and forty-seven dollars.
And that word has nothing to do with money.
Today: what actually happens to your taxes when you support your parents. And why most people get this rule backwards.
By the end, you'll know exactly what that word is, how much it's worth, and the one line that can be worth almost twice as much.
All numbers: the twenty twenty-five tax year, federal amounts, Ontario. Examples, not real people. General information, not advice.
First, the mistake.
A lot of people think that if you pay for a parent's rent, groceries, or bills, you can claim them. Money alone doesn't do it.
The credits for supporting a family member depend on who that person is, and on their situation. Not on how much you sent.
The C R A doesn't ask how much you sent. It asks a different question.
Does your parent have an impairment that makes them depend on you?
That's the word. Impairment.
Now, the credit that changes everything.
It's called the Canada caregiver amount for other infirm dependants age eighteen or older. Line thirty thousand, four hundred and fifty.
Here's who it's for.
The person is eighteen or older. They have a mental or physical infirmity. And because of it, they depend on you for support for a considerable period of time.
A temporary illness or an injury doesn't count.
And they have to be family. Your parent or grandparent. Or your child, grandchild, brother, sister, aunt, uncle, niece, or nephew. Your spouse's family counts too.
For parents and grandparents, the C R A is clear: no impairment, no claim on this line.
Maya's mother is seventy-four. Over the last two years, her arthritis has gotten worse, and she now depends on Maya for help every day.
So Maya can look at this credit.
Now, how much is it worth?
For twenty twenty-five, the maximum amount is eight thousand, six hundred and one dollars per dependant.
But it isn't a deduction. It's a non-refundable credit.
A deduction lowers your income. A credit lowers your tax directly. And non-refundable means it can bring your tax down to zero, but not below.
For twenty twenty-five, most federal credits are worth fourteen and a half percent. That's because the lowest federal rate dropped from fifteen to fourteen percent in the middle of the year.
So eight thousand, six hundred and one dollars, times fourteen and a half percent.
About one thousand, two hundred and forty-seven dollars off Maya's federal tax.
But there's a condition on the parent's side too.
The amount gets smaller as your parent's own net income goes up.
Net income means line twenty-three thousand, six hundred of their return. Or what it would be, if they didn't file one.
And if their net income is twenty-eight thousand, seven hundred and ninety-eight dollars or more, it's gone.
In this example, Maya's mother has a small pension, and we assume Maya gets the full amount.
Now, what if Maya has a brother? And they both help their mother?
They can split the claim. But together, they can't claim more than the maximum.
So if they split it in half, each one claims four thousand, three hundred dollars and fifty cents. And each one saves about six hundred and twenty-four dollars.
Not double. The same amount, shared.
And one more rule. If your parent is already claimed on line thirty thousand, three hundred, the spouse line, or on line thirty thousand, four hundred, nobody can use this caregiver line for them.
So far: money alone gets you nothing. An impairment and real dependence get you up to about twelve hundred dollars.
But there's a bigger amount. And a trap that blocks it.
If you're single, and your parent lives with you, there's another line. The amount for an eligible dependant. Line thirty thousand, four hundred.
To use it, you don't have a spouse or common-law partner, or you're separated and not supporting each other.
And you lived with your parent, in a home you maintained. A parent who was only visiting doesn't count.
For twenty twenty-five, the maximum is sixteen thousand, one hundred and twenty-nine dollars. Almost twice the caregiver amount.
Now, the trap.
This amount is reduced by your parent's net income. So a parent with a pension can shrink it fast.
Only one claim on this line per household. Even if more than one person could qualify.
And you can't claim the same person on both lines. It's this line, or the caregiver line. Not both.
So Maya, who lives alone and whose mother lives across town, uses the caregiver line.
Next: your province.
Some provinces have their own version of this credit. And the rules aren't always the same as the federal ones.
In Ontario, for twenty twenty-five, a relative with an impairment can qualify whether or not they live with you.
In Alberta, you or someone else had to keep a home where you and that person ordinarily lived.
Same family. Different province. Different answer.
In Ontario, the net income limit for that relative is also different. For twenty twenty-five, it's twenty-six thousand, five hundred and sixty-two dollars.
So check your own province before you assume.
Now, the money you spent.
If you paid medical expenses for a parent who depended on you for support, you may be able to claim them too. That's line thirty-three thousand, one hundred and ninety-nine.
Only the part nobody paid you back for.
And what if you missed all of this in past years?
You can ask the C R A to change a past return. Online, ReFILE covers the twenty twenty-two to twenty twenty-five returns.
So here's Maya's checklist. And yours.
One. Ask: does my parent have an impairment that makes them depend on me? Not just: do I send money?
Two. Check their net income. Under twenty-eight thousand, seven hundred and ninety-eight dollars for twenty twenty-five.
Three. Single and living together? Compare line thirty thousand, four hundred with the caregiver line.
Four. Talk to your siblings. Split the claim, but never past the maximum.
Five. Check your province. And keep your parent's medical receipts.
So, what did we learn?
One. Money you send a parent isn't a credit by itself.
Two. The caregiver credit is about impairment and dependence. Up to eight thousand, six hundred and one dollars for twenty twenty-five.
Three. That amount is worth about fourteen and a half percent. Around one thousand, two hundred and forty-seven dollars.
Four. Living together and being single can open a bigger line. But only one, and only once per household.
Next on this channel: the benefits your aging parents could be missing. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.strip().split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1)
print(len(lines), sum(len(t.split()) for _, t in lines))
