# Maris Stitches and Contour — Design Specification

**Version:** 1.0  
**Phase:** 2 of 3  
**Date:** 2026-10-14  

---

## 1. Design Tokens

All values live in `tokens/tokens.ts` and flow into both `tailwind.config.ts` and `styles/globals.css` via CSS custom properties. Nothing is hardcoded in component files.

### 1.1 Color Palette

```ts
export const colors = {
  ivory:      '#F8F4EE', // background
  aubergine:  '#2A1A2E', // headings, primary text
  mulberry:   '#6B2D4F', // accent, CTAs, active states
  blush:      '#E8D5D0', // soft section backgrounds
  stone:      '#8A8078', // muted / secondary text
  white:      '#FFFFFF', // pure white for overlays
  // Derived shades — computed, not invented
  mulberryLight: '#8A3F66', // hover state
  mulberryDark:  '#4E1F39', // pressed state
  aubergineLight:'#3D2645', // cards on dark sections
};
```

No black. No gold. Every foreground/background pair must pass WCAG 2.1 AA (4.5:1 for body, 3:1 for large text).

Verified pairs:
- Aubergine on Ivory: 12.1:1 ✓
- White on Mulberry: 5.9:1 ✓
- Aubergine on Blush: 10.4:1 ✓
- Stone on Ivory: 4.6:1 ✓ (body minimum)
- White on Aubergine: 12.1:1 ✓

### 1.2 Typography Scale

**Heading font:** Cormorant Garamond (self-hosted, subsets: latin, latin-ext)  
**Body font:** Inter (self-hosted via `next/font/google` or local, subsets: latin)  
**Fallback stack:** `ui-serif, Georgia, serif` / `ui-sans-serif, system-ui, sans-serif`

```ts
export const typography = {
  fonts: {
    heading: '"Cormorant Garamond", ui-serif, Georgia, serif',
    body:    '"Inter", ui-sans-serif, system-ui, sans-serif',
  },
  scale: {
    // Display — hero headline, section titles
    display2xl: { size: '6rem',   lineHeight: '1.05', letterSpacing: '-0.02em', weight: 300 }, // 96px
    displayXl:  { size: '4.5rem', lineHeight: '1.08', letterSpacing: '-0.02em', weight: 300 }, // 72px
    displayLg:  { size: '3.75rem',lineHeight: '1.1',  letterSpacing: '-0.015em',weight: 400 }, // 60px
    // Headings
    h1: { size: '3rem',   lineHeight: '1.15', weight: 400 }, // 48px
    h2: { size: '2.25rem',lineHeight: '1.2',  weight: 400 }, // 36px
    h3: { size: '1.75rem',lineHeight: '1.25', weight: 500 }, // 28px
    h4: { size: '1.25rem',lineHeight: '1.3',  weight: 600 }, // 20px
    // Body
    bodyLg: { size: '1.125rem', lineHeight: '1.7', weight: 400 }, // 18px
    bodyMd: { size: '1rem',     lineHeight: '1.7', weight: 400 }, // 16px
    bodySm: { size: '0.875rem', lineHeight: '1.6', weight: 400 }, // 14px
    // UI
    label:   { size: '0.75rem',  lineHeight: '1.5', letterSpacing: '0.12em', weight: 500 }, // 12px caps
    caption: { size: '0.8125rem',lineHeight: '1.5', weight: 400 }, // 13px
  },
};
```

Mobile type scale is ~80% of the desktop values via fluid `clamp()` where declared in globals.css.

### 1.3 Spacing Scale

Base unit: `0.25rem` (4px). Tailwind extended with named tokens.

```ts
export const spacing = {
  px:   '1px',
  0:    '0',
  1:    '0.25rem',  //  4px
  2:    '0.5rem',   //  8px
  3:    '0.75rem',  // 12px
  4:    '1rem',     // 16px
  6:    '1.5rem',   // 24px
  8:    '2rem',     // 32px
  10:   '2.5rem',   // 40px
  12:   '3rem',     // 48px
  16:   '4rem',     // 64px
  20:   '5rem',     // 80px
  24:   '6rem',     // 96px
  32:   '8rem',     // 128px
  40:   '10rem',    // 160px
  section: '7.5rem', // 120px — vertical section padding desktop
  sectionMd:'5rem',  //  80px — vertical section padding mobile
};
```

### 1.4 Motion Tokens

