#!/usr/bin/env bash
# finish.sh <ep-dir> <name> <OUT.mp4>: render all chunks, splice audio, encode, QC — one command, one short report.
set -uo pipefail; EP=$(realpath "$1"); N=$2; OUT="$EP/$3"; C=/home/user/rome/showreel/out/lf/chunks/$N
cd /home/user/rome/showreel
while r=$(CH=1500 bash ../longform/tools/next_chunk.sh "$EP" "$N" 2>&1 | tail -1); do [[ $r == ALL_DONE ]] && break; [[ $r == *rc=[1-9]* ]] && { echo "RENDER FAIL $r"; exit 1; }; done
cd "$C" && rm -f list.txt alist.txt a_*.wav
for f in part0*.mp4; do n=$(ffprobe -v error -select_streams v -count_packets -show_entries stream=nb_read_packets -of csv=p=0 $f | tr -d ','); d=$(python3 -c "print($n/30)")
  ffmpeg -v error -y -i $f -vn -af "atrim=0:$d,apad=whole_dur=$d" -ar 48000 -ac 2 a_${f%.mp4}.wav; echo "file '$C/$f'" >> list.txt; echo "file '$C/a_${f%.mp4}.wav'" >> alist.txt; done
ffmpeg -v error -y -f concat -safe 0 -i list.txt -c copy -an v.mp4 && ffmpeg -v error -y -f concat -safe 0 -i alist.txt a.wav
ffmpeg -v error -y -i v.mp4 -i a.wav -c:v libx264 -b:v 1100k -maxrate 2000k -bufsize 4000k -c:a aac -b:a 128k -shortest "$OUT"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"); L=$(ffmpeg -i "$OUT" -af ebur128 -f null - 2>&1 | grep -m1 -A1 Integrated | tail -1 | awk '{print $2}')
B=$(ffmpeg -i "$OUT" -vf blackdetect=d=0.5 -an -f null - 2>&1 | grep -c black_start)
ffmpeg -v error -y -i "$OUT" -vf "fps=1/30,scale=480:-1,tile=4x5" -frames:v 1 "$C/sheet.png"
echo "OK dur=${D}s lufs=$L black=$B sheet=$C/sheet.png"
