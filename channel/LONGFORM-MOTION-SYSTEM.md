# TAX SECRETS CANADA — Advanced code-only cinematic motion system (user, 2026-10-12)
Adds to `LONGFORM-CODE-ONLY.md` (still in force). No Kling, no Kling prompts, no external AI video generation.

1. **Alive opening:** near-black navy + subtle depth, warm amber bloom, cool blue glow, fine dotted grid → small floating ALL-CAPS info tags (staggered 0.1–0.3 s, each from a different direction, slight rotation, opacity, smooth settle, restrained colour-coded dots; only tags relevant to the episode) → powerful kinetic headline → a relevant financial object/calculation → natural transition into scene 1. Curiosity before the answer.
2. **Kinetic typography in code:** progressive word/phrase reveals, mask entrances, short directional move + settle, opacity/blur, sequential lines, animated key-word emphasis, controlled scale for big figures, text replacement/morph, subtle tracking animation. ALL CAPS for headlines, panel titles, labels, takeaways. Word/phrase/line level chosen by narration — not every character.
3. **Active/selected states:** reusable code icons (consistent stroke/geometry); when relevant: prominence up, amber highlight, border/light sweep, reveal label/data, hold while narrated, move focus to the next. No random flashing or continuous pulsing.
4. **Step-by-step data:** gross → federal row + value + bar → provincial → other deductions → total deductions → take-home, emphasized and held. Values only from verified structured data.
5. **Glass panels + transitions:** reusable glass component; glass reveal, mask wipe, focus reveal, light sweep, vapor dissolve, particle exit, morph, collapse to result — chosen per story, not the same everywhere.
6. **Moving background:** multi-layer parallax / depth, push-in/pull-back, lateral moves, moving highlights, screen glow, focus/depth changes, smooth environment transitions; topic-specific realistic environments; never one static zoom per scene. Be precise: animated stills are simulated camera movement, not filmed footage.
7. **Hybrid composition:** realistic moving background (context) + foreground typography/glass/data (explanation); leave negative space; background stays alive behind panels.
8. **Reusable motion engine:** FloatingTag, KineticHeadline, GlassPanel, ActiveIcon, AnimatedNumber, ProgressiveTable, BarChartReveal, HighlightSweep, VaporDissolve, CameraParallax, SceneTransition, FinalVerdict — configurable duration/delay/direction/easing/intensity; timeline synced to the English VO.
9. **Timing starting points:** tags 0.1–0.3 s stagger · small UI 0.2–0.5 s · glass panels 0.3–0.7 s · headline 0.5–1.0 s · major result 0.5–0.9 s + readable hold · scene transitions 0.4–0.9 s. Smooth easing; enough stillness to read.
10. **QC:** 20–30 s representative sequence first (tags, headline, selected icon/card, glass panel, progressive data, moving background) → render → inspect frame by frame (mobile readability, timing, smoothness, compositing) → fix → re-render → then the full video. Deliver MP4 + project files; never claim unperformed work.

## Reference study (2026-10-12): github.com/marcosmodly/marketing-skill, `media/explainer/marketing-skill-explainer.mp4` (1920×1080, 60 fps, 96 s) + `explainer.html`
Observed motion principles (re-expressed in our own visual language, colours/layout not copied):
- Headline lines rise out of a mask line by line; a thin accent rule grows left→right under each scene title.
- Lists build item by item with ~0.1 s stagger; struck-through words animate the strike; a stamp ("GO") pops with overshoot.
- A status row (Drafted → Ready → Approved → Sent) shows the selected state moving step by step — the active-state idea.
- Cards fan in with stagger; chat bubbles enter sequentially; commands type in.
- Scene changes are hard but motivated (colour-block wipe) and snapped to music beats.
- Easing set in the source: expo-out cubic-bezier(.16,1,.3,1) for entrances, back-out (.34,1.56,.64,1) for pops, in-out (.65,0,.35,1) for moves, ease-in (.55,0,1,.45) for exits; stagger 0.1 s.
- Readability rule from its README: nothing on screen under 40 px.
