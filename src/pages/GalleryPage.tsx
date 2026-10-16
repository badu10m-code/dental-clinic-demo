import React, { useState } from 'react';

interface GalleryPageProps {
  onNavigate: (page: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: '/assets/img/reception.jpg', title: 'Reception Desk', desc: 'Welcoming front desk & waiting lounge', col: 'col-span-12 md:col-span-6' },
    { src: '/assets/img/operatory.jpg', title: 'Main Operatory', desc: 'Ergonomic treatment suite with natural daylight', col: 'col-span-12 md:col-span-6' },
    { src: '/assets/img/clinic-chair.jpg', title: 'Treatment Chair', desc: 'Ultra-plush hydraulic chair with ceiling monitor', col: 'col-span-12 md:col-span-4' },
    { src: '/assets/img/lounge.jpg', title: 'Recovery Lounge', desc: 'Quiet relaxation corner after procedures', col: 'col-span-12 md:col-span-4' },
    { src: '/assets/img/storefront.jpg', title: 'Exterior & Access', desc: 'Pearl Heights entrance on Veera Desai Road', col: 'col-span-12 md:col-span-4' },
    { src: '/assets/img/patient-treatment.jpg', title: 'Care in Progress', desc: 'Gentle, isolated treatment with magnification loupes', col: 'col-span-12 md:col-span-6' },
    { src: '/assets/img/sterilization.jpg', title: 'Sterilisation Suite', desc: 'Class B autoclave and vacuum pouch validation bay', col: 'col-span-12 md:col-span-6' },
    { src: '/assets/img/kids-visit.jpg', title: 'Kids Dentistry', desc: 'Friendly introductions and gentle first visits', col: 'col-span-12 md:col-span-4' },
    { src: '/assets/img/veneers-before-after.jpg', title: 'Smile Transformation', desc: 'Custom aesthetic ceramic restorations', col: 'col-span-12 md:col-span-8' },
  ];

  return (
    <div className="py-12">
      <header className="max-w-6xl mx-auto px-6 mb-16">
        <p className="text-xs text-[#5d6b64] mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0e5c4a] cursor-pointer">
            Home
          </button>{' '}
          / Gallery
        </p>
        <p className="eyebrow">Inside the studio</p>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1c2b26] max-w-3xl leading-tight">
          Have a look around before you walk in.
        </h1>
        <p className="lede mt-4 text-base sm:text-lg">
          Three treatment chairs, a dedicated sterilisation bay you are welcome to inspect, a kids’ corner, and a recovery lounge.
        </p>
      </header>

      {/* Gallery Grid */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-12 gap-6">
          {images.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(item.src)}
              className={`${item.col} group relative rounded-2xl overflow-hidden aspect-4/3 shadow-md bg-stone-100 cursor-pointer`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                <p className="font-serif text-lg font-semibold">{item.title}</p>
                <p className="text-xs text-stone-200 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={selectedImage}
              alt="Clinic View"
              className="max-w-full max-h-[85vh] object-contain mx-auto"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* CTA Strip */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-[#0e5c4a] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl">
          <div>
            <h3 className="font-serif text-2xl font-semibold">
              Ready to see it in person?
            </h3>
            <p className="text-emerald-100 text-sm mt-1">
              Book a visit online or drop in during clinic hours for a tour.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-[#09382e] hover:bg-stone-100 font-semibold text-sm py-3 px-6 rounded-full shadow-md whitespace-nowrap cursor-pointer"
          >
            Book an appointment →
          </button>
        </div>
      </section>
    </div>
  );
};
