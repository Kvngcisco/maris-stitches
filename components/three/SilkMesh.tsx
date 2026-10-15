'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */`
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float wave = sin(pos.x * 3.0 + uTime) * cos(pos.y * 2.0 + uTime * 0.7);
    float strength = 0.25 * (1.0 - uScroll * 0.6);
    pos.z += wave * strength;
    float dist = distance(uv, uMouse * 0.5 + 0.5);
    pos.z += (1.0 - smoothstep(0.0, 0.5, dist)) * 0.15 * (1.0 - uScroll);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */`
  uniform float uScroll;
  varying vec2 vUv;

  void main() {
    vec3 mulberry = vec3(0.42, 0.18, 0.31);
    vec3 blush    = vec3(0.91, 0.84, 0.82);
    vec3 ivory    = vec3(0.97, 0.96, 0.93);
    vec3 color = mix(mulberry, blush, uScroll);
    color = mix(color, ivory, smoothstep(0.5, 1.0, uScroll));
    float vignette = 1.0 - smoothstep(0.4, 1.0, length(vUv - 0.5) * 1.6);
    color *= mix(0.85, 1.0, vignette);
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface SilkMeshProps {
  // intentionally empty — all data via refs/uniforms
}

// We use imperative Three.js to avoid JSX type issues with React 19 + R3F 8.x
export default function SilkMesh(_props: SilkMeshProps) {
  const materialRef   = useRef<THREE.ShaderMaterial | null>(null);
  const mouseRef      = useRef(new THREE.Vector2(0, 0));
  const targetMouse   = useRef(new THREE.Vector2(0, 0));
  const scrollRef     = useRef(0);
  const { gl, scene } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Build mesh imperatively
    const geometry = new THREE.PlaneGeometry(3, 3, 64, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime:   { value: 0 },
        uMouse:  { value: new THREE.Vector2(0, 0) },
        uScroll: { value: 0 },
      },
      side: THREE.DoubleSide,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.1;
    mesh.name = 'silkMesh';
    scene.add(mesh);

    const onMove = (e: MouseEvent) => {
      targetMouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [gl, scene]);

  useFrame(({ clock }) => {
    if (!materialRef.current || document.hidden) return;
    mouseRef.current.lerp(targetMouse.current, 0.05);
    materialRef.current.uniforms.uTime.value   = clock.getElapsedTime();
    materialRef.current.uniforms.uMouse.value  = mouseRef.current;
    materialRef.current.uniforms.uScroll.value = scrollRef.current;
  });

  // Mesh is added imperatively above — nothing to render via JSX
  return null;
}
