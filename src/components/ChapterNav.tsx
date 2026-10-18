import { Heart } from 'lucide-react';

interface ChapterNavProps {
  sections: { id: string; label: string }[];
  activeSection: number;
  scrollProgress: number;
}

export default function ChapterNav({ sections, activeSection, scrollProgress }: ChapterNavProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-plum-deep/50">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, #F9A8D4, #EC4899, #BE185D)',
            boxShadow: '0 0 10px rgba(236, 72, 153, 0.6)',
          }}
        />
      </div>

      {/* Chapter dots */}
      <nav className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center gap-3 cursor-pointer"
            aria-label={section.label}
          >
            <span
              className={`text-xs font-serif italic transition-all duration-300 ${
                activeSection === idx
                  ? 'text-pink-soft opacity-100 translate-x-0'
                  : 'text-cream/40 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {section.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === idx
                  ? 'w-3 h-3 bg-pink-primary box-glow-pink'
                  : 'w-2 h-2 bg-cream/20 group-hover:bg-pink-soft/60'
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Floating heart corner */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <Heart
          className="text-pink-primary/40 animate-float"
          size={20}
          fill="currentColor"
        />
      </div>
    </>
  );
}
