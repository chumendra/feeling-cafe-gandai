import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CAFE_INFO } from '../data/cafeData';
import { Phone, MessageCircle, ShoppingBag, Menu, X, Calendar, Globe } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen, setIsBookingOpen, lang, setLang } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#menu', label: lang === 'hi' ? 'मेन्यू' : 'Menu' },
    { href: '#specials', label: lang === 'hi' ? 'स्पेशल्स' : 'Specials' },
    { href: '#combos', label: lang === 'hi' ? 'कॉम्बो ऑफर्स' : 'Offers' },
    { href: '#about', label: lang === 'hi' ? 'हमारे बारे में' : 'About' },
    { href: '#gallery', label: lang === 'hi' ? 'गैलरी' : 'Gallery' },
    { href: '#reviews', label: lang === 'hi' ? 'रिव्यूज' : 'Reviews' },
    { href: '#hours', label: lang === 'hi' ? 'टाइमिंग' : 'Hours' },
    { href: '#contact', label: lang === 'hi' ? 'संपर्क' : 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#3B2A1F]/10 py-3'
          : 'bg-[#FAF7F2] border-b border-[#3B2A1F]/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-[#3B2A1F] hover:text-[#D97706] transition-colors font-heading"
          >
            <span className="w-9 h-9 rounded-lg bg-[#3B2A1F] text-[#F5E6CA] flex items-center justify-center font-extrabold text-lg shadow-sm">
              F
            </span>
            <span>Feeling Cafe</span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#3B2A1F]/80">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#D97706] transition-colors py-1 relative hover:underline underline-offset-4 decoration-[#D97706]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#3B2A1F] bg-[#3B2A1F]/5 hover:bg-[#3B2A1F]/10 rounded-md transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{lang === 'en' ? 'हिंदी' : 'ENG'}</span>
            </button>

            {/* Quick Call */}
            <a
              href={`tel:${CAFE_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#3B2A1F] hover:text-[#D97706] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{CAFE_INFO.phone}</span>
            </a>

            {/* Table / Party Booking */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#3B2A1F] border border-[#3B2A1F]/20 rounded-lg hover:border-[#D97706] hover:text-[#D97706] transition-colors whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'टेबल बुक करें' : 'Book Table'}</span>
            </button>

            {/* WhatsApp Tray / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#D97706] hover:bg-[#B45309] rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'ट्रे' : 'Order Tray'}</span>
              {totalItems > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#3B2A1F] text-white text-[11px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#3B2A1F] hover:text-[#D97706] lg:hidden rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#3B2A1F]/10 pb-4 space-y-2 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-[#3B2A1F] hover:bg-[#3B2A1F]/5"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 flex flex-col gap-2 border-t border-[#3B2A1F]/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBookingOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-[#3B2A1F] border border-[#3B2A1F]/20 rounded-lg hover:bg-white"
              >
                <Calendar className="w-4 h-4 text-[#D97706]" />
                <span>{lang === 'hi' ? 'टेबल या पार्टी बुक करें' : 'Book Table / Party'}</span>
              </button>

              <div className="flex gap-2">
                <a
                  href={`tel:${CAFE_INFO.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#3B2A1F] bg-white border border-[#3B2A1F]/10 rounded-lg"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Call Us</span>
                </a>
                <a
                  href={CAFE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-white bg-[#16A34A] rounded-lg"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
