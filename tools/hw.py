#!/usr/bin/env python3
"""Handwritten "Real Tax Math" pipeline (2026-11-17). Keeps every routine step in one script so a chat spends tokens
only on facts, script and layout.

  python3 tools/hw.py new <p>                 scaffold <p>/ from tools/hw_template (film.py = last video's layout to edit)
  python3 tools/hw.py vo <p> [gap]            download <p>/vo/urls.txt ("NN url" per line) → trim (TEMPO env) →
                                              place lines (gap s, default 0.4) → vo_place.json → vo_master.wav;
                                              prints line times + speech segments (for writing cues)
  python3 tools/hw.py preview <p> t1,t2,...   contact sheet → <p>/assets/contact_00.jpg (look once)
  python3 tools/hw.py final <p> <cover_s>     full render + mux + QC (decode, LUFS, peak) + cover.jpg + qc_end.jpg +
                                              cover fields + PUBLISH.md + Publishing Kit card merged into
                                              channel/publishing-kit.html and $SCR/publishing-kit.html
Engine: b4/engine.py. Deliver <p>/build/<p>_final.mp4 directly (no share copy)."""
import json, os, re, shutil, subprocess, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TPL = os.path.join(REPO, "tools", "hw_template")
KIT = os.path.join(REPO, "channel", "publishing-kit.html")


def sh(*a, **k):
    return subprocess.run(a, check=True, **k)


def new(p):
    d = os.path.join(REPO, p)
    os.makedirs(os.path.join(d, "vo", "grady"), exist_ok=True)
    os.makedirs(os.path.join(d, "assets"), exist_ok=True)
    os.makedirs(os.path.join(d, "build"), exist_ok=True)
    shutil.copy(os.path.join(TPL, "gitignore"), os.path.join(d, ".gitignore"))
    for f in ("prep_grady.py", "build_vo.py"):
        shutil.copy(os.path.join(TPL, f), os.path.join(d, "vo", f))
    for f in ("make_publish.py", "film.py"):
        if not os.path.exists(os.path.join(d, f)):
            shutil.copy(os.path.join(TPL, f), os.path.join(d, f))
    s = open(os.path.join(d, "film.py")).read()
    s = re.sub(r"b\d+_silent", f"{p}_silent", s)
    open(os.path.join(d, "film.py"), "w").write(s)
    print(f"scaffolded {p}/ — edit {p}/film.py build() text/positions/times, footer FOOT, camera pushes")


def vo(p, gap=0.4):
    d = os.path.join(REPO, p)
    for line in open(os.path.join(d, "vo", "urls.txt")):
        if line.strip():
            n, url = line.split()
            sh("curl", "-sS", "-o", os.path.join(d, "vo", "grady", f"line{int(n):02d}.mp3"), url)
    shutil.rmtree(os.path.join(d, "vo", "grady", "proc"), ignore_errors=True)
    sh(sys.executable, os.path.join(d, "vo", "prep_grady.py"), stdout=subprocess.DEVNULL)
    seg = json.load(open(os.path.join(d, "vo", "grady", "proc", "segments.json")))
    lines = json.load(open(os.path.join(d, "vo", "lines.json")))
    t, out = 0.2, []
    for i, txt in enumerate(lines):
        n = f"line{i:02d}"
        out.append([n, round(t, 3), txt, 0.0, seg[n]["dur"]])
        t += seg[n]["dur"] + gap
    json.dump(out, open(os.path.join(d, "vo_place.json"), "w"), indent=0)
    end = out[-1][1] + out[-1][4]
    for n, s, txt, _, e in out:
        print(f"{s:6.2f}-{s + e:6.2f} {txt[:60]} | {[round(s + a, 2) for a, _ in seg[n]['speech']]}")
    print(f"VO end {end:.2f}; video ≈{end + 2.6:.2f} s (must be 45–70)")
    if 45 <= end + 2.6 <= 70:
        sh(sys.executable, os.path.join(d, "vo", "build_vo.py"), stdout=subprocess.DEVNULL)
        print("vo_master.wav built")


def preview(p, times):
    sh(sys.executable, "film.py", "--preview", times, cwd=os.path.join(REPO, p), stdout=subprocess.DEVNULL)
    print(f"{p}/assets/contact_00.jpg")


