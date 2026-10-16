import React, { useState } from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';

export const AdminSettings: React.FC = () => {
  const { config, updateConfig } = useClinicStore();

  const [name, setName] = useState(config.name);
  const [phone, setPhone] = useState(config.phone);
  const [whatsapp, setWhatsapp] = useState(config.whatsapp);
  const [address, setAddress] = useState(config.address);
  const [hours, setHours] = useState(config.hours);
  const [mapQuery, setMapQuery] = useState(config.mapQuery || 'Veera Desai Road, Andheri West, Mumbai');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      name: name.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.replace(/\D/g, ''),
      address: address.trim(),
      hours: hours.trim(),
      mapQuery: mapQuery.trim(),
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1c2b26]">
          Clinic Settings
        </h1>
        <p className="text-sm text-[#5d6b64] mt-0.5">
          Changes here update the website topbar, footer, booking notices, and WhatsApp confirmation templates immediately.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#fffdf9] p-6 sm:p-8 rounded-2xl border border-[#1c2b26]/10 shadow-xs space-y-5"
      >
        <div>
          <label className="block text-xs font-semibold text-[#1c2b26] mb-1.5">
            Clinic Studio Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1.5">
              Contact Telephone
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1.5">
              WhatsApp Number (with country code, digits only)
            </label>
            <input
              type="text"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1c2b26] mb-1.5">
            Physical Clinic Address
          </label>
          <textarea
            required
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1c2b26] mb-1.5">
            Operating Timings
          </label>
          <input
            type="text"
            required
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1c2b26] mb-1.5">
            Google Maps Search Query
          </label>
          <input
            type="text"
            required
            value={mapQuery}
            onChange={(e) => setMapQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="btn-solid text-sm py-2.5 px-6 shadow-sm cursor-pointer"
          >
            Save clinic settings
          </button>
        </div>
      </form>
    </div>
  );
};
