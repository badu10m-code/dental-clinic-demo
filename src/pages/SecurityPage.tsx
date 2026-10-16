import React from 'react';

interface SecurityPageProps {
  onNavigate: (page: string) => void;
}

export const SecurityPage: React.FC<SecurityPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12">
      <header className="max-w-4xl mx-auto px-6 mb-12">
        <p className="text-xs text-[#5d6b64] mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0e5c4a] cursor-pointer">
            Home
          </button>{' '}
          / Security
        </p>
        <p className="eyebrow">Security & Anti-hacking</p>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1c2b26] leading-tight">
          Security on this site, explained plainly.
        </h1>
        <p className="lede mt-4 text-base sm:text-lg">
          Most clinic websites have never thought about this page. We built this one to show what protection looks like, and to be honest about what a demo can and cannot do.
        </p>
      </header>

      <article className="max-w-3xl mx-auto px-6 space-y-8 text-stone-700 leading-relaxed text-sm sm:text-base">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1c2b26] mb-3">
            What protects every visitor
          </h2>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-2.5">
              <span className="text-[#0e5c4a] font-bold">✓</span>
              <div>
                <b className="text-[#1c2b26]">HTTPS everywhere.</b> All traffic is encrypted in transit. Nothing you type travels in readable form.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#0e5c4a] font-bold">✓</span>
              <div>
                <b className="text-[#1c2b26]">Content Security Policy.</b> Strict CSP blocks unauthorized injected scripts.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#0e5c4a] font-bold">✓</span>
              <div>
                <b className="text-[#1c2b26]">Input sanitisation.</b> All form input is validated and sanitized before being processed.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#0e5c4a] font-bold">✓</span>
              <div>
                <b className="text-[#1c2b26]">No third-party trackers.</b> No analytics pixels, no ad trackers, no fingerprinting.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#0e5c4a] font-bold">✓</span>
              <div>
                <b className="text-[#1c2b26]">External links hardened.</b> Outbound links carry <code className="bg-stone-200 px-1 rounded text-xs">rel="noopener"</code> to avoid manipulation.
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1c2b26] mb-2">
            How the admin panel is protected in the live build
          </h2>
          <p>
            The panel you can open freely here is a demonstration. In the production version the same panel sits behind a secure login with hashed credentials, session expiry, login-rate limiting, and all appointment data held server-side in an encrypted database with daily backups and audit logging.
          </p>
          <div className="mt-4 p-5 rounded-r-2xl border-l-4 border-[#c79a45] bg-[#fffdf9] text-xs sm:text-sm text-stone-700 italic">
            <b>Why there is no password in this demo:</b> the panel is open on purpose so you can test and explore every clinical feature without setup. Nothing entered in this demo leaves your browser, and the data is demonstration data.
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1c2b26] mb-2">
            If something looks wrong
          </h2>
          <p>
            Report anything unusual (a message claiming to be from us asking for money or OTPs) straight to the clinic phone listed in the footer. We will never ask you for an OTP, a UPI PIN, or a card number over phone or message.
          </p>
        </div>
      </article>
    </div>
  );
};
