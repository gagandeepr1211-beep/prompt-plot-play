import { HeroSection } from '@/components/HeroSection';
import { PropertiesGrid } from '@/components/PropertiesGrid';
import { DummyMap } from '@/components/DummyMap';
import { AddPropertyForm } from '@/components/AddPropertyForm';
import { useProperties } from '@/hooks/useProperties';

const Index = () => {
  const { properties, addProperty } = useProperties();

  return (
    <main className="min-h-screen bg-gradient-background">
      <HeroSection />
      
      {/* Add Property Form Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <AddPropertyForm onAddProperty={addProperty} />
        </div>
      </section>

      <PropertiesGrid properties={properties} />
      <DummyMap allProperties={properties} />
    </main>
  );
};

export default Index;
