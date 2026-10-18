import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqItems } from '@/lib/data';
import { Reveal } from '@/components/Reveal';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-neutral-50">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Reveal className="text-center">
          <p className="font-sans text-[11px] uppercase tracking-ultra-wider text-bronze mb-4">
            Frequently Asked
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light leading-tight">
            Questions & Answers
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-stone-200/60 border-y border-stone-200/60">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.question} delay={i * 0.05}>
                <div>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg text-stone-900 group-hover:text-emerald-deep transition-colors">
                      {item.question}
                    </span>
                    <span className="shrink-0 h-7 w-7 border border-stone-300 flex items-center justify-center text-stone-500 group-hover:border-emerald-deep group-hover:text-emerald-deep transition-colors">
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 font-sans text-sm text-stone-500 leading-relaxed pr-12">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
