import React, { useState } from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';
import { ArticleItem } from '../../types';

export const AdminPosts: React.FC = () => {
  const { posts, addPost, deletePost, articles, addArticle, deleteArticle, showToast } = useClinicStore();

  const [activeTab, setActiveTab] = useState<'articles' | 'posts'>('articles');

  // Article state
  const [artTitle, setArtTitle] = useState('');
  const [artCategory, setArtCategory] = useState('root-canal');
  const [artAuthor, setArtAuthor] = useState('Dr. Ananya Sharma');
  const [artReadTime, setArtReadTime] = useState('6 min read');
  const [artCover, setArtCover] = useState('/assets/img/blog-rct.jpg');
  const [artSummary, setArtSummary] = useState('');
  const [artBody, setArtBody] = useState('');

  // Post / Camp state
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('updates');
  const [postImage, setPostImage] = useState('/assets/img/blog-kids.jpg');
  const [postBody, setPostBody] = useState('');

  const sampleImages = [
    { label: 'Root Canal / Microscope', path: '/assets/img/blog-rct.jpg' },
    { label: 'Dental Implants', path: '/assets/img/implants-model.jpg' },
    { label: 'Clear Aligners', path: '/assets/img/blog-aligners.jpg' },
    { label: 'Kids Dentistry', path: '/assets/img/blog-kids.jpg' },
    { label: 'Teeth Whitening', path: '/assets/img/whitening.jpg' },
    { label: 'Scaling & Cleaning', path: '/assets/img/blog-scaling.jpg' },
    { label: 'Clinic Chair Suite', path: '/assets/img/clinic-chair.jpg' },
    { label: 'Sterilization Bay', path: '/assets/img/sterilization.jpg' },
    { label: 'Doctor Consultation', path: '/assets/img/doctors-duo.jpg' },
  ];

  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (artTitle.trim().length < 4 || artBody.trim().length < 15) {
      showToast('Please provide a descriptive title and article content');
      return;
    }

    const slug = `article-${artTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}-${Date.now().toString().slice(-4)}`;

    const sections = artBody
      .split(/\n\n+/)
      .filter((p) => p.trim())
      .map((p, idx) => {
        if (idx > 0 && p.startsWith('# ')) {
          return {
            heading: p.replace('# ', '').trim(),
            text: '',
          };
        }
        return { text: p.trim() };
      });

    const newArticle: ArticleItem = {
      slug,
      title: artTitle.trim(),
      category: artCategory,
      author: artAuthor,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      readTime: artReadTime,
      cover: artCover,
      summary: artSummary.trim() || artBody.slice(0, 150) + '...',
      sections,
    };

    addArticle(newArticle);

    setArtTitle('');
    setArtSummary('');
    setArtBody('');
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (postTitle.trim().length < 3 || postBody.trim().length < 10) return;

    addPost({
      title: postTitle.trim(),
      category: postCategory,
      image: postImage,
      body: postBody.trim(),
    });

    setPostTitle('');
    setPostBody('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1c2b26]">
            Blog & Clinic Content Manager
          </h1>
          <p className="text-sm text-[#5d6b64] mt-0.5">
            Manage comprehensive clinical guides and announcement posts synced with Firebase Firestore.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#e8e4db] p-1 rounded-xl self-start">
          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-[#0e5c4a] text-white shadow-xs'
                : 'text-[#1c2b26] hover:text-[#0e5c4a]'
            }`}
          >
            Clinical Guides ({articles?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'posts'
                ? 'bg-[#0e5c4a] text-white shadow-xs'
                : 'text-[#1c2b26] hover:text-[#0e5c4a]'
            }`}
          >
            Quick Updates ({posts?.length || 0})
          </button>
        </div>
      </div>

      {activeTab === 'articles' ? (
        /* ARTICLES TAB */
        <div className="space-y-8">
          <form
            onSubmit={handlePublishArticle}
            className="bg-[#fffdf9] p-6 sm:p-8 rounded-2xl border border-[#1c2b26]/10 shadow-xs space-y-5"
          >
            <div className="border-b border-stone-200 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1c2b26]">
                Publish In-Depth Dental Guide to Firebase
              </h3>
              <p className="text-xs text-[#5d6b64]">
                Articles are published to Firestore <code className="text-[#0e5c4a] font-mono">/articles</code> and immediately appear on the public Journal page.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  placeholder="e.g. Dental Veneers in Mumbai: Process, Lifespan, and Costs"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                  Clinical Category *
                </label>
                <select
                  value={artCategory}
                  onChange={(e) => setArtCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
                >
                  <option value="root-canal">Root Canal (Endodontics)</option>
                  <option value="implants">Dental Implants</option>
                  <option value="braces">Braces & Aligners</option>
                  <option value="kids">Kids Dentistry</option>
                  <option value="cosmetic">Cosmetic Dentistry</option>
                  <option value="prevention">Preventive Care</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                  Author Specialist *
                </label>
                <select
                  value={artAuthor}
                  onChange={(e) => setArtAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
                >
                  <option value="Dr. Ananya Sharma">Dr. Ananya Sharma, MDS (Root Canals, Crowns)</option>
                  <option value="Dr. Rohan Mehta">Dr. Rohan Mehta, MDS (Implants, Aligners)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                  Read Time *
                </label>
                <input
                  type="text"
                  required
                  value={artReadTime}
                  onChange={(e) => setArtReadTime(e.target.value)}
                  placeholder="e.g. 6 min read"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
                />
              </div>
            </div>

            {/* Featured Image Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                Cover Image Asset
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {sampleImages.map((img) => (
                  <button
                    type="button"
                    key={img.path}
                    onClick={() => setArtCover(img.path)}
                    className={`chip text-xs py-1.5 px-3 cursor-pointer ${artCover === img.path ? 'on' : ''}`}
                  >
                    {img.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={artCover}
                  onChange={(e) => setArtCover(e.target.value)}
                  placeholder="Or paste custom image URL / path..."
                  className="w-full px-4 py-2 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:border-[#0e5c4a]"
                />
                {artCover && (
                  <img
                    src={artCover}
                    alt="Preview"
                    className="w-12 h-10 object-cover rounded-lg border border-stone-300 shrink-0"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                Summary / Lede (displayed on blog card)
              </label>
              <input
                type="text"
                value={artSummary}
                onChange={(e) => setArtSummary(e.target.value)}
                placeholder="A 1-2 sentence preview for patients browsing the dental journal..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                Full Guide Content * (separate paragraphs with blank lines)
              </label>
              <textarea
                required
                rows={6}
                value={artBody}
                onChange={(e) => setArtBody(e.target.value)}
                placeholder="Write the full dental explanation here. Use clear medical insights..."
                className="w-full p-4 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="btn-solid text-sm py-2.5 px-6 shadow-sm cursor-pointer"
              >
                Publish Guide to Firebase →
              </button>
            </div>
          </form>

          {/* Published Articles List */}
          <div className="bg-[#fffdf9] rounded-2xl border border-[#1c2b26]/10 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#1c2b26]/10 flex items-center justify-between">
              <div className="font-serif font-bold text-base text-[#1c2b26]">
                Published Clinical Guides ({articles?.length || 0})
              </div>
              <span className="text-xs text-[#0e5c4a] font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                Live in Firestore /articles
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-[#f7f3ec] text-xs font-semibold uppercase tracking-wider text-[#5d6b64]">
                    <th className="py-3 px-4">Article</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Author</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c2b26]/5">
                  {!articles || articles.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-sm text-[#5d6b64]">
                        No articles in database.
                      </td>
                    </tr>
                  ) : (
                    articles.map((art) => (
                      <tr key={art.slug} className="hover:bg-[#0e5c4a]/5 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-[#1c2b26]">
                          <div className="flex items-center gap-3">
                            <img
                              src={art.cover}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                            />
                            <div>
                              <p className="line-clamp-1">{art.title}</p>
                              <span className="text-[11px] text-[#5d6b64] font-normal">{art.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs">
                          <span className="badge new">{art.category}</span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#5d6b64]">
                          {art.author}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#5d6b64]">
                          {art.date}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete "${art.title}" from Firebase?`)) {
                                deleteArticle(art.slug);
                              }
                            }}
                            className="text-stone-400 hover:text-red-700 text-xs font-semibold px-2 py-1 cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* QUICK UPDATES / CAMPS TAB */
        <div className="space-y-8">
          <form
            onSubmit={handlePublishPost}
            className="bg-[#fffdf9] p-6 sm:p-8 rounded-2xl border border-[#1c2b26]/10 shadow-xs space-y-4"
          >
            <div className="border-b border-stone-200 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1c2b26]">
                Write Clinic Announcement or Camp Notice
              </h3>
              <p className="text-xs text-[#5d6b64]">
                Published to Firestore <code className="text-[#0e5c4a] font-mono">/posts</code> collection.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                  Headline *
                </label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Free kids' dental camp this Sunday"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                  Category
                </label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
                >
                  <option value="updates">Clinic updates</option>
                  <option value="announcements">Announcements</option>
                  <option value="camps">Free Checkup Camps</option>
                  <option value="offers">Seasonal Offers</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                Featured Image
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {sampleImages.slice(0, 6).map((img) => (
                  <button
                    type="button"
                    key={img.path}
                    onClick={() => setPostImage(img.path)}
                    className={`chip text-xs py-1.5 px-3 cursor-pointer ${postImage === img.path ? 'on' : ''}`}
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                Update Details *
              </label>
              <textarea
                required
                rows={4}
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                placeholder="Type your announcement details here..."
                className="w-full p-4 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="btn-solid text-sm py-2.5 px-6 shadow-sm cursor-pointer"
              >
                Publish Update to Firebase →
              </button>
            </div>
          </form>

          {/* Published Updates Table */}
          <div className="bg-[#fffdf9] rounded-2xl border border-[#1c2b26]/10 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#1c2b26]/10 font-serif font-bold text-base text-[#1c2b26]">
              Published Clinic Updates ({posts.length})
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-[#f7f3ec] text-xs font-semibold uppercase tracking-wider text-[#5d6b64]">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c2b26]/5">
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-sm text-[#5d6b64]">
                        No clinic updates published yet.
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id} className="hover:bg-[#0e5c4a]/5 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-[#1c2b26]">
                          {post.title}
                        </td>
                        <td className="py-3.5 px-4 text-xs">
                          <span className="badge new">{post.category || 'update'}</span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#5d6b64]">
                          {new Date(post.created).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Delete this published clinic update?')) {
                                deletePost(post.id);
                              }
                            }}
                            className="text-stone-400 hover:text-red-700 text-xs font-semibold px-2 py-1 cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
