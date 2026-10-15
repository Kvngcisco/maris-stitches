'use client';

import { useEffect, useRef } from 'react';

export default function ShaderGradientFallback() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Subtle JS-driven gradient shift
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.003;
      const r = Math.round(107 + Math.sin(t) * 20);
      const g = Math.round(45  + Math.sin(t + 1) * 10);
      const b = Math.round(79  + Math.cos(t) * 20);
      el.style.background = `
        radial-gradient(ellipse at ${50 + Math.sin(t) * 15}% ${50 + Math.cos(t * 0.7) * 15}%,
          rgb(${r},${g},${b}) 0%,
          #E8D5D0 50%,
          #F8F4EE 100%)
      `;
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(135deg, #6B2D4F 0%, #E8D5D0 60%, #F8F4EE 100%)' }}
      aria-hidden="true"
    />
  );
}
