"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./Ferrofluid.css";

interface FerrofluidProps {
  colors?: string[];
  speed?: number;
  scale?: number;
  turbulence?: number;
  fluidity?: number;
  rimWidth?: number;
  sharpness?: number;
  shimmer?: number;
  glow?: number;
  flowDirection?: "up" | "down" | "left" | "right";
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
}

const VERTEX = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform int uColorCount;
uniform vec2 uFlow;
uniform float uSpeed;
uniform float uScale;
uniform float uTurbulence;
uniform float uFluidity;
uniform float uRimWidth;
uniform float uSharpness;
uniform float uShimmer;
uniform float uGlow;
uniform float uOpacity;
uniform float uMouseEnabled;
uniform float uMouseStrength;
uniform float uMouseRadius;
varying vec2 vUv;

const float PI = 3.14159265;

vec3 palette(float h) {
  int count = max(uColorCount, 1);
  int index = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
  if (index <= 0) return uColor0;
  if (index == 1) return uColor1;
  return uColor2;
}

float hash(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 33.33);
  return fract((p.x + p.y) * p.z);
}

float smin(float a, float b, float k) {
  float r = exp2(-a / k) + exp2(-b / k);
  return -k * log2(r);
}

float smoothNoise(vec2 p, float size, float seed) {
  vec2 cell = floor(p / size);
  vec2 local = mod(p, size) / size;
  float a = hash(vec3(cell, seed));
  float b = hash(vec3(cell + vec2(1.0, 0.0), seed));
  float c = hash(vec3(cell + vec2(1.0, 1.0), seed));
  float d = hash(vec3(cell + vec2(0.0, 1.0), seed));
  vec2 blend = (sin(local * PI - PI * 0.5) + 1.0) * 0.5;
  return mix(mix(a, b, blend.x), mix(d, c, blend.x), blend.y);
}

void main() {
  float reference = 700.0 / max(uScale, 0.05);
  vec2 p = (vUv * iResolution.xy) / iResolution.y * reference;
  float time = iTime;
  float travel = time * 200.0 * uSpeed;
  vec2 perpendicular = vec2(-uFlow.y, uFlow.x);
  float distortionA = smoothNoise(p + perpendicular * travel, 60.0, 10.0) * 50.0 * uTurbulence;
  float distortionB = smoothNoise(p - perpendicular * travel, 120.0, 15.0) * 100.0 * uTurbulence;
  float peaksA = smoothNoise(p + distortionA + uFlow * travel * 0.5, 40.0, 1.0);
  float peaksB = smoothNoise(p + distortionB - uFlow * travel * 0.5, 40.0, 0.0);
  float surface = smin(peaksA, peaksB, max(uFluidity, 0.001));
  float mouseGlow = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 mouse = iMouse / iResolution.y * reference;
    float distanceToMouse = length(p - mouse) / reference;
    mouseGlow = exp(-distanceToMouse * distanceToMouse / max(uMouseRadius * uMouseRadius, 0.0001)) * uMouseStrength;
  }
  float band = (uRimWidth - abs((surface - 0.4) * 2.0)) * 5.0;
  float light = clamp(band - smoothNoise(p + uFlow * travel * 0.5, 60.0, 12.0) * uShimmer, 0.0, 1.0);
  light = pow(light, uSharpness) * uGlow * clamp(1.0 - mouseGlow, 0.0, 1.0);
  float hue = clamp(0.5 + (peaksA - peaksB) * 0.8, 0.0, 1.0);
  vec3 color = palette(hue) * light;
  float alpha = clamp(max(max(color.r, color.g), color.b), 0.0, 1.0) * uOpacity;
  if (alpha < 0.003) discard;
  gl_FragColor = vec4(color, alpha);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [parseInt(value.slice(0, 2), 16) / 255, parseInt(value.slice(2, 4), 16) / 255, parseInt(value.slice(4, 6), 16) / 255];
}

function flowVector(direction: FerrofluidProps["flowDirection"]): [number, number] {
  if (direction === "up") return [0, 1];
  if (direction === "left") return [-1, 0];
  if (direction === "right") return [1, 0];
  return [0, -1];
}

