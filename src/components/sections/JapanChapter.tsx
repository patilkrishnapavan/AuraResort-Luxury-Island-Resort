import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/Reveal';

const cherryBlossom = 'https://images.pexels.com/photos/33594696/pexels-photo-33594696.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const kyotoLantern = 'https://images.pexels.com/photos/31238252/pexels-photo-31238252.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const kyotoAlley = 'https://images.pexels.com/photos/33469141/pexels-photo-33469141.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const blossomBranch = 'https://images.pexels.com/photos/356269/pexels-photo-356269.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function JapanChapter() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generate = () => {
      const newPetals: Petal[] = [];
      for (let i = 0; i < 25; i++) {
        newPetals.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 10,
          duration: Math.random() * 8 + 8,
          size: Math.random() * 8 + 6,
          opacity: Math.random() * 0.4 + 0.3,
        });
      }
      setPetals(newPetals);
    };
    generate();
  }, []);

  return (
    <section
      id="chapter-2"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Japan section enhanced pink glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(236, 72, 153, 0.12) 0%, rgba(190, 24, 93, 0.06) 30%, transparent 60%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(249, 168, 212, 0.08) 0%, transparent 50%)' }} />

      {/* Falling petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute animate-petal-fall"
            style={{
              left: `${petal.left}%`,
              top: '-5%',
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
            }}
          >
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 20 20"
              fill="none"
              style={{ opacity: petal.opacity }}
            >
              <path
                d="M10 2 C 14 6, 16 10, 10 18 C 4 10, 6 6, 10 2 Z"
                fill="#F9A8D4"
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        {/* Chapter label */}
        <Reveal animation="fade-down" className="text-center mb-12">
          <p className="font-script text-3xl text-pink-primary mb-2">Chapter Two</p>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-pink-primary/50" />
            <span className="text-pink-primary/60 text-sm font-serif italic">日本 — Japan</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-pink-primary/50" />
          </div>
        </Reveal>

        <Reveal animation="fade-up" delay={200} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-cream">A place that felt like </span>
            <span className="shimmer-text italic">you</span>
          </h2>
          <p className="mt-6 font-serif italic text-lg md:text-xl text-pink-soft/70 max-w-2xl mx-auto leading-relaxed">
            Of all the places we've dreamed of, Japan holds a special color in my heart —
            the blush of sakura petals drifting through Kyoto lantern light.
          </p>
        </Reveal>

        {/* Image collage */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
          <Reveal animation="scale-in" delay={300} className="col-span-2 md:col-span-2 md:row-span-2">
            <PhotoCard src={cherryBlossom} alt="Cherry blossoms in full bloom" large />
          </Reveal>
          <Reveal animation="scale-in" delay={400}>
            <PhotoCard src={kyotoLantern} alt="Traditional lanterns in Kyoto" />
          </Reveal>
          <Reveal animation="scale-in" delay={500}>
            <PhotoCard src={kyotoAlley} alt="Kyoto alley at night" />
          </Reveal>
          <Reveal animation="scale-in" delay={600} className="col-span-2 md:col-span-1">
            <PhotoCard src={blossomBranch} alt="Cherry blossom branch" />
          </Reveal>
        </div>

        {/* Japan memory text */}
        <div className="grid md:grid-cols-3 gap-8">
          <Reveal animation="fade-up" delay={300}>
            <JapanMemory
              kanji="桜"
              title="Sakura Season"
              text="We imagined walking under tunnels of pink, petals catching in your hair. You laughed and said it would be like standing inside a painting. You were right — but the painting would be incomplete without you in it."
            />
          </Reveal>
          <Reveal animation="fade-up" delay={450}>
            <JapanMemory
              kanji="灯"
              title="Lantern Light"
              text="The glow of paper lanterns in a Kyoto alley — warm, amber, soft. I want to walk beside you through that light, your hand in mine, while the world slows down around us."
            />
          </Reveal>
          <Reveal animation="fade-up" delay={600}>
            <JapanMemory
              kanji="心"
              title="Kokoro"
              text="In Japanese, kokoro means heart, mind, spirit — all at once. That's what you are to me. Not just in my heart, but woven through my thoughts and my spirit, like pink light through petals."
            />
          </Reveal>
        </div>

        {/* Pink statement */}
        <Reveal animation="fade-up" delay={700} className="text-center mt-20">
          <div className="inline-block glass-card rounded-full px-8 py-4">
            <p className="font-serif italic text-pink-soft text-base md:text-lg">
              Japan is pink at its soul — and so are you.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

function PhotoCard({ src, alt, large = false }: { src: string; alt: string; large?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-pink-primary/20 group ${
        large ? 'h-64 md:h-full min-h-[300px]' : 'h-32 md:h-40'
      }`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-pink-primary/0 group-hover:bg-pink-primary/10 transition-colors duration-500" />
      {large && (
        <div className="absolute bottom-4 left-4">
          <p className="font-serif italic text-cream/80 text-sm">{alt}</p>
        </div>
      )}
    </div>
  );
}

function JapanMemory({ kanji, title, text }: { kanji: string; title: string; text: string }) {
  return (
    <div className="glass-card rounded-2xl p-6 hover:border-pink-primary/30 transition-all duration-500 group">
      <div className="mb-4">
        <span className="font-serif text-4xl text-pink-primary/40 group-hover:text-pink-primary/60 transition-colors">
          {kanji}
        </span>
      </div>
      <h3 className="font-serif text-xl text-pink-soft mb-3">{title}</h3>
      <p className="text-cream/70 leading-relaxed text-sm">{text}</p>
    </div>
  );
}
