import { cn } from "@/lib/utils";

/* Chain-stitch loop — the unit everything on the site is built from */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.8}
      strokeLinecap="round"
      className={cn("size-7 text-primary", className)}
    >
      <ellipse cx="16" cy="13.5" rx="8" ry="10" transform="rotate(16 16 13.5)" />
      <path d="M11.5 25.5c2.5 3 8 3.5 11 1" />
    </svg>
  );
}
