import React from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';

export const AdminStats: React.FC = () => {
  const { appointments, patients } = useClinicStore();

  // 7-day chart data
  const days: { key: string; label: string; count: number }[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const t = new Date(today);
    t.setDate(t.getDate() - i);
    const key = t.toISOString().slice(0, 10);
    const label = t.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
    days.push({ key, label, count: 0 });
  }

  appointments.forEach((a) => {
    const k = a.created.slice(0, 10);
    const found = days.find((d) => d.key === k);
    if (found) found.count++;
  });

  const maxCount = Math.max(...days.map((d) => d.count), 1);

  // Status split
  const statusCounts = {
    new: appointments.filter((a) => a.status === 'new').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    done: appointments.filter((a) => a.status === 'done').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length,
  };
  const total = appointments.length || 1;

  // Top services
  const svcCounts: { [svc: string]: number } = {};
  appointments.forEach((a) => {
    svcCounts[a.service] = (svcCounts[a.service] || 0) + 1;
  });
  const topServices = Object.keys(svcCounts)
    .sort((a, b) => svcCounts[b] - svcCounts[a])
    .slice(0, 5);

  const onlineCount = appointments.filter((a) => (a.source || 'online') === 'online').length;
  const deskCount = appointments.length - onlineCount;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1c2b26]">
          Booking Statistics & Analytics
        </h1>
        <p className="text-sm text-[#5d6b64] mt-0.5">
          Real-time appointment volume, treatment demand, and patient intake channels.
        </p>
      </div>

      {/* 4 Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#fffdf9] p-5 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
          <b className="font-serif text-3xl text-[#1c2b26] block">{appointments.length}</b>
          <span className="text-xs text-[#5d6b64] uppercase tracking-wider font-medium mt-1 block">
            Total bookings
          </span>
        </div>
        <div className="bg-[#fffdf9] p-5 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
          <b className="font-serif text-3xl text-[#0e5c4a] block">{onlineCount}</b>
          <span className="text-xs text-[#5d6b64] uppercase tracking-wider font-medium mt-1 block">
            Online web forms
          </span>
        </div>
        <div className="bg-[#fffdf9] p-5 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
          <b className="font-serif text-3xl text-[#c96f4a] block">{deskCount}</b>
          <span className="text-xs text-[#5d6b64] uppercase tracking-wider font-medium mt-1 block">
            Phone / Desk walk-ins
          </span>
        </div>
        <div className="bg-[#fffdf9] p-5 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
          <b className="font-serif text-3xl text-[#c79a45] block">{patients.length}</b>
          <span className="text-xs text-[#5d6b64] uppercase tracking-wider font-medium mt-1 block">
            Unique patients
          </span>
        </div>
      </div>

      {/* 7-Day Chart */}
      <div className="bg-[#fffdf9] p-6 sm:p-8 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
        <h2 className="font-serif text-xl font-bold text-[#1c2b26] mb-6">
          Bookings in the Last 7 Days
        </h2>
        <div className="flex items-end gap-3 sm:gap-6 h-56 pt-6 border-b border-stone-200">
          {days.map((d) => {
            const pct = Math.round((d.count / maxCount) * 100);
            return (
              <div key={d.key} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
                <span className="font-serif text-sm font-bold text-[#09382e]">
                  {d.count > 0 ? d.count : '—'}
                </span>
                <div
                  style={{ height: `${Math.max(pct, 6)}%` }}
                  className="w-full max-w-[50px] bg-gradient-to-t from-[#09382e] to-[#0e5c4a] rounded-t-lg transition-all duration-700 shadow-xs hover:brightness-110"
                  title={`${d.label}: ${d.count} appointments`}
                />
                <span className="text-[11px] text-[#5d6b64] whitespace-nowrap mt-2">
                  {d.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-[#fffdf9] p-6 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
          <h2 className="font-serif text-xl font-bold text-[#1c2b26] mb-5">
            Status Breakdown
          </h2>
          <div className="space-y-4">
            {(['new', 'confirmed', 'done', 'cancelled'] as const).map((st) => {
              const count = statusCounts[st];
              const pct = Math.round((count / total) * 100);
              return (
                <div key={st}>
                  <div className="flex justify-between items-center text-xs font-semibold uppercase mb-1">
                    <span className="text-[#1c2b26]">{st} ({count})</span>
                    <span className="text-[#5d6b64]">{pct}%</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        st === 'new'
                          ? 'bg-amber-500'
                          : st === 'confirmed'
                          ? 'bg-emerald-600'
                          : st === 'done'
                          ? 'bg-stone-500'
                          : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-[#fffdf9] p-6 rounded-2xl border border-[#1c2b26]/10 shadow-xs">
          <h2 className="font-serif text-xl font-bold text-[#1c2b26] mb-5">
            Top 5 Requested Services
          </h2>
          <div className="divide-y divide-[#1c2b26]/5 text-sm">
            {topServices.length === 0 ? (
              <p className="text-xs text-[#5d6b64] py-4">No service data recorded yet.</p>
            ) : (
              topServices.map((svc, idx) => (
                <div key={svc} className="py-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-xs text-[#0e5c4a] w-5">
                      #{idx + 1}
                    </span>
                    <span className="font-medium text-[#1c2b26]">{svc}</span>
                  </div>
                  <span className="bg-[#0e5c4a]/10 text-[#0e5c4a] font-bold text-xs px-2.5 py-0.5 rounded-full">
                    {svcCounts[svc]} booking{svcCounts[svc] === 1 ? '' : 's'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
