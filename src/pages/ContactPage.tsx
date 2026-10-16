import React from 'react';
import { BookingForm } from '../components/booking/BookingForm';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { useClinicStore } from '../context/ClinicStoreContext';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { config } = useClinicStore();

  return (
    <div className="py-12">
      <header className="max-w-6xl mx-auto px-6 mb-16" id="book">
        <p className="text-xs text-[#5d6b64] mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0e5c4a] cursor-pointer">
            Home
          </button>{' '}
          / Contact
        </p>
        <p className="eyebrow">Book a visit</p>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1c2b26] max-w-3xl leading-tight">
          Tell us what hurts, or just say hello.
        </h1>
        <p className="lede mt-4 text-base sm:text-lg">
          Fill the form and we confirm your slot on WhatsApp within an hour of clinic time. In pain right now? Say so in the note; we keep same-day slots for emergencies.
        </p>
      </header>

      {/* Main Duo: Booking form + Location/Map card */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <BookingForm />
          </div>

          <div className="md:col-span-5 space-y-6">
            <div className="bg-[#fffdf9] p-6 sm:p-8 rounded-2xl border border-[#1c2b26]/10 shadow-sm space-y-4">
              <h3 className="font-serif text-2xl font-semibold text-[#1c2b26]">
                Visit us
              </h3>
              <p className="text-[#5d6b64] text-sm leading-relaxed">
                {config.address}
              </p>
              <div className="pt-2 border-t border-[#1c2b26]/10 space-y-2 text-sm">
                <p>
                  <strong className="text-[#1c2b26]">Phone: </strong>
                  <a href={`tel:${config.phoneRaw}`} className="text-[#0e5c4a] hover:underline font-medium">
                    {config.phone}
                  </a>
                </p>
                <p>
                  <strong className="text-[#1c2b26]">WhatsApp: </strong>
                  <a
                    href={`https://wa.me/${config.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    Message us directly
                  </a>
                </p>
                <p>
                  <strong className="text-[#1c2b26]">Hours: </strong>
                  <span className="text-[#5d6b64]">{config.hours}</span>
                </p>
                <p>
                  <strong className="text-[#1c2b26]">Parking: </strong>
                  <span className="text-[#5d6b64]">Free 2-wheeler parking inside building; paid 4-wheeler on the lane.</span>
                </p>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-[#1c2b26]/10">
              <iframe
                title="Map to SmileCraft Dental Studio"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(config.mapQuery)}&output=embed`}
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* For the little ones */}
      <section className="bg-[#fffdf9] py-16 px-6 border-y border-[#1c2b26]/10 mb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden aspect-4/3 shadow-md">
            <img
              src="/assets/img/kids-corner.jpg"
              alt="The kids' corner at SmileCraft: a wooden playhouse, toys and cartoons"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="eyebrow">For the little ones</p>
            <h2 className="font-serif text-3xl font-semibold text-[#1c2b26] mb-4">
              Kids get their own corner.
            </h2>
            <p className="text-[#5d6b64] text-sm sm:text-base leading-relaxed">
              A wooden playhouse, wooden toys and a screen playing cartoons, three steps from the chair. First visits are short, gentle and mostly about sitting in the chair and leaving happy.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <p className="eyebrow">Before your first visit</p>
        <h2 className="font-serif text-3xl font-semibold text-[#1c2b26] mb-8">
          Questions everyone asks.
        </h2>
        <FaqAccordion />
      </section>
    </div>
  );
};
