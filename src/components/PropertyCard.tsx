import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Ruler, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Property, getStatusColor, getStatusIcon } from '@/data/properties';

interface PropertyCardProps {
  property: Property;
  index: number;
}

export const PropertyCard = ({ property, index }: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
      className="group cursor-pointer"
    >
      <Card className="overflow-hidden bg-gradient-card border-0 shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden">
          <img 
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4">
            <Badge className={`${getStatusColor(property.status)} shadow-sm font-medium`}>
              <span className="mr-1">{getStatusIcon(property.status)}</span>
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              {property.location}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Ruler className="h-4 w-4 mr-2 text-primary" />
              {property.size}
            </div>
            <Badge variant="outline" className="text-xs">
              {property.type}
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-2xl font-bold text-primary">
              {property.price}
            </div>
            <Link to={`/property/${property.id}`}>
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary-light transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};