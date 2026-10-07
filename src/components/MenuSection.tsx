import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { FULL_MENU, MENU_CATEGORIES, MenuItem } from '../data/cafeData';
import { Search, Plus, MessageCircle, Sparkles, Check } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { lang, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return FULL_MENU.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.nameHi.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#FAF7F2] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block text-xs uppercase tracking-wider font-semibold text-[#D97706] mb-2">
            {lang === 'hi' ? 'ताज़ा और स्वादिष्ट' : 'Freshly Prepared Fast Food & Drinks'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#3B2A1F] tracking-tight mb-3">
            {lang === 'hi' ? 'फीलिंग कैफे मेन्यू' : 'Feeling Cafe Digital Menu'}
          </h2>
          <p className="text-sm sm:text-base text-[#3B2A1F]/70">
            {lang === 'hi'
              ? 'गंडई के कॉलेज रोड पर सबसे किफायती और स्वादिष्ट पिज्जा, बर्गर, कोल्ड कॉफी और दक्षिण भारतीय व्यंजन।'
              : 'Explore our full student & family pocket-friendly menu with pure vegetarian goodness.'}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#3B2A1F]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'hi' ? 'मेन्यू सर्च करें (जैसे पिज्जा, कॉफी)...' : 'Search items (e.g. pizza, coffee)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#3B2A1F]/15 rounded-xl text-sm text-[#3B2A1F] placeholder:text-[#3B2A1F]/40 focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706] transition-all shadow-sm"
            />
          </div>

          {/* Quick Dietary Assurance */}
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
            <span className="w-3.5 h-3.5 border-2 border-emerald-600 flex items-center justify-center rounded-[2px] bg-white">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
            </span>
            <span>100% Pure Veg Kitchen · Hygienic & Fresh</span>
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#3B2A1F] text-[#F5E6CA] shadow-sm'
                      : 'bg-white text-[#3B2A1F]/80 hover:bg-[#3B2A1F]/10 border border-[#3B2A1F]/10'
                  }`}
                >
                  {lang === 'hi' ? cat.nameHi : cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#3B2A1F]/10 p-8">
            <p className="text-base text-[#3B2A1F]/70 mb-3">
              {lang === 'hi' ? 'कोई आइटम नहीं मिला।' : 'No menu items match your search.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#D97706] hover:underline"
            >
              Clear filters and view all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#3B2A1F]/10 p-5 hover:border-[#D97706]/40 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Title, Veg Dot, and Price */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-emerald-600 flex items-center justify-center rounded-[2px] shrink-0" title="100% Pure Veg">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                      </span>
                      <h3 className="text-base font-bold text-[#3B2A1F] font-heading group-hover:text-[#D97706] transition-colors">
                        {lang === 'hi' ? item.nameHi : item.name}
                      </h3>
                    </div>

                    <div className="text-base font-bold text-[#3B2A1F] tabular-nums shrink-0">
                      ₹{item.price}
                    </div>
                  </div>

                  {/* Badge tag if any */}
                  {item.badge && (
                    <div className="mb-2">
                      <span className="text-[11px] font-medium text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 rounded">
                        {lang === 'hi' ? item.badgeHi : item.badge}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-[#3B2A1F]/70 leading-relaxed mb-4">
                    {lang === 'hi' ? item.descriptionHi : item.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-[#3B2A1F]/5 flex items-center justify-between gap-2">
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
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#FAF7F2] hover:bg-[#D97706] text-[#3B2A1F] hover:text-white border border-[#3B2A1F]/10 hover:border-[#D97706] text-xs font-semibold rounded-lg transition-all active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'ट्रे में जोड़ें' : 'Add to Tray'}</span>
                  </button>

                  <a
                    href={`https://wa.me/919770549943?text=${encodeURIComponent(
                      `Namaste! I would like to order ${item.name} (₹${item.price}) at Feeling Cafe Gandai.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[#16A34A] hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-colors"
                    title="Order via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
