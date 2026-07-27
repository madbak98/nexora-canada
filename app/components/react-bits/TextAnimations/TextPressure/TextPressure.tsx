// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  className?: string;
  minFontSize?: number;
  as?: "h1" | "div";
}

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance: number, maxDist: number, minVal: number, maxVal: number) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func: () => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
};

const TextPressure: React.FC<TextPressureProps> = ({
  text = "Compressa",
  fontFamily = "Roboto Flex",
  fontUrl = "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap",
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = "#FFFFFF",
  strokeColor = "#FF0000",
  className = "",
  minFontSize = 24,
  as = "h1",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const chars = Array.from(text);
  const TitleTag = as;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorRef.current.x = event.clientX;
      cursorRef.current.y = event.clientY;
    };
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      cursorRef.current.x = touch.clientX;
      cursorRef.current.y = touch.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width: containerWidth, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + containerWidth / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
    let newFontSize = containerWidth / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);
    newFontSize = Math.min(newFontSize, Math.max(minFontSize, containerWidth * 0.085));
    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();
      if (scale && textRect.height > 0) {
        const yRatio = containerHeight / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener("resize", debouncedSetSize);
    return () => window.removeEventListener("resize", debouncedSetSize);
  }, [setSize]);

  useEffect(() => {
    let rafId: number;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const charCenter = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
          const distance = dist(mouseRef.current, charCenter);
          const wdth = width ? Math.floor(getAttr(distance, maxDist, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(distance, maxDist, 100, 900)) : 400;
          const italValue = italic ? getAttr(distance, maxDist, 0, 1).toFixed(2) : "0";
          const alphaValue = alpha ? getAttr(distance, maxDist, 0, 1).toFixed(2) : "1";
          const fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italValue}`;

          if (span.style.fontVariationSettings !== fontVariationSettings) {
            span.style.fontVariationSettings = fontVariationSettings;
          }
          if (alpha && span.style.opacity !== alphaValue) {
            span.style.opacity = alphaValue;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [alpha, italic, weight, width]);

  const styleElement = useMemo(() => (
    <style>{`
      @import url('${fontUrl}');
      .nx-text-pressure-flex { display: flex; justify-content: space-between; }
      .nx-text-pressure-stroke span { position: relative; color: ${textColor}; }
      .nx-text-pressure-stroke span::after { content: attr(data-char); position: absolute; left: 0; top: 0; color: transparent; z-index: -1; -webkit-text-stroke-width: 3px; -webkit-text-stroke-color: ${strokeColor}; }
      .nx-text-pressure-title { color: ${textColor}; }
    `}</style>
  ), [fontUrl, strokeColor, textColor]);

  const dynamicClassName = [className, flex ? "nx-text-pressure-flex" : "", stroke ? "nx-text-pressure-stroke" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%", background: "transparent" }}>
      {styleElement}
      <TitleTag
        ref={titleRef}
        className={`nx-text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform: "none",
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
          margin: 0,
          textAlign: "left",
          userSelect: "none",
          whiteSpace: "nowrap",
          fontWeight: 100,
          width: "100%",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={`${char}-${i}`}
            ref={element => { spansRef.current[i] = element; }}
            data-char={char}
            style={{ display: "inline-block", color: stroke ? undefined : textColor }}
          >
            {char}
          </span>
        ))}
      </TitleTag>
    </div>
  );
};

export default TextPressure;
