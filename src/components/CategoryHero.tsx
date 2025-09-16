import React from 'react';
import { Play } from 'lucide-react';

interface CategoryHeroProps {
  category: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const CategoryHero: React.FC<CategoryHeroProps> = ({ category, title, subtitle, backgroundImage }) => {
  return (
    <div className="relative bg-blue-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {title}
              </h1>
              <p className="text-xl text-blue-100">
                {subtitle}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Ürünleri İncele
              </button>
              <button className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span>Tanıtım Videosu</span>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-black/30 rounded-2xl p-8 backdrop-blur-sm">
              <img
                src="https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Gold bar in hand"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;