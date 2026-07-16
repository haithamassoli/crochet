import type { Metadata } from "next";
import { ExternalLink, Globe, Layers, PlayCircle } from "lucide-react";
import { getResources, type Resource } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "المصادر",
  description:
    "مصادر كروشيه منتقاة يدويًا: أفضل القنوات العربية والعالمية ومواقع الباترونات الموثوقة.",
};

function ResourceCard({ resource }: { resource: Resource }) {
  const isArabic = resource.language === "ar";
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`زيارة ${resource.name} (يُفتح في نافذة جديدة)`}
      className="group flex flex-col rounded-2xl border bg-card p-5 transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-balance">{resource.name}</h3>
        <ExternalLink
          className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
          aria-hidden="true"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            isArabic
              ? "bg-secondary text-secondary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {isArabic ? "بالعربية" : "بالإنجليزية"}
        </span>
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
          {resource.level}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {resource.description_ar}
      </p>
    </a>
  );
}

const SECTIONS = [
  {
    key: "channels_ar" as const,
    icon: PlayCircle,
    title: "قنوات عربية",
    intro: "أفضل قنوات يوتيوب العربية لتعلّم الكروشيه من الصفر حتى الاحتراف.",
  },
  {
    key: "channels_intl" as const,
    icon: Globe,
    title: "قنوات عالمية",
    intro: "قنوات عالمية مرموقة تستحقّ المتابعة ولو بحاجز اللغة.",
  },
  {
    key: "pattern_sites" as const,
    icon: Layers,
    title: "مواقع الباترونات",
    intro: "منصّات موثوقة تجد فيها آلاف الباترونات المجانية والمدفوعة.",
  },
];

export default function ResourcesPage() {
  const resources = getResources();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold text-balance md:text-4xl">المصادر</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          منتقاة يدويًا؛ القنوات العربية أولًا ثم أفضل ما في العالم.
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {SECTIONS.map((section) => (
          <section key={section.key} aria-labelledby={`${section.key}-title`}>
            <div className="flex items-center gap-2">
              <section.icon
                className="size-5 text-primary"
                aria-hidden="true"
              />
              <h2
                id={`${section.key}-title`}
                className="font-display text-xl font-semibold"
              >
                {section.title}
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {section.intro}
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {resources[section.key].map((resource) => (
                <ResourceCard key={resource.url} resource={resource} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        هذه مصادر خارجية مستقلة؛ نراجع الروابط دوريًا.
      </p>
    </div>
  );
}
