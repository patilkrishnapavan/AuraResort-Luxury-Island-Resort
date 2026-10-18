import { Reveal } from '@/components/Reveal';
import { wellnessImage } from '@/lib/data';

const wellnessFeatures = [
  { title: 'Private Spa Treatments', desc: 'Bespoke therapies in your private wellness suite.' },
  { title: 'Yoga Pavilion', desc: 'Sunrise and sunset sessions overlooking the ocean.' },
  { title: 'Meditation Garden', desc: 'A tranquil sanctuary among frangipani and lotus.' },
  { title: 'Hydrotherapy', desc: 'Mineral pools, steam caves, and cold plunges.' },
  { title: 'Personal Wellness Programs', desc: 'Multi-day journeys curated by our wellness director.' },
];

export function Wellness() {
  return (
    <section id="wellness" className="relative py-24 lg:py-32 bg-stone-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={wellnessImage}
          alt="Luxury spa wellness treatment"
          className="h-full w-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-stone-900/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <p className="font-sans text-[11px] uppercase tracking-ultra-wider text-bronze-soft mb-4">
                The Wellness Pavilion
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-ivory font-light leading-tight">
                Restore. Reconnect. Renew.
              </h2>
              <p className="mt-6 font-sans text-base text-ivory/60 leading-relaxed max-w-md">
                A holistic sanctuary where ancient healing traditions meet modern science.
                Every treatment is a personal journey, every moment an invitation to return
                to yourself.
              </p>
            </div>
          </Reveal>

          <div className="space-y-px">
            {wellnessFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="group border-t border-ivory/10 last:border-b py-6 flex items-start justify-between gap-4 hover:bg-ivory/5 transition-colors px-4 -mx-4">
                  <div>
                    <h3 className="font-serif text-xl text-ivory">{f.title}</h3>
                    <p className="mt-1 font-sans text-sm text-ivory/50">{f.desc}</p>
                  </div>
                  <span className="font-serif text-3xl text-bronze/40 group-hover:text-bronze transition-colors tabular-nums">
                    0{i + 1}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
