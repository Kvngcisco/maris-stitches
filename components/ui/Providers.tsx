'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

const ReducedMotionContext = createContext(false);

export function useReducedMotionContext() {
  return useContext(ReducedMotionContext);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<{ stop?: () => void; start?: () => void; destroy?: () => void; raf?: (t: number) => void } | null>(null);

  useEffect(() => {
    // All heavy libraries loaded asynchronously — safe for all devices
    let gsapInstance: { globalTimeline: { pause: () => void; resume: () => void }; ticker: { add: (fn: (t: number) => void) => void; lagSmoothing: (v: number) => void } } | null = null;

    async function init() {
      try {
        const gsapMod = await import('gsap');
        gsapInstance = gsapMod.default as typeof gsapInstance;

        const stMod = await import('gsap/ScrollTrigger');
        const { ScrollTrigger } = stMod;
        if (gsapInstance) (gsapInstance as unknown as { registerPlugin: (p: unknown) => void }).registerPlugin(ScrollTrigger);

        if (!reduced) {
          try {
            const LenisMod = await import('lenis');
            const Lenis = LenisMod.default;
            const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
            lenisRef.current = lenis;
            gsapInstance?.ticker.add((time) => { lenis.raf(time * 1000); });
            gsapInstance?.ticker.lagSmoothing(0);
          } catch { /* Lenis unavailable */ }
        }

        const onVisibility = () => {
          if (document.hidden) {
            gsapInstance?.globalTimeline.pause();
            lenisRef.current?.stop?.();
          } else {
            gsapInstance?.globalTimeline.resume();
            lenisRef.current?.start?.();
          }
        };
        document.addEventListener('visibilitychange', onVisibility);
        return () => document.removeEventListener('visibilitychange', onVisibility);
      } catch { /* GSAP unavailable — site works without animation */ }
    }

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => {
      cleanup?.();
      lenisRef.current?.destroy?.();
    };
  }, [reduced]);

  return (
    <ReducedMotionContext.Provider value={reduced}>
      {children}
    </ReducedMotionContext.Provider>
  );
}
