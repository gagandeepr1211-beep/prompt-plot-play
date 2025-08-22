import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { properties, Property, getStatusIcon } from '@/data/properties';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Ruler, Eye, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface DummyMapProps {
  allProperties: Property[];
}

export const DummyMap = ({ allProperties }: DummyMapProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [zoom, setZoom] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });

  // Create a grid-based map layout
  const mapWidth = 800;
  const mapHeight = 600;
  
  // Distribute properties across the map area
  const getPropertyPosition = (index: number) => {
    const cols = Math.ceil(Math.sqrt(allProperties.length));
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    return {
      x: (col / cols) * mapWidth + 50 + Math.random() * 100,
      y: (row / cols) * mapHeight + 50 + Math.random() * 100
    };
  };

  return (
    <section className="py-20 bg-gradient-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Interactive Property Map
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore all available properties with our interactive map interface
          </p>
        </motion.div>

        <div className="relative">
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/90 backdrop-blur-sm"
              onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/90 backdrop-blur-sm"
              onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/90 backdrop-blur-sm"
              onClick={() => {
                setZoom(1);
                setMapPosition({ x: 0, y: 0 });
                setSelectedProperty(null);
              }}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl border border-border bg-gradient-to-br from-green-50 to-blue-50"
          >
            {/* Map Background */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-green-50"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
                `,
                transform: `scale(${zoom}) translate(${mapPosition.x}px, ${mapPosition.y}px)`,
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Grid Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22c55e" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Roads/Paths */}
              <svg className="absolute inset-0 w-full h-full opacity-30">
                <path d="M0,150 Q200,120 400,150 T800,150" stroke="#6b7280" strokeWidth="8" fill="none" />
                <path d="M0,300 Q200,280 400,300 T800,300" stroke="#6b7280" strokeWidth="6" fill="none" />
                <path d="M0,450 Q200,430 400,450 T800,450" stroke="#6b7280" strokeWidth="8" fill="none" />
                <path d="M200,0 Q180,200 200,400 T200,600" stroke="#6b7280" strokeWidth="6" fill="none" />
                <path d="M500,0 Q480,200 500,400 T500,600" stroke="#6b7280" strokeWidth="8" fill="none" />
              </svg>

              {/* Property Markers */}
              {allProperties.map((property, index) => {
                const position = getPropertyPosition(index);
                return (
                  <motion.div
                    key={property.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: position.x,
                      top: position.y,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    whileHover={{ 
                      scale: 1.3,
                      zIndex: 10
                    }}
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div 
                      className={`
                        w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-sm font-bold cursor-pointer transition-all duration-300
                        ${property.status === 'verified' 
                          ? 'bg-success hover:bg-success/80' 
                          : property.status === 'pending' 
                          ? 'bg-warning hover:bg-warning/80' 
                          : 'bg-destructive hover:bg-destructive/80'
                        }
                      `}
                    >
                      {getStatusIcon(property.status)}
                    </div>
                    
                    {/* Property Label */}
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {property.title}
                    </div>
                  </motion.div>
                );
              })}

              {/* Area Labels */}
              <div className="absolute top-20 left-20 text-lg font-semibold text-primary/70">
                North Bangalore
              </div>
              <div className="absolute top-20 right-20 text-lg font-semibold text-primary/70">
                East Bangalore
              </div>
              <div className="absolute bottom-20 left-20 text-lg font-semibold text-primary/70">
                South Bangalore
              </div>
              <div className="absolute bottom-20 right-20 text-lg font-semibold text-primary/70">
                West Bangalore
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-primary/50">
                Bangalore City Center
              </div>
            </div>
          </motion.div>

          {/* Property Popup */}
          {selectedProperty && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-4 left-4 z-20"
            >
              <Card className="w-80 shadow-xl border-0 bg-card/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-sm line-clamp-2 flex-1 mr-2">
                      {selectedProperty.title}
                    </h3>
                    <button
                      onClick={() => setSelectedProperty(null)}
                      className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted rounded transition-colors"
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

          {/* Map Legend */}
          <div className="absolute top-4 left-4 z-20">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-3">
                <h4 className="font-semibold text-sm mb-2">Property Status</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span>🟢 Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span>🟡 Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span>🔴 Rejected</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};