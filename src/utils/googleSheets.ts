import { Product } from '../types';

// Replace this with your Google Sheet ID from the URL
// https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
const SHEET_ID = '1p2Gn1lWS59621e-ptgh5XoOJigdeFPia1o_rc-MsxV8';

// Replace with your sheet name (the tab name at the bottom)
const SHEET_NAME = 'Sheet1';

// Google Sheets API endpoint for public sheets
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

// Mock data for demonstration - replace with actual Google Sheets integration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Traditional Leather Jutti',
    brand: 'Royal Craft',
    category: 'Traditional',
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Brown', 'Black', 'Tan'],
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
    ],
    videos: ['https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'],
    images3d: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'],
    description: 'Handcrafted traditional leather jutti with intricate embroidery. Perfect for weddings and special occasions.',
    features: ['Genuine Leather', 'Handcrafted', 'Comfortable Sole', 'Traditional Design'],
    rating: 4.5,
    reviewCount: 127,
    inStock: true,
    isSpecialOffer: true,
    offerText: 'DIWALI SPECIAL'
  },
  {
    id: '2',
    name: 'Sports Running Shoes',
    brand: 'ActiveFit',
    category: 'Sports',
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Blue', 'Red'],
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
    ],
    videos: [],
    images3d: [],
    description: 'Lightweight sports shoes perfect for running and workouts. Advanced cushioning technology.',
    features: ['Breathable Mesh', 'Cushioned Sole', 'Anti-Slip', 'Lightweight'],
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    isSpecialOffer: false
  },
  {
    id: '3',
    name: 'Formal Oxford Shoes',
    brand: 'Elite Class',
    category: 'Formal',
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Black', 'Brown'],
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
    ],
    videos: [],
    images3d: [],
    description: 'Premium formal oxford shoes for office and special occasions. Classic design meets modern comfort.',
    features: ['Premium Leather', 'Classic Design', 'Comfortable Fit', 'Durable'],
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    isSpecialOffer: true,
    offerText: 'OFFICE SPECIAL'
  },
  {
    id: '4',
    name: 'Casual Canvas Sneakers',
    brand: 'UrbanStyle',
    category: 'Casual',
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['White', 'Navy', 'Grey'],
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
    ],
    videos: [],
    images3d: [],
    description: 'Trendy canvas sneakers perfect for everyday wear. Comfortable and stylish.',
    features: ['Canvas Material', 'Rubber Sole', 'Trendy Design', 'Comfortable'],
    rating: 4.1,
    reviewCount: 156,
    inStock: true,
    isSpecialOffer: false
  },
  {
    id: '5',
    name: 'Traditional Kolhapuri Chappals',
    brand: 'Heritage Craft',
    category: 'Traditional',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Natural', 'Brown', 'Black'],
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
    ],
    videos: [],
    images3d: [],
    description: 'Authentic Kolhapuri chappals made by local artisans. Traditional craftsmanship at its finest.',
    features: ['Handmade', 'Natural Leather', 'Traditional Design', 'Artisan Crafted'],
    rating: 4.4,
    reviewCount: 98,
    inStock: true,
    isSpecialOffer: true,
    offerText: 'HERITAGE SALE'
  },
  {
    id: '6',
    name: 'Hiking Boots',
    brand: 'Adventure Pro',
    category: 'Sports',
    price: 4299,
    originalPrice: 5999,
    discount: 28,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Brown', 'Black', 'Olive'],
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
    ],
    videos: [],
    images3d: [],
    description: 'Durable hiking boots for outdoor adventures. Built to withstand tough terrains.',
    features: ['Waterproof', 'High Ankle Support', 'Grip Sole', 'Durable'],
    rating: 4.6,
    reviewCount: 74,
    inStock: true,
    isSpecialOffer: false
  }
];

