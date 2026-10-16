import React, { useState } from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';

export const AdminPosts: React.FC = () => {
  const { posts, addPost, deletePost } = useClinicStore();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('updates');
  const [image, setImage] = useState('/assets/img/blog-kids.jpg');
  const [body, setBody] = useState('');

  const sampleImages = [
    { label: 'Kids Dentistry', path: '/assets/img/blog-kids.jpg' },
    { label: 'Clinic Chair', path: '/assets/img/clinic-chair.jpg' },
    { label: 'Sterilization Bay', path: '/assets/img/sterilization.jpg' },
    { label: 'Team', path: '/assets/img/doctors-duo.jpg' },
    { label: 'Whitening', path: '/assets/img/whitening.jpg' },
  ];

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3 || body.trim().length < 10) return;

    addPost({
      title: title.trim(),
      category,
      image,
      body: body.trim(),
    });

    setTitle('');
    setBody('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1c2b26]">
          Blog & Clinic Updates Manager
        </h1>
        <p className="text-sm text-[#5d6b64] mt-0.5">
          Publish clinic announcements, health camps, and doctor advisories directly to the public website.
        </p>
      </div>

      {/* Editor Form */}
      <form
        onSubmit={handlePublish}
        className="bg-[#fffdf9] p-6 sm:p-8 rounded-2xl border border-[#1c2b26]/10 shadow-xs space-y-4"
      >
        <h3 className="font-serif text-xl font-bold text-[#1c2b26]">
          Write New Update
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
              Headline *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Free kids' dental camp this Sunday"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
          <div className="flex flex-wrap gap-2">
            {sampleImages.map((img) => (
              <button
                type="button"
                key={img.path}
                onClick={() => setImage(img.path)}
                className={`chip text-xs py-1.5 px-3 ${image === img.path ? 'on' : ''}`}
              >
                {img.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
            Article / Announcement Content (separate paragraphs with blank lines) *
          </label>
          <textarea
            required
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type your announcement details here. It will immediately publish to the clinic journal..."
            className="w-full p-4 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="btn-solid text-sm py-2.5 px-6 shadow-sm cursor-pointer"
          >
            Publish to website →
          </button>
        </div>
      </form>

      {/* Published Updates Table */}
      <div className="bg-[#fffdf9] rounded-2xl border border-[#1c2b26]/10 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#1c2b26]/10 font-serif font-bold text-base text-[#1c2b26]">
          Published Updates ({posts.length})
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
                        onClick={() => {
                          if (window.confirm('Delete this published clinic update?')) {
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
  );
};
