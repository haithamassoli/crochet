# PRD — Arabic Crochet Learning Website

## Summary
Arabic-only, RTL website that teaches crochet from beginner to professional through one structured learning path. Each lesson pairs a short original Arabic intro with curated top Arabic and international videos. An original reference library covers yarn types, hook types, tools, and an Arabic↔English stitch glossary. Installable PWA with a custom install popup. No backend: content is files in the repo, learner progress lives in localStorage.

## Problem
Arabic crochet content is scattered across YouTube with no ordered path from zero to mastery; the best structured material is in English. Learners don't know what to learn next, which yarn/hook to buy, or how to read international patterns.

## Users
Arabic-speaking crochet learners, complete beginner to advanced hobbyist. Primarily mobile.

## Core features

### 1. Learning path
- 4 levels: مبتدئ، متوسط، متقدم، محترف. Each level = ordered lessons.
- Lesson page: title, skills taught, short original Arabic intro (what/why/tips), 1+ embedded YouTube videos (Arabic primary; international alternative when the best explanation is non-Arabic), links to related reference pages, prev/next navigation.
- Path overview page: all levels and lessons with completion state.

### 2. Progress tracking
- Per-lesson "completed" toggle, stored in localStorage only. No accounts, no sync.
- Level and overall completion percentages derived from it.
- Home and path pages surface a "continue" CTA pointing at the first incomplete lesson.

### 3. Reference library
Original Arabic pages, each its own SEO-indexed route:
- Yarn: fiber types, weights, what each is used for.
- Hooks/needles: types, materials, sizes, when to use each.
- Tools: essential accessories and their purpose.
- Glossary: Arabic ↔ English crochet terms and standard abbreviations (ch, sc, dc, …) so learners can follow international patterns.

### 4. Curated resources
- Directory of top external resources: Arabic YouTube channels, international channels, pattern sites. Entry = name, language, level, one-line Arabic description, link.

### 5. PWA + install popup
- Web app manifest (Arabic name, icons, standalone display) → installable. No service worker, no offline caching.
- Custom install popup: shown once, on the second page view. On Android/desktop it triggers the native install prompt via `beforeinstallprompt`; on iOS Safari it shows manual "Add to Home Screen" steps instead. Dismissal is stored in localStorage and the popup never auto-shows again.

## Content model
- All content = Markdown/JSON files under `content/`, statically rendered at build. Editing = commit + redeploy.
- `content/lessons/*.md`: frontmatter `{slug, level, order, title, skills[], videos[{url, lang, title}]}`, body = Arabic intro.
- `content/reference/*.md`: one file per reference page.
- `content/resources.json`: curated resource list.

## Pages
- `/` — pitch, path overview, continue CTA
- `/learn` — path overview; `/learn/[slug]` — lesson
- `/reference/{yarn|hooks|tools|glossary}`
- `/resources`

## Non-functional
- UI fully Arabic, `dir="rtl"`, Arabic web font.
- Mobile-first responsive.
- Every page statically generated; no runtime backend.
- SEO: Arabic metadata, Open Graph, sitemap, semantic HTML.
- YouTube embeds load lazily (click-to-load facade) to keep pages fast.
- Stack: existing Next.js + Tailwind + shadcn/ui repo.

## Out of scope (v1)
Accounts/auth, database, CMS/admin panel, cross-device sync, comments/community, site search, monetization, offline content caching, non-Arabic UI.
