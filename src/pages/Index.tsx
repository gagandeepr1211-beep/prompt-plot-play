import { HeroSection } from '@/components/HeroSection';
import { PropertiesGrid } from '@/components/PropertiesGrid';
import { PropertyMap } from '@/components/PropertyMap';

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-background">
      <HeroSection />
      <PropertiesGrid />
      <PropertyMap />
    </main>
  );
};

export default Index;
