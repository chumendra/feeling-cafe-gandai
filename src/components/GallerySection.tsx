import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { GALLERY_ITEMS } from '../data/cafeData';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { lang } = useCart();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white border-y border-[#3B2A1F]/5 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'कैफे की झलक' : 'Visual Experience'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#3B2A1F] tracking-tight mb-3">
            {lang === 'hi' ? 'फीलिंग कैफे गैलरी' : 'Feeling Cafe Gallery'}
          </h2>
          <p className="text-sm sm:text-base text-[#3B2A1F]/70">
            {lang === 'hi'
              ? 'कैफे का खूबसूरत इंटीरियर, लजीज पिज्जा, बर्गर, कॉफी और दोस्तों के साथ खास पल।'
              : 'Glimpses of our vibrant space, sizzle from our kitchen, and happy customer memories in Gandai.'}
          </p>
        </div>

        {/* 3-Column Responsive Grid as required in PRD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden border border-[#3B2A1F]/10 cursor-pointer aspect-[4/3] bg-stone-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold font-heading mb-1 text-[#F5E6CA]">
                      {lang === 'hi' ? item.titleHi : item.title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2">
                      {lang === 'hi' ? item.captionHi : item.caption}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 ml-3">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={GALLERY_ITEMS[selectedPhotoIndex].image}
              alt={GALLERY_ITEMS[selectedPhotoIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
            <div className="text-center mt-4 text-white max-w-xl">
              <h3 className="text-lg font-bold font-heading text-[#F5E6CA]">
                {lang === 'hi'
                  ? GALLERY_ITEMS[selectedPhotoIndex].titleHi
                  : GALLERY_ITEMS[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                {lang === 'hi'
                  ? GALLERY_ITEMS[selectedPhotoIndex].captionHi
                  : GALLERY_ITEMS[selectedPhotoIndex].caption}
              </p>
              <p className="text-[11px] text-stone-500 mt-2">
                Photo {selectedPhotoIndex + 1} of {GALLERY_ITEMS.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
