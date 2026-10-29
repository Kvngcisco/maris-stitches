'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import { preloaderDone } from '@/components/ui/Preloader';
import HeroBackground from '@/components/three/HeroBackground';
import Button from '@/components/ui/Button';

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export default function HomeSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);

    if (preloaderDone.current) {
      show();
      return;
    }

    window.addEventListener('preloader:done', show, { once: true });
    return () => window.removeEventListener('preloader:done', show);
  }, []);

  const scrollToPortfolio = () => {
    try {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    } catch { /* ignore */ }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Home"
    >
      <HeroBackground />

      <div className="container relative z-10 pt-20 pb-16">
        <div className="max-w-2xl">
          <h1
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-ivory hero-fade"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '0s',
            }}
          >
            Nigerian Style, Made to Fit You.
          </h1>

          <p
            className="mt-6 font-body text-base md:text-lg leading-relaxed max-w-xl text-ivory"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '0.15s',
            }}
          >
            {siteConfig.description}
          </p>

          <div
            className="mt-8 flex flex-wrap gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '0.3s',
            }}
          >
            <Button variant="primary" size="lg" onClick={scrollToPortfolio}>
              Explore Our Designs
            </Button>
            <Button
              href={waUrl}
              variant="secondary"
              size="lg"
              className="!border-ivory !text-ivory hover:!bg-ivory hover:!text-aubergine"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease', transitionDelay: '0.5s' }}
        aria-hidden="true"
      >
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(248,244,238,0.6)', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '1px', height: '2.5rem', background: 'rgba(248,244,238,0.4)' }} />
      </div>
    </section>
  );
}
