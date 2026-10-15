'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLParagraphElement>(null);
  const barRef       = useRef<HTMLDivElement>(null);
  const panelLeftRef = useRef<HTMLDivElement>(null);
  const panelRightRef= useRef<HTMLDivElement>(null);
  const reduced      = useReducedMotion();

  useEffect(() => {
    // Skip on SPA navigations
    if (sessionStorage.getItem('preloader-shown')) {
      window.dispatchEvent(new CustomEvent('preloader:done'));
      setVisible(false);
      return;
    }

    if (reduced) {
      const t = setTimeout(() => {
        sessionStorage.setItem('preloader-shown', '1');
        window.dispatchEvent(new CustomEvent('preloader:done'));
        setVisible(false);
      }, 200);
      return () => clearTimeout(t);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('preloader-shown', '1');
        window.dispatchEvent(new CustomEvent('preloader:done'));
        setVisible(false);
      },
    });

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
      { xPercent: (i) => i === 0 ? -100 : 100, duration: 0.9, ease: 'power4.inOut', stagger: 0 },
      '-=0.1'
    );

    return () => { tl.kill(); };
  }, [reduced]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      aria-live="polite"
      aria-label="Loading Maris Stitches and Contour"
    >
      {/* Left panel */}
      <div ref={panelLeftRef} className="absolute inset-y-0 left-0 w-1/2 bg-ivory z-10" />
      {/* Right panel */}
      <div ref={panelRightRef} className="absolute inset-y-0 right-0 w-1/2 bg-ivory z-10" />

      {/* Content (behind panels) */}
      <div className="relative z-0 flex flex-col items-center gap-4 px-8 text-center">
        <div ref={logoRef} className="opacity-0">
          <svg width="280" height="56" viewBox="0 0 280 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Maris Stitches and Contour">
            <text x="50%" y="42" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="36" fontWeight="300" letterSpacing="3" fill="#2A1A2E">
              Maris Stitches
            </text>
          </svg>
          <svg width="280" height="32" viewBox="0 0 280 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="24" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="18" fontWeight="300" letterSpacing="6" fill="#6B2D4F">
              AND CONTOUR
            </text>
          </svg>
        </div>

        <p
          ref={taglineRef}
          className="font-body text-sm tracking-widest text-stone uppercase opacity-0"
        >
          Where Every Stitch Shapes Elegance.
        </p>

        {/* Progress bar */}
        <div className="mt-4 w-48 h-px bg-blush overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-mulberry origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  );
}
