import { useState } from 'react';
import { properties as initialProperties, Property } from '@/data/properties';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const addProperty = (newPropertyData: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...newPropertyData,
      id: (properties.length + 1).toString()
    };
    setProperties(prev => [newProperty, ...prev]);
  };

  const updateProperty = (id: string, updatedData: Partial<Property>) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === id ? { ...property, ...updatedData } : property
      )
    );
  };

  const removeProperty = (id: string) => {
    setProperties(prev => prev.filter(property => property.id !== id));
  };

  return {
    properties,
    addProperty,
    updateProperty,
    removeProperty
  };
};