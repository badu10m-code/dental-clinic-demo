import React, { useState } from 'react';

export interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'How do I book an appointment?',
    a: 'Fill the form on this page, WhatsApp us, or call between 10 AM and 8 PM. We confirm your slot within an hour of clinic time.',
  },
  {
    q: 'Do you take walk-ins?',
    a: 'Yes. We keep same-day slots aside for dental pain and emergencies, but calling ahead saves you waiting.',
  },
  {
    q: 'What does a first visit cost?',
    a: 'Checkup and consultation with a written plan is ₹500, and we adjust it against your treatment if you go ahead within 30 days.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'Cash, UPI (GPay, PhonePe, Paytm), all major cards, and EMI plans on treatment above ₹20,000 via Bajaj Finserv.',
  },
  {
    q: 'Is root canal treatment painful?',
    a: 'With modern anaesthesia and rotary instruments, most patients report pressure sensations only. Nervous patients can request sedation options during consultation.',
  },
  {
    q: 'Do you treat children?',
    a: 'Yes, with a paediatric-trained assistant and a kids’ corner in the waiting area. First visits focus on making the child comfortable.',
  },
  {
    q: 'Can I get treatment on Sunday?',
    a: 'Sundays are by appointment only, usually for working patients and emergencies. Book ahead on WhatsApp.',
  },
  {
    q: 'Do you accept insurance?',
    a: 'We provide itemised bills and receipts that most Indian insurers accept for reimbursement. Cashless dental cover is rare in India, so we help you document the claim instead.',
  },
  {
    q: 'How long does an implant take?',
    a: 'Placement takes one visit of about an hour. The crown follows after 3 to 4 months of healing, with reviews in between.',
  },
  {
    q: 'Where exactly is the clinic?',
    a: '302, Pearl Heights, Veera Desai Road, Andheri West, Mumbai 400053. Six minutes from D.N. Nagar metro station.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="border-t border-[#1c2b26]/10 divide-y divide-[#1c2b26]/10">
      {FAQS.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="py-2">
            <button
              onClick={() => toggle(idx)}
              className="w-full py-4 text-left font-serif text-lg text-[#1c2b26] flex justify-between items-center gap-4 cursor-pointer hover:text-[#0e5c4a] transition-colors"
            >
              <span>{item.q}</span>
              <span
                className={`text-[#0e5c4a] text-xl font-mono transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="pb-5 pr-8 text-[#5d6b64] text-sm leading-relaxed animate-fadeIn">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
