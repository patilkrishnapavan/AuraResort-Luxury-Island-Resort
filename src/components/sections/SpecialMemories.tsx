import Reveal from '@/components/Reveal';
import { Coffee, Moon, Music, Gift, Camera, Sunrise, type LucideIcon } from 'lucide-react';

const memories = [
  {
    icon: Coffee,
    title: 'Morning Coffee',
    text: 'The way you hold the cup with both hands, eyes still half-closed, hair still messy. I could watch that forever.',
  },
  {
    icon: Moon,
    title: 'Late Night Talks',
    text: 'Conversations that start at midnight and end at 3am, about everything and nothing. Those are the ones I keep.',
  },
  {
    icon: Music,
    title: 'Your Playlist',
    text: 'You played me a song once and said "this reminded me of you." I still listen to it when I miss you.',
  },
  {
    icon: Gift,
    title: 'Small Surprises',
    text: 'You have this way of remembering the tiny things I mention once, then bringing them back weeks later like magic.',
  },
  {
    icon: Camera,
    title: 'Stolen Photos',
    text: "My camera roll is mostly you when you're not looking — laughing, thinking, just being. Those are my favorites.",
  },
  {
    icon: Sunrise,
    title: 'The Quiet Mornings',
    text: 'No plans. No urgency. Just us, the light coming through the window, and the soft sound of breathing.',
  },
];

export default function SpecialMemories() {
  return (
    <section
      id="chapter-4"
      className="relative min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="relative z-10 max-w-5xl w-full">
        {/* Chapter label */}
        <Reveal animation="fade-down" className="text-center mb-12">
          <p className="font-script text-3xl text-pink-primary mb-2">Chapter Four</p>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-pink-primary/50" />
            <span className="text-pink-primary/60 text-sm font-serif italic">Little Things</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-pink-primary/50" />
          </div>
        </Reveal>

        <Reveal animation="fade-up" delay={200} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-cream">The little things that are </span>
            <span className="shimmer-text italic">everything</span>
          </h2>
          <p className="mt-6 font-serif italic text-lg text-pink-soft/70 max-w-2xl mx-auto leading-relaxed">
            It's not the grand gestures. It's the small, quiet moments —
            the ones you don't even notice you're creating — that I hold closest.
          </p>
        </Reveal>

        {/* Memory grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, i) => (
            <Reveal key={memory.title} animation="scale-in" delay={300 + i * 120}>
              <MemoryTile {...memory} />
            </Reveal>
          ))}
        </div>

        {/* Highlight strip */}
        <Reveal animation="fade-up" delay={500} className="mt-20">
          <div className="glass-card rounded-2xl p-8 md:p-10 text-center border-pink-primary/20">
            <p className="font-serif italic text-xl md:text-2xl text-pink-soft leading-relaxed">
              "I love you not just for the big moments —
              <br className="hidden md:block" />
              but for every <span className="text-pink-primary font-semibold not-italic">small pink instant</span> in between."
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MemoryTile({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-6 hover:translate-y-[-4px] hover:border-pink-primary/30 transition-all duration-500 group h-full">
      <div className="w-12 h-12 rounded-xl bg-pink-primary/10 flex items-center justify-center mb-4 group-hover:bg-pink-primary/20 transition-colors">
        <Icon size={22} className="text-pink-primary group-hover:text-pink-soft transition-colors" />
      </div>
      <h3 className="font-serif text-lg text-pink-soft mb-2 group-hover:text-pink-primary transition-colors">
        {title}
      </h3>
      <p className="text-cream/70 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
