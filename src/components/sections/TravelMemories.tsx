import Reveal from '@/components/Reveal';
import { MapPin, Plane } from 'lucide-react';

const destinations = [
  {
    name: 'Kyoto',
    subtitle: 'Japan',
    coords: { x: 82, y: 38 },
    memory: 'Temples at dawn, tea ceremonies, and your reflection in a still pond.',
    accent: true,
  },
  {
    name: 'Paris',
    subtitle: 'France',
    coords: { x: 48, y: 32 },
    memory: 'Croissants at midnight, the Eiffel Tower blinking above us like a heartbeat.',
  },
  {
    name: 'Santorini',
    subtitle: 'Greece',
    coords: { x: 54, y: 42 },
    memory: 'White walls, blue domes, and the Aegean turning gold at your feet.',
  },
  {
    name: 'Reykjavik',
    subtitle: 'Iceland',
    coords: { x: 46, y: 22 },
    memory: 'Northern lights rippling in green and pink — the sky dancing just for us.',
  },
  {
    name: 'Marrakech',
    subtitle: 'Morocco',
    coords: { x: 47, y: 44 },
    memory: 'Spice markets, rooftop sunsets, and the way the call to prayer made time pause.',
  },
  {
    name: 'Bali',
    subtitle: 'Indonesia',
    coords: { x: 80, y: 58 },
    memory: 'Rice terraces at dawn, flower offerings, and your smile in the morning rain.',
  },
];

export default function TravelMemories() {
  return (
    <section
      id="chapter-3"
      className="relative min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="relative z-10 max-w-6xl w-full">
        {/* Chapter label */}
        <Reveal animation="fade-down" className="text-center mb-12">
          <p className="font-script text-3xl text-pink-primary mb-2">Chapter Three</p>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-pink-primary/50" />
            <span className="text-pink-primary/60 text-sm font-serif italic">Our Map</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-pink-primary/50" />
          </div>
        </Reveal>

        <Reveal animation="fade-up" delay={200} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-cream">Places we'll </span>
            <span className="shimmer-text italic">go together</span>
          </h2>
          <p className="mt-6 font-serif italic text-lg text-pink-soft/70 max-w-2xl mx-auto leading-relaxed">
            Every destination is a promise. Every pin on this map is a future memory,
            connected by a thin pink line that always leads back to you.
          </p>
        </Reveal>

        {/* Map */}
        <Reveal animation="scale-in" delay={400} className="mb-16">
          <div className="relative w-full aspect-[2/1] max-w-4xl mx-auto glass-card rounded-3xl p-4 md:p-8 overflow-hidden">
            {/* SVG world map with connection lines */}
            <svg
              viewBox="0 0 100 50"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.1))' }}
            >
              {/* Simplified continents */}
              <g fill="rgba(249, 168, 212, 0.06)" stroke="rgba(236, 72, 153, 0.15)" strokeWidth="0.15">
                {/* North America */}
                <path d="M10,18 Q15,14 22,15 L28,18 L30,24 L26,28 L20,28 L14,26 Z" />
                {/* South America */}
                <path d="M25,32 L30,34 L32,42 L28,46 L24,44 L23,38 Z" />
                {/* Europe */}
                <path d="M44,20 L52,18 L55,24 L50,28 L46,26 Z" />
                {/* Africa */}
                <path d="M46,28 L54,28 L56,36 L53,44 L48,44 L45,38 Z" />
                {/* Asia */}
                <path d="M55,16 L82,14 L86,20 L84,28 L78,30 L70,28 L60,26 L56,22 Z" />
                {/* Australia */}
                <path d="M78,38 L86,36 L88,42 L82,44 L78,42 Z" />
              </g>

              {/* Connection lines between destinations */}
              {destinations.map((dest, i) => {
                if (i === 0) return null;
                const prev = destinations[i - 1];
                return (
                  <line
                    key={`line-${i}`}
                    x1={prev.coords.x}
                    y1={prev.coords.y / 2}
                    x2={dest.coords.x}
                    y2={dest.coords.y / 2}
                    stroke="url(#pinkGradient)"
                    strokeWidth="0.2"
                    strokeDasharray="0.5 0.5"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="10"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </line>
                );
              })}

              {/* Gradient definition */}
              <defs>
                <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F9A8D4" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <radialGradient id="glowDot">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="rgba(236, 72, 153, 0)" />
                </radialGradient>
              </defs>

              {/* Destination pins */}
              {destinations.map((dest, i) => (
                <g key={`pin-${i}`}>
                  <circle
                    cx={dest.coords.x}
                    cy={dest.coords.y / 2}
                    r="1.5"
                    fill="url(#glowDot)"
                    opacity="0.4"
                  >
                    <animate
                      attributeName="r"
                      values="1.5;3;1.5"
                      dur="3s"
                      begin={`${i * 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx={dest.coords.x}
                    cy={dest.coords.y / 2}
                    r="0.6"
                    fill={dest.accent ? '#EC4899' : '#F9A8D4'}
                    stroke="#FBCFE8"
                    strokeWidth="0.2"
                  />
                  <text
                    x={dest.coords.x}
                    y={dest.coords.y / 2 - 2}
                    textAnchor="middle"
                    fill={dest.accent ? '#EC4899' : '#F9A8D4'}
                    fontSize="1.4"
                    fontFamily="Inter, sans-serif"
                    fontWeight="500"
                  >
                    {dest.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </Reveal>

        {/* Destination cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <Reveal key={dest.name} animation="fade-up" delay={300 + i * 100}>
              <DestinationCard {...dest} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationCard({
  name,
  subtitle,
  memory,
  accent,
}: {
  name: string;
  subtitle: string;
  memory: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 hover:translate-y-[-4px] transition-all duration-500 group ${
        accent ? 'border-pink-primary/30 box-glow-pink' : ''
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            accent ? 'bg-pink-primary/20' : 'bg-pink-primary/10'
          }`}
        >
          {accent ? (
            <Plane className="text-pink-primary" size={16} />
          ) : (
            <MapPin className="text-pink-soft" size={16} />
          )}
        </div>
        <div>
          <h3 className={`font-serif text-lg ${accent ? 'text-pink-primary' : 'text-pink-soft'}`}>
            {name}
          </h3>
          <p className="text-cream/40 text-xs tracking-wide uppercase">{subtitle}</p>
        </div>
      </div>
      <p className="text-cream/70 text-sm leading-relaxed italic">"{memory}"</p>
    </div>
  );
}
