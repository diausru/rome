#!/usr/bin/env python3
"""Final reel mix: Grady voice on top, music bed ducked under it, the sound-effects layer ducked lightly, then the
whole mix to −14 LUFS with true peak ≤ −1.5 dBTP (the level all three platforms expect).
usage: tools/mix_reel.py <vo.wav> <music.wav> <sfx.wav> <duration s> <out.wav>
Levels: music −24 LUFS before ducking (as in the series), effects −27 LUFS integrated over the reel (sparse, so their
peaks sit about 7–10 dB under the voice, close to the reference's guidance), sidechain from the voice."""
import subprocess, sys

vo, music, sfx, dur, out = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4]), sys.argv[5]
fc = (
    f"[0:a]aformat=sample_rates=48000:channel_layouts=stereo,apad=whole_dur={dur},asplit=3[sc1][sc2][v];"
    f"[1:a]aformat=sample_rates=48000:channel_layouts=stereo,apad=whole_dur={dur},atrim=0:{dur}[m0];"
    f"[2:a]aformat=sample_rates=48000:channel_layouts=stereo,loudnorm=I=-27:TP=-6:LRA=20,apad=whole_dur={dur},atrim=0:{dur}[s0];"
    "[m0][sc1]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[m];"
    "[s0][sc2]sidechaincompress=threshold=0.05:ratio=3:attack=5:release=200[s];"
    f"[m][s][v]amix=inputs=3:duration=first:normalize=0,atrim=0:{dur},loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[o]"
)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', vo, '-i', music, '-i', sfx, '-filter_complex', fc, '-map', '[o]', '-ar', '48000', out], check=True)
print('ok', out)
