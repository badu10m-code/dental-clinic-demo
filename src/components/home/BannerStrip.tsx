import React, { useState, useEffect } from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';

interface BannerStripProps {
  onBannerAction: (link: string) => void;
}

export const BannerStrip: React.FC<BannerStripProps> = ({ onBannerAction }) => {
  const { banners } = useClinicStore();
  const activeBanners = banners.filter((b) => b.active);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 4800);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (!activeBanners.length) return null;

  const currentBanner = activeBanners[currentIndex] || activeBanners[0];

  const getBannerStyle = () => {
    if (currentBanner.type === 'image' && currentBanner.img) {
      return {
        backgroundImage: `linear-gradient(90deg, rgba(9,56,46,0.92), rgba(9,56,46,0.5)), url(${currentBanner.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    if (currentBanner.template === 'festival') {
      return {
        background: 'linear-gradient(100deg, #7a3b1f, #c96f4a)',
      };
    }
    return {
      background: 'linear-gradient(100deg, #09382e, #0e5c4a)',
    };
  };

  return (
    <section className="py-6 px-6 bg-[#f7f3ec]">
      <div className="max-w-6xl mx-auto">
        <div
          style={getBannerStyle()}
          className="rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-500"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                Special announcement
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-tight text-white">
              {currentBanner.title}
            </h3>
            {currentBanner.sub && (
              <p className="text-sm text-emerald-100/90 mt-1">{currentBanner.sub}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onBannerAction(currentBanner.link || 'contact')}
              className="bg-white text-[#09382e] hover:bg-[#f7f3ec] font-semibold text-sm px-6 py-2.5 rounded-full shadow transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              {currentBanner.cta || 'Book now'} →
            </button>
          </div>
        </div>

        {/* Carousel indicators if more than 1 banner */}
        {activeBanners.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-3">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-6 bg-[#0e5c4a]' : 'w-2 bg-[#1c2b26]/20'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
