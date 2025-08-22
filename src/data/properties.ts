export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  status: 'verified' | 'pending' | 'rejected';
  image: string;
  coordinates: [number, number]; // [lng, lat] for Mapbox
  size: string;
  type: 'residential' | 'commercial' | 'agricultural';
  description: string;
}

// Import property images
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import property4 from '@/assets/property-4.jpg';
import property5 from '@/assets/property-5.jpg';
import property6 from '@/assets/property-6.jpg';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Premium Residential Plot in Whitefield',
    price: '₹85,00,000',
    location: 'Whitefield, Bangalore East',
    status: 'verified',
    image: property1,
    coordinates: [77.7500, 12.9698],
    size: '2400 sq ft',
    type: 'residential',
    description: 'DTCP approved residential plot with clear title and all necessary approvals. Located in the heart of Whitefield with excellent connectivity.'
  },
  {
    id: '2', 
    title: 'Commercial Plot Near Electronic City',
    price: '₹1,20,00,000',
    location: 'Electronic City, Bangalore South',
    status: 'verified',
    image: property2,
    coordinates: [77.6648, 12.8456],
    size: '3000 sq ft',
    type: 'commercial',
    description: 'Prime commercial plot with BDA approval. Perfect for office complex or retail development. High visibility location.'
  },
  {
    id: '3',
    title: 'Agricultural Land in Devanahalli',
    price: '₹45,00,000',
    location: 'Devanahalli, North Bangalore',
    status: 'pending',
    image: property3, 
    coordinates: [77.7886, 13.2846],
    size: '5 acres',
    type: 'agricultural',
    description: 'Fertile agricultural land with water source. Documents under verification. Suitable for organic farming or future development.'
  },
  {
    id: '4',
    title: 'Villa Plot in Sarjapur Road',
    price: '₹95,00,000',
    location: 'Sarjapur Road, Bangalore Southeast',
    status: 'rejected',
    image: property4,
    coordinates: [77.7319, 12.8719],
    size: '2800 sq ft',
    type: 'residential',
    description: 'Spacious villa plot in gated community. Title dispute identified during verification process. Price negotiable.'
  },
  {
    id: '5',
    title: 'IT Park Development Plot',
    price: '₹2,50,00,000',
    location: 'Outer Ring Road, Bangalore',
    status: 'verified',
    image: property5,
    coordinates: [77.6410, 12.9279],
    size: '1.5 acres',
    type: 'commercial',
    description: 'Large commercial plot approved for IT development. All clearances obtained. Strategic location on Outer Ring Road.'
  },
  {
    id: '6',
    title: 'Residential Plot in Hebbal',
    price: '₹75,00,000',
    location: 'Hebbal, North Bangalore',
    status: 'verified',
    image: property6,
    coordinates: [77.5917, 13.0358],
    size: '2200 sq ft',
    type: 'residential',
    description: 'Well-connected residential plot near Hebbal Lake. Clean title with all necessary documents verified and approved.'
  }
];

export const getStatusColor = (status: Property['status']) => {
  switch (status) {
    case 'verified':
      return 'bg-success text-success-foreground';
    case 'pending':
      return 'bg-warning text-warning-foreground';
    case 'rejected':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const getStatusIcon = (status: Property['status']) => {
  switch (status) {
    case 'verified':
      return '🟢';
    case 'pending':
      return '🟡';
    case 'rejected':
      return '🔴';
    default:
      return '⚪';
  }
};