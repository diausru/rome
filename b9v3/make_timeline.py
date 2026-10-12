"""Master timeline for the B9 v3 sample: beats (VO lines), named key-word times from words.json, scene cuts and
SFX cues. The Remotion composition and tools/sfx_mix.py both read timeline.json, so every visual reveal and its
sound land on the same measured word."""
import json, re
W = json.load(open('words.json')); place = json.load(open('../b9/vo_place.json'))
words = W['words']

def word(line, prefix, nth=0):
    hits = [w for w in words if w['line'] == line and re.sub(r'[^a-z0-9-]', '', w['w'].lower()).startswith(prefix)]
    return hits[nth]['t0']

beats = [dict(id=n, text=t, start=round(p + s, 3), end=round(p + e, 3)) for n, p, t, s, e in place]
end_vo = beats[-1]['end']
K = {
  'q_how': word(0, 'how'), 'q_thing': word(0, 'thing'),
  'c1_in': word(1, 'case'), 'c1_mb': word(1, 'manitoba'),
  'c1_zero': word(2, 'zero'), 'c1_bpa': word(2, 'basic'),
  'c1_cpp': word(3, 'c-p-p'), 'c1_cpp_n': word(3, 'seven'),
  'cut1': beats[4]['start'] - 0.15,
  'c2_in': word(4, 'case'), 'c2_sal': word(4, 'sixty'),
  'c2_top': word(5, 'top'), 'c2_tax_n': word(5, 'twenty-nine'),
  'c2_cpp_n': word(6, 'eleven'), 'c2_exempt': word(6, 'exemption'),
  'cut2': beats[7]['start'] - 0.15,
  'tot': word(7, 'total'), 'tot_n': word(7, 'four'), 'x5': word(7, 'five'),
  'cta': word(8, 'and'), 'cta_q': word(8, 'should'), 'cta_yes': word(9, 'yes'),
  'logo': round(end_vo + 0.25, 3),
}
cues = [  # restrained: scene changes + key reveals, ~1 per 3 s at most under the voice
  dict(t=0.35, s='swish', g=-8), dict(t=K['c1_in'], s='swish', g=-10), dict(t=K['c1_zero'], s='tick', g=-8),
  dict(t=K['c1_cpp_n'], s='tick', g=-8), dict(t=K['cut1'], s='whoosh', g=-6), dict(t=K['c2_in'], s='glint', g=-12),
  dict(t=K['c2_tax_n'], s='tick', g=-8), dict(t=K['c2_cpp_n'], s='tick', g=-8), dict(t=K['cut2'], s='whoosh', g=-6),
  dict(t=K['tot_n'], s='boom', g=-6), dict(t=K['x5'], s='glint', g=-10), dict(t=K['cta'], s='swish', g=-10),
  dict(t=K['logo'], s='logo', g=-6),
]
total = round(end_vo + 1.9, 3)
json.dump(dict(total=total, beats=beats, k={k: round(v, 3) for k, v in K.items()}, cues=cues, chunks=W['chunks'], words=words), open('timeline.json', 'w'), indent=1)
print('total', total); [print(f'  {k:10s} {v:6.2f}') for k, v in K.items()]
