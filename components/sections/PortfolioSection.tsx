'use client';

import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { portfolioSeed, type PortfolioItem } from '@/lib/portfolioSeed';
import SectionNumeral from '@/components/ui/SectionNumeral';

// Lightbox loaded only when opened — reduces mobile JS bundle significantly
const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
  ssr: false,
  loading: () => null,
});

const waBase = `https://wa.me/${siteConfig.whatsapp}?text=`;

export default function PortfolioSection() {
  const [items, setItems]                   = useState<PortfolioItem[]>(portfolioSeed);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen]     = useState(false);
  const [lightboxIndex, setLightboxIndex]   = useState(0);
  const [lightboxReady, setLightboxReady]   = useState(false);

  // Try loading from Supabase; fall back to seed silently
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('published', true)
          .order('sort_order');
        if (!cancelled && !error && data && data.length > 0) {
          setItems(data as PortfolioItem[]);
        }
      } catch {
        // Supabase not configured — seed data is fine
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Pre-load lightbox CSS only after first interaction
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxReady(true);
    setLightboxOpen(true);
  }, []);

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter((i) => i.category === activeCategory);

  const featuredItems = items.filter((i) => i.featured);

  const slides = filteredItems.map((item) => ({
    src:         item.image_url,
    alt:         item.title,
    title:       item.title,
    description: item.caption,
    width:       item.width,
    height:      item.height,
  }));

  return (
    <section
      id="portfolio"
      className="relative bg-ivory py-section-md md:py-section overflow-hidden"
      aria-label="Our Portfolio"
    >
      <SectionNumeral numeral="04" />

      <div className="container">
        {/* Heading */}
        <div className="mb-10">
          <p className="font-body text-xs tracking-widest text-stone uppercase mb-4">Our Work</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-aubergine">Portfolio</h2>
          <div className="mt-4 w-12 h-px bg-mulberry" />
        </div>

        {/* Featured horizontal scroll */}
        {featuredItems.length > 0 && (
          <div className="mb-10">
            <p className="font-body text-xs tracking-widest text-stone uppercase mb-4">Featured Creations</p>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
              {featuredItems.map((item) => (
                <button
                  key={item.id}
                  className="shrink-0 w-56 md:w-72 snap-start rounded-xl overflow-hidden cursor-pointer group text-left"
                  onClick={() => {
                    const idx = filteredItems.findIndex(i => i.id === item.id);
                    openLightbox(idx >= 0 ? idx : 0);
                  }}
                  aria-label={`View ${item.title}`}
                >
                  <div className="relative w-full" style={{ paddingBottom: '133%' }}>
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      sizes="288px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-end p-4"
                      style={{ background: 'linear-gradient(to top, rgba(42,26,46,0.7) 0%, transparent 60%)' }}>
                      <p className="font-heading text-base text-ivory">{item.title}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filter bar */}
        <div className="sticky top-16 z-40 py-3 -mx-4 px-4 mb-8"
          style={{ background: 'rgba(248,244,238,0.95)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
          <div className="flex flex-wrap gap-2">
            {siteConfig.portfolio.categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-body border transition-colors ${
                  activeCategory === cat
                    ? 'bg-mulberry text-ivory border-mulberry'
                    : 'bg-transparent text-stone border-stone/40'
                }`}
                whileTap={{ scale: 0.96 }}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="break-inside-avoid mb-4 cursor-pointer group relative overflow-hidden rounded-xl"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(index); }}
              >
                {/* Aspect ratio box — uses padding hack for older browser compatibility */}
                <div className="relative w-full" style={{ paddingBottom: `${(item.height / item.width) * 100}%` }}>
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                  {/* Hover overlay — only on non-touch */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(42,26,46,0.6)' }}
                    aria-hidden="true"
                  >
                    <span className="font-body text-xs tracking-widest text-ivory uppercase">View</span>
                    <p className="font-heading text-lg text-ivory text-center px-4">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-stone">No items in this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox — only mounted after user taps an image */}
      {lightboxReady && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={slides}
          styles={{ container: { backgroundColor: 'rgba(42,26,46,0.97)' } }}
          toolbar={{
            buttons: [
              <a
                key="wa"
                href={`${waBase}${encodeURIComponent(`Hi, I'm interested in: ${filteredItems[lightboxIndex]?.title ?? ''}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white', padding: '0 12px', fontSize: '14px' }}
                aria-label="Chat about this design on WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat about this design
              </a>,
              'close',
            ],
          }}
        />
      )}
    </section>
  );
}
