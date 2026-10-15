# Maris Stitches and Contour — Implementation Tasks

**Phase:** 3 of 3  
**Version:** 1.0  
**Date:** 2026-10-14  

All tasks are ordered for zero-dependency violations. Each task has clear acceptance criteria. The build must remain green (`pnpm build` exits 0) after every task group.

---

## TASK GROUP 1 — Project Scaffolding

### Task 1.1 — Initialise Next.js project
- Run `pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"`
- Confirm: App Router, TypeScript strict mode, Tailwind CSS v3
- Add `.nvmrc` pinning Node 20 LTS
- Add `.editorconfig` (2-space indent, LF line endings)
- `pnpm build` must pass

### Task 1.2 — Install and pin all dependencies
Install the following with exact versions (no `^` or `~`). Verify each repo exists, is maintained (last commit < 6 months), and has a commercial-compatible license (MIT, Apache-2, ISC) before installing:

**Core:**
- `@supabase/supabase-js`, `@supabase/ssr`

**Animation:**
- `gsap` (with ScrollTrigger, included)
- `@studio-freight/lenis`
- `split-type`
- `framer-motion`
- `lottie-react`

**3D / Visual:**
- `three`, `@react-three/fiber`, `@react-three/drei`
- `shader-gradient` *(verify license; if not commercial-compatible, substitute `@shadergradient/react` or remove and use CSS animated gradient)*

**UI / Carousel:**
- `swiper`
- `react-photo-album`
- `yet-another-react-lightbox`

**Media / Upload:**
- `browser-image-compression`
- `blurhash`

**SEO / Tooling:**
- `next-sitemap`
- `sharp` (dev dep for next/image optimisation)

**Dev:**
- `@types/three`
- `eslint-config-next` (already included)

After install, set every version in `package.json` to an exact pinned string. Commit `package.json` and `pnpm-lock.yaml`.

### Task 1.3 — Configure TypeScript, ESLint, Tailwind
- `tsconfig.json`: `"strict": true`, `"paths": { "@/*": ["./*"] }`
- ESLint: extend `next/core-web-vitals`; add rule `"no-console": "warn"`
- `tailwind.config.ts`: extend theme with all tokens from `tokens/tokens.ts` (colors, font families, font sizes, spacing, border-radius, box-shadow)
- `postcss.config.js`: default Next.js setup

### Task 1.4 — Create folder structure
Create all directories as specified in the architecture:
```
app/
  admin/
    dashboard/
  api/
    revalidate/
components/
  sections/
  ui/
  three/
  admin/
lib/
  supabase/
  motion/
config/
tokens/
public/
  portfolio/
    gowns-and-dresses/
    native-and-occasion/
    creative-designs/
    behind-the-scenes/
    featured/
  fonts/
styles/
```
Add a `.gitkeep` in each empty directory.

---

## TASK GROUP 2 — Design System & Tokens

### Task 2.1 — Write `tokens/tokens.ts`
Implement the full token file from the design spec:
- `colors` object with all 8 named colors
- `typography` with `fonts` and full `scale` object
- `spacing` scale
- `motion` with `duration`, `easing`, `stagger`
- Export each as a named export and a default `tokens` object

### Task 2.2 — Wire tokens into Tailwind
In `tailwind.config.ts`:
- Import from `tokens/tokens.ts`
- Extend `theme.colors` with all color tokens
- Extend `theme.fontFamily` with heading and body fonts
- Extend `theme.fontSize` with the type scale
- Extend `theme.spacing` with spacing scale
- Add custom `transitionTimingFunction` entries from motion.easing
- Add custom `transitionDuration` entries from motion.duration

### Task 2.3 — Write `styles/globals.css`
- `@tailwind base/components/utilities`
- CSS custom properties for every token (`--color-ivory`, `--font-heading`, `--duration-base`, etc.)
- Base styles: `html { scroll-behavior: smooth }` (overridden by Lenis in JS)
- `@font-face` declarations for Cormorant Garamond and Inter (files in `/public/fonts/`)
- `:focus-visible` ring style using Mulberry
- `@media (prefers-reduced-motion: reduce)` block that sets `--duration-*` to `0ms` and disables `animation` and `transition`

