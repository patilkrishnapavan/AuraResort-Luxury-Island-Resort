import { useEffect, useState } from 'react';
import Reveal from '@/components/Reveal';

export default function FinalLetter() {
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('final-letter');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visibleRatio = Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight));
      setGlowIntensity(Math.min(visibleRatio * 1.5, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="final-letter"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Dynamic pink glow background */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `radial-gradient(ellipse at center, rgba(236, 72, 153, ${0.08 + glowIntensity * 0.2}) 0%, rgba(190, 24, 93, ${0.03 + glowIntensity * 0.08}) 30%, rgba(20, 9, 20, ${1 - glowIntensity * 0.3}) 70%)`,
        }}
      />
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, rgba(251, 207, 232, ${glowIntensity * 0.12}) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Chapter label */}
        <Reveal animation="fade-down" className="mb-12">
          <p className="font-script text-3xl text-pink-primary">The Final Letter</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-pink-primary/60" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-pink-primary/60" />
          </div>
        </Reveal>

        {/* Letter card */}
        <Reveal animation="scale-in" delay={300}>
          <div
            className="glass-card rounded-3xl p-8 md:p-12 border-pink-primary/20 transition-all duration-700"
            style={{
              boxShadow: `0 0 ${30 + glowIntensity * 60}px rgba(236, 72, 153, ${0.15 + glowIntensity * 0.25}), 0 0 ${60 + glowIntensity * 120}px rgba(236, 72, 153, ${0.05 + glowIntensity * 0.1})`,
              borderColor: `rgba(236, 72, 153, ${0.2 + glowIntensity * 0.2})`,
            }}
          >
            <div className="space-y-6 text-left">
              <p className="font-script text-2xl text-pink-primary">
                My love,
              </p>

              <div className="space-y-5 text-cream/80 leading-relaxed text-base md:text-lg font-serif">
                <p>
                  If you've scrolled all the way here, then you've walked through
                  every chapter I wrote for you — the beginning, the places, the
                  little things. Each one is a piece of how I see you.
                </p>
                <p>
                  I made this world in <span className="text-pink-soft font-semibold">pink</span> because
                  pink is the color that shows up when something is gentle, warm,
                  and honest. It's the color of cherry blossoms, of dawn light,
                  of the way I feel when I think of you.
                </p>
                <p>
                  You are my favorite chapter, my favorite destination,
                  and my favorite little thing. You are the pink in my world.
                </p>
              </div>

              <p className="font-script text-xl text-pink-soft pt-4">
                Always and in every color —
                <br />
                but especially in pink.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Final heart */}
        <Reveal animation="scale-in" delay={800} className="mt-16">
          <div
            className="inline-flex items-center justify-center transition-all duration-700"
            style={{
              transform: `scale(${1 + glowIntensity * 0.15})`,
            }}
          >
            <div
              className="relative flex items-center justify-center"
              style={{
                filter: `drop-shadow(0 0 ${20 + glowIntensity * 40}px rgba(236, 72, 153, ${0.4 + glowIntensity * 0.3}))`,
              }}
            >
              <span
                className="text-6xl md:text-7xl animate-heart-beat"
                style={{
                  color: '#EC4899',
                }}
              >
                💗
              </span>
            </div>
          </div>
          <p
            className="mt-8 font-serif italic text-pink-soft/60 text-sm transition-all duration-700"
            style={{ opacity: glowIntensity }}
          >
            Pink isn't just a color here. It's part of the world I made for you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
