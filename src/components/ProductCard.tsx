import React, { useState } from 'react';
import { Heart, Eye, Star, Zap, ShoppingCart, Play, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onWhatsAppCheckout: (product: Product, selectedSize: string) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onWhatsAppCheckout, onViewDetails }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  // If product is out of stock, do not render anything
  if (!product.inStock) return null;

  const handleQuickOrder = () => {
    if (!selectedSize) {
      onViewDetails(product);
      return;
    }
    onWhatsAppCheckout(product, selectedSize);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const hasVideo = product.videos && product.videos.length > 0;
  const has3D = product.images3d && product.images3d.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.images[currentImage] || 'https://static.vecteezy.com/system/resources/previews/024/044/729/non_2x/opening-soon-coming-soon-template-coming-soon-logo-sign-coming-soon-banner-design-vector.jpg'}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isSpecialOffer && (
            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Zap className="w-3 h-3" />
              {product.offerText || 'SALE'}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              {discountPercentage}% OFF
            </span>
          )}
          {/* Removed Out of Stock badge since out-of-stock products won't render */}
        </div>

        {/* Media Indicators */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {hasVideo && (
            <div className="bg-red-600 text-white p-1.5 rounded-full shadow-lg">
              <Play className="w-3 h-3" />
            </div>
          )}
          {has3D && (
            <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-lg">
              <RotateCcw className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full shadow-lg backdrop-blur-sm transition-all ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewDetails(product)}
            className="p-2 bg-white/90 text-gray-600 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all backdrop-blur-sm"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Image Navigation */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImage === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand & Rating */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-blue-600 font-medium text-xs uppercase tracking-wide bg-blue-50 px-2 py-1 rounded-full">
            {product.brand}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3
          className="font-semibold text-gray-900 text-lg mb-3 line-clamp-2 leading-tight cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            MRP:₹{product.price.toLocaleString()}
          </span>
        </div>
        <span><h3 className='text-xl font-bold text-green-700'>🎊For Offers And Actual Price Visit Store </h3></span>
        <span><h3 className='text-xl font-bold text-green-700'>🎊সঠিক অফার এবং প্রকৃত মূল্য জানতে দোকানে আসুন। </h3></span>

        {/* Available Sizes */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700 mb-2 block">Quick Size:</span>
          <div className="flex flex-wrap gap-1">
            {product.sizes.slice(0, 4).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 text-xs font-medium rounded-md border transition-all ${
                  selectedSize === size
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300'
                }`}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 4 && (
              <button
                onClick={() => onViewDetails(product)}
                className="text-xs text-blue-600 px-2 py-1 hover:bg-blue-50 rounded-md transition-colors"
              >
                +{product.sizes.length - 4}
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => onViewDetails(product)}
            className="w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>

          {selectedSize && (
            <button
              onClick={handleQuickOrder}
              disabled={!product.inStock}
              className={`w-full py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                product.inStock
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              Quick Order (Size {selectedSize})
            </button>
          )}
        </div>

        {/* Features */}
        {product.features.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
