import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { Reveal } from '@/components/Reveal';

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const count = testimonials.length;

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + count) % count);
  }, [count]);

  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => go(1), 6000);
    return () => window.clearInterval(timer);
  }, [paused, reduced, go]);

  const t = testimonials[index];

  return (
    <section
      id="reviews"
      className="py-24 lg:py-32 bg-stone-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <Reveal>
          <p className="font-sans text-[11px] uppercase tracking-ultra-wider text-bronze mb-4">
            Guest Stories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light leading-tight">
            Voices from Our Guests
          </h2>
          <p className="mt-4 font-sans text-xs text-stone-400 italic">
            Fictional reviews for demonstration purposes
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 relative min-h-[320px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? -40 : 40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <Quote className="h-10 w-10 text-bronze/30 mb-6" />

                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-bronze text-bronze" />
                  ))}
                </div>

                <blockquote className="font-serif text-xl md:text-2xl text-stone-800 leading-relaxed italic font-light max-w-2xl">
                  "{t.review}"
                </blockquote>

                <div className="mt-8">
                  <p className="font-sans text-sm font-medium text-stone-900">{t.name}</p>
                  <p className="font-sans text-xs text-stone-400 mt-1">{t.country}</p>
                  <p className="font-sans text-xs text-bronze mt-1">{t.stayType}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            className="h-11 w-11 border border-stone-300 flex items-center justify-center text-stone-600 hover:border-emerald-deep hover:text-emerald-deep transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 transition-all duration-300 ${
                  i === index ? 'w-8 bg-emerald-deep' : 'w-1.5 bg-stone-300'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="h-11 w-11 border border-stone-300 flex items-center justify-center text-stone-600 hover:border-emerald-deep hover:text-emerald-deep transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
