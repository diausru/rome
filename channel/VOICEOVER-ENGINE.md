# VOICEOVER ENGINE — MANDATORY (user rule, 2026-10-05)

For every video, create a complete professional voiceover synchronized to the actual visual timeline. It is an integral part of the storytelling, not an optional description.

1. Write for speech, not for reading: natural spoken English for a professional Canadian financial-information channel; confident, intelligent, clear, calm, slightly dramatic, conversational, trustworthy. No "Hello everyone", no "In today's video", no unnecessary introductions, filler, repetition, corporate language or generic motivational phrases. Start immediately with the hook.
2. Every important visual has a voiceover purpose: numbers, dollar amounts, percentages, rankings, provinces, comparisons, tax results, conclusions and surprising facts are explained or reinforced. The viewer should understand by listening. Do not read on-screen text word for word; visuals and narration complement each other.
3. Build the script from the actual timeline: duration → beats → every major visual change → narration per beat → realistic speaking duration → natural pauses → important words synchronized with their visual events. Never force a 90-second narration onto a 60-second picture.
4. Timing: natural professional pace; shorter sentences when the visuals are dense; deliberate pauses before major numbers, rankings, surprises, comparisons and the final conclusion; a reveal happens at or right after its spoken phrase.
5. Hook: the first 1–2 seconds carry a strong spoken hook that creates curiosity or tension and opens a loop; don't explain everything at once.
6. Retention: HOOK → QUESTION → SETUP → EVIDENCE → COMPARISON → ESCALATION → SURPRISE → REVEAL → MONEY IMPACT → FINAL TAKEAWAY → CTA. Every sentence reveals information, creates curiosity, raises tension, explains a number or delivers the payoff; delete anything else.
7. Numbers are written as a voice actor would say them ("$6,506" → "six thousand five hundred and six dollars"); percentages in natural spoken form; large amounts unambiguous.
8. Tax accuracy: verify every claim against CRA, the Government of Canada, provincial governments or StatCan. Never invent rates, thresholds, deductions, credits, dates, eligibility rules or statistics. Unverifiable means not presented as fact.
9. Canadian voice: Canadian terminology and spelling; a premium Canadian explainer, not an American finance influencer.
10. Final package for every video: A. final script; B. timecoded VO [mm:ss.ss–mm:ss.ss]; C. delivery notes (normal / slower / emphasis / short pause / dramatic pause / stronger); D. audio cue points (number reveals, ranking changes, comparisons, major transitions, final conclusion); E. total spoken duration vs. the rendered video.

CRITICAL: the video and the voiceover are ONE synchronized system (visual timeline + VO + on-screen text + transitions share one master timeline). If the narration doesn't fit, MODIFY THE VIDEO TIMELINE AND RE-RENDER. Fix it; don't just report it.

Implementation in this repo: the VO is synthesized first (Piper, en_US-joe-medium), its measured beat times become the master timeline JSON, the Remotion composition keys every reveal to those times, and ffmpeg muxes the normalized VO (−14 LUFS) onto the render. See `case002/` for the reference implementation.
