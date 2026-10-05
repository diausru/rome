#!/usr/bin/env python3
"""Voiceover engine (shared): synthesize beats, measure them, write the master timeline + mixed VO.
usage: tools/vo.py <beats.json> <out_dir> <timeline.json>
beats.json: {"lead": 0.25, "beats": [[id, text, pause_after_s, length_scale], ...]}
"""
import json, subprocess, sys, wave, pathlib
SP = pathlib.Path('/tmp/claude-0/-home-user-rome/383938de-09c6-50c2-b992-81bfdfbd86c7/scratchpad')
PIPER, MODEL = SP / 'ttsenv/bin/piper', SP / 'voice/en_US-joe-medium.onnx'
src, out, tlp = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]), pathlib.Path(sys.argv[3])
cfg = json.loads(src.read_text()); out.mkdir(parents=True, exist_ok=True)
RATE, lead = 22050, cfg.get('lead', 0.25)
pcm, t, tl = bytearray(b'\0\0' * int(lead * RATE)), lead, []
for bid, text, pause, ls in cfg['beats']:
    wav = out / f'seg-{bid}.wav'
    subprocess.run([str(PIPER), '-m', str(MODEL), '-f', str(wav), '--length-scale', str(ls), '--noise-scale', '0.6',
                    '--noise-w-scale', '0.75', '--sentence-silence', '0.18'], input=text.encode(), check=True, capture_output=True)
    with wave.open(str(wav)) as w:
        frames = w.readframes(w.getnframes()); dur = w.getnframes() / w.getframerate()
    tl.append(dict(id=bid, text=text, start=round(t, 3), end=round(t + dur, 3)))
    pcm += frames; t += dur
    pcm += b'\0\0' * int(pause * RATE); t += pause
with wave.open(str(out / 'vo-raw.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE); w.writeframes(bytes(pcm))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(out / 'vo-raw.wav'), '-af',
    'highpass=f=80,equalizer=f=3200:t=q:w=1.2:g=2,equalizer=f=250:t=q:w=1:g=-1.5,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=2,aresample=48000,loudnorm=I=-14:TP=-1.5:LRA=7',
    '-ar', '48000', '-ac', '2', str(out / 'vo.wav')], check=True)
tlp.write_text(json.dumps(dict(total=round(t, 3), beats=tl), indent=1))
sp = sum(b['end'] - b['start'] for b in tl); words = sum(len(b['text'].split()) for b in tl)
for b in tl: print(f"[{b['start']:6.2f}–{b['end']:6.2f}] {b['id']:9} {b['text']}")
print(f'TOTAL {t:.2f}s · speech {sp:.1f}s · {words} words · {words / sp * 60:.0f} wpm')
