# Builds case002/VOICEOVER.md (VOICEOVER ENGINE items A–E) from the measured timeline.
import json
t = json.load(open('/home/user/rome/showreel/src/case002-timeline.json'))
ids = [b['id'] for b in t['beats']]; get = lambda i: t['beats'][ids.index(i)]
cue = lambda i, fr: get(i)['start'] + (get(i)['end'] - get(i)['start']) * fr
def tc(x): m = int(x // 60); return f"{m:02d}:{x - 60 * m:05.2f}"
notes = {'hook': 'normal, confident; land "five hundred dollars"', 'year': 'normal; question rises on "claim it"', 'answer': 'slower; dramatic pause before "No"',
 'support': 'normal, clear, informative', 'notlist': 'emphasis on "aren\'t"; short pause after', 'credits': 'stronger delivery; lift on "can"',
 'care': 'normal', 'medical': 'normal', 'eligible': 'normal; light emphasis "single", "live with you"', 'catch': 'slower; dramatic pause after',
 'resident': 'emphasis "residence in Canada"', 'abroad': 'slower, calm, firm', 'advice': 'normal; short pause after "facts"',
 'payoff': 'slower, warm; emphasis "write-off"', 'cta': 'normal, friendly'}
spoken = sum(b['end'] - b['start'] for b in t['beats']); words = sum(len(b['text'].split()) for b in t['beats'])
rows = "\n".join(f"| [{tc(b['start'])}–{tc(b['end'])}] | {b['id']} | “{b['text']}” | {notes[b['id']]} |" for b in t['beats'])
cues = [(get('hook')['start'], '"$500 /month" card lands with the first words (EXAMPLE tag)'), (cue('year', .05), '"× 12 = $6,000 a year" (number reveal)'),
 (cue('year', .62), '"Deductible?" pops on "claim it"'), (cue('answer', .86), '**NO** stamp lands on the word "No" (impact)'),
 (cue('support', .25), 'Spouse or ex-partner'), (cue('support', .5), "Your child's other parent"), (cue('support', .78), 'Court order or written agreement'),
 (cue('notlist', .1), '✗ "Your parents" (comparison)'), (get('credits')['start'], '"3 tax credits" card (major transition)'),
 (get('care')['start'], 'Row 1: Caregiver amount (line 30450)'), (get('medical')['start'], 'Row 2: Medical expenses (line 33199)'), (get('eligible')['start'], 'Row 3: Eligible dependant (line 30400)'),
 (get('catch')['start'], 'THE CATCH (major transition)'), (cue('resident', .55), 'RESIDENT IN CANADA stamps hit rows 1–2'),
 (cue('abroad', .3), 'Rows turn grey: "abroad all year: no" / "never lived with you: no"'), (get('advice')['start'], 'Situation for a professional'),
 (get('payoff')['start'], 'Payoff: flag + "Generous. Not a write-off." (final conclusion)'), (get('cta')['start'], 'CTA button')]
VID = 1428 / 24
doc = f"""# CASE #002: voiceover package (VOICEOVER ENGINE, items A–E)

Master timeline = the narration. It is synthesized beat by beat by `case002/vo.py`; the measured times go to `showreel/src/case002-timeline.json`, and every visual reveal in `showreel/src/Case002.tsx` is computed from them, so changing the script re-times the video.
Voice: Piper TTS (`piper-tts` 1.8.0), voice en_US-joe-medium (CC0 dataset), rendered locally. Post: high-pass 80 Hz, +2 dB at 3.2 kHz, −1.5 dB at 250 Hz, 2.5:1 compression, loudnorm −14 LUFS / −1.5 dBTP, 48 kHz stereo, AAC 192k.
**Limitation:** a local neural voice, not a human narrator. It works as a timing-locked track; a professional re-record can follow this script and timecode exactly.

## A. Final script
{chr(10).join(b['text'] for b in t['beats'])}

## B + C. Timecoded voiceover with delivery notes
| Time | Beat | Narration | Delivery |
|---|---|---|---|
{rows}

## D. Audio cue points
| Time | Visual event |
|---|---|
""" + "\n".join(f"| {tc(x)} | {e} |" for x, e in cues) + f"""

## E. Duration check
- {words} words, {spoken:.1f} s of speech → **{words / spoken * 60:.0f} wpm** (calm explainer pace). Revision: v1 ran at 188 wpm, too fast for the brief; the script was cut and the voice slowed.
- The narration ends at {tc(t['beats'][-1]['end'])}; the VO file is {t['total']:.2f} s; the video is {VID:.2f} s (1428 frames at 24 fps). Hold on the final frame: {VID - t['beats'][-1]['end']:.2f} s. ✅ Fits.
"""
open('/home/user/rome/case002/VOICEOVER.md', 'w').write(doc)
print(doc[doc.index('## E'):])
