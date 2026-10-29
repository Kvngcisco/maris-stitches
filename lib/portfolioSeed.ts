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
    caption:    'A flowing occasion look with a shaped bodice and careful finishing.',
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
    caption:    'A formal lace look with soft layers and a graceful finish.',
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
    caption:    'A contemporary native look that lets the artistry of Adire speak.',
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
    caption:    'A bold Ankara print cut into a clean, modern silhouette.',
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
    caption:    'A statement cape dress with sculpted lines and room to move.',
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
    caption:    'A special-occasion piece with shaped layers and a soft floral touch.',
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
    caption:    'A look at the measuring, cutting and careful sewing behind each outfit.',
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
    caption:    'A deep mulberry occasion look, finished for a confident entrance.',
    image_url:  '/portfolio/placeholder-8.svg',
    blur_hash:  '',
    sort_order: 8,
    featured:   true,
    published:  true,
    width:      600,
    height:     860,
  },
];
