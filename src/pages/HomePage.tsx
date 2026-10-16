import React from 'react';
import { Hero } from '../components/home/Hero';
import { BannerStrip } from '../components/home/BannerStrip';
import { Marquee } from '../components/home/Marquee';
import { useClinicStore } from '../context/ClinicStoreContext';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { config, posts } = useClinicStore();

  return (
    <div className="space-y-0">
      {/* Hero */}
      <Hero onBookClick={() => onNavigate('contact')} />

      {/* Banner Strip (Carousel) */}
      <BannerStrip
        onBannerAction={(link) => {
          if (link.includes('contact') || link.includes('book')) {
            onNavigate('contact');
          } else {
            onNavigate('services');
          }
        }}
      />

      {/* Marquee */}
      <Marquee />

      {/* What we treat */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <p className="eyebrow">What we treat</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1c2b26] font-semibold">
          The work we do most.
        </h2>
        <p className="lede mt-3">
          A short tour of the treatments we handle every day. Details and written estimates live on the services page.
        </p>

        {/* Featured block */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-4/3 bg-stone-200">
            <img
              src="/assets/img/whitening.jpg"
              alt="A whitening session in progress at SmileCraft"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
          <div>
            <span className="eyebrow">Most requested</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1c2b26] mt-1 mb-4">
              Single-sitting root canal, done gently
            </h3>
            <p className="text-[#5d6b64] leading-relaxed">
              Our endodontist finishes most root canals in one visit of about 90 minutes. A rubber dam isolates the tooth, rotary instruments shorten the procedure, and you leave with the infection gone and a plan for the crown.
            </p>
            <div className="mt-6">
              <button
                onClick={() => onNavigate('article', { slug: 'article-root-canal-mumbai' })}
                className="btn-ghost text-sm py-2.5 px-5 cursor-pointer"
              >
                Read: root canal, honestly explained →
              </button>
            </div>
          </div>
        </div>

        {/* Treatment Rows */}
        <div className="mt-14 border-t border-[#1c2b26]/10 divide-y divide-[#1c2b26]/10">
          {[
            { title: 'Dental implants', desc: 'CBCT-planned, specialist-placed', slug: 'article-implants-guide' },
            { title: 'Braces & clear aligners', desc: 'Metal, ceramic and invisible', slug: 'article-braces-vs-aligners' },
            { title: 'Teeth whitening', desc: 'In-clinic, one session', slug: 'article-whitening-truth' },
            { title: 'Crowns & bridges', desc: 'Zirconia, E-max and PFM', page: 'services' },
            { title: 'Cleaning & gum care', desc: 'Ultrasonic, gentle', slug: 'article-scaling-cleaning' },
            { title: "Kids' dentistry", desc: 'First visits made easy', slug: 'article-kids-first-visit' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (item.slug) onNavigate('article', { slug: item.slug });
                else onNavigate('services');
              }}
              className="py-5 px-2 flex justify-between items-center gap-4 hover:pl-5 hover:bg-[#0e5c4a]/5 transition-all cursor-pointer group rounded-lg"
            >
              <div>
                <h4 className="font-serif text-lg font-medium text-[#1c2b26] group-hover:text-[#0e5c4a]">
                  {item.title}
                </h4>
                <span className="text-xs text-[#5d6b64]">{item.desc}</span>
              </div>
              <span className="text-[#0e5c4a] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Why patients stay */}
      <section className="py-20 px-6 bg-[#fffdf9] border-y border-[#1c2b26]/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-4/3">
            <img
              src="/assets/img/clinic-wide.jpg"
              alt="The SmileCraft floor: reception, consult bay and treatment rooms"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="eyebrow">Why patients stay</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1c2b26] font-semibold mb-6">
              A clinic that runs the way a good clinic should.
            </h2>
            <ul className="space-y-5 text-sm divide-y divide-[#1c2b26]/10">
              <li className="pt-3 flex gap-4">
                <span className="font-serif text-lg font-bold text-[#0e5c4a]">01</span>
                <div>
                  <strong className="block text-[#1c2b26] font-semibold text-base mb-1">
                    Diagnosis before sales.
                  </strong>
                  <p className="text-[#5d6b64]">
                    We show you your X-ray, explain what needs work now and what can wait a year. You decide.
                  </p>
                </div>
              </li>
              <li className="pt-4 flex gap-4">
                <span className="font-serif text-lg font-bold text-[#0e5c4a]">02</span>
                <div>
                  <strong className="block text-[#1c2b26] font-semibold text-base mb-1">
                    Written estimates.
                  </strong>
                  <p className="text-[#5d6b64]">
                    The quote comes on paper (and WhatsApp) with itemised lines. The final bill matches it unless you approve a change.
                  </p>
                </div>
              </li>
              <li className="pt-4 flex gap-4">
                <span className="font-serif text-lg font-bold text-[#0e5c4a]">03</span>
                <div>
                  <strong className="block text-[#1c2b26] font-semibold text-base mb-1">
                    Specialists only.
                  </strong>
                  <p className="text-[#5d6b64]">
                    Root canals go to an endodontist, implants to an implantologist. No general dentist doing specialist work.
                  </p>
                </div>
              </li>
              <li className="pt-4 flex gap-4">
                <span className="font-serif text-lg font-bold text-[#0e5c4a]">04</span>
                <div>
                  <strong className="block text-[#1c2b26] font-semibold text-base mb-1">
                    Sterilisation you can watch.
                  </strong>
                  <p className="text-[#5d6b64]">
                    Class B autoclave, single-use kits opened in front of you. Ask to see the cycle log; we keep it proudly.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Our Doctors Overview */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow">Our doctors</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1c2b26] font-semibold mb-6">
              Meet the two dentists you’ll actually see.
            </h2>
            <div className="space-y-6 text-sm">
              <div className="p-4 rounded-xl bg-white border border-[#1c2b26]/10 shadow-sm">
                <h4 className="font-serif text-lg font-bold text-[#0e5c4a]">
                  Dr. Ananya Sharma, MDS
                </h4>
                <p className="text-xs text-[#5d6b64] font-medium mt-0.5">
                  Conservative Dentistry & Endodontics · 12 years
                </p>
                <p className="text-[#5d6b64] mt-2">
                  Over 2,800 root canals, single-sitting rotary specialist, and full-mouth rehabilitation.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#1c2b26]/10 shadow-sm">
                <h4 className="font-serif text-lg font-bold text-[#0e5c4a]">
                  Dr. Rohan Mehta, MDS
                </h4>
                <p className="text-xs text-[#5d6b64] font-medium mt-0.5">
                  Prosthodontics & Implantology · 10 years
                </p>
                <p className="text-[#5d6b64] mt-2">
                  CBCT-guided implants with 3,200+ placed, certified aligner provider, and aesthetic prosthetics.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onNavigate('doctors')}
                className="btn-ghost text-sm py-2.5 px-6 cursor-pointer"
              >
                Full doctor profiles →
              </button>
            </div>

            {/* Live slot ticker */}
            <div className="mt-8 p-3 rounded-xl bg-[#0e5c4a]/10 border border-[#0e5c4a]/20 flex items-center gap-3 flex-wrap text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-[#09382e]">Next open slots today:</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded shadow-xs text-[#0e5c4a]">11:30 AM</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded shadow-xs text-[#0e5c4a]">2:00 PM</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded shadow-xs text-[#0e5c4a]">4:45 PM</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl aspect-4/3 bg-stone-200">
            <img
              src="/assets/img/doctors-duo.jpg"
              alt="Dr. Ananya Sharma and Dr. Rohan Mehta together at SmileCraft"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="bg-[#09382e] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <b className="font-serif text-4xl sm:text-5xl text-amber-200 block">12+</b>
            <span className="text-xs text-[#bfd6cd] uppercase tracking-wider mt-1 block">Years in practice</span>
          </div>
          <div>
            <b className="font-serif text-4xl sm:text-5xl text-amber-200 block">18,000+</b>
            <span className="text-xs text-[#bfd6cd] uppercase tracking-wider mt-1 block">Smiles treated</span>
          </div>
          <div>
            <b className="font-serif text-4xl sm:text-5xl text-amber-200 block">3,200+</b>
            <span className="text-xs text-[#bfd6cd] uppercase tracking-wider mt-1 block">Implants placed</span>
          </div>
          <div>
            <b className="font-serif text-4xl sm:text-5xl text-amber-200 block">4.9 ★</b>
            <span className="text-xs text-[#bfd6cd] uppercase tracking-wider mt-1 block">Google rating</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <p className="eyebrow">Patient words</p>
        <blockquote className="border-l-4 border-[#c79a45] pl-6 py-2 font-serif text-2xl sm:text-3xl text-[#1c2b26] leading-relaxed max-w-3xl">
          “I postponed my root canal for two years out of fear. Dr. Ananya explained every step, it took one sitting, and I felt nothing worse than a long dental nap.”
          <cite className="block mt-4 text-xs font-sans not-italic text-[#5d6b64] uppercase tracking-wider">
            Shalini R., Andheri West — Google review
          </cite>
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <blockquote className="p-6 rounded-2xl bg-[#fffdf9] border border-[#1c2b26]/10 text-sm leading-relaxed text-[#5d6b64]">
            “Booked on WhatsApp at 9 pm, seen at 10 am the next morning for a chipped front tooth. Repaired so well I forgot which tooth it was.”
            <cite className="block mt-3 text-xs font-sans not-italic text-[#0e5c4a] font-semibold">
              Karan D.
            </cite>
          </blockquote>
          <blockquote className="p-6 rounded-2xl bg-[#fffdf9] border border-[#1c2b26]/10 text-sm leading-relaxed text-[#5d6b64]">
            “They told me my molar could wait six months and the bill matched the estimate exactly. I’ve never had a dentist do either.”
            <cite className="block mt-3 text-xs font-sans not-italic text-[#0e5c4a] font-semibold">
              Mrs. D’Souza
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Latest from the blog & clinic updates */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-[#1c2b26]/10">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-8">
          <div>
            <p className="eyebrow">From the blog</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1c2b26]">
              Straight answers about treatment, cost and pain.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="btn-ghost text-sm py-2 px-5 cursor-pointer"
          >
            All articles →
          </button>
        </div>

        {/* Dynamic clinic updates notice banner if any */}
        {posts.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="bg-amber-400 text-stone-900 text-xs font-bold px-2 py-0.5 rounded-full">
                Notice
              </span>
              <span className="text-sm font-semibold text-[#1c2b26]">
                {posts[0].title}
              </span>
            </div>
            <button
              onClick={() => onNavigate('article', { id: posts[0].id })}
              className="text-xs text-[#0e5c4a] font-bold hover:underline cursor-pointer"
            >
              Read clinic update →
            </button>
          </div>
        )}

        <div className="divide-y divide-[#1c2b26]/10">
          <div
            onClick={() => onNavigate('article', { slug: 'article-root-canal-mumbai' })}
            className="py-4 flex justify-between items-center cursor-pointer hover:pl-2 transition-all"
          >
            <h3 className="font-serif text-lg text-[#1c2b26] hover:text-[#0e5c4a]">
              Root canal in Mumbai: cost, pain and what actually happens
            </h3>
            <span className="text-xs text-[#5d6b64]">7 min read</span>
          </div>
          <div
            onClick={() => onNavigate('article', { slug: 'article-implants-guide' })}
            className="py-4 flex justify-between items-center cursor-pointer hover:pl-2 transition-all"
          >
            <h3 className="font-serif text-lg text-[#1c2b26] hover:text-[#0e5c4a]">
              Dental implants: the honest guide before you spend ₹30,000
            </h3>
            <span className="text-xs text-[#5d6b64]">9 min read</span>
          </div>
          <div
            onClick={() => onNavigate('article', { slug: 'article-braces-vs-aligners' })}
            className="py-4 flex justify-between items-center cursor-pointer hover:pl-2 transition-all"
          >
            <h3 className="font-serif text-lg text-[#1c2b26] hover:text-[#0e5c4a]">
              Braces or clear aligners? A choice that fits your life
            </h3>
            <span className="text-xs text-[#5d6b64]">6 min read</span>
          </div>
        </div>
      </section>

      {/* Emergency CTA Strip */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-[#0e5c4a] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-xl">
          <div className="max-w-xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold leading-snug">
              Tooth bothering you since morning? Same-day slots are kept aside.
            </h2>
            <p className="text-emerald-100 text-sm mt-2 leading-relaxed">
              Call, WhatsApp, or fill the booking form. We confirm within an hour of clinic time.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-[#09382e] hover:bg-stone-100 font-semibold text-sm py-3.5 px-7 rounded-full shadow-md cursor-pointer transition-transform hover:scale-105"
            >
              Book now →
            </button>
            <a
              href={`https://wa.me/${config.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-white border-white/40 hover:border-white text-sm py-3.5 px-6"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
