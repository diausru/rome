#!/usr/bin/env bash
# Compact QC: specs, black frames, loudness/peak, one contact sheet (12 frames) -> <mp4>.sheet.png
set -uo pipefail; V="$1"
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,r_frame_rate -of compact=p=0 "$V"
echo "black: $(ffmpeg -v info -i "$V" -vf blackdetect=d=0.25 -an -f null - 2>&1 | grep -c black_start) segments"
ffmpeg -v info -i "$V" -vn -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I:|Peak:)" | tr -s ' ' | tr '\n' ' '; echo
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
ffmpeg -v error -y -i "$V" -vf "fps=12/$D,scale=480:-1,tile=3x4" -frames:v 1 "$V.sheet.png" && echo "sheet: $V.sheet.png"
