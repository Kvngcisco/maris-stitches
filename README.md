# Maris Stitches and Contour

**"Where Every Stitch Shapes Elegance."**

A single-page fashion brand website for [Maris Stitches and Contour](https://marisstitches.com), an elegant Nigerian women's fashion brand by Adeoti Tinuke, based in Ogbomosho, Oyo State.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Database / Auth / Storage:** Supabase *(optional — site works with seed data without it)*
- **Deployment:** Vercel
- **3D Hero:** React Three Fiber + Three.js
- **Animation:** GSAP, Framer Motion, Lenis smooth scroll

---

## Prerequisites

- Node.js 20 LTS
- pnpm (`npm install -g pnpm`)

---

## Local Development

```bash
# 1. Clone the repo
git clone <repo-url>
cd "marris website"

# 2. Install dependencies
pnpm install

# 3. Copy environment file
cp .env.local.example .env.local
# Edit .env.local and fill in your values (see Supabase Setup below)

# 4. Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** The site works without Supabase configured — it will use the seed portfolio data in `lib/portfolioSeed.ts`.

---

## Supabase Setup *(optional — required for admin uploads)*

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/migrations/001_initial.sql`
3. Go to **Storage** → Create a bucket named `portfolio` → Set it to **Public**
4. Go to **Authentication** → **Users** → **Add user** → create the owner's email + password
5. Copy your project URL and keys from **Settings** → **API** into `.env.local`

---

## Vercel Deployment

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local.example` in the Vercel dashboard
4. Deploy — Vercel handles the build automatically

---

## Changing Content

All text, contact details, WhatsApp numbers, services, and order steps live in one file:

```
config/site.ts
```

Edit that file — nothing is hardcoded in components. Changes take effect on the next build.

**Key fields to update before launch:**
- `url` — set your real domain
- `email` — add the owner's email address
- `social.instagram` — add the Instagram handle when ready

---

## Adding Portfolio Images Locally

1. Drop image files into the appropriate folder under `public/portfolio/`:
   - `gowns-and-dresses/`
   - `native-and-occasion/`
   - `creative-designs/`
   - `behind-the-scenes/`
   - `featured/`
2. Update `lib/portfolioSeed.ts` to reference the new file paths
3. The seed data is only used when Supabase is not configured or returns no results

**Image recommendations:** JPEG or WebP, at least 800px wide, portrait orientation preferred.

---

## Creating the Admin Account

The admin panel (planned for a future update) will use Supabase Auth. To pre-create the owner account:

1. Go to your Supabase project → **Authentication** → **Users**
2. Click **Add user** → enter the owner's email and a strong password
3. The owner uses these credentials to log in at `/admin`

---

## Performance Notes

- **Lighthouse target:** ≥ 90 on all four categories (mobile)
- **3D hero:** only loads on capable devices (WebGL + 4+ CPU cores + fast connection)
- **Fallback:** animated CSS gradient on weak devices; static gradient if `prefers-reduced-motion` is set
- **All images** go through `next/image` with AVIF/WebP auto-conversion
- **Animations** respect `prefers-reduced-motion` and pause when the tab is hidden

---

## Owner Pre-Launch Checklist

- [ ] Replace `/public/about-placeholder.svg` with a real photo of the owner/atelier
- [ ] Replace `/public/og-image.svg` with a real 1200×630 photography-based share image
- [ ] Replace placeholder portfolio images with real work photos
- [ ] Update `config/site.ts` → `url` with the real domain
- [ ] Update `config/site.ts` → `email` with the confirmed email address
- [ ] Update `next-sitemap.config.js` → `siteUrl` (or set `NEXT_PUBLIC_SITE_URL` in Vercel)
- [ ] Set up Supabase for the admin upload flow
- [ ] Test on a real mobile device before going live

---

## File Structure

```
app/               — Next.js App Router pages and layout
components/
  sections/        — The 6 page sections (Home, About, Services, Portfolio, HowToOrder, Contact)
  ui/              — Reusable UI components (Navbar, Button, Preloader, etc.)
  three/           — R3F 3D hero background components
config/
  site.ts          — All content, contact details, and links (edit here)
tokens/
  tokens.ts        — Design tokens (colors, type scale, motion)
lib/
  portfolioSeed.ts — Placeholder portfolio data for development
  supabase/        — Supabase client helpers
public/
  portfolio/       — Seed/placeholder portfolio images
styles/
  globals.css      — Global CSS with design token custom properties
```
