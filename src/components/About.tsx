import { Leaf, HeartHandshake, Compass } from 'lucide-react';
import { destination } from '@/lib/data';
import { Reveal } from '@/components/Reveal';

const principles = [
  {
    icon: Leaf,
    title: 'A lighter footprint',
    description: 'Thoughtful sourcing, low-impact operations, and care for the island we call home.',
  },
  {
    icon: HeartHandshake,
    title: 'Hospitality, made personal',
    description: 'Warm, intuitive service shaped around each guest rather than a script.',
  },
  {
    icon: Compass,
    title: 'Rooted in place',
    description: 'Local makers, island ingredients, and experiences led by people who know these shores.',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-stone-100">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-24 items-start">
          <Reveal>
            <p className="font-sans text-[11px] uppercase tracking-ultra-wider text-bronze mb-4">Our story</p>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light leading-tight">
              A quieter kind of luxury, shaped by the island.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-serif text-xl md:text-2xl text-stone-700 leading-relaxed">
              AuraResort is imagined as a private retreat on the fictional island of Auralis — a place where the horizon sets the pace and hospitality feels effortless.
            </p>
            <p className="mt-5 font-sans text-sm text-stone-500 leading-relaxed">
              From unhurried mornings to evenings beneath a wide-open sky, our approach puts a sense of place first. The rooms, rituals, and experiences are designed to bring guests closer to the natural beauty and culture of their surroundings.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-300 pt-10">
          {principles.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <article className="h-full">
                <Icon className="h-6 w-6 text-bronze" aria-hidden="true" />
                <h3 className="mt-5 font-serif text-2xl text-stone-900">{title}</h3>
                <p className="mt-3 font-sans text-sm text-stone-500 leading-relaxed">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 font-sans text-xs text-stone-400">
          {destination.name} · {destination.region} · Fictional destination for demonstration.
        </p>
      </div>
    </section>
  );
}
