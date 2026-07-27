"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type LayoutTextFlipProps = {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
};

export function LayoutTextFlip({ text, words, duration = 3000, className = "" }: LayoutTextFlipProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % words.length);
    }, duration);
    return () => window.clearInterval(interval);
  }, [duration, words.length]);

  return (
    <span className={`nx-layout-text-flip ${className}`}>
      <span className="nx-layout-text-flip__static">{text}</span>
      <span className="nx-layout-text-flip__dynamic" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${activeIndex}-${words[activeIndex]}`}
            className="nx-layout-text-flip__word"
            initial={{ opacity: 0, y: 18, filter: "blur(7px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(7px)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {words[activeIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
