import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  getAdjacentLessons,
  getLesson,
  getLessons,
  LEVELS,
  REFERENCE_TOPICS,
} from "@/lib/content";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { StitchBadge } from "@/components/stitch-badge";
import { VideoFacade } from "@/components/video-facade";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLessons().map((lesson) => ({ slug: lesson.slug }));
}

/* Strip HTML tags from the intro, collapse whitespace, cap at 160 chars. */
function metaDescription(html: string): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 160 ? text.slice(0, 160).trimEnd() : text;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return {};
  return {
    title: lesson.title,
    description: metaDescription(lesson.introHtml),
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const level = LEVELS.find((l) => l.id === lesson.level);
  const levelTitle = level?.title ?? "";
  const countInLevel = getLessons().filter(
    (l) => l.level === lesson.level
  ).length;

  const { prev, next } = getAdjacentLessons(slug);

  const refTopics = lesson.refs
    .map((ref) => REFERENCE_TOPICS.find((t) => t.slug === ref))
    .filter((t): t is (typeof REFERENCE_TOPICS)[number] => Boolean(t));

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 pb-16 md:pt-10">
      <nav aria-label="مسار التنقل">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link
              href="/learn"
              className="transition-colors hover:text-foreground"
            >
              مسار التعلّم
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronLeft className="size-4" />
          </li>
          <li>
            <Link
              href={`/learn#${lesson.level}`}
              className="transition-colors hover:text-foreground"
            >
              {levelTitle}
            </Link>
          </li>
        </ol>
      </nav>

      <header className="mt-6">
        <div className="flex items-center gap-3">
          <StitchBadge level={lesson.level} />
          <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            {levelTitle}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-[1.3] md:text-4xl">
          {lesson.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          الدرس {lesson.order} من {countInLevel} — {levelTitle}
        </p>
      </header>

      {lesson.skills.length > 0 && (
        <section className="mt-8 rounded-2xl bg-secondary p-5 text-secondary-foreground">
          <h2 className="text-lg font-semibold">
            ماذا ستتعلّم في هذا الدرس
          </h2>
          <ul className="mt-3 space-y-2">
            {lesson.skills.map((skill) => (
              <li key={skill} className="flex items-start gap-2">
                <Check
                  className="mt-1 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="leading-relaxed">{skill}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div
        className="mt-8 text-[1.0625rem] [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-5 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:mt-1.5 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:ps-6 [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:ps-6"
        dangerouslySetInnerHTML={{ __html: lesson.introHtml }}
      />

      <section className="mt-10">
        <h2 className="text-xl font-semibold">شاهد وطبّق</h2>
        {lesson.videos.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {lesson.videos.map((video) => (
              <VideoFacade
                key={video.url}
                url={video.url}
                lang={video.lang}
                title={video.title}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed p-6 text-center">
            <p className="text-muted-foreground">
              الفيديوهات المنتقاة لهذا الدرس تُضاف قريبًا.
            </p>
            <Link
              href="/resources"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-4 h-11 px-5 text-base"
              )}
            >
              تصفّح القنوات المنتقاة
            </Link>
          </div>
        )}
      </section>

      <div className="mt-8">
        <LessonCompleteButton slug={lesson.slug} />
      </div>

      {refTopics.length > 0 && (
        <section className="mt-10 rounded-2xl border bg-card p-5">
          <h2 className="text-xl font-semibold">مراجع مفيدة لهذا الدرس</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {refTopics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/reference/${topic.slug}`}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "h-11 px-4 text-sm"
                  )}
                >
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(prev || next) && (
        <nav
          aria-label="التنقّل بين الدروس"
          className="mt-12 grid gap-3 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/learn/${prev.slug}`}
              className="flex min-h-16 items-center gap-3 rounded-2xl border bg-card p-4 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <ChevronRight
                className="size-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-muted-foreground">
                  السابق
                </span>
                <span className="block truncate font-medium">
                  {prev.title}
                </span>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next ? (
            <Link
              href={`/learn/${next.slug}`}
              className="flex min-h-16 items-center gap-3 rounded-2xl border bg-card p-4 text-end transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-muted-foreground">
                  التالي
                </span>
                <span className="block truncate font-medium">
                  {next.title}
                </span>
              </span>
              <ChevronLeft
                className="size-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
        </nav>
      )}
    </div>
  );
}
