import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const bookingEl = document.getElementById('booking');
      const heroEl = document.getElementById('hero');
      if (!bookingEl || !heroEl) return;

      const bookingRect = bookingEl.getBoundingClientRect();
      const heroRect = heroEl.getBoundingClientRect();

      const pastHero = heroRect.bottom < 100;
      const inBooking = bookingRect.top < window.innerHeight && bookingRect.bottom > 0;

      setVisible(pastHero && !inBooking);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-stone-50/95 backdrop-blur-md border-t border-stone-200/60 px-4 py-3"
        >
          <a
            href="#booking"
            className="flex items-center justify-center gap-2 bg-emerald-deep text-ivory font-sans text-sm uppercase tracking-widest py-3.5 w-full"
          >
            <Calendar className="h-4 w-4" />
            Check Availability
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