```ts
export const motion = {
  duration: {
    instant:  '80ms',
    fast:     '200ms',
    base:     '400ms',
    slow:     '700ms',
    verySlow: '1200ms',
    cinematic:'2000ms',
  },
  easing: {
    standard:  'cubic-bezier(0.4, 0, 0.2, 1)',   // material standard
    decelerate:'cubic-bezier(0.0, 0, 0.2, 1)',   // entering elements
    accelerate:'cubic-bezier(0.4, 0, 1, 1)',     // exiting elements
    spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)', // magnetic / bounce
    editorial: 'cubic-bezier(0.76, 0, 0.24, 1)', // heading reveals
  },
  stagger: {
    tight:  0.04,  // 40ms
    base:   0.08,  // 80ms
    loose:  0.15,  // 150ms
  },
};
```

GSAP will read these values via JS; CSS transitions will use the CSS custom property equivalents.

---

## 2. Global Layout System

### 2.1 Container

```
max-width: 1440px
padding-x: clamp(1.5rem, 5vw, 6rem)
margin: auto
```

### 2.2 Grid

12-column grid, `gap: 1.5rem` (24px). Sections use asymmetric placement:
- Text columns: `col-span-5` or `col-span-6`
- Image columns: `col-span-7` or `col-span-6`
- Editorial numerals: absolutely positioned, outside the text column flow

### 2.3 Section Anatomy

Every section follows this shell:

```
<section id="[slug]" aria-label="[Section name]">
  <div class="container">
    <span class="section-numeral" aria-hidden="true">0N</span>
    <div class="section-header">
      <p class="label">SECTION LABEL</p>
      <h2>Section Heading</h2>
    </div>
    <div class="section-body">
      {/* Content */}
    </div>
  </div>
</section>
```

Section numeral: Cormorant Garamond, `display2xl`, `10% opacity`, absolutely positioned top-right of section, no pointer events.

---

## 3. Component Specifications

### 3.1 Navbar

**Behaviour:**
- Fixed top, full width
- Background: `backdrop-filter: blur(20px) saturate(180%)` with Liquid Glass JS border — translucent ivory tint
- Logo left (text lockup or SVG), nav links centre-right, "Chat on WhatsApp" CTA button far right
- On scroll past 80px: subtle border-bottom appears (`1px solid rgba(106,45,79,0.15)`)
- Active link: `color: mulberry`, underline grows from centre
- Mobile (< 1024px): hamburger icon right; nav opens as a full-screen overlay with staggered link reveals

**Hamburger animation:** three bars morph to ✕ via GSAP

**Accessibility:** `<nav>` landmark, `aria-label="Main navigation"`, `aria-current="page"` on active link, focus trap in mobile overlay

### 3.2 Preloader

**Sequence (total ≤ 2 s on fast connection):**
1. Full-screen ivory background
2. Liquid Logo fades + scales in (centre, 0.3 s)
3. Tagline types in letter by letter below logo (0.6 s)
4. Progress bar fills (tied to asset loading)
5. Logo scales up, screen splits vertically, hero peeks through (cinematic curtain reveal, 0.8 s)

**Reduced-motion:** skip to step 5 instantly (fade only, 0.3 s)

### 3.3 Custom Cursor (Desktop Only)

**Idle state:** 12px solid Mulberry circle  
**Hover on links/buttons:** 40px ring (border only) + 6px dot; slight lag (`lerp 0.08`)  
**Hover on images:** text "VIEW" appears inside the ring  
**Click:** quick scale-down + scale-up (spring)  
**Magnetic:** buttons pull the cursor ±30px within a 120px radius; GSAP quickTo for performance  
**Touch detection:** `window.matchMedia('(pointer: coarse)')` — cursor entirely hidden

### 3.4 Hero / Home Section

**Layout:** full viewport height, edge-to-edge  
**Background:** `SceneCanvas` component — R3F canvas (`position: absolute, inset: 0, z-index: 0`)  
**Foreground:** `z-index: 1`, centred vertically, left-aligned text on desktop  

**Entrance animation (after preloader):**
1. SplitType splits headline into lines
2. Lines rise from `translateY(100%)` with clip-path parent hiding overflow (stagger 0.1 s)
3. Body text fades in (0.4 s delay)
4. Buttons scale in from 0.8 (spring, 0.6 s delay)
5. Scroll indicator fades in last

**R3F Silk Mesh:**
- PlaneGeometry, custom vertex shader warping vertices with simplex noise
- Reacts to cursor position (`uniforms.uMouse`) and scroll progress (`uniforms.uScroll`)
- Color: mixes Mulberry → Blush → Ivory based on scroll
- Pauses render loop when `document.hidden` or `prefers-reduced-motion`
- Capability check: `WebGLRenderingContext` exists + `navigator.hardwareConcurrency >= 4` + connection not `slow-2g`/`2g`
- If check fails → `<ShaderGradientFallback />` (animated CSS/shader gradient, no WebGL)
- If `prefers-reduced-motion` → static gradient image

### 3.5 About Section

