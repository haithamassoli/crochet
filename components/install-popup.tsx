"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Share, SquarePlus, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

const DISMISS_KEY = "ghurza:install-dismissed";
const PV_KEY = "ghurza:pageviews";
const MIN_PAGE_VIEWS = 2;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function dismissed() {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return true;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(DISMISS_KEY, "1");
  } catch {}
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches;
}

export function InstallPopup() {
  const pathname = usePathname();
  const [mode, setMode] = useState<"hidden" | "native" | "ios">("hidden");
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const pageViews = useRef(0);

  /* Chromium fires beforeinstallprompt when installable — capture it. */
  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  /* Count page views; from the 2nd one, offer install (once, ever). */
  useEffect(() => {
    if (dismissed() || isStandalone()) return;
    try {
      pageViews.current = Number(sessionStorage.getItem(PV_KEY) ?? "0") + 1;
      sessionStorage.setItem(PV_KEY, String(pageViews.current));
    } catch {
      return;
    }
    if (pageViews.current < MIN_PAGE_VIEWS) return;

    const timer = setTimeout(() => {
      if (dismissed() || isStandalone()) return;
      if (deferredPrompt.current) {
        setMode("native");
      } else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        setMode("ios");
      }
      /* other browsers: no reliable prompt — stay quiet */
    }, 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (mode === "hidden") return null;

  const close = () => {
    markDismissed();
    setMode("hidden");
  };

  const install = async () => {
    const evt = deferredPrompt.current;
    if (!evt) return close();
    await evt.prompt();
    await evt.userChoice;
    close();
  };

  return (
    <div
      role="dialog"
      aria-label="تثبيت تطبيق غُرزة"
      className="fixed inset-x-3 bottom-20 z-50 rounded-3xl border bg-card p-4 shadow-lg animate-in fade-in slide-in-from-bottom-4 motion-reduce:animate-none md:inset-x-auto md:end-6 md:bottom-6 md:max-w-sm"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent">
          <BrandMark className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold">
            ثبّت غُرزة على جهازك
          </p>
          {mode === "native" ? (
            <p className="mt-0.5 text-sm text-muted-foreground">
              افتح دروسك ومسار تقدّمك بلمسة واحدة، بدون متصفح.
            </p>
          ) : (
            <ol className="mt-1 space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5">
                1. اضغط زرّ المشاركة
                <Share className="size-4 shrink-0" aria-hidden="true" />
              </li>
              <li className="flex items-center gap-1.5">
                2. اختر «إضافة إلى الشاشة الرئيسية»
                <SquarePlus className="size-4 shrink-0" aria-hidden="true" />
              </li>
            </ol>
          )}
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="إغلاق"
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
      {mode === "native" && (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={install}
            className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground outline-none transition-all hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px"
          >
            تثبيت التطبيق
          </button>
          <button
            type="button"
            onClick={close}
            className="rounded-xl border px-4 py-2.5 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            ليس الآن
          </button>
        </div>
      )}
      {mode === "ios" && (
        <button
          type="button"
          onClick={close}
          className="mt-3 w-full rounded-xl border px-4 py-2.5 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          فهمت، شكرًا
        </button>
      )}
    </div>
  );
}
