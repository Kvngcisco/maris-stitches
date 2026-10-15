'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import SectionNumeral from '@/components/ui/SectionNumeral';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  const reduced  = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Image clip-path reveal
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: { trigger: imageRef.current, start: 'top 80%' },
          }
        );
      }

      // Text fade up
      if (textRef.current) {
        const children = Array.from(textRef.current.children) as HTMLElement[];
        gsap.fromTo(children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: textRef.current, start: 'top 75%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="about"
      className="relative bg-ivory py-section-md md:py-section overflow-hidden"
      aria-label="About Maris Stitches and Contour"
    >
      <SectionNumeral numeral="02" />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image — shows first on mobile */}
          <div className="lg:col-span-7 lg:order-2">
            <div
              ref={imageRef}
              className="relative w-full aspect-[4/5] overflow-hidden rounded-sm"
              style={{ clipPath: 'inset(0% 0 0 0)' }}
            >
              <Image
                src="/about-placeholder.svg"
                alt="Adeoti Tinuke, founder of Maris Stitches and Contour, at work in the atelier"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className="lg:col-span-5 lg:order-1 flex flex-col gap-6">
            <p className="font-body text-xs tracking-widest text-stone uppercase">
              About Us
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-aubergine leading-tight">
              {siteConfig.about.heading}
            </h2>
            <div className="w-12 h-px bg-mulberry" />
            <p className="font-body text-base text-stone leading-relaxed">
              {siteConfig.about.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
