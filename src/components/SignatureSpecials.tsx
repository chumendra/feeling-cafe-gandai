import React from 'react';
import { useCart } from '../context/CartContext';
import { SIGNATURE_SPECIALS } from '../data/cafeData';
import { Plus, MessageCircle, Sparkles } from 'lucide-react';

export const SignatureSpecials: React.FC = () => {
  const { lang, addToCart } = useCart();

  return (
    <section id="specials" className="py-20 bg-[#FAF7F2] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'कैफे की खास पहचान' : 'Handcrafted Masterpieces'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#3B2A1F] tracking-tight mb-3">
            {lang === 'hi' ? 'सिग्नेचर स्पेशल्स' : 'Signature Specials'}
          </h2>
          <p className="text-sm sm:text-base text-[#3B2A1F]/70">
            {lang === 'hi'
              ? 'गंडई के कॉलेज छात्रों और परिवारों द्वारा सबसे ज्यादा पसंद किए जाने वाले खास आइटम्स'
              : 'Our most ordered items that define the Feeling Cafe experience in Gandai.'}
          </p>
        </div>

        {/* Specials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIGNATURE_SPECIALS.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#3B2A1F]/10 hover:shadow-xl hover:border-[#D97706]/40 transition-all duration-300 flex flex-col group"
              >
                {/* Visual Image container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  
                  {/* Subtle Top Indicator (Anti-slop clean metadata) */}
                  <div className="absolute top-3 left-3 bg-[#3B2A1F]/90 backdrop-blur-sm text-[#F5E6CA] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
                    {lang === 'hi' ? item.badgeHi : item.badge}
                  </div>

                  {/* Veg indicator dot */}
                  <div className="absolute top-3 right-3 bg-white/95 p-1 rounded-md shadow-sm" title="100% Pure Veg">
                    <span className="w-3.5 h-3.5 border-2 border-emerald-600 flex items-center justify-center rounded-[2px]">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <h3 className="text-base font-bold text-[#3B2A1F] font-heading group-hover:text-[#D97706] transition-colors">
                        {lang === 'hi' ? item.nameHi : item.name}
                      </h3>
                      <span className="text-lg font-bold text-[#3B2A1F] tabular-nums shrink-0">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#3B2A1F]/70 leading-relaxed mb-4 line-clamp-2">
                      {lang === 'hi' ? item.descriptionHi : item.description}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-[#3B2A1F]/5 flex items-center gap-2">
                    <button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          nameHi: item.nameHi,
                          price: item.price,
                          image: item.image,
                        })
                      }
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'ट्रे में जोड़ें' : 'Add to Tray'}</span>
                    </button>

                    <a
                      href={`https://wa.me/919770549943?text=${encodeURIComponent(
                        `Namaste! I would like to order ${item.name} (₹${item.price}) from Feeling Cafe Gandai.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#16A34A] hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-colors shrink-0"
                      title="Quick WhatsApp Order"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
