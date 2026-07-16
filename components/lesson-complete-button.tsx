"use client";

import { Circle, CircleCheckBig } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function LessonCompleteButton({ slug }: { slug: string }) {
  const { completed, toggle } = useProgress();
  const done = !!completed[slug];

  return (
    <button
      type="button"
      aria-pressed={done}
      onClick={() => toggle(slug)}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-base font-semibold outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px",
        done
          ? "bg-secondary text-secondary-foreground"
          : "bg-primary text-primary-foreground hover:bg-primary/85"
      )}
    >
      {done ? (
        <CircleCheckBig className="size-5" aria-hidden="true" />
      ) : (
        <Circle className="size-5" aria-hidden="true" />
      )}
      {done ? "أنهيت هذا الدرس — أحسنت!" : "علّم الدرس كمُكتمل"}
    </button>
  );
}