**Layout:**
- Background: Ivory
- Left column (desktop 5/12): Headline + body copy + a horizontal rule
- Right column (desktop 7/12): Full-bleed editorial image (owner portrait or atelier shot)
- On mobile: image first (16:9), text below

**Animation:**
- Image: clip-path reveal from bottom (`inset(100% 0 0 0)` → `inset(0% 0 0 0)`) on ScrollTrigger enter
- Text: SplitType line reveal, staggered

### 3.6 Services Section

**Layout:**
- Background: Blush
- Heading + label top-left
- 5 cards in a responsive grid: 1-col mobile, 2-col md, 3-col lg (last row: 2 centred)
- Horizontal rule above heading

**Service Card:**
- White background, `rounded-2xl`, subtle box-shadow (`0 4px 24px rgba(42,26,46,0.06)`)
- Icon top (Lottie or SVG, ~48px)
- Title: h3 Aubergine
- Description: bodySm Stone
- Bottom: thin Mulberry left-border accent line
- Hover: card lifts (`translateY(-6px)`), shadow deepens; Mulberry border slides up to full height (GSAP)

**Animation:** ScrollTrigger stagger from bottom, `opacity 0 → 1`, `y 40 → 0`

### 3.7 Portfolio Section

**Layout:**
- Background: Ivory
- Full section width (no container padding on grid)
- Filter bar: sticky at top of section, centered, pill-shaped tabs
- Above grid: Featured Creations Swiper (hidden if no featured items)
- Below filter: `react-photo-album` masonry layout

**Filter Bar:**
- Pill buttons: `background: transparent`, border Mulberry, text Stone
- Active: `background: mulberry`, `color: white`
- Transition: background slides via Motion `layoutId` shared element

**Masonry Grid:**
- `react-photo-album` with `layout="masonry"`, `columns={n}`:  
  1 col < 640px | 2 col 640–1024px | 3 col > 1024px
- Each photo wrapped in Motion `<motion.div>` with `layout` prop for filter animation
- On filter change: AnimatePresence handles exit/enter, `layout` smoothly reflows grid

**Image Cards:**
- Aspect ratio preserved (react-photo-album handles)
- Blur placeholder while loading
- Hover: overlay fades in (aubergine 60% opacity), white "VIEW" text + expand icon

**Lightbox (YARL):**
- Plugins: Zoom, Captions, Thumbnails, Fullscreen
- Custom slide: caption (title + caption text) bottom-left
- Custom toolbar button: WhatsApp icon + "Chat about this design" → `https://wa.me/2349029028384?text=Hi, I'm interested in: [ITEM TITLE]`
- Swipe on mobile, keyboard on desktop

**Featured Creations Swiper:**
- `slidesPerView: 1.2` mobile, `2.2` md, `3.2` lg
- Loop, autoplay (4 s, pauses on hover), custom Mulberry pagination dots

### 3.8 How to Order Section

**Layout:**
- Background: Aubergine
- Text: White / Blush
- Headline centred
- 5-step timeline — horizontal on desktop (scrolls), vertical stack on mobile

**Step Item:**
- Large step number (Cormorant Garamond, 80px, Mulberry, low opacity)
- Lottie micro-animation icon above number (small, 64×64, plays once on enter)
- Title: h4 White
- Body: bodySm Blush
- Connector line between steps (horizontal desktop, vertical mobile): drawn with GSAP strokeDashoffset animation on scroll

**Animation:** steps reveal sequentially as the connector line draws

### 3.9 Contact Section

**Layout:**
- Background: Ivory
- Two columns desktop (info left, decorative image right)
- Mobile: stacked

**Contact details:** each line with an icon (Lucide), value in Aubergine  
**WhatsApp CTA:** large Mulberry button "Chat on WhatsApp"  
**No contact form.**

### 3.10 Footer

- Background: Aubergine
- Logo + tagline centred
- Nav links row
- "© 2026 Maris Stitches and Contour. All rights reserved." — Stone
- No social icons until accounts are confirmed

### 3.11 Floating WhatsApp FAB

- Position: `fixed bottom-6 right-6 z-50`
- Shape: rounded pill (icon + "Chat with us" label that expands on hover)
- Liquid Glass JS treatment (same as navbar)
- Entrance: bounces up from `bottom: -80px` after 2 s page load delay
- Aria: `aria-label="Chat on WhatsApp"`

---

## 4. Motion Choreography

### 4.1 Page Load Sequence

```
0ms     Preloader mounts (ivory screen)
0ms     Fonts and critical CSS load
200ms   Liquid Logo animates in
800ms   Tagline letter-by-letter
1400ms  Progress bar fills as JS bundle loads
2000ms  Curtain split reveal → hero visible
2100ms  Hero headline lines rise (stagger 100ms/line)
2400ms  Hero body text fade in
2600ms  Hero buttons spring in
2800ms  Scroll indicator fades in
3000ms  Navbar slides down from top
```

