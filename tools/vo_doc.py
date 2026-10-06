#!/usr/bin/env python3
"""Write VOICEOVER.md (VOICEOVER ENGINE items A–E). usage: tools/vo_doc.py <timeline.json> <doc.json> <out.md>
doc.json: {"title":..., "frames":N, "fps":24, "notes":{beat:delivery}, "cues":[[beat, frac, event], ...]}"""
import json, sys
t, d = json.load(open(sys.argv[1])), json.load(open(sys.argv[2]))
ids = [b['id'] for b in t['beats']]; g = lambda i: t['beats'][ids.index(i)]
def tc(x): m = int(x // 60); return f"{m:02d}:{x - 60 * m:05.2f}"
sp = sum(b['end'] - b['start'] for b in t['beats']); w = sum(len(b['text'].split()) for b in t['beats'])
vid = d['frames'] / d['fps']
md = [f"# {d['title']}: voiceover package (VOICEOVER ENGINE, items A–E)", "",
 d.get("engine", "Master timeline = the narration. It is synthesized beat by beat by `tools/vo.py`, the measured times are written to the timeline JSON, and every reveal in the composition is computed from them."),
 d.get("voice", "Voice: Piper TTS en_US-joe-medium (CC0 dataset), the same voice on every Short. Post: high-pass 80 Hz, +2 dB at 3.2 kHz, −1.5 dB at 250 Hz, 2.5:1 compression, loudnorm −14 LUFS / −1.5 dBTP, 48 kHz stereo, AAC 192k."), "",
 "## A. Final script", *[b['text'] for b in t['beats']], "",
 "## B + C. Timecoded voiceover and delivery notes", "| Time | Beat | Narration | Delivery |", "|---|---|---|---|",
 *[f"| [{tc(b['start'])}–{tc(b['end'])}] | {b['id']} | “{b['text']}” | {d['notes'].get(b['id'], 'normal')} |" for b in t['beats']], "",
 "## D. Audio cue points", "| Time | Visual event |", "|---|---|",
 *[f"| {tc(g(i)['start'] + (g(i)['end'] - g(i)['start']) * fr)} | {ev} |" for i, fr, ev in d['cues']], "",
 "## E. Duration check",
 f"- {w} words, {sp:.1f} s of speech, {w / sp * 60:.0f} wpm.",
 f"- Narration ends at {tc(t['beats'][-1]['end'])}; VO file {t['total']:.2f} s; video {vid:.2f} s ({d['frames']} frames at {d['fps']} fps); hold on the final frame {vid - t['beats'][-1]['end']:.2f} s. {'✅ Fits.' if t['total'] <= vid + 0.01 else '❌ DOES NOT FIT'}"]
open(sys.argv[3], 'w').write("\n".join(md) + "\n"); print(md[-1])
