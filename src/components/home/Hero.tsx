import React, { useState, useEffect } from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const { config } = useClinicStore();

  const words = ['listening.', 'comfort.', 'honesty.', 'care.'];
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIdx === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
      timeout = setTimeout(() => {}, 350);
    } else {
      const speed = isDeleting ? 45 : 110;
      timeout = setTimeout(() => {
        setCharIdx((prev) => prev + (isDeleting ? -1 : 1));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, wordIdx]);

  return (
    <header className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#092a23] text-white">
      {/* Background Image with subtle zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-[20s] ease-in-out hover:scale-100"
        style={{ backgroundImage: "url('/assets/img/clinic-chair.jpg')" }}
        role="img"
        aria-label="Inside our Andheri West treatment room"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#092a23]/95 via-[#092a23]/80 to-[#092a23]/40" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <p className="text-amber-200 text-xs uppercase tracking-[0.22em] font-bold mb-4">
          Dental studio · Andheri West, Mumbai
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] max-w-2xl text-white">
          Dental care that starts with{' '}
          <span className="text-emerald-300 border-b-2 border-emerald-400">
            {words[wordIdx].slice(0, charIdx)}
          </span>
          <span className="inline-block w-0.5 h-10 bg-emerald-300 ml-1 translate-y-1 animate-pulse" />
        </h1>

        <p className="mt-6 text-[#e6efe9] text-lg sm:text-xl max-w-xl leading-relaxed">
          Two MDS specialists, honest diagnoses and prices we write down before we begin. Most patients walk in the same week they call.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <button
            onClick={onBookClick}
            className="btn-solid text-base py-3.5 px-8 shadow-xl"
          >
            Book an appointment <span className="text-lg">→</span>
          </button>
          <a
            href={`https://wa.me/${config.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-white border-white/40 hover:border-white hover:text-white text-base py-3.5 px-7"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Fact pills */}
        <div className="mt-14 pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl">
          <div className="border-l border-white/30 pl-4">
            <b className="font-serif text-2xl sm:text-3xl block text-white">4.9 ★</b>
            <span className="text-xs text-[#cfe0d8] tracking-wider uppercase">312 Google reviews</span>
          </div>
          <div className="border-l border-white/30 pl-4">
            <b className="font-serif text-2xl sm:text-3xl block text-white">18,000+</b>
            <span className="text-xs text-[#cfe0d8] tracking-wider uppercase">Smiles treated</span>
          </div>
          <div className="border-l border-white/30 pl-4 col-span-2 sm:col-span-1">
            <b className="font-serif text-2xl sm:text-3xl block text-white">Same week</b>
            <span className="text-xs text-[#cfe0d8] tracking-wider uppercase">Appointments, usually</span>
          </div>
        </div>
      </div>
    </header>
  );
};
