import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import TechnologySection from '@/components/TechnologySection';
import GallerySection from '@/components/GallerySection';
import PricesSection from '@/components/PricesSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AdvantagesSection />
      <TechnologySection />
      <GallerySection />
      <PricesSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}
