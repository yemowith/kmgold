import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, Plus, Minus, Shield, Truck, RotateCcw, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '../types/Product';
import Breadcrumb from './Breadcrumb';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
  relatedProducts: Product[];
  onViewProduct: (product: Product) => void;
  onToggleLike: (product: Product) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onAddToCart,
  onBack,
  relatedProducts,
  onViewProduct,
  onToggleLike
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('features');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const productImages = [
    product.image,
    '/gold-km.jpeg',
    '/gold-km.jpeg',
    '/gold-km.jpeg'
  ];

  const breadcrumbItems = [
    { label: 'Anasayfa', href: '/' },
    { label: product.category, href: `/category/${product.category}` },
    { label: product.name }
  ];

  const features = [
    { icon: Shield, title: '2 Yıl Garanti', description: 'Üretici garantisi' },
    { icon: Truck, title: 'Ücretsiz Kargo', description: 'Hızlı ve güvenli teslimat' },
    { icon: RotateCcw, title: '7 Gün İade', description: 'Koşulsuz iade hakkı' },
    { icon: Award, title: 'Sertifikalı', description: 'Kalite belgeli ürün' }
  ];

  const faqs = [
    {
      question: 'KM Gold altın ürünleri nasıl üretilir?',
      answer: 'Tüm altın ürünlerimiz en yüksek kalite standartlarında, sertifikalı tesislerde üretilmektedir.'
    },
    {
      question: 'Ürün hangi şekilde teslim edilir?',
      answer: 'Ürünler özel ambalajında, güvenli kargo ile adresinize teslim edilir.'
    },
    {
      question: 'Garanti kapsamı nedir?',
      answer: '2 yıl üretici garantisi kapsamında tüm üretim hatalarını karşılar.'
    },
    {
      question: 'Altının saflığı nasıl kontrol edilir?',
      answer: 'Her ürün sertifikalı laboratuvarlarda test edilir ve saflık belgesi ile birlikte gönderilir.'
    },
    {
      question: 'İade şartları nelerdir?',
      answer: '7 gün içinde hiçbir neden belirtmeden ürünü iade edebilirsiniz.'
    }
  ];

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Geri Dön
        </button>

        {/* Product Detail Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-4">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.likes || 127} değerlendirme)</span>
                  {product.likes !== undefined && (
                    <div className="flex items-center gap-1 ml-4">
                      <Heart className={`w-4 h-4 ${product.isLiked ? 'fill-current text-red-500' : 'text-gray-400'}`} />
                      <span className="text-sm text-gray-600">{product.likes} beğeni</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ₺{product.originalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </span>
                  )}
                  <div className="text-4xl font-bold text-blue-600">
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

              {/* Product Specifications */}
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

                <div className="text-xl font-semibold">
                  Toplam: ₺{(product.price * quantity).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
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
            </div>
          </div>
        </div>

        {/* Product Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">KM Gold 1 Gr Külçe Altın Ürün Özellikleri</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-12">
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'features', label: 'Özellikler' },
                { id: 'shipping', label: 'Kargo' },
                { id: 'warranty', label: 'Garanti' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-8">
            {activeTab === 'features' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ürün Özellikleri</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 24 ayar saf altın külçe</li>
                  <li>• 1 gram ağırlığında</li>
                  <li>• Sertifikalı ve güvenilir</li>
                  <li>• Yatırım amaçlı ideal</li>
                  <li>• Özel ambalajında teslim</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Kargo Bilgileri</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Ücretsiz kargo</li>
                  <li>• 1-2 iş günü içinde kargoya verilir</li>
                  <li>• Güvenli ambalaj</li>
                  <li>• Kargo takip numarası gönderilir</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'warranty' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Garanti Koşulları</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 2 yıl üretici garantisi</li>
                  <li>• Üretim hatalarını kapsar</li>
                  <li>• Garanti belgesi ile birlikte teslim</li>
                  <li>• Yetkili servis ağı</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sık Sorulan Sorular</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Price History Chart Placeholder */}
        <div className="bg-blue-900 rounded-2xl shadow-lg p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-6">KM Gold 1 Gr Külçe Altın Fiyat Geçmişi</h2>
          <div className="bg-blue-800 rounded-lg p-6 h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">₺{product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
              <div className="text-blue-200">Güncel Fiyat</div>
              <div className="mt-4 text-sm text-blue-200">
                Son 30 günde %2.5 artış
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Çok Satanlar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <div key={relatedProduct.id} className="group cursor-pointer" onClick={() => onViewProduct(relatedProduct)}>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{relatedProduct.name}</h3>
                <div className="text-lg font-bold text-blue-600">
                  ₺{relatedProduct.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-gray-600">Sepette Ekle</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;