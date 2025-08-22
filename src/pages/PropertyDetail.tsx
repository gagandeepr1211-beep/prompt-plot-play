import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, Ruler, Building, MessageCircle, Calendar, Share, Heart, Phone } from 'lucide-react';
import { Property, getStatusColor, getStatusIcon } from '@/data/properties';
import { useProperties } from '@/hooks/useProperties';
import { LawyerChatModal } from '@/components/LawyerChatModal';
import { BookingModal } from '@/components/BookingModal';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { properties } = useProperties();
  const [showChat, setShowChat] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <p className="text-muted-foreground mb-4">The property you're looking for doesn't exist.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </Card>
      </div>
    );
  }

  // Mock additional images for carousel
  const propertyImages = [
    property.image,
    property.image, // In real app, these would be different images
    property.image,
  ];

  return (
    <div className="min-h-screen bg-gradient-background py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="hover:bg-accent"
          >
            ← Back to Properties
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden border-0 shadow-xl">
              <CardContent className="p-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {propertyImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative h-[500px] overflow-hidden"
                        >
                          <img
                            src={image}
                            alt={`${property.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge className={`${getStatusColor(property.status)} shadow-md`}>
                              <span className="mr-1">{getStatusIcon(property.status)}</span>
                              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                            </Badge>
                          </div>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </CardContent>
            </Card>
          </motion.div>

          {/* Property Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Main Info Card */}
            <Card className="shadow-xl border-0 bg-gradient-card">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    {property.location}
                  </div>
                </div>

                <div className="text-3xl font-bold text-primary">
                  {property.price}
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border">
                  <div className="text-center">
                    <Ruler className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="font-semibold text-foreground">{property.size}</div>
                    <div className="text-xs text-muted-foreground">Area</div>
                  </div>
                  <div className="text-center">
                    <Building className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="font-semibold text-foreground capitalize">{property.type}</div>
                    <div className="text-xs text-muted-foreground">Type</div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="shadow-xl border-0 bg-gradient-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground mb-4">Take Action</h3>
                
                <Button 
                  onClick={() => setShowChat(true)}
                  className="w-full bg-primary hover:bg-primary-light shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Consult Lawyer
                </Button>
                
                <Button 
                  onClick={() => setShowBooking(true)}
                  variant="outline"
                  className="w-full hover:bg-accent border-primary text-primary hover:text-accent-foreground"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Registration Slot
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="hover:bg-accent">
                    <Heart className="mr-2 h-3 w-3" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-accent">
                    <Share className="mr-2 h-3 w-3" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="shadow-xl border-0 bg-gradient-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-primary" />
                    <span className="text-foreground">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-3 text-primary" />
                    <span className="text-foreground">info@landvest.com</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 hover:bg-accent">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Card className="shadow-xl border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Location
              </h3>
              <div className="h-[400px] bg-gradient-to-br from-green-50 to-blue-50 rounded-xl flex items-center justify-center border border-border">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <p className="text-lg font-medium">Interactive Map View</p>
                  <p className="text-sm">Precise location: {property.location}</p>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7] 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mt-4 w-4 h-4 bg-primary rounded-full mx-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modals */}
      <LawyerChatModal 
        isOpen={showChat} 
        onClose={() => setShowChat(false)}
        property={property}
      />
      <BookingModal 
        isOpen={showBooking} 
        onClose={() => setShowBooking(false)}
        property={property}
      />
    </div>
  );
};

export default PropertyDetail;