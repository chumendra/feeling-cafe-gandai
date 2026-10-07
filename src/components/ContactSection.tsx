import React from 'react';
import { useCart } from '../context/CartContext';
import { CAFE_INFO } from '../data/cafeData';
import { MapPin, Phone, MessageCircle, Navigation, ExternalLink, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { lang } = useCart();

  return (
    <section id="contact" className="py-20 bg-[#FAF7F2] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block text-xs uppercase tracking-wider font-semibold text-[#D97706] mb-2">
            {lang === 'hi' ? 'हमसे मिलें या संपर्क करें' : 'Find & Connect With Us'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#3B2A1F] tracking-tight mb-3">
            {lang === 'hi' ? 'लोकेशन और संपर्क' : 'Location & Contact'}
          </h2>
          <p className="text-sm sm:text-base text-[#3B2A1F]/70">
            {lang === 'hi'
              ? 'चौपाटी, कॉलेज रोड, ढाबा, गंडई में हमारे कैफे पर पधारें या सीधे कॉल व व्हाट्सएप करें।'
              : 'Visit us at Chaupati on College Road, Gandai or reach out via WhatsApp & Call.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#3B2A1F]/10 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold font-heading text-[#3B2A1F] mb-6 pb-3 border-b border-[#3B2A1F]/10">
                Feeling Cafe
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#3B2A1F]/10 text-[#D97706] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#3B2A1F]/60 uppercase tracking-wider mb-1">
                    {lang === 'hi' ? 'पता (Address)' : 'Address'}
                  </h4>
                  <p className="text-sm font-medium text-[#3B2A1F] leading-relaxed">
                    Chaupati, College Road,
                    <br />
                    Dhaba, Gandai,
                    <br />
                    Chhattisgarh 491888
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#3B2A1F]/10 text-[#D97706] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#3B2A1F]/60 uppercase tracking-wider mb-1">
                    {lang === 'hi' ? 'फोन नंबर (Call & WhatsApp)' : 'Phone Number'}
                  </h4>
                  <a
                    href={`tel:${CAFE_INFO.phone}`}
                    className="text-base font-bold text-[#3B2A1F] hover:text-[#D97706] transition-colors"
                  >
                    {CAFE_INFO.phone}
                  </a>
                  <p className="text-xs text-[#3B2A1F]/60 mt-0.5">Available for orders and table inquiries</p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-3.5 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#3B2A1F]/10 text-[#D97706] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#3B2A1F]/60 uppercase tracking-wider mb-1">
                    {lang === 'hi' ? 'समय (Timings)' : 'Timings'}
                  </h4>
                  <p className="text-sm font-medium text-[#3B2A1F]">
                    Mon - Sun: 10:30 AM – 10:30 PM
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">Open all 7 days</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-[#3B2A1F]/10">
              {/* WhatsApp Button */}
              <a
                href={CAFE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'hi' ? 'व्हाट्सएप पर चैट करें' : 'Chat on WhatsApp'}</span>
              </a>

              {/* Get Directions Button */}
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#3B2A1F] hover:bg-[#261B13] text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
              >
                <Navigation className="w-4 h-4 text-[#F5E6CA]" />
                <span>{lang === 'hi' ? 'रास्ता देखें (Get Directions)' : 'Get Directions'}</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-[#3B2A1F]/10 shadow-sm flex flex-col">
            <div className="p-4 bg-white border-b border-[#3B2A1F]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                <span className="text-xs font-semibold text-[#3B2A1F]">
                  Google Maps · College Road, Gandai, CG 491888
                </span>
              </div>
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#D97706] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 min-h-[360px] relative bg-stone-100">
              <iframe
                title="Feeling Cafe Gandai Map Location"
                src="https://maps.google.com/maps?q=Gandai,Chhattisgarh,491888&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
