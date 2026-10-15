// Seed data for portfolio when Supabase is not configured.
// Replace with real uploads via the admin panel.

export interface PortfolioItem {
  id:         string;
  title:      string;
  category:   string;
  caption:    string;
  image_url:  string;
  blur_hash:  string;
  sort_order: number;
  featured:   boolean;
  published:  boolean;
  width:      number;
  height:     number;
}

export const portfolioSeed: PortfolioItem[] = [
  {
    id:         'seed-1',
    title:      'Crimson Evening Gown',
    category:   'Gowns and Dresses',
    caption:    'A flowing evening gown with intricate bodice detailing.',
    image_url:  '/portfolio/placeholder-1.svg',
    blur_hash:  '',
    sort_order: 1,
    featured:   true,
    published:  true,
    width:      600,
    height:     800,
  },
  {
    id:         'seed-2',
    title:      'Ivory Lace Ballgown',
    category:   'Gowns and Dresses',
    caption:    'Layered organza skirt with delicate lace overlay.',
    image_url:  '/portfolio/placeholder-2.svg',
    blur_hash:  '',
    sort_order: 2,
    featured:   false,
    published:  true,
    width:      600,
    height:     900,
  },
  {
    id:         'seed-3',
    title:      'Adire Fusion Piece',
    category:   'Native and Occasion Wear',
    caption:    'Contemporary design celebrating the artistry of Adire fabric.',
    image_url:  '/portfolio/placeholder-3.svg',
    blur_hash:  '',
    sort_order: 3,
    featured:   true,
    published:  true,
    width:      600,
    height:     750,
  },
  {
    id:         'seed-4',
    title:      'Ankara Elegance',
    category:   'Native and Occasion Wear',
    caption:    'Bold Ankara print styled for a modern silhouette.',
    image_url:  '/portfolio/placeholder-4.svg',
    blur_hash:  '',
    sort_order: 4,
    featured:   false,
    published:  true,
    width:      600,
    height:     820,
  },
  {
    id:         'seed-5',
    title:      'Sculptural Cape Dress',
    category:   'Creative Designs',
    caption:    'An architectural cape-dress merging form and movement.',
    image_url:  '/portfolio/placeholder-5.svg',
    blur_hash:  '',
    sort_order: 5,
    featured:   false,
    published:  true,
    width:      600,
    height:     780,
  },
  {
    id:         'seed-6',
    title:      'Petal Couture Piece',
    category:   'Creative Designs',
    caption:    'Floral-inspired design with structured petal layers.',
    image_url:  '/portfolio/placeholder-6.svg',
    blur_hash:  '',
    sort_order: 6,
    featured:   false,
    published:  true,
    width:      600,
    height:     840,
  },
  {
    id:         'seed-7',
    title:      'Atelier at Work',
    category:   'Behind the Scenes',
    caption:    'A glimpse into the craft behind every creation.',
    image_url:  '/portfolio/placeholder-7.svg',
    blur_hash:  '',
    sort_order: 7,
    featured:   false,
    published:  true,
    width:      600,
    height:     680,
  },
  {
    id:         'seed-8',
    title:      'Mulberry Occasion Dress',
    category:   'Featured Creations',
    caption:    'A statement occasion dress in deep mulberry tones.',
    image_url:  '/portfolio/placeholder-8.svg',
    blur_hash:  '',
    sort_order: 8,
    featured:   true,
    published:  true,
    width:      600,
    height:     860,
  },
];
