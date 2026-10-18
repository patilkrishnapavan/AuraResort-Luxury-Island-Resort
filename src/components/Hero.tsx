import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, Calendar, CalendarCheck, Users, Minus, Plus, Search, X, Star, ArrowRight } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useToast } from '@/context/ToastContext';
import { formatCurrency, rooms, heroImage } from '@/lib/data';

export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt="Aerial view of AuraResort tropical luxury resort with ocean and palm trees"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/30 to-stone-900/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/40 to-transparent" />
        <div
          className="absolute inset-0"
          style={{ boxShadow: 'inset 0 0 200px 60px rgba(28,25,23,0.5)' }}
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 text-ivory font-sans text-xs uppercase tracking-ultra-wide">
            <Star className="h-3.5 w-3.5 fill-bronze-soft text-bronze-soft" />
            Rated 5-Star Luxury Destination
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-7xl text-ivory font-light leading-[1.1] max-w-4xl"
        >
          Escape to Unrivaled Serenity
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 max-w-2xl text-ivory/80 font-sans text-base md:text-lg leading-relaxed font-light"
        >
          Private white-sand beaches, world-class dining, and an uncompromisingly personal concierge experience — all surrounded by nature at its most breathtaking.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#rooms"
            className="inline-flex items-center gap-2 bg-emerald-deep text-ivory font-sans text-sm uppercase tracking-widest px-8 py-4 hover:bg-emerald-dark transition-colors duration-300"
          >
            Explore Rooms
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => {
              setVideoOpen(true);
              showToast('info', 'Virtual Tour', 'Launching the AuraResort visual tour.');
            }}
            className="inline-flex items-center gap-2.5 text-ivory font-sans text-sm uppercase tracking-widest px-8 py-4 border border-white/30 hover:bg-white/10 transition-colors duration-300"
          >
            <Play className="h-4 w-4 fill-ivory" />
            Watch Virtual Tour
          </button>
        </motion.div>
      </div>

      <BookingBar />

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}

function BookingBar() {
  const { booking, setField } = useBooking();
  const { showToast } = useToast();
  const [resultsOpen, setResultsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);

  const handleCheckAvailability = () => {
    if (!booking.checkIn || !booking.checkOut) {
      showToast('error', 'Dates Required', 'Please select your check-in and check-out dates.');
      return;
    }
    if (new Date(booking.checkOut) <= new Date(booking.checkIn)) {
      showToast('error', 'Invalid Dates', 'Check-out must be after your check-in date.');
      return;
    }
    if (booking.checkIn < today) {
      showToast('error', 'Invalid Dates', 'Check-in cannot be in the past.');
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setResultsOpen(true);
      showToast('info', 'Sample Stay Preview', 'No live availability is connected. Review the sample rooms for your dates.');
    }, 1500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-20 mx-auto w-full max-w-5xl px-6 pb-8"
      >
        <div className="bg-white/95 backdrop-blur-md border border-stone-200/60 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto] gap-0 md:gap-px bg-stone-200/40">
            <DateField
              label="Check-In"
              icon={<Calendar className="h-4 w-4 text-bronze" />}
              value={booking.checkIn}
              min={today}
              onChange={(v) => setField('checkIn', v)}
            />
            <DateField
              label="Check-Out"
              icon={<CalendarCheck className="h-4 w-4 text-bronze" />}
              value={booking.checkOut}
              min={booking.checkIn || today}
              onChange={(v) => setField('checkOut', v)}
            />
            <GuestSelector
              adults={booking.adults}
              childrenCount={booking.children}
              onAdults={(v) => setField('adults', v)}
              onChildren={(v) => setField('children', v)}
            />
            <div className="bg-white p-4 flex items-center">
              <button
                onClick={handleCheckAvailability}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-deep text-ivory font-sans text-sm uppercase tracking-widest px-6 py-3.5 hover:bg-emerald-dark transition-colors duration-300 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Preview Sample Stay
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AvailabilityModal open={resultsOpen} onClose={() => setResultsOpen(false)} />
    </>
  );
}

function DateField({
  label,
  icon,
  value,
  min,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  min: string;
  onChange: (v: string) => void;
}) {
  const inputId = `hero-${label.toLowerCase()}`;

  return (
    <div className="bg-white p-4 flex flex-col gap-1.5">
      <label htmlFor={inputId} className="font-sans text-[10px] uppercase tracking-ultra-wide text-stone-400 flex items-center gap-1.5">
        {icon}
        {label}
      </label>
      <input
        id={inputId}
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className="font-sans text-sm text-stone-900 bg-transparent border-none outline-none cursor-pointer"
      />
    </div>
  );
}

