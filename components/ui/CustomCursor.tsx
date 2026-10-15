'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    // Only on pointer: fine devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    mounted.current = true;
    document.documentElement.classList.add('cursor-none');

    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    const xRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });
    const xDot  = gsap.quickTo(dot,  'x', { duration: 0.15, ease: 'power3.out' });
    const yDot  = gsap.quickTo(dot,  'y', { duration: 0.15, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      xRing(e.clientX - 20);
      yRing(e.clientY - 20);
      xDot(e.clientX - 4);
      yDot(e.clientY - 4);
    };

    const onEnterLink = () => gsap.to(ring, { scale: 1.5, duration: 0.3 });
    const onLeaveLink = () => gsap.to(ring, { scale: 1,   duration: 0.3 });
    const onDown      = () => gsap.to([ring, dot], { scale: 0.85, duration: 0.1 });
    const onUp        = () => gsap.to([ring, dot], { scale: 1,    duration: 0.2, ease: 'back.out(2)' });

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      document.documentElement.classList.remove('cursor-none');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, []);

  // Don't render on server
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-10 w-10 rounded-full border-2 border-mulberry"
        style={{ transform: 'translate(-100px, -100px)' }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[201] h-2 w-2 rounded-full bg-mulberry"
        style={{ transform: 'translate(-100px, -100px)' }}
        aria-hidden="true"
      />
    </>
  );
}