### Task 2.4 — Write `config/site.ts`
Single source of truth for all text and contact data:
```ts
export const siteConfig = {
  name, tagline, description, url,
  email,          // placeholder ""
  phone,          // "08153279984"
  whatsapp,       // "2349029028384"
  whatsappMessage,
  address,
  ogImage,
  social: { instagram: "" },
  nav: [...],
  services: [{ title, description, icon }×5],
  howToOrderSteps: [{ step, title, description }×5],
  portfolio: {
    categories: [...],
    seedFolder: "/portfolio/",
  },
};
```
No hardcoded contact details anywhere else in the codebase.

### Task 2.5 — Self-host fonts
- Download Cormorant Garamond (weights 300, 400, 500) and Inter (weights 400, 500, 600) from Google Fonts
- Place WOFF2 subsets in `/public/fonts/`
- Configure in `app/layout.tsx` using `next/font/local`
- Verify fonts load without layout shift (CLS = 0)

---

## TASK GROUP 3 — Root Layout & Providers

### Task 3.1 — Write `app/layout.tsx`
- Load fonts via `next/font/local`
- Apply `<html lang="en">` with Aubergine text color and Ivory background via body class
- Wrap with a `<Providers>` client component
- Include `<CustomCursor />` (renders null server-side)
- Include global metadata: title template, default description, Open Graph, robots
- Include JSON-LD LocalBusiness schema (read from `siteConfig`)
- Include `<FloatingWhatsAppButton />`

### Task 3.2 — Write `<Providers>` component
Client component wrapping:
- Lenis smooth scroll provider (synced to GSAP ticker)
- Motion's `AnimatePresence` for page transitions
- `prefers-reduced-motion` detection context (React Context so all animation components can read it)