function GuestSelector({
  adults,
  childrenCount,
  onAdults,
  onChildren,
}: {
  adults: number;
  childrenCount: number;
  onAdults: (v: number) => void;
  onChildren: (v: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const total = adults + childrenCount;

  return (
    <div className="bg-white p-4 relative">
      <label className="font-sans text-[10px] uppercase tracking-ultra-wide text-stone-400 flex items-center gap-1.5">
        <Users className="h-4 w-4 text-bronze" />
        Guests
      </label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Select guests. Current total: ${total}`}
        className="font-sans text-sm text-stone-900 mt-1.5 w-full text-left flex items-center justify-between"
      >
        <span>{total} Guest{total !== 1 ? 's' : ''}</span>
        <span className="text-stone-400 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200/60 shadow-lg z-30 p-5 space-y-4"
            role="dialog"
            aria-label="Choose guest count"
          >
            <GuestRow
              label="Adults"
              value={adults}
              min={1}
              max={6}
              onChange={onAdults}
            />
            <GuestRow
              label="Children"
              value={childrenCount}
              min={0}
              max={5}
              onChange={onChildren}
            />
            <button
              onClick={() => setOpen(false)}
              className="w-full bg-emerald-deep text-ivory font-sans text-xs uppercase tracking-widest py-2.5 hover:bg-emerald-dark transition-colors"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GuestRow({
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
    <div className="flex items-center justify-between">
      <span className="font-sans text-sm text-stone-700">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="h-7 w-7 border border-stone-300 flex items-center justify-center text-stone-600 hover:border-emerald-deep hover:text-emerald-deep transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="font-sans text-sm text-stone-900 w-6 text-center tabular-nums">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="h-7 w-7 border border-stone-300 flex items-center justify-center text-stone-600 hover:border-emerald-deep hover:text-emerald-deep transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function AvailabilityModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { booking, nights, totalGuests, setField } = useBooking();
  const { showToast } = useToast();
  const reduced = useReducedMotion();
  const matchingRooms = rooms.filter((room) => room.guests >= totalGuests);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const handleSelectSuite = (suiteId: string) => {
    setField('selectedSuite', suiteId);
    showToast('success', 'Suite Selected', 'Your preferred suite has been selected for this demo estimate.');
    onClose();
    const el = document.getElementById('booking');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-ivory max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sample-stay-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-ivory/95 backdrop-blur-sm border-b border-stone-200/60 px-6 py-5 flex items-center justify-between z-10">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-ultra-wide text-bronze">
                  Sample Stay Preview
                </p>
                <h3 id="sample-stay-title" className="font-serif text-2xl text-stone-900 mt-1">
                  {nights} {nights === 1 ? 'Night' : 'Nights'} · {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-stone-400 hover:text-stone-900 transition-colors p-2"
                aria-label="Close availability results"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="font-sans text-sm text-stone-500">
                Example room suggestions for {booking.checkIn} to {booking.checkOut}. Live inventory is not connected.
              </p>

              {matchingRooms.map((room) => {
                const total = room.price * nights;
                return (
                  <div
                    key={room.id}
                    className="flex flex-col sm:flex-row gap-4 border border-stone-200/60 p-4 hover:border-emerald-deep/30 transition-colors"
                  >
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full sm:w-32 h-32 sm:h-24 object-cover"
                      loading="lazy"
                    />
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-lg text-stone-900">{room.name}</h4>
                          <span className="text-[9px] uppercase tracking-ultra-wide bg-emerald-deep/10 text-emerald-deep px-2 py-0.5">
                            {room.badge}
                          </span>
                        </div>
                        <p className="font-sans text-sm text-stone-600 mt-1">{room.description}</p>
                        <p className="font-sans text-sm text-stone-900 mt-2">
                          <span className="text-bronze font-medium">{formatCurrency(room.price, room.currency)}</span>
                          <span className="text-stone-400"> / night</span>
                        </p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-2">
                        <p className="font-serif text-xl text-stone-900">
                          {formatCurrency(total, room.currency)}
                        </p>
                        <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400">
                          {nights} nights total
                        </p>
                        <button
                          onClick={() => handleSelectSuite(room.id)}
                          className="bg-emerald-deep text-ivory font-sans text-xs uppercase tracking-widest px-5 py-2.5 hover:bg-emerald-dark transition-colors"
                        >
                          Use this room
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {matchingRooms.length === 0 && (
                <p role="status" className="border border-stone-200 p-5 font-sans text-sm text-stone-600">
                  No sample room is configured for {totalGuests} guests. Reduce the guest count or contact the property directly.
                </p>
              )}
              <p className="font-sans text-[10px] text-stone-400">
                Demo estimate only. No live inventory, reservation, or payment is connected.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl"
            role="dialog"
            aria-modal="true"
            aria-label="AuraResort visual tour preview"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-ivory/70 hover:text-ivory transition-colors"
              aria-label="Close video"
            >
              <X className="h-7 w-7" />
            </button>
            <div className="relative aspect-video overflow-hidden">
              <img
                src={heroImage}
                alt="AuraResort virtual tour"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-stone-900/40 flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-ivory/20 backdrop-blur-sm border border-ivory/30 flex items-center justify-center mb-4">
                  <Play className="h-7 w-7 fill-ivory text-ivory ml-1" />
                </div>
                <p className="font-serif text-2xl text-ivory">AuraResort — A Visual Journey</p>
                <p className="font-sans text-sm text-ivory/60 mt-2">Frontend demo · Video player placeholder</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
