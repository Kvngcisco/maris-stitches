import type { Config } from 'tailwindcss';
import { colors, motion } from './tokens/tokens';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory:          colors.ivory,
        aubergine:      colors.aubergine,
        mulberry:       colors.mulberry,
        blush:          colors.blush,
        stone:          colors.stone,
        'mulberry-light': colors.mulberryLight,
        'mulberry-dark':  colors.mulberryDark,
        'aubergine-light': colors.aubergineLight,
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        body:    ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans:    ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        standard:   motion.easing.standard,
        decelerate: motion.easing.decelerate,
        accelerate: motion.easing.accelerate,
        spring:     motion.easing.spring,
        editorial:  motion.easing.editorial,
      },
      transitionDuration: {
        instant:   motion.duration.instant,
        fast:      motion.duration.fast,
        base:      motion.duration.base,
        slow:      motion.duration.slow,
        'very-slow': motion.duration.verySlow,
        cinematic: motion.duration.cinematic,
      },
      spacing: {
        section:    '7.5rem',
        'section-md': '5rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        site: '1440px',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #6B2D4F 0%, #E8D5D0 60%, #F8F4EE 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
