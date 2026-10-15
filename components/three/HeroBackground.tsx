'use client';

// Pure CSS animated gradient — no WebGL, no Three.js, works on all devices
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-gradient-bg absolute inset-0" />
    </div>
  );
}
