import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Play,
  RotateCcw,
} from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppCheckout: (product: Product, selectedSize: string) => void;
}

type MediaItem = { type: 'image' | 'video' | '3d'; url: string };

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onWhatsAppCheckout,
}) => {
  const [currentMedia, setCurrentMedia] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen && product) {
      setCurrentMedia(0);
      setSelectedSize('');
      setSelectedColor(product.colors?.[0] || '');
      setQuantity(1);

      // Lock background scroll while modal is open
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original || 'unset';
      };
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

  const getAllMedia = (): MediaItem[] => {
    if (!product) return [];
    const media: MediaItem[] = [];

    // Add images
    (product.images || []).forEach((img) => media.push({ type: 'image', url: img }));

    // Add videos if available
    (product.videos || []).forEach((video) => media.push({ type: 'video', url: video }));

    // Add 3D images if available
    (product.images3d || []).forEach((img3d) => media.push({ type: '3d', url: img3d }));

    return media;
  };

  const allMedia = getAllMedia();

  const nextMedia = () => {
    if (!allMedia.length) return;
    setCurrentMedia((prev) => (prev + 1) % allMedia.length);
  };

  const prevMedia = () => {
    if (!allMedia.length) return;
    setCurrentMedia((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  if (!isOpen || !product) return null;

  const currentMediaItem = allMedia[currentMedia];
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
    >
      {/* Backdrop (click to close) */}
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        aria-label="Close product modal"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative w-full h-screen sm:h-auto sm:max-h-[90vh] bg-white shadow-2xl
          sm:max-w-6xl overflow-hidden sm:rounded-2xl
          flex flex-col
        "
        style={{ maxHeight: '100vh' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3 z-20 p-3 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg
            hover:bg-white transition-all
          "
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-full min-h-0">
          {/* Media Gallery */}
          <div className="lg:w-3/5 relative bg-gray-50 flex-shrink-0">
            {/* Main Media Area */}
            <div
              className="
                relative
                h-[48vh] sm:h-[56vh] md:h-[60vh] lg:h-full
                min-h-[300px]
              "
            >
              <div className="w-full h-full flex items-center justify-center p-3 sm:p-6">
                {currentMediaItem?.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                      src={currentMediaItem.url}
                      className="w-full h-full object-contain rounded-xl"
                      controls
                      // Poster fallback only if we have at least one image
                      poster={product.images?.[0]}
                    />
                  </div>
                ) : currentMediaItem?.type === '3d' ? (
                  <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
                    <img
                      src={currentMediaItem.url}
                      alt={`${product.name} 3D view`}
                      className="max-h-full w-auto object-contain rounded-xl"
                    />
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      360° View
                    </div>
                  </div>
                ) : (
                  <img
                    src={currentMediaItem?.url || product.images?.[0]}
                    alt={product.name}
                    className="max-h-full w-auto object-contain rounded-xl"
                  />
                )}
              </div>

              {/* Navigation Arrows */}
              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={prevMedia}
                    className="
                      absolute left-2 sm:left-4 top-1/2 -translate-y-1/2
                      p-3 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all
                    "
                    aria-label="Previous media"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextMedia}
                    className="
                      absolute right-2 sm:right-4 top-1/2 -translate-y-1/2
                      p-3 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all
                    "
                    aria-label="Next media"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Media Type Indicator */}
              <div className="absolute bottom-4 left-4">
                {currentMediaItem?.type === 'video' && (
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Video
                  </div>
                )}
                {currentMediaItem?.type === '3d' && (
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    3D View
                  </div>
                )}
              </div>

              {/* Media Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs sm:text-sm">
                {currentMedia + 1} / {allMedia.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {allMedia.length > 1 && (
              <div className="p-3 sm:p-4 bg-white border-t overflow-x-auto">
                <div className="flex gap-2 snap-x snap-mandatory">
                  {allMedia.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMedia(index)}
                      className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all relative snap-start ${
                        currentMedia === index
                          ? 'border-blue-600 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      aria-label={`View media ${index + 1}`}
                    >
                      <img
                        src={media.url}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
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

          {/* Product Details */}
          <div className="lg:w-2/5 flex flex-col h-full min-h-0">
            {/* Scrollable details */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 min-h-0">
              {/* Header */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-blue-600 font-medium text-xs sm:text-sm uppercase tracking-wide bg-blue-50 px-3 py-1 rounded-full">
                    {product.brand}
                  </span>
                  <button
                    onClick={() => setIsLiked((v) => !v)}
                    className={`p-2 rounded-full transition-all ${
                      isLiked
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                    aria-pressed={isLiked}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">{product.rating}</span>
                    <span className="text-gray-500 text-sm">({product.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
                <div className="flex items-end sm:items-center gap-3 mb-1">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ₹{(product.price * quantity).toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-base sm:text-lg text-gray-500 line-through">
                        ₹{(product.originalPrice * quantity).toLocaleString()}
                      </span>
                      <span className="text-green-600 font-medium text-sm">{discountPercentage}% OFF</span>
                    </div>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <p className="text-green-600 font-medium text-sm">
                    You save ₹{(((product.originalPrice as number) - product.price) * quantity).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{product.description}</p>
              </div>

              {/* Features */}
              {(product.features || []).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="space-y-2">
                    {(product.features || []).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {(product.colors || []).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Color: <span className="text-blue-600">{selectedColor}</span>
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {(product.colors || []).map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 sm:px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 text-gray-700'
                        }`}
                        aria-pressed={selectedColor === color}
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
                  {(product.sizes || []).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-2 text-center font-medium rounded-lg border-2 transition-all ${
                        selectedSize === size
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                      aria-pressed={selectedSize === size}
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
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-4 py-3 sm:px-3 sm:py-2 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-5 py-3 sm:px-4 sm:py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-4 py-3 sm:px-3 sm:py-2 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className={`text-sm ${product.inStock ? 'text-gray-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Sticky Bottom Actions */}
            <div
              className="
                sticky bottom-0 border-t bg-white p-4 sm:p-6
                pb-[calc(env(safe-area-inset-bottom)+1rem)]
              "
            >
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppOrder}
                  disabled={!product.inStock || !selectedSize}
                  className={`w-full py-3 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-all ${
                    product.inStock && selectedSize
                      ? 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.99]'
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
                  <span className="font-medium">Visit Store</span>
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
