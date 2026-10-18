import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function Hero() {
  const [opened, setOpened] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (opened) {
      const timer = setTimeout(() => setShowText(true), 800);
      return () => clearTimeout(timer);
    }
  }, [opened]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-gradient-pink-glow" />

      {/* Ambient ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-pink-primary/10 animate-glow-pulse" />

      <div className="relative z-10 text-center max-w-3xl">
        {/* Pre-envelope text */}
        {!opened && (
          <div className="animate-fade-in space-y-6">
            <p className="font-serif italic text-pink-soft/70 text-lg md:text-xl tracking-wide">
              Something was written for you
            </p>

            {/* Envelope */}
            <div className="perspective flex justify-center pt-4">
              <button
                onClick={() => setOpened(true)}
                className="group cursor-pointer relative"
                aria-label="Open the letter"
              >
                <div className="relative w-64 h-40 md:w-72 md:h-44 transition-transform duration-500 group-hover:scale-105">
                  {/* Envelope body */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-plum-light to-plum border border-pink-primary/30 box-glow-pink" />
                  {/* Envelope flap */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-700"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      background: 'linear-gradient(135deg, #3D1A33, #2A1024)',
                      borderBottom: '1px solid rgba(236, 72, 153, 0.2)',
                      transform: opened ? 'rotateX(180deg)' : 'rotateX(0deg)',
                    }}
                  />
                  {/* Heart seal */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-pink-primary/20 flex items-center justify-center border border-pink-primary/40 group-hover:bg-pink-primary/30 transition-colors">
                      <Heart
                        className="text-pink-primary animate-heart-beat"
                        size={20}
                        fill="currentColor"
                      />
                    </div>
                  </div>
                  {/* Letter peeking out */}
                  <div className="absolute bottom-2 left-4 right-4 h-2 rounded bg-pink-light/10" />
                </div>

                <p className="mt-6 font-script text-2xl text-pink-soft group-hover:text-pink-primary transition-colors">
                  Open me
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Post-open content */}
        {opened && (
          <div className="space-y-8">
            <div
              className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-pink-primary/10 border border-pink-primary/30"
              style={{
                animation: showText ? 'scaleIn 0.8s ease-out forwards' : 'none',
                opacity: showText ? undefined : 0,
              }}
            >
              <Sparkles className="text-pink-soft animate-twinkle" size={28} />
            </div>

            <h1
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
              style={{
                animation: showText ? 'fadeUp 1.5s ease-out 0.2s forwards' : 'none',
                opacity: 0,
              }}
            >
              <span className="shimmer-text">A World</span>
              <br />
              <span className="text-cream">Made for </span>
              <span className="shimmer-text">You</span>
            </h1>

            <p
              className="font-serif italic text-lg md:text-2xl text-pink-soft/80 max-w-xl mx-auto leading-relaxed"
              style={{
                animation: showText ? 'fadeUp 1.5s ease-out 0.6s forwards' : 'none',
                opacity: 0,
              }}
            >
              Pink isn't just a color here.
              <br />
              It's part of the world I made for you.
            </p>

            <div
              className="pt-8"
              style={{
                animation: showText ? 'fadeUp 1.5s ease-out 1s forwards' : 'none',
                opacity: 0,
              }}
            >
              <button
                onClick={() => {
                  const el = document.getElementById('chapter-1');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-pink-primary/10 border border-pink-primary/40 text-pink-soft font-medium tracking-wide hover:bg-pink-primary/20 hover:border-pink-primary/60 transition-all duration-300 cursor-pointer box-glow-pink"
              >
                Begin the journey
                <Heart
                  className="group-hover:translate-y-0.5 transition-transform"
                  size={16}
                  fill="currentColor"
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {opened && (
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          style={{
            animation: showText ? 'fadeIn 2s ease-out 1.5s forwards' : 'none',
            opacity: 0,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-cream/40 font-serif italic">scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-pink-primary/50 to-transparent animate-float" />
          </div>
        </div>
      )}
    </section>
  );
}
