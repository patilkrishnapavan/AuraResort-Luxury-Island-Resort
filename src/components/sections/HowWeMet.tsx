import Reveal from '@/components/Reveal';
import { MapPin } from 'lucide-react';

export default function HowWeMet() {
  return (
    <section
      id="chapter-1"
      className="relative min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="relative z-10 max-w-4xl w-full">
        {/* Chapter label */}
        <Reveal animation="fade-down" className="text-center mb-12">
          <p className="font-script text-3xl text-pink-primary mb-2">Chapter One</p>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-pink-primary/50" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-pink-primary/50" />
          </div>
        </Reveal>

        <Reveal animation="fade-up" delay={200} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-cream leading-tight">
            The moment everything
            <br />
            <span className="shimmer-text italic">began</span>
          </h2>
        </Reveal>

        {/* Memory cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Reveal animation="slide-in-left" delay={300}>
            <MemoryCard
              icon={<MapPin size={18} />}
              title="Where it started"
              text="I still remember the first time our eyes met. The world around us blurred, and for a heartbeat, everything else disappeared. There was only you — and the faintest blush of pink in your cheeks."
            />
          </Reveal>

          <Reveal animation="slide-in-right" delay={400}>
            <MemoryCard
              icon="✦"
              title="The first words"
              text="You said something that made me laugh — really laugh. The kind that sneaks up on you and stays. I knew right then that I wanted to hear that laugh of mine, caused by you, for a very long time."
            />
          </Reveal>

          <Reveal animation="slide-in-left" delay={500}>
            <MemoryCard
              icon="♡"
              title="The first thought"
              text="That night, lying in bed, I couldn't stop thinking about you. The way you tilted your head when you listened. The warmth in your voice. I thought: this person feels like coming home."
            />
          </Reveal>

          <Reveal animation="slide-in-right" delay={600}>
            <MemoryCard
              icon="✿"
              title="The quiet knowing"
              text="It wasn't dramatic or cinematic. There were no fireworks or orchestras. Just a quiet, steady certainty — like a light turning on in a room I didn't know was dark. You were the light."
            />
          </Reveal>
        </div>

        {/* Quote */}
        <Reveal animation="fade-up" delay={700} className="text-center mt-20">
          <div className="inline-block">
            <p className="font-script text-2xl md:text-3xl text-pink-soft/80 italic">
              "Some people arrive and make the world feel softer."
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-pink-primary/40" />
              <span className="text-pink-primary/60 text-xs tracking-widest uppercase">You were that person</span>
              <span className="h-px w-8 bg-pink-primary/40" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MemoryCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 hover:border-pink-primary/30 transition-all duration-500 hover:translate-y-[-4px] group">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-pink-primary text-lg">{icon}</span>
        <h3 className="font-serif text-xl text-pink-soft group-hover:text-pink-primary transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-cream/70 leading-relaxed text-sm md:text-base">{text}</p>
    </div>
  );
}
