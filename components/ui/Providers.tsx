'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

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
    // All animation libraries loaded lazily — safe for mobile SSR
    let cleanupGsap: (() => void) | undefined;

    async function init() {
      try {
        const [gsapMod, ScrollTriggerMod] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        const gsap = gsapMod.default;
        const { ScrollTrigger } = ScrollTriggerMod;
        gsap.registerPlugin(ScrollTrigger);

        if (!reduced) {
          try {
            const LenisModule = await import('lenis').catch(() => null);
            if (LenisModule) {
              const Lenis = LenisModule.default || LenisModule;
              const lenis = new (Lenis as new (o: Record<string, unknown>) => {
                raf: (t: number) => void;
                destroy: () => void;
                stop: () => void;
                start: () => void;
              })({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
              });
              lenisRef.current = lenis;
              gsap.ticker.add((time) => { lenis.raf(time * 1000); });
              gsap.ticker.lagSmoothing(0);
            }
          } catch {
            // Lenis unavailable — native scroll is fine
          }
        }

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

        cleanupGsap = () => {
          document.removeEventListener('visibilitychange', handleVisibility);
          (lenisRef.current as { destroy?: () => void } | null)?.destroy?.();
        };
      } catch {
        // GSAP failed to load — site works without animation
      }
    }

    init();
    return () => { cleanupGsap?.(); };
  }, [reduced]);

  return (
    <ReducedMotionContext.Provider value={reduced}>
      {children}
    </ReducedMotionContext.Provider>
  );
}
