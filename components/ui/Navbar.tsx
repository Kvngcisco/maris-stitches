'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import Button from './Button';

// Check if logo file exists — component handles both cases
const LOGO_SRC = '/logo.png';

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [logoError, setLogoError]       = useState(false);
  const bar1 = useRef<HTMLSpanElement>(null);
  const bar2 = useRef<HTMLSpanElement>(null);
  const bar3 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // CSS-only hamburger — no GSAP dependency
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    try { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); } catch { /* ignore */ }
    setMenuOpen(false);
  };

  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'navbar-scrolled' : ''}`}
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: 'rgba(248,244,238,0.9)',
          borderBottom: scrolled ? '1px solid rgba(107,45,79,0.15)' : '1px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            aria-label="Maris Stitches and Contour — Home"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            {!logoError ? (
              <Image
                src={LOGO_SRC}
                alt="Maris Stitches and Contour"
                width={120}
                height={48}
                style={{ objectFit: 'contain', height: '48px', width: 'auto' }}
                onError={() => setLogoError(true)}
                priority
              />
            ) : (
              /* Text fallback if logo.png not yet placed */
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.35rem',
                fontWeight: 300,
                letterSpacing: '0.05em',
                color: '#2A1A2E',
              }}>
                Maris Stitches
              </span>
            )}
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                aria-current={activeSection === item.href.replace('#', '') ? 'page' : undefined}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  letterSpacing: '0.02em',
                  color: activeSection === item.href.replace('#', '') ? '#6B2D4F' : '#8A8078',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '2px',
                  transition: 'color 0.2s ease',
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Button href={waUrl} variant="primary" size="sm" className="hidden lg:inline-flex text-xs tracking-wide">
              Chat on WhatsApp
            </Button>

            {/* CSS hamburger — no GSAP */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden"
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', width: '40px', height: '40px', gap: '5px',
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}
            >
              <span
                ref={bar1}
                style={{
                  display: 'block', width: '22px', height: '1.5px', background: '#2A1A2E',
                  transition: 'transform 0.3s ease, opacity 0.2s ease',
                  transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
                }}
              />
              <span
                ref={bar2}
                style={{
                  display: 'block', width: '22px', height: '1.5px', background: '#2A1A2E',
                  transition: 'opacity 0.2s ease',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                ref={bar3}
                style={{
                  display: 'block', width: '22px', height: '1.5px', background: '#2A1A2E',
                  transition: 'transform 0.3s ease, opacity 0.2s ease',
                  transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className="lg:hidden"
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: '#2A1A2E',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '2rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
        aria-hidden={!menuOpen}
      >
        {/* Logo in overlay */}
        <div style={{ marginBottom: '1rem' }}>
          {!logoError ? (
            <Image
              src={LOGO_SRC}
              alt="Maris Stitches and Contour"
              width={140}
              height={56}
              style={{ objectFit: 'contain', height: '56px', width: 'auto', filter: 'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(290deg)' }}
              onError={() => setLogoError(true)}
            />
          ) : (
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', color: '#F8F4EE', fontWeight: 300 }}>
              Maris Stitches
            </span>
          )}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }} aria-label="Mobile navigation">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '2.25rem',
                fontWeight: 300,
                color: '#F8F4EE',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.2s ease',
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '0.5rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              color: '#6B2D4F',
              textTransform: 'uppercase',
              border: '1px solid #6B2D4F',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              textDecoration: 'none',
            }}
          >
            Chat on WhatsApp
          </a>
        </nav>
      </div>
    </>
  );
}
