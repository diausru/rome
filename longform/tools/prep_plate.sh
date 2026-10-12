#!/usr/bin/env bash
# prep_plate.sh <episode-dir> <public-subdir> <name> <url>: 4K still -> 2880px JPG + depth map in showreel/public
set -euo pipefail; P=$1; D=/home/user/rome/showreel/public/lf/$2/plates; mkdir -p "$D" "$P/plates"
curl -sf -o "$P/plates/$3_4k.png" "$4"
python3 -c "from PIL import Image; Image.open('$P/plates/$3_4k.png').convert('RGB').resize((2880,1613),Image.LANCZOS).save('$D/$3.jpg',quality=92)"
python3 "$(dirname "$0")/depth.py" "$D/$3.jpg" "$D/$3_d.png" 1440 2>&1 | tail -1
