import React, { useState } from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { config, appointments } = useClinicStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingCount = appointments.filter((a) => a.status === 'new').length;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Topbar */}
      <div className="bg-[#09382e] text-[#e8f1ed] text-xs py-2 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span>{config.hours}</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a href={`tel:${config.phoneRaw}`} className="hover:text-white transition-colors">
              {config.phone}
            </a>
            <span className="opacity-40">·</span>
            <a
              href={`https://wa.me/${config.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-white transition-colors"
            >
              WhatsApp us
            </a>
            <span className="opacity-40">·</span>
            <button
              onClick={() => onNavigate('admin')}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 hover:bg-amber-400/30 transition-colors"
              title="Demo Admin Console"
            >
              <span>Admin Panel</span>
              {pendingCount > 0 && (
                <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="sticky top-0 z-50 bg-[#f7f3ec]/90 backdrop-blur-md border-b border-[#1c2b26]/10">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left text-xl font-serif font-bold text-[#1c2b26] cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
              <path
                d="M12 2C7 2 4 5.5 4 10c0 6 3 12 5 12 1.6 0 1.4-4 3-4s1.4 4 3 4c2 0 5-6 5-12 0-4.5-3-8-8-8z"
                fill="#0e5c4a"
              />
            </svg>
            <span>
              SmileCraft<b className="text-[#0e5c4a]">.</b>
            </span>
          </button>

          {/* Desktop Navlinks */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-7">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 text-sm font-medium transition-colors cursor-pointer ${
                    currentPage === item.id ? 'text-[#0e5c4a] font-semibold' : 'text-[#1c2b26] hover:text-[#0e5c4a]'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#0e5c4a] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className="btn-solid text-sm py-2.5 px-5 shadow-sm"
            >
              Book appointment
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1c2b26] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-[#1c2b26] transition-transform ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-[#1c2b26] transition-opacity ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-[#1c2b26] transition-transform ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#fffdf9] border-b border-[#1c2b26]/10 px-6 py-5 shadow-xl flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 text-base font-medium cursor-pointer ${
                  currentPage === item.id ? 'text-[#0e5c4a] font-semibold' : 'text-[#1c2b26]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-[#1c2b26]/10 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('contact')}
                className="btn-solid justify-center text-sm w-full py-3"
              >
                Book appointment
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="btn-ghost justify-center text-sm w-full py-2.5"
              >
                Admin Panel {pendingCount > 0 && `(${pendingCount} pending)`}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
