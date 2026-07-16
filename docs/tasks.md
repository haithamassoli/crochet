# Tasks — Arabic Crochet Learning Website

Execution note: before each milestone, read the relevant guides in `node_modules/next/dist/docs` (per AGENTS.md) — this Next.js version differs from training data.

## M1 — Foundation: Arabic RTL shell
- [x] Root layout: `lang="ar"`, `dir="rtl"`, Arabic web font, site-wide Arabic metadata defaults
- [x] Tailwind/shadcn theme: palette + typography tuned for Arabic text
- [x] App shell: mobile-first header nav (الرئيسية، مسار التعلم، المراجع، المصادر) + footer
- [x] Placeholder home page renders correct RTL on mobile
- [x] Deploy skeleton (e.g. Vercel) — pipeline works from day one *(production build verified locally; run `vercel` to deploy — needs your account)*

**Done =** deployed skeleton renders Arabic RTL correctly on a phone.

## M2 — Content pipeline: files → static pages
- [x] Create `content/` structure per PRD: `lessons/*.md`, `reference/*.md`, `resources.json`
- [x] Lesson frontmatter schema `{slug, level, order, title, skills[], videos[{url, lang, title}]}` — validate at build, fail on bad frontmatter
- [x] Markdown → HTML rendering for lesson intros and reference pages
- [x] Seed placeholder content: 2 lessons per level, 1 reference page *(exceeded: 31 real curriculum lessons seeded)*
- [x] Lesson routes statically generated from content files *(43 static pages in build)*

**Done =** adding a `.md` file + redeploy produces a new static lesson page.

## M3 — Learning path pages
- [x] `/learn`: 4 levels (مبتدئ، متوسط، متقدم، محترف) with ordered lesson lists
- [x] `/learn/[slug]`: title, skills, Arabic intro, lazy click-to-load YouTube embeds, related reference links, prev/next navigation
- [x] Home: pitch + path overview + continue CTA (static target for now; wired to progress in M4)

**Done =** a learner can browse every level and open any lesson.

## M4 — Progress tracking (localStorage)
- [x] Client-side progress store: toggle lesson completed, derive level + overall % — hydration-safe, no backend
- [x] "Completed" toggle on lesson pages
- [x] Completion state and percentages on `/learn` and home *(chain-stitch progress: one loop per lesson)*
- [x] Continue CTA resolves to first incomplete lesson

**Done =** progress survives reload and drives the continue CTA.

## M5 — Reference library + resources
- [x] `/reference/{yarn|hooks|tools|glossary}` rendered from `content/reference/*.md`, each SEO-indexed
- [x] Glossary layout: Arabic ↔ English terms + standard abbreviations (ch, sc, dc, …) as a table
- [x] `/resources` from `resources.json`: name, language, level, one-line Arabic description, link

**Done =** all reference routes live and linked from nav.

## M6 — PWA + install popup
- [x] Web app manifest: Arabic name, standalone display, icons (192/512 + maskable)
- [x] Full icon/favicon set
- [x] Install popup: shown once on second page view; `beforeinstallprompt` → native prompt (Android/desktop); iOS Safari → manual "Add to Home Screen" steps; dismissal stored in localStorage, never auto-shows again
- [x] Verify installability on Android Chrome and iOS Safari *(verified on Chromium: beforeinstallprompt fired, popup shown/dismissed/persisted; real-device iOS pass still recommended)*

**Done =** installs from the popup on Android; iOS shows correct instructions.

## M7 — Content, SEO, launch
- [ ] Author real content: curate videos + write Arabic intros for all lessons (long pole — start in parallel from M3)
- [ ] Write full reference pages, glossary, and resource list
- [ ] Per-page Arabic metadata, Open Graph, sitemap
- [ ] Lighthouse pass on mobile (perf/a11y/SEO); embeds stay lazy
- [ ] Final RTL audit: spacing, mirrored icons, numerals

**Done =** real content live, Lighthouse green, site indexable.
