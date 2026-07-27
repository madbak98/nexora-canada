"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./ProjectCardSwap.css";

export interface ProjectCardSwapItem {
  title: string;
  category: string;
  description: string;
  image: string;
}

export default function ProjectCardSwap({ items }: { items: ProjectCardSwapItem[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive(current => (current + 1) % items.length), 3000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <div className="project-card-swap" aria-label="Selected projects">
      <div className="project-card-swap__stage">
        {items.map((item, index) => {
          const position = (index - active + items.length) % items.length;
          const visible = position < 3;
          return (
            <motion.article
              className="project-card-swap__card"
              key={item.title}
              initial={false}
              animate={{
                x: position * 30,
                y: position * 75,
                scale: 1 - position * 0.055,
                rotate: position === 0 ? 0 : position % 2 ? 3.5 : -2.5,
                opacity: visible ? 1 - position * 0.12 : 0,
                zIndex: items.length - position,
                filter: position === 0 ? "blur(0px) saturate(1)" : `blur(${position * 5}px) saturate(${1 - position * 0.12})`,
              }}
              transition={{ duration: 0.7, ease: "linear" }}
              aria-hidden={position !== 0}
            >
              <img src={item.image} alt="" />
              <div className="project-card-swap__shade" />
              <div className="project-card-swap__content">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button type="button" className="shimmer-button" onClick={() => setActive((active + 1) % items.length)} aria-label={`Show next project after ${item.title}`}><span className="shimmer-button__content">↗</span></button>
              </div>
            </motion.article>
          );
        })}
      </div>
      <div className="project-card-swap__controls" aria-label="Project selection">
        {items.map((item, index) => <button type="button" className={`shimmer-button ${index === active ? "is-active" : ""}`} onClick={() => setActive(index)} key={item.title} aria-label={`Show ${item.title}`}><span className="shimmer-button__content">{String(index + 1).padStart(2, "0")}</span></button>)}
      </div>
    </div>
  );
}
