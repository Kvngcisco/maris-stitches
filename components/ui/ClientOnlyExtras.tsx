'use client';

import dynamic from 'next/dynamic';

// These components use browser-only APIs and must be loaded client-side only
const CustomCursor           = dynamic(() => import('./CustomCursor'),           { ssr: false });
const FloatingWhatsAppButton = dynamic(() => import('./FloatingWhatsAppButton'), { ssr: false });

export default function ClientOnlyExtras() {
  return (
    <>
      <CustomCursor />
      <FloatingWhatsAppButton />
    </>
  );
}
