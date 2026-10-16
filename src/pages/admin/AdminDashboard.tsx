import React from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';
import { Appointment } from '../../types';

interface AdminDashboardProps {
  onSelectTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSelectTab }) => {
  const { appointments, patients, config } = useClinicStore();

  const todayStr = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekAgoStr = weekAgo.toISOString().slice(0, 10);

  const todayAppts = appointments.filter(
    (a) => a.date === todayStr && a.status !== 'cancelled'
  );

  const pendingCount = appointments.filter((a) => a.status === 'new').length;
  const weekCount = appointments.filter((a) => a.created.slice(0, 10) >= weekAgoStr).length;
  const patientsCount = patients.length;

  const createWhatsAppDraft = (appt: Appointment) => {
    const formattedDate = new Date(appt.date + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    const doctorPart =
      appt.doctor && appt.doctor !== 'Any dentist' ? ` with ${appt.doctor}` : '';
    return `Hello ${appt.name}, this is SmileCraft Dental Studio. Your appointment${doctorPart} is confirmed: ${appt.service} on ${formattedDate} at ${
      appt.slot || 'the agreed time'
    }. Reference ${appt.ref}. Please arrive 10 minutes early. Address: ${
      config.address
    }. Reply here to reschedule.`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1c2b26]">
          Good to see you.
        </h1>
        <p className="text-sm text-[#5d6b64] mt-1">
          Today at a glance, then everything one click away.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#fffdf9] p-5 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
          <b className="font-serif text-3xl text-[#09382e] block">{todayAppts.length}</b>
          <span className="text-xs text-[#5d6b64] uppercase tracking-wider font-medium mt-1 block">
            Today’s appointments
          </span>
        </div>
        <div className="bg-[#fffdf9] p-5 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
          <b className="font-serif text-3xl text-amber-700 block">{pendingCount}</b>
          <span className="text-xs text-[#5d6b64] uppercase tracking-wider font-medium mt-1 block">
            Awaiting confirmation
          </span>
        </div>
        <div className="bg-[#fffdf9] p-5 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
          <b className="font-serif text-3xl text-[#0e5c4a] block">{weekCount}</b>
          <span className="text-xs text-[#5d6b64] uppercase tracking-wider font-medium mt-1 block">
            Bookings this week
          </span>
        </div>
        <div className="bg-[#fffdf9] p-5 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
          <b className="font-serif text-3xl text-[#1c2b26] block">{patientsCount}</b>
          <span className="text-xs text-[#5d6b64] uppercase tracking-wider font-medium mt-1 block">
            Patients on file
          </span>
        </div>
      </div>

      {/* Today's Schedule Table */}
      <div className="bg-[#fffdf9] rounded-2xl border border-[#1c2b26]/10 shadow-xs p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-serif text-xl font-bold text-[#1c2b26]">
            Today’s schedule
          </h2>
          <button
            onClick={() => onSelectTab('appointments')}
            className="text-xs font-semibold text-[#0e5c4a] hover:underline cursor-pointer"
          >
            View all appointments →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#1c2b26]/10 text-xs font-semibold uppercase tracking-wider text-[#5d6b64]">
                <th className="py-3 px-3">Time</th>
                <th className="py-3 px-3">Patient</th>
                <th className="py-3 px-3">Service</th>
                <th className="py-3 px-3">Doctor</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Quick actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c2b26]/5">
              {todayAppts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-[#5d6b64]">
                    Nothing booked for today yet. New bookings from the website appear here immediately.
                  </td>
                </tr>
              ) : (
                todayAppts.map((appt) => {
                  const phoneDigits = appt.phone.replace(/\D/g, '');
                  const draftMsg = createWhatsAppDraft(appt);
                  return (
                    <tr key={appt.ref} className="hover:bg-[#0e5c4a]/5 transition-colors">
                      <td className="py-3.5 px-3 font-semibold text-[#0e5c4a]">
                        {appt.slot || '—'}
                      </td>
                      <td className="py-3.5 px-3">
                        <strong className="block text-[#1c2b26]">{appt.name}</strong>
                        <span className="text-xs text-[#5d6b64]">{appt.phone}</span>
                      </td>
                      <td className="py-3.5 px-3 text-[#1c2b26]">{appt.service}</td>
                      <td className="py-3.5 px-3 text-xs text-[#5d6b64]">
                        {appt.doctor || 'Any dentist'}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`badge ${appt.status}`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent(draftMsg)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25d366] text-white text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-emerald-600 transition-colors shadow-2xs"
                          >
                            WhatsApp
                          </a>
                          <a
                            href={`tel:${appt.phone.replace(/\s+/g, '')}`}
                            className="bg-white border border-[#1c2b26]/20 text-[#1c2b26] hover:border-[#0e5c4a] text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors"
                          >
                            Call
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-[#fffdf9] rounded-2xl border border-[#1c2b26]/10 shadow-xs p-6">
        <h2 className="font-serif text-xl font-bold text-[#1c2b26] mb-4">
          Quick actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onSelectTab('appointments')}
            className="p-4 rounded-xl border border-[#1c2b26]/10 hover:border-[#0e5c4a] bg-white flex items-center justify-between text-left group transition-all cursor-pointer"
          >
            <div>
              <span className="font-semibold text-sm text-[#1c2b26] group-hover:text-[#0e5c4a] block">
                Confirm appointments and send WhatsApp drafts
              </span>
              <span className="text-xs text-[#5d6b64]">
                {pendingCount} pending approval
              </span>
            </div>
            <span className="text-[#0e5c4a] font-bold text-lg group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>

          <button
            onClick={() => onSelectTab('banners')}
            className="p-4 rounded-xl border border-[#1c2b26]/10 hover:border-[#0e5c4a] bg-white flex items-center justify-between text-left group transition-all cursor-pointer"
          >
            <div>
              <span className="font-semibold text-sm text-[#1c2b26] group-hover:text-[#0e5c4a] block">
                Put a new offer banner on the homepage
              </span>
              <span className="text-xs text-[#5d6b64]">
                Seasonal discounts, updates, alerts
              </span>
            </div>
            <span className="text-[#0e5c4a] font-bold text-lg group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>

          <button
            onClick={() => onSelectTab('posts')}
            className="p-4 rounded-xl border border-[#1c2b26]/10 hover:border-[#0e5c4a] bg-white flex items-center justify-between text-left group transition-all cursor-pointer"
          >
            <div>
              <span className="font-semibold text-sm text-[#1c2b26] group-hover:text-[#0e5c4a] block">
                Write a blog post or clinic update
              </span>
              <span className="text-xs text-[#5d6b64]">
                Publish articles directly to the website
              </span>
            </div>
            <span className="text-[#0e5c4a] font-bold text-lg group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>

          <button
            onClick={() => onSelectTab('stats')}
            className="p-4 rounded-xl border border-[#1c2b26]/10 hover:border-[#0e5c4a] bg-white flex items-center justify-between text-left group transition-all cursor-pointer"
          >
            <div>
              <span className="font-semibold text-sm text-[#1c2b26] group-hover:text-[#0e5c4a] block">
                See the last 7 days of bookings
              </span>
              <span className="text-xs text-[#5d6b64]">
                Analyze popular treatments & channels
              </span>
            </div>
            <span className="text-[#0e5c4a] font-bold text-lg group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
