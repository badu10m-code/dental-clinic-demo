import React from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';

interface AdminLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onExitAdmin: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onExitAdmin,
  children,
}) => {
  const { appointments, currentUser, isAdmin, loginWithGoogle, logout } = useClinicStore();
  const pendingCount = appointments.filter((a) => a.status === 'new').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'appointments', label: 'Appointments', icon: '🗓️', badge: pendingCount },
    { id: 'patients', label: 'Patients', icon: '👥' },
    { id: 'posts', label: 'Blog & updates', icon: '✍️' },
    { id: 'banners', label: 'Banners', icon: '📢' },
    { id: 'stats', label: 'Booking stats', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-[#f4f1ea] flex flex-col font-sans text-[#1c2b26]">
      {/* Firebase Cloud Status Bar */}
      <div className="bg-[#09382e] text-[#bfd6cd] text-xs font-medium py-2 px-6 flex items-center justify-between gap-4 flex-wrap border-b border-emerald-900/50 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
          <span className="font-semibold text-white tracking-wide">Firebase Firestore Active</span>
          <span className="text-emerald-300/70 hidden sm:inline text-[11px]">
            Region: asia-southeast1 · gen-lang-client-0494679383
          </span>
        </div>
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-emerald-100 text-xs font-medium truncate max-w-[180px]">
                {currentUser.email}
              </span>
              {isAdmin && (
                <span className="bg-[#c79a45] text-[#1c2b26] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                  Admin
                </span>
              )}
              <button
                onClick={logout}
                className="text-xs text-amber-200 hover:text-white underline cursor-pointer ml-1"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="bg-[#c79a45] hover:bg-[#d6aa57] text-[#1c2b26] font-semibold px-3 py-1 rounded text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>🔑</span>
              <span>Sign in with Google</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#09382e] text-[#cfe0d8] p-5 flex flex-col justify-between shrink-0">
          <div>
            {/* Brand */}
            <div className="flex items-center gap-2 mb-8 px-2">
              <span className="text-2xl">🦷</span>
              <div>
                <h2 className="font-serif text-lg font-bold text-white leading-tight">
                  SmileCraft
                </h2>
                <span className="text-[10px] tracking-widest text-[#9db8ae] uppercase block font-semibold">
                  Admin panel
                </span>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#0e5c4a] text-white shadow-xs font-semibold'
                        : 'text-[#cfe0d8] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge != null && item.badge > 0 && (
                      <span className="bg-[#c79a45] text-[#3a2c07] text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-8 mt-6 border-t border-white/10 space-y-4">
            <button
              onClick={onExitAdmin}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>View website</span>
              <span>↗</span>
            </button>
            <p className="text-[11px] text-[#7fa295] leading-relaxed px-1">
              Cloud sync enabled. Real-time Firebase Firestore database in asia-southeast1.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-10 max-w-6xl overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