export default function Ferrofluid({
  colors = ["#13213A", "#2563EB", "#1D4ED8"],
  speed = 0.28,
  scale = 1.6,
  turbulence = 1,
  fluidity = 0.12,
  rimWidth = 0.22,
  sharpness = 2.5,
  shimmer = 1.15,
  glow = 2,
  flowDirection = "down",
  opacity = 0.58,
  mouseInteraction = false,
  mouseStrength = 1,
  mouseRadius = 0.35,
}: FerrofluidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ colors, speed, scale, turbulence, fluidity, rimWidth, sharpness, shimmer, glow, flowDirection, opacity, mouseInteraction, mouseStrength, mouseRadius });

  useEffect(() => {
    propsRef.current = { colors, speed, scale, turbulence, fluidity, rimWidth, sharpness, shimmer, glow, flowDirection, opacity, mouseInteraction, mouseStrength, mouseRadius };
  }, [colors, flowDirection, fluidity, glow, mouseInteraction, mouseRadius, mouseStrength, opacity, rimWidth, scale, sharpness, shimmer, speed, turbulence]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 1.5) });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      container.appendChild(gl.canvas);
      const initial = propsRef.current;
      const palette = initial.colors.slice(0, 3).map(hexToRgb);
      while (palette.length < 3) palette.push(palette[palette.length - 1] || [0.08, 0.2, 0.4]);
      const uniforms = {
        iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
        iMouse: { value: [0, 0] },
        iTime: { value: 0 },
        uColor0: { value: palette[0] }, uColor1: { value: palette[1] }, uColor2: { value: palette[2] },
        uColorCount: { value: Math.min(initial.colors.length, 3) }, uFlow: { value: flowVector(initial.flowDirection) },
        uSpeed: { value: initial.speed }, uScale: { value: initial.scale }, uTurbulence: { value: initial.turbulence },
        uFluidity: { value: initial.fluidity }, uRimWidth: { value: initial.rimWidth }, uSharpness: { value: initial.sharpness },
        uShimmer: { value: initial.shimmer }, uGlow: { value: initial.glow }, uOpacity: { value: initial.opacity },
        uMouseEnabled: { value: initial.mouseInteraction ? 1 : 0 }, uMouseStrength: { value: initial.mouseStrength }, uMouseRadius: { value: initial.mouseRadius },
      };
      const program = new Program(gl, { vertex: VERTEX, fragment: FRAGMENT, uniforms, transparent: true });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
      const resize = () => {
        const rect = container.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
      };
      const observer = new ResizeObserver(resize);
      observer.observe(container);
      resize();
      let frame = 0;
      const render = (time: number) => {
        const props = propsRef.current;
        const currentColors = props.colors.slice(0, 3).map(hexToRgb);
        while (currentColors.length < 3) currentColors.push(currentColors[currentColors.length - 1] || [0.08, 0.2, 0.4]);
        uniforms.iTime.value = time * 0.001;
        uniforms.uColor0.value = currentColors[0]; uniforms.uColor1.value = currentColors[1]; uniforms.uColor2.value = currentColors[2];
        uniforms.uColorCount.value = Math.min(Math.max(props.colors.length, 1), 3); uniforms.uFlow.value = flowVector(props.flowDirection);
        uniforms.uSpeed.value = props.speed; uniforms.uScale.value = props.scale; uniforms.uTurbulence.value = props.turbulence;
        uniforms.uFluidity.value = props.fluidity; uniforms.uRimWidth.value = props.rimWidth; uniforms.uSharpness.value = props.sharpness;
        uniforms.uShimmer.value = props.shimmer; uniforms.uGlow.value = props.glow; uniforms.uOpacity.value = props.opacity;
        uniforms.uMouseEnabled.value = props.mouseInteraction ? 1 : 0; uniforms.uMouseStrength.value = props.mouseStrength; uniforms.uMouseRadius.value = props.mouseRadius;
        renderer.render({ scene: mesh });
        frame = requestAnimationFrame(render);
      };
      frame = requestAnimationFrame(render);
      return () => { cancelAnimationFrame(frame); observer.disconnect(); if (gl.canvas.parentNode === container) container.removeChild(gl.canvas); gl.getExtension("WEBGL_lose_context")?.loseContext(); };
    } catch {
      return undefined;
    }
  }, []);

  return <div ref={containerRef} className="ferrofluid-container" aria-hidden="true" />;
}
