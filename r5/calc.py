"""R5: pension income splitting (ITA 60.03, 56(1)(a.2), 60(c), 118(3), 118(7)-(8); MB pension amount $1,000).
Example couple in Manitoba, both 66 in 2026. Pat: RPP life pension $80,000 + CPP/OAS $20,000 = $100,000.
Jo: CPP/OAS $20,000, no eligible pension income. Max split = 50% x $80,000 = $40,000 (CPP/OAS can't be split).
Moving $40,000 makes both $60,000. Bracket tax (2026 federal + MB rates); the basic personal amount is
claimed either way, so it cancels. Jo gains the pension credit on the split amount: federal $2,000 x 14%,
MB $1,000 x 10.8%. Not included: age amount and OAS recovery tax (both also change)."""
import os, json, importlib.util
_s = importlib.util.spec_from_file_location('c1calc', os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'c1', 'calc.py'))
_m = importlib.util.module_from_spec(_s); _s.loader.exec_module(_m)
bracket, FED, MB = _m.bracket, _m.FED, _m.MB
tax = lambda x: bracket(x, FED) + bracket(x, MB)
PAT_RPP, PAT_OTHER, JO = 80_000, 20_000, 20_000
SPLIT = 0.5 * PAT_RPP
if __name__ == '__main__':
    pat, jo = PAT_RPP + PAT_OTHER, JO
    before = tax(pat) + tax(jo)
    after = tax(pat - SPLIT) + tax(jo + SPLIT)
    credit = 2000 * .14 + 1000 * .108
    d = {'pat': pat, 'jo': jo, 'split': SPLIT, 'pat_after': pat - SPLIT, 'jo_after': jo + SPLIT,
         'tax_pat_before': round(tax(pat)), 'tax_jo_before': round(tax(jo)), 'before': round(before),
         'tax_each_after': round(tax(pat - SPLIT)), 'after': round(after),
         'bracket_saving': round(before - after), 'pension_credit_jo': round(credit),
         'total_saving': round(before - after + credit),
         'top_rate_pat': .26 + .174 if pat > 117_045 else .205 + .1275, 'rate_jo_before': .14 + .108}
    print(json.dumps(d, indent=1))
