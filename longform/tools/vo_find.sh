#!/usr/bin/env bash
# vo_find.sh <n> <jobid>: download Higgsfield VO by probing hf_<DATE>_<HHMMSS>_<jobid>.mp3 from START for 20 min (no jobs_wait polling)
# usage (in episode dir): DATE=20261027 START=0348 xargs -P20 -n2 ../tools/vo_find.sh < jobs.txt
n=$1; j=$2; [ -s vo/L$n.mp3 ] && exit 0; mkdir -p vo; h=${START:0:2}; m=${START:2:2}
for t in $(seq 0 1200); do s=$((10#$h*3600+10#$m*60+t)); ts=$(printf "%02d%02d%02d" $((s/3600)) $((s%3600/60)) $((s%60)))
  curl -sf -o vo/L$n.mp3 "https://d8j0ntlcm91z4.cloudfront.net/user_34B6c4N28uYxNknSTjhsvdQ5biA/hf_${DATE}_${ts}_$j.mp3" && exit 0; done; echo "MISS L$n"
