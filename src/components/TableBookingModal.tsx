import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { generateBookingWhatsAppUrl } from '../utils/cafeUtils';
import { X, Calendar, Clock, Users, PartyPopper, MessageCircle } from 'lucide-react';

export const TableBookingModal: React.FC = () => {
  const { isBookingOpen, setIsBookingOpen, lang } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2-4 Guests');
  const [occasion, setOccasion] = useState('Casual Hangout / Friends Meet');
  const [specialRequest, setSpecialRequest] = useState('');

  if (!isBookingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const url = generateBookingWhatsAppUrl({
      name,
      phone,
      date: date || 'Today',
      time: time || 'Evening',
      guests,
      occasion,
      specialRequest,
    });

    window.open(url, '_blank', 'noopener,noreferrer');
    setIsBookingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 text-[#3B2A1F] shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsBookingOpen(false)}
          className="absolute top-5 right-5 text-[#3B2A1F]/40 hover:text-[#3B2A1F] p-1.5 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center">
            <PartyPopper className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-[#3B2A1F]">
              {lang === 'hi' ? 'टेबल या बर्थडे पार्टी बुक करें' : 'Book a Table / Party'}
            </h3>
            <p className="text-xs text-[#3B2A1F]/60">
              Feeling Cafe, College Road, Gandai
            </p>
          </div>
        </div>

        <p className="text-xs text-[#3B2A1F]/70 mb-6 mt-3 leading-relaxed">
          {lang === 'hi'
            ? 'कॉलेज दोस्तों की पार्टी, बर्थडे सेलिब्रेशन या पारिवारिक गेट-टुगेदर के लिए टेबल आरक्षित करें। आपके अनुरोध पर विशेष सजावट व कॉम्बो उपलब्ध हैं।'
            : 'Reserve a comfortable spot for casual hangouts, birthday celebrations, or family get-togethers in Gandai.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3B2A1F] mb-1">
                {lang === 'hi' ? 'आपका नाम *' : 'Your Name *'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Patel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-xl px-3.5 py-2.5 text-sm text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3B2A1F] mb-1">
                {lang === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 97705 49943"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-xl px-3.5 py-2.5 text-sm text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3B2A1F] mb-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>{lang === 'hi' ? 'तारीख (Date)' : 'Preferred Date'}</span>
                </span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-xl px-3.5 py-2.5 text-sm text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3B2A1F] mb-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>{lang === 'hi' ? 'समय (Time)' : 'Preferred Time'}</span>
                </span>
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-xl px-3.5 py-2.5 text-sm text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3B2A1F] mb-1">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>{lang === 'hi' ? 'अतिथियों की संख्या' : 'Number of Guests'}</span>
                </span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-xl px-3.5 py-2.5 text-sm text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
              >
                <option value="1-2 Guests">1 - 2 Guests</option>
                <option value="3-5 Guests">3 - 5 Guests (Small Group)</option>
                <option value="6-10 Guests">6 - 10 Guests (Large Group)</option>
                <option value="10-20 Guests">10 - 20 Guests (Party / Celebration)</option>
                <option value="20+ Guests">20+ Guests (Full Hall Booking)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3B2A1F] mb-1">
                {lang === 'hi' ? 'अवसर (Occasion)' : 'Occasion'}
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-xl px-3.5 py-2.5 text-sm text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
              >
                <option value="Casual Hangout / Friends Meet">Casual Hangout</option>
                <option value="Birthday Party Celebration">Birthday Party</option>
                <option value="College Reunion / Farewell">College Reunion / Farewell</option>
                <option value="Family Dinner / Lunch">Family Lunch / Dinner</option>
                <option value="Anniversary Celebration">Anniversary</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3B2A1F] mb-1">
              {lang === 'hi' ? 'कोई विशेष व्यवस्था / केक / म्यूजिक?' : 'Special Arrangement / Cake / Music?'}
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Need birthday decoration, specific table corner..."
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-xl px-3.5 py-2 text-sm text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#16A34A]/30 transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>
                {lang === 'hi' ? 'व्हाट्सएप पर बुकिंग की पुष्टि करें' : 'Confirm Booking via WhatsApp'}
              </span>
            </button>
            <p className="text-[11px] text-center text-[#3B2A1F]/50 mt-2">
              Opens WhatsApp directly with +91 97705 49943 with all details pre-filled.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
