import React from 'react';
import { useCart } from '../context/CartContext';
import { OPERATING_HOURS, CAFE_INFO } from '../data/cafeData';
import { getCafeLiveStatus } from '../utils/cafeUtils';
import { Clock, Phone, MessageCircle } from 'lucide-react';

export const VisitingHours: React.FC = () => {
  const { lang, setIsBookingOpen } = useCart();
  const status = getCafeLiveStatus();

  // Find today's day string
  const now = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = daysOfWeek[now.getDay()];

  return (
    <section id="hours" className="py-20 bg-white border-y border-[#3B2A1F]/5 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Live Status */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'खुलने का समय' : 'Cafe Schedule'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#3B2A1F] tracking-tight mb-4">
              {lang === 'hi' ? 'विजिटिंग आवर्स' : 'Visiting Hours'}
            </h2>
            <p className="text-sm sm:text-base text-[#3B2A1F]/70 mb-6 leading-relaxed">
              {lang === 'hi'
                ? 'हम पूरे सप्ताह आपके स्वागत के लिए तैयार हैं। कॉलेज के लंच ब्रेक, शाम के हैंगआउट या फैमिली डिनर के लिए कभी भी पधारें।'
                : 'We are open 7 days a week for your college breaks, evening refreshments, and dinner get-togethers in Gandai.'}
            </p>

            {/* Live Status Card */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#3B2A1F]/10 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    status.isOpen ? 'bg-[#16A34A] animate-ping' : 'bg-amber-500'
                  }`}
                />
                <span className="text-sm font-bold text-[#3B2A1F]">
                  {lang === 'hi' ? status.messageHi : status.messageEn}
                </span>
              </div>
              <p className="text-xs text-[#3B2A1F]/60">
                {lang === 'hi'
                  ? `आज का समय: ${status.todayTiming}`
                  : `Today's Schedule: ${status.todayTiming}`}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-5 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                {lang === 'hi' ? 'टेबल बुक करें' : 'Reserve Table'}
              </button>
              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#3B2A1F]/15 hover:border-[#D97706] text-[#3B2A1F] text-xs font-semibold rounded-lg transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Call Ahead</span>
              </a>
            </div>
          </div>

          {/* Right Column: Weekly Schedule Table */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#3B2A1F]/10 shadow-sm">
              <h3 className="text-base font-bold text-[#3B2A1F] font-heading mb-4 pb-3 border-b border-[#3B2A1F]/10 flex items-center justify-between">
                <span>{lang === 'hi' ? 'साप्ताहिक समय सारिणी' : 'Weekly Timings'}</span>
                <span className="text-xs font-normal text-[#3B2A1F]/60">
                  Chaupati, College Road, Gandai
                </span>
              </h3>

              <div className="divide-y divide-[#3B2A1F]/5">
                {OPERATING_HOURS.map((slot) => {
                  const isToday = slot.day.toLowerCase() === currentDayName.toLowerCase();

                  return (
                    <div
                      key={slot.day}
                      className={`py-3.5 flex items-center justify-between transition-colors px-3 rounded-lg ${
                        isToday
                          ? 'bg-[#3B2A1F] text-white shadow-sm font-medium'
                          : 'text-[#3B2A1F] hover:bg-white/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {lang === 'hi' ? slot.dayHi : slot.day}
                        </span>
                        {isToday && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#D97706] text-white">
                            Today
                          </span>
                        )}
                      </div>

                      <div className="text-sm tabular-nums tracking-wide">
                        {slot.open} – {slot.close}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-[#3B2A1F]/10 flex items-center justify-between text-xs text-[#3B2A1F]/70">
                <span>Free parking & AC seating available</span>
                <a
                  href={CAFE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#16A34A] font-semibold hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Confirm over WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
