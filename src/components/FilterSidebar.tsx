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
  onClose,
}) => {
  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand))];
  const allSizes = [...new Set(products.flatMap((p) => p.sizes))].sort();

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    handleFilterChange('sizes', newSizes);
  };

  const resetFilters = () => {
    onFiltersChange({
      category: '',
      brand: '',
      priceRange: [0, 10000],
      sizes: [],
      sortBy: 'featured',
    });
  };

  return (
    <>
      {/* Overlay for small screens */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-[999] lg:hidden"
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        role="dialog"
        aria-modal="true"
        className="
          fixed top-0 left-0 bottom-0 z-[1000] w-full max-w-xs
          bg-white shadow-xl p-6 overflow-y-auto
          transition-transform transform
          translate-x-0
          lg:static lg:translate-x-0 lg:max-w-[320px] lg:shadow-none
          rounded-tr-xl rounded-br-xl
          flex flex-col
          max-h-screen
          scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-50 py-3 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 tracking-wide">Filters</h3>
          <div className="flex gap-3">
            <button
              onClick={resetFilters}
              className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Reset Filters"
              aria-label="Reset all filters"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Close filters"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Sort By */}
        <section className="mb-8">
          <label
            htmlFor="sortBy"
            className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide"
          >
            Sort By
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="
              w-full px-4 py-2 border border-gray-300 rounded-lg
              text-sm font-medium text-gray-800
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-shadow
              shadow-sm
            "
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </section>

        {/* Price Range */}
        <section className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">
            Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
          </label>
          <div className="space-y-4">
            {/* Range sliders */}
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={filters.priceRange[0]}
              onChange={(e) =>
                handleFilterChange('priceRange', [
                  Math.min(parseInt(e.target.value), filters.priceRange[1]),
                  filters.priceRange[1],
                ])
              }
              className="w-full accent-blue-600 cursor-pointer"
              aria-label="Minimum price"
            />
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={filters.priceRange[1]}
              onChange={(e) =>
                handleFilterChange('priceRange', [
                  filters.priceRange[0],
                  Math.max(parseInt(e.target.value), filters.priceRange[0]),
                ])
              }
              className="w-full accent-blue-600 cursor-pointer"
              aria-label="Maximum price"
            />
            {/* Number inputs */}
            <div className="flex gap-4">
              <input
                type="number"
                min={0}
                max={filters.priceRange[1]}
                value={filters.priceRange[0]}
                onChange={(e) =>
                  handleFilterChange('priceRange', [
                    Math.min(Math.max(parseInt(e.target.value) || 0, 0), filters.priceRange[1]),
                    filters.priceRange[1],
                  ])
                }
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Min"
                aria-label="Minimum price input"
              />
              <input
                type="number"
                min={filters.priceRange[0]}
                max={10000}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange('priceRange', [
                    filters.priceRange[0],
                    Math.max(Math.min(parseInt(e.target.value) || 10000, 10000), filters.priceRange[0]),
                  ])
                }
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Max"
                aria-label="Maximum price input"
              />
            </div>
          </div>
        </section>

        {/* Category */}
        <section className="mb-8">
          <h4 className="text-base font-semibold text-gray-800 mb-4 tracking-wide">Category</h4>
          <div className="space-y-3 max-h-44 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="category"
                value=""
                checked={filters.category === ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="mr-3 accent-blue-600 group-hover:accent-blue-700"
                aria-checked={filters.category === ''}
              />
              <span className="text-gray-700 text-sm font-medium">All Categories</span>
            </label>
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center cursor-pointer group hover:text-blue-600"
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="mr-3 accent-blue-600 group-hover:accent-blue-700"
                  aria-checked={filters.category === category}
                />
                <span className="text-gray-700 text-sm font-medium">{category}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Brand */}
        <section className="mb-8">
          <h4 className="text-base font-semibold text-gray-800 mb-4 tracking-wide">Brand</h4>
          <div className="space-y-3 max-h-44 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="brand"
                value=""
                checked={filters.brand === ''}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="mr-3 accent-blue-600 group-hover:accent-blue-700"
                aria-checked={filters.brand === ''}
              />
              <span className="text-gray-700 text-sm font-medium">All Brands</span>
            </label>
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center cursor-pointer group hover:text-blue-600"
              >
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={filters.brand === brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="mr-3 accent-blue-600 group-hover:accent-blue-700"
                  aria-checked={filters.brand === brand}
                />
                <span className="text-gray-700 text-sm font-medium">{brand}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Sizes */}
        <section className="mb-8">
          <h4 className="text-base font-semibold text-gray-800 mb-4 tracking-wide">Sizes</h4>
          <div className="flex flex-wrap gap-3">
            {allSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-all select-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  filters.sizes.includes(size)
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
                }`}
                aria-pressed={filters.sizes.includes(size)}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </section>
      </aside>
    </>
  );
};

export default FilterSidebar;
