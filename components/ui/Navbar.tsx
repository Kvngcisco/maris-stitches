'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import gsap from 'gsap';
import Button from './Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const bar1 = useRef<HTMLSpanElement>(null);
  const bar2 = useRef<HTMLSpanElement>(null);
  const bar3 = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef   = useRef<HTMLAnchorElement[]>([]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Hamburger GSAP morph
  useEffect(() => {
    if (!bar1.current || !bar2.current || !bar3.current) return;
    if (menuOpen) {
      gsap.to(bar1.current, { rotate: 45,  y: 8,  duration: 0.3, ease: 'power2.inOut' });
      gsap.to(bar2.current, { opacity: 0,       duration: 0.2 });
      gsap.to(bar3.current, { rotate: -45, y: -8, duration: 0.3, ease: 'power2.inOut' });
      // Stagger overlay links in
      if (linksRef.current.length) {
        gsap.fromTo(linksRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.4, ease: 'power2.out', delay: 0.1 }
        );
      }
    } else {
      gsap.to(bar1.current, { rotate: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(bar2.current, { opacity: 1,       duration: 0.2 });
      gsap.to(bar3.current, { rotate: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
    }
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-base ${
          scrolled ? 'border-b border-mulberry/20' : ''
        }`}
        style={{ backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(248,244,238,0.88)' }}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            className="font-heading text-2xl font-light tracking-wide text-aubergine hover:text-mulberry transition-colors duration-fast"
            aria-label="Maris Stitches and Contour — Home"
          >
            Maris Stitches
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                aria-current={activeSection === item.href.replace('#', '') ? 'page' : undefined}
                className={`font-body text-sm tracking-wide transition-colors duration-fast relative group ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-mulberry'
                    : 'text-stone hover:text-aubergine'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-mulberry transition-all duration-fast origin-center ${
                  activeSection === item.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Button
              href={waUrl}
              variant="primary"
              size="sm"
              className="hidden lg:inline-flex text-xs tracking-wide"
            >
              Chat on WhatsApp
            </Button>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span ref={bar1} className="block w-6 h-px bg-aubergine" />
              <span ref={bar2} className="block w-6 h-px bg-aubergine" />
              <span ref={bar3} className="block w-6 h-px bg-aubergine" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-40 bg-aubergine flex flex-col items-center justify-center transition-all duration-slow ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
          {siteConfig.nav.map((item, i) => (
            <a
              key={item.href}
              ref={(el) => { if (el) linksRef.current[i] = el; }}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              className="font-heading text-4xl font-light text-ivory hover:text-blush transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 font-body text-sm tracking-widest text-mulberry uppercase border border-mulberry px-6 py-3 rounded-full hover:bg-mulberry hover:text-white transition-all duration-fast"
            onClick={() => setMenuOpen(false)}
          >
            Chat on WhatsApp
          </a>
        </nav>
      </div>
    </>
  );
}