export const fetchGoogleSheetData = async (): Promise<Product[]> => {
  try {
    // For demo purposes, return mock data
    // Replace this with actual Google Sheets API call
    
    
    // Uncomment and configure this section for real Google Sheets integration:
    
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    
    // Parse Google Sheets JSON response
    const jsonString = text.substring(47).slice(0, -2);
    const data = JSON.parse(jsonString);
    
    const products: Product[] = [];
    const rows = data.table.rows;
    
    // Skip header row (index 0)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.c && row.c.length >= 10) { // Ensure minimum required columns
        products.push({
          id: row.c[0]?.v || `product-${i}`,
          name: row.c[1]?.v || '',
          brand: row.c[2]?.v || '',
          category: row.c[3]?.v || '',
          price: parseFloat(row.c[4]?.v) || 0,
          originalPrice: parseFloat(row.c[5]?.v) || undefined,
          sizes: (row.c[6]?.v || '').split(',').map((s: string) => s.trim()).filter(Boolean),
          colors: (row.c[7]?.v || '').split(',').map((s: string) => s.trim()).filter(Boolean),
          images: (row.c[8]?.v || '').split(',').map((s: string) => s.trim()).filter(Boolean),
          videos: (row.c[9]?.v || '').split(',').map((s: string) => s.trim()).filter(Boolean),
          images3d: (row.c[10]?.v || '').split(',').map((s: string) => s.trim()).filter(Boolean),
          description: row.c[11]?.v || '',
          features: (row.c[12]?.v || '').split(',').map((s: string) => s.trim()).filter(Boolean),
          rating: parseFloat(row.c[13]?.v) || 4.0,
          reviewCount: parseInt(row.c[14]?.v) || 0,
          inStock: row.c[15]?.v === 'TRUE' || row.c[15]?.v === true,
          isSpecialOffer: row.c[16]?.v === 'TRUE' || row.c[16]?.v === true,
          offerText: row.c[17]?.v || undefined,
          discount: parseFloat(row.c[5]?.v) && parseFloat(row.c[4]?.v) 
            ? Math.round(((parseFloat(row.c[5]?.v) - parseFloat(row.c[4]?.v)) / parseFloat(row.c[5]?.v)) * 100)
            : undefined
        });
      }
    }
    
    return products;
    
    
    // Return mock data for demo
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProducts), 1000);
    });
    
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    // Return mock data as fallback
    return mockProducts;
  }
};

/*
GOOGLE SHEETS SETUP INSTRUCTIONS:

To integrate with your Google Sheets:

1. Create a new Google Sheet with these columns (in this exact order):
   A: ID (unique identifier)
   B: Name (product name)
   C: Brand (brand name)
   D: Category (Traditional, Sports, Formal, Casual, etc.)
   E: Price (current price as number)
   F: Original Price (original price as number, optional)
   G: Sizes (comma-separated: 6,7,8,9,10)
   H: Colors (comma-separated: Black,Brown,White)
   I: Images (comma-separated URLs)
   J: Videos (comma-separated video URLs, optional)
   K: 3D Images (comma-separated 3D image URLs, optional)
   L: Description (product description)
   M: Features (comma-separated: Handmade,Leather,Comfortable)
   N: Rating (number from 1-5)
   O: Review Count (number of reviews)
   P: In Stock (TRUE/FALSE)
   Q: Is Special Offer (TRUE/FALSE)
   R: Offer Text (optional special offer text)

2. Make the sheet public:
   - Click "Share" button
   - Change access to "Anyone with the link can view"
   - Copy the sheet ID from the URL

3. Replace the SHEET_ID constant above with your sheet ID

4. Uncomment the real Google Sheets integration code and comment out the mock data return

Example Google Sheet URL:
https://docs.google.com/spreadsheets/d/1abcdefghijklmnopqrstuvwxyz/edit

Sheet ID would be: 1abcdefghijklmnopqrstuvwxyz

IMPORTANT: Make sure your sheet is publicly viewable for the integration to work!
*/