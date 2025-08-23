import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { Product, FilterState } from '../types';

interface FilterSidebarProps {
  products: Product[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  products,
  filters,
  onFiltersChange,
  onClose
}) => {
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];
  const allSizes = [...new Set(products.flatMap(p => p.sizes))].sort();

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    handleFilterChange('sizes', newSizes);
  };

  const resetFilters = () => {
    onFiltersChange({
      category: '',
      brand: '',
      priceRange: [0, 10000],
      sizes: [],
      sortBy: 'featured'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <div className="flex gap-2">
          <button
            onClick={resetFilters}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
        </label>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={filters.priceRange[0]}
            onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
            className="w-full accent-blue-600"
          />
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-blue-600"
          />
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
              className="w-1/2 px-2 py-1 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 10000])}
              className="w-1/2 px-2 py-1 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-3">Category</label>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              value=""
              checked={filters.category === ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="mr-2 accent-blue-600"
            />
            <span className="text-gray-700 text-sm">All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="mr-2 accent-blue-600"
              />
              <span className="text-gray-700 text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-3">Brand</label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="brand"
              value=""
              checked={filters.brand === ''}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="mr-2 accent-blue-600"
            />
            <span className="text-gray-700 text-sm">All Brands</span>
          </label>
          {brands.map((brand) => (
            <label key={brand} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="brand"
                value={brand}
                checked={filters.brand === brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="mr-2 accent-blue-600"
              />
              <span className="text-gray-700 text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-3">Sizes</label>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md border transition-all ${
                filters.sizes.includes(size)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;