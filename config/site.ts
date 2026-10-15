// ============================================================
// Maris Stitches and Contour — Site Configuration
// SINGLE SOURCE OF TRUTH for all text, contact details,
// colors, and links. Edit here, nowhere else.
// ============================================================

export const siteConfig = {
  name:        'Maris Stitches and Contour',
  tagline:     'Where Every Stitch Shapes Elegance.',
  description: 'Discover elegant women\'s fashion, thoughtfully designed to express your individuality. From beautifully tailored gowns to contemporary native wear, every creation brings together creativity, style, and craftsmanship.',
  url:         'https://marisstitches.com', // TODO: update before launch

  // Contact — all values used from here, never hardcoded in components
  phone:            '08153279984',
  whatsapp:         '2349029028384',   // international format for wa.me links
  whatsappDisplay:  '09029028384',     // local format for display
  whatsappMessage:  'Hello, I\'d like to enquire about your designs.',
  address:          'LAUTECH Under-G area, Ogbomosho, Oyo State, Nigeria',
  email:            '', // TODO: owner to confirm email before launch

  ogImage: '/og-image.svg',

  social: {
    instagram: '', // TODO: add when account confirmed
  },

  nav: [
    { label: 'Home',         href: '#home' },
    { label: 'About',        href: '#about' },
    { label: 'Services',     href: '#services' },
    { label: 'Portfolio',    href: '#portfolio' },
    { label: 'How to Order', href: '#how-to-order' },
    { label: 'Contact',      href: '#contact' },
  ],

  about: {
    heading: 'Crafting Elegance, One Stitch at a Time',
    body: 'Maris Stitches and Contour is a Nigerian fashion brand founded by Adeoti Tinuke, dedicated to creating elegant women\'s outfits that celebrate individuality and personal style. Through creative designs and thoughtful tailoring, the brand aims to help every woman feel confident in what she wears.',
  },

  services: [
    {
      title:       'Custom Gowns and Dresses',
      description: 'Beautifully tailored gowns and dresses made to your exact measurements and style preferences.',
      icon:        'scissors',
    },
    {
      title:       'Native and Traditional Wear',
      description: 'Contemporary takes on Nigerian traditional wear, blending heritage with modern elegance.',
      icon:        'fabric',
    },
    {
      title:       'Occasion Wear',
      description: 'Stand-out pieces for weddings, events, and every special moment that deserves to be remembered.',
      icon:        'sparkle',
    },
    {
      title:       'Custom Fashion Design',
      description: 'Bring your creative vision to life with bespoke designs crafted entirely around your ideas.',
      icon:        'pen',
    },
    {
      title:       'Corporate Wear',
      description: 'Refined, professional outfits that balance elegance with the demands of the workplace.',
      icon:        'briefcase',
    },
  ],

  howToOrderSteps: [
    {
      step:        '01',
      title:       'Contact Us on WhatsApp',
      description: 'Reach out to us on WhatsApp to start the conversation about your dream outfit.',
    },
    {
      step:        '02',
      title:       'Share Your Design or Inspiration',
      description: 'Send us photos, sketches, or any inspiration that captures the look you have in mind.',
    },
    {
      step:        '03',
      title:       'Discuss Measurements & Fabric',
      description: 'We will discuss your measurements, preferred fabric, and any specific requirements.',
    },
    {
      step:        '04',
      title:       'Receive Your Quotation',
      description: 'We send you a detailed quotation. Once you confirm, we proceed to the next step.',
    },
    {
      step:        '05',
      title:       'Production Begins',
      description: 'Your outfit is crafted with care and delivered per our agreed arrangements.',
    },
  ],

  portfolio: {
    categories: [
      'All',
      'Gowns and Dresses',
      'Native and Occasion Wear',
      'Creative Designs',
      'Behind the Scenes',
      'Featured Creations',
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
