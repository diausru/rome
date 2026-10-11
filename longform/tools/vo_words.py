"""Transcribe VO lines with word timestamps -> words.json; prints word-error check vs script."""
import json,sys,re,os,subprocess,numpy as np
def load(f):
    raw=subprocess.run(['ffmpeg','-v','error','-i',f,'-f','s16le','-ac','1','-ar','16000','-'],capture_output=True,check=True).stdout
    return np.frombuffer(raw,np.int16).astype(np.float32)/32768
from faster_whisper import WhisperModel
d=sys.argv[1]; L=json.load(open(os.path.join(d,'lines.json')))
m=WhisperModel('base.en',device='cpu',compute_type='int8')
out={}; norm=lambda s:re.sub(r"[^a-z0-9' ]"," ",s.lower()).split()
for k,t in L:
    segs,_=m.transcribe(load(os.path.join(d,'vo',k+'.mp3')),word_timestamps=True,language='en')
    ws=[{'w':w.word.strip(),'s':round(w.start,2),'e':round(w.end,2)} for s in segs for w in s.words]
    out[k]=ws
    a=norm(t); b=norm(' '.join(x['w'] for x in ws))
    import difflib; r=difflib.SequenceMatcher(None,a,b).ratio()
    if r<0.85: print(k,round(r,2),'| heard:',' '.join(b))
json.dump(out,open(os.path.join(d,'words.json'),'w'))
print('done',len(out))
