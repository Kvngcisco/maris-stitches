'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/config/site';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { preloaderDone } from '@/components/ui/Preloader';
import Button from '@/components/ui/Button';

const HeroBackground = dynamic(() => import('@/components/three/HeroBackground'), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, #6B2D4F 0%, #E8D5D0 55%, #F8F4EE 100%)' }}
    />
  ),
});

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export default function HomeSection() {
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const bodyRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const reduced      = useReducedMotion();

  useEffect(() => {
    const runEntrance = async () => {
      if (reduced) {
        [headlineRef, bodyRef, ctaRef, indicatorRef].forEach((r) => {
          if (r.current) r.current.style.opacity = '1';
        });
        return;
      }

      try {
        const gsapMod = await import('gsap');
        const gsap = gsapMod.default;
        gsap.timeline()
          .to(headlineRef.current,  { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
          .to(bodyRef.current,      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
          .to(ctaRef.current,       { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
          .to(indicatorRef.current, { opacity: 1,        duration: 0.5, ease: 'power1.out' }, '+=0.2');
      } catch {
        // GSAP unavailable — show content immediately
        [headlineRef, bodyRef, ctaRef, indicatorRef].forEach((r) => {
          if (r.current) r.current.style.opacity = '1';
        });
      }
    };

    // If preloader already done (race condition fix), run immediately
    if (preloaderDone.current) {
      runEntrance();
      return;
    }

    window.addEventListener('preloader:done', runEntrance, { once: true });
    return () => window.removeEventListener('preloader:done', runEntrance);
  }, [reduced]);

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
            ref={headlineRef}
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-ivory"
            style={{ opacity: 0, transform: 'translateY(40px)' }}
          >
            Fashion Designed to Make You Stand Out.
          </h1>

          <p
            ref={bodyRef}
            className="mt-6 font-body text-base md:text-lg leading-relaxed max-w-xl text-ivory"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            {siteConfig.description}
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex flex-wrap gap-4"
            style={{ opacity: 0, transform: 'translateY(16px)' }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
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
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span className="font-body text-xs tracking-widest text-ivory/60 uppercase">Scroll</span>
        <div className="w-px h-10 bg-ivory/40 animate-pulse" />
      </div>
    </section>
  );
}
