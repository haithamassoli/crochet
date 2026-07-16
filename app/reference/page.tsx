import Link from "next/link";
import { ArrowLeft, CircleDot, Languages, Scissors, Wand2 } from "lucide-react";
import { REFERENCE_TOPICS } from "@/lib/content";

const TOPIC_META: Record<string, { icon: typeof CircleDot; description: string }> = {
  yarn: {
    icon: CircleDot,
    description: "ألياف الخيوط وأوزانها وكيف تختار الأنسب لمشروعك.",
  },
  hooks: {
    icon: Wand2,
    description: "مقاسات السنّارات وموادها وكيف توائم بينها وبين خيطك.",
  },
  tools: {
    icon: Scissors,
    description: "الأدوات المساعدة من المقصّ إلى العلّامات التي تسهّل عملك.",
  },
  glossary: {
    icon: Languages,
    description: "المصطلحات ورموزها بين العربية والإنجليزية في مكان واحد.",
  },
};

export const metadata = {
  title: "المراجع",
};

export default function ReferenceIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-14 pb-16 md:pt-20 md:pb-24">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-balance md:text-5xl">
          المراجع
        </h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          صندوق أدوات تعود إليه كلّما احتجت: أدلّة الخيوط والإبر والأدوات وقاموس
          المصطلحات، بين يديك وقت الحاجة.
        </p>
      </header>

      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {REFERENCE_TOPICS.map((topic) => {
          const meta = TOPIC_META[topic.slug];
          const Icon = meta.icon;
          return (
            <li key={topic.slug}>
              <Link
                href={`/reference/${topic.slug}`}
                className="group flex h-full flex-col rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-background">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold">
                  {topic.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {meta.description}
                </p>
                <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                  اطّلع
                  <ArrowLeft
                    className="size-4 transition-transform group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
