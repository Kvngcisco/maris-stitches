'use client';

import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { useState } from 'react';

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    try { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); } catch { /* ignore */ }
  };

  return (
    <footer className="bg-aubergine py-16" role="contentinfo">
      <div className="container flex flex-col items-center gap-6 text-center">

        {/* Logo — inverted/tinted for dark background */}
        <div style={{ marginBottom: '0.5rem' }}>
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Maris Stitches and Contour"
              width={160}
              height={64}
              style={{
                objectFit: 'contain',
                height: '64px',
                width: 'auto',
                /* Tint the logo to Blush/Ivory tones on dark background */
                filter: 'brightness(0) saturate(100%) invert(95%) sepia(5%) saturate(300%) hue-rotate(330deg) brightness(98%)',
                opacity: 0.9,
              }}
              onError={() => setLogoError(true)}
            />
          ) : (
            <div>
              <p className="font-heading text-2xl font-light text-ivory tracking-wide">
                {siteConfig.name}
              </p>
              <p className="font-body text-sm text-stone mt-1 tracking-widest">
                {siteConfig.tagline}
              </p>
            </div>
          )}
        </div>

        {/* Tagline */}
        <p className="font-body text-sm tracking-widest" style={{ color: '#8A8078' }}>
          {siteConfig.tagline}
        </p>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                  className="font-body text-sm transition-colors"
                  style={{ color: '#8A8078', textDecoration: 'none' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#F8F4EE'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8A8078'; }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact info */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          {siteConfig.email && (
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-body text-sm"
              style={{ color: '#8A8078', textDecoration: 'none' }}
            >
              {siteConfig.email}
            </a>
          )}
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            className="font-body text-sm"
            style={{ color: '#8A8078', textDecoration: 'none' }}
          >
            WhatsApp: {siteConfig.whatsappDisplay}
          </a>
        </div>

        <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

        <p className="font-body text-xs" style={{ color: 'rgba(138,128,120,0.6)' }}>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
