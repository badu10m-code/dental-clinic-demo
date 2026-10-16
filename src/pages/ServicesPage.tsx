import React from 'react';

interface ServicesPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12">
      <header className="max-w-6xl mx-auto px-6 mb-16">
        <p className="text-xs text-[#5d6b64] mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0e5c4a] cursor-pointer">
            Home
          </button>{' '}
          / Services
        </p>
        <p className="eyebrow">Treatment & pricing</p>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1c2b26] max-w-3xl leading-tight">
          Nine things we do well, priced in the open.
        </h1>
        <p className="lede mt-4 text-base sm:text-lg">
          Every range below is what our clinic typically charges. Your exact figure comes after examination, in writing, and the final bill matches it unless you approve a change.
        </p>
      </header>

      {/* Featured 3 treatments with cards */}
      <section className="max-w-6xl mx-auto px-6 space-y-16 mb-20">
        {/* Root Canal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#fffdf9] p-8 sm:p-10 rounded-2xl border border-[#1c2b26]/10 shadow-sm">
          <div className="rounded-xl overflow-hidden aspect-4/3 shadow-md">
            <img
              src="/assets/img/blog-rct.jpg"
              alt="Root canal treatment in progress"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="eyebrow">Endodontics</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1c2b26] mb-3">
              Root canal treatment
            </h2>
            <p className="text-[#5d6b64] text-sm leading-relaxed mb-4">
              Single-sitting rotary root canals under rubber-dam isolation, done by our endodontist. Most teeth finish in one 90-minute visit; a crown follows in a week.
            </p>
            <div className="p-4 rounded-xl bg-[#0e5c4a]/5 border border-[#0e5c4a]/20 mb-6">
              <b className="text-[#0e5c4a] font-serif text-lg block">₹4,000 – ₹9,000 per tooth</b>
              <span className="text-xs text-[#5d6b64]">
                Crown ₹6,000 – ₹14,000 depending on material (Zirconia, E-Max, PFM).
              </span>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-solid text-sm py-2.5 px-6 cursor-pointer"
            >
              Book root canal consult →
            </button>
          </div>
        </div>

        {/* Implants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#fffdf9] p-8 sm:p-10 rounded-2xl border border-[#1c2b26]/10 shadow-sm">
          <div className="md:order-2 rounded-xl overflow-hidden aspect-4/3 shadow-md">
            <img
              src="/assets/img/implants-model.jpg"
              alt="Implant-supported ceramic bridges on the lab bench"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:order-1">
            <p className="eyebrow">Implantology</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1c2b26] mb-3">
              Dental implants
            </h2>
            <p className="text-[#5d6b64] text-sm leading-relaxed mb-4">
              CBCT-planned implants from leading global systems, placed by our implantologist with more than 3,200 placed to date. Includes the titanium fixture, crown, and all reviews in the first year.
            </p>
            <div className="p-4 rounded-xl bg-[#0e5c4a]/5 border border-[#0e5c4a]/20 mb-6">
              <b className="text-[#0e5c4a] font-serif text-lg block">₹28,000 – ₹45,000 per tooth</b>
              <span className="text-xs text-[#5d6b64]">
                All inclusive: fixture, abutment, ceramic crown, and follow-up scans.
              </span>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-solid text-sm py-2.5 px-6 cursor-pointer"
            >
              Book implant consult →
            </button>
          </div>
        </div>

        {/* Aligners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#fffdf9] p-8 sm:p-10 rounded-2xl border border-[#1c2b26]/10 shadow-sm">
          <div className="rounded-xl overflow-hidden aspect-4/3 shadow-md">
            <img
              src="/assets/img/blog-aligners.jpg"
              alt="Clear aligner being fitted"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="eyebrow">Orthodontics</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1c2b26] mb-3">
              Braces & clear aligners
            </h2>
            <p className="text-[#5d6b64] text-sm leading-relaxed mb-4">
              Metal, ceramic or invisible aligners, with a digital smile simulation before you commit. Zero-cost EMI plans available through Bajaj Finserv.
            </p>
            <div className="p-4 rounded-xl bg-[#0e5c4a]/5 border border-[#0e5c4a]/20 mb-6">
              <b className="text-[#0e5c4a] font-serif text-lg block">₹35,000 – ₹1,20,000 full case</b>
              <span className="text-xs text-[#5d6b64]">
                Depends on appliance system, degree of crowding, and case duration.
              </span>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-solid text-sm py-2.5 px-6 cursor-pointer"
            >
              Book orthodontic scan →
            </button>
          </div>
        </div>
      </section>

      {/* Everything else we treat */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <p className="eyebrow">Full treatment catalogue</p>
        <h2 className="font-serif text-3xl font-semibold text-[#1c2b26] mb-8">
          Everything else we treat.
        </h2>

        <div className="border-t border-[#1c2b26]/10 divide-y divide-[#1c2b26]/10">
          {[
            {
              title: 'Cleaning & polishing',
              desc: 'Ultrasonic scaling, air-polishing, stain removal',
              price: '₹1,500 – ₹4,000',
            },
            {
              title: 'Gum treatment (flap surgery)',
              desc: 'Deep subgingival curettage to periodontal regeneration',
              price: '₹3,000 – ₹12,000 / quadrant',
            },
            {
              title: 'Teeth whitening',
              desc: 'In-clinic laser bleaching, 1-hour session with gum shield',
              price: '₹8,000 – ₹15,000',
            },
            {
              title: 'Crowns & bridges',
              desc: 'Monolithic Zirconia, E-Max lithium disilicate, PFM',
              price: '₹6,000 – ₹14,000 / unit',
            },
            {
              title: 'Kids’ dentistry',
              desc: 'Milk tooth fillings, pulpectomy, space maintainers, fluoride',
              price: '₹800 onwards',
            },
            {
              title: 'Wisdom tooth extraction',
              desc: 'Surgical impaction removal under local anaesthesia',
              price: '₹3,500 – ₹12,000',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('contact')}
              className="py-5 px-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-[#0e5c4a]/5 transition-colors cursor-pointer rounded-lg"
            >
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1c2b26]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5d6b64]">{item.desc}</p>
              </div>
              <div className="text-right flex items-center gap-4">
                <span className="font-serif text-base font-bold text-[#0e5c4a]">
                  {item.price}
                </span>
                <span className="text-xs font-semibold text-[#0e5c4a]">Book →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-[#0e5c4a] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl">
          <div>
            <h3 className="font-serif text-2xl font-semibold">
              Not sure which of these you need?
            </h3>
            <p className="text-emerald-100 text-sm mt-1">
              Checkup and consultation with a written plan is ₹500, adjusted against treatment if you proceed within 30 days.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-[#09382e] hover:bg-stone-100 font-semibold text-sm py-3 px-6 rounded-full shadow-md whitespace-nowrap cursor-pointer"
          >
            Book a checkup →
          </button>
        </div>
      </section>
    </div>
  );
};
