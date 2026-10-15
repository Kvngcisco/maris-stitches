'use client';

import { Canvas } from '@react-three/fiber';
import SilkMesh from './SilkMesh';

// Note: Canvas and group JSX are valid — only primitive Three.js element names
// (mesh, planeGeometry, etc.) cause type errors with R3F 8 + React 19.
// SilkMesh builds its mesh imperatively to avoid this.

export default function SceneCanvas() {
  return (
    <Canvas
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
      camera={{ position: [0, 0, 2.5], fov: 50 }}
      dpr={[1, 2]}
      frameloop="always"
    >
      {/* @ts-expect-error R3F 8.x / React 19 type mismatch — runtime is correct */}
      <ambientLight intensity={0.5} />
      <SilkMesh />
    </Canvas>
  );
}
