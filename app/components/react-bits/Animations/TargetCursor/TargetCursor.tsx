"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./TargetCursor.css";

interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  cursorColor?: string;
  cursorColorOnTarget?: string;
}

const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  cursorColor = "#13213A",
  cursorColorOnTarget = "#2563EB",
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!cursorRef.current || window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = "none";

    const corners = cornersRef.current;
    const spin = gsap.timeline({ repeat: -1 }).to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });
    let activeTarget: Element | null = null;

    const moveCursor = (event: MouseEvent) => {
      gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.1, ease: "power3.out" });
      if (!activeTarget) return;

      const rect = activeTarget.getBoundingClientRect();
      const positions = [
        { left: rect.left - 3, top: rect.top - 3 },
        { left: rect.right - 9, top: rect.top - 3 },
        { left: rect.right - 9, top: rect.bottom - 9 },
        { left: rect.left - 3, top: rect.bottom - 9 },
      ];
      corners.forEach((corner, index) => gsap.to(corner, { ...positions[index], duration: hoverDuration, ease: "power2.out", overwrite: true }));
    };

    const resetTarget = () => {
      if (!activeTarget) return;
      activeTarget = null;
      spin.restart();
      corners.forEach((corner, index) => gsap.to(corner, { ...[
        { x: -18, y: -18 },
        { x: 18, y: -18 },
        { x: 18, y: 18 },
        { x: -18, y: 18 },
      ][index], left: "50%", top: "50%", borderColor: cursorColor, duration: 0.3, ease: "power3.out" }));
      if (dotRef.current) gsap.to(dotRef.current, { backgroundColor: cursorColor, duration: 0.15 });
    };

    const handleOver = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest(targetSelector);
      if (!target || target === activeTarget) return;
      activeTarget = target;
      spin.pause();
      gsap.set(cursor, { rotation: 0 });
      gsap.to(corners, { borderColor: cursorColorOnTarget, duration: 0.15 });
      if (dotRef.current) gsap.to(dotRef.current, { backgroundColor: cursorColorOnTarget, duration: 0.15 });
      moveCursor(event);
    };

    const handleOut = (event: MouseEvent) => {
      const related = event.relatedTarget as Element | null;
      if (activeTarget && (!related || !activeTarget.contains(related))) resetTarget();
    };

    const handleDown = () => {
      gsap.to(cursor, { scale: 0.88, duration: 0.15 });
      if (dotRef.current) gsap.to(dotRef.current, { scale: 0.65, duration: 0.15 });
    };
    const handleUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      if (dotRef.current) gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      spin.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [cursorColor, cursorColorOnTarget, hideDefaultCursor, hoverDuration, spinDuration, targetSelector]);

  return (
    <div ref={cursorRef} className="target-cursor-wrapper" aria-hidden="true">
      <div ref={dotRef} className="target-cursor-dot" style={{ backgroundColor: cursorColor }} />
      {["corner-tl", "corner-tr", "corner-br", "corner-bl"].map((position, index) => (
        <div key={position} ref={element => { if (element) cornersRef.current[index] = element; }} className={`target-cursor-corner ${position}`} style={{ borderColor: cursorColor }} />
      ))}
    </div>
  );
};

export default TargetCursor;
