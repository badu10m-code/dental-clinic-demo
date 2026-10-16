import React, { useState, useEffect, useRef } from 'react';
import { Hero } from '../components/home/Hero';
import { BannerStrip } from '../components/home/BannerStrip';
import { Marquee } from '../components/home/Marquee';
import { CountUpNumber } from '../components/common/CountUpNumber';
import { useClinicStore } from '../context/ClinicStoreContext';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { config, posts } = useClinicStore();

  const [activeWhyIndex, setActiveWhyIndex] = useState(0);

  const statsSectionRef = useRef<HTMLElement | null>(null);
  const [isStatsInView, setIsStatsInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsStatsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Triggers every time the user enters or leaves the section
        setIsStatsInView(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    const el = statsSectionRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  const whyPoints = [
    {
      num: '01',
      title: 'Diagnosis before sales.',
      desc: 'We show you your X-ray, explain what needs work now and what can wait a year. You decide.',
      image: '/assets/img/consult-xray.jpg',
      tag: '01 Digital Diagnostics',
      caption: 'In-chair digital X-ray review: seeing the problem clearly before deciding treatment.',
    },
    {
      num: '02',
      title: 'Written estimates.',
      desc: 'The quote comes on paper (and WhatsApp) with itemised lines. The final bill matches it unless you approve a change.',
      image: '/assets/img/team-tablet.jpg',
      tag: '02 Itemised Estimates',
      caption: 'Every treatment line and cost written down and approved before we begin.',
    },
    {
      num: '03',
      title: 'Specialists only.',
      desc: 'Root canals go to an endodontist, implants to an implantologist. No general dentist doing specialist work.',
      image: '/assets/img/patient-treatment.jpg',
      tag: '03 MDS Specialists',
      caption: 'Procedures conducted exclusively by certified specialists with loupes & isolation.',
    },
    {
      num: '04',
      title: 'Sterilisation you can watch.',
      desc: 'Class B autoclave, single-use kits opened in front of you. Ask to see the cycle log; we keep it proudly.',
      image: '/assets/img/sterilization.jpg',
      tag: '04 Class B Autoclave',
      caption: 'European standard multi-vacuum sterilisation with sealed single-use patient kits.',
    },
  ];

  const safeWhyIndex =
    whyPoints.length > 0 && activeWhyIndex >= 0 && activeWhyIndex < whyPoints.length
      ? activeWhyIndex
      : 0;

  const currentWhyPoint = whyPoints[safeWhyIndex] || {
    num: '01',
    title: 'High standard dental care',
    desc: 'Transparent diagnostics and specialist-first treatments.',
    image: '/assets/img/consult-xray.jpg',
    tag: '01 Digital Diagnostics',
    caption: 'Clear diagnostic review with modern digital imaging.',
  };

  useEffect(() => {
    if (whyPoints.length <= 1) return;
    const interval = setInterval(() => {
      setActiveWhyIndex((prev) => (prev + 1) % whyPoints.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [whyPoints.length]);

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
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-stone-200">
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

      {/* Why patients stay — Sequential 4 images & highlighted points */}
      <section className="py-20 px-6 bg-[#fffdf9] border-y border-[#1c2b26]/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Sequential 4 Images Column (Left Side Space) */}
          <div className="flex flex-col w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full min-h-[380px] h-[440px] sm:h-[480px] lg:h-[520px] aspect-[4/3] bg-stone-900 border border-[#1c2b26]/10">
              {whyPoints.map((item, idx) => {
                const isActive = idx === activeWhyIndex;
                return (
                  <div
                    key={item.num}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                      isActive
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-105 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title || 'SmileCraft clinic showcase'}
                      className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out scale-100 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/img/consult-xray.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  </div>
                );
              })}

              {/* Floating Tag Pill */}
              {currentWhyPoint.tag && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#09382e]/90 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{currentWhyPoint.tag}</span>
                </div>
              )}

              {/* Slide Counter */}
              <div className="absolute top-4 right-4 z-20 font-mono text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 shadow-md">
                0{safeWhyIndex + 1} / 0{Math.max(1, whyPoints.length)}
              </div>

              {/* Active Image Caption & Animated Progress Bar */}
              {currentWhyPoint.caption && (
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/65 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-white shadow-lg">
                  <p className="text-xs sm:text-sm font-medium text-emerald-100 leading-snug">
                    {currentWhyPoint.caption}
                  </p>

                  {/* Progress bar for active slide duration */}
                  <div className="mt-3 w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div
                      key={safeWhyIndex}
                      className="h-full bg-gradient-to-r from-emerald-400 to-[#c79a45] rounded-full animate-slideProgress"
                      style={{ animationDuration: '4000ms' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sequential step indicator dots */}
            <div className="flex items-center justify-center gap-2.5 mt-4 px-2">
              {whyPoints.map((item, idx) => (
                <button
                  key={item.num || idx}
                  onClick={() => setActiveWhyIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    safeWhyIndex === idx
                      ? 'w-10 bg-[#0e5c4a]'
                      : 'w-2.5 bg-[#1c2b26]/20 hover:bg-[#0e5c4a]/50'
                  }`}
                  aria-label={`Show step ${item.num || idx + 1}: ${item.title || ''}`}
                  title={`${item.num || idx + 1} ${item.title || ''}`}
                />
              ))}
            </div>
          </div>

          {/* 4 Sequentially Highlighted Points Column (Right Side) */}
          <div>
            <p className="eyebrow">Why patients stay</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1c2b26] font-semibold mb-6">
              A clinic that runs the way a good clinic should.
            </h2>

            <ul className="space-y-4 text-sm">
              {whyPoints.map((point, idx) => {
                const isActive = idx === activeWhyIndex;
                return (
                  <li
                    key={point.num}
                    onClick={() => setActiveWhyIndex(idx)}
                    className={`relative p-5 rounded-2xl transition-all duration-300 cursor-pointer flex gap-4 items-start border overflow-hidden ${
                      isActive
                        ? 'bg-[#0e5c4a]/8 border-[#0e5c4a] shadow-md translate-x-1 sm:translate-x-2'
                        : 'bg-white/60 hover:bg-white border-stone-200/70 hover:border-[#1c2b26]/20 opacity-80 hover:opacity-100'
                    }`}
                  >
                    {/* Point Number */}
                    <span
                      className={`font-serif text-sm font-bold w-9 h-9 rounded-full shrink-0 flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-[#0e5c4a] text-white shadow-xs scale-105'
                          : 'text-[#0e5c4a] bg-[#0e5c4a]/10'
                      }`}
                    >
                      {point.num}
                    </span>

                    {/* Title and Description */}
                    <div className="flex-1 min-w-0">
                      <strong
                        className={`block text-base leading-snug transition-colors ${
                          isActive
                            ? 'text-[#09382e] font-bold'
                            : 'text-[#1c2b26] font-semibold'
                        }`}
                      >
                        {point.title}
                      </strong>
                      <p
                        className={`text-xs sm:text-sm mt-1.5 leading-relaxed transition-colors ${
                          isActive ? 'text-[#1c2b26] font-medium' : 'text-[#5d6b64]'
                        }`}
                      >
                        {point.desc}
                      </p>
                    </div>

                    {/* Active Sequential Progress Bar */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0e5c4a]/15 overflow-hidden">
                        <div
                          key={`progress-${activeWhyIndex}`}
                          className="h-full bg-[#0e5c4a] animate-slideProgress"
                          style={{ animationDuration: '4000ms' }}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
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
      <section
        ref={statsSectionRef}
        className="bg-[#09382e] text-white py-16 px-6 relative overflow-hidden transition-colors duration-500"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            className={`transition-all duration-700 ease-out transform ${
              isStatsInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-60 translate-y-3 scale-[0.98]'
            }`}
          >
            <b className="font-serif text-4xl sm:text-5xl text-amber-200 block tabular-nums">
              <CountUpNumber end={12} suffix="+" duration={1800} trigger={isStatsInView} replayOnEnter />
            </b>
            <span className="text-xs text-[#bfd6cd] uppercase tracking-wider mt-1 block">Years in practice</span>
          </div>
          <div
            className={`transition-all duration-700 delay-100 ease-out transform ${
              isStatsInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-60 translate-y-3 scale-[0.98]'
            }`}
          >
            <b className="font-serif text-4xl sm:text-5xl text-amber-200 block tabular-nums">
              <CountUpNumber end={18000} suffix="+" duration={2200} trigger={isStatsInView} replayOnEnter />
            </b>
            <span className="text-xs text-[#bfd6cd] uppercase tracking-wider mt-1 block">Smiles treated</span>
          </div>
          <div
            className={`transition-all duration-700 delay-200 ease-out transform ${
              isStatsInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-60 translate-y-3 scale-[0.98]'
            }`}
          >
            <b className="font-serif text-4xl sm:text-5xl text-amber-200 block tabular-nums">
              <CountUpNumber end={3200} suffix="+" duration={2000} trigger={isStatsInView} replayOnEnter />
            </b>
            <span className="text-xs text-[#bfd6cd] uppercase tracking-wider mt-1 block">Implants placed</span>
          </div>
          <div
            className={`transition-all duration-700 delay-300 ease-out transform ${
              isStatsInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-60 translate-y-3 scale-[0.98]'
            }`}
          >
            <b className="font-serif text-4xl sm:text-5xl text-amber-200 block tabular-nums">
              <CountUpNumber end={4.9} decimals={1} suffix=" ★" duration={1800} trigger={isStatsInView} replayOnEnter />
            </b>
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
