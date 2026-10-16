import React, { useState } from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';

export const AdminBanners: React.FC = () => {
  const { banners, addBanner, toggleBanner, deleteBanner, showToast } = useClinicStore();

  const [type, setType] = useState<'template' | 'image'>('template');
  const [template, setTemplate] = useState<'festival' | 'welcome'>('festival');
  const [title, setTitle] = useState('');
  const [sub, setSub] = useState('');
  const [cta, setCta] = useState('Book now');
  const [link, setLink] = useState('contact');
  const [imgData, setImgData] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1200000) {
      showToast('Image too large for browser storage (keep under ~1 MB)');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImgData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (banners.length >= 6) {
      showToast('Maximum banners reached. Delete or toggle one first.');
      return;
    }

    addBanner({
      type,
      template: type === 'template' ? template : undefined,
      title: title.trim() || 'Special Clinic Offer',
      sub: sub.trim(),
      cta: cta.trim() || 'Book now',
      link: link || 'contact',
      img: type === 'image' ? imgData : undefined,
      active: true,
    });

    setTitle('');
    setSub('');
    setCta('Book now');
    setImgData('');
  };

  const previewStyle = () => {
    if (type === 'image' && imgData) {
      return {
        backgroundImage: `linear-gradient(90deg, rgba(9,56,46,0.92), rgba(9,56,46,0.5)), url(${imgData})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    if (template === 'festival') {
      return {
        background: 'linear-gradient(100deg, #7a3b1f, #c96f4a)',
      };
    }
    return {
      background: 'linear-gradient(100deg, #09382e, #0e5c4a)',
    };
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1c2b26]">
          Homepage Banner Strip Manager
        </h1>
        <p className="text-sm text-[#5d6b64] mt-0.5">
          Announce seasonal dental camps, festival offers, or clinic updates right below the homepage hero.
        </p>
      </div>

      {/* Live Preview Card */}
      <div className="bg-[#fffdf9] p-6 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0e5c4a] block mb-2">
          Live Banner Preview
        </span>
        <div
          style={previewStyle()}
          className="rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all"
        >
          <div>
            <span className="text-amber-300 text-xs font-bold uppercase tracking-wider block mb-1">
              Special announcement
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-tight">
              {title || 'Your announcement headline appears here'}
            </h3>
            <p className="text-sm text-emerald-100/90 mt-1">
              {sub || 'Sub-line preview text describing dates, timing or details'}
            </p>
          </div>
          <button
            type="button"
            className="bg-white text-[#09382e] font-semibold text-sm px-6 py-2.5 rounded-full shadow pointer-events-none whitespace-nowrap"
          >
            {cta || 'Book now'} →
          </button>
        </div>
      </div>

      {/* Creator Form */}
      <form
        onSubmit={handleCreate}
        className="bg-[#fffdf9] p-6 sm:p-8 rounded-2xl border border-[#1c2b26]/10 shadow-xs space-y-4"
      >
        <h3 className="font-serif text-xl font-bold text-[#1c2b26]">
          Create New Banner
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
              Banner Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'template' | 'image')}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
            >
              <option value="template">Color Gradient Template</option>
              <option value="image">Custom Uploaded Image</option>
            </select>
          </div>

          {type === 'template' ? (
            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                Gradient Theme
              </label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value as 'festival' | 'welcome')}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
              >
                <option value="festival">Festival / Warm Amber & Terra</option>
                <option value="welcome">Signature Dark Teal & Pine</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
                Upload Image (PNG/JPG under 1MB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#0e5c4a] file:text-white hover:file:bg-[#09382e]"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Dussehra week: 20% off on scaling & cleaning"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
              Subtitle
            </label>
            <input
              type="text"
              value={sub}
              onChange={(e) => setSub(e.target.value)}
              placeholder="e.g. Valid till Sunday · Walk in or WhatsApp"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
              Button CTA Text
            </label>
            <input
              type="text"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              placeholder="Book now"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1">
              Target Link
            </label>
            <select
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
            >
              <option value="contact">Booking / Contact Page</option>
              <option value="services">Treatments Catalogue</option>
              <option value="blog">Clinic Journal</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="btn-solid text-sm py-2.5 px-6 shadow-sm cursor-pointer"
          >
            Add banner to homepage →
          </button>
        </div>
      </form>

      {/* Existing Banners Table */}
      <div className="bg-[#fffdf9] rounded-2xl border border-[#1c2b26]/10 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#1c2b26]/10 font-serif font-bold text-base text-[#1c2b26]">
          Current Banners ({banners.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#f7f3ec] text-xs font-semibold uppercase tracking-wider text-[#5d6b64]">
                <th className="py-3 px-4">Banner Details</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c2b26]/5">
              {banners.map((b) => (
                <tr key={b.id} className="hover:bg-[#0e5c4a]/5 transition-colors">
                  <td className="py-3.5 px-4">
                    <strong className="block text-[#1c2b26]">{b.title}</strong>
                    <span className="text-xs text-[#5d6b64]">{b.sub || 'No subtitle'}</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs capitalize text-[#5d6b64]">
                    {b.type === 'image' ? 'Image banner' : `${b.template} theme`}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleBanner(b.id)}
                      className={`text-xs font-bold px-3 py-1 rounded-full cursor-pointer transition-colors ${
                        b.active
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {b.active ? '● Live on site' : '○ Hidden'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this banner?')) {
                          deleteBanner(b.id);
                        }
                      }}
                      className="text-stone-400 hover:text-red-700 text-xs font-semibold px-2 py-1 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
