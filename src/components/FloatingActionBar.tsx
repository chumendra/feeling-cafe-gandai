import React from 'react';
import { useCart } from '../context/CartContext';
import { CAFE_INFO } from '../data/cafeData';
import { Phone, MessageCircle, ShoppingBag, Calendar, Check } from 'lucide-react';

export const FloatingActionBar: React.FC = () => {
  const { totalItems, setIsCartOpen, setIsBookingOpen, toastMessage, lang } = useCart();

  return (
    <>
      {/* Toast Notification when item added */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#3B2A1F] text-[#F5E6CA] px-4 py-2.5 rounded-xl shadow-xl border border-[#D97706]/40 flex items-center gap-2 text-xs font-semibold animate-slideIn">
          <Check className="w-4 h-4 text-[#16A34A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Slim Sticky Bottom Bar (Under 15% viewport height compliance) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#3B2A1F]/15 px-3 py-2 flex items-center justify-between gap-2 shadow-lg">
        {/* Call button */}
        <a
          href={`tel:${CAFE_INFO.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#FAF7F2] text-[#3B2A1F] border border-[#3B2A1F]/10 text-xs font-semibold"
        >
          <Phone className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Call</span>
        </a>

        {/* WhatsApp Chat button */}
        <a
          href={CAFE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#16A34A] text-white text-xs font-semibold"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        {/* Order Tray / Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 relative flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#D97706] text-white text-xs font-semibold"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{lang === 'hi' ? 'ट्रे' : 'Tray'}</span>
          {totalItems > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#3B2A1F] text-white text-[10px] font-bold flex items-center justify-center ml-0.5">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Floating WhatsApp Button */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#3B2A1F] hover:bg-[#261B13] text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          title="Book Table / Party"
        >
          <Calendar className="w-4 h-4 text-[#D97706]" />
          <span>{lang === 'hi' ? 'टेबल बुक करें' : 'Book Table'}</span>
        </button>

        <a
          href={CAFE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Chat</span>
        </a>
      </div>
    </>
  );
};
