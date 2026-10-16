import React from 'react';

interface DoctorsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12">
      <header className="max-w-6xl mx-auto px-6 mb-16">
        <p className="text-xs text-[#5d6b64] mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0e5c4a] cursor-pointer">
            Home
          </button>{' '}
          / Doctors
        </p>
        <p className="eyebrow">The people behind the work</p>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1c2b26] max-w-3xl leading-tight">
          Two specialists, one promise: you hear the truth first.
        </h1>
        <p className="lede mt-4 text-base sm:text-lg">
          No assistant-driven diagnoses, no treatment sold by the front desk. What you are told comes directly from the doctor holding the mirror.
        </p>
      </header>

      {/* Doctors Profiles */}
      <section className="max-w-6xl mx-auto px-6 space-y-16 mb-20">
        {/* Dr. Ananya Sharma */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-[#fffdf9] p-8 sm:p-12 rounded-3xl border border-[#1c2b26]/10 shadow-sm">
          <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-4/5 shadow-lg bg-stone-100">
            <img
              src="/assets/img/dr-ananya.jpg"
              alt="Dr. Ananya Sharma, MDS"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0e5c4a] block mb-1">
              MDS · Conservative Dentistry & Endodontics
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c2b26] mb-4">
              Dr. Ananya Sharma
            </h2>
            <p className="text-[#5d6b64] text-sm leading-relaxed mb-6">
              Founder. Twelve years of root canals, ceramic crowns, and full-mouth restorations. Patients consistently highlight her gentleness: she explains the science until the fear subsides, then works quietly, swiftly, and thoroughly.
            </p>

            <ul className="space-y-3 text-sm divide-y divide-[#1c2b26]/10 mb-8">
              <li className="pt-2 flex justify-between items-center">
                <span className="text-[#5d6b64]">Root canals completed:</span>
                <b className="text-[#1c2b26]">2,800+ (single-sitting focused)</b>
              </li>
              <li className="pt-3 flex justify-between items-center">
                <span className="text-[#5d6b64]">Postgraduate training:</span>
                <b className="text-[#1c2b26]">Govt. Dental College, Mumbai</b>
              </li>
              <li className="pt-3 flex justify-between items-center">
                <span className="text-[#5d6b64]">Academic affiliations:</span>
                <b className="text-[#1c2b26]">Indian Endodontic Society speaker</b>
              </li>
              <li className="pt-3 flex justify-between items-center">
                <span className="text-[#5d6b64]">Consultation timings:</span>
                <b className="text-[#0e5c4a]">Tue, Thu, Sat · 10 AM – 2 PM</b>
              </li>
            </ul>

            <button
              onClick={() => onNavigate('contact')}
              className="btn-solid text-sm py-3 px-6 cursor-pointer"
            >
              Book with Dr. Ananya →
            </button>
          </div>
        </div>

        {/* Dr. Rohan Mehta */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-[#fffdf9] p-8 sm:p-12 rounded-3xl border border-[#1c2b26]/10 shadow-sm">
          <div className="md:col-span-5 md:order-2 rounded-2xl overflow-hidden aspect-4/5 shadow-lg bg-stone-100">
            <img
              src="/assets/img/dr-rohan.jpg"
              alt="Dr. Rohan Mehta, MDS"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-7 md:order-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0e5c4a] block mb-1">
              MDS · Prosthodontics & Implantology
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c2b26] mb-4">
              Dr. Rohan Mehta
            </h2>
            <p className="text-[#5d6b64] text-sm leading-relaxed mb-6">
              Partner. Plans all implants on our in-house 3D CBCT imaging unit with over 3,200 successful placements since 2011. He is also our certified clear aligner and smile design specialist, known for his conservative approach of preserving natural enamel whenever possible.
            </p>

            <ul className="space-y-3 text-sm divide-y divide-[#1c2b26]/10 mb-8">
              <li className="pt-2 flex justify-between items-center">
                <span className="text-[#5d6b64]">Implants placed:</span>
                <b className="text-[#1c2b26]">3,200+ (CBCT guided)</b>
              </li>
              <li className="pt-3 flex justify-between items-center">
                <span className="text-[#5d6b64]">Fellowship:</span>
                <b className="text-[#1c2b26]">Implantology Fellowship, Frankfurt</b>
              </li>
              <li className="pt-3 flex justify-between items-center">
                <span className="text-[#5d6b64]">Certifications:</span>
                <b className="text-[#1c2b26]">Certified Invisalign & Spark provider</b>
              </li>
              <li className="pt-3 flex justify-between items-center">
                <span className="text-[#5d6b64]">Consultation timings:</span>
                <b className="text-[#0e5c4a]">Mon, Wed, Fri · 3 PM – 8 PM</b>
              </li>
            </ul>

            <button
              onClick={() => onNavigate('contact')}
              className="btn-solid text-sm py-3 px-6 cursor-pointer"
            >
              Book with Dr. Rohan →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-[#0e5c4a] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl">
          <div>
            <h3 className="font-serif text-2xl font-semibold">
              You can request a specific doctor when booking.
            </h3>
            <p className="text-emerald-100 text-sm mt-1">
              Select Dr. Ananya or Dr. Rohan in the booking form or mention your preference on WhatsApp.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-[#09382e] hover:bg-stone-100 font-semibold text-sm py-3 px-6 rounded-full shadow-md whitespace-nowrap cursor-pointer"
          >
            Book appointment →
          </button>
        </div>
      </section>
    </div>
  );
};