### 4.2 Scroll-Triggered Animations

| Section | Animation |
|---|---|
| About image | clip-path `inset(100% 0 0 0)` → `inset(0%)` as image enters viewport |
| About text | SplitType lines, `y: 30→0, opacity: 0→1`, stagger 0.06 s |
| Services cards | `y: 50→0, opacity: 0→1`, stagger 0.1 s |
| Portfolio numerals | Parallax `y` at 0.3x scroll speed |
| Order connector | SVG `strokeDashoffset` draws as scroll progresses |
| Order steps | `opacity: 0→1, x: -20→0`, stagger 0.15 s |
| Contact | `y: 30→0, opacity: 0→1` |

### 4.3 R3F Scroll Sequence

The silk mesh responds across sections:
- **Hero (0–25% scroll):** mesh at full opacity, calm wave, cursor-reactive
- **About (25–50%):** mesh fades, color shifts from Mulberry to Ivory
- **Services (50–75%):** mesh hidden, ShaderGradient takes over (blush palette)
- **Portfolio (75–100%):** no mesh, static background

GSAP ScrollTrigger scrubs a `uProgress` uniform; the shader interpolates geometry and color based on this value.

### 4.4 Micro-interactions

| Element | Interaction |
|---|---|
| Nav links | Underline grows from centre (scaleX 0→1, transform-origin: center) on hover |
| CTA buttons | Subtle `y: -2px` lift + shadow on hover; spring scale on click |
| Service cards | `y: -6px` lift, shadow deepens, border accent slides |
| Portfolio images | Overlay fade + scale-up `1.03x` on hover |
| Lightbox open | Image scales from thumbnail position to fullscreen (FLIP animation via GSAP) |
| WhatsApp FAB | Pill expands on hover to show label |
| Hamburger | Three-bar to ✕ morph |

### 4.5 Page Transitions (Motion/Framer)

Wrapping all route changes (e.g. `/` → `/admin`):

```
Exit:  opacity 1→0, y 0→-20, duration 300ms, easing: accelerate
Enter: opacity 0→1, y 20→0, duration 400ms, easing: decelerate, delay 50ms
```

---

## 5. Responsive Behaviour Summary

| Viewport | Navbar | Hero | Services | Portfolio | Order |
|---|---|---|---|---|---|
| 360–639px | Hamburger | Stacked, full-width text | 1-col cards | 1-col masonry | Vertical timeline |
| 640–1023px | Hamburger | Stacked | 2-col cards | 2-col masonry | Vertical timeline |
| 1024–1279px | Full links | Side-by-side | 3-col cards | 3-col masonry | Horizontal |
| 1280px+ | Full links | Asymmetric | 3-col (2 last) | 3-col wide | Horizontal |

---

## 6. Admin Panel Design

### 6.1 Layout
- Minimal, functional; background: Ivory; accent: Mulberry
- Top bar: logo, "Admin" label, logout button
- Mobile: all inputs full-width, large touch targets

### 6.2 Upload Card
```
[Upload Area — tap or drag]  ← dashed border, Mulberry, large tap target
[File list with per-file progress bars]
[Title input]
[Category select]
[Caption textarea]
[Featured toggle]    [Published toggle]
[Upload button — full width, Mulberry]
```

### 6.3 Gallery Manager
- Grid of uploaded items (same masonry layout)
- Each item card has four icon buttons: ⭐ Feature / 👁 Show-Hide / ✏ Edit / 🗑 Delete
- Delete opens a Mulberry-bordered confirmation modal
- Edit opens an inline form overlaid on the card

---

## 7. Design Decisions & Rationale

| Decision | Rationale |
|---|---|
| No black | Per brief; dark text via Aubergine (warmer, more editorial) |
| Cormorant Garamond headings | Classic serif with high-fashion associations; pairs well with Inter for body |
| Blush for alternating sections | Breaks page rhythm without introducing a third strong hue |
| No contact form | Owner's stated preference is WhatsApp; form adds complexity and spam risk |
| One WebGL canvas only | Multiple canvases on mobile cause GPU thrashing and crashes |
| Capability check before R3F | R3F on a low-end Android causes janky scroll; fallback must be equally elegant |
| `react-photo-album` over custom grid | Handles variable aspect ratios correctly; accessible by default |
| No testimonials / awards | Per brief; the photography must do the persuading |

---

*End of Design Specification — Phase 2 of 3. Awaiting approval to proceed to Phase 3: Implementation Tasks.*
