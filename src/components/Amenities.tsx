import {
  Waves, Utensils, Flower2, Sailboat, BellRing, Car, Coffee, Palmtree,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { amenities } from '@/lib/data';
import { Reveal } from '@/components/Reveal';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  waves: Waves,
  utensils: Utensils,
  flower: Flower2,
  sailboat: Sailboat,
  bellconcierge: BellRing,
  car: Car,
  coffee: Coffee,
  palmtree: Palmtree,
};

export function Amenities() {
  return (
    <section id="amenities" className="py-24 lg:py-28 bg-stone-50 border-t border-stone-200/40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="font-sans text-[11px] uppercase tracking-ultra-wider text-bronze mb-4">
            Resort Amenities
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light leading-tight">
            Everything You Could Need. Nothing You Don't.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-200/40">
          {amenities.map((amenity, i) => {
            const Icon = iconMap[amenity.icon] ?? Waves;
            return (
              <Reveal key={amenity.id} delay={(i % 4) * 0.08}>
                <div className="bg-stone-50 hover:bg-white p-8 flex flex-col items-center text-center transition-colors duration-300 h-full">
                  <div className="h-14 w-14 rounded-full border border-bronze/30 flex items-center justify-center mb-4 group-hover:border-bronze transition-colors">
                    <Icon className="h-6 w-6 text-bronze" />
                  </div>
                  <p className="font-sans text-sm text-stone-700 leading-snug">
                    {amenity.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
