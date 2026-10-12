#!/usr/bin/env bash
# Usage: longform/tools/render.sh longform/lfNN-slug   (expects episode.json [+ vo.wav] built by build.py)
# Renders 16:9 1920x1080 with the fast ANGLE backend (≈15 min video ≈ 30 min render on 4 cores), quiet logs.
set -euo pipefail; T=$(cd "$(dirname "$0")" && pwd)
P=$(cd "$1" && pwd); N=$(basename "$P"); R=$(cd "$(dirname "$0")/../../showreel" && pwd)
mkdir -p "$R/public/lf/$N"; [ -f "$P/vo.wav" ] && cp "$P/vo.wav" "$R/public/lf/$N/vo.wav"
python3 - "$P/episode.json" "$N" "$P/props.json" <<'PY'
import json,sys; ep=json.load(open(sys.argv[1]))
if ep.get('audio')=='VO_PLACEHOLDER': ep['audio']=f'lf/{sys.argv[2]}/vo.wav'
json.dump({'ep':ep},open(sys.argv[3],'w'))
PY
cd "$R"; mkdir -p out/lf
npx remotion render src/index.ts LongForm "out/lf/$N.mp4" --props="$P/props.json" --gl=angle --concurrency=4 ${FRAMES:+--frames=$FRAMES} --log=error > "out/lf/$N.render.log" 2>&1 || { tail -20 "out/lf/$N.render.log"; exit 1; }
echo "rendered: showreel/out/lf/$N.mp4"; "$T/qc.sh" "out/lf/$N.mp4"
