// ============================================================
// Maris Stitches and Contour — Site Configuration
// SINGLE SOURCE OF TRUTH for all text, contact details,
// colors, and links. Edit here, nowhere else.
// ============================================================

export const siteConfig = {
  name:        'Maris Stitches and Contour',
  tagline:     'Nigerian style, cut and sewn in Ogbomosho.',
  description: 'Custom Nigerian tailoring in Ogbomosho, from aso-ebi and owambe looks to agbada, senator styles, bridal wear and everyday native pieces. Maris Stitches and Contour brings thoughtful fitting and skilled sewing to Ankara, Adire, lace, Aso-Oke and more.',
  url:         'https://marisstitches.com', // TODO: update before launch

  // Contact — all values used from here, never hardcoded in components
  phone:            '08153279984',
  whatsapp:         '2349029028384',   // international format for wa.me links
  whatsappDisplay:  '09029028384',     // local format for display
  whatsappMessage:  "Hello, I'd like to discuss a Nigerian outfit. I can share the style, fabric and occasion I have in mind.",
  address:          'LAUTECH Under-G area, Ogbomosho, Oyo State, Nigeria',
  email:            'marisstitchesandcntour22@gmail.com',

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
    heading: 'Nigerian Craft, Made to Fit You',
    body: 'Founded by Adeoti Tinuke in Ogbomosho, Maris Stitches and Contour brings a careful eye to Nigerian fashion and the fabrics people choose for its biggest moments. From the first conversation about your aso-ebi, bridal look or everyday native wear to the final fitting, each piece is shaped around your measurements, comfort and personal style.',
  },

  services: [
    {
      title:       'Aso-Ebi and Owambe Looks',
      description: 'Celebration outfits planned around your event and fabric, from coordinated lace and George to Ankara and Aso-Oke details.',
      icon:        'scissors',
    },
    {
      title:       'Agbada, Senator and Kaftan Styles',
      description: 'Traditional and relaxed native looks with considered proportions, neat finishing and a comfortable fit.',
      icon:        'fabric',
    },
    {
      title:       'Lace, Ankara and Adire Pieces',
      description: 'French or Swiss lace for special occasions, expressive Ankara prints, and Adire with its distinctive hand-dyed patterns.',
      icon:        'sparkle',
    },
    {
      title:       'Bridal Wear, Gele and Headwraps',
      description: 'Traditional wedding looks for Igba nkwu and other celebrations, with room for Aso-Oke, richly patterned George and gele styling.',
      icon:        'pen',
    },
    {
      title:       'Corporate Wear and Custom Fitting',
      description: 'Polished workwear and careful contouring, using suitable Senatorial materials or light chiffon and silk blends where the design calls for them.',
      icon:        'briefcase',
    },
  ],

  fabrics: [
    { name: 'Ankara', note: 'Colourful prints shaped into pieces that feel distinctly yours.' },
    { name: 'Adire', note: 'Yoruba resist-dyed cloth with character in every pattern.' },
    { name: 'French and Swiss Lace', note: 'Fine lace for bridal, aso-ebi and special occasion wear.' },
    { name: 'Aso-Oke', note: 'A cherished handwoven cloth for traditional celebrations.' },
    { name: 'George', note: 'Rich, statement fabric often chosen for ceremonies and family occasions.' },
    { name: 'Senatorial and Native Materials', note: 'Structured fabrics for smart senator sets and agbada.' },
    { name: 'Chiffon and Silk Blends', note: 'Light, flowing fabrics for soft movement and graceful layers.' },
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
