import { motion } from 'framer-motion';
import { DummyMap } from '@/components/DummyMap';
import { useProperties } from '@/hooks/useProperties';

const MapView = () => {
  const { properties } = useProperties();

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Full-screen map with enhanced controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-screen"
      >
        <DummyMap allProperties={properties} />
      </motion.div>
    </div>
  );
};

export default MapView;