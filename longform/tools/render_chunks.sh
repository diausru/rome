#!/usr/bin/env bash
# Long-form render in 100 s chunks (survives interruptions; each chunk can be re-run alone).
# Usage: longform/tools/render_chunks.sh longform/lfNN-slug
set -euo pipefail
T=$(cd "$(dirname "$0")" && pwd); P=$(cd "$1" && pwd); N=$(basename "$P")
R=$(cd "$T/../../showreel" && pwd); C="$R/out/lf/chunks/$N"; mkdir -p "$C"
TOTAL=$(python3 -c "import json;print(int(json.load(open('$P/episode.json'))['duration']*30)+1)")
i=0; for ((s=0; s<TOTAL; s+=3000)); do
  e=$((s+2999)); [ $e -ge $TOTAL ] && e=$((TOTAL-1)); f="$C/part$(printf %03d $i).mp4"
  if [ ! -s "$f" ]; then
    (cd "$R" && npx remotion render src/index.ts LongForm "$f" --props="$P/props.json" --gl=angle --concurrency=4 --frames=$s-$e --log=error > "$C/part$(printf %03d $i).log" 2>&1) || { echo "chunk $i failed"; tail -5 "$C/part$(printf %03d $i).log"; exit 1; }
  fi
  echo "chunk $i ok frames $s-$e"; i=$((i+1))
done
ls "$C"/part*.mp4 | sed "s/.*/file '&'/" > "$C/list.txt"
ffmpeg -v error -y -f concat -safe 0 -i "$C/list.txt" -c:v copy -c:a aac -b:a 192k "$R/out/lf/$N.mp4"
echo "joined: showreel/out/lf/$N.mp4"; "$T/qc.sh" "$R/out/lf/$N.mp4"
