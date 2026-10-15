'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Reduced Motion Context ───────────────────────────────
const ReducedMotionContext = createContext(false);

export function useReducedMotionContext() {
  return useContext(ReducedMotionContext);
}

// ─── Providers ───────────────────────────────────────────
export default function Providers({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    if (reduced) return;

    let lenis: { raf: (t: number) => void; destroy: () => void; stop: () => void; start: () => void } | null = null;

    async function initLenis() {
      try {
        // Import the 'lenis' package (renamed from @studio-freight/lenis)
        const LenisModule = await import('lenis').catch(() => null);

        if (!LenisModule) return;

        const Lenis = LenisModule.default || LenisModule;
        lenis = new (Lenis as new (opts: Record<string, unknown>) => typeof lenis)({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Sync Lenis RAF with GSAP ticker
        gsap.ticker.add((time) => {
          lenis?.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } catch {
        // Lenis unavailable — native scroll is fine
      }
    }

    initLenis();

    // Pause on tab hidden
    const handleVisibility = () => {
      if (document.hidden) {
        gsap.globalTimeline.pause();
        (lenisRef.current as { stop?: () => void } | null)?.stop?.();
      } else {
        gsap.globalTimeline.resume();
        (lenisRef.current as { start?: () => void } | null)?.start?.();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      (lenisRef.current as { destroy?: () => void } | null)?.destroy?.();
      gsap.ticker.remove(() => {});
    };
  }, [reduced]);

  return (
    <ReducedMotionContext.Provider value={reduced}>
      {children}
    </ReducedMotionContext.Provider>
  );
}
