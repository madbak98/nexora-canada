import "./HexagonPattern.css";

const defaultHighlights: Array<[number, number]> = [
  [1, 1], [4, 4], [2, 2], [3, 4], [5, 4], [8, 2], [6, 3], [8, 5], [10, 10]
];

export default function HexagonPattern({
  className = "",
  hexagons = defaultHighlights
}: {
  className?: string;
  hexagons?: Array<[number, number]>;
}) {
  return (
    <div className={`hexagon-pattern ${className}`} aria-hidden="true">
      <span className="hexagon-pattern__glow" />
      {hexagons.map(([column, row], index) => (
        <span className="hexagon-pattern__highlight" key={`${column}-${row}-${index}`} style={{ left: `${column * 69.28 - 34.64}px`, top: `${row * 60 - 40}px` }} />
      ))}
    </div>
  );
}