def final(p, cover):
    d = os.path.join(REPO, p)
    b = os.path.join(d, "build")
    sh(sys.executable, "film.py", cwd=d, stdout=open(os.path.join(b, "render.log"), "w"))
    fin = os.path.join(b, f"{p}_final.mp4")
    sh("ffmpeg", "-y", "-v", "error", "-i", os.path.join(b, f"{p}_silent.mp4"), "-i", os.path.join(d, "vo", "vo_master.wav"),
       "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-af", "apad,alimiter=limit=0.70:level=false", "-c:a", "aac", "-b:a", "192k",
       "-ar", "48000", "-shortest", "-movflags", "+faststart", fin)
    pr = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_name,width,height,nb_frames",
                                    "-show_entries", "format=duration", "-of", "json", fin], capture_output=True, text=True).stdout)
    dec = subprocess.run(["ffmpeg", "-v", "error", "-i", fin, "-f", "null", "-"], capture_output=True, text=True).stderr.strip()
    lo = subprocess.run(["ffmpeg", "-nostats", "-i", fin, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    I, pk = re.findall(r"I:\s+(-?[\d.]+) LUFS", lo)[-1], re.findall(r"Peak:\s+(-?[\d.]+) dBFS", lo)[-1]
    dur = float(pr["format"]["duration"])
    v = pr["streams"][0]
    sh("ffmpeg", "-v", "error", "-y", "-ss", str(cover), "-i", fin, "-frames:v", "1", os.path.join(d, "cover.jpg"))
    sh("ffmpeg", "-v", "error", "-y", "-ss", f"{dur - 0.4:.2f}", "-i", fin, "-frames:v", "1", "-vf", "scale=540:960",
       os.path.join(d, "assets", "qc_end.jpg"))
    pj = os.path.join(d, "publish.json")
    pub = json.load(open(pj))
    pub["video"]["duration"] = f"{dur:.2f} s ({v['nb_frames']} frames)"
    pub["video"]["mp4"] = f"{p}/build/{p}_final.mp4"
    pub["_mp4"] = f"{p}_final.mp4"
    c = pub.setdefault("cover", {})
    ms = int(round(cover * 1000))
    c.update(timestamp_s=cover, ms=ms, frame=f"{p}/cover.jpg",
             metricool_ig=f"manual action required (set videoCoverMilliseconds {ms} on /schedule)",
             metricool_tiktok="manual action required (Business-account status unverified)",
             youtube=f"manual — the user selects the cover at {int(cover // 60):02d}:{cover % 60:04.1f}")
    c.setdefault("checked_in_render", "extracted to cover.jpg — look at it and confirm")
    json.dump(pub, open(pj, "w"), indent=1, ensure_ascii=False)
    sh(sys.executable, "make_publish.py", cwd=d)
    h = open(KIT, encoding="utf8").read()
    m = re.search(r"const D=(\[.*?\]);\n", h, re.S)
    D = [x for x in json.loads(m.group(1)) if x.get("_label") != pub.get("_label")] + [pub]
    h = h[:m.start(1)] + json.dumps(D, ensure_ascii=False) + h[m.end(1):]
    open(KIT, "w", encoding="utf8").write(h)
    scr = os.environ.get("SCR")
    if scr:
        open(os.path.join(scr, "publishing-kit.html"), "w", encoding="utf8").write(h)
    print(f"{p}: {v['width']}x{v['height']} {v['nb_frames']} frames {dur:.2f} s · decode {'OK' if not dec else dec[:120]} · "
          f"{I} LUFS · peak {pk} dBFS · cover {cover}s → {p}/cover.jpg · end frame {p}/assets/qc_end.jpg · kit cards {len(D)}")


if __name__ == "__main__":
    cmd, p = sys.argv[1], sys.argv[2]
    {"new": lambda: new(p), "vo": lambda: vo(p, float(sys.argv[3]) if len(sys.argv) > 3 else 0.4),
     "preview": lambda: preview(p, sys.argv[3]), "final": lambda: final(p, float(sys.argv[3]))}[cmd]()
