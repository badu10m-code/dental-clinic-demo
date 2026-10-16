import React from 'react';
import { useClinicStore } from '../context/ClinicStoreContext';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  const { config } = useClinicStore();

  return (
    <div className="py-12">
      <header className="max-w-4xl mx-auto px-6 mb-12">
        <p className="text-xs text-[#5d6b64] mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0e5c4a] cursor-pointer">
            Home
          </button>{' '}
          / Privacy
        </p>
        <p className="eyebrow">Privacy policy</p>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1c2b26] leading-tight">
          What we collect, and what we never do.
        </h1>
        <p className="lede mt-4 text-base sm:text-lg">
          Short version: your name and phone number, used only to confirm your appointment. Nothing else, sold to no one, kept no longer than needed.
        </p>
      </header>

      <article className="max-w-3xl mx-auto px-6 space-y-8 text-stone-700 leading-relaxed text-sm sm:text-base">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1c2b26] mb-2">What we collect</h2>
          <p>
            When you book through the form, we collect your name, phone number, the service you need, your preferred date and time, and any note you choose to add. That is the complete list.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1c2b26] mb-2">How it is used</h2>
          <p>
            Only to confirm and manage your appointment. The clinic team sees it to call or message you about your slot. We do not send marketing messages, we do not share your number with third parties, and we do not add you to any broadcast list.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1c2b26] mb-2">How it is stored</h2>
          <p>
            This is a demonstration website. Bookings made here are stored only in your own browser (localStorage) and never leave your device. On the live clinic version, appointment data sits in an encrypted database accessible only to clinic staff, with HTTPS everywhere.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1c2b26] mb-2">Security measures in place</h2>
          <ul className="list-disc pl-5 space-y-2 text-stone-600">
            <li>HTTPS-only delivery with modern TLS</li>
            <li>A strict Content Security Policy that blocks injected scripts</li>
            <li>All form input is sanitised before display, closing common injection attacks</li>
            <li>No third-party tracking, analytics or advertising scripts on any page</li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1c2b26] mb-2">Your rights</h2>
          <p>
            Ask us any time for the information we hold about you, ask us to correct it, or ask us to delete it. One message on WhatsApp is enough; we act on it the same day.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1c2b26] mb-2">Children</h2>
          <p>
            Children’s appointments are booked by a parent or guardian. We do not knowingly collect information directly from children.
          </p>
        </div>

        <p className="text-xs text-[#5d6b64] pt-6 border-t border-[#1c2b26]/10">
          Last updated: October 2026. Questions about this policy:{' '}
          <a
            href={`https://wa.me/${config.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0e5c4a] font-semibold hover:underline"
          >
            message us on WhatsApp
          </a>
          .
        </p>
      </article>
    </div>
  );
};
