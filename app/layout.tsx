import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import '../styles/globals.css';
import { siteConfig } from '@/config/site';
import Providers from '@/components/ui/Providers';
import ClientOnlyExtras from '@/components/ui/ClientOnlyExtras';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display:  'swap',
});

const inter = Inter({
  subsets:  ['latin'],
  weight:   ['400', '500', '600'],
  variable: '--font-inter',
  display:  'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default:  'Custom Nigerian Tailoring in Ogbomosho | Maris Stitches',
  },
  description: siteConfig.description,
  keywords: [
    'custom tailoring Nigeria',
    'aso-ebi tailor',
    'agbada tailor',
    'senator style tailor',
    'Nigerian bridal wear',
    'Ankara and Adire tailoring',
    'tailor in Ogbomosho',
    'On-Ara style',
    'Maris Stitches and Contour',
  ],
  openGraph: {
    title:       siteConfig.name,
    description: siteConfig.description,
    url:         siteConfig.url,
    siteName:    siteConfig.name,
    images:      [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    locale:      'en_NG',
    type:        'website',
  },
  twitter: {
    card:   'summary_large_image',
    title:  siteConfig.name,
    images: [siteConfig.ogImage],
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true },
  },
};

const localBusinessSchema = {
  '@context':    'https://schema.org',
  '@type':       'LocalBusiness',
  name:          siteConfig.name,
  description:   siteConfig.description,
  url:           siteConfig.url,
  telephone:     `+234${siteConfig.phone.slice(1)}`,
  email:         siteConfig.email,
  logo:          `${siteConfig.url}/logo.png`,
  image:         `${siteConfig.url}/logo.png`,
  address: {
    '@type':         'PostalAddress',
    streetAddress:   'LAUTECH Under-G area',
    addressLocality: 'Ogbomosho',
    addressRegion:   'Oyo State',
    addressCountry:  'NG',
  },
  priceRange:    '₦₦',
  currenciesAccepted: 'NGN',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <head>
        {/* Critical viewport meta — must be present for mobile to render correctly */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#F8F4EE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-ivory text-aubergine antialiased">
        <ErrorBoundary>
          <Providers>
            <ClientOnlyExtras />
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
