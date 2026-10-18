import {
  BellRing,
  Car,
  Utensils,
  Sparkles,
  Flower2,
  ChefHat,
  Shirt,
  UserRound,
  type LucideIcon,
} from 'lucide-react';

import { services } from '@/lib/data';
import { Reveal } from '@/components/Reveal';

const serviceIcons: Record<string, LucideIcon> = {
  bellconcierge: BellRing,
  car: Car,
  utensils: Utensils,
  sparkles: Sparkles,
  flower: Flower2,
  chefhat: ChefHat,
  shirt: Shirt,
  userround: UserRound,
};

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        <Reveal className="max-w-3xl">
          <p className="font-sans text-[11px] uppercase tracking-ultra-wider text-bronze mb-4">
            At your service
          </p>

          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light leading-tight">
            Considered touches, from arrival onward.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon] ?? Sparkles;

            return (
              <Reveal
                key={service.id}
                delay={(index % 4) * 0.06}
              >
                <article className="h-full bg-stone-50 p-7 lg:p-8">
                  <Icon
                    className="h-5 w-5 text-bronze"
                    aria-hidden="true"
                  />

                  <h3 className="mt-6 font-serif text-xl text-stone-900">
                    {service.title}
                  </h3>

                  <p className="mt-2 font-sans text-sm text-stone-500 leading-relaxed">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}