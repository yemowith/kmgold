import React from 'react';
import { ArrowRight, Star, TrendingUp, Shield } from 'lucide-react';

interface HeroProps {
  onCategoryClick: (category: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onCategoryClick }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Main Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4" />
              Türkiye'nin #1 Altın Platformu
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Güvenli Altın
              <span className="text-yellow-500"> Yatırımı</span>
              <br />
              <span className="text-blue-600">KM Gold</span> ile
            </h1>
            
            <p className="text-xl text-gray-600 max-w-lg">
              Gram altın, külçe altın ve ziynet altını en uygun fiyatlarla alın. 
              Güvenli ödeme, ücretsiz kargo ve 7/24 müşteri desteği.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group">
                Alışverişe Başla
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onCategoryClick('GRAM KÜLÇE ALTIN')}
                className="border-2 border-yellow-500 text-yellow-600 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-50 transition-colors"
              >
                Fiyatları İncele
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">₺50M+</div>
                <div className="text-sm text-gray-600">İşlem Hacmi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">%99.9</div>
                <div className="text-sm text-gray-600">Müşteri Memnuniyeti</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/128867/coins-currency-investment-insurance-128867.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Altın yatırımı"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute top-8 right-8 bg-white p-4 rounded-xl shadow-lg z-20">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Canlı Fiyat</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">₺5.362,77</div>
              <div className="text-sm text-gray-500">gram altın</div>
            </div>
            <div className="absolute bottom-8 left-8 bg-blue-600 text-white p-4 rounded-xl z-20">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Güvenli Alışveriş</span>
              </div>
              <div className="text-sm">SSL ile korumalı</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Banners */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">100% Güvenli</h3>
            <p className="text-gray-600 text-sm">SSL sertifikalı güvenli ödeme sistemi</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Güncel Fiyatlar</h3>
            <p className="text-gray-600 text-sm">Anlık güncellenen piyasa fiyatları</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Ücretsiz Kargo</h3>
            <p className="text-gray-600 text-sm">Tüm siparişlerde ücretsiz güvenli kargo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;