Lenis setup:
```ts
const lenis = new Lenis()
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### Task 3.3 — Write `app/page.tsx`
Single-page shell importing all six section components in order:
1. `<HomeSection />`
2. `<AboutSection />`
3. `<ServicesSection />`
4. `<PortfolioSection />`
5. `<HowToOrderSection />`
6. `<ContactSection />`

Page-level metadata with full Open Graph.

---

## TASK GROUP 4 — Navigation

### Task 4.1 — Build `<Navbar />`
- Fixed top, full-width, `z-50`
- Logo: typographic lockup "Maris Stitches" (Cormorant Garamond) — placeholder until owner provides logo file
- Nav links from `siteConfig.nav`, smooth-scroll on click
- "Chat on WhatsApp" CTA button (pill, Mulberry)
- Scroll listener: add `.scrolled` class after 80px
- Active section tracking: IntersectionObserver on each section, update active link
- Mobile hamburger: GSAP morph three bars → ✕; overlay with staggered link reveals
- Focus trap in mobile overlay (`Tab` cycles through links; `Escape` closes)
- `aria-label="Main navigation"`, `aria-current="page"` on active link

### Task 4.2 — Apply Liquid Glass effect to Navbar
- Implement Liquid Glass JS on the navbar element (CDN or package import per their documentation)
- Fallback: `backdrop-filter: blur(20px) saturate(180%)` CSS with Ivory tint if library unavailable
- Verify: navbar is readable on both light and dark section backgrounds
- Confirm commercial license; document the library source in README

---

## TASK GROUP 5 — Preloader

### Task 5.1 — Build `<Preloader />` component
- Full-screen fixed overlay, Ivory background, `z-100`
- Show only on first mount; check `sessionStorage` to skip on SPA navigations
- Liquid Logo: integrate per Paper Design documentation. Fallback: SVG text logo with GSAP scale + fade
- Tagline letter-by-letter: SplitType chars, stagger 30ms
- Progress bar: thin Mulberry line, fills as `document.readyState` progresses
- Exit: GSAP timeline — logo scales up, screen clips via `clipPath` split (left panel slides left, right panel slides right), hero visible beneath
- Emit a custom event `preloader:done` on completion so hero entrance listens
- `prefers-reduced-motion`: skip to instant `opacity: 0` fade (200ms), then unmount

### Task 5.2 — Integrate Preloader into layout
- Mount `<Preloader />` in `app/layout.tsx` above page content
- Hero entrance animation waits for `preloader:done` event before starting
- After exit, remove preloader from DOM (unmount, do not leave `display: none` in accessibility tree)

---

## TASK GROUP 6 — 3D / Visual Hero Background

### Task 6.1 — Capability detection utility
Write `lib/utils/deviceCapability.ts`:
```ts
export function canRunWebGL(): boolean {
  // Check: WebGLRenderingContext exists
  // Check: navigator.hardwareConcurrency >= 4
  // Check: connection.effectiveType not 'slow-2g' or '2g'
  // Check: not prefers-reduced-motion
}
```
Returns `true` only when all checks pass.

### Task 6.2 — Build `<SilkMesh />` (R3F component)
- `components/three/SilkMesh.tsx`
- PlaneGeometry (64×64 segments, 3×3 world units)
- Custom vertex shader: simplex noise displacement with `uTime`, `uMouse`, `uScroll` uniforms
- Custom fragment shader: mix Mulberry → Blush → Ivory based on `uScroll`
- Mouse uniform: updated on `mousemove`, smooth lerp (`lerp factor 0.05`)
- Scroll uniform: updated via GSAP ScrollTrigger scrub
- On `document.hidden`: pause animation frame with `useThree` invalidate
- Cap DPR: `gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))`

### Task 6.3 — Build `<SceneCanvas />` wrapper
- `components/three/SceneCanvas.tsx`
- `<Canvas>` from R3F, `position: absolute, inset: 0, z-index: 0, pointer-events: none`
- Only ONE canvas instance (enforced at component level; throw error in dev if mounted twice)
- `<SilkMesh />` inside, `<ambientLight />` only (no heavy lighting)
- Dynamic import with `next/dynamic`, `ssr: false`

### Task 6.4 — Build `<ShaderGradientFallback />`
- `components/three/ShaderGradientFallback.tsx`
- Use `shader-gradient` package (or CSS animated gradient if license issue)
- Palette: Mulberry → Blush → Ivory, slow animation (8s cycle)
- Same absolute positioning as SceneCanvas

### Task 6.5 — Build `<HeroBackground />` orchestrator
- `components/three/HeroBackground.tsx`
- Runs `canRunWebGL()` on mount (client-side only)
- Renders `<SceneCanvas />` if capable, `<ShaderGradientFallback />` if not
- Static gradient image (`/public/hero-bg.jpg`) via `next/image` as the deepest fallback (always rendered, hidden behind the active layer)

---

## TASK GROUP 7 — Public Sections

### Task 7.1 — Build `<HomeSection />`
- Section id: `home`
- Full-viewport height (`min-h-screen`)
- `<HeroBackground />` absolutely positioned behind
- Foreground: container, vertically centred (desktop asymmetric left; mobile centred)
- Headline: Cormorant Garamond `displayXl`, split into lines by SplitType
- Body: Inter `bodyLg`, Stone
- Two buttons: "Explore Our Designs" (primary, Mulberry fill) + "Chat on WhatsApp" (secondary, Mulberry outline)
- Scroll indicator: animated chevron fades in last
- Entrance: triggered by `preloader:done` event; GSAP timeline as per motion spec

### Task 7.2 — Build `<AboutSection />`
- Section id: `about`
- Background: Ivory
- Desktop: 5/12 text + 7/12 image (asymmetric grid)
- Mobile: image 16:9 first, text below
- Editorial numeral "02" (Cormorant, 96px, 10% opacity, absolute top-right, `aria-hidden`)
- Label: "ABOUT US" in small caps
- Heading: h2 Cormorant Aubergine
- Body: verbatim copy from `siteConfig`
- Image: `next/image`, alt text from config, clip-path ScrollTrigger reveal
- SplitType line reveal on text
- Image placeholder: `/public/about.jpg` (owner to replace)

### Task 7.3 — Build `<ServicesSection />`
- Section id: `services`
- Background: Blush
- Editorial numeral "03"
- Responsive card grid (1 → 2 → 3 col per design spec)
- Each `<ServiceCard />`:
  - Icon (SVG from `public/icons/` or inline, one per service)
  - Title h3 Aubergine
  - Description bodySm Stone
  - Mulberry left-border accent (slides full height on hover)
  - Hover: `translateY(-6px)`, shadow deepen (GSAP)
- ScrollTrigger stagger entrance (y: 50→0, opacity: 0→1)
- All service data from `siteConfig.services`

### Task 7.4 — Build `<PortfolioSection />`
- Section id: `portfolio`
- Background: Ivory
- Editorial numeral "04"

**Sub-task 7.4a — Filter bar**
- Sticky at top of section while section is in view
- Pill tabs from `siteConfig.portfolio.categories` + "All"
- Active tab: Mulberry fill, Motion `layoutId="filter-pill"` shared indicator
- On tab click: update active filter state

**Sub-task 7.4b — Featured Swiper**
- Only renders if any items have `featured: true`
- Swiper: `slidesPerView: 1.2/2.2/3.2` by breakpoint, loop, autoplay 4s (pauses on hover)
- Mulberry custom pagination dots
- Each slide: `next/image` with blur placeholder, title overlay bottom

**Sub-task 7.4c — Masonry grid**
- `react-photo-album` `layout="masonry"`, columns 1/2/3 by breakpoint
- Photos from Supabase query (published=true) OR seed from `/public/portfolio/` if empty
- Each photo: `next/image` with `blurDataURL` from `blurhash` decode, `loading="lazy"`
- Motion `AnimatePresence` + `layout` for filter transitions
- Hover: Aubergine 60% overlay, white "VIEW" text + expand icon (Framer motion fade-in)
- Click: opens lightbox

**Sub-task 7.4d — Lightbox**
- `yet-another-react-lightbox` with Zoom, Captions, Thumbnails, Fullscreen plugins
- Custom render slot for bottom-left caption (title + caption text)
- Custom toolbar button: WhatsApp SVG icon + "Chat about this design"
  - Href: `https://wa.me/${siteConfig.whatsapp}?text=Hi%2C+I'm+interested+in%3A+[TITLE]`
