# Maris Stitches and Contour — Requirements Specification

**Brand:** Maris Stitches and Contour  
**Owner:** Adeoti Tinuke  
**Location:** LAUTECH Under-G area, Ogbomosho, Oyo State, Nigeria  
**Tagline:** "Where Every Stitch Shapes Elegance."  
**Date:** 2026-10-14  
**Version:** 1.0  

---

## 1. Project Overview

A single-page, award-level fashion brand website for a Nigerian women's fashion brand. The site must read as contemporary African luxury — editorial photography, generous whitespace, refined motion — while being fully functional for a real business: a public-facing showcase and a private admin panel for the owner to upload and manage portfolio work from her phone.

---

## 2. Functional Requirements

### 2.1 Public Website

#### FR-01 Single-Page Navigation
- The site is a single HTML document with smooth-scroll anchor navigation.
- The navbar links to six sections: Home, About, Services, Portfolio, How to Order, Contact.
- On scroll, the active section is highlighted in the navbar.
- The navbar is sticky, uses the Liquid Glass JS treatment, and collapses to a hamburger on mobile.

#### FR-02 Branded Preloader
- A full-screen preloader runs on first load showing the Liquid Logo animation.
- The preloader resolves into a cinematic hero entrance once assets are ready.
- The preloader must not block interactivity beyond 3 seconds on a 4G connection.

#### FR-03 Home Section
- **Headline:** "Fashion Designed to Make You Stand Out."
- **Body copy:** "Discover elegant women's fashion, thoughtfully designed to express your individuality. From beautifully tailored gowns to contemporary native wear, every creation brings together creativity, style, and craftsmanship."
- **CTA buttons:** "Explore Our Designs" (smooth-scrolls to Portfolio) and "Chat on WhatsApp" (opens `https://wa.me/2349029028384` with a prefilled message).
- Hero background: React Three Fiber silk-fabric mesh reacting to cursor and scroll on capable devices; ShaderGradient animated fallback on low-end/slow devices; static image fallback for `prefers-reduced-motion`.
- Only one WebGL canvas may exist on the page at any time.

#### FR-04 About Section
- **Copy:** "Maris Stitches and Contour is a Nigerian fashion brand founded by Adeoti Tinuke, dedicated to creating elegant women's outfits that celebrate individuality and personal style. Through creative designs and thoughtful tailoring, the brand aims to help every woman feel confident in what she wears."
- No invented testimonials, awards, statistics, prices, or brand history.
- Large section numeral "02" as an editorial detail.

#### FR-05 Services Section
- Five animated visual service cards:
  1. Custom Gowns and Dresses
  2. Native and Traditional Wear
  3. Occasion Wear
  4. Custom Fashion Design
  5. Corporate Wear
- Each card has a title and a short descriptive line (from config). No prices.
- Cards animate in on scroll with staggered entrance.

#### FR-06 Portfolio Section (most prominent)
- **Filter tabs:** All, Gowns and Dresses, Native and Occasion Wear, Creative Designs, Behind the Scenes, Featured Creations.
- Layout: `react-photo-album` masonry grid.
- Filtering animates with Motion (Framer Motion) layout transitions.
- Images lazy-load with blur placeholder.
- Clicking any image opens `Yet Another React Lightbox` fullscreen viewer with swipe, pinch-zoom, and keyboard navigation.
- Inside the lightbox: a "Chat about this design" WhatsApp button that prefills the item's title in the message.
- A "Featured Creations" Swiper horizontal slider appears above the grid for featured items.
- Until real uploads exist, the gallery is seeded from `/public/portfolio/`.
- Large section numeral "04" as an editorial detail.

#### FR-07 How to Order Section
- An animated 5-step timeline rendered with lottie-react micro-animations per step:
  1. Contact us on WhatsApp
  2. Share your design or inspiration
  3. Discuss measurements, fabric, and requirements
  4. Receive a quotation and confirm details
  5. Production per agreed arrangements
- Steps reveal sequentially on scroll.

#### FR-08 Contact Section
- Phone: 08153279984
- WhatsApp: 09029028384
- Location: LAUTECH Under-G area, Ogbomosho, Oyo State
- Email: placeholder from config (to be confirmed by owner before launch)
- No contact form. The owner's preferred channel is WhatsApp.
- Large section numeral "06" as an editorial detail.

#### FR-09 Floating WhatsApp Button
- Visible on all sections, bottom-right, uses Liquid Glass JS treatment.
- Links to `https://wa.me/2349029028384` with a prefilled "Hello, I'd like to enquire about your designs." message.
- Accessible: visible focus state, aria-label, keyboard activatable.

