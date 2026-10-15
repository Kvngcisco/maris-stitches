'use client';

import { useEffect, useState } from 'react';

// Global flag — lets HomeSection check if preloader already finished
export const preloaderDone = { current: false };

export default function Preloader() {
  // Start as false to avoid SSR/client mismatch
  const [mounted, setMounted] = useState(false);
  const [hiding, setHiding]   = useState(false);
  const [gone, setGone]       = useState(false);

  useEffect(() => {
    // Only runs on client
    setMounted(true);

    // Skip if already shown this session
    try {
      if (sessionStorage.getItem('preloader-shown')) {
        preloaderDone.current = true;
        window.dispatchEvent(new CustomEvent('preloader:done'));
        setGone(true);
        return;
      }
    } catch {
      // sessionStorage unavailable (private browsing on some iOS)
      preloaderDone.current = true;
      window.dispatchEvent(new CustomEvent('preloader:done'));
      setGone(true);
      return;
    }

    // Start exit after 1.8s
    const hideTimer = setTimeout(() => {
      setHiding(true);
    }, 1800);

    // Remove from DOM after fade
    const goneTimer = setTimeout(() => {
      preloaderDone.current = true;
      try { sessionStorage.setItem('preloader-shown', '1'); } catch { /* ignore */ }
      window.dispatchEvent(new CustomEvent('preloader:done'));
      setGone(true);
    }, 2500);

    // Hard safety timeout — never block more than 4s
    const safetyTimer = setTimeout(() => {
      preloaderDone.current = true;
      try { sessionStorage.setItem('preloader-shown', '1'); } catch { /* ignore */ }
      window.dispatchEvent(new CustomEvent('preloader:done'));
      setGone(true);
    }, 4000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(goneTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  // Don't render anything on server — avoids hydration mismatch
  if (!mounted || gone) return null;

  return (
    <div
      role="status"
      aria-label="Loading Maris Stitches and Contour"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#F8F4EE',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        opacity: hiding ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: hiding ? 'none' : 'auto',
      }}
    >
      {/* Logo */}
      <div className="preloader-logo" style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '2.2rem',
          fontWeight: 300,
          letterSpacing: '0.15em',
          color: '#2A1A2E',
          lineHeight: 1.2,
        }}>
          Maris Stitches
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1rem',
          fontWeight: 300,
          letterSpacing: '0.5em',
          color: '#6B2D4F',
          marginTop: '0.25rem',
        }}>
          AND CONTOUR
        </div>
      </div>

      {/* Tagline */}
      <p style={{
        fontFamily: 'Inter, ui-sans-serif, sans-serif',
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        color: '#8A8078',
        textTransform: 'uppercase',
      }}>
        Where Every Stitch Shapes Elegance.
      </p>

      {/* Progress bar */}
      <div style={{ width: '10rem', height: '1px', background: '#E8D5D0', overflow: 'hidden' }}>
        <div className="preloader-bar" style={{ height: '100%', background: '#6B2D4F' }} />
      </div>
    </div>
  );
}
