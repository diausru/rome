"""TAX CASE #001 voiceover: places the 15 ElevenLabs v4 lines (Higgsfield, voice "Harrison") on the picture timeline,
then mixes and masters them. Speech onsets were measured with silencedetect (-40 dB); `PLACE` is the file start time.
Output: vo/vo_master.wav (48 kHz stereo, -14 LUFS / -1.5 dBTP) and vo/timeline.json."""
import json, os, subprocess
HERE = os.path.dirname(os.path.abspath(__file__))
LINES = [  # (file, place_s, text, speech_start_in_file, speech_end_in_file)
    ("line00", 0.20, "A letter from the C-R-A just landed.", 0.00, 2.66),
    ("line01", 3.00, "Don't toss it. Don't panic.", 0.00, 2.30),
    ("line02", 5.45, "Open it. Read it properly.", 0.00, 2.12),
    ("line03", 7.75, "This one says you owe money.", 0.00, 1.86),
    ("line04", 9.90, "Two thousand, four hundred and sixty dollars.", 0.00, 2.87),
    ("line05", 13.10, "But why?", 0.00, 0.92),
    ("line06", 14.40, "Start with the basics. The date. The tax year. The reference.", 0.08, 4.86),
    ("line07", 19.60, "Then find the explanation.", 0.00, 1.97),
    ("line08", 23.70, "Here's what changed.", 0.00, 1.18),
    ("line09", 26.80, "The amount. The reason. And the deadline.", 0.00, 3.74),
    ("line10", 33.50, "Before you pay, or push back, make sure every detail is right.", 0.00, 4.80),
    ("line11", 40.95, "Check the details.", 0.09, 1.20),
    ("line12", 42.70, "Your name. The tax year. The amount. The reason. The deadline.", 0.00, 6.29),
    ("line13", 49.30, "Then keep it with your records.", 0.09, 1.82),
    ("line14", 51.60, "Understand the letter, before you act.", 0.00, 2.61),
]
DUR = 55.0
# overlap guard
for (a, pa, _, _, ea), (b, pb, _, sb, _) in zip(LINES, LINES[1:]):
    assert pa + ea < pb + sb, (a, b)
for f, *_r in LINES:  # decode the downloaded mp3s once (mono 48 kHz)
    wav = os.path.join(HERE, f + ".wav")
    if not os.path.exists(wav):
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", os.path.join(HERE, f + ".mp3"), "-ac", "1", "-ar", "48000", wav], check=True)
inputs, filt = [], []
for i, (f, place, *_r) in enumerate(LINES):
    inputs += ["-i", os.path.join(HERE, f + ".wav")]
    ms = int(round(place * 1000))
    filt.append(f"[{i}:a]adelay={ms}|{ms},apad=whole_dur={DUR}[a{i}]")
mix = "".join(f"[a{i}]" for i in range(len(LINES))) + f"amix=inputs={len(LINES)}:normalize=0:duration=longest[m]"
chain = ("[m]atrim=0:%s,highpass=f=80,equalizer=f=250:t=q:w=1:g=-1.5,equalizer=f=3200:t=q:w=1.2:g=2,"
         "acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120,"
         "loudnorm=I=-14:TP=-1.5:LRA=7,aresample=48000,pan=stereo|c0=c0|c1=c0[out]") % DUR
subprocess.run(["ffmpeg", "-y", "-v", "error", *inputs, "-filter_complex", ";".join(filt + [mix, chain]),
                "-map", "[out]", "-c:a", "pcm_s16le", os.path.join(HERE, "vo_master.wav")], check=True)
tl = [dict(id=f, text=t, start=round(p + s, 2), end=round(p + e, 2)) for f, p, t, s, e in LINES]
json.dump(dict(video=DUR, beats=tl), open(os.path.join(HERE, "timeline.json"), "w"), indent=1)
spoken = sum(b["end"] - b["start"] for b in tl); words = sum(len(b["text"].split()) for b in tl)
for b in tl:
    print(f"[{b['start']:6.2f}-{b['end']:6.2f}] {b['text']}")
# second pass: exact gain to -14 LUFS integrated (single-pass loudnorm overshoots on a track that is mostly silence)
import re
m = subprocess.run(["ffmpeg", "-v", "info", "-i", os.path.join(HERE, "vo_master.wav"), "-af", "ebur128", "-f", "null", "-"],
                   capture_output=True, text=True).stderr
I = float(re.findall(r"I:\s+(-?[0-9.]+) LUFS", m)[-1])
os.replace(os.path.join(HERE, "vo_master.wav"), os.path.join(HERE, "vo_stage1.wav"))
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", os.path.join(HERE, "vo_stage1.wav"), "-af",
                f"volume={-14 - I:.2f}dB,alimiter=limit=0.84:level=false", "-c:a", "pcm_s16le",
                os.path.join(HERE, "vo_master.wav")], check=True)
os.remove(os.path.join(HERE, "vo_stage1.wav"))
print(f"words {words}, speech {spoken:.1f} s, {words / spoken * 60:.0f} wpm, last word ends {tl[-1]['end']:.2f} s of {DUR}")
