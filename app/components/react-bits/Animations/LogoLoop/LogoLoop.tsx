"use client";

import React, { useMemo, useState } from "react";
import "./LogoLoop.css";

export type LogoItem = {
  node: React.ReactNode;
  href?: string;
  title?: string;
  ariaLabel?: string;
};

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  logoHeight?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
}

const LogoLoop = React.memo<LogoLoopProps>(({ logos, speed = 70, direction = "left", gap = 52, logoHeight = 22, pauseOnHover = true, hoverSpeed, fadeOut = true, fadeOutColor = "#071126", scaleOnHover = true, ariaLabel = "Nexora capabilities", className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const defaultDuration = Math.max(18, (logos.length * (logoHeight * 4.8 + gap)) / Math.max(Math.abs(speed), 1));
  const hoverDuration = hoverSpeed && hoverSpeed > 0
    ? Math.max(18, (logos.length * (logoHeight * 4.8 + gap)) / hoverSpeed)
    : defaultDuration;
  const animationDuration = isHovered && pauseOnHover ? hoverDuration : defaultDuration;
  const animationPlayState = isHovered && pauseOnHover && (!hoverSpeed || hoverSpeed === 0) ? "paused" : "running";
  const rootClassName = useMemo(() => [
    "logoloop",
    direction === "right" ? "logoloop--right" : "logoloop--left",
    fadeOut ? "logoloop--fade" : "",
    scaleOnHover ? "logoloop--scale-hover" : "",
    className,
  ].filter(Boolean).join(" "), [className, direction, fadeOut, scaleOnHover]);

  const renderItems = (copy: number, hidden: boolean) => (
    <ul className="logoloop__list" aria-hidden={hidden} key={`logos-${copy}`}>
      {logos.map((logo, index) => (
        <li className="logoloop__item" key={`${copy}-${index}`}>
          {logo.href ? (
            <a className="logoloop__link" href={logo.href} aria-label={logo.ariaLabel || logo.title || "Nexora capability"}>
              <span className="logoloop__node">{logo.node}</span>
            </a>
          ) : (
            <span className="logoloop__node" title={logo.title}>{logo.node}</span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={rootClassName}
      role="region"
      aria-label={ariaLabel}
      style={{
        ["--logoloop-gap" as string]: `${gap}px`,
        ["--logoloop-logoHeight" as string]: `${logoHeight}px`,
        ["--logoloop-duration" as string]: `${animationDuration}s`,
        ["--logoloop-fadeColor" as string]: fadeOutColor,
        ["--logoloop-playState" as string]: animationPlayState,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="logoloop__track">
        {renderItems(0, false)}
        {renderItems(1, true)}
      </div>
    </div>
  );
});

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
