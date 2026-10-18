import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useToast } from '@/context/ToastContext';

export function SpecialOffer() {
  const { showToast } = useToast();

  return (
    <section className="py-20 lg:py-28 bg-stone-50">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden bg-emerald-deep">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-bronze/30" />
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full border border-bronze/20" />
            </div>

            <div className="relative z-10 px-8 py-12 lg:px-16 lg:py-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <p className="font-sans text-[11px] uppercase tracking-ultra-wider text-bronze-soft mb-4">
                  Complimentary Stay Offer
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-ivory font-light leading-tight">
                  Your Next Escape Starts Here
                </h2>
                <p className="mt-4 font-serif text-xl text-bronze-soft italic">
                  Stay 5 Nights, Experience 6
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    'Complimentary airport transfer via private yacht',
                    'Daily breakfast for two guests',
                    'One private sunset dining experience',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-ivory/80">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-bronze-soft shrink-0" />
                      <span className="font-sans text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-4">
                <a
                  href="#booking"
                  onClick={() => showToast('info', 'Offer Applied', 'Your complimentary night will be included in the reservation.')}
                  className="inline-flex items-center gap-2 bg-bronze text-ivory font-sans text-sm uppercase tracking-widest px-8 py-4 hover:bg-bronze-light transition-colors duration-300"
                >
                  Plan Your Stay
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
