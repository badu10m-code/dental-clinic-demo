import React from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { config } = useClinicStore();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#09382e] text-[#cfe0d8] pt-16 pb-10 mt-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="md:col-span-1">
              <button
                onClick={() => onNavigate('home')}
                className="font-serif text-2xl font-bold text-white flex items-center gap-1.5 cursor-pointer text-left"
              >
                <span>SmileCraft</span>
                <span className="text-emerald-400">.</span>
              </button>
              <p className="text-[#9db8ae] text-sm mt-3 leading-relaxed">
                A specialist dental studio in Andheri West. Diagnosis first, written prices always, and treatment that respects your time.
              </p>
            </div>

            {/* Clinic Links */}
            <div>
              <h4 className="font-serif text-base font-semibold text-white mb-4">Clinic</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => onNavigate('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('doctors')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Doctors
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('gallery')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Gallery
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('blog')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Treatments & Pricing
                  </button>
                </li>
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="font-serif text-base font-semibold text-white mb-4">Help</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Book appointment
                  </button>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${config.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('security')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Security
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('privacy')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('admin')}
                    className="text-amber-300 hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    Admin Console ↗
                  </button>
                </li>
              </ul>
            </div>

            {/* Visit Us */}
            <div>
              <h4 className="font-serif text-base font-semibold text-white mb-4">Visit us</h4>
              <div className="space-y-3 text-sm">
                <p className="text-[#cfe0d8] leading-relaxed">{config.address}</p>
                <p>
                  <a
                    href={`tel:${config.phoneRaw}`}
                    className="text-white font-medium hover:underline"
                  >
                    {config.phone}
                  </a>
                </p>
                <p className="text-xs text-[#9db8ae]">{config.hours}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#9db8ae]">
            <span>© {currentYear} SmileCraft Dental Studio. All rights reserved.</span>
            <span>Made with care in Mumbai</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${config.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-6 bottom-6 z-40 w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-current">
          <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.3c1.9 1 4 1.6 6.2 1.6h.5c6.6 0 12-5.3 12-11.9S22.6 3 16 3zm5.9 16.9c-.3.8-1.7 1.6-2.3 1.6-.6.1-1.3.1-2.1-.1-.5-.2-1.1-.4-1.9-.7-3.3-1.4-5.4-4.7-5.6-4.9-.2-.2-1.3-1.8-1.3-3.4 0-1.6.8-2.4 1.1-2.7.3-.3.7-.4.9-.4h.7c.2 0 .5-.1.8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.3.7-.7.9-.5 1.2.7 1.2 1.6 2.1 2.7 2.7.3.2.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 2 .9 2.3 1.1.3.2.5.3.6.4.1.2.1.9-.2 1.8z" />
        </svg>
      </a>
    </>
  );
};
