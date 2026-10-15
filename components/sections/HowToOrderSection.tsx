'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import SectionNumeral from '@/components/ui/SectionNumeral';

const stepIcons = [
  <svg key="1" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8D5D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>,
  <svg key="2" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8D5D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>,
  <svg key="3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8D5D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="2" y1="20" x2="22" y2="4"/><line x1="5" y1="17" x2="5" y2="14"/>
    <line x1="9" y1="13" x2="9" y2="10"/><line x1="13" y1="9" x2="13" y2="6"/>
    <line x1="17" y1="5" x2="17" y2="2"/>
  </svg>,
  <svg key="4" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8D5D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>,
  <svg key="5" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8D5D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v1m0 16v1M4.22 4.22l.7.7m12.16 12.16l.7.7M3 12h1m16 0h1"/>
    <circle cx="12" cy="12" r="4"/>
  </svg>,
];

export default function HowToOrderSection() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const reduced  = useReducedMotion();

  useEffect(() => {
    if (reduced || !stepsRef.current) return;

    async function animate() {
      try {
        const [gsapMod, stMod] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        const gsap = gsapMod.default;
        const { ScrollTrigger } = stMod;
        gsap.registerPlugin(ScrollTrigger);

        const steps = stepsRef.current!.querySelectorAll('.order-step');
        gsap.fromTo(steps,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: stepsRef.current, start: 'top 75%' } }
        );
      } catch {
        // Animation unavailable — steps still visible
      }
    }

    animate();
  }, [reduced]);

  return (
    <section
      id="how-to-order"
      className="relative bg-aubergine py-section-md md:py-section overflow-hidden"
      aria-label="How to Order"
    >
      <SectionNumeral numeral="05" />
      <div className="container">
        <div className="mb-12 text-center md:text-left">
          <p className="font-body text-xs tracking-widest text-mulberry uppercase mb-4">The Process</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-ivory">How to Order</h2>
          <div className="mt-4 w-12 h-px bg-mulberry mx-auto md:mx-0" />
        </div>
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
          {siteConfig.howToOrderSteps.map((step, i) => (
            <div key={step.step} className="order-step flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              <div className="relative flex items-center justify-center">
                <span className="font-heading text-6xl font-light select-none" style={{ color: 'rgba(107,45,79,0.3)' }} aria-hidden="true">
                  {step.step}
                </span>
                <div className="absolute">{stepIcons[i]}</div>
              </div>
              <div>
                <h3 className="font-heading text-xl font-medium text-ivory mb-2">{step.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(232,213,208,0.8)' }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
