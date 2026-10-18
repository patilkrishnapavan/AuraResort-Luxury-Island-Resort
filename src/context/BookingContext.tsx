import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { rooms } from '@/lib/data';

export type BookingState = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  selectedSuite: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
};

type BookingContextValue = {
  booking: BookingState;
  setField: <K extends keyof BookingState>(key: K, value: BookingState[K]) => void;
  nights: number;
  totalGuests: number;
  estimatedTotal: number;
  suitePrice: number;
  resetBooking: () => void;
};

const defaultBooking: BookingState = {
  checkIn: '',
  checkOut: '',
  adults: 2,
  children: 0,
  rooms: 1,
  selectedSuite: '',
  fullName: '',
  email: '',
  phone: '',
  specialRequests: '',
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(defaultBooking);

  const setField = <K extends keyof BookingState>(key: K, value: BookingState[K]) => {
    setBooking((prev) => ({ ...prev, [key]: value }));
  };

  const nights = useMemo(() => {
    if (!booking.checkIn || !booking.checkOut) return 0;
    const start = new Date(booking.checkIn);
    const end = new Date(booking.checkOut);
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [booking.checkIn, booking.checkOut]);

  const totalGuests = booking.adults + booking.children;

  const suitePrice = useMemo(() => {
    return rooms.find((room) => room.id === booking.selectedSuite)?.price ?? 450;
  }, [booking.selectedSuite]);

  const estimatedTotal = nights * suitePrice * booking.rooms;

  const resetBooking = () => setBooking(defaultBooking);

  const value: BookingContextValue = {
    booking,
    setField,
    nights,
    totalGuests,
    estimatedTotal,
    suitePrice,
    resetBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
