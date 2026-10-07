import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { SPECIAL_COMBOS, ComboOffer } from '../data/cafeData';
import { generateComboWhatsAppUrl } from '../utils/cafeUtils';
import { Sparkles, MessageCircle, Plus, Check, Tag, Settings, X } from 'lucide-react';

export const CombosSection: React.FC = () => {
  const { lang, addToCart } = useCart();
  const [combos, setCombos] = useState<ComboOffer[]>(() => {
    try {
      const stored = localStorage.getItem('feeling_cafe_combos');
      return stored ? JSON.parse(stored) : SPECIAL_COMBOS;
    } catch {
      return SPECIAL_COMBOS;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newItems, setNewItems] = useState('');
  const [newOriginal, setNewOriginal] = useState('');
  const [newOffer, setNewOffer] = useState('');
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('feeling_cafe_combos', JSON.stringify(combos));
    } catch {
      // ignore
    }
  }, [combos]);

  const handleAddCombo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newOffer) return;

    const orig = Number(newOriginal) || Number(newOffer);
    const off = Number(newOffer);
    const itemArr = newItems.split(',').map((s) => s.trim()).filter(Boolean);

    const newEntry: ComboOffer = {
      id: `custom-cmb-${Date.now()}`,
      title: newTitle,
      titleHi: newTitle,
      items: itemArr.length > 0 ? itemArr : ['Chef Special Dish', 'Chilled Drink'],
      itemsHi: itemArr.length > 0 ? itemArr : ['शेफ स्पेशल डिश', 'चिल्ड ड्रिंक'],
      originalPrice: orig,
      offerPrice: off,
      savings: orig > off ? orig - off : 0,
      image: '/src/assets/images/feeling_cafe_hero_1791307845931.jpg',
      tag: newTag || 'Daily Special',
      tagHi: newTag || 'आज का ऑफर',
    };

    setCombos([newEntry, ...combos]);
    setNewTitle('');
    setNewItems('');
    setNewOriginal('');
    setNewOffer('');
    setNewTag('');
    setIsAdminOpen(false);
  };

  const resetCombos = () => {
    setCombos(SPECIAL_COMBOS);
    setIsAdminOpen(false);
  };

  return (
    <section id="combos" className="py-20 bg-stone-900 text-white scroll-mt-16 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-900 to-stone-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] uppercase tracking-wider mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'विशेष बचत कॉम्बो' : 'Value Saver Packs'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              {lang === 'hi' ? "आज के स्पेशल कॉम्बो" : "Today's Special Combos"}
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-xl">
              {lang === 'hi'
                ? 'कॉलेज दोस्तों और परिवारों के लिए खास छूट के साथ तैयार किए गए हमारे सुपरहिट कॉम्बो।'
                : 'Curated fast-food duos & party bundles with guaranteed extra savings!'}
            </p>
          </div>

          {/* Admin toggle for updating offers */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
              title="Cafe Owner: Update / Add Combo Offers"
            >
              <Settings className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{lang === 'hi' ? 'ऑफर अपडेट करें' : 'Update Offers'}</span>
            </button>
          </div>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {combos.map((combo) => {
            const waUrl = generateComboWhatsAppUrl(combo.title, combo.offerPrice);

            return (
              <div
                key={combo.id}
                className="bg-stone-800/80 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D97706]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  {/* Visual Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                    <img
                      src={combo.image}
                      alt={combo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                    
                    {/* Badge tag */}
                    <div className="absolute top-3 left-3 bg-[#D97706] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md">
                      {lang === 'hi' ? combo.tagHi : combo.tag}
                    </div>

                    {/* Savings tag */}
                    {combo.savings > 0 && (
                      <div className="absolute bottom-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                        Save ₹{combo.savings}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-[#D97706] transition-colors">
                      {lang === 'hi' ? combo.titleHi : combo.title}
                    </h3>

                    {/* Items checklist */}
                    <ul className="space-y-1.5 mb-5 text-xs text-stone-300">
                      {(lang === 'hi' ? combo.itemsHi : combo.items).map((it, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer price & actions */}
                <div className="p-5 pt-0">
                  <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-white/10">
                    <span className="text-xs text-stone-400">Offer Price</span>
                    <div className="flex items-baseline gap-2">
                      {combo.originalPrice > combo.offerPrice && (
                        <span className="text-xs text-stone-400 line-through tabular-nums">
                          ₹{combo.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-black text-amber-400 tabular-nums">
                        ₹{combo.offerPrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        addToCart({
                          id: combo.id,
                          name: combo.title,
                          nameHi: combo.titleHi,
                          price: combo.offerPrice,
                          image: combo.image,
                        })
                      }
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-stone-700 hover:bg-stone-600 text-white text-xs font-semibold rounded-xl transition-colors active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'ट्रे में जोड़ें' : 'Add to Tray'}</span>
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
                      title="Direct WhatsApp Order"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Admin Offer Modal */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-[#D97706]" />
              <h3 className="text-lg font-bold font-heading">
                {lang === 'hi' ? 'कैफे एडमिन: नया कॉम्बो ऑफर जोड़ें' : 'Cafe Dashboard: Add New Combo'}
              </h3>
            </div>

            <p className="text-xs text-stone-400 mb-5">
              Update today's special offers easily. Any added offers will immediately reflect for all visitors.
            </p>

            <form onSubmit={handleAddCombo} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Combo Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Pizza + Cold Coffee Special"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D97706]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Included Items (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g., 1x Golden Corn Pizza, 1x KitKat Cold Coffee"
                  value={newItems}
                  onChange={(e) => setNewItems(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D97706]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Regular Price (₹)</label>
                  <input
                    type="number"
                    placeholder="250"
                    value={newOriginal}
                    onChange={(e) => setNewOriginal(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D97706]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Offer Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="199"
                    value={newOffer}
                    onChange={(e) => setNewOffer(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D97706]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Tag / Promo Label</label>
                <input
                  type="text"
                  placeholder="e.g., Today's Bestseller"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D97706]"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-lg shadow transition-colors"
                >
                  Publish New Combo
                </button>
                <button
                  type="button"
                  onClick={resetCombos}
                  className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium rounded-lg transition-colors"
                >
                  Reset Defaults
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
