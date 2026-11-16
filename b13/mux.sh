#!/bin/sh
# B13 final: silent render + Grady VO master (-14 LUFS), limiter 0.70 (≈ -3 dB) as in B9-2, AAC 48 kHz stereo.
cd "$(dirname "$0")/build" && ffmpeg -y -v error -i b13_silent.mp4 -i ../vo/vo_master.wav -map 0:v -map 1:a -c:v copy \
  -af "alimiter=limit=0.70:level=false" -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart b13_final.mp4
