"""Append (or replace) a video card in the Publishing Kit. usage: kit_add.py <kit.html> <publish.json> <label>"""
import json, re, sys
kit, pj, label = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(kit).read()
m = re.search(r'const D=(\[.*?\]);\n', s, re.S)
D = json.loads(m.group(1))
card = json.load(open(pj)); card['_label'] = label
D = [d for d in D if d.get('_label') != label] + [card]
s = s[:m.start(1)] + json.dumps(D, ensure_ascii=False) + s[m.end(1):]
open(kit, 'w').write(s); print(len(D), 'cards; last:', label)
