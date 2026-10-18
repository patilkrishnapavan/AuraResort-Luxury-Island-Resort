import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ArrowRight } from 'lucide-react';
import { formatCurrency, rooms, type Room } from '@/lib/data';
import { useToast } from '@/context/ToastContext';
import { useBooking } from '@/context/BookingContext';
import { Reveal } from '@/components/Reveal';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Ocean', value: 'ocean' },
  { label: 'Villa', value: 'villa' },
  { label: 'Penthouse', value: 'penthouse' },
] as const;

type FilterValue = (typeof filters)[number]['value'];

export function Rooms() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');
  const [galleryRoom, setGalleryRoom] = useState<Room | null>(null);
  const [guestFilter, setGuestFilter] = useState(1);
  const [priceFilter, setPriceFilter] = useState(2000);
  const { showToast } = useToast();
  const { setField } = useBooking();

  const filteredRooms = rooms.filter(
    (room) =>
      (activeFilter === 'all' || room.category === activeFilter) &&
      room.guests >= guestFilter &&
      room.price <= priceFilter,
  );

  const openGallery = (room: Room) => {
    setGalleryRoom(room);
    showToast('info', 'Gallery Opened', `Viewing ${room.name} gallery.`);
  };

  return (
    <section id="rooms" className="py-24 lg:py-32 bg-stone-50">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="font-sans text-[11px] uppercase tracking-ultra-wider text-bronze mb-4">
            The Residences
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light leading-tight">
            Our Handcrafted Sanctuary Spaces
          </h2>
          <p className="mt-6 font-sans text-base text-stone-500 leading-relaxed">
            Every residence is designed as a private world of comfort, architecture, and natural beauty.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-col items-center gap-5">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                aria-pressed={activeFilter === f.value}
                className={`font-sans text-xs uppercase tracking-widest px-6 py-2.5 border transition-all duration-300 ${
                  activeFilter === f.value
                    ? 'bg-emerald-deep text-ivory border-emerald-deep'
                    : 'bg-transparent text-stone-600 border-stone-300 hover:border-emerald-deep hover:text-emerald-deep'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <label className="flex items-center gap-2 font-sans text-xs text-stone-600">
              Guests
              <select
                value={guestFilter}
                onChange={(event) => setGuestFilter(Number(event.target.value))}
                className="border border-stone-300 bg-transparent px-3 py-2 text-stone-800"
              >
                {[1, 2, 3, 4].map((guests) => (
                  <option key={guests} value={guests}>{guests}+ guests</option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 font-sans text-xs text-stone-600">
              Maximum per night
              <select
                value={priceFilter}
                onChange={(event) => setPriceFilter(Number(event.target.value))}
                className="border border-stone-300 bg-transparent px-3 py-2 text-stone-800"
              >
                <option value={2000}>Any price</option>
                <option value={500}>Up to $500</option>
                <option value={700}>Up to $700</option>
                <option value={1000}>Up to $1,000</option>
              </select>
            </label>
          </div>
        </Reveal>

        <motion.div layout className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredRooms.map((room, i) => (
              <RoomCard
                key={room.id}
                room={room}
                index={i}
                onViewGallery={() => openGallery(room)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        {filteredRooms.length === 0 && (
          <p role="status" className="mt-10 text-center font-sans text-sm text-stone-500">
            No rooms match those filters. Try a different guest count or price range.
          </p>
        )}
      </div>

      <RoomGalleryModal
        room={galleryRoom}
        onClose={() => setGalleryRoom(null)}
        onReserve={(room) => {
          setField('selectedSuite', room.id);
          setGalleryRoom(null);
          document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
          showToast('success', 'Suite Selected', `${room.name} has been set as your preferred suite.`);
        }}
      />
    </section>
  );
}

function RoomCard({
  room,
  index,
  onViewGallery,
}: {
  room: Room;
  index: number;
  onViewGallery: () => void;
}) {
  const { setField } = useBooking();
  const { showToast } = useToast();

  const handleSelect = () => {
    setField('selectedSuite', room.id);
    showToast('success', 'Suite Selected', `${room.name} has been set as your preferred suite.`);
    const el = document.getElementById('booking');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white border border-stone-200/60 overflow-hidden flex flex-col"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-4 left-4 bg-ivory/95 backdrop-blur-sm font-sans text-[9px] uppercase tracking-ultra-wide text-emerald-deep px-3 py-1.5">
          {room.badge}
        </span>
      </div>

      <div className="p-7 flex flex-col flex-1">
        <h3 className="font-serif text-2xl text-stone-900">{room.name}</h3>
        <p className="mt-2 font-sans text-sm text-stone-500 leading-relaxed">{room.description}</p>

        <ul className="mt-5 space-y-2">
          {room.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5 font-sans text-xs text-stone-600">
              <span className="h-1 w-1 rounded-full bg-bronze" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-5 border-t border-stone-200/60 flex items-center justify-between">
          <div>
            <span className="font-serif text-2xl text-emerald-deep">
              {formatCurrency(room.price, room.currency)}
            </span>
            <span className="font-sans text-xs text-stone-400 ml-1">/ night</span>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={onViewGallery}
            className="flex-1 font-sans text-xs uppercase tracking-widest border border-stone-300 text-stone-700 py-3 hover:border-stone-900 hover:bg-stone-900 hover:text-ivory transition-all duration-300"
          >
            View Details
          </button>
          <button
            onClick={handleSelect}
            className="flex-1 inline-flex items-center justify-center gap-1.5 font-sans text-xs uppercase tracking-widest bg-emerald-deep text-ivory py-3 hover:bg-emerald-dark transition-colors duration-300"
          >
            Reserve
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function RoomGalleryModal({
  room,
  onClose,
  onReserve,
}: {
  room: Room | null;
  onClose: () => void;
  onReserve: (room: Room) => void;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const reduced = useReducedMotion();

  const next = useCallback(() => {
    if (!room) return;
    setImageIndex((i) => (i + 1) % room.gallery.length);
  }, [room]);

  const prev = useCallback(() => {
    if (!room) return;
    setImageIndex((i) => (i - 1 + room.gallery.length) % room.gallery.length);
  }, [room]);

  useEffect(() => {
    setImageIndex(0);
  }, [room]);

  useEffect(() => {
    if (!room) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [room, next, prev, onClose]);

  return (
    <AnimatePresence>
      {room && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-detail-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-ivory/70 hover:text-ivory transition-colors"
              aria-label="Close gallery"
            >
              <X className="h-7 w-7" />
            </button>

            <div className="relative overflow-hidden bg-stone-900">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imageIndex}
                  src={room.gallery[imageIndex]}
                  alt={`${room.name} — image ${imageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-[55vh] object-cover"
                />
              </AnimatePresence>

              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 bg-ivory/10 backdrop-blur-sm border border-ivory/20 text-ivory flex items-center justify-center hover:bg-ivory/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 bg-ivory/10 backdrop-blur-sm border border-ivory/20 text-ivory flex items-center justify-center hover:bg-ivory/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {room.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    className={`h-1.5 transition-all duration-300 ${
                      i === imageIndex ? 'w-8 bg-ivory' : 'w-1.5 bg-ivory/40'
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-stone-900 px-6 py-5">
              <h3 id="room-detail-title" className="font-serif text-xl text-ivory">{room.name}</h3>
              <p className="font-sans text-sm text-ivory/60 mt-1">{room.description}</p>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar bg-stone-900 pb-4 px-4">
              {room.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`shrink-0 h-16 w-24 overflow-hidden border-2 transition-colors ${
                    i === imageIndex ? 'border-bronze' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="bg-white px-6 py-7 md:px-9">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-stone-200 pb-6">
                <RoomSpecification label="Guests" value={`Up to ${room.guests}`} />
                <RoomSpecification label="Size" value={room.size} />
                <RoomSpecification label="Bed" value={room.bed} />
                <RoomSpecification label="View" value={room.view} />
              </div>
              <h4 className="mt-6 font-serif text-xl text-stone-900">Thoughtful details</h4>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {room.amenities.map((amenity) => (
                  <li key={amenity} className="font-sans text-sm text-stone-600 flex items-center gap-2">
                    <span className="h-1 w-1 bg-bronze" />
                    {amenity}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="font-sans text-sm text-stone-600">
                  From <strong className="font-serif text-2xl text-emerald-deep">
                    {formatCurrency(room.price, room.currency)}
                  </strong> / night
                </p>
                <button
                  onClick={() => onReserve(room)}
                  className="bg-emerald-deep px-7 py-3 font-sans text-xs uppercase tracking-widest text-ivory hover:bg-emerald-dark"
                >
                  Reserve this room
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RoomSpecification({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-sans text-[10px] uppercase tracking-widest text-stone-400">{label}</dt>
      <dd className="mt-1 font-sans text-sm text-stone-800">{value}</dd>
    </div>
  );
}
