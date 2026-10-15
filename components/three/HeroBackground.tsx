'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { canRunWebGL, prefersReducedMotion } from '@/lib/utils/deviceCapability';
import ShaderGradientFallback from './ShaderGradientFallback';

const SceneCanvas = dynamic(() => import('./SceneCanvas'), { ssr: false });

export default function HeroBackground() {
  const [mode, setMode] = useState<'static' | 'shader' | 'webgl'>('static');

  useEffect(() => {
    try {
      if (prefersReducedMotion()) {
        setMode('static');
      } else if (canRunWebGL()) {
        setMode('webgl');
      } else {
        setMode('shader');
      }
    } catch {
      setMode('static');
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Deepest fallback — always present */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #6B2D4F 0%, #E8D5D0 55%, #F8F4EE 100%)' }}
      />
      {mode === 'shader' && <ShaderGradientFallback />}
      {mode === 'webgl'  && <SceneCanvas />}
    </div>
  );
}
