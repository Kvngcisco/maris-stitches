'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import SectionNumeral from '@/components/ui/SectionNumeral';

const serviceIcons: Record<string, React.ReactNode> = {
  scissors: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B2D4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  ),
  fabric: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B2D4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  sparkle: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B2D4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v1m0 16v1M4.22 4.22l.7.7m12.16 12.16l.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  ),
  pen: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B2D4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
    </svg>
  ),
  briefcase: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B2D4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
};

export default function ServicesSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduced  = useReducedMotion();

  useEffect(() => {
    if (reduced || !cardsRef.current) return;

    async function animate() {
      try {
        const [gsapMod, stMod] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        const gsap = gsapMod.default;
        const { ScrollTrigger } = stMod;
        gsap.registerPlugin(ScrollTrigger);

        const cards = cardsRef.current!.querySelectorAll('.service-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' } }
        );
      } catch {
        // Animation unavailable — cards still visible
      }
    }

    animate();
  }, [reduced]);

  return (
    <section
      id="services"
      className="relative bg-blush py-section-md md:py-section overflow-hidden"
      aria-label="Our Services"
    >
      <SectionNumeral numeral="03" />
      <div className="container">
        <div className="mb-12">
          <p className="font-body text-xs tracking-widest text-stone uppercase mb-4">Nigerian Fabrics and Craft</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-aubergine">Styles for Every Occasion</h2>
          <div className="mt-4 w-12 h-px bg-mulberry" />
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service, i) => (
            <div
              key={service.title}
              className={`service-card bg-white rounded-2xl p-8 shadow-sm relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                i === 4 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''
              }`}
            >
              <div className="absolute left-0 top-0 w-[3px] bg-mulberry transition-all duration-700 h-0 group-hover:h-full" />
              <div className="mb-4">{serviceIcons[service.icon] ?? serviceIcons.sparkle}</div>
              <h3 className="font-heading text-2xl font-medium text-aubergine mb-3">{service.title}</h3>
              <p className="font-body text-sm text-stone leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
