import React, { useState } from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';

export const AdminPatients: React.FC = () => {
  const { patients, addPatient, removePatient } = useClinicStore();

  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  const filteredPatients = patients.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.phone.toLowerCase().includes(q) ||
      (p.note || '').toLowerCase().includes(q)
    );
  });

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || phone.replace(/\D/g, '').length < 10) return;

    addPatient({
      name: name.trim(),
      phone: phone.trim(),
      firstVisit: new Date().toISOString().slice(0, 10),
      visits: 1,
      note: note.trim(),
    });

    setName('');
    setPhone('');
    setNote('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1c2b26]">
          Patients Ledger
        </h1>
        <p className="text-sm text-[#5d6b64] mt-0.5">
          Directory of registered patients. Online bookings register here automatically.
        </p>
      </div>

      {/* Add Patient Card */}
      <div className="bg-[#fffdf9] p-6 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
        <h3 className="font-serif text-lg font-bold text-[#1c2b26] mb-3">
          Add New Patient File
        </h3>
        <form onSubmit={handleAddPatient} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1">Phone</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98..."
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1">Clinical note</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Sensitivity, implants"
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#0e5c4a]"
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn-solid text-xs py-2.5 px-5 w-full justify-center cursor-pointer"
            >
              Add patient
            </button>
          </div>
        </form>
      </div>

      {/* Search Input */}
      <div className="flex justify-between items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patients by name, phone or note..."
          className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm w-full max-w-md focus:outline-none focus:border-[#0e5c4a]"
        />
        <span className="text-xs font-semibold text-[#5d6b64] whitespace-nowrap">
          {filteredPatients.length} patient{filteredPatients.length === 1 ? '' : 's'} on record
        </span>
      </div>

      {/* Patients Table */}
      <div className="bg-[#fffdf9] rounded-2xl border border-[#1c2b26]/10 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#f7f3ec] border-b border-[#1c2b26]/10 text-xs font-semibold uppercase tracking-wider text-[#5d6b64]">
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">First Visit</th>
                <th className="py-3 px-4 text-center">Visits</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c2b26]/5">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-[#5d6b64]">
                    No patients match your search.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[#0e5c4a]/5 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#1c2b26]">
                      {p.name}
                    </td>
                    <td className="py-3.5 px-4 text-[#5d6b64] font-mono text-xs">
                      {p.phone}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#5d6b64]">
                      {p.firstVisit || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="bg-[#0e5c4a]/10 text-[#0e5c4a] font-bold text-xs px-2 py-0.5 rounded-full">
                        {p.visits || 1}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#5d6b64]">
                      {p.note || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/${p.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold px-2 py-1"
                        >
                          WhatsApp
                        </a>
                        <button
                          onClick={() => {
                            if (window.confirm(`Remove patient ${p.name} from records?`)) {
                              removePatient(idx);
                            }
                          }}
                          className="text-stone-400 hover:text-red-700 text-xs font-medium px-2 py-1 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
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
