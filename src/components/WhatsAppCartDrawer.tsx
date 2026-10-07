import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CAFE_INFO } from '../data/cafeData';
import { generateWhatsAppOrderUrl } from '../utils/cafeUtils';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, Utensils, PackageCheck } from 'lucide-react';

export const WhatsAppCartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems, isCartOpen, setIsCartOpen, lang } = useCart();
  
  const [orderType, setOrderType] = useState<'dine_in' | 'takeaway'>('dine_in');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerNote, setCustomerNote] = useState('');

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const url = generateWhatsAppOrderUrl(
      cart.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
      orderType,
      tableNumber,
      customerName,
      customerNote
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#3B2A1F]/10 flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#D97706]/15 text-[#D97706] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#3B2A1F] font-heading">
                  {lang === 'hi' ? 'आपकी ऑर्डर ट्रे' : 'Your Order Tray'}
                </h3>
                <p className="text-xs text-[#3B2A1F]/60">
                  {totalItems} {lang === 'hi' ? 'आइटम' : 'items'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Clear Tray"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-[#3B2A1F]/60 hover:text-[#3B2A1F] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-[#3B2A1F]/60 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium">
                  {lang === 'hi' ? 'आपकी ट्रे खाली है।' : 'Your tray is empty.'}
                </p>
                <p className="text-xs text-[#3B2A1F]/40 max-w-xs mx-auto">
                  {lang === 'hi'
                    ? 'मेन्यू या कॉम्बो से अपने मनपसंद आइटम्स चुनें।'
                    : 'Explore our delicious pizza, burgers, cold coffee and combos to add items.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#3B2A1F]/5"
                  >
                    <div className="flex-1 pr-3">
                      <h4 className="text-sm font-bold text-[#3B2A1F] leading-snug">
                        {lang === 'hi' ? item.nameHi : item.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#D97706] tabular-nums mt-0.5">
                        ₹{item.price} each
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#3B2A1F]/15 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 hover:bg-stone-100 text-[#3B2A1F] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#3B2A1F] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 hover:bg-stone-100 text-[#3B2A1F] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#3B2A1F] tabular-nums w-12 text-right">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Dining Preference */}
                <div className="mt-6 pt-5 border-t border-[#3B2A1F]/10 space-y-3">
                  <label className="block text-xs font-bold text-[#3B2A1F] uppercase tracking-wider">
                    {lang === 'hi' ? 'ऑर्डर का प्रकार' : 'Dining Option'}
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('dine_in')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                        orderType === 'dine_in'
                          ? 'bg-[#3B2A1F] text-white border-[#3B2A1F]'
                          : 'bg-white text-[#3B2A1F] border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'डाइन-इन (बैठकर)' : 'Dine-In'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                        orderType === 'takeaway'
                          ? 'bg-[#3B2A1F] text-white border-[#3B2A1F]'
                          : 'bg-white text-[#3B2A1F] border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <PackageCheck className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'पार्सल (Takeaway)' : 'Takeaway'}</span>
                    </button>
                  </div>

                  {orderType === 'dine_in' && (
                    <div>
                      <label className="block text-[11px] font-medium text-[#3B2A1F]/70 mb-1">
                        {lang === 'hi' ? 'टेबल नंबर (यदि बैठे हैं)' : 'Table Number (if seated)'}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Table 4"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-lg px-3 py-1.5 text-xs text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-medium text-[#3B2A1F]/70 mb-1">
                      {lang === 'hi' ? 'आपका नाम' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rohan"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-lg px-3 py-1.5 text-xs text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#3B2A1F]/70 mb-1">
                      {lang === 'hi' ? 'विशेष निर्देश (वैकल्पिक)' : 'Special Instructions (optional)'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Extra spicy, less sugar in coffee..."
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-lg px-3 py-1.5 text-xs text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer & WhatsApp Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#3B2A1F]/10 bg-[#FAF7F2] space-y-3">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-[#3B2A1F]/70">
                  {lang === 'hi' ? 'कुल राशि (Subtotal)' : 'Total Amount'}
                </span>
                <span className="text-2xl font-black text-[#3B2A1F] tabular-nums">
                  ₹{totalPrice}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#16A34A]/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>
                  {lang === 'hi' ? 'व्हाट्सएप पर ऑर्डर भेजें' : 'Send Order to WhatsApp'}
                </span>
              </button>

              <p className="text-[11px] text-center text-[#3B2A1F]/50">
                Directly sends this order to +91 97705 49943 for instant kitchen preparation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
