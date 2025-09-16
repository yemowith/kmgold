import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Bültenimize Katılın
              </h3>
              <p className="text-blue-100">
                Haberler ve güncellemeler almak için e-posta adresinizi kaydedin
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="px-4 py-2 rounded-lg text-gray-900 flex-1 md:w-64"
              />
              <button className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                Gönder
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">
                KM<span className="text-yellow-500">GOLD</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-4">
              Yenibosna Merkez Mah. Kuyumcukent Sok. Kuyumcukent No:4 İç
              Kapı:Z131 Bahçelievler - İstanbul
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Vergi No: 0000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Sicil no: 00000</span>
              </div>
            </div>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">KURUMSAL</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Belgeler
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  KVK
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Kullanma Merry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Yorumlar
                </a>
              </li>
            </ul>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">KATEGORİLER</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Gram Külçe Altın
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Gram Külçe Gümüş
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Ziynet Altın
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hesaplı Altın Havale
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hesaptan Fırlar Altına
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Düzenli Birikim
                </a>
              </li>
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div>
            <h3 className="text-lg font-semibold mb-4">MÜŞTERİ HİZMETLERİ</h3>
            <div className="space-y-3 text-gray-400">
              <div>
                <p className="font-medium text-white">Online Merkez</p>
                <p>☎ 242 527 94 99</p>
              </div>
              <div>
                <p>musterihizmetleri@kmgold.com</p>
              </div>
              <div>
                <p className="font-medium text-white">Çalışma Saatleri</p>
                <p>Hafta İçi 09:00-18:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Payment */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Bizi Takip Edin:</span>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Güvenli Ödeme:</span>
              <div className="flex gap-1">
                {["VISA", "MC", "AE", "DK", "MP", "AP"].map((card) => (
                  <div
                    key={card}
                    className="bg-white text-gray-900 text-xs px-2 py-1 rounded"
                  >
                    {card}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-center text-gray-400 text-sm">
            © Copyright - Tüm hakları saklıdır KM Gold Goldbar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
