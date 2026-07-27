"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import "./ScrollStack.css";

export interface ScrollStackItem {
  number: string;
  title: string;
  description?: string;
  href: string;
}

function ScrollStackCard({ item, index, isGrid }: { item: ScrollStackItem; index: number; isGrid: boolean }) {
  const itemRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: itemRef, offset: ["start 92%", "end 18%"] });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.72, 1], [0.94, 1, 0.975, 0.94]), { stiffness: 125, damping: 24, mass: 0.7 });
  const rotate = useSpring(useTransform(scrollYProgress, [0, 0.4, 0.72, 1], [index % 2 ? -2.5 : 2.5, 0, index % 2 ? 0.8 : -0.8, index % 2 ? 1.5 : -1.5]), { stiffness: 115, damping: 22, mass: 0.7 });
  const y = useSpring(useTransform(scrollYProgress, [0, 0.42, 1], [44, 0, -18]), { stiffness: 130, damping: 25, mass: 0.7 });
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.84, 1], [0.55, 1, 1, 0.86]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.76, 1], ["blur(4px)", "blur(0px)", "blur(0px)", `blur(${Math.min(index * 0.35, 1.8)}px)`]);

  const motionStyle = isGrid ? { "--stack-index": index } : { "--stack-index": index, scale, rotate, y, opacity, filter: blur };

  return (
    <motion.article ref={itemRef} className="scroll-stack__item" style={motionStyle as CSSProperties}>
      <a className="scroll-stack__card" href={item.href}>
        <span className="scroll-stack__number">{item.number}</span>
        <span className="scroll-stack__copy">
          <span className="scroll-stack__eyebrow">Nexora service path</span>
          <strong>{item.title}</strong>
          {item.description && <span className="scroll-stack__description">{item.description}</span>}
        </span>
        <span className="scroll-stack__arrow" aria-hidden="true">↗</span>
      </a>
    </motion.article>
  );
}

export default function ScrollStack({ items, variant = "stack" }: { items: ScrollStackItem[]; variant?: "stack" | "grid" }) {
  const isGrid = variant === "grid";

  return (
    <div className={`scroll-stack${isGrid ? " scroll-stack--grid" : ""}`} aria-label="Nexora services">
      {items.map((item, index) => <ScrollStackCard item={item} index={index} isGrid={isGrid} key={item.href} />)}
    </div>
  );
}
