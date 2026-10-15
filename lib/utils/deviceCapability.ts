/**
 * Detects whether the current device can run the WebGL 3D scene.
 * Returns false on low-end devices, slow connections, or SSR.
 */
export function canRunWebGL(): boolean {
  if (typeof window === 'undefined') return false;

  // Must support WebGL
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return false;
  } catch {
    return false;
  }

  // Require at least 4 logical CPU cores
  if (navigator.hardwareConcurrency < 4) return false;

  // Skip on slow connections
  const conn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
  if (conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g') return false;

  return true;
}

/** Returns true if the user prefers reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
