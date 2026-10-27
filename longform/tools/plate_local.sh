#!/usr/bin/env bash
# plate_local.sh <ep-dir> <lfNN>: plates/sN.png -> showreel/public/lf/<lfNN>/plates/sN.jpg (2880x1613) + depth
set -e; D=/home/user/rome/showreel/public/lf/$2/plates; mkdir -p "$D"
for f in "$1"/plates/s*.png; do n=$(basename "$f" .png)
  python3 -c "from PIL import Image; Image.open('$f').convert('RGB').resize((2880,1613),Image.LANCZOS).save('$D/$n.jpg',quality=92)"
  python3 "$(dirname "$0")/depth.py" "$D/$n.jpg" "$D/${n}_d.png" 1440 2>&1 | tail -1; done