- Keyboard: `Escape` closes, arrow keys navigate, `+/-` zoom
- Swipe gestures on mobile

### Task 7.5 — Build `<HowToOrderSection />`
- Section id: `how-to-order`
- Background: Aubergine, text White/Blush
- Editorial numeral "05"
- Desktop: horizontal 5-step row; Mobile: vertical stack
- SVG connector line between steps (horizontal desktop, vertical mobile)
- Each `<OrderStep />`:
  - Mulberry step numeral (80px Cormorant, low opacity)
  - 64×64 Lottie micro-animation (`lottie-react`, plays once on viewport enter)
  - Title h4 White
  - Description bodySm Blush
- ScrollTrigger: connector line `strokeDashoffset` draw; steps stagger reveal (`opacity:0→1, x:-20→0`)
- Lottie JSON files: use free Lottie files from LottieFiles (CC0 / free use); document source in README. Place in `/public/lottie/`

### Task 7.6 — Build `<ContactSection />`
- Section id: `contact`
- Background: Ivory
- Editorial numeral "06"
- Two columns desktop (info 5/12, image 7/12); stacked mobile
- Contact info lines from `siteConfig` (Lucide icons + Aubergine values)
- Large "Chat on WhatsApp" button (Mulberry, full-width mobile)
- `href`: `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
- Decorative image placeholder right column (owner to supply)

### Task 7.7 — Build `<Footer />`
- Background: Aubergine
- Logo/tagline centred (Cormorant Garamond)
- Nav links row (same as navbar, smooth scroll)
- Copyright: Stone text from `siteConfig`
- `<footer>` landmark

---

## TASK GROUP 8 — UI Primitives

### Task 8.1 — Build `<Button />` component
- Variants: `primary` (Mulberry fill), `secondary` (Mulberry outline), `ghost`
- Sizes: `sm`, `md`, `lg`
- Hover: `y: -2px`, shadow (GSAP or Tailwind transition)
- Active: spring scale-down
- Loading state: spinner
- Full keyboard support, `aria-disabled` when disabled
- All button text and hrefs come from props (no hardcoded strings)

### Task 8.2 — Build `<CustomCursor />` (desktop only)
- Client component, renders `null` on `pointer: coarse`
- Two DOM elements: outer ring (40px) + inner dot (6px)
- GSAP `quickTo` for smooth following (`lerp 0.08`)
- States: idle, hover-link, hover-image, click (per design spec)
- Magnetic: on `mouseenter` of `.magnetic` elements, GSAP animates cursor ±30px toward element centre
- "VIEW" text: fades in when hovering `.portfolio-image` elements
- `cursor: none` on `<html>` when component is mounted

### Task 8.3 — Build `<FloatingWhatsAppButton />`
- Fixed, bottom-right, `z-50`
- Liquid Glass treatment or CSS backdrop-filter fallback
- Pill: icon + label "Chat with us"
- Hover: pill expands (Framer motion `width` animate)
- Entrance: `y: 80→0` spring after 2s delay
- `aria-label="Chat on WhatsApp"`
- Link: `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`

### Task 8.4 — Build `<SectionNumeral />` component
Reusable: accepts `numeral` prop. Cormorant Garamond, `text-[8rem]`, `opacity-10`, `absolute top-0 right-0`, `aria-hidden="true"`, `select-none`.

### Task 8.5 — Build `<ImageWithBlur />` component
Wraps `next/image` with:
- `blurDataURL` from stored `blurhash` string (decoded via `blurhash` package)
- `placeholder="blur"`
- Lazy loading
- Correct `sizes` attribute passed as prop
- `alt` required prop (no default)

---

## TASK GROUP 9 — Supabase Integration

### Task 9.1 — Set up Supabase clients
- `lib/supabase/client.ts`: browser client (`createBrowserClient`)
- `lib/supabase/server.ts`: server client (`createServerClient` with cookie handling)
- `lib/supabase/middleware.ts`: session refresh middleware
- `middleware.ts` at root: call supabase middleware, protect `/admin/dashboard` route (redirect to `/admin` if not authenticated)

### Task 9.2 — Write Supabase schema migration
File: `supabase/migrations/001_initial.sql`
```sql
-- profiles
create table profiles (
  id uuid primary key references auth.users(id),
  role text not null default 'owner'
);

