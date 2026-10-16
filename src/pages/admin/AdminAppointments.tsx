import React, { useState } from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';
import { Appointment, AppointmentStatus } from '../../types';

export const AdminAppointments: React.FC = () => {
  const {
    appointments,
    updateAppointmentStatus,
    updateAppointmentSlot,
    deleteAppointment,
    addAppointment,
    config,
  } = useClinicStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [dateMode, setDateMode] = useState<'all' | 'today' | 'pick'>('all');
  const [pickedDate, setPickedDate] = useState(() => new Date().toISOString().slice(0, 10));

  const [expandedDraftRef, setExpandedDraftRef] = useState<string | null>(null);
  const [draftCustomText, setDraftCustomText] = useState<{ [ref: string]: string }>({});
  const [expandedTimeRef, setExpandedTimeRef] = useState<string | null>(null);
  const [customTimeInput, setCustomTimeInput] = useState<{ [ref: string]: string }>({});

  const [showAddDeskForm, setShowAddDeskForm] = useState(false);
  const [deskName, setDeskName] = useState('');
  const [deskPhone, setDeskPhone] = useState('');
  const [deskService, setDeskService] = useState('Checkup & consultation');
  const [deskDoctor, setDeskDoctor] = useState('Any dentist');
  const [deskDate, setDeskDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [deskSlot, setDeskSlot] = useState('11:00 AM');
  const [deskNote, setDeskNote] = useState('');

  const todayStr = new Date().toISOString().slice(0, 10);
  const standardSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '5:30 PM', '7:30 PM'];

  const servicesList = [
    'Checkup & consultation',
    'Cleaning & polishing',
    'Root Canal Treatment',
    'Dental Implant Consultation',
    'Braces / Clear Aligners',
    'Teeth Whitening',
    'Crowns & Bridges',
    'Kids Dentistry',
    'Gum Treatment',
    'Wisdom Tooth Extraction',
    'Tooth pain / emergency',
  ];

  // Filtering
  const filteredAppointments = appointments.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (doctorFilter !== 'all' && (item.doctor || 'Any dentist') !== doctorFilter) return false;

    if (dateMode === 'today' && item.date !== todayStr) return false;
    if (dateMode === 'pick' && item.date !== pickedDate) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const combined = `${item.name} ${item.phone} ${item.ref} ${item.service} ${item.doctor}`.toLowerCase();
      if (!combined.includes(q)) return false;
    }

    return true;
  });

  const getWhatsAppDraft = (appt: Appointment) => {
    if (draftCustomText[appt.ref]) {
      return draftCustomText[appt.ref];
    }
    const formattedDate = new Date(appt.date + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    const doctorClause =
      appt.doctor && appt.doctor !== 'Any dentist' ? ` with ${appt.doctor}` : '';

    return `Hello ${appt.name}, this is SmileCraft Dental Studio. Your appointment${doctorClause} is confirmed: ${appt.service} on ${formattedDate} at ${
      appt.slot || 'the agreed time'
    }. Reference ${appt.ref}. Please arrive 10 minutes early and bring any previous X-rays or prescriptions. Address: ${
      config.address
    }. Reply here if you need to reschedule.`;
  };

  const handleNextStatus = (appt: Appointment) => {
    let next: AppointmentStatus = 'confirmed';
    if (appt.status === 'new') next = 'confirmed';
    else if (appt.status === 'confirmed') next = 'done';
    else return;

    updateAppointmentStatus(appt.ref, next);
  };

  const handleDeskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deskName.trim() || !deskPhone.trim()) return;

    addAppointment({
      name: deskName.trim(),
      phone: deskPhone.trim(),
      service: deskService,
      doctor: deskDoctor,
      date: deskDate,
      slot: deskSlot || 'Any open slot',
      note: deskNote.trim(),
      source: 'call',
      status: 'new',
    });

    setDeskName('');
    setDeskPhone('');
    setDeskNote('');
    setShowAddDeskForm(false);
  };

  const handleExportCSV = () => {
    const headers = ['Ref', 'Name', 'Phone', 'Service', 'Doctor', 'Date', 'Slot', 'Status', 'Source', 'Note'];
    const rows = appointments.map((a) => [
      a.ref,
      a.name,
      a.phone,
      a.service,
      a.doctor || '',
      a.date,
      a.slot || '',
      a.status,
      a.source || 'online',
      (a.note || '').replace(/[\n\r,]/g, ' '),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'smilecraft-appointments.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1c2b26]">
            Appointments Manager
          </h1>
          <p className="text-sm text-[#5d6b64] mt-0.5">
            Filter, advance status, adjust time slots, and dispatch WhatsApp confirmations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddDeskForm(!showAddDeskForm)}
            className="btn-solid text-xs py-2.5 px-4 cursor-pointer"
          >
            {showAddDeskForm ? 'Close Desk Form' : '+ Add Walk-in / Call'}
          </button>
          <button
            onClick={handleExportCSV}
            className="btn-ghost text-xs py-2.5 px-4 bg-white cursor-pointer"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Desk Booking Form */}
      {showAddDeskForm && (
        <form
          onSubmit={handleDeskSubmit}
          className="bg-white p-6 rounded-2xl border border-[#0e5c4a] shadow-md space-y-4 animate-fadeIn"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-serif text-lg font-bold text-[#09382e]">
              Book Appointment from the Desk (Walk-in / Phone Call)
            </h3>
            <button
              type="button"
              onClick={() => setShowAddDeskForm(false)}
              className="text-stone-400 hover:text-stone-600 font-bold"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">Patient name</label>
              <input
                type="text"
                required
                value={deskName}
                onChange={(e) => setDeskName(e.target.value)}
                placeholder="Patient Full Name"
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-[#0e5c4a]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">Phone number</label>
              <input
                type="tel"
                required
                value={deskPhone}
                onChange={(e) => setDeskPhone(e.target.value)}
                placeholder="+91 98..."
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-[#0e5c4a]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">Service</label>
              <select
                value={deskService}
                onChange={(e) => setDeskService(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-[#0e5c4a]"
              >
                {servicesList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">Doctor</label>
              <select
                value={deskDoctor}
                onChange={(e) => setDeskDoctor(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-[#0e5c4a]"
              >
                <option value="Any dentist">Any dentist</option>
                <option value="Dr. Ananya Sharma">Dr. Ananya Sharma, MDS</option>
                <option value="Dr. Rohan Mehta">Dr. Rohan Mehta, MDS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">Date</label>
              <input
                type="date"
                required
                value={deskDate}
                onChange={(e) => setDeskDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-[#0e5c4a]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1c2b26] mb-1">Time slot</label>
              <select
                value={deskSlot}
                onChange={(e) => setDeskSlot(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-[#0e5c4a]"
              >
                {standardSlots.map((sl) => (
                  <option key={sl} value={sl}>
                    {sl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c2b26] mb-1">Desk notes</label>
            <input
              type="text"
              value={deskNote}
              onChange={(e) => setDeskNote(e.target.value)}
              placeholder="Referred by Dr. ..., emergency toothache, etc."
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-[#0e5c4a]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddDeskForm(false)}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button type="submit" className="btn-solid text-xs py-2 px-5 cursor-pointer">
              Save Appointment
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-[#fffdf9] p-4 rounded-2xl border border-[#1c2b26]/10 shadow-xs flex flex-wrap gap-3 items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search patient, phone, ref, service..."
          className="px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm text-[#1c2b26] focus:outline-none focus:border-[#0e5c4a] grow min-w-[200px]"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm text-[#1c2b26] focus:outline-none"
        >
          <option value="all">All statuses</option>
          <option value="new">New (Awaiting)</option>
          <option value="confirmed">Confirmed</option>
          <option value="done">Done / Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm text-[#1c2b26] focus:outline-none"
        >
          <option value="all">All doctors</option>
          <option value="Any dentist">Any dentist</option>
          <option value="Dr. Ananya Sharma">Dr. Ananya Sharma</option>
          <option value="Dr. Rohan Mehta">Dr. Rohan Mehta</option>
        </select>

        <select
          value={dateMode}
          onChange={(e) => setDateMode(e.target.value as 'all' | 'today' | 'pick')}
          className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm text-[#1c2b26] focus:outline-none"
        >
          <option value="all">All dates</option>
          <option value="today">Today only</option>
          <option value="pick">Choose date</option>
        </select>

        {dateMode === 'pick' && (
          <input
            type="date"
            value={pickedDate}
            onChange={(e) => setPickedDate(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm text-[#1c2b26] focus:outline-none"
          />
        )}
      </div>

      {/* Appointments Table */}
      <div className="bg-[#fffdf9] rounded-2xl border border-[#1c2b26]/10 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#f7f3ec] border-b border-[#1c2b26]/10 text-xs font-semibold uppercase tracking-wider text-[#5d6b64]">
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Doctor</th>
                <th className="py-3 px-4">Date & Slot</th>
                <th className="py-3 px-4">Ref</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c2b26]/5">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-[#5d6b64]">
                    No appointments match your filters.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appt) => {
                  const phoneDigits = appt.phone.replace(/\D/g, '');
                  const currentDraft = getWhatsAppDraft(appt);
                  const isDraftOpen = expandedDraftRef === appt.ref;
                  const isTimeOpen = expandedTimeRef === appt.ref;

                  return (
                    <React.Fragment key={appt.ref}>
                      <tr className="hover:bg-[#0e5c4a]/5 transition-colors">
                        <td className="py-3.5 px-4">
                          <strong className="block text-[#1c2b26]">{appt.name}</strong>
                          <span className="text-xs text-[#5d6b64]">{appt.phone}</span>
                          <div>
                            <span className="badge src">
                              {appt.source === 'call' ? 'Desk / Call' : 'Online'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#1c2b26]">
                          {appt.service}
                          {appt.note && (
                            <p className="text-xs text-stone-500 italic mt-0.5 line-clamp-1">
                              Note: {appt.note}
                            </p>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#5d6b64]">
                          {appt.doctor || 'Any dentist'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-[#1c2b26]">{appt.date}</span>
                          <span className="block text-xs font-semibold text-[#0e5c4a]">
                            {appt.slot || 'Any slot'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-[#5d6b64]">
                          {appt.ref}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`badge ${appt.status}`}>{appt.status}</span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5 flex-wrap">
                            <button
                              onClick={() => {
                                setExpandedDraftRef(isDraftOpen ? null : appt.ref);
                                setExpandedTimeRef(null);
                              }}
                              className="bg-[#25d366] text-white hover:bg-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                            >
                              WhatsApp
                            </button>

                            <button
                              onClick={() => {
                                setExpandedTimeRef(isTimeOpen ? null : appt.ref);
                                setExpandedDraftRef(null);
                              }}
                              className="bg-white border border-stone-200 hover:border-[#0e5c4a] text-[#1c2b26] text-xs font-semibold px-2 py-1 rounded-lg transition-colors cursor-pointer"
                            >
                              Set time
                            </button>

                            {appt.status !== 'done' && appt.status !== 'cancelled' && (
                              <button
                                onClick={() => handleNextStatus(appt)}
                                className="bg-[#0e5c4a] text-white hover:bg-[#09382e] text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                              >
                                {appt.status === 'new' ? 'Confirm' : 'Mark done'}
                              </button>
                            )}

                            <a
                              href={`tel:${appt.phone.replace(/\s+/g, '')}`}
                              className="bg-white border border-stone-200 text-[#1c2b26] text-xs font-semibold px-2 py-1 rounded-lg hover:border-[#0e5c4a]"
                            >
                              Call
                            </a>

                            {appt.status !== 'cancelled' && (
                              <button
                                onClick={() => updateAppointmentStatus(appt.ref, 'cancelled')}
                                className="text-red-600 hover:text-red-800 text-xs font-medium px-1.5 py-1 cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}

                            <button
                              onClick={() => {
                                if (window.confirm('Delete this appointment record?')) {
                                  deleteAppointment(appt.ref);
                                }
                              }}
                              className="text-stone-400 hover:text-red-700 text-xs px-1 cursor-pointer"
                              title="Delete permanently"
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable WhatsApp Draft Box */}
                      {isDraftOpen && (
                        <tr>
                          <td colSpan={7} className="bg-[#f6f9f7] p-4 border-b border-[#0e5c4a]/20">
                            <div className="max-w-2xl mx-auto space-y-3">
                              <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-[#09382e] uppercase tracking-wider">
                                  WhatsApp confirmation draft (edit text before sending):
                                </label>
                                <button
                                  onClick={() => setExpandedDraftRef(null)}
                                  className="text-xs text-stone-500 hover:text-stone-800"
                                >
                                  Close
                                </button>
                              </div>
                              <textarea
                                value={currentDraft}
                                onChange={(e) =>
                                  setDraftCustomText({
                                    ...draftCustomText,
                                    [appt.ref]: e.target.value,
                                  })
                                }
                                rows={3}
                                className="w-full p-3 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white font-sans focus:outline-none focus:border-[#0e5c4a]"
                              />
                              <div className="flex justify-end gap-3">
                                <a
                                  href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent(currentDraft)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-[#25d366] text-white hover:bg-emerald-600 text-xs font-bold px-4 py-2 rounded-lg shadow-xs inline-flex items-center gap-1.5"
                                >
                                  <span>Open in WhatsApp</span>
                                  <span>↗</span>
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* Expandable Time Slot Setting Box */}
                      {isTimeOpen && (
                        <tr>
                          <td colSpan={7} className="bg-[#fdfaf3] p-4 border-b border-amber-300/40">
                            <div className="max-w-2xl mx-auto space-y-3">
                              <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-[#09382e] uppercase tracking-wider">
                                  Fix exact time slot for {appt.name}:
                                </label>
                                <button
                                  onClick={() => setExpandedTimeRef(null)}
                                  className="text-xs text-stone-500 hover:text-stone-800"
                                >
                                  Close
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {standardSlots.map((s) => (
                                  <button
                                    key={s}
                                    onClick={() => {
                                      updateAppointmentSlot(appt.ref, s);
                                      setExpandedTimeRef(null);
                                    }}
                                    className={`chip text-xs py-1.5 px-3 ${
                                      appt.slot === s ? 'on' : ''
                                    }`}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                              <div className="flex items-center gap-2 pt-2">
                                <span className="text-xs text-stone-600">Or custom time:</span>
                                <input
                                  type="time"
                                  value={customTimeInput[appt.ref] || ''}
                                  onChange={(e) =>
                                    setCustomTimeInput({
                                      ...customTimeInput,
                                      [appt.ref]: e.target.value,
                                    })
                                  }
                                  className="px-2 py-1 rounded border border-stone-300 text-xs bg-white"
                                />
                                <button
                                  onClick={() => {
                                    const val = customTimeInput[appt.ref];
                                    if (val) {
                                      const [h, m] = val.split(':');
                                      let hour = parseInt(h, 10);
                                      const ampm = hour >= 12 ? 'PM' : 'AM';
                                      hour = hour % 12 || 12;
                                      const formatted = `${hour}:${m} ${ampm}`;
                                      updateAppointmentSlot(appt.ref, formatted);
                                      setExpandedTimeRef(null);
                                    }
                                  }}
                                  className="btn-solid text-xs py-1.5 px-3"
                                >
                                  Save time
                                </button>
                                <button
                                  onClick={() => {
                                    updateAppointmentSlot(appt.ref, 'Any open slot');
                                    setExpandedTimeRef(null);
                                  }}
                                  className="text-xs text-stone-500 hover:underline ml-2"
                                >
                                  Clear to "Any open slot"
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
