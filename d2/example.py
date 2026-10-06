# Example (not a CRA rule): CCB for the July 2026 - June 2027 payment period (2025 base year), one child under 6.
# CRA "How much you can get" (canada.ca): max $8,157 (<6) / $6,883 (6-17); AFNI thresholds $38,237 and $82,847;
# phase 1 reduction 7% (1 child), 13.5% (2), 19% (3), 23% (4+) of AFNI above $38,237.
MAX_U6, T1, T2 = 8157, 38237, 82847
def ccb_one_u6(afni):
    assert afni <= T2, 'phase 2 not modelled'
    return MAX_U6 - max(0, afni - T1) * 0.07
for afni in (70000, 80000):
    a = ccb_one_u6(afni); print(f"AFNI {afni:,}: CCB {a:,.2f}/yr  {a/12:,.2f}/mo")
print(f"raise of $10,000 -> change {ccb_one_u6(80000)-ccb_one_u6(70000):,.2f}/yr (1 child); 2 children: {-0.135*10000:,.2f}/yr")