-- portfolio_items
create table portfolio_items (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null,
  caption     text,
  image_url   text not null,
  blur_hash   text,
  sort_order  integer default 0,
  featured    boolean default false,
  published   boolean default true,
  created_at  timestamptz default now()
);

-- RLS
alter table portfolio_items enable row level security;
create policy "public_read" on portfolio_items
  for select using (published = true);
create policy "owner_all" on portfolio_items
  for all using (auth.uid() is not null);
```
Document: run via Supabase CLI (`supabase db push`) or paste into Supabase Studio SQL editor.

### Task 9.3 — Write data-fetching functions
`lib/supabase/queries.ts`:
- `getPortfolioItems(category?: string)` — public, server-side, returns published items
- `getAllPortfolioItems()` — admin only, returns all items
- `upsertPortfolioItem(data)` — admin only
- `deletePortfolioItem(id)` — admin only
- `reorderItems(ids: string[])` — admin only, updates sort_order

### Task 9.4 — Write ISR revalidation route
`app/api/revalidate/route.ts`:
- POST endpoint; validates a secret token from `REVALIDATE_SECRET` env var
- Calls `revalidatePath('/')` and `revalidatePath('/admin/dashboard')`
- Admin upload flow calls this after successful upload

---

## TASK GROUP 10 — Admin Panel

### Task 10.1 — Build `/admin` login page
- `app/admin/page.tsx`
- Redirect to `/admin/dashboard` if already authenticated
- Minimal centered form: email + password fields, Mulberry "Sign In" button
- Supabase `signInWithPassword`
- Error message on failure (do not reveal whether email or password is wrong — generic "Invalid credentials")
- Mobile-first: full-width inputs, large tap targets

### Task 10.2 — Build `/admin/dashboard` layout
- `app/admin/dashboard/layout.tsx`
- Server component: check session via `lib/supabase/server.ts`; redirect to `/admin` if not authenticated
- Top bar: "Maris Stitches Admin" left, logout button right
- Logout: calls `supabase.auth.signOut()`, redirects to `/admin`

### Task 10.3 — Build `<UploadForm />` admin component
- `components/admin/UploadForm.tsx` — client component
- Multi-file input: `<input type="file" multiple accept="image/*" capture="environment">`
  - `capture="environment"` enables camera on mobile
- On file select:
  1. Compress each file with `browser-image-compression` (target 200KB, preserve EXIF off)
  2. Generate `blurhash` string from the compressed image (via canvas → pixel data → `encode()`)
  3. Show file list with per-file progress bar
- On submit:
  1. Upload each file to Supabase Storage bucket `portfolio` (path: `{category}/{uuid}.webp`)
  2. Get public URL
  3. Insert row into `portfolio_items`
  4. Call `/api/revalidate` to trigger ISR
- Form fields: Title (required), Category (select from `siteConfig.portfolio.categories`), Caption (textarea), Featured (toggle), Published (toggle, default on)
- Upload button disabled while upload in progress
- Success: reset form, show green toast; Error: show red toast with message

### Task 10.4 — Build `<GalleryManager />` admin component
- `components/admin/GalleryManager.tsx` — client component
- Fetches all items from `getAllPortfolioItems()`
- Same masonry layout as public portfolio
- Each `<AdminItemCard />`:
  - Image with title overlay
  - Four icon buttons: ⭐ Feature (toggles `featured`) · 👁 Hide/Show (toggles `published`) · ✏ Edit · 🗑 Delete
  - Active states: featured = filled star; hidden = strikethrough overlay
- **Edit:** inline modal with Title, Category, Caption fields; Save calls `upsertPortfolioItem`
- **Delete:** confirmation modal ("Are you sure you want to delete '[title]'? This cannot be undone.") → deletes from Storage and database
- **Reorder:** drag-to-reorder using HTML5 drag API or `@dnd-kit/core` (install only if used); updates `sort_order` on drop
- Optimistic UI: update local state immediately, revert on error

### Task 10.5 — Wire admin dashboard page
- `app/admin/dashboard/page.tsx`
- Server component: fetch all items, pass to client components
- Layout: `<UploadForm />` top section (collapsible on mobile), `<GalleryManager />` below
- Page title: "Manage Portfolio"

---

## TASK GROUP 11 — SEO & Metadata

### Task 11.1 — Metadata and Open Graph
In `app/layout.tsx`:
```ts
export const metadata: Metadata = {
  title: { template: '%s | Maris Stitches and Contour', default: 'Maris Stitches and Contour' },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: siteConfig.name, images: [siteConfig.ogImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};
```
Create `/public/og-image.jpg` (1200×630) — Mulberry/Ivory branded placeholder with logo + tagline. Owner replaces with a photography-based image before launch.

### Task 11.2 — LocalBusiness JSON-LD
In `app/layout.tsx`, add a `<script type="application/ld+json">` with:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Maris Stitches and Contour",
  "description": "...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "LAUTECH Under-G area",
    "addressLocality": "Ogbomosho",
    "addressRegion": "Oyo State",
    "addressCountry": "NG"
  },
  "telephone": "+2348153279984",
  "url": "https://marisstitches.com"
}
```

### Task 11.3 — Sitemap and robots.txt
- Install and configure `next-sitemap`
- `next-sitemap.config.js`: `siteUrl: siteConfig.url`, exclude `/admin/**`, `generateRobotsTxt: true`
- `robots.txt` rule: `Disallow: /admin`
- Add `postbuild` script: `"postbuild": "next-sitemap"`

### Task 11.4 — Alt text and accessibility audit
- Every `<Image>` or `<img>` tag must have an `alt` prop
- Decorative images: `alt=""`
- Portfolio images: alt from `item.title` in Supabase or filename
- Seed images: manually write meaningful alt text in a seed data file
- Run `eslint-plugin-jsx-a11y` (already in `next/core-web-vitals`) and fix all errors

---

## TASK GROUP 12 — Performance & Fallbacks

### Task 12.1 — Dynamic imports for heavy libraries
All of the following must use `next/dynamic` with `ssr: false` and a skeleton fallback:
- `<SceneCanvas />` (R3F)
- `<ShaderGradientFallback />`
- `<Swiper>` featured slider
- `<ReactPhotoAlbum>` grid
- `<Lightbox>` (YARL)

### Task 12.2 — `prefers-reduced-motion` enforcement
Create a `useReducedMotion()` hook in `lib/hooks/useReducedMotion.ts`:
```ts
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    mq.addEventListener('change', (e) => setReduced(e.matches))
  }, [])
  return reduced
}
```
Use this hook in:
- `<Providers />`: pass into context; Lenis init skipped if reduced
- `<HomeSection />`: skip GSAP entrance timeline
- `<SilkMesh />`: halt animation loop
- All ScrollTrigger setups: `if (reducedMotion) return`

### Task 12.3 — Tab-hidden pause
In `<Providers />`, add:
```ts
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gsap.globalTimeline.pause()
    lenis?.stop()
  } else {
    gsap.globalTimeline.resume()
    lenis?.start()
  }
})
```
In `<SilkMesh />`, use `useThree` to pause `invalidate` when `document.hidden`.

### Task 12.4 — Image optimisation
- All images through `next/image` with correct `sizes` props
- `formats: ['image/avif', 'image/webp']` in `next.config.ts`
- `minimumCacheTTL: 60 * 60 * 24 * 30` for Supabase-hosted images
- WebP/AVIF automatic via Vercel image optimisation
- `deviceSizes` and `imageSizes` tuned in `next.config.ts`

### Task 12.5 — `next.config.ts` hardening
```ts
const nextConfig = {
  images: {
    domains: ['[supabase-project].supabase.co'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
  },
  experimental: { optimizeCss: true },
  compress: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
    {
      source: '/admin/:path*',
      headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
    },
  ],
}
```

---

## TASK GROUP 13 — Environment & README

### Task 13.1 — Environment variables
Create `.env.local.example` (committed) and `.env.local` (gitignored):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
REVALIDATE_SECRET=
NEXT_PUBLIC_SITE_URL=
```
Document each variable's purpose in the README.

### Task 13.2 — `.gitignore`
Ensure `.gitignore` includes: `.env.local`, `node_modules`, `.next`, `out`, `supabase/.branches`, `supabase/.temp`.

### Task 13.3 — Write `README.md`
Sections:
1. **Overview** — what the site is, tech stack, live URL placeholder
2. **Local Development** — prerequisites, `pnpm install`, `.env.local` setup, `pnpm dev`
3. **Supabase Setup** — create project, run migration SQL, create Storage bucket `portfolio` (public), create auth user for owner, set env vars
4. **Vercel Deployment** — connect repo, set env vars in Vercel dashboard, deploy
5. **Changing Content** — how to edit `config/site.ts`
6. **Adding Seed Images** — drop images in `public/portfolio/{category}/`, format requirements
7. **Creating the Admin Account** — Supabase Auth dashboard → Add user
8. **Performance Notes** — Lighthouse targets, what to check before launch
9. **Owner Checklist** — items to complete before going live (email, domain, logo, OG image, social accounts)

---

## TASK GROUP 14 — Build Verification

### Task 14.1 — TypeScript strict check
- Run `pnpm tsc --noEmit`
- Fix every type error before proceeding
- No `// @ts-ignore` comments allowed

### Task 14.2 — ESLint clean pass
- Run `pnpm lint`
- Fix every error and warning
- No `/* eslint-disable */` blocks allowed (except for third-party code)

### Task 14.3 — Production build
- Run `pnpm build`
- Build must exit with code 0
- Review the build output: check for oversized bundles (> 250KB first load JS is a warning)
- If any route is unexpectedly large, apply dynamic imports

### Task 14.4 — Final acceptance criteria verification
Walk through every item in the AC table from `requirements.md`:
- [ ] AC-01: build passes
- [ ] AC-02: Lighthouse ≥ 90 (run `npx lighthouse http://localhost:3000 --preset=desktop` and mobile preset)
- [ ] AC-03: LCP < 2.5s, CLS < 0.1
- [ ] AC-04: test at 360px, 768px, 1280px, 1920px
- [ ] AC-05: all six sections, correct copy, working CTAs
- [ ] AC-06: portfolio filter, masonry, lightbox, lightbox WhatsApp button
- [ ] AC-07: admin login → upload → live gallery
- [ ] AC-08: WhatsApp FAB link
- [ ] AC-09: `prefers-reduced-motion` in OS settings → no animations, CTAs still work
- [ ] AC-10: DevTools → throttle CPU 4x + connection 3G → ShaderGradient or static BG
- [ ] AC-11: switch tab → animations pause; switch back → resume
- [ ] AC-12: `/robots.txt` in browser, `/sitemap.xml` in browser
- [ ] AC-13: view page source → JSON-LD present
- [ ] AC-14: inspect each image in DevTools for `alt`
- [ ] AC-15: Tab through entire page; every focusable element reachable

---

## Implementation Order Summary

| Priority | Group | Blocks |
|---|---|---|
| 1 | Group 1: Scaffolding | Everything |
| 2 | Group 2: Design System | Everything visual |
| 3 | Group 3: Root Layout & Providers | All sections |
| 4 | Group 4: Navigation | — |
| 5 | Group 5: Preloader | Hero entrance |
| 6 | Group 6: 3D / Visual | Home section |
| 7 | Group 7: Public Sections | All public content |
| 8 | Group 8: UI Primitives | Sections (some parallel) |
| 9 | Group 9: Supabase | Admin + Portfolio data |
| 10 | Group 10: Admin Panel | Upload-to-live flow |
| 11 | Group 11: SEO | Build output |
| 12 | Group 12: Performance | Lighthouse targets |
| 13 | Group 13: Env & README | Handoff |
| 14 | Group 14: Verification | Ship |

**Total tasks: 48**

---

*End of Implementation Tasks — Phase 3 of 3.*  
*All three spec phases approved. Ready to build.*
