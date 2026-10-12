"""Verified numbers for the B9 v3 sample, generated from ../b9/calc.py (CRA T4127 Jan 2026 rates, CPP 2026).
Presentation code reads data.json only; it never computes or edits these numbers."""
import contextlib, io, json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'b9'))
with contextlib.redirect_stdout(io.StringIO()):
    import calc
a = calc.run(0, 10_000); b0, b1 = calc.run(60_000, 0), calc.run(60_000, 10_000)
d = {k: b1[k] - b0[k] for k in b1}
data = {
  "assumptions": "Manitoba · single · 2026 · $10,000 net self-employment income · basic credits only",
  "case1": {"label": "ONLY INCOME", "income_tax": round(a['tax'], 2), "cpp": round(a['se_cpp'], 2), "total": round(a['total'], 2)},
  "case2": {"label": "+ $60K SALARY", "income_tax": round(d['tax'], 2), "cpp": round(d['se_cpp'], 2), "total": round(d['total'], 2)},
  "ratio": round(d['total'] / a['total'], 2),
  "sources": "CRA T4127 (Jan 2026) · CPP 2026 · Schedule 8",
}
json.dump(data, open('data.json', 'w'), indent=1)
print(json.dumps(data, indent=1))
