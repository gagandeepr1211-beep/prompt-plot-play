import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Upload, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Property } from '@/data/properties';

interface AddPropertyFormProps {
  onAddProperty: (property: Omit<Property, 'id'>) => void;
}

export const AddPropertyForm = ({ onAddProperty }: AddPropertyFormProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    status: 'pending' as Property['status'],
    size: '',
    type: 'residential' as Property['type'],
    description: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.location || !formData.size) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Generate random coordinates around Bangalore
    const bangaloreCenter = [77.5946, 12.9716];
    const randomCoordinates: [number, number] = [
      bangaloreCenter[0] + (Math.random() - 0.5) * 0.5,
      bangaloreCenter[1] + (Math.random() - 0.5) * 0.5
    ];

    const newProperty: Omit<Property, 'id'> = {
      ...formData,
      coordinates: randomCoordinates,
      image: formData.image || '/api/placeholder/400/300'
    };

    onAddProperty(newProperty);
    
    toast({
      title: "Property Added Successfully!",
      description: `${formData.title} has been added to the marketplace.`,
    });

    // Reset form
    setFormData({
      title: '',
      price: '',
      location: '',
      status: 'pending',
      size: '',
      type: 'residential',
      description: '',
      image: ''
    });
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="bg-primary hover:bg-primary-light shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Your Property
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                <Upload className="h-6 w-6 text-primary" />
                List Your Property
              </CardTitle>
              <p className="text-muted-foreground">
                Add your land to our verified marketplace
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Premium Plot in Whitefield"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="e.g., ₹85,00,000"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., Whitefield, Bangalore East"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Size *</Label>
                    <Input
                      id="size"
                      value={formData.size}
                      onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                      placeholder="e.g., 2400 sq ft"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Property Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: Property['type']) => 
                        setFormData(prev => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="agricultural">Agricultural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: Property['status']) => 
                        setFormData(prev => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <div className="flex items-center gap-2">
                            🟡 Pending Verification
                          </div>
                        </SelectItem>
                        <SelectItem value="verified">
                          <div className="flex items-center gap-2">
                            🟢 Verified
                          </div>
                        </SelectItem>
                        <SelectItem value="rejected">
                          <div className="flex items-center gap-2">
                            🔴 Rejected
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL (Optional)</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/property-image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your property, include details about approvals, location benefits, etc."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-light shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Property
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="px-8"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};