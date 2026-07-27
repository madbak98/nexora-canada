"use client";

import { useEffect, useRef } from "react";
import "./CursorGrid.css";

interface CursorGridProps {
  cellSize?: number;
  color?: string;
  radius?: number;
  maxOpacity?: number;
  fillOpacity?: number;
  gridOpacity?: number;
  lineWidth?: number;
  clickPulse?: boolean;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const value = hex.replace("#", "");
  const normalized = value.length === 3 ? value.split("").map(char => char + char).join("") : value;
  const number = parseInt(normalized.slice(0, 6), 16);
  return [(number >> 16) & 255, (number >> 8) & 255, number & 255];
};

const CursorGrid: React.FC<CursorGridProps> = ({ cellSize = 72, color = "#2563EB", radius = 180, maxOpacity = 0.45, fillOpacity = 0.05, gridOpacity = 0.08, lineWidth = 1, clickPulse = true, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;
    let frame = 0;
    let running = false;
    let lastFrame = 0;
    const alpha = new Float32Array(0);
    let cells = alpha;
    const touched = new Float64Array(0);
    let touchedAt = touched;
    const pulses: Array<{ x: number; y: number; time: number }> = [];

    const rebuild = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / cellSize) + 1;
      rows = Math.ceil(height / cellSize) + 1;
      offsetX = (width - columns * cellSize) / 2;
      offsetY = (height - rows * cellSize) / 2;
      cells = new Float32Array(columns * rows);
      touchedAt = new Float64Array(columns * rows);
    };

    const center = (index: number) => [offsetX + (index % columns) * cellSize + cellSize / 2, offsetY + Math.floor(index / columns) * cellSize + cellSize / 2];
    const energize = (x: number, y: number) => {
      const minColumn = Math.max(0, Math.floor((x - radius - offsetX) / cellSize));
      const maxColumn = Math.min(columns - 1, Math.floor((x + radius - offsetX) / cellSize));
      const minRow = Math.max(0, Math.floor((y - radius - offsetY) / cellSize));
      const maxRow = Math.min(rows - 1, Math.floor((y + radius - offsetY) / cellSize));
      const now = performance.now();
      for (let row = minRow; row <= maxRow; row += 1) {
        for (let column = minColumn; column <= maxColumn; column += 1) {
          const index = row * columns + column;
          const [cellX, cellY] = center(index);
          const distance = Math.hypot(cellX - x, cellY - y);
          if (distance > radius) continue;
          const level = (1 - distance / radius) ** 2 * (3 - 2 * (1 - distance / radius)) * maxOpacity;
          cells[index] = Math.max(cells[index], level);
          touchedAt[index] = now;
        }
      }
    };

    const draw = (now: number) => {
      const delta = Math.min(now - lastFrame, 50);
      lastFrame = now;
      context.clearRect(0, 0, width, height);
      const [red, green, blue] = hexToRgb(color);
      if (gridOpacity > 0) {
        context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${gridOpacity})`;
        context.lineWidth = 1;
        context.beginPath();
        for (let column = 0; column <= columns; column += 1) { const x = Math.round(offsetX + column * cellSize) + 0.5; context.moveTo(x, 0); context.lineTo(x, height); }
        for (let row = 0; row <= rows; row += 1) { const y = Math.round(offsetY + row * cellSize) + 0.5; context.moveTo(0, y); context.lineTo(width, y); }
        context.stroke();
      }

      let visible = false;
      for (let index = 0; index < cells.length; index += 1) {
        let level = cells[index];
        if (level <= 0) continue;
        if (now - touchedAt[index] > 400) { level = Math.max(0, level - delta / 850); cells[index] = level; }
        if (level <= 0) continue;
        visible = true;
        const [cellX, cellY] = center(index);
        const half = cellSize / 2;
        const gradient = context.createRadialGradient(cellX, cellY, half * 0.1, cellX, cellY, cellSize);
        gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${level})`);
        gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);
        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${level * fillOpacity})`;
        context.strokeStyle = gradient;
        context.lineWidth = lineWidth;
        context.fillRect(cellX - half, cellY - half, cellSize - 1, cellSize - 1);
        context.strokeRect(cellX - half, cellY - half, cellSize - 1, cellSize - 1);
      }
      if (pulses.length) visible = true;
      if (visible) frame = requestAnimationFrame(draw); else running = false;
    };

    const wake = () => { if (running) return; running = true; lastFrame = performance.now(); frame = requestAnimationFrame(draw); };
    const localPoint = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); return [event.clientX - rect.left, event.clientY - rect.top]; };
    const isInside = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom; };
    const move = (event: PointerEvent) => { if (!isInside(event)) return; const [x, y] = localPoint(event); energize(x, y); wake(); };
    const click = (event: PointerEvent) => { if (!clickPulse || !isInside(event)) return; const [x, y] = localPoint(event); pulses.push({ x, y, time: performance.now() }); wake(); };
    const resize = new ResizeObserver(() => { rebuild(); wake(); });
    rebuild(); wake(); resize.observe(container); document.addEventListener("pointermove", move); document.addEventListener("pointerdown", click);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); document.removeEventListener("pointermove", move); document.removeEventListener("pointerdown", click); };
  }, [cellSize, clickPulse, color, fillOpacity, gridOpacity, lineWidth, maxOpacity, radius]);

  return <div ref={containerRef} className={`cursor-grid ${className}`}><canvas ref={canvasRef} className="cursor-grid__canvas" /></div>;
};

export default CursorGrid;
