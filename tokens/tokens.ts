// ============================================================
// Maris Stitches and Contour — Design Tokens
// Single source of truth for all design values.
// Flows into tailwind.config.ts and styles/globals.css
// ============================================================

export const colors = {
  ivory:          '#F8F4EE', // page background
  aubergine:      '#2A1A2E', // headings, primary text, footer bg
  mulberry:       '#6B2D4F', // accent, CTAs, active states
  blush:          '#E8D5D0', // soft section backgrounds
  stone:          '#8A8078', // muted / secondary text
  white:          '#FFFFFF',
  mulberryLight:  '#8A3F66', // hover state
  mulberryDark:   '#4E1F39', // pressed state
  aubergineLight: '#3D2645', // cards on dark sections
} as const;

export const typography = {
  fonts: {
    heading: '"Cormorant Garamond", ui-serif, Georgia, serif',
    body:    '"Inter", ui-sans-serif, system-ui, sans-serif',
  },
  scale: {
    display2xl: { size: '6rem',    lineHeight: '1.05', letterSpacing: '-0.02em',  weight: '300' },
    displayXl:  { size: '4.5rem',  lineHeight: '1.08', letterSpacing: '-0.02em',  weight: '300' },
    displayLg:  { size: '3.75rem', lineHeight: '1.1',  letterSpacing: '-0.015em', weight: '400' },
    h1:         { size: '3rem',    lineHeight: '1.15', letterSpacing: '-0.01em',  weight: '400' },
    h2:         { size: '2.25rem', lineHeight: '1.2',  letterSpacing: '-0.01em',  weight: '400' },
    h3:         { size: '1.75rem', lineHeight: '1.25', letterSpacing: '0em',      weight: '500' },
    h4:         { size: '1.25rem', lineHeight: '1.3',  letterSpacing: '0em',      weight: '600' },
    bodyLg:     { size: '1.125rem',lineHeight: '1.7',  letterSpacing: '0em',      weight: '400' },
    bodyMd:     { size: '1rem',    lineHeight: '1.7',  letterSpacing: '0em',      weight: '400' },
    bodySm:     { size: '0.875rem',lineHeight: '1.6',  letterSpacing: '0em',      weight: '400' },
    label:      { size: '0.75rem', lineHeight: '1.5',  letterSpacing: '0.12em',   weight: '500' },
    caption:    { size: '0.8125rem',lineHeight: '1.5', letterSpacing: '0em',      weight: '400' },
  },
} as const;

export const spacing = {
  section:   '7.5rem', // 120px desktop section padding
  sectionMd: '5rem',   // 80px mobile section padding
} as const;

export const motion = {
  duration: {
    instant:   '80ms',
    fast:      '200ms',
    base:      '400ms',
    slow:      '700ms',
    verySlow:  '1200ms',
    cinematic: '2000ms',
  },
  easing: {
    standard:   'cubic-bezier(0.4, 0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    spring:     'cubic-bezier(0.34, 1.56, 0.64, 1)',
    editorial:  'cubic-bezier(0.76, 0, 0.24, 1)',
  },
  stagger: {
    tight: 0.04,
    base:  0.08,
    loose: 0.15,
  },
} as const;

const tokens = { colors, typography, spacing, motion };
export default tokens;
