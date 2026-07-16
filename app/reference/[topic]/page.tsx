import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getReferencePage, REFERENCE_TOPICS } from "@/lib/content";

export function generateStaticParams() {
  return REFERENCE_TOPICS.map((topic) => ({ topic: topic.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const page = getReferencePage(topic);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function ReferenceTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const page = getReferencePage(topic);
  if (!page) notFound();

  const current = REFERENCE_TOPICS.find((t) => t.slug === topic);
  const others = REFERENCE_TOPICS.filter((t) => t.slug !== topic);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-16 md:pt-14 md:pb-24">
      <nav aria-label="مسار التنقل" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
          <li>
            <Link
              href="/reference"
              className="rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              المراجع
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronLeft className="size-4" />
          </li>
          <li className="font-medium text-foreground" aria-current="page">
            {current?.title}
          </li>
        </ol>
      </nav>

      <h1 className="mt-6 font-display text-4xl font-bold text-balance md:text-5xl">
        {page.title}
      </h1>
      {page.description ? (
        <p className="mt-4 text-muted-foreground md:text-lg">
          {page.description}
        </p>
      ) : null}

      <div
        className="mt-10 overflow-x-auto [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:leading-relaxed [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:ps-6 [&_p]:mb-4 [&_p]:leading-loose [&_strong]:font-semibold [&_strong]:text-foreground [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_td]:border [&_td]:p-3 [&_td]:align-top [&_th]:border [&_th]:bg-muted [&_th]:p-3 [&_th]:text-start [&_th]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:ps-6"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />

      <section className="mt-14 border-t pt-8">
        <h2 className="font-display text-lg font-semibold">مراجع أخرى</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {others.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/reference/${t.slug}`}
                className="group flex items-center justify-between gap-2 rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className="font-medium">{t.title}</span>
                <ChevronLeft
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
