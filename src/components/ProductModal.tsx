import React, { useState } from 'react';
import { X, ShoppingCart, Heart, Share2, Minus, Plus } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleLike: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart, onToggleLike }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Ürün Detayları</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
              />
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={product.image}
                    alt={`${product.name} ${i}`}
                    className="w-full h-20 object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded">
                  {product.category}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-3">{product.name}</h1>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₺{product.originalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </span>
                  )}
                  <div className="text-3xl font-bold text-gray-900">
                    ₺{product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className={`text-sm px-3 py-1 rounded-full ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'Stokta Var' : 'Stokta Yok'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
                {product.weight && (
                  <div>
                    <span className="text-sm text-gray-600">Ağırlık</span>
                    <div className="font-semibold">{product.weight}</div>
                  </div>
                )}
                {product.purity && (
                  <div>
                    <span className="text-sm text-gray-600">Ayar</span>
                    <div className="font-semibold">{product.purity}</div>
                  </div>
                )}
                <div>
                  <span className="text-sm text-gray-600">Kargo</span>
                  <div className="font-semibold text-green-600">Ücretsiz</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Garanti</span>
                  <div className="font-semibold">2 Yıl</div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Adet:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-lg font-semibold">
                  Toplam: ₺{(product.price * quantity).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-colors ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
                </button>

                <div className="flex gap-2">
                  <button 
                    onClick={() => onToggleLike(product)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 border rounded-lg transition-colors ${
                      product.isLiked
                        ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${product.isLiked ? 'fill-current' : ''}`} />
                    Favoriler
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                    Paylaş
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Ücretsiz ve güvenli kargo</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>7 gün içinde ücretsiz iade</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>2 yıl garanti</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>24/7 müşteri desteği</span>
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