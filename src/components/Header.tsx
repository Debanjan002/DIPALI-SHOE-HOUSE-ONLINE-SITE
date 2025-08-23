import React, { useState } from 'react';
import { Search, ShoppingBag, Phone, Mail, MapPin } from 'lucide-react';

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 6296329245</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>sudiphui02@gmail.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span> Book Online, Visit Store & get special discount only for you </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Dipali Shoe House
                </h1>
                <p className="text-xs text-gray-600">Premium Footwear</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search shoes, brands, categories..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+916296329245"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Call Us!!</span>
              </a>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search shoes..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;