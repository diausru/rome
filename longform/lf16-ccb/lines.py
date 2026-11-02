import json
L = """Sara earns seventy thousand dollars. She has one child, under six. This year, her family gets five thousand, nine hundred and thirty-four dollars of Canada child benefit.
With one change on her tax return, the same family could get six thousand, six hundred and thirty-four. And pay less tax too.
Altogether, about three thousand, six hundred and sixty-five dollars more in one year. Same job. Same child. Same income.
By the end of this video, you'll know exactly how the C C B is calculated, and the legal moves that change it.
All numbers: the C C B year from July twenty twenty-six to June twenty twenty-seven, Ontario taxes, twenty twenty-six rates. Examples, not real people. General information, not advice.
First: how the C C B is calculated.
The Canada child benefit is a tax-free monthly payment for families with children under eighteen.
For July twenty twenty-six to June twenty twenty-seven, the maximum is eight thousand, one hundred and fifty-seven dollars a year for each child under six. That's six hundred and seventy-nine dollars and seventy-five cents a month.
For a child aged six to seventeen, the maximum is six thousand, eight hundred and eighty-three.
But most families don't get the maximum. The amount shrinks as your income rises.
And here's the key. It's not your salary that counts. It's your adjusted family net income, from your tax returns for the year before.
For this benefit year, that's your twenty twenty-five income.
Now, the reduction.
Once adjusted family net income passes thirty-eight thousand, two hundred and thirty-seven dollars, the benefit starts to drop.
With one child, it drops by seven percent of every dollar above that line, up to eighty-two thousand, eight hundred and forty-seven.
With three children, it drops by nineteen percent.
For Sara, at seventy thousand, that's seven percent of thirty-one thousand, seven hundred and sixty-three. A reduction of about two thousand, two hundred and twenty-three dollars.
Eight thousand, one hundred and fifty-seven, minus that reduction: five thousand, nine hundred and thirty-four dollars.
So every extra thousand dollars of net income costs Sara seventy dollars of C C B. And the reverse is also true.
Every thousand dollars you take off your net income gives seventy dollars back. With three children, a hundred and ninety.
Now, the move. Lever one: the R R S P.
An R R S P contribution is a deduction. It lowers your net income, and that's exactly the number the C C B uses.
Say Sara contributes ten thousand dollars to her R R S P, and she has the room.
Her net income drops to sixty thousand. Her C C B rises to six thousand, six hundred and thirty-four. Seven hundred dollars more.
And her income tax drops by about two thousand, nine hundred and sixty-five dollars.
Together: about three thousand, six hundred and sixty-five dollars from one ten-thousand-dollar contribution. And the ten thousand is still hers, in the R R S P.
But here's the timing most families miss. The C C B looks back.
A contribution for twenty twenty-six lowers your twenty twenty-six net income. That changes the C C B paid from July twenty twenty-seven.
So the benefit arrives the following year. And the thresholds are updated every July, so the exact numbers move a little.
With three children in the same income range, the same ten thousand dollars would add about one thousand, nine hundred of C C B, plus the tax saving.
Lever two: other deductions. Child care expenses, union dues, and other deductions also lower net income. Claim every one you're entitled to.
Lever three: file, every year, both of you. The C C B is calculated from both partners' returns.
If one return is missing, the C R A can't calculate the benefit, and payments can stop. Even with no income, file.
Lever four: keep your information current. A new child, a separation, a move, or a change in custody can all change the amount. Tell the C R A when it happens.
Where this changes. Provinces add their own child benefits, with their own rules. Above eighty-two thousand, eight hundred and forty-seven, the reduction rate changes. And a child with a disability may qualify for an extra benefit.
Your exact amount comes from the C R A's calculation, so check it in My Account.
Here's your checklist.
One. Find your adjusted family net income from last year's returns.
Two. If it's between thirty-eight thousand, two hundred and thirty-seven and eighty-two thousand, eight hundred and forty-seven, every deduction also raises your C C B.
Three. Use your R R S P room, and claim child care and other deductions.
Four. Both partners file on time, every year.
So, what did we learn?
One. The C C B uses net income, not salary.
Two. Each dollar of deduction can come back twice: less tax, and more benefit.
Three. The benefit arrives the following July.
Next on this channel: tax credits versus tax deductions, and why the same thousand dollars can be worth very different amounts. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1); print(len(lines), 'lines', sum(len(t.split()) for _, t in lines), 'words')
