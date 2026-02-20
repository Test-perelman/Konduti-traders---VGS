# Claude.md — Konduti Traders Website

## Rule 1: Always invoke the Front-End Design Skill before writing any front-end code.

---

## Project Overview

**Company:** Konduti Traders
**Industry:** B2B Fresh Fruits & Vegetables Procurement & Distribution (India)
**Website Type:** Multi-page production B2B marketing website
**Theme:** Light, clean, premium, fresh agriculture aesthetic

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG/SSR for SEO, file-based routing, image optimization |
| Language | TypeScript | Type safety, maintainability |
| Styling | Tailwind CSS v3 | Utility-first, no CSS-in-JS overhead, fast purge |
| Animations | Framer Motion | Declarative, performant, scroll-linked animations |
| Hero Canvas | Vanilla Canvas API | Frame-by-frame scroll animation with zero dependency |
| Forms | React Hook Form | Lightweight, accessible form handling |
| Icons | Lucide React | Consistent, tree-shakeable icon set |
| Images | next/image | Automatic WebP, lazy load, blur placeholder |
| Fonts | Google Fonts (Inter + Playfair Display) via next/font | Zero CLS, self-hosted |
| SEO | next-seo + next/metadata | Structured data, OpenGraph, canonical URLs |

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-mint` | `#f6fbf4` | Page backgrounds, section fills |
| `--color-cream` | `#f5df99` | Accent highlights, badges, CTA backgrounds |
| `--color-green` | `#5fd068` | Primary buttons, links, tags, icons |
| `--color-teal` | `#4b8673` | Dark text, headers, footer, secondary CTAs |
| `--color-white` | `#ffffff` | Cards, modals, overlays |
| `--color-gray-light` | `#f0f4f0` | Borders, dividers, subtle backgrounds |
| `--color-gray-text` | `#6b7280` | Body text, captions |
| `--color-dark` | `#1a2e1a` | Headings, strong text |

**Enforcement:** Tailwind config must extend with these exact custom colors. No raw hex values in JSX — always use Tailwind token classes.

---

## Folder Structure

