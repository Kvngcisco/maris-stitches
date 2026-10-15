'use client';

import Image from 'next/image';
import { siteConfig } from '@/config/site';
import SectionNumeral from '@/components/ui/SectionNumeral';
import Button from '@/components/ui/Button';
import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react';

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-ivory py-section-md md:py-section overflow-hidden"
      aria-label="Contact Maris Stitches and Contour"
    >
      <SectionNumeral numeral="06" />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Info column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <p className="font-body text-xs tracking-widest text-stone uppercase mb-4">Get in Touch</p>
              <h2 className="font-heading text-4xl md:text-5xl font-light text-aubergine">
                Let&apos;s Create Something Beautiful
              </h2>
              <div className="mt-4 w-12 h-px bg-mulberry" />
            </div>

            <div className="flex flex-col gap-5">
              <ContactRow
                icon={<Phone size={18} aria-hidden="true" />}
                label="Phone"
                value={siteConfig.phone}
                href={`tel:+234${siteConfig.phone.slice(1)}`}
              />
              <ContactRow
                icon={<MessageCircle size={18} aria-hidden="true" />}
                label="WhatsApp"
                value={siteConfig.whatsappDisplay}
                href={waUrl}
              />
              <ContactRow
                icon={<MapPin size={18} aria-hidden="true" />}
                label="Location"
                value={siteConfig.address}
              />
              <ContactRow
                icon={<Mail size={18} aria-hidden="true" />}
                label="Email"
                value={siteConfig.email || 'Coming soon'}
                href={siteConfig.email ? `mailto:${siteConfig.email}` : undefined}
                muted={!siteConfig.email}
              />
            </div>

            <Button href={waUrl} variant="primary" size="lg" className="w-full sm:w-auto">
              Chat on WhatsApp
            </Button>
          </div>

          {/* Decorative image column */}
          <div className="lg:col-span-7 hidden lg:block">
            <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden">
              <Image
                src="/about-placeholder.svg"
                alt="Maris Stitches and Contour atelier"
                fill
                sizes="58vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  muted,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  muted?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 text-mulberry shrink-0">{icon}</span>
      <div>
        <p className="font-body text-xs tracking-widest text-stone uppercase mb-0.5">{label}</p>
        <p className={`font-body text-base ${muted ? 'text-stone/60' : 'text-aubergine'}`}>{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
        className="hover:opacity-70 transition-opacity duration-fast">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}
