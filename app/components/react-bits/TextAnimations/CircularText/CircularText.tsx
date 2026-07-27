import React, { useEffect } from "react";
import { motion, useAnimation, useMotionValue, MotionValue, Transition } from "motion/react";

import "./CircularText.css";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers" | "none";
  direction?: "clockwise" | "counterclockwise";
  className?: string;
}

const getRotationTransition = (duration: number, from: number, direction = 1, loop = true) => ({
  from,
  to: from + (360 * direction),
  ease: "linear" as const,
  duration,
  type: "tween" as const,
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number, direction = 1) => ({
  rotate: getRotationTransition(duration, from, direction),
  scale: {
    type: "spring" as const,
    damping: 20,
    stiffness: 300,
  },
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  direction = "clockwise",
  className = "",
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);
  const directionValue = direction === "counterclockwise" ? -1 : 1;

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + (360 * directionValue),
      scale: 1,
      transition: getTransition(spinDuration, start, directionValue),
    });
  }, [controls, directionValue, onHover, rotation, spinDuration, text]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover || onHover === "none") return;

    let transitionConfig: ReturnType<typeof getTransition> | Transition;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start, directionValue);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start, directionValue);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start, directionValue);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start, directionValue);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + (360 * directionValue),
      scale: 1,
      transition: getTransition(spinDuration, start, directionValue),
    });
  };

  return (
    <motion.div
      className={`circular-text ${className}`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      aria-label={text.replaceAll("*", " ")}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span key={`${letter}-${i}`} style={{ transform, WebkitTransform: transform }} aria-hidden="true">
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
