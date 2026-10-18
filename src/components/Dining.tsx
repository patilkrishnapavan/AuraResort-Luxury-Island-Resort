import { ArrowRight } from 'lucide-react';
import { diningImage, diningImage2 } from '@/lib/data';
import { Reveal } from '@/components/Reveal';
import { useToast } from '@/context/ToastContext';

export function Dining() {
  const { showToast } = useToast();

  return (
    <section id="dining" className="py-24 lg:py-32 bg-neutral-50">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative">
              <img
                src={diningImage}
                alt="Oceanfront private dining setup at sunset"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-8 -right-4 lg:-right-8 w-48 h-60 hidden md:block overflow-hidden shadow-xl border-4 border-neutral-50">
                <img
                  src={diningImage2}
                  alt="Coastal restaurant with panoramic ocean views"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <p className="font-sans text-[11px] uppercase tracking-ultra-wider text-bronze mb-4">
                The Cuisine
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light leading-tight">
                A Culinary Journey Without Leaving Paradise
              </h2>
              <p className="mt-6 font-sans text-base text-stone-500 leading-relaxed">
                Our oceanfront restaurant celebrates the bounty of the Indian Ocean with menus
                shaped by the morning's catch and the island's own gardens. Each meal is an
                intimate event — whether served on a private terrace, beneath the banyan trees,
                or on the sand as the sun dissolves into the horizon.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  'Private dining experiences tailored to your preferences',
                  'Oceanfront restaurant with daily-changing menus',
                  'Locally sourced ingredients from island farms and waters',
                  'International cuisine guided by Michelin-inspired chefs',
                  'Private chef experiences in your suite or villa',
                  'Sunset cocktails at the driftwood beach bar',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-1 rounded-full bg-bronze shrink-0" />
                    <span className="font-sans text-sm text-stone-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => showToast('info', 'Dining', 'Our concierge will tailor your culinary experience.')}
                className="mt-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-emerald-deep border-b border-emerald-deep/40 pb-1 hover:border-emerald-deep transition-colors"
              >
                Explore Dining
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
