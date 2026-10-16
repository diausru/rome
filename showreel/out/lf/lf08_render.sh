#!/usr/bin/env bash
cd /home/user/rome/showreel
while true; do r=$(CH=1500 bash ../longform/tools/next_chunk.sh ../longform/lf08-ab-mb-on lf08 2>&1 | tail -1); echo "$(date +%T) $r"; [[ "$r" == ALL_DONE ]] && break; [[ "$r" == *rc=[1-9]* ]] && break; done
