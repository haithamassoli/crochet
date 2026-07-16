import type { LevelId } from "@/lib/content";
import { cn } from "@/lib/utils";

/* International crochet stitch symbols — taller stitch = harder level.
   beginner: chain (ch) · intermediate: single crochet (sc) ·
   advanced: double crochet (dc) · professional: treble (tr) */
const SYMBOLS: Record<LevelId, React.ReactNode> = {
  beginner: <ellipse cx="12" cy="12" rx="8" ry="5" />,
  intermediate: <path d="M4 12h16M12 4v16" />,
  advanced: <path d="M5 5h14M12 5v15M8.5 12.5l7-2.5" />,
  professional: <path d="M5 4h14M12 4v17M8.5 10.5l7-2.5M8.5 15l7-2.5" />,
};

export function StitchBadge({
  level,
  className,
}: {
  level: LevelId;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground",
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        className="size-5"
      >
        {SYMBOLS[level]}
      </svg>
    </span>
  );
}
