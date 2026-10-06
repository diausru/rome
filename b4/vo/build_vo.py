"""B4 voiceover: place the 11 ElevenLabs v4 lines (Higgsfield, voice "Harrison") at the times in film.VO, master to
-14 LUFS (exact second-pass gain), 48 kHz stereo → vo/vo_master.wav."""
import os, re, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
from film import VO, DUR
for (a, pa, _, _, ea), (b, pb, _, sb, _) in zip(VO, VO[1:]):
    assert pa + ea < pb + sb, (a, b)
for f, *_r in VO:  # decode the downloaded mp3s once (mono 48 kHz)
    wav = os.path.join(HERE, f + ".wav")
    if not os.path.exists(wav):
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", os.path.join(HERE, f + ".mp3"), "-ac", "1", "-ar", "48000", wav], check=True)
inputs, filt = [], []
for i, (f, place, *_r) in enumerate(VO):
    inputs += ["-i", os.path.join(HERE, f + ".wav")]
    ms = int(round(place * 1000))
    filt.append(f"[{i}:a]adelay={ms}|{ms},apad=whole_dur={DUR}[a{i}]")
mix = "".join(f"[a{i}]" for i in range(len(VO))) + f"amix=inputs={len(VO)}:normalize=0:duration=longest[m]"
chain = (f"[m]atrim=0:{DUR},highpass=f=80,equalizer=f=250:t=q:w=1:g=-1.5,equalizer=f=3200:t=q:w=1.2:g=2,"
         "acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120,aresample=48000,pan=stereo|c0=c0|c1=c0[out]")
st1 = os.path.join(HERE, "vo_stage1.wav")
subprocess.run(["ffmpeg", "-y", "-v", "error", *inputs, "-filter_complex", ";".join(filt + [mix, chain]),
                "-map", "[out]", "-c:a", "pcm_s16le", st1], check=True)
m = subprocess.run(["ffmpeg", "-v", "info", "-i", st1, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
I = float(re.findall(r"I:\s+(-?[0-9.]+) LUFS", m)[-1])
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", st1, "-af", f"volume={-14 - I:.2f}dB,alimiter=limit=0.79:level=false",
                "-c:a", "pcm_s16le", os.path.join(HERE, "vo_master.wav")], check=True)
os.remove(st1)
for f, p, t, s, e in VO:
    print(f"[{p + s:6.2f}-{p + e:6.2f}] {t}")
print("integrated before gain", I)