#### FR-10 Custom Cursor (Desktop Only)
- Replaces the default cursor on pointer devices.
- Magnetic attraction to buttons and links.
- Hides on touch devices. No impact on mobile usability.

---

### 2.2 Admin Panel

#### FR-11 Authentication
- Route: `/admin` — password-protected via Supabase Auth.
- Single owner account. No self-registration.
- Session persists across page refreshes. Logout button present.
- Row Level Security: public users may SELECT published items only; the authenticated owner may INSERT, UPDATE, DELETE any row.

#### FR-12 Upload Flow (mobile-first)
- Multi-file picker (camera or gallery on mobile).
- Client-side compression before upload (target ≤ 200 KB per image).
- Supabase Storage upload with a per-file progress bar.
- Generate WebP/AVIF variants and a blur placeholder hash (stored in the database).
- Metadata fields per item: title (required), category (required, select), caption (optional), featured (toggle), published (toggle, defaults to true).
- Drag-to-reorder within a category using `sort_order` column.

#### FR-13 Management Actions
- Feature / un-feature an item (shows it in the Featured Creations slider).
- Hide / show (published toggle).
- Edit metadata (title, category, caption) inline.
- Delete item (removes from Storage and database, with a confirmation dialog).

#### FR-14 Supabase Schema
```sql
-- profiles (extends auth.users)
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

---

## 3. Non-Functional Requirements

### 3.1 Performance
- **Mobile Lighthouse score:** ≥ 90 (Performance, Accessibility, Best Practices, SEO).
- **LCP:** < 2.5 s on a simulated 4G mobile connection.
- **CLS:** < 0.1.
- All 3D and shader code is dynamically imported after first paint.
- The 3D scene loads only on capable devices (WebGL support + hardware concurrency ≥ 4 + connection type not `slow-2g`/`2g`).
- All images served via `next/image` with `sizes` and modern format auto-selection.
- Device pixel ratio capped at 2 for canvas elements.

### 3.2 Accessibility
- WCAG 2.1 AA contrast for all text/background combinations.
- All interactive elements reachable by keyboard; visible focus rings.
- `prefers-reduced-motion` respected: all GSAP, Lenis, and Motion animations disabled or reduced.
- `alt` text on every image; decorative images use `alt=""`.
- `aria-label` on icon-only buttons (WhatsApp button, hamburger).
- Semantic HTML landmarks: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`.

### 3.3 Responsiveness
- Fully functional from 360 px to 2560 px.
- Mobile-first Tailwind breakpoints: `sm` 640 px, `md` 768 px, `lg` 1024 px, `xl` 1280 px, `2xl` 1536 px.
- Touch targets ≥ 44 × 44 px.
- Custom cursor and magnetic effects disabled on touch devices.

### 3.4 Motion Policy
- All GSAP ScrollTrigger timelines, Lenis smooth scroll, and SplitType reveals wrap a `prefers-reduced-motion` check.
- Animations pause when the browser tab is hidden (`document.visibilitychange`).
- The WebGL canvas pauses its render loop when hidden.
- Motion enriches but never blocks: CTAs and nav are always accessible.

### 3.5 SEO
- `<title>` and `<meta description>` per page (dynamic in layout).
- Open Graph tags and a `/public/og-image.jpg` share image (1200 × 630).
- `sitemap.xml` generated at build time via `next-sitemap`.
- `robots.txt` disallowing `/admin`.
- `LocalBusiness` JSON-LD schema with name, address, telephone, URL.
- Target keywords: "fashion designer in Ogbomosho", "tailor in Ogbomosho", "custom gowns Nigeria", "native wear LAUTECH".

---

## 4. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Database / Auth / Storage | Supabase |
| Deployment | Vercel |

### 4.1 Library Inventory

| Library | Pinned version intent | Use |
|---|---|---|
| gsap | latest stable | Pinned scroll storytelling, parallax, clip-path reveals, horizontal showcase |
| @studio-freight/lenis | latest stable | Smooth scroll, synced to GSAP ticker |
| split-type | latest stable | Line-by-line headline reveals |
| framer-motion (motion) | latest stable | Page transitions, hover states, gallery filter animations |
| swiper | latest stable | Featured Creations slider, mobile carousels |
| @react-three/fiber | latest stable | Silk-fabric mesh hero element |
| @react-three/drei | latest stable | Helpers for the R3F scene |
| three | latest stable | Peer dep for R3F |
| shader-gradient | latest stable | Animated hero background fallback |
| lottie-react | latest stable | How-to-Order step micro-animations |
| react-photo-album | latest stable | Masonry portfolio grid |
| yet-another-react-lightbox | latest stable | Fullscreen portfolio viewer |
| browser-image-compression | latest stable | Client-side image compression before upload |
| blurhash / @bazzazimut/react-blurhash | latest stable | Blur placeholder generation and rendering |
| next-sitemap | latest stable | sitemap.xml generation |
| @supabase/supabase-js | latest stable | Supabase client |
| @supabase/ssr | latest stable | Server-side Supabase helpers for App Router |

