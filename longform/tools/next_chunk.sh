#!/usr/bin/env bash
# Render the next missing 100 s chunk of a long-form episode (one per call, fits a 10-min tool limit).
# usage: next_chunk.sh <episode-dir> <chunk-dir-name>
set -uo pipefail; P=$(cd "$1" && pwd); R=$(cd "$(dirname "$0")/../../showreel" && pwd); C="$R/out/lf/chunks/$2"; mkdir -p "$C"
TOTAL=$(python3 -c "import json;print(int(json.load(open('$P/episode.json'))['duration']*30)+1)")
i=0; for ((s=0; s<TOTAL; s+=${CH:-3000})); do
  f="$C/part$(printf %03d $i).mp4"; e=$((s+${CH:-3000}-1)); [ $e -ge $TOTAL ] && e=$((TOTAL-1))
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f" 2>/dev/null || true)
  if [ -z "$d" ]; then rm -f "$f"; cd "$R" && timeout 580 npx remotion render src/index.ts LongForm "$f" --props="$P/props.json" --gl=angle --concurrency=4 --frames=$s-$e --log=error > "$C/p$i.log" 2>&1; echo "chunk $i rc=$? frames $s-$e"; exit 0; fi
  i=$((i+1)); done; echo ALL_DONE
