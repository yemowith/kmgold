import React, { useState } from 'react';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import CategoryHero from './CategoryHero';
import Breadcrumb from './Breadcrumb';
import ProductCard from './ProductCard';
import { Product } from '../types/Product';

interface CategoryPageProps {
  category: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onToggleLike: (product: Product) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ 
  category, 
  products, 
  onAddToCart, 
  onViewProduct,
  onToggleLike
}) => {
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<string>('all');

  const categoryInfo = {
    'GRAM KÜLÇE ALTIN': {
      title: 'Kaynağından Güvenle Altın.',
      subtitle: 'Yüksek güvenlikli, sertifikalı gram altınlar.',
      backgroundImage: 'https://images.pexels.com/photos/128867/coins-currency-investment-insurance-128867.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'GRAM KÜLÇE GÜMÜŞ': {
      title: 'Premium Gümüş Külçeler.',
      subtitle: 'Yatırım amaçlı sertifikalı gümüş külçeler.',
      backgroundImage: 'https://images.pexels.com/photos/1454227/pexels-photo-1454227.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'ZİYNET ALTIN': {
      title: 'Geleneksel Ziynet Altınları.',
      subtitle: 'Çeyrek, yarım ve tam altın çeşitleri.',
      backgroundImage: 'https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=1200'
    }
  };

  const currentCategory = categoryInfo[category as keyof typeof categoryInfo] || categoryInfo['GRAM KÜLÇE ALTIN'];

  const breadcrumbItems = [
    { label: 'Anasayfa', href: '/' },
    { label: category }
  ];

  const filteredProducts = products
    .filter(product => product.category === category)
    .filter(product => {
      if (priceRange === 'all') return true;
      if (priceRange === 'low') return product.price < 10000;
      if (priceRange === 'medium') return product.price >= 10000 && product.price < 50000;
      if (priceRange === 'high') return product.price >= 50000;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryHero
        category={category}
        title={currentCategory.title}
        subtitle={currentCategory.subtitle}
        backgroundImage={currentCategory.backgroundImage}
      />
      
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filtreler</span>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Fiyatlar</option>
                <option value="low">₺10.000 altı</option>
                <option value="medium">₺10.000 - ₺50.000</option>
                <option value="high">₺50.000 üzeri</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="featured">Öne Çıkanlar</option>
                <option value="price-low">Fiyat: Düşükten Yükseğe</option>
                <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
                <option value="name">İsim: A-Z</option>
              </select>
              
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              {filteredProducts.length} ürün gösteriliyor
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-600 text-lg">Bu kategoride ürün bulunamadı.</p>
            <p className="text-sm text-gray-500 mt-2">Farklı filtreler deneyebilirsiniz.</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewProduct={onViewProduct}
               onToggleLike={onToggleLike}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Daha Fazla Ürün Yükle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;