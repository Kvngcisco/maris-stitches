'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

// Global flag so other components can check if preloader already finished
export const preloaderDone = { current: false };

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const logoRef       = useRef<HTMLDivElement>(null);
  const taglineRef    = useRef<HTMLParagraphElement>(null);
  const barRef        = useRef<HTMLDivElement>(null);
  const panelLeftRef  = useRef<HTMLDivElement>(null);
  const panelRightRef = useRef<HTMLDivElement>(null);
  const reduced       = useReducedMotion();

  const finish = () => {
    preloaderDone.current = true;
    sessionStorage.setItem('preloader-shown', '1');
    window.dispatchEvent(new CustomEvent('preloader:done'));
    setVisible(false);
  };

  useEffect(() => {
    // Already shown this session — skip immediately
    if (sessionStorage.getItem('preloader-shown')) {
      preloaderDone.current = true;
      window.dispatchEvent(new CustomEvent('preloader:done'));
      setVisible(false);
      return;
    }

    // Reduced motion — quick fade out
    if (reduced) {
      const t = setTimeout(finish, 200);
      return () => clearTimeout(t);
    }

    // Safety timeout — never block user more than 4s
    const safetyTimer = setTimeout(finish, 4000);

    const tl = gsap.timeline({ onComplete: () => { clearTimeout(safetyTimer); finish(); } });

    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo(taglineRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )
    .to(barRef.current,
      { scaleX: 1, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'left center' },
      '-=0.3'
    )
    .to(logoRef.current,
      { scale: 1.06, opacity: 0.8, duration: 0.3, ease: 'power2.in' },
      '+=0.1'
    )
    .to([panelLeftRef.current, panelRightRef.current],
      { xPercent: (i) => i === 0 ? -100 : 100, duration: 0.9, ease: 'power4.inOut' },
      '-=0.1'
    );

    return () => { tl.kill(); clearTimeout(safetyTimer); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ivory"
      aria-live="polite"
      aria-label="Loading Maris Stitches and Contour"
      role="status"
    >
      {/* Curtain panels */}
      <div ref={panelLeftRef}  className="absolute inset-y-0 left-0 w-1/2 bg-ivory z-10" />
      <div ref={panelRightRef} className="absolute inset-y-0 right-0 w-1/2 bg-ivory z-10" />

      {/* Content */}
      <div className="relative z-0 flex flex-col items-center gap-4 px-8 text-center">
        <div ref={logoRef} style={{ opacity: 0 }}>
          <svg width="300" height="60" viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Maris Stitches">
            <text x="50%" y="44" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="38" fontWeight="300" letterSpacing="3" fill="#2A1A2E">
              Maris Stitches
            </text>
          </svg>
          <svg width="300" height="30" viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <text x="50%" y="22" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="16" fontWeight="300" letterSpacing="7" fill="#6B2D4F">
              AND CONTOUR
            </text>
          </svg>
        </div>

        <p ref={taglineRef} className="font-body text-xs tracking-widest text-stone uppercase" style={{ opacity: 0 }}>
          Where Every Stitch Shapes Elegance.
        </p>

        <div className="mt-4 w-48 h-px bg-blush overflow-hidden">
          <div ref={barRef} className="h-full bg-mulberry" style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }} />
        </div>
      </div>
    </div>
  );
}
