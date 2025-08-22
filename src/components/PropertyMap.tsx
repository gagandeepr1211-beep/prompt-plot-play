import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { properties, Property, getStatusIcon } from '@/data/properties';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Ruler, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) {
      setShowTokenInput(true);
      return;
    }

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [77.5946, 12.9716], // Bangalore center
      zoom: 10,
      pitch: 30,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for each property
    properties.forEach((property) => {
      const markerElement = document.createElement('div');
      markerElement.className = 'property-marker';
      markerElement.style.cssText = `
        width: 40px;
        height: 40px;
        background: ${property.status === 'verified' ? '#16a34a' : property.status === 'pending' ? '#eab308' : '#dc2626'};
        border: 3px solid white;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
      `;
      markerElement.innerHTML = getStatusIcon(property.status);

      // Add hover effects
      markerElement.addEventListener('mouseenter', () => {
        markerElement.style.transform = 'scale(1.2)';
        markerElement.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
      });
      markerElement.addEventListener('mouseleave', () => {
        markerElement.style.transform = 'scale(1)';
        markerElement.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      });

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(property.coordinates)
        .addTo(map.current!);

      markerElement.addEventListener('click', () => {
        setSelectedProperty(property);
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (showTokenInput && !mapboxToken) {
    return (
      <section className="py-20 bg-gradient-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8 text-foreground">
              Interactive Property Map
            </h2>
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <p className="text-muted-foreground mb-6">
                To display the interactive map, please enter your Mapbox public token. 
                You can get one free at{' '}
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light underline"
                >
                  mapbox.com
                </a>
              </p>
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter your Mapbox public token (pk.)"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={() => setShowTokenInput(false)}
                  disabled={!mapboxToken.startsWith('pk.')}
                >
                  Load Map
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Explore Properties on Map
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive map showing all available properties with real-time status updates
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl border border-border"
          >
            <div ref={mapContainer} className="absolute inset-0" />
          </motion.div>

          {/* Property Popup */}
          {selectedProperty && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-4 left-4 z-10"
            >
              <Card className="w-80 shadow-xl border-0 bg-card/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-sm line-clamp-2 flex-1 mr-2">
                      {selectedProperty.title}
                    </h3>
                    <button
                      onClick={() => setSelectedProperty(null)}
                      className="text-muted-foreground hover:text-foreground p-1"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-2 text-primary" />
                      {selectedProperty.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Ruler className="h-3 w-3 mr-2 text-primary" />
                      {selectedProperty.size}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-lg font-bold text-primary">
                      {selectedProperty.price}
                    </div>
                    <Badge 
                      className={`text-xs ${
                        selectedProperty.status === 'verified' 
                          ? 'bg-success text-success-foreground'
                          : selectedProperty.status === 'pending'
                          ? 'bg-warning text-warning-foreground' 
                          : 'bg-destructive text-destructive-foreground'
                      }`}
                    >
                      {getStatusIcon(selectedProperty.status)} {selectedProperty.status}
                    </Badge>
                  </div>

                  <Button size="sm" className="w-full mt-3">
                    <Eye className="h-3 w-3 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};