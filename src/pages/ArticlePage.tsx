import React from 'react';
import { ARTICLES_DATA } from '../data/articles';
import { useClinicStore } from '../context/ClinicStoreContext';

interface ArticlePageProps {
  slug?: string;
  id?: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ slug, id, onNavigate }) => {
  const { posts } = useClinicStore();

  // Try finding dynamic post first if ID provided
  const dynamicPost = id ? posts.find((p) => p.id === id) : null;

  // Otherwise find static article by slug
  const article = slug ? ARTICLES_DATA.find((a) => a.slug === slug) : ARTICLES_DATA[0];

  if (dynamicPost) {
    const formattedDate = new Date(dynamicPost.created).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const paragraphs = (dynamicPost.body || '').split(/\n\n+/);

    return (
      <article className="py-12 max-w-3xl mx-auto px-6">
        <p className="text-xs text-[#5d6b64] mb-3">
          <button onClick={() => onNavigate('blog')} className="hover:text-[#0e5c4a] cursor-pointer">
            Blog
          </button>{' '}
          / Clinic Update
        </p>

        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1c2b26] leading-tight mb-4">
          {dynamicPost.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-[#5d6b64] border-b border-[#1c2b26]/10 pb-6 mb-8">
          <span>By SmileCraft Dental Studio</span>
          <span>·</span>
          <span>{formattedDate}</span>
          <span>·</span>
          <span className="uppercase text-[#0e5c4a] font-semibold">{dynamicPost.category || 'Announcement'}</span>
        </div>

        {dynamicPost.image && (
          <div className="rounded-2xl overflow-hidden aspect-16/9 shadow-lg mb-8 bg-stone-100">
            <img
              src={dynamicPost.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-5 text-base sm:text-lg text-stone-800 leading-relaxed font-sans">
          {paragraphs.map((par, idx) => (
            <p key={idx}>{par}</p>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-[#0e5c4a]/5 border border-[#0e5c4a]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <b className="font-serif text-lg text-[#09382e] block">Questions regarding this update?</b>
            <p className="text-xs text-[#5d6b64] mt-0.5">Reach out to the front desk directly on WhatsApp or call us.</p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="btn-solid text-sm py-2.5 px-6 whitespace-nowrap cursor-pointer"
          >
            Contact clinic →
          </button>
        </div>
      </article>
    );
  }

  if (!article) {
    return (
      <div className="py-20 max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-serif text-2xl font-bold mb-4">Article Not Found</h2>
        <p className="text-[#5d6b64] mb-6">The article you are looking for does not exist or has been moved.</p>
        <button onClick={() => onNavigate('blog')} className="btn-solid text-sm py-2 px-5">
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <article className="py-12 max-w-3xl mx-auto px-6">
      <p className="text-xs text-[#5d6b64] mb-3">
        <button onClick={() => onNavigate('blog')} className="hover:text-[#0e5c4a] cursor-pointer">
          Blog
        </button>{' '}
        / <span className="capitalize">{article.category.replace('-', ' ')}</span>
      </p>

      <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1c2b26] leading-tight mb-4">
        {article.title}
      </h1>

      <div className="flex items-center gap-4 text-xs text-[#5d6b64] border-b border-[#1c2b26]/10 pb-6 mb-8 flex-wrap">
        <span className="font-medium text-[#1c2b26]">{article.author}</span>
        <span>·</span>
        <span>{article.date}</span>
        <span>·</span>
        <span>{article.readTime}</span>
      </div>

      <div className="rounded-2xl overflow-hidden aspect-16/9 shadow-lg mb-8 bg-stone-100">
        <img
          src={article.cover}
          alt={article.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="space-y-6 text-base sm:text-lg text-stone-800 leading-relaxed">
        {article.sections.map((sec, idx) => (
          <div key={idx} className="space-y-4">
            {sec.heading && (
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1c2b26] pt-4">
                {sec.heading}
              </h2>
            )}
            <p className="text-stone-700">{sec.text}</p>
            {sec.callout && (
              <div className="p-5 rounded-r-2xl border-l-4 border-[#c79a45] bg-[#fffdf9] shadow-xs text-sm sm:text-base text-stone-800 italic">
                {sec.callout}
              </div>
            )}
            {sec.bullets && (
              <ul className="list-disc pl-6 space-y-2 text-stone-700 text-sm sm:text-base">
                {sec.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Author Box */}
      <div className="mt-14 pt-8 border-t border-[#1c2b26]/15 flex items-center gap-5">
        <img
          src={
            article.author.includes('Ananya')
              ? '/assets/img/dr-ananya.jpg'
              : '/assets/img/dr-rohan.jpg'
          }
          alt={article.author}
          className="w-16 h-16 rounded-full object-cover border border-[#0e5c4a]"
        />
        <div>
          <b className="font-serif text-lg text-[#1c2b26] block">{article.author}</b>
          <p className="text-xs text-[#5d6b64] mt-0.5 leading-relaxed">
            Specialist dentist at SmileCraft Dental Studio, Andheri West, Mumbai. Diagnosis first, transparent treatment planning always.
          </p>
        </div>
      </div>

      {/* Related articles */}
      {article.related && article.related.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[#1c2b26]/15">
          <p className="eyebrow">Keep reading</p>
          <div className="divide-y divide-[#1c2b26]/10">
            {article.related.map((rel, rIdx) => (
              <div
                key={rIdx}
                onClick={() => onNavigate('article', { slug: rel.slug })}
                className="py-3 flex justify-between items-center text-[#09382e] hover:text-[#0e5c4a] font-serif text-base cursor-pointer hover:pl-2 transition-all"
              >
                <span>{rel.title}</span>
                <span>→</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking CTA Banner */}
      <div className="mt-12 p-8 rounded-3xl bg-[#0e5c4a] text-white flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl">
        <div>
          <h3 className="font-serif text-xl font-bold">Have questions about your teeth?</h3>
          <p className="text-xs text-emerald-100 mt-1">Book a consultation with {article.author}.</p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="bg-white text-[#09382e] hover:bg-stone-100 text-xs font-bold py-3 px-6 rounded-full shadow-md whitespace-nowrap cursor-pointer"
        >
          Book consultation →
        </button>
      </div>
    </article>
  );
};
