import React, { useState } from 'react';
import { useClinicStore } from '../../context/ClinicStoreContext';
import { Appointment } from '../../types';

interface BookingFormProps {
  initialDoctor?: string;
  initialService?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialDoctor = 'Any dentist',
  initialService = '',
}) => {
  const { appointments, addAppointment, config } = useClinicStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService);
  const [date, setDate] = useState(() => {
    // Default to tomorrow
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [slot, setSlot] = useState('Any open slot');
  const [doctor, setDoctor] = useState(initialDoctor);
  const [note, setNote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);

  const slotOptions = [
    '10:00 AM',
    '12:00 PM',
    '2:00 PM',
    '5:30 PM',
    '7:30 PM',
    'Any open slot',
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const n = name.trim();
    const p = phone.trim();
    const digits = p.replace(/\D/g, '');

    if (n.length < 2) {
      setErrorMessage('Please enter your full name (at least 2 letters).');
      return;
    }
    if (digits.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!service) {
      setErrorMessage('Please select a dental service or checkup.');
      return;
    }
    if (!date) {
      setErrorMessage('Please select your preferred appointment date.');
      return;
    }

    // Check duplicate
    const dupe = appointments.some(
      (a) =>
        a.phone.replace(/\D/g, '') === digits &&
        a.date === date &&
        a.status !== 'cancelled'
    );

    if (dupe) {
      setErrorMessage(
        'An appointment with this phone number is already booked for that date. Call us if you need to adjust it.'
      );
      return;
    }

    const created = addAppointment({
      name: n,
      phone: p,
      service,
      doctor: doctor || 'Any dentist',
      date,
      slot: slot || 'Any open slot',
      note: note.trim(),
      source: 'online',
      status: 'new',
    });

    setConfirmedAppt(created);
  };

  const handleReset = () => {
    setConfirmedAppt(null);
    setName('');
    setPhone('');
    setNote('');
  };

  if (confirmedAppt) {
    const formattedDate = new Date(confirmedAppt.date + 'T00:00:00').toLocaleDateString(
      'en-IN',
      { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    );

    const waDraft = `Hello SmileCraft, I just requested an appointment online: ${confirmedAppt.service} on ${formattedDate} (${confirmedAppt.slot}). Reference: ${confirmedAppt.ref}. My name: ${confirmedAppt.name}.`;

    return (
      <div className="bg-[#0e5c4a]/5 border border-[#0e5c4a] rounded-2xl p-8 sm:p-10 shadow-sm animate-fadeIn">
        <div className="flex items-center gap-3 text-[#09382e] mb-3">
          <div className="w-8 h-8 rounded-full bg-[#0e5c4a] text-white flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <h3 className="font-serif text-2xl font-bold">Request received</h3>
        </div>

        <p className="text-gray-700 font-medium">
          Your booking reference:{' '}
          <span className="font-mono font-bold text-[#0e5c4a] tracking-wider text-lg">
            {confirmedAppt.ref}
          </span>
        </p>

        <div className="mt-4 p-4 rounded-xl bg-white border border-[#1c2b26]/10 text-sm space-y-1.5">
          <p className="font-medium text-[#1c2b26]">{confirmedAppt.service}</p>
          <p className="text-[#5d6b64]">
            {formattedDate} · {confirmedAppt.slot} · {confirmedAppt.doctor}
          </p>
          <p className="text-xs text-[#5d6b64]">Patient: {confirmedAppt.name} ({confirmedAppt.phone})</p>
        </div>

        <p className="mt-5 text-sm text-[#5d6b64] leading-relaxed">
          We will review your schedule and confirm your exact slot on WhatsApp within an hour of clinic opening.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <a
            href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(waDraft)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid text-sm py-3 px-6 shadow-md"
          >
            Message on WhatsApp now →
          </a>
          <button
            onClick={handleReset}
            className="btn-ghost text-sm py-3 px-6 cursor-pointer"
          >
            Book another appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-[#fffdf9] p-6 sm:p-8 rounded-2xl border border-[#1c2b26]/10 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold tracking-wider text-[#1c2b26] mb-1.5">
            Your name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            className="w-full px-4 py-3 rounded-xl border border-[#1c2b26]/15 bg-white text-sm text-[#1c2b26] focus:outline-none focus:border-[#0e5c4a] focus:ring-2 focus:ring-[#0e5c4a]/10"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-wider text-[#1c2b26] mb-1.5">
            Phone (WhatsApp preferred) *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl border border-[#1c2b26]/15 bg-white text-sm text-[#1c2b26] focus:outline-none focus:border-[#0e5c4a] focus:ring-2 focus:ring-[#0e5c4a]/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold tracking-wider text-[#1c2b26] mb-1.5">
            What do you need? *
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-[#1c2b26]/15 bg-white text-sm text-[#1c2b26] focus:outline-none focus:border-[#0e5c4a] focus:ring-2 focus:ring-[#0e5c4a]/10"
          >
            <option value="">Choose a service</option>
            {servicesList.map((svc) => (
              <option key={svc} value={svc}>
                {svc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-wider text-[#1c2b26] mb-1.5">
            Preferred date *
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#1c2b26]/15 bg-white text-sm text-[#1c2b26] focus:outline-none focus:border-[#0e5c4a] focus:ring-2 focus:ring-[#0e5c4a]/10"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-wider text-[#1c2b26] mb-2">
          Preferred time slot
        </label>
        <div className="flex flex-wrap gap-2">
          {slotOptions.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setSlot(s)}
              className={`chip text-xs py-2 px-4 ${slot === s ? 'on' : ''}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold tracking-wider text-[#1c2b26] mb-1.5">
            Preferred dentist
          </label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#1c2b26]/15 bg-white text-sm text-[#1c2b26] focus:outline-none focus:border-[#0e5c4a] focus:ring-2 focus:ring-[#0e5c4a]/10"
          >
            <option value="Any dentist">Any dentist (Fastest available)</option>
            <option value="Dr. Ananya Sharma">Dr. Ananya Sharma, MDS (Root Canals, Crowns)</option>
            <option value="Dr. Rohan Mehta">Dr. Rohan Mehta, MDS (Implants, Aligners)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-wider text-[#1c2b26] mb-1.5">
            Anything we should know? (optional)
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Pain since yesterday, nervousness, insurance..."
            className="w-full px-4 py-3 rounded-xl border border-[#1c2b26]/15 bg-white text-sm text-[#1c2b26] focus:outline-none focus:border-[#0e5c4a] focus:ring-2 focus:ring-[#0e5c4a]/10"
          />
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
          {errorMessage}
        </div>
      )}

      <p className="text-xs text-[#5d6b64] italic">
        We use your number only to coordinate this appointment. No promotional SMS, ever.
      </p>

      <button
        type="submit"
        className="btn-solid w-full justify-center text-sm py-3.5 shadow-md cursor-pointer"
      >
        Request appointment →
      </button>
    </form>
  );
};
