"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";

const marqueeText = "NEXORA · STRATEGY · DESIGN · VISIBILITY · GROWTH · ";
const shapes = [
  { id: "ribbon", label: "Ribbon" },
  { id: "capsule", label: "Capsule" },
  { id: "diagonal", label: "Diagonal" },
  { id: "orbit", label: "Orbit" },
];

function Track({ reverse = false }: { reverse?: boolean }) {
  return <div className={`marquee-track ${reverse ? "reverse" : ""}`} aria-hidden="true"><span>{marqueeText}</span><span>{marqueeText}</span></div>;
}

export function KineticGallery() {
  const [active, setActive] = useState("ribbon");
  const [paused, setPaused] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({ x: ((event.clientX - rect.left) / rect.width - .5) * 20, y: ((event.clientY - rect.top) / rect.height - .5) * 20 });
  }

  const style = { "--pointer-x": `${pointer.x}px`, "--pointer-y": `${pointer.y}px` } as CSSProperties;

  return <section className="kinetic-section" aria-labelledby="kinetic-title"><div className="container">
    <div className="kinetic-heading"><div><span className="kinetic-kicker">Motion as a language</span><h2 id="kinetic-title">A digital presence with a pulse.</h2></div><p>Hover to slow the motion. Tap the center to pause. Choose a shape to change the composition.</p></div>
    <div className={`kinetic-stage shape-${active} ${paused ? "is-paused" : ""}`} style={style} onPointerMove={onPointerMove} onPointerLeave={() => setPointer({ x: 0, y: 0 })}>
      <div className="kinetic-glow" />
      <div className="kinetic-ribbon"><Track /></div>
      <div className="kinetic-capsule"><Track reverse /></div>
      <div className="kinetic-diagonal"><Track /></div>
      <div className="kinetic-orbit orbit-ring-one"><Track /></div>
      <div className="kinetic-orbit orbit-ring-two"><Track reverse /></div>
      <button type="button" className="kinetic-core" aria-label={paused ? "Play marquee motion" : "Pause marquee motion"} aria-pressed={paused} onClick={() => setPaused(!paused)}><span className="core-mark">NX</span><small>{paused ? "play" : "pause"}</small></button>
      <span className="kinetic-side-label label-left">STRATEGY / 01</span><span className="kinetic-side-label label-right">GROWTH / 04</span>
    </div>
    <div className="kinetic-controls"><div className="shape-controls" role="group" aria-label="Choose marquee shape">{shapes.map((shape) => <button key={shape.id} type="button" className={active === shape.id ? "active" : ""} aria-pressed={active === shape.id} onClick={() => setActive(shape.id)}>{shape.label}</button>)}</div><button type="button" className="motion-toggle" onClick={() => setPaused(!paused)}>{paused ? "Play motion" : "Pause motion"} <span>{paused ? "▶" : "Ⅱ"}</span></button></div>
  </div></section>;
}
