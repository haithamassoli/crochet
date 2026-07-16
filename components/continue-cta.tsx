"use client";

import Link from "next/link";
import { ArrowLeft, PartyPopper } from "lucide-react";
import { useProgress } from "@/lib/progress";

export type ContinueLesson = { slug: string; title: string; levelTitle: string };

/* Resolves the first incomplete lesson on the client (progress lives there). */
export function ContinueCta({ lessons }: { lessons: ContinueLesson[] }) {
  const { completed } = useProgress();
  const next = lessons.find((l) => !completed[l.slug]);
  const doneCount = lessons.filter((l) => completed[l.slug]).length;

  if (!next) {
    return (
      <div className="flex items-center gap-3 rounded-3xl border bg-card p-5">
        <PartyPopper className="size-8 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <p className="font-display text-lg font-bold">
            أنهيت المسار كاملًا — مبارك!
          </p>
          <p className="text-sm text-muted-foreground">
            عُد إلى أي درس وقتما شئت، أو شارك ما صنعته مع من تحب.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/learn/${next.slug}`}
      className="group flex items-center justify-between gap-4 rounded-3xl border bg-card p-5 transition-colors hover:border-primary/40"
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-primary">
          {doneCount > 0 ? "تابع من حيث توقفت" : "ابدأ أول درس"}
        </p>
        <p className="mt-1 truncate font-display text-lg font-bold">
          {next.title}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {next.levelTitle}
          {doneCount > 0 && (
            <>
              {" · "}
              <span dir="ltr" className="tabular-nums">
                {doneCount}/{lessons.length}
              </span>{" "}
              درسًا مكتملًا
            </>
          )}
        </p>
      </div>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:-translate-x-0.5">
        <ArrowLeft className="size-5" aria-hidden="true" />
      </span>
    </Link>
  );
}
