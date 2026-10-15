// Tailwind v4 — theme is configured via @theme in styles/globals.css
// This file is kept for plugin compatibility only.
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  plugins: [],
};

export default config;
