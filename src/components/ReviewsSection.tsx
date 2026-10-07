import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { INITIAL_REVIEWS, CustomerReview, CAFE_INFO } from '../data/cafeData';
import { Star, MessageSquarePlus, CheckCircle2, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { lang } = useCart();
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('feeling_cafe_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('feeling_cafe_reviews', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;

    const colors = ['bg-amber-600', 'bg-orange-600', 'bg-emerald-600', 'bg-rose-600', 'bg-indigo-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const entry: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newName,
      role: newRole || 'Local Visitor, Gandai',
      roleHi: newRole || 'स्थानीय आगंतुक, गंडई',
      rating: newRating,
      date: 'Just now',
      comment: newComment,
      commentHi: newComment,
      avatarColor: randomColor,
    };

    setReviews([entry, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setNewName('');
      setNewRole('');
      setNewComment('');
      setNewRating(5);
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 bg-[#FAF7F2] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Google Reviews summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-[#D97706]" />
              <span>{lang === 'hi' ? 'ग्राहकों का प्यार' : 'Google Verified Feedback'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#3B2A1F] tracking-tight">
              {lang === 'hi' ? 'ग्राहक समीक्षाएं' : 'Customer Reviews'}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#3B2A1F]">4.9 out of 5</span>
              <span className="text-xs text-[#3B2A1F]/60">· 240+ reviews on Google</span>
            </div>
          </div>

          {/* Action to add review */}
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#3B2A1F]/15 text-[#3B2A1F] hover:border-[#D97706] hover:text-[#D97706] text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#D97706]" />
            <span>{lang === 'hi' ? 'अपनी राय साझा करें' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-[#3B2A1F]/10 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#3B2A1F]/40">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#3B2A1F]/80 leading-relaxed mb-6 italic">
                  "{lang === 'hi' ? rev.commentHi : rev.comment}"
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#3B2A1F]/5">
                <div
                  className={`w-9 h-9 rounded-full ${rev.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-inner`}
                >
                  {rev.author.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-[#3B2A1F] truncate">{rev.author}</p>
                  <p className="text-[11px] text-[#3B2A1F]/60 truncate">
                    {lang === 'hi' ? rev.roleHi : rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-[#3B2A1F] shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#3B2A1F]/40 hover:text-[#3B2A1F] p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#16A34A] mx-auto animate-bounce" />
                <h3 className="text-lg font-bold font-heading">
                  {lang === 'hi' ? 'धन्यवाद! आपकी समीक्षा जोड़ दी गई है।' : 'Thank You! Your Review Is Live.'}
                </h3>
                <p className="text-xs text-[#3B2A1F]/70">
                  {lang === 'hi'
                    ? 'फीलिंग कैफे गंडई को प्यार देने के लिए आपका शुक्रिया।'
                    : 'We appreciate your valuable feedback for Feeling Cafe Gandai.'}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold font-heading mb-1 text-[#3B2A1F]">
                  {lang === 'hi' ? 'फीलिंग कैफे के लिए रिव्यू दें' : 'Review Feeling Cafe, Gandai'}
                </h3>
                <p className="text-xs text-[#3B2A1F]/60 mb-5">
                  Share your experience with food, coffee, atmosphere, or group outings.
                </p>

                <form onSubmit={handleSubmitReview} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[#3B2A1F]/80 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Rohit Sahu"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-lg px-3 py-2 text-sm text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3B2A1F]/80 mb-1">College / Location</label>
                    <input
                      type="text"
                      placeholder="e.g., College Student, Gandai"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-lg px-3 py-2 text-sm text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3B2A1F]/80 mb-1">Star Rating</label>
                    <div className="flex gap-2 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 focus:outline-none hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3B2A1F]/80 mb-1">Your Experience / Feedback</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the pizza, cold coffee, seating or service..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#3B2A1F]/15 rounded-lg px-3 py-2 text-sm text-[#3B2A1F] focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-lg shadow transition-colors"
                    >
                      Submit Review
                    </button>
                    <a
                      href={CAFE_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#3B2A1F] text-xs font-medium rounded-lg transition-colors flex items-center justify-center text-center"
                    >
                      Review on Google
                    </a>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
