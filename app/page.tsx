import Link from "next/link";
import { BookOpen, PlayCircle, Route } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ChainMotif } from "@/components/chain-motif";
import { ContinueCta } from "@/components/continue-cta";
import { StitchBadge } from "@/components/stitch-badge";
import { getLessons, lessonsByLevel } from "@/lib/content";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Route,
    title: "مسار مرتّب",
    body: "دروس متسلسلة يبني كلّ درس على ما قبله، فلا تحتار من أين تبدأ ولا ماذا بعد.",
  },
  {
    icon: PlayCircle,
    title: "أفضل الشروحات",
    body: "فيديوهات منتقاة بعناية من أفضل القنوات العربية والعالمية لكلّ مهارة.",
  },
  {
    icon: BookOpen,
    title: "مراجع شاملة",
    body: "أدلّة الخيوط والإبر والأدوات وقاموس المصطلحات، بين يديك وقت الحاجة.",
  },
];

export default function Home() {
  const levels = lessonsByLevel();
  const continueLessons = getLessons().map((l) => ({
    slug: l.slug,
    title: l.title,
    levelTitle: levels.find((g) => g.level.id === l.level)?.level.title ?? "",
  }));

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-14 pb-10 text-center md:pt-24">
        <p className="text-sm font-medium text-primary">
          مسار عربي متكامل لتعلّم فنّ الكروشيه
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-[1.25] md:text-6xl md:leading-[1.2]">
          تعلّم الكروشيه…
          <br />
          غُرزة بعد غُرزة
        </h1>
        <div className="mt-5 flex justify-center">
          <ChainMotif />
        </div>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground md:text-lg">
          خطة تعلّم مرتّبة تأخذك من مسك السنّارة لأوّل مرة إلى تصميم قطعك الخاصة
          وبيعها، بأفضل الشروحات العربية والعالمية ومراجع شاملة للخيوط والإبر
          والأدوات.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/learn"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 px-6 text-base"
            )}
          >
            ابدأ رحلة التعلّم
          </Link>
          <Link
            href="/reference"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 px-6 text-base"
            )}
          >
            استكشف المراجع
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12" aria-label="تابع رحلتك">
        <ContinueCta lessons={continueLessons} />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
        <h2 className="text-2xl font-bold">مستويات المسار</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          رمز الغرزة على كلّ مستوى هو رمزها الحقيقي في مخطّطات الكروشيه العالمية
          — كلّما ارتفعت الغرزة، ارتفع مستواك.
        </p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {levels.map(({ level, lessons }) => (
            <li key={level.id}>
              <Link
                href={`/learn#${level.id}`}
                className="group flex h-full flex-col rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-3">
                  <StitchBadge level={level.id} />
                  <div>
                    <h3 className="text-lg font-bold">{level.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {lessons.length} درسًا
                    </p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {level.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 md:pb-24">
        <ul className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((f) => (
            <li
              key={f.title}
              className="rounded-2xl border bg-card p-5 text-start"
            >
              <f.icon className="size-6 text-primary" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold">{f.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
