import React, { useState, useEffect } from 'react';
import { X, Heart, Star, ShoppingCart, ChevronLeft, ChevronRight, Play, RotateCcw, ZoomIn } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppCheckout: (product: Product, selectedSize: string) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onWhatsAppCheckout
}) => {
  const [currentMedia, setCurrentMedia] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [mediaType, setMediaType] = useState<'image' | 'video' | '3d'>('image');

  useEffect(() => {
    if (isOpen && product) {
      setCurrentMedia(0);
      setSelectedSize('');
      setSelectedColor(product.colors[0] || '');
      setQuantity(1);
      setMediaType('image');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, product]);

  const handleWhatsAppOrder = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (product) {
      onWhatsAppCheckout(product, selectedSize);
    }
  };

  const getAllMedia = () => {
    if (!product) return [];
    const media: { type: 'image' | 'video' | '3d'; url: string }[] = [];
    
    // Add images
    product.images.forEach(img => media.push({ type: 'image', url: img }));
    
    // Add videos if available
    if (product.videos) {
      product.videos.forEach(video => media.push({ type: 'video', url: video }));
    }
    
    // Add 3D images if available
    if (product.images3d) {
      product.images3d.forEach(img3d => media.push({ type: '3d', url: img3d }));
    }
    
    return media;
  };

  const allMedia = getAllMedia();

  const nextMedia = () => {
    setCurrentMedia((prev) => (prev + 1) % allMedia.length);
  };

  const prevMedia = () => {
    setCurrentMedia((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  if (!isOpen || !product) return null;

  const currentMediaItem = allMedia[currentMedia];
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
          {/* Media Gallery - 60% width */}
          <div className="lg:w-3/5 relative bg-gray-50">
            <div className="relative h-80 lg:h-full min-h-[400px]">
              {/* Main Media Display */}
              <div className="w-full h-full flex items-center justify-center p-6">
                {currentMediaItem?.type === 'video' ? (
                  <div className="relative w-full h-full max-w-lg">
                    <video
                      src={currentMediaItem.url}
                      className="w-full h-full object-contain rounded-xl"
                      controls
                      poster={product.images[0]}
                    />
                  </div>
                ) : currentMediaItem?.type === '3d' ? (
                  <div className="relative w-full h-full max-w-lg bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
                    <img
                      src={currentMediaItem.url}
                      alt={`${product.name} 3D view`}
                      className="w-full h-full object-contain rounded-xl"
                    />
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      360° View
                    </div>
                  </div>
                ) : (
                  <img
                    src={currentMediaItem?.url || product.images[0]}
                    alt={product.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg';
                    }}
                    className="w-full h-full object-contain rounded-xl"
                  />
                )}
              </div>
              
              {/* Navigation Arrows */}
              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={prevMedia}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </>
              )}

              {/* Media Type Indicator */}
              <div className="absolute bottom-4 left-4">
                {currentMediaItem?.type === 'video' && (
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Video
                  </div>
                )}
                {currentMediaItem?.type === '3d' && (
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    3D View
                  </div>
                )}
              </div>

              {/* Media Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentMedia + 1} / {allMedia.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {allMedia.length > 1 && (
              <div className="p-4 bg-white border-t overflow-x-auto">
                <div className="flex gap-2">
                  {allMedia.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMedia(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all relative ${
                        currentMedia === index ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={media.url}
                        alt={`${product.name} ${index + 1}`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg';
                        }}
                        className="w-full h-full object-cover"
                      />
                      {media.type === 'video' && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {media.type === '3d' && (
                        <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-1">
                          <RotateCcw className="w-2 h-2" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Details - 40% width with scroll */}
          <div className="lg:w-2/5 flex flex-col max-h-[90vh]">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Header */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-blue-600 font-medium text-sm uppercase tracking-wide bg-blue-50 px-3 py-1 rounded-full">
                    {product.brand}
                  </span>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-all ${
                      isLiked 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">{product.rating}</span>
                    <span className="text-gray-500 text-sm">({product.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{(product.price * quantity).toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <div className="flex flex-col">
                      <span className="text-lg text-gray-500 line-through">
                        ₹{(product.originalPrice * quantity).toLocaleString()}
                      </span>
                      <span className="text-green-600 font-medium text-sm">
                        {discountPercentage}% OFF
                      </span>
                    </div>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <p className="text-green-600 font-medium text-sm">
                    You save ₹{((product.originalPrice! - product.price) * quantity).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Features */}
              {product.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="space-y-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Color: <span className="text-blue-600">{selectedColor}</span>
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 text-gray-700'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Size: {selectedSize && <span className="text-blue-600">{selectedSize}</span>}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-2 text-center font-medium rounded-lg border-2 transition-all ${
                        selectedSize === size
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Fixed Bottom Actions */}
            <div className="border-t bg-white p-6">
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppOrder}
                  disabled={!product.inStock || !selectedSize}
                  className={`w-full py-3 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-all ${
                    product.inStock && selectedSize
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {!selectedSize ? 'Select Size First' : product.inStock ? 'Order via WhatsApp' : 'Out of Stock'}
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2 px-4 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all">
                    Add to Wishlist
                  </button>
                  <button className="py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all">
                    Share Product
                  </button>
                </div>
              </div>

              {/* Service Info */}
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-1">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <span className="font-medium">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                    <span className="text-blue-600 font-bold text-sm">↩</span>
                  </div>
                  <span className="font-medium">Easy Returns</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                    <span className="text-purple-600 font-bold text-sm">🔒</span>
                  </div>
                  <span className="font-medium">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;