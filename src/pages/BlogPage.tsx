import React, { useState } from 'react';
import { ARTICLES_DATA } from '../data/articles';
import { useClinicStore } from '../context/ClinicStoreContext';

interface BlogPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const { posts } = useClinicStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'root-canal', label: 'Root Canal' },
    { id: 'implants', label: 'Implants' },
    { id: 'braces', label: 'Braces' },
    { id: 'kids', label: 'Kids' },
    { id: 'cosmetic', label: 'Cosmetic' },
    { id: 'prevention', label: 'Prevention' },
    { id: 'updates', label: 'Clinic updates' },
  ];

  const filteredArticles = activeCategory === 'all'
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter((a) => a.category === activeCategory);

  const showUpdates = activeCategory === 'all' || activeCategory === 'updates';

  return (
    <div className="py-12">
      <header className="max-w-6xl mx-auto px-6 mb-16">
        <p className="text-xs text-[#5d6b64] mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0e5c4a] cursor-pointer">
            Home
          </button>{' '}
          / Blog
        </p>
        <p className="eyebrow">The SmileCraft journal</p>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1c2b26] max-w-3xl leading-tight">
          Dental advice you can actually use.
        </h1>
        <p className="lede mt-4 text-base sm:text-lg">
          Written by our own dentists between appointments. No fear-mongering, no upsells, and prices stated the way we state them at the clinic.
        </p>
      </header>

      {/* Featured Big Article */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div
          onClick={() => onNavigate('article', { slug: 'article-root-canal-mumbai' })}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-[#fffdf9] p-8 sm:p-10 rounded-3xl border border-[#1c2b26]/10 shadow-sm cursor-pointer group hover:shadow-md transition-shadow"
        >
          <div className="rounded-2xl overflow-hidden aspect-4/3 shadow-md bg-stone-100">
            <img
              src="/assets/img/blog-rct.jpg"
              alt="Root canal treatment under a dental microscope"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div>
            <p className="eyebrow">Featured · Root Canal</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1c2b26] mb-3 group-hover:text-[#0e5c4a] transition-colors">
              Root canal in Mumbai: cost, pain and what actually happens in that chair
            </h2>
            <p className="text-[#5d6b64] text-sm leading-relaxed mb-4">
              The two-year delay, the ₹500 quick fix, the tooth that finally gave up at 2 am. An endodontist walks through the whole journey, including what it costs here and why prices vary across the city.
            </p>
            <p className="text-xs text-[#5d6b64] font-medium">
              By Dr. Ananya Sharma · 7 min read
            </p>
          </div>
        </div>
      </section>

      {/* Filter Chips */}
      <section className="max-w-6xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`chip text-xs py-2 px-4 cursor-pointer ${
                activeCategory === cat.id ? 'on' : ''
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Articles and Updates List */}
      <section className="max-w-6xl mx-auto px-6 mb-20 space-y-12">
        {/* Dynamic Clinic Updates from Admin */}
        {showUpdates && posts.length > 0 && (
          <div>
            <p className="eyebrow">Fresh from the clinic</p>
            <div className="border-t border-[#1c2b26]/10 divide-y divide-[#1c2b26]/10">
              {posts.map((post) => {
                const dateStr = new Date(post.created).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });
                return (
                  <div
                    key={post.id}
                    onClick={() => onNavigate('article', { id: post.id })}
                    className="py-5 px-3 flex items-center justify-between gap-6 hover:bg-[#0e5c4a]/5 transition-colors cursor-pointer rounded-xl group"
                  >
                    <div className="flex items-center gap-4">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt=""
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-[#0e5c4a]/10 flex items-center justify-center text-[#0e5c4a] font-serif font-bold text-xl">
                          ✍
                        </div>
                      )}
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-[#1c2b26] group-hover:text-[#0e5c4a]">
                          {post.title}
                        </h3>
                        <p className="text-xs text-[#5d6b64] mt-0.5">
                          By the clinic · {dateStr} · {post.category || 'Announcement'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#0e5c4a] bg-emerald-100 px-3 py-1 rounded-full whitespace-nowrap">
                      New update →
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Clinical Guides */}
        <div>
          {showUpdates && posts.length > 0 && <p className="eyebrow mt-8">Guides & articles</p>}
          <div className="border-t border-[#1c2b26]/10 divide-y divide-[#1c2b26]/10">
            {filteredArticles.map((art) => (
              <div
                key={art.slug}
                onClick={() => onNavigate('article', { slug: art.slug })}
                className="py-6 px-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#0e5c4a]/5 transition-colors cursor-pointer rounded-xl group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={art.cover}
                    alt=""
                    className="w-16 h-16 rounded-xl object-cover hidden sm:block shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#1c2b26] group-hover:text-[#0e5c4a]">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#5d6b64] mt-0.5">
                      By {art.author} · {art.readTime}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0e5c4a] px-3 py-1 rounded-full bg-[#0e5c4a]/10 shrink-0">
                  {art.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-[#0e5c4a] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl">
          <div>
            <h3 className="font-serif text-2xl font-semibold">
              Reading about it only gets you so far.
            </h3>
            <p className="text-emerald-100 text-sm mt-1">
              Book a checkup and get answers about your own teeth, in writing.
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
