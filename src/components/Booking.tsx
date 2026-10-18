import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Calendar, CalendarCheck, Users, BedDouble, MessageSquare, User, Mail, Phone, Minus, Plus } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useToast } from '@/context/ToastContext';
import { formatCurrency, rooms } from '@/lib/data';
import { Reveal } from '@/components/Reveal';

const suiteOptions = [
  ...rooms.map((room) => ({ value: room.id, label: room.name })),
  { value: 'not-sure', label: 'Not sure yet' },
];

export function Booking() {
  const { booking, setField, nights, totalGuests, estimatedTotal, suitePrice } = useBooking();
  const { showToast } = useToast();
  const [success, setSuccess] = useState(false);
  const reduced = useReducedMotion();
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === booking.selectedSuite),
    [booking.selectedSuite],
  );

  const suiteName = booking.selectedSuite
    ? selectedRoom?.name ?? 'Not sure yet'
    : 'Not selected';

  const validate = (): string | null => {
    if (!booking.fullName.trim()) return 'Please enter your full name.';
    if (!booking.email.trim()) return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) return 'Please enter a valid email address.';
    if (!booking.phone.trim()) return 'Please enter your phone number.';
    if (!booking.checkIn) return 'Please select a check-in date.';
    if (!booking.checkOut) return 'Please select a check-out date.';
    if (booking.checkIn < today) return 'Check-in cannot be in the past.';
    if (new Date(booking.checkOut) <= new Date(booking.checkIn)) return 'Check-out must be after check-in.';
    if (selectedRoom && totalGuests > selectedRoom.guests * booking.rooms) {
      return `The selected suite accommodates up to ${selectedRoom.guests * booking.rooms} guests across ${booking.rooms} room${booking.rooms === 1 ? '' : 's'}.`;
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      showToast('error', 'Please Review Your Details', error);
      return;
    }
    setSuccess(true);
    showToast('info', 'Demo Reservation Preview', 'Nothing was sent or saved. Connect a booking service to accept real reservations.');
  };

  const displayPrice = booking.selectedSuite && booking.selectedSuite !== 'not-sure' ? suitePrice : 450;
  const displayTotal = estimatedTotal;
  const currency = selectedRoom?.currency ?? 'USD';

  if (success) {
    return (
      <section id="booking" className="py-24 lg:py-32 bg-stone-50">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="h-20 w-20 mx-auto rounded-full bg-emerald-deep/10 flex items-center justify-center mb-8"
            >
              <CheckCircle2 className="h-10 w-10 text-emerald-deep" />
            </motion.div>
            <h2 className="font-serif text-4xl text-stone-900 font-light">
              Demo Reservation Preview
            </h2>
            <p className="mt-4 font-sans text-base text-stone-500 leading-relaxed">
              Your sample stay estimate is ready. This frontend-only demo does not send or store reservation details.
            </p>
            <div className="mt-8 bg-white border border-stone-200/60 p-8 text-left">
              <h3 className="font-serif text-lg text-stone-900 mb-4">Your Reservation</h3>
              <dl className="grid grid-cols-2 gap-y-3 font-sans text-sm">
                <dt className="text-stone-400">Guest</dt>
                <dd className="text-stone-900">{booking.fullName}</dd>
                <dt className="text-stone-400">Suite</dt>
                <dd className="text-stone-900">{suiteName}</dd>
                <dt className="text-stone-400">Dates</dt>
                <dd className="text-stone-900">{booking.checkIn} → {booking.checkOut}</dd>
                <dt className="text-stone-400">Nights</dt>
                <dd className="text-stone-900">{nights}</dd>
                <dt className="text-stone-400">Guests</dt>
                <dd className="text-stone-900">{totalGuests}</dd>
                <dt className="text-stone-400">Rooms</dt>
                <dd className="text-stone-900">{booking.rooms}</dd>
                <dt className="text-stone-400">Estimated Total</dt>
                <dd className="text-emerald-deep font-medium">{formatCurrency(displayTotal, currency)}</dd>
              </dl>
              <p className="mt-4 pt-4 border-t border-stone-200/60 font-sans text-[10px] uppercase tracking-ultra-wide text-stone-400">
                Demo only — no payment, reservation, or data submission
              </p>
            </div>
            <button
              onClick={() => {
                setSuccess(false);
              }}
              className="mt-8 font-sans text-xs uppercase tracking-widest text-emerald-deep border-b border-emerald-deep/40 pb-1 hover:border-emerald-deep transition-colors"
            >
              Make Another Reservation
            </button>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 lg:py-32 bg-stone-50">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="font-sans text-[11px] uppercase tracking-ultra-wider text-bronze mb-4">
            Reservations
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light leading-tight">
            Secure Your Piece of Paradise.
          </h2>
          <p className="mt-6 font-sans text-base text-stone-500 leading-relaxed">
            Explore a sample stay estimate. This frontend-only form does not send or store your details.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-stone-200/60 p-6 lg:p-10 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label="Full Name" icon={<User className="h-4 w-4" />}>
                  <input
                    type="text"
                    value={booking.fullName}
                    onChange={(e) => setField('fullName', e.target.value)}
                    className="form-input"
                    placeholder="Your full name"
                    required
                  />
                </FormField>

                <FormField label="Contact Email" icon={<Mail className="h-4 w-4" />}>
                  <input
                    type="email"
                    value={booking.email}
                    onChange={(e) => setField('email', e.target.value)}
                    className="form-input"
                    placeholder="you@example.com"
                    required
                  />
                </FormField>

                <FormField label="Phone Number" icon={<Phone className="h-4 w-4" />}>
                  <input
                    type="tel"
                    value={booking.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    className="form-input"
                    placeholder="+00 123 456 789"
                    required
                  />
                </FormField>

                <FormField label="Preferred Suite" icon={<BedDouble className="h-4 w-4" />}>
                  <select
                    value={booking.selectedSuite}
                    onChange={(e) => setField('selectedSuite', e.target.value)}
                    className="form-input cursor-pointer"
                  >
                    <option value="">Select a suite</option>
                    {suiteOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Check-In" icon={<Calendar className="h-4 w-4" />}>
                  <input
                    type="date"
                    value={booking.checkIn}
                    min={today}
                    onChange={(e) => setField('checkIn', e.target.value)}
                    className="form-input"
                  />
                </FormField>

                <FormField label="Check-Out" icon={<CalendarCheck className="h-4 w-4" />}>
                  <input
                    type="date"
                    value={booking.checkOut}
                    min={booking.checkIn || today}
                    onChange={(e) => setField('checkOut', e.target.value)}
                    className="form-input"
                  />
                </FormField>
              </div>

              <fieldset className="block">
                <legend className="font-sans text-[10px] uppercase tracking-ultra-wide text-stone-400 flex items-center gap-1.5 mb-2">
                  <Users className="h-4 w-4" />
                  Guests
                </legend>
                <div className="flex flex-wrap gap-6">
                  <GuestCounter
                    label="Adults"
                    value={booking.adults}
                    min={1}
                    max={6}
                    onChange={(v) => setField('adults', v)}
                  />
                  <GuestCounter
                    label="Children"
                    value={booking.children}
                    min={0}
                    max={5}
                    onChange={(v) => setField('children', v)}
                  />
                </div>
              </fieldset>

              <fieldset className="block">
                <legend className="font-sans text-[10px] uppercase tracking-ultra-wide text-stone-400 flex items-center gap-1.5 mb-2">
                  <BedDouble className="h-4 w-4" />
                  Rooms
                </legend>
                <GuestCounter
                  label="Rooms"
                  value={booking.rooms}
                  min={1}
                  max={5}
                  onChange={(value) => setField('rooms', value)}
                />
              </fieldset>

              <FormField label="Special Requests" icon={<MessageSquare className="h-4 w-4" />}>
                <textarea
                  value={booking.specialRequests}
                  onChange={(e) => setField('specialRequests', e.target.value)}
                  className="form-input min-h-[100px] resize-y"
                  placeholder="Dietary preferences, celebration details, accessibility needs..."
                  rows={4}
                />
              </FormField>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-deep text-ivory font-sans text-sm uppercase tracking-widest py-4 hover:bg-emerald-dark transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Preview Demo Reservation
              </button>

              <p className="text-center font-sans text-[10px] uppercase tracking-ultra-wide text-stone-400">
                Demo only — no payment, reservation, or data submission
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <aside className="bg-stone-900 text-ivory p-8 sticky top-28">
              <h3 className="font-sans text-[10px] uppercase tracking-ultra-wider text-bronze-soft mb-6">
                Reservation Summary
              </h3>

              <dl className="space-y-4">
                <SummaryRow label="Suite" value={suiteName} />
                <SummaryRow label="Guests" value={String(totalGuests)} />
                <SummaryRow label="Rooms" value={String(booking.rooms)} />
                <SummaryRow
                  label="Dates"
                  value={booking.checkIn && booking.checkOut
                    ? `${booking.checkIn} → ${booking.checkOut}`
                    : 'Select dates'}
                />
                <SummaryRow label="Nights" value={nights > 0 ? String(nights) : '—'} />
              </dl>

              {selectedRoom && (
                <div className="mt-6 pt-6 border-t border-ivory/10">
                  <img
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    className="w-full h-32 object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-ivory/10">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs uppercase tracking-widest text-ivory/50">
                    Estimated Total
                  </span>
                  <span className="font-serif text-3xl text-bronze-soft">
                    {formatCurrency(displayTotal, currency)}
                  </span>
                </div>
                {nights > 0 && (
                  <p className="mt-2 font-sans text-xs text-ivory/40 text-right">
                    {formatCurrency(displayPrice, currency)}/night × {nights} nights × {booking.rooms} room{booking.rooms === 1 ? '' : 's'}
                  </p>
                )}
                <p className="mt-3 font-sans text-[10px] uppercase tracking-ultra-wide text-ivory/30">
                  Demo estimate — No payment required
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          font-family: 'Jost', sans-serif;
          font-size: 0.875rem;
          color: #292524;
          background: transparent;
          border: 1px solid #e7e5e4;
          padding: 0.75rem 1rem;
          outline: none;
          transition: border-color 0.3s;
        }
        .form-input:focus {
          border-color: #365314;
        }
        .form-input::placeholder {
          color: #a8a29e;
        }
      `}</style>
    </section>
  );
}

function FormField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-sans text-[10px] uppercase tracking-ultra-wide text-stone-400 flex items-center gap-1.5 mb-2">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function GuestCounter({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-sans text-sm text-stone-600">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="h-8 w-8 border border-stone-300 flex items-center justify-center text-stone-600 hover:border-emerald-deep hover:text-emerald-deep transition-colors disabled:opacity-30"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="font-sans text-sm text-stone-900 w-6 text-center tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="h-8 w-8 border border-stone-300 flex items-center justify-center text-stone-600 hover:border-emerald-deep hover:text-emerald-deep transition-colors disabled:opacity-30"
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="font-sans text-xs uppercase tracking-widest text-ivory/40">{label}</dt>
      <dd className="font-sans text-sm text-ivory text-right">{value}</dd>
    </div>
  );
}
