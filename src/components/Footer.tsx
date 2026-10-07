import React from 'react';
import { useCart } from '../context/CartContext';
import { CAFE_INFO } from '../data/cafeData';
import { MapPin, Phone, MessageCircle, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, setIsBookingOpen, setIsCartOpen } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#261B13] text-stone-300 pt-16 pb-24 lg:pb-12 border-t border-[#3B2A1F]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-lg bg-[#D97706] text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                F
              </span>
              <span className="text-2xl font-bold font-heading text-white tracking-tight">
                Feeling Cafe
              </span>
            </div>

            <p className="text-xs text-[#F5E6CA] font-medium tracking-wide">
              "{lang === 'hi' ? CAFE_INFO.taglineHi : CAFE_INFO.tagline}"
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {lang === 'hi'
                ? 'कॉलेज रोड, गंडई में दोस्तों, परिवारों और छात्रों का सबसे लोकप्रिय हैंगआउट डेस्टिनेशन। स्वादिष्ट पिज्जा, किटकैट कोल्ड कॉफी और फ्रेश स्नैक्स।'
                : 'Gandai’s premier cafe & hangout spot on College Road. Serving fresh artisan pizza, thick KitKat cold coffee, crispy burgers and refreshing mojitos.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={CAFE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#16A34A] text-white flex items-center justify-center hover:bg-[#15803D] transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="w-9 h-9 rounded-lg bg-[#D97706] text-white flex items-center justify-center hover:bg-[#B45309] transition-colors"
                title="Call"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 text-stone-300 flex items-center justify-center hover:text-white transition-colors"
                title="Google Maps"
              >
                <MapPin className="w-4 h-4 text-[#D97706]" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              {lang === 'hi' ? 'नेविगेशन' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-[#D97706] transition-colors">
                  {lang === 'hi' ? 'डिजिटल मेन्यू' : 'Digital Menu'}
                </a>
              </li>
              <li>
                <a href="#specials" className="hover:text-[#D97706] transition-colors">
                  {lang === 'hi' ? 'सिग्नेचर स्पेशल्स' : 'Signature Specials'}
                </a>
              </li>
              <li>
                <a href="#combos" className="hover:text-[#D97706] transition-colors">
                  {lang === 'hi' ? 'टुडेज कॉम्बो ऑफर्स' : "Today's Special Combos"}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#D97706] transition-colors">
                  {lang === 'hi' ? 'फोटो गैलरी' : 'Photo Gallery'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#D97706] transition-colors">
                  {lang === 'hi' ? 'गूगल कस्टमर रिव्यूज' : 'Google Reviews'}
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="hover:text-[#D97706] transition-colors text-left"
                >
                  {lang === 'hi' ? 'टेबल / पार्टी रिजर्वेशन' : 'Table & Party Booking'}
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              {lang === 'hi' ? 'स्थान व संपर्क' : 'Location & Phone'}
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <span>
                  Chaupati, College Road, Dhaba, Gandai, Chhattisgarh 491888
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D97706] shrink-0" />
                <a href={`tel:${CAFE_INFO.phone}`} className="hover:text-white">
                  {CAFE_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>WhatsApp Orders Supported</span>
              </p>
            </div>
          </div>

          {/* Hours (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              {lang === 'hi' ? 'दैनिक समय' : 'Opening Hours'}
            </h4>
            <div className="text-xs text-stone-400 space-y-1">
              <p className="font-semibold text-white">Mon: 10:00 AM - 10:30 PM</p>
              <p>Tue - Sat: 10:30 AM - 10:30 PM</p>
              <p className="font-semibold text-white">Sun: 10:00 AM - 10:30 PM</p>
              <p className="text-[#16A34A] font-medium pt-1">Open All 7 Days</p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Feeling Cafe, Gandai. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-stone-400">
              Chaupati · College Road · Gandai · CG 491888
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
