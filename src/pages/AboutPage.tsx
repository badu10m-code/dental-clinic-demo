import React from 'react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12">
      {/* Page Header */}
      <header className="max-w-6xl mx-auto px-6 mb-16">
        <p className="text-xs text-[#5d6b64] mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0e5c4a] cursor-pointer">
            Home
          </button>{' '}
          / About
        </p>
        <p className="eyebrow">Since 2013 · Andheri West</p>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1c2b26] max-w-3xl leading-tight">
          We built the clinic we wished existed when we were patients.
        </h1>
        <p className="lede mt-4 text-base sm:text-lg">
          SmileCraft started with one operatory chair and a rule that still holds: no treatment plan is final until the patient has seen their own X-ray and heard the honest version.
        </p>
      </header>

      {/* Philosophy Duo */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-4/3 bg-stone-100">
            <img
              src="/assets/img/lounge.jpg"
              alt="The recovery lounge at SmileCraft"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="eyebrow">How we work</p>
            <h2 className="font-serif text-3xl font-semibold text-[#1c2b26] mb-6">
              Three habits we refuse to drop.
            </h2>
            <ul className="space-y-6 text-sm divide-y divide-[#1c2b26]/10">
              <li className="pt-2 flex gap-4">
                <span className="font-serif text-xl font-bold text-[#0e5c4a]">01</span>
                <div>
                  <strong className="block text-base text-[#1c2b26] font-semibold mb-1">
                    Nothing happens on day one without your say-so.
                  </strong>
                  <p className="text-[#5d6b64] leading-relaxed">
                    First visits are for examination, X-rays and an honest conversation. Treatment begins on a later date, once you have had time to think.
                  </p>
                </div>
              </li>
              <li className="pt-4 flex gap-4">
                <span className="font-serif text-xl font-bold text-[#0e5c4a]">02</span>
                <div>
                  <strong className="block text-base text-[#1c2b26] font-semibold mb-1">
                    Specialists for specialist work.
                  </strong>
                  <p className="text-[#5d6b64] leading-relaxed">
                    An endodontist does root canals. An implantologist places implants. A paediatric-trained hand sees the children. Referrals happen inside one building.
                  </p>
                </div>
              </li>
              <li className="pt-4 flex gap-4">
                <span className="font-serif text-xl font-bold text-[#0e5c4a]">03</span>
                <div>
                  <strong className="block text-base text-[#1c2b26] font-semibold mb-1">
                    The bill matches the estimate.
                  </strong>
                  <p className="text-[#5d6b64] leading-relaxed">
                    Written estimates before we start, itemised bills after. If something unexpected shows up mid-treatment, we stop and talk before we continue.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="bg-[#fffdf9] py-16 px-6 border-y border-[#1c2b26]/10 mb-20">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow">The years</p>
          <h2 className="font-serif text-3xl font-semibold text-[#1c2b26] mb-8">
            How the studio grew.
          </h2>
          <div className="border-t border-[#1c2b26]/10 divide-y divide-[#1c2b26]/10">
            {[
              {
                year: '2013',
                text: 'Dr. Ananya opens a single-chair practice above a bakery on Veera Desai Road. Four patients in week one, two of them family.',
              },
              {
                year: '2017',
                text: 'Dr. Rohan joins after his prosthodontics residency. The clinic moves two floors up and adds a dedicated sterilisation bay.',
              },
              {
                year: '2021',
                text: 'Third chair, Class B autoclave, and a dedicated kids’ corner with a ceiling screen. Children now look forward to checkups, which still surprises us.',
              },
              {
                year: '2025',
                text: 'In-house CBCT scan for implant planning. Same-week appointments become the norm rather than the exception.',
              },
            ].map((milestone, i) => (
              <div key={i} className="py-6 flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-10">
                <h3 className="font-serif text-2xl font-bold text-[#0e5c4a] sm:w-24">
                  {milestone.year}
                </h3>
                <p className="text-[#5d6b64] text-sm leading-relaxed flex-1">
                  {milestone.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Tour */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <p className="eyebrow">Inside the studio</p>
        <h2 className="font-serif text-3xl font-semibold text-[#1c2b26] mb-8">
          A quick look around, no appointment needed.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl overflow-hidden shadow-md aspect-4/3">
            <img
              src="/assets/img/consult-xray.jpg"
              alt="A consultation at SmileCraft: your X-ray on screen"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-md aspect-4/3">
            <img
              src="/assets/img/opg-room.jpg"
              alt="The OPG X-ray room at SmileCraft"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-md aspect-4/3">
            <img
              src="/assets/img/reception-desk.jpg"
              alt="The reception desk at SmileCraft"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <p className="text-xs text-[#5d6b64] mt-4">
          The consultation bay, the OPG room and reception: walk in any clinic hour and see them yourself.
        </p>
      </section>

      {/* CTA Strip */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-[#0e5c4a] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl">
          <div>
            <h3 className="font-serif text-2xl font-semibold">
              Come meet the doctors in person.
            </h3>
            <p className="text-emerald-100 text-sm mt-1">
              Checkup and written plan for ₹500, adjusted against treatment if you go ahead.
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
