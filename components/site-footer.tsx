import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { NAV_ITEMS } from "@/components/nav-items";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 pb-28 md:flex-row md:items-center md:justify-between md:pb-10">
        <div className="flex items-center gap-2">
          <BrandMark className="size-6" />
          <p className="text-sm text-muted-foreground">
            <span className="font-display text-base font-bold text-foreground">
              غُرزة
            </span>{" "}
            — مسار عربي مفتوح لتعلّم الكروشيه، صُنع بخيطٍ وحُب.
          </p>
        </div>
        <nav aria-label="روابط تذييل الصفحة">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
