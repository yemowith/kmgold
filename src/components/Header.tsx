import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { CartItem } from '../types/Product';

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
  onCategoryClick: (category: string) => void;
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItems, onCartClick, onCategoryClick, onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    'GRAM KÜLÇE ALTIN',
    'GRAM KÜLÇE GÜMÜŞ', 
    'ZİYNET ALTIN',
    'HESAPLI ALTIN HAVALE',
    'HESAPTAN FIRIR ALTINA',
    'DÜZENLİ BİRİKİM'
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-blue-800 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>Türkiye'nin Lider Altın Alışverişi Sitesi • Ücretsiz Kargo • Güvenli Alışveriş</span>
          <div className="flex items-center gap-4">
            <span>₺ KUR GÜNCELLEMESİ: 01:18</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-800">
              KM<span className="text-yellow-500">GOLD</span>
            </h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className={`flex items-center w-full bg-gray-100 rounded-lg transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-blue-500' : ''}`}>
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Ürün Ara..."
                className="w-full px-3 py-2 bg-transparent outline-none"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-sm">
              <button 
                onClick={onLoginClick}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Giriş Yap
              </button>
              <span className="text-gray-600">Sepetim (1)</span>
            </div>
            
            {/* User Button - Mobile */}
            <button
              onClick={onLoginClick}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <User className="w-6 h-6" />
            </button>
            
            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:block border-t border-gray-200">
          <div className="flex items-center space-x-8 py-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryClick(category)}
                className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors py-1"
              >
                {category}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4">
            <div className="flex items-center mb-4">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Ürün Ara..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryClick(category)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;