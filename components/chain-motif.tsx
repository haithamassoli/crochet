/* A row of chain stitches that draws itself in — the site's signature motif */
export function ChainMotif({ loops = 7 }: { loops?: number }) {
  return (
    <svg
      viewBox={`0 0 ${loops * 27 + 8} 30`}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      className="h-7 w-auto text-primary"
    >
      {Array.from({ length: loops }, (_, i) => (
        <ellipse
          key={i}
          cx={17 + i * 27}
          cy={15}
          rx={14.5}
          ry={9.5}
          transform={`rotate(-12 ${17 + i * 27} 15)`}
          className="chain-loop"
          style={{ animationDelay: `${i * 110}ms` }}
        />
      ))}
    </svg>
  );
}
