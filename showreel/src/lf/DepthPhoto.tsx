// TAX SECRETS CANADA — 2.5D "living photo": a still + its depth map (Depth Anything V2, computed locally) rendered
// with a WebGL parallax shader. A virtual camera dollies/trucks/orbits; near pixels move more than far ones, so the
// photo reads as filmed footage. Procedural only — no video generator.
import React, { useEffect, useRef, useState } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';

export type Cam = { x: number; y: number; z: number; r?: number; focus?: number }; // x,y: -1..1 truck; z: dolly 0..1

const VS = `attribute vec2 p; varying vec2 uv; void main(){ uv = p*0.5+0.5; uv.y = 1.0-uv.y; gl_Position = vec4(p,0.,1.); }`;
const FS = `precision highp float; varying vec2 uv; uniform sampler2D img, dep; uniform vec2 cam; uniform float zoom, focus, amt, aspI, aspV, rot, t;
float D(vec2 q){ return texture2D(dep, q).r; }
void main(){
  vec2 c = uv - 0.5;
  float s = sin(rot), co = cos(rot); c = mat2(co,-s,s,co) * c;
  // cover-fit image into viewport
  vec2 k = aspV > aspI ? vec2(1.0, aspI/aspV) : vec2(aspV/aspI, 1.0);
  vec2 base = c * k / zoom + 0.5;
  // iterative relief: march toward the displaced sample so edges don't smear
  vec2 q = base; float d = D(q);
  for(int i=0;i<6;i++){ vec2 off = cam * (d - focus) * amt + (base-0.5) * (d - focus) * amt * 1.6 * (zoom-1.0); q = base - off; d = mix(d, D(q), 0.6); }
  q = clamp(q, 0.002, 0.998);
  vec3 col = texture2D(img, q).rgb;
  // atmospheric depth: far planes slightly hazier/cooler, near slightly warmer
  col = mix(col, col*vec3(0.92,0.97,1.06)+0.015, (1.0-d)*0.25);
  gl_FragColor = vec4(col, 1.0);
}`;

const loadImg = (src: string) => new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => res(i); i.onerror = rej; i.src = src; });

export const DepthPhoto: React.FC<{ src: string; depth: string; cam: Cam; t: number; amt?: number; w?: number; h?: number }> = ({ src, depth, cam, t, amt = 0.045, w = 1920, h = 1080 }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const st = useRef<{ gl: WebGLRenderingContext; prog: WebGLProgram; aspI: number } | null>(null);
  const [handle] = useState(() => delayRender('depth ' + src));
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let dead = false;
    Promise.all([loadImg(staticFile(src)), loadImg(staticFile(depth))]).then(([im, dm]) => {
      if (dead || !ref.current) return;
      const gl = ref.current.getContext('webgl', { preserveDrawingBuffer: true, antialias: false })!;
      const sh = (ty: number, s: string) => { const o = gl.createShader(ty)!; gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o) ?? 'shader'); return o; };
      const prog = gl.createProgram()!; gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog); gl.useProgram(prog);
      const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      [im, dm].forEach((I, i) => { const tx = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, tx);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, I); });
      gl.uniform1i(gl.getUniformLocation(prog, 'img'), 0); gl.uniform1i(gl.getUniformLocation(prog, 'dep'), 1);
      st.current = { gl, prog, aspI: im.width / im.height }; setReady(true); continueRender(handle);
    }).catch((e) => { console.error(e); continueRender(handle); });
    return () => { dead = true; };
  }, [src, depth, handle]);
  useEffect(() => {
    const s = st.current; if (!s) return; const { gl, prog } = s; const U = (n: string) => gl.getUniformLocation(prog, n);
    gl.viewport(0, 0, w, h);
    gl.uniform2f(U('cam'), cam.x, cam.y); gl.uniform1f(U('zoom'), 1.06 + cam.z * 0.22); gl.uniform1f(U('focus'), cam.focus ?? 0.35);
    gl.uniform1f(U('amt'), amt); gl.uniform1f(U('aspI'), s.aspI); gl.uniform1f(U('aspV'), w / h); gl.uniform1f(U('rot'), ((cam.r ?? 0) * Math.PI) / 180); gl.uniform1f(U('t'), t);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  });
  return <canvas ref={ref} width={w} height={h} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: ready ? 1 : 0 }} />;
};
