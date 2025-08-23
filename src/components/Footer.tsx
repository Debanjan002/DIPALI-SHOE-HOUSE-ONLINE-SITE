import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">
              Depali shoe house
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted destination for premium footwear. We bring you the finest collection with modern style and comfort.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">+91 6296329245</p>
                  <p className="text-gray-400 text-sm">WhatsApp Orders</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">sudiphui02@gmail.com</p>
                  <p className="text-gray-400 text-sm">Email Support</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Muksudpur Bazar</p>
                  <p className="text-gray-400 text-sm">, Muksudpur, Paschim Medinipur-721126</p>
                </div>
              </div>
            </div>
          </div>


          {/* Store Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Store Hours</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">Mon - San</p>
                  <p className="text-gray-400 text-sm">8.00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">Return</p>
                  <p className="text-gray-400 text-sm"> With in 3 Days with bill</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <p className="font-medium">🎉 Special Durgapuja Offers!</p>
              <p className="text-blue-100 text-sm mt-1">Visit our store for exclusive deals</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © 2025 Dipali Shoe. All rights reserved. Made with ❤️ by Debanjan Pan
            </p>
            <div className="flex gap-6 text-gray-400 text-sm">
              <span>🔒 Secure Discount </span>
              <span>📦 Special Offers</span>
              <span>↩️ Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;