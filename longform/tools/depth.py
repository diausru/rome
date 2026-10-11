"""Depth map for a plate (Depth Anything V2 Small, runs locally on CPU) -> 16-bit-ish grayscale PNG (white = near).
usage: depth.py in.jpg out_depth.png [width]"""
import sys, numpy as np
from PIL import Image, ImageFilter
from transformers import pipeline
src, out = sys.argv[1], sys.argv[2]; W = int(sys.argv[3]) if len(sys.argv) > 3 else 1440
im = Image.open(src).convert('RGB')
pipe = pipeline('depth-estimation', model='depth-anything/Depth-Anything-V2-Small-hf', device=-1)
d = np.array(pipe(im)['predicted_depth'].squeeze().numpy(), dtype=np.float32)
d = (d - d.min()) / (d.max() - d.min() + 1e-6)
dm = Image.fromarray((d * 255).astype(np.uint8)).resize((W, round(W * im.height / im.width)), Image.BICUBIC)
dm.filter(ImageFilter.GaussianBlur(2.5)).save(out); print('ok', dm.size)
