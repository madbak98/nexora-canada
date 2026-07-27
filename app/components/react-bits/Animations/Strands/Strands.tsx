"use client";

import { useEffect, useRef } from "react";
import { Geometry, Mesh, Program, Renderer, Transform } from "ogl";
import "./Strands.css";

interface StrandsProps {
  colors?: string[];
  count?: number;
  speed?: number;
  amplitude?: number;
  waviness?: number;
  thickness?: number;
  glow?: number;
  taper?: number;
  spread?: number;
  intensity?: number;
  opacity?: number;
  scale?: number;
  glass?: boolean;
  refraction?: number;
  dispersion?: number;
  glassSize?: number;
}

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform int uCount;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaviness;
uniform float uThickness;
uniform float uGlow;
uniform float uTaper;
uniform float uSpread;
uniform float uIntensity;
uniform float uOpacity;
uniform float uScale;
uniform float uGlass;
uniform float uGlassSize;

const float PI = 3.14159265;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv /= max(uScale, 0.0001);

  float envelope = pow(max(cos(uv.x * PI * 1.3), 0.0), uTaper);
  float energy = 0.06 + uIntensity * 0.94;
  vec3 color = vec3(0.0);

  for (int i = 0; i < 3; i++) {
    if (i >= uCount) break;
    float fi = float(i);
    float phase = fi * 1.7 * uSpread;
    float frequency = (2.0 + fi * 0.35) * uWaviness;
    float time = uTime * uSpeed;
    float wave = sin(uv.x * frequency + time * (1.4 + fi * 1.1) + phase) * 0.6;
    wave += sin(uv.x * frequency * 1.1 - time * (1.0 + fi * 0.5) + phase * 1.7) * 0.4;
    float y = wave * (0.1 + 0.02 * energy) * envelope * uAmplitude;
    float distanceToStrand = abs(uv.y - y - (fi - 1.0) * 0.06 * uSpread);
    float thickness = (0.001 + 0.05 * energy) * (0.35 + envelope) * uThickness;
    float strand = thickness / (distanceToStrand + thickness * 0.45);
    strand *= strand * envelope;
    float palettePosition = fi / max(float(uCount), 1.0) + uv.x * 0.3 + uTime * 0.04;
    float blend = fract(palettePosition * 2.0);
    vec3 baseColor = i == 0 ? uColor1 : (i == 1 ? uColor2 : uColor3);
    vec3 nextColor = i == 0 ? uColor2 : (i == 1 ? uColor3 : uColor1);
    vec3 strandColor = mix(baseColor, nextColor, blend);
    color += strandColor * strand;
  }

  color *= 0.45 + 0.7 * energy;
  color = 1.0 - exp(-color * uGlow);

  if (uGlass > 0.5) {
    float radius = length(uv);
    float glassEdge = 1.0 - smoothstep(uGlassSize * 0.38, uGlassSize * 0.48, radius);
    color += vec3(0.08, 0.22, 0.9) * glassEdge * 0.13;
  }

  float luminance = max(max(color.r, color.g), color.b);
  float alpha = clamp(luminance, 0.0, 1.0) * uOpacity;
  if (alpha < 0.004) discard;
  gl_FragColor = vec4(color * uOpacity, alpha);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  return [
    parseInt(normalized.slice(0, 2), 16) / 255,
    parseInt(normalized.slice(2, 4), 16) / 255,
    parseInt(normalized.slice(4, 6), 16) / 255,
  ];
}

export default function Strands({
  colors = ["#2AAEBF", "#2A63BF", "#3B2ABF"],
  count = 2,
  speed = 0.6,
  amplitude = 0.2,
  waviness = 1.6,
  thickness = 0.5,
  glow = 1.15,
  taper = 1.1,
  spread = 3,
  intensity = 0.65,
  opacity = 0.75,
  scale = 1.2,
  glass = true,
  refraction = 1.85,
  dispersion = 4,
  glassSize = 0.92,
}: StrandsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ colors, count, speed, amplitude, waviness, thickness, glow, taper, spread, intensity, opacity, scale, glass, refraction, dispersion, glassSize });

  useEffect(() => {
    propsRef.current = { colors, count, speed, amplitude, waviness, thickness, glow, taper, spread, intensity, opacity, scale, glass, refraction, dispersion, glassSize };
  }, [amplitude, colors, count, dispersion, glass, glassSize, glow, intensity, opacity, refraction, scale, speed, spread, taper, thickness, waviness]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 1.5), depth: false, stencil: false, antialias: false, powerPreference: "high-performance" });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const camera = undefined;
    const scene = new Transform();
    const geometry = new Geometry(gl, { position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) } });
    const current = propsRef.current;
    const palette = current.colors.slice(0, 3).map(hexToRgb);
    while (palette.length < 3) palette.push(palette[palette.length - 1] || [0.2, 0.5, 1]);
    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Float32Array([1, 1]) },
        uColor1: { value: palette[0] },
        uColor2: { value: palette[1] },
        uColor3: { value: palette[2] },
        uCount: { value: current.count },
        uSpeed: { value: current.speed },
        uAmplitude: { value: current.amplitude },
        uWaviness: { value: current.waviness },
        uThickness: { value: current.thickness },
        uGlow: { value: current.glow },
        uTaper: { value: current.taper },
        uSpread: { value: current.spread },
        uIntensity: { value: current.intensity },
        uOpacity: { value: current.opacity },
        uScale: { value: current.scale },
        uGlass: { value: current.glass ? 1 : 0 },
        uGlassSize: { value: current.glassSize },
      },
    });
    new Mesh(gl, { geometry, program }).setParent(scene);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.uResolution.value[0] = width * renderer.dpr;
      program.uniforms.uResolution.value[1] = height * renderer.dpr;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const start = performance.now();
    let frame = 0;
    const render = (now: number) => {
      const props = propsRef.current;
      program.uniforms.uTime.value = (now - start) * 0.001;
      program.uniforms.uCount.value = Math.min(Math.max(Math.round(props.count), 1), 3);
      program.uniforms.uSpeed.value = props.speed;
      program.uniforms.uAmplitude.value = props.amplitude;
      program.uniforms.uWaviness.value = props.waviness;
      program.uniforms.uThickness.value = props.thickness;
      program.uniforms.uGlow.value = props.glow;
      program.uniforms.uTaper.value = props.taper;
      program.uniforms.uSpread.value = props.spread;
      program.uniforms.uIntensity.value = props.intensity;
      program.uniforms.uOpacity.value = props.opacity;
      program.uniforms.uScale.value = props.scale;
      program.uniforms.uGlass.value = props.glass ? 1 : 0;
      program.uniforms.uGlassSize.value = props.glassSize;
      const colors = props.colors.slice(0, 3).map(hexToRgb);
      while (colors.length < 3) colors.push(colors[colors.length - 1] || [0.2, 0.5, 1]);
      program.uniforms.uColor1.value = colors[0];
      program.uniforms.uColor2.value = colors[1];
      program.uniforms.uColor3.value = colors[2];
      renderer.render({ scene, camera });
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className="strands-container" aria-hidden="true" />;
}
