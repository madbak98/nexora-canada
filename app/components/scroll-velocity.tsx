"use client";

import { useEffect, useRef } from "react";

const WORDS = ["STRATEGY", "DESIGN", "SEARCH", "GROWTH", "PRODUCT", "NEXORA"];

function VelocityRow({ direction, baseVelocity, children }: { direction: 1 | -1; baseVelocity: number; children: React.ReactNode }) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let lastTime = performance.now();
    let lastScroll = window.scrollY;
    let scrollVelocity = 0;
    let offset = 0;

    const onScroll = () => {
      const nextScroll = window.scrollY;
      scrollVelocity += (nextScroll - lastScroll) * 0.7;
      lastScroll = nextScroll;
    };

    const tick = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      scrollVelocity *= Math.pow(0.001, delta);
      offset += direction * (baseVelocity * 18 + scrollVelocity) * delta;

      const loopWidth = row.scrollWidth / 2;
      if (loopWidth > 0) offset = ((offset % loopWidth) + loopWidth) % loopWidth - loopWidth;
      row.style.transform = `translate3d(${offset}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [baseVelocity, direction]);

  return <div className="nx-velocity-row-clip"><div ref={rowRef} className="nx-velocity-row">{children}{children}</div></div>;
}

export default function ScrollVelocityBand() {
  return (
    <section className="nx-velocity-band" aria-label="Nexora capabilities in motion">
      <div className="container nx-velocity-layout">
        <div className="nx-velocity-copy">
          <span className="nx-velocity-kicker"><i /> Connected thinking</span>
          <p>Every useful digital system connects the next decision to the next action.</p>
          <div className="nx-velocity-lines" aria-hidden="true">
            <VelocityRow direction={1} baseVelocity={1.5}>{WORDS.map(word => <span key={`a-${word}`}>{word}<b>✦</b></span>)}</VelocityRow>
            <VelocityRow direction={-1} baseVelocity={1.15}>{[...WORDS].reverse().map(word => <span key={`b-${word}`}>{word}<b>·</b></span>)}</VelocityRow>
          </div>
        </div>
      </div>
    </section>
  );
}
