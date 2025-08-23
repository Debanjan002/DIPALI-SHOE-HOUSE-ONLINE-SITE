export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  sizes: string[];
  colors: string[];
  images: string[];
  videos?: string[];
  images3d?: string[];
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isSpecialOffer: boolean;
  offerText?: string;
}

export interface FilterState {
  category: string;
  brand: string;
  priceRange: [number, number];
  sizes: string[];
  sortBy: string;
}