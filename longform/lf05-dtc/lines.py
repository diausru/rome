L = [
("T1", "The disability tax credit isn't a cheque. It's an amount that cuts the tax you owe."),
("T2", "For twenty twenty-five, it's ten thousand, one hundred and thirty-eight dollars. At the federal rate of fourteen and a half percent, that's about one thousand, four hundred and seventy dollars off federal tax."),
("T3", "For a child under eighteen, a supplement adds five thousand, nine hundred and fourteen. Sixteen thousand and fifty-two in total."),
("T4", "And if you qualified in past years, the CRA can go back up to ten years."),
]
import json; json.dump([list(x) for x in L], open('lines.json', 'w'), indent=0)
