"use client";

import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

/* The signature: progress as a crochet chain — one loop per lesson.
   Completed loops fill, the next loop pulses, the rest wait as outlines.
   -scale-x-100 flips the SVG so the chain grows rightward-to-left (RTL). */
export function ChainProgress({
  slugs,
  className,
}: {
  slugs: string[];
  className?: string;
}) {
  const { completed } = useProgress();
  const doneCount = slugs.filter((s) => completed[s]).length;
  const currentIdx = slugs.findIndex((s) => !completed[s]);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox={`0 0 ${slugs.length * 27 + 8} 30`}
        role="img"
        aria-label={`اكتمل ${doneCount} من ${slugs.length} دروس`}
        fill="none"
        strokeWidth={2.5}
        strokeLinecap="round"
        className="h-6 w-auto max-w-full -scale-x-100"
      >
        {slugs.map((slug, i) => {
          const cx = 17 + i * 27;
          const state = completed[slug]
            ? "done"
            : i === currentIdx
              ? "current"
              : "todo";
          return (
            <ellipse
              key={slug}
              cx={cx}
              cy={15}
              rx={14.5}
              ry={9.5}
              transform={`rotate(-12 ${cx} 15)`}
              className={cn(
                state === "done" && "fill-primary/20 stroke-primary",
                state === "current" &&
                  "stroke-primary motion-safe:animate-pulse",
                state === "todo" && "stroke-border"
              )}
            />
          );
        })}
      </svg>
      <span
        dir="ltr"
        className="text-sm font-medium tabular-nums text-muted-foreground"
      >
        {doneCount}/{slugs.length}
      </span>
    </div>
  );
}
