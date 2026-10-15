'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/config/site';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import Button from '@/components/ui/Button';
import gsap from 'gsap';

const HeroBackground = dynamic(() => import('@/components/three/HeroBackground'), { ssr: false });

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export default function HomeSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const indicatorRef= useRef<HTMLDivElement>(null);
  const reduced     = useReducedMotion();

  useEffect(() => {
    const runEntrance = () => {
      if (reduced) return;

      const tl = gsap.timeline();

      if (headlineRef.current) {
        // Simple line reveal without SplitType dependency issues
        gsap.set(headlineRef.current, { opacity: 0, y: 40 });
        tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
      }
      if (bodyRef.current) {
        gsap.set(bodyRef.current, { opacity: 0, y: 20 });
        tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
      }
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 16 });
        tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
      }
      if (indicatorRef.current) {
        tl.fromTo(indicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: 'power1.out' },
          '+=0.3'
        );
      }
    };

    window.addEventListener('preloader:done', runEntrance, { once: true });
    // If preloader already done (e.g. SPA nav), run immediately
    if (sessionStorage.getItem('preloader-shown')) runEntrance();

    return () => window.removeEventListener('preloader:done', runEntrance);
  }, [reduced]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Home"
    >
      <HeroBackground />

      <div className="container relative z-10 pt-20">
        <div className="max-w-2xl">
          <h1
            ref={headlineRef}
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-ivory"
            style={{ opacity: 0 }}
          >
            Fashion Designed to Make You Stand Out.
          </h1>

          <p
            ref={bodyRef}
            className="mt-6 font-body text-base md:text-lg text-ivory/80 leading-relaxed max-w-xl"
            style={{ opacity: 0 }}
          >
            {siteConfig.description}
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('portfolio');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Our Designs
            </Button>
            <Button
              href={waUrl}
              variant="secondary"
              size="lg"
              className="border-ivory text-ivory hover:bg-ivory hover:text-aubergine"
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
        <div className="w-px h-12 bg-ivory/30 animate-pulse" />
      </div>
    </section>
  );
}