> Liquid Glass JS and Liquid Logo (Paper Design) will be integrated via CDN script or direct import per their respective documentation. Verify license before use.  
> React Bits and Magic UI components will be evaluated and only installed if actively used.  
> Every library version will be pinned in `package.json` (exact, not range) after installation.

---

## 5. Architecture

```
app/
  layout.tsx          — root layout, fonts, global providers
  page.tsx            — single-page shell with all section components
  admin/
    page.tsx          — login gate
    dashboard/
      page.tsx        — upload + manage
  api/
    revalidate/       — on-demand ISR revalidation after uploads

components/
  sections/           — Home, About, Services, Portfolio, HowToOrder, Contact
  ui/                 — Button, Card, Cursor, Navbar, WhatsAppFAB, Lightbox, etc.
  three/              — SilkMesh, SceneCanvas
  admin/              — UploadForm, GalleryManager, ItemCard

lib/
  supabase/           — client.ts, server.ts, middleware.ts
  motion/             — variants.ts (shared animation config)
  utils.ts

config/
  site.ts             — ALL text, contact details, colors, links (single source of truth)

tokens/
  tokens.ts           — color, typography scale, spacing scale, motion tokens
  tailwind.tokens.ts  — exports tokens into Tailwind config

public/
  portfolio/          — seed images (categorised subfolders)
  fonts/              — self-hosted Cormorant Garamond + Inter/DM Sans subsets
  og-image.jpg
  robots.txt

styles/
  globals.css         — Tailwind directives + CSS custom properties from tokens
```

---

## 6. Configuration File Contract

`config/site.ts` is the single source of truth. It exports:

```ts
export const siteConfig = {
  name: "Maris Stitches and Contour",
  tagline: "Where Every Stitch Shapes Elegance.",
  description: "...",
  url: "https://marisstitches.com", // update before launch
  email: "", // placeholder — owner to confirm
  phone: "08153279984",
  whatsapp: "2349029028384",
  whatsappMessage: "Hello, I'd like to enquire about your designs.",
  address: "LAUTECH Under-G area, Ogbomosho, Oyo State, Nigeria",
  social: {
    instagram: "", // placeholder
  },
  services: [ /* ... */ ],
  howToOrderSteps: [ /* ... */ ],
};
```

No hardcoded contact details, colors, or copy anywhere except `config/site.ts` and `tokens/tokens.ts`.

---

## 7. Content Rules

- **Do NOT invent:** testimonials, awards, statistics, prices, or brand history.
- **Do NOT present** unfinished or sample work as confirmed customer orders.
- All section copy is taken verbatim from the brief above and stored in `config/site.ts`.
- Photography placeholders use the brand's own images from `/public/portfolio/`; no third-party stock images.

---

## 8. README Requirements

The README must cover:

1. Local development setup (`pnpm install`, `.env.local` vars, `pnpm dev`)
2. Supabase project setup (tables, RLS, Storage bucket, Auth user)
3. Vercel deployment (env vars, build command)
4. How to change content (point to `config/site.ts`)
5. How to add portfolio images locally (seed folder)
6. How to create the admin account

---

## 9. Acceptance Criteria

| # | Criterion |
|---|---|
| AC-01 | `pnpm build` exits with code 0, zero TypeScript errors, zero ESLint errors |
| AC-02 | Mobile Lighthouse ≥ 90 on all four categories |
| AC-03 | LCP < 2.5 s, CLS < 0.1 on simulated 4G |
| AC-04 | Site renders correctly from 360 px to 2560 px |
| AC-05 | All six sections present with correct copy and working CTAs |
| AC-06 | Portfolio masonry grid, filter, lightbox, and "Chat about this design" button all work |
| AC-07 | Admin login → upload → live gallery end-to-end verified |
| AC-08 | Floating WhatsApp button opens the correct prefilled link |
| AC-09 | `prefers-reduced-motion` disables all animations; CTAs remain usable |
| AC-10 | Low-end device fallback serves ShaderGradient or static image instead of R3F |
| AC-11 | Tab-hidden pauses all animation loops |
| AC-12 | `robots.txt` disallows `/admin`; sitemap includes all public routes |
| AC-13 | JSON-LD LocalBusiness schema present in page `<head>` |
| AC-14 | Every image has a meaningful `alt` attribute |
| AC-15 | All interactive elements reachable and operable by keyboard |

---

*End of Requirements — Phase 1 of 3. Awaiting approval to proceed to Phase 2: Design.*
