# Design System — غُرزة

Arabic crochet learning site. Warm, handmade, app-like. **RTL always** (`<html lang="ar" dir="rtl">`).
Brand name: **غُرزة** ("stitch"). Tone: friendly Modern Standard Arabic, neutral singular imperative (تعلَّم، اصنع), no filler. Western digits (0-9).

## Palette (oklch — source of truth is `app/globals.css`)

Grounded in dyed yarn + Levantine madder red. NOT terracotta-on-cream, NOT generic pink.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` غزل | `oklch(0.972 0.011 39)` blush-linen | `oklch(0.205 0.02 26)` plum-night | page |
| `--foreground` حبر | `oklch(0.27 0.033 26)` espresso-plum | `oklch(0.96 0.008 39)` | text |
| `--primary` توت | `oklch(0.5 0.16 14)` madder-raspberry | `oklch(0.68 0.13 14)` | CTAs, completed stitches, links |
| `--secondary` زعتر | `oklch(0.9 0.03 145)` sage wash | `oklch(0.32 0.03 145)` | reference-section surfaces |
| `--accent` عسل | `oklch(0.85 0.08 78)` honey wash | `oklch(0.35 0.05 78)` | level badges, highlights |
| `--card` | `oklch(0.985 0.007 39)` | `oklch(0.25 0.022 26)` | cards |

Muted/border/ring derive from the same warm hue family (no gray-neutral). Both themes required (`prefers-color-scheme` + `.dark`).

## Type

- `--font-display`: **Baloo Bhaijaan 2** (next/font/google, arabic+latin) — h1/h2, level names, big numbers only. Weights 600/700.
- `--font-sans`: **Rubik** (arabic+latin) — everything else. 400/500/600.
- Headings `text-balance`; body `leading-relaxed` (Arabic needs generous line-height ≥1.7).

## Signature (the one bold thing — keep everything else quiet)

1. **Chain progress**: every progress indicator is a crochet chain — SVG row of chain loops, one loop per lesson. Completed = filled `--primary`, next = outlined + subtle pulse, rest = faint outline. Component: `components/chain-progress.tsx`.
2. **Stitch level badges**: levels use real international crochet symbols, taller = harder: مبتدئ = chain (oval), متوسط = sc (+), متقدم = dc (Ŧ), محترف = tr (double bar). Component: `components/stitch-badge.tsx`. Structure encodes the actual skill ladder — never use them decoratively elsewhere.

Motion: ONE orchestrated moment — hero chain draws itself on load (stroke-dashoffset). Completion toggle fills a loop. Nothing else animates. Always guard with `prefers-reduced-motion`.

## Rules (all agents)

- Tailwind **logical properties only**: `ms-/me-/ps-/pe-/start-/end-/text-start` — never `ml/mr/left/right/text-left`.
- shadcn base-nova idiom: Base UI primitives, cva variants, `data-slot`, `cn()` from `@/lib/utils`. Match `components/ui/button.tsx` style.
- Mobile-first; tap targets ≥44px; visible `focus-visible` rings; semantic HTML (`nav`, `main`, `article`).
- Icons: lucide-react. Directional icons must flip in RTL (use `rtl:rotate-180` where needed).
- YouTube embeds: click-to-load facade only, never autoload iframes.
- Layout: sticky top header (brand + desktop nav) + **mobile bottom tab bar** (app feel for PWA): المسار، المراجع، المصادر، الرئيسية.