```
konduti-traders/
├── public/
│   ├── scroll_animation_frames/     # Symlinked or copied from source
│   │   ├── ezgif-frame-001.jpg
│   │   └── ... (60 frames)
│   ├── images/
│   │   ├── products/
│   │   ├── team/
│   │   ├── blog/
│   │   └── hero/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout, fonts, metadata
│   │   ├── page.tsx                 # Homepage
│   │   ├── about/page.tsx
│   │   ├── products/page.tsx
│   │   ├── how-it-works/page.tsx
│   │   ├── industries/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx             # Blog listing
│   │   │   └── [slug]/page.tsx      # Blog detail
│   │   └── contact/page.tsx
│   ├── components/
│   │   ├── ui/                      # Reusable primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── Container.tsx
│   │   │   └── Divider.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx      # Canvas scroll animation + copy
│   │   │   ├── AboutSnippet.tsx
│   │   │   ├── ProductCategories.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── HowItWorksSnippet.tsx
│   │   │   ├── WhoWeServe.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CtaBanner.tsx
│   │   ├── products/
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── CategorySidebar.tsx
│   │   ├── about/
│   │   │   ├── MissionVision.tsx
│   │   │   ├── SourcingNetwork.tsx
│   │   │   └── Leadership.tsx
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   └── BlogContent.tsx
│   │   └── contact/
│   │       ├── InquiryForm.tsx
│   │       └── ContactInfo.tsx
│   ├── hooks/
│   │   ├── useScrollAnimation.ts    # Canvas frame sequencer hook
│   │   └── useInView.ts             # Intersection observer wrapper
│   ├── data/
│   │   ├── products.ts
│   │   ├── blog-posts.ts
│   │   ├── testimonials.ts
│   │   └── industries.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Component Architecture

### Primitives (src/components/ui/)
All leaf components. Accept explicit props. No business logic. Fully typed.

- `Button` — variant: `primary | secondary | ghost | outline`; size: `sm | md | lg`
- `Badge` — variant: `green | cream | teal | gray`
- `Card` — base card with shadow, hover lift, border-radius
- `SectionHeader` — eyebrow + heading + subheading composition
- `Container` — max-width wrapper (1280px) with horizontal padding
- `Divider` — decorative horizontal rule with optional icon center

### Layout Components
- `Navbar` — Sticky, transparent-to-frosted-glass on scroll, mobile hamburger
- `Footer` — Multi-column layout, newsletter input, social links, legal

### Feature Components
Each page section is isolated in its own component. No cross-section imports except shared UI primitives.

---

## Animation Architecture

### Hero Scroll Animation (Canvas-based)
**File:** `src/components/home/HeroSection.tsx` + `src/hooks/useScrollAnimation.ts`

**Strategy:**
1. Wrap hero in a tall scroll container (e.g., `height: 600vh`) to create scroll space
2. Pin the canvas to viewport using `position: sticky; top: 0`
3. Calculate `progress = scrollY / (containerHeight - viewportHeight)`
4. Map progress to frame index: `frameIndex = Math.floor(progress * totalFrames)`
5. Draw current frame onto canvas each animation frame via `requestAnimationFrame`
6. Preload frames: first 10 eagerly, rest lazily in batches of 10
7. Fallback: static background image for `prefers-reduced-motion` or slow connections

**Performance Rules:**
- Use `requestAnimationFrame` only (never `setInterval`)
- Cancel RAF on unmount
- Use `canvas.getContext('2d', { alpha: false })` for opaque optimization
- Decode images via `new Image()` + `onload`
- Store decoded images in `useRef` array (never state) to prevent re-renders
- Debounce resize handler with `useEffect` cleanup

### Scroll-Reveal Animations (Framer Motion)
- All non-hero sections use `motion.div` with `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}`
- Trigger via `whileInView` with `viewport={{ once: true, margin: "-80px" }}`
- Stagger children using `staggerChildren: 0.1` variants

### Microinteractions
- Button hover: scale(1.02) + shadow lift
- Card hover: translateY(-4px) + shadow deepen
- Nav links: underline slide-in from left
- All durations ≤ 300ms

---

## Page Structure

| Page | Route | Rendering |
|---|---|---|
| Homepage | `/` | SSG |
| About Us | `/about` | SSG |
| Products | `/products` | SSG + client-side filter |
| How It Works | `/how-it-works` | SSG |
| Industries | `/industries` | SSG |
| Blog Listing | `/blog` | SSG |
| Blog Detail | `/blog/[slug]` | SSG with generateStaticParams |
| Contact | `/contact` | SSG + client form |

---

## SEO Strategy

- `generateMetadata()` per page with unique title, description, canonical
- `robots.txt` and `sitemap.xml` via `next-sitemap`
- OpenGraph + Twitter card meta per page
- JSON-LD structured data: `Organization`, `LocalBusiness`, `BreadcrumbList`
- Semantic HTML: `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`
- Heading hierarchy: one `<h1>` per page, logical `<h2>`/`<h3>` nesting
- Alt text on all images (descriptive, keyword-relevant)
- Blog posts use Article schema

---

## Performance Optimization

- `next/image` for all product, blog, team images (automatic WebP + AVIF)
- Animation frames served as static files from `/public/scroll_animation_frames/`
- Code splitting: each page is a separate chunk (App Router default)
- Fonts: `next/font/google` with `display: swap`
- Above-fold CSS inlined (Tailwind critical CSS via build)
- `preload` first animation frame image in `<head>`
- Lighthouse target: ≥90 across all metrics

---

## Image Loading Strategy

- Hero background: first animation frame as `<link rel="preload">` in `<head>`
- Product images: `/public/images/products/` — use Unsplash sourced agriculture images
- Blog images: `/public/images/blog/`
- Team: placeholder silhouettes until real photos provided
- All `next/image` components: `sizes` prop set per breakpoint
- Blur placeholder: `placeholder="blur"` with `blurDataURL` for static imports
- LazyLoad everything below fold (default with `next/image`)

---

## Accessibility Standards

- WCAG 2.1 AA compliance target
- All interactive elements keyboard-focusable with visible focus ring
- ARIA labels on icon-only buttons
- `aria-live` regions for form submission feedback
- Color contrast ratio ≥ 4.5:1 for text (teal #4b8673 on white passes)
- `prefers-reduced-motion` media query disables canvas animation, shows static image
- Form fields: explicit `<label>` associations, not placeholder-only
- Skip-to-content link as first focusable element

---

## Mobile-First Design

- All layouts designed for 375px first, scale up via Tailwind responsive prefixes
- Breakpoints: `sm:640` `md:768` `lg:1024` `xl:1280` `2xl:1536`
- Navbar collapses to hamburger at `<lg`
- Product grid: 1 col → 2 col → 3 col
- Hero text scales: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
- Canvas animation: resize handler updates canvas dimensions
- Touch events: no hover-only interactions on mobile

---

## Light Theme Enforcement

- Background: always `#f6fbf4` (mint) or `#ffffff`
- No dark mode toggle (intentionally omitted for brand consistency)
- No dark: Tailwind prefix usage
- Cards: white background, `#f0f4f0` border
- Sections alternate: white ↔ mint background for visual rhythm

---

## Naming Conventions

- **Files:** PascalCase for components (`HeroSection.tsx`), camelCase for hooks/utils
- **CSS classes:** Tailwind utilities only; no custom class names except `animate-*`
- **Variables:** camelCase; constants SCREAMING_SNAKE_CASE
- **Types/Interfaces:** PascalCase with `I` prefix for interfaces (`IProduct`)
- **Data files:** camelCase exports from `src/data/`

---

## Reusable UI Primitives

Every primitive supports:
- `className` prop for extension via `cn()` (clsx + tailwind-merge)
- `as` prop where semantic HTML varies
- Consistent `size` and `variant` props
- No hardcoded colors — only Tailwind token classes

---

## Scroll Animation Integration Notes

- Total frames: 60 (`ezgif-frame-001.jpg` → `ezgif-frame-060.jpg`)
- Frames are named `ezgif-frame-NNN.jpg` (zero-padded 3 digits)
- Path: `/scroll_animation_frames/ezgif-frame-NNN.jpg`
- Canvas covers full viewport (`100vw × 100vh`)
- Hero text/CTA overlaid absolutely on canvas, centered
- Hero section scroll container: `height: 600vh` (10vh per frame for smoothness)
- On mobile: reduce scroll multiplier to `400vh` for usability

---

## Content Tone

- Professional, trust-focused B2B language
- Indian market context (mention states, supply chains, mandi operations)
- Avoid retail/consumer language
- Numbers and specifics where possible (e.g., "20+ sourcing regions", "48-hour delivery")
- No marketing fluff — outcome-focused copy
