"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/* Extracts the video id from watch?v=, youtu.be/, shorts/ and embed/ URLs. */
function parseYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      return id || null;
    }
    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      if (u.pathname === "/watch") return u.searchParams.get("v") || null;
      const match = u.pathname.match(/^\/(?:shorts|embed)\/([^/?]+)/);
      if (match) return match[1] || null;
    }
    return null;
  } catch {
    return null;
  }
}

export function VideoFacade({
  url,
  lang,
  title,
}: {
  url: string;
  lang: "ar" | "en";
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const id = parseYouTubeId(url);
  const badge = lang === "ar" ? "بالعربية" : "بالإنجليزية";

  /* Unparseable URL → plain external link card, never a broken embed. */
  if (!id) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center gap-3 rounded-2xl border bg-card p-4 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <ExternalLink className="size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium">{title}</span>
          <span className="text-sm text-muted-foreground">
            فيديو خارجي · {badge}
          </span>
        </span>
      </a>
    );
  }

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-2xl border bg-muted">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`شغّل: ${title}`}
            className="group absolute inset-0 size-full cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Image
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
            <span
              className="absolute inset-0 bg-foreground/25 transition-colors group-hover:bg-foreground/35"
              aria-hidden="true"
            />
            <span
              className="absolute top-3 start-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm"
              aria-hidden="true"
            >
              {badge}
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105">
                <Play className="size-7 fill-current ps-0.5" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-sm font-medium leading-relaxed">
        {title}
      </figcaption>
    </figure>
  );
}
