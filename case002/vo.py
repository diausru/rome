# Voiceover engine for CASE #002. The narration is the master timeline:
# each beat is synthesized, measured, placed with its pause, then exported to
# showreel/src/case002-timeline.json (visuals key off these times) and case002/vo.wav.
import json, subprocess, wave, pathlib, sys
SP = pathlib.Path('/tmp/claude-0/-home-user-rome/383938de-09c6-50c2-b992-81bfdfbd86c7/scratchpad')
PIPER, MODEL = SP / 'ttsenv/bin/piper', SP / 'voice/en_US-joe-medium.onnx'
OUT = pathlib.Path(__file__).parent
LEAD = 0.25          # silence before the first word (s)
# id, spoken text, pause after (s), delivery (length scale: >1 = slower)
BEATS = [
 ('hook',    "You send your parents five hundred dollars a month.", 0.30, 1.21),
 ('year',    "That's six thousand a year. Can you claim it?", 0.55, 1.232),
 ('answer',  "In most cases? No.", 0.55, 1.288),
 ('support', "Deductible support goes to a spouse, an ex, or your child's other parent, under a court order or written agreement.", 0.25, 1.187),
 ('notlist', "Parents aren't on that list.", 0.55, 1.232),
 ('credits', "But three tax credits can include a parent.", 0.25, 1.21),
 ('care',    "The caregiver amount, if they have an impairment.", 0.15, 1.187),
 ('medical', "Medical expenses you pay for them.", 0.15, 1.187),
 ('eligible',"And the eligible dependant amount, if you're single and they live with you.", 0.50, 1.187),
 ('catch',   "Now the catch.", 0.40, 1.288),
 ('resident',"For a parent, the first two require residence in Canada at some point in the year.", 0.30, 1.21),
 ('abroad',  "Abroad all year, and never lived with you? These generally don't apply.", 0.50, 1.21),
 ('advice',  "Bringing them here? Residency depends on the facts. Get advice, and keep proof of support.", 0.50, 1.187),
 ('payoff',  "Sending money home is generous. It just isn't a write-off.", 0.40, 1.232),
 ('cta',     "Follow for the real math.", 0.50, 1.176),
]
RATE = 22050
pcm, t, tl = bytearray(), LEAD, []
pcm += b'\0\0' * int(LEAD * RATE)
for bid, text, pause, ls in BEATS:
    wav = OUT / f'seg-{bid}.wav'
    subprocess.run([str(PIPER), '-m', str(MODEL), '-f', str(wav), '--length-scale', str(ls), '--noise-scale', '0.6', '--noise-w-scale', '0.75', '--sentence-silence', '0.18'],
                   input=text.encode(), check=True, capture_output=True)
    with wave.open(str(wav)) as w:
        assert w.getframerate() == RATE; frames = w.readframes(w.getnframes()); dur = w.getnframes() / RATE
    tl.append(dict(id=bid, text=text, start=round(t, 3), end=round(t + dur, 3)))
    pcm += frames; t += dur
    pcm += b'\0\0' * int(pause * RATE); t += pause
total = t
with wave.open(str(OUT / 'vo-raw.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE); w.writeframes(bytes(pcm))
json.dump(dict(total=round(total, 3), beats=tl), open('/home/user/rome/showreel/src/case002-timeline.json', 'w'), indent=1)
for b in tl: print(f"[{b['start']:6.2f}–{b['end']:6.2f}] {b['id']:9} {b['text']}")
print('TOTAL', round(total, 2))
