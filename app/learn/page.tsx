import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { lessonsByLevel } from "@/lib/content";
import { ChainProgress } from "@/components/chain-progress";
import { ContinueCta } from "@/components/continue-cta";
import { StitchBadge } from "@/components/stitch-badge";
import { cn } from "@/lib/utils";

const LEVELS = lessonsByLevel();
const CONTINUE_LESSONS = LEVELS.flatMap(({ level, lessons }) =>
  lessons.map((l) => ({ slug: l.slug, title: l.title, levelTitle: level.title }))
);
const TOTAL_LESSONS = LEVELS.reduce((sum, { lessons }) => sum + lessons.length, 0);

export const metadata = {
  title: "مسار التعلّم",
  description:
    "مسار تعلّم الكروشيه في أربعة مستويات متسلسلة: من المبتدئ الذي يمسك السنّارة لأوّل مرة إلى المحترف الذي يصمّم الباترونات ويبيع مشغولاته.",
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-16 md:pt-14">
      <header className="text-center">
        <h1 className="font-display text-3xl font-bold text-balance md:text-4xl">
          مسار التعلّم
        </h1>
        <p className="mt-3 text-muted-foreground md:text-lg">
          {TOTAL_LESSONS} درسًا من أوّل غرزة حتى الاحتراف
        </p>
      </header>

      <div className="mt-8">
        <ContinueCta lessons={CONTINUE_LESSONS} />
      </div>

      <div className="mt-10 space-y-12">
        {LEVELS.map(({ level, lessons }) => (
          <section key={level.id} id={level.id} className="scroll-mt-20">
            <div className="flex items-start gap-3">
              <StitchBadge level={level.id} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h2 className="font-display text-xl font-semibold text-balance md:text-2xl">
                    {level.title}
                  </h2>
                  <span className="rounded-full border bg-card px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {lessons.length} دروس
                  </span>
                </div>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">
                  {level.description}
                </p>
              </div>
            </div>

            <ChainProgress
              slugs={lessons.map((l) => l.slug)}
              className="mt-4"
            />

            <ol className="mt-5 space-y-3">
              {lessons.map((lesson) => (
                <li key={lesson.slug}>
                  <Link
                    href={`/learn/${lesson.slug}`}
                    className={cn(
                      "group flex items-center gap-4 rounded-2xl border bg-card p-4",
                      "transition-colors hover:bg-muted",
                      "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    )}
                  >
                    <span className="font-display text-2xl font-bold text-primary tabular-nums">
                      {lesson.order}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-balance">
                        {lesson.title}
                      </span>
                      {lesson.skills.length > 0 && (
                        <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                          {lesson.skills.slice(0, 2).join(" · ")}
                        </span>
                      )}
                    </span>
                    <ChevronLeft
                      className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
