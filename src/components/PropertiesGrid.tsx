import { motion } from 'framer-motion';
import { Property } from '@/data/properties';
import { PropertyCard } from './PropertyCard';

interface PropertiesGridProps {
  properties: Property[];
}

export const PropertiesGrid = ({ properties }: PropertiesGridProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Featured Properties
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover verified land investments across Bangalore with complete legal documentation and transparent pricing
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {properties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary-light"
          >
            View All Properties
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};