import React from 'react';
import { useCart } from '../context/CartContext';
import { GraduationCap, Users, UsersRound, Armchair, Car, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { lang, setIsBookingOpen } = useCart();

  const highlights = [
    {
      icon: GraduationCap,
      title: lang === 'hi' ? 'स्टूडेंट फ्रेंडली' : 'Student Friendly',
      desc:
        lang === 'hi'
          ? 'कॉलेज छात्रों के लिए बजट फ्रेंडली मेन्यू, वाईफाई और आरामदायक स्टडी व हैंगआउट कॉर्नर।'
          : 'Budget-friendly combos, study-friendly environment, and chill hangout corners for college students.',
    },
    {
      icon: Users,
      title: lang === 'hi' ? 'फैमिली फ्रेंडली' : 'Family Friendly',
      desc:
        lang === 'hi'
          ? 'सुरक्षित, स्वच्छ और परिवारों के लिए पूरी तरह सभ्य और स्वागतपूर्ण माहौल।'
          : 'Clean, hygienic, safe and welcoming dining space designed for relaxed family outings.',
    },
    {
      icon: UsersRound,
      title: lang === 'hi' ? 'बड़े ग्रुप्स का स्वागत' : 'Large Groups Welcome',
      desc:
        lang === 'hi'
          ? 'दोस्तों के ग्रुप और कॉलेज गैंग के लिए पर्याप्त सिटिंग और कंबाइंड टेबल व्यवस्था।'
          : 'Spacious seating capacity for friend circles, reunion squads, and celebrations.',
    },
    {
      icon: Armchair,
      title: lang === 'hi' ? 'आरामदायक सिटिंग' : 'Comfortable Seating',
      desc:
        lang === 'hi'
          ? 'खूबसूरत इंटीरियर, एम्बिएंट लाइटिंग और धीमी मधुर संगीत के साथ सुकून भरा अनुभव।'
          : 'Pleasing cafe aesthetic, warm mood lighting, cozy chairs, and soft relaxing music.',
    },
    {
      icon: Car,
      title: lang === 'hi' ? 'फ्री पार्किंग' : 'Free Parking',
      desc:
        lang === 'hi'
          ? 'चौपाटी, कॉलेज रोड पर दोपहिया और चार पहिया वाहनों के लिए खुली और निःशुल्क पार्किंग।'
          : 'Ample open and safe parking for two-wheelers and cars right outside on College Road.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white border-y border-[#3B2A1F]/5 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Composition with Featured Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#3B2A1F]/10 group">
              <img
                src="/src/assets/images/feeling_cafe_hero_1791307845931.jpg"
                alt="Feeling Cafe Gandai Interior on College Road"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2A1F]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs uppercase tracking-wider text-[#F5E6CA] font-semibold mb-1">
                  Chaupati, College Road, Gandai
                </p>
                <h3 className="text-lg font-bold font-heading">
                  The Go-To Hangout Spot in Gandai
                </h3>
              </div>
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -bottom-6 -right-4 sm:right-4 bg-[#FAF7F2] border border-[#3B2A1F]/15 p-4 rounded-xl shadow-lg max-w-[240px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D97706]/15 text-[#D97706] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#3B2A1F]/70 font-medium">Loved By</p>
                  <p className="text-sm font-bold text-[#3B2A1F]">College Youth & Families</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & PRD Highlights */}
          <div className="lg:col-span-7">
            <div className="inline-block text-xs uppercase tracking-wider font-semibold text-[#D97706] mb-2">
              {lang === 'hi' ? 'हमारे बारे में' : 'About Feeling Cafe'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#3B2A1F] tracking-tight mb-6 leading-tight">
              {lang === 'hi'
                ? 'कॉलेज रोड, गंडई का सबसे पसंदीदा कैफे व रेस्टोरेंट'
                : 'The Heart of Good Food & Great Conversations in Gandai'}
            </h2>

            {/* Official PRD Content paragraph */}
            <p className="text-[#3B2A1F]/80 text-base sm:text-lg leading-relaxed mb-8">
              {lang === 'hi'
                ? 'फीलिंग कैफे कॉलेज रोड, गंडई में स्थित एक स्टूडेंट-फ्रेंडली और फैमिली-फ्रेंडली कैफे है। अपने स्वादिष्ट फास्ट फूड, ताज़ा पेय पदार्थों और सुकून भरे माहौल के लिए जाना जाने वाला यह कैफे दोस्तों, परिवारों और फूडीज के लिए सबसे बेहतरीन ठिकाना है।'
                : 'Feeling Cafe is a student-friendly and family-friendly cafe located on College Road, Gandai. Known for its delicious fast food, refreshing beverages, and relaxed atmosphere, the cafe is the perfect destination for friends, families, and food lovers.'}
            </p>

            {/* PRD Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 mb-8">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FAF7F2] border border-[#3B2A1F]/5 hover:border-[#D97706]/30 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#3B2A1F]/10 text-[#D97706] flex items-center justify-center shrink-0 group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#3B2A1F] mb-1">{item.title}</h4>
                        <p className="text-xs text-[#3B2A1F]/70 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reserve or Visit Action */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-6 py-2.5 bg-[#3B2A1F] hover:bg-[#261B13] text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
              >
                {lang === 'hi' ? 'बर्थडे / पार्टी टेबल बुक करें' : 'Reserve a Table or Party'}
              </button>
              <a
                href="#menu"
                className="text-sm font-semibold text-[#D97706] hover:text-[#B45309] hover:underline underline-offset-4"
              >
                {lang === 'hi' ? 'हमारा मेन्यू देखें →' : 'Browse Full Menu →'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
