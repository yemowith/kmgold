import React from 'react';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onToggleLike: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewProduct, onToggleLike }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          {product.originalPrice && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              İNDİRİM
            </span>
          )}
          {product.featured && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full ml-2">
              ÖNE ÇIKAN
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onToggleLike(product)}
            className={`bg-white p-2 rounded-full shadow-md transition-colors ${
              product.isLiked 
                ? 'text-red-500 hover:bg-red-50' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${product.isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onViewProduct(product)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        
        {product.weight && (
          <p className="text-sm text-gray-600 mb-1">Ağırlık: {product.weight}</p>
        )}
        {product.purity && (
          <p className="text-sm text-gray-600 mb-3">Ayar: {product.purity}</p>
        )}
        
        {product.likes !== undefined && (
          <div className="flex items-center gap-1 mb-3">
            <Heart className={`w-4 h-4 ${product.isLiked ? 'fill-current text-red-500' : 'text-gray-400'}`} />
            <span className="text-sm text-gray-600">{product.likes} beğeni</span>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₺{product.originalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </span>
            )}
            <div className="text-lg font-bold text-gray-900">
              ₺{product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className={`text-sm px-2 py-1 rounded ${
            product.inStock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'Stokta' : 'Tükendi'}
          </div>
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
            product.inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;