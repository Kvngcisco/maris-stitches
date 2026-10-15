'use client';

import { siteConfig } from '@/config/site';

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-aubergine py-16" role="contentinfo">
      <div className="container flex flex-col items-center gap-6 text-center">
        {/* Logo */}
        <div>
          <p className="font-heading text-2xl font-light text-ivory tracking-wide">
            {siteConfig.name}
          </p>
          <p className="font-body text-sm text-stone mt-1 tracking-widest">
            {siteConfig.tagline}
          </p>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                  className="font-body text-sm text-stone hover:text-ivory transition-colors duration-fast"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="w-full h-px bg-white/10" />

        <p className="font-body text-xs text-stone/60">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
