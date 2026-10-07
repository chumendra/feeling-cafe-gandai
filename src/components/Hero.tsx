import React from 'react';
import { useCart } from '../context/CartContext';
import { CAFE_INFO } from '../data/cafeData';
import { getCafeLiveStatus } from '../utils/cafeUtils';
import { MessageCircle, UtensilsCrossed, MapPin, Clock, Star, Phone } from 'lucide-react';

export const Hero: React.FC = () => {
  const { lang, setIsBookingOpen } = useCart();
  const status = getCafeLiveStatus();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/feeling_cafe_hero_1791307845931.jpg"
          alt="Feeling Cafe Gandai cozy interior with warm amber lights"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Scrim: Multi-stop gradient for perfect text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#261B13] via-[#261B13]/85 to-[#261B13]/60 backdrop-blur-[1px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white">
        {/* Live Operating Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md mb-6 shadow-sm">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              status.isOpen ? 'bg-[#22c55e] animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            {lang === 'hi' ? status.messageHi : status.messageEn}
          </span>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="text-xs text-white/80 hidden sm:inline">College Road, Gandai</span>
        </div>

        {/* PRD Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-heading text-balance mb-4 leading-[1.1]">
          {lang === 'hi' ? 'फीलिंग कैफे में आपका स्वागत है' : 'Welcome to Feeling Cafe'}
        </h1>

        {/* PRD Subheading */}
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-[#F5E6CA] mb-6 tracking-wide max-w-3xl mx-auto font-sans">
          "{lang === 'hi' ? CAFE_INFO.taglineHi : CAFE_INFO.tagline}"
        </p>

        {/* Quiet Unboxed Metadata (Anti-Pill Discipline) */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-white/90 mb-10 max-w-2xl mx-auto">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#D97706]" />
            <span>Chaupati, College Road, Gandai</span>
          </span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>4.9 Google Rating (240+ Reviews)</span>
          </span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#D97706]" />
            <span>10:30 AM – 10:30 PM</span>
          </span>
        </div>

        {/* PRD Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* Explore Menu Button */}
          <a
            href="#menu"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-base rounded-xl shadow-lg shadow-[#D97706]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span>{lang === 'hi' ? 'मेन्यू देखें' : 'Explore Menu'}</span>
          </a>

          {/* WhatsApp Booking Button */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-base rounded-xl shadow-lg shadow-[#16A34A]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{lang === 'hi' ? 'व्हाट्सएप बुकिंग' : 'WhatsApp Booking'}</span>
          </button>
        </div>

        {/* Quick Contact Bar below buttons */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
          <a
            href={`tel:${CAFE_INFO.phone}`}
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Call: {CAFE_INFO.phone}</span>
          </a>
          <span className="hidden sm:inline text-white/20">|</span>
          <a
            href={CAFE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Get Directions on Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
};
