import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { experiences } from '@/lib/data';
import { Reveal } from '@/components/Reveal';

export function Experiences() {
  return (
    <section id="experiences" className="py-24 lg:py-32 bg-neutral-50">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="font-sans text-[11px] uppercase tracking-ultra-wider text-bronze mb-4">
            Curated Experiences
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light leading-tight">
            More Than a Stay. A Private World.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 0.1}>
              <ExperienceCard experience={exp} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  const reduced = useReducedMotion();
  const tall = index === 0 || index === 3;

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.4 }}
      className={`group relative overflow-hidden ${tall ? 'md:row-span-1 h-80 md:h-96' : 'h-80'}`}
    >
      <img
        src={experience.image}
        alt={experience.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end p-7">
        <ArrowUpRight className="h-5 w-5 text-bronze-soft mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <h3 className="font-serif text-2xl text-ivory">{experience.title}</h3>
        <p className="mt-2 font-sans text-sm text-ivory/70 leading-relaxed max-w-md">
          {experience.description}
        </p>
      </div>
    </motion.article>
  );
}
