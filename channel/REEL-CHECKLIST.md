# Card reel: mandatory elements (every video, check before "final")

Built into every `<P>V3.tsx` (copy the previous one). A reel is not delivered unless every box holds.

**Frame & brand**
- [ ] 1080×1920, 24 fps, 45–70 s; VO + ≈0.5 s hold
- [ ] Header: code-drawn Canadian flag (1:2:1) + TAX SECRETS CANADA + gold topic · year
- [ ] Navy / charcoal grade (NavyGrade), Depth layer (bokeh, warm light), restrained gold, purposeful red
- [ ] Sources footer on a dark glass strip ("Source: … · general info, not advice")

**Background (living plate)**
- [ ] 3 photo scenes of the same people (gpt_image_2_5 → 4K), no text in them, cut at beat boundaries with SceneCuts
- [ ] Motivated camera moves (Focus keys per beat), 0.8 px blur, blur-in at frame 0
- [ ] Living details: snow / steam where the scene allows

**Hook (first 1–2 s)**
- [ ] Topic readable on frame 0 (Kinetic headline, 2 lines, gold second line)
- [ ] Open loop in the VO, a key figure on screen within 10 s
- [ ] Hook type different from the previous reel (Variety rule)

**Body**
- [ ] Typed film-title captions top-left per beat (Typed / CAPS)
- [ ] Word-synced captions (Captions) from c1 to action, never under a panel
- [ ] One main data visual (new vs previous 2–3 reels), dark-glass panel, gold numbers, green/red for good/bad
- [ ] Every number appears when it is spoken (cue anchors from reel.json)
- [ ] Stamp or highlight for the mid re-hook at ≈55–65 % of the runtime
- [ ] Reveal visual for "the twist"

**Sound**
- [ ] Grady VO (−14 LUFS mix, TP ≤ −1)
- [ ] Music bed by topic mood, ducked under the VO
- [ ] SFX on the cue anchors (tick / chime / whoosh / swish / riser+impact), sonic logo at the end

**End**
- [ ] Action card ("check yours") + flag + gold NEXT pill (bridge to the next topic) + "Follow so you don't miss it"
- [ ] `cover` cue on a settled frame (key figure + person), extracted and checked

**Docs & QC**
- [ ] data.json (verified numbers + sources), reel.json (hook, cues, layout), publish.json → PUBLISH.md, Kit card
- [ ] `tools/reel_check.py` 0 failed; one contact sheet looked at
