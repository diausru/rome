import json
L = """She takes home nine thousand eight hundred dollars a month. And every single Monday, one thousand dollars goes into her T F S A.
Sounds like the most responsible person you know, right?
Here's the problem. If she keeps doing exactly that, sometime in twenty twenty-seven the C R A starts charging her one percent. Every month.
This story is based on a real situation a Canadian shared online. We changed the name and some numbers. This is general information, not tax advice.
But by the end of this video, you'll know exactly what she should do, and what you'd do in her place.
Let's call her Maya. Maya is twenty-seven, she lives in Mississauga, and she works two good jobs. One during the day, one on the side.
No kids, single, no car.
After tax, both jobs together put about nine thousand eight hundred dollars a month into her account. That's a great income at twenty-seven.
Her goal is simple: keep all her spending around four thousand five hundred a month.
Rent is fifteen hundred, because she has roommates. But every month, she goes over.
Eating out. Shopping. The little things that never feel big on the day you buy them.
So she did what a lot of smart people do. She opened a T F S A and set up an automatic transfer. One thousand dollars, every Monday.
And honestly? That part is great. Paying yourself first is the single best habit in this whole story.
But she wrote that she still feels like she's not using her income to its full potential. And she's right. Just not for the reason she thinks.
Because a thousand a week is fifty-two thousand dollars a year. And a T F S A has a ceiling.
So the real question isn't how do I invest. It's this: when does the room run out, and what happens the week after?
Here's what the rules say. For twenty twenty-six, the T F S A dollar limit is seven thousand dollars.
But room you never used doesn't disappear. It carries forward.
Your room is this year's limit, plus unused room from past years, plus anything you withdrew last year.
And if you go over? Any excess amount in your T F S A is taxed at one percent per month.
It's calculated on the highest excess in your account that month. Not the average. The highest.
So let's do Maya's math. If you're a resident of Canada, your room starts to build the year you turn eighteen.
Maya turned eighteen in twenty seventeen.
Add up every limit from twenty seventeen to twenty twenty-six. Five thousand five hundred, twice. Then six thousand for four years. Six thousand five hundred. And seven thousand for three years.
Total: sixty-two thousand five hundred dollars of room, if she never contributed before this year.
In twenty twenty-six she puts in fifty-two thousand. That leaves ten thousand five hundred.
On January first, twenty twenty-seven, she gets a new year of room. The C R A announces each new limit, so for this example we'll use seven thousand.
That's seventeen thousand five hundred of room for all of twenty twenty-seven.
At about four thousand three hundred and thirty-three a month, that's her thousand a week, the room is gone by the start of May. In May, she's over.
And if nobody notices until December, the excess climbs to thirty-four thousand five hundred dollars.
One percent of the highest excess, every month from May to December, adds up to about one thousand five hundred and forty-seven dollars.
Paid on money that was supposed to be tax-free.
And here's the sneaky part. The T F S A information in your C R A account is only updated once a year, in the spring. It doesn't know what you put in last month.
And if you save at more than one bank, each bank only sees its own deposits. Only you see the whole picture.
But the T F S A isn't the only surprise coming for Maya. There's a second trap, and it's sitting on her paycheques.
When you start a job, you fill out a T D one form. Each employer withholds tax as if that job were your only income.
The C R A says it plainly: you can't claim tax credits on more than one T D one form if you earn more than the credits you claim.
Or your employers may not take enough tax from your pay, and you can end up with a large, unexpected amount owing.
Two good jobs. Two employers. One surprise bill in April.
So here's the fix, step by step.
Step one. Fix the T D one at the second job. Don't claim the credits twice, and fill out a new T D one to ask that employer to deduct extra tax from each pay.
Step two. Before the next Monday transfer, check your room, and keep your own log of every deposit you make this year, at every bank.
Step three. If Maya wants to buy a home one day, she can open a First Home Savings Account.
The room is eight thousand dollars a year. Contributions are deductible, like an R R S P. And a qualifying withdrawal to buy a first home is tax-free.
But the room only starts in the year she opens the account. Waiting costs her room.
Step four. At her income, look hard at the R R S P.
New R R S P room each year is eighteen percent of last year's earned income, up to thirty-three thousand eight hundred and ten dollars for twenty twenty-six.
Step five. Once the T F S A, the F H S A and the R R S P are handled, anything left can go to a regular investment account. Just know that growth there is taxable.
Let's see why step four matters.
Say Maya moves ten thousand dollars of her savings from the T F S A plan into her R R S P instead.
An R R S P contribution lowers her taxable income. At an illustrative forty percent marginal rate, that's roughly four thousand dollars back.
Same ten thousand saved. But four thousand of it came back from the C R A. Your real rate depends on your income and your province, so check yours before you decide.
Now put it side by side. Without the fix: about one thousand five hundred and forty-seven dollars of excess tax, and a surprise bill in April.
With the fix: no excess tax, no surprise, and about four thousand dollars back from the R R S P.
So what can you steal from Maya's story?
One. Automatic saving is a superpower. Keep it.
Two. The T F S A has a ceiling, and only you are tracking how close you are.
Three. Two jobs means two T D one forms. Fix the second one before April fixes it for you.
Now I want to hear from you. If you had five thousand dollars left over every month, where would the first dollar go? F H S A, R R S P, or T F S A? Tell me in the comments.
Next week: her tax preparer made one mistake, and she got a twenty thousand dollar bill. Subscribe, so you don't miss it."""
lines = [[f'L{i+1}', t] for i, t in enumerate(L.split('\n'))]
json.dump(lines, open('lines.json', 'w'), indent=1); print(len(lines), 'lines', sum(len(t.split()) for _, t in lines), 'words')
