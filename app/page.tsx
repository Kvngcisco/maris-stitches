import Preloader       from '@/components/ui/Preloader';
import Navbar          from '@/components/ui/Navbar';
import HomeSection     from '@/components/sections/HomeSection';
import AboutSection    from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import HowToOrderSection from '@/components/sections/HowToOrderSection';
import ContactSection  from '@/components/sections/ContactSection';
import Footer          from '@/components/ui/Footer';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title:       siteConfig.name,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main id="main-content">
        <HomeSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <HowToOrderSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
