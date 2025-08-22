import { useState } from 'react';
import { motion } from 'framer-motion';
import { PropertyCard } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Property } from '@/data/properties';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useProperties } from '@/hooks/useProperties';

const Properties = () => {
  const { properties } = useProperties();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = properties.filter(property => {
    const matchesStatus = selectedStatus === 'all' || property.status === selectedStatus;
    const matchesType = selectedType === 'all' || property.type === selectedType;
    const matchesSearch = searchTerm === '' || 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const statusCounts = {
    all: properties.length,
    verified: properties.filter(p => p.status === 'verified').length,
    pending: properties.filter(p => p.status === 'pending').length,
    rejected: properties.filter(p => p.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gradient-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            All Properties
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse through our verified collection of land investments across Bangalore
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          {/* Filter Section */}
          <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Filter Properties</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Filter */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Status</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: 'All Properties', count: statusCounts.all },
                    { key: 'verified', label: '🟢 Verified', count: statusCounts.verified },
                    { key: 'pending', label: '🟡 Pending', count: statusCounts.pending },
                    { key: 'rejected', label: '🔴 Rejected', count: statusCounts.rejected },
                  ].map((status) => (
                    <Button
                      key={status.key}
                      variant={selectedStatus === status.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatus(status.key)}
                      className={`${
                        selectedStatus === status.key 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-accent'
                      }`}
                    >
                      {status.label}
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {status.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Property Type</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: 'All Types' },
                    { key: 'residential', label: 'Residential' },
                    { key: 'commercial', label: 'Commercial' },
                    { key: 'agricultural', label: 'Agricultural' },
                  ].map((type) => (
                    <Button
                      key={type.key}
                      variant={selectedType === type.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type.key)}
                      className={
                        selectedType === type.key 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-accent'
                      }
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-muted-foreground text-center">
            Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span> properties
            {searchTerm && (
              <span> matching "<span className="font-semibold text-primary">{searchTerm}</span>"</span>
            )}
          </p>
        </motion.div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-card rounded-2xl p-8 shadow-md border border-border max-w-md mx-auto">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No Properties Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                  setSelectedType('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Properties;